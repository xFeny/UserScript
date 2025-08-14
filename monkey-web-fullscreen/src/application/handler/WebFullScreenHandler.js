import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import SiteIcons from "../common/SiteIcons";
import URLBlacklist from "../common/URLBlacklist";

/**
 * 网页全屏逻辑处理
 */
export default {
  autoNextEpisode(video) {
    if (video.hasTriedAutoNext) return;
    if (!Storage.ENABLE_AUTO_NEXT_EPISODE.get()) return;
    if (Tools.isFrequent("autoNext", Consts.THREE_SEC, true)) return;
    if (this.getRemainingTime(video) > Storage.AUTO_NEXT_ADVANCE_SEC.get()) return; // 距离结束还剩多少秒切换下集
    if (this.isBlocked(Storage.NEXT_EPISODE_IGNORE_SITE.get())) return (video.hasTriedAutoNext = true);

    Tools.postMessage(window.top, { key: "N" });
    video.hasTriedAutoNext = true;
  },
  autoWebFullscreen(video) {
    if (this.player !== video) return;
    if (Tools.isFrequent("autoWebFull", Consts.ONE_SEC, true)) return;
    if (video.hasWebFull || !this.topWin || !video.offsetWidth) return;
    if ((Site.isMatched() && this.isDisableAuto()) || (!Site.isMatched() && !this.isEnableSiteAuto())) return;
    if (this.isBlocked(Storage.AUTO_WEB_IGNORE_SITE.get())) return (video.hasWebFull = true);
    if (Tools.isOverLimit("autoWebFull")) return (video.hasWebFull = true);

    // 视频元素宽高 >= 浏览器视窗宽高，认为已网页全屏
    const { offsetWidth, offsetHeight } = video;
    const { viewWidth, viewHeight } = this.topWin;
    if (offsetWidth >= viewWidth || offsetHeight >= viewHeight) return (video.hasWebFull = true);

    // 发送网页全屏消息
    Tools.postMessage(window.top, { key: "P" });
  },
  liveWebFullscreen() {
    unsafeWindow.top.scrollTo({ top: 70 });
    const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
    if (el) unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top });

    if (!Tools.hasCls(document.body, "hide-asida-area")) {
      unsafeWindow.top?.livePlayer?.volume(100); // 声音100%
      unsafeWindow.top?.livePlayer?.switchQuality("10000"); // 原画画质
      localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
      Tools.addCls(document.body, "hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
    }

    const icons = this.getBiliLiveIcons();
    return Tools.triggerClick(icons?.[1]);
  },
  autoExitWebFullscreen() {
    if (!Site.isBili() && !Site.isAcFun()) return;
    if (this.player.offsetWidth === innerWidth) this.triggerIconElement(SiteIcons.name.webFull);

    // 取消连播触发条件：
    // - B站普通视频（非番剧）播放结束时
    // - B站合集视频播放至最后一集时
    // - B站合集中关闭「自动连播」选项时
    requestAnimationFrame(() => {
      const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (!Tools.query(".video-pod") || isLast) Tools.query(".bpx-player-ending-related-item-cancel")?.click();
    });
  },
  getBiliLiveIcons() {
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    Tools.triggerMousemove(this.getVideo());
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
  isBlocked(ignoreStr) {
    if (!ignoreStr || !this.topWin) return false;
    const urlFilter = new URLBlacklist(this.splitUrls(ignoreStr));
    return urlFilter.isBlocked(this.topWin.url);
  },
};
