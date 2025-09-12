<!--
    Nuxt ウェブ・アプリケーションでは：
        src/app.vue がルートコンポーネントです。
        ここで、アプリ全体のレイアウトを定義します。
        例えば、ヘッダーやフッター、サイドバーなど、全ページに共通する部分を配置します。

    Tauri デスクトップ・アプリケーションでは：
        src/router/index.ts で src/app.vue をルートコンポーネントとして指定しています。
-->

<template>
    <v-app>
        <v-app-bar app density="compact">
            <v-toolbar-title style="display: inline;">デスクトップアプリ</v-toolbar-title>
            <!-- WIP:
            <v-spacer></v-spacer>
            <v-btn>画面調整</v-btn>
            <v-btn>ゲーム調整</v-btn>
            -->
        </v-app-bar>
        <v-main>
            <!-- WIP: パンくずリスト -->
            <!--
             class="app-bar"
div.app-bar-breadcrumb-list {
    display: inline-block;
    left: 0;
    right: 0;
    width: 98%;
    margin-left: 1%;
    margin-top:4px;
    margin-bottom:4px;
    padding-left: 8px;
    padding-top: 1px;
    padding-right: 8px;
    padding-bottom: 2px;
    border-radius: 15px;
    color: burlywood;
    background-color: maroon;
}
button.app-bar-button {
    min-width: 20px;
    max-width: 20px;
    max-height: 20px;
    padding-left: 4px;
    padding-right: 4px;
    background-color: white;
}

            <div class="app-bar-breadcrumb-list">
                📁&nbsp;
                <v-btn class="app-bar-button">❌</v-btn>&nbsp;リファレンス&nbsp;＞&nbsp;
                <v-btn class="app-bar-button">❌</v-btn>&nbsp;メイキング
            </div>
            -->

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
