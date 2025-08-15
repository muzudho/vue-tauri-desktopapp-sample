<template>
    <the-grand-parent-header/>

    <h2>ブログ</h2>
    <section class="sec-2">
        上の方の記事が新しいぜ（＾▽＾）！<br/>
    </section>

    <Blog20250811MonSample />
    <Blog20250810SunSample />
    <Blog20250809SatSample />

    <the-grand-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheGrandParentFooter from '../../the-footer.vue';
    import TheGrandParentHeader from '../../the-header.vue';
    import Blog20250809SatSample from './2025-08/09-sat-sample.vue';
    import Blog20250810SunSample from './2025-08/10-sun-sample.vue';
    import Blog20250811MonSample from './2025-08/11-mon-sample.vue';

</script>
