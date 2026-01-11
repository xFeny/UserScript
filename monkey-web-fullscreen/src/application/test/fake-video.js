/*!
 * thumbplayer-h5
 * Update Date: 2025-06-26 09:23:41
 * Author: thumbplayer-h5 team
 * ---
 * Copyright (c) 2025 Tencent
 */
!(function (e, t) {
  for (var i in t) e[i] = t[i];
})(
  window,
  (function (e) {
    var t = {};
    function i(n) {
      if (t[n]) return t[n].exports;
      var r = (t[n] = { i: n, l: !1, exports: {} });
      return e[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
    }
    return (
      (i.m = e),
      (i.c = t),
      (i.d = function (e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
      }),
      (i.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (i.t = function (e, t) {
        if ((1 & t && (e = i(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if ((i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
          for (var r in e)
            i.d(
              n,
              r,
              function (t) {
                return e[t];
              }.bind(null, r)
            );
        return n;
      }),
      (i.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return i.d(t, "a", t), t;
      }),
      (i.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (i.p = ""),
      i((i.s = 1))
    );
  })([
    function (e, t, i) {
      /*!
       * thumbplayer-h5
       * Update Date: 2025-06-26 09:23:39
       * Author: thumbplayer-h5 team
       * ---
       * Copyright (c) 2025 Tencent
       */
      e.exports = (function (e) {
        var t = {};
        function i(n) {
          if (t[n]) return t[n].exports;
          var r = (t[n] = { i: n, l: !1, exports: {} });
          return e[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
        }
        return (
          (i.m = e),
          (i.c = t),
          (i.d = function (e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
          }),
          (i.r = function (e) {
            "undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e, "__esModule", { value: !0 });
          }),
          (i.t = function (e, t) {
            if ((1 & t && (e = i(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if ((i.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
              for (var r in e)
                i.d(
                  n,
                  r,
                  function (t) {
                    return e[t];
                  }.bind(null, r)
                );
            return n;
          }),
          (i.n = function (e) {
            var t =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return i.d(t, "a", t), t;
          }),
          (i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (i.p = ""),
          i((i.s = 7))
        );
      })([
        function (e, t, i) {
          "use strict";
          i.d(t, "a", function () {
            return u;
          }),
            i.d(t, "j", function () {
              return l;
            }),
            i.d(t, "l", function () {
              return d;
            }),
            i.d(t, "h", function () {
              return f;
            }),
            i.d(t, "i", function () {
              return _;
            }),
            i.d(t, "m", function () {
              return p;
            }),
            i.d(t, "c", function () {
              return n;
            }),
            i.d(t, "d", function () {
              return r;
            }),
            i.d(t, "e", function () {
              return s;
            }),
            i.d(t, "g", function () {
              return o;
            }),
            i.d(t, "f", function () {
              return a;
            }),
            i.d(t, "k", function () {
              return c;
            }),
            i.d(t, "b", function () {
              return h;
            });
          const n = { 5002: "AAC", 172: "HEVC", 26: "H.264", 193: "VVC" };
          var r, s;
          !(function (e) {
            (e.UNKNOWN = "70060000"),
              (e.LOAD_WASM_MAIN_SCRIPT = "70060001"),
              (e.LOAD_WASM_SPWAN_WORKER_SCRIPT = "70060002"),
              (e.NOT_SUPPROT = "70060003"),
              (e.LOAD_WASM = "70060004"),
              (e.NET_UNABLE = "70060005"),
              (e.NET_STATUS_CODE = "70060006"),
              (e.RUNTIME = "70060007"),
              (e.LOAD_IFRAME = "70060008"),
              (e.FILE_SIZE = "70060009"),
              (e.P2P_URL_NOT_MATCH = "70060020"),
              (e.P2P_LOAD_FAILED = "70060021"),
              (e.P2P_LOAD_TIMEOUT = "70060022"),
              (e.INIT_WASM_MODULE = "70060301"),
              (e.EMSCRIPTEN_RUNTIME_ERROR = "70060401");
          })(r || (r = {})),
            (function (e) {
              (e.UNKNOWN = "未知错误"),
                (e.LOAD_WASM_SCRIPT = "内核文件加载失败"),
                (e.NOT_SUPPROT = "不支持播放"),
                (e.NOT_SUPPROT_HTTP = "抱歉，播放页面需要https协议"),
                (e.NOT_SUPPROT_SAB = "抱歉，您的浏览器缺少必要接口（SAB）"),
                (e.NOT_SUPPROT_WASM = "抱歉，您的浏览器缺少必要接口（WASM）"),
                (e.NET_UNABLE = "视频获取途中出现问题"),
                (e.NET_STATUS = "视频获取途中出现错误"),
                (e.PLAY_CORE_ERR = "内核发生错误"),
                (e.FILE_SIZE = "获取视频大小失败"),
                (e.INIT_WASM_MODULE = "内核创建异常"),
                (e.RUNTIME = "播放内核错误"),
                (e.EMSCRIPTEN_RUNTIME_ERROR = "播放内核错误");
            })(s || (s = {}));
          const o = {
            getNotSptErrMsg: (e) =>
              e && /^http:/.test(e)
                ? s.NOT_SUPPROT_HTTP
                : window.SharedArrayBuffer
                ? window.WebAssembly
                  ? s.NOT_SUPPROT
                  : s.NOT_SUPPROT_WASM
                : s.NOT_SUPPROT_SAB,
            getTimeRangeErrorMsg: (e, t, i) =>
              `Failed to execute '${e}' on 'TimeRanges': The index provided (${i}) is greater than the maximum bound (${t}).`,
            getApiNotSptErrorMsg: (e) => `not support ${e} right now.`,
            BLOCK_ERROR_MSG: "NotAllowedError, play() failed because the user didn't interact with the document first.",
            NULL_SOURCE_ERROR_MSG: "The element has no supported sources.",
            INVAILD_STATE_ERROR_MSG: "Call in unmatched state",
          };
          var a, c, h;
          !(function (e) {
            (e.CAPTURE_OVER = "captureOver"),
              (e.VIDEO_FRAME_RENDER = "videoFrameRender"),
              (e.STATE_CHANGE = "stateChange"),
              (e.RENDERER_CONTEXT_LOST = "rendererContextLost"),
              (e.RENDERER_CONTEXT_RESTORED = "rendererContextRestored"),
              (e.REQ_P2P = "requestP2P"),
              (e.TIME_UPDATE = "timeupdate"),
              (e.VOLUME_CHANGE = "volumechange"),
              (e.RATE_CHANGE = "ratechange"),
              (e.WAITING = "waiting"),
              (e.DURATION_CHANGE = "durationchange"),
              (e.LOADED_METADATA = "loadedmetadata"),
              (e.CANPLAY = "canplay"),
              (e.PAUSE = "pause"),
              (e.PLAYING = "playing"),
              (e.ENDED = "ended"),
              (e.PROGRESS = "progress"),
              (e.SEEKING = "seeking"),
              (e.SEEKED = "seeked"),
              (e.ERROR = "error"),
              (e.ENTER_PIP = "enterpictureinpicture"),
              (e.LEAVE_PIP = "leavepictureinpicture");
          })(a || (a = {})),
            (function (e) {
              (e[(e.PLAYER_API_STATE_IDLE = 0)] = "PLAYER_API_STATE_IDLE"),
                (e[(e.PLAYER_API_STATE_INITIALIZED = 1)] = "PLAYER_API_STATE_INITIALIZED"),
                (e[(e.PLAYER_API_STATE_PREPARING = 2)] = "PLAYER_API_STATE_PREPARING"),
                (e[(e.PLAYER_API_STATE_PREPARED = 3)] = "PLAYER_API_STATE_PREPARED"),
                (e[(e.PLAYER_API_STATE_STARTED = 4)] = "PLAYER_API_STATE_STARTED"),
                (e[(e.PLAYER_API_STATE_PAUSED = 5)] = "PLAYER_API_STATE_PAUSED");
            })(c || (c = {})),
            (function (e) {
              (e.CALL_WORKER_INIT_WORKER = "callWorker_initWorker"),
                (e.CALL_WORKER_LOAD = "callWorker_load"),
                (e.CALL_WORKER_PLAY = "callWorker_play"),
                (e.CALL_WORKER_SEEK = "callWorker_seek"),
                (e.CALL_WORKER_SET_RATE = "callWorker_setRate"),
                (e.CALL_WORKER_PAUSE = "callWorker_pause"),
                (e.CALL_WORKER_PLAY_AUDIO_FRAME_OK = "callWorker_playAudioFrameOk"),
                (e.CALL_WORKER_PLAY_VIDEO_FRAME_OK = "callWorker_playVideoFrameOk"),
                (e.CALL_WORKER_SYNC_METRICS = "callWorker_syncMetrics"),
                (e.CALL_MAIN_INIT_WORKER_OVER = "callMain_initWorkerOver"),
                (e.CALL_MAIN_REV_AUDIO_FRAME = "callMain_receiveAudioFrame"),
                (e.CALL_MAIN_REV_VIDEO_FRAME = "callMain_receiveVideoFrame"),
                (e.CALL_MAIN_UDPATE_METADATA = "callMain_updateMetadata"),
                (e.CALL_MAIN_SYNC_BUFFER_DURATION = "callMain_syncBufferDuration"),
                (e.CALL_MAIN_BUFFER_STATE_CHANGE = "callMain_bufferStateChange"),
                (e.CALL_MAIN_SEEK_STATE_CHANGE = "callMain_seekStateChange"),
                (e.CALL_MAIN_STATE_CHANGE = "callMain_stateChange"),
                (e.CALL_MAIN_ERROR = "callMain_error"),
                (e.CALL_MAIN_ENDED = "callMain_ended"),
                (e.CALL_MAIN_SYNC_METRIC = "callMain_setMetric"),
                (e.CALL_MAIN_REQ_P2P = "callMain_reqP2P"),
                (e.CALL_WORKER_REQ_P2P_SUCCESS = "callWorker_reqP2PSuccess"),
                (e.CALL_WORKER_REQ_P2P_FAILED = "callWorker_reqP2PFailed");
            })(h || (h = {}));
          const u = "https://vm.gtimg.cn/thumbplayer/wasm",
            l =
              "Auj1opL3pP70ubGbMMTXrnr5/86duVWNbiABo1+8WN1D2YeemfG1QwhPW+ODh/BCciMc6YXKBzEu0HKsYS6rOAwAAABieyJvcmlnaW4iOiJodHRwczovL3ZtLmd0aW1nLmNuOjQ0MyIsImZlYXR1cmUiOiJVbnJlc3RyaWN0ZWRTaGFyZWRBcnJheUJ1ZmZlciIsImV4cGlyeSI6MTc1MzE0MjQwMH0=",
            d = { min: "ed1136accb", full: "533eda4dd6", lt: "3c39b80611" },
            f = 3,
            _ = 0.5,
            p = {
              featType: "min",
              openLog: "false",
              wasmLogLevel: "-1",
              captureType: "none",
              closeIndexdb: "false",
              decoderConcurrency: "3",
              baseUrl: u,
            };
        },
        function (e, t, i) {
          "use strict";
          i.d(t, "a", function () {
            return o;
          }),
            i.d(t, "b", function () {
              return a;
            });
          const n = function () {},
            r = { trace: n, debug: n, log: n, warn: n, info: n, error: n };
          let s = r;
          function o(e) {
            if (self.console && !0 === e) {
              !(function (...e) {
                e.forEach(function (e) {
                  s[e] = (function (e) {
                    return self.console[e] || n;
                  })(e);
                });
              })("debug", "log", "info", "warn", "error");
              try {
                s.log();
              } catch (e) {
                s = r;
              }
            } else s = r;
          }
          const a = r;
        },
        function (e, t, i) {
          "use strict";
          i.d(t, "d", function () {
            return c;
          }),
            i.d(t, "e", function () {
              return r;
            }),
            i.d(t, "a", function () {
              return o;
            }),
            i.d(t, "b", function () {
              return s;
            }),
            i.d(t, "c", function () {
              return a;
            });
          var n = i(1);
          const r = {
              WORKER_EM_INIT_COST: "workerEmInitCostMs",
              WORKER_DB_OPEN_COST: "workerDBOpenCostMs",
              WORKER_WASM_INIT_COST: "workerWasmInitCostMs",
              WORKER_EM_JS_DOWNLOAD_COST: "workerEmJSDownloadCostMs",
              WORKER_WASM_DOWNLOAD_COST: "workerWasmDownloadCostMs",
              TPV_WORKER_INIT_COST: "tpvWorkerInitCostMs",
              TPV_PREPARED_COST: "tpvPreparedCostMs",
              TPV_P2P_FIRST_LOAD_COST: "tpvP2pFirstLoadCostMs",
              TPV_MAIL_COST: "tpvMailCostMs",
              TPV_MAIL_COUNT: "tpvMailCount",
              WORKER_USE_DB_CACHE: "workerUseDbCache",
            },
            s = {
              workerUseDbCache: null,
              workerMailCostMs: 0,
              workerMailCount: 0,
              workerEmInitCostMs: -1,
              workerDBOpenCostMs: -1,
              workerWasmInitCostMs: -1,
              workerEmJSDownloadCostMs: -1,
              workerWasmDownloadCostMs: -1,
            },
            o = Object.assign(Object.assign({}, s), {
              tpvIsModuleHot: null,
              tpvWorkerInitCostMs: -1,
              tpvPreparedCostMs: -1,
              tpvP2pFirstLoadCostMs: -1,
              tpvMailCostMs: 0,
              tpvMailCount: 0,
            }),
            a = -1;
          class c {
            static start(e) {
              if (this.marks[e]) return n.b.warn(`Start with duplicated key: ${e}, skipped.`);
              this.marks[e] = performance.mark(this.buildStepName(e, "start"));
            }
            static end(e, t) {
              const i = this.marks[e];
              if (!i) return n.b.warn(`PerformanceWrapper.end() with key ${e} not started.`), performance.clearMarks(i.name), -1;
              try {
                const n = performance.mark(this.buildStepName(e, "end")),
                  r = performance.measure(this.buildStepName(e, "measure"), i.name, n.name);
                return (
                  performance.clearMarks(i.name),
                  performance.clearMarks(n.name),
                  performance.clearMeasures(r.name),
                  delete this.marks[e],
                  "object" == typeof t && t && (t[e] = r.duration),
                  r.duration
                );
              } catch (e) {
                return n.b.warn(e), -1;
              }
            }
            static buildStepName(e, t) {
              return `${e}_${t}`;
            }
          }
          c.marks = {};
        },
        function (e, t, i) {
          "use strict";
          i.d(t, "a", function () {
            return a;
          });
          const n = "object" == typeof Reflect ? Reflect : null,
            r =
              n && "function" == typeof n.apply
                ? n.apply
                : function (e, t, i) {
                    return Function.prototype.apply.call(e, t, i);
                  };
          let s;
          function o(...e) {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, e)
              );
          }
          s =
            n && "function" == typeof n.ownKeys
              ? n.ownKeys
              : Object.getOwnPropertySymbols
              ? function (e) {
                  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
                }
              : function (e) {
                  return Object.getOwnPropertyNames(e);
                };
          class a {
            constructor() {
              (this._events = Object.create(null)),
                (this._eventsCount = 0),
                (this._maxListeners = void 0),
                (this._defaultMaxListeners = 10);
            }
            get defaultMaxListeners() {
              return this._defaultMaxListeners;
            }
            set defaultMaxListeners(e) {
              this._defaultMaxListeners = e;
            }
            setMaxListeners(e) {
              if ("number" != typeof e || e < 0)
                throw new RangeError(`The value of "n" is out of range. It must be a non-negative number. Received ${e}.`);
              return (this._maxListeners = e), this;
            }
            getMaxListeners() {
              return this._maxListeners;
            }
            emit(e, ...t) {
              const i = this._events;
              if (void 0 === i) return !1;
              const n = [{ type: e, target: this, data: 1 === t.length ? t[0] : t }],
                s = i[e];
              if (void 0 === s) return !1;
              if ("function" == typeof s) r(s, this, n);
              else {
                const e = s,
                  t = e.length,
                  i = [...e];
                for (let e = 0; e < t && r(i[e], this, n) !== a.STOP_IMMEDIATE_PROPAGATION; ++e);
              }
              return !0;
            }
            addListener(e, t) {
              return this._addListener(e, t, !1);
            }
            _addListener(e, t, i) {
              let n,
                r,
                s = this._events;
              return (
                void 0 === s ? ((s = Object.create(null)), (this._events = s), (this._eventsCount = 0)) : (r = s[e]),
                void 0 === r
                  ? ((r = t), (s[e] = t), ++this._eventsCount)
                  : ("function" == typeof r ? ((s[e] = i ? [t, r] : [r, t]), (r = s[e])) : i ? r.unshift(t) : r.push(t),
                    (n = this.getMaxListeners()),
                    n > 0 &&
                      r.length > n &&
                      !r.warned &&
                      ((r.warned = !0),
                      null === console ||
                        void 0 === console ||
                        console.warn(
                          `Possible EventEmitter memory leak detected. ${r.length} ${String(
                            e
                          )} listeners added. Use emitter.setMaxListeners() to increase limit`
                        ))),
                this
              );
            }
            on(e, t, i) {
              let n = !0;
              if ("number" == typeof i && !Number.isNaN(i)) {
                t.priority = i;
                const r = this.listeners(e);
                n = !(r && r.length > 0) || r.some((e) => e.priority > i);
              }
              return this._addListener(e, t, !n);
            }
            listeners(e) {
              const t = this._events;
              if (void 0 === t) return [];
              const i = t[e];
              return void 0 === i ? [] : "function" == typeof i ? [i] : [...i];
            }
            prependListener(e, t) {
              return this._addListener(e, t, !0);
            }
            once(e, t) {
              return (
                this.on(
                  e,
                  (function (e, t, i) {
                    const n = { fired: !1, wrapFn() {}, target: e, type: t, listener: i },
                      r = o.bind(n);
                    return (r.listener = i), (n.wrapFn = r), r;
                  })(this, e, t)
                ),
                this
              );
            }
            removeListener(e, t) {
              const i = this._events;
              if (void 0 === i) return this;
              const n = i[e];
              if (void 0 === n) return this;
              if (n === t) 0 == --this._eventsCount ? (this._events = Object.create(null)) : delete i[e];
              else if ("function" != typeof n) {
                const r = n;
                let s, o;
                for (s = -1, o = r.length - 1; o >= 0; o--)
                  if (r[o] === t) {
                    s = o;
                    break;
                  }
                if (s < 0) return this;
                0 === s
                  ? r.shift()
                  : (function (e, t) {
                      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                      e.pop();
                    })(r, s),
                  1 === r.length && (i[e] = r[0]);
              }
              return this;
            }
            off(e, t) {
              this.removeListener(e, t);
            }
            removeAllListeners(e) {
              const t = this._events;
              return (
                void 0 === t ||
                  (0 === arguments.length
                    ? ((this._events = Object.create(null)), (this._eventsCount = 0))
                    : void 0 !== t[e] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete t[e])),
                this
              );
            }
            listenerCount(e) {
              const t = this._events;
              if (void 0 !== t) {
                const i = t[e];
                if ("function" == typeof i) return 1;
                if (void 0 !== i) return i.length;
              }
              return 0;
            }
            eventNames() {
              return this._eventsCount > 0 ? s(this._events) : [];
            }
          }
          a.STOP_IMMEDIATE_PROPAGATION = "EventEmitter.STOP_IMMEDIATE_PROPAGATION";
        },
        function (e, t, i) {
          "use strict";
          function n() {
            return performance.timeOrigin + performance.now();
          }
          i.d(t, "a", function () {
            return n;
          });
        },
        function (e, t, i) {
          function n(e) {
            var t = {};
            function i(n) {
              if (t[n]) return t[n].exports;
              var r = (t[n] = { i: n, l: !1, exports: {} });
              return e[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
            }
            (i.m = e),
              (i.c = t),
              (i.i = function (e) {
                return e;
              }),
              (i.d = function (e, t, n) {
                i.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });
              }),
              (i.r = function (e) {
                Object.defineProperty(e, "__esModule", { value: !0 });
              }),
              (i.n = function (e) {
                var t =
                  e && e.__esModule
                    ? function () {
                        return e.default;
                      }
                    : function () {
                        return e;
                      };
                return i.d(t, "a", t), t;
              }),
              (i.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (i.p = "/"),
              (i.oe = function (e) {
                throw (console.error(e), e);
              });
            var n = i((i.s = ENTRY_MODULE));
            return n.default || n;
          }
          function r(e) {
            return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
          }
          function s(e, t, n) {
            var s = {};
            s[n] = [];
            var o = t.toString(),
              a = o.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
            if (!a) return s;
            for (
              var c,
                h = a[1],
                u = new RegExp("(\\\\n|\\W)" + r(h) + "\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)", "g");
              (c = u.exec(o));

            )
              "dll-reference" !== c[3] && s[n].push(c[3]);
            for (
              u = new RegExp(
                "\\(" +
                  r(h) +
                  '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)\\(\\s*(/\\*.*?\\*/)?\\s*.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)',
                "g"
              );
              (c = u.exec(o));

            )
              e[c[2]] || (s[n].push(c[1]), (e[c[2]] = i(c[1]).m)), (s[c[2]] = s[c[2]] || []), s[c[2]].push(c[4]);
            for (var l, d = Object.keys(s), f = 0; f < d.length; f++)
              for (var _ = 0; _ < s[d[f]].length; _++) (l = s[d[f]][_]), isNaN(1 * l) || (s[d[f]][_] = 1 * s[d[f]][_]);
            return s;
          }
          function o(e) {
            return Object.keys(e).reduce(function (t, i) {
              return t || e[i].length > 0;
            }, !1);
          }
          e.exports = function (e, t) {
            t = t || {};
            var r = { main: i.m },
              a = t.all
                ? { main: Object.keys(r.main) }
                : (function (e, t) {
                    for (var i = { main: [t] }, n = { main: [] }, r = { main: {} }; o(i); )
                      for (var a = Object.keys(i), c = 0; c < a.length; c++) {
                        var h = a[c],
                          u = i[h].pop();
                        if (((r[h] = r[h] || {}), !r[h][u] && e[h][u])) {
                          (r[h][u] = !0), (n[h] = n[h] || []), n[h].push(u);
                          for (var l = s(e, e[h][u], h), d = Object.keys(l), f = 0; f < d.length; f++)
                            (i[d[f]] = i[d[f]] || []), (i[d[f]] = i[d[f]].concat(l[d[f]]));
                        }
                      }
                    return n;
                  })(r, e),
              c = "";
            Object.keys(a)
              .filter(function (e) {
                return "main" !== e;
              })
              .forEach(function (e) {
                for (var t = 0; a[e][t]; ) t++;
                a[e].push(t),
                  (r[e][t] = "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })"),
                  (c =
                    c +
                    "var " +
                    e +
                    " = (" +
                    n.toString().replace("ENTRY_MODULE", JSON.stringify(t)) +
                    ")({" +
                    a[e]
                      .map(function (t) {
                        return JSON.stringify(t) + ": " + r[e][t].toString();
                      })
                      .join(",") +
                    "});\n");
              }),
              (c =
                c +
                "new ((" +
                n.toString().replace("ENTRY_MODULE", JSON.stringify(e)) +
                ")({" +
                a.main
                  .map(function (e) {
                    return JSON.stringify(e) + ": " + r.main[e].toString();
                  })
                  .join(",") +
                "}))(self);");
            var h = new window.Blob([c], { type: "text/javascript" });
            if (t.bare) return h;
            var u = (window.URL || window.webkitURL || window.mozURL || window.msURL).createObjectURL(h),
              l = new window.Worker(u);
            return (l.objectURL = u), l;
          };
        },
        function (e, t, i) {
          "use strict";
          i.r(t),
            i.d(t, "default", function () {
              return I;
            });
          var n = i(0),
            r = i(4),
            s = i(1),
            o = i(2),
            a = i(3);
          function c(e) {
            const t = e.retryCount || 0,
              i = +new Date();
            let r = 0;
            const s = { promise: null, xhr: null },
              o = (a, c) => {
                const h = new XMLHttpRequest();
                e.timeout && (h.timeout = e.timeout),
                  e.responseType && (h.responseType = e.responseType),
                  (h.ontimeout = e.ontimeout),
                  h.open(e.method || "get", e.url),
                  e.range && h.setRequestHeader("Range", `bytes=${e.range[0]}-${e.range[1]}`),
                  (h.onload = () => {
                    200 === h.status || 206 === h.status
                      ? a({ data: h.response, target: h, startTimestamp: i, opts: e })
                      : r < t
                      ? (r++, o(a, c))
                      : c({ message: `${n.e.NET_STATUS}[${h.status}]`, code: n.d.NET_STATUS_CODE, target: h });
                  }),
                  (h.onerror = (e) => {
                    r < t ? (r++, o(a, c)) : c({ message: n.e.NET_UNABLE, code: n.d.NET_UNABLE, target: h });
                  }),
                  (h.onabort = () => {}),
                  e.body ? h.send(e.body) : h.send(),
                  (s.xhr = h);
              };
            return (
              (s.promise = new Promise((e, t) => {
                o(e, t);
              })),
              s
            );
          }
          function h(e) {
            return c(e).promise;
          }
          const u = "error";
          class l extends a.a {
            constructor(e, t) {
              super(), (this._destroyed = !1), (this._wasmApi = e), (this._videoConfig = t);
            }
            load(e, t) {}
            onRequestNewBufferCallback(e, t = -1, i = 0) {}
            destroy() {
              (this._videoConfig = null),
                (this._wasmApi = null),
                (this._destroyed = !0),
                this.removeAllListeners(),
                s.b.log("[BaseProvider] Provider has been destroyed");
            }
            raiseInnerErr(e, t) {
              this.emit(u, { code: e, message: t });
            }
          }
          class d extends l {
            load(e, t) {
              const i = c({ url: e, retryCount: 2, responseType: this.getResponseType() });
              i.promise
                .then((e) => {
                  this.onLoadedSucc(t, e.data);
                })
                .catch((e) => {
                  this.raiseInnerErr(null == e ? void 0 : e.code, null == e ? void 0 : e.message);
                }),
                (this._xhr = i.xhr);
            }
            getResponseType() {
              return "arraybuffer";
            }
            onLoadedSucc(e, t) {
              if (this._destroyed) return;
              const i = new Uint8Array(t);
              this.writeBufferToFFmpeg(e, i);
            }
            writeBufferToFFmpeg(e, t) {
              if (this._destroyed) return;
              const i = this._wasmApi.writeArrayBufferToWasm(t);
              if (null === i) return void s.b.error("[FileProvider] call Module._writeBuffer, bufferPtr is null");
              const n = t.byteLength,
                r = this._wasmApi.writeBufferToFFmpeg(e, i, 0, n, n);
              s.b.log("[FileProvider] call Module._writeBuffer, ret: " + r);
            }
            destroy() {
              this._xhr && (this._xhr.abort(), (this._xhr = null)), super.destroy();
            }
          }
          class f extends d {
            getResponseType() {
              return "text";
            }
            load(e, t) {
              var i, n;
              (null === (i = this._videoConfig) || void 0 === i ? void 0 : i.m3u8Str)
                ? this.onLoadedSucc(t, null === (n = this._videoConfig) || void 0 === n ? void 0 : n.m3u8Str)
                : super.load(e, t);
            }
            onLoadedSucc(e, t) {
              const i = t,
                n = this.replaceProtocol(i);
              var r;
              ((r = n.trim()),
              new Promise(function (e) {
                const t = new Blob([r], { type: "text/plain" }),
                  i = new FileReader();
                i.readAsArrayBuffer(t),
                  (i.onload = function () {
                    e(i.result);
                  });
              })).then((t) => {
                const i = new Uint8Array(t);
                this.writeBufferToFFmpeg(e, i);
              });
            }
            replaceProtocol(e) {
              return e.replace(/(https?)/g, "$1js");
            }
          }
          var _,
            p = function (e, t, i, n) {
              return new (i || (i = Promise))(function (r, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          class m extends d {
            onLoadedSucc(e, t) {
              var i;
              let n;
              (n = (null === (i = this._videoConfig) || void 0 === i ? void 0 : i.decConfig)
                ? this.tryDecChacha20(t)
                : Promise.resolve(new Uint8Array(t))),
                n.then((t) => {
                  super.writeBufferToFFmpeg(e, t);
                });
            }
            tryDecChacha20(e) {
              return p(this, void 0, void 0, function* () {
                const t = new Uint8Array(e);
                let i,
                  n = 0,
                  r = 0;
                for (; !(r >= t.byteLength); ) {
                  const e = Math.min(t.byteLength, 1024 + r),
                    s = t.slice(r, e);
                  r = e;
                  const o = this.decChunk(s),
                    { buf: a, ptr: c } = o,
                    h = i ? i.length : 0,
                    u = i;
                  (i = new Uint8Array(h + a.byteLength)),
                    u && i.set(u, 0),
                    i.set(a, h),
                    this._wasmApi.freePtr(c),
                    n++,
                    n % 100 == 0 && (yield this.waitNextFrame());
                }
                return i;
              });
            }
            waitNextFrame() {
              return p(this, void 0, void 0, function* () {
                return new Promise((e) => {
                  setTimeout(e, 0);
                });
              });
            }
            decChunk(e) {
              const t = e.byteLength,
                i = this._wasmApi.malloc(t),
                n = this._wasmApi.malloc(t);
              this._wasmApi.heapU8.set(e, n), this._wasmApi.decData(i, n, t);
              const r = this._wasmApi.heapU8.slice(i, i + t);
              return this._wasmApi.freePtr(n), { buf: r, ptr: i };
            }
          }
          class g extends m {
            constructor(e, t) {
              super(e, t),
                (this.loadingUrl = null),
                (this.writePtr = null),
                (this.onMessage = (e) => {
                  const { data: t } = e;
                  if (
                    (function (e) {
                      return (
                        "cmd" in e &&
                        "url" in e &&
                        [n.b.CALL_WORKER_REQ_P2P_SUCCESS, n.b.CALL_WORKER_REQ_P2P_FAILED].includes(e.cmd)
                      );
                    })(t) &&
                    t.url === this.loadingUrl
                  ) {
                    const { cmd: e } = t;
                    switch (
                      (clearTimeout(this.timeoutTimer),
                      this.callLogger("log", `Got p2p command message, cmd: ${e}, url: ${t.url}`),
                      e)
                    ) {
                      case n.b.CALL_WORKER_REQ_P2P_SUCCESS:
                        return this.p2pLoadSuccess(t);
                      case n.b.CALL_WORKER_REQ_P2P_FAILED:
                        return this.p2pLoadFailed(t);
                    }
                  }
                }),
                this.listenMsg(!0);
            }
            load(e, t) {
              const { p2pTimeout: i = 8e3 } = this._videoConfig;
              (this.timeoutTimer = self.setTimeout(() => {
                const t = `P2P request timeout: ${e}.`;
                this.callLogger("error", t), this.raiseInnerErr(n.d.P2P_LOAD_TIMEOUT, t), (this.loadingUrl = null);
              }, i)),
                (this.loadingUrl = e),
                (this.writePtr = t),
                this.callLogger("log", `Start loading: ${e}, ${t}`),
                this._wasmApi.mailToFakeVideo({ cmd: n.b.CALL_MAIN_REQ_P2P, data: { url: e } });
            }
            destroy() {
              clearTimeout(this.timeoutTimer), this.callLogger("log", "call destroy()"), this.listenMsg(!1);
            }
            listenMsg(e = !1) {
              return e ? self.addEventListener("message", this.onMessage) : self.removeEventListener("message", this.onMessage);
            }
            p2pLoadSuccess(e) {
              const { url: t, buffer: i, ts: s } = e;
              if (!this.loadingUrl || !this.writePtr) {
                const e = `Error in load ts file, url = ${t}, loadingUrl = ${this.loadingUrl}, ptr: ${this.writePtr}`;
                return this.callLogger("error", e), void this.raiseInnerErr(n.d.P2P_URL_NOT_MATCH, e);
              }
              this.callLogger(
                "log",
                `p2pLoadSuccess(), url: ${t}, bufferByteLen: ${i.byteLength}, ptr: ${this.writePtr}, usage: ${Object(r.a)() - s}`
              ),
                this.onLoadedSucc(this.writePtr, i);
            }
            p2pLoadFailed(e) {
              var t;
              this.callLogger("error", `p2pLoadFailed, url = ${e.url}, err = ${e.error}, usage = ${Object(r.a)() - e.ts}`),
                this.raiseInnerErr(n.d.P2P_LOAD_FAILED, null === (t = e.error) || void 0 === t ? void 0 : t.message);
            }
            callLogger(e, t) {
              return s.b[e]("[P2PTsProvider] " + t);
            }
          }
          !(function (e) {
            (e.START = "loadStart"), (e.PROGRESS = "loadProgress"), (e.END = "loadEnd"), (e.ERROR = "error");
          })(_ || (_ = {}));
          class E extends a.a {
            constructor() {
              super(...arguments), (this.fileSizeInner = 0);
            }
            open(e, t) {
              this.emit(_.START);
              const { fileSize: i = 0, rangeStart: n = 0, rangeEnd: r = 0, type: o = "vod" } = t || {};
              (this.abortCtrl = new AbortController()), (this.type = o), (this.fileSizeInner = !Number.isNaN(i) && i > 0 ? i : 0);
              const a = {};
              "vod" === o && n >= 0 && (a.Range = `bytes=${n}-${r > 0 && r > n ? r : ""}`),
                this.fileSizeInner <= 0 && "vod" === o
                  ? (function (e) {
                      return new Promise((t, i) => {
                        const n = new XMLHttpRequest();
                        n.open("GET", e, !0),
                          (n.onreadystatechange = function () {
                            if (this.readyState == this.HEADERS_RECEIVED) {
                              const e = parseInt(n.getResponseHeader("Content-Length"));
                              n.abort(), t(e);
                            }
                          }),
                          (n.onerror = function () {
                            i();
                          }),
                          n.send();
                      });
                    })(e)
                      .then((e) => {
                        this.fileSizeInner = e;
                      })
                      .catch(() => {
                        s.b.log("[FetchLoader] getFileSizeByXhr error");
                      })
                      .finally(() => {
                        this.doFetch(e, a);
                      })
                  : this.doFetch(e, a);
            }
            get fileSize() {
              return this.fileSizeInner;
            }
            abort() {
              var e;
              null === (e = this.abortCtrl) || void 0 === e || e.abort(), (this.abortCtrl = null);
            }
            destroy() {
              this.abort();
            }
            doFetch(e, t) {
              var i;
              fetch(e, { headers: t, signal: null === (i = this.abortCtrl) || void 0 === i ? void 0 : i.signal })
                .then((e) => {
                  if (e.ok && this.fileSizeInner <= 0) {
                    const t = (function (e) {
                      let t = 0;
                      if (e.has("Content-Range")) {
                        try {
                          const i = e.get("Content-Range");
                          t = parseInt(i.match(/\/(\d+)/)[1], 10);
                        } catch (e) {
                          s.b.log("[getFileSizeFromHeader] can not read Content-Range header because cors.");
                        }
                        return t || 0;
                      }
                      return t;
                    })(e.headers);
                    t > 0 && (this.fileSizeInner = t);
                  }
                  return this.fileSizeInner <= 0 && "vod" === this.type
                    ? (this.abort(), void this.emit(_.ERROR, { message: n.e.FILE_SIZE, code: n.d.FILE_SIZE }))
                    : e.ok
                    ? e.body
                    : (this.abort(),
                      void this.emit(_.ERROR, { message: `${n.e.NET_STATUS}[${e.status}]`, code: n.d.NET_STATUS_CODE }));
                })
                .then((e) => {
                  const t = e.getReader(),
                    i = this.emit.bind(this),
                    n = this.fileSizeInner;
                  return new ReadableStream({
                    start(e) {
                      !(function r() {
                        t.read()
                          .then(({ done: t, value: s }) => {
                            if (t) return e.close(), void i(_.END);
                            e.enqueue(s), i(_.PROGRESS, { chunk: s, fileSize: n }), r();
                          })
                          .catch((e) => {
                            s.b.log("[FetchLoader] reader.read() get a error, ", e);
                          });
                      })();
                    },
                  });
                })
                .catch((e) => {
                  this.emit(_.ERROR, { message: `无法获取视频流(${e})`, code: n.d.NET_UNABLE });
                });
            }
          }
          class v extends a.a {
            constructor() {
              super(),
                (this._bufferChunkOffsetIndex = 0),
                (this._rangeStartPos = 0),
                (this._currentUrl = ""),
                (this._loader = new E()),
                (this._evtMap = {
                  [_.PROGRESS]: this.onLoadProgress.bind(this),
                  [_.END]: this.onLoadEnd.bind(this),
                  [_.ERROR]: this.onLoadError.bind(this),
                });
            }
            open(e, t = 0, i = 0, n = "vod") {
              this.stop(),
                this.setEvts(!0),
                (this._currentUrl = e),
                (this._bufferChunks = []),
                (this._rangeStartPos = t),
                (this._bufferChunkOffsetIndex = 0),
                this._loader.open(e, { fileSize: i, rangeStart: t, type: n });
            }
            stop() {
              var e;
              this.setEvts(!1),
                (this._currentUrl = ""),
                (this._bufferChunks = null),
                null === (e = this._loader) || void 0 === e || e.abort();
            }
            get url() {
              return this._currentUrl;
            }
            get fileSize() {
              var e;
              return (null === (e = this._loader) || void 0 === e ? void 0 : e.fileSize) || 0;
            }
            get bufferChunks() {
              return this._bufferChunks;
            }
            get bufferChunkOffsetIndex() {
              return this._bufferChunkOffsetIndex;
            }
            set bufferChunkOffsetIndex(e) {
              if (e < 0 || e >= this._bufferChunks.length)
                throw new Error(`bufferChunkOffsetIndex out of range [0-${this._bufferChunks.length})`);
              this._bufferChunkOffsetIndex = e;
            }
            checkBuffer(e) {
              if (e <= 0) return null;
              if (this._bufferChunkOffsetIndex >= this._bufferChunks.length) return null;
              let t, i;
              this.fileSize > 0 &&
                (e = Math.min(e, this.fileSize - this._bufferChunks[this._bufferChunkOffsetIndex].startPosOnFile));
              let n = 0,
                r = 0,
                s = !1;
              for (t = this._bufferChunkOffsetIndex, i = this._bufferChunks.length; t < i; t++)
                if (((n += this._bufferChunks[t].bufferLength), r++, n >= e)) {
                  s = !0;
                  break;
                }
              return s ? { spliceChunkCount: r, totalChunkSize: n } : null;
            }
            readBuffer(e, t) {
              let i, n;
              const r = new Uint8Array(e);
              let s = 0;
              const o = this._bufferChunks.slice(this._bufferChunkOffsetIndex, this._bufferChunkOffsetIndex + t);
              for (i = 0, n = o.length; i < n; i++) r.set(o[i].buffer, s), (s += o[i].bufferLength);
              return (this._bufferChunkOffsetIndex += t), r;
            }
            checkPosHasBuffered(e) {
              const t = { bufferChunkOffsetIndex: -1 };
              let i, n;
              if (e < this._rangeStartPos || e >= this.fileSize) return t;
              for (i = 0, n = this._bufferChunks.length; i < n; i++) {
                const n = this._bufferChunks[i];
                if (n.buffer && e >= n.startPosOnFile && e < n.startPosOnFile + n.bufferLength) {
                  t.bufferChunkOffsetIndex = i;
                  break;
                }
              }
              return t;
            }
            destroy() {
              this.removeAllListeners(), this.stop();
            }
            setEvts(e) {
              this._loader &&
                Object.keys(this._evtMap).forEach((t) => {
                  e ? this._loader.on(t, this._evtMap[t]) : this._loader.off(t, this._evtMap[t]);
                });
            }
            onLoadProgress(e) {
              const { chunk: t } = e.data,
                i = this._bufferChunks[this._bufferChunks.length - 1],
                n = {
                  buffer: t,
                  bufferLength: t.length,
                  startPosOnFile: i ? i.startPosOnFile + i.bufferLength : this._rangeStartPos,
                };
              this._bufferChunks.push(n), this.emit(_.PROGRESS);
            }
            onLoadEnd(e) {
              this.emit(_.END);
            }
            onLoadError(e) {
              this.emit(_.ERROR, e.data);
            }
          }
          class y extends l {
            constructor(e, t) {
              var i;
              super(e, t),
                (this._needSendWasmBuffer = !0),
                (this._sendChunkSize = 0),
                (this._sendChunkSize =
                  "vod" === (null === (i = this._videoConfig) || void 0 === i ? void 0 : i.type) ? 1048576 : 262144);
            }
            load(e, t) {
              var i, n;
              this._streamLoader && (this._streamLoader.destroy(), (this._streamLoader = null)),
                (this._streamLoader = new v()),
                this._streamLoader.on(_.PROGRESS, () => {
                  this.sendPartBufferToWasm(t);
                }),
                this._streamLoader.on(_.END, () => {
                  s.b.log("[streamProvider] streamLoader has been loaded, the url is " + e);
                }),
                this._streamLoader.on(_.ERROR, (e) => {
                  var t, i;
                  this.raiseInnerErr(
                    null === (t = e.data) || void 0 === t ? void 0 : t.code,
                    null === (i = e.data) || void 0 === i ? void 0 : i.message
                  );
                }),
                this._streamLoader.open(
                  e,
                  0,
                  (null === (i = this._videoConfig) || void 0 === i ? void 0 : i.fileSize) || 0,
                  (null === (n = this._videoConfig) || void 0 === n ? void 0 : n.type) || "vod"
                );
            }
            onRequestNewBufferCallback(e, t = -1, i = 0) {
              if (
                (s.b.log(`[streamProvider] onRequestNewBufferCallback: filenamePtr=0x${e.toString(16)}, seekPosOnFile=` + t),
                (this._needSendWasmBuffer = !0),
                1 !== i)
              )
                if (-1 === t) this.sendPartBufferToWasm(e);
                else {
                  const { bufferChunkOffsetIndex: i } = this._streamLoader.checkPosHasBuffered(t);
                  -1 !== i
                    ? (s.b.log("[streamProvider] onRequestNewBufferCallback::: case 1, in bufferbufferChunkOffsetIndex=" + i),
                      (this._streamLoader.bufferChunkOffsetIndex = i),
                      this.sendPartBufferToWasm(e))
                    : (s.b.log("[streamProvider] onRequestNewBufferCallback::: case 2, out of buffer="), this.reconnect(t));
                }
              else this.reconnect(t);
            }
            destroy() {
              this._streamLoader && (this._streamLoader.destroy(), (this._streamLoader = null)), super.destroy();
            }
            reconnect(e) {
              var t, i;
              this._streamLoader.open(
                this._streamLoader.url,
                e,
                (null === (t = this._videoConfig) || void 0 === t ? void 0 : t.fileSize) || 0,
                (null === (i = this._videoConfig) || void 0 === i ? void 0 : i.type) || "vod"
              );
            }
            sendPartBufferToWasm(e) {
              if (this._destroyed || !this._needSendWasmBuffer) return;
              const { spliceChunkCount: t = 0, totalChunkSize: i } = this._streamLoader.checkBuffer(this._sendChunkSize) || {};
              if (t <= 0) return;
              const n = this._streamLoader.bufferChunks[this._streamLoader.bufferChunkOffsetIndex].startPosOnFile,
                r = this._streamLoader.readBuffer(i, t),
                o = this._wasmApi.writeArrayBufferToWasm(r);
              this._streamLoader.fileSize > 0 && (this._videoConfig.fileSize = this._streamLoader.fileSize),
                s.b.log(
                  `[streamProvider] call Module._writeBuffer, offsetOnFile=${n}, bufferLen=${r.byteLength}, fileSize=${this._streamLoader.fileSize}`
                );
              const a = this._wasmApi.writeBufferToFFmpeg(e, o, n, r.byteLength, this._streamLoader.fileSize);
              s.b.log("[streamProvider] call Module._writeBuffer, ret: " + a), 0 === a && (this._needSendWasmBuffer = !1);
            }
          }
          class C {
            static cdnUrl2ffmpegUrl(e) {
              return e.replace(/^(blob:)?(https):\/\//, "$2js://$1");
            }
            static ffmpegUrl2CdnUrl(e) {
              return e.replace(/^(https?)js:\/\/(blob:)?/, "$2$1://");
            }
          }
          class b extends a.a {
            constructor(e, t) {
              super(), (this._wasmApi = e), (this._videoConfig = t), (this._providerMap = {});
            }
            httpjsOpenCallback(e) {
              const t = this.getUrlFromPtr(e);
              s.b.log("[HttpjsProtocol(js)] httpjsOpenCallback: ", t), this.createProvider(t, this._videoConfig).load(t, e);
            }
            httpjsCloseCallback(e) {
              const t = this.getUrlFromPtr(e);
              s.b.log("[HttpjsProtocol(js)] httpjsCloseCallback: ", t);
              const i = this._providerMap[t];
              i && (i.destroy(), delete this._providerMap[t]);
            }
            onRequestNewBufferCallback(e, t = -1, i = 0) {
              const n = this.getUrlFromPtr(e),
                r = this._providerMap[n];
              r && r.onRequestNewBufferCallback(e, t, i);
            }
            getUrlFromPtr(e) {
              const t = this._wasmApi.getStringFromWasm(e);
              return C.ffmpegUrl2CdnUrl(t);
            }
            createProvider(e, t) {
              this._providerMap[e] && (this._providerMap[e].destroy(), delete this._providerMap[e]);
              const i = (function (e) {
                  if (!e) return null;
                  const t = (function (e) {
                    if (!e) return null;
                    let t = e;
                    const i = t.indexOf("?");
                    i > 0 && (t = t.slice(0, i));
                    const n = t.lastIndexOf("/");
                    return n > 0 && (t = t.slice(n + 1, t.length)), t;
                  })(e);
                  if (t) {
                    const e = t.split(".");
                    if (e && e.length > 1) return e[e.length - 1];
                  }
                  return null;
                })(e),
                n = new ({ m3u8: f, ts: t.enableP2P ? g : m }[i] || y)(this._wasmApi, t);
              return n.on(u, this.onProviderEvts.bind(this)), (this._providerMap[e] = n), n;
            }
            onProviderEvts(e) {
              this.emit(e.type, e.data);
            }
            freeProviders() {
              this._providerMap &&
                Object.keys(this._providerMap).forEach((e) => {
                  this._providerMap[e].destroy();
                }),
                (this._providerMap = {});
            }
            destroy() {
              this.freeProviders(), this.removeAllListeners();
            }
          }
          class R {
            constructor(e, t) {
              (this.ctx = e),
                (this.config = t),
                (this._mainLoopTimerID = 0),
                (this._bufferedDuraionMs = 0),
                (this._videoStateInCpp = n.k.PLAYER_API_STATE_IDLE),
                (this._hasError = !1),
                this.initGlobalCallByCpp();
            }
            prepareDecParams(e, t) {
              const { linkvid: i } = e,
                n = i ? "vod" : "live";
              if ("vod" === n) {
                const { linkvid: t, base: i, appVer: n, tm: r, platform: s } = e,
                  o = this.writeStringToWasm(t),
                  a = this.writeStringToWasm(i),
                  c = this.writeStringToWasm(n);
                return this.ctx.Module._prepareDecParams(o, a, c, r, s), this.freePtr(o), this.freePtr(a), void this.freePtr(c);
              }
              if ("live" === n) {
                const { cnlid: t, baseKey: i, randoms: n } = e,
                  r = this.writeStringToWasm(t),
                  s = this.writeStringToWasm(i),
                  o = this.writeStringToWasm(n);
                this.ctx.Module._prepareLiveDecParams(r, s, o), this.freePtr(r), this.freePtr(s), this.freePtr(o);
              }
            }
            decData(e, t, i) {
              this.ctx.Module._decData(e, t, i);
            }
            seek(e) {
              this.ctx.Module._seekVideo(1e3 * e);
            }
            setRate(e) {
              this.ctx.Module._setRate(e);
            }
            pause() {
              this.ctx.Module._pauseVideo();
            }
            play(e) {
              const t = this.ctx.Module._playVideo();
              return +e > 0 && this.setRate(e), t;
            }
            load(e) {
              if ((s.b.log("[WasmCppBridge] call load, videoConfig=", e), !(null == e ? void 0 : e.url)))
                return this.ctx.Module._loadVideo(), void this.resetPlayer();
              this._hasError = !1;
              const { url: t, startTimeMs: i, decConfig: n, type: r } = e;
              this.setMainLoopTimer(!0), this.createProtocol(e), n && this.prepareDecParams(n, r);
              const o = C.cdnUrl2ffmpegUrl(t),
                a = this.writeStringToWasm(o);
              this.ctx.Module._setVideoDecoderThread(Number(this.config.decoderConcurrency)),
                this.ctx.Module._loadVideo(a, i),
                this.freePtr(a);
            }
            playAudioFrameOk() {
              this.ctx.Module._unlockReadAudioFrame();
            }
            playVideoFrameOk() {
              this.ctx.Module._unlockReadVideoFrame();
            }
            getBufferedDurationMs() {
              return this.ctx.Module._getBufferedDurationMs();
            }
            writeStringToWasm(e) {
              if (!e) return -1;
              const t = 4 * e.length + 4,
                i = this.ctx.Module._malloc(t);
              return (
                (function (e, t, i, n) {
                  if (!(n > 0)) return 0;
                  const r = i + n - 1;
                  for (let n = 0; n < e.length; ++n) {
                    let s = e.charCodeAt(n);
                    if ((s >= 55296 && s <= 57343 && (s = (65536 + ((1023 & s) << 10)) | (1023 & e.charCodeAt(++n))), s <= 127)) {
                      if (i >= r) break;
                      t[i++] = s;
                    } else if (s <= 2047) {
                      if (i + 1 >= r) break;
                      (t[i++] = 192 | (s >> 6)), (t[i++] = 128 | (63 & s));
                    } else if (s <= 65535) {
                      if (i + 2 >= r) break;
                      (t[i++] = 224 | (s >> 12)), (t[i++] = 128 | ((s >> 6) & 63)), (t[i++] = 128 | (63 & s));
                    } else {
                      if (i + 3 >= r) break;
                      s >= 2097152 &&
                        console.warn(
                          `Invalid Unicode code point 0x${s.toString(
                            16
                          )} encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x1FFFFF).`
                        ),
                        (t[i++] = 240 | (s >> 18)),
                        (t[i++] = 128 | ((s >> 12) & 63)),
                        (t[i++] = 128 | ((s >> 6) & 63)),
                        (t[i++] = 128 | (63 & s));
                    }
                  }
                  t[i] = 0;
                })(e, this.heapU8, i, t),
                i
              );
            }
            writeArrayBufferToWasm(e) {
              const t = this.malloc(e.byteLength);
              return t <= 0
                ? (s.b.error("[WasmCppBridge] writeArrayBufferToWasm failed, wasmBufferPtr <= 0"), null)
                : (this.heapU8.set(e, t), t);
            }
            writeBufferToFFmpeg(e, t, i, n, r) {
              return this.ctx.Module._writeFFmpegBuffer(e, t, i, n, r);
            }
            freePtr(e) {
              this.ctx.Module._free(e);
            }
            malloc(e) {
              return this.ctx.Module._malloc(e);
            }
            mailToFakeVideo(e, t) {
              return this.ctx.mailToFakeVideo(e, t);
            }
            get heapU8() {
              return this.ctx.Module.GROWABLE_HEAP_U8();
            }
            getStringFromWasm(e) {
              return (function (e, t, i) {
                const n = t + void 0;
                let r = "";
                for (; !(t >= n); ) {
                  let i = e[t++];
                  if (!i) return r;
                  if (!(128 & i)) {
                    r += String.fromCharCode(i);
                    continue;
                  }
                  const n = 63 & e[t++];
                  if (192 == (224 & i)) {
                    r += String.fromCharCode(((31 & i) << 6) | n);
                    continue;
                  }
                  const s = 63 & e[t++];
                  if (
                    (224 == (240 & i)
                      ? (i = ((15 & i) << 12) | (n << 6) | s)
                      : (240 != (248 & i) &&
                          console.warn(
                            `Invalid UTF-8 leading byte 0x${i.toString(
                              16
                            )} encountered when deserializing a UTF-8 string in wasm memory to a JS string!`
                          ),
                        (i = ((7 & i) << 18) | (n << 12) | (s << 6) | (63 & e[t++]))),
                    i < 65536)
                  )
                    r += String.fromCharCode(i);
                  else {
                    const e = i - 65536;
                    r += String.fromCharCode(55296 | (e >> 10), 56320 | (1023 & e));
                  }
                }
                return r;
              })(this.heapU8, e);
            }
            initGlobalCallByCpp() {
              (this.ctx.workerScope.onVideoFrameCallback = this.onVideoFrameCallback.bind(this)),
                (this.ctx.workerScope.onAudioFrameCallback = this.onAudioFrameCallback.bind(this)),
                (this.ctx.workerScope.onErrorCallback = this.onErrorCallback.bind(this)),
                (this.ctx.workerScope.onMetadataCallback = this.onMetadataCallback.bind(this)),
                (this.ctx.workerScope.onPlayerStateChange = this.onPlayerStateChange.bind(this)),
                (this.ctx.workerScope.httpjsOpenCallback = this.httpjsOpenCallback.bind(this)),
                (this.ctx.workerScope.httpjsCloseCallback = this.httpjsCloseCallback.bind(this)),
                (this.ctx.workerScope.onRequestNewBufferCallback = this.onRequestNewBufferCallback.bind(this)),
                (this.ctx.workerScope.onBufferStateCallback = this.onBufferStateCallback.bind(this)),
                (this.ctx.workerScope.onSeekStateCallback = this.onSeekStateCallback.bind(this)),
                (this.ctx.workerScope.onEndedCallback = this.onEndedCallback.bind(this));
            }
            raiseInnerErr(e, t) {
              s.b.log(`[WasmCppBridge] raiseInnerErr, code=${e}, message=${t}`), (this._hasError = !0), this.load();
              const i = { cmd: n.b.CALL_MAIN_ERROR, code: e, message: t };
              this.ctx.mailToFakeVideo(i);
            }
            onErrorCallback(e) {
              this.raiseInnerErr(n.d.RUNTIME, `${n.e.PLAY_CORE_ERR}[${e}]`);
            }
            onMetadataCallback(e, t, i, r, s, o, a, c, h) {
              const u = {
                cmd: n.b.CALL_MAIN_UDPATE_METADATA,
                audioCodecName: n.c[i] || "unknown",
                videoCodecName: n.c[o] || "unknown",
                audioBitRate: e,
                videoBitRate: r,
                videoFrameRate: s,
                duration: +(h / 1e3).toFixed(2),
                videoWidth: a,
                videoHeight: c,
                audioSampleRate: t,
              };
              this.ctx.mailToFakeVideo(u);
            }
            onVideoFrameCallback(e, t, i, r, s, o, a, c, h, u) {
              const l = this.heapU8,
                d = l.subarray(e, e + r * h),
                f = l.subarray(t, t + (s * h) / 2),
                _ = l.subarray(i, i + (o * h) / 2),
                p = new Uint8Array(d).buffer,
                m = new Uint8Array(f).buffer,
                g = new Uint8Array(_).buffer,
                E = {
                  cmd: n.b.CALL_MAIN_REV_VIDEO_FRAME,
                  dataYPtr: e,
                  dataUPtr: t,
                  dataVPtr: i,
                  dataYSize: r,
                  dataUSize: s,
                  dataVSize: o,
                  ptsMs: a,
                  videoWidth: c,
                  videoHeight: h,
                  decodeCostTimeMs: u,
                  dataY: p,
                  dataU: m,
                  dataV: g,
                };
              this.ctx.mailToFakeVideo(E, [p, m, g]);
            }
            onAudioFrameCallback(e, t, i, r, s, o, a, c) {
              const h = this.heapU8.subarray(e, e + t),
                u = new Uint8Array(h).buffer,
                l = {
                  cmd: n.b.CALL_MAIN_REV_AUDIO_FRAME,
                  dataPtr: e,
                  pktSize: t,
                  ptsMs: i,
                  durationMs: r,
                  format: s,
                  sampleRate: o,
                  channels: a,
                  data: u,
                  playtime: c,
                };
              this.ctx.mailToFakeVideo(l, [u]);
            }
            onPlayerStateChange(e) {
              (this._videoStateInCpp = e),
                s.b.log("[WasmCppBridge] onPlayerStateChange, state=" + e),
                this.innerStateChangeHandler(e);
              const t = { cmd: n.b.CALL_MAIN_STATE_CHANGE, state: this._videoStateInCpp };
              this.ctx.mailToFakeVideo(t);
            }
            httpjsOpenCallback(e) {
              var t;
              this._hasError || null === (t = this._httpjsProtocol) || void 0 === t || t.httpjsOpenCallback(e);
            }
            httpjsCloseCallback(e) {
              var t;
              null === (t = this._httpjsProtocol) || void 0 === t || t.httpjsCloseCallback(e);
            }
            onRequestNewBufferCallback(e, t = -1, i = 0) {
              var n;
              null === (n = this._httpjsProtocol) || void 0 === n || n.onRequestNewBufferCallback(e, t, i);
            }
            onBufferStateCallback(e) {
              const t = { cmd: n.b.CALL_MAIN_BUFFER_STATE_CHANGE, isBuffering: e };
              this.ctx.mailToFakeVideo(t);
            }
            onSeekStateCallback(e) {
              const t = { cmd: n.b.CALL_MAIN_SEEK_STATE_CHANGE, isSeeking: e };
              this.ctx.mailToFakeVideo(t);
            }
            onEndedCallback() {
              const e = { cmd: n.b.CALL_MAIN_ENDED };
              this.ctx.mailToFakeVideo(e);
            }
            resetPlayer() {
              this.freeProtocol(), this.setMainLoopTimer(!1);
            }
            innerStateChangeHandler(e) {
              e === n.k.PLAYER_API_STATE_IDLE && this.resetPlayer();
            }
            setMainLoopTimer(e) {
              this._mainLoopTimerID > 0 && (self.clearInterval(this._mainLoopTimerID), (this._mainLoopTimerID = 0)),
                e &&
                  (this._mainLoopTimerID = self.setInterval(() => {
                    const e = this.getBufferedDurationMs();
                    this.syncBufferDuration(this._bufferedDuraionMs), (this._bufferedDuraionMs = e);
                  }, 200));
            }
            createProtocol(e) {
              this.freeProtocol(),
                (this._httpjsProtocol = new b(this, e)),
                this._httpjsProtocol.on(u, this.onProtocolError.bind(this));
            }
            freeProtocol() {
              this._httpjsProtocol && (this._httpjsProtocol.destroy(), (this._httpjsProtocol = null));
            }
            onProtocolError(e) {
              var t, i;
              this.raiseInnerErr(
                null === (t = e.data) || void 0 === t ? void 0 : t.code,
                null === (i = e.data) || void 0 === i ? void 0 : i.message
              );
            }
            syncBufferDuration(e) {
              const t = { cmd: n.b.CALL_MAIN_SYNC_BUFFER_DURATION, bufferedDurationMs: e };
              this.ctx.mailToFakeVideo(t);
            }
          }
          /*! *****************************************************************************
            Copyright (c) Microsoft Corporation.
            
            Permission to use, copy, modify, and/or distribute this software for any
            purpose with or without fee is hereby granted.
            
            THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
            REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
            AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
            INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
            LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
            OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
            PERFORMANCE OF THIS SOFTWARE.
            ***************************************************************************** */ var T = function () {
            return (T =
              Object.assign ||
              function (e) {
                for (var t, i = 1, n = arguments.length; i < n; i++)
                  for (var r in (t = arguments[i])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e;
              }).apply(this, arguments);
          };
          function A(e, t, i, n) {
            return new (i || (i = Promise))(function (r, s) {
              function o(e) {
                try {
                  c(n.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function a(e) {
                try {
                  c(n.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? r(e.value)
                  : ((t = e.value),
                    t instanceof i
                      ? t
                      : new i(function (e) {
                          e(t);
                        })).then(o, a);
              }
              c((n = n.apply(e, t || [])).next());
            });
          }
          function N(e, t) {
            var i,
              n,
              r,
              s,
              o = {
                label: 0,
                sent: function () {
                  if (1 & r[0]) throw r[1];
                  return r[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (s = { next: a(0), throw: a(1), return: a(2) }),
              "function" == typeof Symbol &&
                (s[Symbol.iterator] = function () {
                  return this;
                }),
              s
            );
            function a(s) {
              return function (a) {
                return (function (s) {
                  if (i) throw new TypeError("Generator is already executing.");
                  for (; o; )
                    try {
                      if (
                        ((i = 1),
                        n &&
                          (r = 2 & s[0] ? n.return : s[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) &&
                          !(r = r.call(n, s[1])).done)
                      )
                        return r;
                      switch (((n = 0), r && (s = [2 & s[0], r.value]), s[0])) {
                        case 0:
                        case 1:
                          r = s;
                          break;
                        case 4:
                          return o.label++, { value: s[1], done: !1 };
                        case 5:
                          o.label++, (n = s[1]), (s = [0]);
                          continue;
                        case 7:
                          (s = o.ops.pop()), o.trys.pop();
                          continue;
                        default:
                          if (!((r = (r = o.trys).length > 0 && r[r.length - 1]) || (6 !== s[0] && 2 !== s[0]))) {
                            o = 0;
                            continue;
                          }
                          if (3 === s[0] && (!r || (s[1] > r[0] && s[1] < r[3]))) {
                            o.label = s[1];
                            break;
                          }
                          if (6 === s[0] && o.label < r[1]) {
                            (o.label = r[1]), (r = s);
                            break;
                          }
                          if (r && o.label < r[2]) {
                            (o.label = r[2]), o.ops.push(s);
                            break;
                          }
                          r[2] && o.ops.pop(), o.trys.pop();
                          continue;
                      }
                      s = t.call(e, o);
                    } catch (e) {
                      (s = [6, e]), (n = 0);
                    } finally {
                      i = r = 0;
                    }
                  if (5 & s[0]) throw s[1];
                  return { value: s[0] ? s[1] : void 0, done: !0 };
                })([s, a]);
              };
            }
          }
          function P() {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
            var n = Array(e),
              r = 0;
            for (t = 0; t < i; t++) for (var s = arguments[t], o = 0, a = s.length; o < a; o++, r++) n[r] = s[o];
            return n;
          }
          var S = (function () {
              function e() {
                (this.isLock = !1), (this.data = []), (this.buffer = []);
              }
              return (
                (e.prototype.push = function (e) {
                  var t = Date.now(),
                    i = T(T({}, e), { _date: t });
                  this.isLock ? this.buffer.push(i) : this.data.push(i);
                }),
                (e.prototype.lock = function () {
                  this.isLock = !0;
                }),
                (e.prototype.unlock = function (e) {
                  void 0 === e && (e = !0),
                    e && (this.data = []),
                    (this.isLock = !1),
                    (this.data = P(this.data, this.buffer)),
                    (this.buffer = []);
                }),
                (e.prototype.count = function () {
                  return this.data.length;
                }),
                (e.prototype.getData = function () {
                  return P(this.data);
                }),
                (e.prototype.waitExec = function (e, t) {
                  void 0 === e && (e = 500),
                    this.isLock ||
                      (clearTimeout(this.timer),
                      (this.timer = setTimeout(function () {
                        t();
                      }, e)));
                }),
                e
              );
            })(),
            w = Math.pow(2, 52),
            L = (function () {
              function e(e) {
                (this.queueMap = {}), (this.config = e);
              }
              return (
                (e.prototype.canUseDB = function () {
                  return !!indexedDB;
                }),
                (e.prototype.open = function (e) {
                  var t = this;
                  return new Promise(function (i, n) {
                    if (!t.canUseDB()) return n({ type: 3 });
                    var r = t.config,
                      s = r.name,
                      o = r.version,
                      a = r.stores,
                      c = indexedDB.open(s, o);
                    (t.storeName = e),
                      (c.onsuccess = function () {
                        (t.db = c.result), t.removeExpiresData(), t.removeLimitData(), i();
                      }),
                      (c.onerror = function (e) {
                        n({ type: 1, event: e });
                      }),
                      (c.onupgradeneeded = function () {
                        t.db = c.result;
                        try {
                          null == a ||
                            a.forEach(function (e) {
                              t.createStore(e);
                            });
                        } catch (e) {
                          n({ type: 2, error: e });
                        }
                      });
                  });
                }),
                (e.prototype.close = function () {
                  var e;
                  null === (e = this.db) || void 0 === e || e.close(), (this.db = null);
                }),
                (e.prototype.useStore = function (e) {
                  this.storeName = e;
                }),
                (e.prototype.add = function (e) {
                  var t = this,
                    i = this.config,
                    n = i.gapTime,
                    r = void 0 === n ? 500 : n,
                    s = i.flushNum,
                    o = void 0 === s ? 50 : s,
                    a = this.getQueue();
                  a.push(e),
                    a.count() >= o
                      ? this.flush()
                      : a.waitExec(r, function () {
                          t.flush();
                        });
                }),
                (e.prototype.getAll = function () {
                  return A(this, void 0, void 0, function () {
                    var e = this;
                    return N(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [4, this.waitOpen()];
                        case 1:
                          return (
                            t.sent(),
                            [
                              2,
                              new Promise(function (t, i) {
                                var n = e.getStore("readonly").openCursor(),
                                  r = [];
                                (n.onsuccess = function () {
                                  var e;
                                  if (null === (e = n.result) || void 0 === e ? void 0 : e.value) {
                                    var i = n.result.value;
                                    r.push(i), n.result.continue();
                                  } else t(r);
                                }),
                                  (n.onerror = i);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.getLastRecord = function () {
                  return this.getRecord("prev");
                }),
                (e.prototype.getFirstRecord = function () {
                  return this.getRecord("next");
                }),
                (e.prototype.getCount = function () {
                  return A(this, void 0, void 0, function () {
                    var e = this;
                    return N(this, function (t) {
                      switch (t.label) {
                        case 0:
                          return [4, this.waitOpen()];
                        case 1:
                          return (
                            t.sent(),
                            [
                              2,
                              new Promise(function (t, i) {
                                var n = e.getStore("readonly").count();
                                (n.onsuccess = function () {
                                  return t(n.result);
                                }),
                                  (n.onerror = i);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.clear = function (e) {
                  var t = this;
                  return (
                    void 0 === e && (e = 0.25),
                    e >= 1
                      ? new Promise(function (e, i) {
                          var n = t.getStore("readwrite").clear();
                          (n.onsuccess = e), (n.onerror = i);
                        })
                      : Promise.all([this.getFirstRecord(), this.getLastRecord()]).then(function (i) {
                          var n = i[0],
                            r = i[1];
                          if (n && r) {
                            var s = Math.floor((r._id - n._id) * e + n._id);
                            return t.removeDataBelowIndex("_id", s);
                          }
                        })
                  );
                }),
                (e.prototype.put = function (e, t) {
                  return A(this, void 0, void 0, function () {
                    var i;
                    return N(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return [4, this.flush(1)];
                        case 1:
                          return (
                            n.sent(),
                            (i = this.getStore("readwrite")),
                            [
                              2,
                              new Promise(function (n, r) {
                                var s = i.put(T(T({}, e), { _date: Date.now() }), t);
                                (s.onsuccess = function (e) {
                                  n(s.result);
                                }),
                                  (s.onerror = r);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.get = function (e, t) {
                  return A(this, void 0, void 0, function () {
                    var i;
                    return N(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return [4, this.flush(1)];
                        case 1:
                          return (
                            n.sent(),
                            (i = this.getStore("readwrite")),
                            [
                              2,
                              new Promise(function (n, r) {
                                var s = i.index(e).get(t);
                                (s.onsuccess = function (e) {
                                  n(s.result);
                                }),
                                  (s.onerror = r);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.removeDataBelowIndex = function (e, t) {
                  return A(this, void 0, void 0, function () {
                    var i = this;
                    return N(this, function (n) {
                      switch (n.label) {
                        case 0:
                          return [4, this.waitOpen()];
                        case 1:
                          return (
                            n.sent(),
                            [
                              2,
                              new Promise(function (n, r) {
                                var s = i.getStore("readwrite").index(e),
                                  o = IDBKeyRange.upperBound(t, !0),
                                  a = s.openCursor(o),
                                  c = 0;
                                (a.onsuccess = function (e) {
                                  var t = e.target.result;
                                  t ? ((c += 1), t.delete(), t.continue()) : n(c);
                                }),
                                  (a.onerror = r);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.waitOpen = function () {
                  return A(this, void 0, void 0, function () {
                    return N(this, function (e) {
                      switch (e.label) {
                        case 0:
                          return this.db ? [3, 2] : [4, this.open(this.storeName)];
                        case 1:
                          e.sent(), (e.label = 2);
                        case 2:
                          return [2];
                      }
                    });
                  });
                }),
                (e.prototype.getStore = function (e) {
                  var t;
                  return (
                    void 0 === e && (e = "readonly"),
                    null === (t = this.db) || void 0 === t ? void 0 : t.transaction(this.storeName, e).objectStore(this.storeName)
                  );
                }),
                (e.prototype.removeExpiresData = function () {
                  var e = this.config.expires;
                  if (e && e > 0) {
                    var t = Date.now() - 24 * e * 60 * 60 * 1e3;
                    return this.removeDataBelowIndex("_date", t);
                  }
                }),
                (e.prototype.removeLimitData = function () {
                  return A(this, void 0, void 0, function () {
                    var e, t, i, n, r, s;
                    return N(this, function (o) {
                      switch (o.label) {
                        case 0:
                          return (
                            (e = this.config),
                            (t = e.limitNum),
                            (i = e.deleteGap),
                            (n = void 0 === i ? 10 : i),
                            t ? [4, this.getCount()] : [2]
                          );
                        case 1:
                          return o.sent() <= t ? [2] : [4, this.getLastRecord()];
                        case 2:
                          return (r = o.sent()) ? ((s = r._id - t + n), [2, this.removeDataBelowIndex("_id", s)]) : [2];
                      }
                    });
                  });
                }),
                (e.prototype.flush = function (e) {
                  return (
                    void 0 === e && (e = 2),
                    A(this, void 0, void 0, function () {
                      var t = this;
                      return N(this, function (i) {
                        switch (i.label) {
                          case 0:
                            return [4, this.waitOpen()];
                          case 1:
                            return (
                              i.sent(),
                              [
                                2,
                                new Promise(function (i, n) {
                                  var r = t.getQueue();
                                  if (!t.db || !r.count() || r.isLock) return i();
                                  var s = t.db.transaction(t.storeName, "readwrite"),
                                    o = s.objectStore(t.storeName);
                                  r.getData().forEach(function (e) {
                                    return o.add(e);
                                  }),
                                    r.lock(),
                                    (s.oncomplete = function () {
                                      r.unlock(), t.removeLimitData(), i();
                                    }),
                                    (s.onerror = function (s) {
                                      return A(t, void 0, void 0, function () {
                                        var t, o, a;
                                        return N(this, function (c) {
                                          switch (c.label) {
                                            case 0:
                                              return "QuotaExceededError" ===
                                                (null === (a = null === (o = s.target) || void 0 === o ? void 0 : o.error) ||
                                                void 0 === a
                                                  ? void 0
                                                  : a.name) && e
                                                ? ((t = this.config.deletePercent), this.clear(t), [2, this.flush(e - 1).then(i)])
                                                : [4, this.resetId()];
                                            case 1:
                                              return c.sent()
                                                ? [2, this.flush(e - 1).then(i)]
                                                : (r.unlock(!1), n({ type: 5, event: s }), [2]);
                                          }
                                        });
                                      });
                                    });
                                }),
                              ]
                            );
                        }
                      });
                    })
                  );
                }),
                (e.prototype.getRecord = function (e) {
                  return A(this, void 0, void 0, function () {
                    var t = this;
                    return N(this, function (i) {
                      switch (i.label) {
                        case 0:
                          return [4, this.waitOpen()];
                        case 1:
                          return (
                            i.sent(),
                            [
                              2,
                              new Promise(function (i, n) {
                                var r = t.getStore("readonly").openCursor(null, e);
                                (r.onsuccess = function () {
                                  var e,
                                    t = null === (e = r.result) || void 0 === e ? void 0 : e.value;
                                  i(t);
                                }),
                                  (r.onerror = n);
                              }),
                            ]
                          );
                      }
                    });
                  });
                }),
                (e.prototype.getQueue = function () {
                  return (
                    this.queueMap[this.storeName] || (this.queueMap[this.storeName] = new S()), this.queueMap[this.storeName]
                  );
                }),
                (e.prototype.resetId = function () {
                  return A(this, void 0, void 0, function () {
                    var e, t, i, n;
                    return N(this, function (r) {
                      switch (r.label) {
                        case 0:
                          return [4, this.getLastRecord()];
                        case 1:
                          return (e = r.sent()), w < e._id && this.db ? [4, this.getAll()] : [3, 3];
                        case 2:
                          return (
                            (t = r.sent()),
                            (i = this.db.transaction(this.storeName, "readwrite")),
                            (n = i.objectStore(this.storeName)),
                            t.forEach(function (e, t) {
                              return n.put({ data: e, _id: t + 1 });
                            }),
                            [
                              2,
                              new Promise(function (e, t) {
                                (i.oncomplete = function () {
                                  return e(!0);
                                }),
                                  (i.onerror = function (e) {
                                    return t(e);
                                  });
                              }),
                            ]
                          );
                        case 3:
                          return [2, Promise.resolve(!1)];
                      }
                    });
                  });
                }),
                (e.prototype.createStore = function (e) {
                  var t = e.name,
                    i = e.indexes,
                    n = void 0 === i ? [] : i;
                  if (this.db) {
                    this.db.objectStoreNames.contains(t) && this.db.deleteObjectStore(t);
                    var r = this.db.createObjectStore(t, { keyPath: "_id", autoIncrement: !0 }),
                      s = ["_id", "_date"];
                    n
                      .filter(function (e) {
                        return !(-1 !== s.indexOf(e.indexName));
                      })
                      .forEach(function (e) {
                        r.createIndex(e.indexName, e.keyPath, { unique: !!e.unique });
                      }),
                      s.forEach(function (e) {
                        return r.createIndex(e, e);
                      });
                  }
                }),
                e
              );
            })(),
            M = function (e, t, i, n) {
              return new (i || (i = Promise))(function (r, s) {
                function o(e) {
                  try {
                    c(n.next(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function a(e) {
                  try {
                    c(n.throw(e));
                  } catch (e) {
                    s(e);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? r(e.value)
                    : ((t = e.value),
                      t instanceof i
                        ? t
                        : new i(function (e) {
                            e(t);
                          })).then(o, a);
                }
                c((n = n.apply(e, t || [])).next());
              });
            };
          class O {
            constructor(e, t) {
              (this.ctx = e),
                (this._cacheTimer = null),
                (this._config = t),
                this.initOfflineWriter(this._config),
                this.initWasm(this._config);
            }
            initOfflineWriter(e) {
              return M(this, void 0, void 0, function* () {
                this._offlineCache = new L({
                  name: "_thumbplayer_wasmbinary_1",
                  version: 1,
                  stores: [{ name: "wasmbinary", indexes: [{ indexName: "_feat", keyPath: "_feat", unique: !0 }] }],
                });
                try {
                  o.d.start(o.e.WORKER_DB_OPEN_COST), yield this._offlineCache.open("wasmbinary");
                } catch (e) {
                  s.b.warn("Wasm Runtime error: open db failed");
                } finally {
                  o.d.end(o.e.WORKER_DB_OPEN_COST, this.ctx.metrics);
                }
              });
            }
            initWasm(e) {
              return M(this, void 0, void 0, function* () {
                const { featType: t } = e,
                  i = `${e.baseUrl}/wasm${t}/${n.l[t]}`,
                  r = `${i}/TPCore-wasm${t}.js`,
                  a = `${i}/TPCore-wasm${t}.wasm`,
                  c = +new Date();
                o.d.start(o.e.WORKER_EM_INIT_COST);
                const h = this.raiseInnerErr.bind(this);
                this.ctx.setModule({
                  preRun: [],
                  postRun: [],
                  locateFile: (e) => `${i}/${e}`,
                  instantiateWasm: (e, t) =>
                    M(this, void 0, void 0, function* () {
                      o.d.start(o.e.WORKER_WASM_INIT_COST);
                      const i = yield WebAssembly.instantiate(this._wasmBinary, e);
                      o.d.end(o.e.WORKER_WASM_INIT_COST, this.ctx.metrics), t(i.instance, i.module);
                    }),
                  mainScriptUrlOrBlob: r,
                  print(...e) {
                    console.log.apply(null, [].concat(e));
                  },
                  printErr: console.error,
                  onRuntimeInitialized: () => {
                    this.onRuntimeInitialized(+new Date() - c);
                  },
                  onAbort(e) {
                    s.b.error(e), h(n.d.EMSCRIPTEN_RUNTIME_ERROR, n.e.EMSCRIPTEN_RUNTIME_ERROR);
                  },
                });
                try {
                  o.d.start(o.e.WORKER_WASM_DOWNLOAD_COST),
                    yield this.getWasmBinary(a, e),
                    o.d.end(o.e.WORKER_WASM_DOWNLOAD_COST, this.ctx.metrics),
                    o.d.start(o.e.WORKER_EM_JS_DOWNLOAD_COST),
                    yield this.loadAndSetInlineWasmScript(i, r),
                    o.d.end(o.e.WORKER_EM_JS_DOWNLOAD_COST, this.ctx.metrics);
                } catch (e) {
                  s.b.log("[WasmRuntimeCreater] getWasmBinary err: ", e),
                    this.raiseInnerErr(n.d.INIT_WASM_MODULE, n.e.INIT_WASM_MODULE);
                }
              });
            }
            loadAndSetInlineWasmScript(e, t) {
              return M(this, void 0, void 0, function* () {
                let e;
                try {
                  e = yield h({ url: t + "?max_age=86400", retryCount: 2, responseType: "text" });
                } catch (e) {
                  const t = e;
                  return (
                    s.b.log("[WasmRuntimeCreater] loadAndSetInlineWasmScript, wasmMainScript err: ", t),
                    void this.raiseInnerErr(n.d.LOAD_WASM_MAIN_SCRIPT, n.e.LOAD_WASM_SCRIPT)
                  );
                }
                const i = new Blob([e.data], { type: "application/javascript" }),
                  r = URL.createObjectURL(i);
                this.ctx.workerScope.importScripts(r), (this.ctx.Module.mainScriptUrlOrBlob = i);
              });
            }
            onRuntimeInitialized(e) {
              o.d.end(o.e.WORKER_EM_INIT_COST, this.ctx.metrics),
                s.b.log("[WasmRuntimeCreater] onRuntimeInitialized, cost time=", e),
                this.ctx.Module._initPlayer(+this._config.wasmLogLevel);
              const t = { cmd: n.b.CALL_MAIN_INIT_WORKER_OVER, initWasmCostTime: e };
              this.ctx.mailToFakeVideo(t);
            }
            getWasmBinary(e, t) {
              return M(this, void 0, void 0, function* () {
                const { featType: i, closeIndexdb: n } = t;
                if ("true" === n) return (this.ctx.metrics.workerUseDbCache = !1), this.getWasmBinaryByXHR(e);
                const { isHitCache: r, cacheData: s } = yield this.getWasmBinaryByIDB(i);
                (this.ctx.metrics.workerUseDbCache = r),
                  r || (yield this.getWasmBinaryByXHR(e), this.cacheWasmBinary(this._wasmBinary, i, s));
              });
            }
            getWasmBinaryByXHR(e) {
              return M(this, void 0, void 0, function* () {
                try {
                  const t = yield h({ url: e + "?max_age=86400", retryCount: 2, responseType: "arraybuffer" });
                  (this._wasmBinary = t.data), (this.ctx.Module.wasmBinary = this._wasmBinary);
                } catch (e) {
                  return (
                    s.b.log("[WasmRuntimeCreater] loadAndSetInlineWasmScript, wasmSpawnWorkerJs err: ", e),
                    void this.raiseInnerErr(n.d.LOAD_WASM, n.e.LOAD_WASM_SCRIPT)
                  );
                }
              });
            }
            getWasmBinaryByIDB(e) {
              return M(this, void 0, void 0, function* () {
                try {
                  const t = yield Promise.race([
                    this._offlineCache.get("_feat", e),
                    new Promise((e, t) => {
                      this._cacheTimer = setTimeout(() => {
                        (this.ctx.metrics.workerDBOpenCostMs = o.c), t(new Error("get wasm binary from idb timeout"));
                      }, 1e3);
                    }),
                  ]);
                  clearTimeout(this._cacheTimer), (this._cacheTimer = null);
                  const i = t && n.l[e] === t.hash;
                  return (
                    i && ((this._wasmBinary = t.data), (this.ctx.Module.wasmBinary = this._wasmBinary)),
                    { isHitCache: i, cacheData: t }
                  );
                } catch (e) {
                  return s.b.warn("[WasmRuntimeCreater] getWasmBinaryByIDB failed: " + e), { isHitCache: !1, cacheData: {} };
                }
              });
            }
            cacheWasmBinary(e, t) {
              return M(this, arguments, void 0, function* (e, t, i = {}) {
                var r;
                try {
                  yield this._offlineCache.put(Object.assign(Object.assign({}, i), { _feat: t, data: e, hash: n.l[t] })),
                    s.b.log("[WasmRuntimeCreater] cache wasm succ");
                } catch (e) {
                  s.b.log(
                    "[WasmRuntimeCreater] cache wasm fail, ",
                    null === (r = null == e ? void 0 : e.target) || void 0 === r ? void 0 : r.error
                  );
                }
              });
            }
            raiseInnerErr(e, t) {
              const i = { cmd: n.b.CALL_MAIN_ERROR, code: e, message: t };
              this.ctx.mailToFakeVideo(i);
            }
          }
          class I {
            constructor(e) {
              (this._selfAlias = e),
                (this.workerContext = null),
                (this.workerMetrics = Object.assign({}, o.b)),
                (this.mailToFakeVideo = (e, t) => {
                  this._selfAlias.postMessage(Object.assign({ timestamp: Object(r.a)() }, e), t);
                }),
                (this.syncAllMetrics = () => {
                  const e = { cmd: n.b.CALL_MAIN_SYNC_METRIC, metrics: this.workerMetrics };
                  this.mailToFakeVideo(e);
                }),
                (this._selfAlias.onmessage = (e) => {
                  const t = Object(r.a)(),
                    { data: i } = e,
                    { cmd: o } = i;
                  switch (
                    (-1 === [n.b.CALL_WORKER_PLAY_VIDEO_FRAME_OK, n.b.CALL_WORKER_PLAY_AUDIO_FRAME_OK].indexOf(o) &&
                      s.b.log("[FakeVideoElementWorker] worker get main cmd, ", o),
                    (this.workerMetrics.workerMailCount += 1),
                    (this.workerMetrics.workerMailCostMs = Math.max(t - i.timestamp, 0)),
                    o)
                  ) {
                    case n.b.CALL_WORKER_INIT_WORKER:
                      this.initWorker(i);
                      break;
                    case n.b.CALL_WORKER_LOAD:
                      this._wasmCppBridge.load(i.videoConfig);
                      break;
                    case n.b.CALL_WORKER_PLAY:
                      this._wasmCppBridge.play(i.playbackRate);
                      break;
                    case n.b.CALL_WORKER_PAUSE:
                      this._wasmCppBridge.pause();
                      break;
                    case n.b.CALL_WORKER_SEEK:
                      this._wasmCppBridge.seek(i.timeS);
                      break;
                    case n.b.CALL_WORKER_SET_RATE:
                      this._wasmCppBridge.setRate(i.rate);
                      break;
                    case n.b.CALL_WORKER_PLAY_AUDIO_FRAME_OK:
                      this._wasmCppBridge.playAudioFrameOk();
                      break;
                    case n.b.CALL_WORKER_PLAY_VIDEO_FRAME_OK:
                      this._wasmCppBridge.playVideoFrameOk();
                      break;
                    case n.b.CALL_WORKER_SYNC_METRICS:
                      this.syncAllMetrics();
                  }
                });
            }
            initWorker(e) {
              "true" === e.openLog && Object(s.a)(!0);
              const t = this.createContext();
              (this._wasmCppBridge = new R(t, e)), (this._wasmRuntimeCreator = new O(t, e)), (this.workerContext = t);
            }
            createContext() {
              const { _selfAlias: e, mailToFakeVideo: t } = this;
              return {
                mailToFakeVideo: t,
                Module: null,
                workerScope: e,
                metrics: this.workerMetrics,
                setModule(t) {
                  (e.Module = t), (this.Module = t);
                },
              };
            }
          }
        },
        function (e, t, i) {
          "use strict";
          i.r(t),
            i.d(t, "CDN_PATH", function () {
              return n.a;
            }),
            i.d(t, "SAB_STR", function () {
              return n.j;
            }),
            i.d(t, "WASM_HASH_MAP", function () {
              return n.l;
            }),
            i.d(t, "MAX_PLAYBACK_RATE", function () {
              return n.h;
            }),
            i.d(t, "MIN_PLAYBACK_RATE", function () {
              return n.i;
            }),
            i.d(t, "fakeVideoDefaultConfig", function () {
              return n.m;
            }),
            i.d(t, "CODEC_ID", function () {
              return n.c;
            }),
            i.d(t, "ERROR_CODE", function () {
              return n.d;
            }),
            i.d(t, "ERROR_MSG", function () {
              return n.e;
            }),
            i.d(t, "GENERAL_ERROR_MSG", function () {
              return n.g;
            }),
            i.d(t, "FAKE_VIDEO_ELEMENT_EVENT", function () {
              return n.f;
            }),
            i.d(t, "VIDEO_STATE_IN_CPP", function () {
              return n.k;
            }),
            i.d(t, "CMD", function () {
              return n.b;
            }),
            i.d(t, "FakeVideoElement", function () {
              return me;
            }),
            i.d(t, "enableLogs", function () {
              return a.a;
            }),
            i.d(t, "logger", function () {
              return a.b;
            }),
            i.d(t, "parseUrl", function () {
              return ve;
            }),
            i.d(t, "FakeVideoEvent", function () {
              return o;
            }),
            i.d(t, "SimpleDefer", function () {
              return c;
            }),
            i.d(t, "TimeoutDefer", function () {
              return h;
            }),
            i.d(t, "DeferQueue", function () {
              return u;
            }),
            i.d(t, "PROMISE_STATE", function () {
              return l;
            }),
            i.d(t, "FakeTimeRanges", function () {
              return d;
            }),
            i.d(t, "isEnvSupport", function () {
              return ye;
            }),
            i.d(t, "IFRAME_FN_RET_TYPE", function () {
              return Ce;
            }),
            i.d(t, "IFRAME_EVENT", function () {
              return be;
            }),
            i.d(t, "getNow", function () {
              return pe.a;
            }),
            i.d(t, "PerformanceWrapper", function () {
              return _e.d;
            });
          var n = i(0),
            r = i(5),
            s = i.n(r);
          class o extends Event {
            constructor(e, t) {
              super(e), (this.data = t);
            }
          }
          var a = i(1);
          class c {
            constructor() {
              (this.state = l.PENDING),
                (this.promise = new Promise((e, t) => {
                  (this.resolve = (t) => {
                    (this.state = l.FULFILLED), e(t);
                  }),
                    (this.reject = (e) => {
                      (this.state = l.REJECTED), t(e);
                    });
                }));
            }
          }
          class h extends c {
            constructor(e) {
              super(), e > 0 && setTimeout(() => this.reject(new Error("TimeoutDefer timeout")), e);
            }
          }
          class u {
            constructor() {
              this.queue = [];
            }
            get end() {
              return this.queue[this.queue.length - 1];
            }
            push(e) {
              this.queue.push(e);
            }
            resolve(e) {
              var t;
              return null === (t = this.queue.shift()) || void 0 === t ? void 0 : t.resolve(e);
            }
            reject(e) {
              var t;
              return null === (t = this.queue.shift()) || void 0 === t ? void 0 : t.reject(e);
            }
          }
          const l = { PENDING: "pending", FULFILLED: "fulfilled", REJECTED: "rejected" };
          class d {
            constructor(e) {
              (this._timeArr = []), e && (this._timeArr = [e]);
            }
            get length() {
              return this._timeArr.length;
            }
            setRange(e) {
              this._timeArr = [e];
            }
            end(e) {
              if (this._timeArr.length <= 0) return 0;
              if (e >= this._timeArr.length) throw new Error(n.g.getTimeRangeErrorMsg("end", this._timeArr.length, e));
              return this._timeArr[e].end;
            }
            start(e) {
              if (this._timeArr.length <= 0) return 0;
              if (e >= this._timeArr.length) throw new Error(n.g.getTimeRangeErrorMsg("start", this._timeArr.length, e));
              return this._timeArr[e].start;
            }
            toString() {
              return `[${this.start(0)}, ${this.end(0)}]`;
            }
          }
          var f = i(3),
            _ = function (e, t) {
              return (_ =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                })(e, t);
            };
          /*! *****************************************************************************
            Copyright (c) Microsoft Corporation.
            
            Permission to use, copy, modify, and/or distribute this software for any
            purpose with or without fee is hereby granted.
            
            THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
            REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
            AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
            INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
            LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
            OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
            PERFORMANCE OF THIS SOFTWARE.
            ***************************************************************************** */ function p(e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function i() {
              this.constructor = e;
            }
            _(e, t), (e.prototype = null === t ? Object.create(t) : ((i.prototype = t.prototype), new i()));
          }
          function m(e, t) {
            return t.find(function (t) {
              return t.name === e;
            });
          }
          Object.create, Object.create;
          var g = "default",
            E = "spatial_stereo",
            v = "base_booster",
            y = "vocal_booster",
            C = "vocal_weak",
            b = "pop",
            R = "classcal",
            T = "electronic",
            A = "guitar",
            N = "hiphop",
            P = "jazz",
            S = "rnb",
            w = "rocknroll",
            L = "concert_hall",
            M = "live",
            O = "living_room",
            I = "receiver",
            k = "tremolo",
            x = "chorus",
            D = "running",
            F = "lowpass",
            V = "highpass",
            W = new WeakMap(),
            B = (function () {
              function e(e, t) {
                (this.using = !1), (this.currentGainValue = 0), (this.audioCtx = e), (this.logger = t);
              }
              return (
                (e.prototype.connectBy = function (e) {
                  return e || null;
                }),
                (e.prototype.disconnect = function () {
                  var e;
                  null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()"));
                }),
                (e.prototype.destroy = function () {
                  var e;
                  this.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " destroy()")),
                    (this.logger = null);
                }),
                (e.prototype.getEffectorName = function () {
                  return e.effectorName;
                }),
                (e.prototype.setPreConfigName = function (e) {
                  var t;
                  e !== this.currPreCfgName &&
                    ((this.currPreCfgName = e),
                    null === (t = this.logger) ||
                      void 0 === t ||
                      t.log("BaseAudioEffector setPreConfigName(), currPreCfgName=".concat(e)));
                }),
                (e.prototype.getPreConfigName = function () {
                  return this.currPreCfgName;
                }),
                (e.prototype.getGainValue = function () {
                  return this.currentGainValue;
                }),
                (e.prototype.setGainValue = function (e) {
                  this.currentGainValue = e;
                }),
                (e.prototype.updateLoop = function () {}),
                (e.effectorName = "BaseAudioEffector"),
                e
              );
            })(),
            U = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (n.inputNode = t.createGain()), (n.outputNode = t.createGain()), n;
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e ? (e.connect(this.inputNode), this.connectInnerNodes(), this.outputNode) : null;
                }),
                (t.prototype.disconnect = function () {
                  var e;
                  this.disconnectInnerNodes(),
                    this.outputNode && this.outputNode.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()"));
                }),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this), (this.inputNode = null), (this.outputNode = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.connectInnerNodes = function () {}),
                (t.prototype.disconnectInnerNodes = function () {
                  this.inputNode && this.inputNode.disconnect();
                }),
                (t.effectorName = "MultiNodes"),
                t
              );
            })(B),
            G = (function () {
              function e(e, t) {
                (this.isConnected = !1),
                  (this.gainIntensity = 0),
                  (this.intensityCoefficient = 0.3),
                  (this.gainNode = e.createGain()),
                  (this.feedbackGainNode = e.createGain()),
                  (this.feedforwardGainNode = e.createGain()),
                  (this.blendGainNode = e.createGain()),
                  (this.delayVibrato = e.createDelay()),
                  (this.delayFixed = e.createDelay()),
                  (this.logger = t);
              }
              return (
                (e.prototype.connect = function (e, t, i) {
                  var n, r;
                  return (
                    void 0 === i && (i = 0),
                    e && t
                      ? this.isConnected
                        ? (null === (r = this.logger) || void 0 === r || r.log("ChorusSingleChannel is already connected"), !0)
                        : ((this.channelSplitterNode = e), (this.channelMergerNode = t), this.connectInnerNodes(i), !0)
                      : (null === (n = this.logger) || void 0 === n || n.log("channelSplitterNode or channelMergerNode is null"),
                        !1)
                  );
                }),
                (e.prototype.disconnect = function () {
                  var e;
                  return this.isConnected
                    ? ((this.isConnected = !1),
                      this.channelSplitterNode.disconnect(this.gainNode),
                      this.gainNode.disconnect(this.delayVibrato),
                      this.gainNode.disconnect(this.delayFixed),
                      this.delayVibrato.disconnect(this.feedforwardGainNode),
                      this.delayVibrato.disconnect(this.channelMergerNode),
                      this.delayFixed.disconnect(this.feedbackGainNode),
                      this.feedbackGainNode.disconnect(this.gainNode),
                      this.blendGainNode.disconnect(this.channelMergerNode),
                      !0)
                    : (null === (e = this.logger) || void 0 === e || e.log("ChorusSingleChannel is already disconnected"), !0);
                }),
                (e.prototype.destroy = function () {
                  this.disconnect(),
                    (this.logger = null),
                    (this.channelSplitterNode = null),
                    (this.channelMergerNode = null),
                    (this.gainNode = null),
                    (this.delayVibrato = null),
                    (this.delayFixed = null),
                    (this.feedbackGainNode = null),
                    (this.blendGainNode = null);
                }),
                (e.prototype.getFeedForwardDelayTime = function () {
                  var e;
                  return null === (e = this.delayVibrato) || void 0 === e ? void 0 : e.delayTime;
                }),
                (e.prototype.setFeedForwardDelayTimeValue = function (e) {
                  var t;
                  this.isConnected
                    ? (this.delayVibrato.delayTime.value = e)
                    : null === (t = this.logger) || void 0 === t || t.log("ChorusSingleChannel is already disconnected");
                }),
                (e.prototype.getFeedBackDelayTime = function () {
                  var e;
                  return null === (e = this.delayFixed) || void 0 === e ? void 0 : e.delayTime;
                }),
                (e.prototype.setFeedBackDelayTimeValue = function (e) {
                  var t;
                  this.isConnected
                    ? (this.delayFixed.delayTime.value = e)
                    : null === (t = this.logger) || void 0 === t || t.log("ChorusSingleChannel is already disconnected");
                }),
                (e.prototype.getGainIntensity = function () {
                  return this.gainIntensity;
                }),
                (e.prototype.setGainIntensity = function (e) {
                  (this.gainIntensity = e),
                    (this.blendGainNode.gain.value = 1 - e * this.intensityCoefficient),
                    (this.feedforwardGainNode.gain.value = e * this.intensityCoefficient + (1 - this.intensityCoefficient)),
                    (this.feedbackGainNode.gain.value = e * (1 - this.intensityCoefficient));
                }),
                (e.prototype.connectInnerNodes = function (e) {
                  (this.isConnected = !0),
                    this.channelSplitterNode.connect(this.gainNode, e, 0),
                    this.gainNode.connect(this.delayVibrato),
                    this.gainNode.connect(this.delayFixed),
                    this.delayVibrato.connect(this.feedforwardGainNode),
                    this.delayVibrato.connect(this.channelMergerNode, 0, e),
                    this.delayFixed.connect(this.feedbackGainNode),
                    this.feedbackGainNode.connect(this.gainNode),
                    this.blendGainNode.connect(this.channelMergerNode, 0, e);
                }),
                e
              );
            })(),
            j = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.mix = 0.3),
                  (n.leftFeedbackDelayTime = 0.018),
                  (n.leftFeedForwardDelayTime = 0.15),
                  (n.rightFeedbackDelayTime = 0.02),
                  (n.rightFeedForwardDelayTime = 0.2),
                  (n.leftDethGain = 0.013),
                  (n.rightDethGain = -0.017),
                  (n.lfoFrequency = 0.15),
                  (n.lfoType = "sine"),
                  (n.channellCount = 2),
                  (n.wetGainNode = t.createGain()),
                  (n.dryGainNode = t.createGain()),
                  n.setDryWetMix(n.mix),
                  (n.channelSplitterNode = t.createChannelSplitter(n.channellCount)),
                  (n.channelMergerNode = t.createChannelMerger(n.channellCount)),
                  (n.leftChannelNode = new G(t, i)),
                  (n.rightChannelNode = new G(t, i)),
                  (n.channelNodes = [n.leftChannelNode, n.rightChannelNode]),
                  (n.leftDepth = t.createGain()),
                  (n.rightDepth = t.createGain()),
                  (n.lfoNode = t.createOscillator()),
                  (n.lfoNode.type = n.lfoType),
                  (n.lfoNode.frequency.value = n.lfoFrequency),
                  (n.lfoNodeRunning = !1),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this),
                    this.lfoNode && this.lfoNodeRunning && ((this.lfoNodeRunning = !1), this.lfoNode.stop()),
                    (this.lfoNode = null),
                    (this.wetGainNode = null),
                    (this.dryGainNode = null),
                    this.channelNodes &&
                      this.channelNodes.length > 0 &&
                      (this.channelNodes.forEach(function (e) {
                        e.destroy();
                      }),
                      (this.channelNodes.length = 0)),
                    (this.channelNodes = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.connectInnerNodes = function () {
                  this.disconnectInnerNodes(),
                    this.inputNode.connect(this.channelSplitterNode),
                    this.inputNode.connect(this.dryGainNode);
                  for (var e = 0; e < this.channelNodes.length; e++)
                    this.channelNodes[e].connect(this.channelSplitterNode, this.channelMergerNode, e);
                  this.channelMergerNode.connect(this.wetGainNode),
                    this.dryGainNode.connect(this.outputNode),
                    this.wetGainNode.connect(this.outputNode),
                    this.lfoNode.connect(this.leftDepth),
                    this.lfoNode.connect(this.rightDepth),
                    this.leftDepth.connect(this.channelNodes[0].getFeedForwardDelayTime()),
                    this.rightDepth.connect(this.channelNodes[1].getFeedForwardDelayTime()),
                    (this.leftDepth.gain.value = this.leftDethGain),
                    (this.rightDepth.gain.value = this.rightDethGain),
                    this.lfoNodeRunning || ((this.lfoNodeRunning = !0), this.lfoNode.start(0)),
                    this.updateAllGainCfg();
                }),
                (t.prototype.disconnectInnerNodes = function () {
                  e.prototype.disconnectInnerNodes.call(this),
                    this.inputNode.disconnect(),
                    this.channelNodes.forEach(function (e) {
                      e.disconnect();
                    }),
                    this.channelMergerNode.disconnect(),
                    this.dryGainNode.disconnect(),
                    this.wetGainNode.disconnect(),
                    this.lfoNode.disconnect(),
                    this.leftDepth.disconnect(),
                    this.rightDepth.disconnect();
                }),
                (t.prototype.updateAllGainCfg = function () {
                  this.leftChannelNode.setFeedBackDelayTimeValue(this.leftFeedbackDelayTime),
                    this.leftChannelNode.setFeedForwardDelayTimeValue(this.leftFeedForwardDelayTime),
                    this.leftChannelNode.setGainIntensity(1),
                    this.rightChannelNode.setFeedBackDelayTimeValue(this.rightFeedbackDelayTime),
                    this.rightChannelNode.setFeedForwardDelayTimeValue(this.rightFeedForwardDelayTime),
                    this.rightChannelNode.setGainIntensity(1);
                }),
                (t.prototype.setDryWetMix = function (e) {
                  if (this.dryGainNode && this.wetGainNode) {
                    var t = Math.min(1, Math.max(0, e));
                    (this.dryGainNode.gain.value = 1 - t), (this.wetGainNode.gain.value = t);
                  }
                }),
                (t.effectorName = "Chorus"),
                t
              );
            })(U),
            q = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (n.compressor = t.createDynamicsCompressor()), n;
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e && this.compressor ? (e.connect(this.compressor), this.setPreConfigName(g), this.compressor) : null;
                }),
                (t.prototype.disconnect = function () {
                  var e;
                  this.compressor &&
                    (this.compressor.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()")));
                }),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this), (this.compressor = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.setPreConfigName = function (e) {
                  var t;
                  e !== this.currPreCfgName &&
                    this.compressor &&
                    ((this.currPreCfgName = e),
                    (this.compressor.attack.value = H.attack),
                    (this.compressor.knee.value = H.knee),
                    (this.compressor.ratio.value = H.ratio),
                    (this.compressor.release.value = H.release),
                    (this.compressor.threshold.value = H.threshold),
                    null === (t = this.logger) ||
                      void 0 === t ||
                      t.log("CompressorEffector setPreConfigName() effectName=".concat(e)));
                }),
                (t.effectorName = "Compressor"),
                t
              );
            })(B),
            H = { attack: 0.003, knee: 30, ratio: 12, release: 0.25, threshold: -24 },
            K = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.audioFrequency = [31, 62, 125, 250, 500, 1e3, 2e3, 4e3, 8e3, 16e3]),
                  (n.lowHz = 62),
                  (n.highHz = 8e3),
                  (n.peakQuality = 0.8),
                  (n.gainTimeConstant = 0.02),
                  (n.biquadFilterList = []),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e && this.inputNode
                    ? (0 === this.biquadFilterList.length && this.setPreConfigName(g), e.connect(this.inputNode), this.outputNode)
                    : null;
                }),
                (t.prototype.disconnect = function () {
                  var e;
                  this.outputNode &&
                    (this.outputNode.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()")));
                }),
                (t.prototype.destroy = function () {
                  var e;
                  this.inputNode &&
                    (this.inputNode.disconnect(),
                    this.outputNode.disconnect(),
                    (this.inputNode = null),
                    (this.outputNode = null),
                    0 !== this.biquadFilterList.length &&
                      (this.biquadFilterList.forEach(function (e) {
                        e.disconnect();
                      }),
                      this.biquadFilterList.splice(0, this.biquadFilterList.length),
                      null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " destroy()")),
                      (this.logger = null)));
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.setPreConfigName = function (e) {
                  var t;
                  if (e !== this.currPreCfgName && this.inputNode) {
                    this.currPreCfgName = e;
                    var i = m(e, Y);
                    if (i) {
                      null === (t = this.logger) ||
                        void 0 === t ||
                        t.log("EqualizerEffector setPreConfigName() effectName=".concat(e));
                      for (var n = this.inputNode, r = 0; r < this.audioFrequency.length; r++) {
                        var s = this.audioFrequency[r],
                          o = void 0;
                        this.biquadFilterList.length !== this.audioFrequency.length
                          ? ((o = this.audioCtx.createBiquadFilter()),
                            this.biquadFilterList.push(o),
                            n && n.connect(o),
                            this.biquadFilterList.length === this.audioFrequency.length && o.connect(this.outputNode))
                          : (o = this.biquadFilterList[r]),
                          s <= this.lowHz
                            ? (o.type = "lowshelf")
                            : s >= this.highHz
                            ? (o.type = "highshelf")
                            : ((o.Q.value = this.peakQuality), (o.type = "peaking")),
                          o.frequency.setValueAtTime(s, this.audioCtx.currentTime),
                          o.gain.setTargetAtTime(i.eq[r], this.audioCtx.currentTime, this.gainTimeConstant),
                          (n = o);
                      }
                    }
                  }
                }),
                (t.effectorName = "Equalizer"),
                t
              );
            })(U),
            Y = [
              { name: g, eq: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
              { name: v, eq: [6, 5, 5, 3, 1, 0, 0, 0, 0, 0] },
              { name: y, eq: [-2, -3, -3, 1, 4, 4, 3, 1, 0, -2] },
              { name: C, eq: [3, 2, 0, -1, -3, -3, -4, -3, -3, 2] },
              { name: b, eq: [-2, -1, 0, 2, 4, 4, 2, 0, -1, -2] },
              { name: R, eq: [4.5, 4, 3, 2, -1, -1, 0, 2, 3, 4] },
              { name: T, eq: [5, 3, 1, 0, -2, 2, 0.5, 1, 4, 5] },
              { name: A, eq: [-5, -3, -2, 2, -0.5, 0, 0, 2, 6, 0] },
              { name: N, eq: [5, 4, 1, 3, -1, -1, 1, -1, 2, 3] },
              { name: P, eq: [4, 3, 1, 2, -2, -2, 0, 1, 3, 4] },
              { name: S, eq: [3, 7, 6, 2, -3, -2, 2, 3, 3, 4] },
              { name: w, eq: [5, 4, 3, 2, -1, -1, 1, 3, 4, 5] },
            ],
            $ = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.maxGainValue = 2),
                  (n.minGainValue = 0),
                  (n.gainTimeConstant = 0.02),
                  (n.gainNode = t.createGain()),
                  (n.currentGainValue = n.minGainValue),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e ? (e.connect(this.gainNode), this.gainNode) : null;
                }),
                (t.prototype.disconnect = function () {
                  var e;
                  this.gainNode &&
                    (this.gainNode.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()")));
                }),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this), (this.gainNode = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.setGainValue = function (e) {
                  var t;
                  if (this.gainNode) {
                    (this.currentGainValue = Math.max(e, this.minGainValue)),
                      (this.currentGainValue = Math.min(this.currentGainValue, this.maxGainValue));
                    var i = 10 * (this.currentGainValue - this.minGainValue);
                    this.gainNode.gain.setTargetAtTime(
                      (function (e) {
                        return Math.pow(10, e / 20);
                      })(i),
                      this.audioCtx.currentTime,
                      this.gainTimeConstant
                    ),
                      null === (t = this.logger) ||
                        void 0 === t ||
                        t.log("GainEffector setGainValue() value=".concat(e, ",db=").concat(i));
                  }
                }),
                (t.effectorName = "Gain"),
                t
              );
            })(B),
            z = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.lowPassFrequency = 3e3),
                  (n.highPassFrequency = 500),
                  (n.lowPassBqFilter = n.createBqFilter(F, n.lowPassFrequency)),
                  (n.highPassBqFilter = n.createBqFilter(V, n.highPassFrequency)),
                  n.lowPassBqFilter.connect(n.highPassBqFilter),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e ? (e.connect(this.lowPassBqFilter), this.highPassBqFilter) : null;
                }),
                (t.prototype.disconnect = function () {
                  var e;
                  this.highPassBqFilter &&
                    (this.highPassBqFilter.disconnect(),
                    null === (e = this.logger) || void 0 === e || e.log("".concat(this.getEffectorName(), " disconnect()")));
                }),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this),
                    this.lowPassBqFilter.disconnect(),
                    (this.lowPassBqFilter = null),
                    (this.highPassBqFilter = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.createBqFilter = function (e, t) {
                  var i = this.audioCtx.createBiquadFilter();
                  return (i.type = e), (i.frequency.value = t), i;
                }),
                (t.effectorName = "Receiver"),
                t
              );
            })(B),
            X = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.channelNum = 2),
                  (n.dryWetConstant = 0.5),
                  (n.lowPassFrequency = 7e3),
                  (n.highPassFrequency = 0),
                  (n.lowPassBfNode = t.createBiquadFilter()),
                  (n.lowPassBfNode.type = F),
                  (n.highPassBfNode = t.createBiquadFilter()),
                  (n.highPassBfNode.type = V),
                  (n.reverbNode = t.createConvolver()),
                  (n.dryGainNode = t.createGain()),
                  (n.wetGainNode = t.createGain()),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e && this.inputNode ? (e.connect(this.inputNode), this.setPreConfigName(g), this.outputNode) : null;
                }),
                (t.prototype.destroy = function () {
                  var t;
                  e.prototype.destroy.call(this),
                    (this.lowPassBfNode = null),
                    (this.highPassBfNode = null),
                    (this.reverbNode = null),
                    (this.dryGainNode = null),
                    (this.wetGainNode = null),
                    null === (t = this.logger) || void 0 === t || t.log("".concat(this.getEffectorName(), " destroy()")),
                    (this.logger = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.setPreConfigName = function (e) {
                  var t, i, n;
                  if (e !== this.currPreCfgName && this.inputNode)
                    if (((this.currPreCfgName = e), this.connectInnerNodes(), this.currPreCfgName !== g)) {
                      var r = m(e, Q);
                      if (r) {
                        (this.reverbNode.buffer = this.rebuildImpulse(r)),
                          this.lowPassBfNode.frequency.setValueAtTime(this.lowPassFrequency, this.audioCtx.currentTime),
                          this.highPassBfNode.frequency.setValueAtTime(this.highPassFrequency, this.audioCtx.currentTime);
                        var s = this.getDryWetValue(r.mix);
                        (this.dryGainNode.gain.value = s.dry),
                          (this.wetGainNode.gain.value = s.wet),
                          null === (n = this.logger) ||
                            void 0 === n ||
                            n.log(
                              "ReverbEffector setPreConfigName() effectName= "
                                .concat(e, " dry=")
                                .concat(s.dry, " wet=")
                                .concat(s.wet)
                            );
                      } else
                        null === (i = this.logger) ||
                          void 0 === i ||
                          i.log("ReverbEffector setPreConfigName() effectName= ".concat(e, " cfg is null!"));
                    } else
                      null === (t = this.logger) ||
                        void 0 === t ||
                        t.log("ReverbEffector setPreConfigName() currPreCfgName is DEFAULT");
                }),
                (t.prototype.connectInnerNodes = function () {
                  this.disconnectInnerNodes(),
                    this.currPreCfgName === g
                      ? this.inputNode.connect(this.outputNode)
                      : (this.inputNode.connect(this.dryGainNode),
                        this.dryGainNode.connect(this.outputNode),
                        this.inputNode.connect(this.lowPassBfNode),
                        this.lowPassBfNode.connect(this.highPassBfNode),
                        this.highPassBfNode.connect(this.reverbNode),
                        this.reverbNode.connect(this.wetGainNode),
                        this.wetGainNode.connect(this.outputNode)),
                    (this.outputNode.gain.value = 1);
                }),
                (t.prototype.disconnectInnerNodes = function () {
                  e.prototype.disconnectInnerNodes.call(this),
                    this.lowPassBfNode.disconnect(),
                    this.highPassBfNode.disconnect(),
                    this.reverbNode.disconnect(),
                    this.dryGainNode.disconnect(),
                    this.wetGainNode.disconnect();
                }),
                (t.prototype.rebuildImpulse = function (e) {
                  for (
                    var t = this.audioCtx.sampleRate,
                      i = e.time * t,
                      n = this.audioCtx.createBuffer(this.channelNum, i, this.audioCtx.sampleRate),
                      r = n.getChannelData(0),
                      s = n.getChannelData(1),
                      o = 0;
                    o < i;
                    o++
                  ) {
                    var a = e.reverse ? i - o : o;
                    (r[o] = this.getChannelSamples(a, i, e)), (s[o] = this.getChannelSamples(a, i, e));
                  }
                  if (!e.simpleImpulseMode) {
                    var c = e.decay * t;
                    for (o = 0; o < c; o++) {
                      var h = (a = e.reverse ? i - o : o) / c;
                      (r[a] *= h), (s[a] *= h);
                    }
                  }
                  return n;
                }),
                (t.prototype.getChannelSamples = function (e, t, i) {
                  return (
                    (2 * Math.random() - 1) *
                    (i.simpleImpulseMode ? Math.pow(1 - e / t, i.decay) : Math.pow(Math.pow(0.001, 1 / t), e))
                  );
                }),
                (t.prototype.getDryWetValue = function (e) {
                  var t = e;
                  return (
                    (e < 0 || e > 1) && (t = 0),
                    t <= this.dryWetConstant
                      ? { dry: 1, wet: 1 - 2 * (this.dryWetConstant - t) }
                      : { dry: 1 - 2 * (t - this.dryWetConstant), wet: 1 }
                  );
                }),
                (t.effectorName = "Reverb"),
                t
              );
            })(U),
            Q = [
              { name: L, label: "音乐厅", mix: 0.5, time: 1.8, decay: 15, reverse: !1, simpleImpulseMode: !1 },
              { name: O, label: "客厅", mix: 0.5, time: 1.4, decay: 5, reverse: !1, simpleImpulseMode: !0 },
              { name: M, label: "演唱会现场", mix: 0.3, time: 3, decay: 5, reverse: !1, simpleImpulseMode: !0 },
            ],
            J = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.intervalTime = 300),
                  (n.startTimeStamp = 0),
                  (n.radius = 3),
                  (n.degreeSpeed = 4),
                  (n.degreeStart = 0),
                  (n.degreeMax = 360),
                  (n.panningModel = "HRTF"),
                  (n.distanceModel = "linear"),
                  (n.pannerNode = t.createPanner()),
                  (n.pannerNode.panningModel = n.panningModel),
                  (n.pannerNode.distanceModel = n.distanceModel),
                  (n.pannerNode.refDistance = 1),
                  (n.pannerNode.coneInnerAngle = 360),
                  (n.pannerNode.coneOuterAngle = 0),
                  (n.pannerNode.coneOuterGain = 1),
                  (n.isConnected = !1),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.connectBy = function (e) {
                  return e && this.pannerNode ? (e.connect(this.pannerNode), (this.isConnected = !0), this.pannerNode) : null;
                }),
                (t.prototype.disconnect = function () {
                  var e, t;
                  null === (e = this.pannerNode) || void 0 === e || e.disconnect(),
                    (this.isConnected = !1),
                    null === (t = this.logger) || void 0 === t || t.log("".concat(this.getEffectorName(), " disconnect()"));
                }),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this), (this.pannerNode = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.updateLoop = function () {
                  if (!this.isConnected) return !1;
                  var e = +new Date();
                  return (
                    e - this.startTimeStamp > this.intervalTime && (this.updatePanningPosition(), (this.startTimeStamp = e)), !0
                  );
                }),
                (t.prototype.updatePanningPosition = function () {
                  var e = (this.degreeStart * Math.PI) / 180;
                  (this.pannerNode.positionX.value = this.radius * Math.cos(e)),
                    (this.pannerNode.positionZ.value = this.radius * Math.sin(e)),
                    (this.degreeStart += this.degreeSpeed),
                    this.degreeStart >= this.degreeMax && (this.degreeStart = this.degreeStart - this.degreeMax);
                }),
                (t.effectorName = "SpatialStereo"),
                t
              );
            })(B),
            Z = (function (e) {
              function t(t, i) {
                var n = e.call(this, t, i) || this;
                return (
                  (n.mix = 0.2),
                  (n.lfoFrequency = 10),
                  (n.lfoType = "sine"),
                  (n.wetGainNode = t.createGain()),
                  (n.dryGainNode = t.createGain()),
                  (n.dryGainNode.gain.value = 1 - n.mix),
                  (n.wetGainNode.gain.value = n.mix),
                  (n.tremoloGainNode = t.createGain()),
                  (n.tremoloGainNode.gain.value = 1),
                  (n.lfoNode = t.createOscillator()),
                  (n.lfoNode.type = n.lfoType),
                  (n.lfoNode.frequency.value = n.lfoFrequency),
                  (n.lfoNodeRunning = !1),
                  n
                );
              }
              return (
                p(t, e),
                (t.prototype.destroy = function () {
                  e.prototype.destroy.call(this),
                    this.lfoNode && this.lfoNodeRunning && ((this.lfoNodeRunning = !1), this.lfoNode.stop()),
                    (this.lfoNode = null),
                    (this.wetGainNode = null),
                    (this.dryGainNode = null),
                    (this.tremoloGainNode = null);
                }),
                (t.prototype.getEffectorName = function () {
                  return t.effectorName;
                }),
                (t.prototype.connectInnerNodes = function () {
                  this.disconnectInnerNodes(),
                    this.inputNode.connect(this.dryGainNode),
                    this.dryGainNode.connect(this.outputNode),
                    this.lfoNodeRunning || ((this.lfoNodeRunning = !0), this.lfoNode.start(0)),
                    this.lfoNode.connect(this.tremoloGainNode.gain),
                    this.inputNode.connect(this.tremoloGainNode),
                    this.tremoloGainNode.connect(this.wetGainNode),
                    this.wetGainNode.connect(this.outputNode);
                }),
                (t.prototype.disconnectInnerNodes = function () {
                  e.prototype.disconnectInnerNodes.call(this),
                    this.dryGainNode.disconnect(),
                    this.wetGainNode.disconnect(),
                    this.tremoloGainNode.disconnect(),
                    this.lfoNode.disconnect();
                }),
                (t.effectorName = "Tremolo"),
                t
              );
            })(U),
            ee = (function () {
              function e(e, t) {
                if (
                  ((this.effectorType = [$, J, K, q, X, z, Z, j]),
                  (this.currEffect = g),
                  (this.currGain = 0),
                  (this.audioCtx = e),
                  (this.logger = t),
                  !this.audioCtx || !this.logger)
                )
                  throw new Error("audioContext or logger is null");
                (this.inputNode = this.audioCtx.createGain()),
                  (this.outputNode = this.audioCtx.createGain()),
                  (this.effectorMap = new Map()),
                  (this.isChainNodesConnected = !1);
              }
              return (
                (e.prototype.getInputNode = function () {
                  return this.inputNode;
                }),
                (e.prototype.getOutputNode = function () {
                  return this.outputNode;
                }),
                (e.prototype.destroy = function () {
                  var e, t, i;
                  this.effectorMap
                    ? (this.disconnectEffectNodes(),
                      null === (t = this.inputNode) || void 0 === t || t.disconnect(),
                      null === (i = this.outputNode) || void 0 === i || i.disconnect(),
                      (this.inputNode = null),
                      (this.outputNode = null),
                      this.effectorMap.forEach(function (e) {
                        e.destroy();
                      }),
                      this.effectorMap.clear(),
                      (this.effectorMap = null),
                      (this.audioCtx = null),
                      (this.logger = null),
                      (this.currEffect = g),
                      (this.currGain = 0))
                    : null === (e = this.logger) || void 0 === e || e.warn("destroy(), already destroyed");
                }),
                (e.prototype.setGainValue = function (e) {
                  var t;
                  if (this.effectorMap) {
                    this.currGain = e;
                    var i = this.effectorMap.get($.effectorName);
                    i || (this.connectAudioPath(), (i = this.effectorMap.get($.effectorName))), i && i.setGainValue(e);
                  } else null === (t = this.logger) || void 0 === t || t.warn("setGainValue(), effectorMap is null");
                }),
                (e.prototype.getGainValue = function () {
                  var e;
                  if (!this.effectorMap) return 0;
                  var t = this.effectorMap.get($.effectorName);
                  return t
                    ? t.getGainValue()
                    : (null === (e = this.logger) || void 0 === e || e.warn("getGainValue(),gainEffector is null"), 0);
                }),
                (e.prototype.setEffect = function (e) {
                  this.effectorMap &&
                    (this.currEffect !== e
                      ? ((this.currEffect = e), this.connectAudioPath())
                      : this.logger.log("setEffect(), this.currEffect === effectName, effectName=".concat(e)));
                }),
                (e.prototype.getEffect = function () {
                  return this.currEffect;
                }),
                (e.prototype.loop = function () {
                  if (!this.effectorMap) return !1;
                  var e = this.effectorMap.get(J.effectorName);
                  return (null == e ? void 0 : e.using) && e.updateLoop(), !0;
                }),
                (e.prototype.connectAudioPath = function () {
                  this.effectorMap &&
                    (this.createAudioEffectors(),
                    this.disconnectEffectNodes(),
                    this.activeEffects(),
                    this.reconnectEffectNodes());
                }),
                (e.prototype.innerNodeIsConnected = function () {
                  return this.isChainNodesConnected;
                }),
                (e.prototype.createAudioEffectors = function () {
                  var e = this;
                  this.logger.log("EffectChain createAudioEffectors()"),
                    this.effectorMap.size > 0 ||
                      this.effectorType.forEach(function (t) {
                        var i = new t(e.audioCtx, e.logger);
                        e.effectorMap.set(i.getEffectorName(), i);
                      });
                }),
                (e.prototype.disconnectEffectNodes = function () {
                  var e;
                  this.effectorMap.forEach(function (e) {
                    e.using && (e.disconnect(), (e.using = !1));
                  }),
                    null === (e = this.inputNode) || void 0 === e || e.disconnect(),
                    (this.isChainNodesConnected = !1),
                    this.logger.log("EffectChain disconnectEffectNodes()");
                }),
                (e.prototype.reconnectEffectNodes = function () {
                  var e = this;
                  if (this.inputNode && this.outputNode) {
                    var t = this.inputNode,
                      i = "inputNode -> ";
                    this.effectorMap.forEach(function (n) {
                      n.using &&
                        ((t = n.connectBy(t)), n.setPreConfigName(e.currEffect), (i += "".concat(n.getEffectorName(), " -> ")));
                    }),
                      null == t || t.connect(this.outputNode),
                      (this.isChainNodesConnected = !0),
                      this.logger.log("EffectChain reconnectEffectNodes, using audioEffect = ".concat(i, " outputNode"));
                  }
                }),
                (e.prototype.activeEffects = function () {
                  switch (
                    (this.activeSingleEffect($.effectorName, !0), this.activeSingleEffect(q.effectorName, !0), this.currEffect)
                  ) {
                    case E:
                      this.activeSingleEffect(J.effectorName, !0);
                      break;
                    case L:
                    case O:
                    case M:
                      this.activeSingleEffect(X.effectorName, !0);
                      break;
                    case I:
                      this.activeSingleEffect(z.effectorName, !0);
                      break;
                    case k:
                      this.activeSingleEffect(Z.effectorName, !0);
                      break;
                    case x:
                      this.activeSingleEffect(j.effectorName, !0);
                      break;
                    case g:
                      0 === this.currGain && this.activeSingleEffect(q.effectorName, !1);
                      break;
                    default:
                      this.activeSingleEffect(K.effectorName, !0);
                  }
                }),
                (e.prototype.activeSingleEffect = function (e, t) {
                  if (this.effectorMap && 0 !== this.effectorMap.size) {
                    var i = this.effectorMap.get(e);
                    i && (i.using = t);
                  }
                }),
                e
              );
            })();
          !(function () {
            function e(e, t) {
              (this.media = e),
                (this.logger =
                  "string" != typeof t
                    ? t
                    : {
                        trace: function () {},
                        debug: function () {},
                        info: function () {},
                        log: function () {},
                        warn: function () {},
                        error: function () {},
                      });
            }
            (e.closeAudioSourceNode = function (e) {
              if (null == W ? void 0 : W.has(e)) {
                var t = W.get(e).context;
                t && "closed" !== t.state && t.close(), W.delete(e);
              }
            }),
              (e.isEnvSupport = function () {
                return !(
                  (!window.AudioContext && !window.webkitAudioContext) ||
                  ((e = navigator.userAgent), /^((?!chrome|android).)*safari/i.test(e))
                );
                var e;
              }),
              (e.prototype.destroy = function () {
                this.audioSource && (this.audioSource.disconnect(), (this.audioSource = null)),
                  this.effectChain && (this.effectChain.destroy(), (this.effectChain = null)),
                  this.audioCtx && (this.audioCtx.state === D && this.audioCtx.suspend(), (this.audioCtx = null)),
                  (this.media = null),
                  (this.logger = null);
              }),
              (e.prototype.setGainValue = function (t) {
                e.isEnvSupport() && this.isMediaSupport()
                  ? this.isContextRunning()
                    ? (this.effectChain || this.connectAudioPath(), this.effectChain.setGainValue(t))
                    : this.logger.warn("setGainValue(), AudioContext is not running")
                  : this.logger.warn(
                      "setGainValue(), not supported, envi= ".concat(e.isEnvSupport(), " ,media= ").concat(this.isMediaSupport())
                    );
              }),
              (e.prototype.getGainValue = function () {
                return this.effectChain ? this.effectChain.getGainValue() : 0;
              }),
              (e.prototype.setEffect = function (t) {
                e.isEnvSupport() && this.isMediaSupport()
                  ? this.isContextRunning()
                    ? (this.effectChain || this.connectAudioPath(), this.effectChain.setEffect(t))
                    : this.logger.warn("setEffect(), AudioContext is not running")
                  : this.logger.warn(
                      "setEffect(), not supported, envi= ".concat(e.isEnvSupport(), " ,media= ").concat(this.isMediaSupport())
                    );
              }),
              (e.prototype.getEffect = function () {
                return this.effectChain ? this.effectChain.getEffect() : g;
              }),
              (e.prototype.loop = function () {
                this.effectChain && this.effectChain.loop();
              }),
              (e.prototype.createContextAndConnect = function () {
                var t,
                  i = this;
                e.isEnvSupport() &&
                  this.isMediaSupport() &&
                  (W.has(this.media)
                    ? ((this.audioSource = W.get(this.media)),
                      (this.audioCtx = this.audioSource.context),
                      "suspended" === (null === (t = this.audioCtx) || void 0 === t ? void 0 : t.state) &&
                        this.audioCtx.resume().then(function () {
                          return i.connectAudioPath();
                        }))
                    : ((this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()),
                      (this.audioSource = this.audioCtx.createMediaElementSource(this.media)),
                      W.set(this.media, this.audioSource),
                      this.connectAudioPath()));
              }),
              (e.prototype.connectAudioPath = function () {
                this.effectChain ||
                  ((this.effectChain = new ee(this.audioCtx, this.logger)),
                  this.audioSource.connect(this.effectChain.getInputNode()),
                  this.effectChain.getOutputNode().connect(this.audioCtx.destination)),
                  this.effectChain.connectAudioPath();
              }),
              (e.prototype.isMediaSupport = function () {
                return !!(this.media && this.media instanceof HTMLMediaElement) && !!this.media.crossOrigin;
              }),
              (e.prototype.isContextRunning = function () {
                return this.audioCtx && this.audioCtx.state === D;
              });
          })();
          class te extends f.a {
            constructor() {
              super(),
                (this._playTime = 0),
                (this._volume = 1),
                (this._muted = !1),
                (this._timeupdateFlag = !0),
                (this._lastPts = Number.MIN_VALUE),
                (this._sampleRate = 44100),
                (this._evtMap = { audioCtx: this.onAudioCtxStateChange.bind(this) });
            }
            initAudioContext(e) {
              return (
                (e |= 48e3),
                (this._sampleRate = e),
                !(
                  !this._muted &&
                  !this._audioCtx &&
                  ((this._bufferSources = []),
                  (this._audioCtx = new AudioContext({ sampleRate: e })),
                  "suspended" === this._audioCtx.state
                    ? (a.b.log("[PCMPlayer] autoplay blocked"), this._audioCtx.close(), (this._audioCtx = null), 1)
                    : (this._audioCtx.addEventListener("statechange", this._evtMap.audioCtx),
                      (this._gainNode = this._audioCtx.createGain()),
                      (this._gainNode.gain.value = this._volume),
                      (this.effectChain = new ee(this._audioCtx, a.b)),
                      this._gainNode.connect(this.effectChain.getInputNode()),
                      this.effectChain.getOutputNode().connect(this._audioCtx.destination),
                      this.effectChain.connectAudioPath(),
                      (this._playTime = this._audioCtx.currentTime),
                      0))
                )
              );
            }
            stop() {
              var e, t;
              this.pause(),
                null === (e = this._bufferSources) ||
                  void 0 === e ||
                  e.forEach((e) => {
                    this.stopBufferSource(e, !1);
                  }),
                null === (t = this._gainNode) || void 0 === t || t.disconnect(),
                (this._gainNode = null),
                this.effectChain &&
                  (this.effectChain.getOutputNode().disconnect(), this.effectChain.destroy(), (this.effectChain = null)),
                this._audioCtx &&
                  (this._audioCtx.removeEventListener("statechange", this._evtMap.audioCtx),
                  this._audioCtx.close(),
                  (this._audioCtx = null)),
                (this._playTime = 0),
                (this._timeupdateFlag = !0),
                (this._bufferSources = null);
            }
            playFrame(e) {
              if ((this.initAudioContext(this._sampleRate), !this._audioCtx || this._muted))
                return void this.sendTimeupdateEvt(e.playtime);
              this._lastPts !== Number.MIN_VALUE && Math.abs(this._lastPts - e.ptsMs) > 300 && this.adjuestPlatTime(),
                (this._lastPts = e.ptsMs),
                1e3 * Math.abs(this._playTime - this._audioCtx.currentTime) > 50 &&
                  "running" === this._audioCtx.state &&
                  this.adjuestPlatTime();
              const { channels: t, sampleRate: i } = e,
                n = this.getTypeArrayData(e),
                r = this._audioCtx.createBufferSource();
              this._bufferSources.push(r), (this._curBufferSource = r);
              const s = n.length / t,
                o = this._audioCtx.createBuffer(t, s, i);
              for (let e = 0; e < t; e++) {
                let i = e;
                const r = o.getChannelData(e);
                for (let e = 0; e < s; e++) (r[e] = n[i]), (i += t);
              }
              this._playTime < this._audioCtx.currentTime && (this._playTime = this._audioCtx.currentTime),
                (r.buffer = o),
                r.connect(this._gainNode),
                this.resume(),
                r.start(this._playTime),
                (r.onended = (e) => {
                  this.stopBufferSource(e.currentTarget);
                }),
                (this._playTime += o.duration),
                this.sendTimeupdateEvt(e.playtime);
            }
            setVolume(e) {
              var t;
              if (e < 0 || e > 1) throw new Error(`The volume provided (${e}) is outside the range [0, 1].`);
              (this._volume = e),
                (null === (t = this._gainNode) || void 0 === t ? void 0 : t.gain) && (this._gainNode.gain.value = this._volume);
            }
            getVolume() {
              return this._volume;
            }
            setMuted(e) {
              this._muted = e;
            }
            pause() {
              this._audioCtx && "running" === this._audioCtx.state && this._audioCtx.suspend();
            }
            resume() {
              this._audioCtx && "suspended" === this._audioCtx.state && this._audioCtx.resume();
            }
            destroy() {
              this.stop();
            }
            set volumeGain(e) {
              var t;
              e < 0 || e > 2
                ? a.b.warn("The volume gain range is [0,2]")
                : null === (t = this.effectChain) || void 0 === t || t.setGainValue(e);
            }
            get volumeGain() {
              var e;
              return null === (e = this.effectChain) || void 0 === e ? void 0 : e.getGainValue();
            }
            set audioEffect(e) {
              var t;
              null === (t = this.effectChain) || void 0 === t || t.setEffect(e);
            }
            get audioEffect() {
              var e;
              return null === (e = this.effectChain) || void 0 === e ? void 0 : e.getEffect();
            }
            getMaxFormatValue(e) {
              return [128, 32768, 2147483648, 1][e];
            }
            onAudioCtxStateChange(e) {
              a.b.log("[PCMPlayer] this._audioCtx.state>>>", this._audioCtx.state),
                this._audioCtx &&
                  ("suspended" === this._audioCtx.state
                    ? this._audioCtx.suspend()
                    : "running" === this._audioCtx.state && this._audioCtx.resume());
            }
            getTypeArrayData(e) {
              const t = new (0, [Uint8Array, Int16Array, Int32Array, Float32Array][e.format])(new Uint8Array(e.data).buffer),
                i = new Float32Array(t.length);
              for (let n = 0; n < t.length; n++) i[n] = t[n] / this.getMaxFormatValue(e.format);
              return i;
            }
            adjuestPlatTime() {
              this.stopBufferSource(this._curBufferSource), (this._playTime = this._audioCtx.currentTime);
            }
            stopBufferSource(e, t = !0) {
              if (e && (e.stop(), e.disconnect(), (e.buffer = null), (e.onended = null), this._bufferSources && t)) {
                const t = this._bufferSources.indexOf(e);
                -1 !== t && this._bufferSources.splice(t, 1);
              }
            }
            sendTimeupdateEvt(e) {
              this._timeupdateFlag &&
                (this.emit(n.f.TIME_UPDATE, +(e / 1e3).toFixed(2)),
                (this._timeupdateFlag = !1),
                setTimeout(() => {
                  this._timeupdateFlag = !0;
                }, 100));
            }
          }
          const ie = [
              "attribute highp vec4 aVertexPosition;",
              "attribute vec2 aTextureCoord;",
              "varying highp vec2 vTextureCoord;",
              "void main(void) {",
              " gl_Position = aVertexPosition;",
              " vTextureCoord = aTextureCoord;",
              "}",
            ].join("\n"),
            ne = [
              "precision highp float;",
              "varying lowp vec2 vTextureCoord;",
              "uniform sampler2D YTexture;",
              "uniform sampler2D UTexture;",
              "uniform sampler2D VTexture;",
              "const mat4 YUV2RGB = mat4",
              "(",
              " 1.1643828125, 0, 1.59602734375, -.87078515625,",
              " 1.1643828125, -.39176171875, -.81296875, .52959375,",
              " 1.1643828125, 2.017234375, 0, -1.081390625,",
              " 0, 0, 0, 1",
              ");",
              "void main(void) {",
              " gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;",
              "}",
            ].join("\n");
          class re {
            constructor(e) {
              (this._gl = e),
                (this._texture = this._gl.createTexture()),
                this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture),
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR),
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR),
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE),
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
            }
            bind(e, t, i) {
              this._gl.activeTexture([this._gl.TEXTURE0, this._gl.TEXTURE1, this._gl.TEXTURE2][e]),
                this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture),
                this._gl.uniform1i(this._gl.getUniformLocation(t, i), e);
            }
            fill(e, t, i) {
              this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture),
                this._gl.texImage2D(
                  this._gl.TEXTURE_2D,
                  0,
                  this._gl.LUMINANCE,
                  e,
                  t,
                  0,
                  this._gl.LUMINANCE,
                  this._gl.UNSIGNED_BYTE,
                  i
                );
            }
          }
          class se {
            constructor(e, t) {
              (this._texcoords = [0, 1, 1, 1, 0, 0, 1, 0]),
                (this._lastStridX = 0),
                (this._lastStridY = 0),
                (this._isContextLost = !1),
                (this.onContextLost = null),
                (this.onContextRestored = null),
                (this.handleGLContextLost = (e) => {
                  var t;
                  e.preventDefault(),
                    (this._isContextLost = !0),
                    null === (t = this.onContextLost) || void 0 === t || t.call(this);
                }),
                (this.handleGLContextRestored = (e) => {
                  var t;
                  e.preventDefault(),
                    (this._isContextLost = !1),
                    this.init(),
                    this.replayCurFrame(),
                    null === (t = this.onContextRestored) || void 0 === t || t.call(this);
                }),
                (this._config = e),
                (this._canvas = t),
                (this._gl = Object.assign(t.getContext("webgl", { preserveDrawingBuffer: "none" !== this._config.captureType }), {
                  y: null,
                  u: null,
                  v: null,
                })),
                this.bindEvents(!0),
                this.init();
            }
            init() {
              this._gl.pixelStorei(this._gl.UNPACK_ALIGNMENT, 1);
              const e = this._gl.createProgram(),
                t = this._gl.createShader(this._gl.VERTEX_SHADER);
              this._gl.shaderSource(t, ie), this._gl.compileShader(t);
              const i = this._gl.createShader(this._gl.FRAGMENT_SHADER);
              this._gl.shaderSource(i, ne),
                this._gl.compileShader(i),
                this._gl.attachShader(e, t),
                this._gl.attachShader(e, i),
                this._gl.linkProgram(e),
                this._gl.useProgram(e),
                this._gl.getProgramParameter(e, this._gl.LINK_STATUS) || a.b.log("[YUV-player] [ER] Shader link failed.");
              const n = this._gl.getAttribLocation(e, "aVertexPosition");
              this._gl.enableVertexAttribArray(n);
              const r = this._gl.getAttribLocation(e, "aTextureCoord");
              this._gl.enableVertexAttribArray(r);
              const s = this._gl.createBuffer();
              this._gl.bindBuffer(this._gl.ARRAY_BUFFER, s),
                this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), this._gl.STATIC_DRAW),
                this._gl.vertexAttribPointer(n, 2, this._gl.FLOAT, !1, 0, 0),
                (this._texCoordBuffer = this._gl.createBuffer()),
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer),
                this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._texcoords), this._gl.STATIC_DRAW),
                this._gl.vertexAttribPointer(r, 2, this._gl.FLOAT, !1, 0, 0),
                (this._gl.y = new re(this._gl)),
                (this._gl.u = new re(this._gl)),
                (this._gl.v = new re(this._gl)),
                this._gl.y.bind(0, e, "YTexture"),
                this._gl.u.bind(1, e, "UTexture"),
                this._gl.v.bind(2, e, "VTexture");
            }
            playFrame(e) {
              if (((this._curVideoFrame = e), this._isContextLost)) return;
              const { dataYSize: t, dataUSize: i, dataVSize: n, videoWidth: r, videoHeight: s, dataY: o, dataU: a, dataV: c } = e,
                h = new Uint8Array(o),
                u = new Uint8Array(a),
                l = new Uint8Array(c),
                {
                  tarX: d,
                  tarY: f,
                  tarW: _,
                  tarH: p,
                } = this.getContainViewport(r || 0, s || 0, this._gl.canvas.width, this._gl.canvas.height);
              this.updateTexcoords(t, s, r, s),
                this._gl.viewport(d, f, _, p),
                this.clearView(),
                this._gl.y.fill(t, s, h),
                this._gl.u.fill(i, s / 2, u),
                this._gl.v.fill(n, s / 2, l),
                this._gl.drawArrays(this._gl.TRIANGLE_STRIP, 0, 4);
            }
            replayCurFrame() {
              this._curVideoFrame && this.playFrame(this._curVideoFrame);
            }
            bindEvents(e = !1) {
              const t = e
                ? this._canvas.addEventListener.bind(this._canvas)
                : this._canvas.removeEventListener.bind(this._canvas);
              t("webglcontextlost", this.handleGLContextLost), t("webglcontextrestored", this.handleGLContextRestored);
            }
            updateTexcoords(e, t, i, n) {
              let r = 0,
                s = 0;
              (e === i && t === n) || ((r = (e - i + 1) / e), (s = (t - n) / t / 2)),
                (r === this._lastStridX && s === this._lastStridY) ||
                  ((this._lastStridX = r),
                  (this._lastStridY = s),
                  (this._lastStridX = r),
                  (this._lastStridY = s),
                  (this._texcoords[0] = 0),
                  (this._texcoords[1] = 1 - s),
                  (this._texcoords[2] = 1 - r),
                  (this._texcoords[3] = 1 - s),
                  (this._texcoords[4] = 0),
                  (this._texcoords[5] = 0 + s),
                  (this._texcoords[6] = 1 - r),
                  (this._texcoords[7] = 0 + s),
                  this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._texCoordBuffer),
                  this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._texcoords), this._gl.STATIC_DRAW));
            }
            getContainViewport(e, t, i, n) {
              const r = e / t,
                s = i / n;
              let o = 0,
                a = 0,
                c = i,
                h = n;
              return (
                r > s
                  ? ((c = i), (h = Math.round((i / e) * t)), (o = 0), (a = Math.round((n - h) / 2)))
                  : r < s && ((h = n), (c = Math.round((n / t) * e)), (a = 0), (o = Math.round((i - c) / 2))),
                { tarX: o, tarY: a, tarW: c, tarH: h }
              );
            }
            clearView() {
              this._gl && (this._gl.clearColor(0, 0, 0, 0), this._gl.clear(this._gl.COLOR_BUFFER_BIT));
            }
            stop() {}
            destroy() {
              this.bindEvents(!1),
                this.clearView(),
                (this.onContextLost = null),
                (this.onContextRestored = null),
                (this._config = null),
                (this._gl = null),
                (this._curVideoFrame = null);
            }
          }
          class oe {
            get playbackQuality() {
              const { creationTime: e, droppedVideoFrames: t, totalVideoFrames: i } = this;
              return { corruptedVideoFrames: 0, creationTime: e, droppedVideoFrames: t, totalVideoFrames: i };
            }
            constructor() {
              (this.hasPaused = !1),
                (this.lastSampleTime = 0),
                (this.frameRate = 25),
                (this.playbackRate = 1),
                (this.creationTime = Date.now()),
                (this.droppedVideoFrames = 0),
                (this.totalVideoFrames = 0),
                (this.hbTimestamp = 0),
                (this.hbCallback = () => {
                  const e = performance.now();
                  (this.hasPaused || e - this.hbTimestamp <= ce) && (this.hbTimestamp = e);
                }),
                this.setHeartBeatStatus(!0),
                this.reset();
            }
            reset() {
              (this.lastSampleTime = 0),
                (this.creationTime = Date.now()),
                (this.droppedVideoFrames = 0),
                (this.totalVideoFrames = 0),
                (this.hasPaused = !0);
            }
            pause() {
              this.sample(), (this.hasPaused = !0);
            }
            resume() {
              this.hasPaused && ((this.hasPaused = !1), (this.lastSampleTime = performance.now()));
            }
            setPlaybackRate(e) {
              this.sample(), (this.playbackRate = e);
            }
            setFrameRate(e) {
              this.sample(), (this.frameRate = e);
            }
            sample() {
              const e = performance.now();
              if (this.hasPaused) return;
              if (e - this.hbTimestamp > ce)
                return (
                  a.b.warn("[playback-quality] sample skipped due to heartBeat timeout"),
                  (this.hbTimestamp = e),
                  (this.lastSampleTime = e),
                  void (this.totalVideoFrames += 1)
                );
              const { lastSampleTime: t } = this;
              if (t > 0) {
                const i = e - t,
                  n = (1 / this.frameRate) * 1e3;
                (this.totalVideoFrames += Math.round((i / 1e3) * this.frameRate * this.playbackRate)),
                  i >= 2 * n &&
                    (a.b.warn("[playback-quality] stalled detected, render gap: " + i),
                    (this.droppedVideoFrames += Math.floor(((i - n) / n) * this.playbackRate)));
              }
              this.lastSampleTime = e;
            }
            destroy() {
              this.setHeartBeatStatus(!1);
            }
            setHeartBeatStatus(e = !0) {
              clearInterval(this.hbTimer),
                e && ((this.hbTimestamp = performance.now()), (this.hbTimer = self.setInterval(this.hbCallback, ae)));
            }
          }
          const ae = 300,
            ce = 1e3;
          class he extends EventTarget {
            get el() {
              return this.pipVideoEl;
            }
            get isInPictureInPicture() {
              return document.pictureInPictureElement === this.options.customElement;
            }
            constructor(e) {
              super(),
                (this.hasFrame = !1),
                (this.pipVideoEl = null),
                (this.pipExitTimer = null),
                (this.onEnterPip = () => {
                  this.options.emit(n.f.ENTER_PIP);
                }),
                (this.onExitPip = () => {
                  this.options.emit(n.f.LEAVE_PIP),
                    clearTimeout(this.pipExitTimer),
                    (this.pipExitTimer = self.setTimeout(() => {
                      this.setPipElDisplay(!1), this.pipVideoEl.pause(), (this.pipVideoEl.srcObject = null);
                    }, le));
                }),
                (this.options = e),
                (this.canvasEl = e.canvas),
                this.createPipEl();
            }
            setReplayFrameCb(e) {
              this.replayCurFrameCb = e;
            }
            requestPictureInPicture() {
              return this.doEnterPip();
            }
            exitPictureInPicture() {
              return document.exitPictureInPicture();
            }
            destroy() {
              this.pipVideoEl.removeEventListener("enterpictureinpicture", this.onEnterPip),
                this.pipVideoEl.removeEventListener("leavepictureinpicture", this.onExitPip),
                this.isInPictureInPicture && this.exitPictureInPicture(),
                (this.pipVideoEl = null);
            }
            createPipEl() {
              (this.pipVideoEl = document.createElement("video")),
                this.pipVideoEl.setAttribute("style", "width: 100%; height: 100%; z-index: -1; display: none;"),
                (this.pipVideoEl.muted = !0),
                this.canvasEl.insertAdjacentElement("afterend", this.pipVideoEl),
                this.pipVideoEl.addEventListener("enterpictureinpicture", this.onEnterPip),
                this.pipVideoEl.addEventListener("leavepictureinpicture", this.onExitPip);
            }
            doEnterPip() {
              if (!this.hasFrame) return Promise.reject(new DOMException(de));
              clearTimeout(this.pipExitTimer);
              const e = this.canvasEl.captureStream();
              return (
                (this.pipVideoEl.srcObject = e),
                this.pipVideoEl.play(),
                this.replayCurFrameCb(),
                new Promise((e, t) => {
                  const i = setTimeout(() => {
                      t(new DOMException(fe));
                    }, ue),
                    n = () => {
                      this.setPipElDisplay(!0),
                        clearTimeout(i),
                        this.pipVideoEl.removeEventListener("loadedmetadata", n),
                        e(this.pipVideoEl.requestPictureInPicture());
                    };
                  this.pipVideoEl.addEventListener("loadedmetadata", n);
                })
              );
            }
            setPipElDisplay(e) {
              (this.canvasEl.style.display = e ? "none" : "block"), (this.pipVideoEl.style.display = e ? "block" : "none");
            }
          }
          const ue = 500,
            le = 300,
            de =
              "Failed to execute 'requestPictureInPicture' on 'FakeVideoElement': Metadata for the video element are not loaded yet.",
            fe = "Failed to execute 'requestPictureInPicture' on 'FakeVideoElement': requestPictureInPicture timeout.";
          var _e = i(2),
            pe = i(4);
          class me extends HTMLElement {
            constructor() {
              super(),
                (this._quality = new oe()),
                (this._playbackRate = 1),
                (this._state = n.k.PLAYER_API_STATE_IDLE),
                (this._metadata = {}),
                (this._volume = 1),
                (this._muted = !1),
                (this._wasmReadyDefer = new c()),
                (this._buffered = new d()),
                (this._currentTime = 0),
                (this._paused = !1),
                (this._ended = !1),
                (this._seeking = !1),
                (this._buffering = !1),
                (this._readyState = 0),
                (this._isInited = !1),
                (this._preFrameRenderTimeStamp = 0),
                (this._bufferedDurationMs = 0),
                (this._metrics = Object.assign({}, _e.a)),
                (this._syncMetricsDeferQueue = new u()),
                (this.onRendererContextLost = () => {
                  this.emit(n.f.RENDERER_CONTEXT_LOST);
                }),
                (this.onRendererContextRestored = () => {
                  this.emit(n.f.RENDERER_CONTEXT_RESTORED);
                }),
                _e.d.start(_e.e.TPV_WORKER_INIT_COST),
                (this._wasmWorker = s()(6)),
                _e.d.end(_e.e.TPV_WORKER_INIT_COST, this._metrics),
                (this._wasmMsgHandlerMap = {
                  [n.b.CALL_MAIN_INIT_WORKER_OVER]: this.initWorkerOverHandler.bind(this),
                  [n.b.CALL_MAIN_REV_AUDIO_FRAME]: this.receiveAudioFrameHandler.bind(this),
                  [n.b.CALL_MAIN_REV_VIDEO_FRAME]: this.receiveVideoFrameHandler.bind(this),
                  [n.b.CALL_MAIN_UDPATE_METADATA]: this.updateMetadataHandler.bind(this),
                  [n.b.CALL_MAIN_STATE_CHANGE]: this.stateChangeHandler.bind(this),
                  [n.b.CALL_MAIN_SYNC_BUFFER_DURATION]: this.bufferSyncHandler.bind(this),
                  [n.b.CALL_MAIN_BUFFER_STATE_CHANGE]: this.bufferStateChangehandler.bind(this),
                  [n.b.CALL_MAIN_SEEK_STATE_CHANGE]: this.seekStateChangehandler.bind(this),
                  [n.b.CALL_MAIN_ERROR]: this.errorHandler.bind(this),
                  [n.b.CALL_MAIN_ENDED]: this.endedHandler.bind(this),
                  [n.b.CALL_MAIN_REQ_P2P]: this.onReqP2PFile.bind(this),
                  [n.b.CALL_MAIN_SYNC_METRIC]: this.onWorkerMetricSync.bind(this),
                }),
                this.createShadowRoot(),
                this.addResizeObserver(),
                this.setEvts(!0),
                (this._pipModule = new he({ customElement: this, canvas: this._canvasDom, emit: this.emit.bind(this) }));
            }
            canPlayType(e) {
              return "maybe";
            }
            set srcConfig(e) {
              this._src = e;
            }
            get srcConfig() {
              return this._src;
            }
            get duration() {
              return this._metadata.duration || 0;
            }
            get videoWidth() {
              return this._metadata.videoWidth || 0;
            }
            get videoHeight() {
              return this._metadata.videoHeight || 0;
            }
            get buffered() {
              return this._buffered;
            }
            get muted() {
              return this._muted;
            }
            set muted(e) {
              var t;
              this._muted !== e &&
                ((this._muted = e),
                null === (t = this._pcmPlayer) || void 0 === t || t.setMuted(e),
                this.emit(n.f.VOLUME_CHANGE, this._volume));
            }
            get paused() {
              return this._paused;
            }
            get ended() {
              return this._ended;
            }
            set currentTime(e) {
              this._currentTime !== e &&
                ((this._seeking = !0), (this._currentTime = e), this._wasmReadyDefer.promise.then(() => this.seekInner(e)));
            }
            get currentTime() {
              return this._currentTime;
            }
            get seeking() {
              return this._seeking;
            }
            get played() {
              return new d({ start: 0, end: this._currentTime });
            }
            get seekable() {
              return new d({ start: 0, end: this.duration });
            }
            get error() {
              return this._error;
            }
            get readyState() {
              return this._readyState;
            }
            get playbackRate() {
              return this._playbackRate;
            }
            set playbackRate(e) {
              if (this._playbackRate === e) return;
              if (-1 === [n.k.PLAYER_API_STATE_PAUSED, n.k.PLAYER_API_STATE_STARTED].indexOf(this._state))
                return void a.b.log(`[FakeVideoElement] set playbackRate in invaild state ${this._state}.`);
              if (e < n.i || e > n.h) return;
              (this._playbackRate = e), this._quality.setPlaybackRate(e);
              const t = { cmd: n.b.CALL_WORKER_SET_RATE, rate: e };
              this.mailToWorker(t),
                Promise.resolve().then(() => {
                  this.emit(n.f.RATE_CHANGE, this._playbackRate);
                });
            }
            set volume(e) {
              var t;
              if (this._volume !== e) {
                if (e < 0 || e > 1) throw new Error(`The volume provided (${e}) is outside the range [0, 1].`);
                (this._volume = e),
                  null === (t = this._pcmPlayer) || void 0 === t || t.setVolume(e),
                  this.emit(n.f.VOLUME_CHANGE, this._volume);
              }
            }
            get volume() {
              return this._volume;
            }
            set volumeGain(e) {
              this._pcmPlayer && (this._pcmPlayer.volumeGain = e);
            }
            get volumeGain() {
              var e;
              return (null === (e = this._pcmPlayer) || void 0 === e ? void 0 : e.volumeGain) || 0;
            }
            set audioEffect(e) {
              this._pcmPlayer && (this._pcmPlayer.audioEffect = e);
            }
            get audioEffect() {
              var e;
              return (null === (e = this._pcmPlayer) || void 0 === e ? void 0 : e.audioEffect) || "default";
            }
            getVideoPlaybackQuality() {
              return this._quality.playbackQuality;
            }
            load() {
              const { srcConfig: e } = this;
              Promise.all([this._wasmReadyDefer.promise, this.waitingStopState()])
                .then(() => this.loadInner(e))
                .catch(console.log);
            }
            play() {
              return Promise.all([this._wasmReadyDefer.promise, this.waitingStopState()]).then(() => this.playInner());
            }
            captureVideo(e = 0, t = 0, i = 0, r = 0) {
              const s = (e) => (this.emit(n.f.CAPTURE_OVER, e), e.error ? Promise.reject(e.error) : Promise.resolve(e));
              if (-1 === ["dataUrl", "imageData"].indexOf(this._config.captureType))
                return s({ error: new Error("captureType must be set to dataUrl/imageData") });
              const o = 0 === i ? this._canvasDom.width : i,
                a = 0 === r ? this._canvasDom.height : r,
                c = this._canvasDom.width,
                h = this._canvasDom.height;
              if (o <= 0 || a <= 0 || o > c || a > h || e < 0 || t < 0 || e >= c || t >= h)
                return s({ error: new Error("args illegal") });
              let u, l;
              try {
                if ("dataUrl" === this._config.captureType) u = this._canvasDom.toDataURL();
                else {
                  const i = document.createElement("canvas");
                  (i.width = o), (i.height = a);
                  const n = i.getContext("2d");
                  n.drawImage(this._canvasDom, e, t, o, a, 0, 0, o, a), (u = n.getImageData(0, 0, o, a));
                }
              } catch (e) {
                l = e;
              }
              return s({
                data: u,
                captureX: e,
                captureY: t,
                captureWidth: o,
                captureHeight: a,
                playtime: this._currentTime,
                error: l,
              });
            }
            pause() {
              var e;
              if (-1 === [n.k.PLAYER_API_STATE_STARTED].indexOf(this._state))
                return void a.b.log(`[FakeVideoElement] call pause in invaild state ${this._state}.`);
              this._quality.pause(), null === (e = this._pcmPlayer) || void 0 === e || e.pause();
              const t = { cmd: n.b.CALL_WORKER_PAUSE };
              this.mailToWorker(t);
            }
            connectedCallback() {
              this.init();
            }
            disconnectedCallback() {
              this.destroy();
            }
            p2pLoadSuccess(e, t, i) {
              this.setP2PFirstLoadCost(!1), this.mailToWorker({ cmd: n.b.CALL_WORKER_REQ_P2P_SUCCESS, url: e, buffer: t, ts: i });
            }
            p2pLoadFailed(e, t, i) {
              this.mailToWorker({ cmd: n.b.CALL_WORKER_REQ_P2P_FAILED, url: e, error: t, ts: i });
            }
            supportPictureInPicture() {
              return Boolean(document.pictureInPictureEnabled);
            }
            requestPictureInPicture() {
              return this._pipModule.requestPictureInPicture();
            }
            exitPictureInPicture() {
              return this._pipModule.exitPictureInPicture();
            }
            getMetrics() {
              return (function (e, t, i, n) {
                return new (i || (i = Promise))(function (r, s) {
                  function o(e) {
                    try {
                      c(n.next(e));
                    } catch (e) {
                      s(e);
                    }
                  }
                  function a(e) {
                    try {
                      c(n.throw(e));
                    } catch (e) {
                      s(e);
                    }
                  }
                  function c(e) {
                    var t;
                    e.done
                      ? r(e.value)
                      : ((t = e.value),
                        t instanceof i
                          ? t
                          : new i(function (e) {
                              e(t);
                            })).then(o, a);
                  }
                  c((n = n.apply(e, t || [])).next());
                });
              })(this, void 0, void 0, function* () {
                var e;
                yield null === (e = this._syncMetricsDeferQueue.end) || void 0 === e ? void 0 : e.promise;
                const t = new h(ge);
                return this._syncMetricsDeferQueue.push(t), this.mailToWorker({ cmd: n.b.CALL_WORKER_SYNC_METRICS }), t.promise;
              });
            }
            destroy() {
              this.setEvts(!1),
                this._quality.destroy(),
                this._pipModule.destroy(),
                this._wasmWorker && (this._wasmWorker.terminate(), (this._wasmWorker = null)),
                this._canvasDom && (this._canvasDom.remove(), (this._canvasDom = null)),
                this._pcmPlayer && (this._pcmPlayer.destroy(), (this._pcmPlayer = null)),
                this._yuvPlayer && (this._yuvPlayer.destroy(), (this._yuvPlayer = null)),
                this._resizeObserver.disconnect(),
                (this._evtMap = null);
            }
            createShadowRoot() {
              const e = this.attachShadow({ mode: "open" }),
                t = document.createElement("div");
              (t.innerHTML = "<canvas></canvas>"), (this._canvasDom = t.firstChild), e.appendChild(this._canvasDom);
            }
            addResizeObserver() {
              window.ResizeObserver &&
                ((this._resizeObserver = new ResizeObserver((e) => {
                  this.updateStyle();
                })),
                this._resizeObserver.observe(this));
            }
            updateStyle() {
              this._canvasDom.setAttribute("width", String(this.clientWidth * devicePixelRatio)),
                this._canvasDom.setAttribute("height", String(this.clientHeight * devicePixelRatio)),
                this._canvasDom.setAttribute("style", "width: 100%; height: 100%"),
                this._paused && this._yuvPlayer.replayCurFrame();
            }
            init() {
              if (this._isInited) return;
              this._isInited = !0;
              const e = {};
              Object.keys(n.m).forEach((t) => {
                const i = this.getAttribute(t);
                i && (e[t] = i);
              }),
                (this._config = Object.assign(Object.assign({}, n.m), e)),
                "true" === this._config.openLog && Object(a.a)(!0),
                a.b.log("[FakeVideoElement] init(), ", this._config),
                this.updateStyle(),
                this.mailToWorker(Object.assign({ cmd: n.b.CALL_WORKER_INIT_WORKER }, this._config));
            }
            emit(e, t) {
              this.dispatchEvent(new o(e, t));
            }
            setEvts(e) {
              this._evtMap || (this._evtMap = { onWasmWorkerMsg: this.onWasmWorkerMsg.bind(this) }),
                a.b.log("[FakeVideoElement] setEvts, ", e),
                this._wasmWorker && (this._wasmWorker.onmessage = e ? this._evtMap.onWasmWorkerMsg : null);
            }
            canRenderState(e) {
              return -1 !== [n.k.PLAYER_API_STATE_STARTED, n.k.PLAYER_API_STATE_PAUSED].indexOf(e);
            }
            initWorkerOverHandler() {
              a.b.log("[FakeVideoElement] ready!"),
                (this._yuvPlayer = new se(this._config, this._canvasDom)),
                (this._yuvPlayer.onContextLost = this.onRendererContextLost),
                (this._yuvPlayer.onContextRestored = this.onRendererContextRestored),
                (this._pcmPlayer = new te()),
                this._pcmPlayer.setVolume(this._volume),
                this._pcmPlayer.setMuted(this._muted),
                this._pcmPlayer.on(n.f.TIME_UPDATE, this.onTimeupdate.bind(this)),
                this._wasmReadyDefer.resolve(),
                this._pipModule.setReplayFrameCb(this._yuvPlayer.replayCurFrame.bind(this._yuvPlayer));
            }
            loadInner(e = this._src) {
              if (!e)
                return a.b.log("[FakeVideoElement] call loadInner with null src, then resetInner()"), void this.resetInner();
              if (-1 === [n.k.PLAYER_API_STATE_IDLE].indexOf(this._state))
                return void a.b.log(`[FakeVideoElement] call loadInner in invaild state ${this._state}.`);
              _e.d.start(_e.e.TPV_PREPARED_COST), this.emit(n.f.WAITING), (this._loadDefer = new c());
              const t = { cmd: n.b.CALL_WORKER_LOAD, videoConfig: e };
              this.mailToWorker(t);
            }
            playInner() {
              return this._src
                ? -1 !== [n.k.PLAYER_API_STATE_PAUSED].indexOf(this._state)
                  ? (this.mailToWorker({ cmd: n.b.CALL_WORKER_PLAY }),
                    this._quality.resume(),
                    this._pcmPlayer.resume(),
                    Promise.resolve())
                  : (this._loadDefer || this.loadInner(),
                    this._loadDefer.promise.then(() =>
                      -1 === [n.k.PLAYER_API_STATE_PREPARED].indexOf(this._state)
                        ? (a.b.log(`[FakeVideoElement] call playInner in invaild state ${this._state}.`), Promise.resolve())
                        : this._pcmPlayer.initAudioContext(this._metadata.audioSampleRate)
                        ? (this.mailToWorker({ cmd: n.b.CALL_WORKER_PLAY, playbackRate: this._playbackRate }),
                          this._quality.resume(),
                          Promise.resolve())
                        : (this._quality.pause(), Promise.reject(new DOMException(n.g.BLOCK_ERROR_MSG)))
                    ))
                : (a.b.log("[FakeVideoElement] " + n.g.NULL_SOURCE_ERROR_MSG),
                  Promise.reject(new DOMException(n.g.NULL_SOURCE_ERROR_MSG)));
            }
            seekInner(e) {
              if (-1 === [n.k.PLAYER_API_STATE_PAUSED, n.k.PLAYER_API_STATE_STARTED].indexOf(this._state))
                return void a.b.log(`[FakeVideoElement] call seekInner in invaild state ${this._state}.`);
              const t = Math.max(0, Math.min(e, this._metadata.duration - 0.01)),
                i = { cmd: n.b.CALL_WORKER_SEEK, timeS: t };
              this.mailToWorker(i);
            }
            resetInner() {
              -1 === [n.k.PLAYER_API_STATE_IDLE].indexOf(this._state)
                ? (this.mailToWorker({ cmd: n.b.CALL_WORKER_LOAD, videoConfig: null }),
                  a.b.log("[FakeVideoElement] resetInner(), reset all components."),
                  (this._metrics.tpvP2pFirstLoadCostMs = -1),
                  (this._pipModule.hasFrame = !1),
                  this._quality.reset(),
                  this._pcmPlayer.stop(),
                  this._yuvPlayer.stop(),
                  (this._loadDefer = null),
                  (this._readyState = 0),
                  (this._buffered = new d()),
                  (this._currentTime = 0),
                  (this._metadata = {}),
                  (this._error = void 0),
                  (this._seeking = !1),
                  this.startListenStopState())
                : a.b.log(`[FakeVideoElement] call resetInner in invaild state ${this._state}.`);
            }
            startListenStopState() {
              this._stopDefer = new c();
            }
            resolveStopState() {
              var e;
              null === (e = this._stopDefer) || void 0 === e || e.resolve(), (this._stopDefer = null);
            }
            waitingStopState() {
              return this._stopDefer ? this._stopDefer.promise : Promise.resolve();
            }
            mailToWorker(e) {
              this._wasmWorker.postMessage(
                Object.assign(Object.assign({}, e), { timestamp: performance.now() + performance.timeOrigin })
              );
            }
            receiveAudioFrameHandler(e) {
              this.canRenderState(this._state) &&
                (this._pcmPlayer.playFrame(e), this.mailToWorker({ cmd: n.b.CALL_WORKER_PLAY_AUDIO_FRAME_OK }));
            }
            receiveVideoFrameHandler(e) {
              this.canRenderState(this._state) &&
                (this._yuvPlayer.playFrame(e),
                this.afterVideoFrameRender(e),
                this.mailToWorker({ cmd: n.b.CALL_WORKER_PLAY_VIDEO_FRAME_OK }));
            }
            updateMetadataHandler(e) {
              (this._metadata = Object.assign(this._metadata, e)),
                this._metadata.duration > 0 && this.emit(n.f.DURATION_CHANGE, this.duration),
                this._metadata.videoWidth > 0 &&
                  ((this._pipModule.hasFrame = !0), this.emit(n.f.LOADED_METADATA, this._metadata)),
                this._metadata.videoFrameRate > 0 && this._quality.setFrameRate(this._metadata.videoFrameRate);
            }
            stateChangeHandler(e) {
              const t = this._state,
                i = e.state;
              t !== i &&
                (a.b.log(`[FakeVideoElement] state change from [${t}] to [${i}].`),
                (this._state = i),
                this.innerStateChangeHandler(i),
                this.emit(n.f.STATE_CHANGE, { old: t, new: i }));
            }
            innerStateChangeHandler(e) {
              if (e !== n.k.PLAYER_API_STATE_IDLE)
                return e === n.k.PLAYER_API_STATE_PREPARED
                  ? ((this._metrics.tpvIsModuleHot = null !== this._metrics.tpvIsModuleHot),
                    _e.d.end(_e.e.TPV_PREPARED_COST, this._metrics),
                    this._loadDefer.resolve(),
                    (this._readyState = 4),
                    void this.emit(n.f.CANPLAY))
                  : e === n.k.PLAYER_API_STATE_PAUSED
                  ? ((this._paused = !0), void this.emit(n.f.PAUSE))
                  : e === n.k.PLAYER_API_STATE_STARTED
                  ? ((this._paused = !1), void this.gotoPlaying())
                  : void 0;
              this.resolveStopState();
            }
            endedHandler() {
              (this._ended = !0), this.emit(n.f.ENDED);
            }
            onReqP2PFile(e) {
              this.setP2PFirstLoadCost(!0), this.emit(n.f.REQ_P2P, e);
            }
            onWorkerMetricSync(e) {
              (this._metrics = Object.assign(Object.assign({}, this._metrics), e.metrics)),
                this._syncMetricsDeferQueue.resolve(this._metrics);
            }
            bufferSyncHandler(e) {
              const t = null == e ? void 0 : e.bufferedDurationMs;
              if (t <= 0) return;
              if (this._state !== n.k.PLAYER_API_STATE_STARTED && t === this._bufferedDurationMs) return;
              const i = Math.max(0, this._currentTime - 1),
                r = Math.min(this._currentTime + t / 1e3, this.duration);
              (this._bufferedDurationMs = t),
                this._buffered.setRange({ start: i, end: r }),
                this.emit(n.f.PROGRESS, { start: i, end: r });
            }
            bufferStateChangehandler(e) {
              (this._buffering = 1 === e.isBuffering),
                this._buffering
                  ? (this._quality.pause(), this.emit(n.f.WAITING))
                  : this._state !== n.k.PLAYER_API_STATE_STARTED || this._seeking || (this.gotoPlaying(), this._quality.resume());
            }
            seekStateChangehandler(e) {
              (this._seeking = 1 === e.isSeeking),
                this._seeking
                  ? (this._quality.pause(), this.emit(n.f.SEEKING))
                  : (this.emit(n.f.SEEKED),
                    this._state === n.k.PLAYER_API_STATE_STARTED && (this.gotoPlaying(), this._quality.resume()));
            }
            errorHandler(e) {
              (this._error = e), this._seeking && (this._seeking = !1), this.emit(n.f.ERROR, this._error);
            }
            onWasmWorkerMsg(e) {
              const t = Object(pe.a)(),
                { data: i } = e,
                { cmd: r, timestamp: s } = i;
              -1 ===
                [n.b.CALL_MAIN_REV_AUDIO_FRAME, n.b.CALL_MAIN_REV_VIDEO_FRAME, n.b.CALL_MAIN_SYNC_BUFFER_DURATION].indexOf(r) &&
                a.b.log("[FakeVideoElement] main-thread get cmd: ", r),
                (this._metrics.tpvMailCostMs += Math.max(t - s, 0)),
                (this._metrics.tpvMailCount += 1),
                this._wasmMsgHandlerMap[r] && (delete i.cmd, this._wasmMsgHandlerMap[r](i));
            }
            onTimeupdate(e) {
              this._seeking ||
                ((this._currentTime = e.data),
                this._currentTime > 0 && (this._ended = !1),
                this.emit(n.f.TIME_UPDATE, this._currentTime));
            }
            gotoPlaying() {
              (this._preFrameRenderTimeStamp = 0), this.emit(n.f.PLAYING);
            }
            setP2PFirstLoadCost(e = !0) {
              if (!(this._metrics.tpvP2pFirstLoadCostMs >= 0))
                return e ? _e.d.start(_e.e.TPV_P2P_FIRST_LOAD_COST) : void _e.d.end(_e.e.TPV_P2P_FIRST_LOAD_COST, this._metrics);
            }
            afterVideoFrameRender(e) {
              const { decodeCostTimeMs: t, ptsMs: i } = e,
                r = performance.now();
              let s = this._metadata.videoFrameRate > 0 ? 1e3 / this._metadata.videoFrameRate / this.playbackRate : 0;
              this._quality.sample(),
                this._preFrameRenderTimeStamp > 0 &&
                  this._state === n.k.PLAYER_API_STATE_STARTED &&
                  !this._seeking &&
                  !this._buffering &&
                  !this._paused &&
                  (s = r - this._preFrameRenderTimeStamp),
                (this._preFrameRenderTimeStamp = r);
              const { totalVideoFrames: o, droppedVideoFrames: a } = this._quality.playbackQuality;
              this.emit(n.f.VIDEO_FRAME_RENDER, {
                ptsMs: i,
                decodeCostTimeMs: t,
                renderCostTime: s,
                totalVideoFrames: o,
                droppedVideoFrames: a,
              });
            }
          }
          const ge = 300;
          function Ee(e) {
            try {
              return decodeURIComponent(e.replace(/\+/g, " "));
            } catch (e) {
              return null;
            }
          }
          function ve(e) {
            const [t, i = ""] = e.split("#"),
              [n, r = ""] = t.split("?"),
              s = Ee(i),
              o = Object.create(null);
            return (
              r.split("&").forEach((e) => {
                const [t, i = ""] = e.split("="),
                  n = Ee(t),
                  r = Ee(i);
                null === n || null === r || ("" === n && "" === r) || o[n] || (o[n] = r);
              }),
              { url: n, query: o, hash: s }
            );
          }
          function ye() {
            return window.SharedArrayBuffer && window.WebAssembly && window.Atomics;
          }
          const Ce = { PROMISE: "Promise", NON_PROMISE: "NonPromise" };
          var be;
          !(function (e) {
            e.IFRAME_READY = "iframeReady";
          })(be || (be = {}));
        },
      ]);
    },
    function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, "FakeVideoElementIframe", function () {
          return a;
        });
      var n = i(0);
      const r = "iframePageDomCostMs",
        s = { iframePageMailCostMs: 0, iframePageMailCount: 0, iframePageDomCostMs: -1 };
      var o = function (e, t, i, n) {
        return new (i || (i = Promise))(function (r, s) {
          function o(e) {
            try {
              c(n.next(e));
            } catch (e) {
              s(e);
            }
          }
          function a(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? r(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function (e) {
                      e(t);
                    })).then(o, a);
          }
          c((n = n.apply(e, t || [])).next());
        });
      };
      window.customElements && window.customElements.define("fake-video", n.FakeVideoElement);
      class a {
        constructor() {
          (this._urlConfigs = Object(n.parseUrl)(location.href).query),
            (this._parentDomain = ""),
            (this._onIframeReadyHandler = this.onIframeReady.bind(this)),
            (this._metrics = Object.assign({}, s)),
            this.appendSABToken(),
            this.setDomain(),
            window.addEventListener("load", this._onIframeReadyHandler);
        }
        appendSABToken() {
          const e = document.createElement("meta");
          (e.httpEquiv = "origin-trial"),
            (e.content = this._urlConfigs.token ? decodeURIComponent(this._urlConfigs.token) : n.SAB_STR),
            document.getElementsByTagName("head")[0].appendChild(e);
        }
        setDomain() {
          const { domain: e } = this._urlConfigs;
          e && location.host !== e && location.host.endsWith("." + e) && (document.domain = e);
        }
        mailToHost(e, t, i) {
          if (!t && "functionReturnType" in e) throw new Error("functionReturnType must be used with msgId");
          const r = { msgId: t, instanceId: this._instIdx, timestamp: Object(n.getNow)(), data: e };
          return window.parent.postMessage(r, this._parentDomain, i);
        }
        onIframeReady() {
          window.removeEventListener("load", this._onIframeReadyHandler), n.PerformanceWrapper.start(r);
          this.createElement() && (this.addElementToContainer(), this.setEvts(!0)),
            n.PerformanceWrapper.end(r, this._metrics),
            this.mailToHost({ evtType: n.IFRAME_EVENT.IFRAME_READY, evtData: {} });
        }
        createElement() {
          const e = Object.assign({}, n.fakeVideoDefaultConfig);
          if (
            (Object.keys(e).forEach((t) => {
              this._urlConfigs[t] && (e[t] = this._urlConfigs[t]);
            }),
            "true" === e.openLog && Object(n.enableLogs)(!0),
            (this._parentDomain = this._urlConfigs.origin),
            (this._instIdx = Number(this._urlConfigs.instIdx)),
            Number.isNaN(this._instIdx))
          )
            return n.logger.warn(`Invalid _instIdx ${this._instIdx} in FakeVideoIframe`);
          if (Object(n.isEnvSupport)())
            return (
              (this._fakeVideoElement = document.createElement("fake-video")),
              Object.keys(e).forEach((t) => {
                this._fakeVideoElement.setAttribute(t, e[t]);
              }),
              (this._fakeVideoElement.style.position = "absolute"),
              (this._fakeVideoElement.style.width = "100%"),
              (this._fakeVideoElement.style.height = "100%"),
              (this._fakeVideoElement.style.top = "0"),
              (this._fakeVideoElement.style.left = "0"),
              !0
            );
          try {
            localStorage.setItem(
              "thumbplayer-h5-hevcspt",
              JSON.stringify({
                sab: window.SharedArrayBuffer ? "1" : "0",
                wasm: window.WebAssembly ? "1" : "0",
                atomics: window.Atomics ? "1" : "0",
              })
            );
          } catch (e) {}
          return (
            this.mailToHost({
              evtType: n.FAKE_VIDEO_ELEMENT_EVENT.ERROR,
              evtData: { code: n.ERROR_CODE.NOT_SUPPROT, message: n.GENERAL_ERROR_MSG.getNotSptErrMsg(this._parentDomain) },
            }),
            !1
          );
        }
        addElementToContainer() {
          document.querySelector("#fake-video-container").appendChild(this._fakeVideoElement);
        }
        setEvts(e) {
          this._evtMap ||
            (this._evtMap = { element: this.onElementEvtHandler.bind(this), windowMsg: this.onReceiveWindowMsg.bind(this) }),
            this._fakeVideoElement &&
              (Object.keys(n.FAKE_VIDEO_ELEMENT_EVENT).forEach((t) => {
                const i = n.FAKE_VIDEO_ELEMENT_EVENT[t];
                e
                  ? this._fakeVideoElement.addEventListener(i, this._evtMap.element)
                  : this._fakeVideoElement.removeEventListener(i, this._evtMap.element);
              }),
              e
                ? window.addEventListener("message", this._evtMap.windowMsg)
                : window.removeEventListener("message", this._evtMap.windowMsg));
        }
        onElementEvtHandler(e) {
          this.mailToHost({ evtType: e.type, evtData: e.data }),
            e.type === n.FAKE_VIDEO_ELEMENT_EVENT.TIME_UPDATE && this.adjustCanvasSize();
        }
        adjustCanvasSize() {
          const e = this._fakeVideoElement.querySelector("canvas");
          if (!e) return;
          const t = +e.getAttribute("width"),
            i = +e.getAttribute("height");
          (t > 0 && i > 0) ||
            (document.body.clientWidth > 0 && e.setAttribute("width", "" + document.body.clientWidth),
            document.body.clientHeight > 0 && e.setAttribute("height", "" + document.body.clientHeight));
        }
        onReceiveWindowMsg(e) {
          const t = Object(n.getNow)(),
            { source: i, data: r } = e,
            {
              data: { functionName: s, functionParams: o },
              instanceId: a,
              timestamp: c,
            } = r;
          if (i === window || a !== this._instIdx) return;
          c > 0 && (this._metrics.iframePageMailCostMs += Math.max(t - c, 0)),
            (this._metrics.iframePageMailCount += 1),
            n.logger.log("[FakeVideoElementIframe] onReceiveWindowMsg: ", e.data);
          const h = this._fakeVideoElement;
          if (!h) return;
          const u = s.match(/^set\s{1}(.*)/);
          if (2 === (null == u ? void 0 : u.length)) h[u[1]] = o[0];
          else if ("function" == typeof h[s]) {
            const e = h[s].apply(h, [].concat(o));
            this.handlerFunctionExecResult(r, e);
          }
        }
        handlerFunctionExecResult(e, t) {
          const {
            msgId: i,
            data: { functionName: n },
          } = e;
          return t instanceof Promise ? this.returnPromiseFnRet(i, n, t) : this.returnNonPromiseFnRet(i, n, t);
        }
        returnNonPromiseFnRet(e, t, i) {
          this.mailToHost(
            { functionName: t, functionReturnType: n.IFRAME_FN_RET_TYPE.NON_PROMISE, functionReturnData: { data: i } },
            e
          );
        }
        returnPromiseFnRet(e, t, i) {
          return o(this, void 0, void 0, function* () {
            let r = { state: n.PROMISE_STATE.FULFILLED, data: void 0 };
            try {
              (r.data = yield i),
                "getMetrics" === t &&
                  "object" == typeof r.data &&
                  (r.data = Object.assign(Object.assign({}, r.data), this._metrics));
            } catch (e) {
              r = { state: n.PROMISE_STATE.REJECTED, data: e };
            }
            this.mailToHost({ functionName: t, functionReturnType: n.IFRAME_FN_RET_TYPE.PROMISE, functionReturnData: r }, e);
          });
        }
      }
      a.instance = new a();
    },
  ])
);
