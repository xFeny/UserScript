// ==UserScript==
// @name         关闭影视动漫网站的公告弹窗
// @namespace    Violentmonkey Scripts
// @version      0.5.6
// @author       Feny
// @description  自动关闭动漫网站的公告弹窗，支持的站点有：anfuns、次元方舟、Animoe动漫、漫次元、MuteFun、girigiri爱动漫、咕咕番、AcFuns、NyaFun、橘子动漫、acgNya等
// @license      MIT
// @icon         data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAICAgACAgIAAwMDAAoKCgAAAABZAAAAwgAAAIsAAAAWAAAAAAAAAAAAAAAAAAAAAAICAgABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAABnAAAAxQAAAH8AAAAOAQEBAAEBAQAGBgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFBQICAicDAwM6AQEBSQAAANIAAAD+AAAA7gAAAHgAAAA8AAAAPAAAADwAAAA8AgICPAEBATwAAAA8AAAAPAAAADwAAAA8AAAATwAAAN4AAAD+AAAA6gEBAWgBAQE7AQEBLAoKCgsAAAAAAAAAAAAAAAAAAAAAAQEBAAAAABEAAAByAAAAwQAAAN8AAADmAAAA+wAAAP8AAAD+AAAA7QAAAOIAAADiAAAA4gAAAOIBAQHiAAAA4gAAAOIAAADiAAAA4gAAAOIAAADmAAAA/QAAAP8AAAD+AAAA6gAAAOEAAADKAQEBhAAAAB8AAAAAAAAAAAAAAAABAQEIAAAAgwAAAPIICAj/ISEh/zo6Ov9AQED/PDw8/zw8PP88PDz/Ozs7/zs7O/87Ozv/PDw8/0BAQP88PDz/Ozs7/zs7O/88PDz/PDw8/zw8PP88PDz/PDw8/zw8PP8+Pj7/KSkp/wgICP8BAQH4AAAAmwAAABgHBwcAAAAAAAICAkYAAADjEBAQ/3BwcP/Ozs7/3Nzc/9/f3//d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3t7e/97e3v/d3d3/3d3d/93d3f/d3d3/3d3d/93d3f/d3d3/3Nzc/97e3v/T09P/k5OT/yIiIv8AAAD0AQEBXQQEBAMAAAAAAgICkgkJCfxiYmL/7u7u////////////////////////////////////////////////////////////+fn5///////////////////////////////////////////////////////5+fn/i4uL/woKCv8AAACsAAAADwAAAAAICAi2FBQU/6ysrP/////////////////////////////////+/v7//v7+//7+/v/+/v7///////v7+/+wsLD/1dXV/////////////////////////////v7+//7+/v/+/v7//v7+///////AwMD/Kioq/wAAANYAAAAcAAAAAAAAAL8WFhb/vb29//z8/P///////////////////////v7+//39/f/+/v7//v7+//7+/v//////9PT0/0tLS/+enp7//v7+/////////////v7+//7+/v/+/v7//v7+//7+/v/+/v7//////8/Pz/81NTX/AAAA4AAAACIAAAAAAgICvxUVFf/AwMD//f39///////////////////////8/Pz/+/v7//39/f///////f39//39/f/q6ur/Pj4+/7Kysv/+/v7////////////9/f3//f39//39/f/8/Pz//v7+//7+/v//////y8vL/zAwMP8AAADgAAAAIgAAAAAEBAS/FBQU/8LCwv////////////////////////////7+/v/+/v7/+/v7//r6+v/9/f3//f39/+Dg4P86Ojr/w8PD//////////////////n5+f/7+/v//f39//z8/P/+/v7//v7+///////Ly8v/Ly8v/wAAAOAAAAAiAAAAAAMDA78UFBT/wsLC//////////////////39/f/u7u7/9/f3///////+/v7/9/f3/97e3v/19fX/zs7O/zk5Of/S0tL//v7+//7+/v/8/Pz/wcHB/729vf/+/v7//f39//7+/v/+/v7//////8zMzP8vLy//AAAA4AAAACIAAAAAAwMDvxQUFP/CwsL/////////////////6Ojo/25ubv/Dw8P///////39/f/c3Nz/WVlZ/8HBwf/BwcH/SkpK/97e3v/+/v7//f39//r6+v9oaGj/bW1t//39/f/+/v7/////////////////zMzM/zAwMP8AAADgAAAAIgAAAAADAwO/FBQU/8LCwv/////////////////j4+P/Pj4+/56env///////v7+/+zs7P+jo6P/3t7e/+Dg4P+srKz/7+/v///////+/v7/+/v7/2dnZ/9VVVX/+Pj4///////////////////////MzMz/MTEx/wAAAOAAAAAiAAAAAAMDA78UFBT/wsLC/////////////////93d3f8fHx//fn5+//z8/P/////////////////+/v7//Pz8//7+/v/8/Pz///////39/f/x8fH/RkZG/zExMf/g4OD//////////////////////83Nzf8yMjL/AAAA4AAAACIAAAAAAwMDvxQUFP/CwsL//v7+///////39/f/r6+v/wwMDP8+Pj7/w8PD//39/f/8/Pz///////7+/v/8/Pz//f39//39/f/8/Pz/+/v7/7W1tf8rKyv/Ly8v/4aGhv/29vb/////////////////zMzM/zAwMP8AAADgAAAAIgAAAAADAwO/FBQU/8LCwv/6+vr/7u7u/7W1tf9KSkr/ZmZm/3l5ef9AQED/kZGR/+zs7P/8/Pz/////////////////+/v7/+Xl5f+qqqr/RERE/3x8fP+kpKT/ODg4/3p6ev/e3t7/+/v7///////MzMz/MDAw/wAAAOAAAAAiAAAAAAQEBL8UFBT/xsbG/8vLy/9SUlL/Ghoa/0xMTP/g4OD/6enp/2NjY/8eHh7/tLS0//z8/P/+/v7////////////n5+f/WVlZ/xQUFP9vb2//7e3t//j4+P+ampr/Hh4e/1ZWVv/t7e3//////87Ozv81NTX/AAAA4AEBASIAAAAAAwMDvxQUFP/ExMT/4ODg/5WVlf9eXl7/Ozs7/6+vr/+1tbX/Q0ND/3Jycv/Y2Nj/+/v7//////////////////Dw8P+SkpL/RkZG/1ZWVv/V1dX/xsbG/05OTv9GRkb/qamp//j4+P//////zc3N/zMzM/8AAADgAQEBIgAAAAABAQG/FxcX/8HBwf////////////Pz8/+Ojo7/NDQ0/0ZGRv+EhIT/9/f3///////////////////////////////////////c3Nz/WFhY/1hYWP9ISEj/Z2dn/97e3v/////////////////MzMz/MTEx/wAAAOAAAAAiAAAAAAAAAL4UFBT/vb29//z8/P/9/f3//////+Hh4f8qKir/Nzc3/9PT0////////////////////////////////////////f39//////+wsLD/Ghoa/0lJSf/k5OT//////////////////////8vLy/8wMDD/AQEB3wMDAyEAAAAAAAAAsAsLC/+VlZX/+/v7//7+/v//////6urq/0lJSf9paWn/8fHx///////////////////////////////////////+/v7//f39/8fHx/8tLS3/lpaW////////////////////////////ra2t/xoaGv8CAgLPBQUFGAAAAAAAAAB/BgYG+D09Pf/R0dH/9/f3//v7+//7+/v/4eHh/+jo6P//////////////////////////////////////////////////////8vLy/7i4uP/r6+v//////////////////v7+/93d3f9XV1f/AgIC/wEBAZgBAQELAAAAAAAAAC4EBATRCwsL/z8/P/+cnJz/tbW1/7Kysv+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/t7e3/7e3t/+3t7f/tbW1/7e3t/+3t7f/tra2/7W1tf+np6f/UFBQ/wMDA/8AAADkAQEBRAAAAAEAAAAAAAAAAwMDA1wHBwfaBwcH/wgICP8NDQ3/Dw8P/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8ODg7/Dg4O/w4ODv8MDAz/CgoK/wsLC/8AAAD/AAAA5wAAAHIAAAAMAAAAAAAAAAAAAAAAAAAABQEBAUYDAwORAgICsgEBAbUBAQG1AAAAtQAAALUAAAC2AAAA6AAAAP8AAADzAAAAxAAAALQAAAC0AAAAuwAAAOcAAAD/AAAA9QAAAMAAAAC0AAAAtQEBAbUCAgK1AAAAswAAAJsAAABVAAAADQAAAAAAAAAAAAAAAAAAAAABAQEABAQEAAEBAQwBAQEcBQUFHgMDAx4BAQEeAQEBIQAAAHYAAADrAAAA9AAAAJABAQEnAQEBHgEBAR4BAQEhAQEBZwAAAOMAAAD6AAAAnAEBASsCAgIeBQUFHgkJCR4CAgIdAAAAEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICAAEBAQAEBAQAAwMDAAAAAAIAAABRAAAA2AAAAPYAAACTAAAAFgEBAQABAQEAAQEBAAEBAQAAAAAHAAAAaQAAAOYAAADuAAAAegAAAAoEBAQABwcHAAICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAANoAAAD2AAAAlwAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAbQAAAOgAAADvAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAxgAAAJIAAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAbQAAAMoAAABsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAArAAAAFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAALwAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/D/wf8AAAA+AAAAHAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAADgAAAB+AAAB/+B4H//g/A//4P4P/+P/H///////////8=
// @homepage     https://github.com/xFeny/UserScript/tree/main/monkey-website-popup
// @match        *://dm84.tv/*
// @match        *://msousou.*
// @match        *://kimani.tv/*
// @match        *://cddys1.me/*
// @match        *://acgnya.com/*
// @match        *://animoe.org/*
// @match        *://tinaacg.net/*
// @match        *://www.aowu.tv/*
// @match        *://damkvq.wiki/*
// @match        *://*.*nyafun*.*/*
// @match        *://*.*anfuns*.*/*
// @match        *://*.*omofun*.*/*
// @match        *://www.qifun.cc/*
// @match        *://www.aafun.cc/*
// @match        *://www.cyfz.vip/*
// @match        *://dm1.xfdm.pro/*
// @match        *://www.jqqzx.me/*
// @match        *://www.zxzja.com/*
// @match        *://www.libvio.cc/*
// @match        *://*dytt8899.com/*
// @match        *://*.*yinghua*.*/*
// @match        *://www.gugu3.com/*
// @match        *://www.jzacg.com/*
// @match        *://www.mcydh.com/*
// @match        *://www.agedm.org/*
// @match        *://www.mutean.com/*
// @match        *://www.fsdm02.com/*
// @match        *://www.mgnacg.com/*
// @match        *://www.acfuns.net/*
// @match        *://dick.xfani.com/*
// @match        *://www.clicli.pro/*
// @match        *://www.voflix.fun/*
// @match        *://www.dushe9.app/*
// @match        *://www.akianime.cc/*
// @match        *://www.huazidm.com/*
// @match        *://xn--44qz85a01qpc.com/*
// @match        *://anime.girigirilove.com/*
// @require      https://unpkg.com/js-cookie@3.0.5/dist/js.cookie.min.js
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(" .mask,.modal,.popup,#notice,.box-bg,.pop-box,.shoutu-ad,.hl-pops-bg,.hl-poptips-wrap,section[no-account],.shortcuts-mobile-overlay{display:none!important} ");

(function () {
  'use strict';

  const App = {
    // 设置Cookies关闭弹窗
    setCookies: function() {
      try {
        Object.entries({
          tips: "ok",
          ecPopup: 1,
          showBtn: "true",
          tip_tongzhi815: "true"
        }).map(([k, v]) => Cookies.set(k, v, { path: "/" }));
      } catch (e) {
      }
      return this;
    },
    // 遍历页面所有元素
    findPopupElement: function() {
      document.querySelectorAll("body *").forEach(this.closeCenterFixedElement);
      return this;
    },
    // 通过判断元素是否为position: fixed且居中显示
    closeCenterFixedElement(el) {
      const halfWidth = Math.floor(window.innerWidth / 2);
      const halfHeight = Math.floor(window.innerHeight / 2);
      const style = getComputedStyle(el);
      const half = "50%";
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const top = style.getPropertyValue("top");
      const left = style.getPropertyValue("left");
      const position = style.getPropertyValue("position");
      const visibility = style.getPropertyValue("visibility");
      if (position !== "fixed" || visibility !== "visible") return;
      const tn = parseInt(top);
      const ln = parseInt(left);
      const isCenteredByFiftyPercent = top === half && left === half;
      const isCenteredByTopLeft = halfWidth === ln && halfHeight === tn;
      const isCenteredByCenterPoint = ln + width / 2 === halfWidth && tn + height / 2 === halfHeight;
      if (isCenteredByFiftyPercent || isCenteredByTopLeft || isCenteredByCenterPoint) {
        console.log("获取到弹窗元素", el);
        el.remove();
      }
      if (width === innerWidth && height === innerHeight) {
        console.log("获取到弹窗遮罩层", el);
        el.remove();
      }
    },
    mutationObserver() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length === 0) return;
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            this.closeCenterFixedElement(node);
          });
        });
      });
      observer.observe(document.body, { attributes: true, childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 1e4);
    },
    closePopup() {
      try {
        layer.closeAll();
      } catch (e) {
      }
      this.setCookies();
      this.findPopupElement();
      performance.now();
    },
    init: function() {
      this.closePopup();
      this.mutationObserver();
      window.addEventListener("load", () => this.closePopup());
      document.addEventListener("DOMContentLoaded", () => this.closePopup());
    }
  };
  App.init();

})();