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
    <Blog20250403ThuSample />
    <Blog20250402WedSample />
    <Blog20250401TueSample />

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
    import Blog20250401TueSample from './2025-04/01-tue-sample.vue';
    import Blog20250402WedSample from './2025-04/02-wed-sample.vue';
    import Blog20250403ThuSample from './2025-04/03-thu-sample.vue';

</script>
