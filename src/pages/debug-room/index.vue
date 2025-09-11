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

    import ThePartBody from '@/pages/debug-room/the-part-body.vue';
    import ThePartFooter from '@/pages/debug-room/the-part-footer.vue';
    import ThePartHeader from '@/pages/debug-room/the-part-header.vue';

</script>
