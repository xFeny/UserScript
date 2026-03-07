export default class I18n {
  static #langPacks = {
    zh: {
      enable: "启用自动网页全屏",
      disable: "禁用自动网页全屏",
      ignore: "自动时忽略的网址",
      element: "定义全屏点击元素",
      hidden: "全屏时隐藏元素",
      custom: "自定义视频容器",
      detach: "脱离式全屏阈值",
    },
    en: {
      enable: "Enable auto web fullscreen",
      disable: "Disable auto web fullscreen",
      hidden: "Elements hidden in fullscreen",
      detach: "Detached fullscreen threshold",
      element: "fullscreen click elements",
      ignore: "URLs ignored in auto mode",
      custom: "Custom video container",
    },
  };

  static #getLang = () => ((navigator.language || navigator.userLanguage).includes("zh") ? "zh" : "en");

  static t = (key) => this.#langPacks[this.#getLang()][key];
}
