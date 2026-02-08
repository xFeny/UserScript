// ==UserScript==
// @name         隐藏网站碍眼元素
// @namespace    http://tampermonkey.net
// @version      0.5.0
// @author       Feny
// @description  隐藏网站上的一些碍眼元素
// @license      MIT
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABBZJREFUWEfVVwlME2kU/qYttLQKtIIVAW9NEIRoXONqVl2NZrNqIhrURIwbZI0HHjHAqolYPEAB44FHRGOMilHILiYe8Y6S9QxmFSgmaqOIWBDpQQ8svTb/6FS7MyOD1pB9yUw789773vfevP/9+Sl8lKolM+VhdnG2CNQQACMAJDK6AP1WA6jxwPvcLHcXjC45Zye4FLk9S52lEYHaFKBAgmA88OYOPXlWQ2lTUoJlUpdDkFeAjd47JFKqO7Jn8iBVoHSpyWUAUgKcnFC4ckq3MLkWXsQL9QioHQUtqYA3oKBdBPt/EaCkMsgTkiAbFgexUglxuJLO9/0TLYwVZ9A3Jw+USIRGzTrBdRBUAUmvCIRPn4Ue4ydCJFewwM2Xz8NtNkE1NxXOpjdoyMoIHIHQqb/SwQkJPqnPSEP/fUdptT5/E6LW58JQVgrTuT87JcJbgSB1FCJ+W4KQhCQWSHvNIzhe6tBe8xguQyuUs+ejx7ifYKu6B7fRAEKaiK3qPpr37PgiCU4C4tAw9Fm7HtLBw1jOBJAAMxISn4iodRr6kZQ+tnCfn4/LaMCrVem8JFgEKEkQ1Gv+gDxpFMup7epFvDt+xO99TP5uBMf0o5vQersSsUX7WX4O3VPexmQRiPw9Az0nTGaXXVsN/fYPmTIS9ssM9FqQhs+zjExfgZ4Tp7D83x0rQdv1S6z3fgQUY8ZBvTKTs1yWW9fQcuSATyeSyTDg8Cn6ubm4ELYHd+n/JDghwSX6/By019X6qfwIRG3YjJC4BE5nUmLjX2d8OiZTe/U/aCrc8qkn4hJAcLik/Ukt9Hk5/ATkiSPRJ2sjp7P1TiXeHtxN66SDhyJa86G7G7JXwqlv9PmQWdF76WpOjObiItge3OEnQDThM+dANXcBC8BtaUNDdgY8ViuicwsgHTQEpgtnYTh93M9WOXselMnzWP6WyhtoOey/QogR5zIccOgE58Qjn8HV2orI9OVwWy2oX7bIL1Doz9MQkbaUFZzMjaZd+fA6nV9uQkYb3H8gYrbuZBm3lBTTAchSbTm0F5a/b3ZaescLHZp2bqNHNZfwTkJRiByxBcW+Dcd6+xbcFgvI0iPNZKoogywuHpJINSRKFchA+q/YHt6nR7LzzWvO4Lyf4HNr9aosKH74EQ2ZK3xDpnFjJqK3FPGCeuw2ejCZL53ntWEUgnZDel9YvIxeouYrFyFRqaAYPZYTnGRtrChDR/2LToMLqgCDQrpbHBaO1tJjCJ00BUF9Y+jLbTbD3WaCs/E17I+q6M2pKyKoAl0B7KotIfD4O5yChPKoJgROAmBPHqEQ32ZX2v0HE3IoVdoltm9L5Ou8jXKXovsPpwx3ckgNljo3iEANB4XhAT8tUdDCizoPvHUdjqC8+PLyDhL7X7pJoBxFTNpPAAAAAElFTkSuQmCC
// @match        *://*/*
// @grant        GM_addElement
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const Consts = Object.freeze({
    HIDE: "gm_hide_some",
    CUSTOM: "gm_custom_some",
    MSG_SOURCE: "GM_DEFINE_SOME_STYLE"
  });
  const App = {
    isTopWin: () => window === window.top,
    getCache: (key = location.host) => GM_getValue(key),
    setCache: (value, key = location.host) => GM_setValue(key, value),
    postMessage: (win, data) => win?.postMessage({ source: Consts.MSG_SOURCE, ...data }, "*"),
    setupMenuCmds() {
      if (!this.isTopWin()) return;
      [
        { title: "此站要隐藏的元素", key: void 0, fn: this.setHideStyle },
        { title: "此站自定义的样式", key: Consts.CUSTOM, fn: this.setCustomStyle }
      ].forEach(({ title, key, fn }) => {
        GM_registerMenuCommand(title, () => {
          const input = prompt(title, this.getCache(key));
          if (input !== null) fn.call(this, input);
        });
      });
    },
    setCustomStyle(style, setCache = true) {
      if (setCache) this.setCache(style, Consts.CUSTOM), this.syncDataToIFrames({ style });
      Promise.resolve().then(() => this.addStyle(Consts.CUSTOM, style));
    },
    setHideStyle(selector, setCache = true) {
      if (setCache) this.setCache(selector), this.syncDataToIFrames({ selector });
      const cssText = "width:0!important;height:0!important;opacity:0!important;display:none!important;";
      Promise.resolve().then(() => this.addStyle(Consts.HIDE, `${selector}{${cssText}}`));
    },
    addStyle(id, textContent) {
      document.querySelector(`#${id}`)?.remove();
      textContent && GM_addElement("style", { id, textContent });
      return this;
    },
    syncDataToIFrames(data) {
      const iFrames = document.querySelectorAll("iframe");
      iFrames.forEach((el) => this.postMessage(el?.contentWindow, data));
    },
    setupEventListener() {
      if (this.isTopWin()) return;
      window.addEventListener("message", ({ data }) => {
        if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
        if ("style" in data) this.setCustomStyle(data.style);
        if ("selector" in data) this.setHideStyle(data.selector);
      });
    },
    initStyle() {
      this.setHideStyle(this.getCache(), false);
      this.setCustomStyle(this.getCache(Consts.CUSTOM), false);
    },
    init() {
      this.initStyle();
      this.setupMenuCmds();
      this.setupEventListener();
    }
  };
  App.init();

})();