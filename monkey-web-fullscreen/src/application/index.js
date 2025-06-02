import Tools from "./common/Tools";
import webSite from "./common/WebSite";
import constants from "./common/Constants";
import selectorConfig from "./common/SelectorConfig";
import VideoEventHandler from "./handler/VideoEventHandler";
const { EMPTY, ONE_SEC, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = constants;

export default {
  init() {
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupMutationObserver();
    this.setupUrlChangeListener();
    this.setupMouseMoveListener();
  },
  normalSite: () => !window?.videoInfo,
  isLive: () => webSite.isLivePage() || window?.videoInfo?.isLive,
  isBackgroudVideo: (video) => video?.muted && video?.hasAttribute("loop"),
  getVideo: () => Tools.query("video:not([loop]):not([src=''])") || Tools.query("video:not([loop])"),
  getWebFullElement: () => Tools.query(selectorConfig[location.host]?.webfull),
  getVideoIframe() {
    // video所在的iframe标签
    if (!this.videoInfo?.frameSrc) return null;
    const url = new URL(this.videoInfo.frameSrc);
    const src = decodeURI(url.pathname + url.search);
    return Tools.query(`iframe[src*="${src}"]`);
  },
  setupVisibleListener() {
    window.addEventListener("visibilitychange", () => {
      if (this.normalSite()) return;
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
    const handler = () => this.setupMutationObserver();
    ["popstate", "pushState", "replaceState"].forEach((t) => _wr(t) & window.addEventListener(t, handler));
  },
  setupMutationObserver() {
    if (Tools.isTooFrequent()) return;
    const observer = Tools.createObserver(document.body, () => {
      this.triggerVideoStart();
      const video = this.getVideo();
      this.webFullElement = this.getWebFullElement();
      if (video?.play && !!video.offsetWidth) this.setupVideoListener();
      if (!webSite.inMatches() && this.topInfo) return observer.disconnect();
      if (!this.videoInfo || !this.webFullElement || !this.webFullScreen(video)) return;
      observer.disconnect(), this.biliLiveExtras(), this.handleLoginPopups();
    });
    setTimeout(() => observer.disconnect(), ONE_SEC * 10);
  },
  triggerVideoStart() {
    // https://www.jumomo.cc、https://www.jiaozi.me、https://www.kmvod.cc
    const element = Tools.query(".ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
    if (!element || Tools.isTooFrequent("start")) return;
    setTimeout(() => element?.click() & element?.remove(), 150);
  },
  setupVideoListener() {
    const video = this.getVideo();
    this.addVideoEvtListener(video);
    this.healthCurrentVideo();
  },
  addVideoEvtListener(video) {
    this.video = video;
    this.setVideoInfo(video);
    this.removeVideoEvtListener();
    this.videoBoundListeners = [];
    for (const [type, handler] of Object.entries(VideoEventHandler)) {
      this.video?.addEventListener(type, handler);
      this.videoBoundListeners.push([this.video, type, handler]);
    }
  },
  removeVideoEvtListener() {
    this.videoBoundListeners?.forEach(([target, type, handler]) => {
      target?.removeEventListener(type, handler);
    });
  },
  healthCurrentVideo() {
    if (this.healthID || Tools.isTooFrequent("healt")) return;
    this.healthID = setInterval(() => this.getPlayingVideo(), ONE_SEC);
  },
  getPlayingVideo() {
    const videos = Tools.querys("video");
    for (const video of videos) {
      if (this.video === video || video.paused || !Tools.validDuration(video) || this.isBackgroudVideo(video)) continue;
      return this.addVideoEvtListener(video); // 正在播放的video
    }
  },
  setVideoInfo(video) {
    const isLive = Object.is(video.duration, Infinity);
    const videoInfo = { ...Tools.getElementCenterPoint(video), src: video.currentSrc, isLive };
    this.setParentVideoInfo(videoInfo);
  },
  setParentVideoInfo(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) videoInfo.frameSrc = location.href;
    if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo });
    this.setupPickerEpisodeListener();
    this.setupScriptMenuCommand();
    this.sendTopInfo();
  },
  sendTopInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href } = location;
    window.topInfo = this.topInfo = { innerWidth, host, href, hash: Tools.simpleHash(href) };
    Tools.postMsgToFrames({ topInfo });
  },
  setupMouseMoveListener() {
    const delay = ONE_SEC * 2;
    let timer = setTimeout(() => this.showOrHideCursor(), delay);
    document.addEventListener("mousemove", ({ target, isTrusted }) => {
      if (!isTrusted) return;
      clearTimeout(timer);
      this.showOrHideCursor(false);
      timer = setTimeout(() => this.showOrHideCursor(), delay);
      if (this.video === target || !target.matches("video") || this.isBackgroudVideo(target)) return;
      this.addVideoEvtListener(target);
    });
  },
  showOrHideCursor(isHide = true) {
    if (this.normalSite()) return;
    const videoWrap = this.getVideoHostContainer();
    const elements = Array.from([this?.video, ...Tools.getParents(videoWrap, true, 3)]);
    elements.forEach((ele) => {
      if (isHide) ele?.dispatchEvent(new MouseEvent("mouseleave"));
      isHide ? ele?.classList.add("hideCursor") : ele?.classList.remove("hideCursor");
    });
  },
  showToast(content, duration = SHOW_TOAST_TIME, isRemove = true) {
    const el = document.createElement("div");
    el.setAttribute("part", "monkey-show-toast");
    el.setAttribute("style", SHOW_TOAST_POSITION);
    if (isRemove) Tools.query('[part="monkey-show-toast"]')?.remove();
    content instanceof Element ? el.appendChild(content) : (el.innerHTML = content);

    const videoWrap = this.getVideoWrapper();
    const target = videoWrap?.matches("video") ? videoWrap?.parentElement : videoWrap;
    target?.appendChild(el);

    setTimeout(() => ((el.style.opacity = 0), setTimeout(() => el.remove(), ONE_SEC / 3)), duration);
  },
};
