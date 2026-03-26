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
        version: "1.0.0",
        license: "GPL-3.0-only",
        name: "GUI-视频自动网页全屏｜倍速播放",
        namespace: "http://tampermonkey.net/",
        description: "为「视频自动网页全屏｜倍速播放」提供图形界面操作，支持拖动到任意位置，深/浅皮肤切换。",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftl91LFFEYxp/3jB9ESZjtSl51F1RUSgRCF/kHlF1IhiFhF65dqEQkBUErdJMStBukGwQre2NZUiCRqUiURkW65mIfqGUFsW6Ii0jY7p4Tc3Rqd5zaGVldAudynve8z28e3jMzh5Dmi1R/V0vQyRRWxgWG6x22SrcnOAhQcQIbwVtXba8y1EANSpS1xzJin5c/Dz+jRDPvGWoErwRw35zuh8ChpcXXFjbwi9k/WADA9viGgovGnxtFs6EmcApMvCdBA3oIIirl4N8NNQngmRYJiwTOE7EHHLERAmXFawQ6AdCQkRbjsZIMUvIFoV0HMSsEDjCgSK8tJqAHAEDAMWLKLOexx8tiVVDEhLLVQAtzRPcwKOUANSWCw1/rsBe6PcFz8dpfAdTFgtF+EmIvBG7pID7mZNl2zkVCFQbahzqHfYerddpNhFpdsnfqauzl8ZoEuO4JXdIKOefynnZlimxXhBbqjTZL/el8pzrAVjTGmKh12Bq1ddJs974abQDXfFMuAhQ6EodwDTHWAf6/BAoK8nD0cDEKtuVhyD+OzvvLXnyWJshyApedJ1F65M9n4tlAAF5fL168fGfJWCu2DDA61GpodLvjCdp8vfjyNWQJJGUAquvMzBzafD0yEc65KZCUAmiOo4FPEqS753VSiFUB0FxbPF244en6J8SqAoTD8zhYcjZ9AP6RCVRWNacHYPD5GJqudmBi8tvaAkxNBeUuuNv5NOkAqgUpm4FIJCrfA+r0z4bnTZmvCKCv+wrsts0JBg8fvZLGY28NfoqToFhOoOJ4CS40lMu2I28mpXFP37DpJ9YXWgZQG+Tm5mBL7qakA2aGakUAZhqbrVkH0BLoB34fzcyml5K6pd/yaicRlQlgV0q6mmwitMOpyfpVKfsFya4w73cz9xQAAAAASUVORK5CYII=",
        require: ["https://unpkg.com/@popperjs/core@2.11.8/dist/umd/popper.min.js"],
        "run-at": "document-body",
        match: ["*://*/*"],
      },
      build: {
        externalGlobals: {
          "tippy.js": cdn.unpkg("tippy", "dist/tippy-bundle.umd.min.js"),
          "draggable/dist/draggable.min.js": cdn.unpkg("Draggable", "dist/draggable.min.js"),
        },
        externalResource: {
          "tippy.js/dist/tippy.css": cdn.unpkg("tippy", "dist/tippy.css"),
        },
      },
    }),
  ],
});
