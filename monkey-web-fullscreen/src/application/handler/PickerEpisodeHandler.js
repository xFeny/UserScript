import Storage from "../common/Storage";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

/**
 * 手动采集剧集元素选择器
 * https://gqc7.top/
 * https://ddys.pro/
 * https://gaze.run/
 * https://miao101.com/
 * https://www.xuandm.com/
 * https://www.freeok123.com/
 */
export default {
  setupPickerEpisodeListener() {
    if (Site.isMatch() || this.hasPickerListener) return;
    this.hasPickerListener = true;
    document.body.addEventListener(
      "click",
      (event, { target, ctrlKey, altKey, isTrusted } = event) => {
        if (!ctrlKey || !altKey || !isTrusted || this.isLive()) return;
        if (!Tools.isTopWin()) return Tools.notyf("此页面不能抓取 (•ิ_•ิ)?", true);
        Tools.preventDefault(event);

        const hasCurrentSelector = Storage.CURR_EPISODE_SELECTOR.get(location.host);
        const hasRelativeSelector = Storage.REL_EPISODE_SELECTOR.get(location.host);
        if (hasCurrentSelector && hasRelativeSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);

        const number = this.getEpisodeNumber(target);
        if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);

        !hasCurrentSelector ? this.pickerCurrentEpisodeChain(target) : this.pickerRelativeEpisodeChain(target);
      },
      true
    );
  },
  pickerCurrentEpisodeChain(element) {
    if (Storage.CURR_EPISODE_SELECTOR.get(location.host)) return;
    this.pickerEpisodePopup(element, {
      validBtnCallback(value) {
        try {
          const number = this.getEpisodeNumber(Tools.query(value));
          !!number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
        } catch (e) {
          Tools.notyf("获取集数失败 〒▽〒", true);
          console.error(e);
        }
      },
      confirmCallback(value) {
        Storage.CURR_EPISODE_SELECTOR.set(location.host, value);
        Tools.notyf("继续拾取元素 ＼(＞０＜)／");
      },
    });
  },
  pickerRelativeEpisodeChain(element) {
    if (Storage.REL_EPISODE_SELECTOR.get(location.host)) return;
    this.pickerEpisodePopup(element, {
      validBtnCallback(value) {
        try {
          const container = this.getEpisodeWrapper(Tools.query(value));
          const numbers = this.getAllEpisodes(container)?.map(this.getEpisodeNumber);
          !!numbers.length ? Tools.notyf(`所有集数：${numbers.join(" ")}`) : Tools.notyf("获取集数失败 〒▽〒", true);
        } catch (e) {
          Tools.notyf("获取集数失败 〒▽〒", true);
          console.error(e);
        }
      },
      confirmCallback(value) {
        Storage.REL_EPISODE_SELECTOR.set(location.host, value);
        Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
      },
    });
  },
  getCurrentEpisodeBySelector() {
    const num = this.getEpisodeNumber(Tools.query(Storage.CURR_EPISODE_SELECTOR.get(location.host)));
    const current = this.getEpisodeWrapper(Tools.query(Storage.CURR_EPISODE_SELECTOR.get(location.host)));
    const episodes = this.getAllEpisodes(this.getEpisodeWrapper(Tools.query(Storage.REL_EPISODE_SELECTOR.get(location.host))));
    return episodes.includes(current) ? current : episodes.find((el) => this.getEpisodeNumber(el) === num);
  },
  pickerEpisodePopup(element, { validBtnCallback, confirmCallback }) {
    Swal.fire({
      html: `<h4>验证能正确取到集数，再确定保存</h4>
      <textarea id="__picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
      <p>编辑元素选择器，确保能正确获取到集数</p>`,
      customClass: { container: "monkey-web-fullscreen" },
      title: "拾取剧集元素选择器",
      confirmButtonText: "保存",
      denyButtonText: "验证",
      showCloseButton: true,
      showDenyButton: true,
      reverseButtons: true,
      focusDeny: true,
      preDeny: () => {
        const value = Tools.query("#__picker").value.trim();
        return value ? validBtnCallback.call(this, value) ?? false : Tools.notyf("元素选择器不能为空！", true);
      },
      preConfirm: () => Tools.query("#__picker").value.trim() || Tools.notyf("元素选择器不能为空！", true),
      didOpen: () => (Tools.query("#__picker").value = Tools.getParentChain(element)),
    }).then((result) => result.isConfirmed && confirmCallback.call(this, result.value));
  },
};
