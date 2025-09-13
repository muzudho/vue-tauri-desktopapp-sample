<template>
    <!--
        静的インポート・動的コンポーネント
        router/page-map.ts, router/articles.json も編集してください（TODO: ここらへん自動生成化したい）
    -->
    <blog-article page="2025-09/12-fri"/>
    <button-to-go-to-top class="sec-1 pt-6"/>

    <blog-article page="2025-09/11-thu"/>
    <button-to-go-to-top class="sec-1 pt-6"/>

    <blog-article page="2025-09/10-wed"/>
    <button-to-go-to-top class="sec-1 pt-6"/>


    <!-- 静的インポート・静的コンポーネント -->
    <Blog20250403ThuSample />
    <button-to-go-to-top class="sec-1 pt-6"/>

    <Blog20250402WedSample />
    <button-to-go-to-top class="sec-1 pt-6"/>

    <Blog20250401TueSample />
    <button-to-go-to-top class="sec-1 pt-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import BlogArticle from '@/components/BlogArticle.vue';
    import ButtonToGoToTop from '@/components/ButtonToGoToTop.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    // 静的インポート・静的コンポーネント
    import Blog20250401TueSample from './2025-04/01-tue-sample.vue';
    import Blog20250402WedSample from './2025-04/02-wed-sample.vue';
    import Blog20250403ThuSample from './2025-04/03-thu-sample.vue';

</script>
