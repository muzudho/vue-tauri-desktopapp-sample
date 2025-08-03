# 始め方２：　git の設定

## ローカルPCに向けての操作

カレントディレクトリーの例： 📁 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\tauri-vue-sample`  

```shell
git init
```

👆 📁 `.git` フォルダーが作成されます。  

```shell
git add .
```

👆 カレントディレクトリーの全てのディレクトリー、ファイルを管理の対象にします。（.gitignore で設定されているものを除く）  

```shell
git commit -m "Initial commit"
```

👆 ローカル・リポジトリーにコミットします。  

## リモート・リポジトリーに向けての操作

前もって、Git Hub にまだ何もコミットしていない状態の `tauri-vue-sample` リポジトリーを作成しておきます。  

```shell
git remote add origin https://github.com/muzudho/tauri-vue-sample.git
git branch -M main
git push -u origin main
```
