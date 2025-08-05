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
