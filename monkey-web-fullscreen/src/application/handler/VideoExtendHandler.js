import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Clock from "../common/lib/Clock";
import Storage from "../common/Storage";

/**
 * 视频一些额外处理
 */
export default {
  setupLoadEventListener() {
    window.addEventListener("load", () => {
      // 个别需点击元素才加载视频，如：https://www.dadaqu.cc、https://www.jddzx.cc
      Tools.query("body > #start, #play-button-overlay")?.click?.();
      this.setFakeBiliUser();
    });
  },
  /**
   * 解决：B站未登录观看视频约1分钟弹出登录框问题
   */
  setFakeBiliUser() {
    if (!Site.isBili()) return;
    Tools.sleep(Consts.THREE_SEC * 2).then(() => {
      if (unsafeWindow.__BiliUser__?.isLogin) return;
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    });
  },
  /**
   * B站登录状态下画质设置为 1080P
   */
  setBiliQuality() {
    if (!Site.isBili() || !document.cookie.includes("DedeUserID") || !unsafeWindow.player) return;
    const current = unsafeWindow.player.getQuality().realQ;
    const list = unsafeWindow.player.getSupportedQualityList();
    const target = list.find((quality) => quality === 80) ?? list[0];
    if (current !== target) unsafeWindow.player.requestQuality(target);
  },
  shouldHideTime: () => (App.isFullscreen && Storage.DISABLE_CLOCK.get()) || (!App.isFullscreen && !Storage.PAGE_CLOCK.get()),
  setupPlayerClock() {
    if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
    if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(this.player.parentNode).start();

    this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
  },
  // ====================⇓⇓⇓ 进度显示相关逻辑 ⇓⇓⇓====================
  getRealDur(video) {
    if (!Site.isQiyi()) return video.duration;
    return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
  },
  videoProgress(video) {
    if (!video || this.player !== video || this.isMutedLoop(video)) return;
    if (video.duration <= 30 || this.isLive() || this.shouldHideTime()) return this.removeProgElement();

    const duration = this.getRealDur(video);
    if (duration > 864e2) return this.removeProgElement();

    const percent = Tools.toFixed((video.currentTime / duration) * 100, 1);
    const remain = this.formatTime(duration - video.currentTime);

    const el = this.createProgressElement(); // 创建相关元素
    el.firstChild.textContent = `${remain} / ${percent}`;
    this.prependElement(el);
  },
  createProgressElement() {
    if (this.progNode) return this.progNode;

    // 创建播放进度元素
    const el = this.createDisplayElement("__timeupdate", Storage.CLOCK_COLOR.get());
    el.append(document.createTextNode("00:00"), Tools.createElement("b", { textContent: "%" }));
    this.progNode = el;

    return el;
  },
  removeProgElement: () => App.progNode?.remove(),
  // ====================⇑⇑⇑ 进度显示相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 常显倍速相关逻辑 ⇓⇓⇓====================
  playbackRateDisplay() {
    if (!this.player || this.isLive()) return;
    if (!Storage.RATE_KEEP_SHOW.get()) return this.removeRateDisplay();

    if (!this.rateDisplay) this.rateDisplay = this.createDisplayElement("__rateDisplay");
    this.rateDisplay.textContent = `倍速: ${this.player.playbackRate}`;
    this.prependElement(this.rateDisplay);
  },
  ensureRateDisplay: () => App.prependElement(App.rateDisplay),
  removeRateDisplay: () => App.rateDisplay?.remove(),
  // ====================⇑⇑⇑ 常显倍速相关逻辑 ⇑⇑⇑====================

  createDisplayElement(cls, color) {
    const el = Tools.createElement("div", { className: cls, style: `color: ${color}` });
    this.prependElement(el);
    return el;
  },
  prependElement(el) {
    const container = this.player?.parentNode;
    if (el && !container?.contains(el)) container?.prepend(el);
  },
  changeTimeDisplay: () => (App.setupPlayerClock(), App.videoProgress(App.player)),
  setTimeColor: (color) => Tools.setStyle([App.progNode, App.Clock?.element], "color", color),
};
