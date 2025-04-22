// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import router from "./router"; // Import the router

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: { Notify }, // Add Notify plugin here
});

myApp.use(router); // Tell Vue to use the router

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
