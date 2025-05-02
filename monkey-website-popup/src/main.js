import "./style.css";

const App = {
  // 设置Cookies关闭弹窗
  setCookies: function () {
    try {
      Object.entries({
        tips: "ok",
        ecPopup: 1,
        showBtn: "true",
        tip_tongzhi815: "true",
      }).map(([k, v]) => Cookies.set(k, v, { path: "/" }));
    } catch (e) {}
    return this;
  },
  // 遍历页面所有元素
  findPopupElement: function () {
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
    // 是否居中显示
    const tn = parseInt(top);
    const ln = parseInt(left);
    // 判断元素是否通过 top 和 left 为 50% 来实现居中
    const isCenteredByFiftyPercent = top === half && left === half;
    // 判断元素的左上角是否位于窗口中心
    const isCenteredByTopLeft = halfWidth === ln && halfHeight === tn;
    // 判断元素的中心点是否位于窗口中心
    const isCenteredByCenterPoint = ln + width / 2 === halfWidth && tn + height / 2 === halfHeight;
    if (isCenteredByFiftyPercent || isCenteredByTopLeft || isCenteredByCenterPoint) {
      console.log("获取到弹窗元素", el);
      el.remove();
    }

    // 是否铺满整个页面
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
    setTimeout(() => observer.disconnect(), 10000);
  },
  closePopup() {
    try {
      layer.closeAll();
    } catch (e) {}
    // const start = performance.now();
    this.setCookies();
    this.findPopupElement();
    const end = performance.now();
    // console.log("执行耗时：", end - start);
  },
  init: function () {
    this.closePopup();
    this.mutationObserver();
    window.addEventListener("load", () => this.closePopup());
    document.addEventListener("DOMContentLoaded", () => this.closePopup());
  },
};

App.init();
