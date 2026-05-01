import { defineConfig } from "vite";
import monkey, { cdn } from "vite-plugin-monkey";
import cleanup from "rollup-plugin-cleanup";

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
        version: "0.9.4",
        name: "视频小窗",
        namespace: "http://tampermonkey.net/",
        description: "「视频自动网页全屏｜倍速播放」脚本的功能扩展，提供全站通用页内悬浮视频小窗支持，可自由拖拽摆放位置。",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhBJREFUWEfdl79PFEEUx7/v+BtMCMZIRXE35HYuFiY0xz9Ad3aKBewQE6koTcTa2LMLJIodJJqQkBgbaSB0c4Y5OwtLKPwDIOwzc2RlOe529ti948e2+953PvN9M2/fEm74oRteH7cLQEi1RsBTBioFObMHpjemubLbS++/A0LOPwdKG2B+B5R6JvQDxsQBARN2Qy0d/OqWmwBQ2wA/Njqs9rNIWqyUrx+c4uQY4CWjww8ugB82wOhguigAqyOkYuuqaYbLdw9AeP4yiMpGB8+S9EL668T4dtgMt1xu5XJg0vMbTLQJYCsJ4RK9DJuzBN0ghgpgd9MJMXSATggAjbSTXWgJhLdQvxCM6gyME9HsUACEVPYANrqe9JS7PUAHLqTT+nsSoOKpVyDsZmnFA+mErj6R/BZcG6DsLbwsIRp3LQbi33wS7bRa63/j2NwA7SvZ73N6NmrM2pFNywUgauo9GEvgaMo0V/ddHBWpygR8B/DF6GAxP4BUfZdNdOTkc+B+AdTUVzA/Mjp84qpl/L7Tzix5vUtw/u1/m2UmjJtQoQDt8SmGcGzFaDtrtset4g5hvGa1Oj9xRiNjaQwJBzYJNHWoVx5msf8c2v8J0B+jg5lL1zCrQDJusub7zBQw4SNF9MmtEdXbZUb0wujVz7kB4jnBimb5mSGgxcCB0cHclVbsph9MxO36NxzMHtNV/wFo/XswLTIqPQAAAABJRU5ErkJggg==",
        "run-at": "document-body",
        license: "GPL-3.0-only",
        match: ["*://*/*"],
        noframes: true,
      },
      build: {
        externalGlobals: {
          "draggable/src/draggable.js": cdn.unpkg("Draggable", "dist/draggable.min.js"),
        },
      },
    }),
  ],
});
