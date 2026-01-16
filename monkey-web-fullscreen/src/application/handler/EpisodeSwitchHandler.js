import Tools from "../common/Tools";
import Storage from "../common/Storage";

/**
 * 通用性切换视频下集
 * 实现原理：
 * - 通过地址栏URL，模糊查找当前集的元素，定位所有剧集和当前集下标，得到目标集
 * - 通过特定文本获取目标集
 * - 通过特定元素选择器取目标集
 */
export default {
  switchEpisode(isPrev = false) {
    const target =
      this.getTargetEpisode(this.getCurrentEpisode(), isPrev) ?? this.getEpisodeByText(isPrev) ?? this.getEpisodeByClass(isPrev);
    // Tools.log("跳转集元素：", target);
    this.jumpToTargetEpisode(target);
  },
  getCurrentEpisode() {
    return Storage.RELATIVE_EPISODE.get(this.host) ? this.getCurrentEpisodeBySelector() : this.getCurrentEpisodeByLink();
  },
  getCurrentEpisodeByLink() {
    const { pathname, search, hash } = location;
    const last = pathname.split("/").pop();
    const links = Tools.querys(`a[href*="${[pathname + search, last, search, hash].filter(Boolean).join('"], a[href*="')}"]`);
    // Tools.log("匹配到所有的链接：", links);
    return links.length <= 1 ? this.getEpisodeWrapper(links[0]) : this.findCurrentEpisode(links, pathname + search);
  },
  findCurrentEpisode(eles, pageUrl) {
    // 过滤与地址栏相同连接的： 标题、线路、排行、热门、猜你喜欢、推荐、历史记录
    // https://www.2rk.cc、https://www.yingshikong1.com、https://www.dyttlg1.com
    const filter = [
      "h1, header, footer, [class*='header']",
      "[class*='rank'], [class*='hotlist'], [class*='vodlist']",
      "[id*='guankan'], [id*='history'], [class*='history'], [class*='record'], [class*='lishi']",
    ];
    eles = eles
      .filter((el) => {
        const { pathname, search } = new URL(el.href);
        return !el.closest(`:is(${filter})`) && pageUrl.includes(pathname + search);
      })
      .map(this.getEpisodeWrapper)
      .filter((el) => this.getAllEpisodes(el).map(this.getEpisodeNumber).filter(Boolean).length > 1);
    // Tools.log("过滤后连接：", eles);

    return eles.length <= 1 ? eles[0] : eles.find((el) => Tools.hasCls(el, "cur", "active") || !!this.getEpisodeNumber(el));
  },
  getEpisodeNumber: (el) => Tools.getNumbers(el?.innerText?.replace(/-|\./g, ""))?.shift(),
  getTargetEpisode(el, isPrev = false) {
    if (!el) return;
    const episodes = this.getAllEpisodes(el);
    const numbers = episodes.map(this.getEpisodeNumber).filter(Boolean);
    if (numbers.length < 2) return;

    const index = episodes.indexOf(el);
    const currNumber = this.getEpisodeNumber(el);
    const { lSmall, rLarge } = this.compareNumSize(numbers, currNumber, index);
    // 当 lSmall || rLarge 的结果与 isPrev 的布尔值相同时，返回 prev，当两者不同时，返回 next。
    return (lSmall || rLarge) === isPrev ? episodes[index - 1] : episodes[index + 1];
  },
  /**
   * 获取所有匹配的剧集元素（去重）
   * 匹配规则：
   *   - 查找`element`所在位置的所有兄弟元素
   *   - 过滤掉：无集数、集数重复、标签名与`element`不一样
   * @param {HTMLElement} element - 参考剧集元素
   * @returns {HTMLElement[]} 过滤后的剧集元素数组
   */
  getAllEpisodes(element) {
    if (!element) return [];

    const numSet = new Set(); // 用于过滤重复的集数
    const elName = element.tagName;
    const elCls = Array.from(element.classList);
    const children = Array.from(element.parentNode.children);

    return children.filter((el) => {
      const curCls = Array.from(el.classList).filter((cls) => !["on", "cur", "active"].includes(cls));
      const hasCls = elCls.some((value) => curCls.includes(value));
      const isMatch = curCls.length ? hasCls : el.tagName === elName;
      if (!isMatch || numSet.has(el.innerText)) return false;
      return numSet.add(el.innerText);
    });
  },
  jumpToTargetEpisode(el) {
    const stack = [el].filter(Boolean);
    while (stack.length > 0) {
      const current = stack.pop();
      if (current.matches("a, button")) return current?.click();
      stack.push(...Array.from(current.children).reverse());
      current?.click && current.click();
    }
  },
  /**
   * 向上遍历DOM，找到同级包裹元素，限定遍历层数
   * @param {HTMLElement} el - 起始DOM元素
   * @returns {HTMLElement|null} 同级包裹元素
   */
  getEpisodeWrapper(el) {
    //  集数相对于所有集数所在的同级标签

    // 示例一：得到<a>标签
    // <div><a>第01集</a><a>第02集</a></div>

    // 示例二：得到<li>标签
    // <ul class="player_list"><li><a>第01话</a></li> <li><a>第02话</a></li></ul>

    // 示例三：得到<div id="stab_1_71">标签
    // <ul class="urlli">
    // 	<div id="stab_1_71"><ul><li><a>第01集</a></li></ul></div>
    // 	<div id="stab_1_71"><ul><li><a>第02集</a></li></ul></div>
    // </ul>

    while (el?.parentElement) {
      const sibs = Array.from(el.parentElement.children);
      if (sibs.filter((s) => s.tagName === el.tagName).length > 1) return el;
      el = el.parentElement;
    }
    return null;
  },
  getEpisodeByText(isPrev = false) {
    // 示例网址：https://www.dmb0u.art、https://www.lincartoon.com
    // https://ddys.pro、https://www.5dm.link、https://www.tucao.my、https://www.flixflop.com

    const ignore = (el) => !el?.innerText?.includes("自动");
    const texts = isPrev ? ["上集", "上一集", "上话", "上一话", "上一个"] : ["下集", "下一集", "下话", "下一话", "下一个"];
    return Tools.findByText("attr", texts).filter(ignore).shift() ?? Tools.findByText("text", texts).filter(ignore).shift();
  },
  getEpisodeByClass(isPrev = false) {
    return isPrev ? null : Tools.query("[class*='control'] [class*='next' i]");
  },
  compareNumSize: (nums, compareVal = 0, index) => ({
    lSmall: nums.some((v, i) => i < index && v < compareVal),
    rLarge: nums.some((v, i) => i > index && v > compareVal),
  }),
};
