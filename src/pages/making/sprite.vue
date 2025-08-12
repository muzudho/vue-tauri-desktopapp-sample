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

    const x = ref<number>(0);  // スプライトのX座標
    const y = ref<number>(0);  // スプライトのY座標
    const speed = ref<number>(2);   // 移動速度
    const keys = <Record<string, boolean>>{ ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

    const walkGraphicStyle = computed(() => ({
        top: `${y.value}px`,
        left: `${x.value}px`,
    }));

    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        startGameLoop();

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
