/**
 * 对网页全屏（改）脚本增强
 * 安装网页全屏（改）脚本：https://greasyfork.org/zh-CN/scripts/495077-maximize-video-improve
 * 不需要滑动鼠标光标到播放器上，按 `P` 键直接网页全屏
 */
import Tools from "../common/Tools";
export default {
  enhance() {
    if (this.normalSite()) return;
    const ele = this.getVideoHostContainer();
    (ele.oldWidth = ele?.offsetWidth ?? 0), (ele.ctrl = ele.ctrl ?? ele?.controls);
    if (!this.isUseAlternative()) Tools.triggerHover(ele), Tools.triggerEscape();
    setTimeout(() => this.alternative(ele), 100); // https://36kr.com
  },
  alternative(ele) {
    if (!Tools.isTopWin() || ele.oldWidth !== ele.offsetWidth) return;
    Tools.getParents(ele, true)?.forEach((el) => el?.classList?.toggle("_webFullScreen_"));
    if (ele?.matches("video")) ele.controls = ele.classList.contains("_webFullScreen_") ? true : ele.ctrl;
    this.cleanStubbornElements(ele);
  },
  cleanStubbornElements(element) {
    if (element.classList.contains("_webFullScreen_")) return;
    Tools.querys("._webFullScreen_").forEach((el) => el.classList.remove("_webFullScreen_"));
    Tools.scrollTop(Tools.getElementRect(element)?.top - 100);
  },
  getVideoHostContainer() {
    if (this.video) return this.getVideoWrapper();

    // video所在的iframe
    const videoIframe = this.getVideoIframe();
    if (videoIframe) return videoIframe;

    const iframes = Tools.getFrames();
    if (iframes.length === 1) return iframes.shift();

    // 根据video的中心点，判断是否在iframe的矩形范围内
    const { centerX, centerY } = this.videoInfo;
    return iframes.find((ele) => Tools.isVisible(ele) && Tools.isPointInElement(centerX, centerY, ele));
  },
  getVideoWrapper() {
    const control = this.findVideoControlBar(this.video);
    return control?.parentElement ?? this.findVideoContainer(this.video?.parentElement) ?? this.video;
  },
  findVideoContainer(target) {
    return Tools.closest(target, ':is([class*="wrap"], [class*="video"], [class*="Player"], [class*="player"])');
  },
  findVideoControlBar(element) {
    const ctrl = ':is([class*="Control"], [class*="control"], [id*="control"], [class*="ctrl"], [class*="bar"])';
    return Tools.findSiblingInParent(element, ctrl);
  },
};
