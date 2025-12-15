import URLBlacklist from "../lib/URLBlacklist";
import Storage from "../common/Storage";

/**
 * 处理：自动网页全屏时忽略的网址
 */
export default {
  defIgnore: ["https://www.youtube.com/results", "https://www.youtube.com/shorts", "https://www.bilibili.com/anime"],
  setupIgnoreUrlsChangeListener() {
    this.initializeIgnoreUrls();

    GM_addValueChangeListener(Storage.IGNORE_URLS.name, (_, oldVal, newVal) => {
      if (oldVal === newVal) return; // 防止无限循环
      this.initializeIgnoreUrls();
    });
  },
  initializeIgnoreUrls() {
    // 「自动网页全屏」忽略URL处理
    const urls = this.processIgnoreUrls(Storage.IGNORE_URLS, this.defIgnore);
    this.urlFilter = new URLBlacklist(urls);
  },
  isIgnoreUrl() {
    return this.urlFilter?.isBlocked(this.topWin?.url ?? location.href);
  },
  processIgnoreUrls(cache, defaultUrls) {
    const urlsStr = cache.get() ?? "";
    const existUrls = urlsStr.split(/[;\n]/).filter((e) => e.trim());

    // 返回用户配置的URL
    if (existUrls.length) return existUrls;

    // 设置默认值
    cache.set(defaultUrls.join(";\n"));
    return defaultUrls;
  },
};
