<template>
    <br/>
    <section class="sec-3">
        <v-btn @click="closeSection" v-tooltip="'上の節を閉じる'">❌</v-btn>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { useRouter } from 'vue-router';


    // ############
    // # ルーチン #
    // ############
    const router = useRouter();


    function closeSection() : void {
        router.push('/reference/coding-style');
    }
</script>
