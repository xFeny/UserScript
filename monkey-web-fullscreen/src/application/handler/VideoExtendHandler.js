import Site from "../common/Site";
import Tools from "../common/Tools";
import Clock from "../common/Clock";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频一些额外处理
 */
export default {
  setupContentLoadedListener() {
    document.addEventListener("DOMContentLoaded", () => {
      // 某些网站需要点击相关元素，才会加载视频
      // 如：https://www.jddzx.cc、https://www.dadalv.cc、https://www.pipilv.cc
      const element = document.querySelector("body > #start, #play-button-overlay");
      if (element) setTimeout(() => element.click?.());

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
    const timer = setInterval(() => {
      if (this.player && unsafeWindow.__BiliUser__?.cache?.data?.isLogin) clearInterval(timer);
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
    return (isFull && Storage.DISABLE_CLOCK.get()) || (!isFull && !Storage.PAGE_CLOCK.get());
  },
  async setupPlayerClock() {
    if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
    if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(this.player.parentNode).start();

    this.Clock = new Clock(this.player.parentNode, { color: Storage.CLOCK_COLOR.get() });
    this.toggleTimeElementClass(Storage.USE_SMALL_FONT.get());
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
    element.textNode.textContent = `${timeLeft} / ${percent}`;
    this.prependElement(element);
  },
  createProgressElement() {
    if (this.progressNode) return this.progressNode;

    // 创建播放进度元素
    const element = this.createDisplayElement("__time-progress", Storage.CLOCK_COLOR.get());

    // 创建文本节点，并挂载到element
    const textNode = document.createTextNode("00:00");
    element.textNode = textNode;

    // 创建百分号
    const percent = document.createElement("b");
    percent.textContent = "%";

    this.progressNode = element;
    element.append(textNode, percent);
    this.toggleTimeElementClass(Storage.USE_SMALL_FONT.get());

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
    const element = document.createElement("div");
    Tools.setStyle(element, "color", color);
    element.classList.add(clss);
    this.prependElement(element);
    return element;
  },
  prependElement(element, target) {
    const container = target ?? this.player?.parentNode;
    if (element && !container?.contains(element)) container?.prepend(element);
  },
  toggleTimeElementClass(addClass, clss = "smaller") {
    if (addClass) return Tools.addCls(this.Clock?.element, clss), Tools.addCls(this.progressNode, clss);
    Tools.delCls(this.Clock?.element, clss), Tools.delCls(this.progressNode, clss);
  },
  setTimeElementColor(color) {
    Tools.setStyle([this.progressNode, this.Clock?.element], "color", color);
  },
  changeTimeElementDisplay() {
    this.setupPlayerClock(), this.videoProgress(this.player, true);
  },
};
