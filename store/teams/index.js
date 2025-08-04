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
  // console.log(element);
  if (element.getAttribute && element.getAttribute('data-cke-filler')) {
    inputHandler();
    inputLanguageHandler(element.parentNode);
  }
  if (className === 'fui-Primitive ___16zla5h f1oy3dpc fqtknz5 fyvcxda') {
    inputHandler();
    receiveMessagesHandler(element).then();
  }
  if (className.includes('fui-Primitive ___mynxwq0 f1poobt0 f1cktdmf f13htf1t f1ubnyt4 f1couhl3 f1ahpp82 f1d9norm f6dzj5z f1p9o1ba fokg9q4')) {
    inputHandler();
    inputLanguageHandler(element.querySelector('p[class="ck-placeholder"]'));
  }
  if (className.includes('ui-toolbar__item')) {
    if (element.getAttribute('data-tid') === 'sendMessageCommands-send') {
      buttonHandler(element);
    }
  }
  if (className === 'fui-Flex ___lg5ij00 f22iagw f1869bpl') {
    responseMessageHandler(element);
  }
};

/**
 * 消息发送框处理
 * @param input
 */
const inputHandler = () => {
  try {
    let input = document.querySelector('div[class*="fui-Primitive ___mynxwq0 f1poobt0 f1cktdmf f13htf1t f1ubnyt4 f1couhl3 f1ahpp82 f1d9norm f6dzj5z f1p9o1ba fokg9q4"]');
    if (input) {
      helloworld.input = input;
      helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
      helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
    }
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
const inputLanguageHandler = (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
    helloworld.sendLanguage.setAttribute('data-placeholder', globalLanguageHandler('send'));
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
    if (!document.querySelector('.helloworld-chatLanguage')) {
      let div = document.createElement('div');
      div.className = 'helloworld-chatLanguage';
      div.style.cssText = 'font-size:12px;';
      element.parentNode.insertAdjacentElement('beforebegin', div);
      helloworld.chatLanguage = div;
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
    let div = document.createElement('div');
    div.setAttribute('helloworld-id', 'helloworld-responseMessage');
    div.style.cssText = 'font-size:13px;';
    div.innerHTML = '';
    helloworld.responseMessage = div;
    element.insertAdjacentElement('beforebegin', div);
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
    let message = sendMessageTextHandler(input);
    message = message.replace(/^\s*|\s*$/g, '');
    console.log(message);
    let param = helloworld.data;
    if (param.send && !isEmpty(message) && !isNumber(message)) {
      let data = {
        q: message, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage('翻译消息中...');
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          setTimeout(() => {
            window.pasteText(input, translationText);
            setTimeout(() => {
              let checkTranslationText = input.textContent;
              if (isContainChinese(checkTranslationText)) {
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
          }, 30);
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
    let isGroup = checkGroupMessage();
    let message = receiveMessageTextHandler(element);
    //消息不为空或不为纯数字
    if (!isEmpty(message) && !isNumber(message)) {
      let div;
      let param = helloworld.data;
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      div = document.createElement('div');
      div.className = 'helloworld-translation-message';
      div.style.cssText =
        'position: relative; display: inline; flex-grow: 0; flex-shrink: 0; overflow: visible; white-space: pre-wrap; overflow-wrap: break-word; font-size: var(--helloworldSize); line-height: 22px; letter-spacing: -0.2px; font-family: &quot;SF Regular&quot;, &quot;Segoe System UI Regular&quot;, &quot;Segoe UI Regular&quot;, sans-serif; color: var(--helloworldColor); align-self: stretch; background-color: #ffffff; font-weight: 400; user-select: text; cursor: text;';
      element.insertAdjacentElement('afterend', div);
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
const sendMessageTextHandler = (element) => {
  let message = '';
  for (let a = 0; a < element.childNodes.length; a++) {
    if (element.childNodes[a].nodeName === 'P') {
      for (let b = 0; b < element.childNodes[a].childNodes.length; b++) {
        if (element.childNodes[a].childNodes[b].nodeName === '#text') {
          message += element.childNodes[a].childNodes[b].nodeValue;
        }
        if (element.childNodes[a].childNodes[b].nodeName === 'READONLY') {
          message += element.childNodes[a].childNodes[b].getAttribute('itemscope');
        }
      }
      //换行
      if (!(a === element.childNodes.length - 1)) {
        message += '\n';
      }
    }
  }
  return message;
};
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = (element) => {
  let message = '';
  for (let a = 0; a < element.childNodes.length; a++) {
    if (element.childNodes[a].nodeName === 'P') {
      for (let p = 0; p < element.childNodes[a].childNodes.length; p++) {
        if (element.childNodes[a].childNodes[p].nodeName === '#text') {
          message += element.childNodes[a].childNodes[p].nodeValue;
        }
        if (element.childNodes[a].childNodes[p].nodeName === 'SPAN' && element.childNodes[a].childNodes[p].className.includes('fui-Primitive')) {
          for (let i = 0; i < element.childNodes[a].childNodes[p].childNodes.length; i++) {
            if (element.childNodes[a].childNodes[p].childNodes[i].className.includes('fui-Image')) {
              message += element.childNodes[a].childNodes[p].childNodes[i].alt;
            }
          }
        }
        if (element.childNodes[a].childNodes[p].nodeName === 'BR') {
          message += '\n';
        }
      }
    }
    if (element.childNodes[a].nodeName === '#text') {
      message += element.childNodes[a].nodeValue;
    }
    if (element.childNodes[a].nodeName === 'SPAN' && element.childNodes[a].className.includes('fui-Primitive')) {
      for (let i = 0; i < element.childNodes[a].childNodes.length; i++) {
        if (element.childNodes[a].childNodes[i].className.includes('fui-Image')) {
          message += element.childNodes[a].childNodes[i].alt;
        }
      }
    }
    if (element.childNodes[a].nodeName === 'BR') {
      message += '\n';
    }
  }
  return message;
};
/**
 * 检测群组消息
 */
const checkGroupMessage = (el) => {
  try {
    return document.querySelector("div[class='fui-Flex ___4bzly60 f22iagw f122n59 f1phki43']").childNodes[0].nodeName === 'BUTTON';
  } catch (e) {
    console.error(e);
  }
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
    localStorage.setItem('tt_api', data.server);
    setTimeout(async () => {
      let elementList = document.querySelectorAll("div[class='fui-Primitive ___16zla5h f1oy3dpc fqtknz5 fyvcxda']");
      if (elementList.length > 0) {
        for (let element of elementList) {
          await receiveMessagesHandler(element);
        }
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
    if (helloworld.sendLanguage && !helloworld.sendLanguage.getAttribute('data-placeholder').includes('独立')) {
      helloworld.sendLanguage.setAttribute('data-placeholder', sendLanguageText);
    }
    if (helloworld.chatLanguage && !helloworld.chatLanguage.innerHTML.includes('独立')) {
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
const sendReplyMessage = (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("div[class*='fui-Primitive ___mynxwq0 f1poobt0 f1cktdmf f13htf1t f1ubnyt4 f1couhl3 f1ahpp82 f1d9norm f6dzj5z f1p9o1ba fokg9q4']");
    if (input) {
      window.helloworld.focusWebView();
      window.selectAllText(input);
      setTimeout(() => {
        window.pasteText(input, message);
        setTimeout(() => {
          let button = document.querySelector("button[data-tid='sendMessageCommands-send']");
          if (button) sendMessageHandler(button).then();
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
  const e = document.querySelector("div[class*='fui-Badge r1l7mb74 fui-CounterBadge']");
  if (e) {
    t += parseInt(e.textContent);
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
function setConsole() {
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  console = iframe.contentWindow.console;
  window.console = console;
}
setConsole();
0;
