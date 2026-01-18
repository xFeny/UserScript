# 设置为适用于所有网站

参考设置：<a href="https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png" target="_blank">https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png</a>

### 脚本菜单

1. 此站启/禁用自动网页全屏（非 `@match` 网站时显示）
2. 删除此站剧集选择器 （有手动适配时显示）
3. 此站脱离式全屏阈值
4. 快捷键说明
5. 更多设置

### 快捷键大全

| 快捷键      | 说明                     | 快捷键                  | 说明                 |
| ----------- | ---------------------------- | ---------------------------- | ---------------------------- |
| Enter | 全屏 | P | 网页全屏 |
| N | 切换下集               | R              | 旋转 90°         |
| M                                                            | 静音切换       | D          | 弹幕显/隐      |
| K / L                                                        | 上下帧         | Shift <b style='color:#bbb'>+</b> R                          | 水平镜像         |
| Ctrl <b style='color:#bbb'>+</b> Z | 复位缩放移动     | Shift <b style='color:#bbb'>+</b> A                         | 启/禁自动下集  |
| Ctrl <b style='color:#bbb'>+</b> Alt <b style='color:#bbb'>+</b> A | 截图 (默禁)      | Alt <b style='color:#bbb'>+</b> <b style='font-size:14px'>➕</b> / <b style='font-size:14px'>➖</b> | 缩放 (默禁)    |
| A / S  或  <b style='font-size:14px'>➕</b> / <b style='font-size:14px'>➖</b> | 倍速 ±0.25       | Alt <b style='color:#bbb'>+</b> ◀️🔼🔽▶️                         | 移动 (默禁)    |
| Ctrl 1️⃣~5️⃣                                                     | 预设倍速         | 1️⃣~9️⃣                                                          | 1️⃣ - 9️⃣ 倍速     |
| 数字 0️⃣                                                       | 快进 30 秒       | ◀️▶️                                                           | 快退/进 (默禁) |
| 空格                                                         | 播放/暂停 (默禁) |                                                              |                |

### 网页全屏 | 倍速

<b style="color:red;">理论上</b>**支持所有含 HTML5 `<video> ` 的视频网页**，覆盖绝大多数视频播放场景。

支持微博、推特、Instagram、Facebook 等多视频平台 —— 哪个视频处于播放状态，即可直接对其进行网页全屏、播放倍速调节等操作。

### 自动网页全屏

脚本默认只对 `@match` 配置的网站自动网页全屏，若需对其他的网站启用**自动网页全屏**，按以下配置即可快速生效。

**1. 对所有网站生效**

将脚本中的：

```js
// @note        *://*/*
```

修改为：

```js
// @match        *://*/*
```

推荐在插件的脚本设置面板中完成用户匹配规则的配置；后续脚本更新时，即可避免重复修改。

参考设置：<a href="https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png" target="_blank">https://pic1.imgdb.cn/item/696662c00e6bc0c5db9822b5.png</a>

**2. 对特定网站生效（以咕咕番为例）**

使用 `@include` 指定单个网站：

```js
// @include      *://www.gugu3.com/*
```

**3. 对嵌套框架页生效（如 E 站弹幕网）**

若视频在 `iframe` 框架中播放，需同时匹配主页面和框架页的域名：

```js
// @include      *://www.ezdmw.site/Index/video/*
// @include      *://player.ezdmw.com/danmuku/*
```

修改完成后，刷新视频页面并等待视频完全加载，再在脚本菜单中点击「此站启用自动网页全屏」。设置成功后，<b style="color:#e5b01e">视频开始播放</b>时将自动进入网页全屏。

> ⚠️ 注意：配置特定网站时须用 `@include`，而非 `@match`（`@match` 触发的是网站自带的图标，如果配置成 `@match` ，还需要在 `class Site` 中定义相关图标的 `CSS` 选择器）。
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
>  "v.pptv.com": { full: ".w-zoom-container div", webFull: ".w-expand-container div", danmaku: ".w-barrage div", next: ".w-next" },
> };
> ```

#### 忽略特定页面

「此站启用自动网页全屏」后，将对目标域名下的所有页面生效（例如 YouTube 的首页、短视频页等场景）。若需排除部分不需要该功能的页面，可按以下步骤操作：

1. 进入「更多设置」→「其他设置」→「自动网页全屏时忽略的网址列表」
2. 添加目标页面的网址（如输入：`https://www.youtube.com/shorts` 即可排除短视频页）

> ⚠️ 注意：该功能不支持模糊匹配，仅采用「前缀匹配」逻辑（即仅匹配以输入网址开头的页面）
>
> - 若输入带路径的网址（如 `https://www.youtube.com/shorts`），则匹配所有以该路径开头的子页面；
> - 若仅输入域名网址（如 `https://www.youtube.com`），仅匹配该网站首页，不会作用于任何子页面。

### 通用下集切换功能

脚本默认 `@match` 配置的网站，使用站点自带的下集图标，点击对应元素完成下集切换。

对于其他第三方视频网站，脚本提供了通用性较强的下集切换方案，让你在全网不同站点都能享受一致、顺畅的下一集体验。

**1. 对所有网站生效**

将脚本中的：

```js
// @note        *://*/*
```
修改为：

```js
// @match        *://*/*
```

**2. 对特定网站生效（以咕咕番为例）**

使用 `@include` 指定单个网站：

```js
// @include      *://www.gugu3.com/*
```

配置完成后，测试网站是否能成功切换下集。

#### 自动切换下集

该功能默认处于禁用状态，需手动在脚本菜单中开启以激活使用。

**设置路径**：「更多设置」→「播放设置」→「启用自动切换至下集」

**自定义选项**：

- 提前切换秒数：「参数设置」→「下集提前秒数」（视频结束前 N 秒切换）
- 忽略网址：「其他设置」→「自动切换下集时忽略的网址列表」（如添加 B 站非番剧页）

> 限制：时长小于 5 分钟的视频不会触发自动切换下集

#### 手动拾取元素适配（解决切换失败问题）

若遇到网站无法成功切换下集，或跳转至错误地址的情况，可通过手动适配的方式，尝试解决切换失败问题。

> 若需重新适配网站，需先在脚本菜单中点击「删除此站剧集选择器」，清除旧有配置后再进行适配操作。

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

### 自定义此站视频容器

设置路径：「更多设置」→「其他设置」→「自定义此站视频容器」

该功能允许您为当前网站设置个性化的视频容器，解决网页全屏时可能出现的各种适配问题，例如：

- 保留特定区域（如弹幕、控制按钮）在网页全屏模式中始终可见
- 解决部分网页全屏后内容被截断、缩放异常等问题

#### 示例  

| 网站                               | CSS 选择器         | 效果说明         |
| ---------------------------------- | ------------------ | ---------------- |
| [抖音](https://www.douyin.com/)    | `#slidelist > div` | 全屏后能切换视频 |
| [吐槽弹幕网](https://www.tucao.my) | `#m_dplayer`       | 显示底部控制栏   |
| [虎牙直播](https://www.huya.com)   | `#videoContainer`  | 显示底部控制栏   |

### 其他功能

#### 1. 空格◀️▶️ 控制

默认处于禁用状态，需手动开启后使用。

**设置路径**：「更多设置」→「播放设置」→「启用 空格◀️▶️ 控制」

**自定义选项**：「更多设置」→「参数设置」→「快进/退秒数」

若播放器自带的快退 / 快进秒数不符合使用习惯（例如默认快进 5 秒，需调整为 10 秒），或希望不聚焦播放器也能操控视频，可通过启用此功能实现。

#### 2. 自动退出网页全屏

脚本默认支持 B 站和 AcFun 弹幕网，在视频播放结束后自动退出全屏状态（番剧页面不支持）。对于 B 站，还会自动点击「取消连播」按钮，避免自动播放下一个视频。

如需关闭此功能，请在脚本中注释掉以下代码：

```js
this.autoExitWebFullscreen();
```
#### 3. 记忆播放位置

默认启用：自动记录视频播放进度，下次打开同一视频时恢复至上次位置。

- 关闭路径：「更多设置」→「禁用 记忆进度」
- 限制：时长＜2 分钟的视频不记录进度

#### 4. 标签页不可见时自动暂停

默认启用：视频标签页切换到后台（不可见）时自动暂停，切回时自动播放。

- 关闭路径：「更多设置」→「播放设置」→「禁用 不可见暂停」

#### 5. 预设常用倍速

支持自定义常用播放倍速，通过 `Ctrl + 数字键【1~5】` 组合键一键切换，提升播放操作效率。

**设置路径**：「参数设置」→「常用倍速」（多值用英文逗号分隔，例：`1.15,1.45,1.75`）

- 映射规则：`Ctrl + 1` 至 `Ctrl + 5` 分别对应预设倍速列表的第 1 至第 5 项
  - 示例：预设值为 `1.15,1.45,1.75` 时，`Ctrl + 1` 对应 1.15 倍、`Ctrl + 2` 对应 1.45 倍、`Ctrl + 3` 对应 1.75 倍

#### 6. 全屏模式下显示时间

默认在全屏模式右上角显示：系统时间、视频剩余时长、进度百分比。

**自定义选项**：

- 关闭显示：在设置中禁用「全屏显时间」
- 调整颜色：「参数设置」→「时间颜色」
- 非全屏显示：启用「非全屏显时间」功能

> 限制：≤30秒视频不显示剩余时长和进度百分比

#### 7. 侧边单击网页全屏

将鼠标移至视频左右两侧边缘区域，当鼠标光标发生变化时 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAipJREFUSEutlTFoFEEUhr+3nKhFwMouKIqNFhYixC6m0E5UMFhI0F4UBY1GbzPZQyVJF7BSUBCNuZBLaWVMp6LYaaWiSBAtFLSKhH2yc3thd2/nbk6cbtl//n/+ef97I/SwNOJZApeQg77bxBeY4DRCUwHvfd7A/yKgExiEbWzghlzlfdFdJwd6k92scQnls4xjWntzDjTiHnAaeEnMETF8z4q4BFLyOrAHuC8hZ8oFmqdoAZ+whWNyjtUWOD1AUuR1ggL5WyoMyxjvSgXsPWdFhHmpMtwpCBrxGtgHtJHbQJRtXhcR3kiVkS4CSXT7qDCSPbnTQS+x9cF6xVQNm4DtbGZFRvntQ9yTAzUMEjS7GHiMcEeqLPkISdr+gwVwLmo6SR+r/CpgPgB3iamL4aNLrFxAmZZxLhd6YBY46SBqAHPENMSwlsV41cDGt8YQytMu1/IFmCVmUQwvnDF1kWhkx8dOn7sHloipeTuwLiKuALc8BRLYcnmjzbCRn0wDP7KDSw07CEiK23kJ34BHwO02ATVsJeABcCgZehIyUCj2AnDcofAKqKfFtsnKT9Mau1AeAvutvZKXSyM7m+baBISzBDTkGl+dKdKIReCoi9zWwVAhsLnvzxAtE3NYDH+KwnkHzQdnLzEXxPCpQ5omIdcnoxIyVYbvKUUtAjUMEPA8/V4h4IBcJ+mBkpvrlgjHf41s0w0BMxJy3kXzTw5sLSY4gXAK4aJU3dH9C5MTtb2fy3n/AAAAAElFTkSuQmCC" style="width:21px; vertical-align: text-top" /> ，点击即可切换网页全屏状态。

**设置路径**：「辅助设置」→「启用 侧边单击网页全屏」。

**解决的问题：** 

- 在微博、X、Instagram 等平台浏览视频时，无需抬手按键盘快捷键，即可便捷切换网页全屏。
- 避免外层父窗口视频影响内嵌 iframe 视频的网页全屏（www.reddit.com）

#### 8. 脱离式全屏阈值

在单页应用（SPA）或多视频列表页中，如果通过「自定义此站视频容器」仍无法解决全屏异常，可尝试调整此阈值。

**示例网站：** 在 [YouTube Shorts](https://www.youtube.com/shorts)、[新版贴吧](https://tieba.baidu.com) 未修改阈值时切换网页全屏异常，修改阈值为 `10` 后可正常切换。

