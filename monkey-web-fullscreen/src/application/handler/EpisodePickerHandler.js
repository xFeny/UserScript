import Storage from "../common/Storage";
import Tools from "../common/Tools";
import Site from "../common/Site";
import Swal from "sweetalert2";

/**
 * 手动采集剧集元素选择器，进行下集切换适配
 *
 * https://gqc7.top/
 * https://ddys.pro/
 * https://gaze.run/
 * https://miao101.com/
 * https://www.xuandm.com/
 * https://www.freeok123.com/
 */
export default {
  setupPickerListener() {
    if (Site.isGmMatch() || this.isExecuted("isBindPicker")) return;

    const handle = (event, { target, ctrlKey, altKey, isTrusted } = event) => {
      if (!ctrlKey || !altKey || !isTrusted || this.isNoVideo() || this.isLive()) return;
      Tools.preventDefault(event);

      const curSelector = Storage.CURRENT_EPISODE.get(this.host);
      const relSelector = Storage.RELATIVE_EPISODE.get(this.host);
      if (curSelector && relSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);

      const number = this.getEpisodeNumber(target);
      if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);

      curSelector ? this.pickerRelativeEpisodePath(target) : this.pickerCurrentEpisodePath(target);
    };

    document.addEventListener("click", handle, true);
  },
  pickerCurrentEpisodePath(el) {
    if (Storage.CURRENT_EPISODE.get(this.host)) return;
    this.pickerEpisodePopup(el, {
      onVerify(value) {
        try {
          const number = this.getEpisodeNumber(Tools.query(value));
          number ? Tools.notyf(`当前集数：${number}`) : Tools.notyf("获取集数失败 〒▽〒", true);
        } catch (e) {
          Tools.notyf("获取集数失败 〒▽〒", true);
          console.error(e);
        }
      },
      onSave(value) {
        Storage.CURRENT_EPISODE.set(value, this.host);
        Tools.notyf("继续拾取元素 ＼(＞０＜)／");
      },
    });
  },
  pickerRelativeEpisodePath(el) {
    if (Storage.RELATIVE_EPISODE.get(this.host)) return;
    this.pickerEpisodePopup(el, {
      onVerify(value) {
        try {
          const container = this.getEpisodeWrapper(Tools.query(value));
          const numbers = this.getAllEpisodes(container)?.map(this.getEpisodeNumber);
          numbers.length ? Tools.notyf(`所有集数：${numbers.join(" ")}`) : Tools.notyf("获取集数失败 〒▽〒", true);
        } catch (e) {
          Tools.notyf("获取集数失败 〒▽〒", true);
          console.error(e);
        }
      },
      onSave(value) {
        Storage.RELATIVE_EPISODE.set(value, this.host);
        Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
      },
    });
  },
  getCurrentEpisodeNumber() {
    const selector = Storage.CURRENT_EPISODE.get(this.topWin.host);
    return selector ? this.getEpisodeNumber(Tools.query(selector)) : null;
  },
  getCurrentEpisodeBySelector() {
    const num = this.getCurrentEpisodeNumber();
    const current = this.getEpisodeWrapper(Tools.query(Storage.CURRENT_EPISODE.get(this.host)));
    const episodes = this.getAllEpisodes(this.getEpisodeWrapper(Tools.query(Storage.RELATIVE_EPISODE.get(this.host))));
    return episodes.includes(current) ? current : episodes.find((el) => this.getEpisodeNumber(el) === num);
  },
  pickerEpisodePopup(el, { onVerify, onSave }) {
    Swal.fire({
      html: Tools.safeHTML(`<h4>验证能正确取到集数，再确定保存</h4>
      <textarea id="__picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
      <p>编辑元素选择器，确保能正确获取到集数</p>`),
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
        return value ? onVerify.call(this, value) ?? false : Tools.notyf("元素选择器不能为空！", true);
      },
      preConfirm: () => Tools.query("#__picker").value.trim() || Tools.notyf("元素选择器不能为空！", true),
      didOpen: () => (Tools.query("#__picker").value = Tools.getElementPath(el)),
    }).then((res) => res.isConfirmed && onSave.call(this, res.value));
  },
};
