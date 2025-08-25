<template>

    <!-- ボタン機能拡張 -->
    <button-20250822 ref="button1Ref"/>

    <h4><span class="parent-header">ＲＰＧの歩行グラフィック　＞　</span>盤の回り込みスクロール、数字柄の原始的シフト、自機の端歩き</h4>
    <section class="sec-4">
        <br/>

        <!-- ストップウォッチ。デバッグに使いたいときは、 display: none; を消してください。 -->
        <stopwatch
            ref="stopwatch1Ref"
            v-on:countUp="(countNum) => { stopwatch1Count = countNum; }"
            style="display: none;" />

        <!-- 盤領域 -->
        <div
            class="board"
            :style="board1Style">

            <!-- 自機のホーム１ -->
            <div
                class="playerHome"
                :style="playerHome1Style">
            </div>

            <!-- スクウェアのグリッド -->
            <div
                v-for="i in board1Area"
                :key="i"
                class="square"
                :style="getSquareStyleFromTileIndex(i - 1)">

                <span class="board-slidable-tile-index">tile[{{ (i - 1) }}]</span>
                <span class="board-fixed-square-index">fix[{{
                    getFixedSquareIndexFromTileIndex(
                        i - 1,
                        board1SquareWidth,
                        board1SquareHeight,
                        board1FileNum,
                        board1RankNum,
                        printing1Left,
                        printing1Top,
                    )
                }}]</span>
                <span class="board-printing-index">print[{{
                    getPrintingIndexFromFixedSquareIndex(
                        getFixedSquareIndexFromTileIndex(
                            i - 1,
                            board1SquareWidth,
                            board1SquareHeight,
                            board1FileNum,
                            board1RankNum,
                            printing1Left,
                            printing1Top,
                        ),
                        -printing1Left / board1SquareWidth,
                        -printing1Top / board1SquareHeight,
                        board1FileNum,
                        printing1FileNum,
                        printing1RankNum,
                        printing1IsLooping,
                    )
                }}]</span>
                <span class="board-square-printing-string">{{
                    getPrintingStringFromPrintingIndex(
                        getPrintingIndexFromFixedSquareIndex(
                            getFixedSquareIndexFromTileIndex(
                                i - 1,
                                board1SquareWidth,
                                board1SquareHeight,
                                board1FileNum,
                                board1RankNum,
                                printing1Left,
                                printing1Top,
                            ),
                            -printing1Left / board1SquareWidth,
                            -printing1Top / board1SquareHeight,
                            board1FileNum,
                            printing1FileNum,
                            printing1RankNum,
                            printing1IsLooping,
                        )
                    )
                }}</span>
            </div>

            <!-- 自機１ -->
            <tile-animation
                :frames="player1Frames"
                tilemapUrl="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
                :slow="player1AnimationSlow"
                :time="stopwatch1Count"
                class="player"
                :style="player1Style" />

            <!-- 視界の外１ -->
            <div
                class="out-of-sight"
                :style="outOfSight1Style">
            </div>
        </div>

        <div>
            印字x={{ printing1Left }}　｜　人x={{ player1Left }}　｜　人モーション・ウェイト={{ player1MotionWait }}<br/>
            印字y={{ printing1Top  }}　｜　人y={{ player1Top  }}<br/>
        </div>
        <br/>

        <p>
            👆 フィールドの端まで歩いてみてくれだぜ（＾▽＾）！<br/>
            上下左右の端に画面外が見えないようにロックがかかるか、また、盤の端まで歩けるか、試してみてくれだぜ（＾▽＾）！<br/>
        </p>
        <br/>

        <!-- タッチパネルでも操作できるように、ボタンを置いておきます。キーボードの操作説明も兼ねます。 -->
        <p>キーボード操作方法</p>
        <ul>
            <li>
                <v-btn class="code-key hidden"/>
                <v-btn
                    class="code-key"
                    @touchstart.prevent="button1Ref?.press($event, onUpButtonPressed, {repeat: true});"
                    @touchend="button1Ref?.release(onUpButtonReleased);"
                    @touchcancel="button1Ref?.release(onUpButtonReleased);"
                    @touchleave="button1Ref?.release(onUpButtonReleased);"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, onUpButtonPressed, {repeat: true})"
                    @mouseup="button1Ref?.release(onUpButtonReleased);"
                    @mouseleave="button1Ref?.release(onUpButtonReleased);"
                >↑</v-btn>
                <br/>
                <v-btn
                    class="code-key"
                    @touchstart.prevent="button1Ref?.press($event, onLeftButtonPressed, {repeat: true});"
                    @touchend="button1Ref?.release(onLeftButtonReleased);"
                    @touchcancel="button1Ref?.release(onLeftButtonReleased);"
                    @touchleave="button1Ref?.release(onLeftButtonReleased);"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, onLeftButtonPressed, {repeat: true})"
                    @mouseup="button1Ref?.release(onLeftButtonReleased);"
                    @mouseleave="button1Ref?.release(onLeftButtonReleased);"
                >←</v-btn>
                <v-btn class="code-key hidden"/>
                <v-btn
                    class="code-key"
                    @touchstart.prevent="button1Ref?.press($event, onRightButtonPressed, {repeat: true});"
                    @touchend="button1Ref?.release(onRightButtonReleased);"
                    @touchcancel="button1Ref?.release(onRightButtonReleased);"
                    @touchleave="button1Ref?.release(onRightButtonReleased);"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, onRightButtonPressed, {repeat: true})"
                    @mouseup="button1Ref?.release(onRightButtonReleased);"
                    @mouseleave="button1Ref?.release(onRightButtonReleased);"
                >→</v-btn>
                <br/>
                <v-btn class="code-key hidden"/>
                <v-btn
                    class="code-key"
                    @touchstart.prevent="button1Ref?.press($event, onDownButtonPressed, {repeat: true});"
                    @touchend="button1Ref?.release(onDownButtonReleased);"
                    @touchcancel="button1Ref?.release(onDownButtonReleased);"
                    @touchleave="button1Ref?.release(onDownButtonReleased);"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, onDownButtonPressed, {repeat: true})"
                    @mouseup="button1Ref?.release(onDownButtonReleased);"
                    @mouseleave="button1Ref?.release(onDownButtonReleased);"
                >↓</v-btn>
                　…　自機を上下左右へ、印字を逆方向へ動かすぜ！
                <br/>
            </li>
            <li>
                <v-btn
                    class="code-key"
                    @touchstart.prevent="button1Ref?.press($event, onSpaceButtonPressed, {repeat: true});"
                    @touchend="button1Ref?.release(onSpaceButtonReleased);"
                    @touchcancel="button1Ref?.release(onSpaceButtonReleased);"
                    @touchleave="button1Ref?.release(onSpaceButtonReleased);"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, onSpaceButtonPressed, {repeat: true})"
                    @mouseup="button1Ref?.release(onSpaceButtonReleased);"
                    @mouseleave="button1Ref?.release(onSpaceButtonReleased);"
                >（スペース）</v-btn>
                　…　自機、印字の位置を最初に有ったところに戻すぜ。
            </li>
            <li>
                <!-- フォーカスを外すためのダミー・ボタンです -->
                <v-btn
                    class="noop-key"
                    ref="noopButton"
                    v-tooltip="'PCでのマウス操作で、フォーカスがコントロールに残って邪魔になるときは、このボタンを押してくれだぜ'"
                >何もしないボタン</v-btn><br/>
            </li>
        </ul>
        <br/>

        <!-- 設定 -->
        <v-btn
            class="code-key"
            @touchstart.prevent="button1Ref?.press($event, onConfigButtonPressed);"
            @touchend="button1Ref?.release();"
            @touchcancel="button1Ref?.release();"
            @touchleave="button1Ref?.release();"
            @mousedown.prevent="button1Ref?.handleMouseDown($event, onConfigButtonPressed)"
            @mouseup="button1Ref?.release();"
            @mouseleave="button1Ref?.release();"
        >{{ appConfigIsShowing ? '⚙️設定を終わる' : '⚙️設定を表示' }}</v-btn>
        <section v-if="appConfigIsShowing" class="sec-1">
            <br/>
            <v-slider
                label="ズーム"
                v-model="appZoom"
                :min="0.5"
                :max="4"
                step="0.5"
                showTicks="always"
                thumbLabel="always" />
            <v-slider
                label="自機のホーム　＞　筋"
                v-model="playerHome1File"
                :min="0"
                :max="4"
                step="1"
                showTicks="always"
                thumbLabel="always" />
            <v-slider
                label="自機のホーム　＞　段"
                v-model="playerHome1Rank"
                :min="0"
                :max="4"
                step="1"
                showTicks="always"
                thumbLabel="always" />
            <p>盤はマスクを含む。ただし右側と下側に余分に１マス付いたマスクは含まない：</p>
            <v-slider
                label="盤の筋の数"
                v-model="board1FileNum"
                :min="0"
                :max="board1FileMax"
                step="1"
                showTicks="always"
                thumbLabel="always" />
            <v-slider
                label="盤の段の数"
                v-model="board1RankNum"
                :min="0"
                :max="board1RankMax"
                step="1"
                showTicks="always"
                thumbLabel="always" />
            <v-switch
                v-model="printing1IsLooping"
                :label="printing1IsLooping ? '［印字の端と端がつながって（ループして）］います' : '［印字の端と端がつながって（ループして）］いません'"
                color="green"
                :hideDetails="true"
                inset />
            <br/>
            <p>マスクの枠の幅。右側と下側は、１マス多めに付きます：</p>
            <v-slider
                label="マスクの枠の幅"
                v-model="board1WithMaskSizeSquare"
                :min="0"
                :max="2"
                step="1"
                showTicks="always"
                thumbLabel="always" />
            <v-switch
                v-model="appBoundaryIsLock"
                :label="appBoundaryIsLock ? '［画面外を見せない］中' : '［画面外を見せない］をしていません'"
                color="green"
                :hideDetails="true"
                inset />
                <section class="sec-1">
                    <v-switch
                        v-model="player1CanBoardEdgeWalking"
                        :disabled="!player1CanBoardEdgeWalkingIsEnabled"
                        :label="player1CanBoardEdgeWalking ? '［盤の端まで歩ける］を可能中' : '［盤の端まで歩ける］を可能にしていません'"
                        color="green"
                        :hideDetails="true"
                        inset />
                </section>
            <br/>
        </section>
    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ＲＰＧの歩行グラフィック　＞　</span><span class="parent-header">盤の回り込みスクロール、数字柄の原始的シフト、自機の端歩き　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link
            pagePath="/making/input-axis-rpg-walk-board-wraparound-scroll-and-printing-primordial-and-player-boundary-1"/>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

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
    import SourceLink from '../../components/SourceLink.vue';
    import Stopwatch from '../../components/Stopwatch.vue';
    import TileAnimation from '../../components/TileAnimation.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getFixedSquareIndexFromTileIndex, getPrintingIndexFromFixedSquareIndex, wrapAround } from '../../composables/board-operation';
    import { handlePlayerController, isPlayerInputKey } from '../../composables/player-controller';
    import type { MotionInput, PlayerInput } from '../../composables/player-controller';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //

    const commonSpriteMotionLeft = -1;  // モーション（motion）定数。左。
    const commonSpriteMotionUp = -1;
    const commonSpriteMotionRight = 1;
    const commonSpriteMotionDown = 1;


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appConfigIsShowing = ref<boolean>(false);    // 設定を表示中
    const appZoom = ref<number>(4);    // ズーム
    const appBoundaryIsLock = ref<boolean>(true);                   // ［画面外隠し］を管理（true: ロックする, false: ロックしない）
    watch(appBoundaryIsLock, (newValue: boolean)=>{
        player1CanBoardEdgeWalkingIsEnabled.value = newValue;
    });


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　何もしないボタン +
    // ++++++++++++++++++++++++++++++++++++++

    const noopButton = ref<InstanceType<typeof VBtn> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン拡張 +
    // ++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ストップウォッチ +
    // ++++++++++++++++++++++++++++++++++++++

    const stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null); // Stopwatch のインスタンス
    const stopwatch1Count = ref<number>(0);   // カウントの初期値

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
    const board1WithMaskSizeSquare = ref<number>(1);    // マスクの幅（単位：マス）
    const board1WithMaskBottomRightMargin: number = 1;  // マスクは右下に１マス分多く作ります。
    const bothSide = 2;     // 左と右とか、上と下とか、対。
    const board1WithMaskFileNum = computed<number>(()=>{        // マスク付きの場合の列数。右側の多めの１マスを含む。
        const minWidth = bothSide * board1WithMaskSizeSquare.value + board1WithMaskBottomRightMargin;  // マスクの横幅より小さくはなりません。
        if (board1FileNum.value < minWidth) {
            return minWidth;
        }
        return board1FileNum.value + board1WithMaskBottomRightMargin;
    });
    const board1WithMaskRankNum = computed<number>(()=>{
        const minHeight = bothSide * board1WithMaskSizeSquare.value + board1WithMaskBottomRightMargin; // マスクの縦幅より小さくはなりません。
        if (board1RankNum.value < minHeight) {
            return minHeight;
        }
        return board1RankNum.value + board1WithMaskBottomRightMargin;
    });
    const board1Style = computed<CompatibleStyleValue>(()=>{    // ボードとマスクを含んでいる領域のスタイル
        return {
            width: `${board1WithMaskFileNum.value * board1SquareWidth}px`,
            height: `${board1WithMaskRankNum.value * board1SquareHeight}px`,
            zoom: appZoom.value,
        };
    });
    const getSquareStyleFromTileIndex = computed<
        (tileIndex:number)=>CompatibleStyleValue
    >(() => {
        return (tileIndex:number)=>{
            // プレイヤーが初期位置にいる場合の、マスの位置。
            const homeLeft = (tileIndex % board1FileNum.value) * board1SquareWidth;
            const homeTop = Math.floor(tileIndex / board1FileNum.value) * board1SquareHeight;

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
                border: `solid 1px ${tileIndex % 2 == 0 ? 'darkgray' : 'lightgray'}`,
            };
        };
    });

    // ++++++++++++++++++++++++++
    // + オブジェクト　＞　印字 +
    // ++++++++++++++++++++++++**
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    const printing1IsLooping = ref<boolean>(false); // ループ状態を管理（true: ループする, false: ループしない）
    const printing1FileMax = 10;    // 印字の最大サイズは、盤のサイズより大きいです。
    const printing1RankMax = 10;
    const printing1AreaMax = printing1FileMax * printing1RankMax;
    const printing1FileNum = ref<number>(printing1FileMax);   // 列数
    const printing1RankNum = ref<number>(printing1RankMax);   // 行数
    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const printing1Left = ref<number>(0);
    const printing1Top = ref<number>(0);
    const printing1FileDelta = computed<number>(()=>{     // 自機の移動量（単位：マス）
        return Math.round(-printing1Left.value / board1SquareWidth);    // 印字盤が左に行くほど、盤上のキャラクターが右に動いたように見える。
    });
    const printing1RankDelta = computed<number>(()=>{
        return Math.round(-printing1Top.value / board1SquareHeight);
    });
    const printing1Speed = ref<number>(2);  // 移動速度（単位：ピクセル）
    const printing1StringData = ref<string[]>([]);
    // マップデータを生成
    for (let i=0; i<printing1AreaMax; i++) {    // 最初から最大サイズで用意します。
        printing1StringData.value.push(i.toString().padStart(2, "0"));
    }
    const printing1Motion = ref<MotionInput>({   // 印字への入力
        wrapAroundRight: 0, // 負なら左、正なら右
        wrapAroundBottom: 0,    // 負なら上、正なら下
    });


    /**
     * マスの印字。
     * @returns 該当なしのとき "-"
     */
    const getPrintingStringFromPrintingIndex = computed<
        (printingIndex: number) => string
    >(() => {
        return (printingIndex: number) => {

            if (printingIndex == -1) {
                return "-"; // 印字のサイズの範囲外になるところには、"-" でも表示しておく
            }

            return  printing1StringData.value[printingIndex];
        };
    });


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
    const player1File = computed<number>(()=>{
        return Math.round(player1Left.value / board1SquareWidth);
    });
    const player1Rank = computed<number>(()=>{
        return Math.round(player1Top.value / board1SquareHeight);
    });

    const player1Input = { // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    } as PlayerInput;
    const player1AnimationSlow = ref<number>(8);    // アニメーションのスローモーションの倍率の初期値
    const player1AnimationFacingFrames = 1;         // 振り向くフレーム数
    const player1AnimationWalkingFrames = 16;       // 歩行フレーム数
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
    const player1Frames = ref(player1SourceFrames["down"]);
    const player1MotionWait = ref<number>(0);  // TODO: モーション入力拒否時間。入力キーごとに用意したい。
    const player1Motion = ref<Record<string, number>>({  // モーションへの入力
        lookRight: 0,     // 向きを変える
        lookBottom: 0,
        goToRight: 0,     // 負なら左、正なら右へ移動する
        goToBottom: 0,    // 負なら上、正なら下へ移動する
    });
    const player1CanBoardEdgeWalking = ref<boolean>(true);              // ［盤の端の歩行］可能状態を管理（true: 可能にする, false: 可能にしない）
    const player1CanBoardEdgeWalkingIsEnabled = ref<boolean>(true);     // ［盤の端の歩行］可能状態の活性性を管理（true: 不活性にする, false: 活性にする）

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　視界の外１ +
    // ++++++++++++++++++++++++++++++++

    const outOfSight1Style = computed<CompatibleStyleValue>(()=>{
        return {
            width: `${board1WithMaskFileNum.value * board1SquareWidth}px`,
            height: `${board1WithMaskRankNum.value * board1SquareHeight}px`,
            borderTop: `solid ${board1WithMaskSizeSquare.value * board1SquareHeight}px rgba(0,0,0,0.5)`,
            borderRight: `solid ${(board1WithMaskSizeSquare.value + board1WithMaskBottomRightMargin) * board1SquareWidth}px rgba(0,0,0,0.5)`,
            borderBottom: `solid ${(board1WithMaskSizeSquare.value + board1WithMaskBottomRightMargin) * board1SquareHeight}px rgba(0,0,0,0.5)`,
            borderLeft: `solid ${board1WithMaskSizeSquare.value * board1SquareWidth}px rgba(0,0,0,0.5)`,
        };
    });


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
            // if (player1Input.hasOwnProperty(e.key)) {
            //     player1Input[e.key] = true;
            // }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = true; // 型チェック済み（文字列→キー名）
            }
            // if (player1Input.hasOwnProperty(e.key)) {
            //     player1Input[e.key] = false;
            // }
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
            player1MotionWait.value -= 1;           // モーション・タイマー

            if (player1MotionWait.value==0) {
                // モーションのクリアー
                player1Motion.value["lookRight"] = 0;	// 自機
                player1Motion.value["lookBottom"] = 0;
                player1Motion.value["goToRight"] = 0;
                player1Motion.value["goToBottom"] = 0;
                printing1Motion.value["wrapAroundRight"] = 0;	// 印字
                printing1Motion.value["wrapAroundBottom"] = 0;
            }

            // ++++++++++++++++++++++++++++++
            // + キー入力をモーションに変換 +
            // ++++++++++++++++++++++++++++++

            /*
            handlePlayerController(
                appBoundaryIsLock,
                board1SquareWidth,
                board1FileNum,
                board1RankNum,
                board1WithMaskSizeSquare,
                playerHome1File,
                playerHome1Rank,
                playerHome1Left,
                playerHome1Top,
                player1MotionWait,
                player1Input,
                player1Motion,
                player1File,
                player1Rank,
                player1Left,
                player1Top,
                player1CanBoardEdgeWalking,
                printing1FileNum,
                printing1RankNum,
                printing1Left,
                printing1Top,
                printing1Motion,
            );
            // */

            if (player1MotionWait.value<=0) {   // ウェイトが無ければ、入力を受け付ける。

                // 位置のリセット
                if (player1Input[" "]) {
                    player1Left.value = playerHome1Left.value;  // 自機
                    player1Top.value = playerHome1Top.value;
                    printing1Left.value = 0;    // 印字
                    printing1Top.value = 0;
                }

                // 移動関連（単発）
                // 斜め方向の場合、左右を上下で上書きする。（左、右）→（上、下）の順。
                if (player1Input.ArrowLeft) { // 左
                    player1Motion.value["lookRight"] = commonSpriteMotionLeft;

                    // ホーム・ポジションより右に居ればホームに近づける。
                    if (player1File.value > playerHome1File.value) {
                        player1Motion.value["goToRight"] = commonSpriteMotionLeft;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            // - 印字は動かない、プレイヤーの移動量を見ること。
                            // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
                            //
                            // Printing
                            // +---------------------+
                            // |                     |
                            // |       Board         |
                            // |       +-------+     |
                            // |       |       |     |
                            // |       |   *   |     |
                            // |       |       |     |
                            // |       +-------+     |
                            // |                     |
                            // +<--m-->*-------------+
                            //         0
                            // c<------+
                            //
                            // 0 は、盤の初期位置からの移動量。盤は移動しないので常に 0。
                            // c は、0 からみた、印字の左隅位置。 初期値は習慣的に、 0 以下にするものと思われる。
                            // m は、 pd の正負を反転したもの。
                            // m が、マスク幅より大きいなら、それ以上左に行くことはできない。
                            //
                            // m = c
                            //

                            const pd = printing1FileDelta.value - 1;  // まだ -1 （左へ移動）されていないので、-1 しておく。
                            const m = - pd;

                            if (board1WithMaskSizeSquare.value < m) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            printing1Motion.value["wrapAroundRight"] = commonSpriteMotionRight;   // 印字は、キー入力とは逆向きへ進める
                        } else if (player1CanBoardEdgeWalking.value) {
                            // ［盤の端まで歩ける］
                            if (player1File.value > 0 + board1WithMaskSizeSquare.value) {
                                player1Motion.value["goToRight"] = commonSpriteMotionLeft;
                            }
                        }
                    }
                }

                if (player1Input.ArrowRight) {  // 右
                    player1Motion.value["lookRight"] = commonSpriteMotionRight;

                    // ホーム・ポジションより左に居ればホームに近づける。
                    if (player1File.value < playerHome1File.value) {
                        player1Motion.value["goToRight"] = commonSpriteMotionRight;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            // - 印字は動かない、プレイヤーの移動量を見ること。
                            // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
                            //
                            // Printing
                            // +<---------cw------------------->+
                            // |                                |
                            // |       Board                    |
                            // |       +<------bw-------->+     |
                            // |       |//////////////////|     |
                            // |       |///+-------+//////|     |
                            // |       |///|       |//////|     |
                            // |       |///|   *   |//////|     |
                            // |       |///|       |//////|     |
                            // |       |///+-------+//////|     |
                            // |       |//////////////////|     |
                            // |       |//////////////////|     |
                            // |       +------------------+     |
                            // |                                |
                            // +--------------------------+<-m->+
                            // c<------+
                            //
                            // 0 は、盤の初期位置からの移動量。盤は移動しないので常に 0。
                            // c は、0 からみた、印字の左隅位置。 初期値は習慣的に、 0 以下にするものと思われる。
                            // bw は、盤の列数。
                            // cw は、印字の列数。
                            // m は、右側番外の余白。
                            // m が、マスクの横幅（右側の多めの１を含まない）以下なら、それ以上右に行くことはできない。
                            //
                            // m = cw + c - bw
                            //

                            const pd = -printing1FileDelta.value;
                            const cw = printing1FileNum.value; // 例えば 10
                            const bw = board1FileNum.value;
                            const m = cw + pd - bw;

                            if (m <= -board1WithMaskSizeSquare.value) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            printing1Motion.value["wrapAroundRight"] = commonSpriteMotionLeft;    // 印字は、キー入力とは逆向きへ進める
                        } else {
                            if (player1CanBoardEdgeWalking.value) {
                                // ［盤の端まで歩ける］
                                if (player1File.value < board1FileNum.value - board1WithMaskSizeSquare.value - 1) {
                                    player1Motion.value["goToRight"] = commonSpriteMotionRight;
                                }
                            }
                        }
                    }
                }

                if (player1Input.ArrowUp) {    // 上
                    player1Motion.value["lookBottom"] = commonSpriteMotionUp;

                    // ホーム・ポジションより下に居ればホームに近づける。
                    if (player1Rank.value > playerHome1Rank.value) {
                        player1Motion.value["goToBottom"] = commonSpriteMotionUp;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            // - 印字は動かない、プレイヤーの移動量を見ること。
                            // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
                            //
                            // Printing
                            // +-------------------->+     c
                            // |                     |     ^
                            // |       Board         |     |
                            // |       +-------+     |     +
                            // |       |       |     |
                            // |       |       |     |
                            // |       |   *   |     |
                            // |       |       |     |
                            // |       |       |     |
                            // |       +-------+     +
                            // |                     ^
                            // |                     |
                            // |                     m
                            // |                     |
                            // |                     v
                            // +---------------------+
                            //
                            // 0 は、盤の初期位置からの移動量。盤は移動しないので常に 0。
                            // c は、0 からみた、印字の上隅位置。 初期値は習慣的に、 0 以下にするものと思われる。
                            // m は、 pd の正負を反転したもの。
                            // m が、マスク幅より大きいなら、それ以上上に行くことはできない。
                            //
                            // m = c
                            //

                            const pd = printing1RankDelta.value - 1;  // まだ -1 （上へ移動）されていないので、-1 しておく。
                            const m = - pd;

                            if (board1WithMaskSizeSquare.value < m) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            printing1Motion.value["wrapAroundBottom"] = commonSpriteMotionDown;     // 印字は、キー入力とは逆向きへ進める
                        } else if (player1CanBoardEdgeWalking.value) {
                            // ［盤の端まで歩ける］
                            if (player1Rank.value > 0 + board1WithMaskSizeSquare.value) {
                                player1Motion.value["goToBottom"] = commonSpriteMotionUp;
                            }
                        }
                    }
                }

                if (player1Input.ArrowDown) {   // 下
                    player1Motion.value["lookBottom"] = commonSpriteMotionDown;

                    // ホーム・ポジションより上に居ればホームに近づける。
                    if (player1Rank.value < playerHome1Rank.value) {
                        player1Motion.value["goToBottom"] = commonSpriteMotionDown;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            // - 印字は動かない、プレイヤーの移動量を見ること。
                            // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
                            //
                            // Printing
                            // +------------------------------->+     c
                            // ^                                |     ^
                            // |       Board                    |     |
                            // |       +------------------+     | 0   +
                            // |       ^//////////////////|     |
                            // |       |///+-------+//////|     |
                            // |       |///|       |//////|     |
                            // |       |///|       |//////|     |
                            // ch      bh//|   *   |//////|     |
                            // |       |///|       |//////|     |
                            // |       |///|       |//////|     |
                            // |       |///+-------+//////|     |
                            // |       |//////////////////|     |
                            // |       v//////////////////|     |
                            // |       +------------------+     +
                            // |                                ^
                            // |                                |
                            // |                                m
                            // |                                |
                            // v                                v
                            // +--------------------------------+
                            //
                            // 0 は、盤の初期位置からの移動量。盤は移動しないので常に 0。
                            // c は、0 からみた、印字の上隅位置。 初期値は習慣的に、 0 以下にするものと思われる。
                            // bh は、盤の行数。
                            // ch は、印字の行数。
                            // m が、マスクの横幅（下側の多めの１を含まない）より小さいなら、それ以上下に行くことはできない。
                            //
                            // m = ch + c - bh
                            //

                            const pd = -(printing1RankDelta.value+1);  // まだ +1 （下へ移動）されていないので、+1 しておく。
                            const ch = printing1RankNum.value; // 例えば 10
                            const bh = board1RankNum.value;
                            const m = ch + pd - bh;
                            //console.log(`[m=${m}] = [ch=${ch}] + [pd=${pd}] - [bh=${bh}].  m <= -board1WithMaskHeight:${m <= -board1WithMaskSizeSquare.value}`);

                            if (m < -board1WithMaskSizeSquare.value) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            printing1Motion.value["wrapAroundBottom"] = commonSpriteMotionUp;    // 印字は、キー入力とは逆向きへ進める
                        } else if (player1CanBoardEdgeWalking.value) {
                            // ［盤の端まで歩ける］
                            if (player1Rank.value < board1RankNum.value - board1WithMaskSizeSquare.value - 1) {
                                player1Motion.value["goToBottom"] = commonSpriteMotionDown;
                            }
                        }
                    }
                }
            }

            // ++++++++++++++++++++
            // + 向き、移動を処理 +
            // ++++++++++++++++++++

            // 印字の移動量（単位：ピクセル）を更新、ピクセル単位。タテヨコ同時入力の場合、上下で上書きする：
            if (printing1Motion.value["wrapAroundRight"] == commonSpriteMotionLeft) {  // 左
                printing1Left.value -= printing1Speed.value;
            } else if (printing1Motion.value["wrapAroundRight"] == commonSpriteMotionRight) {   // 右
                printing1Left.value += printing1Speed.value;
            }

            if (printing1Motion.value["wrapAroundBottom"] == commonSpriteMotionUp) {  // 上
                printing1Top.value -= printing1Speed.value;
            } else if (printing1Motion.value["wrapAroundBottom"] == commonSpriteMotionDown) {   // 下
                printing1Top.value += printing1Speed.value;
            }

            // 自機の移動量（単位：ピクセル）を更新、ピクセル単位。タテヨコ同時入力の場合、上下で上書きする：
            if (player1Motion.value["goToRight"] == commonSpriteMotionLeft) {    // 左
                player1Left.value -= printing1Speed.value;
            } else if (player1Motion.value["goToRight"] == commonSpriteMotionRight) {  // 右
                player1Left.value += printing1Speed.value;
            }

            if (player1Motion.value["goToBottom"] == commonSpriteMotionUp) {   // 上
                player1Top.value -= printing1Speed.value;
            } else if (player1Motion.value["goToBottom"] == commonSpriteMotionDown) { // 下
                player1Top.value += printing1Speed.value;
            }

            if (player1MotionWait.value <= 0) { // モーション開始時に１回だけ実行される
                // 自機の向きを更新、タテヨコ同時入力の場合、上下を優先する：
                if (player1Motion.value["lookBottom"] == commonSpriteMotionUp) {   // 上
                    player1Frames.value = player1SourceFrames["up"]
                } else if (player1Motion.value["lookBottom"] == commonSpriteMotionDown) { // 下
                    player1Frames.value = player1SourceFrames["down"]
                } else if (player1Motion.value["lookRight"] == commonSpriteMotionLeft) {    // 左
                    player1Frames.value = player1SourceFrames["left"]
                } else if (player1Motion.value["lookRight"] == commonSpriteMotionRight) {  // 右
                    player1Frames.value = player1SourceFrames["right"]
                }

                // ++++++++++++++++
                // + ウェイト設定 +
                // ++++++++++++++++

                if (printing1Motion.value["wrapAroundRight"]!=0 || printing1Motion.value["wrapAroundBottom"]!=0 || player1Motion.value["goToRight"]!=0 || player1Motion.value["goToBottom"]!=0) {
                    player1MotionWait.value = player1AnimationWalkingFrames;
                } else if (player1Motion.value["lookRight"]!=0 || player1Motion.value["lookBottom"]!=0) {
                    player1MotionWait.value = player1AnimationFacingFrames;
                }
            }

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
    }


    function onLeftButtonReleased() : void {
        player1Input.ArrowLeft = false;
    }


    /**
     * 上。
     */
    function onUpButtonPressed() : void {
        player1Input.ArrowUp = true;
    }


    function onUpButtonReleased() : void {
        player1Input.ArrowUp = false;
    }


    /**
     * 右。
     */
    function onRightButtonPressed() : void {
        player1Input.ArrowRight = true;
    }


    function onRightButtonReleased() : void {
        player1Input.ArrowRight = false;
    }


    /**
     * 下。
     */
    function onDownButtonPressed() : void {
        player1Input.ArrowDown = true;
    }


    function onDownButtonReleased() : void {
        player1Input.ArrowDown = false;
    }


    /**
     * スペース・キー。
     */
    function onSpaceButtonPressed() : void {
        player1Input[" "] = true;
    }


    function onSpaceButtonReleased() : void {
        player1Input[" "] = false;
    }


    /**
     * 設定ボタン。
     */
    function onConfigButtonPressed() : void {
        appConfigIsShowing.value = !appConfigIsShowing.value;
    }

</script>

<style scoped>
    div.board { /* 盤１ */
        position: relative;
    }
    div.square {    /* マス */
        position: absolute;
    }
    span.board-slidable-tile-index {  /* マスの物自体に付いている番号。その場所は、オーバーラッピングしてすり替わることがある。 */
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
        background-color: lightpink;
    }
    div.player {    /* 自機１ */
        position: absolute;
        image-rendering: pixelated;
    }
    div.out-of-sight {  /* 視界の外１ */
        position: absolute;
        image-rendering: pixelated;
    }

</style>
