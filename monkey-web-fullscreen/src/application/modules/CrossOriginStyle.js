/**
 * 跨域样式管理器 - 自动加载所有跨域CSS资源到adoptedStyleSheets
 * 使用Web Worker并行加载，避免阻塞主线程
 */
export default class CrossOriginStyleManager {
  constructor() {
    // 创建Worker
    const worker = new Worker(URL.createObjectURL(new Blob([`
      self.onmessage = async e => {
        self.postMessage(await Promise.all(
          e.data.map(async href => {
            try {
              const res = await fetch(href);
              return { href, cssText: await res.text() };
            } catch (err) {
              return { href, error: err.message };
            }
          })
        ));
      };
    `], { type: 'application/javascript' })))

    // 处理Worker返回的消息
    worker.onmessage = function ({ data }) {
      data.forEach(({ href, cssText, error }) => {
        if (error) return;
        try {
          const styleSheet = new CSSStyleSheet();
          styleSheet.replaceSync(cssText);
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
        } catch (err) {
          console.error(`样式应用失败: ${href}`, err);
        }
      });
    };

    // 过滤并收集所有跨域样式表URL
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]'))
      .filter((link) => new URL(link.href).origin !== window.origin)
      .map((link) => link.href);

    // 发送跨域样式表URL到Worker
    worker.postMessage(links);
  }
}
