import Tools from "../common/Tools";
import Storage from "../common/Storage";
const { ALL_EPISODE_CHAIN, CURRENT_EPISODE_CHAIN } = Storage;

/**
 * 手动采集剧集元素所在
 */
export default {
  setupPickerEpisodeListener() {
    document.addEventListener("click", (event) => {
      if (!event.ctrlKey || !event.altKey) return;
      if (!Tools.isTopWin()) return alert("当前窗口无法操作！！");
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      if (CURRENT_EPISODE_CHAIN.get(location.host) && ALL_EPISODE_CHAIN.get(location.host)) {
        return alert("已获取过，请先在脚本菜单清除缓存后再操作！！");
      }

      let target = event.target;
      if (target.tagName === "A" && target.href === "javascript:;") target = target.parentNode;
      if (!CURRENT_EPISODE_CHAIN.get(location.host)) {
        this.setCurrentEpisodeChain(target);
      } else {
        this.setAllEpisodeChain(target);
      }
    });
  },
  setCurrentEpisodeChain(eventTarget) {
    if (CURRENT_EPISODE_CHAIN.get(location.host)) return;
    const targetChain = Tools.getParentChain(eventTarget);
    const currentNumber = this.getEpisodeNumber(Tools.query(targetChain));
    const result = confirm("当前集数：" + currentNumber + "\n是否能正确获取到当前集数？");
    if (!result) return;
    CURRENT_EPISODE_CHAIN.set(location.host, targetChain);
    alert("当前集数元素已获取，请继续操作获取下一集所在的位置！！");
  },
  setAllEpisodeChain(eventTarget) {
    if (ALL_EPISODE_CHAIN.get(location.host)) return;
    const container = this.getCurrentEpisodeContainer(eventTarget);
    const allEpisodeElement = this.getAllEpisodeElement(container);
    const numbers = Array.from(allEpisodeElement).map((ele) => this.getEpisodeNumber(ele));
    const result = confirm("所有剧集数：\n" + numbers.join(" ") + "\n是否能正确获取到所有剧集？");
    if (!result) return alert("请重新操作！！");
    const isConfirm = confirm("确定能正确获取到所有剧集？");
    if (!isConfirm) return alert("请重新操作！！");
    const chain = Tools.getParentChain(container.parentElement);
    Tools.alert("ALL_EPISODE_CHAIN：", chain);
    ALL_EPISODE_CHAIN.set(location.host, chain);
  },
  getCurrentEpisodeForChain() {
    const currNumberChain = CURRENT_EPISODE_CHAIN.get(location.host);
    if (!currNumberChain) return;
    Tools.alert("当前集的chain：", currNumberChain);
    Tools.alert("所有集集的chain：", ALL_EPISODE_CHAIN.get(location.host));
    const currNumber = this.getEpisodeNumber(Tools.query(currNumberChain));
    const allEpisodeElement = Tools.query(ALL_EPISODE_CHAIN.get(location.host))?.children;
    return Array.from(allEpisodeElement).find((ele) => this.getEpisodeNumber(ele) === currNumber);
  },
};
