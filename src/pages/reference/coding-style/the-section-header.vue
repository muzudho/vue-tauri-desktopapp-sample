<template>
    <the-app-header/>

    <router-link to="/reference/coding-style" :style="getLinkHighlight('/reference/coding-style')">コーディング・スタイル</router-link> |
    <router-link to="/reference/making" :style="getLinkHighlight('/reference/making')">メイキング</router-link>

    <button-to-close-pane
        class="sec-0"
        direction="down"
        pagePath="/reference"
    />
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import ButtonToClosePane from '@/components/ButtonToClosePane.vue';
    import TheAppHeader from '../../the-app-header.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    import { getLinkHighlight } from '../../../composables/link-highlight';

</script>
