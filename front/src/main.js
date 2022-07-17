import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import "@/assets/css/variables.scss";
import "@/assets/css/main.scss";
import setupInterceptors from './services/setupInterceptors';
import vClickOutside from "click-outside-vue3"

setupInterceptors(store);

createApp(App)
    .use(router)
    .use(store)
    .use(vClickOutside)
    .mount('#app')
