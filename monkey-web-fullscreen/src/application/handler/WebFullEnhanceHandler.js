import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance")) return;
    // 退出网页全屏
    if (this.webFullWrap) return this.exitWebFull();

    const wrap = this.getVideoHostContainer();
    if (!wrap || wrap.matches(":is(html, body)")) return;

    // 进入网页全屏
    this.webFullWrap = wrap;
    wrap.ctrl = wrap.ctrl ?? wrap?.controls;
    wrap.top = wrap.top ?? wrap.getBoundingClientRect()?.top ?? 0;
    wrap.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    Tools.getParents(wrap, true)?.forEach((el) => (Tools.addCls(el, Consts.webFull), Tools.setPart(el, Consts.webFull)));
    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.addCls(el, "__flex-1"));

    // video特殊处理
    if (this.player) Tools.setPart(this.player, Consts.videoPart);
    if (wrap.matches("video") && Tools.hasCls(wrap, Consts.webFull)) wrap.controls = true;
  },
  exitWebFull() {
    const wrap = this.webFullWrap;
    if (this.player) Tools.delPart(this.player, Consts.videoPart);
    if (wrap.matches("video")) wrap.controls = wrap.ctrl;

    Tools.getParents(this.player, false, 3)?.forEach((el) => Tools.delCls(el, "__flex-1"));
    Tools.querys(`.${Consts.webFull}`).forEach((el) => (Tools.delCls(el, Consts.webFull), Tools.delPart(el, Consts.webFull)));
    Tools.scrollTop((Tools.getElementRect(wrap)?.top < 0 ? wrap?.top + wrap.scrollY : wrap?.top) - 120);
    this.webFullWrap = null;
  },
  getVideoHostContainer() {
    if (this.player) return this.getVideoWrapper();

    const videoIFrame = this.getVideoIFrame();
    if (videoIFrame) return videoIFrame;

    const ifrs = Tools.getIFrames();
    const { centerX, centerY } = this?.videoInfo ?? {};
    return ifrs.length <= 1 ? ifrs[0] : ifrs.find((el) => Tools.isVisible(el) && Tools.pointInElement(centerX, centerY, el));
  },
  getVideoIFrame() {
    if (!this?.videoInfo?.iframeSrc) return null;

    const { pathname, search } = new URL(this.videoInfo.iframeSrc);
    const decoded = decodeURI(search); // 先解码得到实际字符串
    const partial = decoded.slice(0, decoded.length * 0.8);
    return Tools.query(`iframe[src*="${pathname + partial}"]`);
  },
  getVideoWrapper() {
    const ctrlParent = this.findVideoCtrlBarParent();
    return ctrlParent ? this.findVideoContainer(ctrlParent) : this.findVideoContainer();
  },
  findVideoCtrlBarParent() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"], [class*="progress"]`;
    const ctrlParent = Tools.findParentWithChild(this.player, ctrl);
    const { centerX, centerY } = Tools.getCenterPoint(ctrlParent);
    return Tools.pointInElement(centerX, centerY, this.player) ? ctrlParent : null;
  },
  findVideoContainer(container, maxLevel = 5) {
    const video = this.player;
    container = container ?? video;
    const regex = /^\d+(\.\d+)?(%|px|em|rem)$/;
    const { width: videoWidth, height: videoHeight } = Tools.getElementRect(container);

    for (let parent = container, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const { width, height } = Tools.getElementRect(parent);

      // 检查元素是否通过style属性显式设置了单位宽高
      const hasExplicitWidth = regex.test(parent.style.width);
      const hasExplicitHeight = regex.test(parent.style.height);
      if (!parent.matches("video") && (hasExplicitWidth || hasExplicitHeight)) return parent;

      if (width === videoWidth && height === videoHeight) container = parent;
    }
    return container;
  },
};
