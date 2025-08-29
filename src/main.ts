import { createApp } from "vue";
import App from "./app.vue";

import 'vuetify/styles'; // VuetifyのCSSをインポート
import pluginsVuetify from '../plugins/vuetify'; // さっきのプラグインファイルをインポート

import router from './router';  // ルーター


createApp(App)
    .use(pluginsVuetify)    // VueアプリにVuetifyを登録
    .use(router)            // Vueアプリにルーターを登録
    .mount("#app");
