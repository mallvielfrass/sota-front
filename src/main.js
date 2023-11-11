/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Import Bootstrap and BootstrapVue CSS files (order is important)

import App from "./App.vue";
// Components
import { createApp } from "vue";
// Plugins
import { registerPlugins } from "@/plugins";
import { socketIo } from "./socketio/socket";
socketIo.connect();
const app = createApp(App);

registerPlugins(app);

app.mount("#app");
