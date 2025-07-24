/**
 * 加载跨域css到StyleSheets
 * @param {*} url
 */
async function loadCrossOriginStylesheet(url) {
  try {
    const response = await fetch(url, { mode: "cors", headers: { "Content-Type": "text/css" } });
    if (!response.ok) throw new Error(`Failed to fetch CSS: ${response.status} ${response.statusText}`);

    const cssText = await response.text();
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(cssText);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];

    console.log("Cross-origin stylesheet applied successfully");
  } catch (error) {
    console.error("Error loading cross-origin stylesheet:", error);
  }
}

/**
 * 跨域样式表
 * @param {*} element
 * @param {*} url
 * @returns
 */
async function checkCrossOriginStyleSheet(element, url) {
  try {
    // 使用缓存避免重复解析
    if (!this.parsedStyleSheets.has(url)) {
      const cssText = await this.fetchCrossOriginStylesheet(url);
      const parsedSheet = new CSSStyleSheet();
      await parsedSheet.replace(cssText);
      this.parsedStyleSheets.set(url, parsedSheet);
    }

    const parsedSheet = this.parsedStyleSheets.get(url);
    if (this.checkStyleSheet(element, parsedSheet)) return true;
  } catch (error) {
    console.error(`解析跨域样式表失败 ${url}:`, error);
  }
  return false;
}
