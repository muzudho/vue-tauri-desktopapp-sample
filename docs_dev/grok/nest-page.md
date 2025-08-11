Tauri と、Nuxt の両方でシングル・ページ・アプリケーションを作ろうとしてるんだが、子ページをネストする方法はあるかだぜ（＾～＾）？


TauriとNuxt3を使ってシングル・ページ・アプリケーション（SPA）でネストされた子ページを作成する方法を解説するぜ！Nuxt3のファイルベースのルーティングとTauriの設定を組み合わせることで、簡単に実現できるよ。以下に手順とポイントをまとめるぜ（＾～＾）。

---

### 1. **Nuxt3でのネストされた子ページの作り方**
Nuxt3は、Vue.jsをベースにしたフレームワークで、`pages/`ディレクトリを使ったファイルベースのルーティングが特徴だ。ネストされた子ページを作るには、以下のようにディレクトリ構造を活用するぜ。

#### ディレクトリ構造の例
例えば、`/parent`という親ページの下に`/parent/child`や`/parent/child2`といった子ページを作りたい場合、`pages/`ディレクトリを以下のように構成する：

```
pages/
  ├── parent/
  │   ├── index.vue  // /parent のルートページ
  │   ├── child.vue  // /parent/child
  │   └── child2.vue // /parent/child2
  └── index.vue      // トップページ (/)
```

- **`parent/index.vue`**: 親ページのデフォルトコンテンツ。`<NuxtPage>`コンポーネントを使って子ページをここにレンダリングする。
- **`parent/child.vue` と `parent/child2.vue`**: 子ページのコンテンツ。

#### 親ページの実装例 (`parent/index.vue`)
親ページで子ページを表示するには、`<NuxtPage>`コンポーネントを使うぜ。このコンポーネントは、Nuxt3で子ルートをレンダリングするためのものだ（Nuxt2では`<NuxtChild>`だったけど、Nuxt3では`<NuxtPage>`に統一された）。

```vue
<!-- pages/parent/index.vue -->
<template>
  <div>
    <h1>親ページ</h1>
    <p>ここは /parent のコンテンツだぜ！</p>
    <nav>
      <NuxtLink to="/parent/child">子ページ1へ</NuxtLink>
      <NuxtLink to="/parent/child2">子ページ2へ</NuxtLink>
    </nav>
    <!-- 子ページをここにレンダリング -->
    <NuxtPage />
  </div>
</template>
```

#### 子ページの実装例
子ページはシンプルにコンテンツを定義するだけだ。

```vue
<!-- pages/parent/child.vue -->
<template>
  <div>
    <h2>子ページ1</h2>
    <p>ここは /parent/child のコンテンツだぜ（＾～＾）！</p>
  </div>
</template>
```

```vue
<!-- pages/parent/child2.vue -->
<template>
  <div>
    <h2>子ページ2</h2>
    <p>ここは /parent/child2 のコンテンツだぜ（＾～＾）！</p>
  </div>
</template>
```

これで、`/parent`にアクセスすると親ページの内容＋子ページへのリンクが表示され、`/parent/child`や`/parent/child2`にアクセスすると親ページのレイアウト内に子ページの内容がレンダリングされるぜ！[](https://v2.nuxt.com/ja/examples/routing/nested-pages/)[](https://nuxt.dokyumento.jp/docs/migration/pages-and-layouts)

---

### 2. **Tauriとの統合時の注意点**
Tauriは軽量なデスクトップアプリケーションフレームワークで、Nuxt3のSPAモード（SSG）と相性がいい。ただし、TauriとNuxt3を組み合わせる場合、以下の設定が必要だぜ。

#### Nuxt3をSPAモードで設定
Tauriはサーバーサイドレンダリング（SSR）をサポートしないので、Nuxt3を静的サイト生成（SSG）またはSPAモードで動作させる。`nuxt.config.ts`で以下のように設定する：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'src/', // フロントエンドのディレクトリ
  ssr: false,     // SPAモードで動作
  devServer: {
    port: 3000,   // 開発サーバーのポート（Tauriと合わせる）
  },
});
```

#### Tauriの設定
Tauriの設定ファイル（`src-tauri/tauri.conf.json`）で、Nuxtの開発サーバーやビルド出力先を指定するぜ。以下は例：

```json
{
  "build": {
    "beforeDevCommand": "npm run dev", // 開発時にNuxtの開発サーバーを起動
    "beforeBuildCommand": "npm run generate", // ビルド時にNuxtの静的ファイルを生成
    "devPath": "http://localhost:3000", // Nuxtの開発サーバーのポート
    "distDir": "../dist", // Nuxtのビルド出力ディレクトリ
    "withGlobalTauri": true
  },
  "package": {
    "productName": "tauri-app",
    "version": "0.0.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "open": true
      }
    },
    "windows": [
      {
        "title": "Tauri App",
        "width": 800,
        "height": 600
      }
    ],
    "security": {
      "csp": null
    },
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "your-domain",
      "icon": ["icons/icon-512.png", "icons/icon.ico"]
    }
  }
}
```

#### プロジェクトのセットアップ
TauriとNuxt3のプロジェクトを統合する手順は、以下の通りだ：

1. **Tauriプロジェクトを作成**：
   ```bash
   npm create tauri@latest
   ```
   フロントエンドはTypeScript/JavaScript、UIテンプレートはVanillaを選択。

2. **Nuxt3をプロジェクトに追加**：
   ```bash
   npx nuxi@latest init src
   ```
   `src/`ディレクトリにNuxtプロジェクトを作成し、不要なファイル（`src/index.html`や`src/vite.config.ts`など）を削除。

3. **依存関係を更新**：
   `package.json`にNuxt関連の依存を追加：
   ```json
   {
     "scripts": {
       "tauri": "tauri",
       "tauri:dev": "tauri dev",
       "build": "nuxt build",
       "dev": "nuxt dev",
       "generate": "nuxt generate",
       "preview": "nuxt preview",
       "postinstall": "nuxt prepare"
     },
     "dependencies": {
       "@tauri-apps/api": "^1",
       "nuxt": "^3.11.2",
       "vue": "^3.4.21",
       "vue-router": "^4.3.0"
     },
     "devDependencies": {
       "@tauri-apps/cli": "^1",
       "typescript": "^5.0.2"
     }
   }
   ```

4. **Tauriを起動**：
   ```bash
   npm run tauri:dev
   ```
   これでTauriのウィンドウが立ち上がり、NuxtのSPAが表示されるはずだぜ！[](https://zenn.dev/crysta1221/scraps/f3266abadd8404)[](https://qiita.com/GreenTea25/items/3a6311977d0e4d4d046d)

---

### 3. **ネストされた子ページをTauriで動作確認**
Tauriの開発モード（`npm run tauri:dev`）を起動すると、Nuxtの開発サーバー（`http://localhost:3000`）がTauriのウィンドウ内で表示される。以下の手順で確認：

1. `/parent`にアクセスして、親ページが正しく表示されるかチェック。
2. `/parent/child`や`/parent/child2`に`<NuxtLink>`で移動して、子ページが親ページの`<NuxtPage>`内にレンダリングされるか確認。
3. ホットリロードが効いているから、`.vue`ファイルを編集すると即座に反映されるぜ。

---

### 4. **追加のTips**
- **動的ルート**：もし子ページで動的ルート（例：`/parent/:id`）を使いたいなら、`pages/parent/_id.vue`というファイルを作成する。これで`/parent/123`みたいなURLに対応できるぜ。[](https://qiita.com/KentOhwada_AlibabaCloudJapan/items/21af7ee425f99ed437fb)
- **レイアウトの活用**：親ページの共通レイアウトを`layouts/default.vue`に定義して、すべてのページで統一感を持たせることもできる。
  ```vue
  <!-- layouts/default.vue -->
  <template>
    <div>
      <header>共通ヘッダー</header>
      <slot /> <!-- ページコンテンツがここに入る -->
      <footer>共通フッター</footer>
    </div>
  </template>
  ```
- **Tauriのプラグイン**：ウィンドウの位置を中央に固定したい場合、`tauri-plugin-positioner`を使って設定する（`src-tauri/src/main.rs`を編集）。[](https://zenn.dev/crysta1221/scraps/f3266abadd8404)
- **ビルド時の注意**：本番ビルドでは`npm run generate`を使って静的ファイルを生成し、`src-tauri/tauri.conf.json`の`distDir`でその出力先を指定するぜ。

---

### 5. **まとめ**
TauriとNuxt3でSPAのネストされた子ページを作るには、Nuxtの`pages/`ディレクトリでファイルベースのルーティングを活用し、親ページに`<NuxtPage>`を配置する。Tauri側では`ssr: false`でSPAモードを設定し、`tauri.conf.json`でNuxtの開発サーバーやビルド出力先を正しく指定すればバッチリだ！これで、軽量で爆速なデスクトップアプリにNuxtの柔軟なルーティングを組み合わせられるぜ（＾～＾）！

何かハマった点や具体的なコードで質問があったら、気軽に聞いてくれよ！[](https://zenn.dev/crysta1221/scraps/f3266abadd8404)[](https://qiita.com/GreenTea25/items/3a6311977d0e4d4d046d)[](https://v2.nuxt.com/ja/examples/routing/nested-pages/)
