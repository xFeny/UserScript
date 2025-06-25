import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
/**
 * 未登录状态下，自动关闭网站的登录弹窗
 */
export default {
  removeLoginPopups() {
    this.removeQiyiLogin(), this.removeBiliLogin(), this.removeTencentLogin();
  },
  removeTencentLogin: () => Site.isTencent() && Tools.query("#login_win")?.remove(),
  removeQiyiLogin: () => Site.isQiyi() && Tools.query("#qy_pca_login_root")?.remove(),
  removeBiliLogin() {
    if (!Site.isBili() || this.BiliTimerID) return;
    if (document.cookie.includes("DedeUserID")) return unsafeWindow.player?.requestQuality(80); // 清晰度设置为 1080P
    // 自动关闭B站未登录观看视频1分钟左右的登录弹窗
    this.BiliTimerID = setInterval(() => {
      if (unsafeWindow.__BiliUser__.cache.data.isLogin) clearInterval(this.BiliTimerID);

      unsafeWindow.__BiliUser__.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    }, Consts.ONE_SEC * 3);
  },
};
