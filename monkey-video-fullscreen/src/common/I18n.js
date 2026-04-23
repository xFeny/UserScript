export default class I18n {
  static #langPacks = {
    zh: {
      custom: "自定义此站视频容器",
      disable: "禁用自动网页全屏",
      enable: "启用自动网页全屏",
      ignore: "自动时忽略的网址",
      detach: "脱离原 DOM 阈值",
      fsCode: "扩展代码逻辑",
      setting: "更多设置",
      close: "关闭",
    },
    en: {
      custom: "Custom video container",
      enable: "Enable auto web fullscreen",
      disable: "Disable auto web fullscreen",
      detach: "Detach original DOM threshold",
      ignore: "URLs ignored in auto web fullscreen",
      fsCode: "Fullscreen change extend handler",
      setting: "More settings",
      close: "close",
    },
  };

  static #getLang = () => ((navigator.language || navigator.userLanguage).includes("zh") ? "zh" : "en");

  static t = (key) => this.#langPacks[this.#getLang()][key];
}
