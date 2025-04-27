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
// 倍速播放逻辑处理
export default {
  checkUsable() {
    //是否可以设置倍速
    if (!this.video) return false;
    if (webSite.isLivePage()) return false;
    if (this.isClosedPlayRate()) return false;
    return true;
  },
  toFixed(playRate) {
    playRate = Number.parseFloat(playRate);
    return playRate.toFixed(2).replace(/\.?0+$/, "");
  },
  setPlayRate(playRate) {
    if (!this.checkUsable()) return;
    this.video.playbackRate = this.toFixed(playRate);
    this.cachePlayRate();
    this.playRateToast();
  },
  adjustPlayRate(_symbol) {
    if (!this.checkUsable()) return;
    let playRate = this.video.playbackRate;
    playRate = strategy[_symbol](playRate);
    playRate = Math.max(PLAY_RATE_STEP.get(), playRate);
    playRate = Math.min(MAX_PLAY_RATE, playRate);
    this.setPlayRate(playRate);
  },
  defaultPlayRate() {
    if (!this.video) return;
    this.video.playbackRate = DEF_PLAY_RATE;
    if (this.isClosedPlayRate()) return;
    this.cachePlayRate();
    this.showToast("已恢复正常倍速播放");
  },
  cachePlayRate() {
    CACHED_PLAY_RATE.set(this.video.playbackRate);
  },
  getCachePlayRate: () => Number.parseFloat(CACHED_PLAY_RATE.get() || DEF_PLAY_RATE),
  playRateToast() {
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
