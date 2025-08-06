# リリース・ファイルの作成方法

ワーニングなど、プロブレムは全部解消しておく。  

```shell
pnpm tauri build
```

Windows なら、📁 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\release` フォルダーに `.exe` ファイルが作られる。  
出力例： 📄 `vue-tauri-desktopapp-sample.exe`  

他にもファイルがたくさん作られるが、必要なのか分からない。`.exe` ファイルだけでも動くようだ。  

インストーラーも作ってくれている。  
出力例： 📄 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\release\bundle\msi\vue-tauri-desktopapp-sample_0.1.0_x64_en-US.msi`  
これを配布しても OK。

## バンドルの設定方法

📄 `/src-tauri/tauri.conf.json` 抜粋：  

```json
{
    "bundle": {
        "resources": {
            "../public/*" : "resources/"
        }
    }
}
```

👆 📁 `/public` フォルダーの内容を、 📁 `/src-tauri/target/release/resources` フォルダー下にコピーしてくれる。  
