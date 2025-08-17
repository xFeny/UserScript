// ==UserScript==
// @name         视频自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      3.2.0
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
// @require      https://unpkg.com/sweetalert2@11.22.3/dist/sweetalert2.min.js
// @require      data:application/javascript,%3Bwindow.sweetalert2%3DSwal%3B
// @resource     notyf/notyf.min.css  https://unpkg.com/notyf@3.10.0/notyf.min.css
// @resource     sweetalert2          https://unpkg.com/sweetalert2@11.22.3/dist/sweetalert2.min.css
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

(e=>{const t=document.createElement("style");t.textContent=e,document.addEventListener("shadow-attached",o=>{requestAnimationFrame(()=>o.detail.shadowRoot.prepend(t.cloneNode(!0)))}),(GM_addStyle??(()=>document.head.append(t.cloneNode(!0))))(e)})(' @charset "UTF-8";.monkey-toast{line-height:normal;left:10px!important;bottom:16%!important;color:#fff!important;font-size:13px!important;padding:6px 10px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity .3s ease-in!important;background:#000000bf!important}.monkey-toast span{display:inline!important}::part(webFullscreen),[part*=webFullscreen],body[part*=webFullscreen] [part*=webFullscreen]{top:0!important;left:0!important;margin:0!important;padding:0!important;zoom:normal!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important;flex-direction:column!important;overflow:hidden!important;display:flex!important}[part*=webFullscreen] .vjs-control-bar,[part*=webFullscreen] .ytp-chrome-bottom,[part*=webFullscreen] .ytp-chapter-hover-container{left:0!important;width:100vw!important}[part*=webFullscreen] video,body[part*=webFullscreen] [part*=webFullscreen] video{top:0!important;left:0!important;width:100vw!important;height:clamp(100vh - 100%,100vh,100%)!important;object-fit:contain!important;transform:scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__tsr{object-fit:contain!important;transform-origin:center!important;transition:transform .35s!important;transform:var(--deftsr, matrix(1, 0, 0, 1, 0, 0)) scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--moveX, 0),var(--moveY, 0))!important}.__hc{cursor:none!important}.monkey-web-fullscreen{z-index:9999999999!important}.monkey-web-fullscreen .hide{display:none!important}.monkey-web-fullscreen .swal2-popup{font-size:14px!important}.monkey-web-fullscreen button:where(.swal2-styled):focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .swal2-confirm{background-color:#7066e0!important}.monkey-web-fullscreen .swal2-deny{background-color:#dc3741!important}.monkey-web-fullscreen .swal2-cancel{background-color:#757575!important}.monkey-web-fullscreen button:where(.swal2-close){color:#666!important;font-size:1.7em!important;font-weight:bolder!important}.monkey-web-fullscreen h4{color:red!important;margin:0 auto!important;font-size:18px!important;font-weight:400!important}.monkey-web-fullscreen p{color:#999!important;margin-top:0!important;font-size:12px!important}.monkey-web-fullscreen #__picker{width:100%!important;height:auto!important;max-width:25em!important;font-size:14px!important;margin-bottom:0!important;min-height:10em!important;resize:vertical!important}.monkey-web-fullscreen #__picker:focus{box-shadow:0 0 0 1px #6496c880!important}.monkey-web-fullscreen .swal2-tabs-header{display:flex;margin-bottom:20px;position:relative;border-bottom:1px solid #e2e8f0}.monkey-web-fullscreen .swal2-tab{flex:1;cursor:pointer;color:#64748b;font-weight:500;text-align:center;padding:12px 10px;position:relative;transition:all .2s ease}.monkey-web-fullscreen .swal2-tab.active{color:#3b82f6}.monkey-web-fullscreen .swal2-tab.active:after{left:0;content:"";width:100%;height:2px;bottom:-1px;position:absolute;background-color:#3b82f6;border-radius:2px 2px 0 0}.monkey-web-fullscreen .swal2-tab:hover:not(.active){color:#3b82f6}.monkey-web-fullscreen .swal2-tabs-content{width:100%}.monkey-web-fullscreen .swal2-tab-panel{display:none}.monkey-web-fullscreen .swal2-tab-panel.active{display:block}.monkey-web-fullscreen .__menu{margin:0 0 10px!important;padding:0 0 10px!important;float:none!important;color:#666!important;display:flex!important;font-size:16px!important;font-weight:400!important;align-items:center!important;justify-content:space-between!important;border-bottom:1px solid #f5f5f5!important}.monkey-web-fullscreen .__menu:last-of-type{padding-bottom:0!important;border-bottom:none!important}.monkey-web-fullscreen .__menu input[type=text],.monkey-web-fullscreen .__menu input[type=number]{color:#333;border-radius:3px;border:1px solid #cbd5e1!important;text-align:center!important;font-size:13px!important;height:20px!important;width:45px!important}.monkey-web-fullscreen .__menu input[type=text]:focus,.monkey-web-fullscreen .__menu input[type=number]:focus{outline:none!important;border-color:#3b82f6!important}.monkey-web-fullscreen .__menu input[type=checkbox]{position:absolute!important;opacity:0!important}.monkey-web-fullscreen .__menu .toggle-track{width:40px!important;height:19px!important;cursor:pointer!important;position:relative!important;border-radius:13px!important;background-color:#ccc!important;transition:background-color .3s ease!important}.monkey-web-fullscreen .__menu .toggle-track:after{top:3px!important;left:3px!important;content:""!important;width:13px!important;height:13px!important;position:absolute!important;border-radius:50%!important;background-color:#fff!important;transition:transform .3s ease!important}.monkey-web-fullscreen .__menu input[type=checkbox]:checked+.toggle-track{background-color:#2196f3!important}.monkey-web-fullscreen .__menu input[type=checkbox]:checked+.toggle-track:after{transform:translate(20px)!important}.monkey-web-fullscreen .others-sett{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f5f5f5}.monkey-web-fullscreen .others-sett:last-of-type{margin-bottom:0!important;padding-bottom:0!important;border-bottom:none!important}.monkey-web-fullscreen .others-sett p{margin-bottom:3px;color:#333!important;font-size:13px!important;text-align:left!important}.monkey-web-fullscreen .others-sett textarea{color:#333;border-radius:3px;width:100%!important;padding:5px!important;resize:none!important;height:100px!important;font-size:12px!important;border:1px solid #cbd5e1!important}.monkey-web-fullscreen .others-sett textarea:focus{outline:none!important;border-color:#3b82f6!important}.monkey-web-fullscreen .others-sett textarea[name=customFit]{height:40px!important}.monkey-web-fullscreen table{width:100%!important;border-collapse:collapse!important}.monkey-web-fullscreen table th{font-weight:600!important}.monkey-web-fullscreen table th,.monkey-web-fullscreen table td{line-height:2!important;font-size:13px!important;vertical-align:middle!important;border:1px solid #e5e6eb!important}.monkey-web-fullscreen table tr:nth-child(odd){background-color:#f8f8f8!important}.notyf{z-index:9999999999!important}.notyf .notyf__message{overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical;color:#fff!important}.login-tip,.login-guide,.live-room-app #sidebar-vm,.lite-room .bili-mini-mask,.live-room-app #prehold-nav-vm,.live-room-app #shop-popover-vm,.risk-captcha-adapt .bili-mini-mask,#bilibili-player .bpx-player-toast-wrap,#bilibili-player .bpx-player-cmd-dm-wrap,#bilibili-player .bpx-player-dialog-wrap,#buffer,#install,#a1 #tips,#player #tips,.player-overlay,.memory-play-wrap,.atom-notice-click,#loading._noplayer,#player #loading-box,.dplayer-comment-box,.dplayer-notice strong,.air-player-loading-box,.art-layer-autoPlayback,.art-layer-auto-playback,.invoke-app-floating-tips,.invoke-app-san-container{display:none!important}@supports (selector(:has(div))){#loading:not(:has([class*=player])){display:none!important}} ');

(function (notyf, Swal) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  const Consts = Object.freeze({
    EMPTY: "",
    MIN_ZOOM: 25,
    MAX_ZOOM: 400,
    HALF_SEC: 500,
    ONE_SEC: 1e3,
    THREE_SEC: 3e3,
    DEF_PLAY_RATE: 1,
    MAX_PLAY_RATE: 16,
    MIN_PLAY_RATE: 0.0625,
    webFull: "webFullscreen",
    MSG_SOURCE: "SCRIPTS_AUTO_WEB_FULLSCREEN"
  });
  function isElement(node) {
    return node instanceof Element;
  }
  function isDocument(node) {
    return node instanceof Document;
  }
  function* getShadowRoots(node, deep = false) {
    if (!node || !isElement(node) && !isDocument(node)) return;
    if (isElement(node) && node._shadowRoot) {
      yield node._shadowRoot;
    }
    const doc = isDocument(node) ? node : node.getRootNode({ composed: true });
    if (!doc.createTreeWalker) return;
    let currentNode;
    const toWalk = [node];
    while (currentNode = toWalk.pop()) {
      const walker = doc.createTreeWalker(currentNode, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_DOCUMENT_FRAGMENT, {
        acceptNode: (child) => isElement(child) && child._shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      });
      let walkerNode = walker.nextNode();
      while (walkerNode) {
        if (isElement(walkerNode) && walkerNode._shadowRoot) {
          if (deep) {
            toWalk.push(walkerNode._shadowRoot);
          }
          yield walkerNode._shadowRoot;
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
  const Tools = _unsafeWindow.Tools = {
    noNumber: (str) => !/\d/.test(str),
    isTopWin: () => window.top === window,
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top2) => window.scrollTo({ top: top2 }),
    alert: (...data) => window.alert(data.join(" ")),
    getElementRect: (el) => el?.getBoundingClientRect(),
    isMultiVideo: () => querySelectorAll("video").length > 1,
    query: (selector, context) => querySelector(selector, context),
    querys: (selector, context) => querySelectorAll(selector, context),
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
      const notyf$1 = new notyf.Notyf({ duration: Consts.THREE_SEC, position: { x: "center", y: "top" } });
      isError ? notyf$1.error(msg) : notyf$1.success(msg);
      return false;
    },
    sendToIFrames(data) {
      this.getIFrames().forEach((iframe) => this.postMessage(iframe?.contentWindow, data));
    },
    freqTimes: /* @__PURE__ */ new Map(),
    isFrequent(key = "default", gap = 300, isThrottle = false) {
      const now = Date.now();
      const last = this.freqTimes.get(key) ?? 0;
      const delta = now - last;
      if (!isThrottle) return this.freqTimes.set(key, now) && delta < gap;
      return delta >= gap ? this.freqTimes.set(key, now) && false : true;
    },
    limitCountMap: /* @__PURE__ */ new Map(),
    isOverLimit(key = "default", maxCount = 5) {
      const count = this.limitCountMap.get(key) ?? 0;
      if (count < maxCount) return this.limitCountMap.set(key, count + 1) && false;
      return true;
    },
    resetLimitCounter(key = "default") {
      this.limitCountMap.set(key, 0);
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
    createObserver(target, callback, options) {
      const observer = new MutationObserver(callback);
      target = target instanceof Element ? target : this.query(target);
      observer.observe(target, { childList: true, subtree: true, ...options });
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
    },
    safeHTML(htmlStr) {
      if (!window.trustedTypes?.createPolicy) return htmlStr;
      const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
      return policy.createHTML(htmlStr);
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
    fuzzyGet(pattern) {
      const result = {};
      this.fuzzyMatch(pattern, (key) => result[key] = this.getItem(key));
      return result;
    }
    fuzzyDel(pattern) {
      this.fuzzyMatch(pattern, (key) => this.removeItem(key));
    }
    fuzzyMatch(pattern, callback) {
      const keys = this.useLocalStorage ? Object.keys(localStorage) : _GM_listValues();
      keys.forEach((key) => {
        const isMatch = pattern instanceof RegExp ? pattern.test(key) : key.includes(pattern);
        if (isMatch) callback.call(this, key);
      });
    }
  }
  class TimedStorage extends StorageItem {
    constructor(name, defaultValue, useLocalStorage, valueParser) {
      super(name, defaultValue, useLocalStorage, valueParser);
      requestIdleCallback(() => this.cleanupExpiredData());
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
    cleanupExpiredData() {
      this.fuzzyMatch(this.name, (key) => {
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
    DISABLE_INVISIBLE_PAUSE: new StorageItem("DISABLE_INVISIBLE_PAUSE", false, false, (value) => Boolean(value)),
    ENABLE_AUTO_NEXT_EPISODE: new StorageItem("ENABLE_AUTO_NEXT_EPISODE", false, false, (value) => Boolean(value)),
    AUTO_NEXT_ADVANCE_SEC: new StorageItem("AUTO_NEXT_ADVANCE_SECONDS", 75, false, (value) => parseInt(value, 10)),
    ENABLE_THIS_SITE_AUTO: new TimedStorage("ENABLE_THIS_SITE_AUTO_", false, false, (value) => Boolean(value)),
    DISABLE_DEF_MAX_VOLUME: new StorageItem("DISABLE_DEF_MAX_VOLUME", false, false, (value) => Boolean(value)),
    DISABLE_MEMORY_TIME: new StorageItem("DISABLE_MEMORY_TIME", false, false, (value) => Boolean(value)),
    DISABLE_ZOOM_MOVE: new StorageItem("DISABLE_ZOOM_MOVE", true, false, (value) => Boolean(value)),
    PERCENT_OF_ZOOM: new StorageItem("PERCENT_OF_ZOOM", 10, false, (value) => parseInt(value, 10)),
    MOVING_DISTANCE: new StorageItem("MOVING_DISTANCE", 10, false, (value) => parseInt(value, 10)),
    DISABLE_SCREENSHOT: new StorageItem("DISABLE_ZOOM", true, false, (value) => Boolean(value)),
    CURR_EPISODE_SELECTOR: new TimedStorage("CURRENT_EPISODE_SELECTOR_", null),
    REL_EPISODE_SELECTOR: new TimedStorage("RELATIVE_EPISODE_SELECTOR_", null),
    STORAGE_DAYS: new StorageItem("STORAGE_DAYS", 7, false, parseFloat),
    NEXT_IGNORE_URLS: new StorageItem("NEXT_IGNORE_URLS", "", false),
    FULL_IGNORE_URLS: new StorageItem("FULL_IGNORE_URLS", "", false),
    CUSTOM_WEB_FULL: new TimedStorage("CUSTOM_WEB_FULL_", "", false),
    PLAY_TIME: new TimedStorage("PLAY_TIME_", 0, true, parseFloat)
  };
  class Clock {
    constructor(container) {
      if (!container) return;
      this.container = container;
      this.animationId = null;
      this.isRunning = false;
      if (container.querySelector("clock")) return;
      this.clock = document.createElement("div");
<<<<<<< HEAD
      this.clock.style = "top:20px;right:50px;font-size:18px;color:#FFF;position:absolute;";
=======
      this.clock.style = "top:20px;right:50px;font-size:18px;color:#FFF;position:absolute;z-index:10;";
>>>>>>> dev
      this.container.append(this.clock);
      this.start();
    }
    formatTime(date) {
      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
    }
    update() {
      this.isRunning = true;
      const now = /* @__PURE__ */ new Date();
      this.clock.textContent = this.formatTime(now);
      this.animationId = requestAnimationFrame(() => this.update());
    }
    start() {
      if (this.isRunning) return;
      this.clock.style.setProperty("display", "unset");
      this.update();
    }
    stop() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.isRunning = false;
      this.clock.style.display = "none";
    }
    destroy() {
      this.stop();
      this.clock?.remove();
      this.container = null;
      this.clock = null;
    }
  }
  const App$1 = window.App = {
    init() {
      this.setupDocBodyObserver();
      this.setupVisibleListener();
      this.setupKeydownListener();
      this.setupUrlChangeListener();
      this.setupMouseMoveListener();
      this.setupFullscreenListener();
      this.setupIgnoreUrlsChangeListener();
      document.addEventListener("load", () => this.triggerStartElement(), true);
    },
    isNormalSite: () => !window?.videoInfo && !window?.topWin,
    getVideo: () => Tools.querys(":is(video, fake-video):not([loop])").find(Tools.isVisible),
    isBackgroundVideo: (video) => video?.muted && video?.hasAttribute("loop"),
    triggerStartElement() {
      const element = Tools.query("._qrp4qg, .ec-no, .conplaying, #start, .choice-true, .close-btn, .closeclick");
      if (!element || Tools.isFrequent("start")) return;
      setTimeout(() => element?.click() & element?.remove(), 150);
    },
    setupVisibleListener() {
      window.addEventListener("visibilitychange", () => {
        if (this.isNormalSite() || Storage.DISABLE_INVISIBLE_PAUSE.get()) return;
        const video = this.player ?? this.getVideo();
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
      const handler = () => this.setupDocBodyObserver();
      ["popstate", "pushState", "replaceState"].forEach((t) => _wr(t) & window.addEventListener(t, handler));
    },
    setupDocBodyObserver() {
      this.bodyObserver?.disconnect();
      clearTimeout(this.observerTimeout);
      this.bodyObserver = Tools.createObserver(document.body, () => {
        const video = this.getVideo();
        if (video?.offsetWidth) this.setCurrentVideo(video);
        if (this.topWin) this.bodyObserver.disconnect();
      });
      this.observerTimeout = setTimeout(() => this.bodyObserver?.disconnect(), Consts.ONE_SEC * 10);
    },
    setCurrentVideo(video) {
      if (!video || this.player === video) return;
      if (this.player && !this.player.paused && !isNaN(this.player.duration)) return;
      if (video.offsetWidth < 200 || this.isBackgroundVideo(video)) return;
      this.player = video;
      this.setVideoInfo(video);
      this.setupVideoObserver(video);
      window.videoEnhance.enhanced(video);
      this.createClock(video);
    },
    setVideoInfo(video) {
      const isLive = Object.is(video.duration, Infinity);
      const videoInfo = { ...Tools.getCenterPoint(video), src: video.currentSrc, isLive };
      this.setParentWinVideoInfo(videoInfo);
    },
    setParentWinVideoInfo(videoInfo) {
      window.videoInfo = this.videoInfo = videoInfo;
      if (!Tools.isTopWin()) return Tools.postMessage(window.parent, { videoInfo: { ...videoInfo, iframeSrc: location.href } });
      Promise.resolve().then(() => (this.setupPickerEpisodeListener(), this.setupScriptMenuCommand()));
      this.sendTopWinInfo();
    },
    sendTopWinInfo() {
      const { host, href: url } = location;
      const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
      const topWin = { url, host, viewWidth, viewHeight, urlHash: Tools.hashCode(url) };
      window.topWin = this.topWin = topWin;
      Tools.sendToIFrames({ topWin });
    },
    setupVideoObserver(video) {
      this.playerObserver?.disconnect();
      const handleAttrChange = (mutations) => {
        mutations.forEach((mutation) => {
          const { attributeName, oldValue, target } = mutation;
          const newValue = target.getAttribute(attributeName);
          if (attributeName !== "src" || oldValue === newValue || !newValue) return;
          this.setVideoInfo(target);
          this.initVideoProps(target);
          this.hasAppliedCachedTime = false;
        });
      };
      const options = { attributes: true, attributeOldValue: true };
      this.playerObserver = Tools.createObserver(video, handleAttrChange, options);
    },
    setupMouseMoveListener() {
      let timer = null;
      const handleMouseEvent = ({ target, isTrusted }) => {
        if (!isTrusted) return;
        clearTimeout(timer), this.toggleCursor();
        timer = setTimeout(() => this.toggleCursor(true), Consts.THREE_SEC);
        if (target instanceof HTMLVideoElement) this.setCurrentVideo(target);
      };
      document.addEventListener("mousemove", (e) => handleMouseEvent(e));
      document.addEventListener("mouseover", (e) => e.target.matches("video, iframe") && handleMouseEvent(e));
    },
    toggleCursor(hide = false) {
      if (this.isNormalSite() || Tools.isFrequent("cursor", void 0, true)) return;
      const cls = "__hc";
      if (!hide) return Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));
      [...Tools.getParents(this.player, true, 3), ...Tools.getIFrames()].forEach((el) => {
        el?.blur(), Tools.addCls(el, cls), el?.dispatchEvent(new MouseEvent("mouseleave"));
      });
    },
    setupFullscreenListener() {
      ["fullscreenchange", "webkitfullscreenchange"].forEach(
        (event) => document.addEventListener(event, () => {
<<<<<<< HEAD
          this.isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
=======
          this.isFullscreen = !!document.fullscreenElement;
>>>>>>> dev
          this.isFullscreen ? this.Clock?.start() : this.Clock?.stop();
        })
      );
    },
    createClock(video) {
      Promise.resolve().then(() => {
        this.Clock?.destroy();
        this.Clock = new Clock(video.parentElement);
        !this.isFullscreen && this.Clock.stop();
      });
    }
  };
  const { matches, includes: excluded } = _GM_info.script;
  const isValid = (s) => s !== "*://*/*" && !excluded.includes(s);
  const siteRegExp = matches.filter(isValid).map((s) => new RegExp(s.replace(/\*/g, "\\S+")));
  const Site = {
    isAcFun: () => /acfun.cn\/v/.test(location.href),
    isTencent: () => /v.qq.com\/x/.test(location.href),
    isQiyi: () => /iqiyi.com\/v_*/.test(location.href),
    isDouyu: () => /v.douyu.com\/show/.test(location.href),
    isBili: () => /bilibili.com\/video/.test(location.href),
    isBiliLive: () => location.host === "live.bilibili.com",
    isMatched: () => siteRegExp.some((match) => match.test(location.href.replace(location.search, Consts.EMPTY)))
  };
  const Keyboard = Object.freeze({
    A: "KeyA",
    D: "KeyD",
    F: "KeyF",
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
  const SiteIcons = {
    "live.bilibili.com": { webFull: "#businessContainerElement" },
    "live.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
    "www.bilibili.com": { full: ".bpx-player-ctrl-full", webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
    "v.youku.com": { full: "#fullscreen-icon", webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
    "v.douyu.com": { full: ".ControllerBar-WindowFull-Icon", webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
    "www.acfun.cn": { full: ".fullscreen-screen", webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
    "www.mgtv.com": { full: ".fullscreenBtn i", webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
    "www.iqiyi.com": { full: "[class*=fullScreenBtn]", webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=buttons_playNext]" },
    "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" },
    "tv.sohu.com": { full: ".x-fullscreen-btn", webFull: ".x-pagefs-btn", danmaku: ".tm-tmbtn", next: ".x-next-btn" },
    name: { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" }
  };
  const Keydown = {
    preventDefault(event, { code, altKey } = event) {
      const overrideKey = [Keyboard.Space, Keyboard.Left, Keyboard.Right];
      const isOverrideKey = this.isOverrideKeyboard() && overrideKey.includes(code);
      const isNumberKey = Tools.isNumber(event.key) && !this.isDisablePlaybackRate();
      const preventKeys = [Keyboard.F, Keyboard.K, Keyboard.L, Keyboard.M, Keyboard.N, Keyboard.P, Keyboard.R].includes(code);
      const zoomKeys = !this.isDisableZoom() && [Keyboard.Up, Keyboard.Down, Keyboard.Left, Keyboard.Right].includes(code);
      if (isNumberKey || isOverrideKey || preventKeys || altKey && zoomKeys) Tools.preventDefault(event);
    },
    processKeystrokes({ key, code, ctrlKey, shiftKey, altKey }) {
      code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
      const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
      return keys.filter(Boolean).join("_");
    },
    setupKeydownListener() {
      window.addEventListener("keyup", (event) => this.preventDefault(event), true);
      window.addEventListener("keydown", (event) => this.keydownHandler.call(this, event), true);
      window.addEventListener("message", ({ data }) => {
        if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
        if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
        if (data?.topWin) window.topWin = this.topWin = data.topWin;
        if (data?.disable_speed) this.resetToDefaultPlayRate();
        if (data?.disable_zoom) this.resetVideoTransform();
        this.processEvent(data);
      });
    },
    keydownHandler(event, { key, code } = event) {
      const target = event.composedPath()[0];
      const isInput = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (this.isNormalSite() || isInput || target?.isContentEditable) return;
      if (!Object.values(Keyboard).includes(code) && !Tools.isNumber(key)) return;
      this.preventDefault(event);
      key = this.processKeystrokes(event);
      if ([Keyboard.N, Keyboard.P].includes(code)) return Tools.postMessage(window.top, { key });
      this.processEvent({ key });
    },
    processEvent(data) {
      if (!this.player) Tools.sendToIFrames(data);
      if (data?.key) this.execHotKeyActions(data.key.toUpperCase());
    },
    execHotKeyActions(key) {
      const dict = {
        M: () => this.toggleMute(),
        R: () => this.rotateVideo(),
        L: () => this.freezeVideoFrame(),
        K: () => this.freezeVideoFrame(true),
        Z: () => this.resetToDefaultPlayRate(),
        D: () => Site.isMatched() && this.triggerIconElement(SiteIcons.name.danmaku),
        N: () => Site.isMatched() ? this.triggerIconElement(SiteIcons.name.next) : this.switchEpisode(),
        F: () => Site.isMatched() ? this.triggerIconElement(SiteIcons.name.full) : this.toggleFullscreen(),
        P: () => Site.isMatched() ? this.triggerIconElement(SiteIcons.name.webFull) : this.webFullEnhance(),
        LEFT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(-Storage.SKIP_INTERVAL.get()),
        RIGHT: () => this.isOverrideKeyboard() && this.adjustPlayProgress(Storage.SKIP_INTERVAL.get()),
        0: () => this.adjustPlayProgress(Storage.ZERO_KEY_SKIP_INTERVAL.get()) ?? true,
        SPACE: () => this.isOverrideKeyboard() && this.togglePlayPause(this.player),
        SHIFT_P: () => this.togglePictureInPicture(),
        SHIFT_L: () => this.toggleNativeControls(),
        CTRL_ALT_A: () => this.captureScreenshot(),
        CTRL_Z: () => this.resetVideoTransform(),
        SHIFT_R: () => this.toggleMirrorFlip(),
        ALT_SUB: () => this.zoomVideo(true),
        ALT_ADD: () => this.zoomVideo()
      };
      const step = Storage.PLAY_RATE_STEP.get();
      ["A", "ADD"].forEach((k) => dict[k] = () => this.adjustPlaybackRate(step));
      ["S", "SUB"].forEach((k) => dict[k] = () => this.adjustPlaybackRate(-step));
      Array.from({ length: 7 }, (_, i) => dict[`CTRL_${i}`] = () => this.setPlaybackRate(10 + i));
      ["ALT_UP", "ALT_DOWN", "ALT_LEFT", "ALT_RIGHT"].forEach((k) => dict[k] = () => this.moveVideoPosition(k));
      dict[key]?.() ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
    },
    triggerIconElement(name) {
      if (Tools.isFrequent("icon")) return;
      const index = Object.values(SiteIcons.name).indexOf(name);
      if (!Site.isBiliLive()) return Tools.query(SiteIcons[location.host]?.[name])?.click();
      SiteIcons.name.webFull === name ? this.liveWebFullscreen() : this.getBiliLiveIcons()?.[index]?.click();
    }
  };
  const WebLogin = {
    removeLoginPopups() {
      this.removeBiliLogin(), this.removeTencentLogin();
    },
    removeTencentLogin: () => Site.isTencent() && Tools.query("#login_win")?.remove(),
    removeBiliLogin() {
      if (!Site.isBili() || this.BiliTimerID) return;
      if (document.cookie.includes("DedeUserID")) return _unsafeWindow.player?.requestQuality(80);
      this.BiliTimerID = setInterval(() => {
        if (_unsafeWindow.__BiliUser__.cache.data.isLogin) clearInterval(this.BiliTimerID);
        _unsafeWindow.__BiliUser__.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.isLogin = true;
        _unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
      }, Consts.THREE_SEC);
    }
  };
  const { ENABLE_THIS_SITE_AUTO: ENABLE_THIS, CURR_EPISODE_SELECTOR: EPISODE_SELECTOR } = Storage;
  const MenuCommand = {
    isDisableAuto: () => Storage.DISABLE_AUTO.get(),
    isDisableZoom: () => Storage.DISABLE_ZOOM_MOVE.get(),
    isOverrideKeyboard: () => Storage.OVERRIDE_KEYBOARD.get(),
    isDisablePlaybackRate: () => Storage.CLOSE_PLAY_RATE.get(),
    isDisableScreenshot: () => Storage.DISABLE_SCREENSHOT.get(),
    isEnableSiteAuto: () => ENABLE_THIS.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
    setupScriptMenuCommand() {
      if (this.hasMenu || !Tools.isTopWin() || Tools.isFrequent("menu")) return;
      this.setupMenuChangeListener();
      this.registMenuCommand();
      this.hasMenu = true;
    },
    setupMenuChangeListener() {
      const host = location.host;
      [ENABLE_THIS.name + host, EPISODE_SELECTOR.name + host].forEach(
        (key) => _GM_addValueChangeListener(key, () => this.registMenuCommand())
      );
    },
    registMenuCommand() {
      const host = location.host;
      const isEnable = this.isEnableSiteAuto();
      const siteFun = ({ cache }) => cache.set(host, !cache.get(host));
      const delPicker = () => Storage.CURR_EPISODE_SELECTOR.del(host) & Storage.REL_EPISODE_SELECTOR.del(host);
      const configs = [
        { title: `此站${isEnable ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isHidden: Site.isMatched(), fn: siteFun },
        { title: "删除此站剧集选择器", cache: EPISODE_SELECTOR, isHidden: !EPISODE_SELECTOR.get(host), fn: delPicker },
        { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, isHidden: false, fn: () => this.shortcutKeysPopup() },
        { title: "更多设置", cache: { name: "SETTING" }, isHidden: false, fn: () => this.settingPopup() }
      ];
      configs.forEach(({ title, cache, isHidden, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        _GM_unregisterMenuCommand(this[id]);
        if (isHidden) return;
        this[id] = _GM_registerMenuCommand(title, () => {
          if (fn) return fn.call(this, { cache, title });
          const input = prompt(title, cache.get());
          if (!isNaN(input) && cache.parser(input)) cache.set(input);
        });
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
        html: Tools.safeHTML(`<table><tr><th>快捷键</th><th>说明</th></tr>${rows}</table>`)
      });
    },
    settingPopup() {
      const { html: disableHtml, cacheMap: disableMap } = this.genDisableItems();
      const { html: paramsHtml, cacheMap: paramsMap } = this.genParamsItems();
      const { html: ignoreHtml, cacheMap: ignoreMap } = this.genIgnoreItems();
      const cacheMap = { ...disableMap, ...paramsMap, ...ignoreMap };
      const modalHtml = `
        <div class="swal2-tabs">
          <!-- Tabs 标题栏 -->
          <div class="swal2-tabs-header">
              <div class="swal2-tab active" data-tab="tab1">禁用设置</div>
              <div class="swal2-tab" data-tab="tab2">参数设置</div>
              <div class="swal2-tab" data-tab="tab3">其他设置</div>
          </div>
          <!-- Tabs 内容区 -->
          <div class="swal2-tabs-content">
            <div class="swal2-tab-panel active" id="tab1">${disableHtml}</div>
            <div class="swal2-tab-panel" id="tab2">${paramsHtml}</div>
            <div class="swal2-tab-panel" id="tab3">${ignoreHtml}</div>
          </div>
        </div>`;
      Swal.fire({
        width: 400,
        title: "设置",
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        html: Tools.safeHTML(modalHtml),
        customClass: { container: "monkey-web-fullscreen" },
        didOpen(popup) {
          Tools.querys(".swal2-tab", popup).forEach((tab) => {
            tab.addEventListener("click", () => {
              Tools.querys(".swal2-tab, .swal2-tab-panel", popup).forEach((el) => el.classList.remove("active"));
              Tools.query(`#${tab.dataset.tab}`, popup).classList.add("active");
              tab.classList.add("active");
            });
          });
          Tools.querys(".__menu input, textarea", popup).forEach((ele) => {
            ele.addEventListener("input", function() {
              const isCheckbox = this.type === "checkbox";
              this.dataset.send && Tools.postMessage(window, { [`disable_${this.name}`]: this.checked });
              setTimeout(() => {
                const host = this.dataset.host;
                const cache = cacheMap[this.name];
                const value = isCheckbox ? this.checked : this.value;
                host ? cache.set(host, value) : cache.set(value);
              }, 100);
            });
          });
        }
      });
    },
    genDisableItems() {
      const configs = [
        { name: "pic", text: "禁用视频截图", cache: Storage.DISABLE_SCREENSHOT },
        { name: "zoom", text: "禁用缩放与移动", cache: Storage.DISABLE_ZOOM_MOVE, sendMsg: true },
        { name: "speed", text: "禁用视频倍速调节", cache: Storage.CLOSE_PLAY_RATE, sendMsg: true, isHidden: this.isLive() },
        { name: "time", text: "禁用播放进度记录", cache: Storage.DISABLE_MEMORY_TIME, isHidden: this.isLive() },
        { name: "fit", text: "禁用自动网页全屏", cache: Storage.DISABLE_AUTO, isHidden: !Site.isMatched() },
        { name: "tabs", text: "禁用不可见时暂停", cache: Storage.DISABLE_INVISIBLE_PAUSE },
        { name: "volume", text: "禁用音量默认百分百", cache: Storage.DISABLE_DEF_MAX_VOLUME },
        { name: "next", text: "启用自动切换至下集", cache: Storage.ENABLE_AUTO_NEXT_EPISODE },
        { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEYBOARD }
      ].filter(({ isHidden }) => !isHidden);
      const renderItem = ({ text, sendMsg, name, value }) => `
        <label class="__menu">${text}
          <input ${sendMsg ? 'data-send="true"' : ""} ${value ? "checked" : ""} name="${name}" type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;
      return this.generateCommonItems(configs, renderItem);
    },
    genParamsItems() {
      const configs = [
        { name: "step", text: "倍速步进", cache: Storage.PLAY_RATE_STEP },
        { name: "skip", text: "快进/退秒数", cache: Storage.SKIP_INTERVAL },
        { name: "zeroSkip", text: "零键快进秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL },
        { name: "advance", text: "自动下集提前秒数", cache: Storage.AUTO_NEXT_ADVANCE_SEC },
        { name: "days", text: "播放进度保存天数", cache: Storage.STORAGE_DAYS },
        { name: "percent", text: "缩放百分比", cache: Storage.PERCENT_OF_ZOOM },
        { name: "move", text: "移动距离", cache: Storage.MOVING_DISTANCE }
      ];
      const renderItem = ({ text, name, value }) => `
        <label class="__menu">${text}
          <input value="${value}" name="${name}" type="text" autocomplete="off"/>
        </label>`;
      return this.generateCommonItems(configs, renderItem);
    },
    genIgnoreItems() {
      const host = location.host;
      const configs = [
        { name: "customFit", text: "自定义此站网页全屏规则", cache: Storage.CUSTOM_WEB_FULL, isHidden: Site.isMatched(), host },
        { name: "nextIgnore", text: "自动切换下集时忽略的网址列表（分号隔开）", cache: Storage.NEXT_IGNORE_URLS },
        { name: "fitIgnore", text: "自动网页全屏时忽略的网址列表（分号隔开）", cache: Storage.FULL_IGNORE_URLS }
      ];
      const renderItem = ({ text, host: host2, name, value }) => `
        <div class="others-sett"><p>${text}</p>
          <textarea ${host2 ? `data-host="${host2}"` : ""} name="${name}" type="text" spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;
      return this.generateCommonItems(configs, renderItem);
    },
    generateCommonItems(baseConfigs, renderItem) {
      const filteredConfigs = baseConfigs.filter(({ isHidden }) => !isHidden);
      const processedConfigs = filteredConfigs.map((config) => ({
        value: config.host ? config.cache.get(config.host) : config.cache.get(),
        ...config
      }));
      const html = processedConfigs.map((config) => renderItem(config)).join(Consts.EMPTY);
      const cacheMap = Object.fromEntries(processedConfigs.map((item) => [item.name, item.cache]));
      return { html, cacheMap };
    }
  };
  const VideoControl = {
    isEnded() {
      if (!this.player) return false;
      if (this.player.ended) return true;
      const { duration, currentTime } = this.player;
      if (isNaN(duration) || duration <= 0) return false;
      return duration - currentTime <= 0.1;
    },
    isLive() {
      if (!this.videoInfo && !this.player) return false;
      return this.videoInfo.isLive || this?.player?.duration === Infinity || this.isDynamicDuration(this.player);
    },
    isDynamicDuration(video) {
      if (!video) return false;
      if (!video?.__duration) return (video.__duration = video.duration) || false;
      return Math.floor(video.duration) > Math.floor(video.__duration);
    },
    initVideoProps(video) {
      video.hasWebFull = false;
      video.hasTriedAutoNext = false;
      video.hasApplyCachedRate = false;
      video.__duration = video.duration;
      Tools.resetLimitCounter("autoWebFull");
      if (!Storage.DISABLE_DEF_MAX_VOLUME.get()) video.volume = 1;
    },
    getRemainingTime: (video) => Math.floor(video.duration) - Math.floor(video.currentTime),
    togglePlayPause: (video) => Site.isDouyu() ? Tools.triggerClick(video) : video?.paused ? video?.play() : video?.pause(),
    tryAutoPlay: (video) => video?.paused && (Site.isDouyu() ? Tools.triggerClick(video) : video?.play()),
    setPlaybackRate(playRate, show = true) {
      if (!this.player || isNaN(this.player.duration) || this.isDisablePlaybackRate()) return;
      if (this.isLive() || this.isEnded() || this.isBackgroundVideo(this.player)) return;
      if (Number(this.player.playbackRate) === playRate) return;
      window.videoEnhance.setPlaybackRate(this.player, playRate);
      if (show) this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
      Storage.CACHED_PLAY_RATE.set(this.player.playbackRate);
      return Promise.resolve();
    },
    adjustPlaybackRate(step = Storage.PLAY_RATE_STEP.get()) {
      if (!this.player) return;
      const playRate = Math.max(Consts.MIN_PLAY_RATE, Number(this.player.playbackRate) + step);
      this.setPlaybackRate(Math.min(Consts.MAX_PLAY_RATE, playRate));
    },
    resetToDefaultPlayRate() {
      this.setPlaybackRate(Consts.DEF_PLAY_RATE, false)?.then(() => this.showToast("已恢复正常倍速播放"));
    },
    applyCachedPlayRate(video) {
      if (video.hasApplyCachedRate) return;
      const playRate = Storage.CACHED_PLAY_RATE.get();
      if (Consts.DEF_PLAY_RATE === playRate || Number(video.playbackRate) === playRate) return;
      this.setPlaybackRate(playRate, !video.hasApplyCachedRate)?.then(() => video.hasApplyCachedRate = true);
    },
    adjustPlayProgress(second = Storage.SKIP_INTERVAL.get()) {
      if (!this.player || this.isLive() || this.isEnded()) return;
      const currentTime = Math.min(Number(this.player.currentTime) + second, this.player.duration);
      this.setCurrentTime(currentTime);
    },
    cachePlayTime(video) {
      if (Tools.isFrequent("cacheTime", Consts.ONE_SEC, true)) return;
      if (!this.topWin || video.paused || video.duration < 120 || this.isLive()) return;
      if (Number(video.currentTime) < Storage.SKIP_INTERVAL.get()) return;
      if (Storage.DISABLE_MEMORY_TIME.get() || this.isEnded()) return this.clearCachedTime(video);
      if (this.getRemainingTime(video) <= 30) return this.clearCachedTime(video);
      Storage.PLAY_TIME.set(this.getCacheTimeKey(video), Number(video.currentTime) - 1, Storage.STORAGE_DAYS.get());
      this.clearMultiVideoCacheTime();
    },
    applyCachedTime(video) {
      if (Storage.DISABLE_MEMORY_TIME.get()) return this.clearCachedTime(video);
      if (this.hasAppliedCachedTime || !this.topWin || this.isLive()) return;
      const time = Storage.PLAY_TIME.get(this.getCacheTimeKey(video));
      if (time <= Number(video.currentTime)) return this.hasAppliedCachedTime = true;
      this.setCurrentTime(time);
      this.hasAppliedCachedTime = true;
      this.customToast("上次观看至", this.formatTime(time), "处，已为您续播", Consts.ONE_SEC * 3.5, false).then((el) => {
        el.style.setProperty("transform", `translateY(${ -5 - el.offsetHeight}px)`);
      });
    },
    clearCachedTime(video) {
      Storage.PLAY_TIME.del(this.getCacheTimeKey(video));
    },
    getCacheTimeKey(video) {
      return `${this.topWin.urlHash}_${Math.floor(video.duration)}`;
    },
    clearMultiVideoCacheTime() {
      Promise.resolve().then(() => {
        if (!Tools.isMultiVideo()) return;
        const pattern = `${Storage.PLAY_TIME.name}${this.topWin.urlHash}`;
        const keys = Object.keys(Storage.PLAY_TIME.fuzzyGet(pattern));
        if (keys.length > 1) Storage.PLAY_TIME.fuzzyDel(pattern);
      });
    },
    setCurrentTime(currentTime) {
      if (currentTime) this.player.currentTime = Math.max(0, currentTime);
    },
    toggleMute() {
      if (!this.player) return;
      const isMuted = this.player.muted || !this.player.volume;
      this.player.muted = !isMuted;
      this.player.volume = Number(isMuted);
      this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
    },
    togglePictureInPicture() {
      if (this.player) document.pictureInPictureElement ? document.exitPictureInPicture() : this.player?.requestPictureInPicture();
    },
    toggleMirrorFlip() {
      if (!this.player) return;
      const tsr = this.player.tsr;
      tsr.isMirrored = !tsr.isMirrored;
      this.setVideoTsr("--mirror", tsr.isMirrored ? -1 : 1);
    },
    rotateVideo() {
      if (!this.player) return;
      const tsr = this.player.tsr;
      tsr.rotation = (tsr.rotation + 90) % 360;
      const { videoWidth, videoHeight } = this.player;
      const isVertical = [90, 270].includes(tsr.rotation);
      const scale = isVertical ? videoHeight / videoWidth : 1;
      this.setVideoTsr("--scale", scale).setVideoTsr("--rotate", `${tsr.rotation}deg`);
    },
    zoomVideo(isDown) {
      if (!this.player || this.isDisableZoom()) return;
      const tsr = this.player.tsr;
      const step = Storage.PERCENT_OF_ZOOM.get();
      const zoom = tsr.zoom + (isDown ? -step : step);
      if (zoom < Consts.MIN_ZOOM || zoom > Consts.MAX_ZOOM) return;
      tsr.zoom = zoom;
      this.setVideoTsr("--zoom", zoom / 100);
      this.showToast(`缩放：${zoom}%`, Consts.ONE_SEC);
    },
    moveVideoPosition(direction) {
      if (!this.player || this.isDisableZoom()) return;
      const tsr = this.player.tsr;
      const step = Storage.MOVING_DISTANCE.get();
      const { x, y, desc } = {
        ALT_UP: { y: -step, desc: "垂直移动" },
        ALT_DOWN: { y: step, desc: "垂直移动" },
        ALT_LEFT: { x: -step, desc: "水平移动" },
        ALT_RIGHT: { x: step, desc: "水平移动" }
      }[direction];
      ((tx = 0, ty = 0) => (tsr.moveX += tx, tsr.moveY += ty))(x, y);
      this.setVideoTsr("--moveX", `${tsr.moveX}px`).setVideoTsr("--moveY", `${tsr.moveY}px`);
      this.showToast(`${desc}：${x ? tsr.moveX : tsr.moveY}px`, Consts.ONE_SEC);
    },
    resetVideoTransform() {
      if (!this.player || this.isDisableZoom()) return;
      this.setVideoTsr("--zoom", 1).setVideoTsr("--moveX", 0).setVideoTsr("--moveY", 0).setVideoTsr("--scale", 1).setVideoTsr("--mirror", 1).setVideoTsr("--rotate", "0deg");
      window.videoEnhance.resetTsr(this.player);
    },
    captureScreenshot() {
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
    showToast(content, duration = Consts.THREE_SEC, isRemove = true) {
      return new Promise((resolve) => {
        const el = document.createElement("div");
        el.setAttribute("class", "monkey-toast");
        if (isRemove) Tools.query(".monkey-toast")?.remove();
        content instanceof Element ? el.appendChild(content) : el.innerHTML = content;
        (this.findControlBarContainer() ?? this.findVideoParentContainer(null, 2, false)).prepend(el), resolve(el);
        setTimeout(() => (el.style.opacity = 0, setTimeout(() => el.remove(), Consts.HALF_SEC)), duration);
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
    autoNextEpisode(video) {
      if (video.hasTriedAutoNext) return;
      if (!Storage.ENABLE_AUTO_NEXT_EPISODE.get()) return;
      if (Tools.isFrequent("autoNext", Consts.THREE_SEC, true)) return;
      if (this.getRemainingTime(video) > Storage.AUTO_NEXT_ADVANCE_SEC.get()) return;
      if (this.isNextIgnoreUrl()) return video.hasTriedAutoNext = true;
      Tools.postMessage(window.top, { key: "N" });
      video.hasTriedAutoNext = true;
    },
    autoWebFullscreen(video) {
      if (this.player !== video) return;
      if (Tools.isFrequent("autoWebFull", Consts.ONE_SEC, true)) return;
      if (video.hasWebFull || !this.topWin || !video.offsetWidth) return;
      if (Site.isMatched() && this.isDisableAuto() || !Site.isMatched() && !this.isEnableSiteAuto()) return;
      if (this.isFullIgnoreUrl() || Tools.isOverLimit("autoWebFull")) return video.hasWebFull = true;
      if (video.offsetWidth >= this.topWin.viewWidth) return video.hasWebFull = true;
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
      requestAnimationFrame(() => {
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
    getEpisodeNumber: (ele) => Tools.getNumbers(ele?.innerText?.replace(/-|\./g, Consts.EMPTY))?.shift(),
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
        const currClass = Array.from(ele.classList).filter((cls) => !["cur", "active"].includes(cls));
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
      if (Site.isMatched() || this.hasPickerListener) return;
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
        html: Tools.safeHTML(`<h4>验证能正确取到集数，再确定保存</h4>
      <textarea id="__picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
      <p>编辑元素选择器，确保能正确获取到集数</p>`),
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
    toggleFullscreen() {
      Tools.alert("接收到消息的地址", location.href);
      if (!this.player) return;
      const isFull = !!document.fullscreenElement;
      if (isFull) return document.exitFullscreen();
      const videoContainer = this.getVideoContainer();
      videoContainer.requestFullscreen();
    },
    webFullEnhance() {
      if (this.isNormalSite() || Tools.isFrequent("enhance")) return;
      if (this.fullscreenWrapper) return this.exitWebFullEnhance();
      const container = this.fullscreenWrapper = this.getVideoHostContainer();
      if (!container || container.matches(":is(html, body)")) return this.ensureWebFullscreen();
      container.top = container.top ?? Tools.getElementRect(container).top;
      container.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      Tools.getParents(container, true).forEach((el) => Tools.setPart(el, Consts.webFull));
      Tools.scrollTop(container.scrollY + container.top);
      this.ensureWebFullscreen();
    },
    exitWebFullEnhance() {
      const { scrollY } = this.fullscreenWrapper;
      Tools.querys(`[part*=${Consts.webFull}]`).forEach((el) => Tools.delPart(el, Consts.webFull));
      requestAnimationFrame(() => Tools.scrollTop(scrollY));
      this.fullscreenWrapper = null;
      this.videoParents.clear();
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
      const selector = Storage.CUSTOM_WEB_FULL.get(this.topWin?.host)?.trim();
      if (selector) return Tools.query(selector.replace(/\n/g, Consts.EMPTY));
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
      const video = this.player;
      container = container ?? video.parentElement;
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
      if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
      return path;
    }
    isBlocked(url) {
      try {
        const parsedUrl = new URL(url);
        const normalizedPath = this.normalizePath(parsedUrl.pathname);
        return this.blacklist.some((entry) => {
          if (parsedUrl.hostname !== entry.hostname) return false;
          if (entry.pathname === "/") {
            return normalizedPath === "/";
          } else {
            return normalizedPath === entry.pathname || normalizedPath.startsWith(`${entry.pathname}/`);
          }
        });
      } catch (e) {
        console.error(`要检查的URL无效: ${url}`, e);
        return false;
      }
    }
  }
  const IgnoreUrls = {
    defNextIgnore: ["https://www.youtube.com/watch", "https://www.bilibili.com/video", "https://www.bilibili.com/list"],
    defFullIgnore: ["https://www.youtube.com/shorts", "https://www.youtube.com", "https://www.bilibili.com"],
    setupIgnoreUrlsChangeListener() {
      this.initializeIgnoreUrls();
      [Storage.FULL_IGNORE_URLS.name, Storage.NEXT_IGNORE_URLS.name].forEach(
        (key) => _GM_addValueChangeListener(key, (_, oldVal, newVal) => {
          if (oldVal === newVal) return;
          this.initializeIgnoreUrls();
        })
      );
    },
    initializeIgnoreUrls() {
      const nextUrls = this.processIgnoreUrls(Storage.NEXT_IGNORE_URLS, this.defNextIgnore);
      this.nextUrlFilter = new URLBlacklist(nextUrls);
      const fullUrls = this.processIgnoreUrls(Storage.FULL_IGNORE_URLS, this.defFullIgnore);
      this.fullUrlFilter = new URLBlacklist(fullUrls);
    },
    isNextIgnoreUrl() {
      return this.topWin ? this.nextUrlFilter?.isBlocked(this.topWin.url) : false;
    },
    isFullIgnoreUrl() {
      return this.topWin ? this.fullUrlFilter?.isBlocked(this.topWin.url) : false;
    },
    processIgnoreUrls(cache, defaultUrls) {
      const urlsStr = cache.get() ?? "";
      const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());
      if (existUrls.length) return existUrls;
      cache.set(defaultUrls.join(";\n"));
      return defaultUrls;
    }
  };
  const VideoEvents = {
    loadedmetadata() {
      App.autoWebFullscreen(this);
      Tools.querys('[id*="loading"]').forEach((el) => !Tools.query('[class*="player"]', el) && Tools.addCls(el, "_noplayer"));
    },
    loadeddata() {
      App.initVideoProps(this);
      Tools.query(".conplaying")?.click();
    },
    timeupdate() {
      if (isNaN(this.duration)) return;
      App.autoWebFullscreen(this);
      App.autoNextEpisode(this);
      App.cachePlayTime(this);
    },
    canplay() {
      if (this.hasTryAutoPlay || Tools.isMultiVideo()) return;
      this.hasTryAutoPlay = true;
      App.tryAutoPlay(this);
    },
    playing() {
      this.isEnded = false;
      if (this.duration < 5) return;
      App.setCurrentVideo(this);
      App.applyCachedPlayRate(this);
      setTimeout(() => App.applyCachedTime(this), 20);
      App.removeLoginPopups();
    },
    pause() {
      Tools.query(".ec-no")?.click();
      Tools.query('[id*="loading"]._noplayer')?.remove();
    },
    ended() {
      this.isEnded = true;
      App.autoExitWebFullscreen();
      App.clearCachedTime(this);
    }
  };
  class VideoEnhancer {
    constructor() {
      __publicField(this, "attr", "enhanced");
      __publicField(this, "selector", ":is(video, fake-video):not([enhanced])");
      __publicField(this, "defaultTsr", { zoom: 100, moveX: 0, moveY: 0, rotation: 0, isMirrored: false });
      __publicField(this, "danmuSelector", ':is([class*="danmu" i], [class*="danmaku" i], [class*="barrage" i])');
      __publicField(this, "videoEvents", Object.entries(VideoEvents));
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
      Tools.createObserver(document.body, (mutations) => {
        mutations.forEach((m) => m.type === "childList" && this.processAddedNodes(m.addedNodes));
      });
    }
    /**
     * 异步处理新增节点，避免阻塞主线程
     * @param {NodeList} nodes - 新增节点列表
     */
    async processAddedNodes(nodes) {
      const { selector, danmuSelector } = this;
      for (const node of nodes) {
        if (!(node instanceof Element) || node.matches(danmuSelector)) continue;
        if (node.matches(selector)) requestIdleCallback(() => this.enhanced(node));
        else if (node.hasChildNodes()) {
          Tools.querys(selector, node).forEach((video) => requestIdleCallback(() => this.enhanced(video)));
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    enhanced(video) {
      if (video.hasAttribute(this.attr)) return;
      this.setupEventListeners(video);
      video.tsr = { ...this.defaultTsr };
    }
    setupEventListeners(video) {
      this.videoEvents.forEach(([type, handler]) => {
        video.removeEventListener(type, handler, true);
        video.addEventListener(type, handler, true);
        video.setAttribute(this.attr, true);
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
     * @param video - 视频元素
     * @see 腾讯视频fake-video https://v.qq.com/wasm-kernel/1.0.49/fake-video-element-iframe.js
     */
    bypassPlaybackRateLimit(video) {
      this.defineProperty(video, "playbackRate", {
        set(value, setter) {
          if (this.playbackRate === value) return;
          if (this instanceof HTMLMediaElement) return this.__playRate === value && setter(value);
          this._playbackRate = value;
          this._quality.setPlaybackRate(value);
          this?.mailToWorker({ cmd: "callWorker_setRate", rate: value });
          Promise.resolve().then(() => this?.emit("ratechange", this._playbackRate));
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
      Element.prototype.__attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function(options) {
        if (this._shadowRoot) return this._shadowRoot;
        const shadowRoot = this._shadowRoot = this.__attachShadow.call(this, options);
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
  [Keydown, WebLogin, MenuCommand, IgnoreUrls, VideoControl, WebFullScreen, WebFullEnhance, SwitchEpisode, PickerEpisode].forEach(
    (handler) => {
      Object.entries(handler).forEach(([key, value]) => {
        App$1[key] = value instanceof Function ? value.bind(App$1) : value;
      });
    }
  );
  window.videoEnhance = new VideoEnhancer();
  _unsafeWindow.AUTO_WEB_FULLSCREEN = App$1;
  App$1.init();

})(notyf, sweetalert2);