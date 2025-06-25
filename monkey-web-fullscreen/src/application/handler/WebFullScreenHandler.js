import Site from "../common/Site";
import Tools from "../common/Tools";
import Keyboard from "../common/Keyboard";
/**
 * 网页全屏逻辑处理
 */
export default {
  universalWebFullscreen(video) {
    // 通用网页全屏，针对不在`@match`中的网站
    if (!this.topInfo || video.hasWebFull || Site.isMatch() || !this.isEnbleThisWebSiteAuto()) return;
    if (video.offsetWidth === this.topInfo.innerWidth) return (video.hasWebFull = true);
    Tools.postMessage(window.top, { key: Keyboard.P });
    video.hasWebFull = true;
  },
  specificWebFullscreen(video) {
    // 特定网页全屏，只针对在`@match`中的网站，通过点击图标来网页全屏
    if (!video?.offsetWidth || !this.webFullElement) return false;
    if (this.isDisableAuto() || video?.offsetWidth >= innerWidth) return true;
    return Site.isBiliLive() ? this.liveWebFullScreen() : Tools.triggerClick(this.webFullElement);
  },
  liveWebFullScreen() {
    unsafeWindow.top.scrollTo({ top: 70 });
    const icons = this.getBiliLiveIcons();
    const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
    if (el) unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top ?? 0 });

    if (!Tools.hasCls(document.body, "hide-asida-area")) {
      unsafeWindow.top?.livePlayer?.volume(100); // 声音100%
      unsafeWindow.top?.livePlayer?.switchQuality("10000"); // 原画画质
      localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
      Tools.addCls(document.body, "hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
    }

    return Tools.triggerClick(icons?.[1]);
  },
  exitWebFullScreen() {
    if (!Site.isBili() && !Site.isAcFun()) return;
    if (this.player.offsetWidth === innerWidth) this.webFullElement?.click();
    // B站视频合集播放的是合集最后一个或关闭了合集自动连播，点击“取消连播”按钮
    const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
    if (!Tools.query(".video-pod") || isLast) return Tools.query(".bpx-player-ending-related-item-cancel")?.click();
  },
  getBiliLiveIcons() {
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    Tools.triggerMousemove(this.getVideo());
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
};
