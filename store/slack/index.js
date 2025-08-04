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
    if (className && className.includes) {
        if (className === "p-rich_text_section") {
            receiveMessagesHandler(element);
        }
    }
    if (nodeName && nodeName === "A") {
        element.setAttribute("target", "_self");
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
        let chat_language = document.querySelector(".helloworld-chatLanguage");
        if (!chat_language) {
            let div = document.createElement("div");
            div.style.height = "28px";
            div.className = "helloworld-chatLanguage";
            element.insertAdjacentElement("afterend", div);
            helloworld.chatLanguage = div;
            helloworld.chatLanguage.innerHTML = globalLanguageHandler("message");
        } else {
            helloworld.chatLanguage = chat_language;
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
        let rsp_div = element.querySelector(".helloworld-responseMessage");
        if (!rsp_div) {
            let div = document.createElement("div");
            div.className = "helloworld-responseMessage";
            div.style.cssText = "font-size:13px;text-align: center;";
            div.innerHTML = "";
            helloworld.responseMessage = div;
            element.insertAdjacentElement("afterbegin", div);
        } else {
            helloworld.responseMessage = rsp_div;
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
const pasteText = (input, message) => {
    try {
        const pasteEvent = Object.assign(
            new Event("paste", {
                bubbles: true,
                cancelable: true,
            }),
            {
                clipboardData: {
                    dropEffect: "none",
                    effectAllowed: "uninitialized",
                    files: [],
                    items: [],
                    getData: () => message,
                    types: ["text/html"],
                },
            }
        );
        input.focus();
        input.dispatchEvent(pasteEvent);
    } catch (e) {
        console.error(e);
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
                    input.innerHTML = translationText;
                    setTimeout(() => {
                        window.fireMessageInput(input, translationText);
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
const receiveMessagesHandler = element => {
    try {
        let isGroup = checkGroupMessage(element);
        let message = receiveMessageTextHandler(element);
        //消息不为空或不为纯数字
        if (!isEmpty(message) && !isNumber(message)) {
            let div;
            let param = helloworld.data;
            document.body.style.setProperty("--helloworldColor", param.fontColor); //全局字体颜色
            document.body.style.setProperty("--helloworldSize", param.fontSize.concat("px")); //全局字体大小
            document.body.style.setProperty("--helloworldLineHeight", `${param.fontSize * 1.2}px`);
            if (!element.parentNode.querySelector("div[class='helloworld-translation-message p-rich_text_section']")) {
                div = document.createElement("div");
                div.className = "helloworld-translation-message p-rich_text_section";
                div.style.cssText = "color:var(--helloworldColor);font-size:var(--helloworldSize);";
                element.insertAdjacentElement("afterend", div);
            } else {
                div = element.parentNode.querySelector("div[class='helloworld-translation-message p-rich_text_section']");
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
 * 发送消息读取文本处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
const sendMessageTextHandler = input => {
    try {
        return input.innerText;
    } catch (e) {
        console.error(e);
    }
};
/**
 * 接收消息读取文本处理
 */
const receiveMessageTextHandler = element => {
    return element.innerText;
};
/**
 * 检测群组消息
 */
const checkGroupMessage = el => {
    return document.querySelector("button[class='c-button-unstyled p-avatar_stack--details']");
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
            let elementList = document.querySelectorAll("div[class='p-rich_text_section']");
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
    let _a_list = document.querySelectorAll("a");
    if (_a_list && _a_list.length > 0) {
        for (let _a of _a_list) {
            if (_a.getAttribute && _a.getAttribute("target") !== "_self") {
                _a.setAttribute("target", "_self");
            }
        }
    }
    let msg_list = document.querySelectorAll("div[class='p-rich_text_section']");
    if (msg_list && msg_list.length > 0) {
        for (let msg of msg_list) {
            receiveMessagesHandler(msg);
        }
    }
    let _input = document.querySelector(".ql-editor");
    if (_input) inputHandler(_input);
    let _button = document.querySelector("span[class='c-wysiwyg_container__send_button--with_options']");
    if (_button) buttonHandler(_button.childNodes[0]);
    let _plaaceholder = document.querySelector("div[class='c-texty_input__placeholder']");
    if (_plaaceholder) inputLanguageHandler(_plaaceholder);
    let rsp_text = document.querySelector("div[class='workspace__primary_view_footer p-workspace__primary_view_footer--float']");
    if (rsp_text) responseMessageHandler(rsp_text);
    let chat_language = document.querySelector("div[class='p-view_header p-view_header--tiles p-view_header--with-bookmarks-bar']");
    if (chat_language) chatLanguageHandler(chat_language);
    let t = 0;
    const e = document.querySelectorAll("span[class='p-channel_sidebar__badge c-mention_badge c-mention_badge--black']");
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
