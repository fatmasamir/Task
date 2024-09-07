import { createApp, markRaw } from "vue";

// router
import router from "./router/index.js";

// styles
import "normalize.css";
import "./assets/scss/main.scss";

// app
import App from "./App.vue";

// bootstrap
import "@popperjs/core";

// i18n
import i18n from "./i18n/i18n.js";
import "vue-toastification/dist/index.css";

// pinia
import { createPinia } from "pinia";

// Toast
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
import "aos/dist/aos.css";
const app = createApp(App);
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
//pinia
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(VueSweetalert2)
  .use(vuetify)
  .use(Toast, {
    // Setting the global default position
    position: POSITION.TOP_LEFT,
  })
  .mount("#app");
