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
    if (className === 'text chatroomEditor-module__textarea__yKTlH') {
      inputHandler(element);
      setTimeout(() => {
        responseMessageHandler(element);
        let actionGroup = document.querySelectorAll('.actionGroup-module__button_action__VwNgx');
        for (let action of actionGroup) {
          if (action.getAttribute('data-type') === 'sticker') {
            inputLanguageHandler(action).then();
          }
          if (action.getAttribute('data-type') === 'capture') {
            friendTranslationBtnHandler(action).then();
          }
        }
        let chatTitle = document.querySelector('.chatroomHeader-module__info__2my0W');
        if (chatTitle) {
          chatLanguageHandler(chatTitle).then();
        }
      }, 50);
    }
    if (className === 'gnb-module__button_action__aTdj7') {
      if (element.getAttribute('aria-label') === 'Chat') {
        //存在工单信息
        if (helloworld.data.counter && helloworld.data.counterState) {
          if (helloworld.data.counterNumber && helloworld.data.counterPortID) {
            await window.uploadInitialFriends(helloworld.data.counterNumber, helloworld.data.counterPortID);
          }
        }
        syncContacts().then();
      }
    }
    if (
      className === 'message-module__message__7odk3   messageLayout-module__message__YVDhk ' ||
      className === 'replyMessage-module__message__U55Bo  message-module__message__7odk3   messageLayout-module__message__YVDhk '
    ) {
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
 * 输入框语种提示处理
 * @param element
 */
const inputLanguageHandler = async (element) => {
  try {
    let sendLanguage = document.querySelector('.helloworld-sendLanguage');
    if (!sendLanguage) {
      helloworld.sendLanguage = document.createElement('div');
      helloworld.sendLanguage.className = 'helloworld-sendLanguage';
      helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
      helloworld.sendLanguage.style.cssText = 'color: #555;font-size: 12.5px;';
      element.insertAdjacentElement('beforebegin', helloworld.sendLanguage);
    }
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
    let chatLanguage = document.querySelector('.helloworld-chatLanguage');
    if (!chatLanguage) {
      helloworld.chatLanguage = document.createElement('div');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage';
      helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
      helloworld.chatLanguage.style.cssText = 'color: #555;font-size: 12.5px;';
      element.insertAdjacentElement('beforeend', helloworld.chatLanguage);
    }
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
    if (!document.querySelector('#helloworld-responseMessage')) {
      let span = document.createElement('span');
      span.id = 'helloworld-responseMessage';
      span.style.cssText = 'position:absolute;top:-15px;font-size:13px;';
      span.setAttribute('helloworld-id', 'helloworld-responseMessage');
      helloworld.responseMessage = span;
      element.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 插入独立翻译设置按钮
 * @param element
 */
const friendTranslationBtnHandler = async (element) => {
  try {
    let friendSetting = document.querySelector('.actionGroup-module__button_action__VwNgx.helloworld-friend-translation');
    if (!friendSetting) {
      let setting = document.createElement('button');
      setting.className = 'actionGroup-module__button_action__VwNgx helloworld-friend-translation';
      setting.setAttribute('data-type', 'helloworld-friend-translation');
      setting.setAttribute('data-tooltip', '独立翻译设置');
      setting.innerHTML = `<i class="icon"><svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="24" height="24"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg></i>`;
      setting.addEventListener('click', friendTranslationModelClickHandler);
      element.insertAdjacentElement('afterend', setting);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 独立翻译设置点击事件
 * @returns {Promise<void>}
 */
const friendTranslationModelClickHandler = async (e) => {
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
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----输入框回车发送错误!-----${e}`);
  }
};
/**
 * 消息发送按钮点击事件
 * @param event
 */
const enterSendMessage = (event) => {
  try {
    if (!(event && event.isTrusted)) {
      helloworld.input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          view: window,
          bubbles: true,
        })
      );
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送消息错误!-----${e}`);
  }
};
/**
 * 文本消息发送处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async () => {
  try {
    //发送前清空请求翻译提示文本
    setResponseMessage('');
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    let input = helloworld.input;
    //未开启消息翻译直接发送
    if (!param.send) {
      window.sendLock = false;
      enterSendMessage();
    } else {
      //拼接源文本
      let text = sendMessageTextHandler(input);
      if (isEmpty(text) || isNumber(text)) {
        window.sendLock = false;
        enterSendMessage();
      } else {
        let data = {
          q: text, //文本
          send: true, //自己发送
        };
        setResponseMessage('翻译消息中...');
        //发送消息翻译处理
        translationHandler(param, data, function (response) {
          if (response.code == 200) {
            setResponseMessage('');
            let translationText = response.text;
            //全选输入框;
            document.execCommand('selectAll');
            setTimeout(() => {
              //覆盖粘贴翻译文本
              input.insertValue([translationText]);
              setTimeout(() => {
                let checkTranslationText = sendMessageTextHandler(input);
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(checkTranslationText)) {
                  //开启了发送中文消息 翻译接口返回的文本检测到包含中文 直接发送
                  if (param.includeZh) {
                    enterSendMessage();
                    window.sendLock = false;
                  } else {
                    //未开启发送中文消息 翻译接口返回的文本检测到包含中文 阻止发送
                    setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                    window.sendLock = false;
                  }
                } else {
                  enterSendMessage();
                  window.sendLock = false;
                }
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
    let isGroup = isGroupMessage(element.parentNode);
    let textEle = element.querySelector('.textMessageContent-module__text__EFwEN');
    if (textEle) {
      let message = receiveMessageTextHandler(textEle);
      if (!isEmpty(message) && !isNumber(message)) {
        let pre;
        let friendInfo = await getFriendTranslation();
        let friendData = window.readFData(friendInfo.friendId);
        let param = friendData ? friendData : helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.querySelector("pre[class='helloworld-translation-message textMessageContent-module__text__EFwEN']")) {
          pre = document.createElement('pre');
          pre.className = 'helloworld-translation-message textMessageContent-module__text__EFwEN';
        } else {
          pre = element.querySelector("pre[class='helloworld-translation-message textMessageContent-module__text__EFwEN']");
        }
        pre.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;font-family:none;visibility: visible;user-select: text;margin-top: 3px;';
        textEle.insertAdjacentElement('afterend', pre);
        let data = {
          q: message, //文本
          send: false, //自己发送
        };
        //开启了消息翻译
        if (param.message) {
          pre.innerHTML = '正在翻译消息中...';
          //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
          if (
            !isContainChinese(message) ||
            (isContainChinese(message) && isContainJapanese(message) && (param.sendTo === 'ja' || param.sendTo === 'jp')) ||
            (isContainChinese(message) && param.includeZh)
          ) {
            let msgCache = queryMsgCache(param, data);
            if (msgCache) {
              msgCache = msgCache.replaceAll('\\n', '\n');
              pre.innerHTML = msgCache;
            } else {
              //群组消息并且开启了自动群组翻译
              if (isGroup) {
                if (param.group) {
                  autoTranslationHandler(param, data, pre);
                } else {
                  clickTranslationHandler(param, data, pre);
                }
              } else {
                //私人消息
                autoTranslationHandler(param, data, pre);
              }
            }
          } else {
            pre.innerHTML = '';
          }
        } else {
          pre.innerHTML = '';
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
    return input.rawValue;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = (element) => {
  let message = '';
  if (element.childNodes[0]) {
    message = element.childNodes[0].innerText;
  }
  return message;
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    return document.querySelector('.chatroomHeader-module__member_count__s6hqu');
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
 * 更新全局翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateGlobalTranslationParam = async (data) => {
  try {
    window.helloworld.data = data;
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.message-module__message__7odk3');
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
 * 更新独立翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateFriendTranslationParam = async (data) => {
  try {
    window.writeFData(data.friendId, data);
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.message-module__message__7odk3');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }, 500);
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
 * 更新全局翻译语种提示
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
 * 更新独立翻译语种提示
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
    let user = await getUserInfo();
    let friend = await getChatId();
    let friendTranslationData = {
      friendId: '',
      userName: '',
      userPhone: '',
      friendName: '',
      friendPhone: '',
    };
    if (user && friend) {
      let userId = user.userid ? user.userid : user.mid;
      friendTranslationData.friendId = 'line_'.concat(userId.concat('_').concat(friend.userid));
      friendTranslationData.friendName = friend.name ? friend.name : '';
      friendTranslationData.friendPhone = friend.phone ? friend.phone : '';
      friendTranslationData.userName = user.displayName ? user.displayName : '';
      friendTranslationData.userPhone = user.phone ? user.phone : '';
    }
    return friendTranslationData;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前Line账户 MID
 * @returns {Promise<string>}
 */
const getUserInfo = async () => {
  try {
    let user = localStorage.getItem('line_userInfo');
    if (!user) {
      user = await new Promise((resolve, reject) => {
        getLineInfo(function (res) {
          if (res) {
            let data = JSON.parse(res).data;
            if (data) {
              resolve(data);
              localStorage.setItem('line_userInfo', JSON.stringify(data));
            } else {
              resolve(null);
            }
          }
        });
      });
      return user;
    } else {
      return JSON.parse(user);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前聊天页面好友MID
 * @returns {Promise<string>}
 */
const getChatId = async () => {
  try {
    let userid = '';
    let name = '';
    let chats = document.querySelectorAll('.chatlistItem-module__chatlist_item__MOwxh ');
    for (let chat of chats) {
      if (chat.getAttribute('aria-current') === 'true') {
        let isGroup = document.querySelector('.chatroomHeader-module__member_count__s6hqu');
        name = document.querySelector('.chatroomHeader-module__name__t-K11').innerText;
        if (isGroup) {
          userid = chat.getAttribute('data-mid').concat('@g.us');
        } else {
          userid = chat.getAttribute('data-mid').concat('@c.us');
        }
      }
    }
    if (userid && name) {
      return {
        userid: userid,
        name: name,
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
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("textarea-ex[class='text chatroomEditor-module__textarea__yKTlH']");
    if (input) {
      window.helloworld.focusWebView();
      input.focus();
      // await window.selectAllText(input);
      setTimeout(() => {
        input.insertValue([message]);
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
  const e = document.querySelectorAll('.gnb-module__badge__nU45a.badge-module__badge__Eh36I ');
  for (let n = 0; n < e.length; n++) {
    t += parseInt(e[n].innerHTML);
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);

/**
 * 获取line账户信息
 * @param callback
 */
const getLineInfo = async (callback) => {
  let postData = JSON.stringify([1]);
  await LINE_HTTPS('getProfile', postData, callback);
};
/**
 * 获取联系人ID
 */
const getAllContactIdsV2 = async () => {
  let postData = JSON.stringify([1]);
  let ids = localStorage.getItem('line_contactIds');
  if (!ids) {
    ids = await new Promise((resolve, reject) => {
      LINE_HTTPS('getAllContactIds', postData, function (rsp) {
        if (rsp) {
          let ids = JSON.parse(rsp).data;
          if (ids) {
            localStorage.setItem('line_contactIds', JSON.stringify(ids));
            resolve(ids);
          } else {
            resolve(null);
          }
        }
      });
    });
    return ids;
  } else {
    return JSON.parse(ids);
  }
};
/**
 * 获取联系人信息
 */
const getContactsV2 = async () => {
  let ids = await getAllContactIdsV2();
  if (ids) {
    let contactsArray = [];
    var result = splitArray(ids, 100);
    for (const resultElement of result) {
      let postData = '[{"targetUserMids":' + JSON.stringify(resultElement) + ',"neededContactCalendarEvents":[]},1]';
      let rspData = await new Promise((resolve) => {
        LINE_HTTPS('getContactsV2', postData, function (rsp) {
          if (rsp) {
            let contacts = JSON.parse(rsp).data.contacts;
            if (contacts) {
              resolve(contacts);
            } else {
              resolve([]);
            }
          }
        });
      });
      contactsArray.push(rspData);
    }
    var mergedObj = {};
    for (const resultElement of contactsArray) {
      for (var attr in resultElement) {
        mergedObj[attr] = resultElement[attr];
      }
    }
    localStorage.setItem('line_contactsV2', JSON.stringify(mergedObj));
    return mergedObj;
  } else {
    return null;
  }
};

/**
 * 保存文件图片
 * @param url
 * @param fileName
 */
window.saveAsFile = (url, fileName) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(xhr.response);
    a.click();
  };
  xhr.send();
};

/**
 * 获取好友数据并上传服务器
 * @returns {Promise<void>}
 */
window.uploadInitialFriends = async function (counterNumber, counterPortID) {
  try {
    helloworld.data.counter = true;
    helloworld.data.counterNumber = counterNumber;
    helloworld.data.counterPortID = counterPortID;
    let userDetail = {};
    let fansDetail = [];
    let cacheUserDetail = localStorage.getItem('userDetail');
    let cacheFansDetail = localStorage.getItem('fansDetail');
    if (cacheUserDetail && JSON.parse(cacheUserDetail).lineAccount && cacheFansDetail) {
      console.info('从缓存获取好友数据');
      userDetail = JSON.parse(cacheUserDetail);
      fansDetail = JSON.parse(cacheFansDetail);
      const data = {
        loginType: '电脑端登录',
        userDetail: userDetail,
        fansDetail: fansDetail,
        serialNumber: counterNumber,
        wsid: counterPortID,
      };
      console.info('缓存获取数据成功,开始上传好友数据', data);
      helloworld.uploadInitialFriends(data);
    } else {
      console.info('从API获取好友数据');
      let line_userInfo = await getUserInfo();
      let contacts = await getContactsV2();
      if (contacts) {
        for (let key in contacts) {
          fansDetail.push({
            lineAccount: contacts[key].contact.mid,
            nickname: contacts[key].contact.displayName,
            headImg: 'https://profile.line-scdn.net' + contacts[key].contact.picturePath + '/preview',
          });
        }
      }
      if (line_userInfo) {
        userDetail = {
          lineAccount: line_userInfo.mid,
          nickname: line_userInfo.displayName,
          headImg: 'https://profile.line-scdn.net' + line_userInfo.picturePath + '/preview',
        };
      }
      localStorage.setItem('userDetail', JSON.stringify(userDetail));
      localStorage.setItem('fansDetail', JSON.stringify(fansDetail));
      const data = {
        loginType: '电脑端登录',
        userDetail: userDetail,
        fansDetail: fansDetail,
        serialNumber: counterNumber,
        wsid: counterPortID,
      };
      console.info('API获取数据成功,开始上传好友数据', data);
      helloworld.uploadInitialFriends(data);
    }
  } catch (e) {
    console.error(e);
  }
};
function unbindCounter() {
  helloworld.data.counter = false;
  helloworld.data.counterState = false;
  helloworld.data.counterNumber = '';
  helloworld.data.counterPortID = '';
}
let LineTime;
const counterListener = () => {
  try {
    helloworld.data.counter = true;
    helloworld.data.counterState = true;
    clearInterval(LineTime);
    LineTime = setInterval(sendHeartbeat, 6000 * 10);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 发送心跳校验工单
 */
const sendHeartbeat = () => {
  console.info('发送心跳');
  //发送心跳检测工单
  window.helloworld.sendHeartbeat({
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
  });
  //上传在线状态
  window.helloworld.uploadOnlineState({
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
    status: '在线',
  });
};
/**
 * 上传新粉
 */
const uploadNewFriends = async (ids) => {
  try {
    let contacts;
    for (let key in ids) {
      if (key) {
        let postData = '[{"targetUserMids":["' + key + '"],"neededContactCalendarEvents":[]},1]';
        contacts = await new Promise((resolve, reject) => {
          LINE_HTTPS('getContactsV2', postData, function (rsp) {
            if (rsp) {
              let contacts = JSON.parse(rsp).data.contacts;
              if (contacts) {
                resolve(contacts);
              } else {
                resolve(null);
              }
            }
          });
        });
        if (contacts) {
          let fansDetail = [];
          let userDetail = {};
          let line_userInfo = await getUserInfo();
          if (line_userInfo) {
            userDetail = {
              lineAccount: line_userInfo.mid,
              nickname: line_userInfo.displayName,
              headImg: 'https://profile.line-scdn.net' + line_userInfo.picturePath + '/preview',
            };
          }
          fansDetail.push({
            lineAccount: contacts[key].contact.mid,
            nickname: contacts[key].contact.displayName,
            headImg: 'https://profile.line-scdn.net' + contacts[key].contact.picturePath + '/preview',
          });
          const timestamp = Math.floor(new Date().getTime() / 1000);
          const jsonData = {
            serialNumber: helloworld.data.counterNumber,
            wsid: helloworld.data.counterPortID,
            userDetail: userDetail,
            fansDetail: fansDetail,
            time: timestamp,
          };
          helloworld.uploadNewFriends(jsonData);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * line 请求API
 * @param requestName
 * @param postData
 * @param callback
 * @returns {Promise<void>}
 * @constructor
 */
const LINE_HTTPS = async (requestName, postData, callback) => {
  let xhr = new XMLHttpRequest();
  let cookie = window.lineCookie.getAccessToken();
  let path = '/api/talk/thrift/Talk/TalkService/' + requestName;
  //组装数据，为了先计算x-hmac的签名
  let hmac_payload = {
    accessToken: cookie,
    path: path,
    body: postData,
  };
  //等待计算结果
  let hmac = await window.lineSign().getHmac(hmac_payload);
  //组装必要的Header
  xhr.open('POST', 'https://line-chrome-gw.line-apps.com' + path, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-Line-Access', cookie); // 添加cookie的值
  xhr.setRequestHeader('X-Hmac', hmac); // 添加hmac的值
  xhr.setRequestHeader('X-Line-Chrome-Version', window.SENTRY_RELEASE.id.split('@')[1]);
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        callback(xhr.response);
      } else {
        callback(null);
      }
    }
  };
  //发送post请求
  xhr.send(postData);
};
(function (xhr) {
  var XHR = XMLHttpRequest.prototype;
  var open = XHR.open;
  var send = XHR.send;
  var setRequestHeader = XHR.setRequestHeader;
  XHR.open = function (method, url) {
    this._url = url;
    this._requestHeaders = {};
    this._startTime = new Date().toISOString();
    return open.apply(this, arguments);
  };
  XHR.setRequestHeader = function (header, value) {
    this._requestHeaders[header] = value;
    return setRequestHeader.apply(this, arguments);
  };
  XHR.send = function (postData) {
    this.addEventListener('load', function () {
      var myUrl = this._url ? this._url.toLowerCase() : this._url;
      if (myUrl) {
        if (postData) {
          if (typeof postData === 'string') {
            try {
              this._requestHeaders = postData;
            } catch (err) {
              console.error(err);
            }
          } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
            // do something if you need
          }
        }
        try {
          //个人信息
          if (this._url === 'https://line-chrome-gw.line-apps.com/api/talk/thrift/Talk/TalkService/getProfile') {
            let rsp = JSON.parse(this.responseText);
            if (rsp.code !== 1) {
              localStorage.setItem('line_userInfo', JSON.stringify(rsp.data));
              window.helloworld.setLineCookie();
            }
          }
          //新消息人信息
          if (this._url === 'https://line-chrome-gw.line-apps.com/api/talk/thrift/Talk/TalkService/getMessageBoxesByIds') {
            let rsp = JSON.parse(this.responseText);
            if (rsp.code !== 1) {
              if (rsp.data && rsp.data.messageBoxesByIds && helloworld.data.counterNumber){
                uploadNewFriends(rsp.data.messageBoxesByIds).then();
              }
            }
          }
          //所有好友ID
          if (this._url === 'https://line-chrome-gw.line-apps.com/api/talk/thrift/Talk/TalkService/getAllContactIds') {
            let rsp = JSON.parse(this.responseText);
            if (rsp.code !== 1) {
              localStorage.setItem('line_contactIds', JSON.stringify(rsp.data));
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
    return send.apply(this, arguments);
  };
})(XMLHttpRequest);

let localNumber = (() => {
  let e = (crypto.getRandomValues(new Uint32Array(1))[0] >>> 1) - 1;
  return () => ((e = ++e % 2 ** 31), e);
})();

let createMsgTime = function (e, t) {
  let ty = { server: Date.now(), origin: performance.now() };
  void 0 === e && (e = 1), void 0 === t && (t = 'floor');
  var r = ty.server - ty.origin + performance.now(),
    n = 60 * new Date().getTimezoneOffset() * 1e3;
  return Math[t]((r - n) / e) * e + n;
};

window.ipcRenderer.on('sendMessageFn', async function (event, data) {
  console.info('sendMessageFn', JSON.parse(data));
  let message = await window.sendMessageFn(JSON.parse(data));
  console.info(message);
});
window.sendMessageFn = async function (data) {
  let userStr = localStorage.getItem('line_userInfo');
  if (userStr) {
    let user = JSON.parse(userStr);
    let message = await lineSendMsgAPI(user.mid, data.chatId, data.content);
    console.info('message:', message);
  }
};
/**
 * line 发送消息
 * @param from
 * @param to
 * @param msg
 * @param callback
 */
let lineSendMsgAPI = async (from, to, msg, callback) => {
  let id = 'local-' + localNumber();
  let msgTime = createMsgTime(1e3, 'ceil');
  let data = {
    from: from,
    to: to,
    toType: 0,
    id: id,
    createdTime: msgTime,
    sessionId: 0,
    text: msg,
    contentType: 0,
    contentMetadata: {},
    hasContent: false,
  };
  //发送消息  方式1
  let message = await window.line_sendMessage(data);
  return message;
};
/**
 * 时间戳转换时间格式
 * @param timestamp
 * @returns {string}
 */
function timestampToTime(timestamp) {
  // 确保timestamp是数值类型
  if (typeof timestamp === 'string') {
    timestamp = parseInt(timestamp, 10);
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要+1，并且可能需要补0
  const day = ('0' + date.getDate()).slice(-2); // 日期可能需要补0
  const hours = ('0' + date.getHours()).slice(-2); // 小时可能需要补0
  const minutes = ('0' + date.getMinutes()).slice(-2); // 分钟可能需要补0
  const seconds = ('0' + date.getSeconds()).slice(-2); // 秒可能需要补0

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/**
 * 同步所有联系人数据到客户端
 */
window.syncContacts = async function () {
  let contactsObj = await getContacts();
  let contactsAry = Object.values(contactsObj);
  let groupsAry = await getGroups();
  contactsAry = contactsAry.map((c) => getContactModel(c.contact));
  groupsAry = groupsAry.map((g) => getGroupModel(g));
  let contacts = contactsAry.concat(groupsAry);
  contacts = contacts.sort(function (a, b) {
    return !a.isGroup;
  });
  console.info(contacts);
  window.helloworld.syncContacts(contacts);
};
/**
 * 格式化联系人信息
 * @param contact
 * @returns {{}}
 */
function getContactModel(contact) {
  let res = {};
  res.id = contact.mid;
  res.name = contact.displayName;
  res.profile = contact.picturePath ? 'https://profile.line-scdn.net' + contact.picturePath + '/preview' : 'resources/img/def.png';
  res.isGroup = false;
  res.phone = '';
  res.link = '';

  return res;
}
/**
 * 格式化群组信息
 * @param group
 * @returns {{}}
 */
function getGroupModel(group) {
  let res = {};
  res.id = group.chatMid;
  res.name = group.chatName;
  res.profile = group.picturePath ? 'https://profile.line-scdn.net' + group.picturePath + '/preview' : 'resources/img/def_g.png';
  res.isGroup = true;
  res.phone = '';
  res.link = '';

  return res;
}
/**
 * 获取联系人
 */
async function getContacts() {
  try {
    let ids = await getAllContactIds();
    let contactsArray = [];
    if (ids) {
      var result = splitArray(ids, 100);
      for (const resultElement of result) {
        let postData = '[{"targetUserMids":' + JSON.stringify(resultElement) + ',"neededContactCalendarEvents":[]},1]';
        let rspData = await new Promise((resolve) => {
          LINE_HTTPS('getContactsV2', postData, function (rsp) {
            if (rsp) {
              let contacts = JSON.parse(rsp).data.contacts;
              if (contacts) {
                resolve(contacts);
              } else {
                resolve([]);
              }
            }
          });
        });
        contactsArray.push(rspData);
      }
      var mergedObj = {};
      for (const resultElement of contactsArray) {
        for (var attr in resultElement) {
          mergedObj[attr] = resultElement[attr];
        }
      }
      return mergedObj;
    }
  } catch (e) {
    if (e) return [];
    throw e;
  }
}
function splitArray(array, size) {
  var result = [];
  for (var i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
/**
 * 获取联系人ID
 */
const getAllContactIds = async () => {
  try {
    let postData = JSON.stringify([1]);
    return await new Promise((resolve) => {
      LINE_HTTPS('getAllContactIds', postData, function (rsp) {
        if (rsp) {
          let ids = JSON.parse(rsp).data;
          if (ids) {
            resolve(ids);
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch (e) {
    if (e) return [];
    throw e;
  }
};
/**
 * 获取群组
 */
async function getGroups() {
  try {
    let ids = await getAllChatMids();
    if (ids) {
      let postData = '[{"chatMids":' + JSON.stringify(ids) + ',"withMembers":true,"withInvitees":true},1]';
      return await new Promise((resolve) => {
        LINE_HTTPS('getChats', postData, function (rsp) {
          if (rsp) {
            let chats = JSON.parse(rsp).data.chats;
            if (chats) {
              resolve(chats);
            } else {
              resolve(null);
            }
          }
        });
      });
    }
  } catch (e) {
    if (e) return [];
    throw e;
  }
}
/**
 * 获取群组ID
 */
const getAllChatMids = async () => {
  try {
    let postData = JSON.stringify([{ withMemberChats: true, withInvitedChats: true }, 1]);
    return await new Promise((resolve, reject) => {
      LINE_HTTPS('getAllChatMids', postData, function (rsp) {
        if (rsp) {
          let ids = JSON.parse(rsp).data.memberChatMids;
          if (ids) {
            localStorage.setItem('line_groupIds', JSON.stringify(ids));
            resolve(ids);
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch (e) {
    if (e) return [];
    throw e;
  }
};
/**
 * 打开指定联系人对话窗口
 * @param id
 * @returns {Promise<void>}
 */
window.openChatWindow = async function (id) {
  let chat = document.querySelector(`div[class="chatlistItem-module__chatlist_item__MOwxh "][data-mid="${id}"]`);
  window.helloworld.focusWebView();
  setTimeout(()=>{
    if(chat){
      chat.childNodes[2].click();
    }
  },100)
};
/**
 * 导出指定联系人聊天数据
 * @param id
 * @returns {Promise<*[]>}
 */
window.exportChatMsgs = async function (id) {
  let postData = '["' + id + '",1000]';
  let chatMsgs = await new Promise((resolve, reject) => {
    LINE_HTTPS('getRecentMessagesV2', postData, function (rsp) {
      if (rsp) {
        let chats = JSON.parse(rsp).data;
        if (chats) {
          resolve(chats);
        } else {
          resolve([]);
        }
      }
    });
  });
  const messages = await window.lineDb().decryptMessageList(chatMsgs);
  if (messages) {
    let msgsJSON = [];
    for (let msg of messages) {
      let msgTime = timestampToTime(msg.createdTime);
      msgsJSON.push({
        id: msg.id,
        from: msg.from,
        to: msg.to,
        type: msg.toType,
        message: msg.text ? msg.text : '无消息文本',
        time: msgTime,
      });
    }
    msgsJSON = msgsJSON.sort((a, b) => a.time - b.time);
    console.info(msgsJSON);
    return msgsJSON;
  } else {
    return [];
  }
};
0;
