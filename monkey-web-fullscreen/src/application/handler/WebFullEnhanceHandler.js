import Consts from "../common/Consts";
import Tools from "../common/Tools";
const { webFull } = Consts;
/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance", 300)) return;

    const wrap = this.getVideoHostContainer();
    if (!wrap) return;

    wrap.ctrl = wrap.ctrl ?? wrap?.controls;
    Tools.getParents(wrap, true)?.forEach((el) => (el.classList.toggle(webFull), Tools.togglePart(el, webFull)));

    if (this.video) Tools.togglePart(this.video, "__video");
    if (wrap.matches("video")) wrap.controls = Tools.hasCls(wrap, webFull) ? true : wrap.ctrl;

    this.cleanStubbornElements(wrap);
  },
  cleanStubbornElements(ele) {
    if (Tools.hasCls(ele, webFull)) return;

    Tools.scrollTop(Tools.getElementRect(ele)?.top - 100);
    Tools.querys(`.${webFull}`).forEach((el) => (Tools.delCls(el, webFull), Tools.delPart(el, webFull)));
  },
  getVideoHostContainer() {
    if (this.video) return this.getVideoWrapper();

    const videoIFrame = this.getVideoIFrame();
    if (videoIFrame) return videoIFrame;

    const ifrs = Tools.getIFrames();
    const { centerX, centerY } = this?.videoInfo ?? {};
    return ifrs.length <= 1 ? ifrs[0] : ifrs.find((el) => Tools.isVisible(el) && Tools.pointInElement(centerX, centerY, el));
  },
  getVideoWrapper() {
    return this.findVideoControlBar(this.video) ?? this.findVideoContainer(this.video?.parentElement) ?? this.video;
  },
  getVideoIFrame() {
    if (!this?.videoInfo?.frameSrc) return null;
    const url = new URL(this.videoInfo.frameSrc);
    const src = decodeURI(url.pathname + url.search);
    return Tools.query(`iframe[src*="${src}"]`);
  },
  findVideoContainer(ele) {
    return Tools.closest(ele, ':is([class*="player" i], [class*="wrap"], [class*="video"], [player])');
  },
  findVideoControlBar(ele) {
    const ctrl = '[class*="contr" i]:not(.Drag-Control), [id*="control"], [class*="ctrl"], [id*="ctrl"], [class*="progress" i]';
    return Tools.findParentWithChild(ele, ctrl, 5);
  },
};
