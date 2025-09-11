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

    import TheChaptersBody from '@/pages/about/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/about/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/about/the-chapters-header.vue';

</script>
