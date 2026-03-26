// ==UserScript==
// @name         JSON Viewer
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @author       Feny
// @description  格式化显示 JSON 使数据看起来更加漂亮。支持 JSON 主题色切换。支持 JSON 脑图，清晰明了的查看 JSON 层级。支持通过 JSON Crack 查看 JSON。支持手动输入 JSON，HTTP 请求获取 JSON
// @license      GPL-3.0-only
// @icon         data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9wvjF8bLX4ZrHZx+XNqlwnmKjH5YUyRvb6kEAd8H058d1b47XV5Ir3eoN++bagaXYrN6KOBn2FfPPx5/aEutX8a+KNWhIubhruZLSNj8u1WMcIOP4QoXOOwNS/wDBM79lDTfjh8YNe+IXj63TxRdeHfKjsE1KMTxtdSbmMmxvlAiVV2IBsUybgAyKR9ZTy6lhsM69Xovm2+iPmKmOqYjEKjT6v5WXU9e8beKrjxZpp/s/xFrfhjWIwWs9X0q42z2kmPlZo2zDcxjqYZ0eNv7obDDf/YL/AG8L745eJNc+G3xCttP0n4qeEWZZ2sVZNP8AENsu0rd2ysS0ZKPG7RMSQsisCcukWd+3x4RtfhpqGk+JNPjS0g1mV7a8iT5UM4XesgHYsofdjglQepJPxwPE1x4V/au8LePtNkeK40ma0lmdDgyorvHMhPo9uxjP+y1bUcHRxmGbS1adn1TXT0/4fcipiqmExCi3pfVdGn19f+GLni/w7ceGf2wPFXga+Vo5rW/vDbI3WWI/v4HA/wBqBg3tk+lfWX7AXia1+F/iDV9B1CRbWHXjFLayyHannpuUxk+rqy4zxlMdWAPQft7fsL33x91nQfiD4DutP0r4oeDXVrT7cWWx1y3UsTZ3LKCyAh5FEigkLLIpHzBk5vwj4JuvE2kLJfeHdY8N6lGAl5pepwBZrOT+JRIuYp0ByBNCzxPg4bIICqYyljMKot62Sa6prr6P/gBDC1MLiHJLS90+jT6ev/Dnmn/BVP8Aaw0nxv4/8P8Aw18KXK69qmk3MlxqEdiRMwuivlpbrtPLopkMnZNy5IIYLyPwa/Z8vvEmv+HtHu4/Ovr+5iS6KDcqAtukwe6om7nuEJxX0XoH7PK/bJG0vRoY5rr/AFslvbLGZf8AfcAf+PGvafgv8CbX4byNqFyI5tWmXYCoytsh6qvqx7t+A4yWiWYUsLhlRpbr72318kVHA1MTiHVqbP7kl0P/2Q==
// @homepage     https://github.com/xFeny/UserScript/tree/main/monkey-jsonviewer
// @match        *://*/*
// @require      https://unpkg.com/@popperjs/core@2.11.8/dist/umd/popper.min.js
// @require      https://unpkg.com/jsmind@0.8.7/es6/jsmind.js
// @require      https://unpkg.com/dom-to-image@2.6.0/src/dom-to-image.js
// @require      https://unpkg.com/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js
// @require      https://unpkg.com/beautifier@0.1.7
// @require      data:application/javascript,%3Bwindow.js_beautify%3Djs_beautify%3Bwindow.css_beautify%3Dcss_beautify%3B
// @require      https://unpkg.com/@highlightjs/cdn-assets@11.10.0/highlight.min.js
// @resource     jsmind  https://unpkg.com/jsmind@0.8.7/style/jsmind.css
// @connect      *
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(o=>window.addEventListener("message",({data:e})=>e?.addStyle&&GM_addStyle(o)))(' @charset "UTF-8";body,iframe,ul{margin:0;padding:0}iframe{border:0}input:focus,select:focus,textarea:focus{outline:0}.jsonp{color:#657b83}#jsoncrackEmbed{border:0;width:100%;height:100%}.tippy-box[data-theme~=layer]{color:#fff;padding:5px;font-size:12px;line-height:20px;background-color:#2e59a7}.tippy-box[data-theme~=layer] .tippy-arrow{color:#2e59a7}.tippy-box[data-theme~=imagebox]{background-color:#d9d9d9}.tippy-box[data-theme~=imagebox] .tippy-arrow{color:#d9d9d9}@media screen and (max-width: 640px){.rightbox{right:0!important}.rightbox .tools{display:none!important}}@media screen and (max-width: 400px){.searchbox{display:none!important}}.json-viewer-layout{top:0;left:0;z-index:10;width:100vw;height:100vh;display:flex;position:fixed;flex-direction:column}.json-viewer-layout .panel{display:flex;line-height:28px;user-select:none;flex-direction:column;background-color:#ececec}.json-viewer-layout .tabs,.json-viewer-layout .toolbar{display:flex;border-bottom:1px solid #ccc}.json-viewer-layout .tabs>div,.json-viewer-layout .toolbar>div{cursor:pointer;padding:0 10px;font-size:12px;transition:background-color .2s ease}.json-viewer-layout .tabs>div:hover,.json-viewer-layout .toolbar>div:hover{background-color:#d4d4d4}.json-viewer-layout .tabs-item{border-top:3px solid #ececec}.json-viewer-layout .tabs-item:hover{border-top-color:#c3c3c6}.json-viewer-layout .tabs-item.active{color:#0060df;border-top-color:#0060df;background-color:#f1f1f1}.json-viewer-layout .toolbar{line-height:23px}.json-viewer-layout .toolbar .searchbox{padding:0;display:flex;flex-grow:1}.json-viewer-layout .toolbar .searchbox:hover{background-color:transparent}.json-viewer-layout .toolbar .searchbox input{flex-grow:1;border:none;outline:none;font-size:12px;padding-left:23px;border-left:1.5px solid #ccc;background-size:14px;background-repeat:no-repeat;background-position:7px center;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAipJREFUWEftljuIE1EUhv8zpJB0FqugItiIdmKnnQ+wjPhq3EILRYt1JTDnDvhgUJG55zY+ELO7hRZupYWCCIK6nXYiNoqlrIUKaxes5siFBGKYSSbJTnaLTDMwl/Ofj8Pc/z+ENX5ojftjfQFYay8AuEFEU2VMRlV/A7hujGm09f+bgIj8APCtjOYdmjuZeWsewCMAZwBcYub7qwkiIjMA7gF4zMxnMwHiOK5Wq9UXAA6r6kljzLPVgLDWniCipwDeNJvNWhzHzUwA/zFJku1BEHiIPUS0PwzDD6NAOOf2qep7AJ/SNK1FUfS9Uy/zFojIXgAeYhsRbQ7D8NcwEM65Tar6E8AygBozf+zWyb2GSZIcCYLgORH9DcNw45AAf1R1Q5qmR6Moep2l0dMHrLWniegJgK/MvHsQCBH5AmCXqk4bYxbzavsakYjMArgD4B0zHyoCISJvARwEcJmZ7/aq6Qvgi0XkJoCrqrpgjDnfS9BaO09E5wDcYuZr/YALAbQgHgLwTpnrER13vcHMF/s19+eFAVoQS/7NzAeyxJ1zS6qaez7wT9hdICITgMkEJhOYTMCq6jEimmXmV90+UboRtdzQ7wZ+aW1UKpUr9Xp9pQ0yFoCuXFhW1agdt2MD8BDOOb83zgPYAWAxCILbqvqg1CzIChMRmQPgI3qFiD773Z+ZTxVJwoHTME9URI4TUV1VtwCYYeaXYwUo2mzkOB6l0dA7YRlNOzX/ATTlNjBwsoHnAAAAAElFTkSuQmCC)}.json-viewer-layout .toolbar .searchbox .clear{flex:0 0 auto;align-self:center;margin:0 4px;padding:0;border:0;width:16px;height:16px;background-color:transparent;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAANZJREFUOE+t0zFKg0EQhuEndbpgIVZ26eIJFK1SeQcPYKuWmlJIb6lHkJRpFFKnE2zTpBAknaUgA/+Q5SfBwGaaZWfne3dmdraj0job9Ae4wwAn+MUcn3jCotS0Aad4RW9LYj+4xkuel4ArPO9Y0RlmEZuAY3ygi/cGct6Clf4V+vhOwCNuG0EEXuAB941v1OzfkOAxbhIwwWVxYwoCEhZrCQzfFMMELHHUSjkhCchsMuwLh3sDVJfwXxOj/ihpaxOrnzEaUzVI2dmqUU5I1Wfa8Susw/4A1fw8ES1B6icAAAAASUVORK5CYII=)}.json-viewer-layout .rightbox{right:200px;display:flex;font-size:12px;position:absolute}.json-viewer-layout .rightbox>div{padding:0 5px;margin-top:2px}.json-viewer-layout .rightbox>div span{cursor:pointer;display:inline;padding:5px 10px;border-radius:3px;transition:background-color .2s ease}.json-viewer-layout .rightbox>div span:hover{background-color:#ccc}.json-viewer-layout .rightbox>div span:after{content:"";width:0;height:0;right:-5px;position:relative;border-style:solid;display:inline-block;vertical-align:middle;border-width:7px 5px 0 5px;border-color:#999 transparent transparent transparent;transform:rotate(0);transition:transform .3s ease}.json-viewer-layout .rightbox>div span.active:after{transform:rotate(180deg)}.json-viewer-layout .rightbox>div ul{color:#333;cursor:pointer;text-align:center;border-radius:3px}.json-viewer-layout .rightbox>div ul li{font-size:12px;padding:5px 20px;list-style-type:none;background-color:#dfdfdf;transition:background-color .2s ease}.json-viewer-layout .rightbox>div ul li:hover{border-radius:3px;background-color:#ccc}.json-viewer-layout .rightbox>div ul li.active:before{left:15px;content:"\u221A";display:inline;position:absolute}.json-viewer-layout .rightbox>div .tippy-box{background-color:#dfdfdf!important}.json-viewer-layout .rightbox>div .tippy-box .tippy-content{padding:5px}.json-viewer-layout .rightbox>div .tippy-box .tippy-arrow{color:#dfdfdf!important}.json-viewer-layout .container{flex-grow:1;overflow:auto;line-height:1.4;font-size:13.5px;font-family:monospace}.json-viewer-layout .container>div{display:none}.json-viewer-layout .container>div.active{display:block}.json-viewer-layout .container #formatBox{padding:5px 0 8px 8px}.json-viewer-layout .container #rawTextBox{font-size:13px;padding:5px 8px}.json-viewer-layout .container #rawTextBox pre{margin:0;padding:0;white-space:pre-wrap;overflow-wrap:break-word}.json-viewer-layout #mindBox{width:100vw;height:calc(100vh - 57px)}.json-viewer-layout #mindBox jmnode{display:flex;align-items:center;padding:0 7px 0 22px;color:#475872!important;box-shadow:none!important;background-color:transparent!important}.json-viewer-layout #mindBox jmnode.root{padding:0;color:transparent!important}.json-viewer-layout #mindBox jmnode:before{content:"";margin-top:1px;position:absolute;border-radius:50%;top:50%!important;transform:translateY(-50%);background-color:#8149bf80}.json-viewer-layout #mindBox jmnode.root:before{left:50%;width:18px;height:18px;transform:translate(-18px,-50%)}.json-viewer-layout #mindBox jmnode:hover{text-shadow:0px 0px 1px currentColor}.json-viewer-layout #mindBox jmnode:not(.root):before{left:0;width:15px;height:15px}.json-viewer-layout #mindBox jmexpander{margin-top:1px;line-height:9px}.json-viewer-layout #mindBox .datatype{opacity:.6;font-size:12px;margin-top:2px;padding-left:5px}.httpRequest{padding:20px;width:700px}.httpRequest .requestbox{display:flex;height:35px}.httpRequest input,.httpRequest select{border-radius:0;padding-left:10px;border:1px solid #ccc}.httpRequest input{flex-grow:1}.httpRequest input[name=url],.httpRequest input:first-child,.httpRequest select{border-right:none}.httpRequest button{cursor:pointer;padding:0 15px;border:1px solid #ccc}.httpRequest button:active{background-color:#cfcfcf}.httpRequest .form-group{display:flex;margin-top:15px;flex-direction:column;gap:5px}.httpRequest label{font-weight:700;font-size:12px}.httpRequest textarea{min-height:100px;resize:vertical;padding:8px;border:1px solid #ccc;border-radius:4px;font-size:14px}.dark-theme .json-viewer-layout li,.dark-theme .json-viewer-layout pre,.dark-theme .json-viewer-layout td:first-child,.dark-plus-theme .json-viewer-layout li,.dark-plus-theme .json-viewer-layout pre,.dark-plus-theme .json-viewer-layout td:first-child{color:#ccc}.dark-theme .json-viewer-layout .panel,.dark-plus-theme .json-viewer-layout .panel{color:#c4c4c4;background-color:#333}.dark-theme .json-viewer-layout .panel>div,.dark-plus-theme .json-viewer-layout .panel>div{border-bottom-color:#464646}.dark-theme .json-viewer-layout .panel .tabs-item:hover,.dark-theme .json-viewer-layout .panel .toolbar-item:hover,.dark-plus-theme .json-viewer-layout .panel .tabs-item:hover,.dark-plus-theme .json-viewer-layout .panel .toolbar-item:hover{background-color:#464646}.dark-theme .json-viewer-layout .panel .tabs-item,.dark-plus-theme .json-viewer-layout .panel .tabs-item{border-top-color:#333}.dark-theme .json-viewer-layout .panel .tabs-item:hover,.dark-plus-theme .json-viewer-layout .panel .tabs-item:hover{border-top-color:#c3c3c6}.dark-theme .json-viewer-layout .panel .tabs-item.active,.dark-plus-theme .json-viewer-layout .panel .tabs-item.active{color:#c4c4c4;border-top-color:#64b7ff;background-color:#464646}.dark-theme .json-viewer-layout .searchbox input,.dark-plus-theme .json-viewer-layout .searchbox input{color:#ccc;background-color:#464646;border-left-color:#333}.dark-theme .json-viewer-layout .searchbox .clear,.dark-plus-theme .json-viewer-layout .searchbox .clear{filter:invert(.8)}.dark-theme .json-viewer-layout .rightbox>div span:hover,.dark-plus-theme .json-viewer-layout .rightbox>div span:hover{background-color:#464646}.dark-theme .json-viewer-layout .rightbox .tippy-box,.dark-plus-theme .json-viewer-layout .rightbox .tippy-box{background-color:#4e4e4e!important}.dark-theme .json-viewer-layout .rightbox .tippy-box .tippy-arrow,.dark-plus-theme .json-viewer-layout .rightbox .tippy-box .tippy-arrow{color:#4e4e4e!important}.dark-theme .json-viewer-layout .rightbox .tippy-box li,.dark-plus-theme .json-viewer-layout .rightbox .tippy-box li{background-color:#4e4e4e!important}.dark-theme .json-viewer-layout .rightbox .tippy-box li:hover,.dark-plus-theme .json-viewer-layout .rightbox .tippy-box li:hover{background-color:#464646!important}.dark-theme .json-viewer-layout jmnode,.dark-plus-theme .json-viewer-layout jmnode{filter:brightness(2)}.dark-theme .json-viewer-layout jmexpander,.dark-plus-theme .json-viewer-layout jmexpander{background-color:#dfdfdf}.js-mind-child-node{width:300px;height:300px;margin:10px;overflow-y:scroll;position:relative;padding:5px 20px;background-color:#f8f9fa}.js-mind-child-node div{color:#475872;line-height:25px}.js-mind-copy{top:5px;right:10px;width:20px;height:20px;cursor:pointer;position:absolute;background-size:20px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYRJREFUWEftlzFOw0AQRefbF+EMVJFA1kzcUNGRW8ABkFBASBQgUZAiLSUiHb29W1DTQUFFzxFQvGglO8JW1uuElQIGl8545/n/0eQbtOELG+5PNYA8z28AHIaAMsZMhsPhke+sBYDW+mE+nz9FUaR9D3X5vSgKjuN4m5n32+oXAEopQ0QiIkEAlFJMREpEWm3uP0BD/ndjzAzArFLaq0Appdf2pnWVBdbWLw9vEdEYwJSZL+39VoA8z3cAPHq7Ez3HcTxKkuSlqnXNQJZlp1EU7YnIwAvQobGzxAXQvO+1YF2I/gBYz7qokKZprS6YAhsH6PL2y2qCKfC3AbTWB8aY+y4qABgx88y3iFbeA99dxc1/w5UBurz9/xD2Q4EqEzZX6rozYDfoskzYNoS7RHRORDbLhbhstjwRkVqecAI4fFREdBYqqNoevw7gCsAHMx+H8MSe4YxkDgsGAC6KorgD8BoAogql18w8qWVC1+GlZ+NAw/lWztRt1e9nfZwGkHjlIz4Bw1VmMCtaHCkAAAAASUVORK5CYII=)}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}.monkey-js-css-beautify body{padding-top:20px;padding-left:5px}.monkey-js-css-beautify body .beautify_checkbox{top:0;left:0;z-index:999;width:100vw;display:flex;position:fixed;padding:5px 10px;align-items:center;background-color:#f3f3f3;border-bottom:1px solid #ccc}.monkey-js-css-beautify body .beautify_checkbox label{font-size:13px;user-select:none!important}.monkey-js-css-beautify body .beautify_checkbox input[type=checkbox]{top:1.5px;width:14px;height:14px;margin-right:5px;position:relative}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#fff;color:#000}.xml .hljs-meta{color:silver}.hljs-comment,.hljs-quote{color:#007400}.hljs-attribute,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#aa0d91}.hljs-template-variable,.hljs-variable{color:#3f6e74}.hljs-code,.hljs-meta .hljs-string,.hljs-string{color:#c41a16}.hljs-link,.hljs-regexp{color:#0e0eff}.hljs-bullet,.hljs-number,.hljs-symbol,.hljs-title{color:#1c00cf}.hljs-meta,.hljs-section{color:#643820}.hljs-built_in,.hljs-class .hljs-title,.hljs-params,.hljs-title.class_,.hljs-type{color:#5c2699}.hljs-attr{color:#836c28}.hljs-subst{color:#000}.hljs-formula{background-color:#eee;font-style:italic}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-selector-class,.hljs-selector-id{color:#9b703f}.hljs-doctag,.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}ul,li{list-style-type:none}wrapper{display:contents}.hidden{display:none!important}.json-viewer ul{border-left:.5px dotted #ccc}.json-viewer ul li{padding-left:20px}.json-bracket{font-weight:700}.json-copy{width:13px;height:13px;cursor:pointer;margin-left:.15em;display:inline-block;background-size:13px;vertical-align:text-bottom;background-repeat:no-repeat;transition:background-image ease .3s;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAYRJREFUWEftlzFOw0AQRefbF+EMVJFA1kzcUNGRW8ABkFBASBQgUZAiLSUiHb29W1DTQUFFzxFQvGglO8JW1uuElQIGl8545/n/0eQbtOELG+5PNYA8z28AHIaAMsZMhsPhke+sBYDW+mE+nz9FUaR9D3X5vSgKjuN4m5n32+oXAEopQ0QiIkEAlFJMREpEWm3uP0BD/ndjzAzArFLaq0Appdf2pnWVBdbWLw9vEdEYwJSZL+39VoA8z3cAPHq7Ez3HcTxKkuSlqnXNQJZlp1EU7YnIwAvQobGzxAXQvO+1YF2I/gBYz7qokKZprS6YAhsH6PL2y2qCKfC3AbTWB8aY+y4qABgx88y3iFbeA99dxc1/w5UBurz9/xD2Q4EqEzZX6rozYDfoskzYNoS7RHRORDbLhbhstjwRkVqecAI4fFREdBYqqNoevw7gCsAHMx+H8MSe4YxkDgsGAC6KorgD8BoAogql18w8qWVC1+GlZ+NAw/lWztRt1e9nfZwGkHjlIz4Bw1VmMCtaHCkAAAAASUVORK5CYII=)}.json-copy.success{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhZJREFUWEftlU1IFGEYx//Pu2R0kLrYwUMg7M5EHjwklNUOLoInxYMg7W6HTkEIgkLMLF6CsllDokN4Vfy4SnSqk+7sRghBFBT7IWKHQATFSxCLM09sabjjO/thLnuZ9zjPx//3/t9n3pfQ5EVN1ocP4DvgO9AwB/RMsJNYjAF4wEwz01rukeyXbwjAZEbttpmXAKhHokQ8bN4prLghzhwgkVHCzLQE8JUyMeblpFa411AAIxXshxCLAC6fFOKbZriw3jAA3VKHiLgk3uoS+UWMqKnlX9c8AwkreA0i0GM7vFu0i2svI1v7ld4M3VLuEmEBwLnjeQTsMyiaDOfeetVLZ8BIhz4CdP2w6CuxM2JqG99kTYz3oftwaE4S23Zsij3vza1Wgj8BYKSDvYBwF0khdEt9SMSzEoHvJETUvJ39UO219XBA2QHQ5iougzAsZRyEFxKBHAJONHlr41M18VLc6wgmAXoqafAHgoUYAuOZJP6Z2Il5HVfNQ1hK1NPKKAGvZBAAOiXf1wGOJcOFzVp2/u+CqpRsZNQ4/t5oVRalAkWOT/Xlf1TLrPseSKRDAw7TIhEuyS3kd2gJxM0b2d16xT1nwN1IT4U0IWiegY6yGPObg4sXYjNdX36eRrxmgMOZ6CLQE4AHGdgTjOXzdvvE48jawWnF6wI4EkmsKlfNSD77P6LHa8/8NawXzAfwHfAdaLoDvwHyYK0h/tY7mwAAAABJRU5ErkJggg==)}.json-arrow{width:0;opacity:.2;display:inline-block}.json-arrow:hover{opacity:.35}.json-arrow:before{width:0;height:0;left:-13px;content:"";cursor:pointer;position:relative;border-style:solid;display:inline-block;vertical-align:middle;transform:rotate(90deg);border-width:5px 0 5px 8px;transition:transform .3s ease;border-color:transparent transparent transparent currentColor}.collapsed .json-arrow:before{transform:rotate(0)}.json-desc{display:none;cursor:pointer;font-size:12px;font-weight:700;color:#9aa160;user-select:none;margin-left:.3em}.json-desc span{margin:0 .5em;font-weight:400}.json-desc span:hover{text-decoration:underline}.json-color{width:.7em;height:.7em;margin-right:.3em;display:inline-block;vertical-align:middle;border:1px solid #ccc}.json-comma{margin-left:.15em;font-family:Courier New,monospace}.json-colon{margin:0 .3em 0 .15em}.default-theme{background-color:#fefefe}.default-theme .json-bracket[type=object]{color:#6d9331}.default-theme .json-bracket[type=array]{color:#8e9331}.default-theme .json-key{color:#910f93;cursor:pointer}.default-theme .json-string,.default-theme .json-string a{color:#2e7c16}.default-theme .json-bigint,.default-theme .json-number{color:#164ff1}.default-theme .json-boolean{color:#c41a16}.default-theme .json-null{color:#228fec}.light-theme{background-color:#fefefe}.light-theme .json-bracket[type=object]{color:#6d9331}.light-theme .json-bracket[type=array]{color:#8e9331}.light-theme .json-key{color:#0040cf;cursor:pointer}.light-theme .json-string,.light-theme .json-string a{color:#a31515}.light-theme .json-bigint,.light-theme .json-number{color:#0b7500}.light-theme .json-boolean{color:#00f}.light-theme .json-null{color:#05f}.dark-theme{background-color:#252526}.dark-theme .json-bracket[type=object]{color:#9bba43}.dark-theme .json-bracket[type=array]{color:#c4af00}.dark-theme .json-key{color:#9cdcfe;cursor:pointer}.dark-theme .json-string,.dark-theme .json-string a{color:#ce9178}.dark-theme .json-bigint,.dark-theme .json-number{color:#b5cea8}.dark-theme .json-boolean{color:#358cd6}.dark-theme .json-null{color:#569cd6}.dark-plus-theme{background-color:#1e1f22}.dark-plus-theme .json-bracket[type=object]{color:#bb9667}.dark-plus-theme .json-bracket[type=array]{color:#a1a84e}.dark-plus-theme .json-key{color:#c77dbb;cursor:pointer}.dark-plus-theme .json-string,.dark-plus-theme .json-string a{color:#6aab73}.dark-plus-theme .json-bigint,.dark-plus-theme .json-number{color:#28aab4}.dark-plus-theme .json-boolean{color:#ce8951}.dark-plus-theme .json-null{color:#c78d61}.dark-theme .json-viewer ul,.dark-plus-theme .json-viewer ul{border-left:.5px dotted #5e5e5e}.dark-theme .json-colon,.dark-theme .json-comma,.dark-plus-theme .json-colon,.dark-plus-theme .json-comma{color:#ccc}.dark-theme .json-arrow,.dark-plus-theme .json-arrow{color:#fff;opacity:.35}.dark-theme .json-arrow:hover,.dark-plus-theme .json-arrow:hover{opacity:.5}.json-tree-table{border-collapse:collapse;width:-webkit-fill-available}.json-tree-table tr.selected *{color:#fff!important;background-color:#3875d7}.json-tree-table tr:hover{background-color:#f0f9fe}.json-tree-table tr td:first-child{width:120px}.dark-theme .json-tree-table tr:hover,.dark-plus-theme .json-tree-table tr:hover{background-color:#353b48}.scroll-top{right:15px;width:45px;height:45px;z-index:999;bottom:30px;display:none;font-size:12px;cursor:pointer;position:fixed;border-radius:50%;background-size:30px;background-color:#fff;background-position:center;background-repeat:no-repeat;box-shadow:0 0 5px #3eaf7c4d;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJmaWxsOiMzZWFmN2MiIGNsYXNzPSJpY29uIGJhY2stdG8tdG9wLWljb24iIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIGZpbGw9ImN1cnJlbnRDb2xvciIgYXJpYS1sYWJlbD0iYmFjay10by10b3AgaWNvbiI+PHBhdGggZD0iTTUxMiA4NDMuMmMtMzYuMiAwLTY2LjQtMTMuNi04NS44LTIxLjgtMTAuOC00LjYtMjIuNiAzLjYtMjEuOCAxNS4ybDcgMTAyYy40IDYuMiA3LjYgOS40IDEyLjYgNS42bDI5LTIyYzMuNi0yLjggOS0xLjggMTEuNCAybDQxIDY0LjJjMyA0LjggMTAuMiA0LjggMTMuMiAwbDQxLTY0LjJjMi40LTMuOCA3LjgtNC44IDExLjQtMmwyOSAyMmM1IDMuOCAxMi4yLjYgMTIuNi01LjZsNy0xMDJjLjgtMTEuNi0xMS0yMC0yMS44LTE1LjItMTkuNiA4LjItNDkuNiAyMS44LTg1LjggMjEuOHoiPjwvcGF0aD48cGF0aCBkPSJtNzk1LjQgNTg2LjItOTYtOTguMkM2OTkuNCAxNzIgNTEzIDMyIDUxMyAzMlMzMjQuOCAxNzIgMzI0LjggNDg4bC05NiA5OC4yYy0zLjYgMy42LTUuMiA5LTQuNCAxNC4yTDI2MS4yIDgyNGMxLjggMTEuNCAxNC4yIDE3IDIzLjYgMTAuOEw0MTkgNzQ0czQxLjQgNDAgOTQuMiA0MGM1Mi44IDAgOTIuMi00MCA5Mi4yLTQwbDEzNC4yIDkwLjhjOS4yIDYuMiAyMS42LjYgMjMuNi0xMC44bDM3LTIyMy44Yy40LTUuMi0xLjItMTAuNC00LjgtMTR6TTUxMyAzODRjLTM0IDAtNjEuNC0yOC42LTYxLjQtNjRzMjcuNi02NCA2MS40LTY0YzM0IDAgNjEuNCAyOC42IDYxLjQgNjRTNTQ3IDM4NCA1MTMgMzg0eiI+PC9wYXRoPjwvc3ZnPg==)}.scroll-top:hover{background-color:#f9f9f9}.dark-theme .scroll-top,.dark-plus-theme .scroll-top{background-color:#464646;box-shadow:0 0 5px #505050}.tippy-box[data-theme~=scroll]{font-size:12px} ');

!function(){function e(e,t){return(t||"")+" (SystemJS Error#"+e+" https://github.com/systemjs/systemjs/blob/main/docs/errors.md#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(j,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var n,r=t.slice(0,t.indexOf(":")+1);if(n="/"===t[r.length+1]?"file:"!==r?(n=t.slice(r.length+2)).slice(n.indexOf("/")+1):t.slice(8):t.slice(r.length+("/"===t[r.length])),"/"===e[0])return t.slice(0,t.length-n.length-1)+e;for(var i=n.slice(0,n.lastIndexOf("/")+1)+e,o=[],s=-1,u=0;u<i.length;u++)-1!==s?"/"===i[u]&&(o.push(i.slice(s,u+1)),s=-1):"."===i[u]?"."!==i[u+1]||"/"!==i[u+2]&&u+2!==i.length?"/"===i[u+1]||u+1===i.length?u+=1:s=u:(o.pop(),u+=2):s=u;return-1!==s&&o.push(i.slice(s)),t.slice(0,t.length-n.length)+o.join("")}}function n(e,n){return t(e,n)||(-1!==e.indexOf(":")?e:t("./"+e,n))}function r(e,n,r,i,o){for(var s in e){var a=t(s,r)||s,f=e[s];if("string"==typeof f){var l=c(i,t(f,r)||f,o);l?n[a]=l:u("W1",s,f,"bare specifier did not resolve")}}}function i(e,t,i){var o;for(o in e.imports&&r(e.imports,i.imports,t,i,null),e.scopes||{}){var s=n(o,t);r(e.scopes[o],i.scopes[s]||(i.scopes[s]={}),t,i,s)}for(o in e.depcache||{})i.depcache[n(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[n(o,t)]=e.integrity[o]}function o(e,t){if(t[e])return e;var n=e.length;do{var r=e.slice(0,n+1);if(r in t)return r}while(-1!==(n=e.lastIndexOf("/",n-1)))}function s(e,t){var n=o(e,t);if(n){var r=t[n];if(null===r)return;if(!(e.length>n.length&&"/"!==r[r.length-1]))return r+e.slice(n.length);u("W2",n,r,"should have a trailing '/'")}}function u(t,n,r,i){console.warn(e(t,"Package target "+i+", resolving target '"+r+"' for "+n))}function c(e,t,n){for(var r=e.scopes,i=n&&o(n,r);i;){var u=s(t,r[i]);if(u)return u;i=o(i.slice(0,i.lastIndexOf("/")),r)}return s(t,e.imports)||-1!==t.indexOf(":")&&t}function a(){this[M]={}}function f(e){return e.id}function l(e,t,n,r){if(e.onload(n,t.id,t.d&&t.d.map(f),!!r),n)throw n}function d(t,n,r,i){var o=t[M][n];if(o)return o;var s=[],u=Object.create(null);P&&Object.defineProperty(u,P,{value:"Module"});var c=Promise.resolve().then((function(){return t.instantiate(n,r,i)})).then((function(r){if(!r)throw Error(e(2,"Module "+n+" did not instantiate"));var i=r[1]((function(e,t){o.h=!0;var n=!1;if("string"==typeof e)e in u&&u[e]===t||(u[e]=t,n=!0);else{for(var r in e)t=e[r],r in u&&u[r]===t||(u[r]=t,n=!0);e&&e.__esModule&&(u.__esModule=e.__esModule)}if(n)for(var i=0;i<s.length;i++){var c=s[i];c&&c(u)}return t}),2===r[1].length?{import:function(e,r){return t.import(e,n,r)},meta:t.createContext(n)}:void 0);return o.e=i.execute||function(){},[r[0],i.setters||[],r[2]||[]]}),(function(e){throw o.e=null,o.er=e,l(t,o,e,!0),e})),a=c.then((function(e){return Promise.all(e[0].map((function(r,i){var o=e[1][i],s=e[2][i];return Promise.resolve(t.resolve(r,n)).then((function(e){var r=d(t,e,n,s);return Promise.resolve(r.I).then((function(){return o&&(r.i.push(o),!r.h&&r.I||o(r.n)),r}))}))}))).then((function(e){o.d=e}))}));return o=t[M][n]={id:n,i:s,n:u,m:i,I:c,L:a,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0,p:void 0}}function h(e,t,n,r){if(!r[t.id])return r[t.id]=!0,Promise.resolve(t.L).then((function(){return t.p&&null!==t.p.e||(t.p=n),Promise.all(t.d.map((function(t){return h(e,t,n,r)})))})).catch((function(n){if(t.er)throw n;throw t.e=null,l(e,t,n,!1),n}))}function p(e,t){return t.C=h(e,t,t,{}).then((function(){return v(e,t,{})})).then((function(){return t.n}))}function v(e,t,n){function r(){try{var n=o.call(L);if(n)return n=n.then((function(){t.C=t.n,t.E=null,l(e,t,null,!0)}),(function(n){throw t.er=n,t.E=null,l(e,t,n,!0),n})),t.E=n;t.C=t.n,t.L=t.I=void 0}catch(r){throw t.er=r,r}finally{l(e,t,t.er,!0)}}if(!n[t.id]){if(n[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var i,o=t.e;return t.e=null,t.d.forEach((function(r){try{var o=v(e,r,n);o&&(i=i||[]).push(o)}catch(s){throw t.er=s,l(e,t,s,!1),s}})),i?Promise.all(i).then(r):r()}}function m(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):n(t.src,g)).catch((function(e){if(e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3")>-1){var n=document.createEvent("Event");n.initEvent("error",!1,!1),t.dispatchEvent(n)}return Promise.reject(e)}))}else if("systemjs-importmap"===t.type){t.sp=!0;var r=t.src?(System.fetch||fetch)(t.src,{integrity:t.integrity,priority:t.fetchPriority,passThrough:!0}).then((function(e){if(!e.ok)throw Error("Invalid status code: "+e.status);return e.text()})).catch((function(n){return n.message=e("W4","Error fetching systemjs-import map "+t.src)+"\n"+n.message,console.warn(n),"function"==typeof t.onerror&&t.onerror(),"{}"})):t.innerHTML;W=W.then((function(){return r})).then((function(n){!function(t,n,r){var o={};try{o=JSON.parse(n)}catch(s){console.warn(Error(e("W5","systemjs-importmap contains invalid JSON")+"\n\n"+n+"\n"))}i(o,r,t)}(N,n,t.src||g)}))}}))}var g,y="undefined"!=typeof Symbol,b="undefined"!=typeof self,S="undefined"!=typeof document,w=b?self:global;if(S){var O=document.querySelector("base[href]");O&&(g=O.href)}if(!g&&"undefined"!=typeof location){var E=(g=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==E&&(g=g.slice(0,E+1))}var x,j=/\\/g,P=y&&Symbol.toStringTag,M=y?Symbol():"@",I=a.prototype;I.import=function(e,t,n){var r=this;return t&&"object"==typeof t&&(n=t,t=void 0),Promise.resolve(r.prepareImport()).then((function(){return r.resolve(e,t,n)})).then((function(e){var t=d(r,e,void 0,n);return t.C||p(r,t)}))},I.createContext=function(e){var t=this;return{url:e,resolve:function(n,r){return Promise.resolve(t.resolve(n,r||e))}}},I.onload=function(){},I.register=function(e,t,n){x=[e,t,n]},I.getRegister=function(){var e=x;return x=void 0,e};var L=Object.freeze(Object.create(null));w.System=new a;var C,R,W=Promise.resolve(),N={imports:{},scopes:{},depcache:{},integrity:{}},T=S;if(I.prepareImport=function(e){return(T||e)&&(m(),T=!1),W},I.getImportMap=function(){return JSON.parse(JSON.stringify(N))},S&&(m(),window.addEventListener("DOMContentLoaded",m)),I.addImportMap=function(e,t){i(e,t||g,N)},S){window.addEventListener("error",(function(e){J=e.filename,_=e.error}));var A=location.origin}I.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(A+"/")&&(t.crossOrigin="anonymous");var n=N.integrity[e];return n&&(t.integrity=n),t.src=e,t};var J,_,k={},U=I.register;I.register=function(e,t){if(S&&"loading"===document.readyState&&"string"!=typeof e){var n=document.querySelectorAll("script[src]"),r=n[n.length-1];if(r){C=e;var i=this;R=setTimeout((function(){k[r.src]=[e,t],i.import(r.src)}))}}else C=void 0;return U.call(this,e,t)},I.instantiate=function(t,n){var r=k[t];if(r)return delete k[t],r;var i=this;return Promise.resolve(I.createScript(t)).then((function(r){return new Promise((function(o,s){r.addEventListener("error",(function(){s(Error(e(3,"Error loading "+t+(n?" from "+n:""))))})),r.addEventListener("load",(function(){if(document.head.removeChild(r),J===t)s(_);else{var e=i.getRegister(t);e&&e[0]===C&&clearTimeout(R),o(e)}})),document.head.appendChild(r)}))}))},I.shouldFetch=function(){return!1},"undefined"!=typeof fetch&&(I.fetch=fetch);var $=I.instantiate,B=/^(text|application)\/(x-)?javascript(;|$)/;I.instantiate=function(t,n,r){var i=this;return this.shouldFetch(t,n,r)?this.fetch(t,{credentials:"same-origin",integrity:N.integrity[t],meta:r}).then((function(r){if(!r.ok)throw Error(e(7,r.status+" "+r.statusText+", loading "+t+(n?" from "+n:"")));var o=r.headers.get("content-type");if(!o||!B.test(o))throw Error(e(4,'Unknown Content-Type "'+o+'", loading '+t+(n?" from "+n:"")));return r.text().then((function(e){return e.indexOf("//# sourceURL=")<0&&(e+="\n//# sourceURL="+t),(0,eval)(e),i.getRegister(t)}))})):$.apply(this,arguments)},I.resolve=function(n,r){return c(N,t(n,r=r||g)||n,r)||function(t,n){throw Error(e(8,"Unable to resolve bare specifier '"+t+(n?"' from "+n:"'")))}(n,r)};var F=I.instantiate;I.instantiate=function(e,t,n){var r=N.depcache[e];if(r)for(var i=0;i<r.length;i++)d(this,this.resolve(r[i],e),e);return F.call(this,e,t,n)},b&&"function"==typeof importScripts&&(I.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister(e)}))}),function(e){function t(t){return!e.hasOwnProperty(t)||!isNaN(t)&&t<e.length||a&&e[t]&&"undefined"!=typeof window&&e[t].parent===window}var n,r,i,o=e.System.constructor.prototype,s=o.import;o.import=function(o,u,c){return function(){for(var o in n=r=void 0,e)t(o)||(n?r||(r=o):n=o,i=o)}(),s.call(this,o,u,c)};var u=[[],function(){return{}}],c=o.getRegister;o.getRegister=function(){var o=c.call(this);if(o)return o;var s,a=function(o){var s,u,c=0;for(var a in e)if(!t(a)){if(0===c&&a!==n||1===c&&a!==r)return a;s?(i=a,u=o&&u||a):s=a===i,c++}return u}(this.firstGlobalProp);if(!a)return u;try{s=e[a]}catch(f){return u}return[[],function(e){return{execute:function(){e(s),e({default:s,__useDefault:!0})}}}]};var a="undefined"!=typeof navigator&&-1!==navigator.userAgent.indexOf("Trident")}("undefined"!=typeof self?self:global),function(e){var t=e.System.constructor.prototype,r=/^[^#?]+\.(css|html|json|wasm)([?#].*)?$/,i=t.shouldFetch.bind(t);t.shouldFetch=function(e){return i(e)||r.test(e)};var o=/^application\/json(;|$)/,s=/^text\/css(;|$)/,u=/^application\/wasm(;|$)/,c=t.fetch;t.fetch=function(t,r){return c(t,r).then((function(i){if(r.passThrough)return i;if(!i.ok)return i;var c=i.headers.get("content-type");return o.test(c)?i.json().then((function(e){return new Response(new Blob(['System.register([],function(e){return{execute:function(){e("default",'+JSON.stringify(e)+")}}})"],{type:"application/javascript"}))})):s.test(c)?i.text().then((function(e){return e=e.replace(/url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g,(function(e,r,i,o){return["url(",r,n(i||o,t),r,")"].join("")})),new Response(new Blob(["System.register([],function(e){return{execute:function(){var s=new CSSStyleSheet();s.replaceSync("+JSON.stringify(e)+');e("default",s)}}})'],{type:"application/javascript"}))})):u.test(c)?(WebAssembly.compileStreaming?WebAssembly.compileStreaming(i):i.arrayBuffer().then(WebAssembly.compile)).then((function(n){e.System.wasmModules||(e.System.wasmModules=Object.create(null)),e.System.wasmModules[t]=n;var r=[],i=[];return WebAssembly.Module.imports&&WebAssembly.Module.imports(n).forEach((function(e){var t=JSON.stringify(e.module);-1===r.indexOf(t)&&(r.push(t),i.push("function(m){i["+t+"]=m}"))})),new Response(new Blob(["System.register(["+r.join(",")+"],function(e){var i={};return{setters:["+i.join(",")+"],execute:function(){return WebAssembly.instantiate(System.wasmModules["+JSON.stringify(t)+"],i).then(function(m){e(m.exports)})}}})"],{type:"application/javascript"}))})):i}))}}("undefined"!=typeof self?self:global);var q="undefined"!=typeof Symbol&&Symbol.toStringTag;I.get=function(e){var t=this[M][e];if(t&&null===t.e&&!t.E)return t.er?null:t.n},I.set=function(t,n){try{new URL(t)}catch(s){console.warn(Error(e("W3",'"'+t+'" is not a valid URL to set in the module registry')))}var r;q&&"Module"===n[q]?r=n:(r=Object.assign(Object.create(null),n),q&&Object.defineProperty(r,q,{value:"Module"}));var i=Promise.resolve(r),o=this[M][t]||(this[M][t]={id:t,i:[],h:!1,d:[],e:null,er:void 0,E:void 0});return!o.e&&!o.E&&(Object.assign(o,{n:r,I:void 0,L:void 0,C:i}),r)},I.has=function(e){return!!this[M][e]},I.delete=function(e){var t=this[M],n=t[e];if(!n||n.p&&null!==n.p.e||n.E)return!1;var r=n.i;return n.d&&n.d.forEach((function(e){var t=e.i.indexOf(n);-1!==t&&e.i.splice(t,1)})),delete t[e],function(){var n=t[e];if(!n||!r||null!==n.e||n.E)return!1;r.forEach((function(e){n.i.push(e),e(n.n)})),r=null}};var D="undefined"!=typeof Symbol&&Symbol.iterator;I.entries=function(){var e,t,n=this,r=Object.keys(n[M]),i=0,o={next:function(){for(;void 0!==(t=r[i++])&&void 0===(e=n.get(t)););return{done:void 0===t,value:void 0!==t&&[t,e]}}};return o[D]=function(){return this},o}}();
!function(t){function e(t){t.registerRegistry=Object.create(null),t.namedRegisterAliases=Object.create(null)}var r=t.System;e(r);var i,s,n=r.constructor.prototype,l=r.constructor,a=function(){l.call(this),e(this)};a.prototype=n,r.constructor=a;var o=n.register;n.register=function(t,e,r,n){if("string"!=typeof t)return o.apply(this,arguments);var l=[e,r,n];return this.registerRegistry[t]=l,i||(i=l,s=t),Promise.resolve().then((function(){i=null,s=null})),o.apply(this,[e,r,n])};var u=n.resolve;n.resolve=function(t,e){try{return u.call(this,t,e)}catch(r){if(t in this.registerRegistry)return this.namedRegisterAliases[t]||t;throw r}};var c=n.instantiate;n.instantiate=function(t,e,r){var i=this.registerRegistry[t];return i?(this.registerRegistry[t]=null,i):c.call(this,t,e,r)};var g=n.getRegister;n.getRegister=function(t){var e=g.call(this,t);s&&t&&(this.namedRegisterAliases[s]=t);var r=i||e;return i=null,s=null,r}}("undefined"!=typeof self?self:global);
;(typeof System!='undefined')&&(System=new System.constructor());
System.addImportMap({ imports: {"highlight.js":"user:highlight.js","beautifier":"user:beautifier","tippy.js":"user:tippy.js","jsmind":"user:jsmind","dom-to-image":"user:dom-to-image"} });
System.set("user:highlight.js", (()=>{const _=hljs;('default' in _)||(_.default=_);return _})());
System.set("user:beautifier", (()=>{const _1=js_beautify;('default' in _1)||(_1.default=_1);return _1})());
System.set("user:tippy.js", (()=>{const _=tippy;('default' in _)||(_.default=_);return _})());
System.set("user:jsmind", (()=>{const _=jsMind;('default' in _)||(_.default=_);return _})());
System.set("user:dom-to-image", (()=>{const _=domtoimage;('default' in _)||(_.default=_);return _})());

System.register("./__entry.js", ['./__monkey.entry-BM-c8wSS.js'], (function (exports, module) {
	'use strict';
	return {
		setters: [null],
		execute: (function () {



		})
	};
}));

System.register("./__monkey.entry-BM-c8wSS.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      const scriptRel = function detectScriptRel() {
        const relList = typeof document !== "undefined" && document.createElement("link").relList;
        return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
      }();
      const assetsURL = function(dep) {
        return "/" + dep;
      };
      const seen = {};
      const __vitePreload = function preload(baseModule, deps, importerUrl) {
        let promise = Promise.resolve();
        if (deps && deps.length > 0) {
          document.getElementsByTagName("link");
          const cspNonceMeta = document.querySelector(
            "meta[property=csp-nonce]"
          );
          const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
          promise = Promise.allSettled(
            deps.map((dep) => {
              dep = assetsURL(dep);
              if (dep in seen) return;
              seen[dep] = true;
              const isCss = dep.endsWith(".css");
              const cssSelector = isCss ? '[rel="stylesheet"]' : "";
              if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
                return;
              }
              const link = document.createElement("link");
              link.rel = isCss ? "stylesheet" : scriptRel;
              if (!isCss) {
                link.as = "script";
              }
              link.crossOrigin = "";
              link.href = dep;
              if (cspNonce) {
                link.setAttribute("nonce", cspNonce);
              }
              document.head.appendChild(link);
              if (isCss) {
                return new Promise((res, rej) => {
                  link.addEventListener("load", res);
                  link.addEventListener(
                    "error",
                    () => rej(new Error(`Unable to preload CSS for ${dep}`))
                  );
                });
              }
            })
          );
        }
        function handlePreloadError(err) {
          const e = new Event("vite:preloadError", {
            cancelable: true
          });
          e.payload = err;
          window.dispatchEvent(e);
          if (!e.defaultPrevented) {
            throw err;
          }
        }
        return promise.then((res) => {
          for (const item of res || []) {
            if (item.status !== "rejected") continue;
            handlePreloadError(item.reason);
          }
          return baseModule().catch(handlePreloadError);
        });
      };
      var jsonBigintNative = {};
      var stringify = { exports: {} };
      (function(module) {
        var JSON = module.exports;
        (function() {
          var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            // table of character substitutions
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
          }, rep;
          function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
              var c = meta[a];
              return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
          }
          function str(key, holder) {
            var i, k, v, length, mind = gap, partial, value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
              value = value.toJSON(key);
            }
            if (typeof rep === "function") {
              value = rep.call(holder, key, value);
            }
            switch (typeof value) {
              case "string":
                return quote(value);
              case "number":
                return isFinite(value) ? String(value) : "null";
              case "boolean":
              case "null":
              case "bigint":
                return String(value);
              case "object":
                if (!value) {
                  return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                  length = value.length;
                  for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                  }
                  v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                  gap = mind;
                  return v;
                }
                if (rep && typeof rep === "object") {
                  length = rep.length;
                  for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                        partial.push(quote(k) + (gap ? ": " : ":") + v);
                      }
                    }
                  }
                } else {
                  Object.keys(value).forEach(function(k2) {
                    var v2 = str(k2, value);
                    if (v2) {
                      partial.push(quote(k2) + (gap ? ": " : ":") + v2);
                    }
                  });
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
            }
          }
          if (typeof JSON.stringify !== "function") {
            JSON.stringify = function(value, replacer, space) {
              var i;
              gap = "";
              indent = "";
              if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                  indent += " ";
                }
              } else if (typeof space === "string") {
                indent = space;
              }
              rep = replacer;
              if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
              }
              return str("", { "": value });
            };
          }
        })();
      })(stringify);
      var stringifyExports = stringify.exports;
      var json_parse$1 = function(options) {
        var _options;
        var at, ch, escapee = {
          '"': '"',
          "\\": "\\",
          "/": "/",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "	"
        }, text, error = function(m) {
          throw {
            name: "SyntaxError",
            message: m,
            at,
            text
          };
        }, next = function(c) {
          if (c && c !== ch) {
            error("Expected '" + c + "' instead of '" + ch + "'");
          }
          ch = text.charAt(at);
          at += 1;
          return ch;
        }, number = function() {
          var number2, string2 = "";
          if (ch === "-") {
            string2 = "-";
            next("-");
          }
          while (ch >= "0" && ch <= "9") {
            string2 += ch;
            next();
          }
          if (ch === ".") {
            string2 += ".";
            while (next() && ch >= "0" && ch <= "9") {
              string2 += ch;
            }
          }
          if (ch === "e" || ch === "E") {
            string2 += ch;
            next();
            if (ch === "-" || ch === "+") {
              string2 += ch;
              next();
            }
            while (ch >= "0" && ch <= "9") {
              string2 += ch;
              next();
            }
          }
          number2 = +string2;
          if (!isFinite(number2)) {
            error("Bad number");
          } else {
            if (string2.length > 15 && string2.indexOf(".") === -1) {
              try {
                return BigInt(string2);
              } catch (e) {
                switch (_options.fallbackTo) {
                  case "number":
                    return number2;
                  case "string":
                    return string2;
                  default:
                    throw e;
                }
              }
            } else {
              return number2;
            }
          }
        }, string = function() {
          var hex, i, string2 = "", uffff;
          if (ch === '"') {
            var startAt = at;
            while (next()) {
              if (ch === '"') {
                if (at - 1 > startAt) string2 += text.substring(startAt, at - 1);
                next();
                return string2;
              }
              if (ch === "\\") {
                if (at - 1 > startAt) string2 += text.substring(startAt, at - 1);
                next();
                if (ch === "u") {
                  uffff = 0;
                  for (i = 0; i < 4; i += 1) {
                    hex = parseInt(next(), 16);
                    if (!isFinite(hex)) {
                      break;
                    }
                    uffff = uffff * 16 + hex;
                  }
                  string2 += String.fromCharCode(uffff);
                } else if (typeof escapee[ch] === "string") {
                  string2 += escapee[ch];
                } else {
                  break;
                }
                startAt = at;
              }
            }
          }
          error("Bad string");
        }, white = function() {
          while (ch && ch <= " ") {
            next();
          }
        }, word = function() {
          switch (ch) {
            case "t":
              next("t");
              next("r");
              next("u");
              next("e");
              return true;
            case "f":
              next("f");
              next("a");
              next("l");
              next("s");
              next("e");
              return false;
            case "n":
              next("n");
              next("u");
              next("l");
              next("l");
              return null;
          }
          error("Unexpected '" + ch + "'");
        }, value, array = function() {
          var array2 = [];
          if (ch === "[") {
            next("[");
            white();
            if (ch === "]") {
              next("]");
              return array2;
            }
            while (ch) {
              array2.push(value());
              white();
              if (ch === "]") {
                next("]");
                return array2;
              }
              next(",");
              white();
            }
          }
          error("Bad array");
        }, object = function() {
          var key, object2 = {};
          if (ch === "{") {
            next("{");
            white();
            if (ch === "}") {
              next("}");
              return object2;
            }
            while (ch) {
              key = string();
              white();
              next(":");
              if (_options.strict === true && Object.hasOwnProperty.call(object2, key)) {
                error('Duplicate key "' + key + '"');
              }
              Object.defineProperty(object2, key, {
                value: value(),
                writable: true,
                enumerable: true,
                configurable: true
              });
              white();
              if (ch === "}") {
                next("}");
                return object2;
              }
              next(",");
              white();
            }
          }
          error("Bad object");
        };
        value = function() {
          white();
          switch (ch) {
            case "{":
              return object();
            case "[":
              return array();
            case '"':
              return string();
            case "-":
              return number();
            default:
              return ch >= "0" && ch <= "9" ? number() : word();
          }
        };
        return function(source, reviver, options2) {
          _options = {
            strict: false,
            // not being strict means do not generate syntax errors for "duplicate key"
            fallbackTo: "number"
            // toggles whether the values should be stored as BigInt (default) or a string
          };
          if (options2 !== void 0 && options2 !== null) {
            if (options2.strict === true) {
              _options.strict = true;
            }
            if (typeof options2.fallbackTo !== "undefined") {
              if (options2.fallbackTo === "number" || options2.fallbackTo === "string" || options2.fallbackTo === "error") {
                _options.fallbackTo = options2.fallbackTo;
              } else {
                throw new Error(
                  'Incorrect value for fallbackTo option, must be "number", "string", "error" or undefined but passed ' + options2.fallbackTo
                );
              }
            }
          }
          var result;
          text = source + "";
          at = 0;
          ch = " ";
          result = value();
          white();
          if (ch) {
            error("Syntax error");
          }
          return typeof reviver === "function" ? function walk(holder, key) {
            var v, value2 = holder[key];
            if (value2 && typeof value2 === "object") {
              Object.keys(value2).forEach(function(k) {
                v = walk(value2, k);
                if (v !== void 0) {
                  value2[k] = v;
                } else {
                  delete value2[k];
                }
              });
            }
            return reviver.call(holder, key, value2);
          }({ "": result }, "") : result;
        };
      };
      var parse = json_parse$1();
      var json_stringify = stringifyExports.stringify;
      var json_parse = parse;
      jsonBigintNative.parse = json_parse;
      jsonBigintNative.stringify = json_stringify;
      NodeList.prototype.filter = Array.prototype.filter;
      NodeList.prototype.some = Array.prototype.some;
      NodeList.prototype.map = Array.prototype.map;
      function getDefaultDisplay(ele) {
        let display = ele.defaultDisplay;
        const doc = ele.ownerDocument;
        if (display) return display;
        const temp = doc.body.appendChild(doc.createElement(ele.nodeName));
        display = getComputedStyle(temp).display;
        temp.parentNode.removeChild(temp);
        if (display === "none") display = "block";
        ele.defaultDisplay = display;
        return display;
      }
      function getMaxKeysAndDepthObject(list) {
        function getObjectDepth(obj) {
          if (typeof obj !== "object" || obj === null) return 0;
          let maxDepth2 = 0;
          for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const depth = getObjectDepth(obj[key]);
              maxDepth2 = Math.max(maxDepth2, depth);
            }
          }
          return maxDepth2 + 1;
        }
        function countKeys(obj) {
          if (typeof obj !== "object" || obj === null) return 0;
          let keyCount = Object.keys(obj).length;
          for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              keyCount += countKeys(obj[key]);
            }
          }
          return keyCount;
        }
        let maxKeys = 0;
        let maxDepth = 0;
        let result = null;
        for (let item of list) {
          const keys = countKeys(item);
          const depth = getObjectDepth(item);
          if (keys > maxKeys || keys === maxKeys && depth > maxDepth) {
            maxKeys = keys;
            maxDepth = depth;
            result = item;
          }
        }
        return result;
      }
      const Utils = exports("U", {
        getMaxKeysAndDepthObject,
        isImg(str) {
          const regexp = /(ico|bmp|gif|jpg|jpeg|png|svg|webp|ICO|BMP|GIF|JPG|JPEG|PNG|WEBP|SVG)([\w#!:.?+=&%@!\-\/])?/i;
          return regexp.test(str);
        },
        isJSON(str) {
          try {
            jsonBigintNative.parse(str);
            return true;
          } catch (e) {
            return false;
          }
        },
        parse(text, reviver) {
          return jsonBigintNative.parse(text, reviver);
        },
        stringify(value, replacer, space) {
          return jsonBigintNative.stringify(value, replacer, space);
        },
        isObject(o) {
          return Object.is(typeof o, "object");
        },
        getType(o) {
          return this.getPropType(o).toLowerCase();
        },
        getPropType(o) {
          return Object.prototype.toString.call(o).match(/\s(.+)]/)[1];
        },
        random(len = 10) {
          let array = new Uint8Array(len);
          window.crypto.getRandomValues(array);
          const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          const count = characters.length;
          let randomStr = "";
          for (let i = 0; i < len; i++) {
            randomStr += characters[array[i] % count];
          }
          return randomStr;
        },
        downloadText(content, filename) {
          const blob = new Blob([content], { type: "application/json;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          this.createElement("a", { href: url, download: filename }).click();
          URL.revokeObjectURL(url);
        },
        matchJsonp(rawText) {
          const tokens = rawText.match(/^([^\s(]*)\s*\(([\s\S]*)\)\s*;?$/);
          if (tokens && tokens[1] && tokens[2]) {
            return { rawText: tokens[2], jsonpFun: tokens[1] };
          }
          return { rawText, jsonpFun: null };
        },
        debounce(fn, delay = 300) {
          let timer;
          return function() {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, arguments), delay);
          };
        },
        setClipboard(text) {
          if (GM_setClipboard) {
            GM_setClipboard(text);
          } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
          } else {
            console.error("复制内容失败");
          }
        },
        addEvent(eventType, selector, callback) {
          const types = eventType.split(" ");
          types.forEach((type) => {
            function handler(event) {
              let target = event.target;
              if (!target.matches) return;
              while (!target.matches(selector)) {
                target = target.parentNode;
                if (!target || !target.matches) return;
              }
              Object.defineProperty(event, "currentTarget", {
                configurable: true,
                get() {
                  return target;
                }
              });
              const returnValue = callback.call(target, event);
              if (returnValue === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              event.stopImmediatePropagation();
            }
            document.addEventListener(type, handler, true);
          });
        },
        isVisible(ele) {
          return !!(ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length);
        },
        createElement(name, attrs, text) {
          const element = document.createElement(name);
          if (text) element.textContent = text;
          if (attrs) this.attr(element, attrs);
          return element;
        },
        attr(ele, attrs, value) {
          if (!ele) return;
          if (typeof attrs === "object") {
            for (const name in attrs) ele.setAttribute(name, attrs[name]);
            return;
          }
          if (value === void 0) return ele.getAttribute(attrs);
          if (value === false || value === null) return ele.removeAttribute(attrs);
          ele.setAttribute(attrs, value);
        },
        query(selector, context) {
          const ctx = context || document;
          if (selector instanceof HTMLElement) return selector;
          return ctx.querySelector(selector);
        },
        queryAll(selector, context) {
          const ctx = context || document;
          if (selector instanceof HTMLElement) return new NodeList(selector);
          if (selector instanceof NodeList) return selector;
          return ctx.querySelectorAll(selector);
        },
        closest(element, selector) {
          while (element) {
            if (element.matches(selector)) return element;
            element = element.parentElement;
          }
          return null;
        },
        addClass(ele, className) {
          if (!ele) return;
          if (ele instanceof HTMLElement) return ele.classList.add(className);
          if (ele instanceof NodeList || ele instanceof Array) {
            ele.forEach((el) => this.addClass(el, className));
          }
        },
        removeClass(ele, className) {
          if (!ele) return;
          if (ele instanceof HTMLElement) {
            const classList = ele.classList;
            if (className === void 0) {
              while (classList.length > 0) {
                classList.remove(classList.item(0));
              }
              return;
            }
            return classList.remove(className);
          }
          if (ele instanceof NodeList || ele instanceof Array) {
            ele.forEach((el) => this.removeClass(el, className));
          }
        },
        toggleClass(ele, className) {
          if (!ele) return;
          this.hasClass(ele, className) ? this.removeClass(ele, className) : this.addClass(ele, className);
        },
        hasClass(ele, className) {
          if (!ele) return false;
          if (ele instanceof HTMLElement) return ele.classList.contains(className);
          if (ele instanceof NodeList) {
            return ele.some((el) => this.hasClass(el, className));
          }
        },
        show(ele) {
          if (!ele) return;
          const style = ele.style;
          const display = getComputedStyle(ele).display;
          if (style.display === "none") style.display = "";
          if (style.display === "" && display === "none") {
            style.display = getDefaultDisplay(ele);
          }
        },
        hide(ele) {
          if (ele.defaultDisplay === void 0) {
            const computedDisplay = getComputedStyle(ele).display;
            if (!Object.is(computedDisplay, "none")) {
              ele.defaultDisplay = computedDisplay;
            }
          }
          ele.style.display = "none";
        }
      });
      const URL$1 = exports("a", {
        EXAMPLE_JSON: "https://pastebin.com/raw/c6kXS9Vf",
        JSON_CRACK_WIDGET: "https://jsoncrack.feny.ink/widget",
        LAYUI_JS: "https://unpkg.com/layui@2.7.6/dist/layui.js"
      });
      const layout = `
<template data-for="viewFormater">
  <div class="toolbar-item btn" id="saveJson">保存</div>
  <div class="toolbar-item btn" id="copyJson">复制</div>
  <div class="toolbar-item btn" id="sorted">排序</div>
  <div class="toolbar-item btn" id="collapseAll">全部折叠</div>
  <div class="toolbar-item btn" id="expandAll">全部展开</div>
  <div class="searchbox">
    <input class="filter" type="text" placeholder="JSON 过滤" />
    <button class="clear" hidden></button>
  </div>
</template>
<template data-for="viewMind">
  <div class="toolbar-item btn" id="saveJson">保存</div>
  <div class="toolbar-item btn" id="collapseAll">全部折叠</div>
  <div class="toolbar-item btn" id="expandAll">全部展开</div>
  <div class="toolbar-item btn" id="jsoncrack">JSON Crack</div>
</template>
<template data-for="viewRawText">
  <div class="toolbar-item btn" id="saveJson">保存</div>
  <div class="toolbar-item btn" id="copyJson">复制</div>
  <div class="toolbar-item btn" id="beautify">美化输出</div>
</template>
<div class="json-viewer-layout">
  <div class="panel">
    <div class="tabs">
      <div class="tabs-item btn active" id="viewFormater">JSON 格式化</div>
      <div class="tabs-item btn" id="viewMind">JSON 脑图</div>
      <div class="tabs-item btn" id="viewRawText">原始数据</div>
    </div>
    <div class="toolbar"></div>
    <div class="rightbox">
      <div class="style">
        <span>风格</span>
        <template data-type="style">
          <ul>
            <li data-type="style" data-value="default">默认</li>
            <li data-type="style" data-value="table">表格</li>
          </ul>
        </template>
      </div>
      <div class="theme">
        <span>主题</span>
        <template data-type="theme">
          <ul>
            <li data-type="theme" data-value="default">默认</li>
            <li data-type="theme" data-value="light">浅色</li>
            <li data-type="theme" data-value="dark">暗黑</li>
            <li data-type="theme" data-value="dark-plus">暗黑+</li>
          </ul>
        </template>
      </div>
      <div class="tools">
        <span>工具</span>
        <template data-type="tools">
          <ul>
            <li data-type="tools" data-value="inputJson">JSON 输入</li>
            <li data-type="tools" data-value="fetchJson">HTTP 请求</li>
          </ul>
        </template>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="active" data-for="viewFormater" id="formatBox"></div>
    <div data-for="viewMind" id="mindBox"></div>
    <div data-for="viewRawText" id="rawTextBox">
      <pre></pre>
    </div>
  </div>
</div>
`;
      const { EXAMPLE_JSON, LAYUI_JS } = URL$1;
      (function() {
        if (window.top === window.self) GM_registerMenuCommand("JSON示例", () => GM_openInTab(EXAMPLE_JSON));
        const innerText = document.body.innerText;
        const { rawText, jsonpFun } = Utils.matchJsonp(innerText);
        if (!Utils.isJSON(rawText)) return __vitePreload(() => module.import('./index-DYUQdQzC-sCt1YHhR.js'), void 0 );
        unsafeWindow.RAW_TEXT = rawText;
        unsafeWindow.GLOBAL_JSONP_FUN = jsonpFun;
        unsafeWindow.GLOBAL_JSON = Utils.parse(unsafeWindow.RAW_TEXT);
        Utils.hide(Utils.query("pre"));
        window.postMessage({ addStyle: true });
        const meta = Utils.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" });
        document.head.appendChild(meta);
        const script = Utils.createElement("script", { src: LAYUI_JS, type: "text/javascript" });
        document.head.appendChild(script);
        setTimeout(async () => {
          document.body.insertAdjacentHTML("afterbegin", layout);
          const temp = Utils.query('template[data-for="viewFormater"]');
          Utils.query(".toolbar").innerHTML = temp.innerHTML;
          await __vitePreload(() => module.import('./index-ByB1mBym-Y7XonTA9.js'), void 0 );
          __vitePreload(() => module.import('./index-C2fSc6RW-BVK12j2Y.js'), void 0 );
          __vitePreload(() => module.import('./index-DITmgu76-CXuZCSMA.js'), void 0 );
        });
      })();

    })
  };
}));

System.register("./index-DYUQdQzC-sCt1YHhR.js", ['highlight.js', 'beautifier', './__monkey.entry-BM-c8wSS.js'], (function (exports, module) {
  'use strict';
  var hljs, css_beautify, js_beautify, Utils;
  return {
    setters: [module => {
      hljs = module.default;
    }, module => {
      css_beautify = module.css_beautify;
      js_beautify = module.js_beautify;
    }, module => {
      Utils = module.U;
    }],
    execute: (function () {

      const layout = `
<div class="beautify_checkbox">
  <input type="checkbox" id="beautify" />
  <label for="beautify">美化输出</label>
</div>
`;
      (function() {
        const docType = ["application/x-javascript", "application/javascript", "text/javascript", "text/css"];
        const contentType = document.contentType;
        if (!docType.includes(contentType)) return;
        const preElement = Utils.query("pre");
        if (!preElement) return;
        window.postMessage({ addStyle: true });
        Utils.addClass(Utils.query("html"), "monkey-js-css-beautify");
        setTimeout(() => {
          const rawText = preElement.innerText;
          document.body.insertAdjacentHTML("afterbegin", layout);
          const checkbox = Utils.query(".beautify_checkbox input");
          checkbox.addEventListener("click", function() {
            if (this.checked) {
              beautifyCode(contentType, preElement, rawText);
            } else {
              preElement.innerText = rawText;
            }
          });
        });
      })();
      function beautifyCode(contentType, element, rawText) {
        const language = contentType.substring(contentType.indexOf("/") + 1);
        if (!["css", "javascript", "x-javascript"].includes(language)) return;
        let beautifyCode2;
        if ("css" === language) {
          const cssBeautify = css_beautify ? css_beautify : window.css_beautify;
          beautifyCode2 = hljs.highlight(cssBeautify(rawText), { language }).value;
        } else {
          const jsBeautify = js_beautify ? js_beautify : window.js_beautify;
          beautifyCode2 = hljs.highlight(jsBeautify(rawText), { language: "javascript" }).value;
        }
        element.innerHTML = `<code>${beautifyCode2}</code>`;
      }

    })
  };
}));

System.register("./index-ByB1mBym-Y7XonTA9.js", ['./__monkey.entry-BM-c8wSS.js', 'tippy.js'], (function (exports, module) {
  'use strict';
  var Utils, tippy;
  return {
    setters: [module => {
      Utils = module.U;
    }, module => {
      tippy = module.default;
    }],
    execute: (function () {

      const STYLE = Object.freeze({ TABLE: "table", VIEWER: "viewer" });
      const SORTED = Object.freeze({ NONE: "none", ASC: "ASC", DESC: "DESC" });
      class JsonFormat {
        Root = "Root";
        static STYLE = STYLE;
        DEFAULTS = { json: null, style: null, container: null, theme: "default", sort: SORTED.NONE };
        BRACKET = Object.freeze({
          array: { START: "[", END: "]", FULL: "[]" },
          object: { START: "{", END: "}", FULL: "{}" }
        });
        SORT_ENUM = Object.freeze({
          [SORTED.NONE]: { value: SORTED.ASC, text: "升序" },
          [SORTED.ASC]: { value: SORTED.DESC, text: "降序" },
          [SORTED.DESC]: { value: SORTED.NONE, text: "排序" }
        });
        constructor(options, tag, clazz) {
          this.tag = tag;
          this.clazz = clazz;
          this.options = Object.assign(this.DEFAULTS, options);
          if (!options.container) throw new Error("Container is required");
          if (!options.json) throw new Error("json is required");
          this.container = Utils.query(options.container);
          this.setTheme(this.options.theme);
          this.render(tag, clazz);
        }
        render(tag, clazz) {
          this.container.innerHTML = "";
          const wrapper = Utils.createElement(tag, { class: clazz });
          const fragment = document.createDocumentFragment();
          this.buildNode(fragment, this.options.json);
          wrapper.appendChild(fragment);
          this.container.appendChild(wrapper);
          this.bindEvent();
        }
        buildNode() {
          throw new Error("此方法必须由子类实现具体功能");
        }
        setTheme(theme) {
          const classList = document.body.classList;
          classList.forEach((clas) => {
            if (clas.includes("theme")) classList.remove(clas);
          });
          classList.add(`${theme}-theme`);
        }
        keySort(json) {
          const { sort } = this.options;
          if (Array.isArray(json)) return json;
          if (sort === SORTED.NONE) return json;
          const entries = Object.entries(json);
          const asc = ([prev], [next]) => prev.localeCompare(next);
          const desc = ([prev], [next]) => next.localeCompare(prev);
          const result = Object.is(SORTED.ASC, sort) ? entries.sort(asc) : entries.sort(desc);
          return Object.fromEntries(result);
        }
        sorted() {
          const sort = this.SORT_ENUM[this.options.sort];
          this.options.sort = sort.value;
          this.render(this.tag, this.clazz);
          return sort.text;
        }
        iterateJson(json, parentId, parentPath, tagName, callback) {
          const entries = Object.entries(this.keySort(json));
          const entryCount = entries.length;
          const lastIndex = entryCount - 1;
          for (let index = 0; index < entryCount; index++) {
            const id = Utils.random();
            const [key, value] = entries[index];
            const type = Utils.getType(value);
            const hasNext = this.hasNext(value);
            const notLast = !Object.is(index, lastIndex);
            const path = this.spliceJsonPath(parentPath, key);
            const element = Utils.createElement(tagName, { path, "data-node-id": id, "data-node-pid": parentId });
            if (hasNext) element.setAttribute("class", "collapsible expanded");
            callback.call(this, { id, key, value, type, path, hasNext, element, notLast });
          }
        }
        creatValueNode(type, value) {
          if (this.isIterator(value)) return this.createBracket(type);
          const node = Utils.createElement("span", { class: `json-${type}` });
          if (this.isUrl(value)) {
            const link = Utils.createElement("a", { target: "_blank", href: value }, `"${value}"`);
            node.appendChild(link);
            return node;
          }
          node.textContent = Object.is("string", type) ? Utils.stringify(value) : `${value}`;
          if (this.isColor(value)) {
            const span = Utils.createElement("span", { class: "json-color", style: `background-color: ${value}` });
            node.prepend(span);
          }
          return node;
        }
        creatExtraNodes(node, json) {
          if (!this.hasNext(json)) return;
          node.prepend(this.creatArrowNode());
          node.appendChild(this.creatCopyNode(json));
          node.appendChild(this.creatDescNode(json));
        }
        creatArrowNode() {
          return Utils.createElement("span", { class: "json-arrow" });
        }
        creatCopyNode(json) {
          const copy = Utils.createElement("span", { title: "复制", class: "json-copy" });
          copy.json = json;
          return copy;
        }
        creatDescNode(json) {
          const type = Utils.getType(json);
          const desc = Utils.createElement("span", { class: "json-desc" });
          const count = Object.keys(json).length;
          const span = Utils.createElement("span");
          span.textContent = `${count} ${type === "object" ? count > 1 ? "keys" : "key" : count > 1 ? "items" : "item"}`;
          desc.appendChild(span);
          if (STYLE.TABLE === this.options.style) {
            desc.insertAdjacentText("afterbegin", this.BRACKET[type].START);
            desc.insertAdjacentText("beforeend", this.BRACKET[type].END);
          }
          return desc;
        }
        createBracket(type) {
          return Utils.createElement("span", { type, class: `json-bracket` }, this.BRACKET[type].FULL);
        }
        bindEvent() {
          this.addEvent("click", ".json-copy", ({ target }) => {
            const className = "success";
            if (!target.json || Utils.hasClass(target, className)) return;
            Utils.setClipboard(Utils.stringify(target.json, null, 2));
            setTimeout(() => Utils.removeClass(target, className), 1500);
            Utils.addClass(target, className);
          });
          this.addEvent("click", ".json-arrow", ({ target }) => {
            const node = Utils.closest(target, ".collapsible");
            Utils.hasClass(node, "expanded") ? this.collapse(node) : this.expand(node);
          });
          this.addEvent("click", ".json-desc", ({ target }) => this.expand(Utils.closest(target, ".collapsible")));
        }
        expandAll() {
          this.nodes().forEach((node) => this.expand(node));
        }
        collapseAll() {
          this.nodes().forEach((node) => this.collapse(node));
        }
        expand(node) {
          this.toggleDescs(node, false);
          Utils.hide(this.descNode(node));
          Utils.addClass(node, "expanded");
          Utils.removeClass(node, "collapsed");
        }
        collapse(node) {
          this.toggleDescs(node, true);
          Utils.show(this.descNode(node));
          Utils.addClass(node, "collapsed");
          Utils.removeClass(node, "expanded");
        }
        toggleDescs(node, hidden) {
          const target = Utils.query(`#${node.dataset.nodeId}`);
          hidden ? Utils.addClass(target, "hidden") : Utils.removeClass(target, "hidden");
        }
        descNode(node) {
          return Utils.query(`*[data-node-id="${node.dataset.nodeId}"] .json-desc`, node);
        }
        findChildren(node) {
          return Utils.queryAll(`*[data-node-pid="${node.dataset.nodeId}"]`, this.container);
        }
        findByID(id) {
          return Utils.query(`*[data-node-id="${id}"]`, this.container);
        }
        expandByID(id) {
          this.expand(this.findByID(id));
        }
        collapseByID(id) {
          this.collapse(this.findByID(id));
        }
        nodes() {
          return Utils.queryAll(".collapsible", this.container);
        }
        addEvent(type, selector, fn) {
          Utils.queryAll(selector).forEach((el) => el.addEventListener(type, fn));
        }
        spliceJsonPath(path, key) {
          if (this.isNumber(key)) return `${path}[${key}]`;
          if (key.includes(".")) return `${path}["${key}"]`;
          return `${path}.${key}`;
        }
        isNumber(str) {
          return /^\d+$/.test(str);
        }
        isIterator(data) {
          return ["array", "object"].includes(Utils.getType(data));
        }
        hasNext(data) {
          return this.isIterator(data) ? Object.keys(data).length > 0 : false;
        }
        isUrl(str) {
          const regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
          return regexp.test(str);
        }
        isColor(str) {
          const rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
          const hexRegex = /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          const rgbaRegex = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(0|1|0\.\d+)\s*\)$/;
          return hexRegex.test(str) || rgbRegex.test(str) || rgbaRegex.test(str);
        }
      }
      class JsonViewer extends JsonFormat {
        constructor(options) {
          options.style = JsonFormat.STYLE.VIEWER;
          super(options, "div", "json-viewer");
        }
        buildNode(fragment, json, parentPath = this.Root, parentId = this.Root) {
          const type = Utils.getType(json);
          fragment.appendChild(Utils.createElement("span", { type, class: `json-bracket` }, this.BRACKET[type].START));
          if (this.Root !== parentId) this.creatExtraNodes(fragment, json);
          this.iterateNodes(fragment, json, parentPath, parentId);
          fragment.appendChild(Utils.createElement("span", { type, class: `json-bracket` }, this.BRACKET[type].END));
        }
        iterateNodes(fragment, json, parentPath, parentId) {
          const wrapper = Utils.createElement("ul", { id: parentId });
          this.iterateJson(json, parentId, parentPath, "li", (data) => {
            const { id, key, value, type, path, hasNext, element, notLast } = data;
            this.createKeyNode(element, key);
            if (hasNext) this.buildNode(element, value, path, id);
            if (!hasNext) element.appendChild(this.creatValueNode(type, value));
            if (notLast) element.appendChild(Utils.createElement("span", { class: "json-comma" }, ","));
            wrapper.appendChild(element);
          });
          fragment.appendChild(wrapper);
        }
        createKeyNode(node, key) {
          if (this.isNumber(key)) return;
          node.appendChild(Utils.createElement("span", { class: "json-key" }, `"${key}"`));
          node.appendChild(Utils.createElement("span", { class: "json-colon" }, ":"));
        }
      }
      class JsonToTable extends JsonFormat {
        constructor(options) {
          options.style = JsonFormat.STYLE.TABLE;
          super(options, "table", "json-tree-table");
        }
        buildNode(fragment, json, parentPath = this.Root, parentId = this.Root, nodeDepth = 1) {
          const wrapper = Utils.createElement("wrapper", { id: parentId });
          this.iterateJson(json, parentId, parentPath, "tr", (data) => {
            const { id, key, value, type, path, hasNext, element } = data;
            element.appendChild(this.createKeyNode(key, value, nodeDepth, hasNext));
            if (!hasNext) {
              const td = Utils.createElement("td");
              td.appendChild(this.creatValueNode(type, value));
              element.appendChild(td);
            }
            wrapper.appendChild(element);
            if (hasNext) this.buildNode(wrapper, value, path, id, nodeDepth + 1);
          });
          fragment.appendChild(wrapper);
        }
        createKeyNode(key, value, nodeDepth, hasNext) {
          const paddingLeft = nodeDepth * 20;
          const node = Utils.createElement("td", { style: `padding-left: ${paddingLeft}px` });
          if (hasNext) node.setAttribute("colspan", 2);
          node.appendChild(Utils.createElement("span", { class: "json-key" }, `${key}`));
          node.appendChild(Utils.createElement("span", { class: "json-colon" }, ":"));
          this.creatExtraNodes(node, value);
          return node;
        }
        bindEvent() {
          super.bindEvent();
          Utils.addEvent("mousedown", "table tr", function({ ctrlKey, target }) {
            const { tagName, className } = target;
            if (ctrlKey || tagName === "A" || tagName === "SPAN" && className !== "json-key") return;
            const filter = Utils.queryAll(".selected").filter((el) => el !== this);
            Utils.removeClass(filter, "selected");
            Utils.toggleClass(this, "selected");
          });
        }
      }
      class FormaterFactory {
        static getInstance(options) {
          return Object.is(JsonToTable.STYLE.TABLE, options.style) ? new JsonToTable(options) : new JsonViewer(options);
        }
      }
      const evnet = {
        urlHover() {
          Utils.addEvent("mouseenter", "a[href]", function() {
            const href = Utils.attr(this, "href");
            if (!Utils.isImg(href)) return;
            const content = `<img style="width:100%" src="${href}" />`;
            tippy(this, { maxWidth: 500, duration: 800, allowHTML: true, theme: "imagebox", content }).show();
          });
          return this;
        },
        eventPath() {
          Utils.addEvent("click mouseenter", ".json-key", ({ type, ctrlKey, target }) => {
            const path = Utils.closest(target, "[path]").getAttribute("path");
            if (ctrlKey && type === "click") return GM_setClipboard(path) & layer.msg("复制成功", { time: 1500 });
            const content = `<i>ctrl＋click 复制</i><br/><b>路径：</b>${path}`;
            tippy(target, { duration: 800, theme: "layer", allowHTML: true, maxWidth: "none", content }).show();
          });
          return this;
        },
        init() {
          this.urlHover().eventPath();
        }
      };
      const format = exports("default", {
        changeStyle(style) {
          GM_setValue("style", style) & this.setStyle();
          return this;
        },
        setStyle() {
          unsafeWindow.FILTER_VALUE = "";
          Utils.query(".filter").value = "";
          Utils.attr(Utils.query(".clear"), "hidden", true);
          this.render(unsafeWindow.GLOBAL_JSON);
          return this;
        },
        render(json) {
          const container = Utils.query("#formatBox");
          const style = GM_getValue("style") || "default";
          const theme = GM_getValue("theme") || "default";
          const options = { json, style, theme, container };
          unsafeWindow.JSON_FORMATER = FormaterFactory.getInstance(options);
          if (unsafeWindow.GLOBAL_JSONP_FUN) {
            const start = Utils.createElement("div", { class: "jsonp" });
            start.textContent = `${unsafeWindow.GLOBAL_JSONP_FUN}(`;
            container.prepend(start);
            const end = start.cloneNode(true);
            end.textContent = ")";
            container.append(end);
          }
          return this;
        },
        filter(json, text) {
          text = text.toLowerCase();
          function match(json2, text2) {
            const newJson = Array.isArray(json2) ? new Array() : new Object();
            const entries = Object.entries(json2);
            for (const [key, value] of entries) {
              const type = Utils.getType(value);
              const _key = key.toLowerCase();
              const _value = Utils.stringify(value).toLowerCase();
              if (!_key.includes(text2) && !_value.includes(text2)) continue;
              if (["array", "object"].includes(type)) {
                const result = match(value, text2);
                const _result = Utils.stringify(result).toLowerCase();
                if (_key.includes(text2) || _result.includes(text2)) {
                  newJson[key] = result;
                }
              } else {
                newJson[key] = value;
              }
            }
            return newJson;
          }
          return match(json, text);
        },
        input() {
          const debounceInput = Utils.debounce((event) => {
            const value = event.target.value;
            unsafeWindow.FILTER_VALUE = value;
            const clear = Utils.query(".clear");
            Utils.attr(clear, "hidden", !value);
            const newJson = this.filter(unsafeWindow.GLOBAL_JSON, value);
            this.render(newJson);
          }, 400);
          Utils.addEvent("input", ".filter", debounceInput);
          return this;
        },
        clear() {
          Utils.addEvent("click", ".clear", () => this.setStyle());
          return this;
        },
        init() {
          this.setStyle().input().clear();
          evnet.init();
        }
      });
      window.addEventListener("message", function({ data }) {
        if (data?.reload) return format.setStyle();
        if (Object.is(data?.type, "style")) format.changeStyle(data?.value);
      });
      format.init();

    })
  };
}));

System.register("./index-C2fSc6RW-BVK12j2Y.js", ['tippy.js', './__monkey.entry-BM-c8wSS.js'], (function (exports, module) {
	'use strict';
	var tippy, Utils;
	return {
		setters: [module => {
			tippy = module.default;
		}, module => {
			Utils = module.U;
		}],
		execute: (function () {

			const scroll = Utils.createElement("div", { class: "scroll-top" });
			document.body.appendChild(scroll);
			tippy(scroll, { theme: "scroll", placement: "left", content: "返回顶部" });
			const $container = Utils.query(".container");
			$container.addEventListener("scroll", ({ target }) => target.scrollTop > 500 ? Utils.show(scroll) : Utils.hide(scroll));
			scroll.addEventListener("click", () => $container.scrollTop = 0);

		})
	};
}));

System.register("./index-DITmgu76-CXuZCSMA.js", ['tippy.js', 'jsmind', 'dom-to-image', './__monkey.entry-BM-c8wSS.js'], (function (exports, module) {
  'use strict';
  var tippy, require$$0, require$$1, Utils, URL$1;
  return {
    setters: [module => {
      tippy = module.default;
    }, module => {
      require$$0 = module.default;
    }, module => {
      require$$1 = module.default;
    }, module => {
      Utils = module.U;
      URL$1 = module.a;
    }],
    execute: (function () {

      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      /**
      * @license BSD-3-Clause
      * @copyright 2014-2025 hizzgdev@163.com
      *
      * Project Home:
      *   https://github.com/hizzgdev/jsmind/
      */
      (function(module, exports) {
        !function(e, t) {
          t(require$$0, require$$1);
        }(commonjsGlobal, function(e, t) {
          function i(e2) {
            return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
          }
          var n = i(e), o = i(t);
          if (!n.default) throw new Error("jsMind is not defined");
          if (!o.default) throw new Error("dom-to-image is required");
          const r = n.default.$, s = { filename: null, watermark: { left: r.w.location, right: "https://github.com/hizzgdev/jsmind" }, background: "transparent" };
          class a {
            constructor(e2, t2) {
              var i2 = {};
              n.default.util.json.merge(i2, s), n.default.util.json.merge(i2, t2), this.version = "0.2.0", this.jm = e2, this.options = i2, this.dpr = e2.view.device_pixel_ratio;
            }
            shoot() {
              let e2 = this.create_canvas(), t2 = e2.getContext("2d");
              t2.scale(this.dpr, this.dpr), Promise.resolve(t2).then(() => this.draw_background(t2)).then(() => this.draw_lines(t2)).then(() => this.draw_nodes(t2)).then(() => this.draw_watermark(e2, t2)).then(() => this.download(e2)).then(() => this.clear(e2));
            }
            create_canvas() {
              let e2 = r.c("canvas");
              const t2 = this.jm.view.size.w, i2 = this.jm.view.size.h;
              return e2.width = t2 * this.dpr, e2.height = i2 * this.dpr, e2.style.width = t2 + "px", e2.style.height = i2 + "px", e2.style.visibility = "hidden", this.jm.view.e_panel.appendChild(e2), e2;
            }
            clear(e2) {
              e2.parentNode.removeChild(e2);
            }
            draw_background(e2) {
              return new Promise(function(t2, i2) {
                const n2 = this.options.background;
                n2 && "transparent" !== n2 && (e2.fillStyle = this.options.background, e2.fillRect(0, 0, this.jm.view.size.w, this.jm.view.size.h)), t2(e2);
              }.bind(this));
            }
            draw_lines(e2) {
              return new Promise(function(t2, i2) {
                this.jm.view.graph.copy_to(e2, function() {
                  t2(e2);
                });
              }.bind(this));
            }
            draw_nodes(e2) {
              return o.default.toSvg(this.jm.view.e_nodes, { style: { zoom: 1 } }).then(this.load_image).then(function(t2) {
                return e2.drawImage(t2, 0, 0), e2;
              });
            }
            draw_watermark(e2, t2) {
              return t2.textBaseline = "bottom", t2.fillStyle = "#000", t2.font = "11px Verdana,Arial,Helvetica,sans-serif", this.options.watermark.left && (t2.textAlign = "left", t2.fillText(this.options.watermark.left, 5.5, e2.height - 2.5)), this.options.watermark.right && (t2.textAlign = "right", t2.fillText(this.options.watermark.right, e2.width - 5.5, e2.height - 2.5)), t2;
            }
            load_image(e2) {
              return new Promise(function(t2, i2) {
                let n2 = new Image();
                n2.onload = function() {
                  t2(n2);
                }, n2.onerror = i2, n2.src = e2;
              });
            }
            download(e2) {
              var t2 = (this.options.filename || this.jm.mind.name) + ".png";
              if (navigator.msSaveBlob && e2.msToBlob) {
                var i2 = e2.msToBlob();
                navigator.msSaveBlob(i2, t2);
              } else {
                var n2 = e2.toDataURL(), o2 = r.c("a");
                if ("download" in o2) {
                  o2.style.visibility = "hidden", o2.href = n2, o2.download = t2, r.d.body.appendChild(o2);
                  var s2 = r.d.createEvent("MouseEvents");
                  s2.initEvent("click", true, true), o2.dispatchEvent(s2), r.d.body.removeChild(o2);
                } else location.href = n2;
              }
            }
          }
          let d = new n.default.plugin("screenshot", function(e2, t2) {
            var i2 = new a(e2, t2);
            e2.screenshot = i2, e2.shoot = function() {
              i2.shoot();
            };
          });
          n.default.register_plugin(d);
        });
      })();
      const cssLoader = (e) => {
        const t = GM_getResourceText(e);
        return GM_addStyle(t), t;
      };
      cssLoader("jsmind");
      const jsonMind = {
        isFirst: true,
        transform(json) {
          const result = [];
          if (Utils.isObject(json)) {
            for (const key in json) {
              let value = json[key];
              const isArray = Array.isArray(value);
              const type = Utils.getPropType(value);
              if (isArray && value.length > 0) value = Utils.getMaxKeysAndDepthObject(value);
              const isObject = Object.is(Utils.getType(value), "object");
              const keys = isObject ? Object.keys(value) : null;
              const children = this.transform(value);
              const topic = `${key}<span class="datatype">${type}</span>`;
              result.push({ keys, topic, isArray, children, chain: key, id: Utils.random() });
            }
          }
          return result;
        },
        getChain(node) {
          let chain = node?.data?.chain;
          if (!node?.parent) return chain;
          const parent = node.parent;
          const parentChain = this.getChain(parent);
          if (parent.data.isArray) return `${parentChain}[i].${chain}`;
          if (chain.includes(".")) return `${parentChain}["${chain}"]`;
          return `${parentChain}.${chain}`;
        },
        show(json) {
          let isArray = Array.isArray(json);
          if (isArray) {
            if (typeof json[0] !== "object") {
              layer.msg("无法生成脑图", { time: 1e3 });
              return this;
            }
            json = Utils.getMaxKeysAndDepthObject(json);
          }
          if (!this.isFirst) return this;
          const children = this.transform(json);
          unsafeWindow.GLOBAL_JSMIND.show({
            format: "node_tree",
            meta: { version: "1.0", name: "JSON脑图", author: "1220301855@qq.com" },
            data: { isArray, children, id: "root", chain: "Root", topic: "Root", direction: "left", keys: Object.keys(json) }
          });
          this.isFirst = false;
          return this;
        },
        event() {
          Utils.addEvent("click mouseover", "jmnode", ({ type, ctrlKey, target }) => {
            const nodeid = Utils.attr(target, "nodeid");
            const node = unsafeWindow.GLOBAL_JSMIND.get_node(nodeid);
            const chain = this.getChain(node);
            if (!chain) return;
            if (type === "click") {
              if (ctrlKey) return GM_setClipboard(chain), layer.msg("复制成功", { time: 1500 });
              if (node?.data?.keys?.length > 0) this.popup(chain, node?.data?.keys);
            } else {
              const content = `<i>ctrl＋click 复制</i><br/><b>路径：</b>${chain}`;
              tippy(target, { content, duration: 800, theme: "layer", allowHTML: true, maxWidth: "none" }).show();
            }
          });
          return this;
        },
        popup(chain, keys) {
          layer.open({
            type: 1,
            move: false,
            shadeClose: true,
            title: " 节点",
            content: function() {
              const chain2 = Utils.createElement("div");
              const chainCon = Utils.createElement("div");
              chain2.appendChild(chainCon);
              const content = Utils.createElement("div", { class: "js-mind-child-node" });
              const copy = Utils.createElement("div", { title: "复制", class: "js-mind-copy" });
              content.appendChild(copy);
              keys.forEach((i) => {
                const child = Utils.createElement("div");
                child.textContent = i;
                content.appendChild(child);
              });
              return content.outerHTML;
            }(),
            success(layero) {
              layero.on("click", ".js-mind-copy", function() {
                GM_setClipboard(chain + "\n\n" + keys.join("\n"));
                layer.msg("复制成功", { time: 1500 });
              });
            }
          });
        },
        init(json) {
          if (unsafeWindow.GLOBAL_JSMIND) return;
          unsafeWindow.GLOBAL_JSMIND = new require$$0({
            mode: "side",
            editable: false,
            container: "mindBox",
            view: { hmargin: 50, vmargin: 50, engine: "svg", draggable: true, support_html: false, line_color: "#C4C9D0" },
            layout: { vspace: 5, hspace: 130 }
          });
          this.show(json).event();
        }
      };
      const mindBox = Utils.query("#mindBox");
      const formatBox = Utils.query("#formatBox");
      const rawTextBox = Utils.query("#rawTextBox");
      const rawTextPre = Utils.query("pre", rawTextBox);
      const tabs = {
        viewFormater() {
          const value = unsafeWindow.FILTER_VALUE || "";
          Utils.query(".filter").value = value;
          Utils.attr(Utils.query(".clear"), "hidden", !value);
        },
        saveJson() {
          if (Utils.isVisible(mindBox)) return unsafeWindow.GLOBAL_JSMIND.shoot();
          const content = rawTextPre.textContent || unsafeWindow.RAW_TEXT;
          const filename = (/* @__PURE__ */ new Date()).getTime() + ".json";
          Utils.downloadText(content, filename);
        },
        copyJson() {
          GM_setClipboard(rawTextPre.textContent || unsafeWindow.RAW_TEXT);
          layer.msg("复制成功", { time: 1500 });
        },
        sorted(el) {
          el.textContent = unsafeWindow.JSON_FORMATER.sorted();
        },
        collapseAll() {
          Utils.isVisible(formatBox) ? unsafeWindow.JSON_FORMATER.collapseAll() : unsafeWindow.GLOBAL_JSMIND.collapse_all();
        },
        expandAll() {
          if (Utils.isVisible(formatBox)) return unsafeWindow.JSON_FORMATER.expandAll();
          unsafeWindow.GLOBAL_JSMIND.expand_all();
          unsafeWindow.GLOBAL_JSMIND.scroll_node_to_center(unsafeWindow.GLOBAL_JSMIND?.get_root());
        },
        viewMind() {
          jsonMind.init(unsafeWindow.GLOBAL_JSON);
          unsafeWindow.GLOBAL_JSMIND.scroll_node_to_center(unsafeWindow.GLOBAL_JSMIND.get_root());
        },
        jsoncrack() {
          const theme2 = (GM_getValue("theme") || "light").replace(/-.*/, "");
          layer.closeAll();
          layer.open({
            type: 1,
            move: false,
            title: false,
            area: ["100vw", "100vh"],
            content: `<iframe id="jsoncrackEmbed" src="${URL$1.JSON_CRACK_WIDGET}"></iframe>`,
            success() {
              const jsonCrackEmbed = Utils.query("#jsoncrackEmbed");
              window?.addEventListener("message", () => {
                const msg = { options: { theme: theme2 }, json: unsafeWindow.RAW_TEXT };
                jsonCrackEmbed?.contentWindow?.postMessage(msg, "*");
              });
            }
          });
        },
        _setRawText() {
          let rawText = unsafeWindow.RAW_TEXT;
          if (unsafeWindow.GLOBAL_JSONP_FUN) {
            rawText = `${unsafeWindow.GLOBAL_JSONP_FUN}(${rawText})`;
          }
          rawTextPre.textContent = rawText;
        },
        firstFormat: true,
        viewRawText() {
          if (!this.firstFormat) return;
          this.firstFormat = false;
          this._setRawText();
        },
        isBeautify: false,
        beautify() {
          this.isBeautify = !this.isBeautify;
          if (!this.isBeautify) return this._setRawText();
          let str = Utils.stringify(unsafeWindow.GLOBAL_JSON, null, 2);
          if (unsafeWindow.GLOBAL_JSONP_FUN) {
            str = `${unsafeWindow.GLOBAL_JSONP_FUN}(${str})`;
          }
          rawTextPre.textContent = str;
        },
        init() {
          Utils.addEvent("click", ".btn", ({ target }) => {
            const id = target.id;
            if (Utils.hasClass(target, "tabs-item")) {
              const clas = "active";
              Utils.removeClass(Utils.queryAll(".tabs-item"), clas);
              Utils.addClass(target, clas);
              Utils.removeClass(Utils.queryAll("div[data-for]"), clas);
              Utils.addClass(Utils.query(`div[data-for="${id}"]`), clas);
              const template = Utils.query(`template[data-for='${id}']`);
              Utils.query(".toolbar").innerHTML = template.innerHTML;
            }
            this[id](target);
          });
        }
      };
      window.addEventListener("message", function({ data }) {
        if (!data?.reload) return;
        mindBox.innerHTML = "";
        jsonMind.isFirst = true;
        tabs.isBeautify = false;
        tabs.firstFormat = true;
        unsafeWindow.GLOBAL_JSMIND = void 0;
        if (Utils.isVisible(rawTextBox)) return tabs.viewRawText();
        if (Utils.isVisible(mindBox)) return jsonMind.init(unsafeWindow.GLOBAL_JSON);
      });
      const theme = {
        changeTheme(theme2) {
          GM_setValue("theme", theme2) & this.setTheme();
        },
        setTheme() {
          const theme2 = GM_getValue("theme") || "default";
          unsafeWindow.JSON_FORMATER.setTheme(theme2);
        }
      };
      const http_form = `
<form class="httpRequest">
  <div class="requestbox">
    <select name="method">
      <option value="POST">POST</option>
      <option value="GET">GET</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
      <option value="PATCH">PATCH</option>
    </select>
    <input name="url" placeholder="请求地址" />
    <select name="contentType">
      <option value="application/x-www-form-urlencoded;charset=UTF-8">urlencoded</option>
      <option value="application/json;charset=UTF-8">application/json</option>
    </select>
    <button type="submit">发送请求</button>
  </div>
  <div class="form-group">
    <label for="headers">请求头</label>
    <textarea id="headers" name="headers" placeholder='例如: {"token": "test"}'></textarea>
  </div>
  <div class="form-group">
    <label for="body">请求参数</label>
    <textarea id="body" name="params" placeholder='例如: {"name": "test"}'></textarea>
  </div>
</form>`;
      const tools = {
        inputJson() {
          layer.prompt(
            {
              move: false,
              formType: 2,
              btn: ["确认"],
              shadeClose: true,
              title: "JSON 输入",
              area: ["400px", "300px"],
              maxlength: Number.MAX_VALUE
            },
            (text) => {
              if (!text) return layer.msg("内容不能为空", { time: 1500 });
              const { rawText, jsonpFun } = Utils.matchJsonp(text);
              try {
                const json = Utils.parse(rawText);
                this.reload(json, rawText, jsonpFun);
              } catch (e) {
                layer.msg("JSON格式不正确", { time: 1500 });
                console.log("格式化异常: ", e);
              }
            }
          );
          return this;
        },
        fetchJson() {
          const success = () => {
            const formElem = Utils.query("form");
            formElem.addEventListener("submit", (event) => {
              event.preventDefault();
              const formData = new FormData(formElem);
              const submitData = {};
              for (const [name, value] of formData) {
                submitData[name] = value;
              }
              this._submit(submitData);
            });
          };
          layer.open({
            success,
            type: 1,
            shadeClose: true,
            title: "HTTP 请求",
            content: http_form
          });
          return this;
        },
        async _submit(submitData) {
          let { url, method, headers, params, contentType } = submitData;
          if (!url) return layer.msg("请求地址不能为空");
          if (headers && !(headers.startsWith("{") && headers.endsWith("}"))) return layer.msg("请求头 格式不合法");
          if (params && !(params.startsWith("{") && params.endsWith("}"))) return layer.msg("请求参数 格式不合法");
          headers = JSON.parse(headers || "{}");
          params = JSON.parse(params || "{}");
          try {
            layer.load();
            headers["Content-Type"] = contentType;
            if (method === "GET") url = this.buildUrlWithParams(url, this.queryParams(params));
            if (contentType.includes("urlencoded")) params = this.queryParams(params);
            const response = await GM.xmlHttpRequest({ method, url, headers, data: params }).catch((e) => console.error(e));
            const result = response.responseText;
            const { rawText, jsonpFun } = Utils.matchJsonp(result);
            const json = Utils.parse(rawText);
            this.reload(json, rawText, jsonpFun);
          } catch (e) {
            layer.closeAll();
            layer.msg("请求异常：" + e.message);
            console.log("HTTP 请求异常：", e);
          }
        },
        reload(json, rawText, jsonpFun) {
          layer.closeAll();
          unsafeWindow.RAW_TEXT = rawText;
          unsafeWindow.GLOBAL_JSON = json;
          unsafeWindow.GLOBAL_JSONP_FUN = jsonpFun;
          window.postMessage({ reload: true });
        },
        queryParams(data) {
          const params = [];
          for (const [key, value] of Object.entries(data)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          }
          return params.join("&");
        },
        buildUrlWithParams: function(baseUrl, queryParams) {
          if (!queryParams) return baseUrl;
          const separator = baseUrl.includes("?") ? "&" : "?";
          return `${baseUrl}${separator}${queryParams}`;
        }
      };
      const active = "active";
      const handleBar = {
        currentTippy: null,
        handle() {
          const tagName = "span";
          [".style", ".theme", ".tools"].forEach((selector) => {
            tippy(selector, {
              duration: 500,
              allowHTML: true,
              interactive: true,
              trigger: "click",
              appendTo: Utils.query(selector).parentNode,
              onTrigger: (instance) => {
                this.currentTippy = instance;
                const target = instance.reference;
                Utils.addClass(Utils.query(tagName, target), active);
                const template = Utils.query("template", target);
                const ul = template.content.cloneNode(true);
                const type = template.dataset.type;
                const value = GM_getValue(type) || "default";
                const current = Utils.query(`li[data-value=${value}]`, ul);
                Utils.addClass(current, active);
                const tempDiv = Utils.createElement("div");
                while (ul.firstChild) tempDiv.appendChild(ul.firstChild);
                instance.setContent(tempDiv.innerHTML);
              },
              onHide(instance) {
                Utils.removeClass(Utils.query(tagName, instance.reference));
              }
            });
          });
          return this;
        },
        checked() {
          const selector = ".rightbox li";
          Utils.addEvent("click", selector, ({ target }) => {
            if (Utils.hasClass(target, active)) return;
            const type = target.dataset.type;
            const value = target.dataset.value;
            window.postMessage({ type, value });
            if (Object.is(type, "tools")) return this.currentTippy.hide();
            Utils.removeClass(Utils.queryAll(selector));
            Utils.addClass(target, active);
          });
          return this;
        },
        init() {
          this.handle().checked();
        }
      };
      tabs.init();
      theme.setTheme();
      handleBar.init();
      window.addEventListener("message", function({ data }) {
        if (Object.is(data?.type, "tools")) return tools[data?.value]();
        if (Object.is(data?.type, "theme")) return theme.changeTheme(data?.value);
      });

    })
  };
}));

System.import("./__entry.js", "./");