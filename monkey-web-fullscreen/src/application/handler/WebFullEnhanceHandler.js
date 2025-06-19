import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance", 300)) return;

    const wrap = this.getVideoHostContainer();
    if (!wrap) return;

    wrap.ctrl = wrap.ctrl ?? wrap?.controls;
    Tools.getParents(wrap, true)?.forEach((el) => (el.classList.toggle(Consts.webFull), Tools.togglePart(el, Consts.webFull)));

    if (this.video) Tools.togglePart(this.video, "__video");
    if (wrap.matches("video")) wrap.controls = Tools.hasCls(wrap, Consts.webFull) ? true : wrap.ctrl;

    this.cleanStubbornElements(wrap);
  },
  cleanStubbornElements(ele) {
    if (Tools.hasCls(ele, Consts.webFull)) return;

    Tools.scrollTop(Tools.getElementRect(ele)?.top - 100);
    Tools.querys(`.${Consts.webFull}`).forEach((el) => (Tools.delCls(el, Consts.webFull), Tools.delPart(el, Consts.webFull)));
  },
  getVideoHostContainer() {
    if (this.video) return this.getVideoWrapper();

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
    return this.findVideoControlBar() ?? this.findVideoContainer() ?? this.video;
  },
  findVideoControlBar() {
    const ctrl = '[class*="contr" i]:not(.Drag-Control), [id*="control"], [class*="ctrl"], [id*="ctrl"]';
    return Tools.findParentWithChild(this.video, ctrl);
  },
  findVideoContainer() {
    const parent = this.video?.parentElement;
    return Tools.closest(parent, ':is([class*="player" i], [class*="wrap"], [class*="video"], [player])');
  },
};
