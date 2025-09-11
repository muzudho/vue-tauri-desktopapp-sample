<template>
    <the-chapter-header/>

    <h3>ノン・プレイヤー・キャラクターを動かそうぜ！　の章</h3>

    <br/>
    <h3><span class="parent-header">ノン・プレイヤー・キャラクターを動かそうぜ！　＞　</span>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

    <the-chapter-footer/>
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

    import TheChapterFooter from './the-chapter-footer.vue';
    import TheChapterHeader from './the-chapter-header.vue';

</script>

<style scoped>
</style>
