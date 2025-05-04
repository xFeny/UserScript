import Tools from "../common/Tools";
import Storage from "../common/Storage";
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
const { ALL_EPISODE_CHAIN, CURRENT_EPISODE_CHAIN } = Storage;

/**
 * 手动采集剧集元素所在
 */
export default {
  setupPickerEpisodeListener() {
    document.body.addEventListener(
      "click",
      (event) => {
        if (!event.ctrlKey || !event.altKey) return;
        if (!Tools.isTopWin()) return Swal.fire("当前窗口无法抓取元素！");
        event.preventDefault();
        event.stopPropagation();

        const hasPickerAllEpisode = ALL_EPISODE_CHAIN.get(location.host);
        const hasPickerCurrEpisode = CURRENT_EPISODE_CHAIN.get(location.host);
        if (hasPickerCurrEpisode && hasPickerAllEpisode) return Swal.fire("已抓取过！\n请先删除已抓取的");
        !hasPickerCurrEpisode ? this.setCurrentEpisodeChain(event.target) : this.setAllEpisodeChain(event.target);
      },
      true
    );
  },
  setCurrentEpisodeChain(eventTarget) {
    if (CURRENT_EPISODE_CHAIN.get(location.host)) return;
    const chain = Tools.getParentChain(eventTarget);

    this.pickerEpisodeDialog(chain, {
      validBtnCallback(value) {
        const number = this.getEpisodeNumber(Tools.query(value));
        !!number ? Tools.alert("获取到当前集数：", number) : Tools.alert("获取不到当前集数！");
      },
      confirmCallback(value) {
        CURRENT_EPISODE_CHAIN.set(location.host, value);
        Swal.fire("请继续操作抓取元素！");
      },
    });
  },
  setAllEpisodeChain(eventTarget) {
    if (ALL_EPISODE_CHAIN.get(location.host)) return;
    const chain = Tools.getParentChain(eventTarget);
    this.pickerEpisodeDialog(chain, {
      validBtnCallback(value) {
        const container = this.getCurrentEpisodeContainer(Tools.query(value));
        const allEpisode = this.getAllEpisodeElement(container);
        const numbers = Array.from(allEpisode).map((ele) => this.getEpisodeNumber(ele));
        !!numbers.length ? Tools.alert("获取到所有集数：", numbers.join(" ")) : Tools.alert("获取不到所有剧集！");
      },
      confirmCallback(value) {
        ALL_EPISODE_CHAIN.set(location.host, value);
        Swal.fire("操作完成！\n请测试能否成功切换剧集");
      },
    });
  },
  getCurrentEpisodeForChain() {
    const currNumberChain = CURRENT_EPISODE_CHAIN.get(location.host);
    if (!currNumberChain) return;
    const currNumber = this.getEpisodeNumber(Tools.query(currNumberChain));
    const chain = ALL_EPISODE_CHAIN.get(location.host);
    const container = this.getCurrentEpisodeContainer(Tools.query(chain));
    const allEpisode = this.getAllEpisodeElement(container);
    return Array.from(allEpisode).find((ele) => this.getEpisodeNumber(ele) === currNumber);
  },
  pickerEpisodeDialog(chain, { validBtnCallback, confirmCallback }) {
    Swal.fire({
      html: `<div class="picker-episode-dialog">
          <h4>验证能获取到剧集数信息，再确认保存</h4>
          <button id="validateButton" class="swal2-confirm swal2-styled">验证元素</button>
          <textarea id="customTextarea" class="swal2-textarea custom-textarea" placeholder="请输入内容"></textarea>
          <p>可编辑内容确保能获取到剧集信息</p>
        </div>`,
      title: "抓取剧集元素选择器",
      confirmButtonText: "保存",
      preConfirm: () => {
        return Tools.query("#customTextarea").value;
      },
      didOpen: () => {
        const textarea = Tools.query("#customTextarea");
        textarea.value = chain.trim();
        Tools.query("#validateButton").addEventListener("click", () => {
          const value = textarea.value;
          if (!value) return Tools.alert("元素选择器不能为空！");
          validBtnCallback.call(this, value);
        });
      },
    }).then((result) => {
      if (!result.isConfirmed) return;
      if (!result.value) return Tools.alert("元素选择器不能为空！");
      confirmCallback.call(this, result.value);
    });
  },
};
