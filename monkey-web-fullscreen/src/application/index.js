import Site from "./common/Site";
import Tools from "./common/Tools";
import Consts from "./common/Consts";
import SiteIcons from "./common/SiteIcons";

export default window.App = {
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
      const video = this.isLive() ? this.getVideo() : this.player;
      if (!video || video?.isEnded || !Tools.isVisible(video)) return;
      document.hidden ? video?.pause() : video?.play();
    });
  },
  setupUrlChangeListener() {
    const _wr = (method) => {
      const original = history[method];
      history[method] = function () {
        original.apply(this, arguments);
        window.dispatchEvent(new Event(method));
      };
    };
    const handler = () => this.setupMutationObserver();
    ["popstate", "pushState", "replaceState"].forEach((t) => _wr(t) & window.addEventListener(t, handler));
  },
  setupMutationObserver() {
    if (Tools.isTooFrequent()) return;
    const observer = Tools.createObserver(document.body, () => {
      this.removeLoginPopups();
      this.triggerStartElement();
      const video = this.getVideo();
      this.webFullElement = this.getWebFullElement();
      if (video?.play && !!video?.offsetWidth) this.setCurrentVideo(video);
      if (this.topInfo && (!Site.isMatch() || this.specificWebFullscreen(video))) observer.disconnect();
    });
    setTimeout(() => observer.disconnect(), Consts.ONE_SEC * 10);
  },
  triggerStartElement() {
    // https://www.zhihu.com 、https://www.jumomo.cc 、https://www.jiaozi.me 、https://www.kmvod.cc
    const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
    if (!element || Tools.isTooFrequent("start")) return;
    setTimeout(() => element?.click() & element?.remove(), 150);
  },
  setCurrentVideo(video) {
    if (isNaN(video.duration) || video.duration < 10 || video.offsetWidth < 200) return;
    if (this.isBackgroundVideo(video) || this.player === video) return;

    this.player = video;
    this.setVideoInfo(video);
    window?.EnhancerVideo?.enhanced(video);
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
    if (this.hasTopInfo) return;
    // 向iframe传递顶级窗口信息
    this.hasTopInfo = true;
    const title = document.title;
    const { host, href } = location;
    window.topInfo = this.topInfo = { title, innerWidth, host, href, hash: Tools.simpleHash(href) };
    Tools.sendToIFrames({ topInfo });
  },
  setupMouseMoveListener() {
    let timer = null;
    const handleMouseEvent = ({ target, isTrusted }) => {
      if (!isTrusted) return;

      clearTimeout(timer);
      this.toggleCursor();
      timer = setTimeout(() => this.toggleCursor(true), Consts.ONE_SEC * 3);
      if (target instanceof HTMLVideoElement) this.setCurrentVideo(target);
    };

    document.addEventListener("mousemove", (e) => handleMouseEvent(e));
    document.addEventListener("mouseover", (e) => e.target.matches("video, iframe") && handleMouseEvent(e));
  },
  toggleCursor(hide = false) {
    if (this.normalSite() || Tools.isTooFrequent("cursor")) return;
    const videoWrap = this.getVideoHostContainer();
    const cls = "__hc";

    if (!hide) return Tools.querys(`.${cls}`).forEach((el) => (Tools.delCls(el, cls), Tools.delPart(el, cls)));
    [this?.video, ...Tools.getParents(videoWrap, true, 3)].forEach((el) => {
      el?.blur(), Tools.addCls(el, cls), Tools.setPart(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
    });
  },
};
