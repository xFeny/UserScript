// ==UserScript==
// @name         旧版百度网盘增强
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  对「视频自动网页全屏｜倍速播放」在旧版百度网盘的增强
// @author       Feny
// @match        https://pan.baidu.com/play/*
// ==/UserScript==

(function () {
  "use strict";

  class VideoEnhancer {
    static hookVideoPlay() {
      const original = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        VideoEnhancer.dispatchShadowVideo(this);
        return original.apply(this, arguments);
      };
    }

    static dispatchShadowVideo(video) {
      const root = video.getRootNode();
      if (!(root instanceof ShadowRoot)) return;
      this.dispatchEvent("shadow-video", { video });
      this.dispatchEvent("addStyle", { shadowRoot: root });
    }

    static dispatchEvent(type, detail = {}) {
      document.dispatchEvent(new CustomEvent(type, { detail }));
    }
  }

  VideoEnhancer.hookVideoPlay();
})();
