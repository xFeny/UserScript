import Site from "../common/Site";
import Tools from "../common/Tools";
import Clock from "../common/lib/Clock";
import Storage from "../common/Storage";

/**
 * 视频一些额外处理
 */
export default {
  setupLoadEventListener() {
    const handle = ({ type }) => this.executeCodeSnippet(Storage.LOAD_EVT_CODE.get(this.host), type, this.player);
    document.addEventListener("DOMContentLoaded", handle);
    window.addEventListener("load", handle);
  },
  shouldHideTime: () => !App.isFullscreen && !Storage.PAGE_CLOCK.get(),
  setupClockForPlayer() {
    if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
    if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(this.player.parentNode).start();

    this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
  },
  // ====================⇓⇓⇓ 进度显示相关逻辑 ⇓⇓⇓====================
  getRealDuration(video) {
    if (!Site.isQiyi()) return video.duration;
    return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
  },
  renderProgress(video) {
    if (!video || this.player !== video) return;

    const duration = this.getRealDuration(video);
    if (duration <= 30 || duration > 864e2 || this.isLive() || this.shouldHideTime()) return this.timeEle?.remove();

    const percent = Tools.toFixed((video.currentTime / duration) * 100, 1);
    const remain = this.formatTime(duration - video.currentTime);

    const el = this.createProgressElement(); // 创建相关元素
    el.firstChild.textContent = `${remain} / ${percent}`;
    this.prependElement(el);
  },
  createProgressElement() {
    if (this.timeEle) return this.timeEle;

    // 创建播放进度元素
    this.timeEle = this.createDisplayElement("__timeupdate", Storage.CLOCK_COLOR.get());
    this.timeEle.append("00:00", Tools.newEle("b", { textContent: "%" }));
    return this.timeEle;
  },
  // ====================⇑⇑⇑ 进度显示相关逻辑 ⇑⇑⇑====================

  // ====================⇓⇓⇓ 常显倍速相关逻辑 ⇓⇓⇓====================
  playbackRateDisplay() {
    if (!this.player || this.isLive()) return;
    if (!Storage.RATE_KEEP_SHOW.get()) return this.rateDisplay?.remove();

    this.rateDisplay ??= this.createDisplayElement("__rateDisplay");
    this.rateDisplay.textContent = `倍速: ${this.player.playbackRate}`;
    this.prependElement(this.rateDisplay);
  },
  ensureRateDisplay: () => !Tools.isAttached(App.rateDisplay) && App.playbackRateDisplay(),
  // ====================⇑⇑⇑ 常显倍速相关逻辑 ⇑⇑⇑====================

  createDisplayElement(cls, color) {
    const el = Tools.newEle("div", { className: cls, style: `color: ${color}` });
    this.prependElement(el);
    return el;
  },
  prependElement(el) {
    const container = this.player?.parentNode;
    if (el && !container?.contains(el)) container?.prepend(el);
  },
  changeTimeDisplay: () => (App.setupClockForPlayer(), App.renderProgress(App.player)),
  setTimeColor: (color) => Tools.setStyle([App.progNode, App.Clock?.element], "color", color),
};
