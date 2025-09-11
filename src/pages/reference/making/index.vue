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

    import TheChaptersBody from '@/pages/reference/making/the-part-body.vue';
    import TheChaptersFooter from '@/pages/reference/making/the-part-footer.vue';
    import TheChaptersHeader from '@/pages/reference/making/the-part-header.vue';

</script>
