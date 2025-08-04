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
    let sendBtn = document.querySelector("div[class*='x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9']");
    let sendBtn2 = document.querySelector("div[class*='x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo xdl72j9']");
    if (sendBtn) buttonHandler(sendBtn);
    if (sendBtn2) buttonHandler(sendBtn2);
    if (className.includes('xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f')) {
      inputHandler(element);
    }
    if (
      className === 'xi81zsa x6ikm8r x10wlt62 x47corl x10l6tqk x17qophe xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3' ||
      className === 'xi81zsa x17qophe x6ikm8r x10wlt62 x47corl x10l6tqk xlyipyv x13vifvy x87ps6o xuxw1ft xh8yej3'
    ) {
      inputLanguageHandler(element).then();
    }
    if (className === 'x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf x193iq5w xeuugli x1r8uery x1iyjqo2 xs83m0k xsyo7zv x16hj40l x10b6aqq x1yrsyyn') {
      chatLanguageHandler(element).then();
    }
    if (
      className ===
      'x4k7w5x x1h91t0o x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1n2onr6 x1qrby5j x1jfb8zj'
    ) {
      setTimeout(() => {
        responseMessageHandler(element);
      }, 1000);
    }
    if (className.includes('xpvyfi4 xzueoph x1v0swvf')) {
      setTimeout(() => {
        friendTranslationBtnHandler(element).then();
      }, 500);
    }
    if (className.includes('x1yc453h x126k92a')) {
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
    helloworld.sendLanguage.style.cssText = 'font-size:12px;line-height:25px;';
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
    helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
    helloworld.chatLanguage.style.cssText = 'color: rgb(var(--ig-secondary-text));font-size:13px;margin-top:5px;';
    element.insertAdjacentElement('beforeend', helloworld.chatLanguage);
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
    div.setAttribute('helloworld-id', 'helloworld-responseMessage');
    div.style.cssText = 'margin-left: 30px;';
    div.innerHTML = '';
    helloworld.responseMessage = div;
    element.insertAdjacentElement('beforebegin', div);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 全局翻译设置按钮
 * @param element
 */
const friendTranslationBtnHandler = async (element) => {
  try {
    let setting = document.createElement('div');
    setting.title = '独立翻译设置';
    setting.className =
      'x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1iorvi4 x150jy0e xjkvuk6 x1e558r4 helloworld-friend-translation';
    setting.innerHTML = `<svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="26" height="26"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg>`;
    setting.addEventListener('click', friendTranslationModelClickHandler);
    element.insertAdjacentElement('beforebegin', setting);
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
          if (!helloworld.sendButton) {
            let sendBtn = document.querySelector("div[class*='x1i10hfl xjqpnuy xa49m3k xqeqjp1 x2hbi6w xdl72j9']");
            if (sendBtn) buttonHandler(sendBtn);
          }
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
      let text = sendMessageTextHandler(input);
      //消息文本为空、纯数字、纯表情 直接发送
      if (isEmpty(text) || isNumber(text)) {
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
              simulatePaste(input,translationText);
              setTimeout(()=>{
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(input.innerText)) {
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
              },100);
            }, 100);
            window.sendLock = false;
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
    if (!isEmpty(message) && message.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '') && !isNumber(message)) {
      let div;
      let friendInfo = await getFriendTranslation();
      let friendData = window.readFData(friendInfo.friendId);
      let param = friendData ? friendData : helloworld.data;
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      if (!element.parentNode.querySelector("div[class='helloworld-translation-message x6prxxf x1fc57z9 x1yc453h x126k92a']")) {
        div = document.createElement('div');
        div.className = 'helloworld-translation-message x6prxxf x1fc57z9 x1yc453h x126k92a';
      } else {
        div = element.parentNode.querySelector("div[class='helloworld-translation-message x6prxxf x1fc57z9 x1yc453h x126k92a']");
      }
      div.style.cssText =
        'color:var(--helloworldColor);font-size:var(--helloworldSize);background-color: rgb(var(--ig-highlight-background));border-radius: 5px;line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
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
          clickTranslationHandler(param, data, div);
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
  let message = '';
  let childNodes = Array.from(element.childNodes);
  childNodes.forEach((element) => {
    if (element.nodeName === '#text') {
      message += `${element.textContent}`;
    }
    if (
      element.nodeName === 'SPAN' &&
      element.className === 'html-span xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs x3nfvp2 x1j61x8r x1fcty0u xdj266r xhhsvwb xat24cr xgzva0m xxymvpz xlup9mm x1kky2od'
    ) {
      message += element.childNodes[0].alt;
    }
  });
  return message;
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    let activeChat = document.querySelector('div.x13dflua.x19991ni .x19g9edo');
    if(activeChat){
      let length = activeChat.querySelector("div[class='x1n2onr6']").childNodes.length;
      if(length){
        return length !== 1;
      }else {
        return false;
      }
    }else {
      return  false;
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
      let elementList = document.querySelectorAll('.x1yc453h.x126k92a');
      for (let element of elementList) {
        if (element.className != 'helloworld-translation-message x6prxxf x1fc57z9 x1yc453h x126k92a') {
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
 * 更新独立翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateFriendTranslationParam = async (data) => {
  try {
    window.writeFData(data.friendId, data);
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.x1yc453h.x126k92a');
      for (let element of elementList) {
        if (element.className != 'helloworld-translation-message x6prxxf x1fc57z9 x1yc453h x126k92a') {
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
    let userName = await getUserInfo();
    let friend = await getChatId();
    console.log(userName,friend)
    let friendTranslationData = {
      friendId: '',
      userName: '',
      userPhone: '',
      friendName: '',
      friendPhone: '',
    };
    if (userName && friend) {
      friendTranslationData.friendId = 'instagram_'.concat(userName.concat('_').concat(friend.userid));
      friendTranslationData.userName = userName;
      friendTranslationData.friendName = friend.name;
      friendTranslationData.friendPhone = friend.phone;
    }
    return friendTranslationData;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前whatsapp ID
 * @returns {Promise<string>}
 */
const getUserInfo = async () => {
  try {
    let userName = document.querySelector(
        "span[class='x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft']"
    );
    if (userName) {
      return userName.innerText;
    } else {
      return null;
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
    let friendNode = document.querySelector("div[class='x6s0dn4 x1bs97v6 x1q0q8m5 xso031l x9f619 x78zum5 x1q0g3np xr931m4 xat24cr x4lt0of x1swvt13 x1pi30zi xh8yej3']");
    let friendNode2 = document.querySelector("a[class*='x1i10hfl xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf']");
    if (friendNode) {
      let userid = '';
      let name = '';
      let phone = '';
      let friend_title = friendNode.querySelector("span[class='x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft']");
      let friend_a = friendNode.querySelector('a');
      if (friend_title) {
        name = friend_title.innerText;
        if (friend_a) {
          phone = friend_a.href.replaceAll('https://www.instagram.com/', '').replace('/', '');
          userid = friend_a.href.replaceAll('https://www.instagram.com/', '').replace('/', '');
        } else {
          userid = friend_title.innerText;
        }
      }
      if (userid && name) {
        if (isGroupMessage()) {
          userid = userid.concat('@g.us');
        } else {
          userid = userid.concat('@c.us');
        }
        return {
          userid: userid,
          name: name,
          phone: phone,
        };
      } else {
        return '';
      }
    }else if(friendNode2) {
      let userid = '';
      let name = '';
      let phone = '';
      let friend_title = friendNode2.querySelector("span[class='x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft']");
      if (friend_title) {
        name = friend_title.innerText;
        phone = friendNode2.href.replaceAll('https://www.instagram.com/', '').replace('/', '');
        userid = friendNode2.href.replaceAll('https://www.instagram.com/', '').replace('/', '');
      }
      if (userid && name) {
        userid = userid.concat('@c.us');
        return {
          userid: userid,
          name: name,
          phone: phone,
        };
      } else {
        return '';
      }
    }else {
      return "";
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
    let input = document.querySelector("div[class*='xzsf02u x1a2a7pz x1n2onr6 x14wi4xw x1iyjqo2 x1gh3ibb xisnujt xeuugli x1odjw0f']");
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
/**
 * 未读消息监控
 */
const updateBadge = () => {
  let t = 0;
  const e = document.querySelectorAll("span[class='html-span xdj266r x14z9mp xat24cr x1lziwak x1hl2dhg x16tdsg8 x1vvkbs x9f619 xwmz7sl x1ncwhqj xo1l8bm xyqdw3p xg8j3zb xaso8d8 x1gabggj']");
  for (let n = 0; n < e.length; n++) {
    t += parseInt(e[n].innerHTML);
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
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
