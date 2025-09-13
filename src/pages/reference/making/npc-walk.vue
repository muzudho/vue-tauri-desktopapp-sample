<template>
    <the-app-header/>

    <h1>ノン・プレイヤー・キャラクターを動かす章だぜ！</h1>

    <br/>
    <h2><span class="parent-header">ノン・プレイヤー・キャラクターを動かそうぜ！　＞　</span>ソースコード</h2>
    <section class="sec-2">
        <source-link/>
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../../components/SourceLink.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '../../the-app-header.vue';

</script>

<style scoped>
</style>
