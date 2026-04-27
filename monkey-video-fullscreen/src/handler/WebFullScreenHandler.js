import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Store from "../common/Store";

/**
 * 网页全屏逻辑处理
 * `@match`网站 通过点击自有图标的方式
 * 非`@match`网站 通过对视频容器父元素添加相关CSS的方式
 */
export default {
  toggleFullscreen() {
    if (!Tools.isTopWin() || Tools.isThrottle("_Full_")) return;
    document.exitFullscreen().catch(() => (this.enterWebFullscreen(), this.fsWrapper.requestFullscreen()));
  },
  toggleWebFullscreen(isTrusted) {
    if (this.isNoVideo() || Tools.isThrottle("_WebFull_")) return;
    if (this.isFullscreen && isTrusted) return document.exitFullscreen().catch(() => {}); // 由全屏切换到网页全屏
    this.fsWrapper ? this.exitWebFullscreen() : this.enterWebFullscreen();
    Tools.microTask(() => this.runFsChangeCode());
  },
  enterWebFullscreen() {
    if (this.fsWrapper) return;
    const container = (this.fsWrapper = this.getVideoHostContainer()); // video的宿主容器元素
    if (!container || container.matches(":is(html, body)")) return this.adaptToWebFullscreen();

    container.scrollY = window.scrollY;
    const parents = Tools.getParents(container);
    const threshold = Store.DETACH_THRESHOLD.get(this.host);

    // 超过阈值 + (不是`iframe` 或 有`moveBefore`方法) → 执行分离
    const detach = parents.length > threshold && (container.matches(":not(iframe)") || Tools.hasMoveBefore());
    detach ? this.detachForFullscreen() : parents.forEach((el) => this.setWebFullAttr(el));

    // 视频容器宽高适应网页全屏变化
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

    // 临时禁用平滑滚动：为了确保接下来的滚动操作是瞬间完成的（无动画）
    Tools.setStyle(this.docEle, "scroll-behavior", "auto", "important");

    Tools.querys(`[${Consts.webFull}]`).forEach((el) => Tools.attr(el, Consts.webFull));
    this.fsParent?.[Tools.hasMoveBefore() ? "moveBefore" : "insertBefore"](this.fsWrapper, this.fsNext); // 还原

    // 滚动到全屏前位置、恢复默认滚动效果
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
    // 自定义网页全屏元素，支持多个选择器，返回第一个找到的元素
    const selector = Store.V_WRAPPER.get(this.topWin?.host)?.trim();
    const ctn = selector ? (this.player.closest(selector) ?? Tools.query(selector)) : null;
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
  videoParents: new Set(),
  findVideoContainer(container, max = 4, track = true) {
    container ??= Tools.getParent(this.player);
    if (!container.offsetHeight) container = Tools.getParent(container); // Youtube 存在这样的问题
    const { offsetWidth: cw, offsetHeight: ch } = container;
    if (track) this.videoParents.clear(); // 仅网页全屏时

    // 循环向上查找与初始元素宽高相等的父元素
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
      if (!this.fsWrapper.contains(el)) return; // 元素不在全屏容器内，跳过
      const { offsetWidth: width, offsetHeight: height } = this.player;
      if (width === vw && height === vh && el.offsetHeight === vh) return; // 宽高已匹配，无需适配
      this.setWebFullAttr(el);
    });
  },
  setWebFullAttr(el) {
    const sroot = el.getRootNode();
    Tools.attr(el, Consts.webFull, true);
    if (Tools.isExecuted("__Added__", sroot)) return;
    if (sroot instanceof ShadowRoot) Tools.emitEvent("addStyle", { sroot });
  },
  runFsChangeCode() {
    // 连续触发只执行最后一次
    clearTimeout(this.e9x_fsCode);
    this.e9x_fsCode = setTimeout(() => {
      const jsCode = Store.FS_CODE.get(this.topWin.host);
      this.executeCodeSnippet(jsCode, this.getFsMode(), this.player);
    }, 10);
  },
  getFsMode(tol = 5) {
    const { topWin, fsWrapper } = this;
    const { width, height } = window.screen;
    const { offsetWidth: ew = 0, offsetHeight: eh = 0 } = fsWrapper ?? {};

    const isWFs = Math.abs(ew - topWin.vw) < tol && Math.abs(eh - topWin.vh) < tol;
    const isFs = Math.abs(ew - width) < tol && Math.abs(eh - height) < tol;
    return isFs ? "isFull" : isWFs ? "isWFull" : "default";
  },
  executeCodeSnippet(jsCode, type, video) {
    try {
      if (!jsCode) return;
      const code = `(async () => { ${jsCode} })()`;
      const args = ["type", "video", "Tools", "unsafeWindow"];
      const handler = (this.codeSnippetCache ??= new Function(...args, code));
      handler(type, video, Tools, unsafeWindow);
    } catch (e) {
      const unsafe = e.message.includes("unsafe-eval");
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
          }, { once: true });
        })();
        `;

    Tools.query(`#${evt}`)?.remove();
    GM_addElement("script", { id: evt, textContent: injectCode, type: "text/javascript" });
    Tools.emitEvent(evt, { type, video, Tools, unsafeWindow });
  },
};
