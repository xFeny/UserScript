// ==UserScript==
// @name               视频网页全屏
// @name:zh            視頻网页全屏
// @name:zh-TW         視頻網頁全屏
// @name:en            Video webpage fullscreen
// @namespace          npm/vite-plugin-monkey
// @version            3.7.0
// @author             Feny
// @description        通用(网页)全屏，快捷键：P-网页全屏，Enter-全屏
// @description:zh     通用(网页)全屏，快捷键：P-网页全屏，Enter-全屏
// @description:zh-TW  通用(網頁)全屏，快捷鍵：P-網頁全屏，Enter-全屏
// @description:en     Universal (Web) Full Screen; Shortcut keys: P-Web Fullscreen, Enter-Fullscreen
// @license            GPL-3.0-only
// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABNNJREFUeF7tm09oHFUcx79vNtkElgQDwYMgaUJulVhIwXoIFAvtQRAPXnopQXZfchD00ksPKoh4KUQJksx7C4UUihREcvFQhB70UMmuYhXBGMRDmrAJ+Wf+2MSwP/kNb5fNZrPzkt3ZzCT7IIfszve93+/z+/NmZmcEzvkQ59x/HAIgpXwI4AoRrRHR9XQ6nWNIUsonAF6zAHZfKXWLj0smk72O4/xloQER3dZa3zW6m47jPLDRAbihlHrEx46MjHxORO9b6DYB/EJE6gAAKSWViR8ppW7wZ8PDwy/E4/E/ALzot4AQ4q7rureNUdeI6Ds/DX9PRLe01vcN8DsAPrXQ5WKx2PWJiYmnRjcN4C0LnXdIEYCU8ihhMaKpVOqSEOJnm8lLIyqlTALQNrrSiEopWcPaqoOInra3tw+Nj4//YyD8CuAVP105gGcAXqokKo2olPJtAN/YTF4WUY4mR9Vv5IQQQ67r/mmc4ey55icCUMzW0dHRC/l8/jcACT9daQaUp/8BbVlEPwAw5je5+X5IKfWDKYcHRHTTT8cRFUJcVkr9Z0rvJwC9fjoApf3nquM4j/001gBMjb6jtf7aOGPbcHL5fP5yOp2eNxG1babFiB6n9EqzNZVKDQsh7lWDcCwAPJFxJmucsWo4HFGt9ausMen5o00zLY3ocUoPwHtKqS+NjR8D+OgoCMcGACD3/Pnzi1NTUysmPb+3bDjFiCaTSav0NEZ/opT60DhjXXpCiDdd1/3WZOs9Ihqu2N8KH1bYAo/MnNKImvTkGvdtOACUUmqEJ7ZJz4IBQoh3Xdf1UllKyb2HQfgOIcRF13V/N+s9FkJcLRedJAO8OYhoWmvNOwIbdZyd4Y7W+jOb9Cwz9g2llNfUpJS8C3lr+4xcIpHoHRsb+9eUHusvlGpODMBA+EJr7UVDSmmdnrwTaK2/8kvPcuccx+mdnJz825QeO3PJj4AQ4onruq/zcZVKr3kt4EfwrH9fzICZmZlDDeKsO8/+FQFkMpmqZ4JnFUYTQCGyzQxolkCzBzSb4Fnt9NX8au4CjdoFOjo6EI/HEYvFsLW1hZ2dnVAkXOAZ0NLSgv7+fiQSB6+Wt7e3kcvlsLa2dqogAgfQ19eHrq6uI51kAAyCgZzGCBzAwMAAWltbfX1jCEtLS9jb2/M9tp4HBA5gcHDQ2l52niEwjEaNUAEoON3I/hBKAAUQjegPoQZQABFkf4gEAAYRVH+IDICg+kPkABRALC4uYmFhoebNIrIA2PN6QIg0gM3NTczOztaUBZEGwJ5ns97vtCcekQawsbGBubm5EzvPwkgDOLc9YH9/H/Pz81hZWakp+pHMgOXlZe9iaXd3t2bnIwVgfX3du1Lkzl/PEfoewLfOOOKrq6v19Ls4V2gBcJ2z4/xHFNwd+1ACqHedV0udUAEIqs5PFYDNPcGg6/xUAVS7K9yoOj9VALx4T08Puru7i3bk83nvJKae+/lJt4jAe0DBsM7OTrS1tXn/8r0+jn4YRsMAhMHZSjY0ARSoNB+RaT4i03xEJrgT7rB2wEbcEQqx755pxV0gm80+I6KKL02F3Yla7Ct9VnhaCGH9vl0ti4ZJe+Bx+fO4FR56XyCTyTwkoitCiJfDFKk621L51dk6LxKJ6c79GyP/A7T+4JsF5qmXAAAAAElFTkSuQmCC
// @match              *://*/*
// @require            https://unpkg.com/sweetalert2@11.26.10/dist/sweetalert2.min.js
// @require            data:application/javascript,%3Bwindow.sweetalert2%3DSwal%3B
// @resource           sweetalert2  https://unpkg.com/sweetalert2@11.26.10/dist/sweetalert2.min.css
// @grant              GM_addStyle
// @grant              GM_addValueChangeListener
// @grant              GM_deleteValue
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_listValues
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @grant              unsafeWindow
// @run-at             document-start
// ==/UserScript==

(n=>{const o=Symbol("styleAdded"),t=document.createElement("style");t.textContent=n,window.gmStyle=t,document.addEventListener("addStyle",r=>{const{shadowRoot:e}=r.detail;e[o]||e instanceof Document||(e.prepend(t.cloneNode(!0)),e[o]=!0)}),(GM_addStyle??(()=>document.head.append(t.cloneNode(!0))))(n)})(' @charset "UTF-8";::part(webFullscreen),[part*=webFullscreen],body[part*=webFullscreen] [part*=webFullscreen]{top:0!important;left:0!important;margin:0!important;padding:0!important;zoom:normal!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important;flex-direction:column!important;overflow:hidden!important;display:flex!important}[part*=webFullscreen]~*:not(.monkey-web-fullscreen){display:none!important}[part*=webFullscreen] video,body[part*=webFullscreen] [part*=webFullscreen] video{top:0!important;left:0!important;width:100vw!important;border:none!important;height:clamp(100vh - 100%,100vh,100%)!important;object-fit:contain!important}.monkey-web-fullscreen{z-index:2147483647!important}.monkey-web-fullscreen *{box-sizing:border-box!important;font-family:Verdana,Geneva,Tahoma,sans-serif}.monkey-web-fullscreen .swal2-cancel{background-color:#757575!important}.monkey-web-fullscreen textarea{color:#333;border-radius:3px;width:100%!important;resize:none!important;font-size:12px!important;padding:3px 5px!important;box-shadow:none!important;min-height:8rem!important;border:1px solid #cbd5e1!important}.monkey-web-fullscreen textarea::-webkit-scrollbar{width:4px}.monkey-web-fullscreen textarea::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}.monkey-web-fullscreen textarea:focus{outline:none!important;border-color:#3b82f6!important}.video-edge-click{cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAipJREFUSEutlTFoFEEUhr+3nKhFwMouKIqNFhYixC6m0E5UMFhI0F4UBY1GbzPZQyVJF7BSUBCNuZBLaWVMp6LYaaWiSBAtFLSKhH2yc3thd2/nbk6cbtl//n/+ef97I/SwNOJZApeQg77bxBeY4DRCUwHvfd7A/yKgExiEbWzghlzlfdFdJwd6k92scQnls4xjWntzDjTiHnAaeEnMETF8z4q4BFLyOrAHuC8hZ8oFmqdoAZ+whWNyjtUWOD1AUuR1ggL5WyoMyxjvSgXsPWdFhHmpMtwpCBrxGtgHtJHbQJRtXhcR3kiVkS4CSXT7qDCSPbnTQS+x9cF6xVQNm4DtbGZFRvntQ9yTAzUMEjS7GHiMcEeqLPkISdr+gwVwLmo6SR+r/CpgPgB3iamL4aNLrFxAmZZxLhd6YBY46SBqAHPENMSwlsV41cDGt8YQytMu1/IFmCVmUQwvnDF1kWhkx8dOn7sHloipeTuwLiKuALc8BRLYcnmjzbCRn0wDP7KDSw07CEiK23kJ34BHwO02ATVsJeABcCgZehIyUCj2AnDcofAKqKfFtsnKT9Mau1AeAvutvZKXSyM7m+baBISzBDTkGl+dKdKIReCoi9zWwVAhsLnvzxAtE3NYDH+KwnkHzQdnLzEXxPCpQ5omIdcnoxIyVYbvKUUtAjUMEPA8/V4h4IBcJ+mBkpvrlgjHf41s0w0BMxJy3kXzTw5sLSY4gXAK4aJU3dH9C5MTtb2fy3n/AAAAAElFTkSuQmCC),pointer!important;top:0!important;left:0!important;width:30px!important;height:80%!important;position:absolute!important;z-index:2147483647!important;background-color:transparent!important;user-select:none!important;opacity:0!important}.video-edge-click:nth-child(2){right:0!important;left:auto!important}:has(>.video-edge-click){position:relative} ');

(function (Swal) {
  'use strict';

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("sweetalert2");
  const isElement = (node) => node instanceof Element;
  const isDocument = (node) => node instanceof Document;
  const getSRoot = (node) => node?._shadowRoot ?? node?.shadowRoot ?? null;
  function* getShadowRoots(node, deep = false) {
    if (!node || !isElement(node) && !isDocument(node)) return;
    if (isElement(node) && getSRoot(node)) yield getSRoot(node);
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (!doc.createTreeWalker) return;
    let currentNode;
    const toWalk = [node];
    while (currentNode = toWalk.pop()) {
      const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
        acceptNode: (child) => isElement(child) && getSRoot(child) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      });
      let walkerNode = walker.nextNode();
      while (walkerNode) {
        const shadowRoot = getSRoot(walkerNode);
        if (isElement(walkerNode) && shadowRoot) {
          if (deep) toWalk.push(shadowRoot);
          yield shadowRoot;
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
  const Consts = Object.freeze({
    EMPTY: "",
    HALF_SEC: 500,
    ONE_SEC: 1e3,
    webFull: "webFullscreen",
    WEBFULL_PARENT_DEPTH: 20,
    MSG_SOURCE: "SCRIPTS_VIDEO_FULLSCREEN"
  });
  const Tools = {
    isTopWin: () => window.top === window,
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top) => window.scrollTo({ top }),
    getElementRect: (el) => el?.getBoundingClientRect(),
    microTask: (callback) => Promise.resolve().then(callback),
    query: (selector, context) => querySelector(selector, context),
    querys: (selector, context) => querySelectorAll(selector, context),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
    getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
    isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
    preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
    emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
    isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
    sendToIFrames(data) {
      this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
    },
    freqTimes: /* @__PURE__ */ new Map(),
    _getTimeDiff(key) {
      const now = Date.now();
      const last = this.freqTimes.get(key) ?? 0;
      const diff = now - last;
      return { now, last, diff };
    },
    isFrequent(key = "frequent", gap = 300) {
      const { now, diff } = this._getTimeDiff(key);
      return this.freqTimes.set(key, now) && diff < gap;
    },
    isThrottle(key = "throttle", gap = 300) {
      const { now, diff } = this._getTimeDiff(key);
      return diff >= gap ? this.freqTimes.set(key, now) && false : true;
    },
    limitCountMap: /* @__PURE__ */ new Map(),
    isOverLimit(key = "default", maxCount = 5) {
      const count = this.limitCountMap.get(key) ?? 0;
      if (count < maxCount) return this.limitCountMap.set(key, count + 1) && false;
      return true;
    },
    resetLimit(...keys) {
      const keyList = keys.length > 0 ? keys : ["default"];
      keyList.forEach((key) => this.limitCountMap.set(key, 0));
    },
    getCenterPoint(element) {
      if (!element) return { centerX: 0, centerY: 0 };
      const { top, left, width, height } = this.getElementRect(element);
      return { centerX: left + width / 2, centerY: top + height / 2 };
    },
    pointInElement(pointX, pointY, element) {
      if (!element) return false;
      const { top, left, right, bottom } = this.getElementRect(element);
      return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom;
    },
    createObserver(target, callback, options = {}) {
      const observer = new MutationObserver(callback);
      const observeTarget = typeof target === "string" ? this.query(target) : target;
      observer.observe(observeTarget, { childList: true, subtree: true, ...options });
      return observer;
    },
    findParentWithChild(element, selector, maxLevel = 8) {
      for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        if (this.query(selector, parent)) return parent;
      }
      return null;
    },
    getParent(element) {
      if (!element) return null;
      const parent = element.parentNode;
      if (parent instanceof ShadowRoot) return parent.host;
      return parent === document ? null : parent;
    },
    getParents(element, withSelf = false, maxLevel = Infinity) {
      const parents = withSelf && element ? [element] : [];
      for (let current = element, level = 0; current && level < maxLevel; level++) {
        current = this.getParent(current);
        current && parents.unshift(current);
      }
      return parents;
    },
    setPart(node, value) {
      if (!(node instanceof Element)) return;
      const parts = node?.getAttribute("part")?.split(/\s+/) ?? [];
      node?.setAttribute("part", [.../* @__PURE__ */ new Set([...parts, value])].join(" ").trim());
    },
    delPart(node, value) {
      if (!(node instanceof Element)) return;
      const parts = (node?.getAttribute("part")?.split(/\s+/) ?? []).filter((v) => v !== value);
      node?.setAttribute("part", parts.join(" ").trim());
    },
    safeHTML(htmlStr) {
      if (!window.trustedTypes?.createPolicy) return htmlStr;
      const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
      return policy.createHTML(htmlStr);
    },
    cloneAttrs(source, target, ...attrs) {
      attrs.flat().forEach((attr) => {
        const value = source.getAttribute(attr);
        if (value) target.setAttribute(attr, value);
      });
    },
    cloneStyle(source, target, ...names) {
      const computedStyle = window.getComputedStyle(source);
      names.flat().forEach((name) => {
        const value = computedStyle.getPropertyValue(name);
        if (value) target.style.setProperty(name, value);
      });
    },
    setStyle(eles, prop, val, priority) {
      if (!eles || !prop) return;
      const fn = val ? "setProperty" : "removeProperty";
      [].concat(eles).forEach((el) => el?.style?.[fn]?.(prop, val, priority));
    },
    isAttached(el) {
      if (!el) return false;
      const root = el.getRootNode?.();
      return el.isConnected && (!root || !(root instanceof ShadowRoot) || root.host.isConnected);
    }
  };
  class VideoEnhancer {
    static hackAttachShadow() {
      if (Element.prototype.__attachShadow) return;
      Element.prototype.__attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function(options) {
        if (this._shadowRoot) return this._shadowRoot;
        const shadowRoot = this._shadowRoot = this.__attachShadow.call(this, options);
        VideoEnhancer.detectShadowVideoElement();
        return shadowRoot;
      };
      Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow.toString();
    }
    static detectShadowVideoElement() {
      if (Tools.isThrottle("shadow", 100)) return;
      const videos = Tools.querys("video:not([received])");
      if (!videos.length) return;
      videos.forEach((video) => {
        const root = video.getRootNode();
        if (!(root instanceof ShadowRoot)) return;
        Tools.emitEvent("shadow-video", { video });
        Tools.emitEvent("addStyle", { shadowRoot: root });
      });
    }
  }
  VideoEnhancer.hackAttachShadow();
  const Keyboard = Object.freeze({
    P: "KeyP",
    Enter: "Enter",
    NumEnter: "NumpadEnter"
  });
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_listValues = /* @__PURE__ */ (() => typeof GM_listValues != "undefined" ? GM_listValues : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const observedValue = { isFullscreen: false, fsWrapper: null };
  const Listen = {
    noVideo: () => !window?.videoInfo,
    isBackgroundVideo: (video) => video?.muted && video?.loop,
    getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
    init(isNonFirst = false) {
      this.setupVideoDetector();
      this.setupKeydownListener();
      this.setupMouseMoveListener();
      this.setupFullscreenListener();
      this.setupVideoListeners();
      if (isNonFirst) return;
      this.setupDocumentObserver();
      this.observeFullscreenChange();
      this.observeWebFullscreenChange();
      this.setupIgnoreUrlsChangeListener();
      this.setupShadowVideoListeners();
    },
    setupDocumentObserver() {
      new MutationObserver(() => {
        if (this.docElement === document.documentElement) return;
        this.init(true), document.head.append(gmStyle.cloneNode(true));
      }).observe(document, { childList: true });
    },
    setupVideoDetector() {
      this.docElement = document.documentElement;
      this.obsDoc?.disconnect(), clearTimeout(this.obsTimer);
      this.obsDoc = Tools.createObserver(document, () => {
        if (Tools.isThrottle("detector", 100)) return;
        if (this.topWin) return this.obsDoc?.disconnect();
        const video = this.getVideo();
        if (video?.offsetWidth) this.setCurrentVideo(video);
      });
      this.obsTimer = setTimeout(() => this.obsDoc?.disconnect(), Consts.ONE_SEC * 5);
    },
    setCurrentVideo(video) {
      if (!video || this.player === video || video.offsetWidth < 240 || this.isBackgroundVideo(video)) return;
      if (this.player && !this.player.paused && !isNaN(this.player.duration)) return;
      this.player = video;
      this.setVideoInfo(video);
    },
    setVideoInfo(video) {
      const videoInfo = { ...Tools.getCenterPoint(video), isLive: video.duration === Infinity };
      this.setParentWinVideoInfo(videoInfo);
    },
    setParentWinVideoInfo(videoInfo) {
      window.videoInfo = this.videoInfo = videoInfo;
      if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iframeSrc: location.href } });
      Tools.microTask(() => this.setupScriptMenuCommand());
      this.sendTopWinInfo();
    },
    sendTopWinInfo() {
      const { host, href: url } = location;
      const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
      const topWin = { url, host, viewWidth, viewHeight };
      window.topWin = this.topWin = topWin;
      Tools.sendToIFrames({ topWin });
    },
    setupFullscreenListener() {
      document.addEventListener("fullscreenchange", () => {
        const isFullscreen = !!document.fullscreenElement;
        Tools.postMessage(window.top, { isFullscreen });
      });
    },
    observeFullscreenChange() {
      Object.defineProperty(this, "isFullscreen", {
        get: () => observedValue.isFullscreen,
        set: (value) => {
          observedValue.isFullscreen = value;
          !value && this.fsWrapper && this.dispatchShortcutKey(Keyboard.P);
        }
      });
    },
    observeWebFullscreenChange() {
      const handle = () => Tools.scrollTop(this.fsWrapper.scrollY);
      Object.defineProperty(this, "fsWrapper", {
        get: () => observedValue.fsWrapper,
        set: (value) => {
          observedValue.fsWrapper = value;
          const method = value ? "addEventListener" : "removeEventListener";
          try {
            window[method]("scroll", handle, true);
          } catch {
            _unsafeWindow[method]("scroll", handle, true);
          }
        }
      });
    },
    setupMouseMoveListener() {
      document.addEventListener("mousemove", ({ type, isTrusted, clientX, clientY }) => {
        if (!isTrusted || Tools.isThrottle(type, 200)) return;
        const elements = document.elementsFromPoint(clientX, clientY);
        const video = elements.find((el) => el.matches("video"));
        if (video) this.createEdgeClickElement(video);
      });
    },
    createEdgeClickElement(video) {
      const container = this.findVideoParentContainer(video.parentNode, 4, false);
      if (video.leftArea) return container.prepend(video.leftArea, video.rightArea);
      const createEdge = () => {
        return Object.assign(document.createElement("div"), {
          video,
          className: "video-edge-click",
          ondblclick: (e) => {
            delete this.player;
            Tools.preventDefault(e);
            this.setCurrentVideo(e.target.video);
            Tools.microTask(() => this.dispatchShortcutKey(Keyboard.P, { isTrusted: true }));
          }
        });
      };
      [video.leftArea, video.rightArea] = [createEdge(), createEdge()];
      container.prepend(video.leftArea, video.rightArea);
    }
  };
  class BasicStorage {
    static #instances = [];
    constructor(name, defVal, useLocalStore = false, parser = (v) => v, splice = false) {
      Object.assign(this, { name, defVal, useLocalStore, parser, splice });
      this.storage = useLocalStore ? localStorage : { getItem: _GM_getValue, setItem: _GM_setValue, removeItem: _GM_deleteValue };
      BasicStorage.#instances.push(this);
      if (BasicStorage.#instances.length === 1) requestIdleCallback(() => BasicStorage.cleanExpired());
    }
    #getFinalKey(suffix = "", requireKey = false) {
      if (requireKey && [null, void 0].includes(suffix)) throw new Error("键名拼接时，suffix（第二个参数）不能为空");
      if (suffix.startsWith(this.name)) return suffix;
      return this.splice ? this.name + suffix : this.name;
    }
    set(value, key, expires) {
      const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
      this.storage.setItem(this.#getFinalKey(key, true), val);
    }
    get(key) {
      const data = this.#get(this.#getFinalKey(key));
      return !data?.value ? data : data.expires > Date.now() ? data.value : this.defVal;
    }
    #get(key) {
      const value = this.storage.getItem(key);
      try {
        return JSON.parse(value) ?? this.defVal;
      } catch {
        return this.parser(value ?? this.defVal);
      }
    }
    del(key) {
      this.storage.removeItem(this.#getFinalKey(key));
    }
    fuzzyGet(pattern) {
      const result = {};
      this.fuzzyHandle(pattern, (key) => result[key] = this.storage.getItem(key));
      return result;
    }
    fuzzyDel(pattern) {
      this.fuzzyHandle(pattern, (key) => this.storage.removeItem(key));
    }
    fuzzyHandle(pattern, callback) {
      const keys = Object.is(this.storage, localStorage) ? Object.keys(localStorage) : _GM_listValues();
      const keyMatcher = pattern instanceof RegExp ? (key) => pattern.test(key) : (key) => key.includes(pattern);
      keys.filter(keyMatcher).forEach(callback);
    }
    static cleanExpired() {
      this.#instances.forEach((instance) => {
        instance.fuzzyHandle(instance.name, (key) => {
          if (instance.#get(key)?.expires < Date.now()) instance.del(key);
        });
      });
    }
  }
  const Storage = _unsafeWindow.FyStorage = {
    CUSTOM_CONTAINER: new BasicStorage("CUSTOM_CONTAINER_", "", false, void 0, true),
    THIS_SITE_AUTO: new BasicStorage("THIS_SITE_AUTO_", false, false, Boolean, true),
    IGNORE_URLS: new BasicStorage("IGNORE_URLS", "")
  };
  const Keydown = {
    dispatchShortcutKey(code, bypass) {
      const key = this.processShortcutKey({ code });
      Tools.postMessage(window.top, { key, bypass });
    },
    processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
      code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
      const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
      return keys.filter(Boolean).join("_").toUpperCase();
    },
    setupKeydownListener() {
      try {
        window.addEventListener("keydown", (event) => this.handleKeydown(event), true);
        window.addEventListener("message", ({ data }) => this.handleMessage(data));
      } catch {
        _unsafeWindow.addEventListener("keydown", (event) => this.handleKeydown(event), true);
        _unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
      }
    },
    handleKeydown(event, { key, code, isTrusted } = event) {
      if (this.noVideo() || Tools.isInputable(event.composedPath()[0])) return;
      if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;
      Tools.preventDefault(event);
      key = this.processShortcutKey(event);
      const specialKeys = [Keyboard.P, Keyboard.Enter, Keyboard.NumEnter];
      if (specialKeys.includes(code)) return Tools.postMessage(window.top, { key, isTrusted });
      this.processEvent({ key, isTrusted });
    },
    processEvent(data) {
      if (!this.player) Tools.sendToIFrames(data);
      if (data?.key) this.execHotKeyActions(data);
    },
    execHotKeyActions({ key, isTrusted }) {
      const dict = {
        P: () => this.toggleWebFullscreen(isTrusted),
        ENTER: () => this.toggleFullscreen()
      };
      dict[key]?.();
    },
    handleMessage(data) {
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
      if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
      if (data?.topWin) window.topWin = this.topWin = data.topWin;
      this.processEvent(data);
    }
  };
  const Events = {
    videoEvents: ["loadedmetadata", "loadeddata", "timeupdate", "playing"],
    setupVideoListeners(video) {
      const handleEvent = (event) => this[event.type](video ?? event.target);
      this.videoEvents.forEach((type) => (video ?? document).addEventListener(type, handleEvent, true));
    },
    setupShadowVideoListeners() {
      document.addEventListener("shadow-video", (e) => {
        const { video } = e.detail;
        if (!video || video.hasAttribute("received")) return;
        this.setupVideoListeners(video), video.setAttribute("received", true);
        Tools.microTask(() => this.createEdgeClickElement(video));
        if (!this.player) this.setCurrentVideo(video);
      });
    },
    loadedmetadata(video) {
      this.autoWebFullscreen(video);
    },
    loadeddata(video) {
      this.initVideoProps(video);
    },
    timeupdate(video) {
      if (isNaN(video.duration)) return;
      if (!this.player) this.playing(video);
      this.autoWebFullscreen(video);
    },
    playing(video) {
      this.setCurrentVideo(video);
    },
    initVideoProps(video) {
      delete video.__isWide;
      Tools.resetLimit("autoWide");
      if (!Tools.isAttached(this.player)) delete this.player;
    }
  };
  const WebFull = {
    toggleFullscreen() {
      if (!Tools.isTopWin() || Tools.isFrequent("toggleFull")) return;
      this.isFullscreen ? document.exitFullscreen() : this.getVideoHostContainer()?.requestFullscreen();
      if (this.isFullscreen || !this.fsWrapper) this.dispatchShortcutKey(Keyboard.P);
    },
    toggleWebFullscreen(isTrusted) {
      if (this.noVideo() || Tools.isFrequent("toggleWeb")) return;
      if (this.isFullscreen && isTrusted) return document.fullscreenElement && document.exitFullscreen();
      this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
    },
    enterWebFullscreen() {
      const container = this.fsWrapper = this.getVideoHostContainer();
      if (!container || container.matches(":is(html, body)")) return this.ensureWebFullscreen();
      const parents = Tools.getParents(container, true);
      container.top = container.top ?? Tools.getElementRect(container).top;
      container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      container instanceof HTMLIFrameElement || parents.length < Consts.WEBFULL_PARENT_DEPTH ? parents.forEach((el) => {
        Tools.emitEvent("addStyle", { shadowRoot: el.getRootNode() });
        Tools.setPart(el, Consts.webFull);
      }) : this.detachForFullscreen();
      Tools.scrollTop(container.scrollY + container.top);
      this.ensureWebFullscreen();
    },
    detachForFullscreen() {
      if (this.fsParent) return;
      this.fsParent = Tools.getParent(this.fsWrapper);
      this.fsPlaceholder = document.createElement("div");
      Tools.cloneAttrs(this.fsWrapper, this.fsPlaceholder, ["id", "class", "style"]);
      Tools.cloneStyle(this.fsWrapper, this.fsPlaceholder, ["position", "width", "height"]);
      this.fsParent.replaceChild(this.fsPlaceholder, this.fsWrapper);
      document.body.insertAdjacentElement("beforeend", this.fsWrapper);
      this.fsWrapper.querySelector("video")?.play();
      Tools.setPart(this.fsWrapper, Consts.webFull);
    },
    exitWebFullscreen() {
      if (!this.fsWrapper) return;
      const { scrollY } = this.fsWrapper;
      Tools.setStyle(document.documentElement, "scroll-behavior", "auto", "important");
      if (this.fsParent?.contains(this.fsPlaceholder)) this.fsParent?.replaceChild(this.fsWrapper, this.fsPlaceholder);
      Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));
      requestAnimationFrame(() => Tools.scrollTop(scrollY));
      setTimeout(() => Tools.setStyle(document.documentElement, "scroll-behavior"), 100);
      this.videoParents.clear();
      this.fsPlaceholder = this.fsWrapper = this.fsParent = null;
    },
    getVideoHostContainer() {
      if (this.player) return this.getVideoContainer();
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
      return Tools.query(`iframe[src*="${pathname + partial}"]`) ?? Tools.query(`iframe[src*="${pathname}"]`);
    },
    getVideoContainer() {
      const selector = Storage.CUSTOM_CONTAINER.get(this.topWin?.host)?.trim();
      const container = selector ? this.player.closest(selector) : null;
      if (container) return container;
      const ctrlContainer = this.findControlBarContainer();
      return ctrlContainer ? this.findVideoParentContainer(ctrlContainer) : this.findVideoParentContainer();
    },
    findControlBarContainer() {
      const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
      const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
      const ctrlContainer = Tools.findParentWithChild(this.player, ctrl);
      if (!ctrlContainer) return null;
      const { width } = Tools.getElementRect(ctrlContainer);
      const { width: vw } = Tools.getElementRect(this.player);
      const { centerX, centerY } = Tools.getCenterPoint(ctrlContainer);
      const inRect = Tools.pointInElement(centerX, centerY, this.player);
      return Math.floor(width) <= Math.floor(vw) && inRect ? ctrlContainer : null;
    },
    videoParents: /* @__PURE__ */ new Set(),
    findVideoParentContainer(container, maxLevel = 4, track = true) {
      container = container ?? Tools.getParent(this.player);
      const { offsetWidth: cw, offsetHeight: ch } = container;
      if (track) this.videoParents.clear();
      for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        if (parent.offsetWidth === cw && parent.offsetHeight === ch) container = parent;
        if (this.hasExplicitlySize(parent)) return container;
        if (track) this.videoParents.add(parent);
      }
      return container;
    },
    hasExplicitlySize(element) {
      const style = element.style;
      const sizeRegex = /^\d+(\.\d+)?(px|em|rem)$/;
      return ["width", "height"].some((prop) => {
        const value = style.getPropertyValue(prop);
        return value && sizeRegex.test(value);
      });
    },
    ensureWebFullscreen() {
      const { viewWidth, viewHeight } = this.topWin;
      const elements = [...this.videoParents].reverse();
      for (const element of elements) {
        const { offsetWidth: width, offsetHeight: height } = this.player;
        if (width === viewWidth && height === viewHeight && element.offsetHeight === viewHeight) continue;
        Tools.setPart(element, Consts.webFull);
      }
    }
  };
  const Automatic = {
    async autoWebFullscreen(video) {
      if (!this.topWin || !video.offsetWidth || this.player !== video) return;
      if (video.__isWide || !this.isAutoSite() || Tools.isThrottle("autoWide", Consts.ONE_SEC)) return;
      if (await this.isWebFull(video) || this.isIgnoreUrl() || Tools.isOverLimit("autoWide")) return video.__isWide = true;
      this.dispatchShortcutKey(Keyboard.P);
    },
    async isWebFull(video) {
      const isWebFull = video.offsetWidth >= this.topWin.viewWidth;
      if (!isWebFull) return false;
      await Tools.sleep(Consts.HALF_SEC);
      return video.offsetWidth >= this.topWin.viewWidth;
    }
  };
  class URLBlacklist {
    constructor(blacklist) {
      this.blacklist = this.normalizeBlacklist(blacklist);
    }
    normalizeBlacklist(urls) {
      return urls.map((url) => {
        try {
          const parsedUrl = new URL(url);
          return { hostname: parsedUrl.hostname, pathname: this.normalizePath(parsedUrl.pathname) };
        } catch (e) {
          console.error(`无效的URL: ${url}`, e);
          return null;
        }
      }).filter(Boolean);
    }
    normalizePath(path) {
      return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
    }
    isBlocked(url) {
      try {
        const parsedUrl = new URL(url);
        const normalizedPath = this.normalizePath(parsedUrl.pathname);
        if (normalizedPath === "/") return true;
        return this.blacklist.some((entry) => {
          if (parsedUrl.hostname !== entry.hostname) return false;
          if (entry.pathname === "/") return normalizedPath === "/";
          return normalizedPath === entry.pathname || normalizedPath.startsWith(`${entry.pathname}/`);
        });
      } catch (e) {
        console.error(`要检查的URL无效: ${url}`, e);
        return false;
      }
    }
  }
  const Ignore = {
    defIgnore: ["https://www.youtube.com/results", "https://www.youtube.com/shorts", "https://www.bilibili.com/anime"],
    setupIgnoreUrlsChangeListener() {
      this.initializeIgnoreUrls();
      _GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => {
        if (oldVal === newVal) return;
        this.initializeIgnoreUrls();
      });
    },
    initializeIgnoreUrls() {
      const urls = this.processIgnoreUrls(Storage.IGNORE_URLS, this.defIgnore);
      this.urlFilter = new URLBlacklist(urls);
    },
    isIgnoreUrl() {
      return this.urlFilter?.isBlocked(this.topWin?.url ?? location.href);
    },
    processIgnoreUrls(cache, defaultUrls) {
      const urlsStr = cache.get() ?? "";
      const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());
      if (existUrls.length) return existUrls;
      cache.set(defaultUrls.join(";\n"));
      return defaultUrls;
    }
  };
  class I18n {
    static langPacks = {
      zh_CN: {
        enAuto: "启用自动网页全屏",
        disAuto: "禁用自动网页全屏",
        ignore: "自动时忽略的网址",
        custom: "自定义视频容器",
        close: "关闭"
      },
      zh_TW: {
        enAuto: "啓用自動網頁全屏",
        disAuto: "禁用自動網頁全屏",
        ignore: "自動時忽略的網址",
        custom: "自定義視頻容器",
        close: "關閉"
      },
      en: {
        enAuto: "Enable automatic web full-screen",
        disAuto: "Disable automatic web full-screen",
        ignore: "Exclude URLs from auto full-screen",
        custom: "Custom video container",
        close: "close"
      }
    };
    static getLang() {
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.includes("zh-TW") || browserLang.includes("zh-HK")) return "zh_TW";
      return browserLang.includes("zh") ? "zh_CN" : "en";
    }
    static t(key) {
      const lang = this.getLang();
      return this.langPacks[lang][key];
    }
  }
  const Menu = {
    isAutoSite: () => Storage.THIS_SITE_AUTO.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
    setupScriptMenuCommand() {
      if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
      this.setupMenuChangeListener();
      this.registMenuCommand();
      this.hasMenu = true;
    },
    setupMenuChangeListener() {
      const key = Storage.THIS_SITE_AUTO.name + location.host;
      _GM_addValueChangeListener(key, () => this.registMenuCommand());
    },
    registMenuCommand() {
      const siteFn = ({ host, cache }) => cache.set(!cache.get(host), host);
      const configs = [
        { title: I18n.t(this.isAutoSite() ? "disAuto" : "enAuto"), cache: Storage.THIS_SITE_AUTO, useHost: true, fn: siteFn },
        { title: I18n.t("ignore"), cache: Storage.IGNORE_URLS, fn: this.ignoreUrlsPopup },
        { title: I18n.t("custom"), cache: Storage.CUSTOM_CONTAINER, useHost: true }
      ];
      configs.forEach(({ title, useHost, cache, isHidden, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        _GM_unregisterMenuCommand(this[id]);
        if (isHidden) return;
        const host = useHost ? location.host : Consts.EMPTY;
        this[id] = _GM_registerMenuCommand(title, () => {
          if (fn) return fn.call(this, { host, cache, title });
          const input = prompt(title, host ? cache.get(host) : cache.get());
          host ? cache.set(input, host) : cache.set(input);
        });
      });
    },
    ignoreUrlsPopup({ title, cache }) {
      Swal.fire({
        width: 350,
        title,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: I18n.t("close"),
        html: Tools.safeHTML('<textarea id="ignoreUrls" spellcheck="false"></textarea>'),
        customClass: { container: "monkey-web-fullscreen" },
        didOpen(popup) {
          const textarea = Tools.query("#ignoreUrls", popup);
          textarea.oninput = () => cache.set(textarea.value);
          textarea.value = cache.get();
        }
      });
    }
  };
  const handlers = [Listen, Keydown, Events, WebFull, Automatic, Ignore, Menu];
  const App = {};
  handlers.forEach((handler) => {
    const entries = Object.entries(handler);
    for (const [key, value] of entries) {
      App[key] = value instanceof Function ? value.bind(App) : value;
    }
  });
  App.init();

})(sweetalert2);