export default class I18n {
  static langPacks = {
    // 简体中文
    zh_CN: {
      enable: "启用自动网页全屏",
      disable: "禁用自动网页全屏",
      ignore: "自动时忽略的网址",
      custom: "自定义视频容器",
      step: "设置倍速步进",
      speed: "倍速",
    },
    // 繁体中文（可扩展）
    zh_TW: {
      enable: "啓用自動網頁全屏",
      disable: "禁用自動網頁全屏",
      ignore: "自動時忽略的網址",
      custom: "自定義視頻容器",
      step: "設置倍速步進",
      speed: "倍速",
    },
    // 英文
    en: {
      enable: "Enable automatic web full-screen",
      disable: "Disable automatic web full-screen",
      ignore: "Exclude URLs from auto full-screen",
      custom: "Custom video container",
      step: "Set speed step",
      speed: "Speed",
    },
  };

  /**
   * 获取当前使用的语言
   * @returns {string} 语言标识（如 zh_CN、en）
   */
  static getLang() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.includes("zh-TW") || browserLang.includes("zh-HK")) return "zh_TW";
    return browserLang.includes("zh") ? "zh_CN" : "en";
  }

  /**
   * 获取国际化文本
   * @param {String} key
   * @returns
   */
  static t(key) {
    const lang = this.getLang();
    return this.langPacks[lang][key];
  }
}
