<template>
    <v-app>
        <v-main>
            <!-- Nuxt を使っていないときは、NuxtLayout 要素は省きます。
            <NuxtLayout>
            </NuxtLayout>
            -->

            <the-header></the-header>

            <!-- このビューにコンポーネントがレンダリングされる。 -->
            <router-view />

        </v-main>
    </v-app>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheHeader from './the-header.vue';

</script>

<style>
    @import '@/styles/talk-scene.css';
    @import '@/styles/warabenture.css';

   /* @import './styles/warabenture.css'; */

</style>
