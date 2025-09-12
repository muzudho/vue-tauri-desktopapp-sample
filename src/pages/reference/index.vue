<template>
    <the-app-header/>
    <the-welcome/>

    <the-coding-style-header/>
    <the-coding-style-contents/>
    <br/>

    <the-making-header/>
    <the-making-contents/>

    <the-part-footer/>
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
    import TheCodingStyleHeader from '@/pages/reference/coding-style/the-chapter-header.vue';
    import TheMakingContents from '@/pages/reference/making/the-contents.vue';
    import TheMakingHeader from '@/pages/reference/making/the-chapter-header.vue';
    import ThePartFooter from '@/pages/reference/the-part-footer.vue';
    import TheWelcome from '@/pages/reference/the-welcome.vue';

</script>
