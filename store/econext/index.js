'use strict';
/**
 * 页面元素添加
 * @param thisObj
 * @param args
 * @param _appendChild
 * @returns {*}
 */
helloworld.appendChild = (thisObj, args, _appendChild) => {
  let element = args[0];
  setTimeout(() => {
    parseElement(element).then();
  }, 5);
  return _appendChild.call(thisObj, element);
};
/**
 * 页面元素插入
 * @param thisObj
 * @param args
 * @param _insertBefore
 * @returns {*}
 */
helloworld.insertBefore = (thisObj, args, _insertBefore) => {
  let newChild = args[0];
  let refChild = args[1];
  setTimeout(() => {
    parseElement(newChild).then();
  }, 5);
  return _insertBefore.call(thisObj, newChild, refChild);
};
/**
 * 页面元素监听
 * @param element
 * @returns {Promise<void>}
 */
const parseElement = async (element) => {
  let className = element.className;
  if (className && className.includes) {
    if (className.includes('chat-editor')) {
      inputHandler(element);
    }
    if (className.includes('chat-foot')) {
      let sendBtn = element.querySelector("div[class='send-btn']");
      if (sendBtn) buttonHandler(sendBtn);
      inputLanguageHandler(element);
      responseMessageHandler(element);
    }
    if (className === 'msg-container') {
      chatLanguageHandler(element);
    }
    if (className.includes('text-box')) {
      receiveMessagesHandler(element);
    }
  }
};
/**
 * 消息输入框处理
 * @param input
 */
const inputHandler = (input) => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('id', 'helloworld-input');
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送按钮处理
 * @param button
 */
const buttonHandler = (button) => {
  try {
    helloworld.sendButton = button;
    helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton');
    helloworld.sendButton.addEventListener('click', sendButtonClickHandler, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 输入框语种提示处理
 * @param element
 */
const inputLanguageHandler = (element) => {
  try {
    let sendLanguage = document.querySelector('.helloworld-sendLanguage');
    if (!sendLanguage) {
      helloworld.sendLanguage = document.createElement('span');
      helloworld.sendLanguage.className = 'tip helloworld-sendLanguage';
      helloworld.sendLanguage.setAttribute('data-v-6f71db3a', '');
      element.insertAdjacentElement('afterbegin', helloworld.sendLanguage);
    }
    if (helloworld.sendLanguage) {
      helloworld.sendLanguage.innerHTML = globalLanguageHandler('send');
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 聊天页面
 * 接收消息
 * 翻译语种提示处理
 * @param element
 */
const chatLanguageHandler = (element) => {
  try {
    helloworld.chatLanguage = document.createElement('div');
    helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
    helloworld.chatLanguage.style.cssText = 'color: rgb(var(--ig-secondary-text));font-size:13px;margin-top:5px;';
    element.insertAdjacentElement('afterbegin', helloworld.chatLanguage);
    helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
  } catch (e) {
    console.error(e);
  }
};
/**
 * 翻译接口返回消息处理
 * @param element
 */
const responseMessageHandler = (element) => {
  try {
    let div = document.createElement('div');
    div.setAttribute('helloworld-id', 'helloworld-responseMessage');
    div.style.cssText = 'margin-left:15px;color:var(--helloworldColor);';
    div.innerHTML = '';
    helloworld.responseMessage = div;
    element.insertAdjacentElement('beforebegin', div);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 消息输入框回车事件处理
 * @param evt
 */
document.addEventListener(
  'keydown',
  function (evt) {
    try {
      if (!event.ctrlKey && !event.metaKey && evt.key === 'Enter' && evt.target.id === 'helloworld-input') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          sendMessageHandler();
        }
      }
    } catch (e) {
      window.sendLock = false;
      console.error(`-----输入框回车发送错误!-----${e}`);
    }
  },
  true
);

/**
 * 消息发送按钮点击事件
 * @param evt
 */
const sendButtonClickHandler = (evt) => {
  try {
    if (evt.isTrusted) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      if (!window.sendLock) {
        window.sendLock = true;
        sendMessageHandler();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};
/**
 * 文本消息发送处理
 */
const sendMessageHandler = (btn) => {
  try {
    //发送前清空请求翻译提示文本
    setResponseMessage('');
    let param = helloworld.data;
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    //未开启消息翻译直接发送
    if (!param.send) {
      window.sendLock = false;
      button.click();
    } else {
      let text = sendMessageTextHandler(input);
      //消息文本为空、纯数字、纯表情 直接发送
      if (isEmpty(text) || isNumber(text) || (text.includes('[') && text.includes(']'))) {
        window.sendLock = false;
        button.click();
      } else {
        let data = {
          q: text, //待翻译文本
          send: true, //是否为发送消息
        };
        setResponseMessage('翻译消息中...');
        translationHandler(param, data, function (response) {
          if (response.code == 200) {
            setResponseMessage('');
            input.innerHTML = response.text;
            window.fireMessageInput(input);
            setTimeout(()=>{
              //检测是翻译接口返回文本否包含中文
              if (isContainChinese(input.innerHTML)) {
                //开启了发送中文消息 翻译接口返回的文本检测到包含中文 直接发送
                if (param.includeZh) {
                  button.click();
                  window.sendLock = false;
                } else {
                  //未开启发送中文消息 翻译接口返回的文本检测到包含中文 阻止发送
                  setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                  window.sendLock = false;
                }
              } else {
                button.click();
                window.sendLock = false;
              }
            },100)
          } else {
            setResponseMessage(`${response.message}`, 'red');
            window.sendLock = false;
          }
        });
      }
    }
  } catch (e) {
    //出现错误 解锁发送锁定
    window.sendLock = false;
    console.error(e);
  }
};
/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = (element) => {
  try {
    let isGroup = isGroupMessage();
    let message = receiveMessageTextHandler(element);
    if (!isEmpty(message) && message.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '') && !isNumber(message)) {
      let div;
      let param = helloworld.data;
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      if (!element.parentNode.querySelector("div[class='helloworld-translation-message text-box']")) {
        div = document.createElement('div');
        div.className = 'helloworld-translation-message text-box';
        div.setAttribute('data-v-9fc6c348', '');
      } else {
        div = element.parentNode.querySelector("div[class='helloworld-translation-message text-box']");
      }
      div.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);user-select: text;margin-top: -10px;';
      element.insertAdjacentElement('afterend', div);
      let data = {
        q: message, //文本
        send: false, //自己发送
      };
      let msgCache = queryMsgCache(param, data);
      if (msgCache) {
        msgCache = msgCache.replaceAll('\\n', '<br>').replaceAll('\n', '<br>');
        div.innerHTML = msgCache;
      } else {
        //开启了消息翻译
        if (param.message) {
          div.innerHTML = '正在翻译消息中...';
          //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
          if (
            !isContainChinese(message) ||
            (isContainChinese(message) && isContainJapanese(message) && (param.sendTo === 'ja' || param.sendTo === 'jp')) ||
            (isContainChinese(message) && param.includeZh)
          ) {
            //群组消息并且开启了自动群组翻译
            if (isGroup) {
              if (param.group) {
                autoTranslationHandler(param, data, div);
              } else {
                clickTranslationHandler(param, data, div);
              }
            } else {
              //私人消息
              autoTranslationHandler(param, data, div);
            }
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
};
/**
 * 自动翻译接收的消息处理
 * @param param
 * @param data
 * @param element
 */
const autoTranslationHandler = (param, data, element) => {
  try {
    element.innerHTML = '正在翻译消息中...';
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        let text = response.text;
        text = text.replaceAll('\\n', '<br>').replaceAll('\n', '<br>');
        element.innerHTML = text;
      } else {
        let errorButton = document.createElement('button');
        errorButton.innerHTML = `<u style="color: var(--danger)">${response.message}</u>`;
        errorButton.addEventListener('click', function () {
          autoTranslationHandler(param, data, element);
        });
        element.innerHTML = '';
        element.appendChild(errorButton);
      }
    });
  } catch (e) {
    console.error(e);
  }
};
/**
 * 手动翻译接收的消息处理
 * @param param
 * @param data
 * @param element
 */
const clickTranslationHandler = (param, data, element) => {
  let button = document.createElement('button');
  button.innerHTML = '<u>点击翻译</u>';
  button.addEventListener('click', function () {
    autoTranslationHandler(param, data, element);
  });
  element.innerHTML = '';
  element.appendChild(button);
};
/**
 * 发送消息原文处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
const sendMessageTextHandler = (input) => {
  try {
    return input.innerText;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = (element) => {
  let message = '';
  let childNodes = Array.from(element.childNodes);
  childNodes.forEach((element) => {
    if (element.nodeName === 'SPAN') {
      message += `${element.innerText}`;
    }
    if (element.nodeName === 'BR') {
      message += '\n';
    }
  });
  return message;
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    let activeChat = document.querySelector("div[class='menu-item active']");
    if (activeChat) {
      let labelName = activeChat.querySelector('span[class="menu-label"]');
      return labelName.innerText === 'Group chat';
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 设置翻译返回状态文本
 */
const setResponseMessage = (text, color) => {
  try {
    if (helloworld.responseMessage) {
      helloworld.responseMessage.style.color = color || 'var(--helloworldColor)';
      helloworld.responseMessage.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 设置文件翻译返回状态文本
 * @param text
 * @param color
 */
const setFileResponseMessage = (text, color) => {
  try {
    if (helloworld.fileResponseMessage) {
      helloworld.fileResponseMessage.style.color = color || 'var(--helloworldColor)';
      helloworld.fileResponseMessage.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 全局语种提示
 * @param type
 */
const globalLanguageHandler = (type) => {
  try {
    if (type === 'send') {
      let enable_text = `[全局] 发送消息 [${helloworld.data.sourceLabel}] ${helloworld.data.sendFromLabel} => ${helloworld.data.sendToLabel}`;
      let disable_text = `[全局] 发送消息 [${helloworld.data.sourceLabel}] 翻译关闭`;
      if (helloworld.data.send) {
        return enable_text;
      } else {
        return disable_text;
      }
    } else if (type === 'message') {
      let enable_text = `[全局] 接收消息 [${helloworld.data.sourceLabel}] ${helloworld.data.messageFromLabel} => ${helloworld.data.messageToLabel}`;
      let disable_text = `[全局] 接收消息 [${helloworld.data.sourceLabel}] 翻译关闭`;
      if (helloworld.data.message) {
        return enable_text;
      } else {
        return disable_text;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 更新全局翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateGlobalTranslationParam = async (data) => {
  try {
    window.helloworld.data = data;
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.text-box');
      for (let element of elementList) {
        if (element.className != 'helloworld-translation-message text-box') {
          receiveMessagesHandler(element);
        }
      }
    }, 1000);
    await updateGlobalInputLanguage();
  } catch (e) {
    console.error(e);
  }
};

window.deleteFriendTranslationParam = (friendId) => {
  try {
    window.delFData(friendId);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 更新全局语种提示
 */
const updateGlobalInputLanguage = async () => {
  try {
    let sendLanguageText = globalLanguageHandler('send');
    let chatLanguageText = globalLanguageHandler('message');
    if (helloworld.sendLanguage) {
      helloworld.sendLanguage.innerHTML = sendLanguageText;
    }
    if (helloworld.chatLanguage) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("div[class='chat-editor']");
    if (input) {
      window.helloworld.focusWebView();
      input.focus();
      setTimeout(() => {
        input.innerHTML = message;
        window.fireMessageInput(input);
        setTimeout(() => {
          sendMessageHandler();
        }, 20);
      }, 30);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 未读消息监控
 */
const updateBadge = () => {
  let t = 0;
  const e = document.querySelectorAll("span[class='badge']");
  for (let n = 0; n < e.length; n++) {
    t += parseInt(e[n].innerHTML);
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);

0;
