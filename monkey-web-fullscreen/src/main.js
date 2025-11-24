import "./application/player/VideoEnhancer";
import handlers from "./application";

import "sweetalert2/dist/sweetalert2.min.css";
import "notyf/notyf.min.css";
import "./style.scss";

unsafeWindow.AUTO_WEB_FULLSCREEN = window.App = {};
handlers.forEach((handler) => {
  // 将Handler方法变为App的方法，内部this指向App
  Object.entries(handler).forEach(([key, value]) => {
    App[key] = value instanceof Function ? value.bind(App) : value;
  });
});

App.init();
