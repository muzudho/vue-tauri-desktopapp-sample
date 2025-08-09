<template>
    <h2>## カウントアップのアニメーションのテストだぜ！</h2>
    <section class="sec-2">
        ここに切り抜いたタイルを表示：<br/>
        <!--
        <Tile
                srcLeft="0"
                srcTop="0"
                srcWidth="32"
                srcHeight="32"
                tilemapUrl="/img/timer_square.png"
                style="zoom:4; image-rendering: pixelated;" /><br/>
        -->
        <TileAnimation
                :frames="[{
                    left: 0,
                    top: 0,
                    width: 32,
                    height: 32
                }]"
                tilemapUrl="/img/timer_square.png"
                frameIndex="0"
                style="zoom:4; image-rendering: pixelated;" /><br/>
        <!--
        NOTE: Tauri では上の書き方でいけるが、Nuxt では下の書き方にしないとエラーが出るようだ。
        <Tile
                :srcLeft="64"
                :srcTop="32"
                :srcWidth="32"
                :srcHeight="64"
                :tilemapUrl="'/img/timer_square.png'" /><br/>
        -->
        ：ここまで。<br/>
        <br/>
        <p>カウント: {{ count }}</p>
        <v-btn @click="startTimer">スタート</v-btn>
        <v-btn @click="stopTimer">ストップ</v-btn>
        <v-btn @click="resetTimer">リセット</v-btn>
        <br/>
        元画像のタイルマップを表示：<br/>
        <v-img src="/img/timer_square.png" style="width:320px; height:192px; zoom: 4; image-rendering: pixelated;"/>
        ：ここまで。
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    //import Tile from '@/components/Tile.vue';
    import TileAnimation from '@/components/TileAnimation.vue';

    // ##############
    // # 共有データ #
    // ##############

    const count = ref<number>(0);   // カウントの初期値
    const timerId = ref<number | null>(null);   // タイマーのIDを保持

    onMounted(() => {
        // コンポーネントがマウントされたときの処理
    });

    // ####################
    // # イベントハンドラ #
    // ####################

    function startTimer() : void {
        // 既にタイマーが動いてたら何もしない
        if (timerId.value) return;

        // requestAnimationFrameで約16.67ms（60fps）ごとにカウントアップ
        const tick = () => {
            count.value += 1;
            timerId.value = requestAnimationFrame(tick);
        };
        timerId.value = requestAnimationFrame(tick);
    }

    function stopTimer() : void {
        // タイマーを停止
        if (timerId.value) {
            cancelAnimationFrame(timerId.value);
            timerId.value = null;
        }
    }

    function resetTimer() : void {
        // カウントをリセットしてタイマーも停止
        count.value = 0;
        stopTimer();
    }    
</script>
