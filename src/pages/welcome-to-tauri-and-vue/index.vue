<template>
    <the-grand-parent-header/>
    <the-parent-header/>

    <h2>Welcome to Tauri + Vue だぜ！　の部　インデックス</h2>

    <v-container class="row">
        <!-- FIXME: なぜかボタンの画像が下にずれてしまう。 -->
        <v-btn icon href="https://vitejs.dev" target="_blank">
            <v-img src="/vite.svg" class="logo vite" style="top: -20px;" alt="Vite logo" />
        </v-btn>
        <v-btn icon href="https://tauri.app" target="_blank">
            <v-img src="/tauri.svg" class="logo tauri" style="top: -20px;" alt="Tauri logo" />
        </v-btn>
        <v-btn icon href="https://vuejs.org/" target="_blank">
            <v-img :src="assetsVueLogoSvg" class="logo vue" style="top: -20px;" alt="Vue logo" />
        </v-btn>
    </v-container>

    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <v-form class="row" @submit.prevent="greet">
        <v-text-field id="greet-input" v-model="name" placeholder="Enter a name..."></v-text-field>
        <v-btn type="submit" class="button">Greet</v-btn>
    </v-form>

    <p>{{ greetMsg }}</p>

    <the-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    import { invoke } from "@tauri-apps/api/core";

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import TheGrandParentHeader from '../../the-header.vue';
    import TheParentHeader from '../the-header.vue';
    import TheParentFooter from '../the-footer.vue';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    

    // 画像パス
    import assetsVueLogoSvg from '@/assets/img/vue.svg';


    // ##############
    // # 共有データ #
    // ##############

    const greetMsg = ref("");
    const name = ref("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        greetMsg.value = await invoke("greet", { name: name.value });
    }
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
