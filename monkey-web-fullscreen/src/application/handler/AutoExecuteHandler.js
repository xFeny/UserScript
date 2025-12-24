import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import Keyboard from "../common/Keyboard";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  autoNextEpisode(video) {
    if (video.duration < 300 || video._mfs_hasTriedNext || this.remainTime(video) > Storage.NEXT_ADVANCE_SEC.get()) return;
    if (!Storage.IS_AUTO_NEXT.get() || Tools.isThrottle("autoNext", Consts.HALF_SEC)) return;
    if (this.isIgnoreNext()) return (video._mfs_hasTriedNext = true);

    this.dispatchShortcutKey(Keyboard.N);
    video._mfs_hasTriedNext = true;
  },
  async autoWebFullscreen(video) {
    if (!this.topWin || !video.offsetWidth || this.player !== video) return;
    if (video._mfs_isWide || Tools.isThrottle("autoWide", Consts.ONE_SEC)) return;
    if ((Site.isGmMatch() && this.noAutoDefault()) || (!Site.isGmMatch() && !this.isAutoSite())) return;
    if (this.isIgnoreWide() || (await this.isWebFull(video)) || Tools.isOverLimit("autoWide")) return (video._mfs_isWide = true);

    // 发送网页全屏消息
    this.dispatchShortcutKey(Keyboard.P);
  },
  async isWebFull(video) {
    const isWebFull = video.offsetWidth >= this.topWin.viewWidth;
    if (!isWebFull) return false;
    await Tools.sleep(Consts.HALF_SEC);
    return video.offsetWidth >= this.topWin.viewWidth;
  },
  autoExitWebFullscreen() {
    if (!Site.isBili() && !Site.isAcFun()) return;
    const isWide = this.player.offsetWidth === innerWidth;
    if (isWide) this.triggerIconElement(this.isFullscreen ? Site.icons.full : Site.icons.webFull);

    // 取消连播触发条件：
    // - B站普通视频（非番剧）播放结束时
    // - B站合集视频播放至最后一集时
    // - B站合集中关闭「自动连播」选项时
    requestAnimationFrame(() => {
      const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (!Tools.query(".video-pod") || isLast) Tools.query(".bpx-player-ending-related-item-cancel")?.click();
    });
  },
};
