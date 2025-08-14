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
    const p1Left = ref<number>(6 * cellWidth);      // スプライトのX座標
    const p1Top = ref<number>(4* cellHeight);       // スプライトのY座標
    const p1ColNum = ref<number>(4);    // スプライトの列数
    const p1RowNum = ref<number>(3);     // スプライトの行数
    //const p1Speed = ref<number>(2);     // 移動速度
    const p1Speed = ref<number>(4);     // 移動速度
    const p1Input = <Record<string, boolean>>{  // 入力
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    };
    const p1Style = computed(() => ({
        top: `${p1Top.value}px`,
        left: `${p1Left.value}px`,
        width: `${p1ColNum.value * cellWidth}px`,
        height: `${p1RowNum.value * cellHeight}px`,
    }));

    // モーション
    const p1MotionWait = ref(0);  // TODO 入力キーごとに用意したい。
    const moLeft = -1;  // モーション（motion）定数。左に移動する
    const moRight = 1;
    const moUp = -1;
    const moDown = 1;
    const p1Motion = ref<Record<string, number>>({  // 入力
        xAxis: 0,   // 負なら左、正なら右
        yAxis: 0,   // 負なら上、正なら下
    });

    // タイマー
    const count = ref<number>(0);   // カウントの初期値
    const timerId = ref<number | null>(null);   // タイマーのIDを保持

    // 盤データ
    const tableColumns = 16;
    const tableRows = 12;
    const tableArea = tableColumns * tableRows; // 盤のセル数

    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
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
                // モーション・タイマー
                p1MotionWait.value -= 1;

                if (p1MotionWait.value==0) {
                    p1Motion.value["xAxis"] = 0;    // クリアー
                    p1Motion.value["yAxis"] = 0;
                }
                
                // 入力（上下左右への移動）をモーションに変換
                if (p1MotionWait.value<=0) {   // ウェイトが無ければ、入力を受け付ける。
                    if (p1Input.ArrowLeft) {
                        p1Motion.value["xAxis"] = moLeft; // 左
                    }

                    if (p1Input.ArrowRight) {
                        p1Motion.value["xAxis"] = moRight;  // 右
                    }

                    if (p1Input.ArrowUp) {
                        p1Motion.value["yAxis"] = moUp;   // 上
                    }

                    if (p1Input.ArrowDown) {
                        p1Motion.value["yAxis"] = moDown;   // 下
                    }

                    if (p1Motion.value["xAxis"]!=0 || p1Motion.value["yAxis"]!=0) {
                        p1MotionWait.value = 8;    // フレーム数を設定
                    }
                }

                // 移動処理
                // 斜め方向の場合、上下を優先する。
                if (p1Motion.value["xAxis"]==1) {   // 右
                    if (p1Left.value < (tableColumns - p1ColNum.value) * cellWidth) {    // 境界チェック
                        p1Left.value += p1Speed.value;
                    }
                } else if (p1Motion.value["xAxis"]==-1) {  // 左
                    if (0 < p1Left.value) {    // 境界チェック
                        p1Left.value -= p1Speed.value;
                    }
                }

                if (p1Motion.value["yAxis"]==-1) {  // 上
                    if (0 < p1Top.value) {    // 境界チェック
                        p1Top.value -= p1Speed.value;
                    }
                } else if (p1Motion.value["yAxis"]==1) {   // 下
                    if (p1Top.value < (tableRows - p1RowNum.value) * cellHeight) {    // 境界チェック
                        p1Top.value += p1Speed.value;
                    }
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
        position: relative; border:dashed 4px #f0f0f0;
    }
</style>
