Tauri + Vue で .exe を作ったとき、同じディレクトリーにJSONファイルを置いておいて、それを .exe 起動時に設定ファイルとして読み込む方法を教えてくれだぜ（＾～＾）


Tauri + Vueで.exeファイルを作成し、同じディレクトリにあるJSONファイルを設定ファイルとして読み込む方法を説明するぜ！以下の手順で実装できるよ（＾～＾）。

---

### 1. **プロジェクト構成**
まず、Tauriプロジェクトの基本構造を確認。以下のディレクトリ構成を想定してるぜ：

```
project/
├── src/                   # Vueのフロントエンドコード
├── src-tauri/            # Tauriのバックエンド（Rust）コード
│   ├── src/
│   │   └── main.rs       # Tauriのメインエントリーポイント
│   └── tauri.conf.json   # Tauriの設定ファイル
├── public/
│   └── config.json       # 読み込みたいJSONファイル
└── package.json
```

`config.json`を`public/`フォルダや`src-tauri/`のルートに置いておくのが一般的だぜ。ビルド時に`src-tauri/target/release/`（.exeがある場所）にコピーされるように設定するよ。

---

### 2. **JSONファイルの準備**
例えば、`public/config.json`に以下のような設定ファイルを作る：

```json
{
  "apiUrl": "https://example.com",
  "theme": "dark",
  "timeout": 5000
}
```

このファイルをTauriのビルド時に.exeと同じディレクトリにコピーする設定を後で追加するぜ。

---

### 3. **TauriでJSONファイルを読み込む**
Tauri（Rust側）でJSONファイルを読み込むには、`std::fs`を使ってファイルシステムにアクセスする。以下の手順で実装するぜ。

#### 3.1 **Rustコードの修正（`src-tauri/src/main.rs`）**
Tauriの`main.rs`を編集して、JSONファイルを読み込むコマンドを追加する。以下はサンプルコードだ：

```rust
use std::fs;
use serde_json::Value;

#[tauri::command]
fn read_config() -> Result<Value, String> {
    // .exeと同じディレクトリのconfig.jsonのパスを取得
    let exe_path = std::env::current_exe().map_err(|e| e.to_string())?;
    let config_path = exe_path
        .parent()
        .ok_or("Could not get parent directory".to_string())?
        .join("config.json");

    // JSONファイルを読み込む
    let contents = fs::read_to_string(config_path).map_err(|e| e.to_string())?;
    let json: Value = serde_json::from_str(&contents).map_err(|e| e.to_string())?;

    Ok(json)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_config])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

このコードは以下をやってるぜ：
- `std::env::current_exe()`で.exeの実行パスを取得。
- その親ディレクトリに`config.json`があると仮定してパスを構築。
- `fs::read_to_string`でファイルを読み込み、`serde_json`でJSONをパースして返す。

---

#### 3.2 **依存関係の追加**
`serde_json`を使うために、`src-tauri/Cargo.toml`に依存関係を追加するぜ：

```toml
[dependencies]
tauri = { version = "1.0", features = ["api-all"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

---

### 4. **Vue側でJSONデータを取得**
Vue側では、`@tauri-apps/api`を使ってRustの`read_config`コマンドを呼び出す。以下はVueコンポーネントの例だ：

```vue
<template>
  <div>
    <h1>Config</h1>
    <pre>{{ config }}</pre>
    <button @click="loadConfig">Load Config</button>
  </div>
</template>

<script>
import { invoke } from '@tauri-apps/api/tauri';

export default {
  data() {
    return {
      config: null,
    };
  },
  methods: {
    async loadConfig() {
      try {
        // Rustのread_configコマンドを呼び出し
        this.config = await invoke('read_config');
        console.log('Config loaded:', this.config);
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    },
  },
};
</script>
```

このコードは：
- `@tauri-apps/api/tauri`の`invoke`を使ってRustの`read_config`関数を呼び出す。
- 結果を`config`データに保存して表示。

---

### 5. **JSONファイルをビルド時にコピー**
ビルド時に`config.json`を.exeと同じディレクトリ（`src-tauri/target/release/`）にコピーする設定を追加するぜ。`src-tauri/tauri.conf.json`を以下のように修正：

```json
{
  "build": {
    "beforeBuildCommand": "",
    "devPath": "../dist",
    "distDir": "../dist",
    "withGlobalTauri": true
  },
  "package": {
    "productName": "YourAppName",
    "version": "0.1.0"
  },
  "tauri": {
    "bundle": {
      "active": true,
      "targets": "all",
      "resources": [
        "public/config.json"  // ビルド時にconfig.jsonをコピー
      ]
    }
  }
}
```

- `"resources"`に`public/config.json`を指定することで、ビルド時に`config.json`が`target/release/`にコピーされる。
- こうすると、.exeと同じディレクトリに`config.json`が配置されるぜ。

---

### 6. **開発時の注意**
開発中は`tauri dev`でアプリを動かすけど、`config.json`は`src-tauri/`や`public/`にあるファイルを直接読み込む場合がある。以下のコードをRust側に追加して、開発時と本番環境の両方に対応させるのがおすすめだ：

```rust
use std::path::Path;

#[tauri::command]
fn read_config() -> Result<Value, String> {
    let config_path = if cfg!(debug_assertions) {
        // 開発時: src-tauri/ または public/ から直接読み込む
        Path::new("public/config.json").to_path_buf()
    } else {
        // 本番: .exeと同じディレクトリのconfig.json
        std::env::current_exe()
            .map_err(|e| e.to_string())?
            .parent()
            .ok_or("Could not get parent directory".to_string())?
            .join("config.json")
    };

    let contents = fs::read_to_string(config_path).map_err(|e| e.to_string())?;
    let json: Value = serde_json::from_str(&contents).map_err(|e| e.to_string())?;

    Ok(json)
}
```

`cfg!(debug_assertions)`で開発環境（`tauri dev`）か本番環境（`tauri build`）かを判別してるぜ。

---

### 7. **ビルドとテスト**
以下のコマンドでビルドして確認するぜ：

```bash
npm run tauri build
```

ビルド後、`src-tauri/target/release/`に生成された.exeと`config.json`があるはず。実行して、Vue側で設定が読み込まれるか確認だ！

---

### 8. **エラーハンドリングのポイント**
- JSONファイルが存在しない場合やパースに失敗した場合のエラーハンドリングをRustとVueの両方でしっかりやっておく。
- 例えば、ファイルが見つからない場合はデフォルト設定を返すようにRust側で対応するのもアリだ：

```rust
if !config_path.exists() {
    return Ok(serde_json::json!({
        "apiUrl": "https://default.com",
        "theme": "light",
        "timeout": 3000
    }));
}
```

---

### まとめ
- `config.json`を`public/`に配置し、`tauri.conf.json`でビルド時にコピー。
- Rustで`std::fs`と`serde_json`を使ってJSONを読み込む。
- Vueから`@tauri-apps/api`の`invoke`でRustのコマンドを呼び出す。
- 開発時と本番環境の違いを`cfg!(debug_assertions)`で吸収。

これでバッチリ設定ファイルを読み込めるぜ！何か他に質問あったら教えてくれ（＾～＾）！
