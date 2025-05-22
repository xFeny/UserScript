import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
import constants from "../common/Constants";

const { EMPTY, ONE_SEC, SYMBOL, DEF_PLAY_RATE, MAX_PLAY_RATE } = constants;
const { PLAY_RATE_STEP, CACHED_PLAY_RATE, VIDEO_SKIP_INTERVAL, PLAY_TIME, DISABLE_MEMORY_TIME } = storage;

const strategy = {
  [SYMBOL.DIVIDE]: (playRate) => playRate / 2,
  [SYMBOL.MULTIPLY]: (playRate) => playRate * 2,
  [SYMBOL.ADD]: (playRate) => playRate + PLAY_RATE_STEP.get(),
  [SYMBOL.SUBTRACT]: (playRate) => playRate - PLAY_RATE_STEP.get(),
};
/**
 * 视频控制相关逻辑处理
 */
export default {
  checkUsable() {
    //是否可以设置倍速
    if (!this.video) return false;
    if (this.isVideoEnded()) return false;
    if (webSite.isLivePage()) return false;
    if (this.isDisablePlaybackRate()) return false;
    if (!Tools.validDuration(this.video)) return false;
    return true;
  },
  isVideoEnded() {
    return Math.floor(this.video.currentTime) === Math.floor(this.video.duration);
  },
  toFixed(playRate) {
    playRate = Number.parseFloat(playRate);
    return playRate.toFixed(2).replace(/\.?0+$/, "");
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;
    this.video.playbackRate = this.toFixed(playRate);
    if (show) this.customToast("正在以", `${this.video.playbackRate}x`, "倍速播放");
    CACHED_PLAY_RATE.set(this.video.playbackRate);
  },
  adjustPlaybackRate(_symbol) {
    if (!this.checkUsable()) return;
    let playRate = this.video.playbackRate;
    playRate = strategy[_symbol](playRate);
    playRate = Math.max(PLAY_RATE_STEP.get(), playRate);
    playRate = Math.min(MAX_PLAY_RATE, playRate);
    this.setPlaybackRate(playRate);
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
  tryplay: (video) => (video.paused ? (webSite.isDouyu() ? Tools.triggerClick(video) : video.play()) : null),
  adjustVideoTime(second = VIDEO_SKIP_INTERVAL.get(), _symbol) {
    if (!this.video || !Tools.validDuration(this.video)) return;
    if (_symbol && ![SYMBOL.ADD, SYMBOL.SUBTRACT].includes(_symbol)) return;
    if (Object.is(typeof second, typeof EMPTY) && !_symbol) {
      _symbol = second;
      second = VIDEO_SKIP_INTERVAL.get();
    }
    if (SYMBOL.SUBTRACT !== _symbol && this.video.isEnded) return;
    second = Object.is(SYMBOL.SUBTRACT, _symbol) ? -second : second;
    const currentTime = Math.min(this.video.currentTime + second, this.video.duration);
    this.setCurrentTime(currentTime);
  },
  cachePlayTime(video) {
    if (!this.topInfo || this.isLive() || this.isMultipleVideo()) return;
    if (DISABLE_MEMORY_TIME.get() || this.isVideoEnded()) return this.delCachePlayTime();
    if (video.currentTime > 1) PLAY_TIME.set(this.topInfo.hash, video.currentTime - 1, 7);
  },
  delCachePlayTime() {
    PLAY_TIME.del(this.topInfo.hash);
  },
  useCachePlayTime(video) {
    if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
    const time = PLAY_TIME.get(this.topInfo.hash);
    if (time <= video.currentTime) return (this.hasUsedPlayTime = true);
    this.setCurrentTime(time);
    this.hasUsedPlayTime = true;
    this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", ONE_SEC * 3, false);
  },
  setCurrentTime(currentTime) {
    if (currentTime) this.video.currentTime = Math.max(0, currentTime);
  },
  customToast(startText, colorText, endText, duration, isRemoveOther) {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(startText));
    const child = span.cloneNode(true);
    child.textContent = colorText;
    child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode(endText));
    this.showToast(span, duration, isRemoveOther);
  },
  formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [...(h ? [h] : []), m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
  },
  isMultipleVideo() {
    const currVideoSrc = this.video.currentSrc;
    const videos = Tools.querys("video").filter((video) => video.currentSrc !== currVideoSrc && !isNaN(video.duration));
    return videos.length > 1;
  },
};
