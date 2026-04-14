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
  async documentPicInPic() {
    try {
      if (this.pipWin) return this.pipWin.close();

      const isFs = this.FS.fsWrapper;
      this.enableVideoWebFullscreen();

      // ==================== 开启文档画中画 ====================
      const pipWin = (this.pipWin = await documentPictureInPicture.requestWindow({ width: 600, height: 380 }));
      document.querySelectorAll("style, link, script").forEach((el) => pipWin.document.head.append(el.cloneNode(true)));
      pipWin.document.body.appendChild(pipWin.document.adoptNode(this.FS.fsWrapper));

      // ==================== 监听画中画关闭事件 ====================
      pipWin.addEventListener("unload", () => {
        document.body.appendChild(this.FS.fsWrapper);
        if (!isFs) this.FS.exitWebFullscreen();
        delete this.pipWin;
      });
    } catch (err) {
      console.error("文档画中画启动失败：", err);
    }
  },
  enableVideoWebFullscreen() {
    this.FS.fsWrapper ??= this.FS.getVideoContainer();
    this.FS.detachForFullscreen();
  },
};
