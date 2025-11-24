import App from "./application";
import "./application/player/VideoEnhancer";
import Keydown from "./application/handler/KeydownHandler";
import WebLogin from "./application/handler/WebLoginHandler";
import MenuCommand from "./application/handler/MenuCommandHandler";
import AutoExecute from "./application/handler/AutoExecuteHandler";
import VideoControl from "./application/handler/VideoControlHandler";
import WebFullScreen from "./application/handler/WebFullScreenHandler";
import EpisodeSwitch from "./application/handler/EpisodeSwitchHandler";
import EpisodePicker from "./application/handler/EpisodePickerHandler";
import WebFullEnhance from "./application/handler/WebFullEnhanceHandler";
import SettMessage from "./application/handler/SettMessageHandler";
import IgnoreUrls from "./application/handler/IgnoreUrlsHandler";

import "sweetalert2/dist/sweetalert2.min.css";
import "notyf/notyf.min.css";
import "./style.scss";

[
  Keydown,
  IgnoreUrls,
  SettMessage,
  MenuCommand,
  VideoControl,
  WebFullScreen,
  WebFullEnhance,
  EpisodeSwitch,
  EpisodePicker,
  AutoExecute,
  WebLogin,
].forEach((handler) => {
  // 将Handler方法变为App的方法，内部this指向App
  Object.entries(handler).forEach(([key, value]) => {
    App[key] = value instanceof Function ? value.bind(App) : value;
  });
});

unsafeWindow.AUTO_WEB_FULLSCREEN = App;
App.init();
