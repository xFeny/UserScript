// ==UserScript==
// @name         视频自动网页全屏｜倍速播放
// @namespace    http://tampermonkey.net/
// @version      3.11.2
// @author       Feny
// @description  支持所有H5视频的增强脚本，通用网页全屏｜倍速调节；B站(含直播) / 腾讯视频 / 优酷 / 爱奇艺 / 芒果TV / AcFun 默认自动网页全屏，其他网站可手动开启；自动网页全屏 + 记忆倍速 + 下集切换，减少鼠标操作，让追剧更省心、更沉浸；支持视频旋转、截图、镜像翻转、缩放与移动、记忆播放进度等功能
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=
// @homepage     https://github.com/xFeny/UserScript/tree/main/monkey-web-fullscreen
// @include      *://x.com/*
// @include      *://www.youtube.com/*
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
// @resource     Swal   https://unpkg.com/sweetalert2@11.20.0/dist/sweetalert2.min.css
// @resource     notyf  https://unpkg.com/notyf@3.10.0/notyf.min.css
// @connect      gitee.com
// @connect      raw.giteeusercontent.com
// @grant        GM.xmlHttpRequest
// @grant        GM_addElement
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
// @run-at       document-start
// @note         *://*/*
// ==/UserScript==

(a=>{const r=Symbol("added"),t=document.createElement("style");t.textContent=a,window.gmStyle=t,document.addEventListener("addStyle",({detail:{sroot:o}})=>{o[r]||o instanceof Document||(o.prepend(t.cloneNode(!0)),o[r]=!0)}),(GM_addStyle??(()=>document.head.append(t.cloneNode(!0))))(a)})(' @charset "UTF-8";[web-fullscr],body[web-fullscr] [web-fullscr]{top:0!important;left:0!important;margin:0!important;padding:0!important;zoom:normal!important;border:none!important;width:100vw!important;height:100vh!important;position:fixed!important;transform:none!important;max-width:none!important;max-height:none!important;border-radius:0!important;transition:none!important;z-index:2147483646!important;background-color:#000!important;flex-direction:column!important;overflow:hidden!important;display:flex!important}[web-fullscr] video,body[web-fullscr] [web-fullscr] video{top:0!important;left:0!important;width:100vw!important;border:none!important;transform:none!important;object-fit:contain!important;height:clamp(100vh - 100%,100vh,100%)!important}[web-fullscr]~*:not(.vpx-popup){display:none!important}.__tsr{object-fit:contain!important;transform-origin:center!important;transition:transform .35s!important;transform:var(--deftsr, matrix(1, 0, 0, 1, 0, 0)) scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--mvX, 0),var(--mvY, 0))!important}[web-fullscr] video.__tsr,body[web-fullscr] [web-fullscr] video.__tsr{transform:scale(var(--scale, 1)) scale(var(--zoom, 1)) scaleX(var(--mirror, 1)) rotate(var(--rotate, 0deg)) translate(var(--mvX, 0),var(--mvY, 0))!important}.__Clock,.__timeupdate,.__v_rate{color:#e0e0e0;opacity:1!important;z-index:100!important;text-indent:0!important;position:absolute!important;pointer-events:none!important;text-shadow:.5px 0 1px #000,-.5px 0 1px #000!important;font-family:Arial,Helvetica,sans-serif!important}.__Clock{top:8px!important;right:15px!important;width:auto!important;height:auto!important;font-size:17.5px!important;font-weight:700!important;text-align:right!important;line-height:17.5px!important;background-color:transparent!important;transform:scaleY(1.0857)!important}.__timeupdate,.__v_rate{font-size:12px!important;line-height:12px!important}.__timeupdate{top:25px!important;right:15px!important;transform-origin:top right!important;transform:translate(3px) scaleX(var(--time-sx, 1))!important}.__timeupdate b{font:inherit!important;display:inline-block!important;transform:scale(.65)!important;vertical-align:text-bottom!important;transform-origin:left center!important}.__v_rate{color:#d9d9d9;top:5px!important;left:5px!important;box-shadow:none!important;display:inline-block!important;transform:scale(.875)!important}.__v_edge{left:0!important;top:50%!important;opacity:0!important;width:20px!important;height:50%!important;position:absolute!important;z-index:2147483647!important;transform:translateY(-50%)!important;cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAaBJREFUSEutlL8vBEEcxT9fpxSdVtQkGqqrHP8CoqDXSZTC7VpcRa3SCBJEclcgEQmNShDFKVRXKSj8atmv7Gbvsrd2Zydhus2+75v33rwZwXKpx0UAlTIlmxGxAQUY9dCI2GrGCvRn4tCu8CJLTCadmBTrCgcoPfGY2hRHgAmEwyR5FnHWzK8osoDq0hdm7NJoujEJSc24NdDJgCzwkHbAWqGfL+pp7kIBWa1QjyEpc2NqjQlj3QrbWjZxucQty3CHsMU3u+LylreRRDdqJAa8xmdaXB7D/rp00cFngmgPZUccTrM2SCNu4FNKnP42ykwKSdCQbaAqZe7i/3OjCFWvUsTnKsf+GUKVb2ri8mRFHJIvc48wmJct8AHMZdetQn+8w+oxC2xaEAeQdfMFgeFml7VCD188G4hfgRpKVRxq1lc6euECxYHy+LpEOKHAcdyh9SMU5TyGcN5GqyyKw1rSSTux4dlsPTzLXCEUo+93fEbF5dZIbHMw6jEPbIRY5UgcxtPmrOvWUuzQS4E60IUyJQ77/0IcZe0C3eKE6lPXDznkqgSwYj+tAAAAAElFTkSuQmCC),pointer!important}.__v_edge.right{right:0!important;left:auto!important}@media (min-width: 2200px){.__Clock{font-size:23px!important;line-height:23px!important}.__timeupdate,.__v_rate{font-size:16px!important;line-height:16px!important}.__timeupdate{top:28px!important;transform:translate(4.2px) scaleX(var(--time-sx, 1))!important}}.notyf{z-index:2147483647!important}.notyf .notyf__message{font-size:13px;overflow:hidden;display:-webkit-box;line-clamp:4;-webkit-line-clamp:4;text-overflow:ellipsis;-webkit-box-orient:vertical;color:#fff!important}.vpx-popup{z-index:2147483647!important}.vpx-popup *{color:#555!important;box-sizing:border-box!important;font-family:Verdana,Geneva,Tahoma,sans-serif}.vpx-popup .swal2-popup{font-size:14px!important}.vpx-popup button:where(.swal2-styled){line-height:normal;color:#fff!important}.vpx-popup button:where(.swal2-styled):focus{box-shadow:none!important}.vpx-popup .swal2-confirm{background-color:#7066e0!important}.vpx-popup .swal2-deny{background-color:#dc3741!important}.vpx-popup .swal2-cancel{background-color:#757575!important}.vpx-popup textarea:focus,.vpx-popup input[type=text]:focus{outline:none!important;box-shadow:none!important;border-color:#3b82f6!important}.vpx-popup textarea{resize:none!important;font-size:12px!important;padding:2px 5px!important;line-height:normal!important;border:1px solid #cbd5e1!important}.vpx-popup h3{color:red!important;font-size:18px!important;margin:0!important}.vpx-popup p{margin:2px 0!important;font-size:12px!important}.vpx-popup table{width:100%!important;border-collapse:collapse!important}.vpx-popup table th{font-weight:700}.vpx-popup table th,.vpx-popup table td{line-height:2!important;font-size:13px!important;vertical-align:middle!important;border:1px solid #efefef!important}.vpx-popup table tr:nth-child(odd){background-color:#f8f8f8!important}.vpx-picker{margin-bottom:0;height:auto!important;min-height:15em!important;width:-webkit-fill-available;width:-moz-available}.vpx-tabs-header{display:flex;position:relative;margin-bottom:12px;font-size:15px!important;border-bottom:1px solid #e2e8f0}.vpx-tab{flex:1;padding:8px 0;cursor:pointer;font-weight:700;text-align:center;position:relative;transition:all .2s ease;color:#64748b!important}.vpx-tab:hover,.vpx-tab.active{color:#3b82f6!important}.vpx-tab.active:after{left:0;content:"";width:100%;height:2px;bottom:-1px;position:absolute;border-radius:2px;background-color:#3b82f6}.vpx-tabs-content{width:100%;padding:0 5px;min-height:325px}.vpx-tab-panel{display:none}.vpx-tab-panel.active{display:block}.vpx-input{margin:0 0 5px!important;padding:0 0 5px!important;float:none!important;height:30px!important;display:flex!important;font-size:14px!important;line-height:30px!important;font-weight:400!important;align-items:center!important;justify-content:space-between!important;border-bottom:1px solid #f5f5f5!important}.vpx-input:last-of-type{margin-bottom:0!important;border-bottom:none!important}.vpx-input input[type=text]{border-radius:3px;border:1px solid #cbd5e1!important;text-align:center!important;line-height:12px!important;font-size:12px!important;padding:0 3px!important;height:23px!important;width:75px!important}.vpx-input input[type=checkbox]{position:absolute!important;opacity:0!important}.vpx-input .toggle-track{width:38px!important;height:18px!important;cursor:pointer!important;position:relative!important;border-radius:13px!important;background-color:#ccc!important;transition:background-color .3s ease!important}.vpx-input .toggle-track:after{top:3px!important;left:3px!important;content:""!important;width:12px!important;height:12px!important;position:absolute!important;border-radius:50%!important;background-color:#fff!important;transition:transform .3s ease!important}.vpx-input input[type=checkbox]:checked+.toggle-track{background-color:#2196f3!important}.vpx-input input[type=checkbox]:checked+.toggle-track:after{transform:translate(20px)!important}.vpx-textarea{margin-bottom:5px;padding-bottom:5px;border-bottom:1px solid #f5f5f5}.vpx-textarea:last-of-type{margin-bottom:0!important;padding-bottom:0!important;border-bottom:none!important}.vpx-textarea p{text-align:left!important}.vpx-textarea textarea{border-radius:3px;width:100%!important;height:130px!important}.vpx-textarea textarea::-webkit-scrollbar{width:4px}.vpx-textarea textarea::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}.monkey-toast{left:10px!important;bottom:16%!important;color:#fff!important;padding:0 10px!important;border-radius:3px!important;position:absolute!important;z-index:2147483647!important;transition:all .23s!important;font: 13px/26px sans-serif!important;background:#000000bf!important}.monkey-toast:not(:last-child){transform:translateY(calc(-100% - 5px))}.monkey-toast.out{opacity:0;transform:scale3d(.3,.3,0);transform-origin:center bottom}.monkey-toast .cText{margin:0 3px!important;color:#ff5f00!important;display:inline!important}.__hc{cursor:none!important}#buffer,#install,.player-overlay,.memory-play-wrap,.atom-notice-click,.dplayer-resume-tip,#player #loading-box,.dplayer-notice strong,.air-player-loading-box,#bilibili-player :is(.bpx-player-toast-wrap,.bpx-player-cmd-dm-wrap),#bilibili-player .bpx-player-dialog-wrap>:not(.bpx-player-dm-tip){display:none!important}@supports selector(:has(*)){body>#loading:not(:has(video)),*:has(video) :is(#tips,.art-layers){display:none!important}} ');

(function (notyf, Swal) {
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
    EMPTY: "",
    HALF_SEC: 500,
    ONE_SEC: 1e3,
    TWO_SEC: 2e3,
    THREE_SEC: 3e3,
    webFull: "web-fullscr",
    FAKE_VIDEO: "fake-video",
    MSG_SOURCE: "SCRIPTS_AUTO_WEB_FULLSCREEN",
    DEF_TSR: { zoom: 100, mvX: 0, mvY: 0, rotate: 0, mirror: 1 }
  });
  const Tools = unsafeWindow.FyTools = {
    isTopWin: () => window.top === window,
    isNumber: (str) => /^[0-9]$/.test(str),
    scrollTop: (top) => window.scrollTo({ top }),
    getRect: (el) => el?.getBoundingClientRect(),
    microTask: (fn) => Promise.resolve().then(fn),
    alert: (...data) => window.alert(data.join(" ")),
    hasMoveBefore: () => "moveBefore" in Element.prototype,
    query: (selector, ctx) => querySelector(selector, ctx),
    querys: (selector, ctx) => querySelectorAll(selector, ctx),
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    toFixed: (value, digits = 2) => (+value).toFixed(digits).replace(/\.?0+$/, Consts.EMPTY),
    postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
    getNumbers: (str) => typeof str === "string" ? (str.match(/\d+/g) ?? []).map(Number) : [],
    log: (...data) => console.log(...["%c===== 脚本日志 =====\n\n", "color:green;", ...data, "\n\n"]),
    isExecuted: (key, ctx = window.e9x ??= {}) => ctx?.[key] || !!(ctx && (ctx[key] = true), false),
    getIFrames: () => querySelectorAll("iframe:not([src=''], [src='#'], [id='buffer'], [id='install'])"),
    isVisible: (el) => !!(el && getComputedStyle(el).visibility !== "hidden" && (el.offsetWidth || el.offsetHeight)),
    attr: (el, name, val) => el && name && el[val ? "setAttribute" : "removeAttribute"](name, val),
    preventEvent: (e) => (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation()),
    emitEvent: (type, detail = {}) => document.dispatchEvent(new CustomEvent(type, { detail })),
    isInputable: (el) => ["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable,
    newEle: (name, attrs = {}) => Object.assign(document.createElement(name), attrs),
    hasCls: (el, ...cls) => cls.flat().some((c) => el?.classList.contains(c)),
    delCls: (el, ...cls) => el?.classList.remove(...cls),
    addCls: (el, ...cls) => el?.classList.add(...cls),
    notyf(msg, isError = false) {
      const notyf$1 = new notyf.Notyf({ duration: Consts.THREE_SEC, position: { x: "center", y: "top" } });
      isError ? notyf$1.error(msg) : notyf$1.success(msg);
      return false;
    },
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
    getCenterPoint(el) {
      const { top, left, width, height } = this.getRect(el);
      return { cx: left + width / 2, cy: top + height / 2 };
    },
    isAboveElement(target, cover) {
      if (!target || !cover) return false;
      const { cx, cy } = this.getCenterPoint(target);
      return cover.contains(document.elementFromPoint(cx, cy));
    },
    emitMousemove(el) {
      const { top: y, left, right } = this.getRect(el);
      for (let x = left; x <= right; x += 10) this.fireMouseEvt(el, "mousemove", x, y);
    },
    fireMouseEvt(el, type, clientX, clientY) {
      const dict = { clientX, clientY, bubbles: true };
      return el?.dispatchEvent(new MouseEvent(type, dict));
    },
    isValidId: (el) => el.id && !/[\d\u4e00-\u9fa5]/.test(el.id),
    getElementPath(element) {
      const parents = [];
      let current = element;
      while (current && !current.matches("body")) {
        parents.unshift(this.getSelector(current));
        if (this.isValidId(current)) break;
        current = this.getParent(current);
      }
      return parents.join(" > ");
    },
    getSelector(el) {
      if (this.isValidId(el)) return `#${el.id}`;
      const tag = el.tagName.toLowerCase();
      const validCls = Array.from(el.classList).filter((cls) => !/[\[\]\d]/.test(cls));
      return validCls.length ? `${tag}.${validCls.join(".")}` : tag;
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
    hashCode(str) {
      let hash = 2166136261;
      for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = hash * 16777619 >>> 0;
      }
      return hash;
    },
    findByText(mode, ...texts) {
      const flatTexts = texts.flat().map((t) => t.replace(/'/g, "\\'"));
      const part = (t) => mode === "text" ? `contains(text(), '${t}')` : `@*[contains(., '${t}')]`;
      const expr = `.//*[${flatTexts.map(part).join(" or ")}]`;
      const nodes = document.evaluate(expr, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
      return Array.from({ length: nodes.snapshotLength }, (_, i) => nodes.snapshotItem(i)).filter((el) => !el.matches("script"));
    },
    safeHTML(html) {
      if (!window.trustedTypes?.createPolicy) return html;
      const policy = trustedTypes.defaultPolicy ?? trustedTypes.createPolicy("default", { createHTML: (input) => input });
      return policy.createHTML(html);
    },
    setStyle(els, prop, val, priority) {
      if (!els || !prop) return;
      const fn = val ? "setProperty" : "removeProperty";
      [].concat(els).forEach((el) => el?.style?.[fn]?.(prop, val, priority));
    },
    isAttached: (el) => !!el && el.isConnected && (!el.getRootNode?.()?.host || el.getRootNode().host.isConnected),
    waitFor(condition, opts = {}) {
      const start = Date.now();
      const { immediate = false, interval = 50, timeout = 3e3 } = opts;
      return new Promise((resolve, reject) => {
        const checkCondition = () => {
          if (Date.now() - start > timeout) return reject(new Error("waitFor 预期条件未满足"));
          condition() ? resolve() : setTimeout(checkCondition, interval);
        };
        immediate ? checkCondition() : setTimeout(checkCondition, interval);
      });
    }
  };
  class VideoEnhancer {
    static {
      this.hackAttachShadow();
      unsafeWindow.GM_FVEnh ??= this;
    }
    static setPlaybackRate(video, rate) {
      if (!Tools.isExecuted("__vRateHooked", video)) {
        this.defineProperty(video, "playbackRate", { set: (val, setter) => video._vRate === val && setter(val) });
      }
      video.playbackRate = video._vRate = Tools.toFixed(rate);
    }
    static defineProperty(target, prop, hooks) {
      try {
        const original = this.getPropertyDescriptor(target, prop);
        if (!original) throw new Error(`属性 ${prop} 不存在`);
        Object.defineProperty(target, prop, {
          get() {
            const value = original.get ? original.get.call(this) : original.value;
            return hooks.get ? hooks.get.call(this, value) : value;
          },
          set(value) {
            const setter = (v) => (original.set ? original.set.call(this, v) : original.value = v, v);
            hooks.set ? hooks.set.call(this, value, setter) : setter(value);
          },
          configurable: true
        });
      } catch (e) {
        console.error(`修改 ${prop} 属性时出错：`, e);
      }
    }
    static getPropertyDescriptor(target, prop) {
      if (target instanceof HTMLMediaElement) {
        const desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, prop);
        if (desc) return desc;
      }
      for (let proto = target; proto; proto = Object.getPrototypeOf(proto)) {
        const desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (desc) return desc;
      }
      return null;
    }
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
  class BasicStorage {
    static #instances = [];
    constructor(name, defVal, useLocal = false, parser = (v) => v, splice = false) {
      BasicStorage.#instances.push(this);
      Object.assign(this, { name, defVal, useLocal, parser, splice });
      this.storage = useLocal ? localStorage : { getItem: GM_getValue, setItem: GM_setValue, removeItem: GM_deleteValue };
      if (BasicStorage.#instances.length === 1) requestIdleCallback(() => BasicStorage.cleanExpired());
    }
    #getKey(suffix) {
      if (this.splice && !suffix) throw new Error(`${this.name} 后缀不能为空！`);
      return this.name + (this.splice ? suffix : "");
    }
    set(value, key, expires) {
      const val = expires ? JSON.stringify({ value, expires: Date.now() + expires * 864e5 }) : value;
      this.storage.setItem(this.#getKey(key), val);
      return value;
    }
    get(key) {
      const data = this.#get(this.#getKey(key));
      if (!data?.value) return this.parser(data);
      return this.parser(data.expires > Date.now() ? data.value : this.defVal);
    }
    #get(key) {
      const raw = this.storage.getItem(key);
      if ([null, void 0].includes(raw)) return this.defVal;
      try {
        return JSON.parse(raw) ?? raw;
      } catch {
        return raw;
      }
    }
    toggle = (key) => this.set(!this.get(key), key);
    del = (key) => this.storage.removeItem(this.#getKey(key));
    fuzzyHandle(pattern, callback) {
      const keys = this.useLocal ? Object.keys(localStorage) : GM_listValues();
      const matcher = pattern instanceof RegExp ? (key) => pattern.test(key) : (key) => key.includes(pattern);
      keys.filter(matcher).forEach(callback);
    }
    static cleanExpired() {
      this.#instances.forEach((ins) => {
        ins.fuzzyHandle(ins.name, (key) => {
          if (ins.#get(key)?.expires < Date.now()) ins.storage.removeItem(key);
        });
      });
    }
  }
  const Store = unsafeWindow.FyStorage = {
    SITE_AUTO: new BasicStorage("SITE_AUTO_", false, false, Boolean, true),
    DETACH_THRESHOLD: new BasicStorage("DETACH_THRESHOLD_", 20, false, Number, true),
    NO_AUTO_DEF: new BasicStorage("NO_AUTO_DEF", false, false, Boolean),
    DISABLE_RATE: new BasicStorage("DISABLE_RATE", false, false, Boolean),
    FORGET_RATE: new BasicStorage("FORGET_RATE", false, false, Boolean),
    INVIS_PAUSE: new BasicStorage("DISABLE_INVISIBLE_PAUSE", false, false, Boolean),
    NEXT_AUTO: new BasicStorage("NEXT_AUTO", false, false, Boolean),
    CLOCK_WEB: new BasicStorage("CLOCK_WEB", false, false, Boolean),
    RATE_SHOW: new BasicStorage("RATE_KEEP_SHOW", false, false, Boolean),
    OVERRIDE_KEY: new BasicStorage("OVERRIDE_KEYBOARD", false, false, Boolean),
    RATE_STEP: new BasicStorage("RATE_STEP", 0.25, false, parseFloat),
    SKIP_INTERVAL: new BasicStorage("SKIP_INTERVAL", 5, false, Number),
    ZERO_KEY_SKIP: new BasicStorage("ZERO_KEY_SKIP_INTERVAL", 30, false, Number),
    NEXT_ADVANCE: new BasicStorage("NEXT_ADVANCE", 75, false, Number),
    ZOOM_PERCENT: new BasicStorage("ZOOM_PERCENT", 10, false, Number),
    MOVE_DIST: new BasicStorage("MOVE_DIST", 10, false, Number),
    CLOCK_COLOR: new BasicStorage("CLOCK_COLOR", "#e0e0e0"),
    PRESET_RATE: new BasicStorage("PRESET_SPEED", "1.15,1.45,1.75", false, (value) => value.split(",")),
    NEXT_IGNORE_URLS: new BasicStorage("NEXT_IGNORE_URLS", ""),
    FULL_IGNORE_URLS: new BasicStorage("FULL_IGNORE_URLS", ""),
    V_WRAPPER: new BasicStorage("V_WRAPPER_", "", false, String, true),
    FS_CODE: new BasicStorage("FULL_CHANGE_CODE_", "", false, String, true),
    NEXT_CUR_EP: new BasicStorage("CURRENT_EPISODE_SELECTOR_", "", false, String, true),
    NEXT_REL_EP: new BasicStorage("RELATIVE_EPISODE_SELECTOR_", "", false, String, true),
    LOAD_CODE: new BasicStorage("LOAD_EVT_CODE_", "", false, String, true),
    VIDEO_CODE: new BasicStorage("VIDEO_EVT_CODE_", "", false, String, true),
    ICONS_SELECTOR: new BasicStorage("ICONS_SELECTOR", null),
    CACHED_RATE: new BasicStorage("FENY_SCRIPTS_V_PLAYBACK_RATE", 1, true, parseFloat),
    STORAGE_DAYS: new BasicStorage("STORAGE_DAYS", 8, false, parseFloat),
    V_TIME: new BasicStorage("PLAY_TIME_", 0, true, Number, true)
  };
  const HotKey = Object.freeze({
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
    Space: "Space",
    Enter: "Enter",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    NumEnter: "NumpadEnter",
    Sub: "NumpadSubtract",
    Add: "NumpadAdd"
  });
  const Listen = {
    player: null,
    fsWrapper: null,
    isFullscreen: false,
    isNoVideo: () => !window.vMeta && !window.topWin,
    isMutedLoop: (video) => video?.muted && video?.loop,
    init(isNonFirst = false) {
      this.host = location.host;
      this.setupVideoListeners();
      this.setupKeydownListener();
      this.setupVisibleListener();
      this.setupMouseMoveListener();
      this.setupFullscreenListener();
      this.docEle = document.documentElement;
      if (isNonFirst) return;
      this.setupDocumentObserver();
      this.setupLoadEventListener();
      this.setupShortcutKeyMapping();
      this.setupShadowVideoListener();
      this.watchWebFullscreenChange();
      this.setupIgnoreChangeListener();
      VideoEnhancer.hookActiveVideo();
    },
    setupVisibleListener() {
      unsafeWindow.addEventListener("visibilitychange", () => {
        const video = this.player;
        if (!video || video.ended || Store.INVIS_PAUSE.get()) return;
        document.hidden ? video.pause() : video.play();
      });
    },
    setupDocumentObserver() {
      new MutationObserver(() => {
        if (this.docEle === document.documentElement) return;
        this.init(true), document.head.append(gmStyle.cloneNode(true));
      }).observe(document, { childList: true });
    },
    setCurrentVideo(video) {
      if (!video || this.player === video || video.offsetWidth < 260) return;
      if (this.player && !this.player.paused && !isNaN(this.player.duration)) return;
      this.setPlayer(video);
      this.watchVideoSrc(video);
    },
    setPlayer(video) {
      this.player = video;
      const vMeta = this.vMeta ?? { vw: innerWidth, vh: innerHeight };
      setTimeout(Tools.emitEvent, 100, "setPlayer", { video });
      this.syncMetaToParentWin(vMeta);
    },
    syncMetaToParentWin(vMeta) {
      window.vMeta = this.vMeta = { ...vMeta, timestamp: Date.now() };
      if (!Tools.isTopWin()) return Tools.postMessage(unsafeWindow.parent, { vMeta: { ...vMeta, iFrame: location.href } });
      Tools.microTask(() => (this.initMenuCmds(), this.setupPickerListener()));
      this.sendTopWinInfo();
    },
    sendTopWinInfo() {
      const { host, href: url } = location;
      const { innerWidth: vw, innerHeight: vh } = window;
      const topWin = { vw, vh, url, host, urlHash: Tools.hashCode(url) };
      window.topWin = this.topWin = topWin;
      this.sendToVideoIFrame({ topWin });
    },
    sendToVideoIFrame(data) {
      const vFrame = this.getVideoIFrame();
      Tools.postMessage(vFrame?.contentWindow, data);
      if (vFrame) this.observeIFrameChange(vFrame);
    },
    watchVideoSrc(video) {
      if (Tools.isExecuted("observed", video)) return;
      const isFake = video.matches(Consts.FAKE_VIDEO);
      const onChange = (v) => (delete this.topWin, this.setPlayer(v));
      VideoEnhancer.defineProperty(video, isFake ? "srcConfig" : "src", {
        set(value, setter) {
          setter(value), value && this === App.player && onChange(this);
        }
      });
    },
    observeIFrameChange(iFrame) {
      if (!iFrame || Tools.isExecuted("observed", iFrame)) return;
      const observer = new MutationObserver(() => document.exitFullscreen().catch(() => this.exitWebFullscreen()));
      observer.observe(iFrame, { attributes: true, attributeFilter: ["src"] });
      if (this.isOverrideKey()) iFrame.focus();
    },
    setupFullscreenListener() {
      document.addEventListener("fullscreenchange", () => {
        Tools.postMessage(window.top, { isFullscreen: !!document.fullscreenElement });
      });
      if (Tools.isExecuted("fsDoneHook")) return;
      VideoEnhancer.defineProperty(this, "isFullscreen", {
        set: (value, setter) => (setter(value), this.onFullChange(value))
      });
    },
    onFullChange(isFull) {
      isFull && Tools.isInputable(document.activeElement) && document.activeElement.blur();
      if (!this.isGMatch() && !(isFull && this.fsWrapper)) this.toggleWebFullscreen();
      Tools.microTask(() => this.runFsChangeCode());
      this.changeTimeDisplay();
    },
    watchWebFullscreenChange() {
      const handle = () => Tools.scrollTop(this.fsWrapper.scrollY);
      VideoEnhancer.defineProperty(this, "fsWrapper", {
        set: (value, setter) => {
          const method = setter(value) ? "addEventListener" : "removeEventListener";
          Tools.microTask(() => this.runFsChangeCode());
          unsafeWindow[method]("scroll", handle, true);
        }
      });
    },
    runFsChangeCode() {
      clearTimeout(this.e9x_fsCode);
      this.e9x_fsCode = setTimeout(() => {
        const jsCode = Store.FS_CODE.get(this.host);
        this.executeCodeSnippet(jsCode, this.getFsMode(), this.player);
      }, 10);
    },
    getFsMode(tol = 5) {
      const { width, height } = window.screen;
      const { topWin, player, fsWrapper } = this;
      const { offsetWidth: ew = 0, offsetHeight: eh = 0 } = this.isGMatch() ? player : fsWrapper || {};
      const isWFs = Math.abs(ew - topWin.vw) < tol && Math.abs(eh - topWin.vh) < tol;
      const isFs = Math.abs(ew - width) < tol && Math.abs(eh - height) < tol;
      return isFs ? "isFull" : isWFs ? "isWFull" : "default";
    },
    setupMouseMoveListener() {
      const handle = ({ type, target, clientX, clientY }) => {
        if (Tools.isThrottle(type)) return;
        const video = this.getVideoForCoord(clientX, clientY);
        if (video) this.createEdgeElement(video), this.toggleCursor(target);
      };
      document.addEventListener("mousemove", handle, { passive: true });
    },
    toggleCursor(target, cls = "__hc") {
      clearTimeout(this._cursorTid);
      Tools.querys(`.${cls}`).forEach((el) => Tools.delCls(el, cls));
      this._cursorTid = setTimeout(() => {
        const eles = [Tools.isAboveElement(this.player, target) && target, this.player, ...Tools.querys(".__v_edge")];
        eles.forEach((el) => el && (Tools.addCls(el, cls), Tools.fireMouseEvt(el, "mouseleave")));
      }, Consts.TWO_SEC);
    },
    getVideoForCoord(x, y) {
      if (Tools.pointInElement(x, y, this.player)) return this.player;
      const getZIndex = (el) => Number(getComputedStyle(el).zIndex) || 0;
      const videos = Tools.querys("video").filter((v) => Tools.pointInElement(x, y, v));
      return videos.sort((a, b) => getZIndex(b) - getZIndex(a)).shift();
    },
    createEdgeElement(video) {
      if (document.readyState !== "complete") return;
      const container = this.getEdgeContainer(video);
      if (video.lArea?.parentNode === container) return;
      if (container instanceof Element && this.lacksRelativePosition(container)) {
        Tools.setStyle(container, "position", "relative");
      }
      Tools.querys(".__v_edge", container).forEach((el) => el.remove());
      if (video.lArea) return container.prepend(video.lArea, video.rArea);
      const createEdge = (cls = "") => {
        const element = Tools.newEle("div", { video, className: `__v_edge ${cls}` });
        element.onclick = (e) => {
          Tools.preventEvent(e);
          this.setPlayer(e.target.video);
          Tools.sleep(5).then(() => this.dispatchShortcut(HotKey.P, true));
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
  class Site {
    static icons = { full: "full", webFull: "webFull", next: "next", danmaku: "danmaku" };
    static selectors = {
      "live.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled" },
      "v.douyu.com": { webFull: ".ControllerBar-PageFull-Icon", danmaku: ".BarrageSwitch-icon" },
      "v.youku.com": { webFull: "#webfullscreen-icon", danmaku: "#barrage-switch", next: ".kui-next-icon-0" },
      "www.acfun.cn": { webFull: ".fullscreen-web", danmaku: ".danmaku-enabled", next: ".btn-next-part div" },
      "www.mgtv.com": { webFull: ".webfullscreenBtn i", danmaku: "div[class*='danmuSwitch']", next: ".icon-next" },
      "www.iqiyi.com": { webFull: "[class*=videofullBtn]", danmaku: "[class*=danmuBtnSet] div", next: "[class*=playNext]" },
      "www.bilibili.com": { full: ".bpx-player-ctrl-full", webFull: ".bpx-player-ctrl-web", next: ".bpx-player-ctrl-next" },
      "v.qq.com": { full: ".txp_btn_fullscreen", webFull: ".txp_btn_fake", danmaku: ".barrage-switch", next: ".txp_btn_next_u" }
    };
    static _siteRegExps = {
      acFun: /acfun.cn\/v/,
      tencent: /v.qq.com\/x/,
      qiyi: /iqiyi.com\/v_*/,
      mgtv: /www.mgtv.com\/b/,
      douyu: /v.douyu.com\/show/,
      bili: /bilibili.com\/video/,
      biliLive: /live.bilibili.com\/*/
    };
    static {
      const selectors = Store.ICONS_SELECTOR.get();
      selectors ? this.selectors = selectors : this.#loadRemote();
      Tools.microTask(() => (this.#createSiteTests(), this.#convertGmMatch()));
    }
    static getIcons(domain = location.host) {
      if (!Store.ICONS_SELECTOR.get()) this.#loadRemote();
      return this.selectors[domain];
    }
    static isGmMatch() {
      return this.gmMatches.some((m) => m.test(location.href.replace(location.search, Consts.EMPTY)));
    }
    static #loadRemote() {
      const url = "https://gitee.com/xfeny/UserScript/raw/dev/monkey-web-fullscreen/src/IconsSelector.json";
      GM.xmlHttpRequest({ url, timeout: 3e3 }).then((res) => {
        const remoteConf = JSON.parse(res.responseText ?? "{}");
        this.selectors = { ...this.selectors, ...remoteConf };
        Store.ICONS_SELECTOR.set(this.selectors, Consts.EMPTY, 1 / 3);
      }).catch((e) => console.warn("加载远程配置失败", e));
    }
    static #convertGmMatch() {
      const { matches, includes: excluded } = GM_info.script;
      const isValid = (s) => s !== "*://*/*" && !excluded.includes(s);
      this.gmMatches = matches.filter(isValid).map((s) => new RegExp(s.replace(/\*/g, "\\S+")));
    }
    static #createSiteTests() {
      Object.entries(this._siteRegExps).forEach(([name, regex]) => {
        const method = `is${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        this[method] ??= () => regex.test(location.href);
      });
    }
  }
  const Keydown = {
    isInputFocus: (e) => Tools.isInputable(e.composedPath()[0]),
    isUndefinedKey: ({ key, code }) => !Object.values(HotKey).includes(code) && !Tools.isNumber(key),
    skipKeyEvent: (e) => App.isNoVideo() || App.isInputFocus(e) || App.isUndefinedKey(e),
    preventEvent(e, { code, altKey } = e) {
      const isNum = Tools.isNumber(e.key) && !this.unUsedRate();
      const isOverride = this.isOverrideKey() && [HotKey.Space, HotKey.Left, HotKey.Right].includes(code);
      const isBlock = [HotKey.K, HotKey.L, HotKey.M, HotKey.N, HotKey.P, HotKey.R].includes(code);
      const isMove = altKey && [HotKey.Up, HotKey.Down, HotKey.Left, HotKey.Right].includes(code);
      if (isNum || isOverride || isBlock || isMove) Tools.preventEvent(e);
    },
    dispatchShortcut(code, isTrusted = false) {
      const data = { key: this.processShortcutKey({ code }), isTrusted };
      Tools.isTopWin() ? this.processEvent(data) : Tools.postMessage(window.top, data);
    },
    processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
      code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
      const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
      return keys.filter(Boolean).join("_").toUpperCase();
    },
    setupKeydownListener() {
      unsafeWindow.addEventListener("keydown", (e) => this.handleKeydown(e), true);
      unsafeWindow.addEventListener("keyup", (e) => !this.skipKeyEvent(e) && this.preventEvent(e), true);
      unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
    },
    handleKeydown(e, { key, code, isTrusted } = e) {
      if (this.skipKeyEvent(e)) return;
      this.preventEvent(e);
      const emitKeys = [HotKey.N, HotKey.P, HotKey.Enter, HotKey.NumEnter];
      if (emitKeys.includes(code)) return this.dispatchShortcut(key, isTrusted);
      this.processEvent({ key: this.processShortcutKey(e), isTrusted });
    },
    processEvent(data) {
      if (this.vMeta?.iFrame && this.player) delete this.player;
      if (!this.player) this.sendToVideoIFrame(data);
      if (data?.key) this.execKeyActions(data);
    },
    execKeyActions({ key, isTrusted }) {
      this.keyMapp[key]?.(isTrusted) ?? (Tools.isNumber(key) && this.setPlaybackRate(key));
    },
    setupShortcutKeyMapping() {
      const dict = this.keyMapp = {
        M: () => this.muteVideo(),
        R: () => this.rotateVideo(),
        L: () => this.freezeFrame(),
        K: () => this.freezeFrame(-1),
        ENTER: () => this.toggleFullscreen(),
        P: (isTrusted) => this.toggleWebFullscreen(isTrusted),
        D: () => Site.isGmMatch() && this.triggerIcon(Site.icons.danmaku),
        N: () => Site.isGmMatch() ? this.triggerIcon(Site.icons.next) : this.switchEpisode(),
        SPACE: () => this.isOverrideKey() && this.playToggle(this.player),
        0: () => this.skipPlayback(Store.ZERO_KEY_SKIP.get(), true) || 0,
        LEFT: () => this.skipPlayback(-Store.SKIP_INTERVAL.get()),
        RIGHT: () => this.skipPlayback(Store.SKIP_INTERVAL.get()),
        SHIFT_A: () => this.autoNextEnabled(),
        CTRL_ALT_S: () => this.screenshot(),
        ALT_SUB: () => this.zoomVideo(-1),
        ALT_ADD: () => this.zoomVideo(),
        SHIFT_R: () => this.horizFlip(),
        CTRL_Z: () => this.resetTsr()
      };
      ["A", "S", "ADD", "SUB"].forEach((k, i) => dict[k] = () => this.adjustPlayRate([1, -1][i % 2] * Store.RATE_STEP.get()));
      for (let i = 1; i < 6; i++) dict[`CTRL_${i}`] = () => this.setPlaybackRate(Store.PRESET_RATE.get()[i - 1]);
      ["UP", "DOWN", "LEFT", "RIGHT"].forEach((k) => dict[`ALT_${k}`] = () => this.moveVideo(k));
    },
    handleMessage(data) {
      if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
      if (data?.vMeta) return this.syncMetaToParentWin(data.vMeta);
      if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
      if (data?.topWin) window.topWin = this.topWin = data.topWin;
      this.handleConfsMessage(data);
      this.processEvent(data);
    },
    handleConfsMessage(data) {
      if (data?.sw_memory) this.delCachedRate();
      if (data?.sw_lCode) Store.LOAD_CODE.set(data.sw_lCode, this.host);
      if (data?.sw_fsCode) Store.FS_CODE.set(data.sw_fsCode, this.host);
      if (data?.sw_vCode) Store.VIDEO_CODE.set(data.sw_vCode, this.host);
      if (data?.sw_vCode || data?.sw_fsCode) this.codeSnippetCache.clear();
      if (data?.sw_speed) this.setPlaybackRate(1), delete this.player?.playbackRate;
      if ("sw_sRate" in data) setTimeout(() => this.playbackRateDisplay(), 30);
      if ("sw_wClock" in data) setTimeout(() => this.changeTimeDisplay(), 30);
      if ("sw_color" in data) this.setTimeColor(data.sw_color);
    }
  };
  const Events = {
    videoAborts: /* @__PURE__ */ new Map(),
    videoEvts: ["loadstart", "loadedmetadata", "loadeddata", "timeupdate", "ratechange", "canplay", "playing", "ended"],
    setupVideoListeners(video) {
      const ctrl = new AbortController();
      video && this.videoAborts.get(video)?.abort();
      const handle = ({ type, target }) => {
        if (this.isMutedLoop(target)) return;
        if (!target?.matches(`video, ${Consts.FAKE_VIDEO}`)) return;
        this[type]?.(target), this.runVideoEvtCode(type, target);
      };
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
    loadstart(video) {
      if (!this.player) this.setCurrentVideo(video);
    },
    loadedmetadata(video) {
      if (video.matches(Consts.FAKE_VIDEO)) this.loadeddata(video);
      if (!this.player) this.setCurrentVideo(video);
      this.autoWebFullscreen(video);
    },
    loadeddata(video) {
      this.initVideoProps(video);
    },
    timeupdate(video) {
      if (isNaN(video.duration) || !Tools.isVisible(video)) return;
      if (!this.player) this.playing(video);
      Tools.microTask(() => {
        this.autoWebFullscreen(video);
        this.autoNextEpisode(video);
        this.renderProgress(video);
        this.cachePlayTime(video);
        this.ensureRateDisplay();
      });
    },
    playing(video) {
      this.setCurrentVideo(video);
      video.tsr ??= { ...Consts.DEF_TSR };
      Tools.waitFor(() => this.topWin).then(() => this.applySettings(video));
    },
    ended(video) {
      this.autoExitFullscreen();
      this.clearCachedTime(video);
    },
    ratechange: () => App.playbackRateDisplay(),
    runVideoEvtCode(type, video) {
      if (type === "timeupdate" && Tools.isThrottle("codeSnippet", Consts.ONE_SEC)) return;
      Tools.sleep(10).then(() => this.executeCodeSnippet(Store.VIDEO_CODE.get(this.host), type, video));
    },
    codeSnippetCache: /* @__PURE__ */ new Map(),
    executeCodeSnippet(jsCode, type, video) {
      try {
        if (!jsCode) return;
        const code = `(async () => { ${jsCode} })()`;
        const args = ["type", "video", "Tools", "unsafeWindow"];
        const handler = this.codeSnippetCache.get(type) || this.codeSnippetCache.set(type, new Function(...args, code)).get(type);
        handler(type, video, Tools, unsafeWindow);
      } catch (e) {
        const unsafe = e.message.includes("unsafe-eval") || e.message.includes("Trusted");
        unsafe ? this.injectCodeSnippet(jsCode, type, video) : console.error("代码执行出错：", e);
      }
    },
    injectCodeSnippet(jsCode, type, video) {
      const evt = `gm_code_inject_${type}`;
      const injectCode = `
      (() => {
        document.addEventListener('${evt}', (e) => {
          const { type, video, Tools, unsafeWindow } = e.detail;
          (async () => { try { ${jsCode} } catch (err) { console.error('代码执行出错：', err); } })();
        }, { once: true, passive: true });
      })();
      `;
      Tools.query(`#${evt}`)?.remove();
      GM_addElement("script", { id: evt, textContent: injectCode, type: "text/javascript" });
      Tools.emitEvent(evt, { type, video, Tools, unsafeWindow });
    }
  };
  const Control = {
    playToggle: (v) => v?.[v.paused ? "play" : "pause"](),
    remainTime: (v) => Math.floor(App.getRealDuration(v)) - Math.floor(v.currentTime),
    isLive() {
      if (!this.player) return false;
      return this.player.duration === Infinity || this.isDynamicDur(this.player);
    },
    isMultiVideo() {
      if (this._multiV || Tools.isThrottle("isMulti", Consts.TWO_SEC * 5)) return this._multiV;
      const validVideo = (v) => !this.isMutedLoop(v) && v.offsetWidth > 300 && !isNaN(v.duration);
      return this._multiV = Tools.querys("video").filter(validVideo).length > 1;
    },
    isDynamicDur(video) {
      if (video.vx_isDynamic || video.currentTime > video.__duration) return true;
      const { duration, __duration } = video;
      if (!__duration) video.__duration = duration;
      if (__duration > 120 && __duration < 43200) return false;
      const isDynamic = Math.floor(duration) > Math.floor(__duration);
      if (isDynamic) video.vx_isDynamic = true;
      return isDynamic;
    },
    initVideoProps(video) {
      if (!Tools.isAttached(this.player)) this.player = null;
      Object.keys(video).forEach((k) => k.startsWith("vx_") && delete video[k]);
      video.__duration = video.duration;
      video.tsr = { ...Consts.DEF_TSR };
      Tools.resetLimit("autoWFs");
    },
    applySettings(video) {
      this.setupClockForPlayer();
      if (Tools.isExecuted("vx_apply", this.player)) return;
      this.applyCachedRate();
      this.applyCachedTime(video);
    },
    setPlaybackRate(rate) {
      if (!rate || !this.player || this.isLive() || this.unUsedRate() || +this.player.playbackRate === +rate) return;
      VideoEnhancer.setPlaybackRate(this.player, rate);
      this.customToast("正在以", `${this.player.playbackRate}x`, "倍速播放");
      if (!Store.FORGET_RATE.get()) Store.CACHED_RATE.set(this.player.playbackRate);
    },
    adjustPlayRate: (step = 0.25) => App.player && App.setPlaybackRate(Tools.clamp(+App.player.playbackRate + step, 0.1, 16)),
    applyCachedRate: () => Store.FORGET_RATE.get() ? App.delCachedRate() : App.setPlaybackRate(Store.CACHED_RATE.get()),
    delCachedRate: () => Store.CACHED_RATE.del(),
    skipPlayback(second = 0, bypass = false) {
      if (!this.player || this.isLive() || !bypass && !this.isOverrideKey()) return;
      this.setCurrentTime(Tools.clamp(+this.player.currentTime + second, 0, this.player.duration));
      this.showToast(`快${second > 0 ? "进" : "退"} ${Math.abs(second)} 秒`, Consts.ONE_SEC);
    },
    cachePlayTime(video) {
      if (video !== this.player || !this.topWin || video.duration < 150 || this.isLive() || this.isMultiVideo()) return;
      if (Tools.isThrottle("cacheTime", Consts.ONE_SEC) || +video.currentTime < Store.SKIP_INTERVAL.get()) return;
      Store.V_TIME.set(+video.currentTime - 1, this.getUniqueKey(video), Store.STORAGE_DAYS.get());
    },
    applyCachedTime(video) {
      const time = Store.V_TIME.get(this.getUniqueKey(video));
      if (!this.topWin || this.isLive() || this.isMultiVideo() || time <= +video.currentTime) return;
      this.customToast("上次观看至", this.secToTime(this.setCurrentTime(time)), "处，已为您续播", Consts.TWO_SEC * 2, false);
    },
    setCurrentTime: (ct) => ct && (App.player.currentTime = Math.max(0, ct)),
    clearCachedTime: (v) => App.topWin && Store.V_TIME.del(App.getUniqueKey(v)),
    getUniqueKey(video, { duration, __duration } = video) {
      if (video.vx_tkey) return video.vx_tkey;
      const currNumber = this.getCurrentEpisodeNumber();
      const baseKey = `${this.topWin.urlHash}_${Math.floor(__duration || duration)}`;
      return video.vx_tkey = currNumber ? `${baseKey}_${currNumber}` : baseKey;
    },
    secToTime(sec) {
      const [h, m, s] = [~~(sec / 3600), ~~(sec % 3600 / 60), ~~(sec % 60)];
      return (h ? [h, m, s] : [m, s]).map((v) => String(v).padStart(2, "0")).join(":");
    },
    horizFlip() {
      if (!this.player) return;
      const { tsr } = this.player;
      this.setTsr("--mirror", tsr.mirror = -tsr.mirror);
    },
    rotateVideo() {
      if (!this.player) return;
      const { tsr } = this.player;
      tsr.rotate = (tsr.rotate + 90) % 360;
      const { videoWidth: w, videoHeight: h } = this.player;
      const scale = [90, 270].includes(tsr.rotate) ? h / w : 1;
      this.setTsr("--scale", scale).setTsr("--rotate", `${tsr.rotate}deg`);
    },
    zoomVideo(dir = 1) {
      if (!this.player) return;
      const { tsr } = this.player;
      const step = Store.ZOOM_PERCENT.get();
      const zoom = Tools.clamp(tsr.zoom + dir * step, 30, 300);
      tsr.zoom = zoom;
      this.setTsr("--zoom", zoom / 100);
      this.showToast(`缩放: ${zoom}%`, Consts.ONE_SEC);
    },
    moveVideo(dir) {
      if (!this.player) return;
      const { tsr } = this.player;
      const s = Store.MOVE_DIST.get();
      const dMap = { UP: [0, -s, "上"], DOWN: [0, s, "下"], LEFT: [-s, 0, "左"], RIGHT: [s, 0, "右"] };
      let [x, y, desc] = dMap[dir];
      x *= tsr.mirror;
      [x, y] = { 90: [y, -x], 180: [-x, -y], 270: [-y, x] }[tsr.rotate] || [x, y];
      tsr.mvX += x, tsr.mvY += y;
      this.setTsr("--mvX", `${tsr.mvX}px`).setTsr("--mvY", `${tsr.mvY}px`);
      this.showToast(`${desc}移: ${x ? tsr.mvX : tsr.mvY}px`, Consts.ONE_SEC);
    },
    resetTsr() {
      if (!this.player) return;
      const styles = ["--zoom", "--mvX", "--mvY", "--scale", "--mirror", "--rotate", "--deftsr"];
      styles.forEach((n) => Tools.setStyle(this.player, n));
      this.player.tsr = { ...Consts.DEF_TSR };
      Tools.delCls(this.player, "__tsr");
      delete this.player.vx_tsr;
    },
    setTsr(name, value) {
      try {
        Tools.addCls(this.player, "__tsr");
        this.player.vx_tsr ??= getComputedStyle(this.player).transform;
        Tools.setStyle(this.player, "--deftsr", this.player.vx_tsr);
        Tools.setStyle(this.player, name, value);
      } catch (e) {
        console.error(e);
      }
      return this;
    },
    muteVideo() {
      if (!this.player) return;
      const isMuted = this.player.muted || !this.player.volume;
      Object.assign(this.player, { muted: !isMuted, volume: +isMuted });
      this.showToast(isMuted ? "🔊 取消静音" : "🔇 已静音", Consts.ONE_SEC);
    },
    async screenshot() {
      if (!this.player) return;
      this.player.setAttribute("crossorigin", "anonymous");
      const { videoWidth: width, videoHeight: height } = this.player;
      const canvas = Tools.newEle("canvas", { width, height });
      const ctx = canvas.getContext("2d");
      try {
        ctx.drawImage(this.player, 0, 0, width, height);
        const url = URL.createObjectURL(await new Promise((resolve) => canvas.toBlob(resolve, "image/png")));
        GM_download({ url, name: `视频截图_${Date.now()}.png`, onload: () => URL.revokeObjectURL(url) });
      } catch (e) {
        Tools.setStyle(canvas, "max-width", "97vw");
        const popup = window.open(Consts.EMPTY, "_blank", "width=1000,height=570,top=130,left=270");
        popup.document.title = "鼠标右键选择「图片另存为」";
        popup.document.body.appendChild(canvas);
        console.error(e);
      }
    },
    freezeFrame(dir = 1) {
      if (!this.player) return;
      !this.player.paused && this.player.pause();
      this.player.currentTime += dir / 24;
    },
    autoNextEnabled: () => App.showToast(`已${Store.NEXT_AUTO.toggle() ? "启" : "禁"}用 自动切换下集`),
    customToast(start, text, end, dealy, isRemove) {
      const span = Tools.newEle("span");
      span.append(start, Tools.newEle("span", { textContent: text, className: "cText" }), end);
      this.showToast(span, dealy, isRemove);
    },
    showToast(content, dealy = Consts.THREE_SEC, isRemove = true) {
      if (isRemove) Tools.query(".monkey-toast")?.remove();
      const el = Tools.newEle("div", { className: "monkey-toast" });
      content instanceof Element ? el.appendChild(content) : el.textContent = content;
      setTimeout(() => (Tools.addCls(el, "out"), setTimeout(() => el.remove(), 250)), dealy);
      this.findVideoContainer(null, 2, false).appendChild(el);
    }
  };
  const WebFull = {
    getLiveIcons: () => (Tools.emitMousemove(App.player), Tools.querys(".right-area .icon")),
    isGMatch: () => Site.isGmMatch() && !Site.isBiliLive(),
    triggerIcon(name) {
      const index = Object.values(Site.icons).indexOf(name);
      const element = Site.isBiliLive() ? this.getLiveIcons()?.[index] : Tools.query(Site.getIcons()?.[name]);
      return Tools.fireMouseEvt(element, "click");
    },
    iconToFull(name) {
      const el = this.player ?? this.getVideoIFrame();
      const { height } = Tools.getRect(el) ?? { height: 0 };
      if (!this.triggerIcon(name) || !el) return;
      const condition = () => Boolean(Tools.getRect(el).height - height);
      Tools.waitFor(condition).then(() => this.runFsChangeCode());
    },
    toggleFullscreen() {
      if (!Tools.isTopWin() || Tools.isThrottle("_Full_")) return;
      if (this.isGMatch()) return this.iconToFull(Site.icons.full);
      document.exitFullscreen().catch(() => (this.enterWebFullscreen(), this.fsWrapper.requestFullscreen()));
    },
    toggleWebFullscreen(isTrusted) {
      if (this.isNoVideo() || Tools.isThrottle("_WebFull_")) return;
      if (this.isGMatch()) return this.iconToFull(Site.icons.webFull);
      if (this.isFullscreen && isTrusted) return document.exitFullscreen().catch(() => {
      });
      this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
    },
    enterWebFullscreen() {
      if (this.fsWrapper) return;
      const container = this.fsWrapper = this.getVideoHostContainer();
      if (!container || container.matches(":is(html, body)")) return this.adaptToWebFullscreen();
      container.scrollY = window.scrollY;
      const parents = Tools.getParents(container);
      const threshold = Store.DETACH_THRESHOLD.get(this.host);
      const detach = parents.length > threshold && (container.matches(":not(iframe)") || Tools.hasMoveBefore());
      detach ? this.detachForFullscreen() : parents.forEach((el) => this.setWebFullAttr(el));
      this.adaptToWebFullscreen();
    },
    detachForFullscreen() {
      if (this.fsParent) return;
      this.fsNext = this.fsWrapper.nextSibling;
      this.fsParent = Tools.getParent(this.fsWrapper);
      document.body[Tools.hasMoveBefore() ? "moveBefore" : "insertBefore"](this.fsWrapper, null);
      this.fsWrapper.querySelector("video")?.play();
      this.setWebFullAttr(this.fsWrapper);
    },
    exitWebFullscreen() {
      if (!this.fsWrapper) return;
      const { scrollY } = this.fsWrapper;
      Tools.setStyle(this.docEle, "scroll-behavior", "auto", "important");
      Tools.querys(`[${Consts.webFull}]`).forEach((el) => Tools.attr(el, Consts.webFull));
      this.fsParent?.[Tools.hasMoveBefore() ? "moveBefore" : "insertBefore"](this.fsWrapper, this.fsNext);
      requestAnimationFrame(() => (Tools.scrollTop(scrollY), Tools.setStyle(this.docEle, "scroll-behavior")));
      this.fsNext = this.fsWrapper = this.fsParent = null;
      this.videoParents.clear();
    },
    getVideoHostContainer() {
      return this.player ? this.getVideoContainer() : this.getVideoIFrame();
    },
    getVideoIFrame(tol = 5) {
      if (!this.vMeta?.iFrame) return null;
      if (this.fsWrapper) return this.fsWrapper;
      const { vw, vh, iFrame } = this.vMeta;
      const { pathname, search } = new URL(iFrame);
      const partial = ((s) => s.slice(0, Math.floor(s.length * 0.8)))(decodeURIComponent(search));
      const vFrame = Tools.query(`iframe[src*="${pathname + partial}"]`);
      if (vFrame) return vFrame;
      const iFrames = Tools.getIFrames();
      const matchSize = ({ offsetWidth: w, offsetHeight: h }) => Math.abs(w - vw) < tol && Math.abs(h - vh) < tol;
      return iFrames.find(matchSize) ?? iFrames.find(Tools.isVisible);
    },
    getVideoContainer() {
      const selector = Store.V_WRAPPER.get(this.topWin?.host)?.trim();
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
      if (Tools.isExecuted("__Added__", sroot)) return;
      if (sroot instanceof ShadowRoot) Tools.emitEvent("addStyle", { sroot });
    }
  };
  const Automatic = {
    autoNextEpisode(video) {
      if (video.duration < 300 || video.vx_hasTriedNext || this.remainTime(video) > Store.NEXT_ADVANCE.get()) return;
      if (!Store.NEXT_AUTO.get() || Tools.isThrottle("autoNext", Consts.HALF_SEC)) return;
      if (this.isIgnoreNext()) return video.vx_hasTriedNext = true;
      this.dispatchShortcut(HotKey.N);
      video.vx_hasTriedNext = true;
    },
    async autoWebFullscreen(video) {
      if (!this.topWin || !video.offsetWidth || this.player !== video) return;
      if (video.vx_isWFs || Tools.isThrottle("autoWFs", Consts.ONE_SEC)) return;
      if (Site.isGmMatch() ? Store.NO_AUTO_DEF.get() : !this.isAutoSite()) return;
      if (this.isIgnoreWFs() || await this.isWebFull() || Tools.isOverLimit("autoWFs")) return video.vx_isWFs = true;
      this.dispatchShortcut(HotKey.P);
    },
    async isWebFull(ms = Consts.HALF_SEC) {
      const isWFs = () => this.getFsMode() === "isWFull";
      return isWFs() ? await Tools.sleep(ms).then(isWFs) : false;
    },
    autoExitFullscreen() {
      if (!Site.isBili() && !Site.isAcFun()) return;
      if (Tools.query(".video-pod .switch-btn.on") && Tools.query('.pod-item:last-of-type:not([data-scrolled="true"])')) return;
      document.exitFullscreen().catch(async () => await this.isWebFull(5) && this.iconToFull(Site.icons.webFull));
      requestAnimationFrame(() => Tools.query(".bpx-player-ending-related-item-cancel")?.click());
    }
  };
  const Episode = {
    async switchEpisode(isPrev = false) {
      if (!Tools.isTopWin()) await Tools.sleep(Consts.HALF_SEC);
      const target = this.getJumpTargetEpisode(isPrev) ?? this.getEpisodeByText(isPrev) ?? this.getEpisodeByClass(isPrev);
      this.jumpToTargetEpisode(target);
    },
    getJumpTargetEpisode(isPrev) {
      const current = Store.NEXT_REL_EP.get(this.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeByLink();
      return this.getTargetEpisode(current, isPrev);
    },
    getCurrentEpisodeByLink() {
      const { pathname, search, hash } = location;
      const last = pathname.split("/").pop();
      const links = Tools.querys(`a[href*="${[pathname + search, last, search, hash].filter(Boolean).join('"], a[href*="')}"]`);
      return links.length <= 1 ? this.getEpisodeWrapper(links[0]) : this.findCurrentEpisode(links, pathname + search);
    },
    findCurrentEpisode(eles, pageUrl) {
      const filter = [
        "h1, header, footer, [class*='header']",
        "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
        "[id*='guankan'], [id*='history'], [class*='history'], [class*='record'], [class*='lishi']"
      ];
      eles = eles.filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !el.closest(`:is(${filter})`) && pageUrl.includes(pathname + search);
      }).map(this.getEpisodeWrapper).filter((el) => this.getAllEpisodes(el).map(this.getEpisodeNumber).filter(Boolean).length > 1);
      return eles.length <= 1 ? eles[0] : eles.find((el) => Tools.hasCls(el, "cur", "active") || !!this.getEpisodeNumber(el));
    },
    getEpisodeNumber: (el) => {
      const str = el?.innerText?.match(/第\d+(集|话)/i)?.[0] || el?.innerText?.replace(/-|\./g, Consts.EMPTY);
      return Tools.getNumbers(str)?.shift();
    },
    getTargetEpisode(el, isPrev = false) {
      if (!el) return;
      const episodes = this.getAllEpisodes(el);
      const numbers = episodes.map(this.getEpisodeNumber).filter(Boolean);
      if (numbers.length < 2) return;
      const index = episodes.indexOf(el);
      const currNumber = this.getEpisodeNumber(el);
      const { lSmall, rLarge } = this.compareNumSize(numbers, currNumber, index);
      return (lSmall || rLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
    },
    getAllEpisodes(element) {
      if (!element) return [];
      const numSet = /* @__PURE__ */ new Set();
      const elName = element.tagName;
      const elCls = Array.from(element.classList);
      const children = Array.from(element.parentNode.children);
      return children.filter((el) => {
        const curCls = Array.from(el.classList).filter((cls) => !["on", "cur", "active"].includes(cls));
        const hasCls = elCls.some((value) => curCls.includes(value));
        const isMatch = curCls.length ? hasCls : el.tagName === elName;
        if (!isMatch || numSet.has(el.innerText)) return false;
        return numSet.add(el.innerText);
      });
    },
    jumpToTargetEpisode(el) {
      const stack = [el].filter(Boolean);
      while (stack.length > 0) {
        const current = stack.pop();
        if (current.matches("a, button")) return current?.click();
        stack.push(...Array.from(current.children).reverse());
        current?.click && current.click();
      }
    },
    getEpisodeWrapper(el) {
      while (el?.parentElement) {
        const sibs = Array.from(el.parentElement.children);
        if (sibs.filter((s) => s.tagName === el.tagName).length > 1) return el;
        el = el.parentElement;
      }
      return null;
    },
    getEpisodeByText(isPrev = false) {
      const ignore = (el) => !el?.innerText?.includes("自动");
      const texts = isPrev ? ["上集", "上一集", "上话", "上一话", "上一个"] : ["下集", "下一集", "下话", "下一话", "下一个"];
      return Tools.findByText("attr", texts).filter(ignore).shift() ?? Tools.findByText("text", texts).filter(ignore).shift();
    },
    getEpisodeByClass(isPrev = false) {
      return isPrev ? null : Tools.query("[class*='control'] [class*='next' i]");
    },
    compareNumSize: (nums, compareVal = 0, index) => ({
      lSmall: nums.some((v, i) => i < index && v < compareVal),
      rLarge: nums.some((v, i) => i > index && v > compareVal)
    })
  };
  const Picker = {
    setupPickerListener() {
      if (Site.isGmMatch() || Tools.isExecuted("isBindPicker")) return;
      const handle = (event, { target, ctrlKey, altKey, isTrusted } = event) => {
        if (!ctrlKey || !altKey || !isTrusted || this.isNoVideo()) return;
        this.pickerCurrentEpisodePath(target) ?? this.pickerRelativeEpisodePath(target) ?? Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);
        Tools.preventEvent(event);
      };
      document.addEventListener("click", handle, true);
    },
    pickerCurrentEpisodePath(el) {
      if (Store.NEXT_CUR_EP.get(this.host)) return;
      return this.pickerEpisodePopup(el, {
        onVerify(value) {
          try {
            const number = this.getEpisodeNumber(Tools.query(value));
            number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
          }
        },
        onSave(value) {
          Store.NEXT_CUR_EP.set(value, this.host);
          Tools.notyf("继续拾取元素 ＼(＞０＜)／");
        }
      });
    },
    pickerRelativeEpisodePath(el) {
      if (Store.NEXT_REL_EP.get(this.host)) return;
      return this.pickerEpisodePopup(el, {
        onVerify(value) {
          try {
            const container = this.getEpisodeWrapper(Tools.query(value));
            const numbers = this.getAllEpisodes(container)?.map(this.getEpisodeNumber);
            numbers.length ? Tools.notyf(`所有集数：${numbers.join(" ")}`) : Tools.notyf("获取集数失败 〒▽〒", true);
          } catch (e) {
            Tools.notyf("获取集数失败 〒▽〒", true);
            console.error(e);
          }
        },
        onSave(value) {
          Store.NEXT_REL_EP.set(value, this.host);
          Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
        }
      });
    },
    getCurrentEpisodeNumber() {
      const selector = Store.NEXT_CUR_EP.get(this.topWin.host);
      return selector ? this.getEpisodeNumber(Tools.query(selector)) : null;
    },
    getCurrentEpisodeBySelector() {
      const num = this.getCurrentEpisodeNumber();
      const current = this.getEpisodeWrapper(Tools.query(Store.NEXT_CUR_EP.get(this.host)));
      const episodes = this.getAllEpisodes(this.getEpisodeWrapper(Tools.query(Store.NEXT_REL_EP.get(this.host))));
      return episodes.includes(current) ? current : episodes.find((el) => this.getEpisodeNumber(el) === num);
    },
    async pickerEpisodePopup(el, { onVerify, onSave }) {
      const res = await Swal.fire({
        html: Tools.safeHTML(`<h3>验证能正确取到集数，再确定保存</h3>
      <textarea class="swal2-textarea vpx-picker" spellcheck="false"></textarea>
      <p>编辑元素选择器，确保能正确获取到集数</p>`),
        customClass: { container: "vpx-popup" },
        confirmButtonText: "保存",
        denyButtonText: "验证",
        showDenyButton: true,
        reverseButtons: true,
        focusDeny: true,
        preDeny: () => {
          const value = Tools.query(".vpx-picker").value.trim();
          return value ? onVerify.call(this, value) ?? false : Tools.notyf("选择器不能为空！", true);
        },
        preConfirm: () => Tools.query(".vpx-picker").value.trim() || Tools.notyf("选择器不能为空！", true),
        didOpen: () => Tools.query(".vpx-picker").value = Tools.getElementPath(el)
      });
      return res.isConfirmed && onSave.call(this, res.value);
    }
  };
  class Clock {
    opts = { color: null, clss: "__Clock" };
    constructor(container, opts) {
      if (!container) throw new Error("时钟创建失败：container不能为空");
      this.opts = Object.assign(this.opts, opts);
      this.container = container;
      this.initClock();
      this.start();
    }
    initClock() {
      if (this.ele) return;
      const { color, clss } = this.opts;
      this.ele = document.createElement("div");
      if (color) this.ele.style.setProperty("color", color);
      this.ele.classList.add(clss);
      this.container.prepend(this.ele);
    }
    setContainer(container) {
      if (!container || this.container === container) return this;
      if (this.ele && !container.contains(this.ele)) container.prepend(this.ele);
      this.container = container;
      return this;
    }
    formatTime(date, fmt = "2-digit") {
      return new Intl.DateTimeFormat("zh-CN", { hour: fmt, minute: fmt, second: fmt }).format(date);
    }
    update() {
      if (!this.isRun) return;
      this.ele.textContent = this.formatTime(/* @__PURE__ */ new Date());
      if (!this.container.contains(this.ele)) this.container.prepend(this.ele);
    }
    start() {
      if (this.isRun) return;
      this.isRun = true;
      this.ele.style.removeProperty("display");
      this.timerId = setInterval(() => this.update(), 500);
      this.update();
    }
    stop(hide = false) {
      this.isRun = false;
      if (this.timerId) clearInterval(this.timerId), delete this.timerId;
      if (hide) this.ele?.style.setProperty("display", "none");
    }
    destroy() {
      this.stop();
      this.ele?.remove();
      this.container = this.ele = null;
    }
  }
  const Extend = {
    setupLoadEventListener() {
      const handle = ({ type }) => this.executeCodeSnippet(Store.LOAD_CODE.get(this.host), type, this.player);
      document.addEventListener("DOMContentLoaded", handle);
      unsafeWindow.addEventListener("load", handle);
    },
    shouldHideTime: () => !App.isFullscreen && !Store.CLOCK_WEB.get(),
    setupClockForPlayer() {
      if (!this.player || this.shouldHideTime()) return this.Clock?.stop(true);
      if (this.Clock && !this.shouldHideTime()) return this.Clock.setContainer(this.player.parentNode).start();
      this.Clock = new Clock(this.player.parentNode, { color: Store.CLOCK_COLOR.get() });
    },
    getRealDuration(video) {
      if (!Site.isQiyi()) return video.duration;
      return unsafeWindow.webPlay?.wonder?._player?._playProxy?._info?.duration ?? video.duration;
    },
    renderProgress(video) {
      if (!video || !this.Clock || this.player !== video) return;
      const duration = this.getRealDuration(video);
      if (duration <= 30 || duration > 86400 || this.isLive() || this.shouldHideTime()) return this.timeNode?.remove();
      const percent = Tools.toFixed(video.currentTime / duration * 100, 1);
      const remain = this.secToTime(duration - video.currentTime);
      const el = this.createProgressElement();
      el.firstChild.textContent = `${remain} / ${percent}`;
      Tools.setStyle(el, "--time-sx", (this.Clock.ele.clientWidth + (screen.width > 2200 ? 2.1 : 1.5)) / el.scrollWidth);
      this.prependElement(el);
    },
    createProgressElement() {
      if (this.timeNode) return this.timeNode;
      this.timeNode = this.createDisplayElement("__timeupdate", Store.CLOCK_COLOR.get());
      this.timeNode.append("00:00", Tools.newEle("b", { textContent: "%" }));
      return this.timeNode;
    },
    playbackRateDisplay() {
      if (!this.player || this.isLive()) return;
      if (!Store.RATE_SHOW.get()) return this.rateNode?.remove();
      this.rateNode ??= this.createDisplayElement("__v_rate");
      this.rateNode.textContent = `倍速: ${this.player.playbackRate}`;
      this.prependElement(this.rateNode);
    },
    ensureRateDisplay: () => !Tools.isAttached(App.rateNode) && App.playbackRateDisplay(),
    createDisplayElement(cls, color) {
      const el = Tools.newEle("div", { className: cls, style: `color: ${color}` });
      this.prependElement(el);
      return el;
    },
    prependElement(el) {
      const container = this.player?.parentNode;
      if (el && !container?.contains(el)) container?.prepend(el);
    },
    changeTimeDisplay: () => (App.setupClockForPlayer(), App.renderProgress(App.player)),
    setTimeColor: (color) => Tools.setStyle([App.timeNode, App.Clock?.element], "color", color)
  };
  const Ignore = {
    setupIgnoreChangeListener() {
      [Store.FULL_IGNORE_URLS, Store.NEXT_IGNORE_URLS].forEach(
        (it) => GM_addValueChangeListener(it.name, () => this.initIgnoreUrls())
      );
    },
    initIgnoreUrls() {
      const nextIgnore = ["https://www.youtube.com/watch", "https://www.bilibili.com/video", "https://www.bilibili.com/list"];
      this.nextFilter = this.processIgnoreUrls(Store.NEXT_IGNORE_URLS, nextIgnore);
      const wideIgnore = ["https://www.youtube.com/results", "https://www.youtube.com/shorts"];
      this.wideFilter = this.processIgnoreUrls(Store.FULL_IGNORE_URLS, wideIgnore);
    },
    isIgnoreNext() {
      if (!this.nextFilter) this.initIgnoreUrls();
      return this.isBlocked(this.nextFilter);
    },
    isIgnoreWFs() {
      if (!this.wideFilter) this.initIgnoreUrls();
      return this.isBlocked(this.wideFilter);
    },
    processIgnoreUrls(cache, defUrls) {
      const existUrls = (cache.get().match(/[^\s;]+/g) || []).filter((url) => new URL(url).pathname !== "/");
      return existUrls.length ? existUrls : (cache.set(defUrls.join(";\n")), defUrls);
    },
    isBlocked(urls = []) {
      const { href, pathname } = new URL(this.topWin.url);
      return pathname === "/" || urls.some((u) => href.startsWith(u));
    }
  };
  const Menu = {
    unUsedRate: () => Store.DISABLE_RATE.get(),
    isOverrideKey: () => Store.OVERRIDE_KEY.get(),
    isAutoSite: () => Store.SITE_AUTO.get(window.topWin?.host ?? location.host),
    initMenuCmds() {
      if (Tools.isExecuted("hasMenu") || !Tools.isTopWin()) return;
      this.setupMenuChangeListener();
      this.setupMenuCmds();
    },
    setupMenuChangeListener() {
      [Store.SITE_AUTO].forEach((t) => GM_addValueChangeListener(t.name + this.host, () => this.setupMenuCmds()));
    },
    setupMenuCmds() {
      const tle = `此站${this.isAutoSite() ? "禁" : "启"}用自动网页全屏`;
      const sFn = ({ host, cache }) => cache.toggle(host);
      const configs = [
        { title: tle, cache: Store.SITE_AUTO, useHost: true, isHide: Site.isGmMatch(), fn: sFn },
        { title: "此站脱离式全屏阈值", cache: Store.DETACH_THRESHOLD, useHost: true, isHide: Site.isGmMatch() },
        { title: "快捷键说明", cache: { name: "SHORTCUTKEY" }, fn: this.shortcutKeysPopup },
        { title: "更多设置", cache: { name: "SETTING" }, fn: this.settingPopup }
      ];
      configs.forEach(({ title, isHide, useHost, cache, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        GM_unregisterMenuCommand(this[id]);
        if (isHide) return;
        const host = useHost ? this.host : Consts.EMPTY;
        this[id] = GM_registerMenuCommand(title, () => {
          if (fn) return fn.call(this, { host, cache, title });
          const input = prompt(title, cache.get(host));
          if (input !== null) cache.set(input, host);
        });
      });
    },
    shortcutKeysPopup() {
      const keys = [
        { key: "Enter", desc: "全屏" },
        { key: "P", desc: "网页全屏" },
        { key: "N", desc: "切换下集" },
        { key: "R", desc: "旋转 90°" },
        { key: "M", desc: "静音切换" },
        { key: "D", desc: "弹幕切换" },
        { key: "K / L", desc: "上下帧" },
        { key: "Ctrl Z", desc: "复位缩移" },
        { key: "Shift R", desc: "水平镜像" },
        { key: "Shift A", desc: "🔛自动下集" },
        { key: "Ctrl Alt S", desc: "截图" },
        { key: "Alt + / -", desc: "缩放" },
        { key: "Alt ◀️🔼", desc: "移动" },
        { key: "A / S 或 + / -", desc: "±倍速" },
        { key: "Ctrl 1️~5️", desc: "预设倍速" },
        { key: "1️~9️", desc: "1️~9️ 倍速" },
        { key: "数字 0️", desc: "快进 N 秒" },
        { key: "◀️▶️", desc: "快退/进 (默禁)" },
        { key: "空格", desc: "播放/暂停 (默禁)" }
      ];
      const rows = keys.reduce((acc, it, i) => {
        if (i % 2) return acc;
        const next = keys[i + 1] || { key: Consts.EMPTY, desc: Consts.EMPTY };
        return acc + `<tr><td>${it.key}</td><td>${it.desc}</td><td>${next.key}</td><td>${next.desc}</td></tr>`;
      }, Consts.EMPTY);
      Swal.fire({
        width: 650,
        title: "快捷键说明",
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        customClass: { container: "vpx-popup" },
        html: Tools.safeHTML(`<table><tr><th>快捷键</th><th>说明</th><th>快捷键</th><th>说明</th></tr>${rows}</table>`)
      });
    },
    settingPopup() {
      const cacheMap = {};
      const tabConfs = ["控制:Basics", "参数:Params", "忽略:Ignore", "全屏:Full", "下集:Next", "高级:Extend"];
      const header = Tools.newEle("div", { className: "vpx-tabs-header" });
      const content = Tools.newEle("div", { className: "vpx-tabs-content" });
      tabConfs.forEach((conf, i) => {
        const tabId = `tab_${i}`;
        const cur = i ? "" : "active";
        const [textContent, method] = conf.split(":");
        const { html, eCache } = this[`render${method}`]();
        header.append(Tools.newEle("div", { tabId, className: `vpx-tab ${cur}`, textContent }));
        content.append(Tools.newEle("div", { className: `vpx-tab-panel ${tabId} ${cur}`, innerHTML: Tools.safeHTML(html) }));
        Object.assign(cacheMap, eCache);
      });
      const tabs = Tools.newEle("div", { className: "vpx-tabs" });
      tabs.append(header, content);
      Swal.fire({
        width: 400,
        html: tabs,
        title: "设置",
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        customClass: { container: "vpx-popup" },
        didOpen(popup) {
          popup.onclick = ({ target: t }) => {
            if (!t.matches(".vpx-tab")) return;
            Tools.querys(".active", popup).forEach((el) => Tools.delCls(el, "active"));
            Tools.query(`.${t.tabId}`, popup).classList.add("active");
            t.classList.add("active");
          };
          popup.oninput = ({ target: t }) => {
            const cache = cacheMap[t.name];
            const { host, send, delay } = t.dataset;
            const value = Object.is(t.type, "checkbox") ? t.checked : t.value;
            if (send) Tools.postMessage(window, { [`sw_${t.name}`]: value });
            const setCache = () => host ? cache.set(value, host) : cache.set(value);
            delay ? setTimeout(setCache, 50) : setCache();
          };
        }
      });
    },
    renderBasics() {
      const confs = [
        { name: "autoDef", text: "禁用 默认自动", cache: Store.NO_AUTO_DEF },
        { name: "speed", text: "禁用 倍速调节", cache: Store.DISABLE_RATE, attrs: ["send", "delay"] },
        { name: "memory", text: "禁用 记忆倍速", cache: Store.FORGET_RATE, attrs: ["send"] },
        { name: "tabs", text: "禁用 不可见暂停", cache: Store.INVIS_PAUSE },
        { name: "next", text: "启用 自动切换下集", cache: Store.NEXT_AUTO },
        { name: "wClock", text: "启用 非全屏显时间", cache: Store.CLOCK_WEB, attrs: ["send"] },
        { name: "sRate", text: "启用 左上角常显倍速", cache: Store.RATE_SHOW, attrs: ["send"] },
        { name: "override", text: "启用 空格◀️▶️ 控制", cache: Store.OVERRIDE_KEY }
      ];
      const render = ({ text, name, value, dataset }) => `
        <label class="vpx-input">${text}
          <input name="${name}" ${value ? "checked" : ""} ${dataset} type="checkbox"/>
          <span class="toggle-track"></span>
        </label>`;
      return this.generate(confs, render);
    },
    renderParams() {
      const confs = [
        { name: "step", text: "倍速步进", cache: Store.RATE_STEP },
        { name: "skip", text: "快进/退秒数", cache: Store.SKIP_INTERVAL },
        { name: "zero", text: "零键快进秒数", cache: Store.ZERO_KEY_SKIP },
        { name: "advance", text: "下集提前秒数", cache: Store.NEXT_ADVANCE },
        { name: "percent", text: "缩放百分比", cache: Store.ZOOM_PERCENT },
        { name: "move", text: "移动距离", cache: Store.MOVE_DIST },
        { name: "color", text: "时间颜色", cache: Store.CLOCK_COLOR, attrs: ["send"] },
        { name: "preset", text: "常用倍速", cache: Store.PRESET_RATE }
      ];
      const render = ({ text, name, value, dataset }) => `
        <label class="vpx-input">${text}
          <input name="${name}" value="${value}" ${dataset} type="text" autocomplete="off"/>
        </label>`;
      return this.generate(confs, render);
    },
    renderIgnore() {
      const confs = [
        { name: "nextUrls", text: "自动切换下集时 忽略的网址（用 ; 隔开）", cache: Store.NEXT_IGNORE_URLS },
        { name: "wFsUrls", text: "自动网页全屏时 忽略的网址（用 ; 隔开）", cache: Store.FULL_IGNORE_URLS }
      ];
      return this.renderConfs(confs);
    },
    renderFull() {
      const confs = [
        { name: "vWrap", text: "此站 (网页)全屏视频容器", cache: Store.V_WRAPPER, useHost: true },
        { name: "fsCode", text: "此站 (网页)全屏切换 事件代码", cache: Store.FS_CODE, useHost: true, attrs: ["send"] }
      ];
      return this.renderConfs(confs);
    },
    renderNext() {
      const confs = [
        { name: "curEp", text: "此站 当前播放集选择器", cache: Store.NEXT_CUR_EP, useHost: true, disable: Site.isGmMatch() },
        { name: "allEp", text: "此站 定位全部集选择器", cache: Store.NEXT_REL_EP, useHost: true, disable: Site.isGmMatch() }
      ];
      return this.renderConfs(confs);
    },
    renderExtend() {
      const confs = [
        { name: "lCode", text: "此站 load 事件代码", cache: Store.LOAD_CODE, useHost: true, attrs: ["send"] },
        { name: "vCode", text: "此站 video 事件代码", cache: Store.VIDEO_CODE, useHost: true, attrs: ["send"] }
      ];
      return this.renderConfs(confs);
    },
    renderConfs(confs) {
      const render = ({ text, name, value, dataset }) => `
        <div class="vpx-textarea"><p>${text}</p>
          <textarea name="${name}" ${dataset} spellcheck="false" autocomplete="off">${value}</textarea>
        </div>`;
      return this.generate(confs, render);
    },
    generate(confs, render) {
      const finalConfs = confs.map((conf) => {
        const { cache, attrs = [], useHost, disable } = conf;
        const host = useHost ? this.host : Consts.EMPTY;
        const props = attrs.map((key) => `data-${key}="true"`);
        if (host) props.push(`data-host="${host}"`);
        if (disable) props.push(`disabled`);
        return { ...conf, dataset: props.join(Consts.EMPTY), value: cache.get(host) };
      });
      const html = finalConfs.map((conf) => render(conf)).join(Consts.EMPTY);
      const eCache = Object.fromEntries(finalConfs.map((e) => [e.name, e.cache]));
      return { html, eCache };
    }
  };
  unsafeWindow.GM_E9X_FS = window.App = {};
  const handlers = [Listen, Keydown, Events, Control, WebFull, Automatic, Episode, Picker, Extend, Ignore, Menu];
  handlers.forEach((handler) => {
    const entries = Object.entries(handler);
    for (const [key, value] of entries) {
      App[key] = value instanceof Function ? value.bind(App) : value;
    }
  });
  App.init();
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("Swal");
  cssLoader("notyf");

})(notyf, Swal);