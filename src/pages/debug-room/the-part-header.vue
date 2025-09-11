<template>
    <the-app-header/>
    <section class="sec-1">
        <v-btn @click="closePart" v-tooltip="'下の部を閉じる'">❌</v-btn>
    </section>
    <h2>デバッグ・ルームの部だぜ！</h2>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { useRouter } from 'vue-router';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '../the-app-header.vue';
    
    // ############
    // # ルーチン #
    // ############

    const router = useRouter();

    function closePart() : void {
        router.push('/');
    }

</script>
