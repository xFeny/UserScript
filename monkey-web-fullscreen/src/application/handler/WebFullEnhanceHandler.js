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
    Tools.getParents(wrap, true)?.forEach((el) => {
      el.classList.toggle("_webFullScreen_"), Tools.togglePart(el, "_webFullScreen_");
    });

    if (this.video) Tools.togglePart(this.video, "_video_");
    if (wrap.matches("video")) wrap.controls = Tools.hasClass(wrap, "_webFullScreen_") ? true : wrap.ctrl;

    this.cleanStubbornElements(wrap);
  },
  cleanStubbornElements(ele) {
    if (Tools.hasClass(ele, "_webFullScreen_")) return;

    Tools.scrollTop(Tools.getElementRect(ele)?.top - 100);
    Tools.querys("[part='_webFullScreen_'], ._webFullScreen_").forEach((el) => {
      el.classList.remove("_webFullScreen_"), Tools.removePart(el, "_webFullScreen_");
    });
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
    const control = this.findVideoControlBar(this.video);
    return control?.parentElement ?? this.findVideoContainer(this.video?.parentElement) ?? this.video;
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
    const ctrl = [
      '[class*="control" i]:not(.Drag-Control), [id*="control"], [class*="contrl"], [class*="ctrl"], [id*="ctrl"]',
      '[class*="bar"]:not([class*="barrage"]), [class*="footer"], [class*="bottom"]',
      ".iqp-player-innerlayer",
    ];
    return Tools.findSiblingInParent(ele, `:is(${ctrl})`);
  },
};
