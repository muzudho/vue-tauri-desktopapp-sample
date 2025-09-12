<template>
    <the-app-header/>

    <router-link to="/reference/coding-style" :style="getLinkHighlight('/reference/coding-style')">コーディング・スタイル</router-link> |
    <router-link to="/reference/making" :style="getLinkHighlight('/reference/making')">メイキング</router-link>

    <button-to-close-below-part
        pagePath="/"
    />

    <h3>コーディング・スタイルの章だぜ！</h3>
    <button-to-close-below-section
        pagePath="/reference/coding-style"
    />
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import ButtonToCloseBelowPart from '@/components/ButtonToCloseBelowPart.vue';
    import ButtonToCloseBelowSection from '@/components/ButtonToCloseBelowSection.vue';
    import TheAppHeader from '../../the-app-header.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    import { getLinkHighlight } from '../../../composables/link-highlight';

</script>
