import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Storage from "../common/Storage";
import VideoEnhancer from "../lib/VideoEnhancer";

/**
 * 视频控制相关逻辑处理
 * 如：倍速、快进、缩放、移动等
 */
export default {
  isLive() {
    if (!this.videoInfo || !this.player) return false;
    return this.videoInfo.isLive || this.player?.duration === Infinity || this.isDynamicDur(this.player);
  },
  isDynamicDur(video) {
    if (video._mfs_isDynamic || video.currentTime > video.__duration) return true;

    // 记录默认时长，用于判断是否为动态时长
    const { duration, __duration } = video;
    if (!__duration) video.__duration = duration;

    const isDynamic = Math.floor(duration) > Math.floor(__duration);
    if (isDynamic) video._mfs_isDynamic = true; // 为true，后续不再重新计算

    return isDynamic;
  },
  initVideoProps(video) {
    // 清理视频元素上脚本自定义的_mfs_前缀私有属性，避免残留状态干扰
    Object.keys(video).forEach((k) => k.startsWith("_mfs_") && delete video[k]);

    // 设置默认一些值
    video.__duration = video.duration;

    // 重置次数限制
    Tools.resetLimit("autoWide");
  },
  setPlaybackRate(playRate) {
    if (!this.player || isNaN(this.player.duration) || this.player.ended || this.isLive()) return;
    if (!playRate || Number(this.player.playbackRate) === playRate) return;

    // 设置倍速
    VideoEnhancer.setPlaybackRate(this.player, playRate);
    this.playbackRateKeepDisplay(); // 倍速始终显示

    Storage.CACHED_SPEED.set(this.player.playbackRate);
    return Promise.resolve();
  },
  adjustPlaybackRate(step = Storage.SPEED_STEP.get()) {
    const playRate = Math.max(Consts.MIN_SPEED, Number(this.player.playbackRate) + step);
    this.setPlaybackRate(Math.min(Consts.MAX_SPEED, playRate));
  },
  applyCachedPlayRate(video) {
    if (video._mfs_hasApplyCRate) return;

    const playRate = Storage.CACHED_SPEED.get();
    if (Consts.DEF_SPEED === playRate || Number(video.playbackRate) === playRate) return;
    this.setPlaybackRate(playRate)?.then(() => (video._mfs_hasApplyCRate = true));
  },
};
