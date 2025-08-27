<template>
    <the-header/>

    <h3>王の間のタイルを市松模様にしようぜ！</h3>
    <section class="sec-3">
        <p>作成中だぜ（＾▽＾）！</p>
        <br/>

        <!-- ストップウォッチ。デバッグに使いたいときは、 display: none; を消してください。 -->
        <stopwatch
            ref="stopwatch1Ref"
            v-on:countUp="(countNum) => { stopwatch1Count = countNum; }"
            style="display: none;" />

        <!-- 盤領域 -->
        <div
            class="board"
            >
            <!--
            :style="board1Style"
            -->

            <!-- 自機１ -->
            <tile-animation
                :frames="player1Frames"
                tilemapUrl="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
                :slow="player1AnimationSlow"
                :time="stopwatch1Count"
                class="player"
                :style="player1Style" />
        </div>
    </section>


    <br/>
    <h3>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。
    import type { Ref } from 'vue';

    import { VBtn } from 'vuetify/components';

    // ++++++++++++++
    // + 互換性対応 +
    // ++++++++++++++

    import type { CompatibleStyleValue }  from '../../compatibles/compatible-style-value';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // from の階層が上の順、アルファベット順
    import Button20250822 from '../../components/Button20250822.vue';
    import OutOfSightMaking from '../../components/OutOfSightMaking.vue';
    import PrintingMaking from '../../components/PrintingMaking.vue';
    import SourceLink from '../../components/SourceLink.vue';
    import Stopwatch from '../../components/Stopwatch.vue';
    import Tile from '../../components/Tile.vue';
    import TileAnimation from '../../components/TileAnimation.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getFileAndRankFromIndex, getFixedSquareIndexFromTileIndex, getPrintingIndexFromFixedSquareIndex, wrapAround } from '../../composables/board-operation';
    import {
        isPlayerInputKey,
        playerMotionClearIfCountZero, playerImageAndPositionAndWaitUpdate, playerMotionCountDown, playerMotionUpdateByInputWithWrapAround,
        printingInputCreate, printingMotionClearIfCountZero, printingMotionCreate, printingImageAndPositionAndWaitUpdate, printingMotionCountDown, printingMotionUpdateByInputWithWrapAround,
    } from '../../composables/player-controller';
    import type { PrintingInput, PrintingMotion, PlayerInput, PlayerMotion } from '../../composables/player-controller';

    // ********************
    // * インターフェース *
    // ********************

    import type Rectangle from '../../interfaces/Rectangle';


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    // const appDebugInfoIsShowing = ref<boolean>(false);  // デバッグ情報を表示中
    // const appConfigIsShowing = ref<boolean>(false);    // 設定を表示中
    const appZoom = ref<number>(4);    // ズーム


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ストップウォッチ +
    // ++++++++++++++++++++++++++++++++++++++

    const stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null);
    const stopwatch1Count = ref<number>(0);   // カウントの初期値

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　視界の外１ +
    // ++++++++++++++++++++++++++++++++

    const outOfSight1Ref = ref<InstanceType<typeof OutOfSightMaking> | null>(null);
    const outOfSight1WithMaskSizeSquare = computed({
        get: () => outOfSight1Ref.value?.outOfSight1WithMaskSizeSquare ?? 0, // nullの場合はデフォルト値（例: 0）
        set: (value) => {
            if (outOfSight1Ref.value) {
                outOfSight1Ref.value.outOfSight1WithMaskSizeSquare = value; // appleを更新
            }
        }
    });

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　盤 +
    // ++++++++++++++++++++++++

    const board1SquareWidth = 32;
    const board1SquareHeight = 32;
    const board1FileMax = 6;
    const board1RankMax = 6;
    const board1FileNum = ref<number>(5);   // 筋の数。ただし、右側と下側に１マス余分に付いているマスクは含まない。
    const board1RankNum = ref<number>(5);   // 段の数
    const board1Area = computed(()=> {  // 盤のマス数
        return board1FileNum.value * board1RankNum.value;
    });
    // ※　盤およびその各タイルは、決まりきった位置でオーバーラッピングを繰り返すだけです。座標が大きく移動することはありません。

    const board1Style = computed<CompatibleStyleValue>(()=>{    // ボードとマスクを含んでいる領域のスタイル
        return {
            width: `${(board1FileNum.value + outOfSight1WithMaskSizeSquare.value) * board1SquareWidth}px`,
            height: `${(board1RankNum.value + outOfSight1WithMaskSizeSquare.value) * board1SquareHeight}px`,
            zoom: appZoom.value,
        };
    });
    const getSquareStyleFromTileIndex = computed<
        (tileIndex:number)=>CompatibleStyleValue
    >(() => {
        return (tileIndex:number)=>{
            // if (!Number.isInteger(tileIndex)) { throw new Error(`Assertion failed: "tileIndex" must be an integer, got ${tileIndex}`); }

            // プレイヤーが初期位置にいる場合の、マスの位置。
            const [tileFile, tileRank] = getFileAndRankFromIndex(tileIndex, board1FileNum.value);
            const homeLeft = tileFile * board1SquareWidth;
            const homeTop = tileRank * board1SquareHeight;

            const [offsetLeftLoop, offsetTopLoop] = wrapAround(
                homeLeft,
                homeTop,
                printing1Left.value,
                printing1Top.value,
                board1FileNum.value * board1SquareWidth,
                board1RankNum.value * board1SquareHeight,
            );

            return {
                left: `${homeLeft + offsetLeftLoop}px`,
                top: `${homeTop + offsetTopLoop}px`,
                width: `${board1SquareWidth}px`,
                height: `${board1SquareHeight}px`,
            };
        };
    });
    const board1FloorTilemapTileNum = 5;  // 床のタイルマップの、左上隅から数えたタイル数
    interface SourceTile {
        left: number,
        top: number,
        width: number,
        height: number,
    }

    // ++++++++++++++++++++++++++
    // + オブジェクト　＞　印字 +
    // ++++++++++++++++++++++++**
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    const printing1Ref = ref<InstanceType<typeof PrintingMaking> | null>(null);
    // const outOfSight1WithMaskSizeSquare = computed({
    //     get: () => outOfSight1Ref.value?.outOfSight1WithMaskSizeSquare ?? 0, // nullの場合はデフォルト値（例: 0）
    //     set: (value) => {
    //         if (outOfSight1Ref.value) {
    //             outOfSight1Ref.value.outOfSight1WithMaskSizeSquare = value; // appleを更新
    //         }
    //     }
    // });
    const printing1OutOfSightIsLock = ref<boolean>(false);   // ［画面外隠し］を管理（true: ロックする, false: ロックしない）
    watch(printing1OutOfSightIsLock, (newValue: boolean)=>{
        player1CanBoardEdgeWalkingIsEnabled.value = newValue;
    });
    const printing1IsLooping = ref<boolean>(true);  // ループ状態を管理（true: ループする, false: ループしない）
    const printing1FileMax = 10;    // 印字の最大サイズは、盤のサイズより大きいです。
    const printing1RankMax = 10;
    const printing1AreaMax = printing1FileMax * printing1RankMax;
    const printing1FileNum = ref<number>(printing1FileMax);   // 列数
    const printing1RankNum = ref<number>(printing1RankMax);   // 行数
    // のちのち自機を１ドットずつ動かすことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const printing1Left = ref<number>(0);
    const printing1Top = ref<number>(0);
    const printing1SourceTileIndexesBoard = ref<number[]>([]);   // ソース・タイルのインデックスが入っている盤
    // ランダムなマップデータを生成
    for (let i=0; i<printing1AreaMax; i++) {    // 最初から最大サイズで用意します。
        // 左上のタイルは画面外の黒なので、それを避けて設定。
        const sourceTileIndex = Math.floor(Math.random() * (board1FloorTilemapTileNum - 1)) + 1;
        printing1SourceTileIndexesBoard.value.push(sourceTileIndex);
    }
    const printing1Input : PrintingInput = printingInputCreate();
    const printing1Motion = ref<PrintingMotion>(printingMotionCreate());
    const printing1MotionSpeed = ref<number>(2);  // 移動速度（単位：ピクセル）
    const printing1MotionWait = ref<number>(0);   // 排他的モーション時間。
    const printing1MotionWalkingFrames = 16;       // 歩行フレーム数
    const printing1SourceTilemapCoordination : SourceTile[] = [];
    for (let i = 0; i < printing1AreaMax; i++) {   // 最大サイズで作っておく。
        const files = i % board1FileNum.value;
        const ranks = Math.floor(i / board1FileNum.value);
        printing1SourceTilemapCoordination.push({ top: ranks * board1SquareHeight, left: files * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight });
    }

    // ++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機のホーム１ +
    // ++++++++++++++++++++++++++++++++++++
    //
    // このサンプルでは、ピンク色に着色しているマスです。
    // ［自機１］に紐づくホームというわけではなく、［自機のホーム］の１つです。
    //

    const playerHome1File = ref<number>(2);    // ホーム
    const playerHome1Rank = ref<number>(2);
    const playerHome1Left = computed(()=>{
        return playerHome1File.value * board1SquareWidth;
    });
    const playerHome1Top = computed(()=>{
        return playerHome1Rank.value * board1SquareHeight;
    });
    const playerHome1Style = computed<CompatibleStyleValue>(()=>{
        return {
            left: `${playerHome1Left.value}px`,
            top: `${playerHome1Top.value}px`,
            width: `${board1SquareWidth}px`,
            height: `${board1SquareHeight}px`,
        };
    });

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++

    const player1Width = board1SquareWidth;
    const player1Height = board1SquareHeight;
    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const player1Left = ref<number>(playerHome1Left.value);    // スプライトの位置
    const player1Top = ref<number>(playerHome1Top.value);
    const player1Input = {  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    } as PlayerInput;
    const player1AnimationSlow = ref<number>(8);    // アニメーションを何倍遅くするか
    const player1Style = computed<CompatibleStyleValue>(() => ({
        left: `${player1Left.value}px`,
        top: `${player1Top.value}px`,
        width: `${player1Width}px`,
        height: `${player1Height}px`,
    }));
    const player1SourceFrames = {   // キャラクターの向きと、歩行タイルの指定
        left:[  // 左向き
            {top:  3 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
        ],
        up:[    // 上向き
            {top:  0 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  0 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  0 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  0 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
        ],
        right:[ // 右向き
            {top:  1 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  1 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  1 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  1 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
        ],
        down:[  // 下向き
            {top:  2 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  2 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  2 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  2 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
        ],
    };
    const player1Frames : Ref<Rectangle[]> = ref(player1SourceFrames["down"]);
    const player1Motion = ref<PlayerMotion>({   // モーションへの入力
        lookRight: 0,   // 向きを変える
        lookBottom: 0,
        goToHome: false,    // ホームに戻る
        goToRight: 0,   // 負なら左、正なら右へ移動する
        goToBottom: 0,  // 負なら上、正なら下へ移動する
    });
    const player1MotionSpeed = ref<number>(2);  // 移動速度（単位：ピクセル）
    const player1MotionWait = ref<number>(0);   // 排他的モーション時間。
    const player1MotionFacingFrames: number = 1;    // 振り向くフレーム数
    const player1MotionWalkingFrames: number = 16;  // 歩行フレーム数
    const player1CanBoardEdgeWalking = ref<boolean>(false); // ［盤の端の歩行］可能状態を管理（true: 可能にする, false: 可能にしない）
    const player1CanBoardEdgeWalkingIsEnabled = ref<boolean>(false);    // ［盤の端の歩行］可能状態の活性性を管理（true: 不活性にする, false: 活性にする）


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // キーボードイベント
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // ［↑］［↓］キーの場合
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                e.preventDefault();
            }

            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = true; // 型チェック済み（文字列→キー名）
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = false;    // 型チェック済み（文字列→キー名）
            }
        });

        gameLoopStart();
        stopwatch1Ref.value?.timerStart();  // タイマーをスタート
    });

    
    // ################
    // # サブルーチン #
    // ################

    /**
     * ゲームのメインループ開始
     */
    function gameLoopStart() : void {
        const update = () => {

            // ++++++++++++++++++++++++
            // + モーション・タイマー +
            // ++++++++++++++++++++++++

            printingMotionCountDown(
                printing1MotionWait,
            );
            playerMotionCountDown(
                player1MotionWait,
            );

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // + モーション・ウェイトが０のとき、モーションのクリアー +
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            printingMotionClearIfCountZero(
                printing1Motion,
                printing1MotionWait.value,
            );
            playerMotionClearIfCountZero(
                player1Motion,
                player1MotionWait.value,
            );

            // ++++++++++++++++++++++++++++++
            // + キー入力をモーションに変換 +
            // ++++++++++++++++++++++++++++++

            printingMotionUpdateByInputWithWrapAround(
                printing1OutOfSightIsLock.value,
                board1SquareWidth,
                board1SquareHeight,
                board1FileNum.value,
                board1RankNum.value,
                outOfSight1WithMaskSizeSquare.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1Left.value,
                printing1Top.value,
                printing1Input,
                printing1Motion,
                printing1MotionWait.value,
                playerHome1File.value,
                playerHome1Rank.value,
                player1Left.value,
                player1Top.value,
                player1Input,
            );
            playerMotionUpdateByInputWithWrapAround(
                printing1OutOfSightIsLock.value,
                board1SquareWidth,
                board1SquareHeight,
                board1FileNum.value,
                board1RankNum.value,
                outOfSight1Ref.value?.outOfSight1WithMaskSizeSquare ?? 1,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1Left.value,
                printing1Top.value,
                playerHome1File.value,
                playerHome1Rank.value,
                player1Left.value,
                player1Top.value,
                player1Input,
                player1Motion,
                player1MotionWait.value,
                player1CanBoardEdgeWalking.value,
            );

            // ++++++++++++++++++++++++++++++
            // + 向き・移動・ウェイトを更新 +
            // ++++++++++++++++++++++++++++++

            printingImageAndPositionAndWaitUpdate(
                printing1Left,
                printing1Top,
                printing1Motion.value,
                printing1MotionSpeed.value,
                printing1MotionWait,
                printing1MotionWalkingFrames,
            );
            playerImageAndPositionAndWaitUpdate(
                playerHome1Left.value,
                playerHome1Top.value,
                player1Left,
                player1Top,
                player1Motion.value,
                player1MotionSpeed.value,
                player1MotionWait,
                player1SourceFrames,
                player1Frames,
                player1MotionFacingFrames,
                player1MotionWalkingFrames,
            );

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }

</script>

<style scoped>
    div.board { /* 盤１ */
        position: relative;
    }
    div.player {    /* 自機１ */
        position: absolute;
        image-rendering: pixelated;
        z-index: 20;
    }
</style>
