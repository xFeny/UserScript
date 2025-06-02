import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
import constants from "../common/Constants";

const { ONE_SEC, DEF_PLAY_RATE, MAX_PLAY_RATE } = constants;
const { PLAY_RATE_STEP, CACHED_PLAY_RATE, VIDEO_SKIP_INTERVAL, PLAY_TIME, DISABLE_MEMORY_TIME } = storage;

/**
 * 视频控制相关逻辑处理
 */
export default {
  isVideoEnded() {
    return Math.floor(this.video.currentTime) === Math.floor(this.video.duration);
  },
  initVideoProperties(video) {
    video.volume = 1;
    video.hasToast = false;
    video.isWebFullScreen = false;
  },
  playOrPause: (video) => (webSite.isDouyu() ? Tools.triggerClick(video) : video.paused ? video.play() : video.pause()),
  tryplay: (video) => video?.paused && (webSite.isDouyu() ? Tools.triggerClick(video) : video?.play()),
  checkUsable() {
    //是否可以设置倍速
    if (!this.video) return false;
    if (this.isVideoEnded()) return false;
    if (webSite.isLivePage()) return false;
    if (this.isDisablePlaybackRate()) return false;
    if (!Tools.validDuration(this.video)) return false;
    return true;
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;
    this.video.playbackRate = (+playRate).toFixed(2).replace(/\.?0+$/, "");
    if (show) this.customToast("正在以", `${this.video.playbackRate}x`, "倍速播放");
    CACHED_PLAY_RATE.set(this.video.playbackRate);
  },
  adjustPlaybackRate(step = PLAY_RATE_STEP.get()) {
    if (!this.checkUsable()) return;
    const playRate = Math.max(PLAY_RATE_STEP.get(), this.video.playbackRate + step);
    this.setPlaybackRate(Math.min(MAX_PLAY_RATE, playRate));
  },
  defaultPlaybackRate() {
    if (this.isDisablePlaybackRate()) return;
    this.setPlaybackRate(DEF_PLAY_RATE, false);
    this.showToast("已恢复正常倍速播放");
  },
  useCachePlaybackRate(video) {
    if (this.isDisablePlaybackRate()) return;
    const playRate = CACHED_PLAY_RATE.get();
    // Tools.log(`当前播放倍速为：${video.playbackRate}，记忆倍速为：${playRate}`);
    if (video.playbackRate === playRate) return;
    this.setPlaybackRate(playRate, !video.hasToast);
    video.hasToast = true;
  },
  adjustVideoTime(second = VIDEO_SKIP_INTERVAL.get()) {
    if (!this.video || !Tools.validDuration(this.video) || (second > 0 && this.video.isEnded)) return;
    const currentTime = Math.min(this.video.currentTime + second, this.video.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (!this.topInfo || this.isLive()) return;
    if (DISABLE_MEMORY_TIME.get() || this.isVideoEnded() || this.isMultVideo()) return this.delCachePlayTime();
    if (video.currentTime > VIDEO_SKIP_INTERVAL.get()) PLAY_TIME.set(topInfo.hash, video.currentTime - 1, 7);
  },
  useCachePlayTime(video) {
    if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
    const time = PLAY_TIME.get(topInfo.hash);
    if (time <= video.currentTime) return (this.hasUsedPlayTime = true);
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", ONE_SEC * 3, false);
    this.hasUsedPlayTime = true;
    this.setCurrentTime(time);
  },
  delCachePlayTime: () => PLAY_TIME.del(topInfo.hash),
  setCurrentTime(currentTime) {
    if (currentTime) this.video.currentTime = Math.max(0, currentTime);
  },
  rotation: 0,
  videoRotateOrMirror(mirror = false) {
    if (!this.video) return;
    mirror ? (this.isMirrored = !this.isMirrored) : (this.rotation = (this.rotation + 90) % 360);
    const { videoWidth, videoHeight } = this.video;
    const isVertical = [90, 270].includes(this.rotation);
    const scale = isVertical ? videoHeight / videoWidth : 1;
    this.video.style = `--scale: ${scale}; --rotation: ${this.rotation}deg; --mirror: ${this.isMirrored ? -1 : 1};`;
    // 测试视频：https://www.bilibili.com/video/BV1DT5AzLEMb、https://www.bilibili.com/video/BV13Y9FYfEVu
  },
  customToast(startText, colorText, endText, duration, isCoexist) {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(startText));
    const child = span.cloneNode(true);
    child.textContent = colorText;
    child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode(endText));
    this.showToast(span, duration, isCoexist);
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
