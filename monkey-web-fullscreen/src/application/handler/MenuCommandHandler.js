import webSite from "../common/WebSite";
import storage from "../common/Storage";
import Tools from "../common/Tools";
import Swal from "sweetalert2";

const {
  DISABLE_AUTO,
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  OVERRIDE_KEYBOARD,
  VIDEO_SKIP_INTERVAL,
  DISABLE_MEMORY_TIME,
  ENABLE_THIS_SITE_AUTO,
  ZERO_KEY_SKIP_INTERVAL,
  CURRENT_EPISODE_SELECTOR,
  RELATIVE_EPISODE_SELECTOR,
} = storage;

/**
 * 脚本菜单命令
 */
export default {
  isDisableAuto: () => DISABLE_AUTO.get(),
  isDisablePlaybackRate: () => CLOSE_PLAY_RATE.get(),
  isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
  isEnbleThisWebSiteAuto() {
    const host = Tools.isTopWin() ? location.host : this.topInfo.host;
    return ENABLE_THIS_SITE_AUTO.get(host);
  },
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || this.hasMenu) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  registMenuCommand() {
    this.registPlayRateCommand();
    this.registSkipTimeCommand();
    this.registZeroKeySkipCommand();
    this.registWebSiteAutoCommand();
    this.registDeletePickerCommand();
    this.registMoreSettingCommand();
  },
  setupMenuChangeListener() {
    if (this.hasCommandListener) return;
    [
      CLOSE_PLAY_RATE.name,
      OVERRIDE_KEYBOARD.name,
      ENABLE_THIS_SITE_AUTO.name + location.host,
      CURRENT_EPISODE_SELECTOR.name + location.host,
    ].forEach((key) => GM_addValueChangeListener(key, () => this.registMenuCommand()));
    this.hasCommandListener = true; // 防止多次注册
  },
  registPlayRateCommand() {
    const title = "设置倍速步进";
    GM_unregisterMenuCommand(this.play_rate_menu_id);
    if (this.isLive() || this.isDisablePlaybackRate()) return;
    this.play_rate_menu_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, PLAY_RATE_STEP.get());
      if (!isNaN(input) && Number.parseFloat(input)) PLAY_RATE_STEP.set(input);
    });
  },
  registSkipTimeCommand() {
    GM_unregisterMenuCommand(this.skip_time_menu_id);
    if (this.isLive() || !this.isOverrideKeyboard()) return;
    const title = "设置快进/退秒数";
    this.skip_time_menu_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, VIDEO_SKIP_INTERVAL.get());
      if (!isNaN(input) && Number.parseInt(input)) VIDEO_SKIP_INTERVAL.set(input);
    });
  },
  registZeroKeySkipCommand() {
    GM_unregisterMenuCommand(this.zero_key_menu_id);
    if (this.isLive()) return;
    const title = "设置零键快进秒数";
    this.zero_key_menu_id = GM_registerMenuCommand(title, () => {
      const input = prompt(title, ZERO_KEY_SKIP_INTERVAL.get());
      if (!isNaN(input) && Number.parseInt(input)) ZERO_KEY_SKIP_INTERVAL.set(input);
    });
  },
  registWebSiteAutoCommand() {
    if (webSite.inMatches()) return;
    const isEnble = this.isEnbleThisWebSiteAuto();
    const title = isEnble ? "此站禁用自动网页全屏" : "此站启用自动网页全屏";
    GM_unregisterMenuCommand(this.enble_this_site_auto_menu_id);
    this.enble_this_site_auto_menu_id = GM_registerMenuCommand(title, () => {
      if (this.isMultipleVideo()) return Tools.notyf("多视频不能启用自动", true);
      ENABLE_THIS_SITE_AUTO.set(location.host, !isEnble);
    });
  },
  registDeletePickerCommand() {
    GM_unregisterMenuCommand(this.del_piker_menu_id);
    if (webSite.inMatches() || !CURRENT_EPISODE_SELECTOR.get(location.host)) return;
    this.del_piker_menu_id = GM_registerMenuCommand("删除此站的剧集选择器", () => {
      CURRENT_EPISODE_SELECTOR.del(location.host);
      RELATIVE_EPISODE_SELECTOR.del(location.host);
    });
  },
  registMoreSettingCommand() {
    GM_unregisterMenuCommand(this.more_sett_menu_id);
    this.more_sett_menu_id = GM_registerMenuCommand("更多设置", () => {
      Swal.fire({
        width: 350,
        title: "更多设置",
        backdrop: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        showConfirmButton: false,
        customClass: { container: "monkey-web-fullscreen" },
        html: `<div class="_menuitem"><label>空格 ◀▶ 键控制<input name="keyboard" type="checkbox"/></label></div>
          <div class="_menuitem"><label>禁用自动网页全屏<input name="auto" type="checkbox"/></label></div>
      		<div class="_menuitem"><label>禁用视频倍速调节<input name="rate" type="checkbox"/></label></div>
          <div class="_menuitem"><label>禁用记忆播放进度<input name="time" type="checkbox"/></label></div>`,
        didOpen() {
          const item = [OVERRIDE_KEYBOARD, DISABLE_AUTO, CLOSE_PLAY_RATE, DISABLE_MEMORY_TIME];
          Tools.querys("._menuitem input").forEach((ele, i) => {
            ele.checked = item[i].get();
            if (ele.name === "auto" && !webSite.inMatches()) Tools.closest(ele, "._menuitem")?.classList.add("hide");
            // checkbox点击监听
            ele.addEventListener("click", function () {
              if (this.name === "rate") Tools.postMessage(window, { defaultPlaybackRate: this.checked });
              setTimeout(() => item[i].set(this.checked), 100);
              Tools.notyf("修改成功！");
            });
          });
        },
      });
    });
  },
};
