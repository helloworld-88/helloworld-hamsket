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
  parseElement(element).then();
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
  parseElement(newChild).then();
  return _insertBefore.call(thisObj, newChild, refChild);
};
/**
 * 页面元素监听
 * @param element
 * @returns {Promise<void>}
 */
const parseElement = async element => {
  let className = element.className;
  if (className && className.includes) {
    if (className === "_2xy_p _1bAtO") {
      globalTranslationBtnHandler(element);
    }
    if (className === "to2l77zo gfz4du6o ag5g9lrv bze30y65 kao4egtt") {
      inputHandler(element);
    }
    if (className === "tvf2evcx oq44ahr5 lb5m6g5c svlsagor p2rjqpw5 epia9gcq") {
      buttonHandler(element);
    }
    if (className === "lhggkp7q qq0sjtgm jxacihee c3x5l3r8 b9fczbqn t35qvd06 m62443ks rkxvyd19 c5h0bzs2 fe5nidar kao4egtt") {
      inputLanguageHandler(element).then();
    }
    if (className === "lhggkp7q qq0sjtgm jxacihee c3x5l3r8 b9fczbqn t35qvd06 m62443ks rkxvyd19 c5h0bzs2 bze30y65 kao4egtt") {
      if (element.innerHTML !== "") inputLanguageHandler(element).then();
    }
    if (className === "AmmtE") {
      setTimeout(() => {
        chatLanguageHandler(element).then();
      }, 100);
    }
    if (className === "_3E8Fg") {
      responseMessageHandler(element);
    }
    if (className.includes("CzM4m _2zFLj")) {
      receiveMessagesHandler(element).then();
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
const inputLanguageHandler = async element => {
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
const chatLanguageHandler = async element => {
  try {
    let div = document.createElement("div");
    div.className = "_6u0RM";
    let span = `<span helloworld-id="helloworld-chatLanguage" class="ggj6brxn gfz4du6o r7fjleex g0rxnol2 lhj4utae le5p0ye3 l7jjieqr _11JPr helloworld-chatLanguage" style="font-size: 13px;color: var(--icon);"></span>`;
    div.innerHTML = `<div class="_3W2ap"><div class="Mk0Bp _30scZ">${span}</div></div>`;
    element.childNodes[1].insertAdjacentElement("beforeend", div);
    helloworld.chatLanguage = div.querySelector(".helloworld-chatLanguage");
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
 * 全局翻译按钮设置
 * @param element
 */
const globalTranslationBtnHandler = element => {
  try {
    let globalSetting = document.createElement("div");
    globalSetting.className = "_1OT67";
    globalSetting.innerHTML = `<div class="_3OtEr">
                          <div aria-disabled="false" role="button" tabindex="0" class="_3ndVb fbgy3m38 ft2m32mm oq31bsqd nu34rnf1" data-tab="10" title="全局翻译设置" aria-label="全局翻译设置">
                            <div class="bo8jc6qi p4t1lx4y brjalhku">
                              <span data-icon="attach-menu-plus" class="">
                                <svg t="1693216881998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4556" width="26" height="26"><path d="M54.99 85.86c4.72-1.8 9.48-5.16 14.21-5.16 170.57-0.28 341.11-0.21 511.67-0.21 10.75 0 13.87 2.61 13.87 12.62 0.06 92.4 0.03 184.81 0 277.2 0 1.15-0.31 2.28-0.62 4.48h-9.67c-48.44 0-96.85-0.03-145.3 0-28.07 0.03-41.94 14.02-41.97 42.28v19.15c-6.16-6.37-12.35-12.81-19.03-19.71 8.51-11.25 18.68-23.97 28.07-37.25C429.7 346 448 310.28 456.81 270.21a197.44 197.44 0 0 0 3.14-18.4c0.59-4.98 2.45-7.4 7.89-7 5.6 0.44 11.22 0.1 17.63 0.1v-59.82h-10.63c-34.17 0-68.34-0.22-102.51 0.15-7.55 0.1-10.91-1.52-10.1-9.76 0.71-7.34 0.16-14.84 0.16-22.98h-57.68v32.4H182.06v59.79h223.21c-7.44 49.78-32.34 89.32-62.87 127.63-24.35-37.59-41.38-77.35-54.23-119.85-17.91 4.63-35.29 9.11-53.09 13.68 14.95 53.66 37.68 102.66 68.43 148.42-33.52 32.9-69.96 61.28-109.01 87.71 9.7 15.49 19.21 30.72 29.17 46.61 41.32-26.59 78.63-56.74 113.51-89.51 14.14 12.56 26.89 26.7 42.28 36.84 14.93 9.82 19.04 21.13 18.17 38.12-1.43 28.11-0.37 56.33-0.37 85.38-3.83 0.19-7 0.44-10.2 0.44-105.18 0.03-210.36 0.09-315.54-0.19-5.47 0-10.98-2.93-16.45-4.51-0.08-176.53-0.08-353.06-0.08-529.6z m0 0" p-id="4557" fill="var(--icon)"></path><path d="M951.34 403.93H444.93c-14.58 0-16.69 2.05-16.69 16.29v507.31c0 14.05 2.02 16.07 15.82 16.07h507.31c14.89 0 16.57-1.61 16.57-16.1V420.19c0.01-14.3-1.98-16.26-16.6-16.26zM786.1 840.54c-16.92 0-16.92 0-21.73-16.07-6.25-20.74-12.78-41.39-18.65-62.21-1.56-5.51-3.73-7.62-9.64-7.53-26.74 0.31-53.5 0.4-80.24-0.06-6.5-0.1-8.67 2.36-10.17 8.05-6.25 23.5-13.12 46.85-19.28 70.39-1.47 5.63-3.7 7.65-9.58 7.56-23.13-0.31-46.23-0.12-70.6-0.12 4.85-16.17 9.32-31.16 13.89-46.14 28.36-92.78 56.81-185.49 84.97-278.33 2.03-6.72 4.51-9.45 12.03-9.32 29.69 0.52 59.38 0.21 89.76 0.21L850.3 840.54h-64.2zM289.88 643.99v106.26H411.2v72.07c-2.52 0.12-5.32 0.37-8.15 0.37-39.51 0.03-79.03 0.16-118.55-0.21-4.16-0.04-9.27-2.12-12.28-4.97-17.01-16.17-33.61-32.77-50.09-49.5-2.42-2.45-4.66-6.43-4.69-9.73-0.35-37.72-0.22-75.46-0.22-114.29h72.66z m0 0" p-id="4558" fill="var(--icon)"></path><path d="M659.65 697.86c11.69-44.49 23.19-88.3 34.88-132.82 12.41 44.18 24.69 88.05 37.28 132.82h-72.16z m0 0" p-id="4559" fill="var(--icon)"></path></svg>
                              </span>
                            </div>
                          </div>
                          <span></span>
                        </div>`;
    globalSetting.addEventListener("click", globalTranslationModelClickHandler);
    element.insertAdjacentElement("afterbegin", globalSetting);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 全局翻译按钮点击事件
 * @returns {Promise<void>}
 */
const globalTranslationModelClickHandler = async () => {
  try {
    helloworld.showGlobalTranslationModal(helloworld.data);
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
const sendMessageHandler = async () => {
  try {
    setResponseMessage("");
    let input = helloworld.input;
    let button = helloworld.sendButton;
    let message = sendMessageTextHandler(input);
    let text = message.text;
    let emoji = message.emoji;
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text) && !emoji) {
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
              if (isContainChinese(checkTranslationText.text)) {
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
    let isGroup = checkGroupMessage(element);
    let textElement = element.querySelector("span[class='_11JPr selectable-text copyable-text']");
    if (textElement !== null) {
      let message = receiveMessageTextHandler(textElement);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
        document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
        document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
        if (!element.querySelector("div[class='helloworld-translation-message selectable-text copyable-text']")) {
          div = document.createElement("div");
          div.className = "helloworld-translation-message selectable-text copyable-text";
        } else {
          div = element.querySelector("div[class='helloworld-translation-message selectable-text copyable-text']");
        }
        div.style.cssText = "display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;";
        textElement.insertAdjacentElement("afterend", div);
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
        scrollToBottom(document.querySelector("._5kRIK"));
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
    let emoji = true;
    let childNodes = Array.from(input.childNodes);
    childNodes.map((node, index) => {
      Array.from(node.childNodes).map(_childNode => {
        //普通文本 斜体_文本_ 删除线~文本~ 粗体*文本*
        if (_childNode.className.includes("selectable-text copyable-text")) {
          text += _childNode.innerHTML;
          emoji = false;
        }
        //等宽```文本```
        if (_childNode.nodeName === "CODE") {
          text += _childNode.innerText;
          emoji = false;
        }
        //表情
        if (_childNode.className.includes("dcnh1tix sxl192xd t3g6t33p")) {
          text += _childNode.innerText;
        }
      });
      //换行
      if (!(index === childNodes.length - 1)) {
        text += "\n";
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
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = textEle => {
  let message = "";
  let childNodes = Array.from(textEle.childNodes[0].childNodes);
  childNodes.map((node, index) => {
    if (node.nodeName === "#text") {
      message += node.data;
    } else if (node.nodeName === "IMG") {
      message += node.alt;
    } else {
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
    if (el && el.getAttribute) {
      let data_id = el.getAttribute("data-id");
      if (data_id) {
        return data_id.includes("@g.us");
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
      let elementList = document.querySelectorAll(".CzM4m._2zFLj");
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
 * 未读消息监控
 */
const updateBadge = () => {
  let t = 0;
  const e = document.querySelectorAll("#pane-side .cfzgl7ar");
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
0;
