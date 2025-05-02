/**
 * 对网页全屏（改）脚本增强
 * 安装网页全屏（改）脚本：https://greasyfork.org/zh-CN/scripts/495077-maximize-video-improve
 * 不需要滑动鼠标指针到播放器上，按 `P` 键直接网页全屏
 *
 * 测试网站列表：
 * 酷燃视频     https://krcom.cn
 * 新传宽频     https://v.zhibo.tv
 * 风行网       https://www.fun.tv
 * 56网         https://www.56.com
 * 齐鲁网       https://v.iqilu.com
 * 凤凰视频	    https://v.ifeng.com
 * YouTube      https://youtube.com
 * TED          https://www.ted.com
 * 虎牙         https://www.huya.com
 * 微博TV       https://weibo.com/tv
 * 斗鱼         https://www.douyu.com
 * FC2 Video	  https://video.fc2.com
 * 中国体育     https://video.zhibo.tv
 * 36氪         https://36kr.com/video/
 * 网易公开课   https://open.163.com/ted
 * 今日头条     https://www.toutiao.com/
 * 酷狗音乐-MV	https://www.kugou.com/mvweb/html/
 * QQ音乐-MV	  https://y.qq.com/portal/mv_lib.html
 * 小红书       https://www.xiaohongshu.com/explore
 */
import Tools from "../common/Tools";
export default {
  enhance() {
    if (!this.videoInfo) return; // 页面没有视频元素
    const ele = this.getHoverElement();
    Tools.triggerHoverEvent(ele);
    Tools.triggerEscapeEvent();
    this.backupTrigger();
  },
  backupTrigger() {
    if (!this.video || this.videoInfo.frameSrc) return;
    let oldWidth = this.video.oldWidth;
    let newWidth = this.video.offsetWidth;
    if (!Object.is(oldWidth, newWidth)) return;
    Tools.query("#playerControlBtn")?.click(); // `Esc`键切换失败，点击 `网页全屏`
    if (!Object.is(newWidth, this.video.offsetWidth)) return;
    Tools.query("#playerControlBtn")?.click(); // 再次尝试
  },
  getHoverElement() {
    if (this.video) return this.getVideoContainer();

    // video所在的iframe
    const iframe = this.getVideoIframe();
    if (iframe) return iframe;

    // 根据video的中心点，判断是否在iframe的矩形范围内
    const { centerX, centerY } = this.videoInfo;
    const iframes = Tools.getFrames();
    for (const element of iframes) {
      if (!Tools.isVisible(element)) continue;
      if (Tools.isPointInElementRect(centerX, centerY, element)) return element;
    }
  },
  getVideoContainer() {
    const video = this.video;
    video.oldWidth = video.offsetWidth;
    const parentEle = video?.parentElement;
    const control = this.getVideoControls(video);
    const player = this.getVideoPlayer(parentEle);
    // Tools.log("播放器控制栏：", control, "控制栏父元素：", control?.parentElement);
    const videoContainer = player || control?.parentElement;
    if (!videoContainer) return video;
    if (this.videoInfo.frameSrc) return videoContainer; // 播放器在iframe中

    const videoWidth = video.offsetWidth;
    const wrapWidth = videoContainer.offsetWidth;
    // Tools.log("\t播放器容器宽度：" + wrapWidth + "\t播放器宽度：" + videoWidth);
    return wrapWidth !== videoWidth ? video : videoContainer;
  },
  getVideoPlayer(target) {
    const selector = [
      ".video-js",
      '[class*="wrap"]',
      '[class*="video"]',
      '[class*="Player"]',
      '[class*="player"]',
      '[aria-label="视频播放器"]',
      '[aria-label="Video Player"]',
    ];
    return Tools.closest(target, `:is(${selector})`);
  },
  getVideoControls(element) {
    return Tools.findSiblingInParent(element, ['[class*="Control"]', '[class*="control"]']);
  },
};
