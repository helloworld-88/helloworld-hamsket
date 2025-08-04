let whatsappTime;
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
  let element = args[0];
  let refChild = args[1];
  setTimeout(() => {
    parseElement(element).then();
  }, 5);
  return _insertBefore.call(thisObj, element, refChild);
};
/**
 * 页面元素监听
 * @param element
 * @returns {Promise<void>}
 */
async function parseElement(element) {
  let className = element.className;
  if (className && className.includes) {
    if (compareWwebVersions(window.Debug.VERSION, '>', '2.2412.54')) {
      if (className === 'x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x6prxxf') inputHandler(element);
      if (className === 'x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x1lkfr7t') fileInputHandler(element);
      if (className.includes('xfect85 x1iy03kw x1lfpgzf')) buttonHandler(element);
      if (className === "x1c4vz4f x2lah0s xdl72j9 x1heor9g xmper1u x100vrsf x1vqgdyp x78zum5 xl56j7k x6s0dn4") buttonHandler(element);
      if (className.includes('x1gfkgh9 x1247r65 xng8ra') && element.parentNode.className === 'x1n2onr6'){
        if(document.querySelector('div[class="x1n2onr6 xyw6214 x78zum5 x1r8uery x1iyjqo2 xdt5ytf x1hc1fzr x6ikm8r x10wlt62"]')){
          fileButtonHandler(element);
        }
      }
      if (className.includes('_ak1i')) responseMessageHandler(element);
      if (className.includes('_ah9v')) fileResponseMessageHandler(element);
      if (className.includes('xh9ts4v x1k6rcq7')) inputLanguageHandler(element).then();
      if (className.includes('_amjv _aotl')) receiveMessagesHandler(element).then();
      if (className.includes('_ak9p')) {
        initAPI().then((e) => {
          setUserModal(element).then();
        });
      }
      if (className === 'x9f619 x78zum5 x6s0dn4 xl56j7k x1ofbdpd _ak1m') await friendTranslationBtnHandler(element);
      if (className.includes('x10l6tqk x13vifvy x17qophe xyw6214')) {
        setTimeout(() => {
          scrollToBottom(element);
        },3000);
      }
      //对话列表
      if (className.includes('_aigv _aigw _aigx') || className.includes('x1y332i5 x1n2onr6 x6ikm8r x10wlt62')) {
        initAPI().then((e) => {
          setTimeout(() => {
            syncContacts().then();
          }, 3000);
        });
      }
    }
  }
}
/**
 * 用户信息面板
 * @param element
 */
async function setUserModal(element) {
  try {
    let user = await getUser();
    if (user) {
      let username = user.name ? user.name : user.pushname ? user.pushname : user.shortName ? user.shortName : user.userid;
      let panel = `<div class="_ai03 _ai01 _akmh" style="padding-right: 15px;user-select: text;">
                      <div style="display: flex;align-items: center;">
                         <button style="padding: 7px;">
                            <svg t="1696669305309" class="icon" viewBox="0 0 1154 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4018" width="24" height="24"><path d="M1015.808 64.512q62.464 0 99.84 31.744t37.376 96.256l0 568.32q0 27.648-10.24 52.224t-28.16 43.008-41.984 29.184-50.688 10.752l-892.928 0q-26.624 0-50.176-10.24t-40.96-27.136-27.648-39.424-10.24-48.128l0-580.608q0-55.296 33.792-90.624t95.232-35.328l886.784 0zM287.744 253.952q-19.456 0-36.864 7.168t-30.72 19.968-20.992 30.72-7.68 38.4 7.68 37.888 20.992 30.72 30.72 20.992 36.864 7.68q21.504 0 39.424-7.68t30.72-20.992 20.48-30.72 7.68-37.888q0-41.984-27.648-69.12t-70.656-27.136zM448.512 608.256q0-19.456-7.68-37.376t-20.48-30.72-30.72-20.48-37.376-7.68l-128 0q-39.936 0-67.584 28.16t-27.648 68.096l0 4.096 0 92.16 319.488 0 0-92.16 0-4.096zM923.648 709.632q20.48 0 30.208-10.24t9.728-24.576-11.264-25.088-31.744-10.752l-305.152 0q-20.48 0-30.72 10.752t-10.24 25.088 10.24 24.576 29.696 10.24l309.248 0zM924.672 577.536q20.48 0 29.696-10.24t9.216-24.576q0-15.36-8.704-25.6t-29.184-10.24l-313.344 0q-20.48 0-29.696 10.24t-9.216 25.6q0 14.336 8.704 24.576t29.184 10.24l313.344 0zM925.696 447.488q15.36 0 26.624-10.24t11.264-24.576-11.264-23.04-26.624-8.704l-207.872 0q-15.36 0-26.112 8.704t-10.752 23.04 10.752 24.576 26.112 10.24l207.872 0z" p-id="4019" fill="var(--panel-header-icon)"></path></svg>
                         </button>
                         <div style="font-size: 13px;display: flex;">
                            <div style="padding: 7px;">用户名:${username}</div>
                            <div style="padding: 7px;">联系号码:${user.phone}</div>
                         </div>
                      </div>
                    </div>`;
      element.insertAdjacentHTML('afterbegin', panel);
      localStorage.setItem('nickname', username);
      localStorage.setItem('accountNumber', user.userid);
      //存在工单信息 进行绑定
      if (helloworld.data.counter && helloworld.data.counterState) {
        if (helloworld.data.counterNumber && helloworld.data.counterPortID) {
          await window.uploadInitialFriends(helloworld.data.counterNumber, helloworld.data.counterPortID);
        }
      }
    }
  } catch (e) {
    console.error(e);
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
 * 文件消息发送框处理
 * @param fileInput
 */
function fileInputHandler(fileInput) {
  try {
    helloworld.fileInput = fileInput;
    helloworld.fileInput.setAttribute('helloworld-id', 'helloworld-fileInput');
    helloworld.fileInput.addEventListener('keydown', fileInputKeydownHandler, true);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息发送按钮处理
 * @param button
 */
function buttonHandler(button) {
  try {
    helloworld.sendButton = button;
    helloworld.sendButton.setAttribute('helloworld-id', 'helloworld-sendButton');
    helloworld.sendButton.addEventListener('click', sendButtonClickHandler, true);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 文件消息发送按钮处理
 * @param fileButton
 */
function fileButtonHandler(fileButton) {
  try {
    helloworld.fileButton = fileButton;
    helloworld.fileButton.setAttribute('helloworld-id', 'helloworld-fileButton');
    helloworld.fileButton.addEventListener('click', fileButtonClickHandler, true);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息发送语种提示处理
 * @param element
 */
async function inputLanguageHandler(element) {
  try {
    if (element.innerHTML !== '' && !element.getAttribute('testid')) {
      helloworld.sendLanguage = element;
      helloworld.sendLanguage.style.cssText = 'font-size:13px;line-height:25px;';
      helloworld.sendLanguage.setAttribute('helloworld-id', 'helloworld-sendLanguage');
      let friendInfo = await getFriendTranslation();
      let friendData = window.readFData(friendInfo.friendId);
      if (friendData) {
        helloworld.sendLanguage.innerHTML = friendLanguageHandler(friendData, 'send');
      } else {
        helloworld.sendLanguage.innerHTML = globalLanguageHandler('send');
      }
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 消息接收语种提示处理
 * @param element
 */
async function chatLanguageHandler(element) {
  try {
    let div = document.createElement('div');
    div.className = '_6u0RM';
    let span = `<span helloworld-id="helloworld-chatLanguage" class="ggj6brxn gfz4du6o r7fjleex g0rxnol2 lhj4utae le5p0ye3 l7jjieqr _11JPr helloworld-chatLanguage" style="font-size: 13px;"></span>`;
    div.innerHTML = `<div class="_3W2ap"><div class="Mk0Bp _30scZ">${span}</div></div>`;
    element.insertAdjacentElement('afterend', div);
    helloworld.chatLanguage = div.querySelector('.helloworld-chatLanguage');
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
}
/**
 * 消息翻译返回状态处理
 * @param element
 */
function responseMessageHandler(element) {
  try {
    let span = document.createElement('span');
    span.setAttribute('helloworld-id', 'helloworld-responseMessage');
    span.style.cssText = 'font-size:13px;';
    span.innerHTML = '';
    helloworld.responseMessage = span;
    element.insertAdjacentElement('afterbegin', span);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 文件消息翻译返回状态处理
 * @param element
 */
function fileResponseMessageHandler(element) {
  try {
    let span = document.createElement('span');
    span.setAttribute('helloworld-id', 'helloworld-fileResponseMessage');
    span.style.cssText = 'font-size:13px;text-align:center;';
    span.innerHTML = '';
    helloworld.fileResponseMessage = span;
    setTimeout(() => {
      element.insertAdjacentElement('beforebegin', span);
    }, 10);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 独立翻译按钮设置
 * @param element
 * @returns {Promise<void>}
 */
async function friendTranslationBtnHandler(element) {
  try {
    if (element.parentNode.className === '_ak1q') {
      let friendSetting = document.createElement('div');
      friendSetting.className = 'x100vrsf x1vqgdyp x78zum5 x6s0dn4 heloworld';
      friendSetting.innerHTML = `<button class="xjb2p0i xk390pu x1ypdohk xjbqb8w x972fbf xcfux6l x1qhh985 xm0m39n x1okw0bk x5yr21d x14yjl9h xudhj91 x18nykt9 xww2gxu xlkovuz xzwifym x16j0l1c xurb0ha x1sxyh0 x96k8nx xdvlbce" tabindex="0" data-tab="11" title="独立翻译设置" type="button">
                                    <span aria-hidden="true" data-icon="plus" class="">
                                        <svg t="1698651664086" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8857" width="24" height="24"><path d="M938.667 790.756l-8.534-5.69V762.312l8.534-5.689c11.377-5.689 17.066-17.066 19.91-28.444 2.845-11.378 2.845-25.6-5.688-34.134l-19.911-34.133c-5.69-11.378-17.067-17.067-28.445-22.755-11.377-2.845-22.755-2.845-34.133 2.844l-11.378 5.689c-5.689-2.845-11.378-8.533-19.91-11.378v-11.378c0-25.6-19.912-45.51-45.512-45.51h-39.822c-25.6 0-45.511 19.91-45.511 45.51v11.378c-5.69 2.845-14.223 5.689-19.911 11.378L676.978 640c-22.756-11.378-48.356-5.689-62.578 17.067L597.333 691.2c-5.689 11.378-8.533 22.756-5.689 34.133 2.845 11.378 11.378 22.756 19.912 28.445l8.533 5.689v22.755l-8.533 5.69c-11.378 5.688-17.067 17.066-19.912 28.444-2.844 11.377-2.844 25.6 5.69 34.133l19.91 34.133c11.378 22.756 39.823 28.445 62.578 17.067L691.2 896c5.689 2.844 11.378 8.533 19.911 11.378v11.378c0 25.6 19.911 45.51 45.511 45.51h39.822c25.6 0 45.512-19.91 45.512-45.51v-11.378c5.688-2.845 14.222-5.69 19.91-11.378l11.378 5.689c11.378 5.689 22.756 8.533 34.134 2.844 11.378-2.844 22.755-11.377 28.444-22.755l19.911-34.134c5.69-11.377 8.534-22.755 5.69-34.133-5.69-8.533-11.379-17.067-22.756-22.755z m-159.29 59.733c-42.666 0-79.644-36.978-79.644-79.645 0-42.666 36.978-79.644 79.645-79.644 42.666 0 79.644 36.978 79.644 79.644 0 42.667-36.978 79.645-79.644 79.645zM463.645 588.8c-71.11 0-139.377-28.444-187.733-76.8-51.2-51.2-76.8-116.622-76.8-187.733s28.445-139.378 76.8-187.734c48.356-51.2 116.622-79.644 187.733-79.644s139.378 28.444 187.734 76.8c51.2 51.2 76.8 116.622 76.8 187.733s-28.445 139.378-76.8 187.734C600.178 563.2 534.756 588.8 463.644 588.8z" p-id="8858" fill="var(--icon)"></path><path d="M526.222 793.6c0-56.889 19.911-110.933 59.734-153.6 19.91-19.911 42.666-36.978 68.266-48.356-56.889-31.288-122.31-48.355-190.578-48.355-102.4 0-201.955 39.822-275.91 110.933-59.734 56.89-99.556 128-122.312 204.8C56.89 896 82.49 930.133 119.467 930.133h455.11C543.29 896 526.223 844.8 526.223 793.6z" p-id="8859" fill="var(--icon)"></path></svg>
                                    </span>
                                 </button>`;
      friendSetting.addEventListener('click', friendTranslationModelClickHandler);
      element.insertAdjacentElement('beforeend', friendSetting);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 好友翻译按钮点击事件
 * @returns {Promise<void>}
 */
async function friendTranslationModelClickHandler() {
  try {
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    helloworld.showFriendTranslationModal(friendInfo, friendData ? friendData : helloworld.data);
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
      if (evt.key === 'Enter' && !(evt.ctrlKey || evt.metaKey)) {
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
}
/**
 * 文件消息发送框回车事件
 * @param evt
 */
function fileInputKeydownHandler(evt) {
  try {
    if (evt.isTrusted) {
      if (evt.key === 'Enter' && !(evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (!window.sendLock) {
          window.sendLock = true;
          fileMessageHandler().then();
        }
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----文件输入框回车发送错误!-----${e}`);
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
        window.selectAllText(helloworld.input);
        sendMessageHandler().then();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
}
/**
 * 文件消息发送按钮点击事件
 * @param evt
 */
function fileButtonClickHandler(evt) {
  try {
    if (evt.isTrusted) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.stopImmediatePropagation();
      if (!window.sendLock) {
        window.sendLock = true;
        window.selectAllText(helloworld.fileInput);
        fileMessageHandler().then();
      }
    }
  } catch (e) {
    window.sendLock = false;
    console.error(`-----发送按钮点击发送错误!-----${e}`);
  }
}
/**
 * 消息发送翻译处理
 * @returns {Promise<void>}
 */
async function sendMessageHandler(btn) {
  try {
    let param = '';
    //发送前清空请求翻译提示文本
    setResponseMessage('');
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    param = friendData ? friendData : helloworld.data;
    let input = helloworld.input;
    let button = btn ? btn : helloworld.sendButton;
    //未开启消息翻译直接发送
    if (!param.send) {
      window.sendLock = false;
      button.click();
    } else {
      let message = sendMessageTextHandler(input);
      let text = message.text;
      let emoji = message.emoji;
      //消息文本为空、纯数字、纯表情 直接发送
      if (isEmpty(text) || isNumber(text) || emoji) {
        window.sendLock = false;
        button.click();
      } else {
        let data = {
          q: text, //待翻译文本
          send: true, //是否为发送消息
        };
        setResponseMessage('翻译消息中...');
        //翻译前让输入框无法编辑
        input.setAttribute('contenteditable', false);
        translationHandler(param, data, async function (response) {
          //翻译接口返回数据后 解开输入框编辑
          input.setAttribute('contenteditable', true);
          if (response.code === 200) {
            setResponseMessage('');
            let translationText = response.text;
            //全选输入框
            window.selectAllText(input);
            setTimeout(() => {
              //覆盖粘贴翻译文本
              window.pasteText(input, translationText);
              setTimeout(() => {
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(input.__lexicalTextContent)) {
                  //开启了发送中文消息 翻译接口返回的文本检测到包含中文 直接发送
                  if (param.includeZh) {
                    button.click();
                    window.sendLock = false;
                  } else {
                    //未开启发送中文消息 翻译接口返回的文本检测到包含中文 阻止发送
                    setResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                    window.sendLock = false;
                  }
                } else {
                  button.click();
                  window.sendLock = false;
                }
                setTimeout(() => {
                  if (document.querySelector('.x10l6tqk.x13vifvy.x17qophe.xyw6214')) scrollToBottom(document.querySelector('.x10l6tqk.x13vifvy.x17qophe.xyw6214'));
                }, 1000);
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
    //出现错误 解锁发送锁定
    window.sendLock = false;
    helloworld.input.setAttribute('contenteditable', true);
    console.error(e);
  }
}
/**
 * 文件消息发送翻译处理
 * @returns {Promise<void>}
 */
async function fileMessageHandler() {
  try {
    let param = '';
    //发送前清空请求翻译提示文本
    setFileResponseMessage('');
    //发送前检测是否此聊天页面是否设置独立翻译
    let friendInfo = await getFriendTranslation();
    let friendData = window.readFData(friendInfo.friendId);
    param = friendData ? friendData : helloworld.data;
    let input = helloworld.fileInput;
    let button = helloworld.fileButton;
    //未开启消息翻译直接发送
    if (!param.send) {
      window.sendLock = false;
      button.click();
    } else {
      //拼接源文本
      let message = sendMessageTextHandler(input);
      let text = message.text;
      let emoji = message.emoji;
      //消息文本为空、纯数字、纯表情 直接发送
      if (isEmpty(text) || isNumber(text) || emoji) {
        window.sendLock = false;
        button.click();
      } else {
        let data = {
          q: text, //待翻译文本
          send: true, //是否为发送消息
        };
        setFileResponseMessage('翻译消息中...');
        //发送消息翻译处理
        translationHandler(param, data, async function (response) {
          if (response.code === 200) {
            setFileResponseMessage('');
            let translationText = response.text;
            //全选输入框
            window.selectAllText(input);
            setTimeout(() => {
              //覆盖粘贴翻译文本
              window.pasteText(input, translationText);
              setTimeout(() => {
                //检测是翻译接口返回文本否包含中文
                if (isContainChinese(input.__lexicalTextContent)) {
                  //开启了发送中文消息 翻译接口返回的文本检测到包含中文 直接发送
                  if (param.includeZh) {
                    button.click();
                    window.sendLock = false;
                  } else {
                    //未开启发送中文消息 翻译接口返回的文本检测到包含中文 阻止发送
                    setFileResponseMessage('检测到中文,已阻止发送,请重试!', 'var(--danger)');
                    window.sendLock = false;
                  }
                } else {
                  button.click();
                  window.sendLock = false;
                }
                setTimeout(() => {
                  if (document.querySelector('.x10l6tqk.x13vifvy.x17qophe.xyw6214')) scrollToBottom(document.querySelector('.x10l6tqk.x13vifvy.x17qophe.xyw6214'));
                }, 1000);
              }, 100);
            }, 50);
          } else {
            setFileResponseMessage(`${response.message}`, 'var(--danger)');
            window.sendLock = false;
          }
        });
      }
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
async function receiveMessagesHandler(element) {
  try {
    let isGroup = checkGroupMessage(element);
    let textElement = element.querySelector("span[class*='selectable-text copyable-text']");
    if (textElement !== null) {
      let message = receiveMessageTextHandler(textElement);
      //消息不为空或不为纯数字
      if (!isEmpty(message) && !isNumber(message)) {
        let div;
        let param = '';
        let friendInfo = await getFriendTranslation();
        let friendData = window.readFData(friendInfo.friendId);
        param = friendData ? friendData : helloworld.data;
        document.body.style.setProperty('--helloworldColor', param.fontColor); //全局字体颜色
        document.body.style.setProperty('--helloworldSize', param.fontSize.concat('px')); //全局字体大小
        document.body.style.setProperty('--helloworldLineHeight', `${param.fontSize * 1.2}px`);
        if (!element.querySelector("div[class='helloworld-translation-message selectable-text copyable-text']")) {
          div = document.createElement('div');
          div.className = 'helloworld-translation-message selectable-text copyable-text';
        } else {
          div = element.querySelector("div[class='helloworld-translation-message selectable-text copyable-text']");
        }
        div.style.cssText = 'display:block;color:var(--helloworldColor);font-size:var(--helloworldSize);line-height: initial;visibility: visible;user-select: text;margin-top: 3px;';
        textElement.insertAdjacentElement('afterend', div);
        let data = {
          q: message, //接收的消息文本
          send: false, //是否发送翻译
        };
        div.innerHTML = '正在翻译消息中...';
        //开启了消息翻译
        if (param.message) {
          //不为纯数字 并且 不包含中文 或者 包含日语 或者 包含中文并且开启中文翻译 的消息
          if (
            !isContainChinese(message) ||
            (isContainChinese(message) && isContainJapanese(message) && (param.sendTo === 'ja' || param.sendTo === 'jp')) ||
            (isContainChinese(message) && param.includeZh)
          ) {
            let msgCache = queryMsgCache(param, data);
            if (msgCache) {
              msgCache = msgCache.replaceAll('\\n', '\n');
              div.innerHTML = msgCache;
            } else {
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
            }
          } else {
            div.innerHTML = '';
          }
        } else {
          div.innerHTML = '';
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
      if (response.code === 200) {
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
}
/**
 * 手动翻译接收消息处理
 * @param param
 * @param data
 * @param element
 */
function clickTranslationHandler(param, data, element) {
  let button = document.createElement('button');
  button.innerHTML = "<u style='color:var(--helloworldColor)'>点击翻译</u>";
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
    let text = '';
    let emoji = true;
    let childNodes = Array.from(input.childNodes);
    childNodes.map((node, index) => {
      Array.from(node.childNodes).map((_childNode) => {
        //普通文本 斜体_文本_ 删除线~文本~ 粗体*文本*
        if (_childNode.className.includes('selectable-text copyable-text')) {
          text += _childNode.innerHTML;
          emoji = false;
        }
        //等宽```文本```
        if (_childNode.nodeName === 'CODE') {
          text += _childNode.innerText;
          emoji = false;
        }
        //表情
        if (_childNode.className.includes('x19la9d6 x1fc57z9 x6ikm8r x10wlt62')) {
          text += _childNode.innerText;
        }
      });
      //换行
      if (!(index === childNodes.length - 1)) {
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
}
/**
 * 接收消息读取文本处理
 */
function receiveMessageTextHandler(textEle) {
  let message = '';
  let childNodes = Array.from(textEle.childNodes);
  childNodes.map((node, index) => {
    let _childNodes = Array.from(node.childNodes);
    _childNodes.map((_node, index) => {
      if (_node.nodeName === '#text') {
        message += _node.data;
      } else if (_node.nodeName === 'IMG') {
        message += _node.alt;
      } else {
        message += _node.innerText;
      }
    });
  });
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
 * 文件消息翻译返回状态显示
 * @param text
 * @param color
 */
function setFileResponseMessage(text, color) {
  try {
    if (helloworld.fileResponseMessage) {
      helloworld.fileResponseMessage.style.color = color || 'var(--helloworldColor)';
      helloworld.fileResponseMessage.innerHTML = text;
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 更新全局翻译参数
 * @param data
 */
async function updateGlobalTranslationParam(data) {
  try {
    window.helloworld.data = data;
    localStorage.setItem('tt_api', data.server);
    setTimeout(async () => {
      let elementList = document.querySelectorAll('._amjv._aotl');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }, 500);
    updateGlobalInputLanguage().then();
  } catch (e) {
    console.error(e);
  }
}
/**
 * 更新独立翻译参数
 * @param data
 * @returns {Promise<void>}
 */
async function updateFriendTranslationParam(data) {
  try {
    window.writeFData(data.friendId, data);
    updateFriendInputLanguage(data);
    setTimeout(async () => {
      let elementList = document.querySelectorAll('._amjv._aotl');
      for (let element of elementList) {
        await receiveMessagesHandler(element);
      }
    }, 500);
  } catch (e) {
    console.error(e);
  }
}
function deleteFriendTranslationParam(friendId) {
  try {
    window.delFData(friendId);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 更新全局翻译语种提示
 */
async function updateGlobalInputLanguage() {
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
}
/**
 * 更新独立翻译语种提示
 */
function updateFriendInputLanguage(data) {
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
 * 获取独立翻译语种提示
 * @param data
 * @param type
 */
function friendLanguageHandler(data, type) {
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
}
/**
 * 获取独立翻译信息
 * @returns {Promise<{friendName: string, friendId: string, friendPhone: string}>}
 */
async function getFriendTranslation() {
  try {
    let user = await getUser();
    let chat = await getChat();
    return {
      friendId: 'whatsapp_'.concat(user.userid).concat('_').concat(chat.chatId),
      friendName: chat.formattedTitle,
      friendPhone: chat.phone,
    };
  } catch (e) {
    console.error(e);
  }
}
/**
 * 将聊天页面拉到最底部
 * @param element
 */
function scrollToBottom(element) {
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
}
/**
 * 快捷回复
 * @param escapeText
 */
async function sendReplyMessage(escapeText) {
  try {
    let message = unescape(escapeText);
    let input;
    let fileButton = document.querySelector(
      "div[class='x78zum5 x6s0dn4 xl56j7k xexx8yu x4uap5 x18d9i69 xkhd6sd x1f6kntn xk50ysn x7o08j2 xtvhhri x1rluvsa x14yjl9h xudhj91 x18nykt9 xww2gxu xu306ak x12s1jxh xkdsq27 xwwtwea x1gfkgh9 x1247r65 xng8ra']"
    );
    if (fileButton && fileButton.parentNode.className === 'x1n2onr6') {
      input = document.querySelector("div[class='x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x1lkfr7t']");
      if (input) {
        window.helloworld.focusWebView();
        window.selectAllText(input);
        setTimeout(() => {
          window.pasteText(input, message);
          setTimeout(() => {
            fileMessageHandler();
          }, 50);
        }, 50);
      }
    } else {
      input = document.querySelector("div[class='x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x6prxxf']");
      if (input) {
        window.helloworld.focusWebView();
        window.selectAllText(input);
        setTimeout(() => {
          window.pasteText(input, message);
          setTimeout(() => {
            let button = document.querySelector("button[class='x1c4vz4f x2lah0s xdl72j9 xfect85 x1iy03kw x1lfpgzf']");
            if (button) sendMessageHandler(button);
          }, 50);
        }, 50);
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
  let chats = window.Store.Chat.getModelsArray();
  let _t = 0;
  chats.forEach((c) => {
    if (c.unreadCount && !c.archive) {
      _t += c.unreadCount;
    }
  });
  _t && _t >= 1 ? helloworld.setUnreadCount(_t) : helloworld.clearUnreadCount();
}
window.setInterval(updateBadge, 3000);

/**
 * 获取当前登录用户信息
 * @returns {*}
 */
async function getUser() {
  try {
    let me = window.Store.Contact.get(window.Store.User.getMeUser());
    return await getContactModel(me);
  } catch (e) {
    console.error(e);
  }
}
/**
 * 获取当前聊天页面信息
 * @returns {Promise<string>}
 */
async function getChat() {
  try {
    let chats = window.Store.Chat.getModelsArray();
    let chat = chats.filter((c) => {
      if (c.active) {
        return c;
      }
    });
    return await getChatModel(chat[0]);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 获取好友数据并上传服务器
 * @returns {Promise<void>}
 */
window.uploadInitialFriends = async function (counterNumber, counterPortID) {
  try {
    helloworld.data.counter = true;
    helloworld.data.counterState = true;
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
      let contacts = window.Store.Contact.getModelsArray().filter(function (c) {
        return c.id.server === 'c.us' && c.id._serialized !== '0@c.us';
      });
      let chats = window.Store.Chat.getModelsArray().filter(function (c) {
        return c.id.server === 'c.us' && c.id._serialized !== '0@c.us';
      });
      let contactsConcat = contacts.concat(chats);
      //统计去重后的原始底粉(通讯录联系人加聊天列表联系人)
      let friendsData = contactsConcat.filter(function (item, index, self) {
        return (
          self.findIndex(function (t) {
            return t.id.user === item.id.user;
          }) === index
        );
      });
      await Promise.all(
        friendsData.map(async (f) => {
          let friendInfo = await getContactModel(f);
          let lineAccount = friendInfo.id.user;
          let nickname = friendInfo.name ? friendInfo.name : friendInfo.verifiedName ? friendInfo.verifiedName : friendInfo.pushname ? friendInfo.pushname : friendInfo.phone;
          if (friendInfo.isMe) {
            let profile = await getProfilePicUrl(f.id);
            userDetail = {
              lineAccount: lineAccount,
              nickname: nickname,
              headImg: profile,
            };
          } else {
            fansDetail.push({
              lineAccount: lineAccount,
              nickname: nickname,
              headImg: '',
            });
          }
        })
      );
      if (userDetail) {
        localStorage.setItem('userDetail', JSON.stringify(userDetail));
        localStorage.setItem('fansDetail', JSON.stringify(fansDetail));
        const data = {
          loginType: '电脑端登录',
          userDetail: userDetail,
          fansDetail: fansDetail,
          serialNumber: helloworld.data.counterNumber,
          wsid: helloworld.data.counterPortID,
        };
        console.info('API获取数据成功,开始上传好友数据', data);
        helloworld.uploadInitialFriends(data);
      }
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
/**
 * 上传在线状态 这里是由Whatsapp的监听通知到后台状态 在线离线
 */
function counterListener() {
  helloworld.data.counter = true;
  helloworld.data.counterState = true;
  sendHeartbeat();
  window.Store.Msg.on('add', (msg) => {
    if (msg.isNewMsg) {
      uploadNewFriends(msg).then();
    }
  });
  clearInterval(whatsappTime);
  whatsappTime = setInterval(sendHeartbeat, 6000 * 10);
}
/**
 * 发送心跳校验工单
 */
function sendHeartbeat() {
  console.info('发送心跳');
  //发送心跳检测工单
  window.helloworld.sendHeartbeat({
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
  });
  let state = window.Store.AppState.state;
  if (state && (state === 'OPENING' || state === 'PAIRING')) {
    uploadOnlineState('离线');
  } else {
    uploadOnlineState('在线');
  }
}
/**
 * 发送在线状态
 * @param status
 */
function uploadOnlineState(status) {
  console.info('发送在线状态', status);
  //上传在线状态
  window.helloworld.uploadOnlineState({
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
    status: status,
  });
}
/**
 * 上传新粉数据
 * @param msg
 * @returns {Promise<void>}
 */
async function uploadNewFriends(msg) {
  if (!msg.isNewMsg) return;
  if (msg.id.fromMe) return;
  if (msg.from.server !== 'c.us') return;
  console.info('检测到有私人新消息', msg);
  const chatWid = window.Store.WidFactory.createWid(msg.from);
  const chatContact = await window.Store.Contact.find(chatWid);
  let contact = await getContactModel(chatContact);
  const userDetail = {
    lineAccount: localStorage.getItem('accountNumber'),
    nickname: localStorage.getItem('nickname'),
  };
  let profile = await getProfilePicUrl(contact.id);
  const fansDetail = [
    {
      lineAccount: contact.userid,
      nickname: contact.name ? contact.name : contact.verifiedName ? contact.verifiedName : contact.pushname ? contact.pushname : contact.phone,
      headImg: profile,
    },
  ];
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const jsonData = {
    serialNumber: helloworld.data.counterNumber,
    wsid: helloworld.data.counterPortID,
    userDetail: userDetail,
    fansDetail: fansDetail,
    time: timestamp,
  };
  console.info('上传新粉数据', jsonData);
  helloworld.uploadNewFriends(jsonData);
}
/**
 * 获取头像链接
 * @param contactId
 * @returns {Promise<undefined|*>}
 */
async function getProfilePicUrl(contactId) {
  try {
    const chatWid = window.Store.WidFactory.createWid(contactId);
    let profile = await window.Store.ProfilePic.requestProfilePicFromServer(chatWid);
    return profile.eurl ? profile.eurl : 'https://sys.helloworlds.cn/static/img/default.3a2c5b6.png';
  } catch (err) {
    if (err) return 'https://sys.helloworlds.cn/static/img/default.3a2c5b6.png';
    throw err;
  }
}

const compareWwebVersions = (lOperand, operator, rOperand) => {
  if (!['>', '>=', '<', '<=', '='].includes(operator)) {
    throw new (class _ extends Error {
      constructor(m) {
        super(m);
        this.name = 'CompareWwebVersionsError';
      }
    })('Invalid comparison operator is provided');
  }
  if (typeof lOperand !== 'string' || typeof rOperand !== 'string') {
    throw new (class _ extends Error {
      constructor(m) {
        super(m);
        this.name = 'CompareWwebVersionsError';
      }
    })('A non-string WWeb version type is provided');
  }

  lOperand = lOperand.replace(/-beta$/, '');
  rOperand = rOperand.replace(/-beta$/, '');

  while (lOperand.length !== rOperand.length) {
    lOperand.length > rOperand.length ? (rOperand = rOperand.concat('0')) : (lOperand = lOperand.concat('0'));
  }

  lOperand = Number(lOperand.replace(/\./g, ''));
  rOperand = Number(rOperand.replace(/\./g, ''));

  return operator === '>'
    ? lOperand > rOperand
    : operator === '>='
      ? lOperand >= rOperand
      : operator === '<'
        ? lOperand < rOperand
        : operator === '<='
          ? lOperand <= rOperand
          : operator === '='
            ? lOperand === rOperand
            : false;
};
/**
 * 同步所有联系人数据到客户端
 * @returns {Promise<void>}
 */
window.syncContacts = async function () {
  let contacts = await getContacts();
  let json = [];
  for (let contact of contacts) {
    json.push({
      id: contact.id._serialized,
      isGroup: contact.isGroup,
      isMe: contact.isMe,
      name: contact.name,
      phone: contact.phone,
      profile: contact.profile,
      link: contact.isGroup ? '请在群组信息中查看邀请链接' : 'https://api.whatsapp.com/send/?phone=' + contact.id.user,
    });
  }
  json = json.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  window.helloworld.syncContacts(json);
};
/**
 * 获取所有联系人
 * @returns {Promise<Awaited<unknown>[]>}
 */
async function getContacts() {
  const contacts = window.Store.Contact.getModelsArray();
  const contactsPromises = contacts
    .filter((contact) => contact.id.user !== '0' && contact.id.server !== 'lid' && contact.id.server !== 'newsletter')
    .map(async (contact) => getContactModel(contact));
  return await Promise.all(contactsPromises);
}
/**
 * 获取群组邀请码
 * @param id
 * @returns {Promise<*|{code: string}>}
 */
async function getInviteCode(id) {
  const chatWid = window.Store.WidFactory.createWid(id);
  try {
    return await window.Store.GroupInvite.queryGroupInviteCode(chatWid, true);
  } catch (err) {
    if (err) return { code: '' };
    throw err;
  }
}
async function getContactModel(contact) {
  let res = contact.serialize();
  res.isBusiness = contact.isBusiness === undefined ? false : contact.isBusiness;

  if (contact.businessProfile) {
    res.businessProfile = contact.businessProfile.serialize();
  }

  // TODO: remove useOldImplementation and its checks once all clients are updated to >= v2.2327.4
  const useOldImplementation = compareWwebVersions(window.Debug.VERSION, '<', '2.2327.4');

  res.isMe = useOldImplementation ? contact.isMe : window.Store.ContactMethods.getIsMe(contact);
  res.isUser = useOldImplementation ? contact.isUser : window.Store.ContactMethods.getIsUser(contact);
  res.isGroup = useOldImplementation ? contact.isGroup : window.Store.ContactMethods.getIsGroup(contact);
  res.isWAContact = useOldImplementation ? contact.isWAContact : window.Store.ContactMethods.getIsWAContact(contact);
  res.isMyContact = useOldImplementation ? contact.isMyContact : window.Store.ContactMethods.getIsMyContact(contact);
  res.isBlocked = contact.isContactBlocked;
  res.userid = useOldImplementation ? contact.userid : window.Store.ContactMethods.getUserid(contact) ? window.Store.ContactMethods.getUserid(contact) : contact.id.user;
  res.isEnterprise = useOldImplementation ? contact.isEnterprise : window.Store.ContactMethods.getIsEnterprise(contact);
  res.verifiedName = useOldImplementation ? contact.verifiedName : window.Store.ContactMethods.getVerifiedName(contact);
  res.verifiedLevel = useOldImplementation ? contact.verifiedLevel : window.Store.ContactMethods.getVerifiedLevel(contact);
  res.statusMute = useOldImplementation ? contact.statusMute : window.Store.ContactMethods.getStatusMute(contact);
  res.name = useOldImplementation
    ? contact.name
    : window.Store.ContactMethods.getName(contact)
      ? window.Store.ContactMethods.getName(contact)
      : window.Store.ContactMethods.getVerifiedName(contact)
        ? window.Store.ContactMethods.getVerifiedName(contact)
        : window.Store.ContactMethods.getPushname(contact)
          ? window.Store.ContactMethods.getPushname(contact)
          : window.Store.NumberInfo.formatPhone(contact.id.user);
  res.shortName = useOldImplementation ? contact.shortName : window.Store.ContactMethods.getShortName(contact);
  res.pushname = useOldImplementation ? contact.pushname : window.Store.ContactMethods.getPushname(contact);
  res.phone = !res.isGroup ? (useOldImplementation ? contact.userid : window.Store.NumberInfo.formatPhone(contact.id.user)) : '';
  return res;
}
const getChatModel = async (chat) => {
  let res = chat.serialize();
  res.isGroup = chat.isGroup;
  res.formattedTitle = chat.formattedTitle;
  res.isMuted = chat.mute && chat.mute.isMuted;
  if (chat.groupMetadata) {
    const chatWid = window.Store.WidFactory.createWid(chat.id._serialized);
    await window.Store.GroupMetadata.update(chatWid);
    res.groupMetadata = chat.groupMetadata.serialize();
  }
  res.chatId = chat.id._serialized;
  res.phone = !res.isGroup ? window.Store.NumberInfo.formatPhone(chat.id.user) : '';
  res.lastMessage = null;
  if (res.msgs && res.msgs.length) {
    const lastMessage = chat.lastReceivedKey ? window.Store.Msg.get(chat.lastReceivedKey._serialized) : null;
    if (lastMessage) {
      res.lastMessage = getMessageModel(lastMessage);
    }
  }
  delete res.msgs;
  delete res.msgUnsyncedButtonReplyMsgs;
  delete res.unsyncedButtonReplies;

  return res;
};
const getMessageModel = (message) => {
  const msg = message.serialize();

  msg.isEphemeral = message.isEphemeral;
  msg.isStatusV3 = message.isStatusV3;
  msg.links = window.Store.Validators.findLinks(message.mediaObject ? message.caption : message.body).map((link) => ({
    link: link.href,
    isSuspicious: Boolean(link.suspiciousCharacters && link.suspiciousCharacters.size),
  }));

  if (msg.buttons) {
    msg.buttons = msg.buttons.serialize();
  }
  if (msg.dynamicReplyButtons) {
    msg.dynamicReplyButtons = JSON.parse(JSON.stringify(msg.dynamicReplyButtons));
  }
  if (msg.replyButtons) {
    msg.replyButtons = JSON.parse(JSON.stringify(msg.replyButtons));
  }

  if (typeof msg.id.remote === 'object') {
    msg.id = Object.assign({}, msg.id, { remote: msg.id.remote._serialized });
  }

  delete msg.pendingAckUpdate;

  return msg;
};
/**
 * WhatsApp Web API
 */
async function initAPI() {
  window.Store = Object.assign({}, window.require('WAWebCollections'));
  window.Store.AppState = window.require('WAWebSocketModel').Socket;
  window.Store.BlockContact = window.require('WAWebBlockContactAction');
  window.Store.Conn = window.require('WAWebConnModel').Conn;
  window.Store.Cmd = window.require('WAWebCmd').Cmd;
  window.Store.DownloadManager = window.require('WAWebDownloadManager').downloadManager;
  window.Store.GroupQueryAndUpdate = window.require('WAWebGroupQueryJob').queryAndUpdateGroupMetadataById;
  window.Store.MediaPrep = window.require('WAWebPrepRawMedia');
  window.Store.MediaObject = window.require('WAWebMediaStorage');
  window.Store.MediaTypes = window.require('WAWebMmsMediaTypes');
  window.Store.MediaUpload = window.require('WAWebMediaMmsV4Upload');
  window.Store.MsgKey = window.require('WAWebMsgKey');
  window.Store.NumberInfo = window.require('WAPhoneUtils');
  window.Store.OpaqueData = window.require('WAWebMediaOpaqueData');
  window.Store.QueryProduct = window.require('WAWebBizProductCatalogBridge');
  window.Store.QueryOrder = window.require('WAWebBizOrderBridge');
  window.Store.SendClear = window.require('WAWebChatClearBridge');
  window.Store.SendDelete = window.require('WAWebDeleteChatAction');
  window.Store.SendMessage = window.require('WAWebSendMsgChatAction');
  window.Store.EditMessage = window.require('WAWebSendMessageEditAction');
  window.Store.SendSeen = window.require('WAWebUpdateUnreadChatAction');
  window.Store.User = window.require('WAWebUserPrefsMeUser');
  window.Store.ContactMethods = window.require('WAWebContactGetters');
  window.Store.UploadUtils = window.require('WAWebUploadManager');
  window.Store.UserConstructor = window.require('WAWebWid');
  window.Store.Validators = window.require('WALinkify');
  window.Store.VCard = window.require('WAWebFrontendVcardUtils');
  window.Store.WidFactory = window.require('WAWebWidFactory');
  window.Store.ProfilePic = window.require('WAWebContactProfilePicThumbBridge');
  window.Store.PresenceUtils = window.require('WAWebPresenceChatAction');
  window.Store.ChatState = window.require('WAWebChatStateBridge');
  window.Store.findCommonGroups = window.require('WAWebFindCommonGroupsContactAction').findCommonGroups;
  window.Store.StatusUtils = window.require('WAWebContactStatusBridge');
  window.Store.ConversationMsgs = window.require('WAWebChatLoadMessages');
  window.Store.sendReactionToMsg = window.require('WAWebSendReactionMsgAction').sendReactionToMsg;
  window.Store.createOrUpdateReactionsModule = window.require('WAWebDBCreateOrUpdateReactions');
  window.Store.EphemeralFields = window.require('WAWebGetEphemeralFieldsMsgActionsUtils');
  window.Store.MsgActionChecks = window.require('WAWebMsgActionCapability');
  window.Store.QuotedMsg = window.require('WAWebQuotedMsgModelUtils');
  window.Store.LinkPreview = window.require('WAWebLinkPreviewChatAction');
  window.Store.Socket = window.require('WADeprecatedSendIq');
  window.Store.SocketWap = window.require('WAWap');
  window.Store.SearchContext = window.require('WAWebChatMessageSearch').getSearchContext;
  window.Store.DrawerManager = window.require('WAWebDrawerManager').DrawerManager;
  window.Store.LidUtils = window.require('WAWebApiContact');
  window.Store.WidToJid = window.require('WAWebWidToJid');
  window.Store.JidToWid = window.require('WAWebJidToWid');
  window.Store.getMsgInfo = window.require('WAWebApiMessageInfoStore').queryMsgInfo;
  window.Store.pinUnpinMsg = window.require('WAWebSendPinMessageAction').sendPinInChatMsg;
  window.Store.QueryExist = window.require('WAWebQueryExistsJob').queryWidExists;
  window.Store.ReplyUtils = window.require('WAWebMsgReply');
  window.Store.Settings = window.require('WAWebUserPrefsGeneral');
  window.Store.BotSecret = window.require('WAWebBotMessageSecret');
  window.Store.BotProfiles = window.require('WAWebBotProfileCollection');

  window.Store.ForwardUtils = {
    ...window.require('WAWebForwardMessagesToChat'),
  };

  window.Store.StickerTools = {
    ...window.require('WAWebImageUtils'),
    ...window.require('WAWebAddWebpMetadata'),
  };
  window.Store.GroupUtils = {
    ...window.require('WAWebGroupCreateJob'),
    ...window.require('WAWebGroupModifyInfoJob'),
    ...window.require('WAWebExitGroupAction'),
    ...window.require('WAWebContactProfilePicThumbBridge'),
  };
  window.Store.GroupParticipants = {
    ...window.require('WAWebModifyParticipantsGroupAction'),
    ...window.require('WASmaxGroupsAddParticipantsRPC'),
  };
  window.Store.GroupInvite = {
    ...window.require('WAWebGroupInviteJob'),
    ...window.require('WAWebGroupQueryJob'),
  };
  window.Store.GroupInviteV4 = {
    ...window.require('WAWebGroupInviteV4Job'),
    ...window.require('WAWebChatSendMessages'),
  };
  window.Store.MembershipRequestUtils = {
    ...window.require('WAWebApiMembershipApprovalRequestStore'),
    ...window.require('WASmaxGroupsMembershipRequestsActionRPC'),
  };

  if (!window.Store.Chat._find || !window.Store.Chat.findImpl) {
    window.Store.Chat._find = (e) => {
      const target = window.Store.Chat.get(e);
      return target
        ? Promise.resolve(target)
        : Promise.resolve({
            id: e,
          });
    };
    window.Store.Chat.findImpl = window.Store.Chat._find;
  }
}

/**
 * 时间戳转换时间格式
 * @param timestamp
 * @returns {string}
 */
function timestampToTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要+1，并且可能需要补0
  const day = ('0' + date.getDate()).slice(-2); // 日期可能需要补0
  const hours = ('0' + date.getHours()).slice(-2); // 小时可能需要补0
  const minutes = ('0' + date.getMinutes()).slice(-2); // 分钟可能需要补0
  const seconds = ('0' + date.getSeconds()).slice(-2); // 秒可能需要补0

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/**
 * 打开指定联系人对话窗口
 * @param id
 * @returns {Promise<void>}
 */
window.openChatWindow = async function (id) {
  const chatWid = window.Store.WidFactory.createWid(id);
  const chat = window.Store.Chat.get(chatWid) || (await window.Store.Chat.find(chatWid));
  await window.Store.Cmd.openChatBottom(chat);
  setTimeout(() => {
    let input = document.querySelector('div[class="x1hx0egp x6ikm8r x1odjw0f x1k6rcq7 x6prxxf"]');
    input.focus();
  }, 1000);
};
/**
 * 导出指定联系人聊天数据
 * @param id
 * @returns {Promise<*[]>}
 */
window.exportChatMsgs = async function (id) {
  let chat = await window.Store.Chat.get(id);
  if (chat) {
    let msgs = chat.msgs.getModelsArray();
    let loadMsgs = await window.Store.ConversationMsgs.loadEarlierMsgs(chat);
    let msgsJSON = [];
    let loadMsgJSON = [];
    if (msgs && msgs.length > 0) {
      for (let msg of msgs) {
        let msgTime = timestampToTime(msg.t);
        const from_contact = await window.Store.Contact.find(msg.from);
        const to_contact = await window.Store.Contact.find(msg.to);
        let from = await getContactModel(from_contact);
        let to = await getContactModel(to_contact);
        let type = '';
        let text = '';
        if (msg.type === 'chat') {
          type = '文本消息';
          text = msg.body;
        } else if (msg.type === 'video') {
          type = '视频消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'image') {
          type = '图片消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'sticker') {
          type = '贴纸消息';
        } else if (msg.type === 'multi_vcard') {
          type = '名片消息';
          text = '名片名称:' + msg.vcardFormattedName;
        } else if (msg.type === 'vcard') {
          type = '名片消息';
          text = '名片名称:' + msg.vcardFormattedName;
        } else if (msg.type === 'poll_creation') {
          type = '投票消息';
          text = '投票名称:' + msg.pollName + '投票内容:' + JSON.stringify(msg.pollOptions);
        } else if (msg.type === 'location') {
          type = '位置消息';
          text = '经度:' + msg.lat + '纬度:' + msg.lng;
        } else if (msg.type === 'document') {
          type = '文件消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'ptt') {
          type = '语音消息';
        } else if (msg.type === 'revoked') {
          type = '撤销的消息';
        } else {
          type = '未知消息';
        }
        msgsJSON.push({
          id: msg.id.id,
          from: from.name,
          fromPhone: from.phone,
          to: to.name,
          toPhone: to.phone,
          type: type,
          message: text ? text : '无消息文本',
          time: msgTime,
        });
      }
    }
    if (loadMsgs && loadMsgs.length > 0) {
      for (let msg of loadMsgs) {
        let msgTime = timestampToTime(msg.t);
        const from_contact = await window.Store.Contact.find(msg.from);
        const to_contact = await window.Store.Contact.find(msg.to);
        let from = await getContactModel(from_contact);
        let to = await getContactModel(to_contact);
        let type = '';
        let text = '';
        if (msg.type === 'chat') {
          type = '文本消息';
          text = msg.body;
        } else if (msg.type === 'video') {
          type = '视频消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'image') {
          type = '图片消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'sticker') {
          type = '贴纸消息';
        } else if (msg.type === 'multi_vcard') {
          type = '名片消息';
          text = '名片名称:' + msg.vcardFormattedName;
        } else if (msg.type === 'vcard') {
          type = '名片消息';
          text = '名片名称:' + msg.vcardFormattedName;
        } else if (msg.type === 'poll_creation') {
          type = '投票消息';
          text = '投票名称:' + msg.pollName + '投票内容:' + JSON.stringify(msg.pollOptions);
        } else if (msg.type === 'location') {
          type = '位置消息';
          text = '经度:' + msg.lat + '纬度:' + msg.lng;
        } else if (msg.type === 'document') {
          type = '文件消息';
          text = msg.caption ? msg.caption : '';
        } else if (msg.type === 'ptt') {
          type = '语音消息';
        } else if (msg.type === 'revoked') {
          type = '撤销的消息';
        } else {
          type = '未知消息';
        }
        loadMsgJSON.push({
          id: msg.id.id,
          from: from.name,
          fromPhone: from.phone,
          to: to.name,
          toPhone: to.phone,
          type: type,
          message: text,
          time: msgTime,
        });
      }
    }
    let msgConcat = msgsJSON.concat(loadMsgJSON);
    let json = msgConcat.filter(function (item, index, self) {
      return (
        self.findIndex(function (t) {
          return t.id === item.id;
        }) === index
      );
    });
    json = json.sort((a, b) => a.time - b.time);
    return json;
  } else {
    return [];
  }
};
window.ipcRenderer.on('sendMessageFn', async function (event, data) {
  console.info('sendMessageFn', JSON.parse(data));
  let message = await window.sendMessageFn(data);
});
/**
 * 向指定联系人发送消息
 * @returns {Promise<Message>} 刚刚发送的消息
 */
window.sendMessageFn = async function (data) {
  let msgData = JSON.parse(data);
  let chatId = msgData.chatId;
  let content = msgData.content;
  let options = msgData.options;
  let internalOptions = {
    sendAudioAsVoice: options.sendAudioAsVoice,
    sendVideoAsGif: options.sendVideoAsGif,
    sendMediaAsSticker: options.sendMediaAsSticker,
    sendMediaAsDocument: options.sendMediaAsDocument,
  };
  if (content instanceof Object) {
    internalOptions.attachment = content;
    internalOptions.caption = options.caption;
    content = '';
  }
  if (internalOptions.sendMediaAsSticker && internalOptions.attachment) {
    internalOptions.attachment = await formatToWebpSticker(internalOptions.attachment, {
      name: options.stickerName,
      author: options.stickerAuthor,
      categories: options.stickerCategories,
    });
  }
  const chatWid = window.Store.WidFactory.createWid(chatId);
  const chat = await window.Store.Chat.find(chatWid);

  const msg = await sendMessage(chat, content, internalOptions);

  return getMessageModel(msg);
};

async function sendMessage(chat, content, options) {
  let attOptions = {};
  if (options.attachment) {
    attOptions = options.sendMediaAsSticker
      ? await processStickerData(options.attachment)
      : await processMediaData(options.attachment, {
          forceVoice: options.sendAudioAsVoice,
          forceDocument: options.sendMediaAsDocument,
          forceGif: options.sendVideoAsGif,
        });

    attOptions.caption = options.caption;
    content = options.sendMediaAsSticker ? undefined : attOptions.preview;
    attOptions.isViewOnce = options.isViewOnce;

    delete options.attachment;
    delete options.sendMediaAsSticker;
  }
  let quotedMsgOptions = {};
  if (options.quotedMessageId) {
    let quotedMessage = window.Store.Msg.get(options.quotedMessageId);

    // TODO remove .canReply() once all clients are updated to >= v2.2241.6
    const canReply = window.Store.ReplyUtils ? window.Store.ReplyUtils.canReplyMsg(quotedMessage.unsafe()) : quotedMessage.canReply();

    if (canReply) {
      quotedMsgOptions = quotedMessage.msgContextInfo(chat);
    }
    delete options.quotedMessageId;
  }
  if (options.mentionedJidList) {
    options.mentionedJidList = await Promise.all(
      options.mentionedJidList.map(async (id) => {
        const wid = window.Store.WidFactory.createWid(id);
        if (await window.Store.QueryExist(wid)) {
          return wid;
        }
      })
    );
    options.mentionedJidList = options.mentionedJidList.filter(Boolean);
  }
  if (options.groupMentions) {
    options.groupMentions = options.groupMentions.map((e) => ({
      groupSubject: e.subject,
      groupJid: window.Store.WidFactory.createWid(e.id),
    }));
  }
  let locationOptions = {};
  if (options.location) {
    let { latitude, longitude, description, url } = options.location;
    url = window.Store.Validators.findLink(url)?.href;
    url && !description && (description = url);
    locationOptions = {
      type: 'location',
      loc: description,
      lat: latitude,
      lng: longitude,
      clientUrl: url,
    };
    delete options.location;
  }
  let _pollOptions = {};
  if (options.poll) {
    const { pollName, pollOptions } = options.poll;
    const { allowMultipleAnswers, messageSecret } = options.poll.options;
    _pollOptions = {
      type: 'poll_creation',
      pollName: pollName,
      pollOptions: pollOptions,
      pollSelectableOptionsCount: allowMultipleAnswers ? 0 : 1,
      messageSecret: Array.isArray(messageSecret) && messageSecret.length === 32 ? new Uint8Array(messageSecret) : window.crypto.getRandomValues(new Uint8Array(32)),
    };
    delete options.poll;
  }
  let vcardOptions = {};
  if (options.contactCard) {
    let contact = window.Store.Contact.get(options.contactCard);
    vcardOptions = {
      body: window.Store.VCard.vcardFromContactModel(contact).vcard,
      type: 'vcard',
      vcardFormattedName: contact.formattedName,
    };
    delete options.contactCard;
  } else if (options.contactCardList) {
    let contacts = options.contactCardList.map((c) => window.Store.Contact.get(c));
    let vcards = contacts.map((c) => window.Store.VCard.vcardFromContactModel(c));
    vcardOptions = {
      type: 'multi_vcard',
      vcardList: vcards,
      body: undefined,
    };
    delete options.contactCardList;
  } else if (options.parseVCards && typeof content === 'string' && content.startsWith('BEGIN:VCARD')) {
    delete options.parseVCards;
    try {
      const parsed = window.Store.VCard.parseVcard(content);
      if (parsed) {
        vcardOptions = {
          type: 'vcard',
          vcardFormattedName: window.Store.VCard.vcardGetNameFromParsed(parsed),
        };
      }
    } catch (_) {
      // not a vcard
    }
  }
  if (options.linkPreview) {
    delete options.linkPreview;
    const link = window.Store.Validators.findLink(content);
    if (link) {
      let preview = await window.Store.LinkPreview.getLinkPreview(link);
      if (preview && preview.data) {
        preview = preview.data;
        preview.preview = true;
        preview.subtype = 'url';
        options = { ...options, ...preview };
      }
    }
  }
  let buttonOptions = {};
  if (options.buttons) {
    let caption;
    if (options.buttons.type === 'chat') {
      content = options.buttons.body;
      caption = content;
    } else {
      caption = options.caption ? options.caption : ' '; //Caption can't be empty
    }
    buttonOptions = {
      productHeaderImageRejected: false,
      isFromTemplate: false,
      isDynamicReplyButtonsMsg: true,
      title: options.buttons.title ? options.buttons.title : undefined,
      footer: options.buttons.footer ? options.buttons.footer : undefined,
      dynamicReplyButtons: options.buttons.buttons,
      replyButtons: options.buttons.buttons,
      caption: caption,
    };
    delete options.buttons;
  }
  let listOptions = {};
  if (options.list) {
    if (window.Store.Conn.platform === 'smba' || window.Store.Conn.platform === 'smbi') {
      throw "[LT01] Whatsapp business can't send this yet";
    }
    listOptions = {
      type: 'list',
      footer: options.list.footer,
      list: {
        ...options.list,
        listType: 1,
      },
      body: options.list.description,
    };
    delete options.list;
    delete listOptions.list.footer;
  }
  const botOptions = {};
  if (options.invokedBotWid) {
    botOptions.messageSecret = window.crypto.getRandomValues(new Uint8Array(32));
    botOptions.botMessageSecret = await window.Store.BotSecret.genBotMsgSecretFromMsgSecret(botOptions.messageSecret);
    botOptions.invokedBotWid = window.Store.WidFactory.createWid(options.invokedBotWid);
    botOptions.botPersonaId = window.Store.BotProfiles.BotProfileCollection.get(options.invokedBotWid).personaId;
    delete options.invokedBotWid;
  }

  const meUser = window.Store.User.getMaybeMeUser();
  const newId = await window.Store.MsgKey.newId();

  const newMsgId = new window.Store.MsgKey({
    from: meUser,
    to: chat.id,
    id: newId,
    participant: chat.id.isGroup() ? meUser : undefined,
    selfDir: 'out',
  });

  const extraOptions = options.extraOptions || {};
  delete options.extraOptions;

  const ephemeralFields = window.Store.EphemeralFields.getEphemeralFields(chat);

  const message = {
    ...options,
    id: newMsgId,
    ack: 0,
    body: content,
    from: meUser,
    to: chat.id,
    local: true,
    self: 'out',
    t: parseInt(new Date().getTime() / 1000),
    isNewMsg: true,
    type: 'chat',
    ...ephemeralFields,
    ...locationOptions,
    ..._pollOptions,
    ...attOptions,
    ...(attOptions.toJSON ? attOptions.toJSON() : {}),
    ...quotedMsgOptions,
    ...vcardOptions,
    ...buttonOptions,
    ...listOptions,
    ...botOptions,
    ...extraOptions,
  };

  // Bot's won't reply if canonicalUrl is set (linking)
  if (botOptions) {
    delete message.canonicalUrl;
  }

  await window.Store.SendMessage.addAndSendMsgToChat(chat, message);
  return window.Store.Msg.get(newMsgId._serialized);
}

async function formatToWebpSticker(media, metadata) {
  let webpMedia;

  if (media.mimetype.includes('image')) webpMedia = await formatImageToWebpSticker(media);
  else throw new Error('Invalid media format');

  if (metadata.name || metadata.author) {
    const img = new webp.Image();
    const hash = generateHash(32);
    const stickerPackId = hash;
    const packname = metadata.name;
    const author = metadata.author;
    const categories = metadata.categories || [''];
    const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, emojis: categories };
    let exifAttr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
    let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
    let exif = Buffer.concat([exifAttr, jsonBuffer]);
    exif.writeUIntLE(jsonBuffer.length, 14, 4);
    await img.load(Buffer.from(webpMedia.data, 'base64'));
    img.exif = exif;
    webpMedia.data = (await img.save(null)).toString('base64');
  }
  return webpMedia;
}

async function formatImageToWebpSticker(media) {
  if (!media.mimetype.includes('image')) throw new Error('media is not a image');

  if (media.mimetype.includes('webp')) {
    return media;
  }
  return toStickerData(media);
}

async function toStickerData(mediaInfo) {
  if (mediaInfo.mimetype === 'image/webp') return mediaInfo;

  const file = mediaInfoToFile(mediaInfo);
  const webpSticker = await window.Store.StickerTools.toWebpSticker(file);
  const webpBuffer = await webpSticker.arrayBuffer();
  const data = arrayBufferToBase64(webpBuffer);

  return {
    mimetype: 'image/webp',
    data,
  };
}

function arrayBufferToBase64(arrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

async function processStickerData(mediaInfo) {
  if (mediaInfo.mimetype !== 'image/webp') throw new Error('Invalid media type');
  const file = mediaInfoToFile(mediaInfo);
  let filehash = await getFileHash(file);
  let mediaKey = await generateHash(32);

  const controller = new AbortController();
  const uploadedInfo = await window.Store.UploadUtils.encryptAndUpload({
    blob: file,
    type: 'sticker',
    signal: controller.signal,
    mediaKey,
  });

  return {
    ...uploadedInfo,
    clientUrl: uploadedInfo.url,
    deprecatedMms3Url: uploadedInfo.url,
    uploadhash: uploadedInfo.encFilehash,
    size: file.size,
    type: 'sticker',
    filehash,
  };
}

async function processMediaData(mediaInfo, { forceVoice, forceDocument, forceGif }) {
  const file = mediaInfoToFile(mediaInfo);
  const mData = await window.Store.OpaqueData.createFromData(file, file.type);
  const mediaPrep = window.Store.MediaPrep.prepRawMedia(mData, { asDocument: forceDocument });
  const mediaData = await mediaPrep.waitForPrep();
  const mediaObject = window.Store.MediaObject.getOrCreateMediaObject(mediaData.filehash);

  const mediaType = window.Store.MediaTypes.msgToMediaType({
    type: mediaData.type,
    isGif: mediaData.isGif,
  });

  if (forceVoice && mediaData.type === 'audio') {
    mediaData.type = 'ptt';
    const waveform = mediaObject.contentInfo.waveform;
    mediaData.waveform = waveform ?? (await generateWaveform(file));
  }

  if (forceGif && mediaData.type === 'video') {
    mediaData.isGif = true;
  }

  if (forceDocument) {
    mediaData.type = 'document';
  }

  if (!(mediaData.mediaBlob instanceof window.Store.OpaqueData)) {
    mediaData.mediaBlob = await window.Store.OpaqueData.createFromData(mediaData.mediaBlob, mediaData.mediaBlob.type);
  }

  mediaData.renderableUrl = mediaData.mediaBlob.url();
  mediaObject.consolidate(mediaData.toJSON());
  mediaData.mediaBlob.autorelease();

  const uploadedMedia = await window.Store.MediaUpload.uploadMedia({
    mimetype: mediaData.mimetype,
    mediaObject,
    mediaType,
  });

  const mediaEntry = uploadedMedia.mediaEntry;
  if (!mediaEntry) {
    throw new Error('upload failed: media entry was not created');
  }

  mediaData.set({
    clientUrl: mediaEntry.mmsUrl,
    deprecatedMms3Url: mediaEntry.deprecatedMms3Url,
    directPath: mediaEntry.directPath,
    mediaKey: mediaEntry.mediaKey,
    mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp,
    filehash: mediaObject.filehash,
    encFilehash: mediaEntry.encFilehash,
    uploadhash: mediaEntry.uploadHash,
    size: mediaObject.size,
    streamingSidecar: mediaEntry.sidecar,
    firstFrameSidecar: mediaEntry.firstFrameSidecar,
  });

  return mediaData;
}

function mediaInfoToFile({ data, mimetype, filename }) {
  const binaryData = window.atob(data);

  const buffer = new ArrayBuffer(binaryData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaryData.length; i++) {
    view[i] = binaryData.charCodeAt(i);
  }

  const blob = new Blob([buffer], { type: mimetype });
  return new File([blob], filename, {
    type: mimetype,
    lastModified: Date.now(),
  });
}

async function getFileHash(data) {
  let buffer = await data.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

async function generateHash(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function generateWaveform(audioFile) {
  try {
    const audioData = await audioFile.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(audioData);

    const rawData = audioBuffer.getChannelData(0);
    const samples = 64;
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]);
      }
      filteredData.push(sum / blockSize);
    }

    const multiplier = Math.pow(Math.max(...filteredData), -1);
    const normalizedData = filteredData.map((n) => n * multiplier);

    const waveform = new Uint8Array(normalizedData.map((n) => Math.floor(100 * n)));

    return waveform;
  } catch (e) {
    return undefined;
  }
}
0;
