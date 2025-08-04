# 始め方４：　Vuetify3 のインストール

Vue を直接使ってフロントエンドをコーディングするだけでなく、 Vuetify3 越しにフロントエンドをコーディングしていくことにします。  

カレントディレクトリーの例： 📁 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\tauri-vue-sample`  

```shell
pnpm add vuetify
        Packages: +1
        +
        Downloading vuetify@3.9.3: 7.37 MB/7.37 MB, done
        Progress: resolved 109, reused 53, downloaded 1, added 1, done

        dependencies:
        + vuetify 3.9.3

        Done in 3.5s using pnpm v10.11.0
```

## /src/main.ts の編集

編集前：  

```ts
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

編集後：  

```ts
import { createApp } from "vue";
import App from "./App.vue";

import 'vuetify/styles'; // VuetifyのCSSをインポート
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetifyインスタンスを作成
const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' }, // テーマ設定（任意）
});

createApp(App)
    .use(vuetify)   // VueアプリにVuetifyを登録
    .mount("#app");
```

## template を、Vue から Vuetify3 へ単純に換装。レイアウトは崩れてしまう

変更前：  

```vue
<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <form class="row" @submit.prevent="greet">
      <input id="greet-input" v-model="name" placeholder="Enter a name..." />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
  </main>
</template>
```

変更後：  

```vue
<template>
    <!-- FIXME: Vue3 から Vuetify3 にタグを単純に書き換えると、レイアウトが崩れてしまった。  -->
    <v-app>
        <v-main>
            <v-container class="container">

                <h1>Welcome to Tauri + Vue</h1>

                <v-container class="row">
                    <!-- FIXME: なぜかボタンの画像が下にずれてしまう。 -->
                    <v-btn icon href="https://vitejs.dev" target="_blank">
                        <v-img src="/vite.svg" class="logo vite" alt="Vite logo" />
                    </v-btn>
                    <v-btn icon href="https://tauri.app" target="_blank">
                        <v-img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
                    </v-btn>
                    <v-btn icon href="https://vuejs.org/" target="_blank">
                        <v-img :src="AssetsVueLogoSvg" class="logo vue" alt="Vue logo" />
                    </v-btn>
                </v-container>

                <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

                <v-form class="row" @submit.prevent="greet">
                    <v-text-field id="greet-input" v-model="name" placeholder="Enter a name..."></v-text-field>
                    <v-btn type="submit" class="button">Greet</v-btn>
                </v-form>

                <p>{{ greetMsg }}</p>

            </v-container>
        </v-main>
    </v-app>
</template>
```
