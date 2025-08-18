<template>
    <v-app>
        <v-main>
            <NuxtLayout>

                <!-- ナビゲーション -->
                <nav>
                    <!--
                        🌟 ルーティングは自動ではありません。
                        src/router/index.vue の中身を記述してください。

                        pages/ フォルダー下のページのファイル名は、
                        Nuxt 公式では kebab-case、
                            📖 https://nuxt.com/docs/3.x/guide/directory-structure/pages
                        Tauri では PascalCase が習慣的に使われています。異なるので注意。
                    -->
                    <router-link to="/">ホーム</router-link> |
                    <router-link to="/about">このサイトについて</router-link> |
                    <router-link to="/welcome-to-tauri-and-vue">WelcomeToTauriAndVue</router-link> |
                    <router-link to="/blog">ブログ</router-link> |
                    <router-link to="/minigames">ミニゲーム</router-link> |
                    <router-link to="/making">メイキング</router-link>
                </nav>

                <h1>Tauri デスクトップアプリのサンプルだぜ！</h1>

                <!-- このビューにコンポーネントがレンダリングされる。 -->
                <router-view />

            </NuxtLayout>
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
    import TheFooter from './the-footer.vue';

</script>

<style scoped>
    .logo.vite:hover {
        filter: drop-shadow(0 0 2em #747bff);
    }

    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #249b73);
    }
</style>

<style>

    @import './styles/warabenture.css';

</style>
