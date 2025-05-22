// ==UserScript==
// @name         视频网站自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      2.8.0
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
// @require      https://unpkg.com/notyf@3.10.0/notyf.min.js
// @require      data:application/javascript,%3Bwindow.notyf%3D%7BNotyf%7D%3B
// @require      https://unpkg.com/sweetalert2@11.20.0/dist/sweetalert2.min.js
// @require      data:application/javascript,%3Bwindow.sweetalert2%3DSwal%3B
// @resource     notyf/notyf.min.css  https://unpkg.com/notyf@3.10.0/notyf.min.css
// @resource     sweetalert2          https://unpkg.com/sweetalert2@11.20.0/dist/sweetalert2.min.css
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        unsafeWindow
// @run-at       document-body
// @note         *://*/*
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' @charset "UTF-8";[part=monkey-show-toast],::part(monkey-show-toast){color:#fff!important;font-size:13.5px!important;padding:5px 15px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in;background:#000000bf!important}#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,.live-room-app #sidebar-vm,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.login-tip{display:none!important}.monkey-web-fullscreen{z-index:9999999999!important}.monkey-web-fullscreen h2{font-size:24px}.monkey-web-fullscreen h4{color:red;margin:0 auto}.monkey-web-fullscreen p{color:#999;font-size:12px}.monkey-web-fullscreen .swal2-confirm{background-color:#7066e0!important}.monkey-web-fullscreen .swal2-deny{background-color:#dc3741!important}.monkey-web-fullscreen #monkey-picker{width:25em;height:auto;font-size:14px;margin-bottom:0;min-height:10em;resize:vertical}.monkey-web-fullscreen .hide{display:none!important}.monkey-web-fullscreen ._menuitem{font-size:20px;cursor:pointer;text-align:left;margin-bottom:15px}.monkey-web-fullscreen ._menuitem label{display:flex;cursor:pointer;align-items:center;justify-content:space-between}.monkey-web-fullscreen ._menuitem input{width:20px!important;height:20px!important;appearance:auto!important;-webkit-appearance:auto!important}.notyf{z-index:9999999999!important}.notyf .notyf__message{overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical}.player-overlay,.memory-play-wrap,.atom-notice-click,#player #loading-box,.xgplayer [id*=tips],.dplayer-notice strong,.air-player-loading-box,.art-layer-autoPlayback,.art-layer-auto-playback{display:none!important}@supports (selector(:has(div))){#loading:not(:has([class*=player])){display:none!important}}@supports not (selector(:has(div))){#loading.not-player{display:none!important}} ');

(function (notyf, Swal) {
  'use strict';

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("notyf/notyf.min.css");
  const positions = Object.freeze({
    bottomLeft: "bottom: 17%; left: 10px;",
    bottomRight: "bottom: 17%; right: 10px;",
    center: "top: 50%; left: 50%; transform: translate(-50%, -50%);"
  });
  const ONE_SECOND = 1e3;
  const Constants = Object.freeze({
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
  function isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  function isDocument(node) {
    return node.nodeType === Node.DOCUMENT_NODE;
  }
  function* getShadowRoots(node, deep) {
    if (!isElement(node) && !isDocument(node)) {
      return;
    }
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (isElement(node) && node.shadowRoot) {
      yield node.shadowRoot;
    }
    const toWalk = [node];
    let currentNode = void 0;
    while (currentNode = toWalk.pop()) {
      const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
        acceptNode(node2) {
          if (isElement(node2) && node2.shadowRoot) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        }
      });
      let walkerNode = walker.nextNode();
      while (walkerNode) {
        if (isElement(walkerNode) && walkerNode.shadowRoot) {
          {
            toWalk.push(walkerNode.shadowRoot);
          }
          yield walkerNode.shadowRoot;
        }
        walkerNode = walker.nextNode();
      }
    }
    return;
  }
  function queryCrossBoundary(selector, subject = document) {
    const immediate = subject.querySelector(selector);
    if (immediate) {
      return immediate;
    }
    const shadowRoots = [...getShadowRoots(subject)];
    for (const root of shadowRoots) {
      const child = root.querySelector(selector);
      if (child) {
        return child;
      }
    }
    return null;
  }
  function queryAllCrossBoundary(selector, subject = document) {
    const results = [...subject.querySelectorAll(selector)];
    const shadowRoots = [...getShadowRoots(subject)];
    for (const root of shadowRoots) {
      const children = root.querySelectorAll(selector);
      for (const child of children) {
        results.push(child);
      }
    }
    return results;
  }
  function querySelector(selectors, subject = document, _options) {
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    if (selectorList.length === 0) {
      return null;
    }
    let currentSubjects = [subject];
    let result = null;
    for (const selector of selectorList) {
      const newSubjects = [];
      for (const currentSubject of currentSubjects) {
        const child = queryCrossBoundary(selector, currentSubject);
        if (child) {
          result = child;
          newSubjects.push(child);
        }
      }
      if (newSubjects.length === 0) {
        return null;
      }
      currentSubjects = newSubjects;
    }
    return result;
  }
  function querySelectorAll(selectors, subject = document, _options) {
    const selectorList = Array.isArray(selectors) ? selectors : [selectors];
    if (selectorList.length === 0) {
      return [];
    }
    let currentSubjects = [subject];
    let results = [];
    for (const selector of selectorList) {
      const newSubjects = [];
      for (const currentSubject of currentSubjects) {
        const children = queryAllCrossBoundary(selector, currentSubject);
        for (const child of children) {
          newSubjects.push(child);
        }
      }
      if (newSubjects.length === 0) {
        return [];
      }
      currentSubjects = newSubjects;
      results = newSubjects;
    }
    return results;
  }
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const { ONE_SEC: ONE_SEC$2, MSG_SOURCE: MSG_SOURCE$1 } = Constants;
  const Tools = {
    isTopWin: () => window.top === window,
    noNumber: (str) => !/\d/.test(str),
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top) => _unsafeWindow.top.scrollTo({ top }),
    query: (selector, context) => querySelector(selector, context),
    querys: (selector, context) => querySelectorAll(selector, context),
    validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
    triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    postMessage: (win = null, data) => win?.postMessage({ source: MSG_SOURCE$1, ...data }, "*"),
    isVisible: (ele) => !!(ele?.offsetWidth || ele?.offsetHeight || ele?.getClientRects().length),
    log: (...data) => console.log(...["%c======= 脚本日志 =======\n\n", "color:green;font-size:14px;", ...data, "\n\n"]),
    alert: (...data) => window.alert(data.join(" ")),
    preventDefault(event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    },
    notyf(msg, isError = false) {
      const notyf$1 = new notyf.Notyf({
        duration: ONE_SEC$2 * 3,
        position: { x: "center", y: "top" }
      });
      isError ? notyf$1.error(msg) : notyf$1.success(msg);
      return false;
    },
    getFrames() {
      return this.querys("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])");
    },
    postMsgToFrames(data) {
      this.getFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
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
      let currLevel = 0;
      while (element && currLevel < maxLevel) {
        if (element.matches(selector)) return element;
        element = element.parentElement;
        currLevel++;
      }
      return null;
    },
    findSiblingInParent(element, selector, maxLevel = 3) {
      let currLevel = 0;
      let currParent = element?.parentElement;
      while (currParent && currLevel < maxLevel) {
        const sibs = currParent.children;
        for (let sib of sibs) {
          if (sib !== element && sib.matches(selector)) return sib;
        }
        currParent = currParent.parentElement;
        currLevel++;
      }
      return null;
    },
    haveSiblings(element) {
      return element?.parentElement?.children.length > 1;
    },
    extractNumbers(str) {
      if (!str) return [];
      const numbers = str.match(/\d+/g);
      return numbers ? numbers.map(Number) : [];
    },
    getParentChain(element) {
      let parents = [];
      let current = element;
      while (current && current.tagName !== "BODY") {
        const tagInfo = this.getTagInfo(current);
        parents.unshift(tagInfo);
        if (current.id && this.noNumber(current.id)) break;
        current = current.parentNode;
      }
      return parents.join(" > ");
    },
    getTagInfo(ele) {
      if (ele.id && this.noNumber(ele.id)) return `#${ele.id}`;
      const classList = ele.classList;
      let tagInfo = ele.tagName.toLowerCase();
      if (!!classList.length) {
        if (/[:\[\]]/.test(ele.className)) {
          tagInfo += `[class="${ele.className}"]`;
        } else {
          const filterClass = Array.from(classList).filter((cls) => this.noNumber(cls));
          if (!!filterClass.length) tagInfo += `.${filterClass.join(".")}`;
        }
      }
      return tagInfo;
    },
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
        hash |= 0;
      }
      return hash >>> 0;
    }
  };
  const { EMPTY: EMPTY$2, QQ_VID_REG, BILI_VID_REG, IQIYI_VID_REG, ACFUN_VID_REG } = Constants;
  const matches = _GM_info.script.matches.filter((match) => match !== "*://*/*").map((match) => new RegExp(match.replace(/\*/g, "\\S+")));
  const WebSite = {
    isDouyu: () => location.host === "v.douyu.com",
    isBili: () => BILI_VID_REG.test(location.href),
    isTencent: () => QQ_VID_REG.test(location.href),
    isIqiyi: () => IQIYI_VID_REG.test(location.href),
    isAcFun: () => ACFUN_VID_REG.test(location.href),
    isBiliLive: () => location.host === "live.bilibili.com",
    isLivePage: () => !location.host.endsWith(".live") && /\blive\b/.test(location.href),
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
    "v.youku.com": { full: "#fullscreen-icon", webfull: "#webfullscreen-icon", danmaku: "div[class*='switch-img_12hDa turn-']", next: ".kui-next-icon-0" },
    "v.douyu.com": { full: ".ControllerBar-WindowFull-Icon", webfull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" }
  };
  const VideoListenerHandler = {
    loadedmetadata() {
      this.volume = 1;
      this.hasToast = false;
      this.isWebFullScreen = false;
      Tools.querys('[id*="loading"]').filter((ele) => !Tools.query('[class*="player"]', ele)).forEach((ele) => ele.classList.add("not-player"));
    },
    loadeddata() {
      this.volume = 1;
      this.hasToast = false;
      this.isWebFullScreen = false;
      App.experWebFullScreen(this);
      App.tryplay(this);
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      Tools.query(".conplaying")?.click();
      App.useCachePlaybackRate(this);
      App.experWebFullScreen(this);
      App.useCachePlayTime(this);
      App.changeVideoInfo(this);
      App.cachePlayTime(this);
    },
    canplay() {
      App.tryplay(this);
    },
    play() {
      this.isEnded = false;
      App.webFullScreen(this);
    },
    pause() {
      Tools.query(".ec-no")?.click();
      Tools.query('[id*="loading"].not-player')?.remove();
      Tools.query('[id*="loading"]:not(:has([class*="player"]))')?.remove();
    },
    ended() {
      this.isEnded = true;
      this.hasToast = false;
      App.delCachePlayTime();
      App.exitWebFullScreen();
    }
  };
  const { EMPTY: EMPTY$1, ONE_SEC: ONE_SEC$1, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = Constants;
  const App = {
    init() {
      this.setupVisibleListener();
      this.setupKeydownListener();
      this.setupMutationObserver();
      this.setupUrlChangeListener();
      this.setupMouseMoveListener();
    },
    isLive() {
      return WebSite.isLivePage() || this.videoInfo?.isLive;
    },
    normalWebsite() {
      return !this.videoInfo;
    },
    getVideo: () => Tools.query("video:not([loop]):not([src=''])") || Tools.query("video:not([loop])"),
    getElement: () => Tools.query(selectorConfig[location.host]?.webfull),
    getVideoIframe() {
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
        this.triggerVideoStart();
        const video = this.getVideo();
        this.element = this.getElement();
        if (video?.play && !!video.offsetWidth) this.setupVideoListener();
        if (!WebSite.inMatches() && this.topInfo) return observer.disconnect();
        if (!video?.play || !this.element || !this.webFullScreen(video)) return;
        observer.disconnect();
        this.biliLiveExtras();
        this.webSiteLoginObserver();
      });
      setTimeout(() => observer.disconnect(), ONE_SEC$1 * 10);
    },
    triggerVideoStart() {
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
      const { host, href } = location;
      const topInfo = this.topInfo = { innerWidth, host, href, hash: Tools.simpleHash(href) };
      Tools.postMsgToFrames({ topInfo });
    },
    setupMouseMoveListener() {
      if (this.isMoveListener) return;
      const delay = ONE_SEC$1 * 2;
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
      const elements = Array.from([...videoWrap?.children || [], videoWrap, videoWrap?.parentElement]);
      elements.forEach((ele) => {
        if (isHide) ele?.dispatchEvent(new MouseEvent("mouseleave"));
        isHide ? ele?.style.setProperty("cursor", "none") : ele?.style.setProperty("cursor", EMPTY$1);
      });
    },
    showToast(content, duration = SHOW_TOAST_TIME, isRemoveOther = true) {
      const el = document.createElement("div");
      el.setAttribute("part", "monkey-show-toast");
      el.setAttribute("style", SHOW_TOAST_POSITION);
      if (isRemoveOther) Tools.query('[part="monkey-show-toast"]')?.remove();
      content instanceof HTMLElement ? el.appendChild(content) : el.innerHTML = content;
      const videoContainer = this.getVideoContainer();
      const target = Object.is(this.video, videoContainer) ? this.video?.parentElement : videoContainer;
      target?.appendChild(el);
      setTimeout(() => {
        el.style.opacity = 0;
        setTimeout(() => el.remove(), ONE_SEC$1 / 3);
      }, duration);
    }
  };
  class StorageItem {
    constructor(name, defaultValue, useLocalStorage = false, valueParser = null) {
      this.name = name;
      this.valueParser = valueParser;
      this.defaultValue = defaultValue;
      this.useLocalStorage = useLocalStorage;
    }
    set(value) {
      this.setItem(this.name, value);
    }
    setItem(key, value) {
      this.useLocalStorage ? localStorage.setItem(key, value) : _GM_setValue(key, value);
    }
    get() {
      return this.parser(this.getItem(this.name) ?? this.defaultValue);
    }
    getItem(key) {
      const value = this.useLocalStorage ? localStorage.getItem(key) : _GM_getValue(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    parser(value) {
      return this.valueParser ? this.valueParser(value) : value;
    }
    del() {
      this.removeItem(this.name);
    }
    removeItem(key) {
      this.useLocalStorage ? localStorage.removeItem(key) : _GM_deleteValue(key);
    }
  }
  class TimedStorageItem extends StorageItem {
    constructor(name, defaultValue, useLocalStorage, valueParser) {
      super(name, defaultValue, useLocalStorage, valueParser);
      this.clearExpired();
    }
    set(suffix, value, expires) {
      const key = this.name + suffix;
      if (expires) expires = Date.now() + expires * 864e5;
      expires ? this.setItem(key, JSON.stringify({ value, expires })) : this.setItem(key, value);
    }
    get(suffix) {
      const storage = this.getItem(this.name + suffix);
      if (!storage?.value) return this.parser(storage ?? this.defaultValue);
      return storage.expires > Date.now() ? this.parser(storage.value) : this.defaultValue;
    }
    del(suffix) {
      this.removeItem(this.name + suffix);
    }
    clearExpired() {
      const keys = this.useLocalStorage ? Object.keys(localStorage) : _GM_listValues();
      keys.filter((key) => key.includes(this.name)).forEach((key) => {
        const storage = this.getItem(key);
        if (storage?.expires && storage.expires < Date.now()) this.removeItem(key);
      });
    }
  }
  const Storage = {
    PLAY_RATE_STEP: new StorageItem("PLAY_RATE_STEP", 0.25, false, parseFloat),
    CACHED_PLAY_RATE: new StorageItem("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
    CLOSE_PLAY_RATE: new StorageItem("CLOSE_PLAY_RATE", false, false, (value) => Boolean(value)),
    OVERRIDE_KEYBOARD: new StorageItem("OVERRIDE_KEYBOARD", false, false, (value) => Boolean(value)),
    DISABLE_AUTO: new StorageItem("CLOSE_AUTO_WEB_FULL_SCREEN", false, false, (value) => Boolean(value)),
    VIDEO_SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, (value) => parseInt(value, 10)),
    ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, (value) => parseInt(value, 10)),
    ENABLE_THIS_SITE_AUTO: new TimedStorageItem("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
    DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
    RELATIVE_EPISODE_SELECTOR: new TimedStorageItem("RELATIVE_EPISODE_SELECTOR_", null),
    CURRENT_EPISODE_SELECTOR: new TimedStorageItem("CURRENT_EPISODE_SELECTOR_", null),
    PLAY_TIME: new TimedStorageItem("PLAY_TIME_", 0, true, parseFloat)
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
  const { ZERO_KEY_SKIP_INTERVAL: ZERO_KEY_SKIP_INTERVAL$1 } = Storage;
  const { SYMBOL: SYMBOL$1, MSG_SOURCE } = Constants;
  const KeydownHandler = {
    preventDefault(event) {
      const overrideKey = [eventCode.Space, eventCode.ArrowLeft, eventCode.ArrowRight];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
      if (!isNumberKey && !isOverrideKey) return;
      Tools.preventDefault(event);
    },
    setupKeydownListener() {
      window.addEventListener("keyup", (event) => this.preventDefault(event), true);
      window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
      window.addEventListener("message", (event) => {
        const { data } = event;
        if (!data?.source || !data.source.includes(MSG_SOURCE)) return;
        if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
        if (data?.defaultPlaybackRate) this.defaultPlaybackRate();
        if (data?.topInfo) this.topInfo = data.topInfo;
        this.processEvent(data);
      });
    },
    keydownHandler(event) {
      if (this.normalWebsite()) return;
      const { code, shiftKey } = event;
      let key = event.key.toUpperCase();
      const target = event.composedPath().shift();
      if (["INPUT", "TEXTAREA"].includes(target.tagName) || target?.isContentEditable) return;
      if (!Object.keys(eventCode).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      if (eventCode.Space === code) key = eventCode.Space.toUpperCase();
      if (shiftKey && eventCode.NumpadAdd === code) key = SYMBOL$1.MULTIPLY;
      if (shiftKey && eventCode.NumpadSubtract === code) key = SYMBOL$1.DIVIDE;
      if (!Tools.isTopWin() && [eventCode.KeyP, eventCode.KeyN].includes(code)) {
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
      if (Tools.isNumber(key)) this.setPlaybackRate(key);
    },
    getKeyMapping() {
      return {
        Z: () => this.defaultPlaybackRate(),
        A: () => this.adjustPlaybackRate(SYMBOL$1.ADD),
        S: () => this.adjustPlaybackRate(SYMBOL$1.SUBTRACT),
        [SYMBOL$1.ADD]: () => this.adjustPlaybackRate(SYMBOL$1.ADD),
        [SYMBOL$1.DIVIDE]: () => this.adjustPlaybackRate(SYMBOL$1.DIVIDE),
        [SYMBOL$1.SUBTRACT]: () => this.adjustPlaybackRate(SYMBOL$1.SUBTRACT),
        [SYMBOL$1.MULTIPLY]: () => this.adjustPlaybackRate(SYMBOL$1.MULTIPLY),
        N: () => WebSite.inMatches() ? this.triggerIconElement("next") : this.switchNextEpisode(),
        ARROWLEFT: () => this.isOverrideKeyboard() ? this.adjustVideoTime(SYMBOL$1.SUBTRACT) : null,
        ARROWRIGHT: () => this.isOverrideKeyboard() ? this.adjustVideoTime() : null,
        0: () => this.adjustVideoTime(ZERO_KEY_SKIP_INTERVAL$1.get()),
        P: () => {
          if (!WebSite.inMatches()) return this.enhance();
          WebSite.isBiliLive() ? this.biliLiveWebFullScreen() : this.triggerIconElement("webfull");
        },
        SPACE: () => {
          if (!this.video || !this.isOverrideKeyboard()) return;
          if (WebSite.isDouyu()) return Tools.triggerClick(this.video);
          this.video.paused ? this.video.play() : this.video.pause();
        },
        F: () => this.triggerIconElement("full", 0),
        D: () => this.triggerIconElement("danmaku", 3)
      };
    },
    triggerIconElement(name, index) {
      if (!WebSite.inMatches()) return;
      if (WebSite.isBiliLive()) return this.getBiliLiveIcons()?.[index]?.click();
      Tools.query(selectorConfig[location.host]?.[name])?.click();
    }
  };
  const {
    DISABLE_AUTO,
    PLAY_RATE_STEP: PLAY_RATE_STEP$1,
    CLOSE_PLAY_RATE,
    OVERRIDE_KEYBOARD,
    VIDEO_SKIP_INTERVAL: VIDEO_SKIP_INTERVAL$1,
    DISABLE_MEMORY_TIME: DISABLE_MEMORY_TIME$1,
    ENABLE_THIS_SITE_AUTO,
    ZERO_KEY_SKIP_INTERVAL,
    CURRENT_EPISODE_SELECTOR: CURRENT_EPISODE_SELECTOR$1,
    RELATIVE_EPISODE_SELECTOR: RELATIVE_EPISODE_SELECTOR$2
  } = Storage;
  const MenuCommandHandler = {
    isDisableAuto: () => DISABLE_AUTO.get(),
    isDisablePlaybackRate: () => CLOSE_PLAY_RATE.get(),
    isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
    isEnbleThisWebSiteAuto() {
      const host = Tools.isTopWin() ? location.host : this.topInfo.host;
      return ENABLE_THIS_SITE_AUTO.get(host);
    },
    setupScriptMenuCommand() {
      if (!Tools.isTopWin() || this.hasMenu) return;
      this.setupMenuChangeListener();
      this.registMenuCommand();
      this.hasMenu = true;
    },
    registMenuCommand() {
      this.registPlayRateCommand();
      this.registSkipTimeCommand();
      this.registZeroKeySkipCommand();
      this.registWebSiteAutoCommand();
      this.registDeletePickerCommand();
      this.registMoreSettingCommand();
    },
    setupMenuChangeListener() {
      if (this.hasCommandListener) return;
      [
        CLOSE_PLAY_RATE.name,
        OVERRIDE_KEYBOARD.name,
        ENABLE_THIS_SITE_AUTO.name + location.host,
        CURRENT_EPISODE_SELECTOR$1.name + location.host
      ].forEach((key) => _GM_addValueChangeListener(key, () => this.registMenuCommand()));
      this.hasCommandListener = true;
    },
    registPlayRateCommand() {
      const title = "设置倍速步进";
      _GM_unregisterMenuCommand(this.play_rate_menu_id);
      if (this.isLive() || this.isDisablePlaybackRate()) return;
      this.play_rate_menu_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, PLAY_RATE_STEP$1.get());
        if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP$1.set(input);
      });
    },
    registSkipTimeCommand() {
      _GM_unregisterMenuCommand(this.skip_time_menu_id);
      if (this.isLive() || !this.isOverrideKeyboard()) return;
      const title = "设置快进/退秒数";
      this.skip_time_menu_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, VIDEO_SKIP_INTERVAL$1.get());
        if (!isNaN(input) && Number.parseInt(input)) VIDEO_SKIP_INTERVAL$1.set(input);
      });
    },
    registZeroKeySkipCommand() {
      _GM_unregisterMenuCommand(this.zero_key_menu_id);
      if (this.isLive()) return;
      const title = "设置零键快进秒数";
      this.zero_key_menu_id = _GM_registerMenuCommand(title, () => {
        const input = prompt(title, ZERO_KEY_SKIP_INTERVAL.get());
        if (!isNaN(input) && Number.parseInt(input)) ZERO_KEY_SKIP_INTERVAL.set(input);
      });
    },
    registWebSiteAutoCommand() {
      if (WebSite.inMatches()) return;
      const isEnble = this.isEnbleThisWebSiteAuto();
      const title = isEnble ? "此站禁用自动网页全屏" : "此站启用自动网页全屏";
      _GM_unregisterMenuCommand(this.enble_this_site_auto_menu_id);
      this.enble_this_site_auto_menu_id = _GM_registerMenuCommand(title, () => {
        if (this.isMultipleVideo()) return Tools.notyf("多视频不能启用自动", true);
        ENABLE_THIS_SITE_AUTO.set(location.host, !isEnble);
      });
    },
    registDeletePickerCommand() {
      _GM_unregisterMenuCommand(this.del_piker_menu_id);
      if (WebSite.inMatches() || !CURRENT_EPISODE_SELECTOR$1.get(location.host)) return;
      this.del_piker_menu_id = _GM_registerMenuCommand("删除此站的剧集选择器", () => {
        CURRENT_EPISODE_SELECTOR$1.del(location.host);
        RELATIVE_EPISODE_SELECTOR$2.del(location.host);
      });
    },
    registMoreSettingCommand() {
      _GM_unregisterMenuCommand(this.more_sett_menu_id);
      this.more_sett_menu_id = _GM_registerMenuCommand("更多设置", () => {
        Swal.fire({
          width: 350,
          title: "更多设置",
          backdrop: false,
          showCancelButton: true,
          cancelButtonText: "关闭",
          showConfirmButton: false,
          customClass: { container: "monkey-web-fullscreen" },
          html: `<div class="_menuitem"><label>空格 ◀▶ 键控制<input name="keyboard" type="checkbox"/></label></div>
          <div class="_menuitem"><label>禁用自动网页全屏<input name="auto" type="checkbox"/></label></div>
      		<div class="_menuitem"><label>禁用视频倍速调节<input name="rate" type="checkbox"/></label></div>
          <div class="_menuitem"><label>禁用记忆播放进度<input name="time" type="checkbox"/></label></div>`,
          didOpen() {
            const item = [OVERRIDE_KEYBOARD, DISABLE_AUTO, CLOSE_PLAY_RATE, DISABLE_MEMORY_TIME$1];
            Tools.querys("._menuitem input").forEach((ele, i) => {
              ele.checked = item[i].get();
              if (ele.name === "auto" && !WebSite.inMatches()) Tools.closest(ele, "._menuitem")?.classList.add("hide");
              ele.addEventListener("click", function() {
                if (this.name === "rate") Tools.postMessage(window, { defaultPlaybackRate: this.checked });
                setTimeout(() => item[i].set(this.checked), 100);
                Tools.notyf("修改成功！");
              });
            });
          }
        });
      });
    }
  };
  const { EMPTY, ONE_SEC, SYMBOL, DEF_PLAY_RATE, MAX_PLAY_RATE } = Constants;
  const { PLAY_RATE_STEP, CACHED_PLAY_RATE, VIDEO_SKIP_INTERVAL, PLAY_TIME, DISABLE_MEMORY_TIME } = Storage;
  const strategy = {
    [SYMBOL.DIVIDE]: (playRate) => playRate / 2,
    [SYMBOL.MULTIPLY]: (playRate) => playRate * 2,
    [SYMBOL.ADD]: (playRate) => playRate + PLAY_RATE_STEP.get(),
    [SYMBOL.SUBTRACT]: (playRate) => playRate - PLAY_RATE_STEP.get()
  };
  const VideoControlHandler = {
    checkUsable() {
      if (!this.video) return false;
      if (this.isVideoEnded()) return false;
      if (WebSite.isLivePage()) return false;
      if (this.isDisablePlaybackRate()) return false;
      if (!Tools.validDuration(this.video)) return false;
      return true;
    },
    isVideoEnded() {
      return Math.floor(this.video.currentTime) === Math.floor(this.video.duration);
    },
    toFixed(playRate) {
      playRate = Number.parseFloat(playRate);
      return playRate.toFixed(2).replace(/\.?0+$/, "");
    },
    setPlaybackRate(playRate, show = true) {
      if (!this.checkUsable()) return;
      this.video.playbackRate = this.toFixed(playRate);
      if (show) this.customToast("正在以", `${this.video.playbackRate}x`, "倍速播放");
      CACHED_PLAY_RATE.set(this.video.playbackRate);
    },
    adjustPlaybackRate(_symbol) {
      if (!this.checkUsable()) return;
      let playRate = this.video.playbackRate;
      playRate = strategy[_symbol](playRate);
      playRate = Math.max(PLAY_RATE_STEP.get(), playRate);
      playRate = Math.min(MAX_PLAY_RATE, playRate);
      this.setPlaybackRate(playRate);
    },
    defaultPlaybackRate() {
      if (this.isDisablePlaybackRate()) return;
      this.setPlaybackRate(DEF_PLAY_RATE, false);
      this.showToast("已恢复正常倍速播放");
    },
    useCachePlaybackRate(video) {
      if (this.isDisablePlaybackRate()) return;
      const playRate = CACHED_PLAY_RATE.get();
      if (video.playbackRate === playRate) return;
      this.setPlaybackRate(playRate, !video.hasToast);
      video.hasToast = true;
    },
    tryplay: (video) => video.paused ? WebSite.isDouyu() ? Tools.triggerClick(video) : video.play() : null,
    adjustVideoTime(second = VIDEO_SKIP_INTERVAL.get(), _symbol) {
      if (!this.video || !Tools.validDuration(this.video)) return;
      if (_symbol && ![SYMBOL.ADD, SYMBOL.SUBTRACT].includes(_symbol)) return;
      if (Object.is(typeof second, typeof EMPTY) && !_symbol) {
        _symbol = second;
        second = VIDEO_SKIP_INTERVAL.get();
      }
      if (SYMBOL.SUBTRACT !== _symbol && this.video.isEnded) return;
      second = Object.is(SYMBOL.SUBTRACT, _symbol) ? -second : second;
      const currentTime = Math.min(this.video.currentTime + second, this.video.duration);
      this.setCurrentTime(currentTime);
    },
    cachePlayTime(video) {
      if (!this.topInfo || this.isLive() || this.isMultipleVideo()) return;
      if (DISABLE_MEMORY_TIME.get() || this.isVideoEnded()) return this.delCachePlayTime();
      if (video.currentTime > 1) PLAY_TIME.set(this.topInfo.hash, video.currentTime - 1, 7);
    },
    delCachePlayTime() {
      PLAY_TIME.del(this.topInfo.hash);
    },
    useCachePlayTime(video) {
      if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
      const time = PLAY_TIME.get(this.topInfo.hash);
      if (time <= video.currentTime) return this.hasUsedPlayTime = true;
      this.setCurrentTime(time);
      this.hasUsedPlayTime = true;
      this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", ONE_SEC * 3, false);
    },
    setCurrentTime(currentTime) {
      if (currentTime) this.video.currentTime = Math.max(0, currentTime);
    },
    customToast(startText, colorText, endText, duration, isRemoveOther) {
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(startText));
      const child = span.cloneNode(true);
      child.textContent = colorText;
      child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
      span.appendChild(child);
      span.appendChild(document.createTextNode(endText));
      this.showToast(span, duration, isRemoveOther);
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return "00:00";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return [...h ? [h] : [], m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
    },
    isMultipleVideo() {
      const currVideoSrc = this.video.currentSrc;
      const videos = Tools.querys("video").filter((video) => video.currentSrc !== currVideoSrc && !isNaN(video.duration));
      return videos.length > 1;
    }
  };
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
      if (!WebSite.isTencent()) return;
      const selector = ".main-login-wnd-module_close-button__mt9WU";
      this.loginObserver("#login_win", selector, selector);
    },
    handleIqyLogin() {
      if (!WebSite.isIqiyi()) return;
      const selector = ".simple-buttons_close_btn__6N7HD";
      this.loginObserver("#qy_pca_login_root", selector, selector);
      Tools.createObserver(".cd-time", () => {
        const selector2 = ":is([id*='mask-layer'], #modal-vip-cashier-scope)";
        Tools.querys(selector2).forEach((el) => el?.remove());
        Tools.query(".simple-buttons_close_btn__6N7HD")?.click();
        const adTime = Tools.query(".public-time");
        if (adTime.style.display === "none") return;
        if (this.video.currentTime !== this.video.duration) return;
        Tools.querys("*:not(.public-vip)", adTime).forEach((el) => el?.click());
      });
    },
    handleBiliLogin() {
      if (!WebSite.isBili()) return;
      if (document.cookie.includes("DedeUserID")) return _unsafeWindow.player?.requestQuality(80);
      setTimeout(() => {
        _unsafeWindow.__BiliUser__.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
      }, Constants.ONE_SEC * 3);
    }
  };
  const WebFullScreenHandler = {
    webFullScreen(video) {
      const width = video?.offsetWidth;
      if (!width) return false;
      if (this.isDisableAuto() || width >= window.innerWidth) return true;
      if (!WebSite.isBiliLive()) return Tools.triggerClick(this.element);
      return this.biliLiveWebFullScreen();
    },
    biliLiveWebFullScreen() {
      const control = this.getBiliLiveIcons();
      if (!control.length) return false;
      Tools.scrollTop(70);
      const el = Tools.query(":is(.lite-room, #player-ctnr)", _unsafeWindow.top.document);
      if (el) Tools.scrollTop(Tools.getElementRect(el)?.top || 0);
      return Tools.triggerClick(control[1]);
    },
    exitWebFullScreen() {
      if (!WebSite.isBili() && !WebSite.isAcFun()) return;
      const hasPod = Tools.query(".video-pod");
      const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (hasPod && !isLast) return;
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
    experWebFullScreen(video) {
      if (WebSite.inMatches() || video.isWebFullScreen || !this.topInfo || !this.isEnbleThisWebSiteAuto()) return;
      if (video.offsetWidth === this.topInfo.innerWidth) return video.isWebFullScreen = true;
      Tools.postMessage(window.top, { key: "P" });
      video.isWebFullScreen = true;
    }
  };
  const { RELATIVE_EPISODE_SELECTOR: RELATIVE_EPISODE_SELECTOR$1 } = Storage;
  const SwitchEpisodeHandler = {
    switchPrevEpisode: function() {
      this.handleEpisodeChange(this.getPrevEpisode);
    },
    switchNextEpisode: function() {
      this.handleEpisodeChange(this.getNextEpisode);
    },
    handleEpisodeChange(getTargetEpisode) {
      if (!Tools.isTopWin()) return;
      let currEpisode = this.getCurrentEpisode();
      if (!currEpisode) currEpisode = this.getCurrentEpisodeFromAllLink();
      const targetEpisode = getTargetEpisode.call(this, currEpisode);
      this.jumpToEpisodeNumber(targetEpisode);
    },
    getCurrentEpisode() {
      const ele = RELATIVE_EPISODE_SELECTOR$1.get(location.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeLinkElement();
      return this.getEpisodeContainer(ele);
    },
    getCurrentEpisodeLinkElement() {
      const href = location.href;
      const path = location.pathname;
      const lastPath = path.substring(path.lastIndexOf("/") + 1);
      const links = Tools.querys(`:is(a[href*="${path}"], a[href*="${lastPath}"])`);
      if (links.length == 1) return links.shift();
      const filter = [
        "h1",
        "header",
        "[id*='history']",
        "[class*='lishi']",
        "[class*='record']",
        "[class*='history']",
        "[class*='tab-item']",
        "[class*='play-channel']"
      ];
      return links.find((link) => {
        const linkUrl = new URL(link.href);
        if (Tools.closest(link, `:is(${filter})`, 5)) return false;
        if (!Object.is(href, link.href) && !Object.is(path, linkUrl.pathname)) return false;
        return !!this.getEpisodeNumber(link);
      });
    },
    getEpisodeNumber(element) {
      return Tools.extractNumbers(element?.innerText).shift();
    },
    getPrevEpisode(element) {
      return this.getEpisodeNumberContainer(element, true);
    },
    getNextEpisode(element) {
      return this.getEpisodeNumberContainer(element);
    },
    getEpisodeNumberContainer(element, isPrev = false) {
      if (!element) return;
      const currNumber = this.getEpisodeNumber(element);
      const episodes = this.getAllEpisodeElement(element);
      if (episodes.length <= 1) return null;
      const numbers = episodes.map(this.getEpisodeNumber);
      const index = episodes.indexOf(element);
      const prev = episodes[index - 1];
      const next = episodes[index + 1];
      const { leftSmall, rightLarge } = this.compareLeftRight(numbers, currNumber, index);
      if (leftSmall || rightLarge) return isPrev ? prev : next;
      return isPrev ? next : prev;
    },
    compareLeftRight(numbers, compareNumber, index) {
      const leftSmall = numbers.findIndex((val, i) => i < index && val < compareNumber) > -1;
      const rightLarge = numbers.findIndex((val, i) => i > index && val > compareNumber) > -1;
      return { leftSmall, rightLarge };
    },
    getAllEpisodeElement(element) {
      const eleName = element.tagName;
      const eleClass = Array.from(element.classList);
      const sibling = Tools.findSiblingInParent(element, eleName);
      const children = Array.from(sibling?.parentElement.children);
      return children.filter((ele) => {
        const currClass = Array.from(ele.classList);
        const haveSomeClass = eleClass.some((value) => currClass.includes(value));
        if (!!currClass.length && !haveSomeClass) return false;
        return ele.tagName === eleName;
      });
    },
    jumpToEpisodeNumber(element) {
      if (!element) return;
      if (element instanceof HTMLAnchorElement) return element.click();
      const stack = [element];
      while (stack.length > 0) {
        const current = stack.pop();
        if (!(current instanceof HTMLElement) || !this.getEpisodeNumber(current)) continue;
        if (current instanceof HTMLAnchorElement || current instanceof HTMLButtonElement) return current.click();
        current.click();
        const children = Array.from(current.children).reverse();
        for (const child of children) {
          stack.push(child);
        }
      }
    },
    getEpisodeContainer(element) {
      while (element) {
        const tagName = element.tagName;
        const parentEle = element.parentElement;
        const haveSib = Tools.haveSiblings(element);
        const hasEqualsTag = Tools.querys(tagName, parentEle).find((el) => el !== element);
        if (haveSib && hasEqualsTag) return element;
        element = parentEle;
      }
      return element;
    },
    getCurrentEpisodeFromAllLink() {
      const path = location.pathname;
      const lastPath = path.substring(path.lastIndexOf("/") + 1);
      if (lastPath === Constants.EMPTY) return null;
      const currNumber = Tools.extractNumbers(lastPath).join(Constants.EMPTY);
      Tools.querys('a[href*="javascript"]').forEach((link) => {
        const attrs = link.attributes;
        for (const attr of attrs) {
          const attrNumber = Tools.extractNumbers(attr.value).join(Constants.EMPTY);
          if (attrNumber === currNumber) return link;
        }
      });
    }
  };
  const { RELATIVE_EPISODE_SELECTOR, CURRENT_EPISODE_SELECTOR } = Storage;
  const PickerEpisodeHandler = {
    setupPickerEpisodeListener() {
      if (WebSite.inMatches()) return;
      document.body.addEventListener(
        "click",
        (event) => {
          if (!event.ctrlKey || !event.altKey || !event.isTrusted) return;
          if (!Tools.isTopWin()) return Tools.notyf("此页面不能抓取 (•ิ_•ิ)?", true);
          Tools.preventDefault(event);
          const hasCurrentSelector = CURRENT_EPISODE_SELECTOR.get(location.host);
          const hasRelativeSelector = RELATIVE_EPISODE_SELECTOR.get(location.host);
          if (hasCurrentSelector && hasRelativeSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);
          const target = event.target;
          const number = this.getEpisodeNumber(target);
          if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);
          !hasCurrentSelector ? this.pickerCurrentEpisodeChain(target) : this.pickerRelativeEpisodeChain(target);
        },
        true
      );
    },
    pickerCurrentEpisodeChain(element) {
      if (CURRENT_EPISODE_SELECTOR.get(location.host)) return;
      this.pickerEpisodeDialog(element, {
        validBtnCallback(value) {
          try {
            const number = this.getEpisodeNumber(Tools.query(value));
            !!number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
          }
        },
        confirmCallback(value) {
          CURRENT_EPISODE_SELECTOR.set(location.host, value);
          Tools.notyf("继续拾取元素 ＼(＞０＜)／");
        }
      });
    },
    pickerRelativeEpisodeChain(element) {
      if (RELATIVE_EPISODE_SELECTOR.get(location.host)) return;
      this.pickerEpisodeDialog(element, {
        validBtnCallback(value) {
          try {
            const container = this.getEpisodeContainer(Tools.query(value));
            if (!container) return Tools.notyf("获取集数失败 〒▽〒", true);
            const allEpisode = this.getAllEpisodeElement(container);
            const numbers = allEpisode.map(this.getEpisodeNumber);
            const numJoin = numbers.join(" ");
            !!numbers.length ? Tools.notyf(`所有集数：${numJoin}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
          }
        },
        confirmCallback(value) {
          RELATIVE_EPISODE_SELECTOR.set(location.host, value);
          Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
        }
      });
    },
    getCurrentEpisodeBySelector() {
      const currEpisodeSelector = CURRENT_EPISODE_SELECTOR.get(location.host);
      if (!currEpisodeSelector) return;
      const currEpisode = Tools.query(currEpisodeSelector);
      const currNumber = this.getEpisodeNumber(currEpisode);
      const selector = RELATIVE_EPISODE_SELECTOR.get(location.host);
      const container = this.getEpisodeContainer(Tools.query(selector));
      const episodes = this.getAllEpisodeElement(container);
      return episodes.includes(currEpisode) ? currEpisode : episodes.find((ele) => this.getEpisodeNumber(ele) === currNumber);
    },
    pickerEpisodeDialog(element, { validBtnCallback, confirmCallback }) {
      Swal.fire({
        html: `<h4>验证能正确获取到集数，再确定保存</h4>
      <textarea id="monkey-picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
      <p>编辑元素选择器，确保能正确获取到集数</p>`,
        customClass: { container: "monkey-web-fullscreen" },
        title: "拾取剧集元素选择器",
        confirmButtonText: "保存",
        denyButtonText: "验证",
        showCloseButton: true,
        showDenyButton: true,
        reverseButtons: true,
        focusDeny: true,
        preDeny: () => {
          const value = Tools.query("#monkey-picker").value.trim();
          if (!value) return Tools.notyf("元素选择器不能为空！", true);
          validBtnCallback.call(this, value);
          return false;
        },
        preConfirm: () => {
          const value = Tools.query("#monkey-picker").value.trim();
          if (value) return value;
          return Tools.notyf("元素选择器不能为空！", true);
        },
        didOpen: () => Tools.query("#monkey-picker").value = Tools.getParentChain(element)
      }).then((result) => result.isConfirmed ? confirmCallback.call(this, result.value) : null);
    }
  };
  const ScriptsEnhanceHandler = {
    enhance() {
      if (!this.videoInfo) return;
      const ele = this.getVideoLocation();
      Tools.triggerHoverEvent(ele);
      Tools.triggerEscapeEvent();
      this.backupTrigger();
    },
    backupTrigger() {
      if (!this.video || this.videoInfo.frameSrc) return;
      let oldWidth = this.video.oldWidth;
      let newWidth = this.video.offsetWidth;
      if (!Object.is(oldWidth, newWidth)) return;
      Tools.query("#playerControlBtn")?.click();
      if (!Object.is(newWidth, this.video.offsetWidth)) return;
      Tools.query("#playerControlBtn")?.click();
    },
    getVideoLocation() {
      if (this.video) return this.getVideoContainer();
      const iframe = this.getVideoIframe();
      if (iframe) return iframe;
      const { centerX, centerY } = this.videoInfo;
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
      if (this.videoInfo.frameSrc) return videoContainer;
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
      return Tools.findSiblingInParent(element, ['[class*="bar"]', '[class*="Control"]', '[class*="control"]']);
    }
  };
  cssLoader("sweetalert2");
  const logicHandlers = [
    { handler: KeydownHandler },
    { handler: MenuCommandHandler },
    { handler: VideoControlHandler },
    { handler: WebSiteLoginHandler },
    { handler: WebFullScreenHandler },
    { handler: SwitchEpisodeHandler },
    { handler: PickerEpisodeHandler },
    { handler: ScriptsEnhanceHandler }
  ];
  logicHandlers.forEach(({ handler }) => {
    for (const key of Object.keys(handler)) {
      const method = handler[key];
      method instanceof Function ? App[key] = method.bind(App) : App[key] = method;
    }
  });
  App.init();
  _unsafeWindow.MONKEY_WEB_FULLSCREEN = { App, Tools };

})(notyf, sweetalert2);