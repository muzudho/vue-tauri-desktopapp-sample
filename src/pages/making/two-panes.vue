<template>
    <v-container fluid class="pa-0 full-height">
        <!-- 上半分の画像エリア（固定） -->
        <v-row no-gutters class="top-pane">
            <v-col cols="12">
                <v-img
                    src="https://picsum.photos/1920/1080"
                    height="50vh"
                    cover
                    class="fixed-image"
                >
                    <v-overlay absolute opacity="0.3">
                    <v-row align="center" justify="center" class="fill-height">
                        <v-col cols="12" class="text-center">
                        <h1 class="white--text">Fixed Image Section</h1>
                        </v-col>
                    </v-row>
                    </v-overlay>
                </v-img>
            </v-col>
        </v-row>

        <!-- 下半分のスクロール可能なテキストエリア -->
        <v-row no-gutters class="bottom-pane">
            <v-col cols="12">
                <v-card class="pa-4 scrollable-content">
                    <v-card-title>Scrollable Text Content</v-card-title>
                    <v-card-text>
                    <p v-for="i in 20" :key="i">
                        This is some sample text content. You can scroll through this section while the image above stays fixed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
    // Vue3 の Composition API を使ってるぜ！特にスクリプト部分は今回はシンプルでOK
</script>

<style scoped>
    .full-height {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow-y: hidden; /* 垂直スクロールバーを非表示 */
    }

    .top-pane {
        height: 50vh;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    .bottom-pane {
        position: fixed;
        top: 50vh;
        height: 50vh;
        overflow-y: auto; /* スクロール可能にする */
    }

    .scrollable-content {
        min-height: 100%; /* コンテンツが少ない場合でもスクロールエリアを確保 */
    }
</style>
