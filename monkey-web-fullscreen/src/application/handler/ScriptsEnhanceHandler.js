/**
 * 网页全屏增强
 * 如果有安装网页全屏脚本：https://greasyfork.org/zh-CN/scripts/495077-maximize-video-improve
 * 不需要鼠标悬停到播放器上，直接按 `P` 键网页全屏
 */
import Tools from "../common/Tools";
export default {
  enhance() {
    if (!this.videoCenterPoint) return; // 页面没有视频元素
    const element = this.getHoverElement();
    Tools.triggerMouseoverEvent(element);
    Tools.triggerEscapeEvent(element);
  },
  getHoverElement() {
    if (this.hoverElement) return this.hoverElement;
    if (this.video) return (this.hoverElement = this.video?.parentElement?.parentElement);

    const iframe = this.getVideoIframe(); // video所在的iframe
    if (iframe) return (this.hoverElement = iframe);

    // 获取所有iframe，根据video的中心点，判断是否有iframe与其重合
    const { x, y } = this.videoCenterPoint;
    const iframes = Tools.querys("iframe:not([src=''])");
    for (const element of iframes) {
      const rect = element.getBoundingClientRect();
      const isInRect = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      if (!isInRect) continue;
      return (this.hoverElement = element);
    }
  },
};
