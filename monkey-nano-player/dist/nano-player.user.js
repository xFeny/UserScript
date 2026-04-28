// ==UserScript==
// @name         页内视频小窗
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @author       Feny
// @description  为「视频自动网页全屏｜倍速播放」脚本的功能扩展，提供通用页内悬浮视频小窗支持。
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=
// @match        *://*/*
// @require      https://unpkg.com/draggable@4.2.0/dist/draggable.min.js
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        unsafeWindow
// @run-at       document-body
// @noframes
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const n=document.createElement("style");n.textContent=t,document.head.append(n)})(' @charset "UTF-8";.vc-nano-wrap{bottom:80px;display:none;position:fixed;min-width:500px;min-height:300px;pointer-events:none;left:calc(100vw - 580px);z-index:2147483646!important}.vc-nano-wrap.active{display:block}.vc-nano-wrap:hover .vc-nano-header{background-color:#373535}.vc-nano-header{cursor:move;height:30px;position:relative;pointer-events:all!important;background-color:transparent}.vc-nano-close{top:0;right:0;color:#fff;padding:0 10px;cursor:pointer;font-size:20px;line-height:30px;position:absolute}.vc-nano-content{position:absolute!important;background:#000!important;pointer-events:all!important;box-shadow:0 2px 8px #00000080}.vc-nano-player{width:inherit!important;height:inherit!important}.vc-nano-player video{max-width:100%!important;max-height:100%!important} ');

(function (Draggable) {
  'use strict';

  class BasicStorage {
    constructor(name, defVal, parser = (v) => v) {
      Object.assign(this, { name, defVal, parser });
    }
    #getKey(suffix = "") {
      return this.name + suffix;
    }
    set(value, suffix) {
      GM_setValue(this.#getKey(suffix), value);
    }
    get(suffix) {
      const val = GM_getValue(this.#getKey(suffix));
      return this.parser(val ?? this.defVal);
    }
  }
  const Store = {
    ENABLE_NANO: new BasicStorage("ENABLE_NANO_PLAYER_", false),
    INTERSECT_ELEMENT: new BasicStorage("INTERSECT_ELEMENT_", ""),
    NANO_SIZE: new BasicStorage("ENABLE_NANO", "500,300", (v) => v.split(","))
  };
  const Menu = {
    initMenuCmds() {
      if (FyTools.isExecuted("hasMenu", window)) return;
      GM_addValueChangeListener(Store.ENABLE_NANO.name + this.host, () => this.setupMenuCmds());
      this.setupMenuCmds();
    },
    setupMenuCmds() {
      const isHide = !FyTools.hasMoveBefore();
      const enableNano = `此站${Store.ENABLE_NANO.get(this.host) ? "禁" : "启"}用悬浮小窗`;
      const configs = [
        { title: "设置小窗的宽高", cache: Store.NANO_SIZE, isHide, fn: this.inputNanoSize },
        { title: "小窗视口监测元素", cache: Store.INTERSECT_ELEMENT, useHost: true, isHide, fn: this.setIntersect },
        { title: enableNano, cache: Store.ENABLE_NANO, useHost: true, isHide, fn: this.setNanoEnabled }
      ];
      configs.forEach(({ title, isHide: isHide2, useHost, cache, fn }) => {
        const id = `${cache.name}_MENU_ID`;
        GM_unregisterMenuCommand(this[id]);
        if (isHide2) return;
        const host = useHost ? this.host : "";
        this[id] = GM_registerMenuCommand(title, () => {
          if (fn) return fn.call(this, { host, cache, title });
        });
      });
    },
    setIntersect({ host, cache, title }) {
      const input = prompt(title, cache.get(host));
      if (input !== null) cache.set(input, host), this.createNanoObserver();
    },
    setNanoEnabled({ host, cache, title }) {
      const isEnable = !cache.get(host);
      isEnable ? this.createNanoObserver() : this.activateNano(false);
      cache.set(isEnable, host);
    },
    inputNanoSize({ host, cache, title }) {
      const input = prompt(title, cache.get(host));
      if (input !== null) cache.set(input, host), this.setNanoStyleSize();
    }
  };
  const Utils = {
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
    },
    onBefore(target, funcName, preExec) {
      const original = target[funcName];
      target[funcName] = function(...args) {
        Promise.resolve().then(() => preExec.apply(this, args));
        return original.apply(this, args);
      };
    }
  };
  class NanoFloatWindow {
    constructor(options = {}) {
      Object.assign(this, { width: 500, height: 300 }, options);
      this.#init();
    }
    #init() {
      if (!this.target) return;
      this.#cacheOrigin();
      this.#createElement();
      this.#bindDraggable();
      this.activate(false);
      this.setSize();
      return this;
    }
    #cacheOrigin() {
      this.originParent = this.target.parentElement;
      this.originNext = this.target.nextSibling;
    }
    #newEle = (tag, attrs) => Object.assign(document.createElement(tag), attrs);
    #createElement() {
      if (this.wrap) return;
      this.header = this.#buildHeader();
      this.content = this.#newEle("div", { className: "vc-nano-content" });
      this.wrap = this.#newEle("div", { className: "vc-nano-wrap" });
      this.wrap.append(this.header, this.content);
      document.body.prepend(this.wrap);
    }
    #buildHeader() {
      const close = this.#newEle("span", { textContent: "×", className: "vc-nano-close", onclick: () => this.activate(false) });
      const header = this.#newEle("div", { className: "vc-nano-header", title: "按住拖动位置" });
      header.appendChild(close);
      return header;
    }
    #bindDraggable() {
      if (!this.header || !this.content) return;
      new Draggable(this.header, {
        setPosition: false,
        onDrag: (_, x, y) => {
          this.content.style.left = `${x}px`;
          this.content.style.top = `${y + this.header.offsetHeight}px`;
        }
      });
    }
    setSize(w = this.width, h = this.height) {
      if (!this.content) return;
      this.header.style.width = `${w}px`;
      this.content.style.width = `${w}px`;
      this.content.style.height = `${h}px`;
    }
    activate(show) {
      if (!this.wrap || !this.target) return;
      try {
        this.wrap.classList.toggle("active", show);
        this.target.classList.toggle("vc-nano-player", show);
        this[show ? "content" : "originParent"]?.moveBefore(this.target, show ? null : this.originNext);
      } catch (err) {
        console.warn("页内小窗切换异常：", err);
        this.#resetState();
      }
    }
    updateTarget(target) {
      if (!(target instanceof HTMLElement)) return;
      if (this.target === target) return;
      this.#resetState();
      this.target = target;
      this.#cacheOrigin();
    }
    #resetState() {
      try {
        this.content?.replaceChildren();
        this.wrap?.classList.remove("active");
        this.target?.classList.remove("vc-nano-player");
        this.target = null;
      } catch (e) {
      }
    }
  }
  const Main = {
    FS: null,
    init() {
      Utils.waitFor(() => unsafeWindow.GM_E9X_FS).then(() => {
        this.host = location.host;
        this.FS = unsafeWindow.GM_E9X_FS;
        this.setupFunctionHooks();
      }).catch(() => console.warn("未安装依赖，脚本无法正常运行！！"));
    },
    setupFunctionHooks() {
      Utils.onBefore(this.FS, "syncMetaToParentWin", () => {
        this.createNanoObserver();
        this.initMenuCmds();
      });
    },
    createNanoObserver() {
      if (!FyTools.hasMoveBefore()) return console.warn("浏览器环境不支持，脚本无法显示页内小窗！！");
      this.activateNano(false);
      const target = this.FS.getVideoHostContainer();
      this.nano ??= new NanoFloatWindow({ target });
      if (this.observer) this.nano.updateTarget(target);
      const obsNode = this.getInter(target, FyTools.getParent(target));
      this.setupNanoObserver(obsNode);
    },
    setupNanoObserver(obsNode) {
      if (!obsNode) return;
      this.observer?.disconnect();
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!Store.ENABLE_NANO.get(this.host)) return;
          this.activateNano(!entry.isIntersecting);
          this.setNanoStyleSize();
        },
        { root: null, threshold: 0 }
      );
      this.observer.observe(obsNode);
    },
    getInter(ctx, defVal) {
      const selector = Store.INTERSECT_ELEMENT.get(this.host);
      return selector ? ctx.closest(selector) ?? FyTools.query(selector) : defVal;
    },
    setNanoStyleSize() {
      const [w, h] = Store.NANO_SIZE.get();
      this.nano?.setSize(w, h);
    },
    activateNano(active) {
      this.nano?.activate(active);
    }
  };
  const App = { ...Main, ...Menu };
  App.init();

})(Draggable);