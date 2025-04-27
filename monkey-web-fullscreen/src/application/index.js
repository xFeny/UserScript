import Tools from "./common/Tools";
import constants from "./common/Constants";
import selectorConfig from "./common/SelectorConfig";
import VideoListenerHandler from "./handler/VideoListenerHandler";
import douyu from "./handler/DouyuHandler";
const { EMPTY, ONE_SEC, QQ_VID_REG, BILI_VID_REG, IQIYI_VID_REG, ACFUN_VID_REG, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } =
  constants;
// 获取脚本@match匹配规则
const matches = GM_info.script.matches
  .filter((match) => match !== "*://*/*")
  .map((match) => new RegExp(match.replace(/\*/g, "\\S+")));
export default {
  init() {
    this.setupHoverListener();
    this.setupVisibleListener();
    this.setupKeydownListener();
    this.setupMutationObserver();
    this.setupUrlChangeListener();
  },
  isDouyu: () => location.host === "v.douyu.com",
  isBili: () => BILI_VID_REG.test(location.href),
  isTencent: () => QQ_VID_REG.test(location.href),
  isIqiyi: () => IQIYI_VID_REG.test(location.href),
  isAcFun: () => ACFUN_VID_REG.test(location.href),
  isLivePage: () => location.href.includes("live"),
  isBiliLive: () => location.host === "live.bilibili.com",
  inMatches: () => matches.some((matche) => matche.test(location.href.replace(location.search, EMPTY))),
  normalWebsite() {
    return !this.videoCenterPoint; // 普通页面，没有video标签
  },
  getVideo() {
    if (this.isDouyu()) return douyu.getVideo();
    return Tools.query("video:not([loop]):not([src=''])") || Tools.query("video:not([loop])");
  },
  getElement() {
    if (this.isDouyu()) return douyu.getWebfullIcon();
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
      const video = this.isLivePage() ? this.getVideo() : this.video;
      if (video?.isEnded || !Tools.isVisible(video)) return;
      document.hidden ? video?.pause() : video?.play();
    });
  },
  setupHoverListener() {
    if (this.inMatches()) return;
    document.addEventListener("mouseover", (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const videos = Tools.querys("video");
      for (const video of videos) {
        const rect = video.getBoundingClientRect();
        const isWiderThanWindow = video.offsetWidth > window.innerWidth;
        const isInRect = rect.left <= x && rect.right >= x && rect.top <= y && rect.bottom >= y;
        if (!isInRect || !Tools.validVideoDur(video) || isWiderThanWindow) continue;
        if (this.video === video) return; // 鼠标悬浮的video与之前的是同一个
        this.addVideoEvtListener(video);
      }
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
      if (!this.inMatches() && this.video) return observer.disconnect();
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
    if (this.isLivePage()) return;
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
  getPlayingVideo() {
    const videos = Tools.querys("video");
    for (const video of videos) {
      const isWiderThanWindow = video.offsetWidth > window.innerWidth;
      if (this.video === video || video.paused || !Tools.validVideoDur(video) || isWiderThanWindow) continue;
      return this.addVideoEvtListener(video); // 正在播放的video
    }
  },
  healthCurrentVideo() {
    if (this.healthID) clearInterval(this.healthID);
    this.healthID = setInterval(() => this.getPlayingVideo(), ONE_SEC);
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
    if (this.isDouyu()) douyu.addStyle();
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
      setTimeout(() => el.remove(), ONE_SEC / 2);
    }, duration);
  },
};
