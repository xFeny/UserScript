import App from "../index";
import Tools from "../common/Tools";
// 视频事件监听器处理函数
// this指向的是当前播放的video对象
export default {
  loadedmetadata() {
    this.volume = 1;
    this.isToast = false;
  },
  loadeddata() {
    this.volume = 1;
    this.isToast = false;
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    if (!App.isIqiyi()) this.isToast = false;
    const cachePlayRate = App.getCachePlayRate();
    // App.log(`当前播放倍速为：${this.playbackRate}，记忆倍速为：${cachePlayRate}`);
    if (!cachePlayRate || cachePlayRate === this.playbackRate) return;
    if (!App.setPlayRate(cachePlayRate) || this.isToast) return;
    App.playRateToast();
    this.isToast = true;
  },
  canplay() {
    this.play();
  },
  play() {
    this.isEnded = false;
    App.webFullScreen(this);
  },
  ended() {
    this.isEnded = true;
    this.isToast = false;
    const href = location.href;
    // if (/[a-zA-z]+:\/\/[^\s]*/.test(href)) return;
    if (!App.isBili() && !App.isAcFun()) return;
    // B站视频合集播放的是合集最后一个或关闭了合集自动连播
    const pod = Tools.query(".video-pod");
    const pods = Tools.querys('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
    if (!pod || pods.length > 0) App.exitWebFullScreen();
  },
};
