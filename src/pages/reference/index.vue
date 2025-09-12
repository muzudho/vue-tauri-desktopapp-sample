<template>
    <the-app-header/>
    <the-welcome/>
    <the-coding-style-contents-header/>
    <the-coding-style-contents/>
    <the-making-contents-header class="mt-6"/>
    <the-making-contents class="mb-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '@/pages/the-app-header.vue';
    import TheCodingStyleContents from '@/pages/reference/coding-style/the-contents.vue';
    import TheCodingStyleContentsHeader from '@/pages/reference/coding-style/the-contents-header.vue';
    import TheMakingContents from '@/pages/reference/making/the-contents.vue';
    import TheMakingContentsHeader from '@/pages/reference/making/the-contents-header.vue';
    import TheWelcome from '@/pages/reference/the-welcome.vue';
</script>
