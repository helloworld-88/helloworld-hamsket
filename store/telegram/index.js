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
const parseElement = async (element) => {
  let version = compareWebVersions();
  let className = element.className;
  if (className && className.includes) {
    // a版本
    if (version === 'a') {
      if (className === 'ChatInfo') {
        setTimeout(() => {
          elementHandler_A(element).then();
        }, 10);
      }
      if (className === 'modal-dialog') {
        setTimeout(() => {
          fileElementHandler_A(element);
        }, 10);
      }
      if (className.includes('Message message-list-item')) {
        receiveMessagesHandler_A(element).then();
      }
      if (className === 'SponsoredMessage Message open') {
        receiveMessagesHandler_A(element).then();
      }
      if (className.includes('MessageList custom-scroll')) {
        setTimeout(() => {
          scrollToBottom(element);
        }, 1000);
      }
      console.info(element);
      if (className.includes('ListItem Chat')) {
        //存在工单信息 进行绑定
        if (helloworld.data.counter && helloworld.data.counterState) {
          if (helloworld.data.counterNumber && helloworld.data.counterPortID) {
            setTimeout(() => {
              uploadNewFriends(element).then();
            }, 1000);
          }
        }
      }
      if (className === 'last-message shared-canvas-container') {
        //存在工单信息 进行绑定
        if (helloworld.data.counter && helloworld.data.counterState) {
          if (helloworld.data.counterNumber && helloworld.data.counterPortID) {
            setTimeout(() => {
              uploadNewFriends(element.parentNode.parentNode.parentNode.parentNode).then();
            }, 1000);
          }
        }
      }
    }
    // k版本
    else if (version == 'k') {
      if (className === 'preloader') {
        setTimeout(() => {
          elementHandler_K();
          fileElementHandler_K();
        }, 10);
      }
      if (className.includes('bbubbles has-groups has-sticky-dates')) {
        setTimeout(() => {
          scrollToBottom(element);
        }, 1000);
      }
    }
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
 * 翻译所需元素处理
 */
const elementHandler_A = async (element) => {
  try {
    let layout = document.querySelector("div[class='messages-layout']");
    if (layout) {
      let input = layout.querySelector("div[class='form-control allow-selection']");
      let sendButton = layout.querySelector("button[class='Button send main-button default secondary round click-allowed']");
      let sendLanguage = layout.querySelector("span[class='placeholder-text']");
      let emojiButton = layout.querySelector("button[class*='button symbol-menu-button default translucent round']");
      let footer = layout.querySelector("div[class='middle-column-footer']");
      let userStatus = element.querySelector("span[class='user-status']");
      let groupStatus = element.querySelector("span[class='group-status']");
      if (input) inputHandler_A(input);
      if (sendButton) buttonHandler_A(sendButton);
      if (sendLanguage) inputLanguageHandler_A(sendLanguage).then();
      if (footer) responseMessageHandler_A(footer);
      chatLanguageHandler_A(userStatus, groupStatus).then();
      if (emojiButton) friendTranslationBtnHandler_A(emojiButton).then();
    }
  } catch (e) {
    console.error(e);
  }
};
const elementHandler_K = () => {
  try {
    let input =
      document.querySelector("div[class='input-message-input is-empty scrollable scrollable-y no-scrollbar']") ||
      document.querySelector("div[class='input-message-input scrollable scrollable-y no-scrollbar']");
    let sendButton = document.querySelector('.btn-icon.rp.btn-circle.btn-send.animated-button-icon');
    let chatLanguage = document.querySelector('.chat-info-container .chat-info .content');
    let responseText = document.querySelector('.chat-input-container.chat-input-main-container');
    let emojiButton = document.querySelector('.btn-icon.toggle-emoticons');
    let sendLanguage = document.querySelector('.input-field-placeholder.i18n');
    if (input) inputHandler_K(input).then();
    if (sendButton) buttonHandler_K(sendButton);
    if (chatLanguage) chatLanguageHandler_K(chatLanguage).then();
    if (responseText) responseMessageHandler_K(responseText);
    if (sendLanguage) inputLanguageHandler_K(sendLanguage).then();
    if (emojiButton) friendTranslationBtnHandler_K(emojiButton).then();
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送框处理 A版本
 * @param input
 */
const inputHandler_A = (input) => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input-a');
    helloworld.input.addEventListener('keydown', inputKeydownHandler_A, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送框处理 K版本
 * @param input
 */
const inputHandler_K = async (input) => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input-k');
    helloworld.input.addEventListener('keydown', inputKeydownHandler_K, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送按钮处理 a版本
 * @param sendButton
 */
const buttonHandler_A = (sendButton) => {
  try {
    helloworld.sendButton = sendButton;
    helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton-a');
    helloworld.sendButton.removeEventListener('click', sendButtonClickHandler_A);
    helloworld.sendButton.addEventListener('click', sendButtonClickHandler_A, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送按钮处理 k版本
 * @param sendButton
 */
const buttonHandler_K = (sendButton) => {
  try {
    helloworld.sendButton = sendButton;
    helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton-k');
    helloworld.sendButton.addEventListener('click', sendButtonClickHandler_K, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 发送消息语种提示处理 A版本
 * @param element
 */
const inputLanguageHandler_A = async (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage-a');
    helloworld.sendLanguage.style.cssText = 'font-size:12px;top:21px;';
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
 * 发送消息语种提示处理 K版本
 */
const inputLanguageHandler_K = async (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage-a');
    helloworld.sendLanguage.style.cssText = 'font-size:12px;';
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
 * 接收消息语种提示处理 a版本
 * @param userStatus
 * @param groupStatus
 */
const chatLanguageHandler_A = async (userStatus, groupStatus) => {
  try {
    let chatLanguage = document.querySelector('.helloworld-chatLanguage-a');
    if (!chatLanguage) {
      helloworld.chatLanguage = document.createElement('span');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage-a';
      helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage-a');
      helloworld.chatLanguage.style.cssText = 'display: flex;font-size:12px;color:var(--primary-color) !important;';
      if (userStatus) {
        userStatus.parentNode.insertAdjacentElement('beforeend', helloworld.chatLanguage);
      }
      if (groupStatus) {
        groupStatus.parentNode.insertAdjacentElement('beforeend', helloworld.chatLanguage);
      }
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
 * 接收消息语种提示处理 K版本
 * @param element
 */
const chatLanguageHandler_K = async (element) => {
  try {
    let chatLanguage = element.querySelector('.helloworld-chatLanguage-k');
    if (!chatLanguage) {
      helloworld.chatLanguage = document.createElement('span');
      helloworld.chatLanguage.className = 'helloworld-chatLanguage-k';
      helloworld.chatLanguage.setAttribute('helloworld-id', 'helloworld-chatLanguage-k');
      helloworld.chatLanguage.style.cssText = 'display: flex;font-size:12px;margin-top: -3px;color:var(--primary-color) !important;';
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
 * 翻译接口返回消息处理 A版本
 * @param element
 */
const responseMessageHandler_A = (element) => {
  try {
    if (!document.querySelector('#helloworld-responseMessage')) {
      let span = document.createElement('span');
      span.id = 'helloworld-responseMessage';
      span.setAttribute('helloworld-id', 'helloworld-responseMessage-a');
      span.innerHTML = '';
      helloworld.responseMessage = span;
      element.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 翻译接口返回消息处理 K版本
 * @param element
 */
const responseMessageHandler_K = (element) => {
  try {
    if (!document.querySelector('.helloworld-responseMessage')) {
      let span = document.createElement('span');
      span.className = 'helloworld-responseMessage';
      span.setAttribute('helloworld-id', 'helloworld-responseMessage-k');
      span.innerHTML = '';
      helloworld.responseMessage = span;
      element.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件类翻译所需元素处理 a版本
 * @param element
 */
const fileElementHandler_A = (element) => {
  try {
    let fileInput = element.querySelector('#editable-message-text-modal');
    let sendLanguage = element.querySelector('.placeholder-text');
    let responseText = element.querySelector('#caption-input-text');
    let fileButton = element.querySelector('.Button.default.primary');
    if (fileInput) {
      fileInputHandler_A(fileInput);
    }
    if (fileButton && fileButton.parentNode.className !== 'modal-content custom-scroll' && fileButton.parentNode.className !== 'dialog-buttons' && fileButton.parentNode.className !== '_YQbrXkD') {
      fileButtonHandler_A(fileButton);
    }
    if (sendLanguage) {
      fileInputLanguageHandler_A(sendLanguage).then();
    }
    if (responseText) {
      fileResponseMessageHandler_A(responseText);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件类翻译所需元素处理 k版本
 */
const fileElementHandler_K = () => {
  try {
    let fileChat = document.querySelector("div[class='popup-container z-depth-1']");
    if (fileChat) {
      let fileInput = fileChat.querySelector('.input-message-input.is-empty.scrollable.scrollable-y.no-scrollbar');
      let fileButton = fileChat.querySelector("button[class='btn-primary btn-color-primary']");
      let fileSendLanguage = fileChat.querySelector('.input-field-placeholder.i18n');
      let responseText = fileChat.querySelector("div[class='popup-input-container']");
      if (fileInput) fileInputHandler_K(fileInput);
      if (fileButton) fileButtonHandler_K(fileButton);
      if (responseText) fileResponseMessageHandler_K(responseText);
      if (fileSendLanguage) fileInputLanguageHandler_K(fileSendLanguage).then();
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件输入框处理 A版本
 * @param fileInput
 */
const fileInputHandler_A = (fileInput) => {
  try {
    helloworld.fileInput = fileInput;
    helloworld.fileInput.setAttribute('helloworld-id', 'helloworld-fileInput-a');
    helloworld.fileInput.addEventListener('keydown', fileInputKeydownHandler_A, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件输入框处理 K版本
 * @param fileInput
 */
const fileInputHandler_K = (fileInput) => {
  try {
    helloworld.fileInput_k = fileInput;
    helloworld.fileInput_k.setAttribute('helloworld-id', 'helloworld-fileInput-k');
    helloworld.fileInput_k.addEventListener('keydown', fileInputKeydownHandler_K, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件发送按钮处理 A版本
 * @param fileButton
 */
const fileButtonHandler_A = (fileButton) => {
  try {
    helloworld.fileButton = fileButton;
    helloworld.fileButton.setAttribute('helloworld-id', 'helloworld-fileButton-a');
    helloworld.fileButton.onmousedown = fileButtonClickHandler_A;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件发送按钮处理 K版本
 * @param fileButton
 */
const fileButtonHandler_K = (fileButton) => {
  try {
    helloworld.fileButton_k = fileButton;
    helloworld.fileButton_k.setAttribute('helloworld-id', 'helloworld-fileButton-k');
    helloworld.fileButton_k.onclick = fileButtonClickHandler_K;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件发送消息语种提示处理 A版本
 * @param element
 */
const fileInputLanguageHandler_A = async (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage-a');
    helloworld.sendLanguage.style.cssText = 'font-size:12px;top:21px;';
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
 * 文件发送消息语种提示处理 K版本
 * @param element
 */
const fileInputLanguageHandler_K = async (element) => {
  try {
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage-a');
    helloworld.sendLanguage.style.cssText = 'font-size:12px;top:21px;';
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
 * 文件翻译返回状态处理 A版本
 * @param element
 */
const fileResponseMessageHandler_A = (element) => {
  try {
    if (!document.querySelector('.helloworld-fileResponseMessage-a')) {
      let span = document.createElement('span');
      span.className = 'helloworld-fileResponseMessage-a';
      span.innerHTML = '';
      helloworld.fileResponseMessage = span;
      element.parentNode.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 文件翻译返回状态处理 K版本
 * @param element
 */
const fileResponseMessageHandler_K = (element) => {
  try {
    if (!document.querySelector('.helloworld-fileResponseMessage-k')) {
      let span = document.createElement('span');
      span.className = 'helloworld-fileResponseMessage-k';
      span.innerHTML = '';
      helloworld.fileResponseMessage = span;
      element.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 独立翻译设置按钮 A版本
 * @param element
 */
const friendTranslationBtnHandler_A = async (element) => {
  try {
    let friendTranslationButton = document.querySelector('.helloworld-friend-translation');
    if (!friendTranslationButton) {
      let friendSetting = document.createElement('button');
      friendSetting.className = 'Button composer-action-button symbol-menu-button default translucent round helloworld-friend-translation';
      friendSetting.title = '独立翻译设置';
      friendSetting.style.cssText = 'margin-left: 10px !important;';
      friendSetting.innerHTML = `<svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="26" height="26"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg>`;
      friendSetting.addEventListener('click', friendTranslationModelClickHandler);
      element.insertAdjacentElement('afterend', friendSetting);
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 独立翻译设置按钮 K版本
 * @param element
 */
const friendTranslationBtnHandler_K = async (element) => {
  try {
    let friendTranslationButton = document.querySelector('.helloworld-friend-translation');
    if (!friendTranslationButton) {
      let friendSetting = document.createElement('button');
      friendSetting.className = 'btn-icon helloworld-friend-translation';
      friendSetting.title = '独立翻译设置';
      friendSetting.innerHTML = `<svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="26" height="26"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="#54656f"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="#54656f"></path></svg>`;
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
 * 消息输入框回车事件处理 a版本
 * @param evt
 */
const inputKeydownHandler_A = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        let button = document.querySelector('.send.default.secondary.round.click-allowed');
        if (button) {
          buttonHandler_A(button);
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
          if (!window.sendLock) {
            window.sendLock = true;
            sendMessageHandler_A().then();
          }
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----输入框回车发送错误!-----${e}`);
  }
};
/**
 * 消息输入框回车事件处理 k版本
 * @param evt
 */
const inputKeydownHandler_K = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          sendMessageHandler_K(evt).then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----输入框回车发送错误!-----${e}`);
  }
};
/**
 * 文件输入框回车事件 A版本
 * @param evt
 */
const fileInputKeydownHandler_A = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          fileMessageHandler_A().then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----文件输入框回车发送错误!-----${e}`);
  }
};
/**
 * 文件输入框回车事件 K版本
 * @param evt
 */
const fileInputKeydownHandler_K = (evt) => {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          fileMessageHandler_K().then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----文件输入框回车发送错误!-----${e}`);
  }
};
/**
 * 消息发送按钮点击事件 a版本
 * @param evt
 */
const sendButtonClickHandler_A = (evt) => {
  try {
    if (evt.isTrusted) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      if (!window.sendLock) {
        window.sendLock = true;
        sendMessageHandler_A().then();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};
/**
 * 消息发送按钮点击事件 k版本
 * @param evt
 */
const sendButtonClickHandler_K = (evt) => {
  try {
    if (evt.isTrusted) {
      if (!evt.target.parentNode.className.includes('record')) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          sendMessageHandler_K(evt).then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};
/**
 * 文件发送按钮点击事件 A版本
 * @param evt
 */
const fileButtonClickHandler_A = (evt) => {
  try {
    if (evt) {
      if (evt.isTrusted) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          fileMessageHandler_A().then();
        }
      }
    } else {
      if (helloworld.fileButton) {
        helloworld.fileButton.dispatchEvent(
          new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            screenX: 12,
            screenY: 13,
          })
        );
      } else {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};
/**
 * 文件发送按钮点击事件 K版本
 * @param evt
 */
const fileButtonClickHandler_K = (evt) => {
  try {
    if (evt) {
      if (evt.isTrusted) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          fileMessageHandler_K().then();
        }
      }
    } else {
      if (helloworld.fileButton_k) {
        helloworld.fileButton_k.dispatchEvent(
          new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
            screenX: 12,
            screenY: 13,
          })
        );
      } else {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
};
/**
 * 文本消息发送处理 a版本
 * @returns {Promise<void>}
 */
const sendMessageHandler_A = async (btn) => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    //拼接源文本
    let message = sendMessageTextHandler_A(input);
    let text = message.text;
    let emoji = message.emoji;
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setResponseMessage('翻译消息中...');
      //发送消息翻译处理
      translationHandler(param, data, async function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          await helloworldSleep(30);
          window.pasteText(input, translationText);
          await helloworldSleep(30);
          let checkTranslationText = sendMessageTextHandler_A(input);
          if (isContainChinese(checkTranslationText.text)) {
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              button.click();
            } else {
              //开启了中文发送 通过中文检测
              if (param.includeZh) {
                button.click();
              } else {
                setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
              }
            }
          } else {
            button.click();
          }
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
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
 * 文本消息发送处理 k版本
 * @returns {Promise<void>}
 */
const sendMessageHandler_K = async () => {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = helloworld.sendButton;
    //拼接源文本
    let message = sendMessageTextHandler_A(input);
    let text = message.text;
    let emoji = message.emoji;
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setResponseMessage('翻译消息中...');
      //发送消息翻译处理
      translationHandler(param, data, async function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          await helloworldSleep(30);
          window.pasteText(input, translationText);
          await helloworldSleep(30);
          let checkTranslationText = sendMessageTextHandler_A(input);
          if (isContainChinese(checkTranslationText.text)) {
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              button.click();
            } else {
              //开启了中文发送 通过中文检测
              if (param.includeZh) {
                button.click();
              } else {
                setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
              }
            }
          } else {
            button.click();
          }
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
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
 * 文件消息发送处理 A版本
 * @returns {Promise<void>}
 */
const fileMessageHandler_A = async () => {
  try {
    setFileResponseMessage('');
    let input = helloworld.fileInput;
    let button = helloworld.fileButton;
    //拼接源文本
    let message = sendMessageTextHandler_A(input);
    let text = message.text;
    let emoji = message.emoji;
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setFileResponseMessage('翻译消息中...');
      //发送消息翻译处理
      translationHandler(param, data, async function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setFileResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          await helloworldSleep(30);
          window.pasteText(input, translationText);
          await helloworldSleep(30);
          let checkTranslationText = sendMessageTextHandler_A(input);
          if (isContainChinese(checkTranslationText.text)) {
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              fileButtonClickHandler_A();
            } else {
              //开启了中文发送 通过中文检测
              if (param.includeZh) {
                fileButtonClickHandler_A();
              } else {
                setFileResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
              }
            }
          } else {
            fileButtonClickHandler_A();
          }
        } else {
          setFileResponseMessage(`${response.message}`, 'var(--danger)');
        }
      });
    } else {
      fileButtonClickHandler_A();
      window.sendLock = false;
    }
  } catch (e) {
    window.sendLock = false;
    console.error(e);
  }
};
/**
 * 文件消息发送处理 K版本
 * @returns {Promise<void>}
 */
const fileMessageHandler_K = async () => {
  try {
    setFileResponseMessage('');
    let input = helloworld.fileInput_k;
    let button = helloworld.fileButton_k;
    //拼接源文本
    let message = sendMessageTextHandler_A(input);
    let text = message.text;
    let emoji = message.emoji;
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    let param = friendData ? friendData : helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setFileResponseMessage('翻译消息中...');
      //发送消息翻译处理
      translationHandler(param, data, async function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setFileResponseMessage('');
          let translationText = response.text;
          window.selectAllText(input);
          await helloworldSleep(30);
          window.pasteText(input, translationText);
          await helloworldSleep(30);
          let checkTranslationText = sendMessageTextHandler_A(input);
          if (isContainChinese(checkTranslationText.text)) {
            if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
              button.click();
            } else {
              //开启了中文发送 通过中文检测
              if (param.includeZh) {
                button.click();
              } else {
                setFileResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
              }
            }
          } else {
            button.click();
          }
        } else {
          setFileResponseMessage(`${response.message}`, 'var(--danger)');
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
 * 接收好友消息翻译处理 A版本
 * @param element
 */
const receiveMessagesHandler_A = async (element) => {
  try {
    let isGroup = checkGroupMessage_A(element);
    let textEle = element.querySelector('.content-inner .text-content.clearfix.with-meta');
    if (textEle) {
      let message = receiveMessageTextHandler_A(textEle);
      let text = message.text;
      let emoji = message.emoji;
      if (!emoji && !isEmpty(text) && !isNumber(text)) {
        let div;
        let friendInfo = await getFriendTranslation();
        let friendData = window.readFData(friendInfo.friendId);
        let param = friendData ? friendData : helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.querySelector("div[class='helloworld-translation-message text-content clearfix with-meta']")) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message text-content clearfix with-meta';
        } else {
          div = element.querySelector("div[class='helloworld-translation-message text-content clearfix with-meta']");
        }
        div.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);line-height:initial;';
        if (textEle.className === 'WebPage-text') {
          textEle.parentNode.insertAdjacentElement('afterend', div);
        } else {
          textEle.insertAdjacentElement('afterend', div);
        }
        div.innerHTML = '正在翻译消息中...';
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
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 接收好友消息翻译处理 A版本
 * @param element
 */
const receiveMessagesHandler_K = async (element) => {
  try {
    let isGroup = checkGroupMessage_K();
    let textEle = element.querySelector("div[class='message spoilers-container']");
    if (textEle) {
      let message = receiveMessageTextHandler_A(textEle);
      let text = message.text;
      let emoji = message.emoji;
      if (!emoji && !isEmpty(text) && !isNumber(text)) {
        let div;
        let friendInfo = await getFriendTranslation();
        let friendData = window.readFData(friendInfo.friendId);
        let param = friendData ? friendData : helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        let translationDiv = element.querySelector("div[class='helloworld-translation-message']");
        if (!translationDiv) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message';
        } else {
          div = translationDiv;
        }
        div.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);line-height:initial;';
        textEle.insertAdjacentElement('beforeend', div);
        div.innerHTML = '正在翻译消息中...';
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
        errorButton.className = 'Button AttachMenu--button default translucent';
        errorButton.style.cssText = 'height: 25px;font-size: 14px;width: 80px;';
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
  button.style.cssText = 'height: 25px;font-size: 14px;width: 80px;';
  button.className = 'Button AttachMenu--button default translucent';
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
const sendMessageTextHandler_A = (input) => {
  try {
    let text = '';
    let emoji = true;
    let childNodes = Array.from(input.childNodes);
    childNodes.map((node, index) => {
      if (node.nodeName === '#text') {
        text += node.data;
        emoji = false;
      }
      if (
        node.nodeName === 'SPAN' ||
        node.nodeName === 'CODE' ||
        node.nodeName === 'B' ||
        node.nodeName === 'P' ||
        node.nodeName === 'A' ||
        node.nodeName === 'U' ||
        node.nodeName === 'DEL' ||
        node.nodeName === 'STRONG'
      ) {
        text += node.innerText;
        emoji = false;
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
      emoji: emoji,
    };
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 * @param message
 * @returns {{emoji: boolean, text: string}}
 */
const receiveMessageTextHandler_A = (message) => {
  try {
    let text = '';
    let emoji = true;
    let childNodes = Array.from(message.childNodes);
    childNodes.map((node, index) => {
      if (node.nodeName === '#text') {
        text += node.data;
        emoji = false;
      }
      if (node.nodeName === 'CODE' || node.nodeName === 'B' || node.nodeName === 'P' || node.nodeName === 'A' || node.nodeName === 'U' || node.nodeName === 'DEL' || node.nodeName === 'STRONG') {
        text += node.innerText;
        emoji = false;
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
      emoji: emoji,
    };
  } catch (e) {
    console.error(e);
  }
};

/**
 * 是否为群组消息 A版本
 */
const checkGroupMessage_A = (el) => {
  try {
    let selected = document.querySelector('.selected.has-ripple');

    return selected.className.includes('group');
  } catch (e) {
    console.error(e);
  }
};
/**
 * 是否为群组消息 K版本
 */
const checkGroupMessage_K = (el) => {
  try {
    let chatInfo = document.querySelector('.chat-info .content .bottom .info');
    let isGroup = false;
    if (chatInfo.innerHTML.includes('members') || chatInfo.innerHTML.includes('subscribers')) {
      isGroup = true;
    }
    return isGroup;
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
 * 更新全局翻译参数
 * @param data
 */
window.updateGlobalTranslationParam = async (data) => {
  window.helloworld.data = data;
  let version = compareWebVersions();
  if (version == 'a') {
    setTimeout(async () => {
      let elementList = document.querySelectorAll('.Message.message-list-item');
      for (let element of elementList) {
        await receiveMessagesHandler_A(element);
      }
    }, 1000);
    await updateGlobalInputLanguage_A();
  } else if (version == 'k') {
    setTimeout(async () => {
      let elementList = document.querySelectorAll("div[class='bubble-content-wrapper']");
      for (let element of elementList) {
        receiveMessagesHandler_K(element).then();
      }
    }, 1000);
    await updateGlobalInputLanguage_K();
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
    let version = compareWebVersions();
    if (version == 'a') {
      setTimeout(async () => {
        let elementList = document.querySelectorAll('.Message.message-list-item');
        for (let element of elementList) {
          await receiveMessagesHandler_A(element);
        }
      }, 1000);
      await updateFriendInputLanguage_A(data);
    } else if (version == 'k') {
      setTimeout(async () => {
        let elementList = document.querySelectorAll("div[class='bubble-content-wrapper']");
        for (let element of elementList) {
          receiveMessagesHandler_K(element).then();
        }
      }, 1000);
      await updateFriendInputLanguage_K(data);
    }
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
 * 更新全局翻译语种提示 a版本
 */
const updateGlobalInputLanguage_A = async () => {
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
 * 更新全局翻译语种提示 k版本
 */
const updateGlobalInputLanguage_K = async () => {
  try {
    let sendLanguageText = globalLanguageHandler('send');
    let chatLanguageText = globalLanguageHandler('message');
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    if (helloworld.input && !friendData) {
      helloworld.input.setAttribute('data-placeholder', sendLanguageText);
    }
    if (helloworld.chatLanguage && !friendData) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 更新独立翻译语种提示 a版本
 */
const updateFriendInputLanguage_A = async (data) => {
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
 * 更新独立翻译语种提示 k版本
 */
const updateFriendInputLanguage_K = async (data) => {
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
 * 独立翻译语种提示处理
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
 * 获取好友翻译设置ID
 * @returns {Promise<{friendName: string, friendId: string, friendPhone: string, userPhone: string, userName: string}>}
 */
const getFriendTranslation = async () => {
  try {
    let userId = await getUserId();
    let friend = await getChat();
    let friendTranslationData = {
      friendId: '',
      userName: '',
      userPhone: '',
      friendName: '',
      friendPhone: '',
    };
    if (userId && friend) {
      friendTranslationData.friendId = 'telegram_'.concat(userId.toString().concat('_').concat(friend.userid));
      friendTranslationData.friendName = friend.name ? friend.name : '';
      friendTranslationData.friendPhone = friend.phone ? friend.phone : '';
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
    let wid = localStorage.getItem('user_auth');
    if (wid) {
      return JSON.parse(wid).id;
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
const getChat = async () => {
  try {
    let version = compareWebVersions();
    if (version == 'a') {
      let chat = document.querySelector('.ListItem.Chat.chat-item-clickable.selected');
      let data = {
        userid: '',
        name: '',
        phone: '',
      };
      if (chat && chat.className) {
        let name = chat.querySelector('.title');
        let userid = chat.querySelector('.ListItem-button');
        if (userid) {
          if (chat.className.includes('group')) {
            data.userid = userid.href.replace('https://web.telegram.org/a/#', '').replace('-', '').concat('@g.us');
          } else {
            data.userid = userid.href.replace('https://web.telegram.org/a/#', '').replace('-', '').concat('@c.us');
          }
          data.phone = userid.href;
        }
        if (name) {
          data.name = name.innerText;
        }
      }
      return data;
    } else {
      let chat = document.querySelector('.chatlist .active');
      console.log(chat);
      let data = {
        userid: '',
        name: '',
        phone: '',
      };
      if (chat && chat.className) {
        let name = chat.querySelector('.peer-title');
        if (checkGroupMessage_K()) {
          data.userid = chat.href.replace('https://web.telegram.org/k/#', '').replace('-', '').concat('@g.us');
        } else {
          data.userid = chat.href.replace('https://web.telegram.org/k/#', '').replace('-', '').concat('@c.us');
        }
        data.phone = chat.href;
        if (name) {
          data.name = name.innerText;
        }
      }
      return data;
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * Telegram版本对比
 * @returns {string}
 */
function compareWebVersions() {
  let currentLink = document.location.toString();
  if (currentLink.includes('/a/')) {
    return 'a';
  } else if (currentLink.includes('/k/')) {
    return 'k';
  } else {
    return '';
  }
}
/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async (escapeText) => {
  try {
    let message = unescape(escapeText);
    let version = compareWebVersions();
    if (version === 'a') {
      let input = document.querySelector("div[class='form-control allow-selection']");
      if (input) {
        window.helloworld.focusWebView();
        window.selectAllText(input);
        setTimeout(() => {
          window.pasteText(input, message);
          setTimeout(() => {
            let sendButton = document.querySelector("button[class='Button send main-button default secondary round click-allowed']");
            if (sendButton) sendMessageHandler_A(sendButton);
          }, 20);
        }, 30);
      }
    }
    if (version === 'k') {
      let input = document.querySelector('.input-message-input.scrollable.scrollable-y.no-scrollbar.is-empty');
      if (input) {
        window.helloworld.focusWebView();
        window.selectAllText(input);
        setTimeout(() => {
          window.pasteText(input, message);
          setTimeout(() => {
            let sendButton = document.querySelector("button[class='btn-icon rp btn-circle btn-send animated-button-icon send']");
            if (sendButton) sendMessageHandler_K();
            setTimeout(() => {
              scrollToBottom(document.querySelector('.scrollable.scrollable-y'));
            }, 100);
          }, 20);
        }, 30);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 未读消息监控
 */
const updateBadge = async () => {
  let version = compareWebVersions();
  if (version == 'a') {
    const directCountSelector = document.querySelectorAll('.chat-list .ListItem.private .ChatBadge.unread:not(.muted)');
    const groupCountSelector = document.querySelectorAll('.chat-list .ListItem.group .ChatBadge.unread:not(.muted)');
    let t = 0;
    t += directCountSelector.length + groupCountSelector.length;
    t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
    let chatNode = document.querySelector("div[class='ChatInfo']");
    if (chatNode) {
      // elementHandler_A(chatNode).then();
    }
    let chatList = document.querySelector("div[class*='chat-list']");
    if (chatList && !chatList.getAttribute('helloworld-id')) {
      chatList.setAttribute('helloworld-id', 'helloworld-chatList');
      window.syncContacts();
      //存在工单信息 进行绑定
      if (helloworld.data.counter && helloworld.data.counterState) {
        if (helloworld.data.counterNumber && helloworld.data.counterPortID) {
          await window.uploadInitialFriends(helloworld.data.counterNumber, helloworld.data.counterPortID);
        }
      }
    }
  }
  if (version == 'k') {
    const directCountSelector = document.querySelectorAll('.dialog-subtitle-badge.badge.badge-22.is-visible.unread');
    let t = directCountSelector.length;
    t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
    let chatNode = document.querySelector("div[class*='chat tabs-tab active']");
    if (chatNode) {
      elementHandler_K();
      fileElementHandler_K();
    }
    let elementList = document.querySelectorAll("div[class='bubble-content-wrapper']");
    for (let element of elementList) {
      receiveMessagesHandler_K(element).then();
    }
  }
};
window.setInterval(updateBadge, 3000);
/**
 * 同步所有联系人数据到客户端
 * @returns {Promise<void>}
 */
window.syncContacts = async function () {
  let telegramJsonStr = localStorage.getItem('tt-global-state');
  if (telegramJsonStr) {
    if (JSON.parse(telegramJsonStr)) {
      let telegramJson = JSON.parse(telegramJsonStr);
      let chatsAry = telegramJson.chats.byId;
      let usersAry = telegramJson.users.byId;
      let chatsMap = [];
      let usersMap = [];
      for (let key in chatsAry) {
        let id = chatsAry[key].usernames ? chatsAry[key].usernames[0].username : chatsAry[key].id;
        let nickname = chatsAry[key].title ? chatsAry[key].title : '';
        let isGroup = chatsAry[key].type.includes('Group') || chatsAry[key].type.includes('Channel');
        let profile = await getProfile2(chatsAry[key].id);
        chatsMap.push({
          id: id,
          name: nickname,
          isGroup: isGroup,
          phone: '',
          profile: profile,
          link: 'https://t.me/' + id,
        });
      }
      for (let key in usersAry) {
        let id = usersAry[key].usernames ? usersAry[key].usernames[0].username : usersAry[key].id;
        let firstName = usersAry[key].firstName ? usersAry[key].firstName : '';
        let lastName = usersAry[key].lastName ? usersAry[key].lastName : '';
        let nickname = firstName + lastName;
        let isGroup = usersAry[key].type.includes('Group') || usersAry[key].type.includes('Channel');
        let phone = usersAry[key].phoneNumber ? usersAry[key].phoneNumber : '';
        let profile = await getProfile2(usersAry[key].id);
        usersMap.push({
          id: id,
          name: nickname,
          isGroup: isGroup,
          phone: phone,
          profile: profile,
          link: 'https://t.me/' + id,
        });
      }
      let contactsMap = usersMap.concat(chatsMap);
      let json = contactsMap.filter(function (item, index, self) {
        return (
          self.findIndex(function (t) {
            return t.id === item.id;
          }) === index
        );
      });
      json = json.sort(function (a, b) {
        return a.isGroup;
      });
      window.helloworld.syncContacts(json);
    }
  }
};

function unbindCounter() {
  helloworld.data.counter = false;
  helloworld.data.counterState = false;
  helloworld.data.counterNumber = '';
  helloworld.data.counterPortID = '';
}
/**
 * 获取好友数据并上传
 */
window.uploadInitialFriends = async function (counterNumber, counterPortID) {
  try {
    helloworld.data.counter = true;
    helloworld.data.counterNumber = counterNumber;
    helloworld.data.counterPortID = counterPortID;
    let fansDetail = [];
    let userDetail = {};
    let telegramJsonStr = localStorage.getItem('tt-global-state');
    if (telegramJsonStr) {
      if (JSON.parse(telegramJsonStr)) {
        let telegramJson = JSON.parse(telegramJsonStr);
        let chatsAry = telegramJson.users.byId;
        let chatsMap = [];
        for (var key in chatsAry) {
          chatsMap.push(chatsAry[key]);
        }
        await Promise.all(
          chatsMap.map(async (f) => {
            if (f.type === 'userTypeRegular') {
              let firstName = f.firstName ? f.firstName : '';
              let lastName = f.lastName ? f.lastName : '';
              let nickname = firstName + lastName;
              if (f.isSelf) {
                userDetail = {
                  lineAccount: f.id,
                  nickname: nickname ? nickname : '未获取名称',
                  headImg: '/static/img/default.3a2c5b6.png',
                };
              } else {
                fansDetail.push({
                  lineAccount: f.id,
                  nickname: nickname ? nickname : '未获取名称',
                  headImg: '/static/img/default.3a2c5b6.png',
                });
              }
            }
          })
        );
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        localStorage.setItem('fansDetail', JSON.stringify(fansDetail));
        if (userDetail) {
          const data = {
            loginType: '电脑端登录',
            userDetail: userDetail,
            fansDetail: fansDetail,
            serialNumber: helloworld.data.counterNumber,
            wsid: helloworld.data.counterPortID,
          };
          console.info('开始上传好友数据', data);
          helloworld.uploadInitialFriends(data);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 上传新粉数据
 */
const uploadNewFriends = async (element) => {
  try {
    let chat = element.querySelector('a');
    if (chat) {
      let id = chat.href.replace('https://web.telegram.org/a/#', '');
      let nikename = element.querySelector('h3') ? chat.querySelector('h3').innerText : '未获取名称';
      if (!id.includes('-')) {
        const userDetail = localStorage.getItem('userDetail');
        const fansDetail = [
          {
            lineAccount: id,
            nickname: nikename,
            headImg: '/static/img/default.3a2c5b6.png',
          },
        ];
        const timestamp = Math.floor(new Date().getTime() / 1000);
        const jsonData = {
          serialNumber: helloworld.data.counterNumber,
          wsid: helloworld.data.counterPortID,
          userDetail: JSON.parse(userDetail),
          fansDetail: fansDetail,
          time: timestamp,
        };
        helloworld.uploadNewFriends(jsonData);
      }
    }
  } catch (e) {
    console.error(e);
  }
};
const getUserProfile = async (id) => {
  try {
    let menu = document.querySelector("div[class='DropdownMenu main-menu']");
    if (menu) {
      let menuList = menu.querySelectorAll("div[class='MenuItem compact']");
      if (menuList.length > 0) {
        menuList[3].click();
        return await new Promise((resolve) => {
          setTimeout(() => {
            let settings = document.querySelector("div[class='Transition'][id='Settings']");
            let profileImg = settings.querySelector('img');
            if (profileImg) {
              httpsRequest_Blob(profileImg.src, function (blob) {
                if (blob instanceof Blob) {
                  var reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = function (e) {
                    let goBack = settings.querySelector("button[class='Button smaller translucent round']");
                    // 创建一个新的mousedown事件
                    var mouseDownEvent = new MouseEvent('mousedown', {
                      view: window,
                      bubbles: true,
                      cancelable: false,
                    });
                    goBack.dispatchEvent(mouseDownEvent);
                    resolve(e.target.result);
                  };
                } else {
                  resolve('/static/img/' + id + '.jpg');
                }
              });
            } else {
              return '/static/img/' + id + '.jpg';
            }
          }, 100);
        });
      } else {
        return '/static/img/' + id + '.jpg';
      }
    } else {
      return '/static/img/' + id + '.jpg';
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取当前用户头像
 * @param id
 * @param name
 * @returns {Promise<string>}
 */
const getProfile = async (id) => {
  try {
    let imgNode = document.querySelector(`div[data-peer-id='${id}']`);
    if (imgNode) {
      let profileImg = imgNode.childNodes[0].childNodes[0];
      if (profileImg.nodeName === 'IMG') {
        return await new Promise((resolve) => {
          httpsRequest_Blob(profileImg.src, function (blob) {
            if (blob instanceof Blob) {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = function (e) {
                resolve(e.target.result);
              };
            } else {
              resolve('/static/img/' + id + '.jpg');
            }
          });
        });
      } else {
        return '/static/img/' + id + '.jpg';
      }
    } else {
      return '/static/img/' + id + '.jpg';
    }
  } catch (e) {
    console.error(e);
  }
};
const getProfile2 = async (id) => {
  try {
    let imgNode = document.querySelector(`div[data-peer-id='${id}']`);
    if (imgNode) {
      let profileImg = imgNode.childNodes[0].childNodes[0];
      if (profileImg.nodeName === 'IMG') {
        return await new Promise((resolve) => {
          httpsRequest_Blob(profileImg.src, function (blob) {
            if (blob instanceof Blob) {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = function (e) {
                resolve(e.target.result);
              };
            } else {
              resolve('resources/img/def.png');
            }
          });
        });
      } else {
        return 'resources/img/def.png';
      }
    } else {
      return 'resources/img/def.png';
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 获取头像blob链接对象
 * @param blobUrl
 * @param callback
 */
const httpsRequest_Blob = (blobUrl, callback) => {
  try {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', blobUrl);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          callback(xhr.response);
        }
      }
    };
    xhr.send();
  } catch (e) {
    console.error(e);
  }
};

let telegramTime;
/**
 * 发送心跳
 */
const counterListener = () => {
  helloworld.data.counterState = true;
  clearInterval(telegramTime);
  telegramTime = setInterval(sendHeartbeat, 6000 * 10);
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
  let Loading = document.querySelector("div[class='Loading interactive']");
  let status = Loading ? '离线' : '在线';
  console.info('发送在线状态', status);
  //上传在线状态
  window.helloworld.uploadOnlineState({
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
    status: status,
  });
};

/**
 * 上传头像blob
 * @param id
 * @param name
 * @param blob
 * @param callback
 */
const uploadProfile = (id, name, blob, callback) => {
  var form = new FormData();
  form.append('fileName', id);
  form.append('file', blob);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.helloworlds.cn/api/uploadImg', true);
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.response);
        if (json.code === 200) {
          localStorage.setItem(id + '_img', 'true');
        }
        callback(json);
      }
    }
  };
  xhr.send(form);
};

0;
