import Tools from "../common/Tools";

/**
 *  斗鱼视频相关操作
 */
export default {
  play: () => Tools.query(".ControllerBarPlay")?.click(),
  pause: () => Tools.query(".ControllerBarStop")?.click(),
  addStyle(ele) {
    let style = Tools.query("style", ele);
    if (style) return;
    style = document.createElement("style");
    style.textContent =
      ".showToast{color:#fff!important;font-size:13.5px!important;padding:5px 15px!important;border-radius:5px!important;position:absolute!important;z-index:2147483647!important;font-weight:400!important;transition:opacity 300ms ease-in;background:rgba(0,0,0,.75)!important}";
    ele.appendChild(style);
  },
};
