// ==UserScript==
// @name         视频网站自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      2.9.4
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

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const o=document.createElement("style");o.textContent=t,document.head.append(o)})(' @charset "UTF-8";[part=monkey-toast],::part(monkey-toast){color:#fff!important;font-size:13.5px!important;padding:5px 15px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in;background:#000000bf!important}.__webFullScreen,::part(__webFullScreen){top:0!important;left:0!important;margin:0!important;padding:0!important;border:none!important;width:100vw!important;min-width:0!important;min-height:0!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important}.__webFullScreen video,::part(__video){top:0!important;left:0!important;width:100vw!important;height:100vh!important;object-fit:contain!important;transform:rotate(var(--rotate, 0deg)) scale(var(--scale, 1)) scaleX(var(--mirror, 1))!important}.__tsr,::part(__tsr){object-fit:contain!important;transform-origin:center!important;transition:transform .35s!important;transform:rotate(var(--rotate, 0deg)) scale(var(--scale, 1)) scaleX(var(--mirror, 1))!important}.__hc,::part(__hc){cursor:none!important}.monkey-web-fullscreen{z-index:9999999999!important}.monkey-web-fullscreen .swal2-popup{font-size:14px!important}.monkey-web-fullscreen .swal2-confirm{background-color:#7066e0!important}.monkey-web-fullscreen .swal2-deny{background-color:#dc3741!important}.monkey-web-fullscreen .swal2-cancel{background-color:#757575!important}.monkey-web-fullscreen h4{color:red;margin:0 auto}.monkey-web-fullscreen p{color:#999;font-size:12px}.monkey-web-fullscreen #__picker{height:auto;max-width:25em;font-size:14px;margin-bottom:0;min-height:10em;resize:vertical}.monkey-web-fullscreen .hide{display:none!important}.monkey-web-fullscreen .__menu{color:#666;display:flex;cursor:pointer;font-size:20px;font-weight:400;float:none!important;align-items:center!important;margin-bottom:15px!important;justify-content:space-between!important}.monkey-web-fullscreen .__menu:hover{color:#333}.monkey-web-fullscreen .__menu:last-of-type{margin-bottom:0!important}.monkey-web-fullscreen .__menu input{outline:none;cursor:pointer;opacity:1!important;width:20px!important;height:20px!important;position:static!important;appearance:auto!important;-webkit-appearance:auto!important}.notyf{z-index:9999999999!important}.notyf .notyf__message{overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical}.login-tip,.login-guide,.live-room-app #sidebar-vm,.lite-room .bili-mini-mask,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.risk-captcha-adapt .bili-mini-mask,#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,#buffer,#install,#a1 #tips,#player #tips,.player-overlay,.memory-play-wrap,.atom-notice-click,#loading._noplayer,#player #loading-box,.dplayer-notice strong,.air-player-loading-box,.art-layer-autoPlayback,.art-layer-auto-playback,.invoke-app-floating-tips,.invoke-app-san-container{display:none!important}@supports (selector(:has(div))){#loading:not(:has([class*=player])){display:none!important}} ');

(function (notyf, Swal) {
  'use strict';

  const positions = Object.freeze({
    bottomLeft: "bottom: 17%; left: 10px;",
    bottomRight: "bottom: 17%; right: 10px;",
    center: "top: 50%; left: 50%; transform: translate(-50%, -50%);"
  });
  const ONE_SECOND = 1e3;
  const Consts = Object.freeze({
    EMPTY: "",
    DEF_PLAY_RATE: 1,
    MAX_PLAY_RATE: 16,
    ONE_SEC: ONE_SECOND,
    webFull: "__webFullScreen",
    SHOW_TOAST_TIME: ONE_SECOND * 5,
    SHOW_TOAST_POSITION: positions.bottomLeft,
    MSG_SOURCE: "SCRIPTS_AUTO_WEB_FULLSCREEN"
  });
  var _GM_addValueChangeListener = /* @__PURE__ */ (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
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
    if (!isElement(node) && !isDocument(node)) {
      return;
    }
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (isElement(node) && node.shadowRoot) {
      yield node.shadowRoot;
    }
    if (!doc.createTreeWalker) return;
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
    isTooFrequent(key = "default", delay = Consts.ONE_SEC) {
      const now = Date.now();
      const lastTime = this.lastTimeMap.get(key) ?? 0;
      const isFrequent = now - lastTime < delay;
      this.lastTimeMap.set(key, now);
      return isFrequent;
    },
    getCenterPoint(element) {
      const { top: top2, left, width, height } = this.getElementRect(element);
      return { centerX: left + width / 2, centerY: top2 + height / 2 };
    },
    pointInElement(pointX, pointY, element) {
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
      observer.observe(target, { attributes: true, childList: true, subtree: true });
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
    },
    togglePart(node, value) {
      node?.getAttribute("part")?.includes(value) ? this.delPart(node, value) : this.setPart(node, value);
    }
  };
  const SiteIcons = {
    "live.bilibili.com": { webFull: "#businessContainerElement" },
    "www.bilibili.com": { webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
    "live.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "tv.sohu.com": { full: ".x-fullscreen-btn", webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
    "haokan.baidu.com": { full: ".art-icon-fullscreen", webFull: ".art-control-fullscreenWeb", next: ".art-control-next" },
    "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
    "v.pptv.com": { full: ".w-zoom-container > div", webFull: ".w-expand-container > div", danmaku: ".w-barrage", next: ".w-next" },
    "v.youku.com": { full: "#fullscreen-icon", webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
    "www.iqiyi.com": { full: ".iqp-btn-fullscreen", webFull: ".iqp-btn-webscreen", danmaku: "#barrage_switch", next: ".iqp-btn-next" },
    "v.douyu.com": { full: ".ControllerBar-WindowFull-Icon", webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
    "www.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
    "www.mgtv.com": { full: ".fullscreenBtn i", webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" }
  };
  const VideoEventHandler = {
    loadedmetadata() {
      App.universalWebFullscreen(this);
      Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
    },
    loadeddata() {
      App.initVideoProperties(this);
      Tools.query(".conplaying")?.click();
      App.tryplay(this);
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      App.universalWebFullscreen(this);
      App.useCachePlaybackRate(this);
      App.useCachePlayTime(this);
      App.cachePlayTime(this);
    },
    canplay() {
      App.tryplay(this);
    },
    play() {
      this.isEnded = false;
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
  const App = _unsafeWindow.MONKEY_WEB_FULLSCREEN = {
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
    isBackgroudVideo: (video) => video?.muted && video?.hasAttribute("loop"),
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
        history[method] = function() {
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
      setTimeout(() => observer.disconnect(), Consts.ONE_SEC * 10);
    },
    triggerVideoStart() {
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
      this.healthID = setInterval(() => this.getPlayingVideo(), Consts.ONE_SEC);
    },
    getPlayingVideo() {
      const videos = Tools.querys("video");
      for (const video of videos) {
        if (this.video === video || video.paused || isNaN(video.duration) || this.isBackgroudVideo(video)) continue;
        return this.addVideoEvtListener(video);
      }
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
      const { host, href } = location;
      window.topInfo = this.topInfo = { innerWidth, host, href, hash: Tools.simpleHash(href) };
      Tools.sendToIFrames({ topInfo });
    },
    setupMouseMoveListener() {
      let timer = null;
      const handleMouseEvent = ({ target, isTrusted }, addListener = false) => {
        if (!isTrusted) return;
        clearTimeout(timer);
        this.toggleCursor();
        timer = setTimeout(() => this.toggleCursor(true), Consts.ONE_SEC * 3);
        if (!addListener || this.video === target || !target.matches("video") || this.isBackgroudVideo(target)) return;
        this.addVideoEvtListener(target);
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
    OVERRIDE_KEYBOARD: new StorageItem("OVERRIDE_KEYBOARD", false, false, (value) => Boolean(value)),
    DISABLE_AUTO: new StorageItem("CLOSE_AUTO_WEB_FULL_SCREEN", false, false, (value) => Boolean(value)),
    VIDEO_SKIP_INTERVAL: new StorageItem("VIDEO_SKIP_INTERVAL", 5, false, (value) => parseInt(value, 10)),
    ZERO_KEY_SKIP_INTERVAL: new StorageItem("ZERO_KEY_SKIP_INTERVAL", 30, false, (value) => parseInt(value, 10)),
    ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
    DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
    RELATIVE_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
    CURRENT_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
    PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat)
  };
  const Keyboard = Object.freeze({
    A: "A",
    S: "S",
    P: "P",
    ADD: "+",
    SUB: "-",
    KeyA: "KeyA",
    KeyS: "KeyS",
    KeyZ: "KeyZ",
    KeyD: "KeyD",
    KeyF: "KeyF",
    KeyN: "KeyN",
    KeyP: "KeyP",
    KeyR: "KeyR",
    Space: "Space",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    NumpadSubtract: "NumpadSubtract",
    NumpadAdd: "NumpadAdd"
  });
  const { PLAY_RATE_STEP: PLAY_RATE_STEP$2, VIDEO_SKIP_INTERVAL: VIDEO_SKIP_INTERVAL$2, ZERO_KEY_SKIP_INTERVAL: ZERO_KEY_SKIP_INTERVAL$1 } = Storage;
  const Keydown = {
    preventDefault(event) {
      const overrideKey = [Keyboard.Space, Keyboard.ArrowLeft, Keyboard.ArrowRight];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(event.code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
      if (!isNumberKey && !isOverrideKey) return;
      Tools.preventDefault(event);
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
    keydownHandler(event, { key, code, ctrlKey, shiftKey } = event) {
      const target = event.composedPath()[0];
      const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (this.normalSite() || isInput || target?.isContentEditable) return;
      if (!Object.keys(Keyboard).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      if (Keyboard.Space === code || shiftKey && Keyboard.KeyR === code) key = code;
      if ([Keyboard.KeyP, Keyboard.KeyN].includes(code)) return Tools.postMessage(window.top, { key });
      this.processEvent({ key });
    },
    processEvent(data) {
      if (!this.video) Tools.sendToIFrames(data);
      if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
    },
    execHotKeyActions(key) {
      const mapping = {
        P: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance(),
        N: () => Site.isMatch() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode(),
        ARROWLEFT: () => this.isOverrideKeyboard() && this.adjustVideoTime(-VIDEO_SKIP_INTERVAL$2.get()),
        ARROWRIGHT: () => this.isOverrideKeyboard() && this.adjustVideoTime(VIDEO_SKIP_INTERVAL$2.get()),
        SPACE: () => this.isOverrideKeyboard() && this.playOrPause(this.video),
        0: () => this.adjustVideoTime(ZERO_KEY_SKIP_INTERVAL$1.get()) ?? true,
        D: () => this.triggerIconElement(SiteIcons.name.danmaku),
        F: () => this.triggerIconElement(SiteIcons.name.full),
        KEYR: () => this.videoRotateOrMirror(true),
        R: () => this.videoRotateOrMirror(),
        Z: () => this.defaultPlaybackRate()
      };
      [Keyboard.A, Keyboard.ADD].forEach((key2) => mapping[key2] = () => this.adjustPlaybackRate(PLAY_RATE_STEP$2.get()));
      [Keyboard.S, Keyboard.SUB].forEach((key2) => mapping[key2] = () => this.adjustPlaybackRate(-PLAY_RATE_STEP$2.get()));
      mapping[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
    },
    triggerIconElement(name) {
      const index = Object.values(SiteIcons.name).indexOf(name);
      if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
      SiteIcons.name.webFull === name ? this.liveWebFullScreen() : this.getBiliLiveIcons()?.[index]?.click();
    }
  };
  const WebLogin = {
    handleLoginPopups() {
      this.handleQiyiLogin(), this.handleBiliLogin(), this.handleTencentLogin();
    },
    handleTencentLogin: () => Site.isTencent() && Tools.query("#login_win")?.remove(),
    handleQiyiLogin: () => Site.isQiyi() && Tools.query("#qy_pca_login_root")?.remove(),
    handleBiliLogin() {
      if (!Site.isBili()) return;
      if (document.cookie.includes("DedeUserID")) return _unsafeWindow.player?.requestQuality(80);
      setTimeout(() => {
        _unsafeWindow.__BiliUser__.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
      }, Consts.ONE_SEC * 3);
    }
  };
  const {
    DISABLE_AUTO,
    PLAY_RATE_STEP: PLAY_RATE_STEP$1,
    CLOSE_PLAY_RATE,
    OVERRIDE_KEYBOARD,
    VIDEO_SKIP_INTERVAL: VIDEO_SKIP_INTERVAL$1,
    DISABLE_MEMORY_TIME: DISABLE_MEMORY_TIME$1,
    ZERO_KEY_SKIP_INTERVAL,
    ENABLE_THIS_SITE_AUTO: EN_THIS,
    CURRENT_EPISODE_SELECTOR: EP_SELECTOR$1,
    RELATIVE_EPISODE_SELECTOR: RE_SELECTOR$2
  } = Storage;
  const MenuCommand = {
    isDisableAuto: () => DISABLE_AUTO.get(),
    isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
    isDisablePlaybackRate: () => CLOSE_PLAY_RATE.get(),
    isEnbleThisWebSiteAuto: () => EN_THIS.get(Tools.isTopWin() ? location.host : topInfo.host),
    setupScriptMenuCommand() {
      if (!Tools.isTopWin() || Tools.isTooFrequent("menu")) return;
      this.setupMenuChangeListener();
      this.registMenuCommand();
    },
    setupMenuChangeListener() {
      const host = location.host;
      [CLOSE_PLAY_RATE.name, OVERRIDE_KEYBOARD.name, EN_THIS.name + host, EP_SELECTOR$1.name + host].forEach(
        (key) => _GM_addValueChangeListener(key, () => this.registMenuCommand())
      );
    },
    registMenuCommand() {
      const host = location.host;
      const isEnble = this.isEnbleThisWebSiteAuto();
      const siteFun = () => EN_THIS.set(host, !isEnble);
      const delPicker = () => EP_SELECTOR$1.del(host) & RE_SELECTOR$2.del(host);
      [
        { title: "设置零键秒数", cache: ZERO_KEY_SKIP_INTERVAL, isDisable: this.isLive() },
        { title: "设置倍速步长", cache: PLAY_RATE_STEP$1, isDisable: this.isLive() || this.isDisablePlaybackRate() },
        { title: "设置快进/退秒数", cache: VIDEO_SKIP_INTERVAL$1, isDisable: this.isLive() || !this.isOverrideKeyboard() },
        { title: `此站${isEnble ? "禁" : "启"}用自动网页全屏`, cache: EN_THIS, isDisable: Site.isMatch(), fn: siteFun },
        { title: "删除此站的剧集选择器", cache: EP_SELECTOR$1, isDisable: !EP_SELECTOR$1.get(host), fn: delPicker },
        { title: "更多设置", cache: OVERRIDE_KEYBOARD, isDisable: false, fn: () => this.moreSettPopup() }
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
        { name: "key", text: "空格 ◀▶ 键 控制", cache: OVERRIDE_KEYBOARD },
        { name: "auto", text: "禁用自动网页全屏", cache: DISABLE_AUTO, hide: !Site.isMatch() },
        { name: "rate", text: "禁用视频倍速调节", cache: CLOSE_PLAY_RATE, hide: this.isLive() },
        { name: "time", text: "禁用播放进度记录", cache: DISABLE_MEMORY_TIME$1, hide: this.isLive() }
      ];
      const html = configs.map(
        ({ name, text, hide }) => `<label class="__menu ${hide && "hide"}">${text}<input name="${name}" type="checkbox"/></label>`
      );
      Swal.fire({
        width: 350,
        backdrop: false,
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
    }
  };
  const { EMPTY, ONE_SEC, DEF_PLAY_RATE, MAX_PLAY_RATE, SHOW_TOAST_TIME, SHOW_TOAST_POSITION } = Consts;
  const { PLAY_RATE_STEP, CACHED_PLAY_RATE, VIDEO_SKIP_INTERVAL, PLAY_TIME, DISABLE_MEMORY_TIME } = Storage;
  const VideoControl = {
    isEnded() {
      return Math.floor(this.video.currentTime) === Math.floor(this.video.duration);
    },
    initVideoProperties(video) {
      video.volume = 1;
      video.hasToast = false;
      video.hasWebFullScreen = false;
    },
    playOrPause: (video) => Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause(),
    tryplay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
    checkUsable() {
      if (!this.video) return false;
      if (this.isEnded()) return false;
      if (Site.isLivePage()) return false;
      if (this.isDisablePlaybackRate()) return false;
      if (!Tools.validDuration(this.video)) return false;
      return true;
    },
    lockPlaybackRate(video) {
      try {
        const orig = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "playbackRate");
        Object.defineProperty(video, "playbackRate", {
          set: (value) => value === video?.__playbackRate && orig.set.call(video, value),
          get: () => orig.get.call(video),
          configurable: true
        });
      } catch (e) {
      }
    },
    setPlaybackRate(playRate, show = true) {
      if (!this.checkUsable()) return;
      this.lockPlaybackRate(this.video);
      playRate = (+playRate).toFixed(2).replace(/\.?0+$/, EMPTY);
      this.video.playbackRate = this.video.__playbackRate = playRate;
      if (show) this.customToast("正在以", `${playRate}x`, "倍速播放");
      CACHED_PLAY_RATE.set(playRate);
    },
    adjustPlaybackRate(step = PLAY_RATE_STEP.get()) {
      if (!this.checkUsable()) return;
      const playRate = Math.max(PLAY_RATE_STEP.get(), this.video.playbackRate + step);
      this.setPlaybackRate(Math.min(MAX_PLAY_RATE, playRate));
    },
    defaultPlaybackRate() {
      if (this.isDisablePlaybackRate()) return;
      this.setPlaybackRate(DEF_PLAY_RATE, false);
      this.showToast("已恢复正常倍速播放");
    },
    useCachePlaybackRate(video) {
      if (this.isDisablePlaybackRate()) return;
      const playRate = CACHED_PLAY_RATE.get();
      if (DEF_PLAY_RATE === playRate || video.playbackRate === playRate) return;
      this.setPlaybackRate(playRate, !video.hasToast);
      video.hasToast = true;
    },
    adjustVideoTime(second = VIDEO_SKIP_INTERVAL.get()) {
      if (!this.video || !Tools.validDuration(this.video) || second > 0 && this.video.isEnded) return;
      const currentTime = Math.min(this.video.currentTime + second, this.video.duration);
      this.setCurrentTime(currentTime);
    },
    cachePlayTime(video) {
      if (!this.topInfo || this.isLive() || !Tools.validDuration(this.video)) return;
      if (DISABLE_MEMORY_TIME.get() || this.isEnded() || this.isMultVideo()) return this.delPlayTime();
      if (video.currentTime > VIDEO_SKIP_INTERVAL.get()) PLAY_TIME.set(topInfo.hash, video.currentTime - 1, 7);
    },
    useCachePlayTime(video) {
      if (this.hasUsedPlayTime || !this.topInfo || this.isLive()) return;
      const time = PLAY_TIME.get(topInfo.hash);
      if (time <= video.currentTime) return this.hasUsedPlayTime = true;
      this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", ONE_SEC * 3, false);
      this.hasUsedPlayTime = true;
      this.setCurrentTime(time);
    },
    delPlayTime: () => PLAY_TIME.del(topInfo.hash),
    setCurrentTime(currentTime) {
      if (currentTime) this.video.currentTime = Math.max(0, currentTime);
    },
    rotation: 0,
    videoRotateOrMirror(mirror = false) {
      if (!this.video) return;
      const cls = "__tsr";
      const style = this.video.style;
      Tools.addCls(this.video, cls), Tools.setPart(this.video, cls);
      if (mirror) return this.isMirrored = !this.isMirrored, style.setProperty("--mirror", this.isMirrored ? -1 : 1);
      this.rotation = (this.rotation + 90) % 360;
      const { videoWidth, videoHeight } = this.video;
      const isVertical = [90, 270].includes(this.rotation);
      const scale = isVertical ? videoHeight / videoWidth : 1;
      style.setProperty("--scale", scale), style.setProperty("--rotate", `${this.rotation}deg`);
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
    showToast(content, duration = SHOW_TOAST_TIME, isRemove = true) {
      const el = document.createElement("div");
      el.setAttribute("part", "monkey-toast");
      el.setAttribute("style", SHOW_TOAST_POSITION);
      if (isRemove) Tools.query('[part="monkey-toast"]')?.remove();
      content instanceof Element ? el.appendChild(content) : el.innerHTML = content;
      const videoWrap = this.getVideoWrapper();
      const target = videoWrap?.matches("video") ? videoWrap?.parentElement : videoWrap;
      target?.appendChild(el);
      setTimeout(() => (el.style.opacity = 0, setTimeout(() => el.remove(), ONE_SEC / 3)), duration);
    },
    formatTime(seconds) {
      if (isNaN(seconds)) return "00:00";
      const h = Math.floor(seconds / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return [...h ? [h] : [], m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
    },
    isMultVideo() {
      const currVideoSrc = this.videoInfo.src;
      const videos = Tools.querys("video").filter((video) => video.currentSrc !== currVideoSrc && !isNaN(video.duration));
      return videos.length > 1;
    }
  };
  const WebFullScreen = {
    universalWebFullscreen(video) {
      if (!this.topInfo || Site.isMatch() || !this.isEnbleThisWebSiteAuto() || video.hasWebFullScreen) return;
      if (video.offsetWidth === topInfo.innerWidth) return video.hasWebFullScreen = true;
      Tools.postMessage(window.top, { key: Keyboard.P });
      video.hasWebFullScreen = true;
    },
    specificWebFullscreen(video) {
      if (!video?.offsetWidth) return false;
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
      if (this.video.offsetWidth === innerWidth) this.webFullElement?.click();
      const isLast = Tools.query('.video-pod .switch-btn:not(.on), .video-pod__item:last-of-type[data-scrolled="true"]');
      if (!Tools.query(".video-pod") || isLast) return Tools.query(".bpx-player-ending-related-item-cancel")?.click();
    },
    getBiliLiveIcons() {
      Tools.triggerMousemove(this.getVideo());
      return Tools.querys("#web-player-controller-wrap-el .right-area .icon");
    }
  };
  const { RELATIVE_EPISODE_SELECTOR: RE_SELECTOR$1 } = Storage;
  const SwitchEpisode = {
    switchEpisode(isPrev = false) {
      const targetEpisode = this.getTargetEpisode(this.getCurrentEpisode(), isPrev) ?? this.getTargetEpisodeByText(isPrev);
      this.jumpToTargetEpisode(targetEpisode);
    },
    getCurrentEpisode() {
      return RE_SELECTOR$1.get(location.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeByLink();
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
        "[class*='tab-item'], [class*='play-channel']",
        "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
        "[id*='guankan'], [id*='history'], [class*='history'], [class*='record'], [class*='lishi']"
      ];
      eles = eles.filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !Tools.closest(el, `:is(${filter})`, 5) && pageUrl.includes(pathname + search);
      }).map(this.getEpisodeWrapper).reverse();
      return eles.length <= 1 ? eles[0] : eles.find((el) => Tools.hasCls(el, "cur", "active") || !!this.getEpisodeNumber(el));
    },
    getEpisodeNumber: (ele) => Tools.getNumbers(ele?.innerText?.replace(/-/g, Consts.EMPTY))?.shift(),
    getTargetEpisode(element, isPrev = false) {
      if (!element) return;
      const currNumber = this.getEpisodeNumber(element);
      const episodes = this.getAllEpisodes(element);
      const index = episodes.indexOf(element);
      const numbers = episodes.map(this.getEpisodeNumber);
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
        if (current.matches("a, button")) return current.click();
        stack.push(...Array.from(current.children).reverse());
        Tools.triggerClick(current);
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
      const texts = isPrev ? ["上集", "上一集", "上话", "上一话", "上一个"] : ["下集", "下一集", "下话", "下一话", "下一个"];
      return Tools.findByText("attr", texts).shift() ?? Tools.findByText("text", texts).shift();
    },
    compareLeftRight: (numbers, compareNumber = 0, index) => ({
      leftSmall: numbers.some((val, i) => i < index && val < compareNumber),
      rightLarge: numbers.some((val, i) => i > index && val > compareNumber)
    })
  };
  const { RELATIVE_EPISODE_SELECTOR: RE_SELECTOR, CURRENT_EPISODE_SELECTOR: EP_SELECTOR } = Storage;
  const PickerEpisode = {
    setupPickerEpisodeListener() {
      if (Site.isMatch()) return;
      document.body.addEventListener(
        "click",
        (event, { target, ctrlKey, altKey, isTrusted } = event) => {
          if (!ctrlKey || !altKey || !isTrusted || this.isLive()) return;
          if (!Tools.isTopWin()) return Tools.notyf("此页面不能抓取 (•ิ_•ิ)?", true);
          Tools.preventDefault(event);
          const hasCurrentSelector = EP_SELECTOR.get(location.host);
          const hasRelativeSelector = RE_SELECTOR.get(location.host);
          if (hasCurrentSelector && hasRelativeSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);
          const number = this.getEpisodeNumber(target);
          if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);
          !hasCurrentSelector ? this.pickerCurrentEpisodeChain(target) : this.pickerRelativeEpisodeChain(target);
        },
        true
      );
    },
    pickerCurrentEpisodeChain(element) {
      if (EP_SELECTOR.get(location.host)) return;
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
          EP_SELECTOR.set(location.host, value);
          Tools.notyf("继续拾取元素 ＼(＞０＜)／");
        }
      });
    },
    pickerRelativeEpisodeChain(element) {
      if (RE_SELECTOR.get(location.host)) return;
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
          RE_SELECTOR.set(location.host, value);
          Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
        }
      });
    },
    getCurrentEpisodeBySelector() {
      const num = this.getEpisodeNumber(Tools.query(EP_SELECTOR.get(location.host)));
      const current = this.getEpisodeWrapper(Tools.query(EP_SELECTOR.get(location.host)));
      const episodes = this.getAllEpisodes(this.getEpisodeWrapper(Tools.query(RE_SELECTOR.get(location.host))));
      return episodes.includes(current) ? current : episodes.find((el) => this.getEpisodeNumber(el) === num);
    },
    pickerEpisodePopup(element, { validBtnCallback, confirmCallback }) {
      Swal.fire({
        html: `<h4>验证能正确获取到集数，再确定保存</h4>
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
  const { webFull } = Consts;
  const WebFullEnhance = {
    webFullEnhance() {
      if (this.normalSite() || Tools.isTooFrequent("enhance", 300)) return;
      const wrap = this.getVideoHostContainer();
      if (!wrap) return;
      wrap.ctrl = wrap.ctrl ?? wrap?.controls;
      Tools.getParents(wrap, true)?.forEach((el) => (el.classList.toggle(webFull), Tools.togglePart(el, webFull)));
      if (this.video) Tools.togglePart(this.video, "__video");
      if (wrap.matches("video")) wrap.controls = Tools.hasCls(wrap, webFull) ? true : wrap.ctrl;
      this.cleanStubbornElements(wrap);
    },
    cleanStubbornElements(ele) {
      if (Tools.hasCls(ele, webFull)) return;
      Tools.scrollTop(Tools.getElementRect(ele)?.top - 100);
      Tools.querys(`.${webFull}`).forEach((el) => (Tools.delCls(el, webFull), Tools.delPart(el, webFull)));
    },
    getVideoHostContainer() {
      if (this.video) return this.getVideoWrapper();
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
      return this.findVideoControlBar() ?? this.findVideoContainer() ?? this.video;
    },
    findVideoControlBar() {
      const ctrl = '[class*="contr" i]:not(.Drag-Control), [id*="control"], [class*="ctrl"], [id*="ctrl"]';
      return Tools.findParentWithChild(this.video, ctrl);
    },
    findVideoContainer() {
      const parent = this.video?.parentElement;
      return Tools.closest(parent, ':is([class*="player" i], [class*="wrap"], [class*="video"], [player])');
    }
  };
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("sweetalert2");
  cssLoader("notyf/notyf.min.css");
  [Keydown, WebLogin, MenuCommand, VideoControl, WebFullScreen, WebFullEnhance, SwitchEpisode, PickerEpisode].forEach((handler) => {
    Object.entries(handler).forEach(([key, value]) => {
      App[key] = value instanceof Function ? value.bind(App) : value;
    });
  });
  App.init();

})(notyf, sweetalert2);