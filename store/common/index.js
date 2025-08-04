const { ipcRenderer } = require('electron');

window.ipcRenderer = ipcRenderer;

window.helloworld = {};

/**
 * 刷新当前应用页面
 */
ipcRenderer.on('reloadCurrentService', function (e) {
  ipcRenderer.sendToHost('helloworld.reloadCurrentService');
});
/**
 *开启当前应用页面开发工具
 */
ipcRenderer.on('DevToolsOpened', function (e) {
  ipcRenderer.sendToHost('helloworld.DevToolsOpened', true);
});
/**
 * 设置未读消息数
 * @param count
 */
window.helloworld.setUnreadCount = function (count) {
  ipcRenderer.sendToHost('helloworld.setUnreadCount', count);
};
/**
 * 清除未读消息数
 */
window.helloworld.clearUnreadCount = function () {
  ipcRenderer.sendToHost('helloworld.clearUnreadCount');
};
/**
 * 聚焦应用页面
 */
window.helloworld.focusWebView = function () {
  ipcRenderer.sendToHost('helloworld.focusWebView');
};
/**
 * 设置line cookie
 */
window.helloworld.setLineCookie = function () {
  ipcRenderer.sendToHost('helloworld.setLineCookie');
};
/**
 * 移除line cookie
 */
window.helloworld.removeLineCookie = function () {
  ipcRenderer.sendToHost('helloworld.removeLineCookie');
};

/**
 * 显示好友翻译设置面板
 * @param friendData
 * @param data
 */
window.helloworld.showFriendTranslationModal = function (friendData, data) {
  ipcRenderer.sendToHost('helloworld.showFriendTranslationModal', friendData, data);
};

/**
 * 上传底粉
 * @param friends
 */
window.helloworld.uploadInitialFriends = function (friends) {
  ipcRenderer.sendToHost('helloworld.uploadInitialFriends', friends);
};
/**
 * 上传新粉
 * @param friends
 */
window.helloworld.uploadNewFriends = function (friends) {
  ipcRenderer.sendToHost('helloworld.uploadNewFriends', friends);
};
/**
 * 发送在线状态
 * @param data
 */
window.helloworld.uploadOnlineState = function (data) {
  ipcRenderer.sendToHost('helloworld.uploadOnlineState', data);
};
/**
 * 发送心跳检测工单
 * @param data
 */
window.helloworld.sendHeartbeat = function (data) {
  ipcRenderer.sendToHost('helloworld.sendHeartbeat', data);
};
/**
 * 显示voice群发面板
 * @param number
 * @param phone
 */
window.helloworld.showGoogleVoiceMassSendView = function (number, phone) {
  ipcRenderer.sendToHost('helloworld.showGoogleVoiceMassSendView', number, phone);
};
/**
 * googlevoice发送群发
 * @param args
 */
window.helloworld.googleVoiceMassSendHandler = function (args) {
  ipcRenderer.sendToHost('helloworld.googleVoiceMassSendHandler', args);
};
window.helloworld.googleVoiceStopMassSend = function (phone) {
  ipcRenderer.sendToHost('helloworld.googleVoiceStopMassSend', phone);
};
/**
 * 同步联系人到客户端
 * @param a
 */
window.helloworld.syncContacts = function (a) {
  ipcRenderer.sendToHost('helloworld.syncContacts', a);
};

//发送锁
window.sendLock = false;

const _createElement = document.createElement;
const _appendChild = Node.prototype.appendChild;
const _insertBefore = Node.prototype.insertBefore;
const _removeChild = Node.prototype.removeChild;

document.createElement = function () {
  let createElement = window.helloworld.createElement;
  if (document.location.toString().includes('mail.google.com') || document.location.toString().includes('chat.google.com')) {
    googlechatParseElement(arguments[0]);
  }
  if (createElement) {
    return createElement(this, arguments, _createElement);
  } else {
    return _createElement.apply(this, arguments);
  }
};
Node.prototype.appendChild = function () {
  let appendChild = window.helloworld.appendChild;
  if (document.location.toString().includes('mail.google.com') || document.location.toString().includes('chat.google.com')) {
    googlechatParseElement(arguments[0]);
  }
  if (appendChild) {
    return appendChild(this, arguments, _appendChild);
  } else {
    return _appendChild.apply(this, arguments);
  }
};

Node.prototype.insertBefore = function () {
  let insertBefore = window.helloworld.insertBefore;
  if (document.location.toString().includes('mail.google.com') || document.location.toString().includes('chat.google.com')) {
    googlechatParseElement(arguments[0]);
  }
  if (insertBefore) {
    return insertBefore(this, arguments, _insertBefore);
  } else {
    return _insertBefore.apply(this, arguments);
  }
};

Node.prototype.removeChild = function () {
  let removeChild = window.helloworld.removeChild;
  if (document.location.toString().includes('mail.google.com') || document.location.toString().includes('chat.google.com')) {
    googlechatParseElement(arguments[0]);
  }
  if (removeChild) {
    return removeChild(this, arguments, _removeChild);
  } else {
    return _removeChild.apply(this, arguments);
  }
};

if (document.location.host.includes('ophjlpahpchlmihnnnihgmmeilfjmjjc')) initChromeAPI();

/**
 * line插件需要重写chrome插件API
 */
function initChromeAPI() {
  window.chrome.notifications = {
    onClicked: { addListener: function () {} },
    onClosed: { addListener: function () {} },
    create: function () {},
    clear: function () {},
    getAll: function () {},
    update: function () {},
  };
  if (window.chrome.tabs) {
    window.chrome.tabs = {
      getZoom: function () {
        return {
          then: function (func) {
            if (func) func();
          },
        };
      },
    };
  }
  window.chrome.action = {
    setBadgeText: function () {},
  };
  window.chrome.downloads = {
    download: async function (options) {
      window.saveAsFile(options.url, options.filename);
    },
    onChanged: {
      addListener: function (callback) {},
    },
  };
  window.chrome.cookies = {
    remove: function () {},
    getAll: function () {},
    getAllCookieStores: function () {},
    onChanged: { addListener: function () {} },
  };
}

/**
 * 初始化翻译参数
 * @param param
 */
window.initTranslationParam = (param) => {
  try {
    window.helloworld.data = param;
    //备注插件需要使用到服务器链接数据
    localStorage.setItem('tt_api', param.server);
    localStorage.setItem('user-token', param.token);
    localStorage.setItem('user_id', param.user_id);
    localStorage.setItem('email', param.email);
    localStorage.setItem('username', param.username);
    document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
    document.body.style.setProperty('--helloworldSize', param.fontSize + 'px'); //全局字体大小
    document.body.style.setProperty('--helloworldLineHeight', param.fontSize * 1.2 + 'px'); //全局字体行高
  } catch (e) {}
};
/**
 * 消息翻译处理
 * @param param
 * @param data
 * @param callback
 */
window.translationHandler = (param, data, callback) => {
  try {
    // 在window对象上存储Google翻译失败次数计数器
    if (!window.googleTranslationFailCount) {
      window.googleTranslationFailCount = 0;
    }

    // 初始化上次Google翻译检查时间
    if (!window.lastGoogleCheckTime) {
      window.lastGoogleCheckTime = 0;
    }

    // 保存原始翻译源
    const originalSource = param.source;
    const originalMessageTo = param.messageTo;

    // 如果是Google翻译且失败次数超过3次，则改用xiaoniu
    if (param.source === 'google' && window.googleTranslationFailCount >= 3) {
      console.log('Google翻译失败次数超过3次，自动切换为xiaoniu翻译');
      param.source = 'xiaoniu';
      if (param.messageTo === 'zh-TW') {
        param.messageTo = 'cht';
      }
    }
    // 改为小牛后，Google翻译失败次数计数器还是>=3 检查是否需要尝试恢复Google
    if (param.source === 'xiaoniu' && window.googleTranslationFailCount >= 3) {
      // 如果已经切换到xiaoniu，检查是否需要尝试恢复Google
      const now = Date.now();
      if (now - window.lastGoogleCheckTime > 1 * 60 * 1000) {
        // 1分钟检查一次
        window.lastGoogleCheckTime = now;

        // 创建一个测试请求来检查Google是否恢复
        setTimeout(() => {
          console.log('尝试检查Google翻译服务是否恢复...');
          const testParam = { ...param, source: 'google' };
          if (testParam.messageTo === 'cht') {
            testParam.messageTo = 'zh-TW';
          }

          httpsRequest(testParam, { q: 'test', send: false }, (response) => {
            if (response.code === 200) {
              console.log('Google翻译服务已恢复！');
              window.googleTranslationFailCount = 0;
              param.source = 'google';
              if (param.messageTo === 'cht') {
                param.messageTo = 'zh-TW';
              }
            } else {
              console.log('Google翻译服务仍未恢复');
            }
          });
        }, 100);
      }
    }
    let msgCache = queryMsgCache(param, data);
    if (msgCache) {
      msgCache = msgCache.replaceAll('\\n', '\n');
      callback({
        code: 200,
        text: msgCache,
        message: '翻译成功!',
      });
    } else {
      // 使用 Promise 包装 httpsRequest
      const requestPromise = new Promise((resolve, reject) => {
        httpsRequest(param, data, (response) => {
          if (response.code === 200) {
            // 如果是Google翻译成功，重置失败计数
            if (param.source === 'google') {
              window.googleTranslationFailCount = 0;
            }
            resolve(response);
          } else {
            // 如果是Google翻译失败，增加失败计数
            if (param.source === 'google') {
              window.googleTranslationFailCount++;
              console.log(`Google翻译失败，当前失败次数：${window.googleTranslationFailCount}`);
            }
            reject(new Error(response.message));
          }
        });
      });

      // 处理请求结果
      requestPromise
        .then((response) => {
          callback({
            code: 200,
            text: response.text,
            message: '翻译成功!',
          });
        })
        .catch((error) => {
          callback({
            code: 400,
            text: '',
            message: error.message || '翻译失败!',
          });
        });
    }
  } catch (e) {
    window.sendLock = false;
    console.error(e);
    callback({
      code: 400,
      text: '',
      message: '翻译处理错误: ' + e.message,
    });
  }
};
// 请求队列管理器
class RequestQueueManager {
  constructor(interval = 200) {
    this.interval = interval;
    this.queue = [];
    this.isProcessing = false;
    this.starttRequestTime = 0;
    this.endttRequestTime = 0;
  }

  /**
   * 添加请求到队列
   * @param {Function} requestFn - 请求函数
   * @returns {Promise} - 请求结果
   */
  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        requestFn,
        resolve,
        reject,
      });
      this.processQueue();
    });
  }

  /**
   * 处理队列
   */
  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.length > 0) {
      this.starttRequestTime = Date.now();
      console.log(`等待 200  ms 后发送下一个请求...`);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const { requestFn, resolve, reject } = this.queue.shift();
      try {
        // 在发送请求前更新最后请求时间
        this.endttRequestTime = Date.now();
        console.log(`开始处理请求，距离上次请求间隔: ${this.endttRequestTime - this.starttRequestTime}ms`);
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
      console.log(`请求处理完成，当前队列剩余: ${this.queue.length} 个请求`);
    }

    this.isProcessing = false;
  }
}

// 创建请求队列管理器实例，不指定间隔时间，它会使用默认的200  毫秒
const requestQueue = new RequestQueueManager();

/**
 * 向服务器请求翻译1
 * @param param
 * @param data
 * @param callback
 */
const httpsRequest = (param, data, callback) => {
  const requestFn = () => {
    return new Promise((resolve, reject) => {
      try {
        let xhr = new XMLHttpRequest();
        let method = 'POST';
        let url = `${param.server}/${param.source}/text?reqId=${randomId()}&clientId=0`;
        let reqData = {
          q: data.q,
          from: data.send ? param.sendFrom : param.messageFrom,
          to: data.send ? param.sendTo : param.messageTo,
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let token = window.helloworld.data.token;
        xhr.setRequestHeader('token', token);
        xhr.timeout = 5000;
        xhr.responseType = 'json';

        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
              if (xhr.response.code === 200) {
                let text = xhr.response.data.translation;
                setMsgCache(param, data, text);
                text = text.replaceAll('\\n', '\n');
                resolve({
                  code: 200,
                  text: text,
                  message: '翻译成功!',
                });
              } else {
                resolve({
                  code: 400,
                  text: '',
                  message: xhr.response.message,
                });
              }
            } else {
              resolve({
                code: 400,
                text: '',
                message: '翻译请求错误!错误码:' + xhr.status,
              });
            }
          }
        };

        xhr.onerror = () => {
          resolve({
            code: 400,
            text: '',
            message: '翻译请求错误!错误码:' + xhr.status,
          });
        };

        xhr.onabort = () => {
          resolve({
            code: 400,
            text: '',
            message: '翻译请求被停止!错误码:' + xhr.status,
          });
        };

        xhr.ontimeout = () => {
          resolve({
            code: 400,
            text: '',
            message: '翻译请求超时!错误码:' + xhr.status,
          });
        };

        xhr.send(encodeData(reqData));
      } catch (e) {
        reject(e);
      }
    });
  };

  // 将请求添加到队列
  requestQueue
    .add(requestFn)
    .then((result) => callback(result))
    .catch((error) => {
      console.error('请求失败:', error);
      callback({
        code: 400,
        text: '',
        message: '请求失败: ' + error.message,
      });
    });
};

/**
 * 模拟Ctrl+A全选
 * @param input
 */
window.selectAllText = (input) => {
  try {
    input.focus();
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(input);
      range.select();
    } else if (window.getSelection) {
      window.getSelection().selectAllChildren(input);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 模拟Ctrl+V粘贴
 * @param input
 * @param message
 */
window.pasteText = (input, message) => {
  try {
    const pasteEvent = Object.assign(
      new Event('paste', {
        bubbles: true,
        cancelable: true,
      }),
      {
        clipboardData: {
          dropEffect: 'none',
          effectAllowed: 'uninitialized',
          files: [],
          items: [],
          getData: () => message,
          types: ['text/plain'],
        },
      }
    );
    input.focus();
    input.dispatchEvent(pasteEvent);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 输入框事件
 * @constructor
 */
window.fireMessageInput = (input) => {
  if ('createEvent' in document) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    input.dispatchEvent(evt);
  } else input.fireEvent('input');
};
/**
 * 延迟函数
 * @returns {Promise<void>}
 */
window.helloworldSleep = async (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
var __memory__ = {};
var __memory_f__ = {};
function ReadTT(key) {
  var value = __memory__[key];
  if (value == null) {
    value = FileStorage.getItem(key);
    if (value) {
      __memory__[key] = value;
    }
  }
  return value;
}
function WriteTT(key, value) {
  __memory__[key] = value;
  FileStorage.setItem(key, value);
}

window.readFData = function (key) {
  var value = __memory_f__[key];
  if (value == null) {
    value = FriendStorage.getItem(key);
    if (value) {
      __memory_f__[key] = value;
    }
  }
  return value;
};
window.writeFData = function (key, value) {
  __memory_f__[key] = value;
  FriendStorage.setItem(key, value);
};
window.delFData = function (delKey) {
  __memory_f__[delKey] = null;
};
/**
 * 查询消息缓存
 * @param param
 * @param data
 * @returns {any}
 */
window.queryMsgCache = (param, data) => {
  try {
    let key = '';
    if (data.send) {
      key = `[${param.source}][${param.sendFrom}][${param.sendTo}][${data.q}]`;
    } else {
      key = `[${param.source}][${param.messageFrom}][${param.messageTo}][${data.q}]`;
    }
    return ReadTT(key);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 添加消息缓存
 * 例: 发送 "你好" 谷歌翻译返回 "hello" 会生成两条缓存 ["google"]["auto"]["en"]["你好]:"hello" 和 ["google"]["auto"]["zh"]["hello"]:"你好"
 * 例: 对方消息 "good" 谷歌翻译返回 "好的" 会生成一条缓存 ["google"]["auto"]["zh"]["good]:"好的"
 * @param param
 * @param data
 * @param text
 */
window.setMsgCache = (param, data, text) => {
  try {
    let sendKey = '';
    let translationKey = '';
    if (data.send) {
      sendKey = `[${param.source}][${param.sendFrom}][${param.sendTo}][${data.q}]`;
      translationKey = `[${param.source}][${param.messageFrom}][${param.messageTo}][${text}]`;
      WriteTT(sendKey, text);
      WriteTT(translationKey, data.q);
    } else {
      translationKey = `[${param.source}][${param.messageFrom}][${param.messageTo}][${data.q}]`;
      WriteTT(translationKey, text);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 空字符串检测
 * @param temp
 * @returns {boolean}
 */
window.isEmpty = (temp) => {
  return typeof temp == 'undefined' || temp == null || temp.trim() === '';
};
/**
 * 数字检测
 * @param temp
 * @returns {boolean}
 */
window.isNumber = (temp) => {
  return /^\d+$/.test(temp);
};
/**
 * 中文匹配
 * @param temp
 * @returns {boolean}
 */
window.isChinese = (temp) => {
  let re = /[^\u4e00-\u9fa5]/;
  return !re.test(temp);
};
/**
 * 日文匹配
 * @param temp
 * @returns {boolean}
 */
window.isJapanese = (temp) => {
  let re = /[^\u0800-\u4e00]/;
  return !re.test(temp);
};
/**
 * 是否包含日文
 * @param temp
 * @returns {boolean}
 */
window.isContainJapanese = (temp) => {
  let cnt = 0;
  for (let i = 0; i < temp.length; i++) {
    if (isJapanese(temp.charAt(i))) cnt++;
  }
  return cnt > 0;
};
/**
 * 是否包含中文
 * @param temp
 * @returns {boolean}
 */
window.isContainChinese = (temp) => {
  let cnt = 0;
  for (let i = 0; i < temp.length; i++) {
    if (isChinese(temp.charAt(i))) cnt++;
  }
  return cnt > 0;
};
/**
 * 参数编码处理
 * @param data
 * @returns {string}
 */
const encodeData = (data) => {
  let str = '';
  for (let name in data) {
    if (str === '') {
      str = name + '=' + encodeURIComponent(data[name]);
    } else {
      str = str + '&' + name + '=' + encodeURIComponent(data[name]);
    }
  }
  return str;
};
/**
 * 提取链接中的参数
 * @param url
 * @returns {{}}
 */
window.getQueryString = (url) => {
  let urlStr = url.split('?')[1];
  let obj = {};
  let paramsArr = urlStr.split('&');
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    let arr = paramsArr[i].split('=');
    obj[arr[0]] = arr[1];
  }
  return obj;
};
/**
 * 随机字符串
 * @param e
 * @returns {string}
 */
const randomId = (e) => {
  e = e || 5;
  var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
};

//数据存储
var FileStorage = { __cb__: {} };
var FriendStorage = { __cb__: {} };
if (ipcRenderer) {
  ipcRenderer.on('fileStorage.rsp', (event, key, value) => {
    let cblist = FileStorage.__cb__[key];
    if (cblist) {
      delete FileStorage.__cb__[key];
      for (let cb of cblist) {
        cb(key, value);
      }
    }
  });
  ipcRenderer.on('friendStorage.rsp', (event, key, value) => {
    let cblist = FriendStorage.__cb__[key];
    if (cblist) {
      delete FriendStorage.__cb__[key];
      for (let cb of cblist) {
        cb(key, value);
      }
    }
  });
}

FileStorage.getItem = function (key, callback) {
  if (ipcRenderer) {
    if (callback) {
      let cblist = FileStorage.__cb__[key];
      if (cblist == null) {
        cblist = [];
        FileStorage.__cb__[key] = cblist;
      }
      cblist.push(callback);
      ipcRenderer.send('fileStorage.get', key);
    } else {
      return ipcRenderer.sendSync('fileStorage.syncget', key);
    }
  }
};
FriendStorage.getItem = function (key, callback) {
  if (ipcRenderer) {
    if (callback) {
      let cblist = FriendStorage.__cb__[key];
      if (cblist == null) {
        cblist = [];
        FriendStorage.__cb__[key] = cblist;
      }
      cblist.push(callback);
      ipcRenderer.send('friendStorage.get', key);
    } else {
      return ipcRenderer.sendSync('friendStorage.syncget', key);
    }
  }
};
FileStorage.setItem = function (key, value) {
  if (ipcRenderer) {
    ipcRenderer.send('fileStorage.set', key, value);
  }
};
FriendStorage.setItem = function (key, value) {
  if (ipcRenderer) {
    ipcRenderer.send('friendStorage.set', key, value);
  }
};
window.FileStorage = FileStorage;
window.FriendStorage = FriendStorage;
(function (xhr) {
  var XHR = XMLHttpRequest.prototype;
  var open = XHR.open;
  var send = XHR.send;
  var setRequestHeader = XHR.setRequestHeader;
  XHR.open = function (method, url) {
    this._url = url;
    this._requestHeaders = {};
    this._startTime = new Date().toISOString();
    return open.apply(this, arguments);
  };
  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value;
    return setRequestHeader.apply(this, arguments);
  };
  XHR.send = function (postData) {
    this.addEventListener('load', function () {
      var myUrl = this._url ? this._url.toLowerCase() : this._url;
      if (myUrl) {
        if (postData) {
          if (typeof postData === 'string') {
            try {
              this._requestHeaders = postData;
            } catch (err) {
              console.error(err);
            }
          } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
            // do something if you need
          }
        }
        try {
          //个人信息
          if (this._url.includes('/voice/v1/voiceclient/api2thread/sendsms')) {
            ipcRenderer.sendToHost('helloworld.googleVoiceSms', JSON.parse(postData)[10]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
    return send.apply(this, arguments);
  };
})(XMLHttpRequest);

window.googlechatSendLock = false;
window.addEventListener(
  'message',
  function (e) {
    if (e.origin !== 'https://mail.google.com') return;
    if (e.data && e.data.includes('helloworld')) {
      window.helloworld.data = JSON.parse(e.data).helloworld;
      localStorage.setItem('translationData', JSON.stringify(window.helloworld.data));
    }
  },
  false
);
window.googlechatTime = 0;
function googlechatParseElement(element) {
  try {
    let className = element.className;
    if (className && className.includes) {
      if (className.includes('BCL84c aM97s yMq6re ZCbGl zmXnlc')) {
        // clearInterval(window.googlechatTime);
        window.parent.postMessage('request-data', 'https://mail.google.com');
        window.googlechatTime = setInterval(() => {
          let translationData = localStorage.getItem('translationData');
          if (!translationData) {
            window.parent.postMessage('request-data', 'https://mail.google.com');
          } else {
            element.style.setProperty('--helloworldColor', window.helloworld.data.fontColor); //全局字体颜色
            element.style.setProperty('--helloworldSize', window.helloworld.data.fontSize.concat('px')); //全局字体大小
            element.style.setProperty('--helloworldLineHeight', `${window.helloworld.data.fontSize * 1.2}px`);
          }
          googlechatReceiveMessagesHandler(element);
          let input = element.querySelector('.editable');
          let inputLanguageTip = element.querySelector("div[class*='snByac']");
          let sendButton = element.querySelector("button[class*='VYBDae-Bz112c-LgbsSe nZGldc zFe2Ef m7Rhac OUxThb']");
          let responseMessage = element.querySelector('.PhFuQe.q0xFib.yXgmRe.qs41qe');
          if (input) {
            googlechatInputHandler(input);
          }
          if (sendButton) {
            googlechatButtonHandler(sendButton);
          }
          if (inputLanguageTip) {
            googlechatInputLanguageHandler(inputLanguageTip);
          }
          if (responseMessage) {
            if (!document.querySelector('.helloworld-responseMessage')) {
              let div = document.createElement('div');
              div.className = 'helloworld-responseMessage';
              div.setAttribute('helloworld-id', 'helloworld-responseMessage');
              div.innerText = '';
              window.helloworld.responseMessage = div;
              responseMessage.insertAdjacentElement('beforebegin', div);
            }
          }
          let t = 0;
          const e = document.querySelectorAll('div[class*="PIw6Oe EdWvwd FVKzAb gNUj0e"]');
          for (let n = 0; n < e.length; n++) {
            t += 1;
          }
          t && t >= 1 ? helloworld.setUnreadCount(t/2) : helloworld.clearUnreadCount();
        }, 3000);
      }
    }
  } catch (e) {
    console.error(e);
  }
}
const googlechatInputHandler = (input) => {
  try {
    window.helloworld.input = input;
    window.helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    window.helloworld.input.addEventListener('keydown', googlechatInputKeydownHandler, true);
  } catch (e) {
    console.error(e);
  }
};
const googlechatButtonHandler = (button) => {
  try {
    window.helloworld.sendButton = button;
    window.helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton');
    window.helloworld.sendButton.addEventListener('click', googlechatSendButtonClickHandler, true);
  } catch (e) {
    console.error(e);
  }
};
const googlechatInputLanguageHandler = (element) => {
  try {
    window.helloworld.sendLanguage = element;
    window.helloworld.sendLanguage.style.cssText = 'font-size:12px;';
    if (window.helloworld.data.send) {
      window.helloworld.sendLanguage.innerText = `[全局] 发送消息 [${window.helloworld.data.sourceLabel}] ${window.helloworld.data.sendFromLabel} => ${window.helloworld.data.sendToLabel}`;
    } else {
      window.helloworld.sendLanguage.innerText = `[全局] 发送消息 [${window.helloworld.data.sourceLabel}] 翻译关闭`;
    }
  } catch (e) {
    console.error(e);
  }
};
function googlechatReceiveMessagesHandler(element) {
  try {
    let messageList = element.querySelectorAll("div[class='Zc1Emd QIJiHb']");
    for (let element of messageList) {
      googlechatReceiveMessages(element);
    }
  } catch (e) {
    console.error(e);
  }
}
function googlechatReceiveMessages(element) {
  try {
    let message = element.innerText;
    if (!isEmpty(message) && !isNumber(message)) {
      let tt_div = element.parentNode.querySelector("div[class='helloworld-translation-message selectable-text Zc1Emd QIJiHb']");
      let div;
      let param = window.helloworld.data;
      if (!tt_div) {
        div = document.createElement('div');
        div.className = 'helloworld-translation-message selectable-text Zc1Emd QIJiHb';
        element.insertAdjacentElement('afterend', div);
        div.style.cssText = `display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);margin-top:-20px;`;
      } else {
        div = tt_div;
      }
      let data = {
        q: message, //接收的消息文本
        send: false, //是否发送翻译
      };
      let msgCache = queryMsgCache(param, data);
      if (msgCache) {
        msgCache = msgCache.replaceAll('\\n', '\n');
        div.innerHTML = msgCache;
      } else {
        //开启了消息翻译
        if (param.message) {
          div.innerHTML = '正在翻译消息中...';
          //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
          if (
            !isContainChinese(message) ||
            (isContainJapanese(message) && isContainChinese(message) && (param.sendTo === 'ja' || param.sendTo === 'jp')) ||
            (isContainChinese(message) && param.includeZh)
          ) {
            //私人消息
            googlechatAutoTranslationHandler(param, data, div);
          } else {
            div.innerHTML = '';
          }
        } else {
          div.innerHTML = '';
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}
const googlechatAutoTranslationHandler = (param, data, element) => {
  try {
    element.innerHTML = '正在翻译消息中...';
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        element.innerHTML = response.text;
      } else {
        let errorButton = document.createElement('button');
        errorButton.innerHTML = `<u style="color: var(--danger)">${response.message}</u>`;
        errorButton.addEventListener('click', function () {
          googlechatAutoTranslationHandler(param, data, element);
        });
        element.innerHTML = '';
        element.appendChild(errorButton);
      }
    });
  } catch (e) {
    console.error(e);
  }
};
function googlechatInputKeydownHandler(evt) {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        googlechatSendMessageHandler(evt);
      }
    }
  } catch (e) {
    console.error(`-----输入框回车发送错误!-----${e}`);
  }
}
function googlechatSendButtonClickHandler(evt) {
  try {
    if (evt.isTrusted) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      googlechatSendMessageHandler(evt);
    }
  } catch (e) {
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
}
function googlechatSetResponseMessage(text, color) {
  try {
    if (window.helloworld.responseMessage) {
      window.helloworld.responseMessage.style.color = color || 'var(--helloworldColor)';
      window.helloworld.responseMessage.innerText = text;
    }
  } catch (e) {
    console.error(e);
  }
}
function googlechatSendMessageHandler(evt) {
  try {
    googlechatSetResponseMessage('');
    let input = window.helloworld.input;
    let button = window.helloworld.sendButton;
    let text = input.innerText;
    let param = window.helloworld.data;
    if (param.send && !window.isEmpty(text) && !window.isNumber(text)) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      googlechatSetResponseMessage('翻译消息中...');
      window.translationHandler(param, data, async function (response) {
        if (response.code == 200) {
          input.innerText = response.text;
          fireMessageInput(input);
          let checkTranslationText = input.innerText;
          if (window.isContainChinese(checkTranslationText)) {
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              button.click();
              googlechatSetResponseMessage('');
            } else {
              if (param.includeZh) {
                button.click();
                googlechatSetResponseMessage('');
              } else {
                googlechatSetResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
              }
            }
          } else {
            button.click();
            googlechatSetResponseMessage('');
          }
        } else {
          googlechatSetResponseMessage(`${response.message}`, 'var(--danger)');
          console.error(`${response.message}`);
        }
      });
    } else {
      button.click();
    }
  } catch (e) {
    console.error(e);
  }
}
