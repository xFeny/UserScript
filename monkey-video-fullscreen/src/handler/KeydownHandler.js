import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  dispatchShortcut: (key, isTrusted = false) => Tools.postMessage(window.top, { key: key.toUpperCase(), isTrusted }),
  setupKeydownListener() {
    unsafeWindow.addEventListener("keydown", (e) => this.handleKeydown(e), true);
    unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
    unsafeWindow.addEventListener("scroll", () => this.fsWrapper && Tools.scrollTop(this.fsWrapper.scrollY));
  },
  handleKeydown(e) {
    // Tools.log("键盘事件：", { key, code });
    const { key, isTrusted } = e;
    const target = e.composedPath()[0];
    if (this.isNoVideo() || Tools.isInputable(target) || !["p", "Enter"].includes(key)) return;

    Tools.preventDefault(e);
    this.dispatchShortcut(key, isTrusted);
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data);
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.videoInfo) return this.syncVideoToParentWin(data.videoInfo);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;

    // 处理键盘按键消息和继续分发消息
    this.processEvent(data);
  },
  processEvent(data) {
    // 规避父窗口视频对 iframe 内视频网页全屏的干扰
    if (this.videoInfo?.iFrame && this.player) delete this.player;

    // 视频可能在 iframe 中，向 iframe 传递操作
    if (!this.player) Tools.sendToIFrames(data);
    if (data?.key) this.execKeyActions(data);
  },
  execKeyActions: ({ key, isTrusted }) => (key === Consts.P ? App.toggleWebFullscreen(isTrusted) : App.toggleFullscreen()),
};
