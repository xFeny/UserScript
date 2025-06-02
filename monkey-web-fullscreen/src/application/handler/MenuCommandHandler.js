import webSite from "../common/WebSite";
import storage from "../common/Storage";
import Tools from "../common/Tools";
import Swal from "sweetalert2";
import Constants from "../common/Constants";

const {
  DISABLE_AUTO,
  PLAY_RATE_STEP,
  CLOSE_PLAY_RATE,
  USE_ALTERNATIVE,
  OVERRIDE_KEYBOARD,
  VIDEO_SKIP_INTERVAL,
  DISABLE_MEMORY_TIME,
  ZERO_KEY_SKIP_INTERVAL,
  ENABLE_THIS_SITE_AUTO: EN_THIS,
  CURRENT_EPISODE_SELECTOR: EP_SELECTOR,
  RELATIVE_EPISODE_SELECTOR: RE_SELECTOR,
} = storage;

/**
 * 脚本菜单命令
 */
export default {
  isDisableAuto: () => DISABLE_AUTO.get(),
  isUseAlternative: () => USE_ALTERNATIVE.get(),
  isOverrideKeyboard: () => OVERRIDE_KEYBOARD.get(),
  isDisablePlaybackRate: () => CLOSE_PLAY_RATE.get(),
  isEnbleThisWebSiteAuto: () => EN_THIS.get(Tools.isTopWin() ? location.host : topInfo.host),
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || Tools.isTooFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
  },
  setupMenuChangeListener() {
    const host = location.host;
    [CLOSE_PLAY_RATE.name, OVERRIDE_KEYBOARD.name, EN_THIS.name + host, EP_SELECTOR.name + host].forEach((key) =>
      GM_addValueChangeListener(key, () => this.registMenuCommand())
    );
  },
  registMenuCommand() {
    const host = location.host;
    const isEnble = this.isEnbleThisWebSiteAuto();
    const siteFun = () => EN_THIS.set(host, !isEnble);
    const delPicker = () => EP_SELECTOR.del(host) & RE_SELECTOR.del(host);
    [
      { title: "设置零键秒数", cache: ZERO_KEY_SKIP_INTERVAL, isDisable: this.isLive() },
      { title: "设置倍速步长", cache: PLAY_RATE_STEP, isDisable: this.isLive() || this.isDisablePlaybackRate() },
      { title: "设置快进/退秒数", cache: VIDEO_SKIP_INTERVAL, isDisable: this.isLive() || !this.isOverrideKeyboard() },
      { title: `此站${isEnble ? "禁" : "启"}用自动网页全屏`, cache: EN_THIS, isDisable: webSite.inMatches(), fn: siteFun },
      { title: "删除此站的剧集选择器", cache: EP_SELECTOR, isDisable: !EP_SELECTOR.get(host), fn: delPicker },
      { title: "更多设置", cache: OVERRIDE_KEYBOARD, isDisable: false, fn: () => this.moreSettPopup() },
    ].forEach(({ title, cache, isDisable, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isDisable) return;

      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this);
        // 设置倍速步长、设置快进/退秒数、设置零键秒数
        const input = prompt(title, cache.get());
        if (!isNaN(input) && cache.parser(input)) cache.set(input);
      });
    });
  },
  moreSettPopup() {
    const configs = [
      { name: "key", label: "空格 ◀▶ 键 控制", cache: OVERRIDE_KEYBOARD },
      { name: "auto", label: "禁用自动网页全屏", cache: DISABLE_AUTO, hide: !webSite.inMatches() },
      { name: "rate", label: "禁用视频倍速调节", cache: CLOSE_PLAY_RATE, hide: this.isLive() },
      { name: "time", label: "禁用播放进度记录", cache: DISABLE_MEMORY_TIME, hide: this.isLive() },
      { name: "self", label: "使用自带网页全屏增强", cache: USE_ALTERNATIVE, hide: webSite.inMatches() },
    ];
    const html = configs.map(
      ({ name, label, hide }) => `<label class="_menu_ ${hide && "hide"}">${label}<input name="${name}" type="checkbox"/></label>`
    );
    Swal.fire({
      width: 350,
      backdrop: false,
      title: "更多设置",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      html: html.join(Constants.EMPTY),
      customClass: { container: "monkey-web-fullscreen" },
      didOpen() {
        Tools.querys("._menu_ input").forEach((ele, i) => {
          ele.checked = configs[i].cache.get();
          // checkbox点击监听
          ele.addEventListener("click", function () {
            this.name === "rate" && Tools.postMessage(window, { defaultPlaybackRate: this.checked });
            setTimeout(() => configs[i].cache.set(this.checked), 100), Tools.notyf("修改成功！");
          });
        });
      },
    });
  },
};
