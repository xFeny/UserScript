import Tools from "./common/Tools";
import webSite from "./common/WebSite";
import constants from "./common/Constants";
import selectorConfig from "./common/SelectorConfig";
import VideoListenerHandler from "./handler/VideoListenerHandler";
const { EMPTY, ONE_SEC, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = constants;

export default {
  init() {
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupMutationObserver();
    this.setupUrlChangeListener();
    this.setupMouseMoveListener();
  },
  isLive() {
    return webSite.isLivePage() || this.videoInfo?.isLive;
  },
  normalWebsite() {
    return !this.videoInfo; // 普通页面，没有video标签
  },
  getVideo: () => Tools.query("video:not([loop]):not([src=''])") || Tools.query("video:not([loop])"),
  getElement: () => Tools.query(selectorConfig[location.host]?.webfull),
  getVideoIframe() {
    // video所在的iframe标签
    if (!this.videoInfo?.frameSrc) return null;
    const url = new URL(this.videoInfo.frameSrc);
    const src = decodeURI(url.pathname + url.search);
    return Tools.query(`iframe[src*="${src}"]`);
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      window.top.focus();
      if (this.normalWebsite()) return;
      const video = this.isLive() ? this.getVideo() : this.video;
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
      this.triggerVideoStart();
      const video = this.getVideo();
      this.element = this.getElement();
      if (video?.play && !!video.offsetWidth) this.setupVideoListener();
      if (!webSite.inMatches() && this.topInfo) return observer.disconnect();
      if (!video?.play || !this.element || !this.webFullScreen(video)) return;
      observer.disconnect();
      this.biliLiveExtras();
      this.webSiteLoginObserver();
    });
    setTimeout(() => observer.disconnect(), ONE_SEC * 10);
  },
  triggerVideoStart() {
    // https://www.freeok.la、https://www.jiaozi.me
    const element = Tools.query(
      ".ec-no, .conplaying, #start, [class*='poster'], .choice-true, .close-btn, .closeclick"
    );
    if (!element || this.isTriggerVideoStart) return;
    setTimeout(() => element?.click() & element?.remove(), 100);
    this.isTriggerVideoStart = true;
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
    this.setVideoInfo(video);
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
  setVideoInfo(video) {
    const isLive = Object.is(video.duration, Infinity);
    const videoInfo = { ...Tools.getElementCenterPoint(video), isLive };
    this.setParentVideoInfo(videoInfo);
  },
  setParentVideoInfo(videoInfo) {
    this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) videoInfo.frameSrc = location.href;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo });
    this.setupPickerEpisodeListener();
    this.setupScriptMenuCommand();
    this.sendTopInfo();
  },
  changeVideoInfo(video) {
    if (!this.videoInfo) return;
    const isLive = Object.is(video.duration, Infinity);
    if (this.videoInfo.isLive === isLive) return;
    this.videoInfo.isLive = isLive;
    this.setParentVideoInfo(this.videoInfo);
  },
  sendTopInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href } = location;
    const topInfo = (this.topInfo = { innerWidth, host, href, hash: Tools.simpleHash(href) });
    Tools.postMsgToFrames({ topInfo });
  },
  setupMouseMoveListener() {
    if (this.isMoveListener) return;
    const delay = ONE_SEC * 2;
    this.isMoveListener = true;
    let timer = setTimeout(() => this.showOrHideCursor(), delay);
    document.addEventListener("mousemove", (event) => {
      if (!event.isTrusted) return;
      clearTimeout(timer);
      const target = event.target;
      this.showOrHideCursor(false);
      timer = setTimeout(() => this.showOrHideCursor(), delay);
      if (this.video === target || !(target instanceof HTMLVideoElement) || target.offsetWidth > innerWidth) return;
      this.addVideoEvtListener(target);
    });
  },
  showOrHideCursor(isHide = true) {
    if (!this.videoInfo) return;
    const videoWrap = this.getVideoLocation();
    const elements = Array.from([...(videoWrap?.children || []), videoWrap, videoWrap?.parentElement]);
    elements.forEach((ele) => {
      if (isHide) ele?.dispatchEvent(new MouseEvent("mouseleave"));
      isHide ? ele?.style.setProperty("cursor", "none") : ele?.style.setProperty("cursor", EMPTY);
    });
  },
  showToast(content, duration = SHOW_TOAST_TIME, isRemoveOther = true) {
    const el = document.createElement("div");
    el.setAttribute("part", "monkey-show-toast");
    el.setAttribute("style", SHOW_TOAST_POSITION);
    if (isRemoveOther) Tools.query('[part="monkey-show-toast"]')?.remove();
    content instanceof HTMLElement ? el.appendChild(content) : (el.innerHTML = content);

    const videoContainer = this.getVideoContainer();
    const target = Object.is(this.video, videoContainer) ? this.video?.parentElement : videoContainer;
    target?.appendChild(el);

    setTimeout(() => {
      el.style.opacity = 0;
      setTimeout(() => el.remove(), ONE_SEC / 3);
    }, duration);
  },
};
