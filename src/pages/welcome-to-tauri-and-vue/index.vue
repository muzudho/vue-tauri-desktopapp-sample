<template>
    <component :is="TheChaptersHeader"/>
    <component :is="TheChaptersBody"/>
    <component :is="TheChaptersFooter"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheChaptersBody from '@/pages/welcome-to-tauri-and-vue/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/welcome-to-tauri-and-vue/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/welcome-to-tauri-and-vue/the-chapters-header.vue';

</script>
