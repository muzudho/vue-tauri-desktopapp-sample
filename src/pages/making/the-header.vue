<template>
    <the-grand-parent-header/>

    <section class="sec-1">
        <v-btn @click="goBackTo1" v-tooltip="'下の部を閉じる'">❌</v-btn>
    </section>

    <h2>メイキングの部だぜ！</h2>
    <section class="sec-2">
        <v-btn @click="goBackTo2" v-tooltip="'下の章を閉じる'">❌</v-btn>
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

    import TheGrandParentHeader from '../../the-header.vue';


    // ############
    // # ルーチン #
    // ############
    
    const router = useRouter();

    function goBackTo1() : void {
        router.push('/');
    }

    function goBackTo2() : void {
        router.push('/making');
    }

</script>
