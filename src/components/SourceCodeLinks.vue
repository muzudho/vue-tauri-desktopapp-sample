<template>
    <p>
        ソースコードはこちら（＾▽＾）！
        <ul>
            <li>📖 <a target="_blank" :href="desktopappPath">デスクトップアプリ版のソースコード</a></li>
            <li>📖 <a target="_blank" :href="webappPath">ウェブアプリ版のソースコード</a></li>
            <li>📖 <a target="_blank" :href="warabenturePath">このワラベンチャーのソースコード</a></li>
        </ul>
    </p>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { defineProps, withDefaults } from 'vue';

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################

    interface Props {
        pagePath: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        pagePath: "/",
    });

    // ##############
    // # 共通データ #
    // ##############

    const desktopappPath = `https://github.com/muzudho/vue-tauri-desktopapp-sample/blob/main/src/pages${props.pagePath}`;
    const webappPath = `https://github.com/muzudho/vue-nuxt-webapp-sample/blob/main/src/pages${props.pagePath}`;
    const warabenturePath = `https://github.com/muzudho/Warabenture-2025/blob/main/src/pages${props.pagePath}`;

</script>
