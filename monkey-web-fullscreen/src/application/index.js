import Listen from "./handler/ListenerHandler";
import Keydown from "./handler/KeydownHandler";
import Events from "./handler/VideoEventsHandler";
import Control from "./handler/VideoControlHandler";
import WebFull from "./handler/WebFullScreenHandler";
import Automatic from "./handler/AutoExecuteHandler";
import Episode from "./handler/EpisodeSwitchHandler";
import EpisodePicker from "./handler/EpisodePickerHandler";
import Extend from "./handler/VideoExtendHandler";
import Ignore from "./handler/IgnoreUrlsHandler";
import Menu from "./handler/MenuHandler";

const handlers = [Listen, Keydown, Events, Control, WebFull, Automatic, Episode, EpisodePicker, Extend, Ignore, Menu];
unsafeWindow.AUTO_WEB_FULLSCREEN = window.App = {};

// 合并处理器方法到App并绑定上下文
handlers.forEach((handler) => {
  const entries = Object.entries(handler);
  for (const [key, value] of entries) {
    App[key] = value instanceof Function ? value.bind(App) : value;
  }
});

App.init();
