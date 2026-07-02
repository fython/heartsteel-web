import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";

import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/noto-sans-sc/chinese-simplified-500.css";
import "@fontsource/roboto-condensed/400.css";
import "./assets/main.less";

const app = createApp(App);

app.use(i18n);
app.mount("#app");
