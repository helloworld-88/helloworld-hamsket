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
    if (className === 'xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f notranslate') {
      inputHandler(element);
    }
    if (
      className === 'xi81zsa x6ikm8r x10wlt62 x47corl x10l6tqk x17qophe xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3' ||
      className === 'xi81zsa x1o0tod x6ikm8r x10wlt62 x47corl x10l6tqk xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3'
    ) {
      inputLanguageHandler(element).then();
    }

    if (className === 'x9f619 x1n2onr6 x1ja2u2z x78zum5 x1r8uery x1iyjqo2 xs83m0k xeuugli x1qughib x6s0dn4 xozqiw3 x1q0g3np xykv574 xbmpl8g x4cne27 xifccgj' || className === 'xfpmyvw x1u998qt x1vjfegm') {
      setTimeout(() => {
        chatLanguageHandler(element).then();
      }, 100);
    }
    if (
      className ===
      'x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r xat24cr x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1c4vz4f x2lah0s x1i64zmx x1emribx x1y1aw1k x1sxyh0 xwib8y2 xurb0ha'
    ) {
      buttonHandler(element);
    }
    if (
        className ===
        'x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r xat24cr x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1c4vz4f x2lah0s x13fj5qh x1xegmmw x1y1aw1k xf159sx xwib8y2 xmzvs34'
    ) {
      buttonHandler(element);
    }
    if (className === 'xuk3077 x57kliw x78zum5 x6prxxf xz9dl7a xsag5q8') {
      setTimeout(() => {
        if (!document.querySelector('.helloworld-friend-translation')) {
          friendTranslationBtnHandler(element).then();
        }
        responseMessageHandler(element);
      }, 100);
    }
    if (className.includes('x1gslohp x14z9mp x12nagc x1lziwak x1yc453h x126k92a')) {
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
 * 输入框语种提示处理
 * @param element
 */
const inputLanguageHandler = async (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (friendData) {
      helloworld.sendLanguage.innerHTML = friendLanguageHandler(friendData, 'send');
    } else {
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
const chatLanguageHandler = async (element) => {
  try {
    helloworld.chatLanguage = document.createElement('div');
    helloworld.chatLanguage.className = 'helloworld-chatLanguage';
    helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
    helloworld.chatLanguage.style.cssText = 'color:var(--primary-text);font-size:13px;';
    element.insertAdjacentElement('afterend', helloworld.chatLanguage);
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (friendData) {
      helloworld.chatLanguage.innerHTML = friendLanguageHandler(friendData, 'message');
    } else {
      helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
    }
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
    div.style.cssText = 'margin-left: 10px;';
    div.innerHTML = '';
    helloworld.responseMessage = div;
    element.insertAdjacentElement('beforebegin', div);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 独立翻译设置按钮
 * @param element
 */
const friendTranslationBtnHandler = async (element) => {
  try {
    let friendSetting = document.createElement('span');
    friendSetting.className = 'x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j helloworld-friend-translation';
    friendSetting.innerHTML = `<div style="padding:0;margin:0 0 7px 5px" title="独立翻译设置" class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1i64zmx x1y1aw1k x1sxyh0 xwib8y2 xurb0ha" role="button" tabindex="0"><svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="24" height="24"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="rgb(0, 132, 255)"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="rgb(0, 132, 255)"></path></svg><div class="x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x1wpzbip x14yjl9h xudhj91 x18nykt9 xww2gxu" data-visualcompletion="ignore"></div></div>`;
    friendSetting.addEventListener('click', friendTranslationModelClickHandler);
    element.insertAdjacentElement('afterbegin', friendSetting);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 独立翻译设置点击事件
 * @returns {Promise<void>}
 */
const friendTranslationModelClickHandler = async () => {
  try {
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    helloworld.showFriendTranslationModal(friendInfo, friendData ? friendData : helloworld.data);
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
    //发送前清空请求翻译提示文本
    setResponseMessage('');
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    //未开启消息翻译直接发送
    if (!param.send) {
      window.sendLock = false;
      button.click();
    } else {
      let message = sendMessageTextHandler(input);
      let text = message.text;
      let emoji = message.emoji;
      //消息文本为空、纯数字、纯表情 直接发送
      if (isEmpty(text) || isNumber(text) || emoji) {
        window.sendLock = false;
        button.click();
      } else {
        let data = {
          q: text, //待翻译文本
          send: true, //是否为发送消息
        };
        setResponseMessage('翻译消息中...');
        translationHandler(param, data, async function (response) {
          if (response.code == 200) {
            setResponseMessage('');
            let translationText = response.text;
            //全选输入框
            window.selectAllText(input);
            setTimeout(() => {
              //覆盖粘贴翻译文本
              simulatePaste(input, translationText);
              setTimeout(() => {
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(input.__lexicalTextContent)) {
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
                setTimeout(() => {
                  scrollToBottom(document.querySelector('._5kRIK'));
                }, 1000);
              }, 100);
            }, 50);
          } else {
            setResponseMessage(`${response.message}`, 'var(--danger)');
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
const receiveMessagesHandler = async (element) => {
  try {
    let isGroup = isGroupMessage();
    let message = receiveMessageTextHandler(element);
    let text = message.text;
    let emoji = message.emoji;
    if (!isEmpty(text) && !isNumber(message) && !emoji) {
      let div;
      let friendInfo = await getFriendTranslation();
      let friendData = window.readFData(friendInfo.friendId);
      let param = friendData ? friendData : helloworld.data;
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      if (!element.parentNode.querySelector("div[class='helloworld-translation-message x1gslohp x11i5rnm x12nagc x1mh8g0r x1yc453h x126k92a']")) {
        div = document.createElement('div');
        div.className = 'helloworld-translation-message x1gslohp x11i5rnm x12nagc x1mh8g0r x1yc453h x126k92a';
      } else {
        div = element.parentNode.querySelector("div[class='helloworld-translation-message x1gslohp x11i5rnm x12nagc x1mh8g0r x1yc453h x126k92a']");
      }
      div.style.cssText =
        'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color:var(--chat-incoming-message-bubble-background-color);border-radius:5px;line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
      element.insertAdjacentElement('afterend', div);
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
          if (!isContainChinese(text) || (isContainChinese(text) && isContainJapanese(text) && (param.sendTo === 'ja' || param.sendTo === 'jp')) || (isContainChinese(text) && param.includeZh)) {
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
    let settextcom = input.childNodes[0];
    let emoji = true;
    let text = '';
    for (let a = 0; a < settextcom.childNodes.length; a++) {
      if (settextcom.childNodes[a].nodeName === 'SPAN') {
        if (settextcom.childNodes[a].className !== 'x1xsqp64 xiy17q3 x1o6pynw x19co3pv xdj266r xcwd3tp xat24cr x39eecv x2b8uid') {
          emoji = false;
        }
        text += settextcom.childNodes[a].innerText;
      }
      if (settextcom.childNodes[a].nodeName === 'BR') {
        text += '\n';
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
 * 好友消息原文处理
 */
const receiveMessageTextHandler = (element) => {
  let text = '';
  let emoji = true;
  if (element.childNodes.length > 1) {
    for (var i = 0; i < element.childNodes.length; i++) {
      if (element.childNodes[i].childNodes.length > 0) {
        if (element.childNodes[i].childNodes[0].nodeName === 'IMG') {
          text += element.childNodes[i].childNodes[0].alt;
        }
        if (element.childNodes[i].nodeName === 'SPAN') {
          text += element.childNodes[i].innerText;
          emoji = false;
        }
      } else {
        if (element.childNodes[i].nodeName === '#text') {
          text += element.childNodes[i].nodeValue;
          emoji = false;
        }
      }
    }
  } else if (element.childNodes.length === 1) {
    text += element.childNodes[0].nodeValue;
    emoji = false;
  }
  return {
    text: text,
    emoji: emoji,
  };
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    return document.querySelector(
      "div[class='x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x193iq5w']"
    );
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
 * 独立语种提示
 * @param data
 * @param type
 */
const friendLanguageHandler = (data, type) => {
  try {
    if (type === 'send') {
      let enable_text = `[独立] 发送消息 [${data.sourceLabel}] ${data.sendFromLabel} => ${data.sendToLabel}`;
      let disable_text = `[独立] 发送消息 [${data.sourceLabel}] 翻译关闭`;
      if (data.send) {
        return enable_text;
      } else {
        return disable_text;
      }
    } else if (type === 'message') {
      let enable_text = `[独立] 接收消息 [${data.sourceLabel}] ${data.messageFromLabel} => ${data.messageToLabel}`;
      let disable_text = `[独立] 接收消息 [${data.sourceLabel}] 翻译关闭`;
      if (data.message) {
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
      let elementList = document.querySelectorAll("div[class*='x1gslohp x14z9mp x12nagc x1lziwak x1yc453h x126k92a']");
      for (let element of elementList) {
        if (element.className != 'helloworld-translation-message x1gslohp x14z9mp x12nagc x1lziwak x1yc453h x126k92a') {
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
 * 独立翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateFriendTranslationParam = async (data) => {
  try {
    window.writeFData(data.friendId, data);
    setTimeout(async () => {
      let elementList = document.querySelectorAll("div[class*='x1gslohp x14z9mp x12nagc x1lziwak x1yc453h x126k92a']");
      for (let element of elementList) {
        if (element.className != 'helloworld-translation-message x1gslohp x14z9mp x12nagc x1lziwak x1yc453h x126k92a') {
          await receiveMessagesHandler(element);
        }
      }
    }, 1000);
    await updateFriendInputLanguage(data);
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
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (helloworld.sendLanguage && !friendData) {
      helloworld.sendLanguage.innerHTML = sendLanguageText;
    }
    if (helloworld.chatLanguage && !friendData) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 更新独立语种提示
 */
const updateFriendInputLanguage = async (data) => {
  try {
    let sendLanguageText = friendLanguageHandler(data, 'send');
    let chatLanguageText = friendLanguageHandler(data, 'message');
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
 * 获取好友翻译设置ID
 * @returns {Promise<null|string>}
 */
const getFriendTranslation = async () => {
  try {
    let user = await getUserId();
    let friend = await getChatId();
    console.log(user,friend)
    let friendTranslationData = {
      friendId: '',
      userName: '',
      userPhone: '',
      friendName: '',
      friendPhone: '',
    };
    if (user && friend) {
      friendTranslationData.friendId = 'messenger_'.concat(user.userid.concat('_').concat(friend.userid));
      friendTranslationData.friendName = friend.name;
      friendTranslationData.friendPhone = friend.phone;
    }
    return friendTranslationData;
  } catch (e) {
    console.error(e);
  }
};
function fbGetCookies() {
  var cookies = {};
  var all = document.cookie;
  if (all === "") {
    return cookies;
  }
  var list = all.split("; ");
  for (var i = 0; i < list.length; i++) {
    var cookie = list[i];
    var p = cookie.indexOf("=");
    var name = cookie.substring(0, p);
    var value = cookie.substring(p + 1);
    value = decodeURIComponent(value);
    cookies[name] = value;
  }
  return cookies;
}
/**
 * 获取当前whatsapp ID
 * @returns {Promise<string>}
 */
const getUserId = async () => {
  try {
    let userId = '';
    let userName = '';
    let cookies = fbGetCookies();
    console.log("====cookie====",cookies)
    if(cookies && cookies.c_user) {
      userId = cookies.c_user;
      userName = userId;
    }
    if (userId) {
      return {
        userid: userId,
        name: userName,
        phone: '',
      };
    } else {
      return '';
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前聊天页面好友ID
 * @returns {Promise<string>}
 */
const getChatId = async () => {
  try {
    let title = document.querySelector(
        'a[class*="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x1rg5ohu x1a2a7pz xs83m0k"]'
    );
    if (title) {
      let friend_name_title = title.querySelector('span[class*="x1hl2dhg x16tdsg8 x1vvkbs xxymvpz x1dyh7pn"]');
      let friend_name = friend_name_title.innerText;
      let friend_id = title.href.replace('https://www.facebook.com/', '').replace('/', '');
      if (friend_name && friend_id) {
        friend_id = friend_id.concat('@c.us');
        return {
          userid: friend_id,
          name: friend_name,
          phone: title.href,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 未读消息监控
 */
const updateBadge = () => {
  let chat = document.querySelector("div[class='x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli xs83m0k x1kpm4gr x1ikap7u']");
  if (chat) {
    let input = chat.querySelector("div[class='xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f notranslate']");
    let sendButton = chat.querySelector(
        "div[class='x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 xe8uvvx xdj266r xat24cr x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1c4vz4f x2lah0s x13fj5qh x1xegmmw x1y1aw1k xf159sx xwib8y2 xmzvs34']"
    );
    let input_language = chat.querySelector("div[class='xi81zsa x1o0tod x6ikm8r x10wlt62 x47corl x10l6tqk xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3']");
    let input_language2 = chat.querySelector("div[class='xi81zsa x17qophe x6ikm8r x10wlt62 x47corl x10l6tqk xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3']");
    let chat_language = chat.querySelector("div[class='xfpmyvw x1u998qt x1vjfegm']");
    let button = chat.querySelector("div[class='xuk3077 x57kliw x78zum5 x6prxxf xz9dl7a xsag5q8']");
    if (input) {
      if (!input.getAttribute('helloworld-id')) inputHandler(input);
    }
    if (sendButton) {
      if (!sendButton.getAttribute('helloworld-id')) buttonHandler(sendButton);
    }
    if (input_language) {
      if (!input_language.getAttribute('helloworld-id')) inputLanguageHandler(input_language).then();
    }
    if (input_language2) {
      if (!input_language2.getAttribute('helloworld-id')) inputLanguageHandler(input_language2).then();
    }
    if (chat_language) {
      if (!chat.querySelector("div[class='helloworld-chatLanguage']")) chatLanguageHandler(chat_language).then();
    }
    if (button) {
      if (
          !chat.querySelector(
              "span[class='x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j helloworld-friend-translation']"
          )
      ) {
        friendTranslationBtnHandler(button).then();
      }
      if (!chat.querySelector("div[class='helloworld-responseMessage']")) {
        responseMessageHandler(button);
      }
    }
  }
  let t = 0;
  let e1 = document.querySelector('span[class="x6s0dn4 xtk6v10 x3nfvp2 x5yr21d xl56j7k xexx8yu x18d9i69 x1t2a60a x1mpkggp xh8yej3"]');
  let e2 = document.querySelectorAll('div[class="x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1fmog5m xu25z0z x140muxe xo1y3bh x1q0g3np x87ps6o x1lku1pv x78zum5 x1a2a7pz"]');
  if(e1){
    t = parseInt(e1.innerText);
    t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
    return;
  } else if(e2){
    t = e2.length;
    t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
    return;
  }else {
    const e = document.querySelectorAll("span[class='x6s0dn4 xzolkzo x12go9s9 x1rnf11y xprq8jg x9f619 x3nfvp2 xl56j7k xwnonoy x170jfvy x1fsd2vl']");
    t = e.length;
    t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
    return;
  }
};
window.setInterval(updateBadge, 3000);
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.__fb-light-mode.x1n2onr6{ --chat-outgoing-message-bubble-background-color: #0080ff !important; }';
document.head.appendChild(style);
/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("div[class='xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f notranslate']");
    if (input) {
      window.helloworld.focusWebView();
      input.focus();
      setTimeout(() => {
        simulatePaste(input, message);
        setTimeout(() => {
          sendMessageHandler();
        }, 20);
      }, 30);
    }
  } catch (e) {
    console.error(e);
  }
};
function simulatePaste(element, text) {
  // 聚焦元素
  element.focus();

  // 尝试使用 execCommand 插入文本
  const successful = document.execCommand('insertText', false, text);

  if (!successful) {
    // 如果 execCommand 失败，手动设置值
    if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
      const startPos = element.selectionStart || 0;
      const endPos = element.selectionEnd || 0;

      element.value = element.value.substring(0, startPos) +
          text +
          element.value.substring(endPos);

      // 更新光标位置
      element.selectionStart = element.selectionEnd = startPos + text.length;
    } else {
      // 对于其他可编辑元素
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();

      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // 移动光标到插入文本的末尾
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
0;
