// ==UserScript==
// @name         自定义扩展功能
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @author       Feny
// @description  在「视频自动网页全屏｜倍速播放」脚本的基础上扩展功能。自定义快捷键功能，实现视频模糊、标记当前时间点等。
// @license      GPL-3.0-only
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-body
// ==/UserScript==

(function () {
  "use strict";

  const Utils = {
    /**
     * AOP 前置拦截：原方法执行前执行
     * @param {object} target - 目标对象
     * @param {string} func - 要拦截的方法名
     * @param {Function} exec - 前置操作
     */
    onBefore(target, func, exec) {
      const original = target[func];
      target[func] = function (...args) {
        exec.apply(this, args);
        return original.apply(this, args);
      };
    },
    /**
     * AOP 后置拦截：原方法执行后执行
     * @param {object} target - 目标对象
     * @param {string} func - 要拦截的方法名
     * @param {Function} exec - 后置操作
     */
    onAfter(target, func, exec) {
      const original = target[func];
      target[func] = function (...args) {
        const res = original.apply(this, args);
        exec.apply(this, args);
        return res;
      };
    },
  };
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
    ADVANCE_SEC: new BasicStorage("ADVANCE_SEC_", 75, Number),
  };
  const Main = {
    FS: null,
    noop() {},
    /**
     * GM_E9X_FS 依赖脚本的核心实现
     * FyStorage 依赖脚本内部的缓存
     * FyTools 依赖脚本内部的公共方法
     */
    init() {
      if (!unsafeWindow.GM_E9X_FS) return console.warn("未安装依赖，无法正常运行！！");
      this.FS = unsafeWindow.GM_E9X_FS;
      this.overwriteRelatedMethod();
      this.setupKeydownListener();
      this.interceptKeyActions();
      this.host = location.host;
    },
    overwriteRelatedMethod() {
      this.FS.renderProgress = this.noop;
      this.FS.autoWebFullscreen = this.noop;
      this.FS.autoExitFullscreen = this.noop;

      Utils.onAfter(this.FS, "horizFlip", function () {
        const mirror = this.player.tsr.mirror;
        this.customToast("已", mirror == -1 ? "开启" : "取消", "镜像");
      });

      Utils.onAfter(this.FS, "rotateVideo", function () {
        const rotate = this.player.tsr.rotate;
        this.customToast("旋转", `${rotate}°`, "");
      });

      Utils.onAfter(this.FS, "resetTsr", function () {
        this.showToast("已恢复视频变换");
      });
    },
    /**
     * 设置按键监听
     */
    setupKeydownListener() {
      const handle = (e) => {
        // 无视频或正在输入
        if (this.FS.isNoVideo() || this.FS.isInputFocus(e)) return;

        // 阻止按键其他操作行为，如：`D` 为B站的弹幕开关，如不需可删除
        const keys = ["D", "B", "G", "I", "U", "X", "Z"];
        if (keys.includes(e.key.toUpperCase())) FyTools.preventEvent(e);

        // 使用原脚本的派发按键方法
        this.FS.dispatchShortcut(this.FS.processShortcutKey(e));
      };
      unsafeWindow.addEventListener("keydown", handle, true);
    },
    /**
     * 拦截原脚本的按键执行，处理个人逻辑
     */
    interceptKeyActions() {
      const step = FyStorage.RATE_STEP.get(); // 原脚本的倍速步长
      Utils.onBefore(this.FS, "execKeyActions", ({ key }) => {
        // 改写原脚本的按键操作
        this.FS.keyMapp["A"] = () => this.FS.adjustPlayRate(-step);
        this.FS.keyMapp["D"] = () => this.FS.adjustPlayRate(step);
        this.FS.keyMapp["S"] = () => this.FS.setPlaybackRate(1);

        // 执行个人定义的按键操作
        this.execCustomKey({ key });
      });
    },
    /**
     *自定义按键操作
     */
    execCustomKey({ key }) {
      this.dict ??= {
        I: () => this.setBlur(1),
        U: () => this.setBlur(-1),
        X: () => this.FS.skipPlayback(10),
        Z: () => this.FS.skipPlayback(-10),
        B: () => this.FS.setPlaybackRate(1.25),
        G: () => this.FS.setPlaybackRate(1.5),
        SHIFT_T: () => this.setSkipTime(),
        T: () => this.seekToTime(),
      };
      this.dict[key]?.();
    },
    seekToTime() {
      const { player, secToTime, customToast } = this.FS;
      if (!player) return;
      const maxTime = player.duration - 0.5;
      let skipTime = Store.ADVANCE_SEC.get(this.host);
      const finalTime = Math.min(skipTime, maxTime);
      requestAnimationFrame(() => (player.currentTime = finalTime));
      customToast("跳转至", secToTime(finalTime), skipTime > maxTime ? "（已到视频末尾）" : "处");
    },
    setSkipTime() {
      const { player, isLive, secToTime, showToast, customToast } = this.FS;
      if (!player || isNaN(player.duration) || isLive()) return showToast("无法设置时间: 未找到有效视频", 1e3);
      const current = Math.floor(player.currentTime);
      Store.ADVANCE_SEC.set(current, this.host);
      customToast("已记录当前时间", secToTime(current), "");
    },
    setBlur(delta) {
      const { player, customToast } = this.FS;
      if (!player) return;
      const style = player.style;
      const current = parseFloat(style.filter.match(/blur\((\d+)px\)/)?.[1] || 0);
      const newBlur = Math.max(0, current + delta);
      style.filter = newBlur ? `blur(${newBlur}px)` : "";
      customToast("模糊度", `${newBlur}`, "px");
    },
  };
  Main.init();
})();
