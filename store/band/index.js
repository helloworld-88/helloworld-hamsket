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
 */
function parseElement(element) {
  let className = element.className;
  if (className && className.includes) {
    console.info(element);
    if (className === 'chatWriteAreaBox _use_keyup_event _messageTextArea') {
      inputHandler(element);
      inputLanguageHandler(element);
      buttonHandler();
      responseMessageHandler();
    }
    if (className === 'logWrap logMy' || className === 'logWrap logFriend') {
      receiveMessagesHandler(element);
    }
  }
}

/**
 * 消息发送框处理
 * @param input
 */
function inputHandler(input) {
  try {
    helloworld.input = input;
    helloworld.input.setAttribute('helloworld-id', 'helloworld-input');
    helloworld.input.addEventListener('keydown', inputKeydownHandler, true);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息发送按钮处理
 */
function buttonHandler() {
  try {
    let button = document.querySelector('button[class="uButton -radius3 _sendMessageButton"]');
    if (button && !button.getAttribute('helloworld-id')) {
      helloworld.sendButton = button;
      helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton');
      helloworld.sendButton.addEventListener('click', sendButtonClickHandler, true);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息发送语种提示处理
 * @param element
 */
function inputLanguageHandler(element) {
  try {
    helloworld.sendLanguage = globalLanguageHandler('send');
    element.setAttribute('placeholder', helloworld.sendLanguage);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息翻译返回状态处理
 */
function responseMessageHandler() {
  try {
    let responseMessage = document.querySelector('span[helloworld-id="helloworld-responseMessage"]');
    let element = document.querySelector('.cChatWriteWrap');
    if (element && !responseMessage) {
      let span = document.createElement('span');
      span.setAttribute('helloworld-id', 'helloworld-responseMessage');
      span.style.cssText = 'font-size:13px;';
      span.innerHTML = '';
      helloworld.responseMessage = span;
      element.insertAdjacentElement('beforebegin', span);
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * 消息发送框回车事件处理
 * @param evt
 */
function inputKeydownHandler(evt) {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter') {
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
}

/**
 * 消息发送按钮点击事件
 * @param evt
 */
function sendButtonClickHandler(evt) {
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
}

/**
 * 消息发送翻译处理
 */
function sendMessageHandler() {
  try {
    setResponseMessage('');
    let input = helloworld.input;
    let button = helloworld.sendButton;
    let text = sendMessageTextHandler(input);
    let param = helloworld.data;
    if (param.send && !isEmpty(text) && !isNumber(text)) {
      let data = {
        q: text, //待翻译文本
        send: true, //是否为发送消息
      };
      setResponseMessage('翻译消息中...');
      //翻译消息
      translationHandler(param, data, function (response) {
        window.sendLock = false;
        if (response.code === 200) {
          setResponseMessage('');
          input.value = response.text;
          setTimeout(() => {
            window.fireMessageInput(input);
            setTimeout(() => {
              let checkTranslationText = sendMessageTextHandler(input);
              if (isContainChinese(checkTranslationText)) {
                //目标语言为日语 粤语 繁体中文 翻译结果不需要中文检测 直接发送
                if (param.sendTo === 'ja' || param.sendTo === 'jp' || param.sendTo === 'cht' || param.sendTo === 'zh-TW' || param.sendTo === 'yue') {
                  button.click();
                } else {
                  //开启了中文发送 通过中文检测
                  if (param.includeZh) {
                    button.click();
                  } else {
                    //未开启中文发送 翻译结果内包含中文阻止发送
                    setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                  }
                }
              } else {
                button.click();
              }
            }, 20);
          }, 30);
        } else {
          setResponseMessage(`${response.message}`, 'var(--danger)');
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
}
/**
 * 接收消息翻译处理
 * @param element
 */
function receiveMessagesHandler(element) {
  try {
    let isGroup = checkGroupMessage(element);
    let textElement = element.querySelector("span[class='txt _messageContent']");
    if (textElement !== null) {
      let message = receiveMessageTextHandler(textElement);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.querySelector("span[class='helloworld-translation-message']")) {
          div = document.createElement('span');
          div.className = 'helloworld-translation-message';
        } else {
          div = element.querySelector("span[class='helloworld-translation-message']");
        }
        div.style.cssText = 'color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
        textElement.insertAdjacentElement('afterend', div);
        let data = {
          q: message, //接收的消息文本
          send: false, //是否发送翻译
        };
        let msgCache = queryMsgCache(param, data);
        console.info(msgCache)
        if (msgCache) {
          msgCache = msgCache.replaceAll('\\n', '<br>').replaceAll('\n', '<br>');
          div.innerHTML = msgCache;
        } else {
          //开启了消息翻译
          if (param.message) {
            div.innerHTML = '正在翻译消息中...';
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
}
/**
 * 自动翻译接收消息处理
 * @param param
 * @param data
 * @param element
 */
function autoTranslationHandler(param, data, element) {
  try {
    element.innerHTML = '正在翻译消息中...';
    translationHandler(param, data, function (response) {
      if (response.code == 200) {
        element.innerHTML = response.text.replaceAll('\\n', '<br>').replaceAll('\n', '<br>');
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
}
/**
 * 手动翻译接收消息处理
 * @param param
 * @param data
 * @param element
 */
function clickTranslationHandler(param, data, element) {
  let button = document.createElement('button');
  button.innerHTML = '<u>点击翻译</u>';
  button.addEventListener('click', function () {
    autoTranslationHandler(param, data, element);
  });
  element.innerHTML = '';
  element.appendChild(button);
}
/**
 * 发送消息读取文本处理
 * @param input
 * @returns {{emoji: boolean, text: string}}
 */
function sendMessageTextHandler(input) {
  try {
    return input.value;
  } catch (e) {
    console.error(e);
  }
}
/**
 * 接收消息读取文本处理
 */
function receiveMessageTextHandler(textEle) {
  let message = "";
  let childNodes = Array.from(textEle.childNodes);
  childNodes.map((node, index) => {
    if (node.nodeName === "#text") {
      message += node.data;
    } else if (node.nodeName === "BR") {
      message += '\n';
    }
  });
  console.info(message)
  return message;
}
/**
 * 检测群组消息
 */
function checkGroupMessage(el) {
  try {
    if (el && el.getAttribute) {
      let data_id = el.getAttribute('data-id');
      if (data_id) {
        return data_id.includes('@g.us');
      }
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息翻译返回状态显示
 */
function setResponseMessage(text, color) {
  try {
    if (helloworld.responseMessage) {
      helloworld.responseMessage.style.color = color || 'var(--helloworldColor)';
      helloworld.responseMessage.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * 更新全局翻译参数
 * @param data
 */
window.updateGlobalTranslationParam = function (data) {
  try {
    window.helloworld.data = data;
    localStorage.setItem('tt_api', data.server);
    setTimeout(() => {
      let elementList = document.querySelectorAll('.logWrap.logMy');
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
function updateGlobalInputLanguage() {
  try {
    let sendLanguageText = globalLanguageHandler('send');
    let chatLanguageText = globalLanguageHandler('message');
    if (helloworld.input) {
      helloworld.sendLanguage = sendLanguageText;
      helloworld.input.setAttribute('placeholder', helloworld.sendLanguage);
    }
    if (helloworld.chatLanguage) {
      helloworld.chatLanguage.innerHTML = chatLanguageText;
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * 获取全局翻译语种提示
 * @param type
 */
function globalLanguageHandler(type) {
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
}

/**
 * 未读消息监控
 */
function updateBadge() {
  let t = 0;
  const e = document.querySelectorAll('.count._unreadChatCount');
  for (let n = 0; n < e.length; n++) {
    if (e[n].innerHTML) {
      t += parseInt(e[n].innerHTML);
    } else {
      t += 1;
    }
  }
  t && t >= 1 ? helloworld.setUnreadCount(t) : helloworld.clearUnreadCount();
}
window.setInterval(updateBadge, 3000);
0;
