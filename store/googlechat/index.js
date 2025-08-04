window.addEventListener(
  'message',
  function (e) {
    // 检查来源是否为 mail.google.com（父页面）
    if (e.origin !== 'https://chat.google.com') return;
    if (e.data === 'request-data') {
      window.helloworld.chatWindow = e.source;
      // 发送 helloworld 数据到父页面
      sendHelloworldDataToParent();
    }
  },
  false
);
// 发送 helloworld 数据到父页面
function sendHelloworldDataToParent() {
  try {
    window.helloworld.chatWindow.postMessage(
      JSON.stringify({
        type: 'helloworld',
        helloworld: window.helloworld?.data || {},
      }),
      'https://chat.google.com'
    );
  } catch (e) {
    console.error('发送 helloworld 数据失败:', e);
  }
}
// 当数据更新时调用
window.updateGlobalTranslationParam = async (data) => {
  try {
    window.helloworld.data = data;
    // 推送更新到父页面
    sendHelloworldDataToParent();
  } catch (e) {
    console.error(e);
  }
};
const updateBadge = () => {
  let a = document.querySelectorAll('a[target="_blank"]');
  a.forEach((link) => {
    link.removeAttribute('target');
  });
};
window.setInterval(updateBadge, 3000);
0;
