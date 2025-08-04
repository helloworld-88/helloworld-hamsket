const {
	app,
	protocol,
	BrowserWindow,
	dialog,
	shell,
	Menu,
	ipcMain,
	nativeImage,
	session,
} = require('electron');

// 第三方模块导入
const tray = require('./tray');
const AutoLaunch = require('auto-launch');
const Config = require('electron-store');
const updater = require('./updater');
const contextMenu = require('electron-context-menu');

// 内置模块导入
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const tmp = require('tmp');
const mime = require('mime');

// 常量定义
const APP_NAME = 'HelloWorld';
const APP_ID = 'com.cn.helloworld';
const DEFAULT_WINDOW_WIDTH = 1000;
const DEFAULT_WINDOW_HEIGHT = 800;

// 全局变量
let mainWindow = null;
let mainMasterPasswordWindow = null;
let isQuitting = false;
let imageCache = {};

// 配置数据文件夹路径
const setupDataPaths = () => {
	const basepath = app.getAppPath();
	const dataPath = path.join(basepath, 'data');

	if (fs.existsSync(dataPath)) {
		app.setPath('userData', path.join(dataPath, 'data'));
		app.setPath('logs', path.join(dataPath, 'logs'));
		app.setPath('userCache', path.join(dataPath, 'cache'));
	}
};

// 初始化配置
const config = new Config({
	defaults: {
		always_on_top: false,
		hide_menu_bar: false,
		tabbar_location: 'top',
		window_display_behavior: 'taskbar_tray',
		auto_launch: false,
		flash_frame: true,
		window_close_behavior: 'keep_in_tray',
		start_minimized: false,
		systemtray_indicator: true,
		master_password: false,
		dont_disturb: false,
		disable_gpu: process.platform === 'linux',
		proxy: false,
		proxyHost: '',
		proxyPort: '',
		proxyLogin: '',
		proxyPassword: '',
		locale: 'en',
		enable_hidpi_support: false,
		default_service: 'helloworldTab',

		x: undefined,
		y: undefined,
		width: DEFAULT_WINDOW_WIDTH,
		height: DEFAULT_WINDOW_HEIGHT,
		maximized: false,
	},
});

// 设置应用命令行参数
const setupCommandLineArgs = () => {
	app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
	app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicy');

	// HiDPI 支持
	if (config.get('enable_hidpi_support') && process.platform === 'win32') {
		app.commandLine.appendSwitch('high-dpi-support', 'true');
		app.commandLine.appendSwitch('force-device-scale-factor', '1');
	}

	// 代理设置
	if (config.get('proxy')) {
		const proxyServer = `${config.get('proxyHost')}:${config.get('proxyPort')}`;
		app.commandLine.appendSwitch('proxy-server', proxyServer);
	}
};

// 设置应用属性
const setupAppProperties = () => {
	app.setAppUserModelId(APP_ID);

	// 修改用户代理
	app.userAgentFallback = app.userAgentFallback
		.replace(`Electron/${process.versions.electron}`, '')
		.replace(`${APP_NAME}/${app.getVersion()}`, '');
};

// 配置自动启动
const setupAutoLaunch = () => {
	const appLauncher = new AutoLaunch({
		name: APP_NAME,
		isHidden: config.get('start_minimized'),
	});

	appLauncher
		.isEnabled()
		.then((isEnabled) => {
			const shouldAutoLaunch = config.get('auto_launch');
			if (shouldAutoLaunch && !isEnabled) {
				return appLauncher.enable();
			} else if (!shouldAutoLaunch && isEnabled) {
				return appLauncher.disable();
			}
		})
		.catch((err) => {
			console.error('自动启动配置失败:', err);
		});

	return appLauncher;
};

// 创建主窗口
const createWindow = () => {
	try {
		const iconPath = path.join(app.getAppPath(), '/resources/Icon.ico');

		mainWindow = new BrowserWindow({
			title: APP_NAME,
			icon: nativeImage.createFromPath(iconPath),
			backgroundColor: '#FFF',
			x: config.get('x'),
			y: config.get('y'),
			width: config.get('width'),
			height: config.get('height'),
			alwaysOnTop: config.get('always_on_top'),
			autoHideMenuBar: config.get('hide_menu_bar'),
			skipTaskbar: config.get('window_display_behavior') === 'show_trayIcon',
			show: !config.get('start_minimized'),
			acceptFirstMouse: true,
			webPreferences: {
				partition: 'persist:helloworld',
				nodeIntegration: true,
				webviewTag: true,
				contextIsolation: false,
			},
		});

		// 启用远程模块
		require('@electron/remote/main').enable(mainWindow.webContents);

		// 设置窗口状态
		setupWindowState();

		// 设置窗口位置
		setupWindowPosition();

		// 设置事件监听器
		setupWindowEventListeners();

		// 加载应用
		mainWindow.loadURL(`file://${__dirname}/../index.html`);

		// 设置菜单
		const appMenu = require('./menu')(config);
		Menu.setApplicationMenu(appMenu);

		// 创建系统托盘
		tray.create(mainWindow, config);

		// 初始化更新器
		initializeUpdater();
	} catch (error) {
		console.error('创建主窗口失败:', error);
		dialog.showErrorBox('错误', '无法创建主窗口');
		app.quit();
	}
};

// 设置窗口状态
const setupWindowState = () => {
	if (!config.get('start_minimized') && config.get('maximized')) {
		mainWindow.maximize();
	}

	if (config.get('start_minimized')) {
		mainWindow.webContents.once('did-finish-load', () => {
			if (config.get('window_display_behavior') === 'show_taskbar') {
				mainWindow.minimize();
			} else {
				mainWindow.hide();
			}
		});
	}
};

// 设置窗口位置
const setupWindowPosition = () => {
	const { positionOnScreen } = require('./utils/positionOnScreen');
	const bounds = [config.get('x'), config.get('y')];

	if (positionOnScreen(bounds)) {
		mainWindow.setPosition(config.get('x'), config.get('y'));
	} else {
		mainWindow.center();
	}
};

// 设置窗口事件监听器
const setupWindowEventListeners = () => {
	// 标题更新事件
	mainWindow.on('page-title-updated', (e, title) => updateBadge(title));

	// 窗口状态事件
	mainWindow.on('maximize', () => config.set('maximized', true));
	mainWindow.on('unmaximize', () => config.set('maximized', false));
	mainWindow.on('resize', () => {
		if (!mainWindow.isMaximized()) {
			config.set(mainWindow.getBounds());
		}
	});
	mainWindow.on('move', () => {
		if (!mainWindow.isMaximized()) {
			config.set(mainWindow.getBounds());
		}
	});

	// 应用命令事件
	mainWindow.on('app-command', (e, cmd) => {
		const jsCode =
			'if(Ext.cq1("app-main")) Ext.cq1("app-main").getActiveTab().';

		switch (cmd) {
			case 'browser-backward':
				mainWindow.webContents.executeJavaScript(jsCode + 'goBack();');
				break;
			case 'browser-forward':
				mainWindow.webContents.executeJavaScript(jsCode + 'goForward();');
				break;
		}
	});

	// 窗口关闭事件
	mainWindow.on('close', handleWindowClose);
	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// 焦点事件
	mainWindow.once('focus', () => mainWindow.flashFrame(false));

	// 新窗口事件
	setupNewWindowHandler();

	// 导航事件
	mainWindow.webContents.on('will-navigate', (event) => {
		event.preventDefault();
	});
};

// 处理窗口关闭
const handleWindowClose = (e) => {
	if (isQuitting) return;

	e.preventDefault();

	switch (process.platform) {
		case 'darwin':
			app.hide();
			break;
		default:
			const behavior = config.get('window_close_behavior');
			switch (behavior) {
				case 'keep_in_tray':
					mainWindow.hide();
					break;
				case 'keep_in_tray_and_taskbar':
					mainWindow.minimize();
					break;
				case 'quit':
					app.quit();
					break;
			}
			break;
	}
};

// 设置新窗口处理器
const setupNewWindowHandler = () => {
	mainWindow.webContents.on(
		'new-window',
		(e, url, frameName, disposition, options) => {
			const protocol = require('url').parse(url).protocol;

			switch (disposition) {
				case 'new-window':
					e.preventDefault();
					const win = new BrowserWindow(options);
					win.once('ready-to-show', () => win.show());
					win.loadURL(url);
					e.newGuest = win;
					break;
				case 'foreground-tab':
					if (['http:', 'https:', 'mailto:'].includes(protocol)) {
						e.preventDefault();
						shell.openExternal(url);
					}
					break;
			}
		},
	);
};

// 创建主密码窗口
const createMasterPasswordWindow = () => {
	try {
		mainMasterPasswordWindow = new BrowserWindow({
			backgroundColor: '#0675A0',
			frame: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
			},
		});

		require('@electron/remote/main').enable(
			mainMasterPasswordWindow.webContents,
		);

		mainMasterPasswordWindow.loadURL(
			`file://${__dirname}/../masterpassword.html`,
		);
		mainMasterPasswordWindow.on('close', () => {
			mainMasterPasswordWindow = null;
		});
	} catch (error) {
		console.error('创建主密码窗口失败:', error);
		dialog.showErrorBox('错误', '无法创建主密码窗口');
		app.quit();
	}
};

// 更新徽章
const updateBadge = (title) => {
	try {
		title = title.split(' - ')[0];
		const messageCount = parseInt(title.match(/\d+/g)?.join('') || '0') || 0;

		tray.setBadge(messageCount, config.get('systemtray_indicator'));

		if (process.platform === 'win32') {
			if (messageCount === 0) {
				mainWindow.setOverlayIcon(null, '');
				return;
			}
			mainWindow.webContents.send('setBadge', messageCount);
		} else {
			app.badgeCount = messageCount;
		}

		// 闪烁窗口
		if (
			messageCount > 0 &&
			!mainWindow.isFocused() &&
			!config.get('dont_disturb') &&
			config.get('flash_frame')
		) {
			mainWindow.flashFrame(true);
		}
	} catch (error) {
		console.error('更新徽章失败:', error);
	}
};

// 初始化更新器
const initializeUpdater = () => {
	const updateExePath = path.resolve(
		path.dirname(process.execPath),
		'..',
		'Update.exe',
	);
	const hasUpdateExe = fs.existsSync(updateExePath);
	const skipUpdate = process.argv.includes('--without-update');

	if (hasUpdateExe && !skipUpdate) {
		updater.initialize(mainWindow);
	}
};

// 设置 IPC 事件监听器
const setupIpcListeners = () => {
	// 设置徽章
	ipcMain.on('setBadge', (event, messageCount, value) => {
		try {
			const img = nativeImage.createFromDataURL(value);
			mainWindow.setOverlayIcon(img, messageCount.toString());
		} catch (error) {
			console.error('设置徽章失败:', error);
		}
	});

	// 获取配置
	ipcMain.on('getConfig', (event) => {
		event.returnValue = config.store;
	});

	// 设置配置
	ipcMain.on('setConfig', (event, values) => {
		try {
			config.set(values);

			// 更新窗口属性
			mainWindow.setAutoHideMenuBar(values.hide_menu_bar);
			if (!values.hide_menu_bar) {
				mainWindow.setMenuBarVisibility(true);
			}
			mainWindow.setAlwaysOnTop(values.always_on_top);

			// 更新自动启动
			const appLauncher = setupAutoLaunch();
			if (values.auto_launch) {
				appLauncher.enable();
			} else {
				appLauncher.disable();
			}

			// 更新徽章
			updateBadge(mainWindow.getTitle());

			// 更新应用
			mainWindow.webContents.executeJavaScript(
				'(function(a){if(a)a.controller.initialize(a)})(Ext.cq1("app-main"))',
			);

			// 更新窗口显示行为
			updateWindowDisplayBehavior(values.window_display_behavior);
		} catch (error) {
			console.error('设置配置失败:', error);
		}
	});

	// 验证主密码
	ipcMain.on('validateMasterPassword', (event, pass) => {
		try {
			const hashedPassword = crypto
				.createHash('md5')
				.update(pass)
				.digest('hex');
			const isValid = config.get('master_password') === hashedPassword;

			if (isValid) {
				createWindow();
				mainMasterPasswordWindow.close();
			}

			event.returnValue = isValid;
		} catch (error) {
			console.error('验证主密码失败:', error);
			event.returnValue = false;
		}
	});

	// 设置服务通知
	ipcMain.on('setServiceNotifications', (event, partition, op) => {
		if (partition) {
			session
				.fromPartition(partition)
				.setPermissionRequestHandler((webContents, permission, callback) => {
					if (permission === 'notifications') {
						return callback(op);
					}
					callback(true);
				});
		}
	});

	// 设置勿扰模式
	ipcMain.on('setDontDisturb', (event, arg) => {
		config.set('dont_disturb', arg);
	});

	// 重新加载应用
	ipcMain.on('reloadApp', () => {
		mainWindow.reload();
	});

	// 重新启动应用
	ipcMain.on('relaunchApp', () => {
		app.relaunch();
		app.quit(0);
	});

	// 图片下载
	ipcMain.on('image:download', handleImageDownload);

	// 图片弹窗
	ipcMain.on('image:popup', handleImagePopup);

	// 切换窗口
	ipcMain.on('toggleWin', handleToggleWindow);
};

// 更新窗口显示行为
const updateWindowDisplayBehavior = (behavior) => {
	switch (behavior) {
		case 'show_taskbar':
			mainWindow.setSkipTaskbar(false);
			tray.destroy();
			break;
		case 'show_trayIcon':
			mainWindow.setSkipTaskbar(true);
			tray.create(mainWindow, config);
			break;
		case 'taskbar_tray':
			mainWindow.setSkipTaskbar(false);
			tray.create(mainWindow, config);
			break;
	}
};

// 处理图片下载
const handleImageDownload = (event, url, partition) => {
	try {
		let file = imageCache[url];
		if (file) {
			if (file.complete) {
				shell.openItem(file.path);
			}
			return;
		}

		const tmpWindow = new BrowserWindow({
			show: false,
			webPreferences: {
				partition: partition,
			},
		});

		tmpWindow.webContents.session.once(
			'will-download',
			(event, downloadItem) => {
				imageCache[url] = file = {
					path:
						tmp.tmpNameSync() +
						'.' +
						mime.getExtension(downloadItem.getMimeType()),
					complete: false,
				};

				downloadItem.setSavePath(file.path);
				downloadItem.once('done', () => {
					tmpWindow.destroy();
					shell.openItem(file.path);
					file.complete = true;
				});
			},
		);

		tmpWindow.webContents.downloadURL(url);
	} catch (error) {
		console.error('图片下载失败:', error);
	}
};

// 处理图片弹窗
const handleImagePopup = (event, url, partition) => {
	try {
		const tmpWindow = new BrowserWindow({
			width: mainWindow.getBounds().width,
			height: mainWindow.getBounds().height,
			parent: mainWindow,
			icon: nativeImage.createFromPath(
				path.join(
					app.getAppPath(),
					'/resources/Icon.' + (process.platform === 'linux' ? 'png' : 'ico'),
				),
			),
			backgroundColor: '#FFF',
			autoHideMenuBar: true,
			skipTaskbar: true,
			webPreferences: {
				partition: partition,
			},
		});

		tmpWindow.maximize();
		tmpWindow.loadURL(url);
	} catch (error) {
		console.error('图片弹窗失败:', error);
	}
};

// 处理窗口切换
const handleToggleWindow = (event, alwaysShow) => {
	try {
		const isMinimized = mainWindow.isMinimized();
		const isMaximized = mainWindow.isMaximized();
		const isVisible = mainWindow.isVisible();

		if (!isMinimized && isMaximized && isVisible) {
			// 最大化状态
			alwaysShow ? mainWindow.show() : mainWindow.close();
		} else if (isMinimized && !isMaximized && !isVisible) {
			// 最小化状态
			mainWindow.restore();
		} else if (!isMinimized && !isMaximized && isVisible) {
			// 窗口模式
			alwaysShow ? mainWindow.show() : mainWindow.close();
		} else if (isMinimized && !isMaximized && isVisible) {
			// 关闭到任务栏
			mainWindow.restore();
		} else if (!isMinimized && isMaximized && !isVisible) {
			// 关闭最大化到托盘
			mainWindow.show();
		} else if (!isMinimized && !isMaximized && !isVisible) {
			// 关闭窗口到托盘
			mainWindow.show();
		} else if (isMinimized && !isMaximized && !isVisible) {
			// 关闭最小化到托盘
			mainWindow.restore();
		} else {
			mainWindow.show();
		}
	} catch (error) {
		console.error('窗口切换失败:', error);
	}
};

// 设置代理认证
const setupProxyAuth = () => {
	if (config.get('proxy')) {
		app.on('login', (event, webContents, request, authInfo, callback) => {
			if (!authInfo.isProxy) return;

			event.preventDefault();
			callback(config.get('proxyLogin'), config.get('proxyPassword'));
		});
	}
};

// 设置单实例锁
const setupSingleInstance = () => {
	const haveLock = app.requestSingleInstanceLock();

	if (!haveLock) {
		app.quit();
		return;
	}

	app.on('second-instance', (commandLine, workingDirectory) => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}
			mainWindow.focus();
			mainWindow.show();
			mainWindow.setSkipTaskbar(false);

			if (app.dock && app.dock.show) {
				app.dock.show();
			}
		}
	});
};

// 设置 WebView 内容处理器
const setupWebViewHandlers = () => {
	const allowPopUp = [
		'=?print=true',
		'accounts.google.com/AccountChooser',
		'accounts.google.com/o/oauth2',
		'api.moo.do',
		'app.mixmax.com/_oauth/google',
		'app.slack.com/files/import/dropbox',
		'app.slack.com/files/import/gdrive',
		'app.slack.com/free-willy/',
		'auth.missiveapp.com',
		'dropbox.com/profile_services/start_auth_flow',
		'facebook.com/v3.1/dialog/oauth?',
		'facebook.com/v3.2/dialog/oauth?',
		'feedly.com/v3/auth/',
		'figma.com/start_google_sso',
		'hangouts.google.com/webchat/u/0/frame',
		'identity.linuxfoundation.org/cas/login',
		'mail.google.com/mail',
		'manychat.com/fb?popup',
		'messenger.com/videocall',
		'notion.so/googlepopupredirect',
		'officeapps.live.com',
		'spikenow.com/s/account',
		'zoom.us/office365',
	];

	app.on('web-contents-created', (webContentsCreatedEvent, contents) => {
		if (contents.getType() !== 'webview') return;

		// 阻止深度链接
		contents.on('will-navigate', (event, url) => {
			if (url.slice(0, 8) === 'slack://') {
				event.preventDefault();
			}
		});

		// 新窗口处理器
		contents.on(
			'new-window',
			(
				event,
				url,
				frameName,
				disposition,
				options,
				additionalFeatures,
				referrer,
				postBody,
			) => {
				handleNewWindow(event, url, options, allowPopUp);
			},
		);

		contents.on('did-create-window', (win, details) => {
			win.center();

			if (!['about:blank', 'about:blank#blocked'].includes(details.url)) return;

			let once = false;
			win.webContents.on('will-navigate', (e, nextURL) => {
				if (once) return;
				if (['about:blank', 'about:blank#blocked'].includes(nextURL)) return;

				once = true;
				const allow = allowPopUp.some((allowed) => nextURL.includes(allowed));

				if (allow) {
					return win.show();
				}
				shell.openExternal(nextURL);
				win.close();
			});
		});
	});
};

// 处理新窗口
const handleNewWindow = (event, url, options, allowPopUp) => {
	if (['about:blank', 'about:blank#blocked'].includes(url)) {
		event.preventDefault();
		Object.assign(options, { show: false });

		const win = new BrowserWindow(options);
		win.center();

		let once = false;
		win.webContents.on('will-navigate', (e, nextURL) => {
			if (once) return;
			if (['about:blank', 'about:blank#blocked'].includes(nextURL)) return;

			once = true;
			const allow = allowPopUp.some((allowed) => nextURL.includes(allowed));

			if (allow) {
				return win.show();
			}
			shell.openExternal(nextURL);
			win.close();
		});

		event.newGuest = win;
		return;
	}

	const allow = allowPopUp.some((allowed) => url.includes(allowed));
	if (allow) return;

	shell.openExternal(url);
	event.preventDefault();
};

// 设置 WebView 安全策略
const setupWebViewSecurity = () => {
	app.on('web-contents-created', (event, contents) => {
		require('@electron/remote/main').enable(contents);

		const contextMenuWebContentsDispose = contextMenu({
			window: contents,
			showCopyImageAddress: true,
			showSaveImage: false,
			showSaveImageAs: true,
		});

		// 设置请求头
		contents.session.webRequest.onBeforeSendHeaders(
			{
				urls: ['https://accounts.google.com/', 'https://accounts.google.com/*'],
			},
			(details, callback) => {
				details.requestHeaders['User-Agent'] =
					'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0';
				callback({ requestHeaders: details.requestHeaders });
			},
		);

		// 防止 WebView 使用 nodeIntegration
		contents.on('will-attach-webview', (event, webPreferences) => {
			webPreferences.nodeIntegration = false;
		});

		contents.on('destroyed', () => {
			contextMenuWebContentsDispose();
		});
	});
};

// 应用事件监听器
const setupAppEventListeners = () => {
	// 应用准备就绪
	app.on('ready', () => {
		try {
			require('@electron/remote/main').initialize();

			if (config.get('master_password')) {
				createMasterPasswordWindow();
			} else {
				createWindow();
			}
		} catch (error) {
			console.error('应用启动失败:', error);
			app.quit();
		}
	});

	// 所有窗口关闭
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	// 激活事件 (仅 macOS)
	app.on('activate', () => {
		if (mainWindow === null && mainMasterPasswordWindow === null) {
			if (config.get('master_password')) {
				createMasterPasswordWindow();
			} else {
				createWindow();
			}
		}

		if (mainWindow !== null) {
			mainWindow.show();
		}
	});

	// 退出前
	app.on('before-quit', () => {
		isQuitting = true;
	});
};

// 初始化应用
const initializeApp = () => {
	try {
		// 设置数据路径
		setupDataPaths();

		// 设置命令行参数
		setupCommandLineArgs();

		// 设置应用属性
		setupAppProperties();

		// 设置自动启动
		setupAutoLaunch();

		// 设置代理认证
		setupProxyAuth();

		// 设置单实例锁
		setupSingleInstance();

		// 设置 IPC 监听器
		setupIpcListeners();

		// 设置 WebView 处理器
		setupWebViewHandlers();

		// 设置 WebView 安全策略
		setupWebViewSecurity();

		// 设置应用事件监听器
		setupAppEventListeners();

		// 禁用 GPU 加速 (Linux)
		if (config.get('disable_gpu')) {
			app.disableHardwareAcceleration();
		}
	} catch (error) {
		console.error('应用初始化失败:', error);
		app.quit();
	}
};

// 启动应用
initializeApp();
