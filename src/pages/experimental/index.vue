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

    import TheChaptersBody from '@/pages/experimental/the-part-body.vue';
    import TheChaptersFooter from '@/pages/experimental/the-part-footer.vue';
    import TheChaptersHeader from '@/pages/experimental/the-part-header.vue';

</script>
