<template>
    <the-app-header/>

    <section class="sec-1">
        <v-btn @click="closePart" v-tooltip="'下の部を閉じる'">❌</v-btn>
    </section>

    <h2>リファレンスの部だぜ！</h2>
    <section class="sec-2">
        <v-btn @click="closeChapter" v-tooltip="'下の章を閉じる'">❌</v-btn>
    </section>

    <h3>コーディング・スタイルの章だぜ！</h3>
    <section class="sec-3">
        <v-btn @click="closeSection" v-tooltip="'下の節を閉じる'">❌</v-btn>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { useRouter } from 'vue-router';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheAppHeader from '../../../the-app-header.vue';


    // ############
    // # ルーチン #
    // ############
    
    const router = useRouter();

    
    function closePart() : void {
        router.push('/');
    }


    function closeChapter() : void {
        router.push('/reference');
    }


    function closeSection() : void {
        router.push('/reference/coding-style');
    }

</script>
