/**
 * 移除页面居中弹出的元素
 * 1、Cookies关闭弹窗
 * 2、居中弹出元素，前提：position: fixed;
 * (1)、isCenterByMarginAuto
 *      css样式为：top: 50%; margin: auto; transform: translateY(-50%);
 *
 * (2)、isByFiftyPercent
 *      css样式为：top: 50%; left: 50%; transform: translate(-50%, -50%);
 *
 * (3)、isCenterByTopLeft
 *      css样式为：top: 50%; width: 100%; transform: translateY(-50%);
 *      但`style.top`和`style.width`，得到的是`px`值。
 *
 *      css样式为：top: 50%; left: 50%; transform: translate(-50%, -50%);
 *      css与`(2)`相同，但`style.top`和`style.left`，得到的是`px`值。
 *      如：winW=1000和winH=800，若top=500和left=400，则为居中弹出元素。
 *
 * (4)、isCenterByCenterPoint
 *      元素的中心点与窗口的中心点重合，且不是全屏状态。
 *
 * (5)、isCenterByElementRect
 *      元素的中心点在窗口的`[20%, 80%]`范围内，且不是全屏状态。
 */
import "./style.css";

const App = {
  setCookies: function () {
    try {
      const popup = { tips: "ok", read: true, ecPopup: 1, showBtn: "true", tip_tongzhi815: "true" };
      Object.entries(popup).map(([k, v]) => Cookies.set(k, v, { path: "/" }));
    } catch (e) {}
  },
  findPopupElement: function () {
    // 只获取body的前5层子元素
    const selectors = Array.from({ length: 5 }, (_, i) => {
      return `body${" > *".repeat(i + 1)}`;
    }).join(", ");

    document.querySelectorAll(selectors).forEach((ele) => this.removeCenterFixedElement(ele));
  },
  removeCenterFixedElement(element) {
    const { position, display } = this.getElementInfo(element);
    if (position !== "fixed" || display === "none") return;

    const isByTopLeft = this.isCenterByTopLeft(element);
    const isByMarginAuto = this.isCenterByMarginAuto(element);
    const isByCenterPoint = this.isCenterByCenterPoint(element);
    const isByElementRect = this.isCenterByElementRect(element);
    const isByFiftyPercent = this.isCenterByFiftyPercent(element);
    if (isByMarginAuto || isByFiftyPercent || isByTopLeft || isByCenterPoint || isByElementRect) {
      console.log("获取到弹窗元素", element);
      this.removeMaskElement(element);
      element?.remove();
    }

    // 遮罩元素
    const mask = this.getMaskElement(element);
    if (!mask || mask instanceof HTMLIFrameElement || mask instanceof HTMLVideoElement) return;
    if (!mask?.hasChildNodes()) return mask?.remove();

    // 居中元素在遮罩元素的内部
    const centerEles = [];
    for (const ele of mask.children) {
      const isInRect = this.isCenterByElementRect(ele);
      if (isInRect) centerEles.push(ele);
    }

    if (!centerEles.length) return;
    centerEles.forEach((ele) => ele.remove());
    mask.remove();
  },
  removeMaskElement(element) {
    const parent = element.parentElement;
    if (!parent) return;
    const siblings = parent.children;
    for (const ele of siblings) {
      if (!this.getMaskElement(ele)) continue;
      console.log("获取到弹窗遮罩层", ele);
      ele?.remove();
    }
  },
  getMaskElement(ele) {
    const isFullscreen = this.isFullscreenElement(ele);
    const { position, display } = this.getElementInfo(ele);
    if (position !== "fixed" || display === "none" || !isFullscreen) return null;
    return ele;
  },
  isCenterByMarginAuto(ele) {
    const { top, margin } = this.getElementInfo(ele);
    return top === "50%" && margin === "auto";
  },
  isCenterByFiftyPercent(ele) {
    const { top, left } = this.getElementInfo(ele);
    return top === "50%" && left === "50%";
  },
  isCenterByTopLeft(ele) {
    const { winHalfWidth, winHalfHeight } = this.getWinHalfInfo();
    const { topInt, leftInt, offsetWidth } = this.getElementInfo(ele);
    return (winHalfWidth === leftInt || innerWidth === offsetWidth) && winHalfHeight === topInt;
  },
  isCenterByCenterPoint(ele) {
    const { winHalfWidth, winHalfHeight } = this.getWinHalfInfo();
    const { topInt, leftInt, offsetWidth, offsetHeight } = this.getElementInfo(ele);
    const centerX = leftInt + offsetWidth / 2 === winHalfWidth;
    const centerY = topInt + offsetHeight / 2 === winHalfHeight;
    return centerX && centerY && !this.isFullscreenElement(ele);
  },
  isCenterByElementRect(ele) {
    const { centerX, centerY } = this.getElementCenterPoint(ele);
    const isWithinHorizontalRange = centerX > innerWidth * 0.2 && centerX < innerWidth * 0.8;
    const isWithinVerticalRange = centerY > innerHeight * 0.2 && centerY < innerHeight * 0.8;
    return isWithinHorizontalRange && isWithinVerticalRange && !this.isFullscreenElement(ele);
  },
  isFullscreenElement(ele) {
    const fullPercent = "100%";
    const { width, height, offsetWidth, offsetHeight } = this.getElementInfo(ele);
    const isNumericalFullscreen = offsetWidth >= innerWidth && offsetHeight >= innerHeight;
    const isPercentFullscreen = width === fullPercent && height === fullPercent;
    const isFullscreen = width === "100w" && height === "100vh";
    return isFullscreen || isNumericalFullscreen || isPercentFullscreen;
  },
  getElementCenterPoint(element) {
    const { top, left, width, height } = element?.getBoundingClientRect();
    return { centerX: left + width / 2, centerY: top + height / 2 };
  },
  getWinHalfInfo() {
    return { winHalfWidth: Math.floor(innerWidth / 2), winHalfHeight: Math.floor(innerHeight / 2) };
  },
  getElementInfo(ele) {
    const style = getComputedStyle(ele);
    const offsetWidth = ele.offsetWidth;
    const offsetHeight = ele.offsetHeight;
    const top = style.getPropertyValue("top");
    const left = style.getPropertyValue("left");
    const width = style.getPropertyValue("width");
    const height = style.getPropertyValue("height");
    const margin = style.getPropertyValue("margin");
    const display = style.getPropertyValue("display");
    const position = style.getPropertyValue("position");
    const topInt = parseInt(top);
    const leftInt = parseInt(left);
    return { top, left, topInt, leftInt, width, height, margin, position, display, offsetWidth, offsetHeight };
  },
  mutationObserver() {
    const observer = (this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length === 0) return;
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          this.removeCenterFixedElement(node);
        });
      });
    }));
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    setTimeout(() => observer?.disconnect(), 5000);
  },
  init: function () {
    this.setCookies();
    this.mutationObserver();
    document.addEventListener("DOMContentLoaded", () => this.findPopupElement());
    window.addEventListener("load", () => {
      this.observer?.disconnect();
      this.findPopupElement();
    });
  },
};

App.init();
