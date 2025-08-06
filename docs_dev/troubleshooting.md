# トラブルシューティング

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
