<template>
    <the-section-header/>

    <h4>ノン・プレイヤー・キャラクターを動かそうぜ！　の章</h4>

    <br/>
    <h5><span class="parent-header">ノン・プレイヤー・キャラクターを動かそうぜ！　＞　</span>ソースコード</h5>
    <section class="sec-5">
        <source-link/>
    </section>

    <the-section-footer/>
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

    import TheSectionFooter from './the-section-footer.vue';
    import TheSectionHeader from './the-section-header.vue';

</script>

<style scoped>
</style>
