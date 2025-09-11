<template>
    <component :is="TheChaptersHeader"/>
    <component :is="TheReferenceCodingStyle"/>
    <component :is="TheChaptersFooter"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheChaptersFooter from '@/pages/reference/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/reference/the-chapters-header.vue';
    import TheReferenceCodingStyle from '@/pages/reference/coding-style/index.vue';

</script>

<style scoped>

    @import '@/styles/notebook.css';

</style>
