/**
 * 页面元素添加
 * @param thisObj
 * @param args
 * @param _appendChild
 * @returns {*}
 */
helloworld.appendChild = (thisObj, args, _appendChild) => {
  let element = args[0];
  parseElement(element);
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
  parseElement(newChild);
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
    if (className.includes("markup") && className.includes("editor") && className.includes("slateTextArea")) {
      inputHandler(element);
    }
    if (className.includes("placeholder") && className.includes("slateTextArea") && className.includes("fontSize16Padding")) {
      inputLanguageHandler(element);
    }
    if (className.includes("title") && className.includes("container") && className.includes("themed")) {
      setTimeout(() => {
        chatLanguageHandler(element);
      }, 100);
    }
    if (className.includes("channelTextArea")) {
      responseMessageHandler(element);
    }
    if (className.includes("markup") && className.includes("messageContent")) {
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
    helloworld.input.addEventListener("keydown", inputKeydownHandler, true);
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
    helloworld.sendLanguage = element;
    helloworld.sendLanguage.style.cssText = "font-size:13px;line-height:25px;";
    helloworld.sendLanguage.setAttribute("helloworld-id", "helloworld-sendLanguage");
    helloworld.sendLanguage.innerHTML = globalLanguageHandler("send");
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
    helloworld.chatLanguage = document.createElement("div");
    helloworld.chatLanguage.className = "helloworld-chatLanguage";
    element.insertAdjacentElement("beforeend", helloworld.chatLanguage);
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
    let span = document.createElement("span");
    span.setAttribute("helloworld-id", "helloworld-responseMessage");
    span.style.cssText = "font-size:13px;";
    span.innerHTML = "";
    helloworld.responseMessage = span;
    element.insertAdjacentElement("afterbegin", span);
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
 * 消息发送翻译处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = () => {
  try {
    setResponseMessage("");
    let input = helloworld.input;
    let button = helloworld.sendButton;
    let text = sendMessageTextHandler(input);
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text)) {
      let data = {
        q: text, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage("翻译消息中...");
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code == 200) {
          setResponseMessage("");
          let translationText = response.text;
          window.selectAllText(input);
          setTimeout(() => {
            window.pasteText(input, translationText);
            setTimeout(() => {
              let checkTranslationText = sendMessageTextHandler(input);
              if (isContainChinese(checkTranslationText)) {
                //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
                if (param.sendTo === "ja" || param.sendTo === "jp" || param.sendTo === "cht" || param.sendTo === "zh-TW" || param.sendTo === "yue") {
                  sendMessage(input);
                } else {
                  //开启了中文发送 通过中文检测
                  if (param.includeZh) {
                    sendMessage(input);
                  } else {
                    //未开启中文发送 翻译结果内包含中文阻止发送
                    setResponseMessage("检测到中文,已阻止发送,请重试!", "var(--danger)");
                  }
                }
              } else {
                sendMessage(input);
              }
            }, 50);
          }, 50);
        } else {
          setResponseMessage(`${response.message}`, "var(--danger)");
        }
      });
    } else {
      sendMessage(input);
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
    let isGroup = checkGroupMessage(element);
    if (element) {
      let message = receiveMessageTextHandler(element);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let span;
        let param = helloworld.data;
        document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
        document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
        document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
        if (!element.querySelector("span[class='helloworld-translation-message']")) {
          span = document.createElement("span");
          span.className = "helloworld-translation-message";
        } else {
          span = element.querySelector("span[class='helloworld-translation-message']");
        }
        span.style.cssText = "display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;";
        element.insertAdjacentElement("beforeend", span);
        let data = {
          q: message, //接收的消息文本
          send: false, //是否发送翻译
        };
        let msgCache = queryMsgCache(param, data);
        if (msgCache) {
          msgCache = msgCache.replaceAll("\\n", "\n");
          span.innerHTML = msgCache;
        } else {
          //开启了消息翻译
          if (param.message) {
            span.innerHTML = "正在翻译消息中...";
            //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
            if (!isContainChinese(message) || (isContainJapanese(message) && isContainChinese(message)) || (isContainChinese(message) && param.includeZh)) {
              //群组消息并且开启了自动群组翻译
              if (isGroup) {
                if (param.group) {
                  autoTranslationHandler(param, data, span);
                } else {
                  clickTranslationHandler(param, data, span);
                }
              } else {
                //私人消息
                autoTranslationHandler(param, data, span);
              }
            } else {
              span.innerHTML = "";
            }
          } else {
            span.innerHTML = "";
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
    let text = "";
    let reactProp = input.__reactProps$;
    if (reactProp && reactProp.children) {
      let node = reactProp.children.props.node;
      let childList = node ? node.children : null;
      if (childList) {
        for (let itmList of childList) {
          for (let itm of itmList.children) {
            if (!itm.type) {
              text += itm.text;
            } else if (itm.type === "emoji") {
              text += itm.emoji.surrogate;
            }
            text += "\n";
          }
        }
        return text;
      }
    }
    text = toNormlInputText(input);
    return text;
  } catch (e) {
    console.error(e);
  }
};
function toNormlInputText(input) {
  let text = input.innerText.trim();
  text = text.replace(/^\s*|\s*$/g, "");
  return text;
}
function sendMessage(input) {
  var event = document.createEvent("Event");
  event.initEvent("keydown", true, true);
  event = Object.assign(event, {
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    which: 13,
    keyCode: 13,
    key: "Enter",
    code: "Enter",
  });
  input.dispatchEvent(event);
}
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = textEle => {
  let message = "";
  let childNodes = Array.from(textEle.childNodes);
  childNodes.map((node, index) => {
    if (node.nodeName === "SPAN") {
      if (node.className !== "") {
        let _childNodes = Array.from(node.childNodes);
        _childNodes.map((_node, _index) => {
          if (_node.nodeName === "#text") {
            message += _node.data;
          } else if (_node.nodeName === "IMG") {
            message += _node.alt;
          } else if (_node.nodeName === "SPAN") {
            message += _node.innerText;
          }
        });
      } else {
        message += node.innerText;
      }
    } else if (node.nodeName === "STRONG") {
      message += node.innerText;
    } else if (node.nodeName === "A") {
      message += node.innerText;
    }
  });
  return message;
};
/**
 * 检测群组消息
 */
const checkGroupMessage = el => {
  try {
    return document.querySelector("div[class*='container'][class*='clickable']");
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
      let elementList = document.querySelector("div[class*='markup'][class*='messageContent']");
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
const sendReplyMessage = escapeText => {
  try {
    let message = unescape(escapeText);
    let input = helloworld.input;
    if (input) {
      window.helloworld.focusWebView();
      window.selectAllText(input);
      setTimeout(() => {
        window.pasteText(input, message);
        setTimeout(() => {
          sendMessageHandler();
        }, 50);
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
  const e = document.querySelectorAll("div[class*='numberBadge'][class*='baseShapeRound']");
  for (let n = 0; n < e.length; n++) {
    if (e[n].innerHTML) {
      t += parseInt(e[n].innerHTML);
    } else {
      t += 1;
    }
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
if (window.location.toString().indexOf("discord") !== -1) {
  function getLocalStoragePropertyDescriptor() {
    const iframe = document.createElement("iframe");
    document.head.append(iframe);
    const pd = Object.getOwnPropertyDescriptor(iframe.contentWindow, "localStorage");
    iframe.remove();
    return pd;
  }
  
  Object.defineProperty(window, "localStorage", getLocalStoragePropertyDescriptor());
  window.localStorage.heeeeey; // yr old friend is bak
  const localStorage = getLocalStoragePropertyDescriptor().get.call(window);
}
0;
