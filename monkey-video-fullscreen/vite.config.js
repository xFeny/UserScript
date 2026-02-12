import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import cleanup from "rollup-plugin-cleanup";

const chinese = ["让所有视频网页全屏，快捷键：P - 网页全屏，Enter - 全屏", "支持侧边点击切换网页全屏", "支持自动网页全屏"];
const english = [
  "Maximize all video players",
  "Shortcut keys: P - Web Fullscreen, Enter - Fullscreen",
  "Support side click to web fullscreen",
  "Support auto web fullscreen",
];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2022",
    rollupOptions: { plugins: [cleanup({ comments: "none", exclude: ["node_modules/**"] })] },
  },
  plugins: [
    monkey({
      server: { mountGmApi: true },
      entry: "src/main.js",
      userscript: {
        author: "Feny",
        version: "3.9.2",
        match: ["*://*/*"],
        license: "GPL-3.0-only",
        "run-at": "document-start",
        description: { "": english.join("; "), zh: chinese.join("; ") },
        name: { "": "视频网页全屏", "zh-CN": "视频网页全屏", "zh-TW": "視頻網頁全屏", en: "Video Fullscreen " },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABNNJREFUeF7tm09oHFUcx79vNtkElgQDwYMgaUJulVhIwXoIFAvtQRAPXnopQXZfchD00ksPKoh4KUQJksx7C4UUihREcvFQhB70UMmuYhXBGMRDmrAJ+Wf+2MSwP/kNb5fNZrPzkt3ZzCT7IIfszve93+/z+/NmZmcEzvkQ59x/HAIgpXwI4AoRrRHR9XQ6nWNIUsonAF6zAHZfKXWLj0smk72O4/xloQER3dZa3zW6m47jPLDRAbihlHrEx46MjHxORO9b6DYB/EJE6gAAKSWViR8ppW7wZ8PDwy/E4/E/ALzot4AQ4q7rureNUdeI6Ds/DX9PRLe01vcN8DsAPrXQ5WKx2PWJiYmnRjcN4C0LnXdIEYCU8ihhMaKpVOqSEOJnm8lLIyqlTALQNrrSiEopWcPaqoOInra3tw+Nj4//YyD8CuAVP105gGcAXqokKo2olPJtAN/YTF4WUY4mR9Vv5IQQQ67r/mmc4ey55icCUMzW0dHRC/l8/jcACT9daQaUp/8BbVlEPwAw5je5+X5IKfWDKYcHRHTTT8cRFUJcVkr9Z0rvJwC9fjoApf3nquM4j/001gBMjb6jtf7aOGPbcHL5fP5yOp2eNxG1babFiB6n9EqzNZVKDQsh7lWDcCwAPJFxJmucsWo4HFGt9ausMen5o00zLY3ocUoPwHtKqS+NjR8D+OgoCMcGACD3/Pnzi1NTUysmPb+3bDjFiCaTSav0NEZ/opT60DhjXXpCiDdd1/3WZOs9Ihqu2N8KH1bYAo/MnNKImvTkGvdtOACUUmqEJ7ZJz4IBQoh3Xdf1UllKyb2HQfgOIcRF13V/N+s9FkJcLRedJAO8OYhoWmvNOwIbdZyd4Y7W+jOb9Cwz9g2llNfUpJS8C3lr+4xcIpHoHRsb+9eUHusvlGpODMBA+EJr7UVDSmmdnrwTaK2/8kvPcuccx+mdnJz825QeO3PJj4AQ4onruq/zcZVKr3kt4EfwrH9fzICZmZlDDeKsO8/+FQFkMpmqZ4JnFUYTQCGyzQxolkCzBzSb4Fnt9NX8au4CjdoFOjo6EI/HEYvFsLW1hZ2dnVAkXOAZ0NLSgv7+fiQSB6+Wt7e3kcvlsLa2dqogAgfQ19eHrq6uI51kAAyCgZzGCBzAwMAAWltbfX1jCEtLS9jb2/M9tp4HBA5gcHDQ2l52niEwjEaNUAEoON3I/hBKAAUQjegPoQZQABFkf4gEAAYRVH+IDICg+kPkABRALC4uYmFhoebNIrIA2PN6QIg0gM3NTczOztaUBZEGwJ5ns97vtCcekQawsbGBubm5EzvPwkgDOLc9YH9/H/Pz81hZWakp+pHMgOXlZe9iaXd3t2bnIwVgfX3du1Lkzl/PEfoewLfOOOKrq6v19Ls4V2gBcJ2z4/xHFNwd+1ACqHedV0udUAEIqs5PFYDNPcGg6/xUAVS7K9yoOj9VALx4T08Puru7i3bk83nvJKae+/lJt4jAe0DBsM7OTrS1tXn/8r0+jn4YRsMAhMHZSjY0ARSoNB+RaT4i03xEJrgT7rB2wEbcEQqx755pxV0gm80+I6KKL02F3Yla7Ct9VnhaCGH9vl0ti4ZJe+Bx+fO4FR56XyCTyTwkoitCiJfDFKk621L51dk6LxKJ6c79GyP/A7T+4JsF5qmXAAAAAElFTkSuQmCC",
        namespace: "npm/vite-plugin-monkey",
      },
      build: {
        cssSideEffects: () => {
          return (cssText) => {
            const added = Symbol("added");
            const style = document.createElement("style");
            style.textContent = cssText;
            window.gmStyle = style;

            // 向 Shadow DOM 插入样式
            document.addEventListener("addStyle", ({ detail: { sroot } }) => {
              if (sroot[added] || sroot instanceof Document) return;
              sroot.prepend(style.cloneNode(true));
              sroot[added] = true;
            });

            // 向 document.head 插入样式
            (GM_addStyle ?? (() => document.head.append(style.cloneNode(true))))(cssText);
          };
        },
      },
    }),
  ],
});
