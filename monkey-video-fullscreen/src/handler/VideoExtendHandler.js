import I18n from "../common/I18n";
import Tools from "../common/Tools";

/**
 * 视频一些额外处理
 */
export default {
  playbackRateKeepDisplay() {
    if (!this.player || this.isLive()) return;

    if (!this.rateKeepElement) this.rateKeepElement = this.createDisplayElement("__rate-keep-show");
    this.rateKeepElement.textContent = `${I18n.t("speed")}: ${this.player.playbackRate}`;
    this.prependElement(this.rateKeepElement);
  },
  resumeRateKeepDisplay() {
    if (Tools.isOverLimit("rateKeep") || document.contains(this.rateKeepElement)) return;
    this.playbackRateKeepDisplay();
  },
  removeRateKeepDisplay() {
    this.rateKeepElement?.remove();
  },
  createDisplayElement(clss, color) {
    const element = document.createElement("div");
    Tools.setStyle(element, "color", color);
    element.classList.add(clss);
    this.prependElement(element);
    return element;
  },
  prependElement(element, target) {
    const container = target ?? this.player?.parentNode;
    if (element && !container?.contains(element)) container?.prepend(element);
  },
};
