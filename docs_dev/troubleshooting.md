# トラブルシューティング

## ルーター設定をしていない、またはルーター設定に誤りがある、router-link タグの to 属性のパスが間違えている

```
[Vue Router warn]: No match found for location with path "/reference_desktopapp_webapp/experimental"
~~~~~~~~~~~~~~~~~~
👆注目
```

📄 `router/index.ts` ファイルを確認。  
📄 `<router-link to="★ここ">` を確認。


## 

```
[plugin:vite:import-analysis] Failed to resolve import "@/pages/experimental/reference_desktopapp_webapp/the-part-body.vue" from "src/pages/reference_desktopapp_webapp/experimental/index.vue". Does the file exist?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
👆注目
```

import 文のパスが間違ている？


## トラブルシューティング１

📁 `/node_modules` フォルダーを削除。  
📄 `/pnpm-lock.yaml`  ファイルを削除。

以下のコマンドを打鍵。  

```shell
pnpm install
```

## トラブルシューティング２

（パワーシェルではなく、）コマンドプロンプトで以下を打鍵します。  

ビルドのキャッシュクリア：  

```shell
cd src-tauri

# アクセスが拒否される？ バックグラウンドで処理が走っているとき。
# rm -rf target
# Windows
rmdir /s target
#cargo clean

pnpm tauri dev
```

## トラブルシューティング３

Visual Studio Code を使っていたら、[Ctrl] + [Shift] + [P]。  
`rust-analyzer: Reload-workspace` を選択して、リロード。  
