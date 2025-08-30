# クリーンアップ

削除するフォルダーとファイル：  

```plaintext
📁 /
├─ 📁 node_modules 削除
├─ 📁 ( src-tauri )
│   ├─ 📁 target 削除
│   └─ 📄 Cargo.lock 削除
└─ 📄 pnpm-lock.yaml 削除
```

構築：  

```shell
pnpm install
```

実行：  

```shell
pnpm tauri dev
```
