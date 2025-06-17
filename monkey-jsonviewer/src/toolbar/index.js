import tabs from "./tabs";
import theme from "./theme";
import tools from "./tools";
import handleBar from "./handleBar";

tabs.init();
theme.setTheme();
handleBar.init();
window.addEventListener("message", function ({ data }) {
  if (Object.is(data?.type, "tools")) return tools[data?.value]();
  if (Object.is(data?.type, "theme")) return theme.changeTheme(data?.value);
});
