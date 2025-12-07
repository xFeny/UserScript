class VideoEnhancer {
  constructor() {
    this.hackAttachShadow();
  }

  setPlaybackRate(video, playRate) {
    this.bypassPlaybackRateLimit(video);
    video.playbackRate = video.__playRate = (+playRate).toFixed(2).replace(/\.?0+$/, "");
  }

  /**
   * 绕过视频播放器的播放速率限制
   * @param video - 视频元素
   * @see 腾讯视频fake-video https://v.qq.com/wasm-kernel/1.0.49/fake-video-element-iframe.js
   */
  bypassPlaybackRateLimit(video) {
    this.defineProperty(video, "playbackRate", {
      set(value, setter) {
        if (this.playbackRate === value) return;
        if (this instanceof HTMLMediaElement) return this.__playRate === value && setter(value);

        this._playbackRate = value;
        this._quality.setPlaybackRate(value);
        this?.mailToWorker({ cmd: "callWorker_setRate", rate: value });
        Promise.resolve().then(() => this?.emit("ratechange", this._playbackRate));
      },
    });
  }

  defineProperty(video, property, descs) {
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
      console.error(`修改 ${property} 属性时出错：`, e);
    }
  }

  async hackAttachShadow() {
    if (Element.prototype.__attachShadow) return;
    Element.prototype.__attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function (options) {
      if (this._shadowRoot) return this._shadowRoot;
      const shadowRoot = (this._shadowRoot = this.__attachShadow.call(this, options));
      const shadowEvent = new CustomEvent("shadow-attached", { bubbles: true, detail: { shadowRoot } });
      document.dispatchEvent(shadowEvent);
      return shadowRoot;
    };

    Element.prototype.attachShadow.toString = () => Element.prototype.__attachShadow.toString();
  }
}

export default window.videoEnhance = new VideoEnhancer();
