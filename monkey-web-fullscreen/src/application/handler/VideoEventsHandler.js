import Tools from "../common/Tools";
import Store from "../common/Store";
import Consts from "../common/Consts";

/**
 * 视频监听事件逻辑处理
 */
export default {
  videoAborts: new Map(), // 存储：video -> AbortController（用于事件解绑）
  videoEvts: ["loadstart", "loadedmetadata", "loadeddata", "timeupdate", "ratechange", "canplay", "playing", "ended"],
  setupVideoListeners(video) {
    const ctrl = new AbortController();
    video && this.videoAborts.get(video)?.abort(); // 防止重复绑定

    const handle = ({ type, target }) => {
      if (this.isMutedLoop(target)) return;
      if (!target?.matches(`video, ${Consts.FAKE_VIDEO}`)) return;
      (this[type]?.(target), this.runVideoEvtCode(type, target));
    };

    this.videoEvts.forEach((t) =>
      (video ?? document).addEventListener(t, handle, { capture: true, passive: true, signal: ctrl.signal })
    );
    if (video) (this.videoAborts.set(video, ctrl), this.unbindVideoEvts());
  },
  setupShadowVideoListener() {
    document.addEventListener("shadow-video", ({ detail: { video } }) => {
      if (!video || video.hasAttribute("received")) return;
      video.setAttribute("received", true);
      this.setupVideoListeners(video);
    });
  },
  unbindVideoEvts() {
    if (Tools.isThrottle("cleanup", Consts.ONE_SEC)) return;
    this.videoAborts.forEach((ctrl, video) => {
      if (Tools.isAttached(video)) return;
      (ctrl.abort(), video.removeAttribute("received"), this.videoAborts.delete(video));
    });
  },
  // ====================⇓⇓⇓ 视频监听事件相关逻辑 ⇓⇓⇓====================
  loadstart(video) {
    if (!this.player) this.setCurrentVideo(video);
  },
  loadedmetadata(video) {
    if (video.matches(Consts.FAKE_VIDEO)) this.loadeddata(video);
    if (!this.player) this.setCurrentVideo(video);
    this.autoWebFullscreen(video);
  },
  loadeddata(video) {
    this.initVideoProps(video);
  },
  timeupdate(video) {
    if (isNaN(video.duration) || !Tools.isVisible(video)) return;
    if (!this.player) this.playing(video);

    // 微任务执行，不阻塞视频渲染
    Tools.microTask(() => {
      this.autoWebFullscreen(video);
      this.autoNextEpisode(video);

      this.renderProgress(video);
      this.cachePlayTime(video);
      this.ensureRateDisplay();
    });
  },
  playing(video) {
    this.setCurrentVideo(video);
    video.tsr ??= { ...Consts.DEF_TSR };
    Tools.waitFor(() => this.topWin).then(() => this.applySettings(video));
  },
  ended(video) {
    this.autoExitFullscreen();
    this.clearCachedTime(video);
  },
  ratechange: () => App.playbackRateDisplay(),
  runVideoEvtCode(type, video) {
    if (type === "timeupdate" && Tools.isThrottle("codeSnippet", Consts.ONE_SEC)) return;
    Tools.sleep(10).then(() => this.executeCodeSnippet(Store.VIDEO_CODE.get(this.host), type, video));
  },
  codeSnippetCache: new Map(),
  executeCodeSnippet(jsCode, type, video) {
    try {
      if (!jsCode) return;
      const code = `(async () => { ${jsCode} })()`;
      const args = ["type", "video", "Tools", "unsafeWindow"];
      const handler = this.codeSnippetCache.get(type) || this.codeSnippetCache.set(type, new Function(...args, code)).get(type);
      handler(type, video, Tools, unsafeWindow);
    } catch (e) {
      const unsafe = e.message.includes("unsafe-eval");
      unsafe ? this.injectCodeSnippet(jsCode, type, video) : console.error("代码执行出错：", e);
    }
  },
  injectCodeSnippet(jsCode, type, video) {
    const evt = `gm_code_inject_${type}`;
    const injectCode = `
      (() => {
        document.addEventListener('${evt}', (e) => {
          const { type, video, Tools, unsafeWindow } = e.detail;
          (async () => { try { ${jsCode} } catch (err) { console.error('代码执行出错：', err); } })();
        }, { once: true, passive: true });
      })();
      `;

    Tools.query(`#${evt}`)?.remove();
    GM_addElement("script", { id: evt, textContent: injectCode, type: "text/javascript" });
    Tools.emitEvent(evt, { type, video, Tools, unsafeWindow });
  },
};
