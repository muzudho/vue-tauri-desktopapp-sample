onMouted の練習ができるサンプルプログラムを教えてくれだぜ（＾～＾）


おお、Vue 3 の `onMounted` を使って練習したいんだな！（＾～＾） `onMounted` は Vue の Composition API で、コンポーネントがマウントされた直後に実行されるライフサイクルフックだぜ。Tauri + Vue + TypeScript の環境で、`<script setup lang="ts">` を使って、`onMounted` の練習にピッタリなサンプルプログラムを用意するよ！今回は、Tauri の API を使ってファイル読み込みを例に、シンプルで実践的なコードを見せるぜ！

---

### **サンプルプログラムの概要**
- **目的**: `onMounted` を使って、コンポーネントがマウントされたときに Tauri の API でテキストファイル（`sample.txt`）を読み込み、内容を画面に表示する。
- **内容**:
  - ホーム画面に「ファイルの内容」を表示。
  - `onMounted` で Tauri の `fs` API を使ってファイル読み込み。
  - エラーハンドリングも入れて、TypeScript の型安全性を活かす。
- **前提**:
  - `src/views/Home.vue` に実装。
  - Tauri の `@tauri-apps/api` を使用（プロジェクトにインストール済みと仮定）。
  - `src/assets/sample.txt` に適当なテキストファイルがある（例: "Hello, Tauri!" と書かれたファイル）。

---

### **準備**
1. **Tauri の API をインストール**（すでにプロジェクトにある場合はスキップ）：
   ```bash
   pnpm add @tauri-apps/api
   ```

2. **サンプルファイルの作成**：
   - `src/assets/sample.txt` を作成し、以下を書き込む：
     ```
     Hello, Tauri! This is a test file.
     ```

3. **Tauri のファイル読み込み許可**：
   - `tauri.conf.json` でファイルアクセスを許可（`src/assets` フォルダを対象に）：
     ```json
     {
       "tauri": {
         "allowlist": {
           "fs": {
             "readFile": true,
             "scope": ["$APP/assets/*"]
           }
         }
       }
     }
     ```
   - `$APP` は Tauri のアプリディレクトリ（`src-tauri`）を指す。`src/assets` のファイルにアクセスできるようにするぜ。

---

### **サンプルコード: Home.vue**
以下は、`onMounted` を使ってマウント時に `sample.txt` を読み込み、内容を表示する `Home.vue` のコードだ：

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';

// ファイルの内容を保持する reactive 変数
const fileContent = ref<string>('読み込み中...');
const errorMessage = ref<string>('');

// コンポーネントがマウントされたときに実行
onMounted(async () => {
  try {
    // Tauri の API で src/assets/sample.txt を読み込む
    const content = await readTextFile('assets/sample.txt', {
      dir: BaseDirectory.App,
    });
    fileContent.value = content; // ファイル内容をセット
  } catch (error) {
    errorMessage.value = `エラーだぜ: ${error}`; // エラーハンドリング
  }
});
</script>

<template>
  <div>
    <h1>ホームだぜ！</h1>
    <router-link to="/about">About ページへ</router-link>
    <h2>ファイルの内容:</h2>
    <p>{{ fileContent }}</p>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>
```

---

### **コードの解説**
- **インポート**:
  - `onMounted`: Vue の Composition API のライフサイクルフック。マウント時にコードを実行。
  - `ref`: リアクティブな変数を作る。`fileContent` と `errorMessage` は画面に反映される。
  - `readTextFile`, `BaseDirectory`: Tauri の `fs` API でファイル読み込み。`BaseDirectory.App` はアプリのルートディレクトリ（`src-tauri`）を指す。

- **`onMounted`**:
  - コンポーネントが DOM にマウントされた直後に実行される。
  - `async/await` を使って非同期でファイルを読み込む。Tauri の API は Promise を返すから、こうやって書くとスッキリだぜ。
  - ファイル読み込みが成功したら `fileContent` にセット、失敗したら `errorMessage` にエラーを入れる。

- **テンプレート**:
  - `<p>{{ fileContent }}</p>`: ファイルの内容を表示。
  - `<p v-if="errorMessage">`: エラーがあれば赤文字で表示。

---

### **動作確認**
1. `src/views/Home.vue` に上記のコードをコピー。
2. `src/assets/sample.txt` を用意（`src-tauri/assets/sample.txt` にコピーされるように、ビルド時に Tauri が処理）。
3. 開発サーバーを起動：
   ```bash
   pnpm tauri dev
   ```
4. ブラウザ（`http://localhost:5173/`）または Tauri ウィンドウで、ホーム画面に「Hello, Tauri! This is a test file.」が表示されるはず！
   - ファイルがない場合やエラーが出たら、「エラーだぜ: ...」と表示される。

---

### **`onMounted` の練習ポイント**
このサンプルで `onMounted` の使い方をしっかり学べるぜ。以下のポイントを試して、さらに理解を深めてみて：

1. **別の処理を追加**：
   - `onMounted` 内に `console.log('マウントされたぜ！')` を追加して、タイミングを確認：
     ```typescript
     onMounted(() => {
       console.log('マウントされたぜ！');
       // 既存のファイル読み込みコード
     });
     ```

2. **他のライフサイクルフックと比較**：
   - `onUnmounted`（コンポーネントがアンマウントされるとき）を追加して、ログを出してみる：
     ```typescript
     import { onMounted, onUnmounted, ref } from 'vue';
     onUnmounted(() => {
       console.log('アンマウントされたぜ！');
     });
     ```

3. **Tauri の他の API を試す**：
   - ファイル読み込みの代わりに、Tauri の `dialog` API でマウント時にダイアログを表示：
     ```typescript
     import { open } from '@tauri-apps/api/dialog';
     onMounted(async () => {
       await open({ title: 'Welcome ダイアログだぜ！' });
     });
     ```
     （`tauri.conf.json` で `"dialog": { "open": true }` を有効化する必要あり）

4. **動的なデータ取得**：
   - `onMounted` で HTTP リクエスト（例：`fetch`）を試す：
     ```typescript
     onMounted(async () => {
       const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
       const data = await response.json();
       fileContent.value = data.title; // API の結果を表示
     });
     ```

---

### **ハマりがちなポイント**
- **Tauri のファイルパス**：
  - `readTextFile` のパスは `src-tauri` からの相対パス。`src/assets/sample.txt` はビルド時に `src-tauri/assets/sample.txt` にコピーされるから、`assets/sample.txt` と指定。
  - ファイルが見つからない場合、`errorMessage` に「No such file or directory」みたいなエラーが出る。`src-tauri/assets` にファイルがあるか確認だぜ。
- **CSP の設定**：
  - Tauri の `security.csp` が厳しすぎると、外部 API（`fetch` など）やスクリプトがブロックされる。必要なら `tauri.conf.json` で緩和：
    ```json
    {
      "tauri": {
        "security": {
          "csp": "default-src 'self' http: https:; script-src 'self' 'unsafe-eval'"
        }
      }
    }
    ```
- **TypeScript の型**：
  - `readTextFile` の戻り値は `string` なので、`ref<string>` で問題なし。もし型エラーが出たら、`@tauri-apps/api` の型定義を更新：
    ```bash
    pnpm add -D @tauri-apps/api
    ```

---

### **次のステップ**
このサンプルで `onMounted` の基本はバッチリだぜ！さらに練習したいなら、こんなアイデアはどう？
- **タイマー**: `onMounted` で `setInterval` を使って、1秒ごとにカウンターを増やす。
- **Tauri コマンド**: カスタム Tauri コマンド（Rust 側で定義）を `invoke` で呼び出す。
- **動的ルートとの連携**: ルートパラメータ（`/user/:id`）を使って、ID ごとに違うデータを `onMounted` で読み込む。

何か特定の実装や別のライフサイクルフック（`onUpdated`, `onUnmounted` など）も試したいことがあれば教えてくれ！すぐコード用意するぜ（＾～＾）d！
