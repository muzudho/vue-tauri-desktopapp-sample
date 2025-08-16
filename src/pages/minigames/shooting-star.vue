<template>
    <the-header/>

    <h3>シューティング・スター</h3>
    <section class="sec-3">

        <p>カウント: {{ count }}</p>
        <br/>
        テスト：<br/>
        <stopwatch-dev
            v-on:countUp="(countNum) => { count = countNum; }"
        /><br/>
        ：テスト<br/>
        <br/>

        <p>TODO: ここにスコアを表示したい。</p>

        <p>キーボードの上下左右キーを押してくれだぜ！</p>

        <!-- ゲーム画面領域（宇宙） -->
        <div style="position:relative; left: 0; top: 0; width:512px; height:384px; background-color: #303030;">
            <!--
                グリッド
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <div v-for="i in boardArea" :key="i"
                :style="`position:absolute; top: ${Math.floor((i - 1) / board.cols) * cellHeight}px; left: ${((i - 1) % board.cols) * cellWidth}px; width:${cellWidth}px; height:${cellHeight}px; border: solid 1px gray;`"></div>

            <!-- 星 -->
            <Tile
                :srcLeft="0"
                :srcTop="0"
                :srcWidth="32"
                :srcHeight="32"
                tilemapUrl="/img/making/sprite-objects-001.png"
                :style="starStyle"
                style="position:absolute;" /><br/>

            <!-- プレイヤー１（点線の枠） -->
            <div
                class="cursor"
                :style="p1Style"
                style="position:absolute;" ></div>
            
        </div>

        <br/>
        <p>元画像のタイルマップを表示：</p>
        <v-img src="/img/making/sprite-objects-001.png" style="width:128px; height:128px; border: dashed 4px gray;"/>
        ：ここまで。
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, reactive, ref, watch } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import StopwatchDev from '../../components/StopwatchDev.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';
    import Tile from '../../components/Tile.vue';


    // ##############
    // # 共有データ #
    // ##############

    // 盤データ
    const cellWidth = 32;
    const cellHeight = 32;

    // 時データ
    const minutes = 60; // 1分は60秒

    // ++++++++++++++
    // + カウンター +
    // ++++++++++++++

    const count = ref<number>(0);   // カウントの初期値
    watch(count, (newCount) => {
        // カウントが変わったら、何か処理をしたい。

        // ++++++++++++++++
        // + スケジュール +
        // ++++++++++++++++

        // ゲーム開始から1秒後、星表示
        if (newCount == 1 * minutes) {
            star1.cols = 5;
            star1.rows = 3;
            star1.visibility = 'visible';
        }

        // ゲーム開始から3秒後、星非表示
        if (newCount == 3 * minutes) {
            star1.visibility = 'hidden';
        }
    });


    // ++++++++++++++++++++++++
    // + オブジェクト１：　星 +
    // ++++++++++++++++++++++++

    const star1 = reactive({
        cols: 0,
        rows: 0,
        visibility: 'hidden' as 'hidden' | 'visible',
    });

    // モーション設計
    const o1Motion = ref<Record<string, number>>({
        toRight: 0,   // 右へ移動するなら正の数、左に移動するなら負の数
    });

    // ++++++++++++++++++++++++++++
    // + プレイヤー１（点線の枠） +
    // ++++++++++++++++++++++++++++

    const player1 = reactive({
        left: 6 * cellWidth,    // スプライトのX座標
        top: 4 * cellHeight,    // スプライトのY座標
        colNum: 4,              // スプライトの列数
        rowNum: 3,              // スプライトの行数
        speed: 4,               // 移動速度
        input: <Record<string, boolean>>{  // 入力
            ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
        },
        motionWait: 0,          // 入力キーごとに用意したい
        motion: ref<Record<string, number>>({  // 入力
            xAxis: 0,   // 負なら左、正なら右
            yAxis: 0,   // 負なら上、正なら下
        }),
    });

    // モーション
    const moLeft = -1;  // モーション（motion）定数。左に移動する
    const moRight = 1;
    const moUp = -1;
    const moDown = 1;

    // 盤データ
    const board = reactive({
        cols: 16,
        rows: 12,
    });
    const boardArea = board.cols * board.rows; // 盤のセル数


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        startGameLoop();
        //startTimer();

        // キーボードイベント
        window.addEventListener('keydown', (e) => {
            if (player1.input.hasOwnProperty(e.key)) {
                player1.input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (player1.input.hasOwnProperty(e.key)) {
                player1.input[e.key] = false;
            }
        });


        // ################
        // # サブルーチン #
        // ################

        function startGameLoop() : void {
            const update = () => {
                // モーション・タイマー
                player1.motionWait -= 1;

                if (player1.motionWait==0) {
                    player1.motion["xAxis"] = 0;    // クリアー
                    player1.motion["yAxis"] = 0;
                }
                
                // 入力（上下左右への移動）をモーションに変換
                if (player1.motionWait<=0) {   // ウェイトが無ければ、入力を受け付ける。
                    if (player1.input.ArrowLeft) {
                        player1.motion["xAxis"] = moLeft; // 左
                    }

                    if (player1.input.ArrowRight) {
                        player1.motion["xAxis"] = moRight;  // 右
                    }

                    if (player1.input.ArrowUp) {
                        player1.motion["yAxis"] = moUp;   // 上
                    }

                    if (player1.input.ArrowDown) {
                        player1.motion["yAxis"] = moDown;   // 下
                    }

                    if (player1.motion["xAxis"]!=0 || player1.motion["yAxis"]!=0) {
                        player1.motionWait = 8;    // フレーム数を設定
                    }
                }

                // 移動処理
                // 斜め方向の場合、上下を優先する。
                if (player1.motion["xAxis"]==1) {   // 右
                    if (player1.left < (board.cols - player1.colNum) * cellWidth) {    // 境界チェック
                        player1.left += player1.speed;
                    }
                } else if (player1.motion["xAxis"]==-1) {  // 左
                    if (0 < player1.left) {    // 境界チェック
                        player1.left -= player1.speed;
                    }
                }

                if (player1.motion["yAxis"]==-1) {  // 上
                    if (0 < player1.top) {    // 境界チェック
                        player1.top -= player1.speed;
                    }
                } else if (player1.motion["yAxis"]==1) {   // 下
                    if (player1.top < (board.rows - player1.rowNum) * cellHeight) {    // 境界チェック
                        player1.top += player1.speed;
                    }
                }

                // 次のフレーム
                requestAnimationFrame(update);
            };

            // 初回呼び出し
            requestAnimationFrame(update);
        }

    });


    // ############
    // # スタイル #
    // ############

    const starStyle = computed(() => ({
        visibility: star1.visibility,
        top: `${star1.rows * cellHeight}px`,
        left: `${star1.cols * cellWidth + Math.floor(count.value / 20) * cellWidth}px`,
        width: `${cellWidth}px`,
        height: `${cellHeight}px`,
    }));
    const p1Style = computed(() => ({
        top: `${player1.top}px`,
        left: `${player1.left}px`,
        width: `${player1.colNum * cellWidth}px`,
        height: `${player1.rowNum * cellHeight}px`,
    }));

</script>

<style scoped>
    div.cursor {
        position: relative; border:dashed 4px #f0f0f0;
    }
</style>
