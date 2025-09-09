<template>
    <v-app>
        <v-main>

            <!-- Nuxt + Vue ウェブアプリ用：
                <v-container> は：
                    スマホでのレイアウトの崩れを防止します。
                    ただし、どんなに画面の横幅が広くても、コンテンツはセンタリングされてしまうという欠点はあります
                <NuxtPage> は：
                    この部分に、pages フォルダーの中にある Vue コンポーネント（.vue ファイル）がレンダリングされます。

            <NuxtLayout>
                <v-container>
                    <NuxtPage />
                </v-container>
            </NuxtLayout>
            -->

            <!-- Tauri + Vue デスクトップアプリ用：
                <router-view> は：
                    Nuxt の <NuxtPage> に相当し、この部分にコンポーネントがレンダリングされます。
            -->
            <router-view />

        </v-main>
    </v-app>
</template>

<style>
    @import '@/styles/application.css';
    @import '@/styles/talk-scene.css';
</style>
