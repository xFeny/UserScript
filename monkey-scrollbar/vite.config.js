import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.js",
      userscript: {
        author: "Feny",
        license: "MIT",
        version: "1.3.3",
        name: "滚动条美化",
        match: ["*://*/*"],
        "run-at": "document-body",
        namespace: "npm/vite-plugin-monkey",
        homepage: "https://github.com/xFeny/UserScript/tree/main/monkey-scrollbar",
        icon: "data:image/png;base64,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",
        description: "本脚本基于 Scroll Style 插件移植，并采用了🌈彩虹滚动条🌈脚本的 CSS 样式。",
      },
    }),
  ],
});
