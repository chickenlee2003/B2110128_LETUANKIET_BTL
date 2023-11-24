// import "./assets/main.css";

// import { createApp } from "vue";
// import App from "./App.vue";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import router from "./router";

// createApp(App).use(router).mount("#app");
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
// import { createPinia } from "pinia";
import store from "./store/store";

if (typeof window.global === "undefined") {
  window.global = window;
}
import jQuery from "jquery";
global.jQuery = jQuery;
global.$ = jQuery;

const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");

//createApp(App).use(router, createPinia()).mount("#app");
