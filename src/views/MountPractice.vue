<template>
    <div>
        <h1>onMounted を使う練習だぜ！</h1>

        <h2>ファイルの内容:</h2>

        <!--
        <p>resourceDirVM: {{ resourceDirVM }}</p>
        <p>testPath: {{ testPath }}</p>
        <p>testPath2: {{ testPath2 }}</p>
        <p>fileContent2: {{ fileContent2 }}</p>
        -->
        <p>fileContent: {{ fileContent }}</p>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { BaseDirectory, readTextFile } from '@tauri-apps/plugin-fs';
    // // import * as path from '@tauri-apps/api/path';
    // import { resourceDir } from '@tauri-apps/api/path';
    // import { resolveResource } from '@tauri-apps/api/path';
    // import { convertFileSrc } from '@tauri-apps/api/core';

    // ファイルの内容を保持する reactive 変数
    const filePathVM = ref("C:\\Users\\muzud\\OneDrive\\ドキュメント\\temp\\temp.csv");
    // const resourceDirVM = ref<string>('読み込み中...');
    // const testPath = ref<string>('読み込み中...');
    // const testPath2 = ref<string>('読み込み中...');
    // const testPath3 = ref<string>('読み込み中...');
    const fileContent = ref<string>('読み込み中...');
    //const fileContent2 = ref<string>('読み込み中...');
    const errorMessage = ref<string>('');

    // コンポーネントがマウントされたときに実行
    onMounted(async () => {
        try {
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