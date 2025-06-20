import App from "../index";
import Tools from "../common/Tools";
/**
 * 视频事件监听器处理函数
 * this指向的是当前播放的video对象
 */
export default {
  loadedmetadata() {
    App.universalWebFullscreen(this);
    Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
  },
  loadeddata() {
    App.initVideoProperties(this);
    Tools.query(".conplaying")?.click(); // https://skr.skrcc.cc:666
    App.tryplay(this);
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    App.universalWebFullscreen(this);
    App.useCachePlaybackRate(this);
    App.useCachePlayTime(this);
    App.cachePlayTime(this);
  },
  play() {
    this.isEnded = false;
    App.specificWebFullscreen(this);
  },
  pause() {
    // https://www.mcydh.com、https://dick.xfani.com
    // 某些动漫网站会提示是否跳转上次播放进度，然后暂停播放等待确认跳转
    Tools.query(".ec-no")?.click();
    Tools.query('[id*="loading"]._noplayer')?.remove();
  },
  ended() {
    this.isEnded = true;
    this.hasToast = false;
    App.exitWebFullScreen();
    App.delPlayTime();
  },
};
