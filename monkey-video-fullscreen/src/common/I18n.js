export default class I18n {
  static langPacks = {
    // 简体中文
    zh_CN: {
      detach: "此站脱离式全屏阈值",
      enable: "启用自动网页全屏",
      disable: "禁用自动网页全屏",
      ignore: "自动时忽略的网址",
      custom: "自定义视频容器",
      close: "关闭",
    },
    // 繁体中文（可扩展）
    zh_TW: {
      detach: "此站脫離式全屏閾值",
      enable: "啓用自動網頁全屏",
      disable: "禁用自動網頁全屏",
      ignore: "自動時忽略的網址",
      custom: "自定義視頻容器",
      close: "關閉",
    },
    // 英文
    en: {
      detach: "Leave the original DOM threshold",
      enable: "Enable automatic web full-screen",
      disable: "Disable automatic web full-screen",
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
    const lang = navigator.language || navigator.userLanguage;
    return lang.includes("zh-TW") || lang.includes("zh-HK") ? "zh_TW" : lang.includes("zh") ? "zh_CN" : "en";
  }

  /**
   * 获取国际化文本
   * @param {String} key
   * @returns
   */
  static t(key) {
    return this.langPacks[this.getLang()][key];
  }
}
