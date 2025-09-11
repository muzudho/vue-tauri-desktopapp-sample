<template>
    <the-app-header/>
    <the-parts-header/>

    <h2>このサイトについてだぜ！　の部　インデックス</h2>
    <section class="sec-2">
        <p>制作者：むずでょ</p>
        <p>ワラベンチャーでは、Ｗｅｂとデスクトップで両用できるアプリケーションを開発していっているぜ（＾▽＾）！</p>
        <p>開発のメインとして使っているのは Vue 3 と、 Vuetify 3 だぜ（＾▽＾）</p>
        <p>なるべく Tauri 3 と Nuxt 3 の機能は、必要になるまで使わないようにしているぜ（＾～＾）</p>
    </section>

    <the-parts-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheAppHeader from '../../the-app-header.vue';
    import ThePartsHeader from '../the-parts-header.vue';
    import ThePartsFooter from '../the-parts-footer.vue';

</script>
