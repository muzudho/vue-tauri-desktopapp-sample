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

    import TheChaptersBody from '@/pages/debug-room/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/debug-room/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/debug-room/the-chapters-header.vue';

</script>
