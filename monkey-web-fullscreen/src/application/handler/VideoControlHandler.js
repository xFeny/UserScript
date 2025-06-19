import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";

/**
 * 视频控制相关逻辑处理
 */
export default {
  isEnded() {
    return Math.floor(this.video.currentTime) === Math.floor(this.video.duration);
  },
  initVideoProperties(video) {
    video.volume = 1;
    video.hasToast = false;
    video.hasWebFullScreen = false;
  },
  playOrPause: (video) => (Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause()),
  tryplay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
  checkUsable() {
    if (!this.video) return false;
    if (this.isEnded()) return false;
    if (Site.isLivePage()) return false;
    if (this.isDisablePlaybackRate()) return false;
    if (!Tools.validDuration(this.video)) return false;
    return true;
  },
  lockPlaybackRate(video) {
    try {
      const orig = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "playbackRate");
      Object.defineProperty(video, "playbackRate", {
        set: (value) => value === video?.__playbackRate && orig.set.call(video, value),
        get: () => orig.get.call(video),
        configurable: true,
      });
    } catch (e) {}
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;
    this.lockPlaybackRate(this.video);
    playRate = (+playRate).toFixed(2).replace(/\.?0+$/, Consts.EMPTY);
    this.video.playbackRate = this.video.__playbackRate = playRate;
    if (show) this.customToast("正在以", `${playRate}x`, "倍速播放");
    Storage.CACHED_PLAY_RATE.set(playRate);
  },
  adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
    if (!this.checkUsable()) return;
    const playRate = Math.max(Storage.PLAY_RATE_STEP.get(), this.video.playbackRate + step);
    this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
  },
  defaultPlaybackRate() {
    if (this.isDisablePlaybackRate()) return;
    this.setPlaybackRate(Consts.DEF_PLAY_RATE, false);
    this.showToast("已恢复正常倍速播放");
  },
  useCachePlaybackRate(video) {
    if (this.isDisablePlaybackRate()) return;
    const playRate = Storage.CACHED_PLAY_RATE.get();
    // Tools.log(`当前播放倍速为：${video.playbackRate}，记忆倍速为：${playRate}`);
    if (Consts.DEF_PLAY_RATE === playRate || video.playbackRate === playRate) return;
    this.setPlaybackRate(playRate, !video.hasToast);
    video.hasToast = true;
  },
  adjustVideoTime(second = Storage.SKIP_INTERVAL.get()) {
    if (!this.video || !Tools.validDuration(this.video) || (second > 0 && this.video.isEnded)) return;
    const currentTime = Math.min(this.video.currentTime + second, this.video.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (!this.topInfo || this.isLive() || !Tools.validDuration(this.video)) return;
    if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded() || this.isMultVideo()) return this.delPlayTime();
    if (video.currentTime > Storage.SKIP_INTERVAL.get()) Storage.PLAY_TIME.set(topInfo.hash, video.currentTime - 1, 7);
  },
  useCachePlayTime(video) {
    if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
    const time = Storage.PLAY_TIME.get(topInfo.hash);
    if (time <= video.currentTime) return (this.hasUsedPlayTime = true);
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3, false);
    this.hasUsedPlayTime = true;
    this.setCurrentTime(time);
  },
  delPlayTime: () => Storage.PLAY_TIME.del(topInfo.hash),
  setCurrentTime(currentTime) {
    if (currentTime) this.video.currentTime = Math.max(0, currentTime);
  },
  rotation: 0,
  videoRotateOrMirror(mirror = false) {
    if (!this.video) return;

    const cls = "__tsr";
    const style = this.video.style;
    Tools.addCls(this.video, cls), Tools.setPart(this.video, cls);
    if (mirror) return (this.isMirrored = !this.isMirrored), style.setProperty("--mirror", this.isMirrored ? -1 : 1);

    this.rotation = (this.rotation + 90) % 360;
    const { videoWidth, videoHeight } = this.video;
    const isVertical = [90, 270].includes(this.rotation);
    const scale = isVertical ? videoHeight / videoWidth : 1;
    style.setProperty("--scale", scale), style.setProperty("--rotate", `${this.rotation}deg`);

    // 测试视频：https://www.bilibili.com/video/BV1DT5AzLEMb、https://www.bilibili.com/video/BV13Y9FYfEVu
  },
  customToast(startText, colorText, endText, duration, isRemove) {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(startText));
    const child = span.cloneNode(true);
    child.textContent = colorText;
    child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode(endText));
    this.showToast(span, duration, isRemove);
  },
  showToast(content, duration = Consts.ONE_SEC * 5, isRemove = true) {
    const el = document.createElement("div");
    el.setAttribute("part", "monkey-toast");
    if (isRemove) Tools.query('[part="monkey-toast"]')?.remove();
    content instanceof Element ? el.appendChild(content) : (el.innerHTML = content);

    const videoWrap = this.getVideoWrapper();
    const target = videoWrap?.matches("video") ? videoWrap?.parentElement : videoWrap;
    target?.appendChild(el);

    setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), Consts.ONE_SEC / 3)), duration);
  },
  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [...(h ? [h] : []), m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  },
  isMultVideo() {
    const currVideoSrc = this.videoInfo.src;
    const videos = Tools.querys("video").filter((video) => video.currentSrc !== currVideoSrc && !isNaN(video.duration));
    return videos.length > 1;
  },
};
