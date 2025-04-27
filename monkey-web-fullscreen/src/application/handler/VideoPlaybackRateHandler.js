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
// 倍速播放逻辑处理
export default {
  checkVideoUsable() {
    //检查视频是否可用
    if (!this.video) return false;
    if (this.isLivePage()) return false;
    return true;
  },
  setPlayRate(playRate) {
    if (!this.checkVideoUsable()) return;
    this.video.playbackRate = playRate;
    this.cachePlayRate();
    return true;
  },
  adjustPlayRate(_symbol) {
    if (!this.checkVideoUsable()) return;
    let playRate = this.video.playbackRate;
    playRate = strategy[_symbol](playRate);
    playRate = Math.max(PLAY_RATE_STEP.get(), playRate);
    this.video.playbackRate = Math.min(MAX_PLAY_RATE, playRate);
    this.cachePlayRate();
    this.playRateToast();
  },
  cachePlayRate() {
    CACHED_PLAY_RATE.set(this.video.playbackRate);
  },
  getCachePlayRate: () => Number.parseFloat(CACHED_PLAY_RATE.get() || DEF_PLAY_RATE),
  playRateToast() {
    const span = document.createElement("span");
    span.appendChild(document.createTextNode("正在以"));
    const child = span.cloneNode(true);
    child.textContent = `${this.video.playbackRate.toFixed(2).replace(/\.?0+$/, "")}x`;
    child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
    span.appendChild(child);
    span.appendChild(document.createTextNode("倍速播放"));
    this.showToast(span);
  },
};
