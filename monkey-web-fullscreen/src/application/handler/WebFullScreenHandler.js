import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import Keyboard from "../common/Keyboard";
/**
 * 网页全屏逻辑处理
 */
export default {
  webFullScreen(video) {
    if (!video?.offsetWidth) return false;
    if (this.isDisableAuto() || video?.offsetWidth >= innerWidth) return true;
    if (!webSite.isBiliLive()) return Tools.triggerClick(this.webFullElement);
    return this.biliLiveWebFullScreen();
  },
  biliLiveWebFullScreen() {
    Tools.scrollTop(70);
    const control = this.getBiliLiveIcons();
    const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
    if (el) Tools.scrollTop(Tools.getElementRect(el)?.top ?? 0);
    return Tools.triggerClick(control?.[1]);
  },
  exitWebFullScreen() {
    if (!webSite.isBili() && !webSite.isAcFun()) return;
    if (this.video.offsetWidth === innerWidth) this.webFullElement?.click();
    // B站视频合集播放的是合集最后一个或关闭了合集自动连播，点击“取消连播”按钮
    const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
    if (!Tools.query(".video-pod") || isLast) return Tools.query(".bpx-player-ending-related-item-cancel")?.click();
  },
  biliLiveExtras() {
    if (!webSite.isBiliLive()) return;
    unsafeWindow.top?.livePlayer?.volume(100); // 声音100%
    unsafeWindow.top?.livePlayer?.switchQuality("10000"); // 原画画质
    localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
    document.body.classList.add("hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
  },
  getBiliLiveIcons() {
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    Tools.triggerMousemove(this.getVideo());
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
  experWebFullScreen(video) {
    if (!this.topInfo || webSite.inMatches() || !this.isEnbleThisWebSiteAuto() || video.isWebFullScreen) return;
    if (video.offsetWidth === topInfo.innerWidth) return (video.isWebFullScreen = true);
    Tools.postMessage(window.top, { key: Keyboard.P });
    video.isWebFullScreen = true;
  },
};
