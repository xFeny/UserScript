import { defineConfig } from "vite";
import monkey, { util, cdn } from "vite-plugin-monkey";
import AutoImport from "unplugin-auto-import/vite";

// 使用自带图标进行网页全屏的，使用@match
const match = [
  "*://tv.sohu.com/v/*",
  "*://www.mgtv.com/b/*",
  "*://www.acfun.cn/v/*",
  "*://www.iqiyi.com/v_*",
  "*://v.qq.com/x/page/*",
  "*://v.douyu.com/show/*",
  "*://v.qq.com/x/cover/*",
  "*://live.bilibili.com/*",
  "*://v.youku.com/video?*",
  "*://v.youku.com/v_show/*",
  "*://live.acfun.cn/live/*",
  "*://www.acfun.cn/bangumi/*",
  "*://www.bilibili.com/list/*",
  "*://www.bilibili.com/video/*",
  "*://www.bilibili.com/*/play/*",
  "*://v.qq.com/live/p/newtopic/*",
  "*://www.bilibili.com/festival/*",
  "*://v.qq.com/wasm-kernel/*/fake-video*",
];

// 不使用自带图标进行网页全屏的，使用@include
const include = [
  "*://www.ezdmw.site/Index/video/*",
  "*://player.ezdmw.com/danmuku/*",
  "*://pages.iqiyi.com/p/zy/*",
  "*://*bimiacg*.net/*/play*",
  "*://acgfta.com/play*",
  "*://ppoft.com/play*",
];

const description = [
  "通用自动网页全屏，默认支持哔哩哔哩（含直播）、腾讯视频、优酷视频、爱奇艺、芒果TV、搜狐视频、AcFun弹幕网自动网页全屏",
  "支持倍速调节、视频截图、画面镜像翻转、缩放与移动、记忆播放进度等功能",
  "配备通用下集切换功能，适配所有视频网站剧集，实现一键续播。",
];

// 开发模式下，添加全网匹配
const isDev = process.env.NODE_ENV === "development";
if (isDev) match.unshift("*://*/*");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2020",
  },
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: "src/main.js",
      userscript: {
        match,
        include,
        author: "Feny",
        version: "3.3.1",
        connect: "gitee.com",
        license: "GPL-3.0-only",
        description: description.join("；"),
        name: "视频自动网页全屏｜倍速播放",
        namespace: "http://tampermonkey.net/",
        homepage: "https://github.com/xFeny/UserScript/tree/main/monkey-web-fullscreen",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=",
        $extra: [["note", ["*://*/*"]]],
        "run-at": "document-body",
      },
      build: {
        externalGlobals: {
          notyf: cdn.unpkg("notyf", "notyf.min.js").concat(util.dataUrl(";window.notyf={Notyf};")),
          sweetalert2: cdn.unpkg("sweetalert2", "dist/sweetalert2.min.js").concat(util.dataUrl(";window.sweetalert2=Swal;")),
        },
        externalResource: {
          "sweetalert2/dist/sweetalert2.min.css": cdn.unpkg("sweetalert2"),
          "notyf/notyf.min.css": cdn.unpkg(),
        },
        cssSideEffects: () => {
          return (cssText) => {
            const style = document.createElement("style");
            style.textContent = cssText;

            // 向 Shadow DOM 插入样式
            document.addEventListener("shadow-attached", (e) => {
              requestAnimationFrame(() => e.detail.shadowRoot.prepend(style.cloneNode(true)));
            });

            // 向 document.head 插入样式
            (GM_addStyle ?? (() => document.head.append(style.cloneNode(true))))(cssText);
          };
        },
      },
    }),
  ],
});
