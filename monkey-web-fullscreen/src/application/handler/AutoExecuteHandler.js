import Site from "../common/Site";
import Tools from "../common/Tools";
import Store from "../common/Store";
import Consts from "../common/Consts";
import HotKey from "../common/HotKey";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  autoNextEpisode(video) {
    if (video.duration < 300 || video.vx_hasTriedNext || this.remainTime(video) > Store.NEXT_ADVANCE.get()) return;
    if (!Store.NEXT_AUTO.get() || Tools.isThrottle("autoNext", Consts.HALF_SEC)) return;
    if (this.isIgnoreNext()) return (video.vx_hasTriedNext = true);

    this.dispatchShortcut(HotKey.N);
    video.vx_hasTriedNext = true;
  },
  async autoWebFullscreen(video) {
    if (!this.topWin || !video.offsetWidth || this.player !== video) return;
    if (video.vx_isWFs || Tools.isThrottle("autoWFs", Consts.ONE_SEC)) return;
    if (Site.isGmMatch() ? Store.NO_AUTO_DEF.get() : !this.isAutoSite()) return;
    if (this.isIgnoreWFs() || (await this.isWebFull()) || Tools.isOverLimit("autoWFs")) return (video.vx_isWFs = true);

    // 发送网页全屏消息
    this.dispatchShortcut(HotKey.P);
  },
  async isWebFull(ms = Consts.HALF_SEC) {
    const isWFs = () => this.getFsMode() === "isWFull";
    return isWFs() ? await Tools.sleep(ms).then(isWFs) : false;
  },
  autoExitFullscreen() {
    if (!Site.isBili() && !Site.isAcFun()) return;
    const doExit = () => document.exitFullscreen().catch(async () => (await this.isWebFull(5)) && this.toggleWebFullscreen());

    requestAnimationFrame(() => {
      const cancel = Tools.query(".bpx-player-ending-related-item-cancel"); // B站 取消连播
      if (cancel || Site.isAcFun()) doExit();
      cancel?.click?.();
    });
  },
};
