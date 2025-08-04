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
