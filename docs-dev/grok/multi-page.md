# 複数ページ

Tauri + Vue のシングルアプリケーションアプリで、別ページを作るにはどうしたらいいんだぜ（＾～＾）？
npm ではなくて、 pnpm を使って説明してくれだぜ（＾～＾）


おっと、pnpm 派だぜ！了解、Tauri + Vue のシングルページアプリケーション（SPA）に別ページを追加する方法を、pnpm を使って説明するよ（＾～＾）。基本的な流れは npm と同じだけど、コマンドを pnpm に置き換えるぜ。さっそく行くぞ！

---

### 1. **Vue Router をプロジェクトに追加**
Vue でページ遷移を管理するには `vue-router` が必要だ。まだインストールしてないなら、以下のコマンドで追加：

```bash
pnpm add vue-router@4
```

> **注意**: Vue 3 を使ってる Tauri プロジェクトなら、`vue-router@4` が必須だぜ！

---

### 2. **ルーターの設定**
`src` フォルダ内にルーティングを設定するファイルを作るぜ。

#### a. ルーターの定義
`src/router/index.js` を作成して、こんな感じのコードを書く：

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // ホームページのコンポーネント
import About from '../views/About.vue'; // 別ページの例

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // 他のルートはここに追加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

- `path`: URL のパス（例: `/about` なら `http://localhost:5173/about`）。
- `component`: そのパスで表示する Vue コンポーネント。
- `createWebHistory`: SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！

#### b. ページ用のコンポーネント作成
`src/views/` フォルダを作って、ページ用のコンポーネントを用意：

- `src/views/Home.vue`:
  ```vue
  <template>
    <div>
      <h1>ホームだぜ！</h1>
      <router-link to="/about">About ページへ</router-link>
    </div>
  </template>
  ```

- `src/views/About.vue`:
  ```vue
  <template>
    <div>
      <h1>About ページだぜ！</h1>
      <router-link to="/">ホームに戻る</router-link>
    </div>
  </template>
  ```

---

### 3. **Vue にルーターを統合**
`src/main.js` を編集して、ルーターをアプリに組み込む：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

`src/App.vue` には、ルーターの表示場所として `<router-view>` を追加：

```vue
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
```

- `<router-view>`: 現在の URL に応じたコンポーネントがここに表示されるぜ。

---

### 4. **ナビゲーションの追加**
ページ間を移動するには `<router-link>` を使う。ナビバーを全ページに追加したいなら、`App.vue` をこうする：

```vue
<template>
  <div id="app">
    <nav>
      <router-link to="/">ホーム</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

---

### 5. **Tauri での動作確認**
Tauri プロジェクトなら、開発サーバーで動作確認だ：

```bash
pnpm tauri dev
```

これで、`http://localhost:5173/` にアクセスするとホーム、`http://localhost:5173/about` で About ページが見えるぜ。Tauri のウィンドウでもバッチリ動く！

---

### 6. **追加のヒント**
- **動的ルート**: `/user/:id` のような動的パラメータを使いたいなら、ルートに以下を追加：
  ```javascript
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
  }
  ```
  コンポーネント内で `this.$route.params.id` で `id` をゲットできる。

- **遅延ローディング**: ページが多い場合は、`() => import(...)` でコンポーネントを動的にインポートしてパフォーマンスを上げよう。

- **Tauri との連携**: Tauri の API（例: `@tauri-apps/api` でのファイル操作やウィンドウ管理）はどのページでも使える。ルーティングとは独立してるぜ。

---

### 7. **ハマりがちなポイント**
- **Tauri の URL 設定**: `tauri.conf.json` の `security.csp` や `window.url` がルーティングに影響することがある。`/` ベースのルーティングが正しく動くか確認だ！
- **ビルド時の注意**: ビルドは以下で：
  ```bash
  pnpm tauri build
  ```
  Vite の設定（`vite.config.js`）でベース URL が正しいかチェック。デフォルトなら問題ないはずだ。

---

これで pnpm を使って Tauri + Vue の SPA に別ページを追加できるぜ！何か具体的なページや機能でハマったら、気軽に教えてくれよ（＾～＾）d。
