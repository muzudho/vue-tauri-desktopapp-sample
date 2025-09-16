<!--
    RPGのキャラクターの歩行グラフィック・サンプル。背景画像付き
-->

<template>

    <!-- 機能 -->
    <button-20250822 ref="button1Ref"/>

    <compatible-device ref="compatibleDevice1Ref"/>

    <!-- ゲームマシン -->         
    <game-machine-waratch2
        :hardPositionStyle="gameHard1PositionStyle"
        v-on:onLeftButtonPressed="onLeftButtonPressed"
        v-on:onLeftButtonReleased="onLeftButtonReleased"
        v-on:onUpButtonPressed="onUpButtonPressed"
        v-on:onUpButtonReleased="onUpButtonReleased"
        v-on:onRightButtonPressed="onRightButtonPressed"
        v-on:onRightButtonReleased="onRightButtonReleased"
        v-on:onDownButtonPressed="onDownButtonPressed"
        v-on:onDownButtonReleased="onDownButtonReleased"
        v-on:onSpaceButtonPressed="onSpaceButtonPressed"
        v-on:onSpaceButtonReleased="onSpaceButtonReleased"
    />

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。
    import type { Ref } from 'vue';

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    import type { CompatibleStyleValue }  from '../../../../compatibles/compatible-style-value';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // アルファベット順
    import Button20250822 from '@/components/Button20250822.vue';
    import CompatibleDevice from '@/components/CompatibleDevice.vue'
    import GameMachineWaratch2 from '@/components/GameMachineWaratch2.vue';
    import OutOfSightMaking from '@/components/OutOfSightMaking.vue';
    import Stopwatch from '@/components/Stopwatch.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    import {
        getPlayer1File, getPlayer1Rank,
        isPlayerInputKey,
        playerMotionClearIfCountZero, playerImageAndPositionAndWaitUpdate, playerMotionCountDown, playerMotionUpdateByInputWithWrapAround,
    } from '../../../../composables/player-controller';
    import {
        checkOutOfSightBottomIsLook, checkOutOfSightLeftIsLook, checkOutOfSightRightIsLook, checkOutOfSightTopIsLook, printingImageAndPositionAndWaitUpdate, printingMotionClearIfCountZero, printingInputCreate, printingMotionCountDown, printingMotionCreate, printingMotionUpdateByInputWithWrapAround,
    } from '../../../../composables/printing-controller'
    import type { PlayerInput, PlayerMotion } from '../../../../composables/player-controller';
    import type { PrintingInput, PrintingMotion } from '../../../../composables/printing-controller';

    // +++++++++++++++++++++++++++++++++++
    // + インポート ＞　インターフェース +
    // +++++++++++++++++++++++++++++++++++

    import type Rectangle from '../../../../interfaces/Rectangle';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    

    const controllerSquareUnit: number = 40;


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appZoom = ref<number>(2);   // ズーム


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　装置の互換性 +
    // ++++++++++++++++++++++++++++++++++

    const compatibleDevice1Ref = ref<InstanceType<typeof CompatibleDevice> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン拡張 +
    // ++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ストップウォッチ１ +
    // ++++++++++++++++++++++++++++++++++++++++

    const stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　視界の外１ +
    // ++++++++++++++++++++++++++++++++

    const outOfSight1Ref = ref<InstanceType<typeof OutOfSightMaking> | null>(null);
    const outOfSight1WithMaskSquareCount = computed({
        get: () => outOfSight1Ref.value?.outOfSight1WithMaskSquareCount ?? 0, // nullの場合はデフォルト値（例: 0）
        set: (value) => {
            if (outOfSight1Ref.value) {
                outOfSight1Ref.value.outOfSight1WithMaskSquareCount = value; // appleを更新
            }
        }
    });
    const oneForMask = 1;   // マスクが１マス分食み出ていることを示す定数。

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　タイル盤１ +
    // ++++++++++++++++++++++++++++++++

    const tileBoard1TileWidth = 32;
    const tileBoard1TileHeight = 32;
    const board1FileNum = ref<number>(5);   // 筋の数。ただし、右側と下側に１マス余分に付いているマスクは含まない。
    const board1RankNum = ref<number>(5);   // 段の数
    // ※　盤およびその各タイルは、決まりきった位置でラップアラウンドを繰り返すだけです。座標が大きく移動することはありません。
    const board1WithMaskSizeSquare = ref<number>(1);    // マスクの幅（単位：マス）
    const board1FloorTilemapTileNum = 5;  // 床のタイルマップの、左上隅から数えたタイル数

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　像盤１ +
    // ++++++++++++++++++++++++**++
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    const printing1OutOfSightIsLock = ref<boolean>(false);   // ［画面外隠し］を管理（true: ロックする, false: ロックしない）
    watch(printing1OutOfSightIsLock, (newValue: boolean)=>{
        player1CanBoardEdgeWalkingIsEnabled.value = newValue;
    });
    const printing1FileMax = 10;    // 印字の最大サイズは、盤のサイズより大きいです。
    const printing1RankMax = 10;
    const printing1AreaMax = printing1FileMax * printing1RankMax;
    const printing1FileNum = ref<number>(printing1FileMax);   // 列数
    const printing1RankNum = ref<number>(printing1RankMax);   // 行数
    // のちのち自機を１ドットずつ動かすことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const printing1Left = ref<number>(0);
    const printing1Top = ref<number>(0);
    const imageBoard1Data = ref<number[]>([]);   // ソース・タイルのインデックスが入っている盤
    // ランダムなマップデータを生成
    for (let i=0; i<printing1AreaMax; i++) {    // 最初から最大サイズで用意します。
        // 左上のタイルは画面外の黒なので、それを避けて設定。
        const sourceTileIndex = Math.floor(Math.random() * (board1FloorTilemapTileNum - 1)) + 1;
        imageBoard1Data.value.push(sourceTileIndex);
    }
    const printing1Input : PrintingInput = printingInputCreate();
    const printing1Motion = ref<PrintingMotion>(printingMotionCreate());
    const printing1MotionSpeed = ref<number>(2);  // 移動速度（単位：ピクセル）
    const printing1MotionWait = ref<number>(0);   // 排他的モーション時間。
    const printing1MotionWalkingFrames = 16;       // 歩行フレーム数
    const sourceTilemapRectangles : Rectangle[] = [];
    for (let i = 0; i < printing1AreaMax; i++) {   // 最大サイズで作っておく。
        const files = i % board1FileNum.value;
        const ranks = Math.floor(i / board1FileNum.value);
        sourceTilemapRectangles.push({ top: ranks * tileBoard1TileHeight, left: files * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight });
    }

    // ++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機のホーム１ +
    // ++++++++++++++++++++++++++++++++++++
    //
    // このサンプルでは、ピンク色に着色しているマスです。
    // ［自機１］に紐づくホームというわけではなく、［自機のホーム］の１つです。
    //

    const playerHome1Length = 1;    // ホームポジションが１マス分の大きさであることを示す定数。
    const playerHome1File = ref<number>(2); // ホーム
    const playerHome1Rank = ref<number>(2);
    const playerHome1Left = computed(()=>{
        return playerHome1File.value * tileBoard1TileWidth;
    });
    const playerHome1Top = computed(()=>{
        return playerHome1Rank.value * tileBoard1TileHeight;
    });

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++

    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const player1Left = ref<number>(playerHome1Left.value);    // スプライトの位置
    const player1Top = ref<number>(playerHome1Top.value);
    const player1Input = {  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    } as PlayerInput;
    const player1SourceFrames = {   // キャラクターの向きと、歩行タイルの指定
        left:[  // 左向き
            {top:  3 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  3 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  3 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  3 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
        ],
        up:[    // 上向き
            {top:  0 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  0 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  0 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  0 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
        ],
        right:[ // 右向き
            {top:  1 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  1 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  1 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  1 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
        ],
        down:[  // 下向き
            {top:  2 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  2 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  2 * tileBoard1TileHeight, left: 0 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
            {top:  2 * tileBoard1TileHeight, left: 1 * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight },
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

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　画面中段１ +
    // ++++++++++++++++++++++++++++++++

    const gameHard1PositionStyle = computed<CompatibleStyleValue>(()=>{
        // マスク込みのゲーム画面サイズは、次の３つの最大のものより小さくはなりません。
        //
        // （１）見えていないところを含む盤サイズ＋マスクの１
        // （２）マスク幅×２＋ホームの１
        // （３）ホームの位置
        const minWidthPixels = Math.max(
            appZoom.value * (board1FileNum.value + oneForMask) * tileBoard1TileWidth,
            appZoom.value * (outOfSight1WithMaskSquareCount.value + playerHome1Length) * tileBoard1TileWidth,
            appZoom.value * (playerHome1File.value + 1) * tileBoard1TileWidth,
        );
        const minHeightPixels = Math.max(
            appZoom.value * (board1RankNum.value + oneForMask) * tileBoard1TileHeight,
            appZoom.value * (outOfSight1WithMaskSquareCount.value + playerHome1Length) * tileBoard1TileHeight,
            appZoom.value * (playerHome1Rank.value + 1) * tileBoard1TileHeight,
        );
        let boardWidthPixelsWithMask = appZoom.value * (board1FileNum.value + oneForMask) * tileBoard1TileWidth;
        let boardHeightPixelsWithMask = appZoom.value * (board1RankNum.value + oneForMask) * tileBoard1TileHeight;
        if (boardWidthPixelsWithMask < minWidthPixels) {
            boardWidthPixelsWithMask = minWidthPixels;
        }
        if (boardHeightPixelsWithMask < minHeightPixels) {
            boardHeightPixelsWithMask = minHeightPixels;
        }

        return {
            top: `calc(
                100vh - ${4 * controllerSquareUnit}px -
                ${boardHeightPixelsWithMask}px
            )`,
            bottom: `calc(${5 * controllerSquareUnit}px)`,
            marginLeft: `calc(50vw - ${boardWidthPixelsWithMask / 2}px)`,
            marginRight: `calc(50vw + ${boardWidthPixelsWithMask / 2}px)`,
            /* backgroundColor: `rgba(0,0,0,0.1)`, */
        } as CompatibleStyleValue;
    });


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // キーボード操作の設定
        //
        //      window はブラウザーのオブジェクトなので、（サーバー側ではプリレンダリングできないので）マウント後にアクセスします。
        //
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // ［↑］［↓］キーの場合
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                e.preventDefault();
            }

            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = true; // 型チェック済み（文字列→キー名）
                printing1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = false;    // 型チェック済み（文字列→キー名）
                printing1Input[e.key] = false;
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
                tileBoard1TileWidth,
                tileBoard1TileHeight,
                board1FileNum.value,
                board1RankNum.value,
                outOfSight1WithMaskSquareCount.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1Left.value,
                printing1Top.value,
                printing1Input,
                printing1Motion,
                printing1MotionWait.value,
                ()=>{ return getPlayer1File(player1Left.value, tileBoard1TileWidth) > playerHome1File.value; },   // 自機がホーム・ポジションより右に居る
                ()=>{ return getPlayer1File(player1Left.value, tileBoard1TileWidth) < playerHome1File.value; },   // 自機がホーム・ポジションより左に居る
                ()=>{ return getPlayer1Rank(player1Top.value, tileBoard1TileHeight) > playerHome1Rank.value; },   // 自機がホーム・ポジションより下に居る
                ()=>{ return getPlayer1Rank(player1Top.value, tileBoard1TileHeight) < playerHome1Rank.value; },   // 自機がホーム・ポジションより上に居る
            );
            playerMotionUpdateByInputWithWrapAround(
                printing1OutOfSightIsLock.value,
                tileBoard1TileWidth,
                tileBoard1TileHeight,
                board1FileNum.value,
                board1RankNum.value,
                outOfSight1Ref.value?.outOfSight1WithMaskSquareCount ?? 1,
                playerHome1File.value,
                playerHome1Rank.value,
                player1Left.value,
                player1Top.value,
                player1Input,
                player1Motion,
                player1MotionWait.value,
                player1CanBoardEdgeWalking.value,
                ()=>{ return checkOutOfSightLeftIsLook(tileBoard1TileWidth, board1WithMaskSizeSquare.value, printing1Left.value); },  // ここで進むと、左側に外側が見えるなら。
                ()=>{ return checkOutOfSightRightIsLook(tileBoard1TileWidth, board1WithMaskSizeSquare.value, board1FileNum.value, printing1FileNum.value, printing1Left.value); },    // ここで進むと、右側に外側が見えるなら。
                ()=>{ return checkOutOfSightTopIsLook(tileBoard1TileHeight, board1WithMaskSizeSquare.value, printing1Top.value); },    // ここで進むと、上側に外側が見えるなら。
                ()=>{ return checkOutOfSightBottomIsLook(tileBoard1TileHeight, board1WithMaskSizeSquare.value, board1RankNum.value, printing1RankNum.value, printing1Top.value); },   // ここで進むと、下側に外側が見えるなら。
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


    /**
     * 左。
     */
    function onLeftButtonPressed() : void {
        player1Input.ArrowLeft = true;
        printing1Input.ArrowLeft = true;
    }


    function onLeftButtonReleased() : void {
        player1Input.ArrowLeft = false;
        printing1Input.ArrowLeft = false;
    }


    /**
     * 上。
     */
    function onUpButtonPressed() : void {
        player1Input.ArrowUp = true;
        printing1Input.ArrowUp = true;
    }


    function onUpButtonReleased() : void {
        player1Input.ArrowUp = false;
        printing1Input.ArrowUp = false;
    }


    /**
     * 右。
     */
    function onRightButtonPressed() : void {
        player1Input.ArrowRight = true;
        printing1Input.ArrowRight = true;
    }


    function onRightButtonReleased() : void {
        player1Input.ArrowRight = false;
        printing1Input.ArrowRight = false;
    }


    /**
     * 下。
     */
    function onDownButtonPressed() : void {
        player1Input.ArrowDown = true;
        printing1Input.ArrowDown = true;
    }


    function onDownButtonReleased() : void {
        player1Input.ArrowDown = false;
        printing1Input.ArrowDown = false;
    }


    /**
     * スペース・キー。
     */
    function onSpaceButtonPressed() : void {
        player1Input[" "] = true;
        printing1Input[" "] = true;
    }


    function onSpaceButtonReleased() : void {
        player1Input[" "] = false;
        printing1Input[" "] = false;
    }

</script>

<style scoped>

    @import '@/styles/talk-scene.css';
    @import '@/styles/perspective.css';
    @import '@/styles/game-machine-waratch2.css';

    div.board { /* 盤１ */
        position: relative;
    }
    div.square {    /* マス */
        position: absolute;
        image-rendering: pixelated;
    }
    span.board-slidable-tile-index {  /* マスの物自体に付いている番号。その場所は、ラップアラウンドしてすり替わることがある。 */
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 6px;
    }
    span.board-fixed-square-index { /* マスの画面上の見た目の位置に付いている番号 */
        position: absolute;
        top: 6px;
        width: 100%;
        text-align: center;
        font-size: 6px;
    }
    span.board-printing-index {
        position: absolute;
        top: 12px;
        width: 100%;
        text-align: center;
        font-size: 6px;
    }
    span.board-square-printing-string {   /* マスの印字 */
        position: absolute;
        top: 16px;
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
    div.playerHome {    /* 自機のホーム１ */
        position: absolute;
        border: dashed 4px lightpink;
        z-index: 10;
    }
    div.player {    /* 自機１ */
        position: absolute;
        image-rendering: pixelated;
        z-index: 20;
    }
</style>
