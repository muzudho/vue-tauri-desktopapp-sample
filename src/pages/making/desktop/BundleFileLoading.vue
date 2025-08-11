<template>
    <the-header/>

    <h3>デスクトップアプリにて　＞　バンドルファイルの読込だぜ！</h3>
    <section class="sec-3">

        <p>{{ startConfigJsonStr }}</p>

    </section>
    <hr/>
    <router-link to="/making">メイキングの先頭に戻る</router-link>
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

    import TheHeader from '../TheHeader.vue';

    // ##############
    // # 共有データ #
    // ##############

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
