Ext.define('HelloWorld.store.ServicesList', {
	extend: 'Ext.data.Store',
	alias: 'store.serviceslist',

	requires: ['Ext.data.proxy.LocalStorage'],

	model: 'HelloWorld.model.ServiceList',

	proxy: {
		type: 'memory',
	},

	sorters: [
		{
			property: 'number',
			direction: 'ASC',
		},
	],

	autoLoad: true, // 改回 true，自动加载
	autoSync: true,
	pageSize: 100000,

	// 构造函数中初始化数据
	constructor: function (config) {
		console.log('ServicesList constructor called');

		// 先设置初始数据
		const storeServices = this.loadStoreServices();
		console.log('Loaded services:', storeServices.length);

		// 设置配置中的数据
		config = config || {};
		config.data = storeServices;

		// 调用父类构造函数
		this.callParent([config]);
	},

	// 从 store 目录动态加载服务数据
	loadStoreServices() {
		console.log('开始加载 store 服务数据...');

		try {
			let fs = require('fs');
			let path = require('path');
			// 尝试不同的路径策略
			let storeDir;
			const possiblePaths = [
				path.join(process.cwd(), 'store'),
				path.join(__dirname, '../../store'),
				path.join(__dirname, '../../../store'),
				'./store',
				'../store',
				'../../store',
			];

			for (const possiblePath of possiblePaths) {
				try {
					if (fs.existsSync(possiblePath)) {
						storeDir = possiblePath;
						console.log('找到 store 目录:', storeDir);
						break;
					}
				} catch (e) {
					// 继续尝试下一个路径
				}
			}

			if (!storeDir) {
				console.warn('无法找到 store 目录，尝试的路径:', possiblePaths);
				return [];
			}

			const storeServices = [];

			try {
				const folders = fs
					.readdirSync(storeDir, { withFileTypes: true })
					.filter((dirent) => dirent.isDirectory())
					.map((dirent) => dirent.name);

				console.log('找到文件夹:', folders);

				// 如果没有子目录，返回空数组
				if (folders.length === 0) {
					console.warn('Store 目录为空:', storeDir);
					return [];
				}

				for (const folder of folders) {
					const packageJsonPath = path.join(storeDir, folder, 'package.json');

					console.log('检查文件:', packageJsonPath);

					if (fs.existsSync(packageJsonPath)) {
						try {
							const packageData = JSON.parse(
								fs.readFileSync(packageJsonPath, 'utf8'),
							);

							console.log('解析 package.json:', folder, packageData);

							const serviceData = {
								id: packageData.id,
								number: packageData.number,
								logo: packageData.logo,
								name: packageData.name,
								description: packageData.description || '',
								url: packageData.url,
								type: packageData.type,
								allow_popups: packageData.allow_popups || false,
								manual_notifications: packageData.manual_notifications || false,
								custom_domain: packageData.custom_domain || false,
								titleBlink: packageData.titleBlink || false,
								note: packageData.note || '',
								js_unread: '',
							};

							// 尝试读取 index.js 文件的完整内容作为 js_unread
							const indexJsPath = path.join(storeDir, folder, 'index.js');
							if (fs.existsSync(indexJsPath)) {
								try {
									const indexContent = fs.readFileSync(indexJsPath, 'utf8');
									console.log(`读取 ${folder}/index.js 文件`);

									// 直接将整个 index.js 文件内容设置为 js_unread
									serviceData.js_unread = indexContent;
									console.log(`成功读取 ${folder}/index.js 的完整内容`);
								} catch (indexError) {
									console.warn(`读取 ${folder}/index.js 时出错:`, indexError);
								}
							} else {
								console.log(`${folder}/index.js 文件不存在`);
							}

							storeServices.push(serviceData);
							console.log('成功加载服务:', serviceData.name);
						} catch (jsonError) {
							console.warn(`无法解析 ${folder}/package.json:`, jsonError);
						}
					} else {
						console.log('package.json 不存在:', packageJsonPath);
					}
				}
			} catch (readdirError) {
				console.error('读取目录失败:', readdirError);
				return [];
			}

			console.log('总共加载了', storeServices.length, '个服务');
			return storeServices;
		} catch (error) {
			console.error('loadStoreServices 发生错误:', error);
			return [];
		}
	},
});
