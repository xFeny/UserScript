import Site from "../common/Site";
import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import SiteIcons from "../common/SiteIcons";
import Keyboard from "../common/Keyboard";

/**
 * 自动网页全屏、自动切换下集逻辑处理
 */
export default {
  autoNextEpisode(video) {
    if (video.duration < 300) return;
    if (video._mfs_hasTriedAutoNext) return;
    if (!Storage.ENABLE_AUTO_NEXT_EPISODE.get()) return;
    if (Tools.isFrequent("autoNext", Consts.TWO_SEC, true)) return;
    if (this.getRemainingTime(video) > Storage.AUTO_NEXT_ADVANCE_SEC.get()) return; // 距离结束还剩多少秒切换下集
    if (this.isNextIgnoreUrl()) return (video._mfs_hasTriedAutoNext = true);

    this.dispatchShortcutKey(Keyboard.N);
    video._mfs_hasTriedAutoNext = true;
  },
  async autoWebFullscreen(video) {
    if (this.player !== video) return;
    if (Tools.isFrequent("autoWebFull", Consts.ONE_SEC, true)) return;
    if (video._mfs_hasWebFull || !this.topWin || !video.offsetWidth) return;
    if ((Site.isMatch() && this.isDisableAuto()) || (!Site.isMatch() && !this.isEnableSiteAuto())) return;
    if (this.isFullIgnoreUrl() || Tools.isOverLimit("autoWebFull")) return (video._mfs_hasWebFull = true);
    if (await this.isWebFull(video)) return (video._mfs_hasWebFull = true);

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
    if (isWide) this.triggerIconElement(this.isFullscreen ? SiteIcons.name.full : SiteIcons.name.webFull);

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
