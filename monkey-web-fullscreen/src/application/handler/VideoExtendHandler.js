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
  shouldHideTime() {
    const isFull = this.isFullscreen;
    return (isFull && Storage.DISABLE_CLOCK.get()) || (!isFull && !Storage.UNFULL_CLOCK.get());
  },
  async setupPlayerClock() {
    if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
    if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(Tools.getParent(this.player)).start();

    this.Clock = new Clock(Tools.getParent(this.player), { color: Storage.CLOCK_COLOR.get() });
    this.toggleTimeElementClass(Storage.USE_SMALLER_FONT.get());
  },
  getRealDuration(video) {
    if (!Site.isQiyi()) return video.duration;
    return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
  },
  videoProgress(video) {
    if (!video || video.paused || this.player !== video || this.isBackgroundVideo(video)) return;
    if (video.duration <= 30 || this.isLive() || this.shouldHideTime()) return this.removeProgressElement();

    const duration = this.getRealDuration(video);
    if (duration > 864e2) return this.removeProgressElement();

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
    this.toggleTimeElementClass(Storage.USE_SMALLER_FONT.get());

    return element;
  },
  removeProgressElement() {
    this.progressElement?.remove();
  },
  playbackRateKeepDisplay() {
    if (!this.player || this.isLive()) return;
    if (!Storage.RATE_KEEP_SHOW.get()) return this.removeRateKeepDisplay();

    if (!this.rateKeepElement) this.rateKeepElement = this.createDisplayElement("__rate-keep-show");
    this.rateKeepElement.textContent = `倍速: ${this.player.playbackRate}`;
    this.prependElement(this.rateKeepElement);
  },
  removeRateKeepDisplay() {
    this.rateKeepElement?.remove();
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
    const container = target ?? Tools.getParent(this.player);
    if (!container?.contains(element)) container?.prepend(element);
  },
  toggleTimeElementClass(addClass, clss = "smaller") {
    if (addClass) return Tools.addCls(this.Clock?.element, clss), Tools.addCls(this.progressElement, clss);
    Tools.delCls(this.Clock?.element, clss), Tools.delCls(this.progressElement, clss);
  },
  setTimeElementColor(color) {
    // 设置播放剩余时间颜色
    const progressStyle = this.progressElement?.style;
    color ? progressStyle?.setProperty("color", color) : progressStyle?.removeProperty("color");

    // 设置时钟颜色
    this.Clock?.setCustomColor(color);
  },
  changeTimeElementDisplay() {
    this.setupPlayerClock(), this.videoProgress(this.player);
  },
};
