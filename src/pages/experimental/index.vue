<template>
    <component :is="ThePartHeader"/>
    <component :is="ThePartBody"/>
    <component :is="ThePartFooter"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import ThePartBody from '@/pages/experimental/the-part-body.vue';
    import ThePartFooter from '@/pages/experimental/the-part-footer.vue';
    import ThePartHeader from '@/pages/experimental/the-part-header.vue';

</script>
