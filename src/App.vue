<template>
    <v-app>
        <v-main>
            <!-- Nuxt を使っていないときは、NuxtLayout 要素は省きます。
            <NuxtLayout>
            </NuxtLayout>
            -->

            <!-- このビューにコンポーネントがレンダリングされる。 -->
            <router-view />

        </v-main>
    </v-app>
</template>

<script setup lang="ts">
</script>

<style>
    @import '@/styles/talk-scene.css';
    @import '@/styles/warabenture.css';
</style>
