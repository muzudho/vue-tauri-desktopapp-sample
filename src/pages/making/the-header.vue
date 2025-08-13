<template>
    <h2>メイキングの章だぜ！</h2>
    <section class="sec-2">
        <v-btn @click="goToMaking">下の節を閉じる</v-btn>
        <!--
            <router-link to="/making">戻る</router-link>
        -->
    </section>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function goToMaking() : void {
        router.push('/making');
    }
</script>
