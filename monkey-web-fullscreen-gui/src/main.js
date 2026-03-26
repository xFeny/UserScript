import "./css/index.scss";
import "tippy.js/dist/tippy.css";
import Layout from "./control/layout";
import Control from "./control";

const App = { ...Control, ...Layout };
App.init();
