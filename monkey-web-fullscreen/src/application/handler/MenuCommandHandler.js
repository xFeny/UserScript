import Storage from "../common/Storage";
import Consts from "../common/Consts";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

const { ENABLE_THIS_SITE_AUTO: ENABLE_THIS, CURR_EPISODE_SELECTOR: EPISODE_SELECTOR } = Storage;

/**
 * 脚本菜单相关逻辑处理
 */
export default {
  isDisableZoom: () => Storage.DISABLE_ZOOM_MOVE.get(),
  isDisableAuto: () => Storage.DISABLE_AUTO.get(),
  isOverrideKeyboard: () => Storage.OVERRIDE_KEYBOARD.get(),
  isDisablePlaybackRate: () => Storage.CLOSE_PLAY_RATE.get(),
  isDisableScreenshot: () => Storage.DISABLE_SCREENSHOT.get(),
  isEnbleSiteAuto: () => ENABLE_THIS.get(Tools.isTopWin() ? location.host : window?.topWin?.host),
  setupScriptMenuCommand() {
    if (this.hasMenu || !Tools.isTopWin() || Tools.isTooFrequent("menu")) return;
    this.setupMenuChangeListener();
    this.registMenuCommand();
    this.hasMenu = true;
  },
  setupMenuChangeListener() {
    const host = location.host;
    [
      ENABLE_THIS.name + host,
      Storage.CLOSE_PLAY_RATE.name,
      EPISODE_SELECTOR.name + host,
      Storage.OVERRIDE_KEYBOARD.name,
      Storage.DISABLE_MEMORY_TIME.name,
      Storage.ENABLE_AUTO_NEXT_EPISODE.name,
    ].forEach((key) => GM_addValueChangeListener(key, () => this.registMenuCommand()));
  },
  registMenuCommand() {
    const host = location.host;
    const isEnble = this.isEnbleSiteAuto();
    const siteFun = ({ cache }) => cache.set(host, !isEnble);
    const delPicker = () => Storage.CURR_EPISODE_SELECTOR.del(host) & Storage.REL_EPISODE_SELECTOR.del(host);
    const customWebFullscreen = ({ cache, title }) => cache.set(host, prompt(title, cache.get(host)) ?? cache.get(host));

    // 菜单配置项
    const configs = [
      { title: "设置零键秒数", cache: Storage.ZERO_KEY_SKIP_INTERVAL, isHidden: false },
      { title: "设置倍速步长", cache: Storage.PLAY_RATE_STEP, isHidden: this.isDisablePlaybackRate() },
      { title: "设置快进/退秒数", cache: Storage.SKIP_INTERVAL, isHidden: !this.isOverrideKeyboard() },
      // { title: "设置进度保存天数", cache: Storage.STORAGE_DAYS, isHidden: Storage.DISABLE_MEMORY_TIME.get() },
      { title: `此站${isEnble ? "禁" : "启"}用自动网页全屏`, cache: ENABLE_THIS, isHidden: Site.isMatch(), fn: siteFun },
      { title: "设置此站网页全屏规则", cache: Storage.CUSTOM_WEB_FULL, isHidden: Site.isMatch(), fn: customWebFullscreen },
      { title: "设置自动下集的提前秒数", cache: Storage.AUTO_NEXT_ADVANCE_SEC, isHidden: Storage.ENABLE_AUTO_NEXT_EPISODE.get() },
      { title: "删除此站剧集选择器", cache: EPISODE_SELECTOR, isHidden: !EPISODE_SELECTOR.get(host), fn: delPicker },
      { title: "快捷键说明", cache: Storage.DISABLE_AUTO, isHidden: false, fn: () => this.shortcutKeysPopup() },
      { title: "更多设置", cache: Storage.OVERRIDE_KEYBOARD, isHidden: false, fn: () => this.moreSettPopup() },
    ];

    // 注册菜单项
    configs.forEach(({ title, cache, isHidden, fn }) => {
      const id = `${cache.name}_MENU_ID`;
      GM_unregisterMenuCommand(this[id]);
      if (isHidden) return;

      this[id] = GM_registerMenuCommand(title, () => {
        if (fn) return fn.call(this, { cache, title });

        const input = prompt(title, cache.get());
        if (!isNaN(input) && cache.parser(input)) cache.set(input);
      });
    });
  },
  moreSettPopup() {
    // 更多设置弹窗中的配置项
    const configs = [
      { name: "cut", text: "禁用视频截图", cache: Storage.DISABLE_SCREENSHOT },
      { name: "zoom", text: "禁用缩放与移动", cache: Storage.DISABLE_ZOOM_MOVE },
      { name: "auto", text: "禁用自动网页全屏", cache: Storage.DISABLE_AUTO, hide: !Site.isMatch() },
      { name: "rate", text: "禁用视频倍速调节", cache: Storage.CLOSE_PLAY_RATE, hide: this.isLive() },
      { name: "time", text: "禁用播放进度记录", cache: Storage.DISABLE_MEMORY_TIME, hide: this.isLive() },
      { name: "pause", text: "禁用标签页隐藏暂停", cache: Storage.DISABLE_INVISIBLE_PAUSE },
      { name: "next", text: "启用自动切换至下集", cache: Storage.ENABLE_AUTO_NEXT_EPISODE },
      { name: "override", text: "启用 空格◀️▶️ 控制", cache: Storage.OVERRIDE_KEYBOARD },
    ];

    // 将配置项数组转换为HTML字符串数组
    // 每个配置项生成一个带复选框的标签元素
    const html = configs.map(
      ({ name, text, hide }) => `<label class="__menu ${hide && "hide"}">${text}<input name="${name}" type="checkbox"/></label>`
    );

    Swal.fire({
      width: 350,
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
  shortcutKeysPopup() {
    const shortcutKeys = [
      { key: "P", desc: "切换网页全屏" },
      { key: "N", desc: "切换下集视频" },
      { key: "Z", desc: "恢复正常倍速" },
      { key: "R", desc: "画面旋转 90 度" },
      { key: "M", desc: "静音 / 取消静音" },
      { key: "D", desc: "显示 / 隐藏 弹幕" },
      { key: "L / K", desc: "下一帧 / 上一帧" },
      { key: "Ctrl Z", desc: "复位缩放与移动" },
      { key: "Shift L", desc: "显示原生控制栏" },
      { key: "Shift R", desc: "视频水平镜像翻转" },
      { key: "Shift P", desc: "进入 / 退出 画中画" },
      { key: "Ctrl Alt A", desc: "视频截图 (默认禁用)" },
      { key: "Alt ➕ / ➖", desc: "视频缩放 (默认禁用)" },
      { key: "A / S 或 ➕ / ➖", desc: "播放倍速 ±0.25" },
      { key: "Alt ◀️🔼🔽▶️", desc: "移动视频画面 (默认禁用)" },
      { key: "◀️▶️", desc: "快退 / 快进 5秒 (默认禁用)" },
      { key: "空格", desc: "播放 / 暂停 (默认禁用)" },
      { key: "1️ 至 9️", desc: "1️ 至 9️ 倍速" },
      { key: "数字 0️", desc: "快进 30 秒" },
    ];

    const rows = shortcutKeys.map(({ key, desc }) => `<tr><td>${key}</td><td>${desc}</td></tr>`).join(Consts.EMPTY);

    Swal.fire({
      width: 600,
      title: "快捷键说明",
      showCancelButton: true,
      cancelButtonText: "关闭",
      showConfirmButton: false,
      customClass: { container: "monkey-web-fullscreen" },
      html: `<table><tr><th>快捷键</th><th>说明</th></tr>${rows}</table>`,
    });
  },
};
