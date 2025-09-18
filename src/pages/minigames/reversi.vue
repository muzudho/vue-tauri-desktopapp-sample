<template>
    <!-- 以降、ページ -->
    <the-app-header/>

    <button-to-back-to-contents
        class="sec-0 mt-6"
        pagePath="."
    />

    <h1>リバーシ</h1>
    <section class="sec-1 pt-6 mb-6">
    </section>
    
    <button-to-back-to-top class="sec-1 pt-6"/>
    <h2>ソースコード</h2>
    <section class="sec-2">
        <source-link/>
    </section>

    <button-to-back-to-top class="sec-0 pt-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    // アルファベット順
    import ButtonToBackToContents from '@/components/ButtonToBackToContents.vue';
    import ButtonToBackToTop from '@/components/ButtonToBackToTop.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '../the-app-header.vue';

</script>

<style lang="css" scoped>
    @import '@/styles/misc.css';
    @import '@/styles/talk-pen.css';
</style>
