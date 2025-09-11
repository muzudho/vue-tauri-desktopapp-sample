<template>
    <component :is="TheChaptersHeader"/>
    <component :is="TheChaptersBody"/>
    <!-- ホームにフッターの閉じるボタンはありません。 -->
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheChaptersBody from '@/pages/home/the-chapters-body.vue';
    import TheChaptersHeader from '@/pages/home/the-chapters-header.vue';

</script>
