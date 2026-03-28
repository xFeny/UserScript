import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import HotKey from "../common/HotKey";
import Storage from "../common/Storage";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  autoNextEpisode(video) {
    if (video.duration < 300 || video._mfs_hasTriedNext || this.remainTime(video) > Storage.NEXT_ADVANCE_SEC.get()) return;
    if (!Storage.IS_AUTO_NEXT.get() || Tools.isThrottle("autoNext", Consts.HALF_SEC)) return;
    if (this.isIgnoreNext()) return (video._mfs_hasTriedNext = true);

    this.dispatchShortcut(HotKey.N);
    video._mfs_hasTriedNext = true;
  },
  async autoWebFullscreen(video) {
    if (!this.topWin || !video.offsetWidth || this.player !== video) return;
    if (video._mfs_isWide || Tools.isThrottle("autoWide", Consts.ONE_SEC)) return;
    if (Site.isGmMatch() ? Storage.NO_AUTO_DEF.get() : !this.isAutoSite()) return;
    if (this.isIgnoreWide() || (await this.isWebFull(video)) || Tools.isOverLimit("autoWide")) return (video._mfs_isWide = true);

    // 发送网页全屏消息
    this.dispatchShortcut(HotKey.P);
  },
  async isWebFull(video) {
    const { vw } = this.topWin;
    if (video.offsetWidth < vw) return false;
    await Tools.sleep(Consts.HALF_SEC);
    return video.offsetWidth >= vw;
  },
  autoExitFull(video) {
    if (!Site.isBili() && !Site.isAcFun()) return;
    document.exitFullscreen().catch(() => video.offsetWidth >= innerWidth && this.toggleFullByIcon(Site.icons.webFull));
    requestAnimationFrame(() => Tools.query(".bpx-player-ending-related-item-cancel")?.click()); // B站取消连播
  },
};
