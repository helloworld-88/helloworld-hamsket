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
  try {
    let className = element.className;
    if (className && className.includes) {
      let input = document.querySelector("md-input-container[class*='md-input-has-placeholder gvMessageEntry-inputContainer']");
      let input2 = document.querySelector('.cdk-textarea-autosize.message-input');
      if (input) {
        inputHandler(input.childNodes[1]);
        inputLanguageHandler(input.childNodes[1]).then();
      }
      if (input2) {
        inputHandler2(input2);
        inputLanguageHandler(input2).then();
      }
      let sendButton = document.querySelector("button[class*='mat-mdc-tooltip-trigger gv-icon-button mdc-icon-button mat-mdc-icon-button mat-primary']");
      let sendButton2 = document.querySelector("button[class*='gv-icon-button mat-mdc-tooltip-trigger mdc-icon-button mat-mdc-icon-button mat-primary mat-mdc-button']");
      if (sendButton) buttonHandler(sendButton);
      if (sendButton2) buttonHandler(sendButton2);

      let picture = document.querySelector("div[class='layout-align-center-stretch layout-column flex-nogrow gvMessageEntry-attachmentContainer']");
      let picture2 = document.querySelector("button[class='gv-icon-button mat-mdc-tooltip-trigger mdc-icon-button mat-mdc-icon-button mat-accent mat-mdc-button-base']");
      if (picture) {
        friendTranslationBtnHandler(picture).then();
      }
      if (picture2) {
        friendTranslationBtnHandler2(picture2).then();
      }
      let title = document.querySelector("div[class='layout-align-center-stretch layout-column flex']");
      if (title) chatLanguageHandler(title).then();

      if (className === 'content ng-star-inserted') {
        setTimeout(() => {
          receiveMessagesHandler(element).then();
        }, 10);
      }
      let footer = document.querySelector("div[class='gvThreadDetails-messageEntryContainer']");
      if (footer) responseMessageHandler(footer);
      let newMessageBtn = document.querySelector("div[class='gvMessagingView-conversationListHeader']");
      if (newMessageBtn) massSendHandler(newMessageBtn);
    }
  } catch (e) {
    console.error(e);
  }
};
const massSendHandler = (element) => {
  try {
    if (!element.querySelector("div[class='gvMessagingView-actionButton layout-align-start-center layout-row helloworld-massSend']")) {
      element.style.display = 'flex';
      let massSendDiv = document.createElement('div');
      massSendDiv.addEventListener('click', massSendBtnClick, true);

      element.insertAdjacentHTML(
        'beforeend',
        `<div aria-label="群发消息" gv-id="send-new-message" gv-test-id="send-new-message" layout="row" layout-align="start center" ng-class="::ctrl.Css.ACTION_BUTTON" ng-click="ctrl.onNewMessageClick()" ng-disabled="ctrl.isSendSmsDisabled()" ng-if="ctrl.shouldShowMessageActionButton()" role="button" tabindex="0" class="gvMessagingView-actionButton layout-align-start-center layout-row helloworld-massSend" aria-disabled="false">
            <div flex="none" ng-class="::[ctrl.Css.ACTION_BUTTON_ICON]" ng-disabled="ctrl.isSendSmsDisabled()" class="gvMessagingView-actionButtonIcon flex-none" aria-disabled="false">
              <svg t="1704942305703" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4716" width="24" height="24"><path d="M639.742894 383.405203c0 0 11.768021-201.079668 191.358259-242.523569l0-77.771271L959.461613 191.982476 831.612807 319.789327l0-78.112032C831.612807 241.677295 715.467553 226.327702 639.742894 383.405203z" fill="#00796b" p-id="4717"></path><path d="M320.156182 319.736115l256.320806 0 0 63.893192-256.320806 0 0-63.893192Z" fill="#00796b" p-id="4718"></path><path d="M320.156182 576.488757l384.65466 0 0 63.874773-384.65466 0 0-63.874773Z" fill="#00796b" p-id="4719"></path><path d="M894.124536 382.313336l-63.828724 0 0 385.255341L256.195451 767.568676 256.195451 191.921078l384.675126-0.106424 0-63.999616L191.918519 127.815037l0.002047 127.562281L64.344982 255.377318l-0.340761 703.774745 702.19476 0L766.198981 831.589782 894.124536 831.589782 894.124536 382.313336zM702.37128 895.131981 128.269897 895.131981 128.269897 319.483358l63.650669-0.017396 0.008186 512.122797 510.441505 0L702.370257 895.131981z" fill="#00796b" p-id="4720"></path></svg>
            </div>
            <div class="gmat-subhead-2 grey-900" ng-class="ctrl.isSendSmsDisabled() ? ctrl.Css.ACTION_BUTTON_DISABLED_TEXT : ''">
              群发消息
            </div>
          </div>`
      );
      element.querySelector('.helloworld-massSend').addEventListener('click', massSendBtnClick, true);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 群发点击按钮显示群发面板
 * @returns {Promise<void>}
 */
const massSendBtnClick = () => {
  debugger;
  try {
    let number = document.querySelector("div[class='phone-number-details ng-star-inserted']").childNodes[1];
    let phone = document.querySelector("div[class='phone-number-details ng-star-inserted']").childNodes[0];
    if (number && phone) {
      window.helloworld.showGoogleVoiceMassSendView(number.innerText.replace(/\s*/g, ''), phone.innerText.replace(/\s*/g, ''));
    }
  } catch (e) {
    console.error(e);
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
const inputHandler2 = (input) => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keyup', inputKeydownHandler2, true);
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
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (friendData) {
      helloworld.sendLanguage = friendLanguageHandler(friendData, 'send');
    } else {
      helloworld.sendLanguage = globalLanguageHandler('send');
    }
    element.setAttribute('placeholder', helloworld.sendLanguage);
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
    if (!document.querySelector("div[class='helloworld-chatLanguage']")) {
      helloworld.chatLanguage = document.createElement('div');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage';
      helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage');
      helloworld.chatLanguage.style.cssText = 'font-size:12px;z-index: 99999;';
      element.insertAdjacentElement('beforeend', helloworld.chatLanguage);
      let friendInfo = await getFriendTranslation();
      let friendData = window.readFData(friendInfo.friendId);
      if (friendData) {
        helloworld.chatLanguage.innerHTML = friendLanguageHandler(friendData, 'message');
      } else {
        helloworld.chatLanguage.innerHTML = globalLanguageHandler('message');
      }
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
    if (!document.querySelector('.helloworld-responseMessage')) {
      let div = document.createElement('div');
      div.className = 'helloworld-responseMessage';
      div.setAttribute('helloworld-id', 'helloworld-responseMessage');
      div.innerHTML = '';
      helloworld.responseMessage = div;
      element.insertAdjacentElement('beforebegin', div);
    }
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
    if (!document.querySelector("div[class='layout-align-center-stretch layout-column flex-nogrow gvMessageEntry-attachmentContainer helloworld-friendTranslation']")) {
      let friendSetting = document.createElement('div');
      friendSetting.style.cssText = 'margin-left: -15px;';
      friendSetting.className = 'layout-align-center-stretch layout-column flex-nogrow gvMessageEntry-attachmentContainer helloworld-friendTranslation';
      friendSetting.innerHTML = `<button title="独立翻译设置" class="mat-mdc-tooltip-trigger gv-icon-button mdc-icon-button mat-mdc-icon-button mat-accent mat-mdc-button-base ng-star-inserted"><svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="24" height="24"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg></button>`;
      friendSetting.addEventListener('click', friendTranslationModelClickHandler);
      element.insertAdjacentElement('afterend', friendSetting);
    }
  } catch (e) {
    console.error(e);
  }
};
const friendTranslationBtnHandler2 = async (element) => {
  try {
    if (!document.querySelector("button[class='gv-icon-button mat-mdc-tooltip-trigger mdc-icon-button mat-mdc-icon-button mat-accent mat-mdc-button-base helloworld-friendTranslation']")) {
      let friendSetting = document.createElement('button');
      friendSetting.style.cssText = 'margin-left: -5px;';
      friendSetting.className = 'gv-icon-button mat-mdc-tooltip-trigger mdc-icon-button mat-mdc-icon-button mat-accent mat-mdc-button-base helloworld-friendTranslation';
      friendSetting.innerHTML = `<svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="24" height="24"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg>`;
      friendSetting.addEventListener('click', friendTranslationModelClickHandler);
      element.insertAdjacentElement('afterend', friendSetting);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 好友翻译设置点击事件
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
      if (evt.key === 'Enter' && !evt.shiftKey) {
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
const inputKeydownHandler2 = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter' && !evt.shiftKey) {
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
 * 文本消息发送处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async () => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = helloworld.sendButton;
    //拼接源文本
    let text = sendMessageTextHandler(input);
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
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
          input.value = response.text;
          fireMessageInput(input);
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
            scrollToBottom(document.querySelector('gv-thread-item-list').childNodes[0]);
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

/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async (element) => {
  try {
    let message = receiveMessageTextHandler(element);
    let isGroup = isGroupMessage();
    if (!isEmpty(message) && !isNumber(message)) {
      let gvAnnotation;
      let friendInfo = await getFriendTranslation();
      let friendData = window.readFData(friendInfo.friendId);
      let param = friendData ? friendData : helloworld.data;
      document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
      document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
      document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
      if (!element.parentNode.querySelector("gv-annotation[class='helloworld-translation-message']")) {
        gvAnnotation = document.createElement('gv-annotation');
        gvAnnotation.className = 'helloworld-translation-message';
      } else {
        gvAnnotation = element.parentNode.querySelector("gv-annotation[class='helloworld-translation-message']");
      }
      gvAnnotation.style.cssText = 'display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
      gvAnnotation.innerHTML = '正在翻译消息中...';
      element.insertAdjacentElement('afterend', gvAnnotation);
      let data = {
        q: message, //文本
        send: false, //自己发送
      };
      let msgCache = queryMsgCache(param, data);
      if (msgCache) {
        gvAnnotation.innerHTML = msgCache;
      } else {
        //开启了消息翻译
        if (param.message) {
          gvAnnotation.innerHTML = '正在翻译消息中...';
          //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
          if (
            !isContainChinese(message) ||
            (isContainChinese(message) && isContainJapanese(message) && (param.sendTo === 'ja' || param.sendTo === 'jp')) ||
            (isContainChinese(message) && param.includeZh)
          ) {
            //群组消息并且开启了自动群组翻译
            if (isGroup) {
              if (param.group) {
                autoTranslationHandler(param, data, gvAnnotation);
              } else {
                clickTranslationHandler(param, data, gvAnnotation);
              }
            } else {
              //私人消息
              autoTranslationHandler(param, data, gvAnnotation);
            }
          } else {
            gvAnnotation.innerHTML = '';
          }
        } else {
          gvAnnotation.innerHTML = '';
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
    return input.value;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = (element) => {
  try {
    return element.innerText;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 是否为群组消息
 */
const isGroupMessage = () => {
  try {
    let chatNode = document.querySelector('.layout-align-center-stretch.layout-column.flex');
    if (chatNode && chatNode.childNodes.length > 8) {
      if (chatNode.querySelector('.gvMessageListHeader-subtitlePhone')) {
        return false;
      } else {
        return true;
      }
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
 * 好友独立语种提示
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
 * 更新全局语种提示
 */
const updateGlobalInputLanguage = async () => {
  try {
    let sendLanguageText = globalLanguageHandler('send');
    let chatLanguageText = globalLanguageHandler('message');
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (helloworld.sendLanguage && !friendData) {
      helloworld.sendLanguage = sendLanguageText;
      if (helloworld.input) helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
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
      helloworld.sendLanguage = sendLanguageText;
      if (helloworld.input) helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
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
    helloworld.data = data;
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.content.ng-star-inserted');
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
 * 更新全局翻译参数
 * @param data
 * @returns {Promise<void>}
 */
window.updateFriendTranslationParam = async (data) => {
  try {
    window.writeFData(data.friendId, data);
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.content.ng-star-inserted');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
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
 * 获取好友翻译设置ID
 * @returns {Promise<null|string>}
 */
const getFriendTranslation = async () => {
  try {
    let userId = await getUserId();
    let friend = await getChatId();
    let friendTranslationData = {
      friendId: '',
      userName: '',
      userPhone: '',
      friendName: '',
      friendPhone: '',
    };
    if (userId && friend) {
      friendTranslationData.friendId = 'googleVoice_'.concat(userId.concat('_').concat(friend.userid));
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
const getUserId = async () => {
  try {
    let userData = document.querySelector("div[class='phone-number-details ng-star-inserted'] span[class='cdk-visually-hidden']");
    let userid = '';
    if (userData) {
      userid = userData.innerHTML;
      if (userid) {
        userid = userid.replace(/\s+/g, '');
        return userid;
      } else {
        return '';
      }
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
    let chat = document.querySelector('.gvThreadItem-selected');
    let userid = '';
    let name = '';
    let phone = '';
    if (chat && chat.getAttribute) {
      userid = chat.getAttribute('gv-thread-id');
      userid = userid.replace('t.', '');
      name = chat.querySelector('.gvThreadItem-contacts').innerText;
      if (userid) {
        phone = userid;
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
    } else {
      return '';
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 将聊天页面拉到最底部
 * @param element
 */
const scrollToBottom = (element) => {
  try {
    const currentScroll = element.scrollTop; // 已经被卷掉的高度
    const clientHeight = element.offsetHeight; // 容器高度
    const scrollHeight = element.scrollHeight; // 内容总高度
    if (scrollHeight > currentScroll + clientHeight) {
      element.scrollTo(0, scrollHeight);
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
  const e = document.querySelectorAll('.navItemBadge.ng-star-inserted');
  for (let n = 0; n < e.length; n++) {
    t += parseInt(e[n].innerHTML.trim());
  }
  t && t >= 1 ? helloworld.setUnreadCount(t / 2) : helloworld.clearUnreadCount();
  let a = document.querySelectorAll('a[target="_blank"]');
  a.forEach((link) => {
    // 方案1：移除target属性（默认页内跳转）
    link.removeAttribute('target');
    // 方案2：或者设置为_self（明确指定页内跳转）
    // link.setAttribute('target', '_self');
  });
};
window.setInterval(updateBadge, 3000);
/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    window.helloworld.focusWebView();
    let input = document.querySelector("md-input-container[class*='md-input-has-placeholder gvMessageEntry-inputContainer']");
    let input2 = document.querySelector("textarea[class*='cdk-textarea-autosize message-input']");
    if (input) {
      input.childNodes[1].focus();
      setTimeout(() => {
        input.childNodes[1].value = message;
        fireMessageInput(input.childNodes[1]);
        setTimeout(() => {
          sendMessageHandler();
        }, 20);
      }, 30);
    }
    if (input2) {
      input2.focus();
      setTimeout(() => {
        input2.value = message;
        fireMessageInput(input2);
        setTimeout(() => {
          sendMessageHandler();
        }, 20);
      }, 30);
    }
  } catch (e) {
    console.error(e);
  }
};
const setGoogleVoiceCookie = (SAPISID, SECURE_3PSID, SECURE_3PSIDTS) => {
  if (SAPISID !== '' && SECURE_3PSID !== '' && SECURE_3PSIDTS !== '') {
    localStorage.setItem('SAPISID', SAPISID);
    localStorage.setItem('SECURE_3PSID', SECURE_3PSID);
    localStorage.setItem('SECURE_3PSIDTS', SECURE_3PSIDTS);
    window.COOKIE_SAPISID = SAPISID;
    window.COOKIE_SECURE_3PSID = SECURE_3PSID;
    window.COOKIE_SECURE_3PSIDTS = SECURE_3PSIDTS;
  }
};
window.ipcRenderer.on('googleVoiceMassSendHandler', (event, args) => {
  if (args) {
    if (!window.COOKIE_SAPISID) {
      window.COOKIE_SAPISID = localStorage.getItem('SAPISID');
    }
    if (!window.COOKIE_SECURE_3PSID) {
      window.COOKIE_SECURE_3PSID = localStorage.getItem('SECURE_3PSID');
    }
    if (!window.COOKIE_SECURE_3PSIDTS) {
      window.COOKIE_SECURE_3PSIDTS = localStorage.getItem('SECURE_3PSIDTS');
    }
    if (window.COOKIE_SAPISID !== '' && window.COOKIE_SECURE_3PSID !== '' && window.COOKIE_SECURE_3PSIDTS !== '') {
      args.COOKIE_SAPISID = COOKIE_SAPISID;
      args.COOKIE_SECURE_3PSID = COOKIE_SECURE_3PSID;
      args.COOKIE_SECURE_3PSIDTS = COOKIE_SECURE_3PSIDTS;
      window.helloworld.googleVoiceMassSendHandler(args);
    }
  }
});
window.ipcRenderer.on('googleVoiceStopMassSend', (event, phone) => {
  window.helloworld.googleVoiceStopMassSend(phone);
});
0;
