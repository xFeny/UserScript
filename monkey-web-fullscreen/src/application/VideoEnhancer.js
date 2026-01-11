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

  /**
   * 通用属性拦截方法（支持DOM元素/普通对象）
   * @param {HTMLElement|Object} target 目标对象/元素
   * @param {string} property 要拦截的属性名
   * @param {Object} descs 拦截器 { get?: (value) => *, set?: (value, setter) => void }
   */
  static defineProperty(target, property, descs) {
    try {
      const original = this.#getPropertyDescriptor(target, property);
      if (!original) throw new Error(`属性 ${property} 不存在`);

      Object.defineProperty(target, property, {
        get() {
          const value = original.get ? original.get.call(this) : original.value;
          return descs.get ? descs.get.call(this, value) : value;
        },
        set(value) {
          const setter = (v) => (original.set ? (original.set.call(this, v), v) : ((original.value = v), v));
          descs.set ? descs.set.call(this, value, setter) : setter(value);
        },
        configurable: true,
      });
    } catch (e) {
      console.error(`修改 ${property} 属性时出错：`, e);
    }
  }

  /**
   * 深度获取属性描述符（自身+原型链）
   * @param {HTMLElement|Object} target 目标对象/元素
   * @param {string} property 属性名
   * @returns {PropertyDescriptor|undefined} 属性描述符
   */
  static #getPropertyDescriptor(target, property) {
    for (let proto = target; proto; proto = Object.getPrototypeOf(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, property);
      if (desc) return desc;
    }

    return null;
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
