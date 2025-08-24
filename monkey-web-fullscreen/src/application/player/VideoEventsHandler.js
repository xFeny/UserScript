import Tools from "../common/Tools";
/**
 * 视频事件监听器处理函数
 * this指向的是当前播放的video对象
 */
export default {
  loadedmetadata() {
    App.autoWebFullscreen(this);
    Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
  },
  loadeddata() {
    App.initVideoProps(this);
    Tools.query(".conplaying")?.click(); // https://skr.skrcc.cc:666
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    App.autoWebFullscreen(this);
    App.autoNextEpisode(this);
    App.cachePlayTime(this);
  },
  canplay() {
    if (this.hasTryAutoPlay || Tools.isMultiVideo()) return;
    this.hasTryAutoPlay = true;
    App.tryAutoPlay(this);
  },
  playing() {
    this.isEnded = false;
    if (this.duration < 5) return; // 超短的视频不操作
    App.setCurrentVideo(this, true);
    App.applyCachedPlayRate(this);
    setTimeout(() => App.applyCachedTime(this), 20); // 确保topWin信息的即时性和可靠性
    App.removeLoginPopups();
  },
  pause() {
    // https://www.mcydh.com、https://dick.xfani.com
    // 某些动漫网站会提示是否跳转上次播放进度，然后暂停播放等待确认跳转
    Tools.query(".ec-no")?.click();
    Tools.query('[id*="loading"]._noplayer')?.remove();
  },
  ended() {
    this.isEnded = true;
    App.autoExitWebFullscreen();
    App.clearCachedTime(this);
  },
};
