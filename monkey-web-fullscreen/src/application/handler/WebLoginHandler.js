import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 移除未登录状态下，网站的登录弹窗
 * - 爱奇艺和腾讯视频直接移除登录框元素
 * - B站通过误导的方式，使其不弹窗
 */
export default {
  removeLoginPopups() {
    this.removeBiliLogin(), this.removeTencentLogin();
  },
  removeTencentLogin: () => Site.isTencent() && Tools.query("#login_win")?.remove(),
  removeBiliLogin() {
    if (!Site.isBili() || this.BiliTimerID) return;
    if (document.cookie.includes("DedeUserID")) return;

    // 处理B站未登录观看视频1分钟左右的登录弹窗
    this.BiliTimerID = setInterval(() => {
      if (unsafeWindow.__BiliUser__?.cache?.data?.isLogin) clearInterval(this.BiliTimerID);

      unsafeWindow.__BiliUser__.isLogin = true;
      unsafeWindow.__BiliUser__.MiniLogin = null;
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    }, Consts.THREE_SEC);
  },
};
