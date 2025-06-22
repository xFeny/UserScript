import Site from "./common/Site";
import Tools from "./common/Tools";
import Consts from "./common/Consts";
import SiteIcons from "./common/SiteIcons";
import VideoEventHandler from "./handler/VideoEventHandler";
import Storage from "./common/Storage";

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
  getVideo: () => Tools.querys("video:not([loop])").find(Tools.isVisible),
  isBackgroundVideo: (video) => video?.muted && video?.hasAttribute("loop"),
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
      if (!Site.isMatch() && this.topInfo) return observer.disconnect();
      if (video?.play && !!video.offsetWidth) this.addVideoListener(video);
      if (!this.videoInfo || !this.webFullElement || !this.specificWebFullscreen(video)) return;
      observer.disconnect(), this.handleLoginPopups();
    });
    setTimeout(() => observer.disconnect(), Consts.ONE_SEC * 10);
  },
  triggerVideoStart() {
    // https://www.zhihu.com 、https://www.jumomo.cc 、https://www.jiaozi.me 、https://www.kmvod.cc
    const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
    if (!element || Tools.isTooFrequent("start")) return;
    setTimeout(() => element?.click() & element?.remove(), 150);
  },
  addVideoListener(video) {
    this.video = video;
    this.setVideoInfo(video);
    this.healthCurrentVideo();
    this.removeVideoEvtListener();
    this.videoBoundListeners = [];

    Object.entries(VideoEventHandler).forEach(([type, handler]) => {
      this.videoBoundListeners.push([video, type, handler]);
      video?.addEventListener(type, handler);
    });
  },
  removeVideoEvtListener() {
    this.videoBoundListeners?.forEach(([target, type, handler]) => {
      target?.removeEventListener(type, handler);
    });
  },
  healthCurrentVideo() {
    if (this.healthID || Tools.isTooFrequent("healt")) return;
    this.healthID = setInterval(() => this.getPlayingVideo(), Consts.ONE_SEC);
  },
  getPlayingVideo() {
    const videos = Tools.querys("video");
    for (const video of videos) {
      if (this.video === video || video.paused || isNaN(video.duration) || this.isBackgroundVideo(video)) continue;
      return this.addVideoListener(video);
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
    const title = document.title;
    const { host, href } = location;
    window.topInfo = this.topInfo = { title, innerWidth, host, href, hash: Tools.simpleHash(href) };
    Tools.sendToIFrames({ topInfo });
  },
  setupMouseMoveListener() {
    let timer = null;
    const handleMouseEvent = ({ target, isTrusted }, addListener = false) => {
      if (!isTrusted) return;

      clearTimeout(timer);
      this.toggleCursor();
      timer = setTimeout(() => this.toggleCursor(true), Consts.ONE_SEC * 3);

      if (!addListener || this.video === target || !target.matches("video") || this.isBackgroundVideo(target)) return;
      this.addVideoListener(target);
    };

    document.addEventListener("mousemove", (e) => handleMouseEvent(e, true));
    document.addEventListener("mouseover", (e) => e.target.matches("video, iframe") && handleMouseEvent(e));
  },
  toggleCursor(hide = false) {
    if (this.normalSite() || Tools.isTooFrequent("mouse", 300)) return;
    const videoWrap = this.getVideoHostContainer();
    const cls = "__hc";

    if (!hide) return Tools.querys(`.${cls}`).forEach((el) => (Tools.delCls(el, cls), Tools.delPart(el, cls)));
    [this?.video, ...Tools.getParents(videoWrap, true, 3)].forEach((el) => {
      el?.blur(), Tools.addCls(el, cls), Tools.setPart(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
    });
  },
};
