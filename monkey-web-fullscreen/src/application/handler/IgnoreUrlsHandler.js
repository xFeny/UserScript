import Storage from "../common/Storage";

/**
 * 处理：
 * 自动切换下集时忽略的网址
 * 自动网页全屏时忽略的网址
 */
export default {
  setupIgnoreUrlsChangeListener() {
    [Storage.FULL_IGNORE_URLS.name, Storage.NEXT_IGNORE_URLS.name].forEach((key) =>
      GM_addValueChangeListener(key, (_, oldVal, newVal) => oldVal !== newVal && this.initializeIgnoreUrls())
    );
  },
  initializeIgnoreUrls() {
    // 「自动下集」忽略URL处理
    const nextIgnore = ["https://www.youtube.com/watch", "https://www.bilibili.com/video", "https://www.bilibili.com/list"];
    this.nextFilter = this.processIgnoreUrls(Storage.NEXT_IGNORE_URLS, nextIgnore);

    // 「自动网页全屏」忽略URL处理
    const wideIgnore = ["https://www.youtube.com/results", "https://www.youtube.com/shorts"];
    this.wideFilter = this.processIgnoreUrls(Storage.FULL_IGNORE_URLS, wideIgnore);
  },
  isIgnoreNext() {
    if (!this.nextFilter) this.initializeIgnoreUrls();
    return this.isBlocked(this.nextFilter);
  },
  isIgnoreWide() {
    if (!this.wideFilter) this.initializeIgnoreUrls();
    return this.isBlocked(this.wideFilter);
  },
  processIgnoreUrls(cache, defUrls) {
    const existUrls = (cache.get() || "").split(/[;\n]/).filter((e) => e.trim());
    return existUrls.length ? existUrls : (cache.set(defUrls.join(";\n")), defUrls);
  },
  isBlocked(urls = []) {
    const { href, pathname } = new URL(this.topWin.url);
    return pathname === "/" || urls.some((u) => href.startsWith(u));
  },
};
