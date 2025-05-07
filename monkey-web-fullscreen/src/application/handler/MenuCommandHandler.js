import Tools from "../common/Tools";
import webSite from "../common/WebSite";
import storage from "../common/Storage";
const {
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  VIDEO_TIME_STEP,
  OVERRIDE_KEYBOARD,
  ALL_EPISODE_CHAIN,
  CURRENT_EPISODE_CHAIN,
  CLOSE_OTHER_WEBSITES_AUTO,
  CLOSE_AUTO_WEB_FULL_SCREEN,
  VIDEO_FASTFORWARD_DURATION,
} = storage;

/**
 * 脚本菜单命令
 */
export default {
  isClosedPlayRate: () => CLOSE_PLAY_RATE.get(),
  isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
  isClosedAuto: () => CLOSE_AUTO_WEB_FULL_SCREEN.get(),
  isClosedOtherWebsiteAuto() {
    const host = Tools.isTopWin() ? location.host : this.topWinInfo.host;
    return CLOSE_OTHER_WEBSITES_AUTO.get(host);
  },
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || this.hasRegisterMenu) return;
    this.registerMenuCommand();
    this.setupCommandChangeListener();
    this.hasRegisterMenu = true;
  },
  registerMenuCommand() {
    this.registerClosePlayRate();
    this.registerPlayRateCommand();
    this.registerVideoTimeCommand();
    this.registerFastforwardCommand();
    this.registerCloseAutoFullCommand();
    this.registerOverrideKeyboardCommand();
    this.registerCloseAutoExperimentCommand();
    this.registerDeletePickerEpisodeCommand();
  },
  setupCommandChangeListener() {
    if (this.hasCommandListener) return;
    const handler = () => this.registerMenuCommand();
    [
      CLOSE_PLAY_RATE.name,
      OVERRIDE_KEYBOARD.name,
      CLOSE_AUTO_WEB_FULL_SCREEN.name,
      CURRENT_EPISODE_CHAIN.name + location.host,
      CLOSE_OTHER_WEBSITES_AUTO.name + location.host,
    ].forEach((key) => GM_addValueChangeListener(key, handler));
    this.hasCommandListener = true; // 防止多次注册
  },
  registerClosePlayRate() {
    const isClose = this.isClosedPlayRate();
    const title = isClose ? "启用倍速功能" : "禁用倍速功能";
    this.unregisterMenuCommand(this.close_play_rate_command_id);
    if (this.isLive()) return;
    this.close_play_rate_command_id = GM_registerMenuCommand(title, () => {
      if (!isClose) Tools.postMessage(window, { defaultPlaybackRate: true });
      CLOSE_PLAY_RATE.set(!isClose);
    });
  },
  registerPlayRateCommand() {
    const title = "设置倍速步进";
    this.unregisterMenuCommand(this.play_rate_command_id);
    if (this.isLive() || this.isClosedPlayRate()) return;
    this.play_rate_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, PLAY_RATE_STEP.get());
      if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP.set(input);
    });
  },
  registerVideoTimeCommand() {
    this.unregisterMenuCommand(this.video_time_command_id);
    if (this.isLive() || !this.isOverrideKeyboard()) return;
    const title = "设置快进/退秒数";
    this.video_time_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_TIME_STEP.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_TIME_STEP.set(input);
    });
  },
  registerFastforwardCommand() {
    this.unregisterMenuCommand(this.fastforward_command_id);
    if (this.isLive()) return;
    const title = "设置零键快进秒数";
    this.fastforward_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_FASTFORWARD_DURATION.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_FASTFORWARD_DURATION.set(input);
    });
  },
  registerCloseAutoFullCommand() {
    if (!webSite.inMatches()) return;
    const isClose = this.isClosedAuto();
    const title = isClose ? "启用自动网页全屏" : "禁用自动网页全屏";
    this.unregisterMenuCommand(this.close_auto_command_id);
    this.close_auto_command_id = GM_registerMenuCommand(title, () => CLOSE_AUTO_WEB_FULL_SCREEN.set(!isClose));
  },
  registerOverrideKeyboardCommand() {
    const isOverride = this.isOverrideKeyboard();
    const title = isOverride ? "禁用 空格 ◀▶ 键控制" : "启用 空格 ◀▶ 键控制";
    this.unregisterMenuCommand(this.override_keyboard_command_id);
    this.override_keyboard_command_id = GM_registerMenuCommand(title, () => OVERRIDE_KEYBOARD.set(!isOverride));
  },
  registerCloseAutoExperimentCommand() {
    if (webSite.inMatches()) return;
    const videos = Tools.querys("video").filter((video) => !isNaN(video));
    if (videos.length > 1) return;
    const isClose = this.isClosedOtherWebsiteAuto();
    const title = isClose ? "此站点启用自动网页全屏" : "此站点禁用自动网页全屏";
    this.unregisterMenuCommand(this.close_experiment_command_id);
    this.close_experiment_command_id = GM_registerMenuCommand(title, () => {
      CLOSE_OTHER_WEBSITES_AUTO.set(location.host, !isClose);
    });
  },
  registerDeletePickerEpisodeCommand() {
    const title = "删除此站点的剧集选择器";
    this.unregisterMenuCommand(this.del_piker_episode_command_id);
    if (webSite.inMatches() || !CURRENT_EPISODE_CHAIN.get(location.host)) return;
    this.del_piker_episode_command_id = GM_registerMenuCommand(title, () => {
      CURRENT_EPISODE_CHAIN.delete(location.host);
      ALL_EPISODE_CHAIN.delete(location.host);
    });
  },
  unregisterMenuCommand(command_id) {
    GM_unregisterMenuCommand(command_id);
    command_id = null;
  },
};
