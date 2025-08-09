import Site from "../common/Site";
import Tools from "../common/Tools";
import SiteIcons from "../common/SiteIcons";
/**
 * 网页全屏逻辑处理
 */
export default {
  autoWebFullscreen(video) {
    if (this.player !== video) return;
    if (Site.isMatch() && this.isDisableAuto()) return;
    if (!Site.isMatch() && !this.isEnbleThisWebSiteAuto()) return;
    if (!this.topWin || video.hasWebFull || !video.offsetWidth) return;

    // 视频元素宽高大于等于视窗，表示已网页全屏
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
};
