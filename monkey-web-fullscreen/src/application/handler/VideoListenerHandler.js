import App from "../index";
import douyu from "./DouyuHandler";
import Tools from "../common/Tools";
import webSite from "../common/WebSite";
/**
 * 视频事件监听器处理函数
 * this指向的是当前播放的video对象
 */
export default {
  loadedmetadata() {
    this.volume = 1;
    this.isToastShown = false;
    this.isWebFullScreen = false;
  },
  loadeddata() {
    this.volume = 1;
    this.isToastShown = false;
    this.isWebFullScreen = false;
  },
  timeupdate() {
    if (isNaN(this.duration)) return;
    App.changeVideoInfo(this);
    App.experimentWebFullScreen(this);
    App.currVideoUseCachePlayRate(this);
  },
  canplay() {
    webSite.isDouyu() ? douyu.play() : this.play();
  },
  play() {
    this.isEnded = false;
    App.webFullScreen(this);
  },
  ended() {
    this.isEnded = true;
    this.isToastShown = false;
    // if (/[a-zA-z]+:\/\/[^\s]*/.test(location.href)) return;
    if (!webSite.isBili() && !webSite.isAcFun()) return;
    // B站视频合集播放的是合集最后一个或关闭了合集自动连播
    const pod = Tools.query(".video-pod");
    const pods = Tools.querys('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
    if (!pod || !!pods.length) App.exitWebFullScreen();
  },
};
