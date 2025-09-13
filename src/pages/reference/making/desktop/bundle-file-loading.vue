<template>
    <the-app-header/>
    <button-to-back-to-contents
        class="sec-0 mt-6"
        pagePath="/reference"
    />

    <h1>デスクトップアプリにて　＞　バンドルファイルの読込だぜ！</h1>
    <section class="sec-1">
        <p>{{ startConfigJsonStr }}</p>
    </section>

    <br/>
    <h2>ソースコード</h2>
    <section class="sec-2">
        <source-link/>
    </section>

    <button-to-go-to-top class="sec-0 pt-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';
    import { invoke } from "@tauri-apps/api/core";

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../../../components/SourceLink.vue';
    import TheAppHeader from '../../../the-app-header.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import ButtonToBackToContents from '@/components/ButtonToBackToContents.vue';
    import ButtonToGoToTop from '@/components/ButtonToGoToTop.vue';


    // ################
    // # オブジェクト #
    // ################

    // 設定ファイルを読み込む練習
    const startConfigJsonStr = ref<string>('読み込み中...')


    // ##############
    // # 起動時処理 #
    // ##############

    onMounted(async () => {
        // Rust言語（バックグラウンド相当）の関数を呼び出し
        const startConfig : any = await invoke('read_start_config');
        startConfigJsonStr.value = JSON.stringify(startConfig, null, 4);
    });

</script>
