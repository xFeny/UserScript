// ==UserScript==
// @name         视频网站自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      3.1.0
// @author       Feny
// @description  支持哔哩哔哩、B站直播、腾讯视频、优酷视频、爱奇艺、芒果TV、搜狐视频、AcFun弹幕网自动网页全屏；支持任意视频倍速播放；支持播放进度记录；支持任意视频网站下集切换。
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

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(' @charset "UTF-8";[part=monkey-toast],::part(monkey-toast){left:10px!important;bottom:17%!important;color:#fff!important;font-size:13px!important;padding:6px 15px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in!important;background:#000000bf!important}.__webFullScreen,::part(__webFullScreen){top:0!important;left:0!important;margin:0!important;padding:0!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important}.__webFullScreen video,::part(__video){top:0!important;left:0!important;width:100vw!important;height:clamp(100vh - 100%,100vh,100%)!important;object-fit:contain!important;transform:rotate(var(--rotate, 0deg)) scale(var(--scale, 1)) scale(var(--zomm, 1)) scaleX(var(--mirror, 1)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__tsr,::part(__tsr){object-fit:contain!important;transform-origin:center!important;transition:transform .35s!important;transform:rotate(var(--rotate, 0deg)) scale(var(--scale, 1)) scale(var(--zomm, 1)) scaleX(var(--mirror, 1)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__hc,::part(__hc){cursor:none!important}.monkey-web-fullscreen{z-index:9999999999!important}.monkey-web-fullscreen .swal2-popup{font-size:14px!important}.monkey-web-fullscreen button:where(.swal2-styled):focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .swal2-confirm{background-color:#7066e0!important}.monkey-web-fullscreen .swal2-deny{background-color:#dc3741!important}.monkey-web-fullscreen .swal2-cancel{background-color:#757575!important}.monkey-web-fullscreen button:where(.swal2-close){color:#666!important;font-size:1.7em!important;font-weight:bolder!important}.monkey-web-fullscreen h4{color:red!important;margin:0 auto!important;font-size:18px!important;font-weight:400!important}.monkey-web-fullscreen p{color:#999!important;margin-top:0!important;font-size:12px!important}.monkey-web-fullscreen #__picker{width:100%!important;height:auto!important;max-width:25em!important;font-size:14px!important;margin-bottom:0!important;min-height:10em!important;resize:vertical!important}.monkey-web-fullscreen #__picker:focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .hide{display:none!important}.monkey-web-fullscreen .__menu{color:#666;display:flex;cursor:pointer;font-size:20px;font-weight:400;float:none!important;align-items:center!important;margin-bottom:15px!important;justify-content:space-between!important}.monkey-web-fullscreen .__menu:hover{color:#333}.monkey-web-fullscreen .__menu:last-of-type{margin-bottom:0!important}.monkey-web-fullscreen .__menu input{outline:none;cursor:pointer;opacity:1!important;width:20px!important;height:20px!important;position:static!important;appearance:auto!important;-webkit-appearance:auto!important}.monkey-web-fullscreen table{width:100%!important;border-collapse:collapse!important}.monkey-web-fullscreen th{font-weight:600!important}.monkey-web-fullscreen th,.monkey-web-fullscreen td{font-size:14px!important;line-height:28px!important;vertical-align:middle!important;border:1px solid #e5e6eb!important}.monkey-web-fullscreen tr:nth-child(odd){background-color:#f8f8f8!important}.notyf{z-index:9999999999!important}.notyf .notyf__message{overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical}.login-tip,.login-guide,.live-room-app #sidebar-vm,.lite-room .bili-mini-mask,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.risk-captcha-adapt .bili-mini-mask,#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,#buffer,#install,#a1 #tips,#player #tips,.player-overlay,.memory-play-wrap,.atom-notice-click,#loading._noplayer,#player #loading-box,.dplayer-notice strong,.air-player-loading-box,.art-layer-autoPlayback,.art-layer-auto-playback,.invoke-app-floating-tips,.invoke-app-san-container{display:none!important}@supports (selector(:has(div))){#loading:not(:has([class*=player])){display:none!important}} ');

(function (notyf, Swal) {
  'use strict';

  const Consts = Object.freeze({
    EMPTY: "",
    MIN_ZOOM: 50,
    MOVE_STEP: 10,
    ZOOM_STEP: 10,
    DEF_ZOOM: 100,
    MAX_ZOOM: 500,
    ONE_SEC: 1e3,
    DEF_PLAY_RATE: 1,
    MAX_PLAY_RATE: 16,
    videoPart: "__video",
    webFull: "__webFullScreen",
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
  function* getShadowRoots(node, deep) {
    if (!node || !isElement(node) && !isDocument(node)) return;
    if (isElement(node) && node.shadowRoot) {
      yield node.shadowRoot;
    }
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (!doc.createTreeWalker) return;
    const toWalk = [node];
    let currentNode = void 0;
    while (currentNode = toWalk.pop()) {
      const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
        acceptNode: (node2) => isElement(node2) && node2.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
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
  function querySelector(selector, subject = document) {
    const immediate = subject.querySelector(selector);
    if (immediate) return immediate;
    const shadowRoots = [...getShadowRoots(subject)];
    for (const root of shadowRoots) {
      const match = root.querySelector(selector);
      if (match) return match;
    }
    return null;
  }
  function querySelectorAll(selector, subject = document) {
    const results = [...subject.querySelectorAll(selector)];
    const shadowRoots = [...getShadowRoots(subject)];
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
    isTooFrequent(key = "default", delay = Consts.ONE_SEC / 2) {
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
    findParentWithChild(element, selector, maxLevel = 3) {
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
      if (/[:\[\]]/.test(ele.className)) return `${tagInfo}[class="${ele.className}"]`;
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
    simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
        hash |= 0;
      }
      return hash >>> 0;
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
      if (!node?.getRootNode()?.host) return;
      const parts = node?.getAttribute("part")?.split(/\s+/) ?? [];
      node?.setAttribute("part", [.../* @__PURE__ */ new Set([...parts, value])].join(" ").trim());
    },
    delPart(node, value) {
      if (!node?.getRootNode()?.host) return;
      const parts = (node?.getAttribute("part")?.split(/\s+/) ?? []).filter((v) => v !== value);
      node?.setAttribute("part", parts.join(" ").trim());
    }
  };
  const SiteIcons = {
    "live.bilibili.com": { webFull: "#businessContainerElement" },
    "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "www.bilibili.com": { webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
    "haokan.baidu.com": { webFull: ".art-control-fullscreenWeb", next: ".art-control-next" },
    "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
    "v.pptv.com": { webFull: ".w-expand-container > div", danmaku: ".w-barrage", next: ".w-next" },
    "www.iqiyi.com": { webFull: ".iqp-btn-webscreen", danmaku: "#barrage_switch", next: ".iqp-btn-next" },
    "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
    "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
    "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    "v.qq.com": { webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
    "tv.sohu.com": { webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
    name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" }
  };
  const App$1 = window.App = {
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
        this.triggerStartElement();
        const video = this.getVideo();
        this.webFullElement = this.getWebFullElement();
        if (video?.play && !!video?.offsetWidth) this.setCurrentVideo(video);
        if (this.topInfo && (!Site.isMatch() || this.specificWebFullscreen(video))) observer.disconnect();
      });
      setTimeout(() => observer.disconnect(), Consts.ONE_SEC * 10);
    },
    triggerStartElement() {
      const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
      if (!element || Tools.isTooFrequent("start")) return;
      setTimeout(() => element?.click() & element?.remove(), 150);
    },
    setCurrentVideo(video) {
      if (this.isBackgroundVideo(video)) return;
      if (video.offsetWidth < 200 || this.player === video) return;
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
      if (!Tools.isTopWin()) return videoInfo.frameSrc = location.href, Tools.postMessage(window.parent, { videoInfo });
      this.setupPickerEpisodeListener();
      this.setupScriptMenuCommand();
      this.sendTopInfo();
    },
    sendTopInfo() {
      if (this.hasTopInfo) return;
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
  const Keyboard = Object.freeze({
    A: "A",
    P: "P",
    S: "S",
    ADD: "+",
    SUB: "-",
    KeyA: "KeyA",
    KeyD: "KeyD",
    KeyK: "KeyK",
    KeyL: "KeyL",
    KeyN: "KeyN",
    KeyP: "KeyP",
    KeyR: "KeyR",
    KeyS: "KeyS",
    KeyZ: "KeyZ",
    Space: "Space",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Subtract: "NumpadSubtract",
    NumpadAdd: "NumpadAdd"
  });
  const Keydown = {
    preventDefault(event, { code } = event) {
      const overrideKey = [Keyboard.Space, Keyboard.Left, Keyboard.Right];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
      if (!isNumberKey && !isOverrideKey && !this.isZoomKey(event) && code !== Keyboard.KeyP) return;
      Tools.preventDefault(event);
    },
    isZoomKey(event) {
      const zommKey = [Keyboard.NumpadAdd, Keyboard.Subtract, Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right];
      return event.altKey && zommKey.includes(event.code) && !this.isDisableZoom();
    },
    setupKeydownListener() {
      window.addEventListener("keyup", (event) => this.preventDefault(event), true);
      window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
      window.addEventListener("message", ({ data }) => {
        if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
        if (data?.videoInfo) return this.setParentVideoInfo(data.videoInfo);
        if (data?.topInfo) window.topInfo = this.topInfo = data.topInfo;
        if (data?.defaultPlaybackRate) this.defaultPlaybackRate();
        this.processEvent(data);
      });
    },
    keydownHandler(event, { key, code, altKey, ctrlKey, shiftKey } = event) {
      const target = event.composedPath()[0];
      const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (this.normalSite() || isInput || target?.isContentEditable) return;
      if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      if (this.isZoomKey(event)) key = "ALT_" + code;
      if (ctrlKey && altKey && Keyboard.KeyA === code) key = code;
      if (Keyboard.Space === code || shiftKey && [Keyboard.KeyP, Keyboard.KeyR].includes(code)) key = code;
      if (!altKey && !ctrlKey && !shiftKey && [Keyboard.KeyP, Keyboard.KeyN].includes(code)) {
        return Tools.postMessage(window.top, { key });
      }
      this.processEvent({ key });
    },
    processEvent(data) {
      if (!this.player) Tools.sendToIFrames(data);
      if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
    },
    execHotKeyActions(key) {
      const dict = {
        KEYP: () => this.togglePIP(),
        L: () => this.freezeVideoFrame(),
        K: () => this.freezeVideoFrame(true),
        ALT_NUMPADADD: () => this.zoomVideo(),
        ALT_NUMPADSUBTRACT: () => this.zoomVideo(true),
        N: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode(),
        P: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance(),
        ARROWLEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-Storage.SKIP_INTERVAL.get()),
        ARROWRIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(Storage.SKIP_INTERVAL.get()),
        0: () => this.adjustVideoTime(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
        SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.player),
        D: () => this.triggerIconElement(SiteIcons.name.danmaku),
        KEYR: () => this.videoRotateOrMirror(true),
        R: () => this.videoRotateOrMirror(),
        Z: () => this.defaultPlaybackRate(),
        KEYA: () => this.videoScreenshot()
      };
      [Keyboard.A, Keyboard.ADD].forEach((k) => dict[k] = () => this.adjustPlaybackRate(Storage.PLAY_RATE_STEP.get()));
      [Keyboard.S, Keyboard.SUB].forEach((k) => dict[k] = () => this.adjustPlaybackRate(-Storage.PLAY_RATE_STEP.get()));
      ["ALT_ARROWUP", "ALT_ARROWDOWN", "ALT_ARROWLEFT", "ALT_ARROWRIGHT"].forEach((k) => dict[k] = () => this.moveVideo(k));
      dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
    },
    triggerIconElement(name) {
      const index = Object.values(SiteIcons.name).indexOf(name);
      if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
      SiteIcons.name.webFull === name ? this.liveWebFullScreen() : this.getBiliLiveIcons()?.[index]?.click();
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
        { title: "设置零键秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL, isDisable: this.isLive() },
        { title: "设置倍速步长", cache: Storage.PLAY_RATE_STEP, isDisable: this.isLive() || this.isDisablePlaybackRate() },
        { title: "设置快进/退秒数", cache: Storage.SKIP_INTERVAL, isDisable: this.isLive() || !this.isOverrideKeyboard() },
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
        { key: "N", desc: "切换下一集视频" },
        { key: "D", desc: "弹幕显示 / 隐藏" },
        { key: "Z", desc: "恢复 1.0x 正常倍速" },
        { key: "R", desc: "90° 循环旋转视频角度" },
        { key: "L / K", desc: "下一帧 / 上一帧" },
        { key: "Shift R", desc: "视频水平镜像翻转" },
        { key: "Shift P", desc: "进入或退出画中画" },
        { key: "Ctrl Alt A", desc: "视频画面截图（默认禁用）" },
        { key: "数字 0️", desc: "快进 30 秒" },
        { key: "1️ 至 9️", desc: "直接设置 1️ 至 9️ 倍速" },
        { key: "◀️▶️", desc: "快退 / 快进 5 秒（默认禁用）" },
        { key: "空格", desc: "播放 / 暂停（默认禁用）" },
        { key: "Alt ➕ / ➖", desc: "视频缩放（默认禁用）" },
        { key: "A / S 或 ➕ / ➖", desc: "倍速 ±0.25" },
        { key: "Alt ◀️🔼🔽▶️", desc: "视频上下左右方向移动（默认禁用）" }
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
    initVideoProperties(video) {
      video.volume = 1;
      video.hasToast = false;
      video.hasWebFull = false;
    },
    playOrPause: (video) => Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause(),
    tryplay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
    checkUsable() {
      if (!this.player || this.isDisablePlaybackRate()) return false;
      if (this.isBackgroundVideo(this.player) || this.isEnded()) return false;
      if (this.isLive() || this.player.duration > this.player?.__duration) return false;
      if (!Tools.validDuration(this.player)) return false;
      return true;
    },
    setPlaybackRate(playRate, show = true) {
      if (!this.checkUsable()) return;
      playRate = (+playRate).toFixed(2).replace(/\.?0+$/, Consts.EMPTY);
      window?.EnhancerVideo?.setPlaybackRate(this.player, playRate);
      if (show) this.customToast("正在以", `${playRate}x`, "倍速播放");
      Storage.CACHED_PLAY_RATE.set(playRate);
    },
    adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
      const playRate = Math.max(Storage.PLAY_RATE_STEP.get(), this.player.playbackRate + step);
      this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
    },
    defaultPlaybackRate() {
      if (this.isDisablePlaybackRate()) return;
      this.setPlaybackRate(Consts.DEF_PLAY_RATE, false);
      this.showToast("已恢复正常倍速播放");
    },
    useCachePlaybackRate(video) {
      if (this.isDisablePlaybackRate()) return;
      const playRate = Storage.CACHED_PLAY_RATE.get();
      if (Consts.DEF_PLAY_RATE === playRate || video.playbackRate === playRate) return;
      this.setPlaybackRate(playRate, !video.hasToast);
      video.hasToast = true;
    },
    adjustVideoTime(second = Storage.SKIP_INTERVAL.get()) {
      if (!this.player || !Tools.validDuration(this.player) || second > 0 && this.player.isEnded) return;
      const currentTime = Math.min(this.player.currentTime + second, this.player.duration);
      this.setCurrentTime(currentTime);
    },
    cachePlayTime(video) {
      if (!this.topInfo || this.isLive() || !Tools.validDuration(this.player)) return;
      if (this.player.duration > this.player?.__duration || this.player.duration < 120) return;
      if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded() || this.isMultVideo()) return this.delPlayTime();
      if (video.currentTime > Storage.SKIP_INTERVAL.get()) Storage.PLAY_TIME.set(this.topInfo.hash, video.currentTime - 1, 7);
    },
    useCachePlayTime(video) {
      if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
      const time = Storage.PLAY_TIME.get(this.topInfo.hash);
      if (time <= video.currentTime) return this.hasUsedPlayTime = true;
      this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3, false);
      this.hasUsedPlayTime = true;
      this.setCurrentTime(time);
    },
    delPlayTime: () => Storage.PLAY_TIME.del(window?.topInfo?.hash),
    setCurrentTime(currentTime) {
      if (currentTime) this.player.currentTime = Math.max(0, currentTime);
    },
    togglePIP() {
      if (!this.player) return;
      document.pictureInPictureElement ? document.exitPictureInPicture() : this.player?.requestPictureInPicture();
    },
    rotation: 0,
    videoRotateOrMirror(mirror = false) {
      if (!this.player) return;
      if (mirror) return this.isMirrored = !this.isMirrored, this.setVideoTsr("--mirror", this.isMirrored ? -1 : 1);
      this.rotation = (this.rotation + 90) % 360;
      const { videoWidth, videoHeight } = this.player;
      const isVertical = [90, 270].includes(this.rotation);
      const scale = isVertical ? videoHeight / videoWidth : 1;
      this.setVideoTsr("--scale", scale).setVideoTsr("--rotate", `${this.rotation}deg`);
    },
    currentZoom: Consts.DEF_ZOOM,
    zoomVideo(isDown) {
      if (!this.player || this.isDisableZoom()) return;
      const zoom = this.currentZoom + (isDown ? -Consts.ZOOM_STEP : Consts.ZOOM_STEP);
      if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;
      this.currentZoom = zoom;
      this.setVideoTsr("--zomm", zoom / 100);
      this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC * 2);
    },
    moveX: 0,
    moveY: 0,
    moveVideo(direction) {
      if (!this.player || this.isDisableZoom()) return;
      const moveX = this.moveX;
      const { x, y, desc } = {
        ALT_ARROWUP: { y: -Consts.MOVE_STEP, desc: "向上移动" },
        ALT_ARROWDOWN: { y: Consts.MOVE_STEP, desc: "向下移动" },
        ALT_ARROWLEFT: { x: -Consts.MOVE_STEP, desc: "向左移动" },
        ALT_ARROWRIGHT: { x: Consts.MOVE_STEP, desc: "向右移动" }
      }[direction];
      this.moveX += x ?? 0;
      this.moveY += y ?? 0;
      this.setVideoTsr("--moveX", `${this.moveX}px`).setVideoTsr("--moveY", `${this.moveY}px`);
      this.showToast(`${desc}：${moveX === this.moveX ? this.moveY : this.moveX}px`, Consts.ONE_SEC * 2);
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
      }
    },
    freezeVideoFrame(isPrev) {
      if (!this.player) return;
      !this.player.paused && this.player.pause();
      this.player.currentTime += (isPrev ? -1 : 1) / 24;
    },
    customToast(startText, colorText, endText, duration, isRemove) {
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(startText));
      const child = span.cloneNode(true);
      child.textContent = colorText;
      child.setAttribute("style", "margin:0 3px!important;color:#ff6101!important;");
      span.appendChild(child);
      span.appendChild(document.createTextNode(endText));
      this.showToast(span, duration, isRemove);
    },
    showToast(content, duration = Consts.ONE_SEC * 5, isRemove = true) {
      const el = document.createElement("div");
      el.setAttribute("part", "monkey-toast");
      if (isRemove) Tools.query('[part="monkey-toast"]')?.remove();
      content instanceof Element ? el.appendChild(content) : el.innerHTML = content;
      const videoWrap = this.getVideoWrapper();
      const target = videoWrap?.matches("video") ? videoWrap?.parentElement : videoWrap;
      target?.appendChild(el);
      setTimeout(() => (el.style.opacity = 0, setTimeout(() => el.remove(), Consts.ONE_SEC / 3)), duration);
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return "00:00";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return [...h ? [h] : [], m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
    },
    isMultVideo() {
      const playerSrc = this.videoInfo?.src;
      const videos = Tools.querys("video").filter((video) => video.currentSrc !== playerSrc && !isNaN(video.duration));
      return videos.length > 1;
    },
    setVideoTsr(name, value) {
      const cls = "__tsr";
      this.player?.style?.setProperty(name, value);
      if (!Tools.hasCls(cls)) Tools.addCls(this.player, cls), Tools.setPart(this.player, cls);
      return this;
    }
  };
  const WebFullScreen = {
    universalWebFullscreen(video) {
      if (!this.topInfo || video.hasWebFull || Site.isMatch() || !this.isEnbleThisWebSiteAuto()) return;
      if (video.offsetWidth === this.topInfo.innerWidth) return video.hasWebFull = true;
      Tools.postMessage(window.top, { key: Keyboard.P });
      video.hasWebFull = true;
    },
    specificWebFullscreen(video) {
      if (!video?.offsetWidth || !this.webFullElement) return false;
      if (this.isDisableAuto() || video?.offsetWidth >= innerWidth) return true;
      return Site.isBiliLive() ? this.liveWebFullScreen() : Tools.triggerClick(this.webFullElement);
    },
    liveWebFullScreen() {
      _unsafeWindow.top.scrollTo({ top: 70 });
      const icons = this.getBiliLiveIcons();
      const el = Tools.query(":is(.lite-room, #player-ctnr)", top.document);
      if (el) _unsafeWindow.top.scrollTo({ top: Tools.getElementRect(el)?.top ?? 0 });
      if (!Tools.hasCls(document.body, "hide-asida-area")) {
        _unsafeWindow.top?.livePlayer?.volume(100);
        _unsafeWindow.top?.livePlayer?.switchQuality("10000");
        localStorage.setItem("FULLSCREEN-GIFT-PANEL-SHOW", 0);
        Tools.addCls(document.body, "hide-asida-area", "hide-aside-area");
      }
      return Tools.triggerClick(icons?.[1]);
    },
    exitWebFullScreen() {
      if (!Site.isBili() && !Site.isAcFun()) return;
      if (this.player.offsetWidth === innerWidth) this.webFullElement?.click();
      const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (!Tools.query(".video-pod") || isLast) return Tools.query(".bpx-player-ending-related-item-cancel")?.click();
    },
    getBiliLiveIcons() {
      Tools.triggerMousemove(this.getVideo());
      return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
    }
  };
  const SwitchEpisode = {
    switchEpisode(isPrev = false) {
      const targetEpisode = this.getTargetEpisode(this.getCurrentEpisode(), isPrev) ?? this.getTargetEpisodeByText(isPrev);
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
          !hasCurrentSelector ? this.pickerCurrentEpisodeChain(target) : this.pickerRelativeEpisodeChain(target);
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
            !!number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
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
            !!numbers.length ? Tools.notyf(`所有集数：${numbers.join(" ")}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
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
      if (!wrap) return;
      this.webFullWrap = wrap;
      wrap.ctrl = wrap.ctrl ?? wrap?.controls;
      wrap.top = wrap.top ?? wrap.getBoundingClientRect()?.top ?? 0;
      wrap.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      Tools.getParents(wrap, true)?.forEach((el) => (el.classList.add(Consts.webFull), Tools.setPart(el, Consts.webFull)));
      if (this.player) Tools.setPart(this.player, Consts.videoPart);
      if (wrap.matches("video") && Tools.hasCls(wrap, Consts.webFull)) wrap.controls = true;
    },
    exitWebFull() {
      const wrap = this.webFullWrap;
      if (this.player) Tools.delPart(this.player, Consts.videoPart);
      if (this.webFullWrap?.matches("video")) wrap.controls = wrap.ctrl;
      Tools.querys(`.${Consts.webFull}`).forEach((el) => (Tools.delCls(el, Consts.webFull), Tools.delPart(el, Consts.webFull)));
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
      if (!this?.videoInfo?.frameSrc) return null;
      const url = new URL(this.videoInfo.frameSrc);
      const src = decodeURI(url.pathname + url.search);
      return Tools.query(`iframe[src*="${src}"]`);
    },
    getVideoWrapper() {
      return this.findVideoControlBar() ?? this.findVideoContainer();
    },
    findVideoControlBar() {
      const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
      const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"]`;
      const controlBar = Tools.findParentWithChild(this.player, ctrl);
      const { centerX, centerY } = Tools.getCenterPoint(controlBar);
      return Tools.pointInElement(centerX, centerY, this.player) ? controlBar : null;
    },
    findVideoContainer(maxLevel = 5) {
      const video = this.player;
      let container = this.player;
      const videoRect = Tools.getElementRect(video);
      for (let parent = video?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
        const { width, height } = Tools.getElementRect(parent);
        if (width === videoRect.width && height === videoRect.height) container = parent;
      }
      return container;
    }
  };
  const VideoEvents = {
    loadedmetadata() {
      App.universalWebFullscreen(this);
      Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
    },
    loadeddata() {
      App.initVideoProperties(this);
      this.__duration = this.duration;
      Tools.query(".conplaying")?.click();
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      App.universalWebFullscreen(this);
      App.cachePlayTime(this);
    },
    canplay() {
      if (this.hasTryplay || App.isMultVideo()) return;
      this.hasTryplay = true;
      App.tryplay(this);
    },
    playing() {
      this.isEnded = false;
      if (this.duration >= 10) {
        App.setCurrentVideo(this);
        App.useCachePlayTime(this);
        App.useCachePlaybackRate(this);
      }
      App.specificWebFullscreen(this);
    },
    pause() {
      Tools.query(".ec-no")?.click();
      Tools.query('[id*="loading"]._noplayer')?.remove();
    },
    ended() {
      this.isEnded = true;
      this.hasToast = false;
      App.exitWebFullScreen();
      App.delPlayTime();
    }
  };
  class VideoEnhancer {
    constructor() {
      this.setupObserver();
      this.setupExistingVideos();
      this.hookMediaMethod("play", (video) => this.enhanced(video));
    }
    setupExistingVideos() {
      const videos = Tools.querys("video:not([enhanced])");
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
        if (node instanceof HTMLVideoElement && !node.hasAttribute("enhanced")) {
          this.enhanced(node);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.hasChildNodes()) {
          const childVideos = Tools.querys("video:not([enhanced])", node);
          childVideos.forEach((video) => this.enhanced(video));
        }
      }
    }
    enhanced(video) {
      if (video.hasAttribute("enhanced")) return;
      this.setupEventListeners(video);
      this.floorVideoDuration(video);
    }
    setupEventListeners(video) {
      video.setAttribute("enhanced", true);
      Object.entries(VideoEvents).forEach(([type, handler]) => {
        video.removeEventListener(type, handler, true);
        video.addEventListener(type, handler, true);
      });
    }
    setPlaybackRate(video, playRate) {
      this.defineProperty(video, "playbackRate", { set: (val, setter, t) => val === t?.__playbackRate && setter(val) });
      video.playbackRate = video.__playbackRate = playRate;
    }
    floorVideoDuration(video) {
      this.defineProperty(video, "duration", { get: (value) => Math.floor(value) });
    }
    defineProperty(video, propertyKey, descriptors) {
      try {
        const original = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, propertyKey);
        Object.defineProperty(video, propertyKey, {
          get: descriptors.get ? () => descriptors.get(original.get.call(video)) : original.get,
          set: descriptors.set ? (value) => descriptors.set(value, original.set.bind(video), video) : original.set,
          configurable: true
        });
      } catch (e) {
        console.error(`Error modifying ${propertyKey} property:`, e);
      }
    }
    hookMediaMethod(method, callback) {
      const original = HTMLMediaElement.prototype[method];
      HTMLMediaElement.prototype[method] = function() {
        callback.call(this, this);
        return original.apply(this, arguments);
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
  window.EnhancerVideo = new VideoEnhancer();
  _unsafeWindow.AUTO_WEB_FULLSCREEN = App$1;
  App$1.init();

})(notyf, sweetalert2);