<template>
    <div>
        <h1>onMounted を使う練習だぜ！</h1>

        <h2>基本的なファイルパス一覧：</h2>

        <v-row>
            <v-col cols="1">1</v-col>
            <v-col cols="3">appCacheDirStr</v-col>
            <v-col>{{ appCacheDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">2</v-col>
            <v-col cols="3">appConfigDirStr</v-col>
            <v-col>{{ appConfigDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">3</v-col>
            <v-col cols="3">appDataDirStr</v-col>
            <v-col>{{ appDataDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">4</v-col>
            <v-col cols="3">appLocalDataDirStr</v-col>
            <v-col>{{ appLocalDataDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">5</v-col>
            <v-col cols="3">appLogDirStr</v-col>
            <v-col>{{ appLogDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">6</v-col>
            <v-col cols="3">audioDirStr</v-col>
            <v-col>{{ audioDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">7</v-col>
            <v-col cols="3">cacheDirStr</v-col>
            <v-col>{{ cacheDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">8</v-col>
            <v-col cols="3">configDirStr</v-col>
            <v-col>{{ configDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">9</v-col>
            <v-col cols="3">dataDirStr</v-col>
            <v-col>{{ dataDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">10</v-col>
            <v-col cols="3">desktopDirStr</v-col>
            <v-col>{{ desktopDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">11</v-col>
            <v-col cols="3">documentDirStr</v-col>
            <v-col>{{ documentDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">12</v-col>
            <v-col cols="3">downloadDirStr</v-col>
            <v-col>{{ downloadDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">13</v-col>
            <v-col cols="3">executableDirStr</v-col>
            <v-col>{{ executableDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">14</v-col>
            <v-col cols="3">fontDirStr</v-col>
            <v-col>{{ fontDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">15</v-col>
            <v-col cols="3">homeDirStr</v-col>
            <v-col>{{ homeDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">16</v-col>
            <v-col cols="3">localDataDirStr</v-col>
            <v-col>{{ localDataDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">17</v-col>
            <v-col cols="3">pictureDirStr</v-col>
            <v-col>{{ pictureDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">18</v-col>
            <v-col cols="3">publicDirStr</v-col>
            <v-col>{{ publicDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">19</v-col>
            <v-col cols="3">resourceDirStr</v-col>
            <v-col>{{ resourceDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">20</v-col>
            <v-col cols="3">runtimeDirStr</v-col>
            <v-col>{{ runtimeDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">21</v-col>
            <v-col cols="3">tempDirStr</v-col>
            <v-col>{{ tempDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">22</v-col>
            <v-col cols="3">templateDirStr</v-col>
            <v-col>{{ templateDirStr }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="1">23</v-col>
            <v-col cols="3">videoDirStr</v-col>
            <v-col>{{ videoDirStr }}</v-col>
        </v-row>

        <h2>ファイルの内容:</h2>

        <!--
        <p>resourceDirVM: {{ resourceDirVM }}</p>
        <p>testPath: {{ testPath }}</p>
        <p>testPath2: {{ testPath2 }}</p>
        <p>fileContent2: {{ fileContent2 }}</p>
        -->
        <p>testPathStr: {{ testPathStr }}</p>
        <p>executablePathContentVM: {{ executablePathContentVM }}</p>
        <p>fileContent: {{ fileContent }}</p>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs';
    // {  }
    import * as path from '@tauri-apps/api/path';
    // import { resourceDir } from '@tauri-apps/api/path';
    // import { resolveResource } from '@tauri-apps/api/path';
    // import { convertFileSrc } from '@tauri-apps/api/core';

    // ディレクトリー・パス
    const appCacheDirStr = ref<string>('1 読み込み中...');           // 1
    const appConfigDirStr = ref<string>('2 読み込み中...');          // 2
    const appDataDirStr = ref<string>('3 読み込み中...');            // 3
    const appLocalDataDirStr = ref<string>('4 読み込み中...');       // 4
    const appLogDirStr = ref<string>('5 読み込み中...');             // 5
    const audioDirStr = ref<string>('6 読み込み中...');              // 6
    const cacheDirStr = ref<string>('7 読み込み中...');              // 7
    const configDirStr = ref<string>('8 読み込み中...');             // 8
    const dataDirStr = ref<string>('9 読み込み中...');               // 9
    const desktopDirStr = ref<string>('10 読み込み中...');           // 10
    const documentDirStr = ref<string>('11 読み込み中...');          // 11
    const downloadDirStr = ref<string>('12 読み込み中...');          // 12
    const executableDirStr = ref<string>('13 読み込み中...');        // 13
    const fontDirStr = ref<string>('14 読み込み中...');              // 14
    const homeDirStr = ref<string>('15 読み込み中...');              // 15
    const localDataDirStr = ref<string>('16 読み込み中...');         // 16
    const pictureDirStr = ref<string>('17 読み込み中...');           // 17
    const publicDirStr = ref<string>('18 読み込み中...');            // 18
    const resourceDirStr = ref<string>('19 読み込み中...');          // 19
    const runtimeDirStr = ref<string>('20 読み込み中...');           // 20
    const tempDirStr = ref<string>('21 読み込み中...');              // 21
    const templateDirStr = ref<string>('22 読み込み中...');          // 22
    const videoDirStr = ref<string>('23 読み込み中...');             // 23


    // ファイルの内容を保持する reactive 変数
    const filePathVM = ref("C:\\Users\\muzud\\OneDrive\\ドキュメント\\temp\\temp.csv");
    // TODO 🌟 `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\public\sample.txt` を示す方法が分からない。開発中のプロジェクトルートを指したい。
    // TODO 🌟 あるいは `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug` ディレクトリー下にファイルを丸ごとコピーされるか？
    // TODO 🌟 同梱するとファイルが重くなるか？ 外部に置いておく方がいい？ ローカルＰＣか、クラウド上か。

    // const resourceDirVM = ref<string>('読み込み中...');
    const testPathStr = ref<string>('読み込み中...');
    // const testPath2 = ref<string>('読み込み中...');
    // const testPath3 = ref<string>('読み込み中...');
    const fileContent = ref<string>('読み込み中...');
    //const fileContent2 = ref<string>('読み込み中...');
    const errorMessage = ref<string>('');

    const executablePathContentVM = ref('読み込み中...');

    // コンポーネントがマウントされたときに実行
    onMounted(async () => {
        try {
            // ファイルパス一覧：
            appCacheDirStr.value = await path.appCacheDir();            // 1    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app`
            appConfigDirStr.value = await path.appConfigDir();          // 2    `C:\Users\muzud\AppData\Roaming\com.vue-tauri-desktopapp-sample.app`
            appDataDirStr.value = await path.appDataDir();              // 3    `C:\Users\muzud\AppData\Roaming\com.vue-tauri-desktopapp-sample.app`
            appLocalDataDirStr.value = await path.appLocalDataDir();    // 4    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app`
            appLogDirStr.value = await path.appLogDir();                // 5    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app\logs`
            audioDirStr.value = await path.audioDir();                  // 6    `C:\Users\muzud\Music`
            cacheDirStr.value = await path.cacheDir();                  // 7    `C:\Users\muzud\AppData\Local`
            configDirStr.value = await path.configDir();                // 8    `C:\Users\muzud\AppData\Roaming`
            dataDirStr.value = await path.dataDir();                    // 9    `C:\Users\muzud\AppData\Roaming`
            desktopDirStr.value = await path.desktopDir();              // 10   `C:\Users\muzud\OneDrive\デスクトップ`
            documentDirStr.value = await path.documentDir();            // 11   `C:\Users\muzud\OneDrive\ドキュメント`
            downloadDirStr.value = await path.downloadDir();            // 12   `C:\Users\muzud\Downloads`
            //executableDirStr.value = await path.executableDir();      // 13   FIXME: 読み込み中で止まってしまう？
            //fontDirStr.value = await path.fontDir();                  // 14   FIXME: 読み込み中で止まってしまう？
            homeDirStr.value = await path.homeDir();                    // 15   `C:\Users\muzud`   PCのユーザー・ホーム
            localDataDirStr.value = await path.localDataDir();          // 16   `C:\Users\muzud\AppData\Local`
            pictureDirStr.value = await path.pictureDir();              // 17   `C:\Users\muzud\OneDrive\画像`
            publicDirStr.value = await path.publicDir();                // 18   `C:\Users\Public`
            resourceDirStr.value = await path.resourceDir();            // 19   `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug`
            // runtimeDirStr.value = await path.runtimeDir();           // 20   FIXME: 読み込み中で止まってしまう？
            tempDirStr.value = await path.tempDir();                    // 21   `C:\Users\muzud\AppData\Local\Temp\`
            templateDirStr.value = await path.templateDir();            // 22   `C:\Users\muzud\AppData\Roaming\Microsoft\Windows\Templates`
            videoDirStr.value = await path.videoDir();                  // 23   `C:\Users\muzud\Videos`


            executablePathContentVM.value = await readTextFile("start-config.json", { baseDir:BaseDirectory.Executable });

            // // ファイルの読み込み処理を追加
            // fileContent2.value = await readTextFile("sample.txt", { baseDir: BaseDirectory.AppConfig })

            // resourceDirVM.value = await resourceDir();  // C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug
            // testPath3.value = resourceDirVM.value + "/../../../src/assets"

            // Tauri の API で src/assets/sample.txt を読み込む
            //const testPathStr = await path.homeDir();  // PCのユーザー・ホーム
            //const testPathStr = await path.resourceDir();  // `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug`
            //const testPathStr = await resolveResource('assets/sample.txt');  // C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug\assets\image.png
            
            // // debug フォルダーの下に assets フォルダーが無い
            // testPath2.value = convertFileSrc(testPathStr);  // http://asset.localhost/C%3A%5CUsers%5Cmuzud%5COneDrive%5C%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%5CGitHub%5Cvue-tauri-desktopapp-sample%5Csrc-tauri%5Ctarget%5Cdebug%5Cassets%5Csample.txt

            // // TODO プロジェクトのホームは取れないか？
            // testPath.value = testPathStr;  // `C:\Users\muzud`

            alert(`ファイルパス："${filePathVM.value}"`);
            const contentStr = await readTextFile(filePathVM.value);  
            alert(`テキストファイルの内容："${contentStr}"`);

            // const contentStr = await readTextFile(
            //         "public/sample.txt",
            //         //"/public/sample.txt"
            //         //"C:/Users/muzud/OneDrive/ドキュメント/temp/sample.txt"
            //         //"/public/sample.txt"
            //         // C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src\assets\sample.txt
            //         //"C:\\Users\\muzud\\OneDrive\\ドキュメント\\GitHub\\vue-tauri-desktopapp-sample\\src\\assets\\sample.txt"
            //         //"http://asset.localhost/C:/Users/muzud/OneDrive/ドキュメント/GitHub/vue-tauri-desktopapp-sample/src-tauri/target/debug/assets/sample.txt"
            //         //"http://asset.localhost/C%3A%5CUsers%5Cmuzud%5COneDrive%5C%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%5CGitHub%5Cvue-tauri-desktopapp-sample%5Csrc-tauri%5Ctarget%5Cdebug%5Cassets%5Csample.txt"
            //         // // ローカルPCの場合
            //         // // C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src\assets\sample.txt
            //         // //await path.join(testPath.value, 'assets/sample.txt'),
            //         // testPathStr

            //         {
            //             baseDir: BaseDirectory.Home,
            //         }
            //     );

            fileContent.value = contentStr; // ファイル内容をセット
        } catch (error) {
            errorMessage.value = `エラーだぜ: ${error}`; // エラーハンドリング
        }
    });

    // async function getHomePath() {
    //     return await path.homeDir();
    // }

    //const homePath = await getHomePath();
</script>