<template>
    <the-grand-parent-header/>

    <h2>メイキングの章だぜ！</h2>
    <section class="sec-2">
        <v-btn @click="goToMaking" v-tooltip="'下の節を閉じる'">❌</v-btn>
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

    function goToMaking() : void {
        router.push('/making');
    }
</script>
