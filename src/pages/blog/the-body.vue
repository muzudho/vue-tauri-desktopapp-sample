<template>
    <!--
        静的インポート・動的コンポーネント
        router/page-map.ts, router/articles.json も編集してください（TODO: ここらへん自動生成化したい）
    -->
    <template
        v-for="pageKey in pageList"
    >
        <blog-article :page="pageKey"/>
        <button-to-go-to-top class="sec-1 pt-6"/>
    </template>

    <!--
    <blog-article page="2025-09/12-fri"/>
    <button-to-go-to-top class="sec-1 pt-6"/>

    <blog-article page="2025-09/11-thu"/>
    <button-to-go-to-top class="sec-1 pt-6"/>

    <blog-article page="2025-09/10-wed"/>
    <button-to-go-to-top class="sec-1 pt-6"/>
    -->

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import BlogArticle from '@/components/BlogArticle.vue';
    import ButtonToGoToTop from '@/components/ButtonToGoToTop.vue';


    // ################
    // # オブジェクト #
    // ################

    const pageList = [
        '2025-09/12-fri',
        '2025-09/11-thu',
        '2025-09/10-wed',
    ];


    // ###############
    // # 起動 / 終了 #
    // ###############

    onMounted(()=>{
        // TODO: JSONファイル読込
        // TODO: ページのキーだけで配列を作成
    });

</script>
