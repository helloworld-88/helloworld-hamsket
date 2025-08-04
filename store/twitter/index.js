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
    if (className === 'DraftEditor-editorContainer') {
      let chatLanguageEle = document.querySelector("div[class='css-175oi2r r-1iusvr4 r-16y2uox r-1777fci']");
      if (chatLanguageEle) {
        setTimeout(() => {
          chatLanguageHandler(chatLanguageEle).then();
        }, 100);
      }
      if (element.childNodes[0].getAttribute('data-testid') === 'dmComposerTextInput') inputHandler(element.childNodes[0]);
    }
    if (className.includes('css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-1ez5h0i r-2yi16 r-1qi8awa r-o7ynqc r-6416eg r-icoktb r-1ny4l3l')) {
      buttonHandler(element);
    }
    if (className === 'public-DraftEditorPlaceholder-inner') {
      inputLanguageHandler(element).then();
    }
    if (className === 'lhggkp7q qq0sjtgm jxacihee c3x5l3r8 b9fczbqn t35qvd06 m62443ks rkxvyd19 c5h0bzs2 bze30y65 kao4egtt') {
      if (element.innerHTML !== '') inputLanguageHandler(element).then();
    }
    if (className === 'css-175oi2r r-14lw9ot r-1dgieki r-5kkj8d') {
      responseMessageHandler(element);
    }
    if (className === 'css-175oi2r r-obd0qt r-1wbh5a2' || className === 'css-175oi2r r-1habvwh r-1wbh5a2') {
      receiveMessagesHandler(element).then();
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
    helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
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
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.style.cssText = 'font-size:13px;line-height:25px;';
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
    let chatLanguage = document.querySelector("div[class='helloworld-chatLanguage']");
    if (!chatLanguage) {
      let div = document.createElement('div');
      div.className = 'helloworld-chatLanguage';
      div.style.cssText = 'background-color: rgb(207, 217, 222);z-index: 999;';
      element.insertAdjacentElement('beforeend', div);
      helloworld.chatLanguage = div;
    } else {
      helloworld.chatLanguage = chatLanguage;
    }
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
    let span = document.createElement('span');
    span.setAttribute('helloworld-id', 'helloworld-responseMessage');
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
const sendMessageHandler = async (btn) => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    let message = sendMessageTextHandler(input);
    let text = message.text;
    let emoji = message.emoji;
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
      let data = {
        q: text, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage('翻译消息中...');
      //翻译消息
      translationHandler(param, data, async function (response) {
        if (response.code == 200) {
          setResponseMessage('');
          let translationText = response.text;
          await window.selectAllText(input);
          await window.helloworldSleep(30);
          window.pasteText(input, translationText);
          await window.helloworldSleep(30);
          let checkTranslationText = sendMessageTextHandler(input);
          if (isContainChinese(checkTranslationText.text)) {
            //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              button.click();
              window.sendLock = false;
            } else {
              //开启了中文发送 通过中文检测
              if (param.includeZh) {
                button.click();
                window.sendLock = false;
              } else {
                //未开启中文发送 翻译结果内包含中文阻止发送
                setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                window.sendLock = false;
              }
            }
          } else {
            button.click();
            window.sendLock = false;
          }
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
          window.sendLock = false;
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
    let isGroup = checkGroupMessage(element);
    let textElement = element.querySelector("div[class*='r-a023e6 r-rjixqe r-16dba41 r-bnwqim r-1udh08x r-1rozpwm r-fdjqy7']");
    if (textElement !== null) {
      let message = receiveMessageTextHandler(textElement);
      let text = message.text;
      let isEmoji = message.isEmoji;
      //消息不为空或不为纯数字
      if (!isEmpty(text) && !isNumber(text) && !isEmoji) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.querySelector("div[class='helloworld-translation-message css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim r-1udh08x r-1rozpwm r-fdjqy7']")) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim r-1udh08x r-1rozpwm r-fdjqy7';
        } else {
          div = element.querySelector("div[class='helloworld-translation-message css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-a023e6 r-rjixqe r-16dba41 r-bnwqim r-1udh08x r-1rozpwm r-fdjqy7']");
        }
        div.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color: rgba(239,243,244,1.00);';
        textElement.insertAdjacentElement('beforeend', div);
        let data = {
          q: text, //接收的消息文本
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
            if (!isContainChinese(text) || (isContainJapanese(text) && isContainChinese(text) && (param.sendTo === 'ja' || param.sendTo === 'jp')) || (isContainChinese(text) && param.includeZh)) {
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
    for (var a = 0; a < input.childNodes[0].childNodes.length; a++) {
      var msgElement = input.childNodes[0].childNodes[a].childNodes[0].childNodes;
      for (var b = 0; b < msgElement.length; b++) {
        if (msgElement[b].getAttribute) {
          if (msgElement[b].getAttribute('style') == null) {
            emoji = false;
            if (a > 0 && a < input.childNodes[0].childNodes.length) {
              text += '\n';
            }
          }
          text += msgElement[b].innerText;
        }
      }
    }
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
  let isEmoji = true;
  let childNodes = Array.from(textEle.childNodes);
  childNodes.map((node, index) => {
    if (node.nodeName === 'SPAN') {
      message += node.innerText;
      isEmoji = false;
    } else if (node.nodeName === 'IMG') {
      message += node.alt;
    }
  });
  return {
    text: message,
    isEmoji: isEmoji,
  };
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
      let elementList = document.querySelectorAll('.css-175oi2r.r-obd0qt.r-1wbh5a2');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
      let elementList2 = document.querySelectorAll('.css-175oi2r.r-1habvwh.r-1wbh5a2');
      for (let element2 of elementList2) {
        await receiveMessagesHandler(element2);
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
    let input = document.querySelector("div[class='notranslate public-DraftEditor-content']");
    if (input) {
      window.helloworld.focusWebView();
      await window.selectAllText(input);
      setTimeout(() => {
        window.pasteText(input, message);
        setTimeout(() => {
          let button = document.querySelector("div[class*='css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-13hce6t']");
          if (button) sendMessageHandler(button);
        }, 50);
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
  let direct = 0;
  // "Notifications" and "Messages" - aria-label ending in
  // "unread items". Sum the values for direct badge.
  const notificationsElement = document.querySelector(
      '[data-testid=AppTabBar_Notifications_Link] div div div',
  );
  if (notificationsElement) {
    direct += parseInt(notificationsElement.textContent);
  }
  const DMElement = document.querySelector(
      '[data-testid=AppTabBar_DirectMessage_Link] div div div',
  );
  if (DMElement) {
    direct += parseInt(DMElement.textContent);
  }
  direct && direct >= 1 ? helloworld.setUnreadCount(direct) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
0;
