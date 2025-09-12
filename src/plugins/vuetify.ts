// ##############
// # インポート #
// ##############

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// ++++++++++++++++++++++++++++
// + インポート　＞　Tauri 用 +
// ++++++++++++++++++++++++++++

import 'vuetify/styles'; // Vuetifyの基本スタイルをインポート
//import { createApp } from 'vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

// ################
// # スタイル設定 #
// ################

// https://vuetifyjs.com/ja/features/theme/#custom-themes
const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',  /* Tauri, Next サンプル用 */
        surface: '#FFFFFF',
        'surface-bright': '#FFFFFF',
        'surface-light': '#EEEEEE',
        'surface-variant': '#424242',
        'on-surface-variant': '#EEEEEE',
        primary: '#1867C0',
        'primary-darken-1': '#1F5592',
        secondary: '#48A9A6',
        'secondary-darken-1': '#018786',
        'text-dark': '#F0F0F0',
        'text-light': '#303030',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
    variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
    }
}


// ################
// # エクスポート #
// ################

// Tauri, Nuxt でほぼ共通部分：
const vuetifyOptions = {
    components,
    directives,
    icons: {
        defaultSet: 'mdi',  // Tauri では、 <v-checkbox> の四角い部分を描画するのに必要
        aliases,    // Tauri では、 <v-checkbox> の四角い部分を描画するのに必要
        sets: { mdi },  // Tauri では、 <v-checkbox> の四角い部分を描画するのに必要
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
};

// Tauri 用：
export default createVuetify(vuetifyOptions);

// Nuxt 用：
//      省略
