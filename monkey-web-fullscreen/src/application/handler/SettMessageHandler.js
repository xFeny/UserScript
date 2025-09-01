import Tools from "../common/Tools";

/**
 * 处理设置消息
 */
export default {
  handleSettMessage(data) {
    // 处理在 “更多设置” 中操作功能切换（启用/禁用）时发来的消息
    if ("toggle_rateKeep" in data) setTimeout(() => this.playbackRateKeepDisplay(), 120);
    if ("toggle_smallerFont" in data) this.toggleSmallerFont(data.toggle_smallerFont);
    if ("toggle_color" in data) this.setTimeElementColor(data.toggle_color);
    if ("toggle_clockAlways" in data) this.changeTimeElementDisplay();
    if (data?.toggle_speed) this.resetToDefaultPlayRate();
    if (data?.toggle_memory) this.deleteCachedPlayRate();
    if (data?.toggle_zoom) this.resetVideoTransform();
  },
  changeTimeElementDisplay() {
    setTimeout(() => {
      this.toggleClock();
      this.videoProgress(this.player);
    }, 120);
  },
  setTimeElementColor(color) {
    // 设置播放剩余时间颜色
    const progressStyle = this.progressElement?.style;
    color ? progressStyle?.setProperty("color", color) : progressStyle?.removeProperty("color");

    // 设置时钟颜色
    this.Clock?.setCustomColor(color);
  },
  toggleSmallerFont(useSmallerFont) {
    const clss = "smaller";
    if (useSmallerFont) return Tools.addCls(this.Clock?.element, clss), Tools.addCls(this.progressElement, clss);
    Tools.delCls(this.Clock?.element, clss), Tools.delCls(this.progressElement, clss);
  },
};
