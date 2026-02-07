import Tools from "./common/Tools";

class VideoEnhancer {
  static hookVideoPlay() {
    const original = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      VideoEnhancer.dispatchShadowVideo(this);
      return original.apply(this, arguments);
    };
  }

  static setPlaybackRate(video, rate) {
    this.defineProperty(video, "playbackRate", {
      set(value, setter) {
        if (this.playbackRate === value) return;
        this.__playRate === value && setter(value);
      },
    });

    video.playbackRate = video.__playRate = Tools.toFixed(rate);
  }

  /**
   * 通用属性拦截方法（支持DOM元素/普通对象/自定义元素）
   * @param {HTMLElement|Object|Array|Function} target 目标（支持DOM、对象、数组、类/函数）
   * @param {string} prop 要拦截的属性名
   * @param {Object} hooks 拦截器 { get?: (value) => *, set?: (value, setter) => void }
   */
  static defineProperty(target, prop, hooks) {
    try {
      const original = this.getPropertyDescriptor(target, prop);
      if (!original) throw new Error(`属性 ${prop} 不存在`);

      Object.defineProperty(target, prop, {
        get() {
          const value = original.get ? original.get.call(this) : original.value;
          return hooks.get ? hooks.get.call(this, value) : value;
        },
        set(value) {
          // 执行属性赋值（原生set/直接赋值），返回传入值
          const setter = (v) => (original.set ? original.set.call(this, v) : (original.value = v), v);
          hooks.set ? hooks.set.call(this, value, setter) : setter(value);
        },
        configurable: true,
      });
    } catch (e) {
      console.error(`修改 ${prop} 属性时出错：`, e);
    }
  }

  /**
   * 深度获取目标属性描述符
   * @param {HTMLElement|Object|Array|Function} target 目标（支持DOM、对象、数组、类/函数）
   * @param {string} prop 属性名
   * @returns {PropertyDescriptor|undefined} 属性描述符
   */
  static getPropertyDescriptor(target, prop) {
    if (target instanceof HTMLMediaElement) {
      const desc = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, prop);
      if (desc) return desc;
    }

    for (let proto = target; proto; proto = Object.getPrototypeOf(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, prop);
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
    const root = video.getRootNode();
    if (!(root instanceof ShadowRoot)) return;
    Tools.emitEvent("shadow-video", { video });
    Tools.emitEvent("addStyle", { shadowRoot: root });
  }
}

VideoEnhancer.hackAttachShadow();
export default VideoEnhancer;
