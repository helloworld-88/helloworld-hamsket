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
    if (
      className ===
      'xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1f6kntn x7whbhp x1j61x8r _58al uiTextareaAutogrow xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1f6kntn x7whbhp x1j61x8r'
    ) {
      inputHandler(element);
    }
    if (className === 'x78zum5 x1qughib xeuugli x12peec7 xso031l xrua2ca x1q0q8m5 xyamay9 xyri2b x1l90r2v x1c1uobl xbktkl8') {
      chatLanguageHandler(element).then();
    }
    if (
      className ===
      'x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x14z9mp x1lziwak x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1y1aw1k xv54qhq xwib8y2 xf7dkkf x1obq294 x5a5i1n xde0f50 x15x8krk xt0psk2 xjpr12u'
    ) {
      buttonHandler(element);
    }
    if (
      className ===
      'x78zum5 xdt5ytf x2lwn1j xeuugli x12peec7 x1iorvi4 x11lfxj5 xjkvuk6 x135b78x x14vqqas xbmvrgn xod5an3 x1diwwjn x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x178xt8z x1lun4ml xso031l xpilrb4 xb9moi8 xe76qn7 x21b0me x142aazg x1obq294 x5a5i1n xde0f50 x15x8krk'
    ) {
      responseMessageHandler(element);
    }
    if (
      className === 'x1y1aw1k xpdmqnj xwib8y2 x1g0dm76 x13faqbe x1eied1y xca6lcq x1pdtjp8 xpctjk2 xogfrqt x1slwz57 xt0e3qv' ||
      className === 'x1y1aw1k xpdmqnj xwib8y2 x1g0dm76 x13faqbe x1eied1y xca6lcq x1pdtjp8 xpctjk2 xg32yw2 x1fr600 xt0e3qv' ||
      className === 'x1eied1y x1pdtjp8 xpctjk2 x1y1aw1k xpdmqnj xwib8y2 x1g0dm76 x13faqbe xab0eaz xg32yw2 x1fr600 xt0e3qv'
    ) {
      setTimeout(() => {
        receiveMessagesHandler(element).then();
      }, 500);
    }
    if (className.includes('x1y1aw1k xpdmqnj xwib8y2 x1g0dm76 x13faqbe')) {
      setTimeout(() => {
        receiveMessagesHandler(element).then();
      }, 500);
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
    inputLanguageHandler().then();
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
const inputLanguageHandler = async (element) => {
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
const chatLanguageHandler = async (element) => {
  try {
    let chatLanguage = document.querySelector('.helloworld-chatLanguage');
    if (!chatLanguage) {
      helloworld.chatLanguage = document.createElement('div');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage';
      helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
      helloworld.chatLanguage.style.cssText = 'position: absolute;top: 70px;margin-left: 15px;';
      element.insertAdjacentElement('beforeend', helloworld.chatLanguage);
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
const responseMessageHandler = (element) => {
  try {
    if (!element.querySelector('.helloworld-responseMessage')) {
      let div = document.createElement('div');
      div.className = 'helloworld-responseMessage';
      div.setAttribute('helloworld-id', 'helloworld-responseMessage');
      div.style.cssText = 'position: absolute;left:20px;';
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
    window.sendLock = false;
    setResponseMessage('');
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
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
              if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
                button.click();
                setResponseMessage('');
              } else {
                if (param.includeZh) {
                  button.click();
                  setResponseMessage('');
                } else {
                  setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
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
  let lastValue = input.value;
  input.value = text;
  let event = new Event('input', { bubbles: true });
  event.simulated = true;
  let tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
}

/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async (element) => {
  try {
    let messageNode = element.querySelector('span');
    if (messageNode) {
      let isGroup = await isGroupMessage();
      let message = receiveMessageTextHandler(messageNode);
      let text = message.text;
      let isEmoji = message.isEmoji;
      if (!isEmpty(text) && !isNumber(text) && !isEmoji) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        let translationDiv = element.querySelector("div[class='helloworld-translation-message']");
        if (!translationDiv) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message';
          div.style.cssText =
            'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color: #efefef;border-radius:5px;line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
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
            if (!isContainChinese(text) || (isContainJapanese(text) && isContainChinese(text)) || (isContainChinese(text) && param.includeZh)) {
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
const sendMessageTextHandler = (input) => {
  try {
    return input.innerHTML;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = (element) => {
  try {
    let text = '';
    let isEmoji = true;
    let childNodes = Array.from(element.childNodes);
    childNodes.map((node, index) => {
      if (node.nodeName === 'SPAN') {
        let _childNodes = Array.from(node.childNodes);
        _childNodes.map((_node, _index) => {
          if (_node.nodeName === '#text') {
            text += _node.data;
            isEmoji = false;
          }
          if (_node.nodeName === 'IMG') {
            text += _node.alt;
          }
        });
      }
      if (node.nodeName === 'A') {
        text += node.innerText;
        isEmoji = false;
      }
      if (node.nodeName === 'IMG') {
        text += node.alt;
      }
      if (node.nodeName === 'BR') {
        text += '\n';
      }
    });
    return {
      text: text,
      isEmoji: isEmoji,
    };
  } catch (e) {
    console.error(e);
  }
};
/**
 * 是否为群组消息
 */
const isGroupMessage = async () => {
  try {
    return document.querySelector('._74g0');
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
      let elementList = document.querySelectorAll('.x1y1aw1k.xpdmqnj.xwib8y2.x1g0dm76.x13faqbe');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }, 2000);
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
    if (helloworld.input && !helloworld.sendLanguage.includes('独立')) {
      helloworld.sendLanguage = sendLanguageText;
      helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage && !helloworld.chatLanguage.innerHTML.includes('独立')) {
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
const sendReplyMessage = (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector(
      "textarea[class='xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n xd10rxx x1sy0etr x17r0tee x1f6kntn x7whbhp x1j61x8r _58al uiTextareaAutogrow xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n xd10rxx x1sy0etr x17r0tee x1f6kntn x7whbhp x1j61x8r']"
    );
    if (input) {
      changeReactInputValue(input, message);
      setTimeout(() => {
        let sendButton = document.querySelector(
          "div[class='x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm x1mh8g0r x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1y1aw1k x1pi30zi xwib8y2 x1swvt13 x1lq5wgf xgqcy7u x30kzoy x9jhf4c xt0psk2 xjpr12u']"
        );
        if (sendButton) sendMessageHandler(sendButton).then();
      }, 50);
    }
  } catch (e) {
    console.error(e);
  }
};
//x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x6s0dn4 x78zum5 x1q0g3np x2lah0s xl56j7k x1lku1pv x1g40iwv x1lcm9me x1yr5g0i xrt01vj x10y3i5r x1y1aw1k xwib8y2 x1g0dm76 xpdmqnj x1xlr1w8 x1qsmy5i x1k4ywey
/**
 * 未读消息监控
 */
const updateBadge = () => {
  let t = 0;
  let e = document.querySelector(
    "a[class*='x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x6s0dn4 x78zum5 x1q0g3np x2lah0s xl56j7k x1lku1pv x1g40iwv xjwep3j x1t39747 x1wcsgtt x1pczhz8 x1y1aw1k xwib8y2 x1g0dm76 xpdmqnj x1xlr1w8 x1qsmy5i x1k4ywey']"
  );
  if (e) {
    let b = e.querySelector('div[class="xmi5d70 xw23nyj x63nzvj x1heor9g xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1pd3egz xeuugli"]');
    if (b) {
      t += parseInt(b.innerHTML);
    }
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
  let chat = document.querySelector("div[class='x78zum5 xdt5ytf x2lwn1j xeuugli x1r8uery x1ikap7u']");
  if (chat) {
    let input = chat.querySelector(
      "textarea[class='xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1f6kntn x7whbhp x1j61x8r _58al uiTextareaAutogrow xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1qx5ct2 x37zpob xtt52l0 xctk3hg xxymvpz xh8yej3 x1ejq31n x18oe1m7 x1sy0etr xstzfhl x1f6kntn x7whbhp x1j61x8r']"
    );
    let sendButton = chat.querySelector(
      "div[class='x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x14z9mp x1lziwak x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1y1aw1k xv54qhq xwib8y2 xf7dkkf x1obq294 x5a5i1n xde0f50 x15x8krk xt0psk2 xjpr12u']"
    );
    let chat_language = chat.querySelector("div[class='x78zum5 x1qughib xeuugli x12peec7 xso031l xrua2ca x1q0q8m5 xyamay9 xyri2b x1l90r2v x1c1uobl xbktkl8']");
    let footer = document.querySelector(
      "div[class='x78zum5 xdt5ytf x2lwn1j xeuugli x12peec7 x1iorvi4 x11lfxj5 xjkvuk6 x135b78x x14vqqas xbmvrgn xod5an3 x1diwwjn x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x178xt8z x1lun4ml xso031l xpilrb4 xb9moi8 xe76qn7 x21b0me x142aazg x1obq294 x5a5i1n xde0f50 x15x8krk']"
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
    if (footer) {
      responseMessageHandler(footer);
    }
    let msgList = document.querySelectorAll('.x1y1aw1k.xpdmqnj.xwib8y2.x1g0dm76.x13faqbe');
    for (let element of msgList) {
      setTimeout(async () => {
        if (!element.querySelector("div[class='helloworld-translation-message']")) await receiveMessagesHandler(element);
      }, 1000);
    }
  }
};
window.setInterval(updateBadge, 1000);
0;
