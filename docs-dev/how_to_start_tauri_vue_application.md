# Tauri + Vue アプリケーションの作り方

## 環境構築

* 📖 [Tauri 2.0](https://v2.tauri.app/)  の Get Started のページを読んでください。
* わたしのマシン構成：
    * OS: Windows 11
    * パッケージ・マネージャー: pnpm

## 空プロジェクト作成

カレントディレクトリーの例： 📁 `C:\Users\muzud\OneDrive\ドキュメント\GitHub`  

```shell
pnpm create tauri-app
```

プロジェクト名（Project name）を何にするか尋ねられます。  
入力例： `tauri-vue-sample`  

識別子（Identifier）を何にするか尋ねられます。特にこだわりがなければそのままエンターキーを押下します。  
入力例： `com.tauri-vue-sample.app`  

フロントエンドのプログラム言語（language to use for your frontend）を何にするか尋ねられます。  
入力例： `TypeScript / JavaScript`  

パッケージマネージャー（package manager）を何にするか尋ねられます。  
入力例： `pnpm`  

UIテンプレート（UI template）を何にするか尋ねられます。  
入力例： `Vue`  

UIフレーバー（UI flavor）を何にするか尋ねられます。  
入力例： `TypeScript`  

これで空のプロジェクトが作成されます。  

```plaintext
Template created! To get started run:
  cd tauri-vue-sample
  pnpm install
  pnpm tauri android init

For Desktop development, run:
  pnpm tauri dev

For Android development, run:
  pnpm tauri android dev
```
