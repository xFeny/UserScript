import Site from "./common/Site";
import Tools from "./common/Tools";
import Constants from "./common/Constants";
import SiteIcons from "./common/SiteIcons";
import VideoEventHandler from "./handler/VideoEventHandler";

export default unsafeWindow.MONKEY_WEB_FULLSCREEN = {
  init() {
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupMutationObserver();
    this.setupUrlChangeListener();
    this.setupMouseMoveListener();
  },
  normalSite: () => !window?.videoInfo && !window?.topInfo,
  isLive: () => Site.isLivePage() || window?.videoInfo?.isLive,
  isBackgroudVideo: (video) => video?.muted && video?.hasAttribute("loop"),
  getVideo: () => Tools.querys("video:not([loop])").find((el) => Tools.isVisible(el)),
  getWebFullElement: () => Tools.query(SiteIcons[location.host]?.[SiteIcons.name.webFull]),
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
      if (!Site.isMatch() && this.topInfo) return observer.disconnect();
      if (!this.videoInfo || !this.webFullElement || !this.specificWebFullscreen(video)) return;
      observer.disconnect(), this.handleLoginPopups();
    });
    setTimeout(() => observer.disconnect(), Constants.ONE_SEC * 10);
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
    this.healthID = setInterval(() => this.getPlayingVideo(), Constants.ONE_SEC);
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
    const videoInfo = { ...Tools.getCenterPoint(video), src: video.currentSrc, isLive };
    this.setParentVideoInfo(videoInfo);
  },
  setParentVideoInfo(videoInfo) {
    window.videoInfo = this.videoInfo = videoInfo;
    if (!Tools.isTopWin()) return (videoInfo.frameSrc = location.href), Tools.postMessage(window.parent, { videoInfo });
    this.setupPickerEpisodeListener();
    this.setupScriptMenuCommand();
    this.sendTopInfo();
  },
  sendTopInfo() {
    // 向iframe传递顶级窗口信息
    const { host, href } = location;
    window.topInfo = this.topInfo = { innerWidth, host, href, hash: Tools.simpleHash(href) };
    Tools.sendToIFrames({ topInfo });
  },
  setupMouseMoveListener() {
    const delay = Constants.ONE_SEC * 2;
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
    isHide
      ? [this?.video, ...Tools.getParents(videoWrap, true, 3)].forEach((el) => {
          Tools.addCls(el, "hideCursor"), Tools.setPart(el, "hideCursor"), el?.dispatchEvent(new MouseEvent("mouseleave"));
        })
      : Tools.querys(".hideCursor").forEach((el) => (Tools.delCls(el, "hideCursor"), Tools.delPart(el, "hideCursor")));
  },
};
