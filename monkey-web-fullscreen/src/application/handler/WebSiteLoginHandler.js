import Tools from "../common/Tools";
import constants from "../common/Constants";
/**
 * 未登录状态下，自动关闭网站的登录弹窗
 */
export default {
  webSiteLoginObserver() {
    this.handleIqyLogin();
    this.handleBiliLogin();
    this.handleTencentLogin();
  },
  loginObserver(target, matches, clickTarget) {
    return Tools.createObserver(target, (mutations, observer) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length === 0) return;
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          if (!node.matches(matches)) return;
          Tools.query(clickTarget)?.click();
          observer.disconnect();
        });
      });
    });
  },
  handleTencentLogin() {
    if (!this.isTencent()) return;
    // 自动关闭腾讯视频登录弹窗
    const selector = ".main-login-wnd-module_close-button__mt9WU";
    this.loginObserver("#login_win", selector, selector);
  },
  handleIqyLogin() {
    if (!this.isIqiyi()) return;
    // 自动关闭爱奇艺视频登录弹窗
    const selector = ".simple-buttons_close_btn__6N7HD";
    this.loginObserver("#qy_pca_login_root", selector, selector);
    // 自动点击跳过广告
    Tools.createObserver(".cd-time", () => {
      const selector = ":is(*[id*='mask-layer'], #modal-vip-cashier-scope)";
      Tools.querys(selector).forEach((el) => el.remove());
      Tools.query(".simple-buttons_close_btn__6N7HD")?.click();
      const adTime = Tools.query(".public-time");
      if (adTime.style.display === "none") return;
      if (this.video.currentTime !== this.video.duration) return;
      Tools.querys("*:not(.public-vip)", adTime).forEach((el) => el.click());
    });
  },
  handleBiliLogin() {
    if (!this.isBili()) return;
    if (document.cookie.includes("DedeUserID")) return player?.requestQuality(80); // 清晰度设置为 1080P
    // 自动关闭B站未登录观看视频1分钟左右的登录弹窗
    setTimeout(() => {
      unsafeWindow.__BiliUser__.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    }, constants.ONE_SEC * 3);
  },
};
