# 没コード TypeScript

```ts
    // import { resourceDir } from '@tauri-apps/api/path';
    // import { resolveResource } from '@tauri-apps/api/path';
    // import { convertFileSrc } from '@tauri-apps/api/core';

            // // ファイルの読み込み処理を追加
            // fileContent2.value = await readTextFile("sample.txt", { baseDir: BaseDirectory.AppConfig })

            // Tauri の API で src/assets/sample.txt を読み込む
            //const testPathStr = await resolveResource('assets/sample.txt');  // C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug\assets\image.png

            // // debug フォルダーの下に assets フォルダーが無い
            // testPath2.value = convertFileSrc(testPathStr);  // http://asset.localhost/C%3A%5CUsers%5Cmuzud%5COneDrive%5C%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%5CGitHub%5Cvue-tauri-desktopapp-sample%5Csrc-tauri%5Ctarget%5Cdebug%5Cassets%5Csample.txt

            // const contentStr = await readTextFile(
            //         "public/sample.txt",
            //         {
            //             baseDir: BaseDirectory.Home,
            //         }
            //     );

    // TODO 🌟 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\public\sample.txt` を示す方法が分からない。開発中のプロジェクトルートを指したい。
    // TODO 🌟 あるいは `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug` ディレクトリー下にファイルを丸ごとコピーされるか？
    // TODO 🌟 同梱するとファイルが重くなるか？ 外部に置いておく方がいい？ ローカルＰＣか、クラウド上か。

    // ################
    // # サブルーチン #
    // ################

    // コールバック関数の型を定義
    type GetPathAsync = () => Promise<string>;

    /**
     * タイムアウトしたときは、# で始まる文字列を返す。
     * @param getPath 
     */
    async function fetchDirPathAsync(getPathAsync: GetPathAsync): Promise<string> {
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('#Timed out fetching runtimeDir')), 3000);
            });
            return await Promise.race([getPathAsync(), timeoutPromise]) as string;

        } catch (error) {
            // 型ガードでError型かチェック
            if (error instanceof Error) {
                return `#${error.message}`;
            }
            // 予期しないエラーのフォールバック
            return `#Unknown error occurred. error:${error}`;
        }
    }

```
