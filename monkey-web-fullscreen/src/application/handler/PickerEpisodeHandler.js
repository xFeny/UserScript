import Storage from "../common/Storage";
import WebSite from "../common/WebSite";
import Tools from "../common/Tools";
import Swal from "sweetalert2";

const { ALL_EPISODE_CHAIN, CURRENT_EPISODE_CHAIN } = Storage;

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

        const hasPickerAllEpisode = ALL_EPISODE_CHAIN.get(location.host);
        const hasPickerCurrEpisode = CURRENT_EPISODE_CHAIN.get(location.host);
        if (hasPickerCurrEpisode && hasPickerAllEpisode) {
          return Tools.notyf("已拾取过剧集元素 (￣ー￣)", true);
        }

        const target = event.target;
        const number = this.getEpisodeNumber(target);
        if (!number) return Tools.notyf("点击位置无数字 (•ิ_•ิ)?", true);

        !hasPickerCurrEpisode ? this.setCurrentEpisodeChain(target) : this.setAllEpisodeChain(target);
      },
      true
    );
  },
  setCurrentEpisodeChain(element) {
    if (CURRENT_EPISODE_CHAIN.get(location.host)) return;
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
        CURRENT_EPISODE_CHAIN.set(location.host, value);
        Tools.notyf("继续拾取元素 ＼(＞０＜)／");
      },
    });
  },
  setAllEpisodeChain(element) {
    if (ALL_EPISODE_CHAIN.get(location.host)) return;
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
        ALL_EPISODE_CHAIN.set(location.host, value);
        Tools.notyf("操作完成 []~(￣▽￣)~* 干杯");
      },
    });
  },
  getCurrentEpisodeForChain() {
    const currChain = CURRENT_EPISODE_CHAIN.get(location.host);
    if (!currChain) return;
    const currEpisode = Tools.query(currChain);
    const currNumber = this.getEpisodeNumber(currEpisode);
    const chain = ALL_EPISODE_CHAIN.get(location.host);
    const container = this.getEpisodeContainer(Tools.query(chain));
    const episodes = this.getAllEpisodeElement(container);
    return episodes.includes(currEpisode)
      ? currEpisode
      : episodes.find((ele) => this.getEpisodeNumber(ele) === currNumber);
  },
  pickerEpisodeDialog(element, { validBtnCallback, confirmCallback }) {
    Swal.fire({
      html: `<h4>验证能正确获取到集数，再确定保存</h4>
      <textarea id="picker-chain" class="swal2-textarea" placeholder="请输入元素选择器"></textarea>
      <p>编辑选择器确保能正确获取到集数</p>`,
      customClass: { container: "monkey-web-fullscreen" },
      title: "抓取剧集元素选择器",
      confirmButtonText: "保存",
      denyButtonText: "验证",
      showCloseButton: true,
      showDenyButton: true,
      reverseButtons: true,
      focusDeny: true,
      preDeny: () => {
        const value = Tools.query("#picker-chain").value.trim();
        if (!value) return Tools.notyf("元素选择器不能为空！", true);
        validBtnCallback.call(this, value);
        return false;
      },
      preConfirm: () => {
        const value = Tools.query("#picker-chain").value.trim();
        if (value) return value;
        Tools.notyf("元素选择器不能为空！", true);
        return false;
      },
      didOpen: () => {
        const textarea = Tools.query("#picker-chain");
        textarea.value = Tools.getParentChain(element);
      },
    }).then((result) => {
      if (!result.isConfirmed) return;
      confirmCallback.call(this, result.value);
    });
  },
};
