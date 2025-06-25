import Tools from "../common/Tools";
import VideoEvents from "./VideoEventsHandler";

/**
 * 自动为页面中的video元素添加事件监听
 * 支持动态添加的video元素
 */
export default class VideoEnhancer {
  constructor() {
    this.setupObserver();
    this.setupExistingVideos();
    // 防止有些`video`没有增强到
    this.hookMediaMethod("play", (video) => this.enhanced(video));
  }

  setupExistingVideos() {
    // 查找所有未添加事件监听的video元素
    const videos = Tools.querys("video:not([enhanced])");
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
      if (node instanceof HTMLVideoElement && !node.hasAttribute("enhanced")) {
        this.enhanced(node);
      }
      // 如果节点是元素且有子节点，则递归处理其子节点
      else if (node.nodeType === Node.ELEMENT_NODE && node.hasChildNodes()) {
        const childVideos = Tools.querys("video:not([enhanced])", node);
        childVideos.forEach((video) => this.enhanced(video));
      }
    }
  }

  enhanced(video) {
    if (video.hasAttribute("enhanced")) return;
    this.setupEventListeners(video);
    this.floorVideoDuration(video);
  }

  setupEventListeners(video) {
    video.setAttribute("enhanced", true);
    Object.entries(VideoEvents).forEach(([type, handler]) => {
      video.removeEventListener(type, handler, true);
      video.addEventListener(type, handler, true);
    });
  }

  setPlaybackRate(video, playRate) {
    this.defineProperty(video, "playbackRate", { set: (val, setter, t) => val === t?.__playbackRate && setter(val) });
    video.playbackRate = video.__playbackRate = playRate;
  }

  floorVideoDuration(video) {
    this.defineProperty(video, "duration", { get: (value) => Math.floor(value) });
  }

  defineProperty(video, propertyKey, descriptors) {
    try {
      const original = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, propertyKey);
      Object.defineProperty(video, propertyKey, {
        get: descriptors.get ? () => descriptors.get(original.get.call(video)) : original.get,
        set: descriptors.set ? (value) => descriptors.set(value, original.set.bind(video), video) : original.set,
        configurable: true,
      });
    } catch (e) {
      console.error(`Error modifying ${propertyKey} property:`, e);
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
