import URLBlacklist from "../common//lib/URLBlacklist";
import Storage from "../common/Storage";

/**
 * 处理：
 * 自动切换下集时忽略的网址
 * 自动网页全屏时忽略的网址
 */
export default {
  defNextIgnore: ["https://www.youtube.com/watch", "https://www.bilibili.com/video", "https://www.bilibili.com/list"],
  defFullIgnore: ["https://www.youtube.com/results", "https://www.youtube.com/shorts"],
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
    const nextUrls = this.processIgnoreUrls(Storage.NEXT_IGNORE_URLS, this.defNextIgnore);
    this.nextUrlFilter = new URLBlacklist(nextUrls);

    // 「自动网页全屏」忽略URL处理
    const fullUrls = this.processIgnoreUrls(Storage.FULL_IGNORE_URLS, this.defFullIgnore);
    this.fullUrlFilter = new URLBlacklist(fullUrls);
  },
  isNextIgnoreUrl() {
    return this.nextUrlFilter?.isBlocked(this.topWin?.url ?? location.href);
  },
  isFullIgnoreUrl() {
    return this.fullUrlFilter?.isBlocked(this.topWin?.url ?? location.href);
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
