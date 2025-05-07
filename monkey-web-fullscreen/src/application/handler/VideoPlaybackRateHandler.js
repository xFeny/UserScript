import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
import constants from "../common/Constants";
const { PLAY_RATE_STEP, CACHED_PLAY_RATE } = storage;
const { SYMBOL, DEF_PLAY_RATE, MAX_PLAY_RATE } = constants;
const strategy = {
  [SYMBOL.MULTIPLY]: (playRate) => playRate * 2,
  [SYMBOL.DIVIDE]: (playRate) => playRate / 2,
  [SYMBOL.ADD]: (playRate) => playRate + PLAY_RATE_STEP.get(),
  [SYMBOL.SUBTRACT]: (playRate) => playRate - PLAY_RATE_STEP.get(),
};
/**
 * 倍速播放逻辑处理
 */
export default {
  checkUsable() {
    //是否可以设置倍速
    if (!this.video) return false;
    if (webSite.isLivePage()) return false;
    if (this.isClosedPlayRate()) return false;
    if (!Tools.validDuration(this.video)) return false;
    return true;
  },
  toFixed(playRate) {
    playRate = Number.parseFloat(playRate);
    return playRate.toFixed(2).replace(/\.?0+$/, "");
  },
  setPlaybackRate(playRate, show = true) {
    if (!this.checkUsable()) return;
    this.video.playbackRate = this.toFixed(playRate);
    if (show) this.playbackRateToast();
    this.cachePlaybackRate();
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
    if (!this.video) return;
    this.video.playbackRate = DEF_PLAY_RATE;
    if (this.isClosedPlayRate()) return;
    this.cachePlaybackRate();
    this.showToast("已恢复正常倍速播放");
  },
  currVideoUseCachePlayRate(video) {
    if (this.isClosedPlayRate()) return;
    if (!webSite.isIqiyi()) video.isToastShown = false;
    const playRate = this.getCachePlaybackRate();
    // Tools.log(`当前播放倍速为：${video.playbackRate}，记忆倍速为：${playRate}`);
    if (video.playbackRate === playRate) return;
    this.setPlaybackRate(playRate, !video.isToastShown);
    video.isToastShown = true;
  },
  cachePlaybackRate() {
    CACHED_PLAY_RATE.set(this.video.playbackRate);
  },
  getCachePlaybackRate: () => Number.parseFloat(CACHED_PLAY_RATE.get() || DEF_PLAY_RATE),
  playbackRateToast() {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode("正在以"));
    const child = span.cloneNode(true);
    child.textContent = `${this.video.playbackRate}x`;
    child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode("倍速播放"));
    this.showToast(span);
  },
};
