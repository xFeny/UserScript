import Tools from "../common/Tools";

/**
 * 视频事件监听器处理函数
 * this指向的是当前播放的video对象
 */
export default {
  loadedmetadata() {
    App.autoWebFullscreen(this);
    Tools.querys('[id*="loading"]').forEach((el) => !Tools.query("video", el) && Tools.addCls(el, "_noplayer"));
  },
  loadeddata() {
    App.fixListenerLoss();
    App.initVideoProps(this);
    Tools.query(".conplaying")?.click(); // https://skr.skrcc.cc:666
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    if (!this.__hasInitPlaySettings) App.initPlaySettings(this);
    if (!App.player) App.setCurrentVideo(this);
    App.removeRelevantElements(this);
    App.autoWebFullscreen(this);
    App.autoNextEpisode(this);
    App.cachePlayTime(this);
    App.videoProgress(this);
  },
  canplay() {
    if (this.hasTryAutoPlay || Tools.isMultiVideo()) return;
    this.hasTryAutoPlay = true;
    App.tryAutoPlay(this);
  },
  playing() {
    this.isEnded = false;
    App.setCurrentVideo(this);
    App.initPlaySettings(this);
  },
  ended() {
    this.isEnded = true;
    App.autoExitWebFullscreen();
    App.clearCachedTime(this);
  },
};
