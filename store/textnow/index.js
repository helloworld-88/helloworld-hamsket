"use strict";
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
    parseElement(element);
  }, 20);
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
    parseElement(newChild);
  }, 20);
  return _insertBefore.call(thisObj, newChild, refChild);
};
/**
 * 页面元素监听
 * @param element
 * @returns {Promise<void>}
 */
const parseElement = element => {
  let className = element.className;
  if (className && className.includes) {
      console.info(element)
    if (className === "chat-item incoming" || className === "chat-item outgoing") {
      receiveMessagesHandler(element);
    }
  }
};

/**
 * 消息发送框处理
 * @param input
 */
const inputHandler = input => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute("helloworld-id", "helloworld-input");
    helloworld.input.addEventListener("keyup", inputKeydownHandler, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送按钮处理
 * @param button
 */
const buttonHandler = button => {
  try {
    helloworld.sendButton = button;
    helloworld.sendButton.setAttribute("helloworld-id", "helloworld-sendButton");
    helloworld.sendButton.addEventListener("click", sendButtonClickHandler, true);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息发送语种提示处理
 * @param element
 */
const inputLanguageHandler = element => {
  try {
    helloworld.sendLanguage = globalLanguageHandler("send");
    element.setAttribute("placeholder", helloworld.sendLanguage);
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息接收语种提示处理
 * @param element
 */
const chatLanguageHandler = element => {
  try {
    let chatLanguage = element.querySelector("div[class='helloworld-chatLanguage']");
    if (chatLanguage) {
      helloworld.chatLanguage = chatLanguage;
    } else {
      let div = document.createElement("div");
      div.className = "helloworld-chatLanguage";
      helloworld.chatLanguage = div;
      element.insertAdjacentElement("beforeend", div);
    }
    helloworld.chatLanguage.innerHTML = globalLanguageHandler("message");
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息翻译返回状态处理
 * @param element
 */
const responseMessageHandler = element => {
  try {
    let rsp = document.querySelector("div[class='helloworld-responseMessage']");
    if (rsp) {
      helloworld.responseMessage = rsp;
    } else {
      let div = document.createElement("div");
      div.className = "helloworld-responseMessage";
      div.innerHTML = "";
      helloworld.responseMessage = div;
      element.insertAdjacentElement("afterbegin", div);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 消息发送框回车事件处理
 * @param evt
 */
const inputKeydownHandler = evt => {
  try {
    if (evt.isTrusted) {
      if (evt.key === "Enter") {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          sendMessageHandler();
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
const sendButtonClickHandler = evt => {
  try {
    if (evt.isTrusted) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      if (!window.sendLock) {
        window.sendLock = true;
        sendMessageHandler();
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
const sendMessageHandler = btn => {
  try {
    setResponseMessage("");
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    if (!button) {
      let sendBtn = document.querySelector("div[id='send_button']");
      if (sendBtn) {
        buttonHandler(sendBtn);
        button = sendBtn;
      }
    }
    let message = sendMessageTextHandler(input);
    let param = helloworld.data;
    if (param.send && !isEmpty(message) && !isNumber(message)) {
      let data = {
        q: message, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage("翻译消息中...");
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code === 200) {
          setResponseMessage("");
          input.value = response.text;
          window.fireMessageInput(input);
          setTimeout(() => {
            let checkTranslationText = sendMessageTextHandler(input);
            if (isContainChinese(checkTranslationText)) {
              //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
              if (param.sendTo === "ja" || param.sendTo === "jp" || param.sendTo === "cht" || param.sendTo === "zh-TW" || param.sendTo === "yue") {
                button.click();
              } else {
                //开启了中文发送 通过中文检测
                if (param.includeZh) {
                  button.click();
                } else {
                  //未开启中文发送 翻译结果内包含中文阻止发送
                  setResponseMessage("检测到中文,已阻止发送,请重试!", "var(--danger)");
                }
              }
            } else {
              button.click();
            }
          }, 20);
        } else {
          setResponseMessage(`${response.message}`, "var(--danger)");
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
const receiveMessagesHandler = element => {
  try {
    let textElement = element.querySelector("span[class='uikit-chat-item__bubble-text']");
    if (textElement !== null) {
      let message = receiveMessageTextHandler(textElement);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
        document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
        document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
        let translationMsg = element.querySelector("div[class='helloworld-translation-message uikit-chat-item__bubble-text']");
        if (!translationMsg) {
          div = document.createElement("div");
          div.className = "helloworld-translation-message uikit-chat-item__bubble-text";
          div.style.cssText = "display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);background: white;";
          textElement.insertAdjacentElement("afterend", div);
        } else {
          translationMsg.style.cssText = "display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);background: white;";
          div = translationMsg;
        }
        let data = {
          q: message, //接收的消息文本
          send: false, //是否发送翻译
        };
        let msgCache = queryMsgCache(param, data);
        if (msgCache) {
          msgCache = msgCache.replaceAll("\\n", "\n");
          div.innerHTML = msgCache;
        } else {
          //开启了消息翻译
          if (param.message) {
            div.innerHTML = "正在翻译消息中...";
            //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message)) || (isContainChinese(message) && param.includeZh)) {
              autoTranslationHandler(param, data, div);
            } else {
              div.innerHTML = "";
            }
          } else {
            div.innerHTML = "";
          }
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 将聊天页面拉到最底部
 * @param element
 */
const scrollToBottom = element => {
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
 * 自动翻译接收消息处理
 * @param param
 * @param data
 * @param element
 */
const autoTranslationHandler = (param, data, element) => {
  try {
    element.innerHTML = "正在翻译消息中...";
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        element.innerHTML = response.text;
      } else {
        let errorButton = document.createElement("button");
        errorButton.innerHTML = `<u style="color: var(--danger)">${response.message}</u>`;
        errorButton.addEventListener("click", function () {
          autoTranslationHandler(param, data, element);
        });
        element.innerHTML = "";
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
  let button = document.createElement("button");
  button.innerHTML = "<u>点击翻译</u>";
  button.addEventListener("click", function () {
    autoTranslationHandler(param, data, element);
  });
  element.innerHTML = "";
  element.appendChild(button);
};
/**
 * 发送消息读取文本处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
const sendMessageTextHandler = input => {
  try {
    return input.value;
  } catch (e) {
    console.error(e);
  }
};
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = textEle => {
  return textEle.innerHTML;
};

/**
 * 消息翻译返回状态显示
 */
const setResponseMessage = (text, color) => {
  try {
    if (helloworld.responseMessage) {
      helloworld.responseMessage.style.color = color || "var(--helloworldColor)";
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
window.updateGlobalTranslationParam = data => {
  try {
    window.helloworld.data = data;
    setTimeout(() => {
      let elementList = document.querySelectorAll("li[class*='chat-item']");
      for (let element of elementList) {
        receiveMessagesHandler(element);
      }
    }, 1000);
    updateGlobalInputLanguage();
  } catch (e) {
    console.error(e);
  }
};

/**
 * 更新全局翻译语种提示
 */
const updateGlobalInputLanguage = () => {
  try {
    let sendLanguageText = globalLanguageHandler("send");
    let chatLanguageText = globalLanguageHandler("message");
    if (helloworld.input) {
      helloworld.sendLanguage = sendLanguageText;
      helloworld.input.setAttribute("placeholder", helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage) {
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
const globalLanguageHandler = type => {
  try {
    if (type === "send") {
      let enable_text = `[全局] 发送消息 [${helloworld.data.sourceLabel}] ${helloworld.data.sendFromLabel} => ${helloworld.data.sendToLabel}`;
      let disable_text = `[全局] 发送消息 [${helloworld.data.sourceLabel}] 翻译关闭`;
      if (helloworld.data.send) {
        return enable_text;
      } else {
        return disable_text;
      }
    } else if (type === "message") {
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
const sendReplyMessage = async escapeText => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("textarea[id='text-input']");
    if (input) {
      window.helloworld.focusWebView();
      input.value = message;
      window.fireMessageInput(input);
      setTimeout(() => {
        let button = document.querySelector("div[id='send_button']");
        if (button) sendMessageHandler(button);
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
  const e = document.querySelectorAll("span[class='uikit-text uikit-text--micro uikit-text--bold']");
  for (let n = 0; n < e.length; n++) {
    if (e[n].innerHTML) {
      t += parseInt(e[n].innerHTML);
    } else {
      t += 1;
    }
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
  let TNWeb_MediumRectangle = document.querySelector("div[id='TNWeb_MediumRectangle']");
  let rotationManagerSlotWrapper = document.querySelector("div[class='rotation-manager-slot-wrapper']");
  if (TNWeb_MediumRectangle) {
    TNWeb_MediumRectangle.style.cssText = "display: none;";
  }
  if (rotationManagerSlotWrapper) {
    rotationManagerSlotWrapper.style.cssText = "display: none;";
  }
  let input = document.querySelector("textarea[id='text-input']");
  if (input) inputHandler(input);
  if (input) inputLanguageHandler(input);
  let sendBtn = document.querySelector("div[id='send_button']");
  if (sendBtn) buttonHandler(sendBtn);
  let rsp = document.querySelector("div[class='view-with-fixed-footer-view__footer-view']");
  if (rsp) responseMessageHandler(rsp);
  let chatTitle = document.querySelector("div[class='conv-header-container']");
  if (chatTitle && chatTitle.parentNode) chatLanguageHandler(chatTitle.parentNode);

  let elementList = document.querySelectorAll("li[class*='chat-item']");
  for (let element of elementList) {
    receiveMessagesHandler(element);
  }
};
window.setInterval(updateBadge, 2000);
0;
