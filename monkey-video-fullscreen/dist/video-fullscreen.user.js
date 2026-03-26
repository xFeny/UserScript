// ==UserScript==
// @name            视频网页全屏
// @name:en         Video Fullscreen
// @namespace       npm/vite-plugin-monkey
// @version         3.10.0
// @author          Feny
// @description     让所有视频网页全屏，快捷键：P - 网页全屏，Enter - 全屏; 支持侧边点击切换网页全屏; 支持自动网页全屏
// @description:en  Maximize all video players; Shortcut keys: P - Web Fullscreen, Enter - Fullscreen; Support side click to web fullscreen; Support auto web fullscreen
// @license         GPL-3.0-only
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABNNJREFUeF7tm09oHFUcx79vNtkElgQDwYMgaUJulVhIwXoIFAvtQRAPXnopQXZfchD00ksPKoh4KUQJksx7C4UUihREcvFQhB70UMmuYhXBGMRDmrAJ+Wf+2MSwP/kNb5fNZrPzkt3ZzCT7IIfszve93+/z+/NmZmcEzvkQ59x/HAIgpXwI4AoRrRHR9XQ6nWNIUsonAF6zAHZfKXWLj0smk72O4/xloQER3dZa3zW6m47jPLDRAbihlHrEx46MjHxORO9b6DYB/EJE6gAAKSWViR8ppW7wZ8PDwy/E4/E/ALzot4AQ4q7rureNUdeI6Ds/DX9PRLe01vcN8DsAPrXQ5WKx2PWJiYmnRjcN4C0LnXdIEYCU8ihhMaKpVOqSEOJnm8lLIyqlTALQNrrSiEopWcPaqoOInra3tw+Nj4//YyD8CuAVP105gGcAXqokKo2olPJtAN/YTF4WUY4mR9Vv5IQQQ67r/mmc4ey55icCUMzW0dHRC/l8/jcACT9daQaUp/8BbVlEPwAw5je5+X5IKfWDKYcHRHTTT8cRFUJcVkr9Z0rvJwC9fjoApf3nquM4j/001gBMjb6jtf7aOGPbcHL5fP5yOp2eNxG1babFiB6n9EqzNZVKDQsh7lWDcCwAPJFxJmucsWo4HFGt9ausMen5o00zLY3ocUoPwHtKqS+NjR8D+OgoCMcGACD3/Pnzi1NTUysmPb+3bDjFiCaTSav0NEZ/opT60DhjXXpCiDdd1/3WZOs9Ihqu2N8KH1bYAo/MnNKImvTkGvdtOACUUmqEJ7ZJz4IBQoh3Xdf1UllKyb2HQfgOIcRF13V/N+s9FkJcLRedJAO8OYhoWmvNOwIbdZyd4Y7W+jOb9Cwz9g2llNfUpJS8C3lr+4xcIpHoHRsb+9eUHusvlGpODMBA+EJr7UVDSmmdnrwTaK2/8kvPcuccx+mdnJz825QeO3PJj4AQ4onruq/zcZVKr3kt4EfwrH9fzICZmZlDDeKsO8/+FQFkMpmqZ4JnFUYTQCGyzQxolkCzBzSb4Fnt9NX8au4CjdoFOjo6EI/HEYvFsLW1hZ2dnVAkXOAZ0NLSgv7+fiQSB6+Wt7e3kcvlsLa2dqogAgfQ19eHrq6uI51kAAyCgZzGCBzAwMAAWltbfX1jCEtLS9jb2/M9tp4HBA5gcHDQ2l52niEwjEaNUAEoON3I/hBKAAUQjegPoQZQABFkf4gEAAYRVH+IDICg+kPkABRALC4uYmFhoebNIrIA2PN6QIg0gM3NTczOztaUBZEGwJ5ns97vtCcekQawsbGBubm5EzvPwkgDOLc9YH9/H/Pz81hZWakp+pHMgOXlZe9iaXd3t2bnIwVgfX3du1Lkzl/PEfoewLfOOOKrq6v19Ls4V2gBcJ2z4/xHFNwd+1ACqHedV0udUAEIqs5PFYDNPcGg6/xUAVS7K9yoOj9VALx4T08Puru7i3bk83nvJKae+/lJt4jAe0DBsM7OTrS1tXn/8r0+jn4YRsMAhMHZSjY0ARSoNB+RaT4i03xEJrgT7rB2wEbcEQqx755pxV0gm80+I6KKL02F3Yla7Ct9VnhaCGH9vl0ti4ZJe+Bx+fO4FR56XyCTyTwkoitCiJfDFKk621L51dk6LxKJ6c79GyP/A7T+4JsF5qmXAAAAAElFTkSuQmCC
// @match           *://*/*
// @grant           GM_addElement
// @grant           GM_addStyle
// @grant           GM_addValueChangeListener
// @grant           GM_getValue
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           GM_unregisterMenuCommand
// @grant           unsafeWindow
// @run-at          document-start
// ==/UserScript==

(e=>{const o=Symbol("added"),t=document.createElement("style");t.textContent=e,window.gmStyle=t,document.addEventListener("addStyle",({detail:{sroot:n}})=>{n[o]||n instanceof Document||(n.prepend(t.cloneNode(!0)),n[o]=!0)}),(GM_addStyle??(()=>document.head.append(t.cloneNode(!0))))(e)})(' @charset "UTF-8";[gm_webfullscreen],body[gm_webfullscreen] [gm_webfullscreen]{top:0!important;left:0!important;margin:0!important;padding:0!important;zoom:normal!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important;flex-direction:column!important;overflow:hidden!important;display:flex!important}[gm_webfullscreen] video,body[gm_webfullscreen] [gm_webfullscreen] video{top:0!important;left:0!important;width:100vw!important;border:none!important;transform:none!important;object-fit:contain!important;height:clamp(100vh - 100%,100vh,100%)!important}[gm_webfullscreen]~*:not(.monkey-web-fullscreen){display:none!important}.__edgeClick{left:0!important;top:6%!important;opacity:0!important;width:25px!important;height:70%!important;position:absolute!important;z-index:2147483647!important;cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAaBJREFUSEutlL8vBEEcxT9fpxSdVtQkGqqrHP8CoqDXSZTC7VpcRa3SCBJEclcgEQmNShDFKVRXKSj8atmv7Gbvsrd2Zydhus2+75v33rwZwXKpx0UAlTIlmxGxAQUY9dCI2GrGCvRn4tCu8CJLTCadmBTrCgcoPfGY2hRHgAmEwyR5FnHWzK8osoDq0hdm7NJoujEJSc24NdDJgCzwkHbAWqGfL+pp7kIBWa1QjyEpc2NqjQlj3QrbWjZxucQty3CHsMU3u+LylreRRDdqJAa8xmdaXB7D/rp00cFngmgPZUccTrM2SCNu4FNKnP42ykwKSdCQbaAqZe7i/3OjCFWvUsTnKsf+GUKVb2ri8mRFHJIvc48wmJct8AHMZdetQn+8w+oxC2xaEAeQdfMFgeFml7VCD188G4hfgRpKVRxq1lc6euECxYHy+LpEOKHAcdyh9SMU5TyGcN5GqyyKw1rSSTux4dlsPTzLXCEUo+93fEbF5dZIbHMw6jEPbIRY5UgcxtPmrOvWUuzQS4E60IUyJQ77/0IcZe0C3eKE6lPXDznkqgSwYj+tAAAAAElFTkSuQmCC),pointer!important}.__edgeClick.right{right:0!important;left:auto!important} ');

(function () {
  'use strict';

  const isElement = (node) => node instanceof Element;
  const getSRoot = (node) => node?._shadowRoot ?? node?.shadowRoot ?? null;
  function* getShadowRoots(root) {
    if (!root || ![Element, Document, ShadowRoot].some((type) => root instanceof type)) return;
    const acceptNode = (node) => isElement(node) && getSRoot(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, { acceptNode }, false);
    let walkerNode;
    while (walkerNode = walker.nextNode()) {
      if (walkerNode === root) continue;
      const sRoot = getSRoot(walkerNode);
      if (sRoot) {
        yield sRoot;
        yield* getShadowRoots(sRoot);
      }
    }
  }
  function querySelector(selector, ctx = document) {
    if (!ctx?.querySelector) return null;
    const direct = ctx.querySelector(selector);
    if (direct) return direct;
    for (const root of getShadowRoots(ctx)) {
      const match = root?.querySelector(selector);
      if (match) return match;
    }
    return null;
  }
  function querySelectorAll(selector, ctx = document) {
    if (!ctx?.querySelectorAll) return [];
    const results = [...ctx.querySelectorAll(selector)];
    for (const root of getShadowRoots(ctx)) {
      if (root?.querySelectorAll) results.push(...root.querySelectorAll(selector));
    }
    return results;
  }
  const Consts = Object.freeze({
    P: "P",
    HALF_SEC: 500,
    ONE_SEC: 1e3,
    webFull: "gm_webfullscreen",
    MSG_SOURCE: "SCRIPTS_VIDEO_FULLSCREEN",
    ICONS: { full: 0, webFull: 1 }
  });
  const Tools = {
    isTopWin: () => window.top === window,
    scrollTop: (top) => window.scrollTo({ top }),
    getRect: (el) => el?.getBoundingClientRect(),
    microTask: (fn) => Promise.resolve().then(fn),
    query: (selector, ctx) => querySelector(selector, ctx),
    querys: (selector, ctx) => querySelectorAll(selector, ctx),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
    getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
    isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
    preventDefault: (event) => event.preventDefault() & event.stopPropagation() & event.stopImmediatePropagation(),
    attr: (el, name, val) => el && name && el[val ? "setAttribute" : "removeAttribute"](name, val),
    emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
    isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
    createElement: (name, attrs = {}) => Object.assign(document.createElement(name), attrs),
    delCls: (el, ...cls) => el?.classList.remove(...cls),
    addCls: (el, ...cls) => el?.classList.add(...cls),
    freqTimes: /* @__PURE__ */ new Map(),
    isThrottle(key = "throttle", gap = 300) {
      const now = Date.now();
      const last = this.freqTimes.get(key) ?? 0;
      const diff = now - last;
      return diff >= gap ? this.freqTimes.set(key, now) && false : true;
    },
    countMap: /* @__PURE__ */ new Map(),
    isOverLimit(key = "default", max = 5) {
      const count = this.countMap.get(key) ?? 0;
      if (count < max) return this.countMap.set(key, count + 1) && false;
      return true;
    },
    resetLimit(...keys) {
      const keyList = keys.length > 0 ? keys : ["default"];
      keyList.forEach((key) => this.countMap.set(key, 0));
    },
    pointInElement(x, y, el) {
      if (!el) return false;
      const { top, left, right, bottom } = this.getRect(el);
      return x >= left && x <= right && y >= top && y <= bottom;
    },
    getParent(el) {
      if (!el) return null;
      const parent = el.parentNode;
      if (parent instanceof ShadowRoot) return parent.host;
      return parent === document ? null : parent;
    },
    getParents(el, max = Infinity, self = true) {
      const parents = self && el ? [el] : [];
      for (let current = el, deep = 0; current && deep < max; deep++) {
        current = this.getParent(current);
        current && parents.unshift(current);
      }
      return parents;
    },
    setStyle(els, prop, val, priority) {
      if (!els || !prop) return;
      const fn = val ? "setProperty" : "removeProperty";
      [].concat(els).forEach((el) => el?.style?.[fn]?.(prop, val, priority));
    },
    isAttached: (el) => !!el && el.isConnected && (!el.getRootNode?.()?.host || el.getRootNode().host.isConnected)
  };
  class VideoEnhancer {
    static hackAttachShadow() {
      if (Element.prototype.__attachShadow) return;
      Element.prototype.__attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function(options) {
        if (this._shadowRoot) return this._shadowRoot;
        const shadowRoot = this._shadowRoot = this.__attachShadow.call(this, options);
        VideoEnhancer.detectShadowVideo();
        return shadowRoot;
      };
      Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow.toString();
    }
    static detectShadowVideo() {
      if (Tools.isThrottle("shadow", 100)) return;
      const videos = Tools.querys("video:not([received])");
      if (videos.length) videos.forEach(this.dispatchShadowVideo);
    }
    static dispatchShadowVideo(video) {
      const sroot = video.getRootNode();
      if (!(sroot instanceof ShadowRoot)) return;
      Tools.emitEvent("shadow-video", { video });
      Tools.emitEvent("addStyle", { sroot });
    }
    static hookActiveVideo() {
      const original = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function() {
        VideoEnhancer.dispatchShadowVideo(this);
        return original.apply(this, arguments);
      };
    }
  }
  VideoEnhancer.hackAttachShadow();
  const Listen = {
    isNoVideo: () => !window.vMeta && !window.topWin,
    isMutedLoop: (video) => video?.muted && video?.loop,
    isExecuted: (key, ctx = window.e9x ??= {}) => ctx[key] || !!(ctx[key] = true, false),
    init(isNonFirst = false) {
      this.host = location.host;
      this.setupVideoListeners();
      this.setupKeydownListener();
      this.setupMouseMoveListener();
      this.setupFullscreenListener();
      this.docElement = document.documentElement;
      if (isNonFirst) return;
      this.setupDocumentObserver();
      this.setupShadowVideoListener();
      this.setupIgnoreChangeListener();
      VideoEnhancer.hookActiveVideo();
    },
    setupDocumentObserver() {
      new MutationObserver(() => {
        if (this.docElement === document.documentElement) return;
        this.init(true), document.head.append(gmStyle.cloneNode(true));
      }).observe(document, { childList: true });
    },
    setupFullscreenListener() {
      document.addEventListener("fullscreenchange", () => {
        Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
      });
      if (this.isExecuted("isDefined")) return;
      Object.defineProperty(this, "isFullscreen", {
        get: () => this._isFullscreen,
        set: (value) => {
          this._isFullscreen = value;
          if (!(value && this.fsWrapper)) this.toggleWebFullscreen();
          Tools.microTask(() => this.customFullChangeHandle());
        }
      });
    },
    setupMouseMoveListener() {
      const handle = ({ type, clientX, clientY }) => {
        if (Tools.isThrottle(type)) return;
        const video = this.getVideoForCoord(clientX, clientY);
        video && this.createEdgeElement(video);
      };
      document.addEventListener("mousemove", handle, { passive: true });
    },
    getVideoForCoord(x, y) {
      if (Tools.pointInElement(x, y, this.player)) return this.player;
      const getZIndex = (el) => Number(getComputedStyle(el).zIndex) || 0;
      const videos = Tools.querys("video").filter((v) => !this.isMutedLoop(v) && Tools.pointInElement(x, y, v));
      return videos.sort((a, b) => getZIndex(b) - getZIndex(a)).shift();
    },
    createEdgeElement(video) {
      const container = this.getEdgeContainer(video);
      if (video.lArea?.parentNode === container) return;
      if (container instanceof Element && this.lacksRelativePosition(container)) {
        Tools.setStyle(container, "position", "relative");
      }
      Tools.querys(".__edgeClick", container).forEach((el) => el.remove());
      if (video.lArea) return container.prepend(video.lArea, video.rArea);
      const createEdge = (cls = "") => {
        const element = Tools.createElement("div", { video, className: `__edgeClick ${cls}` });
        element.onclick = (e) => {
          Tools.preventDefault(e);
          this.setPlayer(e.target.video);
          Tools.sleep(5).then(() => this.dispatchShortcut(Consts.P, true));
        };
        return element;
      };
      [video.lArea, video.rArea] = [createEdge(), createEdge("right")];
      container.prepend(video.lArea, video.rArea);
    },
    getEdgeContainer(video) {
      if (this.fsWrapper) return video.closest(`[${Consts.webFull}]`) ?? this.fsWrapper;
      const parent = video.parentNode;
      const sroot = video.getRootNode() instanceof ShadowRoot;
      return sroot ? parent : this.findVideoContainer(parent, void 0, false);
    },
    lacksRelativePosition(el) {
      return Tools.getParents(el, 2).every((e) => e && getComputedStyle(e).position === "static");
    }
  };
  const Keydown = {
    dispatchShortcut: (key, isTrusted = false) => Tools.postMessage(window.top, { key: key.toUpperCase(), isTrusted }),
    setupKeydownListener() {
      unsafeWindow.addEventListener("keydown", (e) => this.handleKeydown(e), true);
      unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
      unsafeWindow.addEventListener("scroll", () => this.fsWrapper && Tools.scrollTop(this.fsWrapper.scrollY));
    },
    handleKeydown(e) {
      const { key, isTrusted } = e;
      const target = e.composedPath()[0];
      if (this.isNoVideo() || Tools.isInputable(target) || !["p", "Enter"].includes(key)) return;
      Tools.preventDefault(e);
      this.dispatchShortcut(key, isTrusted);
    },
    handleMessage(data) {
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.vMeta) return this.syncMetaToParentWin(data.vMeta);
      if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
      if (data?.topWin) window.topWin = this.topWin = data.topWin;
      this.processEvent(data);
    },
    processEvent(data) {
      if (this.vMeta?.iFrame && this.player) delete this.player;
      ({ P: this.toggleWebFullscreen, ENTER: this.toggleFullscreen })[data?.key]?.(data?.isTrusted);
      if (!this.player) this.sendToVideoIFrame(data);
    }
  };
  const Events = {
    videoAborts: /* @__PURE__ */ new Map(),
    videoEvts: ["loadedmetadata", "timeupdate", "playing"],
    setupVideoListeners(video) {
      const ctrl = new AbortController();
      video && this.videoAborts.get(video)?.abort();
      const handle = ({ type, target }) => this[type](target);
      this.videoEvts.forEach(
        (t) => (video ?? document).addEventListener(t, handle, { capture: true, passive: true, signal: ctrl.signal })
      );
      if (video) this.videoAborts.set(video, ctrl), this.unbindVideoEvts();
    },
    setupShadowVideoListener() {
      document.addEventListener("shadow-video", ({ detail: { video } }) => {
        if (!video || video.hasAttribute("received")) return;
        video.setAttribute("received", true);
        this.setupVideoListeners(video);
      });
    },
    unbindVideoEvts() {
      if (Tools.isThrottle("cleanup", Consts.ONE_SEC)) return;
      this.videoAborts.forEach((ctrl, video) => {
        if (Tools.isAttached(video)) return;
        ctrl.abort(), video.removeAttribute("received"), this.videoAborts.delete(video);
      });
    },
    loadedmetadata(video) {
      this.initVideoProps(video);
      if (!this.player) this.setCurrentVideo(video);
    },
    timeupdate(video) {
      if (isNaN(video.duration)) return;
      Tools.microTask(() => this.autoWebFullscreen(video));
    },
    playing(video) {
      this.setCurrentVideo(video);
    },
    initVideoProps(video) {
      delete video.__isWide;
      Tools.resetLimit("autoWide");
      if (!Tools.isAttached(this.player)) delete this.player;
    },
    setCurrentVideo(video) {
      if (!video || this.player === video || video.offsetWidth < 260 || this.isMutedLoop(video)) return;
      if (this.player && !this.player.paused && !isNaN(this.player.duration)) return;
      this.setPlayer(video);
    },
    setPlayer(video) {
      this.player = video;
      const vMeta = this.vMeta ?? { vw: innerWidth, vh: innerHeight };
      this.syncMetaToParentWin(vMeta);
    },
    syncMetaToParentWin(vMeta) {
      window.vMeta = this.vMeta = { ...vMeta, timestamp: Date.now() };
      if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { vMeta: { ...vMeta, iFrame: location.href } });
      Tools.microTask(() => this.initMenuCmds());
      this.sendTopWinInfo();
    },
    sendTopWinInfo() {
      const { host, href: url } = location;
      const { innerWidth: vw, innerHeight: vh } = window;
      const topWin = { vw, vh, url, host };
      window.topWin = this.topWin = topWin;
      this.sendToVideoIFrame({ topWin });
    },
    sendToVideoIFrame(data) {
      const vFrame = this.getVideoIFrame();
      Tools.postMessage(vFrame?.contentWindow, data);
    }
  };
  class BasicStorage {
    constructor(name, defVal, parser = (v) => v) {
      Object.assign(this, { name, defVal, parser });
      this.storage = { getItem: GM_getValue, setItem: GM_setValue };
    }
    #getFinalKey(suffix) {
      if (!suffix) throw new Error(`${this.name} 后缀不能为空！`);
      return this.name + suffix;
    }
    set(value, key) {
      this.storage.setItem(this.#getFinalKey(key), value);
    }
    get(key) {
      const value = this.storage.getItem(this.#getFinalKey(key));
      return this.parser(value ?? this.defVal);
    }
  }
  const Storage = {
    IS_AUTO: new BasicStorage("IS_AUTO_", false, Boolean),
    DETACH_THRESHOLD: new BasicStorage("DETACH_THRESHOLD_", 20, Number),
    CUSTOM_CTN: new BasicStorage("CUSTOM_CTN_", ""),
    IGNORE_URLS: new BasicStorage("IGNORE_URLS_", ""),
    FS_CHANGE_CODE: new BasicStorage("FS_CHANGE_CODE_", "")
  };
  const WebFull = {
    toggleFullscreen() {
      if (!Tools.isTopWin() || Tools.isThrottle("toggleFull")) return;
      document.exitFullscreen().catch(() => this.getVideoHostContainer()?.requestFullscreen());
    },
    toggleWebFullscreen(isTrusted) {
      if (this.isNoVideo() || Tools.isThrottle("toggleWeb")) return;
      if (this.isFullscreen && isTrusted) return document.fullscreenElement && document.exitFullscreen();
      this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
      Tools.microTask(() => this.customFullChangeHandle());
    },
    enterWebFullscreen() {
      const container = this.fsWrapper = this.getVideoHostContainer();
      if (!container || container.matches(":is(html, body)")) return this.adaptToWebFullscreen();
      container.scrollY = window.scrollY;
      const parents = Tools.getParents(container);
      const unDetach = container instanceof HTMLIFrameElement || parents.length < Storage.DETACH_THRESHOLD.get(this.host);
      unDetach ? parents.forEach((el) => this.setWebFullAttr(el)) : this.detachForFullscreen();
      this.adaptToWebFullscreen();
    },
    detachForFullscreen() {
      if (this.fsParent) return;
      this.fsParent = Tools.getParent(this.fsWrapper);
      this.fsPlaceholder = this.fsWrapper.cloneNode();
      this.fsParent.replaceChild(this.fsPlaceholder, this.fsWrapper);
      document.body.insertAdjacentElement("beforeend", this.fsWrapper);
      this.fsWrapper.querySelector("video")?.play();
      this.setWebFullAttr(this.fsWrapper);
    },
    exitWebFullscreen() {
      if (!this.fsWrapper) return;
      const { scrollY } = this.fsWrapper;
      Tools.setStyle(this.docElement, "scroll-behavior", "auto", "important");
      if (this.fsParent?.contains(this.fsPlaceholder)) this.fsParent?.replaceChild(this.fsWrapper, this.fsPlaceholder);
      Tools.querys(`[${Consts.webFull}]`).forEach((el) => Tools.attr(el, Consts.webFull));
      requestAnimationFrame(() => (Tools.scrollTop(scrollY), Tools.setStyle(this.docElement, "scroll-behavior")));
      this.fsPlaceholder = this.fsWrapper = this.fsParent = null;
      this.videoParents.clear();
    },
    getVideoHostContainer() {
      return this.player ? this.getVideoContainer() : this.getVideoIFrame();
    },
    getVideoIFrame() {
      if (!this.vMeta?.iFrame) return Tools.getIFrames().find(Tools.isVisible);
      if (this.fsWrapper) return this.fsWrapper;
      const { vw, vh, iFrame } = this.vMeta;
      const { pathname, search } = new URL(iFrame);
      const partial = ((s) => s.slice(0, Math.floor(s.length * 0.8)))(decodeURIComponent(search));
      const vFrame = Tools.query(`iframe[src*="${pathname + partial}"]`);
      if (vFrame) return vFrame;
      const tol = 5;
      const iFrames = Tools.getIFrames();
      const matchSize = ({ offsetWidth: w, offsetHeight: h }) => Math.abs(w - vw) < tol && Math.abs(h - vh) < tol;
      return iFrames.find(matchSize) ?? iFrames.find(Tools.isVisible);
    },
    getVideoContainer() {
      const selector = Storage.CUSTOM_CTN.get(this.topWin?.host)?.trim();
      const ctn = selector ? this.player.closest(selector) ?? Tools.query(selector) : null;
      return ctn ?? this.findVideoContainer(this.findCtrlContainer());
    },
    findCtrlContainer() {
      const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
      const selector = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"], [class*="volume"]`;
      let parent = Tools.getParent(this.player);
      while (parent && parent.offsetHeight <= this.player.offsetHeight) {
        if (Tools.query(selector, parent)) return parent;
        parent = Tools.getParent(parent);
      }
      return null;
    },
    videoParents: /* @__PURE__ */ new Set(),
    findVideoContainer(container, max = 4, track = true) {
      container ??= Tools.getParent(this.player);
      if (!container.offsetHeight) container = Tools.getParent(container);
      const { offsetWidth: cw, offsetHeight: ch } = container;
      if (track) this.videoParents.clear();
      for (let parent = container, deep = 0; parent && deep < max; parent = Tools.getParent(parent), deep++) {
        if (parent.offsetWidth === cw && parent.offsetHeight === ch) container = parent;
        if (this.hasExplicitlySize(parent)) return container;
        if (track) this.videoParents.add(parent);
      }
      return container;
    },
    hasExplicitlySize(el) {
      const style = el.style;
      const regex = /^\d+(\.\d+)?(px|em|rem)$/;
      return ["width", "height"].some((prop) => {
        const value = style?.getPropertyValue(prop);
        return value && regex.test(value);
      });
    },
    adaptToWebFullscreen() {
      const { vw, vh } = this.topWin;
      [...this.videoParents].reverse().forEach((el) => {
        if (!this.fsWrapper.contains(el)) return;
        const { offsetWidth: width, offsetHeight: height } = this.player;
        if (width === vw && height === vh && el.offsetHeight === vh) return;
        this.setWebFullAttr(el);
      });
    },
    setWebFullAttr(el) {
      const sroot = el.getRootNode();
      Tools.attr(el, Consts.webFull, true);
      if (this.isExecuted("__Added__", sroot)) return;
      if (sroot instanceof ShadowRoot) Tools.emitEvent("addStyle", { sroot });
    },
    customFullChangeHandle() {
      if (Tools.isThrottle("fsChange", Consts.HALF_SEC)) return;
      Tools.sleep(10).then(() => {
        const tol = 5;
        const { width, height } = window.screen;
        const { topWin, player, fsWrapper } = this;
        const { offsetWidth: ew, offsetHeight: eh } = fsWrapper ?? {};
        const isWFs = Math.abs(ew - topWin.vw) < tol && Math.abs(eh - topWin.vh) < tol;
        const isFs = Math.abs(ew - width) < tol && Math.abs(eh - height) < tol;
        const type = isFs ? "isFull" : isWFs ? "isWFull" : "default";
        const jsCode = Storage.FS_CHANGE_CODE.get(topWin.host);
        this.executeCodeSnippet(jsCode, type, player);
      });
    },
    executeCodeSnippet(jsCode, type, video) {
      try {
        if (!jsCode) return;
        const code = `(async () => { ${jsCode} })()`;
        const args = ["type", "App", "video", "Tools", "unsafeWindow"];
        const handler = this.codeSnippetCache ??= new Function(...args, code);
        handler(type, App, video, Tools, unsafeWindow);
      } catch (e) {
        const unsafe = e.message.includes("unsafe-eval");
        unsafe ? this.injectCodeSnippet(jsCode, type, video) : console.error("代码执行出错：", e);
      }
    },
    injectCodeSnippet(jsCode, type, video) {
      const evt = `gm_code_inject_${type}`;
      const injectCode = `
        (() => {
          document.addEventListener('${evt}', (e) => {
            const { type, App, video, Tools, unsafeWindow } = e.detail;
            (async () => { try { ${jsCode} } catch (err) { console.error('代码执行出错：', err); } })();
          }, { once: true });
        })();
        `;
      Tools.query(`#${evt}`)?.remove();
      GM_addElement("script", { id: evt, textContent: injectCode, type: "text/javascript" });
      Tools.emitEvent(evt, { type, App, video, Tools, unsafeWindow });
    }
  };
  const Automatic = {
    async autoWebFullscreen(video) {
      if (!this.topWin || !video.offsetWidth || this.player !== video) return;
      if (video.__isWide || Tools.isThrottle("autoWide", Consts.ONE_SEC) || !this.isAuto()) return;
      if (this.isIgnoreUrl() || await this.isWebFull(video) || Tools.isOverLimit("autoWide")) return video.__isWide = true;
      this.dispatchShortcut(Consts.P);
    },
    async isWebFull(video) {
      const { vw } = this.topWin;
      if (video.offsetWidth < vw) return false;
      await Tools.sleep(Consts.HALF_SEC);
      return video.offsetWidth >= vw;
    }
  };
  const Ignore = {
    initIgnoreUrls: () => App.urlFilter = App.getIgnoreUrls(),
    setupIgnoreChangeListener() {
      GM_addValueChangeListener(Storage.IGNORE_URLS.name, () => this.initIgnoreUrls());
    },
    isIgnoreUrl() {
      if (!this.urlFilter) this.initIgnoreUrls();
      return this.isBlocked(this.urlFilter);
    },
    getIgnoreUrls() {
      const urlsStr = Storage.IGNORE_URLS.get(this.topWin.host);
      return (urlsStr.match(/[^\s;]+/g) || []).filter((url) => new URL(url).pathname !== "/");
    },
    isBlocked(urls = []) {
      const { href, pathname } = new URL(this.topWin.url);
      return pathname === "/" || urls.some((u) => href.startsWith(u));
    }
  };
  class I18n {
    static #langPacks = {
      zh: {
        enable: "启用自动网页全屏",
        disable: "禁用自动网页全屏",
        ignore: "自动时忽略的网址",
        custom: "自定义视频容器",
        fsChange: "扩展代码逻辑",
        detach: "脱离阈值"
      },
      en: {
        enable: "Enable auto web fullscreen",
        disable: "Disable auto web fullscreen",
        detach: "Detached fullscreen threshold",
        fsChange: "Fullscreen change extend handler",
        custom: "Custom video fullscreen container",
        ignore: "URLs ignored in auto mode"
      }
    };
    static #getLang = () => (navigator.language || navigator.userLanguage).includes("zh") ? "zh" : "en";
    static t = (key) => this.#langPacks[this.#getLang()][key];
  }
  const Menu = {
    isAuto: () => Storage.IS_AUTO.get(window.topWin?.host ?? location.host),
    initMenuCmds() {
      if (this.hasMenu || !Tools.isTopWin()) return;
      GM_addValueChangeListener(Storage.IS_AUTO.name + this.host, () => this.setupMenuCmds());
      this.setupMenuCmds();
      this.hasMenu = true;
    },
    setupMenuCmds() {
      const isAuto = I18n.t(this.isAuto() ? "disable" : "enable");
      const fsChange = ({ title, cache, value }) => {
        const input = prompt(title, value);
        if (input === null) return;
        cache.set(input, this.host);
        this.codeSnippetCache = null;
      };
      const configs = [
        { title: isAuto, cache: Storage.IS_AUTO, fn: ({ cache, value }) => cache.set(!value, this.host) },
        { title: I18n.t("ignore"), cache: Storage.IGNORE_URLS },
        { title: I18n.t("custom"), cache: Storage.CUSTOM_CTN },
        { title: I18n.t("fsChange"), cache: Storage.FS_CHANGE_CODE, fn: fsChange },
        { title: I18n.t("detach"), cache: Storage.DETACH_THRESHOLD }
      ];
      configs.forEach(({ title, cache, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        GM_unregisterMenuCommand(this[id]);
        this[id] = GM_registerMenuCommand(title, () => {
          const value = cache.get(this.host);
          if (fn) return fn.call(this, { title, cache, value });
          const input = prompt(title, value);
          if (input !== null) cache.set(input, this.host);
        });
      });
    }
  };
  window.App = {};
  const handlers = [Listen, Keydown, Events, WebFull, Automatic, Ignore, Menu];
  handlers.forEach((handler) => {
    const entries = Object.entries(handler);
    for (const [key, value] of entries) {
      App[key] = value instanceof Function ? value.bind(App) : value;
    }
  });
  App.init();

})();