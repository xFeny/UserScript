import Storage from "../common/Storage";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

const { ENABLE_THIS_SITE_AUTO: ENABLE_THIS, CURR_EPISODE_SELECTOR: EPISODE_SELECTOR } = Storage;

/**
 * 脚本菜单命令
 */
export default {
  isDisableAuto: () => Storage.DISABLE_AUTO.get(),
  isOverrideKeyboard: () => Storage.OVERRIDE_KEYBOARD.get(),
  isDisablePlaybackRate: () => Storage.CLOSE_PLAY_RATE.get(),
  isEnbleThisWebSiteAuto: () => ENABLE_THIS.get(Tools.isTopWin() ? location.host : topInfo.host),
  setupScriptMenuCommand() {
    if (!Tools.isTopWin() || Tools.isTooFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
  },
  setupMenuChangeListener() {
    const host = location.host;
    [Storage.CLOSE_PLAY_RATE.name, Storage.OVERRIDE_KEYBOARD.name, ENABLE_THIS.name + host, EPISODE_SELECTOR.name + host].forEach(
      (key) => GM_addValueChangeListener(key, () => this.registMenuCommand())
    );
  },
  registMenuCommand() {
    const host = location.host;
    const isEnble = this.isEnbleThisWebSiteAuto();
    const siteFun = () => ENABLE_THIS.set(host, !isEnble);
    const delPicker = () => Storage.CURR_EPISODE_SELECTOR.del(host) & Storage.REL_EPISODE_SELECTOR.del(host);
    [
      { title: "设置零键秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL, isDisable: this.isLive() },
      { title: "设置倍速步长", cache: Storage.PLAY_RATE_STEP, isDisable: this.isLive() || this.isDisablePlaybackRate() },
      { title: "设置快进/退秒数", cache: Storage.SKIP_INTERVAL, isDisable: this.isLive() || !this.isOverrideKeyboard() },
      { title: `此站${isEnble ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isDisable: Site.isMatch(), fn: siteFun },
      { title: "删除此站的剧集选择器", cache: EPISODE_SELECTOR, isDisable: !EPISODE_SELECTOR.get(host), fn: delPicker },
      { title: "更多设置", cache: Storage.OVERRIDE_KEYBOARD, isDisable: false, fn: () => this.moreSettPopup() },
    ].forEach(({ title, cache, isDisable, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isDisable) return;

      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this);

        const input = prompt(title, cache.get());
        if (!isNaN(input) && cache.parser(input)) cache.set(input);
      });
    });
  },
  moreSettPopup() {
    const configs = [
      { name: "key", text: "空格 ◀▶ 键 控制", cache: Storage.OVERRIDE_KEYBOARD },
      { name: "auto", text: "禁用自动网页全屏", cache: Storage.DISABLE_AUTO, hide: !Site.isMatch() },
      { name: "rate", text: "禁用视频倍速调节", cache: Storage.CLOSE_PLAY_RATE, hide: this.isLive() },
      { name: "time", text: "禁用播放进度记录", cache: Storage.DISABLE_MEMORY_TIME, hide: this.isLive() },
    ];
    const html = configs.map(
      ({ name, text, hide }) => `<label class="__menu ${hide && "hide"}">${text}<input name="${name}" type="checkbox"/></label>`
    );
    Swal.fire({
      width: 350,
      backdrop: false,
      title: "更多设置",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      html: html.join(Consts.EMPTY),
      customClass: { container: "monkey-web-fullscreen" },
      didOpen(popup) {
        Tools.querys(".__menu input", popup).forEach((ele, i) => {
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
