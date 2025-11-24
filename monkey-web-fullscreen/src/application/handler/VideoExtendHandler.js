import Site from "../common/Site";
import Tools from "../common/Tools";
import Clock from "../common/Clock";
import Storage from "../common/Storage";

/**
 * 视频一些额外处理
 */
export default {
  setBiliQuality() {
    if (!Site.isBili() || !document.cookie.includes("DedeUserID") || !unsafeWindow.player) return;
    const current = unsafeWindow.player.getQuality().realQ;
    const list = unsafeWindow.player.getSupportedQualityList();
    const target = list.find((quality) => quality === 80) ?? list[0];
    if (current !== target) unsafeWindow.player.requestQuality(target);
  },
  shouldDestroyTimeElement() {
    const isFull = this.isFullscreen;
    return (isFull && Storage.DISABLE_CLOCK.get()) || (!isFull && !Storage.UNFULL_CLOCK.get());
  },
  createClock(state = Clock.state.stop) {
    Promise.resolve().then(() => {
      this.Clock?.destroy(), (this.Clock = null); // 先销毁再创建
      if (!this.player?.parentNode) return;

      // 全屏或非全屏显示时间
      const shouldDestroy = this.shouldDestroyTimeElement();
      this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
      this.Clock[shouldDestroy ? state : Clock.state.start]?.();
      this.toggleSmallerFont(Storage.USE_SMALLER_FONT.get());
    });
  },
  toggleClock() {
    if (this.shouldDestroyTimeElement()) return this.Clock?.stop();

    const state = Clock.state.start;
    this.Clock?.isInDOM() ? this.Clock[state]() : this.createClock(state);
    this.Clock?.setCustomColor(Storage.CLOCK_COLOR.get());
  },

  getRealDuration(video) {
    if (!Site.isQiyi()) return video.duration;
    return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
  },
  videoProgress(video) {
    if (!video || this.isBackgroundVideo(video)) return;
    if (video.duration <= 30 || this.isLive() || this.shouldDestroyTimeElement()) return this.removeVideoProgress();

    if (!this.progressElement) {
      this.progressElement = this.createDisplayElement("__time-progress", Storage.CLOCK_COLOR.get());
      this.progressTextNode = document.createTextNode("00:00");
      const percentElement = document.createElement("b");
      percentElement.textContent = "%";
      this.progressElement?.append(this.progressTextNode, percentElement);
      this.toggleSmallerFont(Storage.USE_SMALLER_FONT.get());
    }

    const duration = this.getRealDuration(video);
    if (duration > 864e2) return this.removeVideoProgress();

    const percent = Tools.toFixed((video.currentTime / duration) * 100, 1);
    const timeLeft = this.formatTime(duration - video.currentTime);
    this.progressTextNode.textContent = `${timeLeft} / ${percent}`;
    this.prependElement(this.progressElement);
  },
  removeVideoProgress() {
    this.progressElement?.remove();
    delete this.progressTextNode;
    delete this.progressElement;
  },
  playbackRateKeepDisplay() {
    if (!this.player || this.isLive()) return;
    if (!Storage.RATE_KEEP_SHOW.get()) return this.removeRateKeepDisplay();

    const e = this.player;
    if (!e.rateKeepElement) e.rateKeepElement = this.createDisplayElement("__rate-keep-show");
    e.rateKeepElement.textContent = `倍速: ${e.playbackRate}`;
    this.prependElement(e.rateKeepElement);
  },
  removeRateKeepDisplay(video) {
    const e = video ?? this.player;
    e.rateKeepElement?.remove();
    delete e.rateKeepElement;
  },
  createDisplayElement(clss, color) {
    if (!this.player) return;
    const element = document.createElement("div");
    if (color) element.style.setProperty("color", color);
    element.classList.add(clss);
    this.prependElement(element);
    return element;
  },
  prependElement(element, target) {
    const container = target ?? this.player?.parentNode;
    if (!container?.contains(element)) container?.prepend(element);
  },
};
