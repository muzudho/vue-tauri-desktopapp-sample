<template>
    <the-header/>

    <h3>矢印キーで移動しようぜ！</h3>
    <section class="sec-3">
        <canvas id="myCanvas" ref="myCanvas" width="32" height="32"></canvas>
        <p>矢印キーで移動！</p>
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

    import TheHeader from './the-header.vue';

    // ##############
    // # 共有データ #
    // ##############

    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement
    const myCanvas = ref<HTMLCanvasElement | null>(null); // Canvas要素を参照

    const ctx = ref<CanvasRenderingContext2D | null>(null); // コンテキストを参照
    const x = ref<number>(50);  // スプライトのX座標
    const y = ref<number>(50);  // スプライトのY座標
    const speed = ref<number>(2);   // 移動速度
    const keys = <Record<string, boolean>>{ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    const sprite = new Image();

    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // Canvasとコンテキストを取得
        myCanvas.value = document.getElementById('myCanvas') as HTMLCanvasElement;

        // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/getContext
        ctx.value = myCanvas.value.getContext('2d');

        // スプライト画像の読み込み
        sprite.src = 'https://via.placeholder.com/32'; // 仮の32x32画像（実際はスプライト画像のURL）
        sprite.onload = () => {
            startGameLoop();
        };

        // キーボードイベント
        window.addEventListener('keydown', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (keys.hasOwnProperty(e.key)) {
                keys[e.key] = false;
            }
        });
    });

    // ################
    // # サブルーチン #
    // ################

    function startGameLoop() : void {
        const update = () => {
            // 移動処理
            if (keys.ArrowUp) {
                y.value -= speed.value;
            }

            if (keys.ArrowDown) {
                y.value += speed.value;
            }

            if (keys.ArrowLeft) {
                x.value -= speed.value;
            }

            if (keys.ArrowRight) {
                x.value += speed.value;
            }

            // 画面外に出ないように制限
            x.value = Math.max(0, Math.min(x.value, myCanvas.value?.width ?? 1 - 32));
            y.value = Math.max(0, Math.min(y.value, myCanvas.value?.height ?? 1 - 32));

            // 描画
            if (ctx.value != null){
                ctx.value.clearRect(0, 0, myCanvas.value?.width ?? 1, myCanvas.value?.height ?? 1);
                ctx.value.drawImage(sprite, x.value, y.value);
            }

            // 次のフレーム
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
</script>

<style scoped>
    canvas {
        border: 1px solid black;
    }
</style>
