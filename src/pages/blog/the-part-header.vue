<template>
    <the-app-header/>

    <section class="sec-0 mt-6 mb-6">
        上の方にある記事が新しいぜ（＾▽＾）！
    </section>
    <button-to-close-below-part/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import ButtonToCloseBelowPart from '@/components/ButtonToCloseBelowPart.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '../the-app-header.vue';

</script>
