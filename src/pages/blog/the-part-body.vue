<template>
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
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import BlogArticle from '@/components/BlogArticle.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import Blog20250401TueSample from './2025-04/01-tue-sample.vue';
    import Blog20250402WedSample from './2025-04/02-wed-sample.vue';
    import Blog20250403ThuSample from './2025-04/03-thu-sample.vue';

</script>
