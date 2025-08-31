# クリーンアップ

npm, pnpm の両方のバージョンアップ：  

```shell
# Windowsの場合：

npm install -g npm
npm install -g pnpm
```

## Node.JS のバージョンを 20 に変更する場合：  

Windows の場合、nvm は使わず、ホームページから直接 Node.JS の .msi インストーラーをダウンロードしてインストールする。

```shell
# Node.JS のバージョン確認
node -v
        v18.20.8
        # (Windows 環境) v22.19.0

# pnpm の再インストールが必要な場合がある
npm install -g pnpm

pnpm -v
        10.11.0

# node_modules を最新化
pnpm install
```


## キャッシュ・クリアー：  

```shell
pnpm store prune
# （pnpm ではなく npm が悪さをしてるなら） npm cache clean --force
```

削除するフォルダーとファイル：  

```plaintext
# Tauriの場合：

📁 /
├─ 📁 node_modules 削除
├─ 📁 ( src-tauri )
│   ├─ 📁 target 削除
│   └─ 📄 Cargo.lock 削除
└─ 📄 pnpm-lock.yaml 削除
```

## 構築：  

```shell
pnpm install
# （依存関係を満たしていなくても、強制的に構築する場合） pnpm install --force
```

## （ローカルＰＣでの）実行：  

```shell
pnpm tauri dev
```
