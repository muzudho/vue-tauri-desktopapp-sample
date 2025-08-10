<template>
    <the-header/>

    <h3> 基本的なファイルパス一覧だぜ！（デスクトップアプリ用）</h3>
    <section class="sec-3">
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
    </section>

    <hr/>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    <router-link to="/making">メイキングの先頭に戻る</router-link>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';
    import * as path from '@tauri-apps/api/path';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheHeader from '../TheHeader.vue';

    // ##############
    // # 共有データ #
    // ##############

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

    const errorMessage = ref<string>('');

    // ##############
    // # 起動時処理 #
    // ##############

    // コンポーネントがマウントされたときに実行
    onMounted(async () => {
        try {
            // ファイルパス一覧：
            appCacheDirStr.value = await fetchDirPathAsync(path.appCacheDir);   // 1    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app`
            appConfigDirStr.value = await fetchDirPathAsync(path.appConfigDir); // 2    `C:\Users\muzud\AppData\Roaming\com.vue-tauri-desktopapp-sample.app`
            appDataDirStr.value = await fetchDirPathAsync(path.appDataDir);     // 3    `C:\Users\muzud\AppData\Roaming\com.vue-tauri-desktopapp-sample.app`
            appLocalDataDirStr.value = await fetchDirPathAsync(path.appLocalDataDir);    // 4    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app`
            appLogDirStr.value = await fetchDirPathAsync(path.appLogDir);       // 5    `C:\Users\muzud\AppData\Local\com.vue-tauri-desktopapp-sample.app\logs`
            audioDirStr.value = await fetchDirPathAsync(path.audioDir);         // 6    `C:\Users\muzud\Music`
            cacheDirStr.value = await fetchDirPathAsync(path.cacheDir);         // 7    `C:\Users\muzud\AppData\Local`
            configDirStr.value = await fetchDirPathAsync(path.configDir);       // 8    `C:\Users\muzud\AppData\Roaming`
            dataDirStr.value = await fetchDirPathAsync(path.dataDir);           // 9    `C:\Users\muzud\AppData\Roaming`
            desktopDirStr.value = await fetchDirPathAsync(path.desktopDir);     // 10   `C:\Users\muzud\OneDrive\デスクトップ`
            documentDirStr.value = await fetchDirPathAsync(path.documentDir);   // 11   `C:\Users\muzud\OneDrive\ドキュメント`
            downloadDirStr.value = await fetchDirPathAsync(path.downloadDir);   // 12   `C:\Users\muzud\Downloads`
            executableDirStr.value = await fetchDirPathAsync(path.executableDir);   // 13   FIXME: 読み込み中で止まってしまう？
            fontDirStr.value = await fetchDirPathAsync(path.fontDir);           // 14   FIXME: 読み込み中で止まってしまう？
            homeDirStr.value = await fetchDirPathAsync(path.homeDir);           // 15   `C:\Users\muzud`   PCのユーザー・ホーム
            localDataDirStr.value = await fetchDirPathAsync(path.localDataDir); // 16   `C:\Users\muzud\AppData\Local`
            pictureDirStr.value = await fetchDirPathAsync(path.pictureDir);     // 17   `C:\Users\muzud\OneDrive\画像`
            publicDirStr.value = await fetchDirPathAsync(path.publicDir);       // 18   `C:\Users\Public`
            resourceDirStr.value = await fetchDirPathAsync(path.resourceDir);   // 19   `C:\Users\muzud\OneDrive\ドキュメント\GitHub\vue-tauri-desktopapp-sample\src-tauri\target\debug`
            runtimeDirStr.value = await fetchDirPathAsync(path.runtimeDir);     // 20   FIXME: 読み込み中で止まってしまう？
            tempDirStr.value = await fetchDirPathAsync(path.tempDir);           // 21   `C:\Users\muzud\AppData\Local\Temp\`
            templateDirStr.value = await fetchDirPathAsync(path.templateDir);   // 22   `C:\Users\muzud\AppData\Roaming\Microsoft\Windows\Templates`
            videoDirStr.value = await fetchDirPathAsync(path.videoDir);         // 23   `C:\Users\muzud\Videos`
                  
        } catch (error) {
            errorMessage.value = `エラーだぜ: ${error}`; // エラーハンドリング
        }
    });

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
            return await getPathAsync();                  // 14   FIXME: 読み込み中で止まってしまう？
        } catch (error) {
            // 予期しないエラーのフォールバック
            return `#ERROR: ${error}`;
        }
    }

</script>