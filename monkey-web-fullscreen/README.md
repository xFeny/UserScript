# 设置为适用于所有网站

参考设置：<a href="https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png" target="_blank">https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png</a>

### 快捷键大全

| 快捷键      | 说明                     | 快捷键                  | 说明                 |
| ----------- | ---------------------------- | ---------------------------- | ---------------------------- |
| Enter | 全屏 | P | 网页全屏 |
| N | 切换下集               | R              | 旋转 90°         |
| M                                                            | 静音切换       | D          | 弹幕显/隐      |
| K / L                                                        | 上下帧         | Shift <b style='color:#bbb'>+</b> R                          | 水平镜像         |
| Ctrl <b style='color:#bbb'>+</b> Z | 复位缩移     | Shift <b style='color:#bbb'>+</b> A                         | 启/禁自动下集  |
| Ctrl <b style='color:#bbb'>+</b> Alt <b style='color:#bbb'>+</b> S | 截图      | Alt <b style='color:#bbb'>+</b> <b style='font-size:14px'>➕</b> / <b style='font-size:14px'>➖</b> | 缩放    |
| A / S  或  <b style='font-size:14px'>➕</b> / <b style='font-size:14px'>➖</b> | ±倍速     | Alt <b style='color:#bbb'>+</b> ◀️🔼                         | 移动    |
| Ctrl 1️⃣~5️⃣                                                     | 预设倍速         | 1️⃣~9️⃣                                                          | 1️⃣ - 9️⃣ 倍速     |
| 数字 0️⃣                                                       | 快进 30 秒       | ◀️▶️                                                           | 快退/进 (默禁) |
| 空格                                                         | 播放/暂停 (默禁) |                                                              |                |

## (网页)全屏相关

### 1. 自定义视频容器

**设置路径：**「更多设置」→「全屏」→「此站 (网页)全屏视频容器」

该功能允许您为当前网站设置自定义 (网页)全屏视频容器，解决 (网页)全屏时可能出现的各种适配问题，例如：

- 保留特定区域（如弹幕、控制栏按钮）在 (网页)全屏模式中始终可见。
- 解决部分网页全屏后内容被截断、缩放异常等问题。

#### 示例  

| 网站                               | CSS 选择器         | 效果说明         |
| ---------------------------------- | ------------------ | ---------------- |
| [抖音](https://www.douyin.com/)    | `#slidelist > div` | 全屏后能切换视频 |
| [吐槽弹幕网](https://www.tucao.my) | `#m_dplayer`       | 显示底部控制栏   |
| [虎牙直播](https://www.huya.com)   | `#videoContainer`  | 显示底部控制栏   |

### 2. 脱离式全屏阈值

**解决的问题：** 

- 在单页面（SPA）多视频应用中，如果通过「自定义此站视频容器」仍无法解决全屏异常，可尝试调整此阈值。

  **示例：** 在 [YouTube Shorts](https://www.youtube.com/shorts)、[新版贴吧](https://tieba.baidu.com) 未修改阈值时切换网页全屏异常，修改阈值为 `10` 后可正常切换。

- 缓解(网页)全屏切换卡顿、不流畅问题。

  **示例：** 在 www.reddit.com 滚动加载内容后，DOM 元素过多，导致切换(网页)全屏存在明显延迟

### 3. 侧边单击网页全屏

将鼠标移至视频左右两侧边缘区域，当鼠标光标发生变化时 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAipJREFUSEutlTFoFEEUhr+3nKhFwMouKIqNFhYixC6m0E5UMFhI0F4UBY1GbzPZQyVJF7BSUBCNuZBLaWVMp6LYaaWiSBAtFLSKhH2yc3thd2/nbk6cbtl//n/+ef97I/SwNOJZApeQg77bxBeY4DRCUwHvfd7A/yKgExiEbWzghlzlfdFdJwd6k92scQnls4xjWntzDjTiHnAaeEnMETF8z4q4BFLyOrAHuC8hZ8oFmqdoAZ+whWNyjtUWOD1AUuR1ggL5WyoMyxjvSgXsPWdFhHmpMtwpCBrxGtgHtJHbQJRtXhcR3kiVkS4CSXT7qDCSPbnTQS+x9cF6xVQNm4DtbGZFRvntQ9yTAzUMEjS7GHiMcEeqLPkISdr+gwVwLmo6SR+r/CpgPgB3iamL4aNLrFxAmZZxLhd6YBY46SBqAHPENMSwlsV41cDGt8YQytMu1/IFmCVmUQwvnDF1kWhkx8dOn7sHloipeTuwLiKuALc8BRLYcnmjzbCRn0wDP7KDSw07CEiK23kJ34BHwO02ATVsJeABcCgZehIyUCj2AnDcofAKqKfFtsnKT9Mau1AeAvutvZKXSyM7m+baBISzBDTkGl+dKdKIReCoi9zWwVAhsLnvzxAtE3NYDH+KwnkHzQdnLzEXxPCpQ5omIdcnoxIyVYbvKUUtAjUMEPA8/V4h4IBcJ+mBkpvrlgjHf41s0w0BMxJy3kXzTw5sLSY4gXAK4aJU3dH9C5MTtb2fy3n/AAAAAElFTkSuQmCC" style="width:21px; vertical-align: text-top" /> ，点击即可切换网页全屏状态。

**解决的问题：** 

- 在微博、X、Instagram 等多视频页，无需按键盘快捷键，即可便捷切换网页全屏。
- 避免父窗口视频对 `iframe` 视频网页全屏的干扰（www.reddit.com）

### 4. 自动网页全屏

脚本默认只对 `@match` 配置的网站自动网页全屏，若需对其他的网站启用**自动网页全屏**，可按以下方式配置：

**（1）. 对所有网站生效**

将脚本中的：

```js
// @note        *://*/*
```

修改为：

```js
// @match        *://*/*
```

**推荐在浏览器插件的脚本设置面板中完成用户匹配规则的配置；后续脚本更新时，可避免重复修改**。

参考设置：<a href="https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png" target="_blank">https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png</a>

**（2）. 只针对单个网站生效（以咕咕番为例）**

使用 `@include` 指定单个网站：

```js
// @include      *://www.gugu3.com/*
```

**（3）. 对嵌套框架页生效（如 E 站弹幕网）**

若视频在 `iframe` 框架中播放，需同时匹配主页面和框架页的域名：

```js
// @include      *://www.ezdmw.site/Index/video/*
// @include      *://player.ezdmw.com/danmuku/*
```

配置完成后，刷新视频页面并等待视频完全加载，再在脚本菜单中点击「此站启用自动网页全屏」。设置成功后，<b style="color:#e5b01e">视频开始播放</b>时将自动进入网页全屏。

> ⚠️ 注意：配置只针对单个网站时须用 `@include`，而非 `@match`（`@match` 触发的是网站自带的图标，如果配置成 `@match` ，还需要在 `class Site` 中定义相关图标的 `CSS` 选择器）。
>
> 如要对 `PPTV聚力视频` 自动网页全屏，配置成：
>
> ```js
> // @match      *://v.pptv.com/show/*
> ```
>
> 则需在脚本的 `class Site` 中，新增以下配置：
>
> ```js
> // full-全屏，webFull-网页全屏，danmaku-弹幕开关，next-下集
> static selectors = {
> "v.pptv.com": { full: ".w-zoom-container div", webFull: ".w-expand-container div", danmaku: ".w-barrage div", next: ".w-next" },
> };
> ```
>
> **反之亦然！！！**

### 5. 忽略特定页面

「此站启用自动网页全屏」后，将对目标域名下的所有页面生效（例如 YouTube 的搜索结果、短视频等场景）。若需排除不需要自动的页面，可按以下步骤操作：

1. 进入「更多设置」→「忽略」→「自动网页全屏时忽略的网址」
2. 添加目标页面的网址（如输入：`https://www.youtube.com/shorts` 即可排除短视频页）

> ⚠️ 注意：该功能不支持模糊匹配，仅采用「前缀匹配」逻辑（即仅匹配以输入网址开头的页面）
>

### 6.  (网页)全屏切换 扩展逻辑

可在切换全屏、网页全屏、退出全屏时，执行对应的自定义代码逻辑，比如调整页面布局、显示 / 隐藏控件等。

**代码存放路径**：「更多设置」→「全屏」→「此站 (网页)全屏切换 事件代码」

事件类型（type）：isFull、isWFull、default

```js
if (type === "isFull") {
  console.log("进入全屏模式！");
} else if (type === "isWFull") {
  console.log("进入网页全屏模式！");
} else {
  console.log("退出(网页)全屏模式！");
}
```

### 7. 自动退出网页全屏

B 站视频播放结束后自动退出全屏状态且点击「取消连播」按钮，避免自动播放下一个视频。

如不需此功能，请在脚本中注释或删除掉以下代码：

```js
this.autoExitFullscreen();
```



## 下集切换相关

对默认 `@match` 匹配网站，脚本直接使用站点自带的下一集按钮进行切换。

同时为其他第三方视频站点提供了通用性较强的下集切换功能实现，让你在全网不同站点都能享受一致、顺畅的下一集体验。

### 1. 自动切换下集

功能默认处于禁用状态，需手动在脚本菜单中开启以激活使用。

**设置路径**：「更多设置」→「控制」→「启用自动切换至下集」或按 `Shift A` 快捷键。

**自定义选项**：

- 提前切换秒数：「参数」→「下集提前秒数」（视频距离结束前 N 秒切换）
- 忽略网址：「忽略设置」→「自动切换下集时忽略的网址」（如 B 站非番剧页）

> 限制：时长小于 5 分钟的视频不会触发自动切换下集

### 2. 手动拾取元素适配（解决切换失败问题）

若遇到网站无法成功切换下集，或跳转至错误地址的情况，可通过手动适配的方式，**尝试解决**切换失败问题。

##### 第一步：拾取当前播放集数

1. 同时按住键盘 `Ctrl` + `Alt` 键，用鼠标点击当前播放集数的位置（如播放页显示的 “第 1 集”）。
2. 验证与保存：
   - 拾取成功后会弹出窗口，点击「验证」若正确提示集数，点击「保存」，进入第二步；
   - 若提示 `获取集数失败`，手动编辑文本框中的选择器代码，修改后再次点击「验证」，成功后保存。

##### 第二步：拾取集数列表中的任意一集

1. 完成当前集数拾取后，继续按住 `Ctrl` + `Alt` 键，点击剧集列表（如侧边栏或底部列表）中的任意一集（如 “第 2 集”）。
2. 验证与保存：
   - 弹窗会显示拾取的元素信息，点击「验证」按钮，若显示完整集数列表，点击「保存」完成配置。
   - 若提示 `获取集数失败` 或验证时显示的集数列表（如数量）有误，手动编辑选择器代码，修改后再次点击「验证」，直至显示正确集数后保存。

##### 第三步：验证

前面歩骤操作完成后，按键盘 `N` 键，测试是否能成功正确的切换至下一集。

#### 手动适配示例：

##### 示例一：<a href="https://www.56.com/" target="_blank">56网</a>  **（动态 class 问题）**

在该网站上默认拾取到的元素选择器，验证时不能获取到当前播放集数。

**原因是**：当鼠标移入目标元素时，会动态添加临时 `class`；而当元素失去焦点后，该 `class` 会自动移除。由于默认拾取的选择器包含此动态 `class`，导致无法获取当前播放集数。

**解决方法**：手动删除动态添加的 `class`，即可成功匹配目标元素并获取当前播放集数。

<img src="https://pic1.imgdb.cn/item/6817493358cb8da5c8dc1239.gif" alt="图片" style="zoom: 80%;" />   

##### 示例二：<a href="https://gaze.run/" target="_blank">注视影视</a>  **（集数标识位置特殊）**

在该网站上当前播放的集数在剧集列表中无明确标识（如高亮、特殊样式或独有 `class`），导致无法通过列表元素直接区分正在播放的集数是哪一个。

虽列表无法识别，但页面顶部标题栏中存在包含当前播放集数的明确文本，第一步拾取，可选取标题栏的集数元素定位当前播放集数。

<img src="https://pic1.imgdb.cn/item/684994a958cb8da5c845c0b5.gif" alt="图片" style="zoom: 80%;" />  

##### 示例三：<a href="https://open.163.com/" target="_blank">网易公开课</a> **（选择器层级问题）**

在该网站上第二步拾取元素并点击「验证」时，提示的集数列表与页面实际显示不一致，通过调整元素选择器的层级结构后，最终成功获取正确数据。

<img src="https://pic1.imgdb.cn/item/684a8c7358cb8da5c847d03e.gif" alt="图片" style="zoom: 80%;" /> 


#### 测试网站

脚本已针对以下导航站收录的影视动漫类网站，完成下集切换功能的通用性测试：

- 聚神铺导航（[https://www.jspoo.com/](https://www.jspoo.com/)）
- 硬核指南（[https://yinghezhinan.com/](https://yinghezhinan.com/)）

### 3. 重写获取下集跳转元素的逻辑

  ```js
  /**
   * 获取跳转目标集数的元素
   * @param isPrev 是否跳转上一集；true = 上一集，false = 下一集
   * @returns 要点击的元素
   */
  GM_E9X_FS.getJumpTargetEpisode(isPrev: boolean): HTMLElement;
  ```

若手动适配仍无法正常切换下一集，可通过重写获取下集跳转元素的逻辑，自定义匹配规则，解决脚本默认代码逻辑的切换限制，实现精准、稳定的下一集跳转。

**代码存放路径**：「更多设置」→「高级」→「此站 load 事件代码」

  1. [慕课网](https://www.imooc.com/)

     默认只能本章节内切换，重写逻辑使其不限于本章节切换

     ```js
     GM_E9X_FS.getJumpTargetEpisode = function (isPrev) {
       const all = Tools.querys(".sec-li a"); // 章节视频列表
       const currIndex = all.findIndex((el) => el.href.includes(location.pathname)); // 当前播放的
       return isPrev ? all[currIndex - 1] : all[currIndex + 1]; // 要播放的下一个视频
     };
     ```

  2. [我要自学网](https://www.51zxw.net/)

     ```js
     // 直接获取“下一节”元素
     GM_E9X_FS.getJumpTargetEpisode = () => Tools.query(".icon-next-fill");
     ```



## 其他功能

### 1. 空格◀️▶️ 控制

默认处于禁用状态，需手动开启后使用。

**设置路径**：「更多设置」→「控制」→「启用 空格◀️▶️ 控制」

**自定义选项**：「更多设置」→「参数」→「快进/退秒数」

**解决的问题：** 

- 调整播放器默认快退/进秒数
- 视频在 `iframe` 中无需手动聚焦也能操控视频

### 2. 标签页不可见时自动暂停

默认启用：视频标签页切换到后台（不可见）时自动暂停，切回时自动播放。

- 关闭路径：「更多设置」→「控制」→「禁用 不可见暂停」

### 3. 预设常用倍速

支持自定义常用的播放倍速，通过 `Ctrl + 数字键【1~5】` 一键设置，提升效率。

**设置路径**：「参数」→「常用倍速」（多值用英文逗号分隔，例：`1.15,1.45,1.75`）

- 映射规则：`Ctrl + 1` 至 `Ctrl + 5` 分别对应预设倍速列表的第 1 至第 5 项
  - 示例：预设值为 `1.15,1.45,1.75` 时，`Ctrl + 1` 对应 1.15 倍、`Ctrl + 2` 对应 1.45 倍、`Ctrl + 3` 对应 1.75 倍

### 4. 全屏模式下显示时间

默认在全屏模式右上角显示：系统时间、视频剩余时长、进度百分比。

**自定义选项**：

- 调整颜色：「参数」→「时间颜色」
- 非全屏显示：启用「非全屏显时间」功能

> 限制：≤30秒视频不显示剩余时长和进度百分比

### 5. 执行自定义代码逻辑

可访问的值：type, video, unsafeWindow, Tools, GM_E9X_FS

- **自定义页面加载事件处理逻辑**

  **代码存放路径**：「更多设置」→「高级」→「此站 load 事件代码」

  > **注意：** 自定义加载事件逻辑，需要刷新页面才能看到效果！！！
  
  事件类型（type）：`DOMContentLoaded`、`load`
  
  示例一：https://www.bilibili.com/
  
  ```js
  // if(type === "DOMContentLoaded") console.log('DOM 树已构建完成，可以操作 DOM 元素了！');
  // if(type === "load") console.log('页面资源已加载完！');
  
  // 解决B站未登录时，播放一分钟左右弹出登录窗的问题
  Tools.waitFor(() => unsafeWindow.__BiliUser__ && !unsafeWindow.__BiliUser__.isLogin, { interval: 300 }).then(() => {
    unsafeWindow.__BiliUser__.cache.data.isLogin = true;
    unsafeWindow.__BiliUser__.cache.data.mid = Date.now();
  });
  ```
  
  示例二：https://www.dadaqu.cc/、https://www.jddzx.cc/、https://jnvod.cc/
  
  ```js
  // 需要点击才会加载视频资源
  if(type === "load") Tools.query("body > #start")?.click();
  ```

- **自定义视频各种事件处理逻辑**

  **代码存放路径**：「更多设置」→「高级」→「此站 video 事件代码」

  事件类型（type）：`loadstart`、`loadedmetadata`、`loadeddata`、`timeupdate`、`ratechange`、`canplay`、`playing`、`ended`

  示例一：https://www.bilibili.com/

  ```js
  // B站已登录时，清晰度切换为 1080P，Tools.isExecuted() 用于标记只执行一次
  if (type !== "playing" || Tools.isExecuted("setBiliQuality")) return;
  Tools.waitFor(() => unsafeWindow.player && document.cookie.includes("DedeUserID"), { interval: 300 }).then(() => {
    const current = unsafeWindow.player.getQuality().realQ;
    const list = unsafeWindow.player.getSupportedQualityList();
    const target = list.find((quality) => quality === 80) ?? list[0];
    if (current !== target) unsafeWindow.player.requestQuality(target);
  });
  ```

  > 也可以放到页面 `load` 事件中处理，这里只是用于举例。

  示例二：https://live.bilibili.com/
  ```js
  // B站直播切换最高清晰度
  if (type !== "playing" || Tools.isExecuted("setBiliLiveQuality")) return;
  Tools.waitFor(() => unsafeWindow.top?.livePlayer, { interval: 500 }).then(() => {
    const info = unsafeWindow.top?.livePlayer?.getPlayerInfo();
    const qn = info?.qualityCandidates?.[0]?.qn ?? "10000";
    if (info?.quality !== qn) unsafeWindow.top?.livePlayer?.switchQuality(qn);
  });
  ```

  

