/**
 * 视频信息数据接口
 */
interface VideoInfo {
  centerX: number; // 视频中心点 x 坐标
  centerY: number; // 视频中心点 y 坐标
  src: string; // 视频源地址
  isLive: boolean; // 是否为直播
  frameSrc?: string; // 所在 iframe 的源地址
}

/**
 * 顶级窗口信息数据接口
 */
interface TopInfo {
  title: string; // 页面标题
  innerWidth: number; // 窗口宽度
  host: string; // 域名
  href: string; // 当前 URL
  hash: string; // URL 哈希值（简化版）
}

/**
 * App 接口定义：分离接口与变量声明
 */
interface App {
  /** 设置当前 `video` */
  setCurrentVideo(video: HTMLVideoElement): void;

  /** 获取 `video` 宿主容器，如果在`iframe`中，返回`iframe` */
  getVideoHostContainer(): Element | null;

  /**
   * 通用网页全屏，适用于所有网站
   * @param video 视频元素
   */
  universalWebFullscreen(video: HTMLVideoElement): void;

  /**
   * 只适用于 `@match` 中的网站
   * @param video 视频元素
   * @returns 是否成功网页全屏
   */
  specificWebFullscreen(video: HTMLVideoElement): boolean;

  /**
   * 哔哩哔哩播放结束自动退出网页全屏
   */
  exitWebFullScreen(): void;

  /**
   * 检查是否存在多个视频元素
   * @returns 是否存在多个视频元素
   */
  isMultVideo(): boolean;

  /**
   * 记录当前视频播放进度
   * @param video 视频元素
   */
  cachePlayTime(video: HTMLVideoElement): void;

  /**
   * 恢复上次记录的播放进度
   * @param video 视频元素
   */
  useCachePlayTime(video: HTMLVideoElement): void;

  /**
   * 删除记录的播放进度
   */
  delPlayTime(): void;

  /**
   * 应用记忆的倍速
   * @param video 视频元素
   */
  useCachePlaybackRate(video: HTMLVideoElement): void;

  /**
   * 初始化视频属性
   */
  initVideoProperties(video: HTMLVideoElement): void;

  /**
   * 尝试播放视频
   * @param video 视频元素
   */
  tryplay(video: HTMLVideoElement): void;

  /**
   * 当前视频元素
   */
  player: HTMLVideoElement | null | undefined;

  /**
   * 视频信息数据
   */
  videoInfo: VideoInfo | null | undefined;

  /**
   * 顶级窗口信息数据
   */
  topInfo: TopInfo | null | undefined;
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
}

// -------------------- 全局作用域类型声明 --------------------
declare global {
  /** 全局应用程序对象（可直接通过 App.xxx 调用） */
  const App: App;
  /** 视频增强器实例（可直接通过 EnhancerVideo.xxx 调用） */
  const EnhancerVideo: VideoEnhancer;
  /** 视频信息 */
  const videoInfo: VideoInfo | null | undefined;
  /** 顶级窗口信息 */
  const topInfo: TopInfo | null | undefined;
  interface Window {
    /** 全局应用程序对象（可直接通过 App.xxx 调用） */
    App: App;
    /** 视频增强器实例（可直接通过 EnhancerVideo.xxx 调用） */
    EnhancerVideo: VideoEnhancer;
    /** 视频信息 */
    videoInfo: VideoInfo | null | undefined;
    /** 顶级窗口信息 */
    topInfo: TopInfo | null | undefined;
  }
}

export {};
