import Consts from "../common/Consts";
import Tools from "../common/Tools";

/**
 * 通用网页全屏
 */
export default {
  webFullEnhance() {
    if (this.normalSite() || Tools.isTooFrequent("enhance") || !this.videoInfo) return;
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
    const { pathname, search } = new URL(this.videoInfo.frameSrc);
    const decodedSearch = decodeURI(search); // 先解码得到实际字符串
    const partialSearch = decodedSearch.slice(0, decodedSearch.length * 0.8);
    return Tools.query(`iframe[src*="${pathname + partialSearch}"]`);
  },
  getVideoWrapper() {
    return this.findVideoControlBar() ?? this.findVideoContainer();
  },
  findVideoControlBar(maxLevel = 3) {
    const ignore = new Set();
    const { player: video, player: element } = this;
    const videoRect = Tools.getElementRect(video);
    const baseSelector = ':is([class*="control" i], [id*="control"], [class*="ctrl"])';

    for (let parent = element?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const ignoreSelector = ignore.size > 0 ? `:not(.${[...ignore].map((el) => Array.from(el.classList).join("."))})` : null;
      const selector = ignoreSelector ? `${baseSelector}${ignoreSelector}` : baseSelector;
      const controlBar = Tools.query(selector, parent);
      if (!controlBar) continue;

      Tools.dispatchMousemove(controlBar);
      const { centerX, centerY } = Tools.getCenterPoint(controlBar);
      const { width, top, left, right } = Tools.getElementRect(controlBar);

      const inVideoRect = Tools.pointInElement(centerX, centerY, video) && width > videoRect.width / 2;
      const intersect = left === videoRect.left && right === videoRect.right && top === videoRect.bottom;
      if (inVideoRect || intersect) return parent;
      ignore.add(controlBar);
    }
    return null;
  },
  findVideoContainer(maxLevel = 5) {
    let { player: video, player: container } = this;
    const { width: videoWidth, height: videoHeight } = Tools.getElementRect(video);

    for (let parent = video?.parentElement, level = 0; parent && level < maxLevel; parent = parent.parentElement, level++) {
      const { width, height } = Tools.getElementRect(parent);
      if (width === videoWidth && height === videoHeight) container = parent;
    }
    return container;
  },
};
