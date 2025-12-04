import Tools from "../common/Tools";

/**
 * 处理设置消息
 */
export default {
  handleSettMessage(data) {
    // 处理在 “更多设置” 中操作功能切换（启用/禁用）时发来的消息
    if ("toggle_rateKeep" in data) setTimeout(() => this.playbackRateKeepDisplay(), 150);
    if ("toggle_smallerFont" in data) this.toggleTimeElementClass(data.toggle_smallerFont);
    if ("toggle_color" in data) this.setTimeElementColor(data.toggle_color);
    if ("toggle_clockAlways" in data) this.changeTimeElementDisplay();
    if (data?.toggle_speed) this.resetToDefaultPlayRate();
    if (data?.toggle_memory) this.deleteCachedPlayRate();
    if (data?.toggle_zoom) this.resetVideoTransform();
  },
  toggleTimeElementClass(addClass, clss = "smaller") {
    if (addClass) return Tools.addCls(this.Clock?.element, clss), Tools.addCls(this.progressElement, clss);
    Tools.delCls(this.Clock?.element, clss), Tools.delCls(this.progressElement, clss);
  },
  setTimeElementColor(color) {
    // 设置播放剩余时间颜色
    const progressStyle = this.progressElement?.style;
    color ? progressStyle?.setProperty("color", color) : progressStyle?.removeProperty("color");

    // 设置时钟颜色
    this.Clock?.setCustomColor(color);
  },
  changeTimeElementDisplay() {
    setTimeout(() => (this.setupPlayerClock(), this.videoProgress(this.player)), 150);
  },
};
