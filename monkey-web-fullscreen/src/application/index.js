import Tools from "./common/Tools";
import webSite from "./common/WebSite";
import constants from "./common/Constants";
import selectorConfig from "./common/SelectorConfig";
import VideoListenerHandler from "./handler/VideoListenerHandler";
import douyu from "./handler/DouyuHandler";
const { EMPTY, ONE_SEC, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = constants;

export default {
  init() {
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupMutationObserver();
    this.setupUrlChangeListener();
  },
  normalWebsite() {
    return !this.videoCenterPoint; // 普通页面，没有video标签
  },
  getVideo() {
    if (webSite.isDouyu()) return douyu.getVideo();
    return Tools.query("video:not([loop]):not([src=''])") || Tools.query("video:not([loop])");
  },
  getElement() {
    if (webSite.isDouyu()) return douyu.getWebfullIcon();
    return document.querySelector(selectorConfig[location.host]?.webfull);
  },
  getVideoIframe() {
    // video所在的iframe标签
    if (!this.videoCenterPoint?.frameSrc) return null;
    const url = new URL(this.videoCenterPoint.frameSrc);
    const src = decodeURI(url.pathname + url.search);
    return Tools.query(`iframe[src*="${src}"]`);
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      window.top.focus();
      if (this.normalWebsite()) return;
      const video = webSite.isLivePage() ? this.getVideo() : this.video;
      if (!video || video?.isEnded || !Tools.isVisible(video)) return;
      document.hidden ? video?.pause() : video?.play();
    });
  },
  setupUrlChangeListener() {
    const _wr = (method) => {
      const original = history[method];
      history[method] = function () {
        original.apply(history, arguments);
        window.dispatchEvent(new Event(method));
      };
    };
    const handler = Tools.debounce(() => this.setupMutationObserver());
    ["popstate", "pushState", "replaceState"].forEach((t) => _wr(t) & window.addEventListener(t, handler));
  },
  setupMutationObserver() {
    const observer = Tools.createObserver(document.body, () => {
      const video = this.getVideo();
      this.element = this.getElement();
      if (video?.play) this.setupVideoListener();
      if (!webSite.inMatches() && this.video) return observer.disconnect();
      if (!video?.play || !this.element || !this.webFullScreen(video)) return;
      observer.disconnect();
      this.biliLiveExtras();
      this.webSiteLoginObserver();
    });
    setTimeout(() => observer.disconnect(), ONE_SEC * 10);
  },
  video: null,
  videoBoundListeners: [],
  setupVideoListener() {
    const video = this.getVideo();
    this.addVideoEvtListener(video);
    this.healthCurrentVideo();
  },
  addVideoEvtListener(video) {
    this.video = video;
    this.setVideoCenterPoint(video);
    if (webSite.isLivePage()) return;
    this.removeVideoEvtListener();
    for (const type of Object.keys(VideoListenerHandler)) {
      const handler = VideoListenerHandler[type];
      this.video.addEventListener(type, handler);
      this.videoBoundListeners.push([this.video, type, handler]);
    }
  },
  removeVideoEvtListener() {
    this.videoBoundListeners.forEach((listener) => {
      const [target, type, handler] = listener;
      target.removeEventListener(type, handler);
    });
    this.videoBoundListeners = [];
  },
  healthCurrentVideo() {
    if (this.healthID) clearInterval(this.healthID);
    this.healthID = setInterval(() => this.getPlayingVideo(), ONE_SEC);
  },
  getPlayingVideo() {
    const videos = Tools.querys("video");
    for (const video of videos) {
      const isWiderThanWindow = video.offsetWidth > window.innerWidth;
      if (this.video === video || video.paused || !Tools.validDuration(video) || isWiderThanWindow) continue;
      return this.addVideoEvtListener(video); // 正在播放的video
    }
  },
  setVideoCenterPoint(video) {
    const { left, top, width, height } = video.getBoundingClientRect();
    const videoCenterPoint = { x: left + width / 2, y: top + height / 2, src: video.src };
    this.setParentFrameSrc(videoCenterPoint);
  },
  setParentFrameSrc(videoCenterPoint) {
    this.videoCenterPoint = videoCenterPoint;
    if (Tools.isTopWin()) return this.setupScriptMenuCommand();
    videoCenterPoint.frameSrc = location.href;
    Tools.postMessage(window.parent, { videoCenterPoint });
    // Tools.log("video元素中心点信息：", videoCenterPoint);
  },
  showToast(content, duration = SHOW_TOAST_TIME) {
    if (webSite.isDouyu()) douyu.addStyle();
    const el = document.createElement("div");
    if (content instanceof HTMLElement) el.appendChild(content);
    if (Object.is(typeof content, typeof EMPTY)) el.textContent = content;
    el.setAttribute("class", "showToast");
    el.setAttribute("style", SHOW_TOAST_POSITION);
    const target = this.video?.parentElement?.parentElement;
    Tools.query(".showToast", target)?.remove();
    target?.appendChild(el);
    setTimeout(() => {
      el.style.opacity = 0;
      setTimeout(() => el.remove(), ONE_SEC / 3);
    }, duration);
  },
};
