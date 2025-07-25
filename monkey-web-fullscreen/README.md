### 脚本菜单  

1. 设置零键秒数
2. 设置倍速步长  （启用 `视频倍速调节`  时显示）
3. 设置快进/退秒数 （启用 `空格◀️▶️键控制` 时显示）
4. 此站启用/禁用自动网页全屏（非 `@match` 网站时显示）
5. 删除此站剧集选择器 （有手动适配时显示）
6. 快捷键说明
7. 更多设置
   - 禁用视频截图
   - 禁用缩放与移动
   - 禁用自动网页全屏（是 `@match` 网站时显示）
   - 禁用视频倍速调节
   - 禁用播放进度记录
   - 启用 空格 ◀️▶️ 控制

### 快捷键大全

| 快捷键      | 功能说明                     |
| ----------- | ---------------------------- |
| P | 切换网页全屏      |
| N | 切换下集视频               |
| Z | 恢复正常倍速           |
| R | 画面旋转 90° |
| M | 静音 / 取消静音 |
| D | 显示 / 隐藏 弹幕           |
| L / K | 视频 下一帧 / 上一帧 |
| Ctrl  Z | 复位缩放与移动 |
| Shift  L | 显示原生控制栏 |
| Shift  R | 视频水平镜像翻转             |
| Shift  P | 进入 / 退出 画中画 |
| Ctrl  Alt  A | 视频截图 (默认禁用) |
| Alt  ➕ / ➖ | 视频缩放 10% (默认禁用)  |
| A / S  或  ➕ / ➖ | 播放倍速 ±0.25               |
| Alt  ◀️🔼🔽▶️ | 移动视频画面 (默认禁用) |
| ◀️▶️           | 快退 / 快进 5秒 (默认禁用)      |
| 空格      | 播放 / 暂停 (默认禁用)         |
| 1️⃣ 至 9️⃣  | 1️⃣ 至 9️⃣ 倍速 |
| Ctrl  0️⃣ 至 6️⃣ | 10 - 16x 倍速 |
| 数字 0️⃣   | 快进 30 秒                   |

### 自动网页全屏

默认仅对 `@match` 中指定的网站启用自动网页全屏功能。若无需此功能，可在脚本菜单中禁用（禁用后仍可通过快捷键 `P` 手动触发网页全屏）。

#### 配置

**对所有视频网站生效**

将脚本中的：

```js
// @note        *://*/*
```

改成：

```js
// @match        *://*/*
```

或**特定网站**（以 <a href="https://www.gugu3.com" target="_blank">咕咕番</a> 为例）:

```js
// @include      *://www.gugu3.com/*
```

 **嵌套框架页**（如  <a href="https://www.ezdmw.site/" target="_blank">E站弹幕网</a>）:

若视频位于 `iframe` 中，需同时匹配主页面和框架页域名：

```js
// @include      *://www.ezdmw.site/Index/video/*
// @include      *://player.ezdmw.com/danmuku/*
```

> **注意：**仅针对单个网站配置时，须使用 `@include` 而非 `@match`（后者触发的是网站自带的网页全屏图标）。

然后在脚本菜单中点击 `此站启用自动网页全屏` ，启用后，<b style="color:#e5b01e">视频开始播放</b>时将自动进入网页全屏。

### 倍速播放

默认仅对 `@match` 中指定的网站启用倍速播放功能。<b style="color:red;">理论上</b>支持所有含 HTML5 `<video>` 标签的网页。

如需，可将脚本中的：

```js
// @note        *://*/*
```

修改为：

```js
// @match        *://*/*
```

或指定网站使用（以百度网盘为例）

```js
// @include        *://pan.baidu.com/*
```

> 如需禁用此功能，可在脚本菜单中设置禁用。

### 通用切换下集

适用于所有视频网站的通用快捷键切换下集（脚本默认 `@match` 是使用网站自带的切换下集）。

使用前，将脚本中的：

```js
// @note        *://*/*
```
修改为：

```js
// @match        *://*/*
```

脚本优先 `手动适配` ，无 `手动适配` 时按 `地址栏匹配 > 网站自带` 的顺序来尝试切换下集（有些网站 `地址栏匹配` 会误匹配，走不到 `网站自带` 只能 `手动适配`）。

#### 手动拾取元素适配

当网站无法成功切换下集或跳转为不正确的地址时，可通过手动拾取元素完成适配。

> 若需重新拾取已适配过的网站，需先在脚本菜单中点击 `删除此站剧集选择器` ，清除历史配置。

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

##### 3. 操作验证

配置完成后，按键盘 `N` 键，测试是否能自动切换至下一集。

#### 拾取示例：

##### 示例一：<a href="https://www.56.com/" target="_blank">56网</a>   

在该网站上默认拾取到的元素选择器，验证时不能获取到当前播放集数。

**原因是**：当鼠标移入目标元素时，会动态添加临时 `class`；而当元素失去焦点后，该 `class` 会自动移除。由于默认拾取的选择器包含此动态 `class`，导致无法获取当前播放集数。

**解决方法**：手动删除动态添加的 `class`，即可成功匹配目标元素并获取当前播放集数。

<img src="https://pic1.imgdb.cn/item/6817493358cb8da5c8dc1239.gif" alt="图片" style="zoom: 80%;" />   

##### 示例二：<a href="https://gaze.run/" target="_blank">注视影视</a>  

在该网站上当前播放的集数在剧集列表中无明确标识（如高亮、特殊样式或独有 `class`），导致无法通过列表元素直接区分正在播放的集数是哪一个。

虽列表无法识别，但页面顶部标题栏中存在包含当前播放集数的明确文本，第一步拾取，可选取标题栏的集数元素定位当前播放集数。

<img src="https://pic1.imgdb.cn/item/684994a958cb8da5c845c0b5.gif" alt="图片" style="zoom: 80%;" />  

##### 示例三：<a href="https://open.163.com/" target="_blank">网易公开课</a> 

在该网站上第二步拾取元素并点击「验证」时，提示的集数列表与页面实际显示不一致，通过调整元素选择器的层级结构后，最终成功获取正确数据。

<img src="https://pic1.imgdb.cn/item/684a8c7358cb8da5c847d03e.gif" alt="图片" style="zoom: 80%;" /> 


#### 测试网站

<a href="https://www.jspoo.com/" target="_blank">聚神铺导航</a>、<a href="https://yinghezhinan.com/" target="_blank">硬核指南</a>、<a href="https://www.shandiandh.com/" target="_blank">闪电导航</a> 内的影视动漫网站。

### 其他功能

#### 自动退出网页全屏

脚本默认支持 B 站和 AcFun 弹幕网，在视频播放结束后自动退出全屏状态（番剧页面不支持）。对于 B 站，还会自动点击「取消连播」按钮，避免自动播放下一集。

**取消连播触发条件**：

- B 站普通视频（非番剧）播放结束时
- B 站合集视频播放至最后一集时
- B 站合集中关闭「自动连播」选项时

如需关闭此功能，请在脚本中注释掉以下代码：

```js
App.autoExitWebFullscreen();
```
#### 播放进度记录

脚本默认启用「播放进度记录」功能，自动记录视频的播放位置。下次进入同一视频时，将自动恢复到上次离开时的进度。如果不需要该功能可在脚本菜单中设置禁用。

> 时长小于两分钟不记录播放进度

#### 标签页隐藏暂停

当浏览器中播放视频的标签页切换为后台（即当前非可见状态）时，脚本将自动暂停视频播放。

