import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
const {
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  VIDEO_TIME_STEP,
  OVERRIDE_KEYBOARD,
  CLOSE_AUTO_WEB_FULL,
  VIDEO_FASTFORWARD_DURATION,
} = storage;

// 脚本菜单命令
export default {
  isClosedAuto: () => CLOSE_AUTO_WEB_FULL.get(),
  isClosedPlayRate: () => CLOSE_PLAY_RATE.get(),
  isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || webSite.isLivePage()) return;
    this.registerMenuCommand();
    this.setupCommandChangeListener();
  },
  registerMenuCommand() {
    this.registerClosePlayRate();
    this.registerPlayRateCommand();
    this.registerVideoTimeCommand();
    this.registerFastforwardCommand();
    this.registerCloseAutoFullCommand();
    this.registerOverrideKeyboardCommand();
  },
  setupCommandChangeListener() {
    if (this.isSetupCommandChangeListener) return;
    const handler = () => this.registerMenuCommand();
    [CLOSE_PLAY_RATE.name, OVERRIDE_KEYBOARD.name, CLOSE_AUTO_WEB_FULL.name].forEach((key) =>
      GM_addValueChangeListener(key, handler)
    );
    this.isSetupCommandChangeListener = true; // 防止多次注册
  },
  registerClosePlayRate() {
    const isClose = this.isClosedPlayRate();
    const title = isClose ? "开启倍速功能" : "关闭倍速功能";
    GM_unregisterMenuCommand(this.close_play_rate_command_id);
    this.close_play_rate_command_id = GM_registerMenuCommand(title, () => {
      CLOSE_PLAY_RATE.set(!isClose);
      if (!isClose) Tools.postMessage(window, { defaultPlayRate: true });
    });
  },
  registerPlayRateCommand() {
    const title = "设置倍速步进";
    GM_unregisterMenuCommand(this.play_rate_command_id);
    if (this.isClosedPlayRate()) return;
    this.play_rate_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, PLAY_RATE_STEP.get());
      if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP.set(input);
    });
  },
  registerVideoTimeCommand() {
    const title = "设置快进/快退秒数";
    GM_unregisterMenuCommand(this.video_time_command_id);
    if (!this.isOverrideKeyboard()) return;
    this.video_time_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_TIME_STEP.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_TIME_STEP.set(input);
    });
  },
  registerFastforwardCommand() {
    const title = "设置数字零键快进秒数";
    GM_unregisterMenuCommand(this.fastforward_command_id);
    this.fastforward_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_FASTFORWARD_DURATION.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_FASTFORWARD_DURATION.set(input);
    });
  },
  registerCloseAutoFullCommand() {
    if (!webSite.inMatches()) return;
    const isClose = this.isClosedAuto();
    const title = isClose ? "开启自动网页全屏" : "关闭自动网页全屏";
    GM_unregisterMenuCommand(this.close_auto_command_id);
    this.close_auto_command_id = GM_registerMenuCommand(title, () => CLOSE_AUTO_WEB_FULL.set(!isClose));
  },
  registerOverrideKeyboardCommand() {
    const isOverride = this.isOverrideKeyboard();
    const title = isOverride ? "关闭 空格 ◀▶ 键控制" : "开启 空格 ◀▶ 键控制";
    GM_unregisterMenuCommand(this.override_keyboard_command_id);
    this.override_keyboard_command_id = GM_registerMenuCommand(title, () => OVERRIDE_KEYBOARD.set(!isOverride));
  },
};
