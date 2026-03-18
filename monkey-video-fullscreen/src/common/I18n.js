export default class I18n {
  static #langPacks = {
    zh: {
      enable: "启用自动网页全屏",
      disable: "禁用自动网页全屏",
      ignore: "自动时忽略的网址",
      custom: "自定义视频容器",
      fsChange: "扩展代码逻辑",
      detach: "脱离阈值",
    },
    en: {
      enable: "Enable auto web fullscreen",
      disable: "Disable auto web fullscreen",
      detach: "Detached fullscreen threshold",
      fsChange: "Fullscreen change extend handler",
      custom: "Custom video fullscreen container",
      ignore: "URLs ignored in auto mode",
    },
  };

  static #getLang = () => ((navigator.language || navigator.userLanguage).includes("zh") ? "zh" : "en");

  static t = (key) => this.#langPacks[this.#getLang()][key];
}
