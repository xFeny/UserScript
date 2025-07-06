import { isElement } from "../common/shadow-dom-utils";
import Tools from "../common/Tools";
import VideoEvents from "./VideoEventsHandler";

/**
 * 自动为页面中的video元素添加事件监听
 * 支持动态添加的video元素
 */
export default class VideoEnhancer {
  attr = "enhanced";
  selector = ":is(video, fake-video):not([enhanced])"; // 腾讯视频 fake-iframe-video

  constructor() {
    this.setupObserver();
    this.setupExistingVideos();
    // 防止有些`video`没有增强到
    this.hookMediaMethod("play", (video) => this.enhanced(video));
  }

  setupExistingVideos() {
    // 查找所有未添加事件监听的video元素
    const videos = Tools.querys(this.selector);
    videos.forEach((video) => this.enhanced(video));
  }

  setupObserver() {
    Tools.createObserver(document.body, (mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0) return;
        this.processAddedNodes(mutation.addedNodes); // 处理新增的节点
      }
    });
  }

  processAddedNodes(nodes) {
    // 遍历所有新增节点
    for (const node of nodes) {
      // 如果节点是video元素且未被增强过
      if (node instanceof HTMLVideoElement && !node.hasAttribute(this.attr)) {
        this.enhanced(node);
      }
      // 如果节点是元素且有子节点，则递归处理其子节点
      else if (node instanceof Element && node.hasChildNodes()) {
        const childVideos = Tools.querys(this.selector, node);
        childVideos.forEach((video) => this.enhanced(video));
      }
    }
  }

  enhanced(video) {
    if (video.hasAttribute(this.attr)) return;
    this.setupEventListeners(video);
  }

  setupEventListeners(video) {
    video.setAttribute(this.attr, true);
    Object.entries(VideoEvents).forEach(([type, handler]) => {
      video.removeEventListener(type, handler, true);
      video.addEventListener(type, handler, true);
    });
  }

  setPlaybackRate(video, playRate) {
    this.bypassPlaybackRateLimit(video);
    video.playbackRate = video.__playRate = Tools.toFixed(playRate);
  }

  /**
   * 绕过视频播放器的播放速率限制
   * 支持标准HTML5视频元素和特殊实现(如腾讯视频的fake-video)
   *
   * 实现原理:
   * 1. 对于标准HTMLMediaElement，直接设置playbackRate属性
   * 2. 对于特殊实现(如fake-video)，拦截setter并调用其内部方法
   * 3. 保留原始功能的同时覆盖速率限制逻辑
   *
   * @param {HTMLMediaElement|Object} video - 视频元素或fake-video实例
   * @see 腾讯视频fake-video实现 https://v.qq.com/wasm-kernel/1.0.49/fake-video-element-iframe.js
   */
  bypassPlaybackRateLimit(video) {
    this.defineProperty(video, "playbackRate", {
      set(value, setter) {
        if (this.playbackRate === value) return;
        if (this instanceof HTMLMediaElement) return this.__playRate === value && setter(value);

        this._playbackRate = value;
        this._quality.setPlaybackRate(value);
        this?.mailToWorker({ cmd: "callWorker_setRate", rate: value });
        Promise.resolve().then(() => {
          this?.emit("ratechange", this._playbackRate);
        });
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
          descs.set ? descs.set.call(this, value, original.set.bind(this)) : original.set.call(this, value);
        },
        configurable: true,
      });
    } catch (e) {
      console.error(`修改 ${property} 属性时出错：`, e);
    }
  }

  hookMediaMethod(method, callback) {
    const original = HTMLMediaElement.prototype[method];
    HTMLMediaElement.prototype[method] = function () {
      callback.call(this, this);
      return original.apply(this, arguments);
    };
  }
}
