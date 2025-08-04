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
async function parseElement(element) {
  let className = element.className;
  if (className && className.includes) {
    if (
      className === 'Composer__input Composer__input--compact' ||
      className === 'im_editable im-chat-input--text _im_text' ||
      className === 'ComposerInput__input ConvoComposer__input ComposerInput__input--fixed'
    ) {
      inputHandler(element);
    }
    if (className === 'placeholder') {
      let input = document.querySelector("div[class='im_editable im-chat-input--text _im_text']");
      if (input) inputHandler(element);
    }
    if (className.includes('Composer__button Composer__button--submit') || className === 'im-send-btn im-chat-input--send _im_send im-send-btn_send') {
      buttonHandler(element);
    }
    if (className === 'FCConvo_composer'  || className === 'ConvoMain__composer') {
      responseMessageHandler(element);
    }
    if (
      className === 'lhggkp7q qq0sjtgm jxacihee c3x5l3r8 b9fczbqn t35qvd06 m62443ks rkxvyd19 c5h0bzs2 bze30y65 kao4egtt' ||
      className === 'ComposerInput__placeholder ConvoComposer__inputPlaceholder'
    ) {
      if (element.innerHTML !== '') inputLanguageHandler(element).then();
    }
    if (className === 'FCConvoHeader') {
      setTimeout(() => {
        chatLanguageHandler(element).then();
      }, 100);
    }
    if (className.includes('ConvoMessage ConvoMessage--') || className.includes('ConvoMessageWithoutBubble__text')) {
      setTimeout(() => {
        let messageText = element.querySelector("span[class*='MessageText']");
        if (messageText) receiveMessagesHandler(messageText, true).then();
      }, 50);
    }
  }
}

/**
 * 消息发送框处理
 * @param input
 */
function inputHandler(input) {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
    helloworld.input.setAttribute('data-placeholder', globalLanguageHandler('send'));
  } catch (e) {
    console.error(e);
  }
}
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
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
    helloworld.sendLanguage.innerHTML = globalLanguageHandler('send');
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
    let div = document.createElement('div');
    div.style.cssText = 'margin-top: -13px;font-size: 11px;text-align: center;';
    element.insertAdjacentElement('afterend', div);
    helloworld.chatLanguage = div;
    helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
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
    let span = document.createElement('div');
    span.className = 'helloworld-responseMessage';
    span.style.cssText = 'font-size:13px;';
    span.innerHTML = '';
    helloworld.responseMessage = span;
    element.insertAdjacentElement('afterbegin', span);
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
const sendMessageHandler = async () => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let message = '';
    let button = '';
    if (input.className === 'Composer__input Composer__input--compact') {
      message = input.innerHTML;
      button = document.querySelector("button[class*='Composer__button Composer__button--submit']");
    } else if (input.className === 'im_editable im-chat-input--text _im_text') {
      for (let child of input.childNodes) {
        if (child.nodeName === '#text') {
          message += child.data;
        }
        if (child.nodeName === 'BR') {
          message += '\n';
        }
      }
      button = document.querySelector("button[class*='im-send-btn im-chat-input--send im-send-btn_static _im_send im-send-btn_send']");
    } else if (input.className === 'ComposerInput__input ConvoComposer__input ComposerInput__input--fixed') {
      message = input.innerHTML;
      button = document.querySelector("button[class*='ConvoComposer__button ConvoComposer__sendButton--submit']");
    }
    button.addEventListener('click', sendButtonClickHandler, true);
    let text = message;
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
        if (response.code == 200) {
          setResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          setTimeout(() => {
            Firepaste(input, translationText);
            setTimeout(() => {
              if (isContainChinese(input.innerHTML)) {
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
            }, 50);
          }, 100);
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
function Firepaste(input, setstr) {
  try {
    const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: () => setstr,
        types: ['text'],
      },
    });
    input.focus();
    input.dispatchEvent(pasteEvent);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 接收消息翻译处理
 * @param element
 * @param isMinWindow
 */
const receiveMessagesHandler = async (element, isMinWindow) => {
  try {
    let message = '';
    for (let child of element.childNodes) {
      if (child.nodeName === '#text') {
        message += child.data;
      }
      if (child.nodeName === 'A') {
        message += child.innerText;
      }
      if (child.nodeName === 'BR') {
        message += '\n';
      }
    }
    //消息不为空或不为纯数字
    if (!isEmpty(message) && !isNumber(message)) {
      let param = helloworld.data;
      let div = '';
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      let translateDiv = isMinWindow
        ? element.parentNode.querySelector("div[class='MessageText ConvoMessage__text helloworld-translation-message']")
        : element.parentNode.querySelector("div[class='im-mess--text wall_module _im_log_body helloworld-translation-message']");
      if (!translateDiv) {
        div = document.createElement('div');
        div.className = isMinWindow ? 'MessageText ConvoMessage__text helloworld-translation-message' : 'im-mess--text wall_module _im_log_body helloworld-translation-message';
        div.style.cssText = 'display:flex;color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
        element.parentNode.insertAdjacentElement('beforeend', div);
      } else {
        div = translateDiv;
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
    let text = '';
    let emoji = true;
    let childNodes = Array.from(input.childNodes);
    childNodes.map((node, index) => {
      Array.from(node.childNodes).map((_childNode) => {
        //普通文本 斜体_文本_ 删除线~文本~ 粗体*文本*
        if (_childNode.className.includes('selectable-text copyable-text')) {
          text += _childNode.innerHTML;
          emoji = false;
        }
        //等宽```文本```
        if (_childNode.nodeName === 'CODE') {
          text += _childNode.innerText;
          emoji = false;
        }
        //表情
        if (_childNode.className.includes('dcnh1tix sxl192xd t3g6t33p')) {
          text += _childNode.innerText;
        }
      });
      //换行
      if (!(index === childNodes.length - 1)) {
        text += '\n';
      }
    });
    return {
      text: text,
      emoji: emoji,
    };
  } catch (e) {
    console.error(e);
  }
};
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = (textEle) => {
  let message = '';
  let childNodes = Array.from(textEle.childNodes[0].childNodes);
  childNodes.map((node, index) => {
    if (node.nodeName === '#text') {
      message += node.data;
    } else if (node.nodeName === 'IMG') {
      message += node.alt;
    } else {
      message += node.innerText;
    }
  });
  return message;
};
/**
 * 检测群组消息
 */
const checkGroupMessage = (el) => {
  try {
    if (el && el.getAttribute) {
      let data_id = el.getAttribute('data-id');
      if (data_id) {
        return data_id.includes('@g.us');
      }
    }
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
      let elementList1 = document.querySelectorAll("div[class*='ConvoMessage ConvoMessage--']");
      for (let element of elementList1) {
        let messageText = element.querySelector("span[class='MessageText']");
        if (messageText) await receiveMessagesHandler(messageText, true);
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
    if (helloworld.sendLanguage) {
      helloworld.sendLanguage.innerHTML = sendLanguageText;
    }
    if (helloworld.chatLanguage) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
    if (helloworld.input) {
      helloworld.input.setAttribute('data-placeholder', sendLanguageText);
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
async function checkUnread() {
  let msgCount = document.querySelector('span[class="LeftMenuItem-module__counter--VM1_w"]');
  if (msgCount) {
    updateBadge(parseInt(msgCount.innerHTML));
  } else {
    updateBadge(0);
  }
  let messageList = document.querySelectorAll("div[class='im-mess--text wall_module _im_log_body']");
  for (let message of messageList) {
    if (message && !message.parentNode.querySelector('div[class*="helloworld-translation-message"]')) await receiveMessagesHandler(message, false);
  }
  let sendInput = document.querySelector("div[class='im_editable im-chat-input--text _im_text']");
  if (sendInput) {
    if (!sendInput.getAttribute('helloworld-id')) inputHandler(sendInput);
  }
  let placeholder = document.querySelector("label[class='ph_content']");
  if (placeholder) {
    if (!placeholder.getAttribute('helloworld-id')) {
      inputLanguageHandler(placeholder).then();
    }
  }
  let tips = document.querySelector("div[class='im-chat-input--textarea fl_l _im_text_input _emoji_field_wrap _voice_field_wrap']");
  if (tips) {
    if (!tips.querySelector('.helloworld-responseMessage')) responseMessageHandler(placeholder);
  }
  let input = document.querySelector("span[class='ComposerInput__input ConvoComposer__input ComposerInput__input--fixed']");
  if(input){
    if (!input.getAttribute('helloworld-id')) inputHandler(input);
  }
}
/**
 * 未读消息监控
 */
const updateBadge = (e) => {
  e >= 1 ? helloworld.setUnreadCount(e) : helloworld.clearUnreadCount();
};
window.setInterval(checkUnread, 1000);
0;
