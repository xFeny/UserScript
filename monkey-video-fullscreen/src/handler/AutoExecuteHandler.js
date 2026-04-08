import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  async autoWebFullscreen(video) {
    if (!this.topWin || !video.offsetWidth || this.player !== video) return;
    if (video.__isWFs || Tools.isThrottle("autoWFs", Consts.ONE_SEC) || !this.isAuto()) return;
    if (this.isIgnoreUrl() || (await this.isWebFull()) || Tools.isOverLimit("autoWFs")) return (video.__isWFs = true);

    // 发送网页全屏消息
    this.dispatchShortcut(Consts.P);
  },
  async isWebFull(ms = Consts.HALF_SEC) {
    const isWFs = () => this.getFsMode() === "isWFull";
    return isWFs() ? await Tools.sleep(ms).then(isWFs) : false;
  },
};
