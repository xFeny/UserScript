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
    if (!wrap) return;

    // 进入网页全屏
    this.webFullWrap = wrap;
    wrap.ctrl = wrap.ctrl ?? wrap?.controls;
    wrap.top = wrap.top ?? wrap.getBoundingClientRect()?.top ?? 0;
    wrap.scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    Tools.getParents(wrap, true)?.forEach((el) => (el.classList.add(Consts.webFull), Tools.setPart(el, Consts.webFull)));

    // video特殊处理
    if (this.player) Tools.setPart(this.player, Consts.videoPart);
    if (wrap.matches("video") && Tools.hasCls(wrap, Consts.webFull)) wrap.controls = true;
  },
  exitWebFull() {
    const wrap = this.webFullWrap;
    if (this.player) Tools.delPart(this.player, Consts.videoPart);
    if (wrap.matches("video")) wrap.controls = wrap.ctrl;

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
    if (!this?.videoInfo?.frameSrc) return null;
    const url = new URL(this.videoInfo.frameSrc);
    const src = decodeURI(url.pathname + url.search);
    return Tools.query(`iframe[src*="${src}"]`);
  },
  getVideoWrapper() {
    return this.findVideoControlBar() ?? this.findVideoContainer();
  },
  findVideoControlBar() {
    const ignore = ":not(.Drag-Control, .vjs-controls-disabled, .vjs-control-text, .xgplayer-prompt)";
    const ctrl = `[class*="contr" i]${ignore}, [id*="control"], [class*="ctrl"]`;
    const controlBar = Tools.findParentWithChild(this.player, ctrl);
    const { centerX, centerY } = Tools.getCenterPoint(controlBar);
    return Tools.pointInElement(centerX, centerY, this.player) ? controlBar : null;
  },
  findVideoContainer(maxLevel = 5) {
    const video = this.player;
    let container = this.player;
    const videoRect = Tools.getElementRect(video);
    for (let parent = video?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const { width, height } = Tools.getElementRect(parent);
      if (width === videoRect.width && height === videoRect.height) container = parent;
    }
    return container;
  },
};
