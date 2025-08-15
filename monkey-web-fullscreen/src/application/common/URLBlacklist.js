/**
 * 网址黑名单过滤器
 * 用于判断一个URL是否在黑名单中
 */
export default class URLBlacklist {
  constructor(blacklist) {
    this.blacklist = this.normalizeBlacklist(blacklist);
  }

  normalizeBlacklist(urls) {
    return urls
      .map((url) => {
        try {
          const parsedUrl = new URL(url);
          return {
            hostname: parsedUrl.hostname,
            pathname: this.normalizePath(parsedUrl.pathname),
          };
        } catch (e) {
          console.error(`无效的URL: ${url}`, e);
          return null;
        }
      })
      .filter(Boolean);
  }

  normalizePath(path) {
    // 移除末尾的斜杠（除了根路径）
    if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
    return path;
  }

  isBlocked(url) {
    try {
      const parsedUrl = new URL(url);
      const normalizedPath = this.normalizePath(parsedUrl.pathname);

      // 检查是否与黑名单中的任何条目匹配
      return this.blacklist.some((entry) => {
        // 首先匹配主机名
        if (parsedUrl.hostname !== entry.hostname) return false;

        // 然后匹配路径
        if (entry.pathname === "/") {
          // 根路径只精确匹配网站首页，不匹配任何子路径
          return normalizedPath === "/";
        } else {
          // 其他路径匹配精确路径或其子路径
          return normalizedPath === entry.pathname || normalizedPath.startsWith(`${entry.pathname}/`);
        }
      });
    } catch (e) {
      console.error(`Invalid URL to check: ${url}`, e);
      return false;
    }
  }
}
