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
      // 某些网站需要点击相关元素，才会加载视频
      // 如：https://www.dadaqu.cc、https://www.jddzx.cc
      const element = document.querySelector("body > #start, #play-button-overlay");
      if (element) element.click?.();

      this.setFakeBiliUser();
    });
  },
  async removeRelevantElements() {
    // 防止网站的播放进度，对脚本的进度恢复造成影响，如：https://skr.skr1.cc:666
    if (Tools.isThrottle("choice", Consts.ONE_SEC) || Tools.isOverLimit("choice", 3)) return;
    const element = Tools.query(".ec-no, .conplaying, .choice-true, .close-btn, .closeclick");
    if (element) element.click?.(), element.remove?.();
  },
  setFakeBiliUser() {
    if (!Site.isBili() || unsafeWindow.UserStatus?.userInfo?.isLogin) return;

    // 解决：B站未登录观看视频约1分钟弹出登录框问题
    Tools.sleep(Consts.THREE_SEC).then(() => {
      unsafeWindow.__BiliUser__.cache.data.isLogin = true;
      unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
    });
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
    return (isFull && Storage.DISABLE_CLOCK.get()) || (!isFull && !Storage.PAGE_CLOCK.get());
  },
  async setupPlayerClock() {
    if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
    if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(this.player.parentNode).start();

    this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
  },
  getRealDuration(video) {
    if (!Site.isQiyi()) return video.duration;
    return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
  },
  videoProgress(video, bypass) {
    if (!video || (!bypass && video.paused) || this.player !== video || this.isBackgroundVideo(video)) return;
    if (video.duration <= 30 || this.isLive() || this.shouldHideTime()) return this.removeProgressElement();

    const duration = this.getRealDuration(video);
    if (duration > 864e2) return this.removeProgressElement();

    const percent = Tools.toFixed((video.currentTime / duration) * 100, 1);
    const timeLeft = this.formatTime(duration - video.currentTime);

    const element = this.createProgressElement(); // 创建相关元素
    element.firstChild.textContent = `${timeLeft} / ${percent}`;
    this.prependElement(element);
  },
  createProgressElement() {
    if (this.progressNode) return this.progressNode;

    // 创建播放进度元素
    const element = this.createDisplayElement("__time-progress", Storage.CLOCK_COLOR.get());
    element.append(document.createTextNode("00:00"), Tools.createElement("b", { textContent: "%" }));
    this.progressNode = element;

    return element;
  },
  removeProgressElement() {
    this.progressNode?.remove();
  },
  playbackRateKeepDisplay() {
    if (!this.player || this.isLive()) return;
    if (!Storage.RATE_KEEP_SHOW.get()) return this.removeRateKeepDisplay();

    if (!this.rateKeepElement) this.rateKeepElement = this.createDisplayElement("__rate-keep-show");
    this.rateKeepElement.textContent = `倍速: ${this.player.playbackRate}`;
    this.prependElement(this.rateKeepElement);
  },
  resumeRateKeepDisplay() {
    if (Tools.isOverLimit("rateKeep") || document.contains(this.rateKeepElement)) return;
    this.playbackRateKeepDisplay();
  },
  removeRateKeepDisplay() {
    this.rateKeepElement?.remove();
  },
  createDisplayElement(clss, color) {
    const element = Tools.createElement("div", { className: clss, style: `color: ${color}` });
    this.prependElement(element);
    return element;
  },
  prependElement(element, target) {
    const container = target ?? this.player?.parentNode;
    if (element && !container?.contains(element)) container?.prepend(element);
  },
  setTimeElementColor(color) {
    Tools.setStyle([this.progressNode, this.Clock?.element], "color", color);
  },
  changeTimeElementDisplay() {
    this.setupPlayerClock(), this.videoProgress(this.player, true);
  },
  hideLoadingElement: () => Tools.querys("#loading").forEach((el) => !Tools.query("video", el) && Tools.addCls(el, "hide")),
};
