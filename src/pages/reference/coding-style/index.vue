<template>
    <the-app-header/>

    <button-to-close-pane
        class="sec-0"
        direction="down"
        pagePath="/reference"
    />
    🌟開発中<br/>

    <section class="sec-0">
        <v-btn @click="openAllChapters" v-tooltip="'全章を開く'">🟩</v-btn>
    </section>

    <component :is="TheChapterHeader" />
    <component :is="TheChapterBody" />
    <component :is="TheChapterFooter" />

    <component :is="ThePartFooter"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { useRouter } from 'vue-router';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import ButtonToClosePane from '@/components/ButtonToClosePane.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '@/pages/the-app-header.vue';
    import TheChapterBody from '@/pages/reference/coding-style/the-chapter-body.vue';
    import TheChapterFooter from '@/pages/reference/coding-style/the-chapter-footer.vue';
    import TheChapterHeader from '@/pages/reference/coding-style/the-chapter-header.vue';
    import ThePartFooter from '@/pages/reference/the-part-footer.vue';


    // ############
    // # ルーチン #
    // ############
    
    const router = useRouter();

    
    function openAllChapters() : void {
        router.push('/reference');
    }

</script>
