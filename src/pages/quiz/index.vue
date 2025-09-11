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

    import TheChaptersBody from '@/pages/quiz/the-chapters-body.vue';
    import TheChaptersFooter from '@/pages/quiz/the-chapters-footer.vue';
    import TheChaptersHeader from '@/pages/quiz/the-chapters-header.vue';

</script>
