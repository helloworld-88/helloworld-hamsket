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
    if (className.includes('DivInputAreaContainer')) {
      setTimeout(() => {
        let input = element.querySelector("div[class='notranslate public-DraftEditor-content']");
        let inputLanguage = element.querySelector("div[class='public-DraftEditorPlaceholder-inner']");
        if (input) inputHandler(input);
        if (inputLanguage) inputLanguageHandler(inputLanguage);
      }, 50);
    }
    if (className === 'public-DraftEditorPlaceholder-inner') {
      setTimeout(() => {
        if (element.parentNode.nextSibling.childNodes[0].getAttribute('helloworld-id')) inputLanguageHandler(element);
      }, 50);
    }
    if (className.includes('StyledSendButton') && element.getAttribute('data-e2e') === 'message-send') {
      setTimeout(() => {
        buttonHandler(element);
      }, 50);
    }
    if (className.includes('css-lzw7my') && element.getAttribute('data-e2e') === 'message-send') {
      setTimeout(() => {
        buttonHandler(element);
      }, 50);
    }
    if (className === 'css-fqfkc9-DivChatBottom e1823izs0') {
      setTimeout(() => {
        responseMessageHandler(element);
      }, 50);
    }
    if (className === 'css-py020d-DivChatHeaderContentWrapper ediam1h2') {
      setTimeout(() => {
        chatLanguageHandler(element);
      }, 50);
    }
    if (className.includes('css-1rdxtjl-PText') || className.includes('css-ingca2-PText')) {
      setTimeout(() => {
        receiveMessagesHandler(element).then();
      }, 50);
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
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
    helloworld.input.addEventListener('input', bindSendButton, true);
  } catch (e) {
    console.error(e);
  }
};
const bindSendButton = (evt) => {
  try {
    setTimeout(() => {
      let button = document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
      let button2 = document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
      if (button) {
        buttonHandler(button);
      }
      if(button2){
        buttonHandler(button2);
      }
    }, 50);
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
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
    helloworld.sendLanguage.innerHTML = globalLanguageHandler('send');
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
const chatLanguageHandler = async (element) => {
  try {
    helloworld.chatLanguage = document.createElement('div');
    helloworld.chatLanguage.className = 'helloworld-chatLanguage';
    helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
    helloworld.chatLanguage.style.cssText = 'position: absolute;top:63px;color:black;font-size:13px;background-color: white;';
    element.insertAdjacentElement('afterend', helloworld.chatLanguage);
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
    div.className = 'helloworld-responseMessage';
    div.setAttribute('helloworld-id', 'helloworld-responseMessage');
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
const inputKeydownHandler = (evt) => {
  try {
    if (evt.isTrusted) {
      setTimeout(() => {
        let button = document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
        if (button) {
          buttonHandler(button);
        }
        let button2 = document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
        if (button2) {
          buttonHandler(button2);
        }
      }, 50);
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
 * 文本消息发送处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async (btn) => {
  try {
    if (document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']")) {
      buttonHandler(document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']"));
    }
    if (document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']")) {
      buttonHandler(document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']"));
    }
    window.sendLock = false;
    setResponseMessage('');
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    if (input && button) {
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
        translationHandler(param, data, async function (response) {
          if (response.code === 200) {
            let translationText = response.text;
            //全选输入框
            selectAllText(input);
            setTimeout(() => {
              //覆盖粘贴翻译文本
              pasteText(input, translationText);
              setTimeout(() => {
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(input.innerHTML)) {
                  if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
                    window.sendLock = false;
                    inputButtonClick(input);
                    setResponseMessage('');
                  } else {
                    if (param.includeZh) {
                      window.sendLock = false;
                      inputButtonClick(input);
                      setResponseMessage('');
                    } else {
                      setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                    }
                  }
                } else {
                  window.sendLock = false;
                  inputButtonClick(input);
                  setResponseMessage('');
                }
              }, 100);
            }, 50);
          } else {
            window.sendLock = false;
            setResponseMessage(`${response.message}`, 'var(--danger)');
            console.error(`${response.message}`);
          }
        });
      } else {
        inputButtonClick(input);
        window.sendLock = false;
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(e);
  }
};
const selectAllText = (input) => {
  try {
    input.focus();
    if (window[0]) {
      if (window[0].document.selection) {
        var range = window[0].document.body.createTextRange();
        range.moveToElementText(input);
        range.select();
      } else if (window[0].getSelection) {
        window[0].getSelection().selectAllChildren(input);
      }
    } else {
      if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(input);
        range.select();
      } else if (window.getSelection) {
        window.getSelection().selectAllChildren(input);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
const pasteText = (input, message) => {
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
function inputButtonClick(element) {
  var events = document.createEvent('Event');
  events.initEvent('keydown', true, true);
  events = Object.assign(events, {
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    which: 13,
    keyCode: 13,
    key: 'Enter',
    code: 'Enter',
  });
  element.dispatchEvent(events);
}
/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async (element) => {
  try {
    if (window[0]) {
      let message = receiveMessageTextHandler(element);
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        window[0].document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        window[0].document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        window[0].document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.parentNode.querySelector("div[class='helloworld-translation-message']")) {
          div = window[0].document.createElement('div');
          div.className = 'helloworld-translation-message';
        } else {
          div = element.parentNode.querySelector("div[class='helloworld-translation-message']");
        }
        div.style.cssText =
          'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color:white;border-radius:5px;line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
        element.insertAdjacentElement('afterend', div);
        let data = {
          q: message, //文本
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
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message) && param.includeZh) || (isContainChinese(message) && param.includeZh)) {
              //私人消息
              autoTranslationHandler(param, data, div);
            } else {
              div.innerHTML = '';
            }
          } else {
            div.innerHTML = '';
          }
        }
      }
    } else {
      let message = receiveMessageTextHandler(element);
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.parentNode.querySelector("div[class='helloworld-translation-message']")) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message';
        } else {
          div = element.parentNode.querySelector("div[class='helloworld-translation-message']");
        }
        div.style.cssText =
          'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color:white;border-radius:5px;line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
        element.insertAdjacentElement('afterend', div);
        let data = {
          q: message, //文本
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
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message) && param.includeZh) || (isContainChinese(message) && param.includeZh)) {
              //私人消息
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
  return element.innerText;
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    let active = document.querySelector("[class*='css-175oi2r '][data-testid='activeRoute']");
    if (active) {
      return active.querySelector("div[class*='css-1rynq56 r-qvutc0 r-37j5jr r-1cwl3u0 r-1awozwy r-sdzlij r-6koalj r-1q142lx r-1777fci r-lrvibr r-3s2u2q']");
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
 * 全局语种提示
 * @param type
 */
const globalLanguageHandler = (type) => {
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
window.updateGlobalTranslationParam = async (data) => {
  try {
    window.helloworld.data = data;
    setTimeout(async () => {
      if (window[0]) {
        let elementList = window[0].document.querySelectorAll("p[class*='css-1rdxtjl-PText']");
        if(elementList && elementList.length>0){
          for (let element of elementList) {
            await receiveMessagesHandler(element);
          }
        }
        let elementList2 = window[0].document.querySelectorAll("p[class*='css-ingca2-PText']");
        if(elementList2 && elementList2.length>0)
        for (let element of elementList2) {
          await receiveMessagesHandler(element);
        }
      } else {
        let elementList = document.querySelectorAll("p[class*='css-1rdxtjl-PText']");
        let elementList2 = document.querySelectorAll("p[class*='css-ingca2-PText']");
        if(elementList && elementList.length>0){
          for (let element of elementList) {
            await receiveMessagesHandler(element);
          }
        }
        if(elementList2 && elementList2.length>0){
          for (let element of elementList2) {
            await receiveMessagesHandler(element);
          }
        }
      }
    }, 1000);
    await updateGlobalInputLanguage(data);
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
    if (helloworld.sendLanguage && !helloworld.sendLanguage.innerHTML.includes('独立')) {
      helloworld.sendLanguage.innerHTML = sendLanguageText;
    }
    if (helloworld.chatLanguage && !helloworld.chatLanguage.innerHTML.includes('独立')) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 未读消息监控
 */
const updateBadge = async () => {
  let count = 0;
  const selNotifications = document.querySelector("sup[class*='SupMsgBadge e1nx07zo3']");
  if (selNotifications) {
    count = parseInt(selNotifications.outerText);
  }
  const selNotifications2 = document.querySelector("span[class='relative text-color-TextPrimary']");
  const selNotifications3 = document.querySelector("div[class='css-1j5gmdh-DivMessageBadgeContainer e14l9ebt18']");
  if (selNotifications2 && selNotifications2.childNodes.length > 1) {
    count = parseInt(selNotifications2.childNodes[1].outerText);
  }
  if (selNotifications3) {
    count = parseInt(selNotifications3.outerText);
  }
  count && count >= 1 ? helloworld.setUnreadCount(count) : helloworld.clearUnreadCount();
  if (window[0]) {
    let footer = window[0].document.querySelector("div[class*='DivInputAreaContainer'][data-e2e='message-input-area']");
    let button = window[0].document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
    let button2 = window[0].document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
    let emojiButton = window[0].document.querySelector("div[class='css-12vf5cb-DivEmojiButton e1823izs4']");
    let rspText = window[0].document.querySelector("div[class='css-fqfkc9-DivChatBottom e1823izs0']");
    if (footer) {
      let input = footer.querySelector("div[class='notranslate public-DraftEditor-content']");
      let inputLanguage = footer.querySelector("div[class='public-DraftEditorPlaceholder-inner']");
      if (input) inputHandler(input);
      if (inputLanguage) inputLanguageHandler(inputLanguage);
    }
    if (button) {
      buttonHandler(button);
    }
    if(button2){
      buttonHandler(button2);
    }
    if (rspText) {
      if (!window[0].document.querySelector("div[class='helloworld-responseMessage']")) {
        responseMessageHandler(rspText);
      }
    }
    let elementList = window[0].document.querySelectorAll("p[class*='css-1rdxtjl-PText']");
    if(elementList && elementList.length>0){
      for (let element of elementList) {
        if (!element.parentNode.querySelector("div[class='helloworld-translation-message']")) {
          await receiveMessagesHandler(element);
        }
      }
    }
    let elementList2 = window[0].document.querySelectorAll("p[class*='css-ingca2-PText']");
    if(elementList2 && elementList2.length>0){
      for (let element of elementList2) {
        if (!element.parentNode.querySelector("div[class='helloworld-translation-message']")) {
          await receiveMessagesHandler(element);
        }
      }
    }
  } else {
    let footer = document.querySelector("div[class*='DivInputAreaContainer'][data-e2e='message-input-area']");
    let button = document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
    let button2 = window[0].document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
    let emojiButton = document.querySelector("div[class='css-12vf5cb-DivEmojiButton e1823izs4']");
    if (footer) {
      let input = footer.querySelector("div[class='notranslate public-DraftEditor-content']");
      let inputLanguage = footer.querySelector("div[class='public-DraftEditorPlaceholder-inner']");
      if (input) inputHandler(input);
      if (inputLanguage) inputLanguageHandler(inputLanguage);
    }
    if (button) {
      buttonHandler(button);
    }
    if(button2){
      buttonHandler(button2);
    }
    let elementList = document.querySelectorAll("p[class*='css-1rdxtjl-PText']");
    if(elementList && elementList.length>0){
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }
    let elementList2 = document.querySelectorAll("p[class*='css-ingca2-PText']");
    if(elementList2 && elementList2.length>0){
      for (let element of elementList2) {
        if (!element.parentNode.querySelector("div[class='helloworld-translation-message']")) {
          await receiveMessagesHandler(element);
        }
      }
    }
  }
};
window.setInterval(updateBadge, 1500);
/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    if (window[0]) {
      let input = window[0].document.querySelector("div[class='notranslate public-DraftEditor-content']");
      if (input) {
        window.helloworld.focusWebView();
        selectAllText(input);
        setTimeout(() => {
          pasteText(input, message);
          setTimeout(() => {
            let button = window[0].document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
            if (button) sendMessageHandler(button);
            let button2 = window[0].document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
            if (button2) sendMessageHandler(button2);
          }, 20);
        }, 30);
      }
    } else {
      let input = document.querySelector("div[class='notranslate public-DraftEditor-content']");
      if (input) {
        window.helloworld.focusWebView();
        selectAllText(input);
        setTimeout(() => {
          pasteText(input, message);
          setTimeout(() => {
            let button = document.querySelector("svg[class*='css-d7yhdo-StyledSendButton'][data-e2e='message-send']");
            if (button) sendMessageHandler(button);
            let button2 = document.querySelector("svg[class*='css-lzw7my'][data-e2e='message-send']");
            if (button2) sendMessageHandler(button2);
          }, 20);
        }, 30);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
0;
