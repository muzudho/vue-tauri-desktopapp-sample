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

    import TheChaptersBody from '@/pages/welcome-to-tauri-and-vue/the-part-body.vue';
    import TheChaptersFooter from '@/pages/welcome-to-tauri-and-vue/the-part-footer.vue';
    import TheChaptersHeader from '@/pages/welcome-to-tauri-and-vue/the-part-header.vue';

</script>
