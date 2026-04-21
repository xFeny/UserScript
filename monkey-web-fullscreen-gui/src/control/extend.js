/**
 * 文档画中画功能
 */
export default {
  // ==================== 画中画相关 ====================
  picInPic() {
    FyTools.isTopWin() && "documentPictureInPicture" in window ? this.documentPicInPic() : this.pictureInPicture();
  },
  pictureInPicture() {
    document.exitPictureInPicture().catch(() => this.FS.player?.requestPictureInPicture());
  },
  documentPicInPic() {
    try {
      if (this.pipWin) return this.pipWin.close();

      this.setPageVisibilityForced();
      const isFs = this.FS.fsWrapper;
      this.enableVideoWebFullscreen();

      this.openDocumentPictureInPicture().then((pipWin) => {
        (pipWin.GM_E9X_FS = this.FS).init();
        this.cloneEventsToPipWindow(pipWin);

        // ==================== 监听画中画关闭事件 ====================
        pipWin.addEventListener("unload", () => {
          document.body.appendChild(this.FS.fsWrapper);
          if (!isFs) this.FS.exitWebFullscreen();
          this.setPageVisibilityForced(true);
          delete this.pipWin;
        });
      });
    } catch (err) {
      console.error("文档画中画启动失败：", err);
    }
  },
  async openDocumentPictureInPicture() {
    const pipWin = await documentPictureInPicture.requestWindow({ width: 580, height: 326 });
    document.querySelectorAll("style, link, script").forEach((el) => pipWin.document.head.append(el.cloneNode(true)));
    pipWin.document.body.appendChild(pipWin.document.adoptNode(this.FS.fsWrapper));

    return (this.pipWin = pipWin);
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
  /**
   * 把所有记录的事件，批量绑到 PiP 窗口
   */
  cloneEventsToPipWindow(pipWin) {
    for (const [target, list] of window.evts) {
      const pip = target === unsafeWindow ? pipWin : pipWin.document;
      list.forEach((args) => pip.addEventListener(...args));
    }
  },
};
