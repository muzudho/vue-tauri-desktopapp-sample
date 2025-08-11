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
                    <router-link to="/blog">ブログ</router-link> |
                    <router-link to="/welcome-to-tauri-and-vue">WelcomeToTauriAndVue</router-link> |
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

    @import '../styles/warabenture.css';

    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color: #0f0f0f;
        background-color: #f6f6f6;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    /* スマホ向けスタイル (画面幅が768px以下) */
    @media screen and (max-width: 768px) {
    }

    /* パソコン向けスタイル (画面幅が769px以上) */
    @media screen and (min-width: 769px) {
    }

    .container {
        margin: 0;
        padding-top: 10vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: 0.75s;
    }

    .logo.tauri:hover {
        filter: drop-shadow(0 0 2em #24c8db);
    }

    .row {
        /* margin-top: 0px !important; .v-row に margin: -12px; が付いてるので、全部調整しなおすのは難しい。 */
        display: flex;
        justify-content: center;
    }

    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
    }

    a:hover {
        color: #535bf2;
    }

    h1 {
        text-align: center;
    }

    input,
    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        color: #0f0f0f;
        background-color: #ffffff;
        transition: border-color 0.25s;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    button {
        cursor: pointer;
    }

    button:hover {
        border-color: #396cd8;
    }
    button:active {
        border-color: #396cd8;
        background-color: #e8e8e8;
    }

    input,
    button {
        outline: none;
    }

    #greet-input {
        margin-right: 5px;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            color: #f6f6f6;
            background-color: #2f2f2f;
        }

        a:hover {
            color: #24c8db;
        }

        input,
        button {
            color: #ffffff;
            background-color: #0f0f0f98;
        }
        button:active {
            background-color: #0f0f0f69;
        }
    }
</style>