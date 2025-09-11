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

    import ThePartBody from '@/pages/reference/making/the-part-body.vue';
    import ThePartFooter from '@/pages/reference/making/the-part-footer.vue';
    import ThePartHeader from '@/pages/reference/making/the-part-header.vue';

</script>
