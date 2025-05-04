import Tools from "../common/Tools";
import Storage from "../common/Storage";
const { ALL_EPISODE_CHAIN } = Storage;

/**
 * 通用性切换视频下集
 */
export default {
  switchPrevEpisode: function () {
    this.handleEpisodeChange(this.getPrevEpisode);
  },
  switchNextEpisode: function () {
    this.handleEpisodeChange(this.getNextEpisode);
  },
  handleEpisodeChange(getTargetEpisode) {
    if (!Tools.isTopWin()) return;
    let curEpisode = this.getCurrentEpisode();
    if (!curEpisode) curEpisode = this.getCurrentEpisodeFromAllLink();
    // Tools.log("当前集元素：", curEpisode);
    const targetEpisode = getTargetEpisode.call(this, curEpisode);
    // Tools.log("目标集元素：", targetEpisode);
    this.jumpToEpisodeNumber(targetEpisode);
  },
  getCurrentEpisode() {
    const ele = ALL_EPISODE_CHAIN.get(location.host)
      ? this.getCurrentEpisodeForChain()
      : this.getCurrentEpisodeLinkElement();
    // console.log("当前集数所在的<a>标签：", ele);
    return this.getEpisodeContainer(ele);
  },
  getCurrentEpisodeLinkElement() {
    const href = location.href;
    const path = location.pathname;
    const lastPath = path.substring(path.lastIndexOf("/") + 1);
    const links = Array.from(Tools.querys(`:is(a[href*="${path}"], a[href*="${lastPath}"])`));
    // Tools.log("匹配到所有的链接：", links);
    if (links.length == 1) return links.shift();
    // 过滤：历史记录、标题、线路(tab-item)
    const filter = [
      "h1",
      "header",
      "[id*='history']",
      "[class*='lishi']",
      "[class*='record']",
      "[class*='history']",
      "[class*='tab-item']",
    ];
    return links.find((link) => {
      const linkUrl = new URL(link.href);
      if (Tools.closest(link, `:is(${filter})`, 5)) return false;
      if (!Object.is(href, link.href) && !Object.is(path, linkUrl.pathname)) return false; // URL不匹配
      return !!this.getEpisodeNumber(link);
    });
  },
  getEpisodeNumber(element) {
    return Tools.extractNumbers(element?.innerText).shift();
  },
  getPrevEpisode(element) {
    return this.getEpisodeNumberContainer(element, true);
  },
  getNextEpisode(element) {
    return this.getEpisodeNumberContainer(element);
  },
  getEpisodeNumberContainer(element, isPrev = false) {
    if (!element) return;
    const episodes = this.getAllEpisodeElement(element);
    const index = episodes.indexOf(element);
    return isPrev ? episodes[index - 1] : episodes[index + 1];
  },
  getAllEpisodeElement(element) {
    const tagName = element.tagName;
    const sibling = Tools.findSiblingInParent(element, tagName);
    const children = Array.from(sibling.parentElement.children);
    return children.filter((ele) => ele.tagName === tagName);
  },
  jumpToEpisodeNumber(element) {
    if (!element) return;
    if (element instanceof HTMLAnchorElement) return element.click();
    const stack = [element];
    while (stack.length > 0) {
      const current = stack.pop();
      if (!(current instanceof HTMLElement) || !this.getEpisodeNumber(current)) continue;
      if (current instanceof HTMLAnchorElement || current instanceof HTMLButtonElement) return current.click();
      current.click();
      const children = Array.from(current.children).reverse();
      for (const child of children) {
        stack.push(child);
      }
    }
  },
  getEpisodeContainer(element) {
    //  集数相对于所有集数所在的同级标签
    // 示例一：得到<a>标签
    // <div><a>第01集</a><a>第02集</a></div>
    // 示例二：得到<li>标签
    // <ul class="player_list">
    // 	<li><a>第01话</a></li>
    // 	<li><a>第02话</a></li>
    // </ul>
    // 示例三：得到<div>标签
    // <ul class="urlli">
    // 	<div id="stab_1_71">
    // 		<ul><li><a>第01集</a></li></ul>
    // 	</div>
    // 	<div id="stab_1_71">
    // 		<ul><li><a>第02集</a></li></ul>
    // 	</div>
    // </ul>
    // while (element) {
    //   const tagName = element.tagName;
    //   const parentEle = element.parentElement;
    //   const nextTagName = element?.nextElementSibling?.tagName;
    //   const hasLink = Tools.querys(tagName, parentEle).filter((el) => el !== element);
    //   const hasSiblings = Tools.hasSiblings(element);
    //   if (hasSiblings && nextTagName === tagName && !!hasLink.length) return element;
    //   element = parentEle;
    // }
    while (element) {
      const tagName = element.tagName;
      const parentEle = element.parentElement;
      const hasLink = Tools.querys(tagName, parentEle).filter((el) => el !== element);
      const hasSib = Tools.hasSiblings(element);
      const nextTagName = element?.nextElementSibling?.tagName;
      if (hasSib && nextTagName === tagName && !!hasLink.length) return element;
      element = parentEle;
    }
    return element;
  },
  getCurrentEpisodeFromAllLink() {
    // https://www.dmb0u.art/index/home.html
    const path = location.pathname;
    const lastPath = path.substring(path.lastIndexOf("/") + 1);
    const curNumber = [...Tools.extractNumbers(lastPath)].join("");
    for (const link of Tools.querys("a")) {
      const attrs = link.attributes;
      for (const attr of attrs) {
        const attrNumbers = [...Tools.extractNumbers(attr.value)].join("");
        if (attrNumbers === curNumber) {
          return link;
        }
      }
    }
  },
};
