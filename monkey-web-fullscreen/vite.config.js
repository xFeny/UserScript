import { defineConfig } from "vite";
import monkey, { util, cdn } from "vite-plugin-monkey";
import AutoImport from "unplugin-auto-import/vite";
import cleanup from "rollup-plugin-cleanup";

// 使用自带图标进行网页全屏的，使用@match
const match = [
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
  "*://x.com/*",
  "*://vimeo.com/*",
  "*://www.twitch.tv/*",
  "*://www.reddit.com/*",
  "*://www.youtube.com/*",
  "*://www.facebook.com/*",
  "*://www.instagram.com/*",
  "*://www.dailymotion.com/*",
  "*://geo.dailymotion.com/*",
  "*://www.ezdmw.site/Index/video/*",
  "*://player.ezdmw.com/danmuku/*",
  "*://pages.iqiyi.com/p/zy/*",
  "*://*bimiacg*.net/*/play*",
  "*://acgfta.com/play*",
  "*://ppoft.com/play*",
];

const description = [
  "支持所有H5视频的增强脚本，通用网页全屏｜倍速调节，对微博 / 推特 / Instagram / Facebook等多视频平台均适用",
  "B站(含直播) / 腾讯视频 / 优酷 / 爱奇艺 / 芒果TV / AcFun 默认自动网页全屏，其他网站可手动开启",
  "自动网页全屏 + 记忆倍速 + 下集切换，减少鼠标操作，让追剧更省心、更沉浸",
  "还支持视频旋转、截图、镜像翻转、缩放与移动、记忆播放进度等功能",
];

const description_tw = [
  "支持所有H5视频的增强脚本，通用網頁全屏｜倍速調節，对微博 / 推特 / Instagram / Facebook等平臺均適用",
  "B站(含直播) / 騰訊視頻 / 優酷 / 愛奇藝 / 芒果TV / AcFun 默認自動網頁全屏，其他網站可手動開啓",
  "自動網頁全屏 + 記憶倍速 + 下集切換，減少鼠標操作，讓追劇更省心、更沉浸",
  "還支持視頻旋轉、截圖、鏡像翻轉、縮放與移動、記憶播放進度等功能",
];

// 开发模式下，添加全网匹配
const isDev = process.env.NODE_ENV === "development";
if (isDev) match.unshift("*://*/*");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2022",
    rollupOptions: { plugins: [cleanup({ comments: "none", exclude: ["node_modules/**"] })] },
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
        version: "3.7.2",
        connect: "gitee.com",
        license: "GPL-3.0-only",
        description: description.join("；"),
        name: "视频自动网页全屏｜倍速播放",
        namespace: "http://tampermonkey.net/",
        homepage: "https://github.com/xFeny/UserScript/tree/main/monkey-web-fullscreen",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=",
        $extra: [
          ["note", "*://*/*"],
          ["name:zh-TW", "視頻自動網頁全屏｜倍速播放"],
          ["description:zh-TW", description_tw.join("；")],
        ],
        "run-at": "document-start",
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
            const styleAdded = Symbol("styleAdded");
            const style = document.createElement("style");
            style.textContent = cssText;
            window.gmStyle = style;

            // 向 Shadow DOM 插入样式
            document.addEventListener("addStyle", (e) => {
              const { shadowRoot } = e.detail;
              if (shadowRoot[styleAdded] || shadowRoot instanceof Document) return;

              shadowRoot.prepend(style.cloneNode(true));
              shadowRoot[styleAdded] = true;
            });

            // 向 document.head 插入样式
            (GM_addStyle ?? (() => document.head.append(style.cloneNode(true))))(cssText);
          };
        },
      },
    }),
  ],
});
