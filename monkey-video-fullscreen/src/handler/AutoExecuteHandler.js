import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Keyboard from "../common/Keyboard";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  async autoWebFullscreen(video) {
    if (!this.topWin || !video.offsetWidth || this.player !== video) return;
    if (video.__isWide || !this.isAutoSite() || Tools.isThrottle("autoWide", Consts.ONE_SEC)) return;
    if ((await this.isWebFull(video)) || this.isIgnoreUrl() || Tools.isOverLimit("autoWide")) return (video.__isWide = true);

    // 发送网页全屏消息
    this.dispatchShortcutKey(Keyboard.P);
  },
  async isWebFull(video) {
    const isWebFull = video.offsetWidth >= this.topWin.viewWidth;
    if (!isWebFull) return false;
    await Tools.sleep(Consts.HALF_SEC);
    return video.offsetWidth >= this.topWin.viewWidth;
  },
};
