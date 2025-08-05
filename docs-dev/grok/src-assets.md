Tauri2 の TypeScript で、 /src/assets フォルダーへのパスを取得するにはどうすればいいんだぜ（＾～＾）？


Tauri 2でTypeScriptを使って`/src/assets`フォルダーへのパスを取得するには、Tauriの`@tauri-apps/api/path`モジュールを利用するのが一般的だぜ！具体的には、`resolveResource`関数を使ってリソースフォルダー内のパスを解決できる。Tauriでは、`src/assets`フォルダーをアプリにバンドルする際に、`tauri.conf.json`でリソースとして設定しておく必要があるから、その辺も合わせて説明するよ（＾～＾）！

### 手順
1. **tauri.conf.jsonでリソースを設定**
   `/src/assets`フォルダーをTauriアプリに含めるには、`tauri.conf.json`の`tauri.bundle.resources`にフォルダーを指定する。以下は設定例：

   ```json
   {
     "tauri": {
       "bundle": {
         "resources": [
           "assets/*"
         ]
       },
       "allowlist": {
         "fs": {
           "scope": ["$RESOURCE/*"]
         },
         "path": {
           "all": true
         }
       }
     }
   }
   ```

   - `resources`に`"assets/*"`を指定して、`/src/assets`フォルダー内のファイルをバンドル。
   - `allowlist.fs.scope`で`$RESOURCE/*`を許可して、ファイルシステムAPIでリソースにアクセスできるようにする。
   - `allowlist.path.all`を`true`にして、パス解決APIを有効化。

2. **TypeScriptでパスを取得**
   `@tauri-apps/api/path`の`resolveResource`関数を使って、`/src/assets`フォルダーへのパスを取得する。以下はコード例：

   ```typescript
   import { resolveResource } from '@tauri-apps/api/path';

   async function getAssetsPath() {
     try {
       // `assets`フォルダー内の特定ファイル（例: image.png）へのパスを取得
       const resourcePath = await resolveResource('assets/image.png');
       console.log('Assets path:', resourcePath);
       return resourcePath;
     } catch (error) {
       console.error('Error resolving assets path:', error);
       return null;
     }
   }

   // 実行例
   getAssetsPath();
   ```

   - `resolveResource('assets/image.png')`は、`assets`フォルダー内の`image.png`へのフルパスを返す。
   - 例えば、macOSなら`/Applications/YourApp.app/Contents/Resources/assets/image.png`みたいなパスになるぜ。

3. **Webviewでアセットを利用する場合**
   もし`assets`内のファイル（例: 画像）をWebviewで表示したい場合は、`convertFileSrc`を使ってパスをWebview用のURLに変換する必要がある。以下は例：

   ```typescript
   import { resolveResource } from '@tauri-apps/api/path';
   import { convertFileSrc } from '@tauri-apps/api/tauri';

   async function loadImage() {
     try {
       const resourcePath = await resolveResource('assets/image.png');
       const assetUrl = convertFileSrc(resourcePath);
       // Webviewで使えるURLをimgタグに設定
       const img = document.createElement('img');
       img.src = assetUrl;
       document.body.appendChild(img);
     } catch (error) {
       console.error('Error loading image:', error);
     }
   }

   loadImage();
   ```

   - `convertFileSrc`は、ファイルパスを`asset://`や`http://asset.localhost`形式のURLに変換して、Webviewで読み込めるようにする。
   - `tauri.conf.json`で`asset`プロトコルを有効化する必要がある。以下を追加：

     ```json
     {
       "tauri": {
         "security": {
           "csp": "default-src 'self'; img-src 'self' asset: http://asset.localhost"
         },
         "allowlist": {
           "protocol": {
             "asset": true,
             "assetScope": ["$RESOURCE/*"]
           }
         }
       }
     }
     ```

4. **注意点**
   - **パス解決の制限**: Tauriのセキュリティ制約により、`../`のような親ディレクトリ参照は使えない。`resolveResource`は`$RESOURCE`ベースで相対パスを解決するから、`assets/`以下を正しく指定すればOK。
   - **ビルド時の挙動**: 開発中（`tauri dev`）と本番ビルド（`tauri build`）でパスの扱いが異なる場合がある。`resolveResource`は本番環境で正しいリソースパスを返すから、開発中も本番環境を意識してテストするといいぜ。
   - **Viteとの統合**: Viteを使ってる場合、`src/assets`フォルダーはViteのビルドプロセスで`dist/assets`にコピーされることが多い。Tauriの`distDir`設定（例: `../frontend/dist`）と`resources`設定が一致してるか確認してな！

5. **デバッグのコツ**
   - パスが正しいか確認するには、`console.log`で`resolveResource`の結果を出力して、期待通りのパスかチェック。
   - エラーが出る場合、`tauri.conf.json`の`fs.scope`や`protocol.assetScope`が正しく設定されてるか再確認。たとえば、`$RESOURCE/assets/*`を明示的に許可する必要があるかも。

### 参考
- Tauri公式ドキュメント（`resolveResource`とリソースの扱い）：[Embedding Additional Files | Tauri - v2.tauri.app](https://v2.tauri.app/plugin/resources/embedding-files/)[](https://v2.tauri.app/develop/resources/)
- `convertFileSrc`を使った例：[Tauri v1 - v1.tauri.app](https://v1.tauri.app/reference/javascript/api/tauri/)[](https://v1.tauri.app/v1/api/js/tauri/)

これで`/src/assets`フォルダーへのパスをバッチリ取得できるはずだぜ！何かハマったら教えてくれ、すぐ助けるからな（＾～＾）！
