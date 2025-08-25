<template>

    <!-- ボタン機能拡張 -->
    <button-20250822 ref="button1Ref"/>

    <h4><span class="parent-header">ＲＰＧの歩行グラフィック　＞　</span>盤の回り込みスクロール、印字の両端つながり、絵柄付き</h4>
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
            <tile
                v-for="i in board1Area"
                :key="i"
                class="square"
                :style="getSquareStyle(
                    getIndexWhenAddUpFileAndRankOnPeriodicTable(
                        i - 1,
                        printing1FileNum,
                        printing1RankNum,
                        printing1Left / board1SquareWidth,
                        printing1Top / board1SquareHeight
                    )
                )"
                :srcLeft="getPrintingLeftBySquare(
                    getIndexWhenAddUpFileAndRankOnPeriodicTable(
                        i - 1,
                        printing1FileNum,
                        printing1RankNum,
                        printing1Left / board1SquareWidth,
                        printing1Top / board1SquareHeight
                    )
                )"
                :srcTop="0"
                :srcWidth="board1SquareWidth"
                :srcHeight="board1SquareHeight"
                tilemapUrl="/img/making/tilemap_floor.png">
                <span class="board-slidable-tile-index">[{{ (i - 1) }}]</span>
                <span class="board-fixed-square-index">[{{ getFixedSquareIndexFromTileIndex(i - 1) }}]</span>
                <span class="board-printing-index">[{{ getPrintingSquareIndexFromTileIndex(i - 1)}}]</span>
                <span class="board-square-printing-string">{{
                    getPrintingIndexStringBySquare(
                        getIndexWhenAddUpFileAndRankOnPeriodicTable(
                            i - 1,
                            printing1FileNum,
                            printing1RankNum,
                            printing1Left / board1SquareWidth,
                            printing1Top / board1SquareHeight
                        )
                    )
                }}</span>
                <span class="board-square-source-tile-index">[{{ getSourceTileIndexStringFromTileIndex(i - 1) }}]</span>
            </tile>

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
            印字x={{ printing1Left }}　｜　人x={{ player1Left }}<br/>
            印字y={{ printing1Top  }}　｜　人y={{ player1Top  }}<br/>
        </div>
        <br/>

        <p>
            👆 半透明の黒いマスクのところは画面に映らないようにすればＯｋだぜ（＾～＾）！<br/>
            マスの中の４段目の数字は、ソース・タイルのインデックスだぜ（＾～＾）！<br/>
        </p>
        <br/>

        <p>元画像のタイルマップを表示：</p>
        <v-img
            src="/img/making/tilemap_floor.png"
            :style="`zoom: ${appZoom}; width: ${board1SquareWidth}px; height:${board1SquareHeight}px;`"
            style="image-rendering: pixelated; border:dashed gray 1px;"/>
        <p>：ここまで。</p>


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

        <!-- デバッグ出力 -->
        <v-btn
            class="code-key"
            @touchstart.prevent="button1Ref?.press($event, onDebugInfoButtonPressed);"
            @touchend="button1Ref?.release();"
            @touchcancel="button1Ref?.release();"
            @touchleave="button1Ref?.release();"
            @mousedown.prevent="button1Ref?.handleMouseDown($event, onDebugInfoButtonPressed)"
            @mouseup="button1Ref?.release();"
            @mouseleave="button1Ref?.release();"
        >{{ appDebugInfoIsShowing ? '⚙️デバッグ情報を終わる' : '⚙️デバッグ情報を表示' }}</v-btn>
        <section v-if="appDebugInfoIsShowing" class="sec-1">
            <br/>
            <p>👇 盤の各マス</p>
            <div
                v-for="i in board1Area"
                :key="i">
                tile-index: {{ i - 1 }} | 
                fix-index: {{ getIndexWhenAddUpFileAndRankOnPeriodicTable(
                                i - 1,
                                board1FileNum,
                                board1RankNum,
                                printing1Left / board1SquareWidth,
                                printing1Top / board1SquareHeight
                            ) }} | 
                printing: {{ getPrintingIndexStringBySquare(
                                getIndexWhenAddUpFileAndRankOnPeriodicTable(
                                    i - 1,
                                    board1FileNum,
                                    board1RankNum,
                                    printing1Left / board1SquareWidth,
                                    printing1Top / board1SquareHeight
                                )
                            )}}<br/>
            </div>
            <br/>
            <p>👇 印字表の各マス</p>
            <div
                v-for="j in printing1AreaMax"
                :key="j">
                printing-index: {{ j - 1 }} | 
                source-tile-index: {{ printing1SourceTileIndexesBoard[j - 1] }}<br/>
            </div>
            <br/>
        </section>
        

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
        </section>
    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ＲＰＧの歩行グラフィック　＞　</span><span class="parent-header">盤の回り込みスクロール、印字の両端つながり、絵柄付き　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link
            pagePath="/making/input-axis-rpg-walk-using-background-image-1"/>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';
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
    import Tile from '../../components/Tile.vue';
    import TileAnimation from '../../components/TileAnimation.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getSubprintingIndexFromFixedSquareIndex } from '../../composables/board-operation';
    import { euclideanMod, getIndexWhenAddUpFileAndRankOnPeriodicTable } from '../../composables/periodic-table-operation';


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

    const appDebugInfoIsShowing = ref<boolean>(false);  // デバッグ情報を表示中
    const appConfigIsShowing = ref<boolean>(false);    // 設定を表示中
    const appZoom = ref<number>(4);    // ズーム


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
    const board1FileNum = ref<number>(5);   // 筋の数
    const board1RankNum = ref<number>(5);   // 段の数
    const board1Area = computed(()=> {  // 盤のマス数
        return board1FileNum.value * board1RankNum.value;
    });
    const board1WithMaskSizeSquare = ref<number>(1);    // マスクの幅（単位：マス）
    const board1WithMaskBottomRightMargin: number = 1;  // マスクは右下に１マス分多く作ります。
    const board1WithMaskFileNum = computed<number>(()=>{
        return board1FileNum.value + board1WithMaskBottomRightMargin;
    });
    const board1WithMaskRankNum = computed<number>(()=>{
        return board1RankNum.value + board1WithMaskBottomRightMargin;
    });
    const board1Style = computed<CompatibleStyleValue>(()=>{    // ボードとマスクを含んでいる領域のスタイル
        return {
            width: `${board1WithMaskFileNum.value * board1SquareWidth}px`,
            height: `${board1WithMaskRankNum.value * board1SquareHeight}px`,
            zoom: appZoom.value,
        };
    });
    const getSquareStyle = computed<
        (i:number)=>CompatibleStyleValue
    >(() => {
        return (i:number)=>{
            // プレイヤーが初期位置にいる場合の、マスの位置。
            const homeLeft = (i % board1FileNum.value) * board1SquareWidth;
            const homeTop = Math.floor(i / board1FileNum.value) * board1SquareHeight;

            const bwPx = (board1FileNum.value * board1SquareWidth);   // 盤の横幅（ピクセル）。右側と下側に余分に付いている１マス分のマスクを含まない。
            const bhPx = (board1RankNum.value * board1SquareHeight);

            // NOTE: 循環するだけなら、［剰余］を使えばいける。
            // 盤の左端列を、右端列へ移動させる。
            const offsetLeftLoop = euclideanMod(homeLeft + printing1Left.value + bwPx, bwPx) - homeLeft;
            const offsetTopLoop = euclideanMod(homeTop + printing1Top.value + bhPx, bhPx) - homeTop;

            return {
                left: `${homeLeft + offsetLeftLoop}px`,
                top: `${homeTop + offsetTopLoop}px`,
                width: `${board1SquareWidth}px`,
                height: `${board1SquareHeight}px`,
            };
        };
    });
    const board1FloorTilemapTileNum = 4;  // 床のタイルマップ
    const board1SourceTilemapCoordination = computed(() => {   // 座標
        const tileMap = [];
        for (let i = 0; i < printing1AreaMax; i++) {   // 最大サイズで作っておく。
            const files = i % board1FileNum.value;
            const ranks = Math.floor(i / board1FileNum.value);
            tileMap.push({ top: ranks * board1SquareHeight, left: files * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight });
        }
        return tileMap;
    });

    // ++++++++++++++++++++++++++
    // + オブジェクト　＞　印字 +
    // ++++++++++++++++++++++++**
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    const printing1IsLooping = ref<boolean>(false);    // ループ状態を管理（true: ループする, false: ループしない）
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
    const printing1SourceTileIndexesBoard = ref<number[]>([]);   // ソース・タイルのインデックスが入っている盤
    // ランダムなマップデータを生成
    for (let i=0; i<printing1AreaMax; i++) {    // 最初から最大サイズで用意します。
        const sourceTileIndex = Math.floor(Math.random() * board1FloorTilemapTileNum);  // 0からfloorTilemapTileNum - 1のランダムな整数を配置
        printing1SourceTileIndexesBoard.value.push(sourceTileIndex);
    }
    const printing1Motion = ref<Record<string, number>>({   // 印字への入力
        wrapAroundRight: 0, // 負なら左、正なら右
        wrapAroundBottom: 0,    // 負なら上、正なら下
    });


    /**
     * マスの印字。
     */
    const getPrintingIndexStringBySquare = computed<
        (fixedSquareIndex: number) => string
    >(() => {
        return (fixedSquareIndex: number) => {
            const subprintingIndex = getSubprintingIndexFromFixedSquareIndex(
                fixedSquareIndex,
                printing1FileDelta.value,
                printing1RankDelta.value,
                board1FileNum.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1IsLooping.value);

            // 印字のサイズの範囲外になるところには、"-" でも表示しておく
            if (subprintingIndex == -1) {
                return "-";
            }

            return subprintingIndex.toString();
        };
    });


    /**
     * 見た目のマスのインデックスを取得します。
     */
    const getFixedSquareIndexFromTileIndex = computed<
        (tileIndex: number) => number
    >(() => {
        return (tileIndex: number) => {
            return getIndexWhenAddUpFileAndRankOnPeriodicTable( // マスの物自体に付いているインデックスを、見た目のマスのインデックスに変換します。
                tileIndex,
                board1FileNum.value,
                board1RankNum.value,
                printing1Left.value / board1SquareWidth,
                printing1Top.value / board1SquareHeight
            );
        };
    });


    /**
     * 印字盤のマスのインデックスを取得します。
     */
    const getPrintingSquareIndexFromTileIndex = computed<
        (tileIndex: number) => string
    >(() => {
        return (tileIndex: number) => {
            const fixedSquareIndex = getIndexWhenAddUpFileAndRankOnPeriodicTable(
                tileIndex,
                board1FileNum.value,
                board1RankNum.value,
                printing1Left.value / board1SquareWidth,
                printing1Top.value / board1SquareHeight
            );

            const subprintingIndex = getSubprintingIndexFromFixedSquareIndex(
                fixedSquareIndex,
                printing1FileDelta.value,
                printing1RankDelta.value,
                board1FileNum.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1IsLooping.value);

            // 印字のサイズの範囲外になるところには、"-" でも表示しておく
            if (subprintingIndex == -1) {
                return "-";
            }

            return `${subprintingIndex}`;
        };
    });


    /**
     * ソース・タイルマップのタイルのインデックス x の文字列。
     * @returns 該当なしのとき "not found"
     */
    const getSourceTileIndexStringFromTileIndex = computed<
        (tileIndex: number) => string
    >(()=>{
        return (tileIndex: number)=>{
            const fixedSquareIndex = getIndexWhenAddUpFileAndRankOnPeriodicTable(   // マスの物自体に付いているインデックスを、見た目のマスのインデックスに変換します。
                tileIndex,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1Left.value / board1SquareWidth,
                printing1Top.value / board1SquareHeight
            );

            const subprintingIndex = getSubprintingIndexFromFixedSquareIndex(
                fixedSquareIndex,
                printing1FileDelta.value,
                printing1RankDelta.value,
                board1FileNum.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1IsLooping.value);

            if (subprintingIndex == -1) {
                return "not found";
            }

            const sourceTileIndex = printing1SourceTileIndexesBoard.value[subprintingIndex];
            return `${sourceTileIndex}`;
        };
    });


    /**
     * ソース・タイルマップのタイルの位置 x。
     */
    const getPrintingLeftBySquare = computed<
        (fixedSquareIndex:number)=>number
    >(() => {
        return (fixedSquareIndex: number) => {
            const subprintingIndex = getSubprintingIndexFromFixedSquareIndex(
                fixedSquareIndex,
                printing1FileDelta.value,
                printing1RankDelta.value,
                board1FileNum.value,
                printing1FileNum.value,
                printing1RankNum.value,
                printing1IsLooping.value);

            // 印字のサイズの範囲外になるところには、とりあえず -1 を返す
            if (subprintingIndex == -1) {
                return -1;
            }

            const sourceTileIndex = printing1SourceTileIndexesBoard.value[subprintingIndex];
            return board1SourceTilemapCoordination.value[sourceTileIndex]["left"];
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
    const player1Input = <Record<string, boolean>>{    // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
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
    const player1MotionWait = ref(0);  // TODO: モーション入力拒否時間。入力キーごとに用意したい。
    const player1Motion = ref<Record<string, number>>({  // モーションへの入力
        lookRight: 0,     // 向きを変える
        lookBottom: 0,
    });

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

            if (player1Input.hasOwnProperty(e.key)) {
                player1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (player1Input.hasOwnProperty(e.key)) {
                player1Input[e.key] = false;
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
            player1MotionWait.value -= 1;           // モーション・タイマー

            if (player1MotionWait.value==0) {
                // モーションのクリアー
                player1Motion.value["lookRight"] = 0;	// 自機
                player1Motion.value["lookBottom"] = 0;
                printing1Motion.value["wrapAroundRight"] = 0;	// 印字
                printing1Motion.value["wrapAroundBottom"] = 0;
            }
            
            // ++++++++++++++++++++++++++++++
            // + キー入力をモーションに変換 +
            // ++++++++++++++++++++++++++++++
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
                    printing1Motion.value["wrapAroundRight"] = commonSpriteMotionRight;   // 印字は、キー入力とは逆向きへ進める
                }

                if (player1Input.ArrowRight) {  // 右
                    player1Motion.value["lookRight"] = commonSpriteMotionRight;
                    printing1Motion.value["wrapAroundRight"] = commonSpriteMotionLeft;    // 印字は、キー入力とは逆向きへ進める
                }

                if (player1Input.ArrowUp) {    // 上
                    player1Motion.value["lookBottom"] = commonSpriteMotionUp;
                    printing1Motion.value["wrapAroundBottom"] = commonSpriteMotionDown;     // 印字は、キー入力とは逆向きへ進める
                }

                if (player1Input.ArrowDown) {   // 下
                    player1Motion.value["lookBottom"] = commonSpriteMotionDown;
                    printing1Motion.value["wrapAroundBottom"] = commonSpriteMotionUp;    // 印字は、キー入力とは逆向きへ進める
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

            // // 自機の移動量（単位：ピクセル）を更新、ピクセル単位。タテヨコ同時入力の場合、上下で上書きする：
            // if (player1Motion.value["goToRight"] == commonSpriteMotionLeft) {    // 左
            //     player1Left.value -= printing1Speed.value;
            // } else if (player1Motion.value["goToRight"] == commonSpriteMotionRight) {  // 右
            //     player1Left.value += printing1Speed.value;
            // }

            // if (player1Motion.value["goToBottom"] == commonSpriteMotionUp) {   // 上
            //     player1Top.value -= printing1Speed.value;
            // } else if (player1Motion.value["goToBottom"] == commonSpriteMotionBottom) { // 下
            //     player1Top.value += printing1Speed.value;
            // }

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

                if (printing1Motion.value["wrapAroundRight"]!=0 || printing1Motion.value["wrapAroundBottom"]!=0) {
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
     * ［デバッグ情報を表示］ボタン。
     */
    function onDebugInfoButtonPressed() : void {
        appDebugInfoIsShowing.value = !appDebugInfoIsShowing.value;
    }


    /**
     * ［設定を表示］ボタン。
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
        image-rendering: pixelated;
    }
    span.board-slidable-tile-index {  /* マスの物自体に付いている番号 */
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
    span.board-square-source-tile-index {    /* マスの画像の、ソースのタイルのインデックス */
        position: absolute;
        left: 10px;
        top: 24px;
        width: 100%;
        text-align: center;
        font-size: 6px;
    }
    div.playerHome {    /* 自機のホーム１ */
        position: absolute;
        border: dashed 4px lightpink;
        z-index: 10;
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
