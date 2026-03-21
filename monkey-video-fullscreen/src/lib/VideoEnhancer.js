import Tools from "../common/Tools";

class VideoEnhancer {
  static hackAttachShadow() {
    if (Element.prototype.__attachShadow) return;
    Element.prototype.__attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (options) {
      if (this._shadowRoot) return this._shadowRoot;

      const shadowRoot = (this._shadowRoot = this.__attachShadow.call(this, options));
      VideoEnhancer.detectShadowVideo();

      return shadowRoot;
    };

    Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow.toString();
  }

  static detectShadowVideo() {
    if (Tools.isThrottle("shadow", 100)) return;
    const videos = Tools.querys("video:not([received])");
    if (videos.length) videos.forEach(this.dispatchShadowVideo);
  }

  static dispatchShadowVideo(video) {
    const sroot = video.getRootNode();
    if (!(sroot instanceof ShadowRoot)) return;
    Tools.emitEvent("shadow-video", { video });
    Tools.emitEvent("addStyle", { sroot });
  }

  static hookActiveVideo() {
    const original = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      VideoEnhancer.dispatchShadowVideo(this);
      return original.apply(this, arguments);
    };
  }
}

VideoEnhancer.hackAttachShadow();
export default VideoEnhancer;
