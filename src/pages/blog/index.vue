<template>
    <the-grand-parent-header/>
    <the-parent-header/>

    <h2>ブログだぜ！　の部　インデックス</h2>
    <section class="sec-2">
        上の方の記事が新しいぜ（＾▽＾）！<br/>
    </section>

    <!--
        静的インポート・動的コンポーネント
        router/page-map.ts, router/articles.json も編集してください（TODO: ここらへん自動生成化したい）
    -->
    <blog-article page="2025-09/11-thu"/>
    <blog-article page="2025-09/10-wed"/>

    <!-- 静的インポート・静的コンポーネント -->
    <Blog20250811MonSample />
    <Blog20250810SunSample />
    <Blog20250809SatSample />

    <the-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import BlogArticle from '@/components/BlogArticle.vue';
    import TheGrandParentHeader from '../../the-header.vue';
    import TheParentFooter from '../the-footer.vue';
    import TheParentHeader from '../the-header.vue';
    import Blog20250809SatSample from './2025-08/09-sat-sample.vue';
    import Blog20250810SunSample from './2025-08/10-sun-sample.vue';
    import Blog20250811MonSample from './2025-08/11-mon-sample.vue';

</script>
