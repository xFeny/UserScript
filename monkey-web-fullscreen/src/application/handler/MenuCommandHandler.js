import webSite from "../common/WebSite";
import storage from "../common/Storage";
import Tools from "../common/Tools";
import Swal from "sweetalert2";

const {
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  VIDEO_TIME_STEP,
  OVERRIDE_KEYBOARD,
  ALL_EPISODE_CHAIN,
  CURRENT_EPISODE_CHAIN,
  ENABLE_THIS_SITE_AUTO,
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
  isEnbleThisWebSiteAuto() {
    const host = Tools.isTopWin() ? location.host : this.topWinInfo.host;
    return ENABLE_THIS_SITE_AUTO.get(host);
  },
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || this.hasRegisterMenu) return;
    this.registerMenuCommand();
    this.setupCommandChangeListener();
    this.hasRegisterMenu = true;
  },
  registerMenuCommand() {
    this.registerPlayRateCommand();
    this.registerVideoTimeCommand();
    this.registerFastforwardCommand();
    this.registerThisSiteAutoCommand();
    this.registerDeletePickerCommand();
    this.registerMoreSettingMenuCommand();
  },
  setupCommandChangeListener() {
    if (this.hasCommandListener) return;
    const handler = () => this.registerMenuCommand();
    [
      CLOSE_PLAY_RATE.name,
      OVERRIDE_KEYBOARD.name,
      CURRENT_EPISODE_CHAIN.name + location.host,
      ENABLE_THIS_SITE_AUTO.name + location.host,
    ].forEach((key) => GM_addValueChangeListener(key, handler));
    this.hasCommandListener = true; // 防止多次注册
  },
  registerPlayRateCommand() {
    const title = "设置倍速步进";
    GM_unregisterMenuCommand(this.play_rate_command_id);
    if (this.isLive() || this.isClosedPlayRate()) return;
    this.play_rate_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, PLAY_RATE_STEP.get());
      if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP.set(input);
    });
  },
  registerVideoTimeCommand() {
    GM_unregisterMenuCommand(this.video_time_command_id);
    if (this.isLive() || !this.isOverrideKeyboard()) return;
    const title = "设置快进/退秒数";
    this.video_time_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_TIME_STEP.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_TIME_STEP.set(input);
    });
  },
  registerFastforwardCommand() {
    GM_unregisterMenuCommand(this.fastforward_command_id);
    if (this.isLive()) return;
    const title = "设置零键快进秒数";
    this.fastforward_command_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_FASTFORWARD_DURATION.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_FASTFORWARD_DURATION.set(input);
    });
  },
  registerThisSiteAutoCommand() {
    if (webSite.inMatches()) return;
    const videos = Tools.querys("video").filter((video) => !isNaN(video));
    if (videos.length > 1) return;
    const isEnble = this.isEnbleThisWebSiteAuto();
    const title = isEnble ? "此站禁用自动网页全屏" : "此站启用自动网页全屏";
    GM_unregisterMenuCommand(this.enble_this_site_auto_command_id);
    this.enble_this_site_auto_command_id = GM_registerMenuCommand(title, () => {
      ENABLE_THIS_SITE_AUTO.set(location.host, !isEnble);
    });
  },
  registerDeletePickerCommand() {
    GM_unregisterMenuCommand(this.del_piker_command_id);
    if (webSite.inMatches() || !CURRENT_EPISODE_CHAIN.get(location.host)) return;
    this.del_piker_command_id = GM_registerMenuCommand("删除此站的剧集选择器", () => {
      CURRENT_EPISODE_CHAIN.delete(location.host);
      ALL_EPISODE_CHAIN.delete(location.host);
    });
  },
  registerMoreSettingMenuCommand() {
    GM_unregisterMenuCommand(this.more_setting_command_id);
    this.more_setting_command_id = GM_registerMenuCommand("更多设置", () => {
      Swal.fire({
        width: 350,
        title: "更多设置",
        backdrop: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        customClass: { container: "monkey-web-fullscreen" },
        html: `<div class="_menuitem_"><label>关闭自动网页全屏<input type="checkbox"/></label></div>
      		<div class="_menuitem_"><label>关闭视频倍速调节<input type="checkbox"/></label></div>
      		<div class="_menuitem_"><label>空格 ◀▶ 键控制<input type="checkbox"/></label></div>`,
        didOpen() {
          const menuitem = [CLOSE_AUTO_WEB_FULL_SCREEN, CLOSE_PLAY_RATE, OVERRIDE_KEYBOARD];
          Tools.querys("._menuitem_ input").forEach((ele, i) => {
            ele.checked = menuitem[i].get(location.host);
            if (i === 0 && !webSite.inMatches()) Tools.closest(ele, "._menuitem_")?.classList.add("hide");
            ele.addEventListener("click", () => {
              if (i === 1 && ele.checked) Tools.postMessage(window, { defaultPlaybackRate: true });
              menuitem[i].set(ele.checked);
              Tools.notyf("修改成功！");
            });
          });
        },
      });
    });
  },
};
