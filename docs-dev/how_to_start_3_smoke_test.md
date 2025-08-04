# 始め方３：　とりあえず動かしてみる

カレントディレクトリーの例： 📁 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample`  

```shell
pnpm install
```

👆 📁 `node_modules` というバカでかいフォルダーが作られます。  

## 環境の更新

（パワーシェルではなく、）コマンドプロンプトで以下を打鍵します。  

```shell
rustup update
        info: syncing channel updates for 'stable-x86_64-pc-windows-msvc'
        info: checking for self-update

        stable-x86_64-pc-windows-msvc unchanged - rustc 1.88.0 (6b00bc388 2025-06-23)

        info: cleaning up downloads & tmp directories
```

```shell
pnpm update
        Already up to date
        Progress: resolved 108, reused 53, downloaded 0, added 0, done
        Done in 2.1s using pnpm v10.11.0
```

## 起動

バックグラウンドで初期化処理が走っているときは、それが終わるまで待ちます。  

（パワーシェルではなく、）コマンドプロンプトで以下を打鍵します。  

```shell
pnpm tauri dev
```

👆 時間がかかります。  

## トラブルシューティング１

📁 `node_modules` フォルダーを削除して、 `pnpm install` コマンドを打ち直す。  

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
