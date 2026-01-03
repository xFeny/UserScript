import Tools from "../common/Tools";
import Consts from "../common/Consts";
import Keyboard from "../common/Keyboard";

/**
 * 快捷键和消息相关逻辑处理
 */
export default {
  dispatchShortcutKey(code, { isTrusted = false } = {}) {
    const key = this.processShortcutKey({ code });
    Tools.postMessage(window.top, { key, isTrusted });
  },
  processShortcutKey({ key, code, ctrlKey, shiftKey, altKey }) {
    code = code.replace(/key|arrow|numpad|tract/gi, Consts.EMPTY);
    const keys = [ctrlKey && "ctrl", shiftKey && "shift", altKey && "alt", /[0-9]/.test(key) ? key : code];
    return keys.filter(Boolean).join("_").toUpperCase();
  },
  setupKeydownListener() {
    try {
      window.addEventListener("keydown", (event) => this.handleKeydown(event), true);
      window.addEventListener("message", ({ data }) => this.handleMessage(data));
    } catch {
      unsafeWindow.addEventListener("keydown", (event) => this.handleKeydown(event), true);
      unsafeWindow.addEventListener("message", ({ data }) => this.handleMessage(data));
    }
  },
  handleKeydown(event, { key, code, isTrusted } = event) {
    // Tools.log("键盘事件：", { key, code });
    const target = event.composedPath()[0];
    if (this.noVideo() || Tools.isInputable(target) || !Object.values(Keyboard).includes(code)) return;

    Tools.preventDefault(event);
    key = this.processShortcutKey(event);
    Tools.postMessage(window.top, { key, isTrusted });
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
  execHotKeyActions({ key, isTrusted }) {
    // Tools.log("按下的键：", { key, isTrusted });
    const dict = {
      P: () => this.toggleWebFullscreen(isTrusted),
      ENTER: () => this.toggleFullscreen(),
    };

    // 执行函数
    dict[key]?.();
  },
};
