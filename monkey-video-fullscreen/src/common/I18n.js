export default class I18n {
  static langPacks = {
    // 简体中文
    zh_CN: {
      detach: "此站脱离式全屏阈值",
      enAuto: "启用自动网页全屏",
      disAuto: "禁用自动网页全屏",
      ignore: "自动时忽略的网址",
      custom: "自定义视频容器",
      close: "关闭",
    },
    // 繁体中文（可扩展）
    zh_TW: {
      detach: "此站脫離式全屏閾值",
      enAuto: "啓用自動網頁全屏",
      disAuto: "禁用自動網頁全屏",
      ignore: "自動時忽略的網址",
      custom: "自定義視頻容器",
      close: "關閉",
    },
    // 英文
    en: {
      detach: "Leave the original DOM threshold",
      enAuto: "Enable automatic web full-screen",
      disAuto: "Disable automatic web full-screen",
      ignore: "Exclude URLs from auto full-screen",
      custom: "Custom video container",
      close: "close",
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
