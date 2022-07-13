import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import store from "./store";
import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";
const app = createApp(App);

app.use(VCalendar, {});
app.use(router);
app.use(store);
app.mount("#app");
