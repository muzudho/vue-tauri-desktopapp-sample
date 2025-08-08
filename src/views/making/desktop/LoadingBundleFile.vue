<template>
    <h2>## バンドルファイルの読込だぜ！（デスクトップアプリ用）</h2>
    <section class="sec-2">

        <p>{{ startConfigJsonStr }}</p>

    </section>
    <hr/>
    <router-link to="/making">メイキングに戻る</router-link>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';
    import { invoke } from "@tauri-apps/api/core";

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
