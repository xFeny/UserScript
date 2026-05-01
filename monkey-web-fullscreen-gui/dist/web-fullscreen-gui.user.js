// ==UserScript==
// @name         GUI-悬浮图形控制面板
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @author       Feny
// @description  为「视频自动网页全屏｜倍速播放」脚本提供悬浮图形控制面板，支持自由拖拽定位、深色/浅色主题切换
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=
// @match        *://*/*
// @require      https://unpkg.com/@popperjs/core@2.11.8/dist/umd/popper.min.js
// @require      https://unpkg.com/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js
// @require      https://unpkg.com/draggable@4.2.0/dist/draggable.min.js
// @resource     tippy  https://unpkg.com/tippy.js@6.3.7/dist/tippy.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-body
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const r=document.createElement("style");r.textContent=e,document.head.append(r)})(' @charset "UTF-8";.vc-panel-wrapper{top:30%;border:none;position:fixed;left:calc(100vw - 65px);user-select:none!important;z-index:2147483647!important;background-color:transparent!important}.vc-panel-wrapper *{border:none;outline:none;color:#e0e0e0;font-size:12px;user-select:none!important;transition:border .3s,background-color .3s!important}.vc-trigger{width:32px;height:32px;cursor:pointer;line-height:32px;border-radius:50%;position:relative;text-align:center;background:#333;box-shadow:0 2px 8px #0000004d}.vc-trigger:hover{background:#444}.vc-control-panel{width:280px;overflow:hidden;border-radius:4px;background:#444;box-shadow:0 2px 8px #0000004d}.vc-panel-header{padding:8px;display:flex;align-items:center;background:#333;justify-content:space-between}.vc-theme-btn{cursor:pointer}.vc-theme-btn:after{content:"\u{1F319}"}.vc-func-group,.vc-slider-control{gap:8px;padding:8px;border-top:1px solid #555555}.vc-func-group{display:grid;grid-template-columns:repeat(3,1fr)}.vc-control-item{padding:5px 0;text-align:center}.vc-control-item b{margin-right:5px}.vc-control-item b[title=\u4E0A\u79FB],.vc-control-item b[title=\u4E0B\u79FB]{margin-right:2px;display:inline-block;transform:rotate(90deg)}.vc-slider-control{display:flex;flex-direction:column}.vc-slider-control button{padding:2px 8px;font-weight:700}.vc-slider-label{display:flex;justify-content:space-between}.vc-slider-label *{transform:scale(.95)}.vc-slider-rate{padding:3px 0;cursor:default!important}.vc-slider-rate span{cursor:auto!important}.vc-slider-rate span:focus{padding:3px 6px;border-radius:4px;background-color:#666}.vc-preset-rate{gap:3px;display:grid;grid-auto-flow:column;grid-template-columns:repeat(auto-fit,1fr)}.vc-preset-rate span{padding:3px 6px}.vc-slider-row{gap:8px;display:flex;align-items:center}.vc-slider{flex:1;height:4px;border-radius:3px;background:#d3d3d3;-webkit-appearance:none;appearance:none}.vc-slider::-webkit-slider-thumb{width:12px;height:12px;cursor:pointer;border-radius:50%;background:#9a72ff;-webkit-appearance:none;appearance:none}.vc-slider::-webkit-slider-thumb:hover{background:#a37ffe}.vc-control-item,.vc-preset-rate span,.vc-slider-control button{border-radius:4px;cursor:pointer!important;background-color:#555}.vc-control-item:hover,.vc-preset-rate span:hover,.vc-slider-control button:hover{background-color:#666}.light-mode *{color:#333;border-color:#e0e0e0}.light-mode .vc-trigger,.light-mode .vc-control-panel{background-color:#fff}.light-mode .vc-trigger:hover{background-color:#e3e5e7}.light-mode .vc-panel-header{background-color:#f5f5f5}.light-mode .vc-theme-btn:after{content:"\u2600\uFE0F"}.light-mode .vc-control-item,.light-mode .vc-preset-rate span,.light-mode .vc-slider-control button{background-color:#f0f0f0}.light-mode .vc-control-item:hover,.light-mode .vc-preset-rate span:hover,.light-mode .vc-slider-control button:hover{background-color:#e0e0e0}.light-mode .vc-slider-rate span:focus{background-color:#f0f0f0}.tippy-box[data-theme~=vc-panel-wrapper]{background-color:transparent!important}.tippy-box[data-theme~=vc-panel-wrapper] .tippy-content{padding:0!important}@media (min-width: 2200px){.vc-panel-wrapper *{font-size:14px}.vc-trigger{width:45px;height:45px;line-height:45px}.vc-control-panel{width:340px}.vc-control-item{padding:7px 0}.vc-slider-label *{transform:none}.vc-preset-rate{gap:5px}} ');

(function (tippy, Draggable) {
  'use strict';

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("tippy");
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
    DARK_THEME: new BasicStorage("DARK_THEME", true, Boolean),
    DRAG_POSITION: new BasicStorage("DRAG_POSITION_", { x: 0, y: 0 }),
    NOT_SUPPORTED: new BasicStorage("NOT_SUPPORTED", false)
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
    },
    debounce(func, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    }
  };
  const Layout = {
    createPanelWrapper() {
      if (this.wrapper) return;
      this.panelTrigger = FyTools.newEle("div", { textContent: "⚙️", className: "vc-trigger" });
      this.wrapper = FyTools.newEle("div", { className: "vc-panel-wrapper" });
      this.wrapper.append(this.panelTrigger);
      document.body.prepend(this.wrapper);
    },
    createControlPanel() {
      if (this.panel) return this.panel;
      const els = ["Fullscreen", "Operation", "Transform", "Rate"].map((name) => this[`create${name}Controls`]());
      this.panel = FyTools.newEle("div", { className: "vc-control-panel" });
      this.panel.append(this.createPanelHeader(), ...els);
      return this.panel;
    },
    createPanelHeader() {
      const title = FyTools.newEle("b", { textContent: "🎬 播放控制" });
      const onclick = () => this.setControlPanelTheme(!Store.DARK_THEME.get());
      const theme = FyTools.newEle("b", { className: "vc-theme-btn", onclick });
      const header = FyTools.newEle("div", { className: "vc-panel-header" });
      header.append(title, theme);
      return header;
    },
    createFullscreenControls() {
      const config = [
        { text: "画中画", icon: "▣", action: () => this.picInPic() },
        { text: "网页全屏", icon: "⤢", params: ["P", { isTrusted: true }], action: this.FS.dispatchShortcut },
        { text: "全屏", icon: "⛶", params: ["ENTER"], action: this.FS.dispatchShortcut }
      ];
      return this.createControlGroup(config);
    },
    createOperationControls() {
      const config = [
        { text: "截图", icon: "⎙", action: this.FS.screenshot },
        { text: "旋转", icon: "⟳", action: this.FS.rotateVideo },
        { text: "镜像", icon: "][", action: this.FS.horizFlip },
        { text: "上一帧", icon: "‹‹", params: [-1], action: this.FS.freezeFrame },
        { text: "播放", icon: "▷", action: () => this.FS.player?.play() },
        { text: "下一帧", icon: "››", action: this.FS.freezeFrame }
      ];
      return this.createControlGroup(config);
    },
    createTransformControls() {
      const config = [
        { text: "放大", icon: "+", action: this.FS.zoomVideo },
        { text: "上移", icon: "‹‹", params: ["UP"], action: this.FS.moveVideo },
        { text: "左移", icon: "‹‹", params: ["LEFT"], action: this.FS.moveVideo },
        { text: "缩小", icon: "-", params: [-1], action: this.FS.zoomVideo },
        { text: "下移", icon: "››", params: ["DOWN"], action: this.FS.moveVideo },
        { text: "右移", icon: "››", params: ["RIGHT"], action: this.FS.moveVideo }
      ];
      return this.createControlGroup(config);
    },
    createControlGroup(confs) {
      const nodes = confs.map(({ text, icon, params = [], action = () => {
      } }) => {
        const el = FyTools.newEle("div", { className: "vc-control-item", onclick: () => action.apply(this.FS, params) });
        el.append(FyTools.newEle("b", { title: text, textContent: icon }), text);
        return el;
      });
      const container = FyTools.newEle("div", { className: "vc-func-group" });
      container.append(...nodes);
      return container;
    },
    createRateControls() {
      const step = FyStorage?.RATE_STEP?.get() ?? 0.25;
      const setRate = (value) => this.FS.setPlaybackRate(value);
      const adjustRate = (plus2 = 1) => this.FS.adjustPlayRate(plus2 * step);
      const inputRate = Utils.debounce((e) => setRate(e.target.textContent), 500);
      this.rate = FyTools.newEle("span", { contentEditable: true, textContent: "1", oninput: inputRate });
      const rateWrap = FyTools.newEle("span", { className: "vc-slider-rate" });
      rateWrap.append("倍速: ", this.rate, "x");
      const preset = FyTools.newEle("div", { className: "vc-preset-rate" });
      FyStorage?.PRESET_RATE?.get()?.map((rate) => {
        if (rate) preset.append(FyTools.newEle("span", { textContent: rate.trim(), onclick: () => setRate(rate) }));
      });
      const label = FyTools.newEle("div", { className: "vc-slider-label" });
      label.append(rateWrap, preset);
      const reset = FyTools.newEle("button", { textContent: "↺", onclick: () => setRate(1) });
      const plus = FyTools.newEle("button", { textContent: "+", onclick: () => adjustRate() });
      const minus = FyTools.newEle("button", { textContent: "-", onclick: () => adjustRate(-1) });
      const attrs = { min: 0.1, max: 16, value: 1, step, type: "range", className: "vc-slider" };
      this.slider = FyTools.newEle("input", { ...attrs, oninput: (e) => setRate(e.target.value) });
      const row = FyTools.newEle("div", { className: "vc-slider-row" });
      row.append(minus, this.slider, plus, reset);
      const container = FyTools.newEle("div", { className: "vc-slider-control" });
      container.append(label, row);
      return container;
    }
  };
  const Extend = {
    picInPic() {
      if (!Store.NOT_SUPPORTED.get() && FyTools.isTopWin() && "documentPictureInPicture" in window) {
        return this.pipWin ? this.pipWin.close() : this.enterDocumentPictureInPicture();
      }
      document.exitPictureInPicture().catch(() => this.FS.player?.requestPictureInPicture());
    },
    enterDocumentPictureInPicture() {
      const isFs = this.FS.fsWrapper;
      this.enableVideoWebFullscreen();
      this.openDocumentPictureInPicture(this.FS.fsWrapper, {
        didOpen: (pipWin) => {
          this.setPageVisibilityForced();
          (pipWin.GM_E9X_FS = this.FS).init();
          this.handlePipEvents(pipWin);
          this.pipWin = pipWin;
        },
        unload: (e) => {
          this.handlePipEvents(e.target.defaultView, false);
          document.body.appendChild(this.FS.fsWrapper);
          if (!isFs) this.FS.exitWebFullscreen();
          this.setPageVisibilityForced(true);
          delete this.pipWin;
        }
      }).catch((e) => Store.NOT_SUPPORTED.set(true));
    },
    async openDocumentPictureInPicture(target, { didOpen, unload }) {
      try {
        const pipWin = await documentPictureInPicture.requestWindow({ width: 500, height: 320 });
        document.querySelectorAll("style, link, script").forEach((el) => pipWin.document.head.append(el.cloneNode(true)));
        pipWin.document.body.appendChild(pipWin.document.adoptNode(target));
        if (didOpen && didOpen instanceof Function) didOpen(pipWin);
        if (unload) pipWin.addEventListener("unload", unload);
        return pipWin;
      } catch (error) {
        console.error("文档画中画启动失败：", error.message);
        throw error;
      }
    },
    enableVideoWebFullscreen() {
      this.FS.fsWrapper ??= this.FS.getVideoContainer();
      this.FS.detachForFullscreen();
      this.FS.adaptToWebFullscreen();
    },
    setPageVisibilityForced(restore = false) {
      if (restore) return delete document.hidden, delete document.visibilityState;
      GM_FVEnh.defineProperty(document, "hidden", { get: () => false });
      GM_FVEnh.defineProperty(document, "visibilityState", { get: () => "visible" });
    },
    handlePipEvents(pipWin, add = true) {
      if (!window.evts) return;
      const method = add ? "addEventListener" : "removeEventListener";
      for (const [target, list] of window.evts) {
        const el = target === unsafeWindow ? pipWin : pipWin.document;
        list.forEach((args) => el[method](...args));
      }
    }
  };
  const Control = {
    FS: null,
    init() {
      if (!unsafeWindow.GM_E9X_FS) return console.warn("未安装依赖，无法正常运行！！");
      this.host = location.host;
      this.FS = unsafeWindow.GM_E9X_FS;
      this.hookAddEventListener();
      this.setupPlayerListener();
      this.setupFunctionHooks();
    },
    setupPlayerListener() {
      unsafeWindow.addEventListener("load", () => this.initControlPanel());
      document.addEventListener("setPlayer", () => this.initControlPanel());
    },
    setupFunctionHooks() {
      Utils.onBefore(this.FS, "ratechange", () => this.renderRateToPanel());
      Utils.onBefore(this.FS, "onFullChange", () => (document.fullscreenElement ?? document.body).prepend(this.wrapper ?? ""));
    },
    renderRateToPanel() {
      if (!this.FS.player || !this.panel) return;
      this.rate.textContent = this.slider.value = this.FS.player.playbackRate;
    },
    initControlPanel() {
      if (!this.FS.player || this.wrapper) return;
      try {
        this.createPanelWrapper();
        this.setControlPanelTheme();
        this.setupPanelTrigger();
        this.setupDraggable();
      } catch (err) {
        console.warn(err);
      }
    },
    setControlPanelTheme(isDark = Store.DARK_THEME.get()) {
      this.wrapper.classList.toggle("light-mode", !isDark);
      Store.DARK_THEME.set(isDark);
    },
    setupPanelTrigger() {
      tippy(this.panelTrigger, {
        arrow: false,
        duration: 500,
        interactive: true,
        placement: "left",
        appendTo: "parent",
        theme: "vc-panel-wrapper",
        onBeforeUpdate: (instance) => {
          const content = FyTools.query(".tippy-content", instance.popper);
          if (!content || FyTools.isExecuted("tippy-content", content)) return;
          GM_FVEnh.defineProperty(content, "innerHTML", { set: (html, setter) => setter(FyTools.safeHTML(html)) });
        },
        onTrigger: (instance) => {
          instance.setContent(this.createControlPanel());
          if (this.panel) this.renderRateToPanel();
        }
      });
    },
    setupDraggable() {
      const cache = Store.DRAG_POSITION;
      const { x, y } = cache.get(this.host);
      const onDragEnd = (_, x2, y2) => cache.set({ x: x2, y: y2 }, this.host);
      new Draggable(this.panelTrigger, { onDragEnd, setPosition: false, limit: this.getDragBounds() }).set(x, y);
    },
    getDragBounds() {
      const { top, left, bottom, width } = FyTools.getRect(this.wrapper);
      return { x: [-left, width / 2], y: [-top, top + bottom] };
    },
    hookAddEventListener() {
      window.evts = /* @__PURE__ */ new Map();
      const addEvent = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(...args) {
        if ([document, unsafeWindow].includes(this)) window.evts.get(this)?.push(args) || window.evts.set(this, [args]);
        return addEvent.call(this, ...args);
      };
    }
  };
  const App = { ...Control, ...Layout, ...Extend };
  App.init();

})(tippy, Draggable);