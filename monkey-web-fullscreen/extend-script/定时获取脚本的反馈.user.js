// ==UserScript==
// @name         定时获取脚本的反馈
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  脚本猫定时获取`视频自动网页全屏`脚本的反馈
// @author       Feny
// @crontab      * once * * *
// @connect      greasyfork.org
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM.xmlHttpRequest
// @icon         data:image/png;base64,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
// ==/UserScript==

return new Promise(async (resolve) => {
  const cacheKey = "feedback-number";
  const url = "https://greasyfork.org/zh-CN/scripts/519872-视频自动网页全屏-倍速播放";

  function parseHtml(htmlStr) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, "text/html");
    return doc.body;
  }

  function extractNumber(text) {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  try {
    const res = await GM.xmlHttpRequest({ url, timeout: 5000 });
    const docBody = parseHtml(res.responseText);

    const feedbackElement = docBody.querySelector("#script-links li:nth-child(4)");
    const currentNum = extractNumber(feedbackElement.innerText);
    if (GM_getValue(cacheKey, 0) === currentNum) return resolve();

    GM_notification({
      url,
      timeout: 5000,
      title: "定时脚本通知",
      text: "视频自动网页全屏｜倍速播放脚本 有新的反馈",
      onclick: () => {
        GM_openInTab(url);
        GM_setValue(cacheKey, currentNum);
      },
    });
  } catch (e) {}

  resolve();
});
