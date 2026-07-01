import { createApp } from "vue";
import App from "./App.vue";
import { createVfm } from "vue-final-modal";

import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/noto-sans-sc/chinese-simplified-500.css";
import "@fontsource/roboto-condensed/400.css";
import "vue-final-modal/style.css";
import "./assets/main.less";

const app = createApp(App);

const vfm = createVfm();
app.use(vfm);

app.mount("#app");
