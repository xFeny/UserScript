declare interface FyTools {
  getRect(el: any): DOMRect | undefined;

  microTask(fn: () => void): Promise<void>;

  query(selector: string, ctx?: any): any;

  querys(selector: string, ctx?: any): any[];

  sleep(ms: number): Promise<void>;

  log(...data: any[]): void;

  isVisible(el: any): boolean;

  preventDefault(e: Event): void;

  emitEvent(type: string, detail?: any): void;

  newEle(name: string, attrs?: any): any;

  hasCls(el: any, ...cls: string[]): boolean;

  delCls(el: any, ...cls: string[]): void;

  addCls(el: any, ...cls: string[]): void;

  setStyle(els: any, prop: string, val?: any, priority?: any): void;

  isAttached(el: any): boolean;
}

// 👇 核心：让 VS Code 知道 window 上有 FyTools
declare interface Window {
  FyTools: FyTools;
}

// 👇 让你直接用 FyTools.xxx 也能提示
declare const FyTools: FyTools;
