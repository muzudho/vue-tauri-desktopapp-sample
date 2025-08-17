<template>
    <the-header/>

    <h3>矢印キーで移動しようぜ！</h3>
    <section class="sec-3">
        <!-- キャンバスは画面みたいなもの。 -->
        <p>矢印キーで移動！</p>
        <img
            src="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
            :style="walkGraphicStyle"
            style="position: relative;"></img><br/>
        <canvas
            id="myCanvas"
            ref="myCanvas"
            width="400"
            height="400"
            ></canvas>
        
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheHeader from './the-header.vue';

    // ##############
    // # 共有データ #
    // ##############

    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement
    const myCanvas = ref<HTMLCanvasElement | null>(null); // Canvas要素を参照

    const x = ref<number>(0);  // スプライトのX座標
    const y = ref<number>(0);  // スプライトのY座標
    const speed = ref<number>(2);   // 移動速度
    const keys = <Record<string, boolean>>{ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    const sprite = new Image();

    const walkGraphicStyle = computed(() => ({
        top: `${y.value}px`,
        left: `${x.value}px`,
        /*
        width: `${props.srcWidth}px`,
        height: `${props.srcHeight}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `${-props.srcLeft}px ${-props.srcTop}px`,
        backgroundRepeat: 'no-repeat',
        */
    }));

    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // Canvasとコンテキストを取得
        myCanvas.value = document.getElementById('myCanvas') as HTMLCanvasElement;

        // // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/getContext
        // const ctx : CanvasRenderingContext2D | null = myCanvas.value.getContext('2d');

        // スプライト画像の読み込み
        sprite.src = "/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png";
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
                // x.value = Math.max(0, Math.min(x.value, myCanvas.value?.width ?? 1 - 32));
                // y.value = Math.max(0, Math.min(y.value, myCanvas.value?.height ?? 1 - 32));

                // // 描画
                // if (ctx != null){
                //     ctx.clearRect(0, 0, myCanvas.value?.width ?? 1, myCanvas.value?.height ?? 1);
                //     ctx.drawImage(sprite, x.value, y.value);
                // }

                // 次のフレーム
                requestAnimationFrame(update);
            };

            // 初回呼び出し
            requestAnimationFrame(update);
        }

    });

</script>

<style scoped>
    canvas {
        border: 1px solid black;
    }
</style>
