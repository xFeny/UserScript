import Tools from "../common/Tools";
import Consts from "../common/Consts";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  dispatchShortcutKey: (key, isTrusted = false) => Tools.postMessage(window.top, { key: key.toUpperCase(), isTrusted }),
  setupKeydownListener() {
    unsafeWindow.addEventListener("keydown", (event) => this.handleKeydown(event), true);
    unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
  },
  handleKeydown(event) {
    // Tools.log("键盘事件：", { key, code });
    const { key, isTrusted } = event;
    const target = event.composedPath()[0];
    if (this.noVideo() || Tools.isInputable(target) || !["p", "Enter"].includes(key)) return;

    Tools.preventDefault(event);
    this.dispatchShortcutKey(key, isTrusted);
  },
  handleMessage(data) {
    // Tools.log(location.href, "接收到消息：", data);
    if (!data?.source?.includes(Consts.MSG_SOURCE)) return;
    if (data?.videoInfo) return this.setParentWinVideoInfo(data.videoInfo);
    if ("isFullscreen" in data) this.isFullscreen = data.isFullscreen;
    if (data?.topWin) window.topWin = this.topWin = data.topWin;

    // 处理键盘按键消息和继续分发消息
    this.processEvent(data);
  },
  processEvent(data) {
    // video在iframe中，向iframe传递事件
    if (!this.player) Tools.sendToIFrames(data);
    if (data?.key) this.execHotKeyActions(data);
  },
  execHotKeyActions: ({ key, isTrusted }) => (key === Consts.P ? this.toggleWebFullscreen(isTrusted) : this.toggleFullscreen()),
};
