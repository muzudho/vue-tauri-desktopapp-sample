<!--
    クイズ：　王の間のタイルを市松模様にしようぜ！
-->

<template>
    <the-chapter-header/>

    <h1>操作の説明だぜ！</h1>

    <the-chapter-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import TheChapterFooter from './the-chapter-footer.vue';
    import TheChapterHeader from './the-chapter-header.vue';

</script>

<style scoped>
</style>
