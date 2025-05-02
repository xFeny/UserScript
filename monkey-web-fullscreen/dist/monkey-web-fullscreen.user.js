// ==UserScript==
// @name         视频网站自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      2.7.0
// @author       Feny
// @description  支持哔哩哔哩、B站直播、腾讯视频、优酷视频、爱奇艺、芒果TV、搜狐视频、AcFun弹幕网自动网页全屏；快捷键切换：全屏(F)、网页全屏(P)、下一个视频(N)、弹幕开关(D)；支持任意视频倍速播放，提示记忆倍速；B站播放完自动退出网页全屏和取消连播。
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=
// @homepage     https://github.com/xFeny/UserScript/tree/main/monkey-web-fullscreen
// @include      *://pages.iqiyi.com/p/zy/*
// @include      *://www.ezdmw.site/Index/video/*
// @include      *://player.ezdmw.com/danmuku/*
// @include      *://*bimiacg*.net/*/play*
// @include      *://acgfta.com/play*
// @include      *://ppoft.com/play*
// @match        *://tv.sohu.com/v/*
// @match        *://www.mgtv.com/b/*
// @match        *://www.acfun.cn/v/*
// @match        *://www.iqiyi.com/v_*
// @match        *://v.pptv.com/show/*
// @match        *://v.qq.com/x/page/*
// @match        *://v.douyu.com/show/*
// @match        *://v.qq.com/x/cover/*
// @match        *://live.bilibili.com/*
// @match        *://v.youku.com/video?*
// @match        *://haokan.baidu.com/v?*
// @match        *://live.acfun.cn/live/*
// @match        *://www.acfun.cn/bangumi/*
// @match        *://www.bilibili.com/list/*
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/*/play/*
// @match        *://v.qq.com/live/p/newtopic/*
// @match        *://www.bilibili.com/festival/*
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        unsafeWindow
// @note         *://*/*
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' @charset "UTF-8";.showToast{color:#fff!important;font-size:13.5px!important;padding:5px 15px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in;background:#000000bf!important}#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,.live-room-app #sidebar-vm,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.login-tip{display:none!important}.monkey-auto-web-fullScreen ul,.monkey-auto-web-fullScreen li{font-size:24px;list-style-type:none}.monkey-auto-web-fullScreen input{width:24px;height:24px;vertical-align:bottom}.monkey-auto-web-fullScreen label{display:flex;align-items:center;justify-content:space-between;padding-top:15px} ');

(function () {
  'use strict';

  const positions = Object.freeze({
    bottomLeft: "bottom: 17%; left: 10px;",
    bottomRight: "bottom: 17%; right: 10px;",
    center: "top: 50%; left: 50%; transform: translate(-50%, -50%);"
  });
  const ONE_SECOND = 1e3;
  const constants = Object.freeze({
    EMPTY: "",
    DEF_PLAY_RATE: 1,
    MAX_PLAY_RATE: 16,
    ONE_SEC: ONE_SECOND,
    SHOW_TOAST_TIME: ONE_SECOND * 5,
    SHOW_TOAST_POSITION: positions.bottomLeft,
    MSG_SOURCE: "SCRIPTS_AUTO_WEB_FULLSCREEN",
    QQ_VID_REG: /v.qq.com\/x/,
    ACFUN_VID_REG: /acfun.cn\/v/,
    IQIYI_VID_REG: /iqiyi.com\/v_*/,
    BILI_VID_REG: /bilibili.com\/video/,
    SYMBOL: Object.freeze({
      ADD: "+",
      SUBTRACT: "-",
      MULTIPLY: "×",
      DIVIDE: "÷"
    })
  });
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const { ONE_SEC: ONE_SEC$2, MSG_SOURCE: MSG_SOURCE$1 } = constants;
  const Tools = {
    isTopWin: () => window.top === window,
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top) => _unsafeWindow.top.scrollTo({ top }),
    query: (selector, context) => (context || document).querySelector(selector),
    querys: (selector, context) => (context || document).querySelectorAll(selector),
    validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
    triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE$1, ...data }, "*"),
    isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
    log: (...data) => console.log(...["%c======= 脚本日志 =======\n\n", "color:green;font-size:14px;", ...data, "\n\n"]),
    alert: (...data) => window.alert(data.join(" ")),
    getFrames() {
      return this.querys("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])");
    },
    postMsgToFrames(data) {
      this.getFrames().forEach((iframe) => this.postMessage(iframe.contentWindow, data));
    },
    debounce(fn, delay = ONE_SEC$2) {
      let timer;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
      };
    },
    getElementRect(element) {
      return element?.getBoundingClientRect();
    },
    getElementCenterPoint(element) {
      const { top, left, width, height } = this.getElementRect(element);
      return { centerX: left + width / 2, centerY: top + height / 2 };
    },
    isPointInElementRect(pointX, pointY, element) {
      const { top, left, right, bottom } = this.getElementRect(element);
      return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
    },
    triggerMousemove(element) {
      const offsetWidth = element.offsetWidth;
      const { centerY } = this.getElementCenterPoint(element);
      for (let clientX = 0; clientX < offsetWidth; clientX += 10) {
        this.dispatchMousemove(element, clientX, centerY);
      }
    },
    dispatchMousemove(element, clientX, clientY) {
      const dict = { clientX, clientY, bubbles: true };
      const mousemove = new MouseEvent("mousemove", dict);
      element.dispatchEvent(mousemove);
    },
    triggerHoverEvent(element) {
      if (!element) return;
      this.log("网页全屏元素：", element);
      const { centerX, centerY } = this.getElementCenterPoint(element);
      const dict = { clientX: centerX, clientY: centerY, bubbles: true };
      const mouseover = new MouseEvent("mouseover", dict);
      element?.dispatchEvent(mouseover);
    },
    triggerEscapeEvent() {
      const dict = { key: "Escape", keyCode: 27, bubbles: true };
      const keydown = new KeyboardEvent("keydown", dict);
      document.body?.dispatchEvent(keydown);
    },
    createObserver(target, callback) {
      target = target instanceof HTMLElement ? target : this.query(target);
      const options = { attributes: true, childList: true, subtree: true };
      const observer = new MutationObserver(callback);
      observer.observe(target, options);
      return observer;
    },
    closest(element, selector, maxLevel = 3) {
      let curLevel = 0;
      while (element && curLevel < maxLevel) {
        if (element.matches(selector)) return element;
        element = element.parentElement;
        curLevel++;
      }
      return null;
    },
    findSiblingInParent(element, selector, maxLevel = 3) {
      let curLevel = 0;
      let curParent = element.parentElement;
      while (curParent && curLevel < maxLevel) {
        const sibs = curParent.children;
        for (let sib of sibs) {
          if (sib !== element && sib.matches(selector)) return sib;
        }
        curParent = curParent.parentElement;
        curLevel++;
      }
      return null;
    },
    hasSiblings(element) {
      return element.parentElement.children.length > 1;
    },
    extractNumbers(str) {
      const numbers = str.match(/\d+/g);
      return numbers ? numbers.map(Number) : [];
    },
    compareUrls(url1, url2) {
      const parseUrl = (url) => {
        const parsed = new URL(url);
        return parsed.host + parsed.pathname + parsed.search + parsed.hash;
      };
      return parseUrl(url1) === parseUrl(url2);
    }
  };
  const { EMPTY: EMPTY$2, QQ_VID_REG, BILI_VID_REG, IQIYI_VID_REG, ACFUN_VID_REG } = constants;
  const matches = _GM_info.script.matches.filter((match) => match !== "*://*/*").map((match) => new RegExp(match.replace(/\*/g, "\\S+")));
  const webSite = {
    isDouyu: () => location.host === "v.douyu.com",
    isBili: () => BILI_VID_REG.test(location.href),
    isTencent: () => QQ_VID_REG.test(location.href),
    isIqiyi: () => IQIYI_VID_REG.test(location.href),
    isAcFun: () => ACFUN_VID_REG.test(location.href),
    isLivePage: () => location.href.includes("live"),
    isBiliLive: () => location.host === "live.bilibili.com",
    inMatches: () => matches.some((matche) => matche.test(location.href.replace(location.search, EMPTY$2)))
  };
  const selectorConfig = {
    "live.bilibili.com": { webfull: "#businessContainerElement" },
    "www.bilibili.com": { webfull: "div[aria-label='网页全屏']", next: ".bpx-player-ctrl-next" },
    "live.acfun.cn": { full: ".fullscreen-screen", webfull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "tv.sohu.com": { full: ".x-fullscreen-btn", webfull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
    "haokan.baidu.com": { full: ".art-icon-fullscreen", webfull: ".art-control-fullscreenWeb", next: ".art-control-next" },
    "www.iqiyi.com": { full: ".iqp-btn-fullscreen", webfull: ".iqp-btn-webscreen", danmaku: "#barrage_switch", next: ".iqp-btn-next" },
    "www.mgtv.com": { full: ".fullscreenBtn i", webfull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    "v.qq.com": { full: ".txp_btn_fullscreen", webfull: "div[aria-label='网页全屏']", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
    "v.pptv.com": { full: ".w-zoom-container > div", webfull: ".w-expand-container > div", danmaku: ".w-barrage", next: ".w-next-container" },
    "www.acfun.cn": { full: ".fullscreen-screen", webfull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part .control-btn" },
    "v.youku.com": { full: "#fullscreen-icon", webfull: "#webfullscreen-icon", danmaku: "div[class*='switch-img_12hDa turn-']", next: ".kui-next-icon-0" }
  };
  const douyu = {
    getRoot() {
      return document.querySelector("demand-video").shadowRoot;
    },
    getControllerBar() {
      return this.getRoot().querySelector("#demandcontroller-bar").shadowRoot;
    },
    getVideo() {
      return this.getRoot().querySelector("video");
    },
    play() {
      this.getControllerBar().querySelector(".ControllerBarPlay")?.click();
    },
    pause() {
      this.getControllerBar().querySelector(".ControllerBarStop")?.click();
    },
    getWebfullIcon() {
      return this.getControllerBar().querySelector(".ControllerBar-PageFull-Icon");
    },
    getFullIcon() {
      return this.getControllerBar().querySelector(".ControllerBar-WindowFull-Icon");
    },
    getDanmakuIcon() {
      return document.querySelector("demand-player-extension").shadowRoot.querySelector(".BarrageSwitch-icon");
    },
    addStyle() {
      const root = this.getRoot();
      let style = root.querySelector("style");
      if (style) return;
      style = document.createElement("style");
      style.textContent = `
      .showToast {
        color: #fff !important;
        font-size: 13.5px !important;
        padding: 5px 15px !important;
        border-radius: 5px !important;
        position: absolute !important;
        z-index: 2147483647 !important;
        font-weight: normal !important;
        transition: opacity 500ms ease-in;
        background: rgba(0, 0, 0, 0.75) !important;
      }
    `;
      root.prepend(style);
    }
  };
  const VideoListenerHandler = {
    loadedmetadata() {
      this.volume = 1;
      this.isToast = false;
      this.isWebFullScreen = false;
    },
    loadeddata() {
      this.volume = 1;
      this.isToast = false;
      this.isWebFullScreen = false;
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      App.experimentWebFullScreen(this);
      if (App.isClosedPlayRate()) return;
      if (!webSite.isIqiyi()) this.isToast = false;
      const playRate = App.getCachePlayRate();
      if (this.isToast || this.playbackRate === playRate) return;
      App.setPlayRate(playRate);
      this.isToast = true;
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
      this.isToast = false;
      if (!webSite.isBili() && !webSite.isAcFun()) return;
      const pod = Tools.query(".video-pod");
      const pods = Tools.querys('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (!pod || !!pods.length) App.exitWebFullScreen();
    }
  };
  const { EMPTY: EMPTY$1, ONE_SEC: ONE_SEC$1, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = constants;
  const App = {
    init() {
      this.setupVisibleListener();
      this.setupKeydownListener();
      this.setupMutationObserver();
      this.setupUrlChangeListener();
      this.setupMouseMoveListener();
    },
    normalWebsite() {
      return !this.videoCenterPoint;
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
        history[method] = function() {
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
        if (video?.play && !!video.offsetWidth) this.setupVideoListener();
        if (!webSite.inMatches() && this.video) return observer.disconnect();
        if (!video?.play || !this.element || !this.webFullScreen(video)) return;
        observer.disconnect();
        this.biliLiveExtras();
        this.webSiteLoginObserver();
      });
      setTimeout(() => observer.disconnect(), ONE_SEC$1 * 10);
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
      this.healthID = setInterval(() => this.getPlayingVideo(), ONE_SEC$1);
    },
    getPlayingVideo() {
      const videos = Tools.querys("video");
      for (const video of videos) {
        const isWiderThanWindow = video.offsetWidth > window.innerWidth;
        if (this.video === video || video.paused || !Tools.validDuration(video) || isWiderThanWindow) continue;
        return this.addVideoEvtListener(video);
      }
    },
    setVideoCenterPoint(video) {
      const videoCenterPoint = { ...Tools.getElementCenterPoint(video) };
      this.setParentFrameSrc(videoCenterPoint);
    },
    setParentFrameSrc(videoCenterPoint) {
      this.videoCenterPoint = videoCenterPoint;
      if (Tools.isTopWin()) return this.setupScriptMenuCommand();
      videoCenterPoint.frameSrc = location.href;
      Tools.postMessage(window.parent, { videoCenterPoint });
    },
    setupMouseMoveListener() {
      if (this.isSetupMouseMoveListener) return;
      const delay = ONE_SEC$1 * 2;
      this.isSetupMouseMoveListener = true;
      let timer = setTimeout(this.showOrHideCursor, delay);
      document.addEventListener("mousemove", (event) => {
        if (!event.isTrusted) return;
        clearTimeout(timer);
        const target = event.target;
        this.showOrHideCursor(false);
        timer = setTimeout(this.showOrHideCursor, delay);
        if (this.video === target || !(target instanceof HTMLVideoElement)) return;
        this.addVideoEvtListener(target);
      });
    },
    showOrHideCursor(isHide = true) {
      Tools.querys(":is(video, iframe)").forEach((ele) => {
        isHide ? ele.style.cursor = "none" : ele.style.cursor = EMPTY$1;
      });
      if (!isHide) return;
      const mouseleave = new MouseEvent("mouseleave");
      Tools.querys("body *").forEach((ele) => ele.dispatchEvent(mouseleave));
    },
    showToast(content, duration = SHOW_TOAST_TIME) {
      if (webSite.isDouyu()) douyu.addStyle();
      const el = document.createElement("div");
      if (content instanceof HTMLElement) el.appendChild(content);
      if (Object.is(typeof content, typeof EMPTY$1)) el.textContent = content;
      el.setAttribute("class", "showToast");
      el.setAttribute("style", SHOW_TOAST_POSITION);
      const videoParent = this.video?.parentElement;
      const videoContainer = this.getVideoContainer();
      const target = this.video === videoContainer ? videoParent : videoContainer;
      Tools.query(".showToast", target)?.remove();
      target?.appendChild(el);
      setTimeout(() => {
        el.style.opacity = 0;
        setTimeout(() => el.remove(), ONE_SEC$1 / 3);
      }, duration);
    }
  };
  const setStorage = function(value) {
    _GM_setValue(this.name, value);
  };
  const getStorage = function(defaultValue) {
    return _GM_getValue(this.name, defaultValue);
  };
  const storage = {
    CACHED_PLAY_RATE: Object.freeze({
      name: "FENY_SCRIPTS_V_PLAYBACK_RATE",
      set(value) {
        localStorage.setItem(this.name, value);
      },
      get() {
        return localStorage.getItem(this.name);
      }
    }),
    PLAY_RATE_STEP: Object.freeze({
      name: "PLAY_RATE_STEP",
      set: setStorage,
      get() {
        return Number.parseFloat(getStorage.bind(this, 0.25)());
      }
    }),
    CLOSE_PLAY_RATE: Object.freeze({
      name: "CLOSE_PLAY_RATE",
      set: setStorage,
      get() {
        return getStorage.bind(this, false)();
      }
    }),
    VIDEO_FASTFORWARD_DURATION: Object.freeze({
      name: "VIDEO_FASTFORWARD_DURATION",
      set: setStorage,
      get() {
        return Number.parseInt(getStorage.bind(this, 30)());
      }
    }),
    VIDEO_TIME_STEP: Object.freeze({
      name: "VIDEO_TIME_STEP",
      set: setStorage,
      get() {
        return Number.parseInt(getStorage.bind(this, 5)());
      }
    }),
    CLOSE_AUTO_WEB_FULL_SCREEN: Object.freeze({
      name: "CLOSE_AUTO_WEB_FULL_SCREEN",
      set: setStorage,
      get() {
        return getStorage.bind(this, false)();
      }
    }),
    OVERRIDE_KEYBOARD: Object.freeze({
      name: "OVERRIDE_KEYBOARD",
      set: setStorage,
      get() {
        return getStorage.bind(this, false)();
      }
    })
  };
  const eventCode = Object.freeze({
    KeyA: "KeyA",
    KeyD: "KeyD",
    KeyF: "KeyF",
    KeyN: "KeyN",
    KeyP: "KeyP",
    KeyS: "KeyS",
    KeyZ: "KeyZ",
    Space: "Space",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    NumpadAdd: "NumpadAdd",
    NumpadSubtract: "NumpadSubtract"
  });
  const { VIDEO_TIME_STEP: VIDEO_TIME_STEP$1, VIDEO_FASTFORWARD_DURATION: VIDEO_FASTFORWARD_DURATION$1 } = storage;
  const { EMPTY, SYMBOL: SYMBOL$1, MSG_SOURCE } = constants;
  const KeydownHandler = {
    preventDefault(event) {
      const overrideKey = [eventCode.Space, eventCode.ArrowLeft, eventCode.ArrowRight];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isClosedPlayRate();
      if (!isNumberKey && !isOverrideKey) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    },
    setupKeydownListener() {
      window.addEventListener("keyup", (event) => this.preventDefault(event), true);
      window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
      window.addEventListener("message", (event) => {
        const { data } = event;
        if (!data?.source || !data.source.includes(MSG_SOURCE)) return;
        if (data?.topWinInfo) this.topWinInfo = data.topWinInfo;
        if (data?.defaultPlayRate) this.defaultPlayRate();
        if (data?.videoCenterPoint) return this.setParentFrameSrc(data.videoCenterPoint);
        this.processEvent(data);
      });
    },
    keydownHandler(event) {
      if (this.normalWebsite()) return;
      let key = event.key.toUpperCase();
      const { code, target, shiftKey } = event;
      if (["INPUT", "TEXTAREA", "DEMAND-SEARCH-BOX"].includes(target.tagName)) return;
      if (!Object.keys(eventCode).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      if (eventCode.Space === code) key = eventCode.Space.toUpperCase();
      if (shiftKey && eventCode.NumpadAdd === code) key = SYMBOL$1.MULTIPLY;
      if (shiftKey && eventCode.NumpadSubtract === code) key = SYMBOL$1.DIVIDE;
      if (!Tools.isTopWin() && (eventCode.KeyP === code || eventCode.KeyN === code)) {
        return Tools.postMessage(window.top, { key });
      }
      this.processEvent({ key });
    },
    processEvent(data) {
      if (!this.video) Tools.postMsgToFrames(data);
      if (data?.key) this.execHotKeyActions(data.key);
    },
    execHotKeyActions(key) {
      if (this.normalWebsite()) return;
      const keyMapping = this.getKeyMapping();
      if (keyMapping[key]) return keyMapping[key]();
      if (Tools.isNumber(key)) this.setPlayRate(key);
    },
    getKeyMapping() {
      return {
        Z: () => this.defaultPlayRate(),
        A: () => this.adjustPlayRate(SYMBOL$1.ADD),
        S: () => this.adjustPlayRate(SYMBOL$1.SUBTRACT),
        [SYMBOL$1.ADD]: () => this.adjustPlayRate(SYMBOL$1.ADD),
        [SYMBOL$1.DIVIDE]: () => this.adjustPlayRate(SYMBOL$1.DIVIDE),
        [SYMBOL$1.SUBTRACT]: () => this.adjustPlayRate(SYMBOL$1.SUBTRACT),
        [SYMBOL$1.MULTIPLY]: () => this.adjustPlayRate(SYMBOL$1.MULTIPLY),
        N: () => webSite.inMatches() ? this.triggerIconElement("next") : this.switchNextEpisode(),
        F: () => webSite.isDouyu() ? douyu.getFullIcon().click() : this.triggerIconElement("full", 0),
        D: () => webSite.isDouyu() ? douyu.getDanmakuIcon().click() : this.triggerIconElement("danmaku", 3),
        ARROWLEFT: () => this.isOverrideKeyboard() ? this.adjustVideoTime(SYMBOL$1.SUBTRACT) : null,
        ARROWRIGHT: () => this.isOverrideKeyboard() ? this.adjustVideoTime() : null,
        0: () => this.adjustVideoTime(VIDEO_FASTFORWARD_DURATION$1.get()),
        P: () => {
          if (!webSite.inMatches()) return this.enhance();
          if (webSite.isDouyu()) return douyu.getWebfullIcon().click();
          webSite.isBiliLive() ? this.biliLiveWebFullScreen() : this.triggerIconElement("webfull");
        },
        SPACE: () => {
          if (!this.video || !this.isOverrideKeyboard()) return;
          if (webSite.isDouyu()) return this.video.paused ? douyu.play() : douyu.pause();
          this.video.paused ? this.video.play() : this.video.pause();
        }
      };
    },
    triggerIconElement(name, index) {
      if (!webSite.inMatches()) return;
      if (webSite.isBiliLive()) return this.getBiliLiveIcons()?.[index]?.click();
      Tools.query(selectorConfig[location.host]?.[name])?.click();
      Tools.triggerMousemove(this.video);
    },
    adjustVideoTime(second = VIDEO_TIME_STEP$1.get(), _symbol) {
      if (!this.video || !Tools.validDuration(this.video)) return;
      if (_symbol && ![SYMBOL$1.ADD, SYMBOL$1.SUBTRACT].includes(_symbol)) return;
      if (Object.is(typeof second, typeof EMPTY) && !_symbol) {
        _symbol = second;
        second = VIDEO_TIME_STEP$1.get();
      }
      second = Object.is(SYMBOL$1.SUBTRACT, _symbol) ? -second : second;
      const currentTime = this.video.currentTime + second;
      this.video.currentTime = Math.max(0, currentTime);
    }
  };
  const {
    PLAY_RATE_STEP: PLAY_RATE_STEP$1,
    CLOSE_PLAY_RATE,
    VIDEO_TIME_STEP,
    OVERRIDE_KEYBOARD,
    CLOSE_AUTO_WEB_FULL_SCREEN,
    VIDEO_FASTFORWARD_DURATION
  } = storage;
  const CLOSE_OTHER_WEBSITES_AUTO = "CLOSE_OTHER_WEBSITES_AUTO_";
  const MenuCommandHandler = {
    isClosedPlayRate: () => CLOSE_PLAY_RATE.get(),
    isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
    isClosedAuto: () => CLOSE_AUTO_WEB_FULL_SCREEN.get(),
    isClosedOtherWebsiteAuto() {
      const host = Tools.isTopWin() ? location.host : this.topWinInfo.host;
      return _GM_getValue(CLOSE_OTHER_WEBSITES_AUTO + host, true);
    },
    setupScriptMenuCommand() {
      if (!Tools.isTopWin()) return;
      this.registerMenuCommand();
      this.setupCommandChangeListener();
      const topWinInfo = this.topWinInfo = { innerWidth, host: location.host };
      Tools.postMsgToFrames({ topWinInfo });
    },
    registerMenuCommand() {
      this.registerClosePlayRate();
      this.registerPlayRateCommand();
      this.registerVideoTimeCommand();
      this.registerFastforwardCommand();
      this.registerCloseAutoFullCommand();
      this.registerOverrideKeyboardCommand();
      this.registerCloseAutoExperimentCommand();
    },
    setupCommandChangeListener() {
      if (this.isSetupCommandChangeListener) return;
      const handler = () => this.registerMenuCommand();
      [
        CLOSE_PLAY_RATE.name,
        OVERRIDE_KEYBOARD.name,
        CLOSE_AUTO_WEB_FULL_SCREEN.name,
        CLOSE_OTHER_WEBSITES_AUTO + window.top.location.host
      ].forEach((key) => _GM_addValueChangeListener(key, handler));
      this.isSetupCommandChangeListener = true;
    },
    registerClosePlayRate() {
      const isClose = this.isClosedPlayRate();
      const title = isClose ? "启用倍速功能" : "禁用倍速功能";
      _GM_unregisterMenuCommand(this.close_play_rate_command_id);
      this.close_play_rate_command_id = _GM_registerMenuCommand(title, () => {
        CLOSE_PLAY_RATE.set(!isClose);
        if (!isClose) Tools.postMessage(window, { defaultPlayRate: true });
      });
    },
    registerPlayRateCommand() {
      const title = "设置倍速步进";
      _GM_unregisterMenuCommand(this.play_rate_command_id);
      if (this.isClosedPlayRate()) return;
      this.play_rate_command_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, PLAY_RATE_STEP$1.get());
        if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP$1.set(input);
      });
    },
    registerVideoTimeCommand() {
      const title = "设置快进/退秒数";
      _GM_unregisterMenuCommand(this.video_time_command_id);
      if (!this.isOverrideKeyboard()) return;
      this.video_time_command_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, VIDEO_TIME_STEP.get());
        if (!isNaN(input) && Number.parseInt(input)) VIDEO_TIME_STEP.set(input);
      });
    },
    registerFastforwardCommand() {
      const title = "设置零键快进秒数";
      _GM_unregisterMenuCommand(this.fastforward_command_id);
      this.fastforward_command_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, VIDEO_FASTFORWARD_DURATION.get());
        if (!isNaN(input) && Number.parseInt(input)) VIDEO_FASTFORWARD_DURATION.set(input);
      });
    },
    registerCloseAutoFullCommand() {
      if (!webSite.inMatches()) return;
      const isClose = this.isClosedAuto();
      const title = isClose ? "启用自动网页全屏" : "禁用自动网页全屏";
      _GM_unregisterMenuCommand(this.close_auto_command_id);
      this.close_auto_command_id = _GM_registerMenuCommand(title, () => CLOSE_AUTO_WEB_FULL_SCREEN.set(!isClose));
    },
    registerOverrideKeyboardCommand() {
      const isOverride = this.isOverrideKeyboard();
      const title = isOverride ? "禁用 空格 ◀▶ 键控制" : "启用 空格 ◀▶ 键控制";
      _GM_unregisterMenuCommand(this.override_keyboard_command_id);
      this.override_keyboard_command_id = _GM_registerMenuCommand(title, () => OVERRIDE_KEYBOARD.set(!isOverride));
    },
    registerCloseAutoExperimentCommand() {
      if (webSite.inMatches()) return;
      const videos = Array.from(Tools.querys("video")).filter((video) => !isNaN(video));
      if (videos.length > 1) return;
      const isClose = this.isClosedOtherWebsiteAuto();
      const title = isClose ? "此站点启用自动网页全屏" : "此站点禁用自动网页全屏";
      _GM_unregisterMenuCommand(this.close_experiment_command_id);
      this.close_experiment_command_id = _GM_registerMenuCommand(title, () => {
        _GM_setValue(CLOSE_OTHER_WEBSITES_AUTO + location.host, !isClose);
      });
    }
  };
  const { ONE_SEC } = constants;
  const WebSiteLoginHandler = {
    webSiteLoginObserver() {
      this.handleIqyLogin();
      this.handleBiliLogin();
      this.handleTencentLogin();
    },
    loginObserver(target, matches2, clickTarget) {
      return Tools.createObserver(target, (mutations, observer) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length === 0) return;
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (!node.matches(matches2)) return;
            Tools.query(clickTarget)?.click();
            observer.disconnect();
          });
        });
      });
    },
    handleTencentLogin() {
      if (!webSite.isTencent()) return;
      const selector = ".main-login-wnd-module_close-button__mt9WU";
      this.loginObserver("#login_win", selector, selector);
    },
    handleIqyLogin() {
      if (!webSite.isIqiyi()) return;
      const selector = ".simple-buttons_close_btn__6N7HD";
      this.loginObserver("#qy_pca_login_root", selector, selector);
      Tools.createObserver(".cd-time", () => {
        const selector2 = ":is([id*='mask-layer'], #modal-vip-cashier-scope)";
        Tools.querys(selector2).forEach((el) => el.remove());
        Tools.query(".simple-buttons_close_btn__6N7HD")?.click();
        const adTime = Tools.query(".public-time");
        if (adTime.style.display === "none") return;
        if (this.video.currentTime !== this.video.duration) return;
        Tools.querys("*:not(.public-vip)", adTime).forEach((el) => el.click());
      });
    },
    handleBiliLogin() {
      if (!webSite.isBili()) return;
      if (document.cookie.includes("DedeUserID")) return _unsafeWindow.player?.requestQuality(80);
      setTimeout(() => {
        _unsafeWindow.__BiliUser__.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
      }, ONE_SEC * 3);
    }
  };
  const WebFullScreenHandler = {
    webFullScreen(video) {
      const w = video?.offsetWidth || 0;
      if (Object.is(0, w)) return false;
      if (this.isClosedAuto()) return true;
      if (w >= window.innerWidth) return true;
      if (!webSite.isBiliLive()) return Tools.triggerClick(this.element);
      return this.biliLiveWebFullScreen();
    },
    biliLiveWebFullScreen() {
      const control = this.getBiliLiveIcons();
      if (control.length === 0) return false;
      Tools.scrollTop(70);
      const el = Tools.query(":is(.lite-room, #player-ctnr)", _unsafeWindow.top.document);
      if (el) Tools.scrollTop(Tools.getElementRect(el)?.top || 0);
      return Tools.triggerClick(control[1]);
    },
    exitWebFullScreen() {
      if (window.innerWidth === this.video.offsetWidth) this.getElement()?.click();
      const cancelButton = Tools.query(".bpx-player-ending-related-item-cancel");
      if (cancelButton) setTimeout(() => cancelButton.click(), 100);
    },
    biliLiveExtras() {
      _unsafeWindow.top?.livePlayer?.volume(100);
      _unsafeWindow.top?.livePlayer?.switchQuality("10000");
      localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0);
      document.body.classList.add("hide-asida-area", "hide-aside-area");
    },
    getBiliLiveIcons() {
      const video = this.getVideo();
      if (!video) return [];
      Tools.triggerMousemove(video);
      return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
    },
    experimentWebFullScreen(video) {
      if (webSite.inMatches() || video.isWebFullScreen || !this.topWinInfo || this.isClosedOtherWebsiteAuto()) return;
      if (video.offsetWidth === this.topWinInfo.innerWidth) return video.isWebFullScreen = true;
      window.top.focus();
      video.isWebFullScreen = true;
      Tools.postMessage(window.top, { key: "P" });
    }
  };
  const SwitchEpisodeHandler = {
    switchPrevEpisode: function() {
      this.handleEpisodeChange(this.getPrevEpisode);
    },
    switchNextEpisode: function() {
      this.handleEpisodeChange(this.getNextEpisode);
    },
    handleEpisodeChange(getTargetEpisode) {
      if (!Tools.isTopWin()) return;
      let curEpisode = this.getCurrentEpisode();
      if (!curEpisode) curEpisode = this.getCurrentEpisodeFromAllLink();
      const targetEpisode = getTargetEpisode.call(this, curEpisode);
      this.jumpToEpisodeNumber(targetEpisode);
    },
    getCurrentEpisode() {
      const ele = this.getCurrentEpisodeLinkElement();
      return this.getCurrentEpisodeContainer(ele);
    },
    getCurrentEpisodeLinkElement() {
      const href = location.href;
      const path = location.pathname;
      const lastPath = path.substring(path.lastIndexOf("/") + 1);
      const links = Array.from(Tools.querys(`:is(a[href*="${path}"], a[href*="${lastPath}"])`));
      if (links.length == 1) return links.shift();
      const filter = [
        "h1",
        "header",
        "[id*='history']",
        "[class*='lishi']",
        "[class*='record']",
        "[class*='history']",
        "[class*='tab-item']"
      ];
      return links.find((link) => {
        const linkUrl = new URL(link.href);
        if (Tools.closest(link, `:is(${filter})`, 5)) return false;
        if (!Object.is(href, link.href) && !Object.is(path, linkUrl.pathname)) return false;
        return !!this.getEpisodeNumber(link);
      });
    },
    getEpisodeNumber(element) {
      return Tools.extractNumbers(element.innerText).shift();
    },
    getPrevEpisode(element) {
      const curNumber = this.getEpisodeNumber(element);
      return this.getEpisodeNumberContainer(element, curNumber - 1);
    },
    getNextEpisode(element) {
      const curNumber = this.getEpisodeNumber(element);
      return this.getEpisodeNumberContainer(element, curNumber + 1);
    },
    getEpisodeNumberContainer(element, targetNumber) {
      const allEpisode = this.getAllEpisodeElement(element);
      for (const episode of allEpisode) {
        if (element === episode) continue;
        const episodeNumber = Tools.extractNumbers(episode.innerText).shift();
        if (targetNumber === episodeNumber) return episode;
      }
    },
    getAllEpisodeElement(element) {
      const tagName = element.tagName;
      const sibling = Tools.findSiblingInParent(element, tagName);
      const children = Array.from(sibling.parentElement.children);
      return children.filter((ele) => ele.tagName === tagName);
    },
    jumpToEpisodeNumber(element) {
      const stack = [element];
      while (stack.length > 0) {
        const currentElement = stack.pop();
        if (!(currentElement instanceof HTMLElement)) continue;
        if (currentElement instanceof HTMLAnchorElement) {
          currentElement.click();
        }
        const children = Array.from(currentElement.children).reverse();
        for (const child of children) {
          stack.push(child);
        }
      }
    },
    getCurrentEpisodeContainer(element) {
      while (element) {
        const parentEle = element.parentElement;
        const hasLink = Tools.querys(element.tagName, parentEle).filter((el) => el !== element);
        const hasSiblings = Tools.hasSiblings(element);
        if (hasSiblings && !!hasLink.length) return element;
        element = parentEle;
      }
      return element;
    },
    getCurrentEpisodeFromAllLink() {
      const path = location.pathname;
      const lastPath = path.substring(path.lastIndexOf("/") + 1);
      const curNumber = [...Tools.extractNumbers(lastPath)].join("");
      for (const link of Tools.querys("a")) {
        const attrs = link.attributes;
        for (const attr of attrs) {
          const attrNumbers = [...Tools.extractNumbers(attr.value)].join("");
          if (attrNumbers === curNumber) return link;
        }
      }
    }
  };
  const ScriptsEnhanceHandler = {
    enhance() {
      if (!this.videoCenterPoint) return;
      const ele = this.getHoverElement();
      Tools.triggerHoverEvent(ele);
      Tools.triggerEscapeEvent();
      this.backupTrigger();
    },
    backupTrigger() {
      if (!this.video || this.videoCenterPoint.frameSrc) return;
      let oldWidth = this.video.oldWidth;
      let newWidth = this.video.offsetWidth;
      if (!Object.is(oldWidth, newWidth)) return;
      Tools.query("#playerControlBtn")?.click();
      if (!Object.is(newWidth, this.video.offsetWidth)) return;
      Tools.query("#playerControlBtn")?.click();
    },
    getHoverElement() {
      if (this.video) return this.getVideoContainer();
      const iframe = this.getVideoIframe();
      if (iframe) return iframe;
      const { centerX, centerY } = this.videoCenterPoint;
      const iframes = Tools.getFrames();
      for (const element of iframes) {
        if (!Tools.isVisible(element)) continue;
        if (Tools.isPointInElementRect(centerX, centerY, element)) return element;
      }
    },
    getVideoContainer() {
      const video = this.video;
      video.oldWidth = video.offsetWidth;
      const parentEle = video?.parentElement;
      const control = this.getVideoControls(video);
      const player = this.getVideoPlayer(parentEle);
      const videoContainer = player || control?.parentElement;
      if (!videoContainer) return video;
      if (this.videoCenterPoint.frameSrc) return videoContainer;
      const videoWidth = video.offsetWidth;
      const wrapWidth = videoContainer.offsetWidth;
      return wrapWidth !== videoWidth ? video : videoContainer;
    },
    getVideoPlayer(target) {
      const selector = [
        ".video-js",
        '[class*="wrap"]',
        '[class*="video"]',
        '[class*="Player"]',
        '[class*="player"]',
        '[aria-label="视频播放器"]',
        '[aria-label="Video Player"]'
      ];
      return Tools.closest(target, `:is(${selector})`);
    },
    getVideoControls(element) {
      const selector = ['[class*="Control"]', '[class*="control"]'];
      return Tools.findSiblingInParent(element, selector);
    }
  };
  const { PLAY_RATE_STEP, CACHED_PLAY_RATE } = storage;
  const { SYMBOL, DEF_PLAY_RATE, MAX_PLAY_RATE } = constants;
  const strategy = {
    [SYMBOL.MULTIPLY]: (playRate) => playRate * 2,
    [SYMBOL.DIVIDE]: (playRate) => playRate / 2,
    [SYMBOL.ADD]: (playRate) => playRate + PLAY_RATE_STEP.get(),
    [SYMBOL.SUBTRACT]: (playRate) => playRate - PLAY_RATE_STEP.get()
  };
  const VideoPlaybackRateHandler = {
    checkUsable() {
      if (!this.video) return false;
      if (webSite.isLivePage()) return false;
      if (this.isClosedPlayRate()) return false;
      if (!Tools.validDuration(this.video)) return false;
      return true;
    },
    toFixed(playRate) {
      playRate = Number.parseFloat(playRate);
      return playRate.toFixed(2).replace(/\.?0+$/, "");
    },
    setPlayRate(playRate) {
      if (!this.checkUsable()) return;
      this.video.playbackRate = this.toFixed(playRate);
      this.cachePlayRate();
      this.playRateToast();
    },
    adjustPlayRate(_symbol) {
      if (!this.checkUsable()) return;
      let playRate = this.video.playbackRate;
      playRate = strategy[_symbol](playRate);
      playRate = Math.max(PLAY_RATE_STEP.get(), playRate);
      playRate = Math.min(MAX_PLAY_RATE, playRate);
      this.setPlayRate(playRate);
    },
    defaultPlayRate() {
      if (!this.video) return;
      this.video.playbackRate = DEF_PLAY_RATE;
      if (this.isClosedPlayRate()) return;
      this.cachePlayRate();
      this.showToast("已恢复正常倍速播放");
    },
    cachePlayRate() {
      CACHED_PLAY_RATE.set(this.video.playbackRate);
    },
    getCachePlayRate: () => Number.parseFloat(CACHED_PLAY_RATE.get() || DEF_PLAY_RATE),
    playRateToast() {
      const span = document.createElement("span");
      span.appendChild(document.createTextNode("正在以"));
      const child = span.cloneNode(true);
      child.textContent = `${this.video.playbackRate}x`;
      child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
      span.appendChild(child);
      span.appendChild(document.createTextNode("倍速播放"));
      this.showToast(span);
    }
  };
  const logicHandlers = [
    { handler: KeydownHandler },
    { handler: MenuCommandHandler },
    { handler: WebSiteLoginHandler },
    { handler: WebFullScreenHandler },
    { handler: SwitchEpisodeHandler },
    { handler: VideoPlaybackRateHandler },
    { handler: ScriptsEnhanceHandler }
  ];
  logicHandlers.forEach(({ handler }) => {
    for (const key of Object.keys(handler)) {
      const method = handler[key];
      method instanceof Function ? App[key] = method.bind(App) : App[key] = method;
    }
  });
  App.init();
  _unsafeWindow.MONKEY_WEB_FULLSCREEN = App;

})();