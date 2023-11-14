/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */
import Vue3MobileDetection from "vue3-mobile-detection";
import router from "../router";
// Plugins
import vuetify from "./vuetify";
export function registerPlugins(app) {
  app.use(vuetify).use(router).use(Vue3MobileDetection);
}
