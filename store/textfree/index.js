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
  parseElement(element).then();
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
  parseElement(newChild).then();
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
    if (className === 'native-textarea sc-ion-textarea-md') {
      inputHandler(element);
      inputLanguageHandler(element).then();
    }
    if (className === 'chat-conversation-input') {
      setTimeout(() => {
        responseMessageHandler(element);
      }, 1000);
    }
    if (className === 'send-message--button') {
      buttonHandler(element);
    }
    if (className === 'address-left__common') {
      setTimeout(() => {
        chatLanguageHandler(element).then();
      }, 100);
    }
    if (className.includes('text-item')) {
      setTimeout(() => {
        receiveMessagesHandler(element).then();
      }, 100);
    }
  }
};

/**
 * 消息发送框处理
 * @param input
 */
const inputHandler = (input) => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keyup', inputKeydownHandler, true);
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
 * 消息发送语种提示处理
 * @param element
 */
const inputLanguageHandler = async (element) => {
  try {
    helloworld.sendLanguage = globalLanguageHandler('send');
    element.setAttribute('helloworld-id', 'helloworld-sendLanguage');
    element.setAttribute('placeholder', helloworld.sendLanguage);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息接收语种提示处理
 * @param element
 */
const chatLanguageHandler = async (element) => {
  try {
    let chatLanguage = document.querySelector('.helloworld-chatLanguage');
    if (!chatLanguage) {
      let div = document.createElement('div');
      div.className = 'helloworld-chatLanguage';
      helloworld.chatLanguage = div;
      element.parentNode.insertAdjacentElement('afterend', div);
      helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
    } else {
      helloworld.chatLanguage = chatLanguage;
      helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息翻译返回状态处理
 * @param element
 */
const responseMessageHandler = (element) => {
  try {
    let responseMessage = document.querySelector('.helloworld-responseMessage');
    if (!responseMessage) {
      let div = document.createElement('div');
      div.className = 'helloworld-responseMessage';
      div.style.cssText = 'font-size:13px;';
      div.innerHTML = '';
      helloworld.responseMessage = div;
      element.insertAdjacentElement('beforebegin', div);
    } else {
      helloworld.responseMessage = responseMessage;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送框回车事件处理
 * @param evt
 */
const inputKeydownHandler = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          sendMessageHandler().then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----输入框回车发送错误!-----${e}`);
  }
};

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
        sendMessageHandler().then();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};

/**
 * 消息发送翻译处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async (btn) => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    let text = sendMessageTextHandler(input);
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text)) {
      let data = {
        q: text, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage('翻译消息中...');
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code === 200) {
          setResponseMessage('');
          input.value = response.text;
          window.fireMessageInput(input);
          setTimeout(() => {
            if (isContainChinese(input.value)) {
              //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
              if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
                button.click();
              } else {
                //开启了中文发送 通过中文检测
                if (param.includeZh) {
                  button.click();
                } else {
                  //未开启中文发送 翻译结果内包含中文阻止发送
                  setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                }
              }
            } else {
              button.click();
            }
          }, 20);
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
        }
      });
    } else {
      button.click();
      window.sendLock = false;
    }
  } catch (e) {
    //出现错误 解锁发送锁定
    window.sendLock = false;
    console.error(e);
  }
};
/**
 * 接收消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async (element) => {
  try {
    if (element !== null) {
      let message = receiveMessageTextHandler(element);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        let translationMsg = element.parentNode.querySelector("div[class='helloworld-translation-message']");
        if (!translationMsg) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message';
          div.style.cssText = 'color: var(--helloworldColor);font-size: var(--helloworldSize);background: aliceblue;hyphens: manual;border-radius: 12px;padding: 10px 12px;text-align: left;letter-spacing: 0;line-height: 21px;width: 100%;display: block;';
          element.insertAdjacentElement('afterend', div);
        } else {
          div = translationMsg;
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
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message)) || (isContainChinese(message) && param.includeZh)) {
              //群组消息并且开启了自动群组翻译
              autoTranslationHandler(param, data, div);
            } else {
              div.innerHTML = '';
            }
          } else {
            div.innerHTML = '';
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 自动翻译接收消息处理
 * @param param
 * @param data
 * @param element
 */
const autoTranslationHandler = (param, data, element) => {
  try {
    element.innerHTML = '正在翻译消息中...';
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        element.innerHTML = response.text;
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
 * 手动翻译接收消息处理
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
 * 发送消息读取文本处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
const sendMessageTextHandler = (input) => {
  try {
    return input.value;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = (textEle) => {
  return textEle.innerHTML;
};

/**
 * 消息翻译返回状态显示
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
 * 更新全局翻译参数
 * @param data
 */
window.updateGlobalTranslationParam = async (data) => {
  try {
    window.helloworld.data = data;
    setTimeout(async () => {
      let elementList = document.querySelectorAll(".text-item");
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }, 1000);
    await updateGlobalInputLanguage();
  } catch (e) {
    console.error(e);
  }
};

/**
 * 更新全局翻译语种提示
 */
const updateGlobalInputLanguage = async () => {
  try {
    let sendLanguageText = globalLanguageHandler('send');
    let chatLanguageText = globalLanguageHandler('message');
    if (helloworld.input) {
      helloworld.sendLanguage = sendLanguageText;
      helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 获取全局翻译语种提示
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
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("textarea[class='native-textarea sc-ion-textarea-md']");
    if (input) {
      window.helloworld.focusWebView();
      input.value = message;
      window.fireMessageInput(input);
      setTimeout(() => {
        let button = document.querySelector("button[class='send-message--button']");
        if (button) sendMessageHandler(button);
      }, 50);
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
  const e = document.querySelectorAll('.dot');
  for (let n = 0; n < e.length; n++) {
    t += 1;
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
  let ads = document.querySelectorAll('.ads');
  for (let n = 0; n < ads.length; n++) {
    if (ads[n]) {
      ads[n].style.cssText = 'display: none;';
    }
  }
};
window.setInterval(updateBadge, 2000);
0;
