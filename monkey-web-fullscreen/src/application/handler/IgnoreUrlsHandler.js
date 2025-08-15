import URLBlacklist from "../common/URLBlacklist";
import Storage from "../common/Storage";
import Tools from "../common/Tools";

/**
 * 忽略网址处理逻辑
 */
export default {
  setupIgnoreUrlsChangeListener() {
    this.initializeIgnoreUrls();
    [Storage.FULL_IGNORE_URLS.name, Storage.NEXT_IGNORE_URLS.name].forEach((key) =>
      GM_addValueChangeListener(key, (_, oldVal, newVal) => {
        if (oldVal === newVal) return; // 防止无限循环
        this.initializeIgnoreUrls();
      })
    );
  },
  initializeIgnoreUrls() {
    // 「自动下集」忽略URL处理
    const nextUrls = this.processIgnoreUrls(Storage.NEXT_IGNORE_URLS, [
      "https://www.youtube.com/watch/",
      "https://www.bilibili.com/video/",
      "https://www.bilibili.com/list/",
    ]);
    this.nextUrlFilter = new URLBlacklist(nextUrls);

    // 「自动网页全屏」忽略URL处理
    const fullUrls = this.processIgnoreUrls(Storage.FULL_IGNORE_URLS, [
      "https://www.youtube.com/shorts/",
      "https://www.youtube.com/",
    ]);
    this.fullUrlFilter = new URLBlacklist(fullUrls);
  },
  isNextIgnoreUrl() {
    return this.topWin ? this.nextUrlFilter.isBlocked(this.topWin.url) : false;
  },
  isFullIgnoreUrl() {
    return this.topWin ? this.fullUrlFilter.isBlocked(this.topWin.url) : false;
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
