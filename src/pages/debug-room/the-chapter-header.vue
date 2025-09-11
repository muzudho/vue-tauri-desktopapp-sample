<template>
    <the-app-header/>
    <button-to-close-below-part/>

    <h2>デバッグ・ルームだぜ！　の部</h2>
    <button-to-close-below-chapter
        pagePath="/debug-room"
    />
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import ButtonToCloseBelowChapter from '@/components/ButtonToCloseBelowChapter.vue';
    import ButtonToCloseBelowPart from '@/components/ButtonToCloseBelowPart.vue';
    import TheAppHeader from '@/the-app-header.vue';

</script>
