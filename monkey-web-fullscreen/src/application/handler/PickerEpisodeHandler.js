import Storage from "../common/Storage";
import WebSite from "../common/WebSite";
import Tools from "../common/Tools";
import Swal from "sweetalert2";

const { RELATIVE_EPISODE_SELECTOR, CURRENT_EPISODE_SELECTOR } = Storage;

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
    if (WebSite.inMatches()) return;
    document.body.addEventListener(
      "click",
      (event) => {
        if (!event.ctrlKey || !event.altKey || !event.isTrusted) return;
        if (!Tools.isTopWin()) return Tools.notyf("此页面不能抓取 (•ิ_•ิ)?", true);
        Tools.preventDefault(event);

        const hasCurrentSelector = CURRENT_EPISODE_SELECTOR.get(location.host);
        const hasRelativeSelector = RELATIVE_EPISODE_SELECTOR.get(location.host);
        if (hasCurrentSelector && hasRelativeSelector) return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);

        const target = event.target;
        const number = this.getEpisodeNumber(target);
        if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);

        !hasCurrentSelector ? this.pickerCurrentEpisodeChain(target) : this.pickerRelativeEpisodeChain(target);
      },
      true
    );
  },
  pickerCurrentEpisodeChain(element) {
    if (CURRENT_EPISODE_SELECTOR.get(location.host)) return;
    this.pickerEpisodeDialog(element, {
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
        CURRENT_EPISODE_SELECTOR.set(location.host, value);
        Tools.notyf("继续拾取元素 ＼(＞０＜)／");
      },
    });
  },
  pickerRelativeEpisodeChain(element) {
    if (RELATIVE_EPISODE_SELECTOR.get(location.host)) return;
    this.pickerEpisodeDialog(element, {
      validBtnCallback(value) {
        try {
          const container = this.getEpisodeContainer(Tools.query(value));
          if (!container) return Tools.notyf("获取集数失败 〒▽〒", true);
          const allEpisode = this.getAllEpisodeElement(container);
          const numbers = allEpisode.map(this.getEpisodeNumber);
          const numJoin = numbers.join(" ");
          !!numbers.length ? Tools.notyf(`所有集数：${numJoin}`) : Tools.notyf("获取集数失败 〒▽〒", true);
        } catch (e) {
          Tools.notyf("获取集数失败 〒▽〒", true);
          console.error(e);
        }
      },
      confirmCallback(value) {
        RELATIVE_EPISODE_SELECTOR.set(location.host, value);
        Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
      },
    });
  },
  getCurrentEpisodeBySelector() {
    const currEpisodeSelector = CURRENT_EPISODE_SELECTOR.get(location.host);
    if (!currEpisodeSelector) return;
    const currEpisode = Tools.query(currEpisodeSelector);
    const currNumber = this.getEpisodeNumber(currEpisode);
    const selector = RELATIVE_EPISODE_SELECTOR.get(location.host);
    const container = this.getEpisodeContainer(Tools.query(selector));
    const episodes = this.getAllEpisodeElement(container);
    return episodes.includes(currEpisode)
      ? currEpisode
      : episodes.find((ele) => this.getEpisodeNumber(ele) === currNumber);
  },
  pickerEpisodeDialog(element, { validBtnCallback, confirmCallback }) {
    Swal.fire({
      html: `<h4>验证能正确获取到集数，再确定保存</h4>
      <textarea id="monkey-picker" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
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
        const value = Tools.query("#monkey-picker").value.trim();
        if (!value) return Tools.notyf("元素选择器不能为空！", true);
        validBtnCallback.call(this, value);
        return false;
      },
      preConfirm: () => {
        const value = Tools.query("#monkey-picker").value.trim();
        if (value) return value;
        return Tools.notyf("元素选择器不能为空！", true);
      },
      didOpen: () => (Tools.query("#monkey-picker").value = Tools.getParentChain(element)),
    }).then((result) => (result.isConfirmed ? confirmCallback.call(this, result.value) : null));
  },
};
