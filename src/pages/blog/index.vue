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

    import TheChaptersBody from '@/pages/blog/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/blog/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/blog/the-chapters-header.vue';

</script>
