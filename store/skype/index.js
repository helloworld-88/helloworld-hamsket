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
  let className = element.className;
  let nodeName = element.nodeName;
  if (nodeName) {
    if (nodeName === "BUTTON" && (element.title === "查找" || element.title === "尋找" || element.title === "Find")) {
      setTimeout(() => {
        chatLanguageHandler(element).then();
      }, 200);
    }
    if (nodeName === "BUTTON" && (element.title === "发送消息" || element.title === "傳送訊息" || element.title === "Send message")) {
      setTimeout(() => {
        buttonHandler(element);
      }, 200);
    }
    if (nodeName === "DIV" && element.innerText !== "" && (element.innerText === "键入消息" || element.innerText === "輸入訊息" || element.innerText === "Type a message")) {
      inputLanguageHandler(element);
    }
    if (nodeName === "DIV" && element.role === "region") {
      setTimeout(() => {
        let ariaLabel = element.getAttribute("aria-label");
        if (ariaLabel && (ariaLabel.includes("发送于") || ariaLabel.includes("傳送於") || ariaLabel.includes("sent at"))) {
          receiveMessagesHandler(element.querySelector('div[dir="auto"]:not([aria-hidden]):not([data-text-as-pseudo-element])')).then();
        }
      }, 200);
    }
  }
  if (className && className.includes) {
    if (className === "notranslate public-DraftEditor-content") {
      inputHandler(element);
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
    helloworld.sendLanguage = element;
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
const chatLanguageHandler = async element => {
  try {
    if (!document.querySelector(".helloworld-chatLanguage")) {
      let div = document.createElement("div");
      div.className = "helloworld-chatLanguage";
      div.style.cssText = "font-size:12px;";
      element.parentNode.insertAdjacentElement("beforebegin", div);
      helloworld.chatLanguage = div;
      helloworld.chatLanguage.innerHTML = globalLanguageHandler("message");
    }
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
 * 消息发送翻译处理
 * @returns {Promise<void>}
 */
const sendMessageHandler = async btn => {
  try {
    setResponseMessage("");
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    let message = "";
    let msgNode = input.childNodes[0].childNodes[0].childNodes[0];
    if (msgNode.childNodes.length > 0 && input.innerText.match(/^\s*$/)) {
      fireMessageInput(input);
      setTimeout(() => {
        window.sendLock = false;
        button.click();
      }, 1);
    } else {
        for (var n of msgNode.childNodes) {
            if (n.style.cssText.indexOf('background-image') !== -1) {
                message += '('+n.childNodes[0].ariaLabel+')';
            }else {
                message += n.childNodes[0].innerText;
            }
        }
    }
    message = message.replace(/^\s*|\s*$/g, "");
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
        if (response.code == 200) {
          setResponseMessage("");
          let translationText = response.text;
          window.selectAllText(input);
          setTimeout(() => {
            window.pasteText(input, translationText);
            setTimeout(() => {
              let checkTranslationText = input.innerHTML;
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
          }, 30);
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
const receiveMessagesHandler = async element => {
  try {
    let isGroup = checkGroupMessage();
    let message = receiveMessageTextHandler(element);
    //消息不为空或不为纯数字
    if (!isEmpty(message) && !isNumber(message)) {
      let div;
      let param = helloworld.data;
      document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
      document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
      document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
      if (element.parentNode.childNodes.length > 1) {
        div = element.parentNode.childNodes[1];
      } else {
        div = document.createElement("div");
        div.className = "helloworld-translation-message";
        div.style.cssText =
          "position: relative; display: inline; flex-grow: 0; flex-shrink: 0; overflow: visible; white-space: pre-wrap; overflow-wrap: break-word; font-size: var(--helloworldSize); line-height: 22px; letter-spacing: -0.2px; font-family: &quot;SF Regular&quot;, &quot;Segoe System UI Regular&quot;, &quot;Segoe UI Regular&quot;, sans-serif; color: var(--helloworldColor); align-self: stretch; background-color: rgba(0, 0, 0, 0); font-weight: 400; user-select: text; cursor: text;";
        element.insertAdjacentElement("afterend", div);
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
            div.innerHTML = "";
          }
        } else {
          div.innerHTML = "";
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
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = element => {
  let message = "";
  for (let a = 0; a < element.childNodes.length; a++) {
    if (element.childNodes[a].nodeName === "#text") {
      message += element.childNodes[a].nodeValue;
    }
  }
  return message;
};
/**
 * 检测群组消息
 */
const checkGroupMessage = el => {
  try {
    return (
      document.querySelector("button[role='button'][aria-hidden='true'][title*='个参与者']") ||
      document.querySelector("button[role='button'][aria-hidden='true'][title*='個參與者']") ||
      document.querySelector("button[role='button'][aria-hidden='true'][title*='participants']")
    );
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
window.updateGlobalTranslationParam = async data => {
  try {
    window.helloworld.data = data;
    localStorage.setItem("tt_api", data.server);
    setTimeout(async () => {
      let elementList =
        document.querySelectorAll("div[role='region'][aria-label*='发送于']") ||
        document.querySelectorAll("div[role='region'][aria-label*='傳送於']") ||
        document.querySelectorAll("div[role='region'][aria-label*='sent at']");
      if (elementList.length > 0) {
        for (let element of elementList) {
          await receiveMessagesHandler(element.querySelector('div[dir="auto"]:not([aria-hidden]):not([data-text-as-pseudo-element])'));
        }
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
    let sendLanguageText = globalLanguageHandler("send");
    let chatLanguageText = globalLanguageHandler("message");
    if (helloworld.sendLanguage && !helloworld.sendLanguage.innerHTML.includes("独立")) {
      helloworld.sendLanguage.innerHTML = sendLanguageText;
    }
    if (helloworld.chatLanguage && !helloworld.chatLanguage.innerHTML.includes("独立")) {
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
    let input = document.querySelector("div[class='notranslate public-DraftEditor-content']");
    if (input) {
      window.helloworld.focusWebView();
      window.selectAllText(input);
      setTimeout(() => {
        window.pasteText(input, message);
        setTimeout(() => {
          let button = document.querySelector("button[title*='发送消息']") || document.querySelector("button[title*='傳送訊息']") || document.querySelector("button[title*='Send message']");
          if (button) sendMessageHandler(button).then();
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
  const e = document.querySelector("div[role='none'][style='position: relative; display: flex; flex-direction: column; flex-grow: 0; flex-shrink: 0; overflow: hidden; align-items: center; justify-content: center; height: 20px; min-width: 20px; border-radius: 10px; background-color: rgb(224, 11, 0); padding-left: 4px; padding-right: 4px; width: 20px; border-color: rgb(255, 255, 255); border-width: 2px; border-style: solid;']");
  if(e){
    t += parseInt(e.childNodes[0].getAttribute("data-text-as-pseudo-element"));
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
};
window.setInterval(updateBadge, 3000);
function setConsole() {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  console = iframe.contentWindow.console;
  window.console = console;
}
setConsole();
0;
