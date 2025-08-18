<template>
    <h4>ＲＰＧの歩行グラフィック</h4>
    <section class="sec-4">
        <p>キーボード操作方法</p>
        <ul>
            <li><span class="code-key">↑</span><span class="code-key">↓</span><span class="code-key">←</span><span class="code-key">→</span>キー　…　上下左右に動かすぜ！</li>
            <li><span class="code-key">（スペース）</span>キー　…　位置を最初の状態に戻すぜ。</li>
        </ul>
        <br/>

        <div :style="`width: ${4 * cellWidth}px; height: ${4 * cellHeight}px; background-color:lightpink;`">
            <!-- プレイヤー１ -->
            <TileAnimation
                :frames="p1Frames"
                tilemapUrl="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
                :slow="slow"
                :time="count"
                class="cursor"
                :style="p1Style"
                style="zoom:4; image-rendering: pixelated;" /><br/>
        </div>

    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ＲＰＧの歩行グラフィック　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link/>
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
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../components/SourceLink.vue';
    import TileAnimation from '@/components/TileAnimation.vue';


    // ##############
    // # 共有データ #
    // ##############

    // 盤データ
    const cellWidth = 32;
    const cellHeight = 32;

    // プレイヤー１
    const p1Left = ref<number>(0);      // スプライトのX座標
    const p1Top = ref<number>(0);       // スプライトのY座標
    const p1Speed = ref<number>(2);     // 移動速度
    const p1Input = <Record<string, boolean>>{  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const p1Style = computed(() => ({
        top: `${p1Top.value}px`,
        left: `${p1Left.value}px`,
    }));

    const count = ref<number>(0);   // カウントの初期値
    const slow = ref<number>(8);   // スローモーションの倍率の初期値
    const timerId = ref<number | null>(null);   // タイマーのIDを保持

    // キャラクターの向きと、歩行タイルの指定
    const sourceFrames = {
        up:[    // 上向き
            {top:  0 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  0 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  0 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  0 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
        ],
        right:[ // 右向き
            {top:  1 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  1 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  1 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  1 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
        ],
        down:[  // 下向き
            {top:  2 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  2 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  2 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  2 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
        ],
        left:[  // 左向き
            {top:  3 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  3 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  3 * cellHeight, left: 0 * cellWidth, width: cellWidth, height: cellHeight },
            {top:  3 * cellHeight, left: 1 * cellWidth, width: cellWidth, height: cellHeight },
        ]
    };

    const p1Frames = ref(sourceFrames["down"]);


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        window.document.addEventListener('keydown', (event: KeyboardEvent) => {
            // 上下キーの場合
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                event.preventDefault();
            }
        });        

        startGameLoop();
        startTimer();

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

                // 位置のリセット
                if (p1Input[" "]) {
                    p1Top.value = 0;
                    p1Left.value = 0;
                }

                // 移動処理
                if (p1Input.ArrowUp) {
                    p1Frames.value = sourceFrames["up"]
                    p1Top.value -= p1Speed.value;
                }

                if (p1Input.ArrowRight) {
                    p1Frames.value = sourceFrames["right"];
                    p1Left.value += p1Speed.value;
                }

                if (p1Input.ArrowDown) {
                    p1Frames.value = sourceFrames["down"];
                    p1Top.value += p1Speed.value;
                }

                if (p1Input.ArrowLeft) {
                    p1Frames.value = sourceFrames["left"];
                    p1Left.value -= p1Speed.value;
                }

                // 次のフレーム
                requestAnimationFrame(update);
            };

            // 初回呼び出し
            requestAnimationFrame(update);
        }

    });

    // ################
    // # サブルーチン #
    // ################

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

</script>

<style scoped>
    div.cursor {
        position: relative; width:32px; height:32px;
    }
</style>
