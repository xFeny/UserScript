import Site from "../common/Site";
import Tools from "../common/Tools";
import Clock from "../common/Clock";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频一些额外处理
 */
export default {
  async removeLoginPopups() {
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
    if (!video || this.player !== video || this.isBackgroundVideo(video)) return;
    if (video.duration <= 30 || this.isLive() || this.shouldDestroyTimeElement()) return this.removeVideoProgress();

    const duration = this.getRealDuration(video);
    if (duration > 864e2) return this.removeVideoProgress();

    const percent = Tools.toFixed((video.currentTime / duration) * 100, 1);
    const timeLeft = this.formatTime(duration - video.currentTime);

    const element = this.createProgressElement(); // 创建相关元素
    element.textNode.textContent = `${timeLeft} / ${percent}`;
    this.prependElement(element);
  },
  createProgressElement() {
    if (this.progressElement) return this.progressElement;
    if (window.videoProgressElement) return (this.progressElement = window.videoProgressElement);

    // 创建播放进度元素
    const element = this.createDisplayElement("__time-progress", Storage.CLOCK_COLOR.get());

    // 创建文本节点，并挂载到element
    const textNode = document.createTextNode("00:00");
    element.textNode = textNode;

    // 创建百分号
    const percent = document.createElement("b");
    percent.textContent = "%";

    element.append(textNode, percent);
    window.videoProgressElement = this.progressElement = element;
    this.toggleSmallerFont(Storage.USE_SMALLER_FONT.get());

    return element;
  },
  removeVideoProgress() {
    this.progressElement?.remove();
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
