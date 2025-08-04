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
const parseElement = async element => {
  try {
    let className = element.className;
    if (className && className.includes) {
      if (className.includes("rich-input") && element.id === "richInput") {
        inputHandler(element);
        inputLanguageHandler(element).then();
      }
      if (className === "z--btn--v2 btn-tertiary-primary medium chat-box-input-button send-msg-btn --rounded icon-only chat-box-input-button send-msg-btn") {
        buttonHandler(element);
      }
      if (className === "chat-box-input-container") {
        responseMessageHandler(element);
      }
      if (className === "main__center flx flx-col flx-1 animated w0") {
        chatLanguageHandler(element).then();
      }
      if (className.includes("card--text") || className.includes('chat-message-caption') || className.includes('card shadow-bubble message-frame')) {
        receiveMessagesHandler(element).then();
      }
    }
  } catch (e) {
    console.error(e);
  }
};
/**
 * 消息输入框处理
 * @param input
 */
const inputHandler = input => {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute("helloworld-id", "helloworld-input");
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
 * 输入框语种提示处理
 * @param element
 */
const inputLanguageHandler = async element => {
  try {
    helloworld.sendLanguage = globalLanguageHandler("send");
    element.setAttribute("placeholder", helloworld.sendLanguage);
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
const chatLanguageHandler = async element => {
  try {
    let headerNode = element.querySelector("header[id='header']");
    if (headerNode) {
      if (!element.querySelector("div[class='flx flx-al-c flx-1 helloworld-chatLanguage']")) {
        helloworld.chatLanguage = document.createElement("div");
        helloworld.chatLanguage.className = "flx flx-al-c flx-1 helloworld-chatLanguage";
        helloworld.chatLanguage.setAttribute("helloworld-id", "helloworld-chatLanguage");
        helloworld.chatLanguage.style.cssText = "font-size:12px;z-index: 99999;";
        headerNode.childNodes[0].childNodes[1].insertAdjacentElement("beforeend", helloworld.chatLanguage);
        helloworld.chatLanguage.innerHTML = globalLanguageHandler("message");
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
const responseMessageHandler = element => {
  try {
    if (!document.querySelector(".helloworld-responseMessage")) {
      let div = document.createElement("div");
      div.className = "helloworld-responseMessage";
      div.setAttribute("helloworld-id", "helloworld-responseMessage");
      div.innerHTML = "";
      helloworld.responseMessage = div;
      element.insertAdjacentElement("beforebegin", div);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 消息输入框回车事件处理
 * @param evt
 */
document.addEventListener(
  "keydown",
  function (evt) {
    try {
      if (evt.key === "Enter" && evt.target.id === "richInput") {
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
      console.error(`-----输入框回车发送错误!-----${e}`);
    }
  },
  true
);
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
    setResponseMessage("");
    let input = helloworld.input;
    let button = helloworld.sendButton;
    //拼接源文本
    let message = sendMessageTextHandler(input);
    let text = message.text;
    let isEmoji = message.isEmoji;
    let emoji = message.emoji;
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !isEmoji) {
      let data = {
        q: text, //文本
        send: true, //自己发送
      };
      setResponseMessage("翻译消息中...");
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          let translationText = response.text;
          if (emoji.length > 0) {
            for (let key of emoji) {
              translationText = translationText.replace("*", key);
            }
          }
          input.innerHTML = translationText;
          FireMessageInput(input);
          setTimeout(() => {
            let checkTranslationText = sendMessageTextHandler(input);
            if (isContainChinese(checkTranslationText.text)) {
              //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
              if (param.sendTo === "ja" || param.sendTo === "jp" || param.sendTo === "cht" || param.sendTo === "zh-TW" || param.sendTo === "yue") {
                button.click();
                setResponseMessage("");
              } else {
                //开启了中文发送 通过中文检测
                if (param.includeZh) {
                  button.click();
                  setResponseMessage("");
                } else {
                  setResponseMessage("检测到中文,已阻止发送,请重试!", "var(--danger)");
                }
              }
            } else {
              button.click();
              setResponseMessage("");
            }
          }, 50);
        } else {
          setResponseMessage(`${response.message}`, "var(--danger)");
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

function FireMessageInput(input) {
  if ("createEvent" in document) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("input", true, true);
    input.dispatchEvent(evt);
  } else input.fireEvent("input");
}

/**
 * 接收好友消息翻译处理
 * @param element
 */
const receiveMessagesHandler = async element => {
  try {
    let messageNode = element.querySelector("span-15");
    if (messageNode) {
      let message = receiveMessageTextHandler(messageNode);
      let isEmoji = message.isEmoji;
      let text = message.text;
      let emoji = message.emoji;
      let isGroup = checkGroupMessage();
      if (!isEmpty(text) && !isNumber(text) && !isEmoji) {
        let div;
        let param =  helloworld.data;
        document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
        document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
        document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
        if (!element.querySelector("div[class='helloworld-translation-message']")) {
          div = document.createElement("div");
          div.className = "helloworld-translation-message";
          div.style.cssText = "color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;";
        } else {
          div = element.querySelector("div[class='helloworld-translation-message']");
        }
        div.innerHTML = "正在翻译消息中...";
        messageNode.insertAdjacentElement("afterend", div);
        let data = {
          q: text, //接收的消息文本
          send: false, //是否发送翻译
        };
        let msgCache = queryMsgCache(param, data);
        if (msgCache) {
          msgCache = msgCache.replaceAll("\\n", "\n");
          if (emoji.length > 0) {
            for (let key of emoji) {
              msgCache = msgCache.replace("*", key);
            }
          }
          div.innerHTML = msgCache;
        } else {
          //开启了消息翻译
          if (param.message) {
            div.innerHTML = "正在翻译消息中...";
            //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message)) || (isContainChinese(message) && param.includeZh)) {
              //群组消息并且开启了自动群组翻译
              if (isGroup) {
                if (param.group) {
                  autoTranslationHandler(param, data, div, emoji);
                } else {
                  clickTranslationHandler(param, data, div, emoji);
                }
              } else {
                //私人消息
                autoTranslationHandler(param, data, div, emoji);
              }
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
 * 自动翻译接收的消息处理
 * @param param
 * @param data
 * @param element
 * @param emoji
 */
const autoTranslationHandler = (param, data, element, emoji) => {
  try {
    element.innerHTML = "正在翻译消息中...";
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        let text = response.text;
        if (emoji.length > 0) {
          for (let key of emoji) {
            text = text.replace("*", key);
          }
        }
        element.innerHTML = text;
      } else {
        let errorButton = document.createElement("button");
        errorButton.innerHTML = `<u style="color: var(--danger)">${response.message}</u>`;
        errorButton.addEventListener("click", function () {
          autoTranslationHandler(param, data, element, emoji);
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
 * 手动翻译接收的消息处理
 * @param param
 * @param data
 * @param element
 * @param emoji
 */
const clickTranslationHandler = (param, data, element, emoji) => {
  let button = document.createElement("button");
  button.innerHTML = "<u>点击翻译</u>";
  button.addEventListener("click", function () {
    autoTranslationHandler(param, data, element, emoji);
  });
  element.innerHTML = "";
  element.appendChild(button);
};
/**
 * 发送消息原文处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
const sendMessageTextHandler = input => {
  try {
    let text = "";
    let isEmoji = true;
    let emoji = [];
    let childNodes = Array.from(input.childNodes);
    childNodes.map((node, index) => {
      Array.from(node.childNodes).map(_childNode => {
        if (_childNode.nodeName === "#text") {
          text += _childNode.data;
          isEmoji = false;
        }
        if (_childNode.nodeName === "SPAN" && !_childNode.className) {
          text += _childNode.innerText;
          isEmoji = false;
        }
        if (_childNode.nodeName === "SPAN" && _childNode.className.includes("emoji-sizer emoji-outer")) {
          text += "*";
          emoji.push(_childNode.outerHTML);
        }
      });
      //换行
      if (!(index === childNodes.length - 1)) {
        text += "\n";
      }
    });
    return {
      text: text,
      isEmoji: isEmoji,
      emoji: emoji,
    };
  } catch (e) {
    console.error(e);
  }
};
/**
 * 好友消息原文处理
 */
const receiveMessageTextHandler = element => {
  try {
    let text = "";
    let isEmoji = true;
    let emoji = [];
    let childNodes = Array.from(element.childNodes);
    childNodes.map((node, index) => {
      if (node.nodeName === "SPAN" && node.className === "text") {
        text += node.innerText;
        isEmoji = false;
      }
      if (node.nodeName === "SPAN" && node.className.includes("emoji-sizer emoji-outer")) {
        text += "*";
        emoji.push(node.outerHTML);
      }
    });
    return {
      text: text,
      isEmoji: isEmoji,
      emoji: emoji,
    };
  } catch (e) {
    console.error(e);
  }
};
/**
 * 是否为群组消息
 */
const checkGroupMessage = () => {
  try {
    return document.querySelector("div[data-translate-inner='STR_MEMBER_LENGTH']");
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
      helloworld.responseMessage.style.color = color || "var(--helloworldColor)";
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
 * 更新全局语种提示
 */
const updateGlobalInputLanguage = async () => {
  try {
    let sendLanguageText = globalLanguageHandler("send");
    let chatLanguageText = globalLanguageHandler("message");
    if (helloworld.sendLanguage && !helloworld.sendLanguage.includes("独立")) {
      helloworld.sendLanguage = sendLanguageText;
      if (helloworld.input) helloworld.input.setAttribute("placeholder", helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage && !helloworld.chatLanguage.innerHTML.includes("独立")) {
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
window.updateGlobalTranslationParam = async data => {
  try {
    helloworld.data = data;
    setTimeout(async () => {
      let elementList = document.querySelectorAll(".card--text");//chat-message-caption
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
      let elementList2 = document.querySelectorAll(".chat-message-caption");
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
 * 未读消息监控
 */
const updateBadge = () => {
  let t = 0;
  const e = document.querySelectorAll(".conv-action__unread-v2.flx.flx-al-c");
  for (let n = 0; n < e.length; n++) {
    t++;
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
/**
 * 快捷回复
 * @param escapeText
 */
const sendReplyMessage = async escapeText => {
  try {
    let message = unescape(escapeText);
    let input = document.querySelector("div[class='rich-input empty']");
    if (input) {
      window.helloworld.focusWebView();
      input.focus();
      setTimeout(() => {
        setTimeout(() => {
          let data = {
            q: message, //文本
            send: true, //自己发送
          };
          //翻译消息
          translationHandler(helloworld.data, data, function (response) {
            window.sendLock = false;
            if (response.code == 200) {
              input.innerHTML = response.text;
              FireMessageInput(input);
              setTimeout(() => {
                let button = document.querySelector("div[class='z--btn--v2 btn-tertiary-primary large send-btn-chatbar input-btn --rounded send-btn-chatbar input-btn']");
                if (isContainChinese(input.innerHTML)) {
                  //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
                  if (param.sendTo === "ja" || param.sendTo === "jp" || param.sendTo === "cht" || param.sendTo === "zh-TW" || param.sendTo === "yue") {
                    button.click();
                    setResponseMessage("");
                  } else {
                    //开启了中文发送 通过中文检测
                    if (param.includeZh) {
                      button.click();
                      setResponseMessage("");
                    } else {
                      setResponseMessage("检测到中文,已阻止发送,请重试!", "var(--danger)");
                    }
                  }
                } else {
                  button.click();
                  setResponseMessage("");
                }
              }, 50);
            } else {
              setResponseMessage(`${response.message}`, "var(--danger)");
              console.error(`${response.message}`);
            }
          });
        }, 500);
      }, 30);
    }
  } catch (e) {
    console.error(e);
  }
};
0;
