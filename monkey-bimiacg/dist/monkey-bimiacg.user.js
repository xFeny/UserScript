// ==UserScript==
// @name         M站_哔咪动漫脚本
// @namespace    http://tampermonkey.net/
// @version      1.1.5
// @author       Feny
// @description  哔咪动漫｜E站弹幕网｜饭团动漫｜噼哩噼哩，播放页自动网页全屏，快捷键(F)切换。
// @license      MIT
// @icon         data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAICAgACAgIAAwMDAAoKCgAAAABZAAAAwgAAAIsAAAAWAAAAAAAAAAAAAAAAAAAAAAICAgABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAABnAAAAxQAAAH8AAAAOAQEBAAEBAQAGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFBQICAicDAwM6AQEBSQAAANIAAAD+AAAA7gAAAHgAAAA8AAAAPAAAADwAAAA8AgICPAEBATwAAAA8AAAAPAAAADwAAAA8AAAATwAAAN4AAAD+AAAA6gEBAWgBAQE7AQEBLAoKCgsAAAAAAAAAAAAAAAAAAAAAAQEBAAAAABEAAAByAAAAwQAAAN8AAADmAAAA+wAAAP8AAAD+AAAA7QAAAOIAAADiAAAA4gAAAOIBAQHiAAAA4gAAAOIAAADiAAAA4gAAAOIAAADmAAAA/QAAAP8AAAD+AAAA6gAAAOEAAADKAQEBhAAAAB8AAAAAAAAAAAAAAAABAQEIAAAAgwAAAPIICAj/ISEh/zo6Ov9AQED/PDw8/zw8PP88PDz/Ozs7/zs7O/87Ozv/PDw8/0BAQP88PDz/Ozs7/zs7O/88PDz/PDw8/zw8PP88PDz/PDw8/zw8PP8+Pj7/KSkp/wgICP8BAQH4AAAAmwAAABgHBwcAAAAAAAICAkYAAADjEBAQ/3BwcP/Ozs7/3Nzc/9/f3//d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3t7e/97e3v/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3Nzc/97e3v/T09P/k5OT/yIiIv8AAAD0AQEBXQQEBAMAAAAAAgICkgkJCfxiYmL/7u7u////////////////////////////////////////////////////////////+fn5///////////////////////////////////////////////////////5+fn/i4uL/woKCv8AAACsAAAADwAAAAAICAi2FBQU/6ysrP/////////////////////////////////+/v7//v7+//7+/v/+/v7///////v7+/+wsLD/1dXV/////////////////////////////v7+//7+/v/+/v7//v7+///////AwMD/Kioq/wAAANYAAAAcAAAAAAAAAL8WFhb/vb29//z8/P///////////////////////v7+//39/f/+/v7//v7+//7+/v//////9PT0/0tLS/+enp7//v7+/////////////v7+//7+/v/+/v7//v7+//7+/v/+/v7//////8/Pz/81NTX/AAAA4AAAACIAAAAAAgICvxUVFf/AwMD//f39///////////////////////8/Pz/+/v7//39/f///////f39//39/f/q6ur/Pj4+/7Kysv/+/v7////////////9/f3//f39//39/f/8/Pz//v7+//7+/v//////y8vL/zAwMP8AAADgAAAAIgAAAAAEBAS/FBQU/8LCwv////////////////////////////7+/v/+/v7/+/v7//r6+v/9/f3//f39/+Dg4P86Ojr/w8PD//////////////////n5+f/7+/v//f39//z8/P/+/v7//v7+///////Ly8v/Ly8v/wAAAOAAAAAiAAAAAAMDA78UFBT/wsLC//////////////////39/f/u7u7/9/f3///////+/v7/9/f3/97e3v/19fX/zs7O/zk5Of/S0tL//v7+//7+/v/8/Pz/wcHB/729vf/+/v7//f39//7+/v/+/v7//////8zMzP8vLy//AAAA4AAAACIAAAAAAwMDvxQUFP/CwsL/////////////////6Ojo/25ubv/Dw8P///////39/f/c3Nz/WVlZ/8HBwf/BwcH/SkpK/97e3v/+/v7//f39//r6+v9oaGj/bW1t//39/f/+/v7/////////////////zMzM/zAwMP8AAADgAAAAIgAAAAADAwO/FBQU/8LCwv/////////////////j4+P/Pj4+/56env///////v7+/+zs7P+jo6P/3t7e/+Dg4P+srKz/7+/v///////+/v7/+/v7/2dnZ/9VVVX/+Pj4///////////////////////MzMz/MTEx/wAAAOAAAAAiAAAAAAMDA78UFBT/wsLC/////////////////93d3f8fHx//fn5+//z8/P/////////////////+/v7//Pz8//7+/v/8/Pz///////39/f/x8fH/RkZG/zExMf/g4OD//////////////////////83Nzf8yMjL/AAAA4AAAACIAAAAAAwMDvxQUFP/CwsL//v7+///////39/f/r6+v/wwMDP8+Pj7/w8PD//39/f/8/Pz///////7+/v/8/Pz//f39//39/f/8/Pz/+/v7/7W1tf8rKyv/Ly8v/4aGhv/29vb/////////////////zMzM/zAwMP8AAADgAAAAIgAAAAADAwO/FBQU/8LCwv/6+vr/7u7u/7W1tf9KSkr/ZmZm/3l5ef9AQED/kZGR/+zs7P/8/Pz/////////////////+/v7/+Xl5f+qqqr/RERE/3x8fP+kpKT/ODg4/3p6ev/e3t7/+/v7///////MzMz/MDAw/wAAAOAAAAAiAAAAAAQEBL8UFBT/xsbG/8vLy/9SUlL/Ghoa/0xMTP/g4OD/6enp/2NjY/8eHh7/tLS0//z8/P/+/v7////////////n5+f/WVlZ/xQUFP9vb2//7e3t//j4+P+ampr/Hh4e/1ZWVv/t7e3//////87Ozv81NTX/AAAA4AEBASIAAAAAAwMDvxQUFP/ExMT/4ODg/5WVlf9eXl7/Ozs7/6+vr/+1tbX/Q0ND/3Jycv/Y2Nj/+/v7//////////////////Dw8P+SkpL/RkZG/1ZWVv/V1dX/xsbG/05OTv9GRkb/qamp//j4+P//////zc3N/zMzM/8AAADgAQEBIgAAAAABAQG/FxcX/8HBwf////////////Pz8/+Ojo7/NDQ0/0ZGRv+EhIT/9/f3///////////////////////////////////////c3Nz/WFhY/1hYWP9ISEj/Z2dn/97e3v/////////////////MzMz/MTEx/wAAAOAAAAAiAAAAAAAAAL4UFBT/vb29//z8/P/9/f3//////+Hh4f8qKir/Nzc3/9PT0////////////////////////////////////////f39//////+wsLD/Ghoa/0lJSf/k5OT//////////////////////8vLy/8wMDD/AQEB3wMDAyEAAAAAAAAAsAsLC/+VlZX/+/v7//7+/v//////6urq/0lJSf9paWn/8fHx///////////////////////////////////////+/v7//f39/8fHx/8tLS3/lpaW////////////////////////////ra2t/xoaGv8CAgLPBQUFGAAAAAAAAAB/BgYG+D09Pf/R0dH/9/f3//v7+//7+/v/4eHh/+jo6P//////////////////////////////////////////////////////8vLy/7i4uP/r6+v//////////////////v7+/93d3f9XV1f/AgIC/wEBAZgBAQELAAAAAAAAAC4EBATRCwsL/z8/P/+cnJz/tbW1/7Kysv+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/tbW1/7e3t/+3t7f/tra2/7W1tf+np6f/UFBQ/wMDA/8AAADkAQEBRAAAAAEAAAAAAAAAAwMDA1wHBwfaBwcH/wgICP8NDQ3/Dw8P/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8MDAz/CgoK/wsLC/8AAAD/AAAA5wAAAHIAAAAMAAAAAAAAAAAAAAAAAAAABQEBAUYDAwORAgICsgEBAbUBAQG1AAAAtQAAALUAAAC2AAAA6AAAAP8AAADzAAAAxAAAALQAAAC0AAAAuwAAAOcAAAD/AAAA9QAAAMAAAAC0AAAAtQEBAbUCAgK1AAAAswAAAJsAAABVAAAADQAAAAAAAAAAAAAAAAAAAAABAQEABAQEAAEBAQwBAQEcBQUFHgMDAx4BAQEeAQEBIQAAAHYAAADrAAAA9AAAAJABAQEnAQEBHgEBAR4BAQEhAQEBZwAAAOMAAAD6AAAAnAEBASsCAgIeBQUFHgkJCR4CAgIdAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICAAEBAQAEBAQAAwMDAAAAAAIAAABRAAAA2AAAAPYAAACTAAAAFgEBAQABAQEAAQEBAAEBAQAAAAAHAAAAaQAAAOYAAADuAAAAegAAAAoEBAQABwcHAAICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAANoAAAD2AAAAlwAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAbQAAAOgAAADvAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAxgAAAJIAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAbQAAAMoAAABsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAArAAAAFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAALwAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/D/wf8AAAA+AAAAHAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAADgAAAB+AAAB/+B4H//g/A//4P4P/+P/H///////////8=
// @homepage     https://github.com/xFeny/UserScript/monkey-bimiacg
// @match        *://*bimiacg*.net/
// @match        *://ppoft.com/play*
// @match        *://acgfta.com/play*
// @match        *://svip.ffzyplay.com/*
// @match        *://jiexi.modujx01.com/*
// @match        *://*bimiacg*.net/*/play*
// @match        *://player.ezdmw.com/danmuku/*
// @match        *://www.ezdmw.site/Index/video/*
// @match        *://*.pilipili*.*/index.php/vod/play/id/*
// @grant        GM_addStyle
// @grant        GM_openInTab
// @run-at       document-body
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const n=document.createElement("style");n.textContent=t,document.head.append(n)})(" .MacPlayer{border-radius:0!important}#player_iframe{background:#000!important}.webFullScreen{top:0!important;left:0!important;width:100vw!important;height:100vh!important;position:fixed!important;z-index:2147483646!important;margin:0!important;padding:0!important}#zhuXian a{font-size:12px!important;margin:0!important}.nav-area{margin-bottom:20px}#bkcl,.ABP-Text,.tuiguang,.play-full,.login-box,.line_button2,.newhd:first-child{display:none!important} ");

(function () {
  'use strict';

  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  function getTitle() {
    let title = document.title;
    title = title.substring(0, title.lastIndexOf("|")).trim();
    title = title.substring(0, title.lastIndexOf(" ")).trim();
    return title;
  }
  const settings = { volume: 1, opacity: 0.88, autoPlay: true, defaultWide: true };
  const MSG_SOURCE = "FENY_SCRIPTS_ANIME";
  const App = {
    init() {
      this.videoSetting();
      this.setupMutationObserver();
      this.setupKeydownListener();
    },
    setupMutationObserver() {
      const observer = new MutationObserver(() => {
        this.autoPlay();
        const ok = this.webFullScreen();
        if (ok || this.video) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 1e4);
    },
    query: (selector, context) => (context || document).querySelector(selector),
    querys: (selector, context) => (context || document).querySelectorAll(selector),
    isPili: () => location.host.includes("pili"),
    isFanTuan: () => location.host.includes("ft"),
    isEzSite: () => location.host.includes("ezdmw"),
    isBimi: () => location.host.includes("bimiacg"),
    getFrame() {
      return this.query("iframe:not([src=''])");
    },
    postMessage: (data) => parent?.postMessage({ source: MSG_SOURCE, ...data }, "*"),
    autoPlay() {
      if (this.isBimi()) return;
      this.video = this.query("video");
      if (!this.video) return;
      this.video.addEventListener("canplay", () => {
        this.video.play().catch(() => this.postMessage({ reloadFrame: true }));
      });
    },
    reloadVideoFrame() {
      if (this.isReloaded) return;
      const frame = this.getFrame();
      frame.src = frame.src;
      this.webFullScreen();
      this.isReloaded = true;
    },
    webFullScreen() {
      if (location.pathname === "/") return true;
      this.query(".line_button2")?.remove();
      const frame = this.getFrame();
      if (!frame) return false;
      frame.setAttribute("allow", "autoplay");
      frame.addEventListener("load", () => this.toggleClass());
      return true;
    },
    videoSetting() {
      settings.theme = this.isBimi() ? "bilibili" : "YouTube";
      const storage = JSON.parse(localStorage.getItem("html5Settings"));
      localStorage.setItem("html5Settings", JSON.stringify(Object.assign({}, storage, settings)));
    },
    setupKeydownListener() {
      window.addEventListener("keydown", (event) => {
        const hotKey = event.key.toUpperCase();
        const tagName = event.target.tagName;
        if (["INPUT", "TEXTAREA"].includes(tagName)) return;
        if (window.top !== window) return this.postMessage({ hotKey }, "*");
        this.execHotKeyActions(hotKey);
      });
      window.addEventListener("message", (event) => {
        const { data } = event;
        if (!data?.source) return;
        if (!data.source.includes(MSG_SOURCE)) return;
        if (data?.reloadFrame) return this.reloadVideoFrame();
        if (data?.hotKey) this.execHotKeyActions(data.hotKey);
      });
    },
    execHotKeyActions(key) {
      const actions = this.getKeyMapping();
      if (actions[key]) actions[key]();
    },
    getKeyMapping() {
      return {
        F: () => {
          this.toggleClass();
          const player = this.query(":is(.player, .ty-play)");
          window.scrollTo({ top: player?.getBoundingClientRect().top || 0 });
        },
        "[": () => {
          if (this.isBimi()) return this.query(".pre")?.click();
          const episode = this.query(`a[href="${location.pathname}"]`);
          if (this.isEzSite()) return episode?.nextElementSibling.click();
          episode?.previousElementSibling.click();
        },
        "]": () => {
          if (this.isBimi()) return this.query(".next")?.click();
          const episode = this.query(`a[href="${location.pathname}"]`);
          if (this.isEzSite()) return episode?.previousElementSibling.click();
          episode?.nextElementSibling.click();
        },
        T: () => {
          if (this.isEzSite()) {
            const routes = Array.from(this.querys("div[class*='line_button']"));
            const currRoute = this.query("div[class*='line_button'][style*='rgb']");
            routes.find((route) => route !== currRoute)?.click();
          }
          if (this.isPili()) {
            const routes = Array.from(this.querys(".c-player-episode ul"));
            const currEpisode = this.query(`a[class*="current"][href="${location.pathname}"]`);
            const currRouteIndex = routes.findIndex((route) => route === currEpisode.parentElement);
            let nextRouteIndex = currRouteIndex + 1;
            if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
            const currEpisodeIndex = this.index(currEpisode);
            const episodes = routes[nextRouteIndex]?.querySelectorAll("a");
            episodes[currEpisodeIndex]?.click();
          }
          if (this.isFanTuan()) {
            try {
              const currRoute = this.query(".anime-episode.active");
              let nextRoute = currRoute?.nextElementSibling;
              if (!nextRoute) nextRoute = currRoute.parentElement.firstElementChild;
              const index = this.index(this.query("a[class*='btn-episode active']"));
              nextRoute.children[index].click();
            } catch (e) {
            }
          }
          if (this.isBimi()) {
            try {
              const routes = Array.from(this.querys(".play_box"));
              const currRouteIndex = routes.findIndex((route) => route.classList.contains("show"));
              let nextRouteIndex = currRouteIndex + 1;
              if (nextRouteIndex >= routes.length) nextRouteIndex = 0;
              const currEpisode = this.query(`a[href="${location.pathname}"]`)?.parentElement;
              const currEpisodeIndex = this.index(currEpisode);
              const episodes = routes[nextRouteIndex]?.querySelectorAll("li");
              episodes[currEpisodeIndex]?.firstElementChild?.click();
            } catch (e) {
            }
          }
        },
        V: () => {
          if (!this.isBimi()) return;
          _GM_openInTab(`https://www.ezdmw.site/Index/search.html?searchText=${getTitle()}`);
        }
      };
    },
    index(element) {
      if (!element) return;
      const parent2 = element.parentNode;
      if (!parent2) return -1;
      const children = Array.from(parent2.children);
      return children.indexOf(element);
    },
    toggleClass() {
      const selector = "webFullScreen";
      this.getFrame()?.classList.toggle(selector);
      this.query(".MacPlayer")?.classList.toggle(selector);
    }
  };
  App.init();

})();