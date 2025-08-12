<template>
    <the-header/>

    <h3>矢印キーで移動しようぜ！</h3>
    <section class="sec-3">
        <p>矢印キーで移動！</p>
        <div
            class="cursor"
            :style="walkGraphicStyle"></div>
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

    const p1Left = ref<number>(0);  // スプライトのX座標
    const p1Top = ref<number>(0);  // スプライトのY座標
    const speed = ref<number>(2);   // 移動速度

    // プレイヤー１の入力
    const p1Input = <Record<string, boolean>>{ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    const walkGraphicStyle = computed(() => ({
        top: `${p1Top.value}px`,
        left: `${p1Left.value}px`,
    }));

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
                    p1Top.value -= speed.value;
                }

                if (p1Input.ArrowDown) {
                    p1Top.value += speed.value;
                }

                if (p1Input.ArrowLeft) {
                    p1Left.value -= speed.value;
                }

                if (p1Input.ArrowRight) {
                    p1Left.value += speed.value;
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
        position: relative; border:dashed 4px green; width:32px; height:32px;
    }
</style>
