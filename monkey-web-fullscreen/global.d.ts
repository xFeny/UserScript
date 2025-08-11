/**
 * 视频信息数据接口
 */
interface VideoInfo {
  centerX: number; // 视频中心点 x 坐标
  centerY: number; // 视频中心点 y 坐标
  src: string; // 视频源地址
  isLive: boolean; // 是否为直播
  iframeSrc?: string; // 所在 iframe 的源地址
}

/**
 * 顶级窗口信息数据接口
 */
interface TopWin {
  viewWidth: number; // 视口宽度
  viewHeight: number; // 视口宽度
  host: string; // 域名
  url: string; // 当前 URL
  urlHash: string; // URL 哈希值（简化版）
}

/**
 * App 接口定义：分离接口与变量声明
 */
interface App {
  // index 方法
  init(): void;
  isNormalSite(): boolean;
  isLive(): boolean;
  setCurrentVideo(video: HTMLVideoElement): void;
  player: HTMLVideoElement | null | undefined;
  videoInfo: VideoInfo | null | undefined;
  topWin: TopWin | null | undefined;

  // KeydownHandler 方法
  setupKeydownListener(): void;
  triggerIconElement(name: string): void;

  // WebLoginHandler 方法
  removeLoginPopups(): void;

  // MenuCommandHandler 方法
  isDisableZoom(): boolean;
  isDisableAuto(): boolean;
  isOverrideKeyboard(): boolean;
  isDisablePlaybackRate(): boolean;
  isDisableScreenshot(): boolean;
  isEnbleSiteAuto(): boolean;
  setupScriptMenuCommand(): void;

  // PickerEpisodeHandler 方法
  setupPickerEpisodeListener(): void;
  getCurrentEpisodeBySelector(): HTMLElement;

  // SwitchEpisodeHandler 方法
  switchEpisode(): void;
  getEpisodeNumber(element: HTMLElement): number;
  getAllEpisodes(element: HTMLElement): HTMLElement[];
  getEpisodeWrapper(element: HTMLElement): HTMLElement;

  // VideoControlHandler 方法
  isEnded(): boolean;
  isDynamicDuration(video: HTMLVideoElement): boolean;
  initVideoProps(video: HTMLVideoElement): void;
  togglePlayPause(video: HTMLVideoElement): void;
  tryAutoPlay(video: HTMLVideoElement): void;
  setPlaybackRate(playRate: number, show?: boolean): void;
  adjustPlaybackRate(step?: number): void;
  resetToDefaultPlayRate(): void;
  applyCachedPlayRate(video: HTMLVideoElement): void;
  adjustPlayProgress(second?: number): void;
  cachePlayTime(video: HTMLVideoElement): void;
  applyCachedTime(video: HTMLVideoElement): void;
  clearCachedTime(video: HTMLVideoElement): void;
  setCurrentTime(currentTime: number): void;
  toggleMute(): void;
  togglePictureInPicture(): void;
  toggleMirrorFlip(): void;
  rotateVideo(): void;
  zoomVideo(isDown?: boolean): void;
  moveVideoPosition(direction: string): void;
  resetVideoTransform(): void;
  captureScreenshot(): void;
  freezeVideoFrame(isPrev?: boolean): void;
  toggleNativeControls(): void;

  // WebFullScreenHandler 方法
  autoWebFullscreen(video: HTMLVideoElement): void;
  liveWebFullscreen(): void;
  autoExitWebFullscreen(): void;
  getBiliLiveIcons(): NodeListOf<Element>;

  // WebFullEnhanceHandler 方法
  webFullEnhance(): void;
  exitWebFull(): void;
  getVideoHostContainer(): Element | null;
  getVideoIFrame(): HTMLIFrameElement | null;
  getVideoContainer(): Element | null;
}

/**
 * 视频增强器类：处理视频属性拦截和事件监听
 */
declare class VideoEnhancer {
  /**
   * 为单个视频元素添加增强功能
   * @param video 视频元素
   */
  enhanced(video: HTMLVideoElement): void;

  /**
   * 设置视频播放速率，会锁定速率不被修改
   * @param video 视频元素
   */
  setPlaybackRate(video: HTMLVideoElement): void;

  /**
   * 拦截 HTMLMediaElement 的原生方法，在方法执行前插入自定义处理
   * @param method 要拦截的方法名
   * @param callback 自定义处理，接收当前媒体元素实例
   */
  hookMediaMethod(method: String, callback: (element: HTMLMediaElement) => void): void;

  /**
   * 重写 Element.prototype.attachShadow 方法，确保创建的 ShadowRoot 模式为 "open"，并触发自定义事件
   */
  hackAttachShadow(): void;
}

// -------------------- 全局作用域类型声明 --------------------
declare global {
  /** 全局应用程序对象（可直接通过 App.xxx 调用） */
  const App: App;
  /** 视频增强器实例（可直接通过 videoEnhance.xxx 调用） */
  const videoEnhance: VideoEnhancer;
  /** 视频信息 */
  const videoInfo: VideoInfo | null | undefined;
  /** 顶级窗口信息 */
  const topWin: TopWin | null | undefined;
  interface Window {
    /** 全局应用程序对象（可直接通过 App.xxx 调用） */
    App: App;
    /** 视频增强器实例（可直接通过 videoEnhance.xxx 调用） */
    videoEnhance: VideoEnhancer;
    /** 视频信息 */
    videoInfo: VideoInfo | null | undefined;
    /** 顶级窗口信息 */
    topWin: TopWin | null | undefined;
  }
}

export {};
