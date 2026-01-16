declare global {
  interface App {
    /**
     * 是否为全屏模式
     */
    isFullscreen: Boolean;
    /**
     * 当前播放的视频元素
     */
    player?: HTMLVideoElement;
    /**
     * 视频信息
     */
    vMeta?: { isLive: Boolean; iFrame: string };

    /**
     * 顶级窗口信息
     */
    topWin?: { host: string; urlHash: string; vw: string; vh: string };

    /**
     * 显示进度的元素
     */
    progNode: HTMLDivElement;

    /**
     * 倍速常显元素
     */
    rateDisplay: HTMLDivElement;

    /**
     * 时钟类
     */
    Clock: {
      stop: (hide: boolean) => void;
      setContainer: (container: HTMLElement) => any;
      start: () => void;
      element: HTMLElement;
    };

    /**
     * 删除缓存的倍速
     */
    delCachedRate: () => void;

    /**
     * 设置视频播放倍速
     * @param {number} playRate - 目标倍速
     * @param {boolean} [show=true] - 是否显示提示Toast
     * @returns {Promise<void>} 空Promise
     */
    setPlaybackRate(playRate: number, show?: boolean): Promise<void>;

    /**
     * 调整播放倍速（递增/递减）
     * @param {number} [step=Storage.SPEED_STEP.get()] - 步长
     */
    adjustPlaybackRate(step?: number): void;

    /**
     * 获取进度缓存 key
     * @param {HTMLVideoElement} video - 视频元素
     * @returns {string} 缓存key
     */
    getUniqueKey(video: HTMLVideoElement): string;

    /**
     * 设置播放器时钟
     */
    setupPlayerClock(): void;

    /**
     * 播放器播放进度
     */
    videoProgress(): void;
  }
  const App: App;
}

// 导出类型（供其他文件导入使用）
export type { App };
