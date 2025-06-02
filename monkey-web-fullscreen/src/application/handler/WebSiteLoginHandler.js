import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import Constants from "../common/Constants";
/**
 * 未登录状态下，自动关闭网站的登录弹窗
 */
export default {
  handleLoginPopups() {
    this.handleIqyLogin();
    this.handleBiliLogin();
    this.handleTencentLogin();
  },
  handleTencentLogin: () => webSite.isTencent() && Tools.query("#login_win")?.remove(),
  handleIqyLogin: () => webSite.isIqiyi() && Tools.query("#qy_pca_login_root")?.remove(),
  handleBiliLogin() {
    if (!webSite.isBili()) return;
    if (document.cookie.includes("DedeUserID")) return unsafeWindow.player?.requestQuality(80); // 清晰度设置为 1080P
    // 自动关闭B站未登录观看视频1分钟左右的登录弹窗
    setTimeout(() => {
      unsafeWindow.__BiliUser__.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    }, Constants.ONE_SEC * 3);
  },
};
