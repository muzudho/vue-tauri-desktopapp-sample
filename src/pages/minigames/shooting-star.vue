<template>
    <the-header/>

    <h3>シューティング・スター</h3>
    <section class="sec-3">
        <p>キーボードの上下左右キーを押してくれだぜ！</p>

        <!-- ゲーム画面領域（宇宙） -->
        <div style="position:relative; left: 0; top: 0; width:512px; height:384px; background-color: #303030;">
            <!--
                グリッド
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <div v-for="i in tableArea" :key="i"
                :style="`position:absolute; top: ${Math.floor((i - 1) / tableColumns) * cellHeight}px; left: ${((i - 1) % tableColumns) * cellWidth}px; width:${cellWidth}px; height:${cellHeight}px; border: solid 1px gray;`"></div>

            <!-- プレイヤー１（点線の枠） -->
            <div
                class="cursor"
                :style="p1Style"></div>
            
        </div>

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

    // 盤データ
    const cellWidth = 32;
    const cellHeight = 32;

    // プレイヤー１（点線の枠）
    const p1Left = ref<number>(0);      // スプライトのX座標
    const p1Top = ref<number>(0);       // スプライトのY座標
    const p1Speed = ref<number>(2);     // 移動速度
    const p1Input = <Record<string, boolean>>{  // 入力
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    };
    const p1Style = computed(() => ({
        top: `${p1Top.value}px`,
        left: `${p1Left.value}px`,
    }));

    const tableColumns = 16;
    const tableRows = 12;
    const tableArea = tableColumns * tableRows; // 盤のセル数

    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        startGameLoop();

        // キーボードイベント
        window.addEventListener('keydown', (e) => {
            if (p1Input.hasOwnProperty(e.key)) {
                p1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (p1Input.hasOwnProperty(e.key)) {
                p1Input[e.key] = false;
            }
        });

        // ################
        // # サブルーチン #
        // ################

        function startGameLoop() : void {
            const update = () => {
                // 移動処理
                if (p1Input.ArrowUp) {
                    p1Top.value -= p1Speed.value;
                }

                if (p1Input.ArrowDown) {
                    p1Top.value += p1Speed.value;
                }

                if (p1Input.ArrowLeft) {
                    p1Left.value -= p1Speed.value;
                }

                if (p1Input.ArrowRight) {
                    p1Left.value += p1Speed.value;
                }

                // 次のフレーム
                requestAnimationFrame(update);
            };

            // 初回呼び出し
            requestAnimationFrame(update);
        }

    });

</script>

<style scoped>
    div.cursor {
        position: relative; width:128px; height:96px; border:dashed 4px #f0f0f0;
    }
</style>
