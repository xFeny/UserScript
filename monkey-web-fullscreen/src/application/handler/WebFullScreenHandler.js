import Tools from "../common/Tools";
import webSite from "../common/WebSite";
/**
 * 网页全屏逻辑处理
 */
export default {
  webFullScreen(video) {
    const w = video?.offsetWidth || 0;
    if (Object.is(0, w)) return false;
    if (this.isClosedAuto()) return true;
    if (w >= window.innerWidth) return true;
    if (!webSite.isBiliLive()) return Tools.triggerClick(this.element);
    return this.biliLiveWebFullScreen();
  },
  biliLiveWebFullScreen() {
    const control = this.getBiliLiveIcons();
    if (control.length === 0) return false;
    Tools.scrollTop(70);
    const el = Tools.query(":is(.lite-room, #player-ctnr)", unsafeWindow.top.document);
    if (el) Tools.scrollTop(Tools.getElementRect(el)?.top || 0);
    return Tools.triggerClick(control[1]);
  },
  exitWebFullScreen() {
    if (window.innerWidth === this.video.offsetWidth) this.getElement()?.click();
    const cancelButton = Tools.query(".bpx-player-ending-related-item-cancel"); // B站“取消连播”按钮
    if (cancelButton) setTimeout(() => cancelButton.click(), 100);
  },
  biliLiveExtras() {
    unsafeWindow.top?.livePlayer?.volume(100); // 声音100%
    unsafeWindow.top?.livePlayer?.switchQuality("10000"); // 原画画质
    localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0); // 关闭全屏礼物栏
    document.body.classList.add("hide-asida-area", "hide-aside-area"); // 关闭侧边聊天栏
  },
  getBiliLiveIcons() {
    const video = this.getVideo();
    if (!video) return [];
    Tools.triggerMousemove(video);
    // 图标从右到左：全屏、网页全屏、弹幕设置、弹幕开关、小窗模式，即下标[0]是全屏图标
    return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
  },
  experimentWebFullScreen(video) {
    if (webSite.inMatches() || video.isWebFullScreen || !this.topWinInfo || this.isClosedOtherWebsiteAuto()) return;
    if (video.offsetWidth === this.topWinInfo.innerWidth) return (video.isWebFullScreen = true);
    window.top.focus();
    video.isWebFullScreen = true;
    Tools.postMessage(window.top, { key: "P" });
  },
};
