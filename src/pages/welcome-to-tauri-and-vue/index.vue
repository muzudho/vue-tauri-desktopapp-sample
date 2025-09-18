<template>
    <the-app-header/>
    <the-body/>
    <button-to-back-to-top class="sec-0 pt-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '@/pages/the-app-header.vue';
    import TheBody from '@/pages/welcome-to-tauri-and-vue/the-body.vue';
    import ButtonToBackToTop from '@/components/ButtonToBackToTop.vue';

</script>
