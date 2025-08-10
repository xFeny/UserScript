import "./style.scss";
import App from "./application";
import Keydown from "./application/handler/KeydownHandler";
import WebLogin from "./application/handler/WebLoginHandler";
import MenuCommand from "./application/handler/MenuCommandHandler";
import VideoControl from "./application/handler/VideoControlHandler";
import WebFullScreen from "./application/handler/WebFullScreenHandler";
import SwitchEpisode from "./application/handler/SwitchEpisodeHandler";
import PickerEpisode from "./application/handler/PickerEpisodeHandler";
import WebFullEnhance from "./application/handler/WebFullEnhanceHandler";
import VideoEnhancer from "./application/player/VideoEnhancer";
import "sweetalert2/dist/sweetalert2.min.css";
import "notyf/notyf.min.css";

[Keydown, WebLogin, MenuCommand, VideoControl, WebFullScreen, WebFullEnhance, SwitchEpisode, PickerEpisode].forEach((handler) => {
  // 将Handler方法变为App的方法，内部this指向App
  Object.entries(handler).forEach(([key, value]) => {
    App[key] = value instanceof Function ? value.bind(App) : value;
  });
});

window.videoEnhance = new VideoEnhancer();
unsafeWindow.AUTO_WEB_FULLSCREEN = App;
App.init();
