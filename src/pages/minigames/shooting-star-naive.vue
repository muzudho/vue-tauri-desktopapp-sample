<template>
    <the-header/>

    <h3>シューティング・スター（初級者向けのソースコード）</h3>
    <section class="sec-3">

        <!-- ゲームの操作方法 -->
        <v-btn @click="appManualIsShowing = !appManualIsShowing">{{ appManualIsShowing ? 'ゲームの遊び方・操作方法を閉じる' : 'ゲームの遊び方・操作方法を表示' }}</v-btn>
        <div v-if="appManualIsShowing">
            <p>このゲームは、星を撮影する、という状況を見立てたゲームだぜ。</p>
            <br/>
            <p>操作で使うコントローラーは以下のものだぜ。</p>
            <ul>
                <li>マウスの左クリック: ボタンを押すのに使う</li>
                <li>キーボードの上下左右キー: カメラのファインダー（点線の長方形だ）を上下左右に移動</li>
                <li>キーボードのエンターキー: 撮影</li>
            </ul>
            <br/>
            <p>
                下に黒い画面が見えるように、ウィンドウを広げてくれだぜ。<br/>
                この黒い画面は宇宙な。<br/>
                ［ゲームスタート］ボタンを押すと、ゲームが始まるぜ。<br/>
                たまに星が流れてくる。<br/>
                60秒の間に、カメラのファインダーを上下左右に動かして、星をファインダーの中に入っているときに、エンターキーを押してくれだぜ。これで 100点 だぜ。<br/>
                <br/>
                飽きたら終わりだぜ。<br/>
            </p>
        </div><br/>
        <br/>

        <!-- ボタンを並べる -->
        <div>
            <v-btn @click="onGameStartOrEndButtonPushed()">{{ appGameStartButtonText }}</v-btn>
            <v-btn @click="onGamePauseOrRestartButtonPushed()">{{ appGamePauseButtonText }}</v-btn>

            <!-- フォーカスを外すためのダミー・ボタンです -->
            <v-btn id="dammyButton">何もしないボタン</v-btn>
            <br/>

            <p style="font-size: x-large; margin-top: 8px; margin-bottom: 8px;">
            スコア： {{ appGameScore }}　　残り時間: {{ Math.floor((appGameMaxCount - stopwatch1Count) / commonSeconds) }} . {{ (appGameMaxCount - stopwatch1Count) % commonSeconds }}
            </p>
        </div>

        <!-- デバッグに使いたいときは、 display: none; を消してください。 -->
        <stopwatch-dev
            ref="stopwatch1CompoRef"
            v-on:countUp="(countNum) => { stopwatch1Count = countNum; }"
            style="display: none;" />

        <!-- ゲーム画面領域（宇宙） -->
        <div style="position:relative; left: 0; top: 0; width:512px; height:384px; background-color: #303030;">
            <!--
                グリッド
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <div v-for="i in board1Area" :key="i"
                :style="`position:absolute; top: ${Math.floor((i - 1) / board1.cols) * board1.cellHeight}px; left: ${((i - 1) % board1.cols) * board1.cellWidth}px; width:${board1.cellWidth}px; height:${board1.cellHeight}px; border: solid 1px gray;`"></div>

            <!-- 星 -->
            <Tile
                :srcLeft="0"
                :srcTop="0"
                :srcWidth="board1.cellWidth"
                :srcHeight="board1.cellHeight"
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
                :srcLeft="reloadPie1TileLeft"
                :srcTop="reloadPie1TileTop"
                :srcWidth="board1.cellWidth"
                :srcHeight="board1.cellHeight"
                tilemapUrl="/img/making/202508__warabenture__16--2357-8counts-red.png"
                :style="reloadPieStyle"
                style="position:absolute;" /><br/>
                
        </div>

        <!-- デバッグ用 -->
        <!--
            <p>スケジュール・ステップ: {{ appGameScheduleStep.value }}</p>
            <p>星　行： {{ star1Rows }}</p>
            <p>星　列： {{ star1Cols }}</p>
            <p>リロード・タイム: {{ finder1.reloadTime }}</p>
            <br/>
            <p>元画像のタイルマップを表示：</p>
            <v-img src="/img/making/sprite-objects-001.png" style="width:128px; height:128px; border: dashed 4px gray;"/><br/>
            <v-img src="/img/making/202508__warabenture__16--2357-8counts-red.png" style="width:128px; height:64px; border: dashed 4px gray;"/><br/>
            ：ここまで。
        -->
    </section>
    
    <br/>
    <h3>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    console.log("シューティングスター　（初級者向けソースコード版）")

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, reactive, ref, watch } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    // from の階層が上の順、アルファベット順
    import SourceLink from '../../components/SourceLink.vue';
    import StopwatchDev from '../../components/StopwatchDev.vue';
    import Tile from '../../components/Tile.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //

    const commonSeconds = 60; // 1秒は60フレーム
    const commonSpriteMotionLeft = -1;  // モーション（motion）定数。カメラのファインダーが左に移動する
    const commonSpriteMotionRight = 1;
    const commonSpriteMotionUp = -1;
    const commonSpriteMotionDown = 1;


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appManualIsShowing = ref<boolean>(false);     // ゲームの操作方法・遊び方説明書を表示中
    const appGameScore = ref<number>(0);                // 得点
    const appGameIsPlaying = ref<boolean>(false);       // ゲーム中
    const appGameIsPause = ref<boolean>(false);         // ゲームは一時停止中
    const appGameStartButtonText = ref<string>("読込中...");    // ［ゲームスタート］または［ゲーム終了］ボタンのラベル
    const appGamePauseButtonText = ref<string>("読込中...");    // ［一時停止］または［再開］ボタンのラベル
    const appGameMaxCount = computed(()=>60 * commonSeconds);   // ゲーム時間は１分
    const appGameScheduleStep = ref<number>(0);         // 星の出現スケジュール


    // ################
    // # 読込リソース #
    // ################

    // ++++++++++++++++++++++++++++
    // + 読込リソース　＞　効果音 +
    // ++++++++++++++++++++++++++++

    const sfxConfigVolume = 0.3;                        // 音量

    let sfxDeniedAudio: HTMLAudioElement;               // 拒否音
    const sfxDeniedIsPlaying = ref<boolean>(false);     // 拒否音の再生状態
    let sfxCameraShutterAudio: HTMLAudioElement;        // カメラで撮影したときの効果音
    const sfxCameraShutterIsPlaying = ref<boolean>(false);  //
    let sfxMissAudio: HTMLAudioElement;                 // ミス音
    const sfxMissIsPlaying = ref<boolean>(false);       //

    /**
     * 効果音をロードする（jsfxrで作った効果音）
     */
    function sfxLoad() : void {
        sfxDeniedAudio = new Audio('/wav/202508__sfx__17--0200-denied.wav'); // 拒否音
        sfxDeniedAudio.volume = sfxConfigVolume;
        sfxDeniedAudio.addEventListener('play', () => { sfxDeniedIsPlaying.value = true })
        sfxDeniedAudio.addEventListener('pause', () => { sfxDeniedIsPlaying.value = false })
        sfxDeniedAudio.addEventListener('ended', () => { sfxDeniedIsPlaying.value = false })

        sfxCameraShutterAudio = new Audio('/wav/202508__sfx__16--2117-cameraShutter.wav'); // カメラのシャッター音
        sfxCameraShutterAudio.volume = sfxConfigVolume;
        sfxCameraShutterAudio.addEventListener('play', () => { sfxCameraShutterIsPlaying.value = true })
        sfxCameraShutterAudio.addEventListener('pause', () => { sfxCameraShutterIsPlaying.value = false })
        sfxCameraShutterAudio.addEventListener('ended', () => { sfxCameraShutterIsPlaying.value = false })

        sfxMissAudio = new Audio('/wav/202508__sfx__16--2146-miss.wav'); // ミス音
        sfxMissAudio.volume = sfxConfigVolume;
        sfxMissAudio.addEventListener('play', () => { sfxMissIsPlaying.value = true })
        sfxMissAudio.addEventListener('pause', () => { sfxMissIsPlaying.value = false })
        sfxMissAudio.addEventListener('ended', () => { sfxMissIsPlaying.value = false })
    }


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ストップウォッチ +
    // ++++++++++++++++++++++++++++++++++++++

    const stopwatch1CompoRef = ref<InstanceType<typeof StopwatchDev> | null>(null); // StopwatchDevのインスタンス
    const stopwatch1Count = ref<number>(0);   // カウントの初期値
    watch(stopwatch1Count, (newCount) => {
        // カウントが変わったら、何か処理をしたい。

        // --------------------------------------------------------
        // - オブジェクト　＞　ストップウォッチ　＞　スケジュール -
        // --------------------------------------------------------

        switch (appGameScheduleStep.value) {
            case 0:
                // ゲーム開始から1秒後、星表示
                if (newCount >= 1 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 5;
                    star1.startRows = 3;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;                    
                }
                break;
            case 1:
                // ゲーム開始から3秒後、星非表示
                if (newCount >= 3 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 2:
                // ゲーム開始から4秒後、星表示
                if (newCount >= 4 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 9;
                    star1.startRows = 9;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 3:
                // ゲーム開始から6秒後、星非表示
                if (newCount >= 6 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 4:
                // ゲーム開始から8秒後、星表示
                if (newCount >= 8 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 0;
                    star1.startRows = 8;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 5:
                // ゲーム開始から10秒後、星非表示
                if (newCount >= 10 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 6:
                // ゲーム開始から14秒後、星表示
                if (newCount >= 14 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 12;
                    star1.startRows = 5;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 7:
                // ゲーム開始から15秒後、星非表示
                if (newCount >= 15 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 8:
                // ゲーム開始から19秒後、星表示
                if (newCount >= 19 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 3;
                    star1.startRows = 3;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 9:
                // ゲーム開始から21秒後、星非表示
                if (newCount >= 21 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 10:
                // ゲーム開始から27秒後、星表示
                if (newCount >= 27 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 6;
                    star1.startRows = 11;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 11:
                // ゲーム開始から29秒後、星非表示
                if (newCount >= 29 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 12:
                // ゲーム開始から33秒後、星表示
                if (newCount >= 33 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 4;
                    star1.startRows = 6;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 13:
                // ゲーム開始から36秒後、星非表示
                if (newCount >= 36 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 14:
                // ゲーム開始から39秒後、星表示
                if (newCount >= 39 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 5;
                    star1.startRows = 0;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 15:
                // ゲーム開始から41秒後、星非表示
                if (newCount >= 41 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 16:
                // ゲーム開始から45秒後、星表示
                if (newCount >= 45 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 6;
                    star1.startRows = 7;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 17:
                // ゲーム開始から48秒後、星非表示
                if (newCount >= 48 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 18:
                // ゲーム開始から51秒後、星表示
                if (newCount >= 51 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 7;
                    star1.startRows = 3;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 19:
                // ゲーム開始から54秒後、星非表示
                if (newCount >= 54 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 20:
                // ゲーム開始から57秒後、星表示
                if (newCount >= 57 * commonSeconds) {
                    star1.startCount = newCount;
                    star1.startCols = 8;
                    star1.startRows = 9;
                    star1.visibility = 'visible';
                    appGameScheduleStep.value += 1;
                }
                break;
            case 21:
                // ゲーム開始から60秒後、星非表示
                if (newCount >= 59 * commonSeconds) {
                    star1.visibility = 'hidden';
                    appGameScheduleStep.value += 1;
                }
                break;
        }

        if (newCount >= appGameMaxCount.value) {
            // ゲーム停止
            stopwatch1CompoRef.value?.stopTimer();  // タイマーをストップ
        }
    });

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　盤 +
    // ++++++++++++++++++++++++

    const board1 = reactive({
        cellWidth: 32,
        cellHeight: 32,
        cols: 16,
        rows: 12,
    });
    const board1Area = computed(()=>{   // 盤のセル数
        return board1.cols * board1.rows;
    });

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　星 +
    // ++++++++++++++++++++++++

    const star1 = reactive({
        startCols : 0,  // 出現位置
        startRows : 0,
        startCount : 0,
        visibility: 'hidden' as 'hidden' | 'visible',
    });
    const star1Cols = computed(()=>{
        return star1.startCols + Math.floor((stopwatch1Count.value - star1.startCount) / 20);
    });
    const star1Rows = computed(()=>{
        return star1.startRows;
    });
    const starStyle = computed(() => ({
        visibility: star1.visibility,
        top: `${star1Rows.value * board1.cellHeight}px`,
        left: `${star1Cols.value * board1.cellWidth}px`,
        width: `${board1.cellWidth}px`,
        height: `${board1.cellHeight}px`,
    }));

    // ++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　カメラのファインダー +
    // ++++++++++++++++++++++++++++++++++++++++++
    //
    // 点線の枠
    //

    const finder1 = reactive({
        left: 6 * board1.cellWidth,    // スプライトのX座標
        top: 4 * board1.cellHeight,    // スプライトのY座標
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
    const finderStyle = computed(() => ({
        top: `${finder1.top}px`,
        left: `${finder1.left}px`,
        width: `${finder1.colNum * board1.cellWidth}px`,
        height: `${finder1.rowNum * board1.cellHeight}px`,
        border: `dashed 4px ${finder1.reloadTime > 0 ? '#d85050' : '#f0f0f0'}`, // リロード中は赤い枠
    }));

    // ++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　リロード・パイ +
    // ++++++++++++++++++++++++++++++++++++
    //
    // 写真を撮った時にカメラのファインダーの中心で回ってるやつ。
    //

    const reloadPie1Frames = <Record<number, {top: number, left: number}>>{
        0: {top: 0 * board1.cellHeight, left: 0 * board1.cellWidth},
        1: {top: 0 * board1.cellHeight, left: 1 * board1.cellWidth},
        2: {top: 0 * board1.cellHeight, left: 2 * board1.cellWidth},
        3: {top: 0 * board1.cellHeight, left: 3 * board1.cellWidth},
        4: {top: 1 * board1.cellHeight, left: 0 * board1.cellWidth},
        5: {top: 1 * board1.cellHeight, left: 1 * board1.cellWidth},
        6: {top: 1 * board1.cellHeight, left: 2 * board1.cellWidth},
        7: {top: 1 * board1.cellHeight, left: 3 * board1.cellWidth},
    };
    const reloadPie1Weight = 3 * commonSeconds;
    const reloadPie1Index = computed<number>(()=>{
        // タイル１枚当たりの時間（フレーム）
        const frameNum = Object.keys(reloadPie1Frames).length;
        const unitTime = reloadPie1Weight / frameNum;
        let index = Math.floor(finder1.reloadTime / unitTime);
        if (index >= frameNum) {
            index = frameNum - 1;
        }
        return (frameNum - 1) - index;    // カウントダウン
    });
    const reloadPie1TileLeft = computed<number>(()=>{
        return reloadPie1Frames[reloadPie1Index.value].left;
    });
    const reloadPie1TileTop = computed<number>(()=>{
        return reloadPie1Frames[reloadPie1Index.value].top;
    });
    const reloadPieStyle = computed(() => ({
        visibility: finder1.reloadTime > 0 ? 'visible' : 'hidden',
        top: `${finder1.top + finder1.rowNum * board1.cellHeight / 2 - board1.cellHeight / 2}px`,
        left: `${finder1.left + finder1.colNum * board1.cellWidth / 2 - board1.cellWidth / 2}px`,
    }));


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        sfxLoad();
        gameInit();
        gameLoopStart();

        // キーボード操作の設定
        //
        //      window はブラウザーのオブジェクトなので、マウント後にアクセスします。
        //
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // 上下キーの場合
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                e.preventDefault();
            }

            if (finder1.input.hasOwnProperty(e.key)) {
                finder1.input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (finder1.input.hasOwnProperty(e.key)) {
                finder1.input[e.key] = false;
            }
        });
    });


    // ################
    // # サブルーチン #
    // ################

    /**
     * ［ゲームスタート］または［ゲーム終了］ボタン押下時。（状態により切り替わります）
     */
    function onGameStartOrEndButtonPushed() : void {
        document.getElementById("dammyButton")?.focus();    // フォーカスを外すため

        if(appGameIsPlaying.value) {
            // ゲームを終了させます
            gameInit();
            return;
        }

        stopwatch1CompoRef.value?.startTimer();  // タイマーをスタート

        appGameStartButtonText.value = "ゲーム終了"; // ボタンのテキストを更新
        appGameIsPlaying.value = !appGameIsPlaying.value;
    }


    /**
     * ［一時停止］または［再開］ボタン押下時。（状態により切り替わります）
     */
    function onGamePauseOrRestartButtonPushed() : void {
        document.getElementById("dammyButton")?.focus();    // フォーカスを外すため

        if(appGameIsPause.value) {
            stopwatch1CompoRef.value?.startTimer();  // タイマーをスタート
            appGamePauseButtonText.value = "一時停止"; // ボタンのテキストを更新
        } else {
            stopwatch1CompoRef.value?.stopTimer();  // タイマーをストップ
            appGamePauseButtonText.value = "再開"; // ボタンのテキストを更新
        }

        appGameIsPause.value = !appGameIsPause.value;
    }


    /**
     * ゲームの初期化
     */
    function gameInit() : void {
        stopwatch1CompoRef.value?.resetTimer();  // タイマーをリセット

        appGameScore.value = 0;
        appGameIsPlaying.value = false;
        appGameStartButtonText.value = "ゲームスタート"; // ボタンのテキストを更新
        appGameIsPause.value = false;
        appGamePauseButtonText.value = "一時停止"; // ボタンのテキストを更新
        appGameScheduleStep.value = 0;

        star1.visibility = 'hidden';
    }


    /**
     * ゲームのメインループ開始
     */
    function gameLoopStart() : void {
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
                    cameraShot();   // 撮影
                }

                if (finder1.input.ArrowLeft) {
                    finder1.motion["xAxis"] = commonSpriteMotionLeft; // 左
                }

                if (finder1.input.ArrowRight) {
                    finder1.motion["xAxis"] = commonSpriteMotionRight;  // 右
                }

                if (finder1.input.ArrowUp) {
                    finder1.motion["yAxis"] = commonSpriteMotionUp;   // 上
                }

                if (finder1.input.ArrowDown) {
                    finder1.motion["yAxis"] = commonSpriteMotionDown;   // 下
                }

                if (finder1.motion["xAxis"]!=0 || finder1.motion["yAxis"]!=0) {
                    finder1.motionWait = 8;    // フレーム数を設定
                }
            }

            // 移動処理
            // 斜め方向の場合、上下を優先する。
            if (finder1.motion["xAxis"]==1) {   // 右
                if (finder1.left < (board1.cols - finder1.colNum) * board1.cellWidth) {    // 境界チェック
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
                if (finder1.top < (board1.rows - finder1.rowNum) * board1.cellHeight) {    // 境界チェック
                    finder1.top += finder1.speed;
                }
            }

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }


    /**
     * カメラショット処理
     */
    function cameraShot() : void {

        if (finder1.reloadTime > 0) {
            // リロード中
            if (!sfxDeniedIsPlaying.value) {
                // ブザー音が停止中なら鳴らす
                sfxDeniedAudio.play();
            }

            // リロード中は何も起こりません。
            return;
        }

        // ファインダーの位置とサイズ
        const finderLeftCols = finder1.left / board1.cellWidth;
        const finderTopCols = finder1.top / board1.cellHeight;
        const finderRightEndCols = finderLeftCols + finder1.colNum;
        const finderBottomEndCols = finderTopCols + finder1.rowNum;

        // ファインダーの枠内に星を含むか？
        if (
            finderLeftCols <= star1Cols.value && star1Cols.value <= finderRightEndCols &&
            finderTopCols <= star1Rows.value && star1Rows.value <= finderBottomEndCols) {
            // 星を含んだ。
            niceShot();

        // 星を含まない
        } else {
            if (!sfxMissIsPlaying.value) {
                // ミス音が停止中なら鳴らす
                sfxMissAudio.play();
            }
        }

        finder1.reloadTime = reloadPie1Weight;  // リロード時間を設定
    }


    /**
     * カメラのファインダーの中に星を収めて撮ったとき。
     */
    function niceShot() : void {
        if (!sfxCameraShutterIsPlaying.value) {
            // カメラのシャッター音が停止中なら鳴らす
            sfxCameraShutterAudio.play();
        }

        appGameScore.value += 100;
    }

</script>

<style scoped>
    div.finder {
        position: relative; border:dashed 4px #f0f0f0;
    }
</style>
