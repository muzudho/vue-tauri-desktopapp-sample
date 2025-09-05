<template>
    <the-grand-parent-header/>
    <the-parent-header/>

    <h2>このサイトについてだぜ！　の部　インデックス</h2>
    <section class="sec-2">
        <p>制作者：むずでょ</p>
        <p>ワラベンチャーでは、Ｗｅｂとデスクトップで両用できるアプリケーションを開発していっているぜ（＾▽＾）！</p>
        <p>開発のメインとして使っているのは Vue 3 と、 Vuetify 3 だぜ（＾▽＾）</p>
        <p>なるべく Tauri 3 と Nuxt 3 の機能は、必要になるまで使わないようにしているぜ（＾～＾）</p>
    </section>

    <the-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheGrandParentHeader from '../../the-header.vue';
    import TheParentHeader from '../the-header.vue';
    import TheParentFooter from '../the-footer.vue';

</script>
