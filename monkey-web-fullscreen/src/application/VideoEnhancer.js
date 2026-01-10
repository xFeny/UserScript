import Tools from "./common/Tools";

class VideoEnhancer {
  static setPlaybackRate(video, playRate) {
    this.defineProperty(video, "playbackRate", {
      set(value, setter) {
        if (this.playbackRate === value) return;
        this.__playRate === value && setter(value);
      },
    });

    const rate = (+playRate).toFixed(2).replace(/\.?0+$/, "");
    video.playbackRate = video.__playRate = rate;
  }

  static defineProperty(video, property, descs) {
    try {
      const isMedia = video instanceof HTMLMediaElement;
      const proto = isMedia ? HTMLMediaElement.prototype : Object.getPrototypeOf(video);
      const original = Object.getOwnPropertyDescriptor(proto, property);
      if (!original) throw new Error(`属性 ${property} 不存在`);

      const target = isMedia ? video : proto;
      Object.defineProperty(target, property, {
        get() {
          const value = original.get.call(this);
          return descs.get ? descs.get.call(this, value) : value;
        },
        set(value) {
          const setter = original.set.bind(this);
          descs.set ? descs.set.call(this, value, setter) : setter(value);
        },
        configurable: true,
      });
    } catch (e) {
      console.error(`修改 ${property} 属性时出错：`, e);
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
      const root = video.getRootNode();
      if (!(root instanceof ShadowRoot)) return;
      Tools.emitEvent("shadow-video", { video });
      Tools.emitEvent("addStyle", { shadowRoot: root });
    });
  }
}

VideoEnhancer.hackAttachShadow();
export default VideoEnhancer;
