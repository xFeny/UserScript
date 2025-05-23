import App from "../index";
import Tools from "../common/Tools";
/**
 * 视频事件监听器处理函数
 * this指向的是当前播放的video对象
 */
export default {
  loadedmetadata() {
    this.volume = 1;
    this.hasToast = false;
    this.isWebFullScreen = false;
    Tools.querys('[id*="loading"]')
      .filter((ele) => !Tools.query('[class*="player"]', ele))
      .forEach((ele) => ele.classList.add("not-player"));
  },
  loadeddata() {
    this.volume = 1;
    this.hasToast = false;
    this.isWebFullScreen = false;
    App.experWebFullScreen(this);
    App.tryplay(this);
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    Tools.query(".conplaying")?.click();
    App.useCachePlaybackRate(this);
    App.experWebFullScreen(this);
    App.useCachePlayTime(this);
    App.changeVideoInfo(this);
    App.cachePlayTime(this);
  },
  canplay() {
    App.tryplay(this);
  },
  play() {
    this.isEnded = false;
    App.webFullScreen(this);
  },
  pause() {
    // https://www.mcydh.com、https://dick.xfani.com
    // 某些动漫网站会提示是否跳转上次播放进度，然后暂停播放等待确认跳转
    Tools.query(".ec-no")?.click();
    Tools.query('[id*="loading"].not-player')?.remove();
    Tools.query('[id*="loading"]:not(:has([class*="player"]))')?.remove();
  },
  ended() {
    this.isEnded = true;
    this.hasToast = false;
    App.delCachePlayTime();
    App.exitWebFullScreen();
  },
};
