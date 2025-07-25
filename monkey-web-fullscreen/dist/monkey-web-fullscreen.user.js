// ==UserScript==
// @name         视频自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      3.1.9.1
// @author       Feny
// @description  默认支持哔哩哔哩（含直播）、腾讯视频、优酷视频、爱奇艺、芒果TV、搜狐视频、AcFun弹幕网自动网页全屏；支持倍速调节、视频截图、画面镜像翻转、自由缩放与移动、播放进度记忆等功能；提供通用下集切换功能，适用于任意视频网站剧集，实现便捷的剧集切换。
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=
// @homepage     https://github.com/xFeny/UserScript/tree/main/monkey-web-fullscreen
// @include      *://www.ezdmw.site/Index/video/*
// @include      *://player.ezdmw.com/danmuku/*
// @include      *://pages.iqiyi.com/p/zy/*
// @include      *://*bimiacg*.net/*/play*
// @include      *://acgfta.com/play*
// @include      *://ppoft.com/play*
// @match        *://tv.sohu.com/v/*
// @match        *://www.mgtv.com/b/*
// @match        *://www.acfun.cn/v/*
// @match        *://www.iqiyi.com/v_*
// @match        *://v.qq.com/x/page/*
// @match        *://v.douyu.com/show/*
// @match        *://v.qq.com/x/cover/*
// @match        *://live.bilibili.com/*
// @match        *://v.youku.com/video?*
// @match        *://v.youku.com/v_show/*
// @match        *://live.acfun.cn/live/*
// @match        *://www.acfun.cn/bangumi/*
// @match        *://www.bilibili.com/list/*
// @match        *://www.bilibili.com/video/*
// @match        *://www.bilibili.com/*/play/*
// @match        *://v.qq.com/live/p/newtopic/*
// @match        *://www.bilibili.com/festival/*
// @match        *://v.qq.com/wasm-kernel/*/fake-video*
// @require      https://unpkg.com/notyf@3.10.0/notyf.min.js
// @require      data:application/javascript,%3Bwindow.notyf%3D%7BNotyf%7D%3B
// @require      https://unpkg.com/sweetalert2@11.20.0/dist/sweetalert2.min.js
// @require      data:application/javascript,%3Bwindow.sweetalert2%3DSwal%3B
// @resource     notyf/notyf.min.css  https://unpkg.com/notyf@3.10.0/notyf.min.css
// @resource     sweetalert2          https://unpkg.com/sweetalert2@11.20.0/dist/sweetalert2.min.css
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_download
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

(e=>{const t=document.createElement("style");t.textContent=e,document.addEventListener("shadow-attached",o=>{requestAnimationFrame(()=>o.detail.shadowRoot.prepend(t.cloneNode(!0)))}),(GM_addStyle??(()=>document.head.append(t.cloneNode(!0))))(e)})(' @charset "UTF-8";.monkey-toast{line-height:normal;left:10px!important;bottom:16%!important;color:#fff!important;font-size:13px!important;padding:6px 10px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in!important;background:#000000bf!important}::part(webFullscreen),[part*=webFullscreen],body[part*=webFullscreen] [part*=webFullscreen]{top:0!important;left:0!important;margin:0!important;padding:0!important;zoom:normal!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important;flex-direction:column!important;overflow:hidden!important;display:flex!important}[part*=webFullscreen] .vjs-control-bar,[part*=webFullscreen] .ytp-chrome-bottom,[part*=webFullscreen] .ytp-chapter-hover-container{left:0!important;width:100vw!important}[part*=webFullscreen] .__flex-1{flex:1!important}[part*=webFullscreen] video,body[part*=webFullscreen] [part*=webFullscreen] video{top:0!important;left:0!important;width:100vw!important;height:clamp(100vh - 100%,100vh,100%)!important;object-fit:contain!important;transform:scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__tsr{object-fit:contain!important;transform-origin:center!important;transition:transform .35s!important;transform:var(--deftsr, matrix(1, 0, 0, 1, 0, 0)) scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__hc{cursor:none!important}.monkey-web-fullscreen{z-index:9999999999!important}.monkey-web-fullscreen .swal2-popup{font-size:14px!important}.monkey-web-fullscreen button:where(.swal2-styled):focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .swal2-confirm{background-color:#7066e0!important}.monkey-web-fullscreen .swal2-deny{background-color:#dc3741!important}.monkey-web-fullscreen .swal2-cancel{background-color:#757575!important}.monkey-web-fullscreen button:where(.swal2-close){color:#666!important;font-size:1.7em!important;font-weight:bolder!important}.monkey-web-fullscreen h4{color:red!important;margin:0 auto!important;font-size:18px!important;font-weight:400!important}.monkey-web-fullscreen p{color:#999!important;margin-top:0!important;font-size:12px!important}.monkey-web-fullscreen #__picker{width:100%!important;height:auto!important;max-width:25em!important;font-size:14px!important;margin-bottom:0!important;min-height:10em!important;resize:vertical!important}.monkey-web-fullscreen #__picker:focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .hide{display:none!important}.monkey-web-fullscreen .__menu{margin:0;padding:0;color:#666;display:flex;cursor:pointer;font-size:20px;font-weight:400;float:none!important;align-items:center!important;margin-bottom:15px!important;justify-content:space-between!important}.monkey-web-fullscreen .__menu:hover{color:#333}.monkey-web-fullscreen .__menu:last-of-type{margin-bottom:0!important}.monkey-web-fullscreen .__menu input{outline:none;cursor:pointer;opacity:1!important;width:20px!important;height:20px!important;position:static!important;appearance:auto!important;-webkit-appearance:auto!important}.monkey-web-fullscreen table{width:100%!important;border-collapse:collapse!important}.monkey-web-fullscreen th{font-weight:600!important}.monkey-web-fullscreen th,.monkey-web-fullscreen td{line-height:2!important;font-size:13px!important;vertical-align:middle!important;border:1px solid #e5e6eb!important}.monkey-web-fullscreen tr:nth-child(odd){background-color:#f8f8f8!important}.notyf{z-index:9999999999!important}.notyf .notyf__message{overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical}.login-tip,.login-guide,.live-room-app #sidebar-vm,.lite-room .bili-mini-mask,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.risk-captcha-adapt .bili-mini-mask,#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,#buffer,#install,#a1 #tips,#player #tips,.player-overlay,.memory-play-wrap,.atom-notice-click,#loading._noplayer,#player #loading-box,.dplayer-notice strong,.air-player-loading-box,.art-layer-autoPlayback,.art-layer-auto-playback,.invoke-app-floating-tips,.invoke-app-san-container{display:none!important}@supports (selector(:has(div))){#loading:not(:has([class*=player])){display:none!important}} ');

(function (notyf, Swal) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  const Consts = Object.freeze({
    EMPTY: "",
    MIN_ZOOM: 50,
    MOVE_STEP: 10,
    ZOOM_STEP: 10,
    MAX_ZOOM: 500,
    ONE_SEC: 1e3,
    DEF_PLAY_RATE: 1,
    MAX_PLAY_RATE: 16,
    webFull: "webFullscreen",
    MSG_SOURCE: "SCRIPTS_AUTO_WEB_FULLSCREEN"
  });
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_download = /* @__PURE__ */ (() => typeof GM_download != "undefined" ? GM_download : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const matches = _GM_info.script.matches.filter((match) => match !== "*://*/*").map((match) => new RegExp(match.replace(/\*/g, "\\S+")));
  const Site = {
    isAcFun: () => /acfun.cn\/v/.test(location.href),
    isTencent: () => /v.qq.com\/x/.test(location.href),
    isQiyi: () => /iqiyi.com\/v_*/.test(location.href),
    isDouyu: () => /v.douyu.com\/show/.test(location.href),
    isBili: () => /bilibili.com\/video/.test(location.href),
    isBiliLive: () => location.host === "live.bilibili.com",
    isLivePage: () => !location.host.endsWith("live") && /\blive\b/.test(location.href),
    isMatch: () => matches.some((match) => match.test(location.href.replace(location.search, Consts.EMPTY)))
  };
  function isElement(node) {
    return node instanceof Element;
  }
  function isDocument(node) {
    return node instanceof Document;
  }
  function* getShadowRoots(node, deep = false) {
    if (!node || !isElement(node) && !isDocument(node)) return;
    if (isElement(node) && node.shadowRoot) {
      yield node.shadowRoot;
    }
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (!doc.createTreeWalker) return;
    let currentNode;
    const toWalk = [node];
    while (currentNode = toWalk.pop()) {
      const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
        acceptNode: (child) => isElement(child) && child.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      });
      let walkerNode = walker.nextNode();
      while (walkerNode) {
        if (isElement(walkerNode) && walkerNode.shadowRoot) {
          if (deep) {
            toWalk.push(walkerNode.shadowRoot);
          }
          yield walkerNode.shadowRoot;
        }
        walkerNode = walker.nextNode();
      }
    }
    return;
  }
  function querySelector(selector, subject = document) {
    const immediate = subject.querySelector(selector);
    if (immediate) return immediate;
    const shadowRoots = [...getShadowRoots(subject, true)];
    for (const root of shadowRoots) {
      const match = root.querySelector(selector);
      if (match) return match;
    }
    return null;
  }
  function querySelectorAll(selector, subject = document) {
    const results = [...subject.querySelectorAll(selector)];
    const shadowRoots = [...getShadowRoots(subject, true)];
    for (const root of shadowRoots) {
      results.push(...root.querySelectorAll(selector));
    }
    return results;
  }
  const Tools = _unsafeWindow.Tools = {
    noNumber: (str) => !/\d/.test(str),
    isTopWin: () => window.top === window,
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top2) => window.scrollTo({ top: top2 }),
    alert: (...data) => window.alert(data.join(" ")),
    getElementRect: (el) => el?.getBoundingClientRect(),
    query: (selector, context) => querySelector(selector, context),
    querys: (selector, context) => querySelectorAll(selector, context),
    validDuration: (video) => !isNaN(video.duration) && video.duration !== Infinity,
    triggerClick: (ele) => ele?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, Consts.EMPTY),
    postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
    isVisible: (el) => !!(el?.offsetWidth || el?.offsetHeight || el?.getClientRects().length),
    getNumbers: (str) => typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : [],
    log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
    getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
    preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
    hasCls: (el, ...classes) => classes.flat().some((cls) => el?.classList.contains(cls)),
    delCls: (el, ...classes) => el?.classList.remove(...classes),
    addCls: (el, ...classes) => el?.classList.add(...classes),
    notyf(msg, isError = false) {
      const notyf$1 = new notyf.Notyf({ duration: Consts.ONE_SEC * 3, position: { x: "center", y: "top" } });
      isError ? notyf$1.error(msg) : notyf$1.success(msg);
      return false;
    },
    sendToIFrames(data) {
      this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
    },
    lastTimeMap: /* @__PURE__ */ new Map(),
    isTooFrequent(key = "default", delay = 300) {
      const now = Date.now();
      const lastTime = this.lastTimeMap.get(key) ?? 0;
      const isFrequent = now - lastTime < delay;
      this.lastTimeMap.set(key, now);
      return isFrequent;
    },
    getCenterPoint(element) {
      if (!element) return { centerX: 0, centerY: 0 };
      const { top: top2, left, width, height } = this.getElementRect(element);
      return { centerX: left + width / 2, centerY: top2 + height / 2 };
    },
    pointInElement(pointX, pointY, element) {
      if (!element) return false;
      const { top: top2, left, right, bottom } = this.getElementRect(element);
      return pointX >= left && pointX <= right && pointY >= top2 && pointY <= bottom;
    },
    triggerMousemove(element) {
      if (!element) return;
      const { centerY } = this.getCenterPoint(element);
      for (let x = 0; x < element.offsetWidth; x += 10) this.dispatchMousemove(element, x, centerY);
    },
    dispatchMousemove(element, clientX, clientY) {
      const dict = { clientX, clientY, bubbles: true };
      element.dispatchEvent(new MouseEvent("mousemove", dict));
    },
    createObserver(target, callback) {
      const observer = new MutationObserver(callback);
      target = target instanceof Element ? target : this.query(target);
      observer.observe(target, { childList: true, subtree: true });
      return observer;
    },
    closest(element, selector, maxLevel = 3) {
      for (let level = 0; element && level < maxLevel; level++, element = element.parentElement) {
        if (element.matches(selector)) return element;
      }
      return null;
    },
    findParentWithChild(element, selector, maxLevel = 8) {
      for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        if (this.query(selector, parent)) return parent;
      }
      return null;
    },
    findSibling(element, selector, maxLevel = 3) {
      for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        for (const child of parent.children) {
          if (child !== element && child.matches(selector)) return child;
        }
      }
      return null;
    },
    getParentChain(element) {
      const parents = [];
      for (let current = element; current && current !== document.body; current = current.parentElement) {
        parents.unshift(this.getTagInfo(current));
        if (current.id && this.noNumber(current.id)) break;
      }
      return parents.join(" > ");
    },
    getTagInfo(ele) {
      if (ele.id && this.noNumber(ele.id)) return `#${ele.id}`;
      let tagInfo = ele.tagName.toLowerCase();
      const classList = Array.from(ele.classList);
      if (classList.length === 0) return tagInfo;
      if (/[:[\]]/.test(ele.className)) return `${tagInfo}[class="${ele.className}"]`;
      const classes = classList.filter((cls) => this.noNumber(cls));
      return classes.length ? `${tagInfo}.${classes.join(".")}` : tagInfo;
    },
    getParents(element, withSelf = false, maxLevel = Infinity) {
      const parents = withSelf && element ? [element] : [];
      for (let current = element, level = 0; current && level < maxLevel; level++) {
        current = current.parentNode instanceof ShadowRoot ? current?.getRootNode()?.host : current?.parentElement;
        current && parents.unshift(current);
      }
      return parents;
    },
    hashCode(str) {
      let hash = 2166136261;
      for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = hash * 16777619 >>> 0;
      }
      return hash;
    },
    /**
     * 通过 XPath 查找元素，支持文本内容或属性值匹配
     * @param {'text'|'attr'} mode - 匹配模式：'text' 匹配文本内容，'attr' 匹配任意属性
     * @param {...string|string[]} texts - 要匹配的文本（可嵌套数组）
     * @returns {Element[]} 匹配的元素数组
     */
    findByText(mode, ...texts) {
      const flatTexts = texts.flat();
      const expr = Object.is(mode, "text") ? `.//*[${flatTexts.map((t) => `contains(text(), '${t.replace(/'/g, "\\'")}')`).join(" or ")}]` : `.//*[${flatTexts.map((t) => `@*[contains(., '${t.replace(/'/g, "\\'")}')]`).join(" or ")}]`;
      const nodes = document.evaluate(expr, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      return Array.from({ length: nodes.snapshotLength }, (_, i) => nodes.snapshotItem(i)).filter((el) => !el.matches("script"));
    },
    setPart(node, value) {
      const parts = node?.getAttribute("part")?.split(/\s+/) ?? [];
      node?.setAttribute("part", [.../* @__PURE__ */ new Set([...parts, value])].join(" ").trim());
    },
    delPart(node, value) {
      const parts = (node?.getAttribute("part")?.split(/\s+/) ?? []).filter((v) => v !== value);
      node?.setAttribute("part", parts.join(" ").trim());
    }
  };
  const App$1 = window.App = {
    init() {
      this.setupVisibleListener();
      this.setupKeydownListener();
      this.setupMutationObserver();
      this.setupUrlChangeListener();
      this.setupMouseMoveListener();
      document.addEventListener("load", () => this.triggerStartElement(), true);
    },
    normalSite: () => !window?.videoInfo && !window?.topInfo,
    isLive: () => Site.isLivePage() || window?.videoInfo?.isLive,
    getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
    isBackgroundVideo: (video) => video?.muted && video?.hasAttribute("loop"),
    triggerStartElement() {
      const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
      if (!element || Tools.isTooFrequent("start")) return;
      setTimeout(() => element?.click() & element?.remove(), 150);
    },
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
        history[method] = function() {
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
        const video = this.getVideo();
        if (video?.offsetWidth) this.setCurrentVideo(video);
        if (this.topInfo) observer.disconnect();
      });
      setTimeout(() => observer.disconnect(), Consts.ONE_SEC * 10);
    },
    setCurrentVideo(video) {
      if (!video || this.player === video || this.player && !this.player.paused) return;
      if (video.offsetWidth < 200 || this.isBackgroundVideo(video)) return;
      this.player = video;
      this.setVideoInfo(video);
      window.videoEnhance.enhanced(video);
    },
    setVideoInfo(video) {
      const isLive = Object.is(video.duration, Infinity);
      const videoInfo = { ...Tools.getCenterPoint(video), src: video.currentSrc, isLive };
      this.setParentVideoInfo(videoInfo);
    },
    setParentVideoInfo(videoInfo) {
      window.videoInfo = this.videoInfo = videoInfo;
      if (!Tools.isTopWin()) return videoInfo.iframeSrc = location.href, Tools.postMessage(window.parent, { videoInfo });
      this.setupPickerEpisodeListener();
      this.setupScriptMenuCommand();
      this.sendTopInfo();
    },
    sendTopInfo() {
      const title = document.title;
      const { host, href } = location;
      const topInfo = { title, innerWidth, host, href, hash: Tools.hashCode(href) };
      window.topInfo = this.topInfo = topInfo;
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
      const cls = "__hc";
      if (!hide) return Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));
      [...Tools.getParents(this.player, true, 3), ...Tools.getIFrames()].forEach((el) => {
        el?.blur(), Tools.addCls(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
      });
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
  class TimedStorage extends StorageItem {
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
    SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, (value) => parseInt(value, 10)),
    OVERRIDE_KEYBOARD: new StorageItem("OVERRIDE_KEYBOARD", false, false, (value) => Boolean(value)),
    DISABLE_AUTO: new StorageItem("CLOSE_AUTO_WEB_FULL_SCREEN", false, false, (value) => Boolean(value)),
    ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, (value) => parseInt(value, 10)),
    ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
    DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
    DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, (value) => Boolean(value)),
    DISABLE_SCREENSHOT: new StorageItem("DISABLE_ZOOM", true, false, (value) => Boolean(value)),
    CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
    REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
    PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat)
  };
  const SiteIcons = {
    "live.bilibili.com": { webFull: "#businessContainerElement" },
    "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "www.bilibili.com": { webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
    "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
    "www.iqiyi.com": { webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=buttons_playNext]" },
    "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
    "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
    "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    "v.qq.com": { webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
    "tv.sohu.com": { webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
    name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" }
  };
  const Keyboard = Object.freeze({
    A: "KeyA",
    D: "KeyD",
    K: "KeyK",
    L: "KeyL",
    M: "KeyM",
    N: "KeyN",
    P: "KeyP",
    R: "KeyR",
    S: "KeyS",
    Z: "KeyZ",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Sub: "NumpadSubtract",
    Add: "NumpadAdd",
    Space: "Space"
  });
  const Keydown = {
    preventDefault(event, { code, altKey } = event) {
      const overrideKey = [Keyboard.Space, Keyboard.Left, Keyboard.Right];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
      const preventKeys = [Keyboard.K, Keyboard.L, Keyboard.M, Keyboard.N, Keyboard.P, Keyboard.R].includes(code);
      const zoomKeys = !this.isDisableZoom() && [Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right].includes(code);
      if (isNumberKey || isOverrideKey || preventKeys || altKey && zoomKeys) Tools.preventDefault(event);
    },
    processkeystrokes({ key, code, ctrlKey, shiftKey, altKey }) {
      code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
      const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
      return keys.filter(Boolean).join("_");
    },
    setupKeydownListener() {
      window.addEventListener("keyup", (event) => this.preventDefault(event), true);
      window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
      window.addEventListener("message", ({ data }) => {
        if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
        if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
        if (data?.topInfo) window.topInfo = this.topInfo = data.topInfo;
        if (data?.defaultPlaybackRate) this.defPlaybackRate();
        this.processEvent(data);
      });
    },
    keydownHandler(event, { key, code } = event) {
      const target = event.composedPath()[0];
      const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (this.normalSite() || isInput || target?.isContentEditable) return;
      if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      key = this.processkeystrokes(event);
      if ([Keyboard.N, Keyboard.P].includes(code)) return Tools.postMessage(window.top, { key });
      this.processEvent({ key });
    },
    processEvent(data) {
      if (!this.player) Tools.sendToIFrames(data);
      if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
    },
    execHotKeyActions(key) {
      const dict = {
        M: () => this.videoMuted(),
        R: () => this.videoRotate(),
        Z: () => this.defPlaybackRate(),
        L: () => this.freezeVideoFrame(),
        K: () => this.freezeVideoFrame(true),
        D: () => Site.isMatch() && this.triggerIconElement(SiteIcons.name.danmaku),
        N: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode(),
        P: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance(),
        LEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-Storage.SKIP_INTERVAL.get()),
        RIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(Storage.SKIP_INTERVAL.get()),
        0: () => this.adjustVideoTime(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
        SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.player),
        SHIFT_P: () => this.togglePictureInPicture(),
        SHIFT_L: () => this.toggleNativeControls(),
        CTRL_ALT_A: () => this.videoScreenshot(),
        SHIFT_R: () => this.videoMirrorFlip(),
        CTRL_Z: () => this.restoreTransform(),
        ALT_SUB: () => this.videoZoom(true),
        ALT_ADD: () => this.videoZoom()
      };
      const step = Storage.PLAY_RATE_STEP.get();
      ["A", "ADD"].forEach((k) => dict[k] = () => this.adjustPlaybackRate(step));
      ["S", "SUB"].forEach((k) => dict[k] = () => this.adjustPlaybackRate(-step));
      Array.from({ length: 7 }, (_, i) => dict[`CTRL_${i}`] = () => this.setPlaybackRate(10 + i));
      ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => dict[k] = () => this.moveVideo(k));
      dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
    },
    triggerIconElement(name) {
      if (Tools.isTooFrequent("icon")) return;
      const index = Object.values(SiteIcons.name).indexOf(name);
      if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
      SiteIcons.name.webFull === name ? this.liveWebFullscreen() : this.getBiliLiveIcons()?.[index]?.click();
    }
  };
  const WebLogin = {
    removeLoginPopups() {
      this.removeQiyiLogin(), this.removeBiliLogin(), this.removeTencentLogin();
    },
    removeTencentLogin: () => Site.isTencent() && Tools.query("#login_win")?.remove(),
    removeQiyiLogin: () => Site.isQiyi() && Tools.query("#qy_pca_login_root")?.remove(),
    removeBiliLogin() {
      if (!Site.isBili() || this.BiliTimerID) return;
      if (document.cookie.includes("DedeUserID")) return _unsafeWindow.player?.requestQuality(80);
      this.BiliTimerID = setInterval(() => {
        if (_unsafeWindow.__BiliUser__.cache.data.isLogin) clearInterval(this.BiliTimerID);
        _unsafeWindow.__BiliUser__.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
      }, Consts.ONE_SEC * 3);
    }
  };
  const { ENABLE_THIS_SITE_AUTO: ENABLE_THIS, CURR_EPISODE_SELECTOR: EPISODE_SELECTOR } = Storage;
  const MenuCommand = {
    isDisableZoom: () => Storage.DISABLE_ZOOM_MOVE.get(),
    isDisableAuto: () => Storage.DISABLE_AUTO.get(),
    isOverrideKeyboard: () => Storage.OVERRIDE_KEYBOARD.get(),
    isDisablePlaybackRate: () => Storage.CLOSE_PLAY_RATE.get(),
    isDisableScreenshot: () => Storage.DISABLE_SCREENSHOT.get(),
    isEnbleThisWebSiteAuto: () => ENABLE_THIS.get(Tools.isTopWin() ? location.host : window?.topInfo?.host),
    setupScriptMenuCommand() {
      if (this.hasMenu || !Tools.isTopWin() || Tools.isTooFrequent("menu")) return;
      this.setupMenuChangeListener();
      this.registMenuCommand();
      this.hasMenu = true;
    },
    setupMenuChangeListener() {
      const host = location.host;
      [Storage.CLOSE_PLAY_RATE.name, Storage.OVERRIDE_KEYBOARD.name, ENABLE_THIS.name + host, EPISODE_SELECTOR.name + host].forEach(
        (key) => _GM_addValueChangeListener(key, () => this.registMenuCommand())
      );
    },
    registMenuCommand() {
      const host = location.host;
      const isEnble = this.isEnbleThisWebSiteAuto();
      const siteFun = () => ENABLE_THIS.set(host, !isEnble);
      const delPicker = () => Storage.CURR_EPISODE_SELECTOR.del(host) & Storage.REL_EPISODE_SELECTOR.del(host);
      [
        { title: "设置零键秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL, isDisable: false },
        { title: "设置倍速步长", cache: Storage.PLAY_RATE_STEP, isDisable: this.isDisablePlaybackRate() },
        { title: "设置快进/退秒数", cache: Storage.SKIP_INTERVAL, isDisable: !this.isOverrideKeyboard() },
        { title: `此站${isEnble ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isDisable: Site.isMatch(), fn: siteFun },
        { title: "删除此站剧集选择器", cache: EPISODE_SELECTOR, isDisable: !EPISODE_SELECTOR.get(host), fn: delPicker },
        { title: "快捷键说明", cache: Storage.DISABLE_AUTO, isDisable: false, fn: () => this.shortcutKeysPopup() },
        { title: "更多设置", cache: Storage.OVERRIDE_KEYBOARD, isDisable: false, fn: () => this.moreSettPopup() }
      ].forEach(({ title, cache, isDisable, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        _GM_unregisterMenuCommand(this[id]);
        if (isDisable) return;
        this[id] = _GM_registerMenuCommand(title, () => {
          if (fn) return fn.call(this);
          const input = prompt(title, cache.get());
          if (!isNaN(input) && cache.parser(input)) cache.set(input);
        });
      });
    },
    moreSettPopup() {
      const configs = [
        { name: "cut", text: "禁用视频截图", cache: Storage.DISABLE_SCREENSHOT },
        { name: "zoom", text: "禁用缩放与移动", cache: Storage.DISABLE_ZOOM_MOVE },
        { name: "auto", text: "禁用自动网页全屏", cache: Storage.DISABLE_AUTO, hide: !Site.isMatch() },
        { name: "rate", text: "禁用视频倍速调节", cache: Storage.CLOSE_PLAY_RATE, hide: this.isLive() },
        { name: "time", text: "禁用播放进度记录", cache: Storage.DISABLE_MEMORY_TIME, hide: this.isLive() },
        { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEYBOARD }
      ];
      const html = configs.map(
        ({ name, text, hide }) => `<label class="__menu ${hide && "hide"}">${text}<input name="${name}" type="checkbox"/></label>`
      );
      Swal.fire({
        width: 350,
        title: "更多设置",
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        html: html.join(Consts.EMPTY),
        customClass: { container: "monkey-web-fullscreen" },
        didOpen(popup) {
          Tools.querys(".__menu input", popup).forEach((ele, i) => {
            ele.checked = configs[i].cache.get();
            ele.addEventListener("click", function() {
              this.name === "rate" && Tools.postMessage(window, { defaultPlaybackRate: this.checked });
              setTimeout(() => configs[i].cache.set(this.checked), 100), Tools.notyf("修改成功！");
            });
          });
        }
      });
    },
    shortcutKeysPopup() {
      const shortcutKeys = [
        { key: "P", desc: "切换网页全屏" },
        { key: "N", desc: "切换下集视频" },
        { key: "Z", desc: "恢复正常倍速" },
        { key: "R", desc: "画面旋转 90 度" },
        { key: "M", desc: "静音 / 取消静音" },
        { key: "D", desc: "显示 / 隐藏 弹幕" },
        { key: "L / K", desc: "下一帧 / 上一帧" },
        { key: "Ctrl Z", desc: "复位缩放与移动" },
        { key: "Shift L", desc: "显示原生控制栏" },
        { key: "Shift R", desc: "视频水平镜像翻转" },
        { key: "Shift P", desc: "进入 / 退出 画中画" },
        { key: "Ctrl Alt A", desc: "视频截图 (默认禁用)" },
        { key: "Alt ➕ / ➖", desc: "视频缩放 (默认禁用)" },
        { key: "A / S 或 ➕ / ➖", desc: "播放倍速 ±0.25" },
        { key: "Alt ◀️🔼🔽▶️", desc: "移动视频画面 (默认禁用)" },
        { key: "◀️▶️", desc: "快退 / 快进 5秒 (默认禁用)" },
        { key: "空格", desc: "播放 / 暂停 (默认禁用)" },
        { key: "1️ 至 9️", desc: "1️ 至 9️ 倍速" },
        { key: "数字 0️", desc: "快进 30 秒" }
      ];
      const rows = shortcutKeys.map(({ key, desc }) => `<tr><td>${key}</td><td>${desc}</td></tr>`).join(Consts.EMPTY);
      Swal.fire({
        width: 600,
        title: "快捷键说明",
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        customClass: { container: "monkey-web-fullscreen" },
        html: `<table><tr><th>快捷键</th><th>说明</th></tr>${rows}</table>`
      });
    }
  };
  const VideoControl = {
    isEnded() {
      return Math.floor(this.player.currentTime) === Math.floor(this.player.duration);
    },
    isDynamicDuration(video) {
      if (!video?.__duration) return false;
      return Math.floor(video.duration) > Math.floor(video.__duration);
    },
    initVideoProperties(video) {
      video.volume = 1;
      video.hasToast = false;
      video.hasWebFull = false;
      video.__duration = video.duration;
    },
    playOrPause: (video) => Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause(),
    tryplay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
    checkUsable() {
      if (!this.player || this.isDisablePlaybackRate()) return false;
      if (this.isBackgroundVideo(this.player) || this.isEnded()) return false;
      if (this.isLive() || this.isDynamicDuration(this.player)) return false;
      if (!Tools.validDuration(this.player)) return false;
      return true;
    },
    setPlaybackRate(playRate, show = true) {
      if (!this.checkUsable()) return;
      window.videoEnhance.setPlaybackRate(this.player, playRate);
      if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
      Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
    },
    adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
      if (!this.player) return;
      const playRate = Math.max(Storage.PLAY_RATE_STEP.get(), Number(this.player.playbackRate) + step);
      this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
    },
    defPlaybackRate() {
      if (this.isDisablePlaybackRate()) return;
      this.setPlaybackRate(Consts.DEF_PLAY_RATE, false);
      this.showToast("已恢复正常倍速播放");
    },
    useCachePlaybackRate(video) {
      if (this.isDisablePlaybackRate()) return;
      const playRate = Storage.CACHED_PLAY_RATE.get();
      if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
      this.setPlaybackRate(playRate, !video.hasToast);
      video.hasToast = true;
    },
    adjustVideoTime(second = Storage.SKIP_INTERVAL.get()) {
      if (!this.player || !Tools.validDuration(this.player) || second > 0 && this.player.isEnded) return;
      const currentTime = Math.min(Number(this.player.currentTime) + second, this.player.duration);
      this.setCurrentTime(currentTime);
    },
    cachePlayTime(video) {
      if (this.isDynamicDuration(video) || video.duration < 120) return;
      if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return;
      if (!this.topInfo || this.isLive() || !Tools.validDuration(video)) return;
      if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded()) return this.delPlayTime(video);
      Storage.PLAY_TIME.set(this.getTimeKey(video), Number(video.currentTime) - 1, 7);
    },
    useCachePlayTime(video) {
      if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
      const time = Storage.PLAY_TIME.get(this.getTimeKey(video));
      if (time <= Number(video.currentTime)) return this.hasUsedPlayTime = true;
      this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
        el.style.setProperty("transform", `translateY(${-5 - el.offsetHeight}px)`);
      });
      this.hasUsedPlayTime = true;
      this.setCurrentTime(time);
    },
    delPlayTime(video) {
      Storage.PLAY_TIME.del(this.getTimeKey(video));
    },
    getTimeKey(video) {
      return this?.topInfo?.hash + "_" + video.duration;
    },
    setCurrentTime(currentTime) {
      if (currentTime) this.player.currentTime = Math.max(0, currentTime);
    },
    videoMuted() {
      if (!this.player) return;
      const isMuted = this.player.muted || !this.player.volume;
      this.player.muted = !isMuted;
      this.player.volume = Number(isMuted);
      this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
    },
    togglePictureInPicture() {
      if (this.player) document.pictureInPictureElement ? document.exitPictureInPicture() : this.player?.requestPictureInPicture();
    },
    videoMirrorFlip() {
      if (!this.player) return;
      const tsr = this.player.tsr;
      tsr.isMirrored = !tsr.isMirrored;
      this.setVideoTsr("--mirror", tsr.isMirrored ? -1 : 1);
    },
    videoRotate() {
      if (!this.player) return;
      const tsr = this.player.tsr;
      tsr.rotation = (tsr.rotation + 90) % 360;
      const { videoWidth, videoHeight } = this.player;
      const isVertical = [90, 270].includes(tsr.rotation);
      const scale = isVertical ? videoHeight / videoWidth : 1;
      this.setVideoTsr("--scale", scale).setVideoTsr("--rotate", `${tsr.rotation}deg`);
    },
    videoZoom(isDown) {
      if (!this.player || this.isDisableZoom()) return;
      const tsr = this.player.tsr;
      const zoom = tsr.zoom + (isDown ? -Consts.ZOOM_STEP : Consts.ZOOM_STEP);
      if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;
      tsr.zoom = zoom;
      this.setVideoTsr("--zoom", zoom / 100);
      this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
    },
    moveVideo(direction) {
      if (!this.player || this.isDisableZoom()) return;
      const tsr = this.player.tsr;
      const { x, y, desc } = {
        ALT_UP: { y: -Consts.MOVE_STEP, desc: "向上移动" },
        ALT_DOWN: { y: Consts.MOVE_STEP, desc: "向下移动" },
        ALT_LEFT: { x: -Consts.MOVE_STEP, desc: "向左移动" },
        ALT_RIGHT: { x: Consts.MOVE_STEP, desc: "向右移动" }
      }[direction];
      ((tx = 0, ty = 0) => (tsr.moveX += tx, tsr.moveY += ty))(x, y);
      this.setVideoTsr("--moveX", `${tsr.moveX}px`).setVideoTsr("--moveY", `${tsr.moveY}px`);
      this.showToast(`${desc}：${x ? tsr.moveX : tsr.moveY}px`, Consts.ONE_SEC);
    },
    restoreTransform() {
      if (!this.player || this.isDisableZoom()) return;
      this.setVideoTsr("--zoom", 1).setVideoTsr("--moveX", 0).setVideoTsr("--moveY", 0).setVideoTsr("--scale", 1).setVideoTsr("--mirror", 1).setVideoTsr("--rotate", "0deg");
      window.videoEnhance.resetTsr(this.player);
    },
    videoScreenshot() {
      if (!this.player || this.isDisableScreenshot()) return;
      this.player.setAttribute("crossorigin", "anonymous");
      const canvas = document.createElement("canvas");
      canvas.height = this.player.videoHeight;
      canvas.width = this.player.videoWidth;
      const ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(this.player, 0, 0, canvas.width, canvas.height);
        _GM_download(canvas.toDataURL("image/png"), `视频截图_${Date.now()}.png`);
      } catch (e) {
        canvas.style.setProperty("max-width", "98vw");
        const popup = window.open(Consts.EMPTY, "_blank", "width=1000,height=570,top=130,left=270");
        popup.document.title = "鼠标右键选择「图片另存为」";
        popup.document.body.appendChild(canvas);
        console.debug(e);
      }
    },
    freezeVideoFrame(isPrev) {
      if (!this.player) return;
      !this.player.paused && this.player.pause();
      this.player.currentTime += (isPrev ? -1 : 1) / 24;
    },
    toggleNativeControls() {
      if (!this.player) return;
      this.player.controls = !this.player.controls;
    },
    customToast(startText, colorText, endText, duration, isRemove) {
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(startText));
      const child = span.cloneNode(true);
      child.textContent = colorText;
      child.setAttribute("style", "margin:0 3px!important;color:#FF5F00!important;");
      span.appendChild(child);
      span.appendChild(document.createTextNode(endText));
      return this.showToast(span, duration, isRemove);
    },
    showToast(content, duration = Consts.ONE_SEC * 3, isRemove = true) {
      return new Promise((resolve) => {
        const el = document.createElement("div");
        el.setAttribute("class", "monkey-toast");
        if (isRemove) Tools.query(".monkey-toast")?.remove();
        content instanceof Element ? el.appendChild(content) : el.innerHTML = content;
        this.getVideoWrapper()?.appendChild(el);
        setTimeout(() => (el.style.opacity = 0, setTimeout(() => el.remove(), Consts.ONE_SEC / 3)), duration);
        resolve(el);
      });
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return "00:00";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return [...h ? [h] : [], m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
    },
    setVideoTsr(name, value) {
      Tools.addCls(this.player, "__tsr");
      try {
        this.player.__trans = this.player.__trans ?? getComputedStyle(this.player)?.getPropertyValue("transform");
        this.player?.style?.setProperty("--deftsr", this.player.__trans);
      } catch (e) {
        console.debug(e);
      }
      this.player?.style?.setProperty(name, value);
      return this;
    }
  };
  const WebFullScreen = {
    autoWebFullscreen(video) {
      if (this.player !== video) return;
      if (Site.isMatch() && this.isDisableAuto()) return;
      if (!Site.isMatch() && !this.isEnbleThisWebSiteAuto()) return;
      if (!this.topInfo || video.hasWebFull || !video.offsetWidth) return;
      if (video.offsetWidth >= this.topInfo.innerWidth) return video.hasWebFull = true;
      Tools.postMessage(window.top, { key: "P" });
    },
    liveWebFullscreen() {
      _unsafeWindow.top.scrollTo({ top: 70 });
      const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
      if (el) _unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top });
      if (!Tools.hasCls(document.body, "hide-asida-area")) {
        _unsafeWindow.top?.livePlayer?.volume(100);
        _unsafeWindow.top?.livePlayer?.switchQuality("10000");
        localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0);
        Tools.addCls(document.body, "hide-asida-area", "hide-aside-area");
      }
      const icons = this.getBiliLiveIcons();
      return Tools.triggerClick(icons?.[1]);
    },
    autoExitWebFullscreen() {
      if (!Site.isBili() && !Site.isAcFun()) return;
      if (this.player.offsetWidth === innerWidth) this.triggerIconElement(SiteIcons.name.webFull);
      setTimeout(() => {
        const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
        if (!Tools.query(".video-pod") || isLast) Tools.query(".bpx-player-ending-related-item-cancel")?.click();
      });
    },
    getBiliLiveIcons() {
      Tools.triggerMousemove(this.getVideo());
      return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
    }
  };
  const SwitchEpisode = {
    switchEpisode(isPrev = false) {
      const targetEpisode = this.getTargetEpisode(this.getCurrentEpisode(), isPrev) ?? this.getTargetEpisodeByText(isPrev) ?? this.getTargetEpisodeByClass(isPrev);
      this.jumpToTargetEpisode(targetEpisode);
    },
    getCurrentEpisode() {
      return Storage.REL_EPISODE_SELECTOR.get(location.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeByLink();
    },
    getCurrentEpisodeByLink() {
      const { pathname, search } = location;
      const last = pathname.split("/").pop();
      const links = Tools.querys(`:is(a[href*="${pathname + search}"], a[href*="${last}"], a[href*="${search}"])`);
      return links.length <= 1 ? this.getEpisodeWrapper(links[0]) : this.findCurrentEpisode(links, pathname + search);
    },
    findCurrentEpisode(eles, pageUrl) {
      const filter = [
        "h1, header, footer",
        "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
        "[id*='guankan'], [id*='history'], [class*='history'], [class*='record'], [class*='lishi']"
      ];
      eles = eles.filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !Tools.closest(el, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
      }).map(this.getEpisodeWrapper).filter((el) => this.getAllEpisodes(el).map(this.getEpisodeNumber).filter(Boolean).length > 1);
      return eles.length <= 1 ? eles[0] : eles.find((el) => Tools.hasCls(el, "cur", "active") || !!this.getEpisodeNumber(el));
    },
    getEpisodeNumber: (ele) => Tools.getNumbers(ele?.innerText?.replace(/-/g, Consts.EMPTY))?.shift(),
    getTargetEpisode(element, isPrev = false) {
      if (!element) return;
      const episodes = this.getAllEpisodes(element);
      const numbers = episodes.map(this.getEpisodeNumber).filter(Boolean);
      if (numbers.length < 2) return;
      const index = episodes.indexOf(element);
      const currNumber = this.getEpisodeNumber(element);
      const { leftSmall, rightLarge } = this.compareLeftRight(numbers, currNumber, index);
      return (leftSmall || rightLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
    },
    getAllEpisodes(element) {
      if (!element) return [];
      const eleName = element.tagName;
      const eleClass = Array.from(element.classList);
      const sibling = Tools.findSibling(element, eleName);
      const children = Array.from(sibling?.parentElement?.children ?? []);
      return children.filter((ele) => {
        const currClass = Array.from(ele.classList);
        const hasSameClass = eleClass.some((value) => currClass.includes(value));
        return currClass.length ? hasSameClass : ele.tagName === eleName;
      });
    },
    jumpToTargetEpisode(element) {
      const stack = [element].filter(Boolean);
      while (stack.length > 0) {
        const current = stack.pop();
        if (current.matches("a, button")) return current?.click();
        stack.push(...Array.from(current.children).reverse());
        current?.click && current.click();
      }
    },
    getEpisodeWrapper(element) {
      while (element && element.parentElement) {
        const siblings = Array.from(element.parentElement.children);
        if (siblings.length > 1 && siblings.some((sib) => sib !== element && sib.tagName === element.tagName)) return element;
        element = element.parentElement;
      }
      return null;
    },
    getTargetEpisodeByText(isPrev = false) {
      const ignore = (el) => !el?.innerText?.includes("自动");
      const texts = isPrev ? ["上集", "上一集", "上话", "上一话", "上一个"] : ["下集", "下一集", "下话", "下一话", "下一个"];
      return Tools.findByText("attr", texts).filter(ignore).shift() ?? Tools.findByText("text", texts).filter(ignore).shift();
    },
    getTargetEpisodeByClass(isPrev = false) {
      if (isPrev) return null;
      return Tools.query("[class*='control'] [class*='next' i]");
    },
    compareLeftRight: (numbers, compareNumber = 0, index) => ({
      leftSmall: numbers.some((val, i) => i < index && val < compareNumber),
      rightLarge: numbers.some((val, i) => i > index && val > compareNumber)
    })
  };
  const PickerEpisode = {
    setupPickerEpisodeListener() {
      if (Site.isMatch() || this.hasPickerListener) return;
      this.hasPickerListener = true;
      document.body.addEventListener(
        "click",
        (event, { target, ctrlKey, altKey, isTrusted } = event) => {
          if (!ctrlKey || !altKey || !isTrusted || this.isLive()) return;
          if (!Tools.isTopWin()) return Tools.notyf("此页面不能抓取 (•ิ_•ิ)?", true);
          Tools.preventDefault(event);
          const hasCurrentSelector = Storage.CURR_EPISODE_SELECTOR.get(location.host);
          const hasRelativeSelector = Storage.REL_EPISODE_SELECTOR.get(location.host);
          if (hasCurrentSelector && hasRelativeSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);
          const number = this.getEpisodeNumber(target);
          if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);
          hasCurrentSelector ? this.pickerRelativeEpisodeChain(target) : this.pickerCurrentEpisodeChain(target);
        },
        true
      );
    },
    pickerCurrentEpisodeChain(element) {
      if (Storage.CURR_EPISODE_SELECTOR.get(location.host)) return;
      this.pickerEpisodePopup(element, {
        validBtnCallback(value) {
          try {
            const number = this.getEpisodeNumber(Tools.query(value));
            number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.debug(e);
          }
        },
        confirmCallback(value) {
          Storage.CURR_EPISODE_SELECTOR.set(location.host, value);
          Tools.notyf("继续拾取元素 ＼(＞０＜)／");
        }
      });
    },
    pickerRelativeEpisodeChain(element) {
      if (Storage.REL_EPISODE_SELECTOR.get(location.host)) return;
      this.pickerEpisodePopup(element, {
        validBtnCallback(value) {
          try {
            const container = this.getEpisodeWrapper(Tools.query(value));
            const numbers = this.getAllEpisodes(container)?.map(this.getEpisodeNumber);
            numbers.length ? Tools.notyf(`所有集数：${numbers.join(" ")}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.debug(e);
          }
        },
        confirmCallback(value) {
          Storage.REL_EPISODE_SELECTOR.set(location.host, value);
          Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
        }
      });
    },
    getCurrentEpisodeBySelector() {
      const num = this.getEpisodeNumber(Tools.query(Storage.CURR_EPISODE_SELECTOR.get(location.host)));
      const current = this.getEpisodeWrapper(Tools.query(Storage.CURR_EPISODE_SELECTOR.get(location.host)));
      const episodes = this.getAllEpisodes(this.getEpisodeWrapper(Tools.query(Storage.REL_EPISODE_SELECTOR.get(location.host))));
      return episodes.includes(current) ? current : episodes.find((el) => this.getEpisodeNumber(el) === num);
    },
    pickerEpisodePopup(element, { validBtnCallback, confirmCallback }) {
      Swal.fire({
        html: `<h4>验证能正确取到集数，再确定保存</h4>
      <textarea id="__picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
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
          const value = Tools.query("#__picker").value.trim();
          return value ? validBtnCallback.call(this, value) ?? false : Tools.notyf("元素选择器不能为空！", true);
        },
        preConfirm: () => Tools.query("#__picker").value.trim() || Tools.notyf("元素选择器不能为空！", true),
        didOpen: () => Tools.query("#__picker").value = Tools.getParentChain(element)
      }).then((result) => result.isConfirmed && confirmCallback.call(this, result.value));
    }
  };
  const WebFullEnhance = {
    webFullEnhance() {
      if (this.normalSite() || Tools.isTooFrequent("enhance")) return;
      if (this.webFullWrap) return this.exitWebFull();
      const wrap = this.getVideoHostContainer();
      if (!wrap || wrap.matches(":is(html, body)")) return;
      this.webFullWrap = wrap;
      wrap.top = wrap.top ?? wrap.getBoundingClientRect()?.top ?? 0;
      wrap.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.addCls(el, "__flex-1"));
      Tools.getParents(wrap, true)?.forEach((el) => {
        el.__cssText = el.style.cssText, Tools.setPart(el, Consts.webFull);
        el.style.cssText += "width:100vw!important;height:100vh!important;";
      });
    },
    exitWebFull() {
      const wrap = this.webFullWrap;
      Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.delCls(el, "__flex-1"));
      Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => (Tools.delPart(el, Consts.webFull), el.style = el.__cssText));
      Tools.scrollTop((Tools.getElementRect(wrap)?.top < 0 ? wrap?.top + wrap.scrollY : wrap?.top) - 120);
      this.webFullWrap = null;
    },
    getVideoHostContainer() {
      if (this.player) return this.getVideoWrapper();
      const videoIFrame = this.getVideoIFrame();
      if (videoIFrame) return videoIFrame;
      const ifrs = Tools.getIFrames();
      const { centerX, centerY } = this?.videoInfo ?? {};
      return ifrs.length <= 1 ? ifrs[0] : ifrs.find((el) => Tools.isVisible(el) && Tools.pointInElement(centerX, centerY, el));
    },
    getVideoIFrame() {
      if (!this?.videoInfo?.iframeSrc) return null;
      const { pathname, search } = new URL(this.videoInfo.iframeSrc);
      const decoded = decodeURI(search);
      const partial = decoded.slice(0, decoded.length * 0.8);
      return Tools.query(`iframe[src*="${pathname + partial}"]`);
    },
    getVideoWrapper() {
      const controlsParent = this.findVideoCtrlBarParent();
      return controlsParent ? this.findVideoContainer(controlsParent) : this.findVideoContainer();
    },
    findVideoCtrlBarParent() {
      const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
      const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
      const controlsParent = Tools.findParentWithChild(this.player, ctrl);
      if (!controlsParent) return null;
      const { centerX, centerY } = Tools.getCenterPoint(controlsParent);
      const { width: videoW } = Tools.getElementRect(this.player);
      const { width } = Tools.getElementRect(controlsParent);
      const inRect = Tools.pointInElement(centerX, centerY, this.player);
      return Math.floor(width) <= Math.floor(videoW) && inRect ? controlsParent : null;
    },
    findVideoContainer(container, maxLevel = 4) {
      const video = this.player;
      container = container ?? video.parentElement;
      const { width: cw, height: ch } = Tools.getElementRect(container);
      for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        const { width, height } = Tools.getElementRect(parent);
        if (Math.floor(width) === Math.floor(cw) && Math.floor(height) === Math.floor(ch)) container = parent;
        if (!parent.matches("video") && this.hasExplicitSize(parent)) return container;
      }
      return container;
    },
    /**
     * 检查元素是否设置了固定宽度或高度
     * @param {HTMLElement} element - 需要检查的DOM元素
     * @returns {boolean} 如果宽度或高度是固定尺寸则返回true，否则返回false
     */
    sizeCheckCache: /* @__PURE__ */ new WeakMap(),
    hasExplicitSize(element) {
      if (this.isFixedSizeValue(element.style)) return true;
      if (this.sizeCheckCache.has(element)) return this.sizeCheckCache.get(element);
      const result = this.getCachedStyleSheets().some((sheet) => this.checkStyleSheet(element, sheet));
      this.sizeCheckCache.set(element, result);
      return result;
    },
    styleSheetCache: [],
    getCachedStyleSheets() {
      if (this.styleSheetCache.length) return this.styleSheetCache;
      const roots = [...getShadowRoots(document.body, true), document];
      roots.forEach((root) => this.styleSheetCache.push(...Array.from(root.styleSheets)));
      return this.styleSheetCache;
    },
    checkStyleSheet(element, sheet) {
      try {
        for (const rule of sheet.cssRules) {
          if (this.checkStyleRule(element, rule)) return true;
          if (rule instanceof CSSMediaRule && window.matchMedia(rule.conditionText)?.matches) {
            for (const mediaRule of rule.cssRules) {
              if (this.checkStyleRule(element, mediaRule)) return true;
            }
          }
        }
      } catch (e) {
        console.debug(`无法访问样式表 ${sheet.href}:`, e);
      }
      return false;
    },
    checkStyleRule(element, rule) {
      if (!(rule instanceof CSSStyleRule)) return false;
      return element.matches(rule.selectorText) && this.isFixedSizeValue(rule.style);
    },
    isFixedSizeValue(style) {
      const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
      const cssFunRegex = /(calc|var|min|max|clamp)\([^)]+\)/;
      return ["width", "height"].some((prop) => {
        const value = style.getPropertyValue(prop) || style[prop];
        return value && (sizeRegex.test(value) || cssFunRegex.test(value));
      });
    }
  };
  const VideoEvents = {
    loadedmetadata() {
      App.autoWebFullscreen(this);
      Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
    },
    loadeddata() {
      App.initVideoProperties(this);
      Tools.query(".conplaying")?.click();
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      App.autoWebFullscreen(this);
      App.cachePlayTime(this);
    },
    canplay() {
      if (this.hasTryplay || Tools.querys("video").length) return;
      this.hasTryplay = true;
      App.tryplay(this);
    },
    playing() {
      this.isEnded = false;
      if (this.duration < 5) return;
      App.setCurrentVideo(this);
      App.useCachePlaybackRate(this);
      App.useCachePlayTime(this);
    },
    pause() {
      Tools.query(".ec-no")?.click();
      Tools.query('[id*="loading"]._noplayer')?.remove();
    },
    ended() {
      this.isEnded = true;
      this.hasToast = false;
      App.autoExitWebFullscreen();
      App.delPlayTime(this);
    }
  };
  class VideoEnhancer {
    constructor() {
      __publicField(this, "attr", "enhanced");
      __publicField(this, "selector", ":is(video, fake-video):not([enhanced])");
      // 腾讯视频 fake-iframe-video
      __publicField(this, "defaultTsr", { zoom: 100, moveX: 0, moveY: 0, rotation: 0, isMirrored: false });
      this.setupObserver();
      this.hackAttachShadow();
      this.setupExistingVideos();
      this.hookMediaMethod("play", (video) => this.enhanced(video));
    }
    setupExistingVideos() {
      const videos = Tools.querys(this.selector);
      videos.forEach((video) => this.enhanced(video));
    }
    setupObserver() {
      Tools.createObserver(document.body, (mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type !== "childList" || mutation.addedNodes.length === 0) return;
          this.processAddedNodes(mutation.addedNodes);
        }
      });
    }
    processAddedNodes(nodes) {
      for (const node of nodes) {
        if (node instanceof HTMLVideoElement && !node.hasAttribute(this.attr)) {
          this.enhanced(node);
        } else if (node instanceof Element && node.hasChildNodes()) {
          const childVideos = Tools.querys(this.selector, node);
          childVideos.forEach((video) => this.enhanced(video));
        }
      }
    }
    enhanced(video) {
      if (video.hasAttribute(this.attr)) return;
      video.__ctrl = video.controls;
      this.setupEventListeners(video);
      video.tsr = { ...this.defaultTsr };
    }
    setupEventListeners(video) {
      video.setAttribute(this.attr, true);
      Object.entries(VideoEvents).forEach(([type, handler]) => {
        video.removeEventListener(type, handler, true);
        video.addEventListener(type, handler, true);
      });
    }
    resetTsr(video) {
      video.tsr = { ...this.defaultTsr };
    }
    setPlaybackRate(video, playRate) {
      this.bypassPlaybackRateLimit(video);
      video.playbackRate = video.__playRate = Tools.toFixed(playRate);
    }
    /**
     * 绕过视频播放器的播放速率限制
     * 支持标准HTML5视频元素和特殊实现(如腾讯视频的fake-video)
     *
     * 实现原理:
     * 1. 对于标准HTMLMediaElement，直接设置playbackRate属性
     * 2. 对于特殊实现(如fake-video)，拦截setter并调用其内部方法
     * 3. 保留原始功能的同时覆盖速率限制逻辑
     *
     * @param {HTMLMediaElement|Object} video - 视频元素或fake-video实例
     * @see 腾讯视频fake-video实现 https://v.qq.com/wasm-kernel/1.0.49/fake-video-element-iframe.js
     */
    bypassPlaybackRateLimit(video) {
      this.defineProperty(video, "playbackRate", {
        set(value, setter) {
          if (this.playbackRate === value) return;
          if (this instanceof HTMLMediaElement) return this.__playRate === value && setter(value);
          this._playbackRate = value;
          this._quality.setPlaybackRate(value);
          this?.mailToWorker({ cmd: "callWorker_setRate", rate: value });
          Promise.resolve().then(() => {
            this?.emit("ratechange", this._playbackRate);
          });
        }
      });
    }
    defineProperty(video, property, descs) {
      try {
        const isMediaElement = video instanceof HTMLMediaElement;
        const videoPrototype = isMediaElement ? HTMLMediaElement.prototype : Object.getPrototypeOf(video);
        const original = Object.getOwnPropertyDescriptor(videoPrototype, property);
        if (!original) throw new Error(`属性 ${property} 不存在`);
        Object.defineProperty(isMediaElement ? video : videoPrototype, property, {
          get() {
            return descs.get ? descs.get.call(this, original.get.call(this)) : original.get.call(this);
          },
          set(value) {
            descs.set ? descs.set.call(this, value, original.set.bind(this)) : original.set.call(this, value);
          },
          configurable: true
        });
      } catch (e) {
        console.error(`修改 ${property} 属性时出错：`, e);
      }
    }
    hookMediaMethod(method, callback) {
      const original = HTMLMediaElement.prototype[method];
      HTMLMediaElement.prototype[method] = function() {
        callback.call(this, this);
        return original.apply(this, arguments);
      };
    }
    hackAttachShadow() {
      Element.prototype._attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function(options) {
        const shadowRoot = this._attachShadow.call(this, { ...options, mode: "open" });
        const shadowEvent = new CustomEvent("shadow-attached", { bubbles: true, detail: { shadowRoot } });
        document.dispatchEvent(shadowEvent);
        return shadowRoot;
      };
    }
  }
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("sweetalert2");
  cssLoader("notyf/notyf.min.css");
  [Keydown, WebLogin, MenuCommand, VideoControl, WebFullScreen, WebFullEnhance, SwitchEpisode, PickerEpisode].forEach((handler) => {
    Object.entries(handler).forEach(([key, value]) => {
      App$1[key] = value instanceof Function ? value.bind(App$1) : value;
    });
  });
  window.videoEnhance = new VideoEnhancer();
  _unsafeWindow.AUTO_WEB_FULLSCREEN = App$1;
  App$1.init();

})(notyf, sweetalert2);