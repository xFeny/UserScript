import Tools from "../common/Tools";

class VideoEnhancer {
  static setPlaybackRate(video, playRate) {
    this.defineProperty(video, "playbackRate", {
      set(value, setter) {
        if (this.playbackRate === value) return;
        this.__playRate === value && setter(value);
      },
    });
    video.playbackRate = video.__playRate = (+playRate).toFixed(2).replace(/\.?0+$/, "");
  }

  static defineProperty(video, property, descs) {
    try {
      const isMediaElement = video instanceof HTMLMediaElement;
      const videoPrototype = isMediaElement ? HTMLMediaElement.prototype : Object.getPrototypeOf(video);
      const original = Object.getOwnPropertyDescriptor(videoPrototype, property);
      if (!original) throw new Error(`属性 ${property} 不存在`);

      Object.defineProperty(isMediaElement ? video : videoPrototype, property, {
        get() {
          return descs.get ? descs.get.call(this, original.get.call(this)) : original.get.call(this);
        },
        set(value) {
          const oldVal = original.get.call(this);
          descs.set ? descs.set.call(this, value, original.set.bind(this), oldVal) : original.set.call(this, value);
        },
        configurable: true,
      });
    } catch (e) {
      console.error(`Modify ${property} Error: `, e);
    }
  }

  static hackAttachShadow() {
    if (Element.prototype.__attachShadow) return;
    Element.prototype.__attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (options) {
      if (this._shadowRoot) return this._shadowRoot;

      const shadowRoot = (this._shadowRoot = this.__attachShadow.call(this, options));
      VideoEnhancer.detectShadowVideoElement();

      return shadowRoot;
    };

    Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow.toString();
  }

  static detectShadowVideoElement() {
    if (Tools.isThrottle("shadow", 100)) return;
    const videos = Tools.querys("video:not([received])");
    if (!videos.length) return;

    videos.forEach((video) => {
      Tools.emitEvent("shadow-video", { video });
      Tools.emitEvent("addStyle", { shadowRoot: video.getRootNode() });
    });
  }
}

VideoEnhancer.hackAttachShadow();
export default VideoEnhancer;
