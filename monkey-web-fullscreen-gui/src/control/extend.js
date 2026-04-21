import Store from "../common/Store";

/**
 * 文档画中画功能
 */
export default {
  // ==================== 画中画相关 ====================
  picInPic() {
    // 文档画中画
    if (!Store.NOT_SUPPORTED.get() && FyTools.isTopWin() && "documentPictureInPicture" in window) {
      return this.pipWin ? this.pipWin.close() : this.enterDocumentPictureInPicture();
    }

    // 视频画中画
    document.exitPictureInPicture().catch(() => this.FS.player?.requestPictureInPicture());
  },
  enterDocumentPictureInPicture() {
    const isFs = this.FS.fsWrapper;
    this.enableVideoWebFullscreen();

    this.openDocumentPictureInPicture(this.FS.fsWrapper, {
      didOpen: (pipWin) => {
        this.setPageVisibilityForced();
        (pipWin.GM_E9X_FS = this.FS).init();
        this.handlePipEvents(pipWin);
        this.pipWin = pipWin;
      },
      unload: (e) => {
        this.handlePipEvents(e.target.defaultView, false);
        document.body.appendChild(this.FS.fsWrapper);
        if (!isFs) this.FS.exitWebFullscreen();
        this.setPageVisibilityForced(true);
        delete this.pipWin;
      },
    }).catch((e) => Store.NOT_SUPPORTED.set(true));
  },
  async openDocumentPictureInPicture(target, { didOpen, unload }) {
    try {
      const pipWin = await documentPictureInPicture.requestWindow({ width: 500, height: 320 });
      document.querySelectorAll("style, link, script").forEach((el) => pipWin.document.head.append(el.cloneNode(true)));
      pipWin.document.body.appendChild(pipWin.document.adoptNode(target));
      if (didOpen && didOpen instanceof Function) didOpen(pipWin);
      if (unload) pipWin.addEventListener("unload", unload);

      return pipWin;
    } catch (error) {
      console.error("文档画中画启动失败：", error.message);
      throw error;
    }
  },
  enableVideoWebFullscreen() {
    this.FS.fsWrapper ??= this.FS.getVideoContainer();
    this.FS.detachForFullscreen();
  },
  /**
   * 保持页面的可见性状态
   * 防止标签页标签页不可见时，documentPictureInPicture播放一段时间后，会只有声音画面停止
   * @param {Boolean} restore 是否还原
   */
  setPageVisibilityForced(restore = false) {
    if (restore) return (delete document.hidden, delete document.visibilityState);

    GM_FVEnh.defineProperty(document, "hidden", { get: () => false });
    GM_FVEnh.defineProperty(document, "visibilityState", { get: () => "visible" });
  },
  // 绑定/移除 PiP 事件（二合一）
  handlePipEvents(pipWin, add = true) {
    if (!window.evts) return;
    const method = add ? "addEventListener" : "removeEventListener";
    for (const [target, list] of window.evts) {
      const el = target === unsafeWindow ? pipWin : pipWin.document;
      list.forEach((args) => el[method](...args));
    }
  },
};
