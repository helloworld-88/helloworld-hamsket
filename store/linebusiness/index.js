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
  }, 100);
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
  }, 100);
  return _insertBefore.call(thisObj, newChild, refChild);
};
/**
 * 页面元素监听
 * @param element
 * @returns {Promise<void>}
 */
const parseElement = async element => {
  let element_nodeName = element.nodeName;
  if (element_nodeName === 'A') {
    element.target = '_self';
  }
  let className = element.className;
  if (className && className.includes) {
    if (
      className === 'p-2 text-break border-0'
    ) {
      inputHandler(element);
    }
    if (className === 'd-flex justify-content-between align-items-center') {
      chatLanguageHandler(element).then();
    }
    if (className === 'btn btn-primary btn-sm') {
      buttonHandler(element);
    }
    if (
      className ===
      'border-top flex-grow-0 flex-shrink-0 bg-white position-relative'
    ) {
      responseMessageHandler(element);
    }
    if (className === 'chat-body more') {
      setTimeout(() => {
        receiveMessagesHandler(element).then();
      }, 100);
    }
  }
};
/**
 * 消息输入框处理
 * @param input
 */
const inputHandler = input => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
    inputLanguageHandler().then();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送按钮处理
 * @param button
 */
const buttonHandler = button => {
  try {
    helloworld.sendButton = button;
    helloworld.sendButton.setAttribute(
      'helloworld-id',
      'helloworld-sendButton',
    );
    helloworld.sendButton.addEventListener(
      'click',
      sendButtonClickHandler,
      true,
    );
  } catch (e) {
    console.error(e);
  }
};
/**
 * 输入框语种提示处理
 * @param element
 */
const inputLanguageHandler = async element => {
  try {
    helloworld.sendLanguage = globalLanguageHandler('send');
    if (helloworld.input) {
      helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
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
const chatLanguageHandler = async element => {
  try {
    let chatLanguage = document.querySelector('.helloworld-chatLanguage');
    if (!chatLanguage) {
      helloworld.chatLanguage = document.createElement('div');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage';
      helloworld.chatLanguage.setAttribute(
        'helloworld-id',
        'helloworld-chatLanguage',
      );
      element.insertAdjacentElement('afterend', helloworld.chatLanguage);
    } else {
      helloworld.chatLanguage = chatLanguage;
    }

    helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
  } catch (e) {
    console.error(e);
  }
};
/**
 * 翻译接口返回消息处理
 * @param element
 */
const responseMessageHandler = element => {
  try {
    if (!document.querySelector('.helloworld-responseMessage')) {
      let div = document.createElement('div');
      div.className = 'helloworld-responseMessage';
      div.setAttribute('helloworld-id', 'helloworld-responseMessage');
      div.style.cssText = 'left:20px;';
      div.innerHTML = '';
      helloworld.responseMessage = div;
      element.insertAdjacentElement('beforebegin', div);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 消息输入框回车事件处理
 * @param evt
 */
const inputKeydownHandler = evt => {
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
      } else {
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
const sendButtonClickHandler = evt => {
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
 * 文本消息发送处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async () => {
  try {
    window.sendLock = false;
    setResponseMessage('');
    let input = helloworld.input;
    let button = helloworld.sendButton;
    //拼接源文本
    let text = sendMessageTextHandler(input);
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text)) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setResponseMessage('翻译消息中...');
      //发送消息翻译处理
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          changeReactInputValue(input, response.text);
          setTimeout(() => {
            let checkTranslationText = sendMessageTextHandler(input);
            if (isContainChinese(checkTranslationText)) {
              if (
                param.sendTo === 'ja' ||
                param.sendTo === 'jp' ||
                param.sendTo === 'cht' ||
                param.sendTo === 'zh-TW' ||
                param.sendTo === 'yue'
              ) {
                button.click();
                setResponseMessage('');
              } else {
                if (param.includeZh) {
                  button.click();
                  setResponseMessage('');
                } else {
                  setResponseMessage(
                    '检测到中文,已阻止发送,请重试!',
                    'var(--danger)',
                  );
                }
              }
            } else {
              button.click();
              setResponseMessage('');
            }
          }, 20);
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
          console.error(`${response.message}`);
        }
      });
    } else {
      button.click();
      window.sendLock = false;
    }
  } catch (e) {
    window.sendLock = false;
    console.error(e);
  }
};

function changeReactInputValue(input, text) {
  input.value = [text];
  fireMessageInput(input);
}

/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async element => {
  try {
    let messageNode = element.querySelector(
      "div[class='chat-item-text user-select-text']",
    );
    if (messageNode) {
      let isGroup = await isGroupMessage();
      let text = receiveMessageTextHandler(messageNode);
      if (!isEmpty(text) && !isNumber(text)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty(
          '--helloworldSize',
          param.fontSize.concat('px'),
        ); //全局字体大小
        document.body.style.setProperty(
          '--helloworldLineHeight',
          `${param.fontSize * 1.2}px`,
        );
        let translationDiv = element.querySelector(
          "div[class='chat-item-text user-select-text helloworld-translation-message']",
        );
        if (!translationDiv) {
          div = document.createElement('div');
          div.className =
            'chat-item-text user-select-text helloworld-translation-message';
          div.style.cssText =
            'color:var(--helloworldColor);font-size:var(--helloworldSize);padding: 3px 12px;';
          messageNode.insertAdjacentElement('afterend', div);
        } else {
          div = translationDiv;
        }
        let data = {
          q: text, //文本
          send: false, //自己发送
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
              !isContainChinese(text) ||
              (isContainJapanese(text) && isContainChinese(text)) ||
              (isContainChinese(text) && param.includeZh)
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
const sendMessageTextHandler = input => {
  try {
    return input.value[0];
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = element => {
  try {
    return element.innerText;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 是否为群组消息
 */
const isGroupMessage = async () => {
  try {
    let chatTitle = document.querySelector(
      "div[class='d-flex justify-content-between align-items-center']",
    );
    if (chatTitle) {
      return chatTitle.querySelector("span[class='cursor-pointer']");
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
      helloworld.responseMessage.style.color =
        color || 'var(--helloworldColor)';
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
      helloworld.fileResponseMessage.style.color =
        color || 'var(--helloworldColor)';
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
const globalLanguageHandler = type => {
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
};

/**
 * 更新全局翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateGlobalTranslationParam = async data => {
  try {
    window.helloworld.data = data;
    setTimeout(async () => {
      let msgList = document.querySelectorAll("div[class='chat-body more']");
      for (let element of msgList) {
        if (
          !element.querySelector("div[class='helloworld-translation-message']")
        )
          await receiveMessagesHandler(element);
      }
    }, 2000);
    await updateGlobalInputLanguage();
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
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = escapeText => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector(
        "textarea[class='editor-textarea p-2 overflow-y-auto text-break border-0']",
    );
    if (input) {
      window.helloworld.focusWebView();
      window.selectAllText(input);
      setTimeout(() => {
        changeReactInputValue(input,message);
        setTimeout(() => {
          sendMessageHandler();
        }, 50);
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
  let e = document.querySelector(
    "div[class='badge badge-pill badge-primary border border-white']",
  );
  if (e) {
    t += parseInt(e.innerHTML);
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
  let input = document.querySelector(
    "textarea-ex[class='p-2 text-break border-0']",
  );
  let sendButton = document.querySelector(
    "input[class='btn btn-primary btn-sm']",
  );
  let chat_language = document.querySelector(
    "div[class='d-flex justify-content-between align-items-center']",
  );
  let utils = document.querySelector(
    "div[class='d-flex justify-content-between align-items-center p-2']",
  );
  let editable = document.querySelector(
    "div[class='border-top flex-grow-0 flex-shrink-0 bg-white position-relative']",
  );
  if (input) {
    inputHandler(input);
  }
  if (sendButton) {
    buttonHandler(sendButton);
  }
  if (chat_language) {
    chatLanguageHandler(chat_language).then();
  }
  if (editable) {
    responseMessageHandler(editable);
  }
  setTimeout(async () => {
    let msgList = document.querySelectorAll("div[class='chat-body more']");
    for (let element of msgList) {
      if (!element.querySelector("div[class='helloworld-translation-message']"))
        await receiveMessagesHandler(element);
    }
  }, 2000);
};
window.setInterval(updateBadge, 1000);
0;
