# ジャーナル2025-08

## [2025-08-05_Tue]

複数ページに対応したい。  

### 1. Vue Router をプロジェクトに追加

```shell
# Vue3 用
pnpm add vue-router@4
```

### 2. ルーターの設定

src フォルダ内にルーティングを設定するファイルを作るぜ。

#### a. ルーターの定義

📄 `src/router/index.ts` を作成して、こんな感じのコードを書く：

```js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';       // ホームページのコンポーネント
import About from '../views/About.vue';     // 別ページの例

const routes = [
    {
        path: '/',          // URL
        name: 'Home',
        component: Home,    // importしたビュー
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    // 他のルートはここに追加
];

const router = createRouter({
  history: createWebHistory(),      // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
  routes,
});

export default router;
```

#### b. ページ用のコンポーネント作成

📄 `/src/views/Home.vue`:  

```vue
<template>
    <div>
        <h1>ホームだぜ！</h1>
        <router-link to="/about">About ページへ</router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({    // Vue 3 の TypeScript 対応コンポーネント定義に必須。
    name: 'Home',
    });
</script>
```

📄 `src/views/About.vue`:  

```vue
<template>
    <div>
        <h1>About ページだぜ！</h1>
        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({    // Vue 3 の TypeScript 対応コンポーネント定義に必須。
        name: 'About',
    });
</script>
```


### 3. Vue にルーターを統合

src/main.js を編集して、ルーターをアプリに組み込む：  

📄 `/src/main.ts`:  

変更前：  

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

追加したいもの（抜粋）：  

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

src/App.vue に <router-view> を追加して、ルートに応じたコンポーネントを表示：  

```vue
<template>
    <div id="app">

        <!-- 🌟これを追加。このビューにコンポーネントがレンダリングされる。 -->
        <router-view />

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
});
</script>
```


### 4. ナビゲーションの追加

📄 `/src/App.vue`:  

```vue
<template>
    <div id="app">
        <!-- 🌟ナビゲーション -->
        <nav>
            <router-link to="/">ホーム</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'App',
    });
</script>
```

### onMountedの練習、ファイル読込の練習

```shell
pnpm add @tauri-apps/api

# 開発依存関係
#pnpm add -D @tauri-apps/api

pnpm list @tauri-apps/api
        Legend: production dependency, optional only, dev only

        vue-tauri-desktopapp-sample@0.1.0 C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample (PRIVATE)

        devDependencies:
        @tauri-apps/api 2.7.0

# キャッシュクリア
pnpm store prune

# 再インストール
pnpm install
```

#### バージョン確認

```shell
pnpm tauri --version
        > vue-tauri-desktopapp-sample@0.1.0 tauri C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample
        > tauri "--version"

        tauri-cli 2.7.1
```

#### ファイルシステムのインストール

📄 `/src-tauri/capabilities/default.json` ファイルを確認：  

確認する箇所：  

```json
{
    "permissions": [
        "fs:default"
    ]
}
```

👆 `fs:default` がすでに記述されていると、 `pnpm tauri add fs` コマンドで失敗するので、  
`fs:default` は消しておく。  

📄 [file-system](https://v2.tauri.app/plugin/file-system/)  

```ts
    // これは Tauri 2 で動かない
    //import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

    // Tauri 2
    import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
```

```shell
pnpm tauri add fs
```


#### テキストファイルの読み込み方

📖 [Tauri 2.0でローカルファイルを読み込んでみる(plugin-fs)](https://zenn.dev/playree/articles/04242346d343e6)  

```shell
pnpm add @tauri-apps/plugin-fs

# Rust側
# cd src-tauri
# cargo add tauri-plugin-fs
```

📄 `/src-tauri/src/lib.rs` 抜粋:  

```rs
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())    // 🌟追加
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

📄 `/src-tauri/capabilities/default.json`:  

```json
{
    "permissions": [
        "fs:default",
        {
            "identifier": "fs:scope",
            "allow": [{ "path": "$HOME" }, { "path": "$HOME/**" }]
        }
    ]
}
```

👆 フォービドゥンと出てくるエラーを防ぐ。  

📄 `/src-tauri/tauri.conf.json` ファイルに以下（抜粋）を追加。  
これは要らないか？  

```json
{
    "bundle": {
        "resources": ["../public/*"]
    },
}
```

## [2025-08-06_Wed]

`.exe` ファイルと同じディレクトリーに `.json` ファイルを置いて、それを読み取る方法。  

📄 `/src-tauri/tauri.conf.json`を以下のように修正：  

```json
{
    "bundle": {
        "active": true,
        "targets": "all",
        "resources": [
            "public/config.json"  // ビルド時にconfig.jsonをコピー
        ]
    }
}
```

* "resources"にpublic/config.jsonを指定することで、ビルド時にconfig.jsonが 📁 `/src-tauri/target/release/` にコピーされる。
    * FIXME: 🌟 📁 `/dist` 直下にはコピーされているが、 📁 `/src-tauri/target/release/` の方にはコピーされていない。
* こうすると、.exeと同じディレクトリにconfig.jsonが配置されるぜ。

TODO: ファイルは Rust で読み込んだ方がいいか？  フロントエンド側でファイルを読み込むには制限があるらしい。  
