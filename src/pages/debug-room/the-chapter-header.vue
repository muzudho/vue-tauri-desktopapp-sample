<template>
    <the-app-header/>
    <button-to-close-pane
        class="sec-0"
        direction="down"
        pagePath="/"
    />
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
    import ButtonToClosePane from '@/components/ButtonToClosePane.vue';
    import TheAppHeader from '../the-app-header.vue';

</script>
