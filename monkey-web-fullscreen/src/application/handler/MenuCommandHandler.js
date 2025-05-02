import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
const {
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  VIDEO_TIME_STEP,
  OVERRIDE_KEYBOARD,
  CLOSE_AUTO_WEB_FULL_SCREEN,
  VIDEO_FASTFORWARD_DURATION,
} = storage;
// 网站是否使用增强功能，在视频播放时自动网页全屏
const CLOSE_OTHER_WEBSITES_AUTO = "CLOSE_OTHER_WEBSITES_AUTO_";

// 脚本菜单命令
export default {
  isClosedPlayRate: () => CLOSE_PLAY_RATE.get(),
  isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
  isClosedAuto: () => CLOSE_AUTO_WEB_FULL_SCREEN.get(),
  isClosedOtherWebsiteAuto() {
    const host = Tools.isTopWin() ? location.host : this.topWinInfo.host;
    return GM_getValue(CLOSE_OTHER_WEBSITES_AUTO + host, true);
  },
  setupScriptMenuCommand() {
    if (!Tools.isTopWin()) return;
    this.registerMenuCommand();
    this.setupCommandChangeListener();
    // 向iframe传递顶级窗口信息
    const topWinInfo = (this.topWinInfo = { innerWidth, host: location.host });
    Tools.postMsgToFrames({ topWinInfo });
  },
  registerMenuCommand() {
    this.registerClosePlayRate();
    this.registerPlayRateCommand();
    this.registerVideoTimeCommand();
    this.registerFastforwardCommand();
    this.registerCloseAutoFullCommand();
    this.registerOverrideKeyboardCommand();
    this.registerCloseAutoExperimentCommand();
  },
  setupCommandChangeListener() {
    if (this.isSetupCommandChangeListener) return;
    const handler = () => this.registerMenuCommand();
    [
      CLOSE_PLAY_RATE.name,
      OVERRIDE_KEYBOARD.name,
      CLOSE_AUTO_WEB_FULL_SCREEN.name,
      CLOSE_OTHER_WEBSITES_AUTO + window.top.location.host,
    ].forEach((key) => GM_addValueChangeListener(key, handler));
    this.isSetupCommandChangeListener = true; // 防止多次注册
  },
  registerClosePlayRate() {
    if (webSite.isLivePage()) return;
    const isClose = this.isClosedPlayRate();
    const title = isClose ? "启用倍速功能" : "禁用倍速功能";
    GM_unregisterMenuCommand(this.close_play_rate_command_id);
    this.close_play_rate_command_id = GM_registerMenuCommand(title, () => {
      CLOSE_PLAY_RATE.set(!isClose);
      if (!isClose) Tools.postMessage(window, { defaultPlayRate: true });
    });
  },
  registerPlayRateCommand() {
    if (webSite.isLivePage()) return;
    const title = "设置倍速步进";
    GM_unregisterMenuCommand(this.play_rate_command_id);
    if (this.isClosedPlayRate()) return;
    this.play_rate_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, PLAY_RATE_STEP.get());
      if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP.set(input);
    });
  },
  registerVideoTimeCommand() {
    if (webSite.isLivePage()) return;
    const title = "设置快进/退秒数";
    GM_unregisterMenuCommand(this.video_time_command_id);
    if (!this.isOverrideKeyboard()) return;
    this.video_time_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_TIME_STEP.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_TIME_STEP.set(input);
    });
  },
  registerFastforwardCommand() {
    if (webSite.isLivePage()) return;
    const title = "设置零键快进秒数";
    GM_unregisterMenuCommand(this.fastforward_command_id);
    this.fastforward_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_FASTFORWARD_DURATION.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_FASTFORWARD_DURATION.set(input);
    });
  },
  registerCloseAutoFullCommand() {
    if (!webSite.inMatches() || webSite.isLivePage()) return;
    const isClose = this.isClosedAuto();
    const title = isClose ? "启用自动网页全屏" : "禁用自动网页全屏";
    GM_unregisterMenuCommand(this.close_auto_command_id);
    this.close_auto_command_id = GM_registerMenuCommand(title, () => CLOSE_AUTO_WEB_FULL_SCREEN.set(!isClose));
  },
  registerOverrideKeyboardCommand() {
    const isOverride = this.isOverrideKeyboard();
    const title = isOverride ? "禁用 空格 ◀▶ 键控制" : "启用 空格 ◀▶ 键控制";
    GM_unregisterMenuCommand(this.override_keyboard_command_id);
    this.override_keyboard_command_id = GM_registerMenuCommand(title, () => OVERRIDE_KEYBOARD.set(!isOverride));
  },
  registerCloseAutoExperimentCommand() {
    if (webSite.inMatches()) return;
    const videos = Array.from(Tools.querys("video")).filter((video) => !isNaN(video));
    if (videos.length > 1) return;
    const isClose = this.isClosedOtherWebsiteAuto();
    const title = isClose ? "此站点启用自动网页全屏" : "此站点禁用自动网页全屏";
    GM_unregisterMenuCommand(this.close_experiment_command_id);
    this.close_experiment_command_id = GM_registerMenuCommand(title, () => {
      GM_setValue(CLOSE_OTHER_WEBSITES_AUTO + location.host, !isClose);
    });
  },
};
