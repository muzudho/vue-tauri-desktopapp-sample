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

    import TheChaptersBody from '@/pages/debug-room/the-part-body.vue';
    import TheChaptersFooter from '@/pages/debug-room/the-part-footer.vue';
    import TheChaptersHeader from '@/pages/debug-room/the-part-header.vue';

</script>
