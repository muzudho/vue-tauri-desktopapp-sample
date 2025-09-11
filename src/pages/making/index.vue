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

    import TheChaptersBody from '@/pages/making/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/making/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/making/the-chapters-header.vue';

</script>
