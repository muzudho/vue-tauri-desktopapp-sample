<template>
    <component :is="ThePartHeader"/>

    <section class="sec-2">
        <v-btn @click="openAllChapters" v-tooltip="'全章を開く'">🟩</v-btn>
    </section>

    <component :is="TheSectionIndexBody" />
    <component :is="ThePartFooter"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { useRouter } from 'vue-router';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import ThePartFooter from '@/pages/reference/the-part-footer.vue';
    import ThePartHeader from '@/pages/reference/the-part-header.vue';
    import TheSectionIndexBody from '@/pages/reference/coding-style/index-body.vue';


    // ############
    // # ルーチン #
    // ############
    
    const router = useRouter();

    
    function openAllChapters() : void {
        router.push('/reference');
    }

</script>
