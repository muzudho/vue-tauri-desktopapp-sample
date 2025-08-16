<template>
    <the-header/>

    <h3>シューティング・スター</h3>
    <section class="sec-3">

        <stopwatch-dev
            ref="stopwatch1"
            v-on:countUp="(countNum) => { count = countNum; }"
        /><br/>
        <br/>
        <p>リロード・タイム: {{ finder1.reloadTime }}</p>
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
                :style="`position:absolute; top: ${Math.floor((i - 1) / board.cols) * board.cellHeight}px; left: ${((i - 1) % board.cols) * board.cellWidth}px; width:${board.cellWidth}px; height:${board.cellHeight}px; border: solid 1px gray;`"></div>

            <!-- 星 -->
            <Tile
                :srcLeft="0"
                :srcTop="0"
                :srcWidth="board.cellWidth"
                :srcHeight="board.cellHeight"
                tilemapUrl="/img/making/sprite-objects-001.png"
                :style="starStyle"
                style="position:absolute;" /><br/>

            <!-- カメラのファインダー（点線の枠） -->
            <div
                class="finder"
                :style="finderStyle"
                style="position:absolute;" ></div>

            <!-- リロードのカウントダウン（パイみたいなやつ） -->
            <Tile
                :srcLeft="0"
                :srcTop="0"
                :srcWidth="board.cellWidth"
                :srcHeight="board.cellHeight"
                tilemapUrl="/img/making/202508__warabenture__16--2315-8counts.png"
                :style="reloadPieStyle"
                style="position:absolute;" /><br/>
                
        </div>

        <br/>
        <p>元画像のタイルマップを表示：</p>
        <v-img src="/img/making/sprite-objects-001.png" style="width:128px; height:128px; border: dashed 4px gray;"/><br/>
        <v-img src="/img/making/202508__warabenture__16--2315-8counts.png" style="width:128px; height:64px; border: dashed 4px gray;"/><br/>
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


    // ##########
    // # 効果音 #
    // ##########

    const volume = 0.3; // 音量
    let sfxBuzzer: HTMLAudioElement;            // ブザー音
    let sfxCameraShutter: HTMLAudioElement;     // カメラで撮影したときの効果音
    let sfxMiss: HTMLAudioElement;              // ミス音

    /**
     * 効果音をロードする（jsfxrで作った効果音）
     */
    function loadSfx() : void {
        sfxBuzzer = new Audio('/wav/202508__sfx__16--2212-buzzer.wav'); // ブザー音
        sfxBuzzer.volume = volume;
        sfxCameraShutter = new Audio('/wav/202508__sfx__16--2117-cameraShutter.wav'); // カメラのシャッター音
        sfxCameraShutter.volume = volume;
        sfxMiss = new Audio('/wav/202508__sfx__16--2146-miss.wav'); // ミス音
        sfxMiss.volume = volume;
    }

    // ##############
    // # 共有データ #
    // ##############

    // ++++++
    // + 盤 +
    // ++++++

    // 盤データ
    const board = reactive({
        cellWidth: 32,
        cellHeight: 32,
        cols: 16,
        rows: 12,
    });
    const boardArea = board.cols * board.rows; // 盤のセル数

    // 時データ
    const seconds = 60; // 1秒は60フレーム

    // ++++++++++++++
    // + カウンター +
    // ++++++++++++++

    const stopwatch1 = ref<InstanceType<typeof StopwatchDev> | null>(null); // StopwatchDevのインスタンス

    const count = ref<number>(0);   // カウントの初期値
    watch(count, (newCount) => {
        // カウントが変わったら、何か処理をしたい。

        // ++++++++++++++++
        // + スケジュール +
        // ++++++++++++++++

        // ゲーム開始から1秒後、星表示
        if (newCount == 1 * seconds) {
            star1.startCols = 5;
            star1.startRows = 3;
            star1.visibility = 'visible';
        }

        // ゲーム開始から3秒後、星非表示
        if (newCount == 3 * seconds) {
            star1.visibility = 'hidden';
        }
    });


    // ++++++++++++++++++++++++
    // + オブジェクト１：　星 +
    // ++++++++++++++++++++++++

    const star1 = reactive({
        startCols : 0,  // 出現位置
        startRows : 0,
        visibility: 'hidden' as 'hidden' | 'visible',
    });
    const star1Cols = computed(()=>{
        return star1.startCols + Math.floor(count.value / 20);
    });
    const star1Rows = computed(()=>{
        return star1.startRows;
    });

    // // モーション設計
    // const o1Motion = ref<Record<string, number>>({
    //     toRight: 0,   // 右へ移動するなら正の数、左に移動するなら負の数
    // });

    // ++++++++++++++++++++++++++++++++++++
    // + カメラのファインダー（点線の枠） +
    // ++++++++++++++++++++++++++++++++++++

    const finder1 = reactive({
        left: 6 * board.cellWidth,    // スプライトのX座標
        top: 4 * board.cellHeight,    // スプライトのY座標
        colNum: 4,              // スプライトの列数
        rowNum: 3,              // スプライトの行数
        speed: 4,               // 移動速度
        input: <Record<string, boolean>>{  // 入力
            // アルファベット順
            ArrowDown: false, ArrowLeft: false, ArrowUp: false, ArrowRight: false, Enter: false,
        },
        motionWait: 0,          // 入力キーごとに用意したい
        motion: ref<Record<string, number>>({  // 入力
            xAxis: 0,   // 負なら左、正なら右
            yAxis: 0,   // 負なら上、正なら下
        }),
        reloadTime: 0,  // 0 になるまで、入力を受け付けない
    });

    // モーション
    const moLeft = -1;  // モーション（motion）定数。左に移動する
    const moRight = 1;
    const moUp = -1;
    const moDown = 1;


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        startGameLoop();
        //startTimer();

        loadSfx();

        // キーボードイベント
        window.addEventListener('keydown', (e) => {
            if (finder1.input.hasOwnProperty(e.key)) {
                finder1.input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (finder1.input.hasOwnProperty(e.key)) {
                finder1.input[e.key] = false;
            }
        });


        // ################
        // # サブルーチン #
        // ################

        function startGameLoop() : void {
            const update = () => {
                // モーション・タイマー
                finder1.motionWait -= 1;

                if (finder1.reloadTime > 0) {
                    // リロード中
                    finder1.reloadTime -= 1;
                }

                if (finder1.motionWait==0) {
                    finder1.motion["xAxis"] = 0;    // クリアー
                    finder1.motion["yAxis"] = 0;
                }
                
                // ++++++++++++++++++++++++++++++
                // + キー入力をモーションに変換 +
                // ++++++++++++++++++++++++++++++
                if (finder1.motionWait<=0) {   // ウェイトが無ければ、入力を受け付ける。

                    if (finder1.input.Enter) {
                        // 撮影
                        stopwatch1.value?.stopTimer();  // タイマーをストップ
                        cameraShot();
                    }

                    if (finder1.input.ArrowLeft) {
                        finder1.motion["xAxis"] = moLeft; // 左
                    }

                    if (finder1.input.ArrowRight) {
                        finder1.motion["xAxis"] = moRight;  // 右
                    }

                    if (finder1.input.ArrowUp) {
                        finder1.motion["yAxis"] = moUp;   // 上
                    }

                    if (finder1.input.ArrowDown) {
                        finder1.motion["yAxis"] = moDown;   // 下
                    }

                    if (finder1.motion["xAxis"]!=0 || finder1.motion["yAxis"]!=0) {
                        finder1.motionWait = 8;    // フレーム数を設定
                    }
                }

                // 移動処理
                // 斜め方向の場合、上下を優先する。
                if (finder1.motion["xAxis"]==1) {   // 右
                    if (finder1.left < (board.cols - finder1.colNum) * board.cellWidth) {    // 境界チェック
                        finder1.left += finder1.speed;
                    }
                } else if (finder1.motion["xAxis"]==-1) {  // 左
                    if (0 < finder1.left) {    // 境界チェック
                        finder1.left -= finder1.speed;
                    }
                }

                if (finder1.motion["yAxis"]==-1) {  // 上
                    if (0 < finder1.top) {    // 境界チェック
                        finder1.top -= finder1.speed;
                    }
                } else if (finder1.motion["yAxis"]==1) {   // 下
                    if (finder1.top < (board.rows - finder1.rowNum) * board.cellHeight) {    // 境界チェック
                        finder1.top += finder1.speed;
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

    /**
     * カメラショット処理
     */
    function cameraShot() : void {

        if (finder1.reloadTime > 0) {
            // リロード中
            sfxBuzzer.play();
            return;
        }

        // ファインダーの位置とサイズ
        const finderLeftCols = finder1.left / board.cellWidth;
        const finderTopCols = finder1.top / board.cellHeight;
        const finderRightEndCols = finderLeftCols + finder1.colNum;
        const finderBottomEndCols = finderTopCols + finder1.rowNum;

        // ファインダーの枠内に星を含むか？
        if (
            finderLeftCols <= star1Cols.value && star1Cols.value <= finderRightEndCols &&
            finderTopCols <= star1Rows.value && star1Rows.value <= finderBottomEndCols) {
            // 星を含む
            sfxCameraShutter.play();

        // 星を含まない
        } else {
            sfxMiss.play();
        }

        finder1.reloadTime = 3 * seconds;  // リロード時間を設定
    }

    // ############
    // # スタイル #
    // ############

    const starStyle = computed(() => ({
        visibility: star1.visibility,
        top: `${star1Rows.value * board.cellHeight}px`,
        left: `${star1Cols.value * board.cellWidth}px`,
        width: `${board.cellWidth}px`,
        height: `${board.cellHeight}px`,
    }));
    const finderStyle = computed(() => ({
        top: `${finder1.top}px`,
        left: `${finder1.left}px`,
        width: `${finder1.colNum * board.cellWidth}px`,
        height: `${finder1.rowNum * board.cellHeight}px`,
    }));
    const reloadPieStyle = computed(() => ({
        visibility: finder1.reloadTime > 0 ? 'visible' : 'hidden',
        top: `${finder1.top + finder1.rowNum * board.cellHeight / 2 - board.cellHeight / 2}px`,
        left: `${finder1.left + finder1.colNum * board.cellWidth / 2 - board.cellWidth / 2}px`,
    }));

</script>

<style scoped>
    div.finder {
        position: relative; border:dashed 4px #f0f0f0;
    }
</style>
