<template>

    <comment>機能</comment>
    <button-20250822 ref="button1Ref"/>

    <comment>以降、ページ</comment>
    <the-app-header/>

    <button-to-back-to-contents
        class="sec-0 mt-6"
        pagePath="."
    />

    <h1>五目並べ</h1>
    <section class="sec-1 pt-6 mb-6">


        <!-- 外付けシステムボタン -->
        <section class="mb-6">

            
            <v-btn
                @touchstart.prevent="button1Ref?.press($event, onGamePowerOnButtonPushed, {repeat: false});"
                @touchend="button1Ref?.release();"
                @touchcancel="button1Ref?.release();"
                @touchleave="button1Ref?.release();"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, onGamePowerOnButtonPushed, {repeat: false})"
                @mouseup="button1Ref?.release();"
                @mouseleave="button1Ref?.release();"
            >{{ gameMachine1IsPowerOn ? "Off" : "On" }}</v-btn>

            
            <v-btn
                :disabled="!gameMachine1GameStartButton1Enabled"
                @touchstart.prevent="button1Ref?.press($event, onGameStartOrEndButtonPushed, {repeat: false});"
                @touchend="button1Ref?.release();"
                @touchcancel="button1Ref?.release();"
                @touchleave="button1Ref?.release();"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, onGameStartOrEndButtonPushed, {repeat: false})"
                @mouseup="button1Ref?.release();"
                @mouseleave="button1Ref?.release();"
            >{{ gameMachine1IsPlaying ? "⏹" : "▶" }}</v-btn>


            <v-btn
                :disabled="!gameMachine1GamePauseButton1Enabled"
                @touchstart.prevent="button1Ref?.press($event, onGamePauseOrRestartButtonPushed, {repeat: false});"
                @touchend="button1Ref?.release();"
                @touchcancel="button1Ref?.release();"
                @touchleave="button1Ref?.release();"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, onGamePauseOrRestartButtonPushed, {repeat: false})"
                @mouseup="button1Ref?.release();"
                @mouseleave="button1Ref?.release();"
            >{{ gameMachine1IsPlayingPause ? "⏯" : "⏸" }}</v-btn>


        </section>


        <!-- ゲームマシン１ -->
        <game-machine-waratch2
            :style="{
                left: '0px',
                top: '0px',
            }"
            :screenWidth="gameMachine1Zoom * gameMachine1Width"
            :screenHeight="gameMachine1Zoom * gameMachine1Height"
            :powerOn="gameMachine1IsPowerOn"
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
        >
            <template #default>
                <!-- ゲーム画面の全体サイズと、切り抜き領域 -->
                <div
                    :style="{
                        visibility: gameMachine1Visibility,
                        width: `${gameMachine1Width}px`,
                        height: `${gameMachine1Height}px`,
                        zoom: gameMachine1Zoom,
                    }"
                    style="
                        position:relative;
                        left: 0;
                        top: 0;
                        background-color: #303030;  /* 黒背景 */
                    "
                >
                    <!-- グリッド -->
                    <div
                        v-for="sq in tileBoard1Area"
                        :key="sq"
                        :style="{
                            top: `${Math.floor((sq - 1) / tileBoard1FileNum) * tileBoard1TileHeight}px`,
                            left: `${((sq - 1) % tileBoard1FileNum) * tileBoard1TileWidth}px`,
                            width: `${tileBoard1TileWidth}px`,
                            height: `${tileBoard1TileHeight}px`,
                        }"
                        style="
                            position: absolute;
                            border: solid 1px gray;
                        "
                    ></div>

                    <!-- マス -->
                    <v-btn
                        flat
                        v-for="sq in range(0, gameBoard1Area)"
                        :key="sq"
                        :style="{
                            left: `${(sq % gameBoard1FileNum + 1) * tileBoard1TileWidth}px`,
                            top: `${(Math.floor(sq / gameBoard1FileNum) + 1) * tileBoard1TileHeight}px`,
                            minWidth: `${gameBoard1SquareSrcTilemapRect(sq).width}px`,
                            width: `${gameBoard1SquareSrcTilemapRect(sq).width}px`,
                            height: `${gameBoard1SquareSrcTilemapRect(sq).height}px`,
                            color: gameBoard1StoneColorNameMap[gameBoard1StoneColorArray[sq]],    /* 石の色 */
                            backgroundImage: `url('${spriteBoard001Png}')`,
                            backgroundPosition: gameBoard1SquareBackgroundPosition(sq),   // 元画像のスケールで逆向きシフトする
                            backgroundRepeat: 'no-repeat',
                            pointerEvents: gameBoard1StoneClickable(sq) ? 'auto' : 'none',  /* 石が置いてあったら、クリックを無視する */
                        }"
                        style="
                            position: absolute;
                            border-radius: 0;
                            font-size: 24px;
                            line-height: 90%;   /* 目視確認で石がマスの真ん中にくるよう調整 */
                            z-index: 120;   /* 目に見えませんが、ボタンが光景に沈んでいるので、前景にします */
                        "
                        @click="onGameBoard1Clicked(sq)"
                    >{{ gameBoard1StoneShapeArray[sq] }}</v-btn>

                    <!-- 筋の符号 -->
                    <span
                        v-for="file in gameBoard1FileNameArray.length"
                        :key="file"
                        :style="{
                            position: 'absolute',
                            left: `${file * 32 + 6}px`,
                            top: '510px',
                            width: '20px',
                            color: 'white',
                            fontSize: '24px',
                            zIndex: 200,
                            textAlign: 'center',
                        }"
                    >{{ gameBoard1FileNameArray[file - 1] }}</span>

                    <!-- 段の符号 -->
                    <span
                        v-for="rank in 15"
                        :key="rank"
                        :style="{
                            position: 'absolute',
                            left: '3px',
                            top: `${(16-rank) * 32}px`,
                            width: '20px',
                            color: 'white',
                            fontSize: '24px',
                            zIndex: 200,
                            textAlign: 'right',
                        }"
                    >{{ rank }}</span>

                </div>
            </template>
        </game-machine-waratch2>
        <!--
            NOTE: src属性は Vite が @/ を解決してくれるが、style="" の中までは解決してくれない。style="" の中を解決するのはブラウザー。だから、 import文を使う。
            <img src="@/assets/img/references/Sprite_Board_001.png" />
            <v-btn :style="{
                backgroundImage: `url('${spriteBoard001Png}')`,
            }"></v-btn>
            <v-btn :style="{
                backgroundImage: `url('${spriteBoard001Png}')`,
                backgroundPosition: `0px 0px`,   // 元画像のスケールでシフトする
                minWidth: '32px',   // ボタンには min-width が設定されているから、上書きすること
                width: '32px',
                height: '32px',
                // backgroundSize: `32px 32px`, // これは元画像のサイズ指定。拡縮に使う
                backgroundRepeat: 'no-repeat',
            }"></v-btn>
        -->

        <!-- お好み設定パネル１ -->
        <section class="sec-0 mt-6 mb-6">
            <v-btn
                class="code-key"
                @touchstart.prevent="button1Ref?.press($event, onGamePreferences1ButtonPressed);"
                @touchend="button1Ref?.release();"
                @touchcancel="button1Ref?.release();"
                @touchleave="button1Ref?.release();"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, onGamePreferences1ButtonPressed)"
                @mouseup="button1Ref?.release();"
                @mouseleave="button1Ref?.release();"
            >{{ gameMachine1PreferencesIsShowing ? '⚙️お好み設定を終わる' : '⚙️お好み設定を表示' }}</v-btn>
            <section
                v-if="gameMachine1PreferencesIsShowing"
                class="sec-0 pt-6 pb-6"
                style="background-color: rgb(0, 0, 0, 0.1);"
            >
                <v-slider
                    label="ズーム"
                    v-model="gameMachine1Zoom"
                    :min="0.375"
                    :max="4"
                    step="0.125"
                    showTicks="always"
                    thumbLabel="always" />
            </section>
        </section>

        <!-- 各種表示 -->
        <p>{{ gameBoard1DebugMessage }}</p>
        <p>次の手数={{ gameBoard1Times+1 }}</p>
        <p>次の手番=<span :style="{
            color: gameBoard1StoneColorNameMap[gameBoard1Turn],
        }">●</span></p>
        <p><span
            :style="{
                color: gameBoard1StoneColorNameMap[1],
            }">●</span>の数={{ gameBoard1StoneCount[1] }}</p>
        <p><span
            :style="{
                color: gameBoard1StoneColorNameMap[2],
            }">●</span>の数={{ gameBoard1StoneCount[2] }}</p>
        <p>連続パス回数={{ gameBoard1PassCount }}</p>
        <p>{{ gameBoard1IsEnd ? (gameIsFullCapacity() ? '満局' : '終局') : '' }}</p>

    </section>
    
    デバッグ：<br/>
    <p>マス番号:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ sq.toString().padStart(3, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>

    <p>石の色:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StoneColorArray[sq].toString().padStart(1, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>
    
    <p>石の状態:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StoneStateArray[sq].toString().padStart(2, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>

    <p>［飛び石スライディング・ウィンドウ］の最大量　＞　水平方向:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StonesMaxAmountOfSlidingWindowHorizontal[sq].toString().padStart(2, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>

    <p>［飛び石スライディング・ウィンドウ］の最大量　＞　垂直方向:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StonesMaxAmountOfSlidingWindowVertical[sq].toString().padStart(2, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>

    <p>［飛び石スライディング・ウィンドウ］の最大量　＞　バロック対角線:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal[sq].toString().padStart(2, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>

    <p>［飛び石スライディング・ウィンドウ］の最大量　＞　シニスター対角線:</p>
    <div
        class="mb-6"
    >
        <p
            v-for="rank in range(0, 15)"
            :key="rank"
        >
            <span
                v-for="sq in range(rank * 15, (rank + 1) * 15)"
                :key="sq"
            >
                {{ gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal[sq].toString().padStart(2, '0') }}&nbsp;
            </span><br/>
        </p>
    </div>


    <button-to-back-to-top class="sec-1 pt-6"/>
    <h2>ソースコード</h2>
    <section class="sec-2">
        <source-link/>
    </section>

    <button-to-back-to-top class="sec-0 pt-6"/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';
    import type { Ref } from 'vue';

    // ++++++++++++++++++++++++++++
    // + インポート　＞　アセット +
    // ++++++++++++++++++++++++++++

    import spriteBoard001Png from '@/assets/img/references/Sprite_Board_001.png';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    // アルファベット順
    import Button20250822 from '@/components/Button20250822.vue';
    import ButtonToBackToContents from '@/components/ButtonToBackToContents.vue';
    import ButtonToBackToTop from '@/components/ButtonToBackToTop.vue';
    import Comment from '@/components/Comment.vue';
    import GameMachineWaratch2 from '@/components/GameMachineWaratch2.vue';
    import SourceLink from '@/components/SourceLink.vue';
    import Stopwatch from '@/components/Stopwatch.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    // from 部分のアルファベット順
    import { isPlayerInputKey } from '@/composables/player-controller';
    import { range } from '@/composables/range';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++

    import type Rectangle from '@/interfaces/Rectangle';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheAppHeader from '@/pages/the-app-header.vue';


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++
    // + オブジェクト　＞　機能拡張 +
    // ++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１ +
    // ++++++++++++++++++++++++++++++++++++

    const gameMachine1Zoom = ref<number>(0.5);    // ズーム
    const gameMachine1Width = computed(()=>{
        //return 512;
        return tileBoard1FileNum.value * tileBoard1TileWidth.value;
    });
    const gameMachine1Height = computed(()=>{
        //return 512;
        return tileBoard1RankNum.value * tileBoard1TileHeight.value;
    });
    const gameMachine1IsPowerOn = ref<boolean>(false);  // 電源ボタンは演出です
    const gameMachine1IsPlaying = ref<boolean>(false);  // ゲーム中
    const gameMachine1IsPlayingPause = ref<boolean>(false); // ゲームは一時停止中
    const gameMachine1Visibility = ref<string>('hidden');
    const gameMachineRandomLimit: number = 2 * Math.PI * Math.E;    // 偏りのない乱数なら、マスをランダムに指定しても、マス目の数 × 2πe回試行すれば、すべてのマスをだいたい１回は訪問するという経験則（＾～＾）確率論の［クーポン収集問題（Coupon Collector's Problem）］よりでかい数。

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１　＞　ストップウォッチ１ +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const gameMachine1Stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null);

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１　＞　開始／終了ボタン１ +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const gameMachine1GameStartButton1Enabled = ref<boolean>(false);

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１　＞　一時停止／再開ボタン +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const gameMachine1GamePauseButton1Enabled = ref<boolean>(false);

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１　＞　お好み設定 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++

    const gameMachine1PreferencesIsShowing = ref<boolean>(false);

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++

    const player1Input = <Record<string, boolean>>{                     // 入力
        // アルファベット順
        " ": false, ArrowDown: false, ArrowLeft: false, ArrowUp: false, ArrowRight: false,
    };

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　タイル盤１ +
    // ++++++++++++++++++++++++++++++++

    // NOTE: ソース画像マップと、表示画面のスケールは等倍とします。変えると難しい。
    const tileBoard1TileWidth = ref<number>(32);    // マスの横幅（ピクセル）
    const tileBoard1TileHeight = ref<number>(32);   // マスの縦幅（ピクセル）
    const tileBoard1FileNum = ref<number>(15 + 2);  // 盤が横に何マスか
    const tileBoard1RankNum = ref<number>(15 + 2);  // 盤が縦に何マスか
    const tileBoard1Area = computed(()=>{   // 盤のマス数
        return tileBoard1FileNum.value * tileBoard1RankNum.value;
    });

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲーム盤１ +
    // ++++++++++++++++++++++++++++++++

    const ONE_WING_MAX_LENGTH = 4;  // 片翼（着手点を含まない）の最大長さ
    const GO_LENGTH = 5;    // ［五］の長さ
    const gameBoard1FileNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    const COLOR_EMPTY = 0; // 空きマス。石の色無し。
    const gameBoard1FileNum = ref<number>(15);  // 盤が横に何マスか
    const gameBoard1RankNum = ref<number>(15);  // 盤が縦に何マスか
    const gameBoard1Area = computed(()=>{
        return gameBoard1FileNum.value * gameBoard1RankNum.value;
    })
    const gameBoard1StoneShapeArray = ref<string[]>(new Array(gameBoard1Area.value).fill(''));    // 石の形
    for(let sq: number=0; sq<gameBoard1Area.value; sq++){
        gameBoard1StoneShapeArray.value[sq] = '●'
    }
    const gameBoard1StoneColorArray = ref<number[]>(new Array(gameBoard1Area.value).fill(0));    // 石の色
    const gameBoard1StoneColorNameMap: Record<number, string> = {
        0: 'transparent',
        1: '#C86868', // 明るい茶色
        2: '#289028', // 暗い緑
    }
    const gameBoard1DebugMessage = ref<string>('');   // デバッグ用メッセージ
    const gameBoard1StoneClickable = computed<
        (sq: number) => boolean
    >(()=>{    // マスをクリック可能か
        return (sq: number)=>{
            const isEmptySquare = gameBoard1StoneColorArray.value[sq] == 0; // 空マスだ
            return isEmptySquare && !gameBoard1IsEnd.value;
            // && isAdjacentToOpponentStone(sq)
        }
    });
    const gameBoard1Turn = ref<number>(0);
    const gameBoard1Times = ref<number>(0); // 何手目を終えたか。リバーシでは盤上の石の数に等しい
    const gameBoard1StoneCount = ref<number[]>([0, 0, 0]);   // 盤上のプレイヤーの石の数。[0] は未使用
    const gameBoard1PassCount = ref<number>(0); // 連続パス回数
    const gameBoard1IsEnd = ref<boolean>(false);    // 終局しているか
    const gameBoard1StonesMaxAmountOfSlidingWindowHorizontal = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上で石が水平方向に（飛び飛びでも）続いている石の数
    const gameBoard1StonesMaxAmountOfSlidingWindowVertical = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の垂直方向
    const gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の左下から右上に上がる対角線方向
    const gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の左上から右下に下がる体格線方向

    // 水平方向に並ぶ［五］の一部の石なら 1 を、
    // 垂直方向に並ぶ［五］の一部の石なら 2 を、
    // バロック対角線方向に並ぶ［五］の一部の石なら 4 を、
    // シニスター対角線方向に並ぶ［五］の一部の石なら 8 を、
    // ［死に石］なら 16 を入れる。
    const STONE_STATE_NONE = 0;
    const STONE_STATE_ALIVE_HORIZONTAL = 1;
    const STONE_STATE_ALIVE_VERTICAL = 2;
    const STONE_STATE_ALIVE_BAROQUE_DIAGONAL = 4;
    const STONE_STATE_ALIVE_SINISTER_DIAGONAL = 8;
    const RUNS_SLIDING_WINDOW_DEAD = -1;
    function isAliveStone(sq: number) : boolean {
        return 1 <= gameBoard1StoneStateArray.value[sq] && gameBoard1StoneStateArray.value[sq] <= 15;
    }
    const gameBoard1StoneStateArray = ref<Array<number>>(new Array(gameBoard1Area.value).fill(STONE_STATE_NONE));

    // ボタンの背景画像（のタイル位置の矩形）
    const gameBoard1SquareSrcTilemapRect = computed<
        (sq: number)=>Rectangle
    >(()=>{
        return (sq: number)=>{

            // ++++++++++++++++
            // + 死に石タイル +
            // ++++++++++++++++

            if (
                // 4方向が［死に方向］なら、［死に石］だ
                gameBoard1StonesMaxAmountOfSlidingWindowHorizontal.value[sq] == RUNS_SLIDING_WINDOW_DEAD
                && gameBoard1StonesMaxAmountOfSlidingWindowVertical.value[sq] == RUNS_SLIDING_WINDOW_DEAD
                && gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal.value[sq] == RUNS_SLIDING_WINDOW_DEAD
                && gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal.value[sq] == RUNS_SLIDING_WINDOW_DEAD
            ) {
                function getKey(sq: number) : string {
                    if (isNorthwestCorner(sq)) {    // 左上隅
                        return 'bgDead-gridLines-06';
                    }
                    
                    if (isNortheastCorner(sq)) {    // 右上隅
                        return 'bgDead-gridLines-12';
                    }

                    if (isSouthwestCorner(sq)) {    // 左下隅
                        return 'bgDead-gridLines-03';
                    }
                    
                    if (isSoutheastCorner(sq)) {    // 右下隅
                        return 'bgDead-gridLines-09';
                    }
                    
                    if (isNorthEdge(sq)) {  // 上辺
                        return 'bgDead-gridLines-14';
                    }
                    
                    if (isWestEdge(sq)) {    // 左辺
                        return 'bgDead-gridLines-07';
                    }

                    if (isEastEdge(sq)) {    // 右辺
                        return 'bgDead-gridLines-13';
                    }
                    
                    if (isSouthEdge(sq)) {  // 下辺
                        return 'bgDead-gridLines-11';
                    }

                    // 盤中
                    return 'bgDead-gridLines-15';
                }

                return gameBoard1SourceTilemap1Frames[getKey(sq)];
            }

            // ++++++++++++++++
            // + 生き石タイル +
            // ++++++++++++++++

            if (isAliveStone(sq)) {
                function getKey(sq: number) : string {
                    if (isNorthwestCorner(sq)) {    // 左上隅
                        return 'vacantLand-skyBlueMarker-gridLines-06';
                    }
                    
                    if (isNortheastCorner(sq)) {    // 右上隅
                        return 'vacantLand-skyBlueMarker-gridLines-12';
                    }

                    if (isSouthwestCorner(sq)) {    // 左下隅
                        return 'vacantLand-skyBlueMarker-gridLines-03';
                    }
                    
                    if (isSoutheastCorner(sq)) {    // 右下隅
                        return 'vacantLand-skyBlueMarker-gridLines-09';
                    }
                    
                    if (isNorthEdge(sq)) {  // 上辺
                        return 'vacantLand-skyBlueMarker-gridLines-14';
                    }
                    
                    if (isWestEdge(sq)) {    // 左辺
                        return 'vacantLand-skyBlueMarker-gridLines-07';
                    }

                    if (isEastEdge(sq)) {    // 右辺
                        return 'vacantLand-skyBlueMarker-gridLines-13';
                    }
                    
                    if (isSouthEdge(sq)) {  // 下辺
                        return 'vacantLand-skyBlueMarker-gridLines-11';
                    }

                    // 盤中
                    return 'vacantLand-skyBlueMarker-gridLines-15';
                }

                return gameBoard1SourceTilemap1Frames[getKey(sq)];
            }

            // ++++++++++++++++
            // + 飛び石タイル +
            // ++++++++++++++++

            // 水平、垂直、バロック対角線、シニスター対角線のうち、最も接続数の多いもの：
            const conn = Math.max(
                gameBoard1StonesMaxAmountOfSlidingWindowHorizontal.value[sq], // 水平
                gameBoard1StonesMaxAmountOfSlidingWindowVertical.value[sq],   // 垂直
                gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal.value[sq],    // バロック対角線
                gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal.value[sq],   // シニスター対角線
            );

            function getKey(
                sq: number,
                conn: number,
            ) : string {

                function getKeyByConn(
                    conn: number,
                    vanilla: string,
                    yellowMarker: string,
                    greenMarker: string,
                    blueMarker: string
                ) : string {
                    if (conn <= 1) {
                        return vanilla;
                    }

                    if (conn == 2) {
                        return yellowMarker;
                    }

                    if (conn == 3) {
                        return greenMarker;
                    }

                    // ［四］以上は全部この色
                    return blueMarker;
                }
                
                if (isNorthwestCorner(sq)) {    // 左上隅
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-06',
                        'vacantLand-yellowMarker-gridLines-06',
                        'vacantLand-greenMarker-gridLines-06',
                        'vacantLand-blueMarker-gridLines-06'
                    );
                }
                
                if (isNortheastCorner(sq)) {    // 右上隅
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-12',
                        'vacantLand-yellowMarker-gridLines-12',
                        'vacantLand-greenMarker-gridLines-12',
                        'vacantLand-blueMarker-gridLines-12'
                    );
                }

                if (isSouthwestCorner(sq)) {    // 左下隅
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-03',
                        'vacantLand-yellowMarker-gridLines-03',
                        'vacantLand-greenMarker-gridLines-03',
                        'vacantLand-blueMarker-gridLines-03'
                    );
                }
                
                if (isSoutheastCorner(sq)) {    // 右下隅
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-09',
                        'vacantLand-yellowMarker-gridLines-09',
                        'vacantLand-greenMarker-gridLines-09',
                        'vacantLand-blueMarker-gridLines-09'
                    );
                }
                
                if (isNorthEdge(sq)) {  // 上辺
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-14',
                        'vacantLand-yellowMarker-gridLines-14',
                        'vacantLand-greenMarker-gridLines-14',
                        'vacantLand-blueMarker-gridLines-14'
                    );
                }
                
                if (isWestEdge(sq)) {    // 左辺
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-07',
                        'vacantLand-yellowMarker-gridLines-07',
                        'vacantLand-greenMarker-gridLines-07',
                        'vacantLand-blueMarker-gridLines-07'
                    );
                }

                if (isEastEdge(sq)) {    // 右辺
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-13',
                        'vacantLand-yellowMarker-gridLines-13',
                        'vacantLand-greenMarker-gridLines-13',
                        'vacantLand-blueMarker-gridLines-13'
                    );
                }
                
                if (isSouthEdge(sq)) {  // 下辺
                    return getKeyByConn(
                        conn,
                        'vacantLand-gridLines-11',
                        'vacantLand-yellowMarker-gridLines-11',
                        'vacantLand-greenMarker-gridLines-11',
                        'vacantLand-blueMarker-gridLines-11'
                    );
                }
                
                // 盤中
                return getKeyByConn(
                    conn,
                    'vacantLand-gridLines-15',
                    'vacantLand-yellowMarker-gridLines-15',
                    'vacantLand-greenMarker-gridLines-15',
                    'vacantLand-blueMarker-gridLines-15'
                );
            }

            return gameBoard1SourceTilemap1Frames[getKey(sq, conn)];
        };
    });
    const gameBoard1SquareBackgroundPosition = computed<
        (sq: number)=>string
    >(()=>{
        return (sq: number)=>{
            // マスの画像は、［石の接続数］の影響を受ける

            const rect = gameBoard1SquareSrcTilemapRect.value(sq);
            return `${-rect.left}px ${-rect.top}px`;
        };
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲーム盤１　＞　元タイルマップ１ +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

    const w = tileBoard1TileWidth.value;   // tlie width
    const h = tileBoard1TileHeight.value;
    const gw = 3 * w;   // tile group width
    const gh = 4 * h;   // tile group height
    //
    // 八方罫線魔法陣
    //
    // 008 016 001
    // 168     032
    // 004 064 002
    //
    // 四方罫線魔法陣
    //
    //    01
    // 08    02
    //    04
    //
    const gameBoard1SourceTilemap1Frames : Record<string, Rectangle> = {
        // 0*gh 0*gw
        'vacantLand-1'                          : {top: 0*gh + 0*h, left: 0*gw + 0*w, width: w, height: h},    // 更地
        'vacantLand-gridLines-06'               : {top: 0*gh + 1*h, left: 0*gw + 0*w, width: w, height: h},  // ┌
        'vacantLand-gridLines-14'               : {top: 0*gh + 1*h, left: 0*gw + 1*w, width: w, height: h},  // ┬
        'vacantLand-gridLines-12'               : {top: 0*gh + 1*h, left: 0*gw + 2*w, width: w, height: h},  // ┐
        'vacantLand-gridLines-07'               : {top: 0*gh + 2*h, left: 0*gw + 0*w, width: w, height: h},  // ├
        'vacantLand-gridLines-15'               : {top: 0*gh + 2*h, left: 0*gw + 1*w, width: w, height: h},  // ┼
        'vacantLand-gridLines-13'               : {top: 0*gh + 2*h, left: 0*gw + 2*w, width: w, height: h},  // ┤
        'vacantLand-gridLines-03'               : {top: 0*gh + 3*h, left: 0*gw + 0*w, width: w, height: h},  // └
        'vacantLand-gridLines-11'               : {top: 0*gh + 3*h, left: 0*gw + 1*w, width: w, height: h},  // ┴
        'vacantLand-gridLines-09'               : {top: 0*gh + 3*h, left: 0*gw + 2*w, width: w, height: h},  // ┘
        // 0*gh 1*gw
        'vacantLand-yellowMarker-1'             : {top: 0*gh + 0*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-06'  : {top: 0*gh + 1*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-14'  : {top: 0*gh + 1*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-12'  : {top: 0*gh + 1*h, left: 1*gw + 2*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-07'  : {top: 0*gh + 2*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-15'  : {top: 0*gh + 2*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-13'  : {top: 0*gh + 2*h, left: 1*gw + 2*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-03'  : {top: 0*gh + 3*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-11'  : {top: 0*gh + 3*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-yellowMarker-gridLines-09'  : {top: 0*gh + 3*h, left: 1*gw + 2*w, width: w, height: h},
        // 0*gh 2*gw
        'vacantLand-greenMarker-1'              : {top: 0*gh + 0*h, left: 2*gw + 0*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-06'   : {top: 0*gh + 1*h, left: 2*gw + 0*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-14'   : {top: 0*gh + 1*h, left: 2*gw + 1*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-12'   : {top: 0*gh + 1*h, left: 2*gw + 2*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-07'   : {top: 0*gh + 2*h, left: 2*gw + 0*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-15'   : {top: 0*gh + 2*h, left: 2*gw + 1*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-13'   : {top: 0*gh + 2*h, left: 2*gw + 2*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-03'   : {top: 0*gh + 3*h, left: 2*gw + 0*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-11'   : {top: 0*gh + 3*h, left: 2*gw + 1*w, width: w, height: h},
        'vacantLand-greenMarker-gridLines-09'   : {top: 0*gh + 3*h, left: 2*gw + 2*w, width: w, height: h},
        // 1*gh 0*gw
        'vacantLand-blueMarker-1'               : {top: 1*gh + 0*h, left: 0*gw + 0*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-06'    : {top: 1*gh + 1*h, left: 0*gw + 0*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-14'    : {top: 1*gh + 1*h, left: 0*gw + 1*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-12'    : {top: 1*gh + 1*h, left: 0*gw + 2*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-07'    : {top: 1*gh + 2*h, left: 0*gw + 0*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-15'    : {top: 1*gh + 2*h, left: 0*gw + 1*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-13'    : {top: 1*gh + 2*h, left: 0*gw + 2*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-03'    : {top: 1*gh + 3*h, left: 0*gw + 0*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-11'    : {top: 1*gh + 3*h, left: 0*gw + 1*w, width: w, height: h},
        'vacantLand-blueMarker-gridLines-09'    : {top: 1*gh + 3*h, left: 0*gw + 2*w, width: w, height: h},
        // 1*gh 1*gw
        'vacantLand-skyBlueMarker-1'            : {top: 1*gh + 0*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-06' : {top: 1*gh + 1*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-14' : {top: 1*gh + 1*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-12' : {top: 1*gh + 1*h, left: 1*gw + 2*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-07' : {top: 1*gh + 2*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-15' : {top: 1*gh + 2*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-13' : {top: 1*gh + 2*h, left: 1*gw + 2*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-03' : {top: 1*gh + 3*h, left: 1*gw + 0*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-11' : {top: 1*gh + 3*h, left: 1*gw + 1*w, width: w, height: h},
        'vacantLand-skyBlueMarker-gridLines-09' : {top: 1*gh + 3*h, left: 1*gw + 2*w, width: w, height: h},
        // 1*gh 2*gw
        'bgDead-1'                              : {top: 1*gh + 0*h, left: 2*gw + 0*w, width: w, height: h},
        'bgDead-gridLines-06'                   : {top: 1*gh + 1*h, left: 2*gw + 0*w, width: w, height: h},
        'bgDead-gridLines-14'                   : {top: 1*gh + 1*h, left: 2*gw + 1*w, width: w, height: h},
        'bgDead-gridLines-12'                   : {top: 1*gh + 1*h, left: 2*gw + 2*w, width: w, height: h},
        'bgDead-gridLines-07'                   : {top: 1*gh + 2*h, left: 2*gw + 0*w, width: w, height: h},
        'bgDead-gridLines-15'                   : {top: 1*gh + 2*h, left: 2*gw + 1*w, width: w, height: h},
        'bgDead-gridLines-13'                   : {top: 1*gh + 2*h, left: 2*gw + 2*w, width: w, height: h},
        'bgDead-gridLines-03'                   : {top: 1*gh + 3*h, left: 2*gw + 0*w, width: w, height: h},
        'bgDead-gridLines-11'                   : {top: 1*gh + 3*h, left: 2*gw + 1*w, width: w, height: h},
        'bgDead-gridLines-09'                   : {top: 1*gh + 3*h, left: 2*gw + 2*w, width: w, height: h},
    };


    // ######################
    // # イベントハンドラー #
    // ######################

    // ++++++++++++++++++++++++++++++++++++++
    // + イベントハンドラー　＞　開始／終了 +
    // ++++++++++++++++++++++++++++++++++++++

    onMounted(()=>{

        // キーボード操作の設定
        //
        //      window はブラウザーのオブジェクトなので、（サーバー側ではプリレンダリングできないので）マウント後にアクセスします。
        //
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // スペース、上下キーの場合
            if (e.key == ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                e.preventDefault();
            }

            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (isPlayerInputKey(e.key)) {  // 型ガード
                player1Input[e.key] = false;
            }
        });

        gamePowerOn();  // 電源を入れる演出
        gameLoopStart();    // 入力処理、描画を行います
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++
    // + イベントハンドラー　＞　ゲームマシン・ボタン +
    // ++++++++++++++++++++++++++++++++++++++++++++++++

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

        gameBoard1DebugMessage.value = `スペース・キーを押下しました。`;
        // test
        const BLACK = 1;    // 自石の色
        const OPPONENT_COLOR = opponentColor(BLACK);
        const START_SQ = 7; // 着手点
        const FWD_DIRECTION = eastOf; // 順方向
        const REV_DIRECTION = westOf; // 逆方向
        const oneWing = locateDirectionalLine(
            START_SQ,
            ONE_WING_MAX_LENGTH,
            FWD_DIRECTION,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(OPPONENT_COLOR, sq), // break 条件
        );
        console.log(`TEST: oneWing=${oneWing}`);

        const testNineRuns1 = locateRunsCapacity(
            START_SQ,
            FWD_DIRECTION,
            REV_DIRECTION,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(OPPONENT_COLOR, sq), // break 条件
        );
        console.log(`TEST: testRuns1=${testNineRuns1}`);

        const testNineRunsSquares1 = locateRunsCapacity(
            START_SQ,
            FWD_DIRECTION,
            REV_DIRECTION,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(OPPONENT_COLOR, sq), // break 条件
        );
        const isDeadRuns1 = isDeadCapacity(
            testNineRunsSquares1,
        );
        console.log(`TEST: isDeadRuns=${isDeadRuns1} color=${BLACK}`);

        const aStoneIsDeadHorizontal1 = aStoneIsDeadHorizontal(
            BLACK,
            START_SQ,
        );
        console.log(`TEST: aStoneIsDeadHorizontal1=${aStoneIsDeadHorizontal1} color=${BLACK} startSq=${START_SQ}`);
        // if (isDeadStone1) {
        // TODO:     directionalSolidLineArray.value[START_SQ] = 'Dead';
        // }

        const eightWayIntersection = locateEightWayIntersectionFriends(
            START_SQ,
            ONE_WING_MAX_LENGTH,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(OPPONENT_COLOR, sq), // break 条件
        );
        console.log(`TEST: eightWayIntersection=${eightWayIntersection} color=${BLACK} startSq=${START_SQ} ONE_WING_MAX_LENGTH=${ONE_WING_MAX_LENGTH}`);

        const inputArray : number[] = locateForInputArray(
            START_SQ,
            FWD_DIRECTION,
            REV_DIRECTION,
        );
        console.log(`TEST: inputArray=${inputArray}`);
    }


    function onSpaceButtonReleased() : void {
        player1Input[" "] = false;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++
    // + イベントハンドラー　＞　外付けシステムボタン +
    // ++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * 電源ボタン押下時
     */
    function onGamePowerOnButtonPushed() : void {
        if(gameMachine1IsPowerOn.value) {
            gamePowerOff();
            return;
        }

        gamePowerOn();
    }


    /**
     * ［▶］（再生）または［⏹］（停止）ボタン押下時。（状態により切り替わります）
     */
    function onGameStartOrEndButtonPushed() : void {
        if(gameMachine1IsPlaying.value) {
            gameStop();
            return;
        }

        gameStart();
    }


    /**
     * ［⏸］（一時停止）または［⏯］（再開）ボタン押下時。（状態により切り替わります）
     */
    function onGamePauseOrRestartButtonPushed() : void {
        if(gameMachine1IsPlayingPause.value) {
            // FIXME: ゲーム終了時にリスタートすると、タイマーが負に進んでしまう。
            gameMachine1Stopwatch1Ref.value?.timerStart();  // タイマーをスタート
        } else {
            gameMachine1Stopwatch1Ref.value?.timerStop();  // タイマーをストップ
        }

        gameMachine1IsPlayingPause.value = !gameMachine1IsPlayingPause.value;
    }


    /**
     * ［お好み設定パネル１］を開くボタン。
     */
    function onGamePreferences1ButtonPressed() : void {
        gameMachine1PreferencesIsShowing.value = !gameMachine1PreferencesIsShowing.value;
    }

    // ++++++++++++++++++++++++++++++++++++++
    // + イベントハンドラー　＞　ゲーム盤１ +
    // ++++++++++++++++++++++++++++++++++++++

    /**
     * 
     * @param sq （0から始まる）マス番号
     */
    function onGameBoard1Clicked(sq: number) : void {
        //gameBoard1DebugMessage.value = `sq=${sq}`;

        const color = gameBoard1Turn.value;   // Math.floor(Math.random() * 2) + 1;
        putStone(sq, color);  // 石が置けなくても、とくに対応しません
    }


    /**
     * TODO: sq を符号に変換
     * @param sq 
     */
    function sqToCode(sq: number) : string {
        const BOARD_WIDTH = 15;
        const BOARD_HEIGHT = 15;
        const file = sq % BOARD_WIDTH;
        const rank = Math.floor(sq / BOARD_WIDTH);
        return `${gameBoard1FileNameArray[file]}${BOARD_HEIGHT-rank}`
    }


    /**
     * 石を置く
     * @param moveSq 
     * @param color 
     */
    function putStone(moveSq: number, color: number) : boolean {
        if (!gameBoard1StoneClickable.value(moveSq)) {  // 石を置けないマスなら
            return false;
        }

        // sq を符号に変換したい。
        console.log(`DEBUG: [putStone] code=${sqToCode(moveSq)}`);

        gameBoard1StoneColorArray.value[moveSq] = color;    // 盤上に石を置く

        const friendColor = gameBoard1Turn.value;   // 自石の色
        const opponentColor1 = opponentColor(friendColor);

        // チェックすべき自石が置いてあるマス。起点を含まない
        const friendStoneLocations = locateEightWayIntersectionFriends(
            moveSq,
            ONE_WING_MAX_LENGTH,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),    // break 条件
        );

        // ［飛び石スライディング・ウィンドウ］の最大数を記入します
        [
            moveSq,
            ...friendStoneLocations
        ].forEach((resonanceSq, _index, _array)=>{
            // 着手した石及び、着手によって影響を受ける自石を resonance と呼ぶことにして、それらのつながりを更新します

            // 水平方向
            let inputArray : number[] = locateForInputArray(
                resonanceSq,
                eastOf,
                westOf,
            );
            let maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                inputArray,
                friendColor,
            );
            gameBoard1StonesMaxAmountOfSlidingWindowHorizontal.value[resonanceSq] = maxAmount;

            // 垂直方向
            inputArray = locateForInputArray(
                resonanceSq,
                northOf,
                southOf,
            );
            maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                inputArray,
                friendColor,
            );
            gameBoard1StonesMaxAmountOfSlidingWindowVertical.value[resonanceSq] = maxAmount;

            // バロック対角線方向
            inputArray = locateForInputArray(
                resonanceSq,
                northeastOf,
                southwestOf,
            );
            maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                inputArray,
                friendColor,
            );
            gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal.value[resonanceSq] = maxAmount;

            // シニスター対角線方向
            inputArray = locateForInputArray(
                resonanceSq,
                southeastOf,
                northwestOf,
            );
            maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                inputArray,
                friendColor,
            );
            gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal.value[resonanceSq] = maxAmount;
        });

        // ［割り打ち］処理
        executeWariuchi(friendColor, moveSq);

        // ［五］の処理
        fiveStonesProcessingAllDirections(
            color,  // 自石の色
            moveSq,
        );

        gameBoard1Turn.value = opponentColor(gameBoard1Turn.value); // （チェック後に）相手の色に変更
        gameBoard1Times.value += 1;
        gameBoard1StoneCount.value[color] += 1;
        gameBoard1PassCount.value = 0;  // リセット
        return true;
    }

    // ################
    // # サブルーチン #
    // ################

    // ++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　外付けシステムボタン +
    // ++++++++++++++++++++++++++++++++++++++++++

    function gamePowerOn() : void {
        gameMachine1GameStartButton1Enabled.value = true;
        gameMachine1Visibility.value = 'visible';
        gameMachine1IsPowerOn.value = true;

        gameInit(); // ゲームの初期化
    }


    function gamePowerOff() : void {
        if(gameMachine1IsPlaying.value) {    // ゲーム中なら、停止させます
            gameStop();
        }

        gameMachine1GameStartButton1Enabled.value = false;
        gameMachine1Visibility.value = 'hidden';
        gameMachine1IsPowerOn.value = false;
    }


    function gameStart() : void {
        gameMachine1Stopwatch1Ref.value?.timerStart();  // タイマーをスタート
        gameMachine1GamePauseButton1Enabled.value = true;
        gameMachine1IsPlaying.value = !gameMachine1IsPlaying.value;
    }


    function gameStop() : void {
        gameMachine1GamePauseButton1Enabled.value = false;
        gameInit(); // ゲームは終了したので、初期状態に戻します
    }

    // ++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム +
    // ++++++++++++++++++++++++++++

    /**
     * ゲームの初期化
     */
    function gameInit() : void {
        //gameBoard1DebugMessage.value = "ゲームの初期化";
        gameMachine1Stopwatch1Ref.value?.timerReset();  // タイマーをリセット

        // 外付けシステムボタンをリセット
        gameMachine1IsPlaying.value = false;
        gameMachine1IsPlayingPause.value = false;

        // ++++++++++++++++++++++++++
        // + ゲームデータをリセット +
        // ++++++++++++++++++++++++++

        // 盤の初期化
        for(let sq: number=0; sq<gameBoard1Area.value; sq++){
            gameBoard1StoneColorArray.value[sq] = 0;    // 空マス

            // マス上で自石が（飛び飛びでも）続いている数
            gameBoard1StonesMaxAmountOfSlidingWindowHorizontal.value[sq] = 0;
            gameBoard1StonesMaxAmountOfSlidingWindowVertical.value[sq] = 0;
            gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal.value[sq] = 0;
            gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal.value[sq] = 0;

            // マス上で自石が（隙間なく）連続しているとみたときの状態
            gameBoard1StoneStateArray.value[sq] = STONE_STATE_NONE;
        }

        gameBoard1Times.value = 0;
        gameBoard1Turn.value = 1;
        gameBoard1StoneCount.value[1] = 0;
        gameBoard1StoneCount.value[2] = 0;
        gameBoard1PassCount.value = 0;
        gameBoard1IsEnd.value = false;

        //gameMachine1Score.value = 0;
        //gameMachine1ScheduleStep.value = 0;
        //star1Visibility.value = 'hidden';
    }


    /**
     * ゲームのメインループ開始
     */
    function gameLoopStart() : void {
        const update = () => {

            // ++++++++++++++++++++++++
            // + モーション・タイマー +
            // ++++++++++++++++++++++++

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // + モーション・ウェイトが０のとき、モーションのクリアー +
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            // ++++++++++++++++++++++++++++++
            // + キー入力をモーションに変換 +
            // ++++++++++++++++++++++++++++++

            if (player1Input[' ']) {
                if (!gameBoard1IsEnd.value) { // 終局していたら、何もしない
                    const color = gameBoard1Turn.value;   // Math.floor(Math.random() * 2) + 1;
                    let itsOk = false;
                    let count = 0;
                    while(!itsOk && count <= gameMachineRandomLimit) {
                        // 適当に石を置く
                        const sq = Math.floor(Math.random() * gameBoard1Area.value);
                        itsOk = putStone(sq, color);
                        count += 1;
                    }

                    if (!itsOk) {   // 確率的に置けなかったら、本当に置けないか確認
                        let lastSq = -1;
                        for(let sq: number=0; sq<gameBoard1Area.value; sq++) {
                            if (gameBoard1StoneClickable.value(sq)) {   // クリック可能（石を置ける）
                                lastSq = sq;
                                break;
                            }
                        }

                        if (lastSq==-1) {   // どこにも石を置けなかった
                            gamePass(); // パス

                            if (2 <= gameBoard1PassCount.value) {
                                // パスが２回続いたら終局
                                gameBoard1IsEnd.value = true;
                            }

                        } else {
                            itsOk = putStone(lastSq, color);    // 必ず置けるはず
                            if (!itsOk) {
                                throw Error(`石を置けなかった。 lastSq=${lastSq} color=${color}`);
                            }
                        }
                    }

                    if (gameIsFullCapacity()) {
                        // 満局なら終局
                        gameBoard1IsEnd.value = true;
                    }
                }

                player1Input[' '] = false;
            }

            // ++++++++++++++++++++++++++++++
            // + 向き・移動・ウェイトを更新 +
            // ++++++++++++++++++++++++++++++

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }

    // ++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１ +
    // ++++++++++++++++++++++++++++++++

    /**
     * 相手の石の色に変更
     * @param color 自分の石の色
     */
    function opponentColor(color: number) : number {
        return color % 2 + 1;   // 1 なら 2 に、2 なら 1 に
    }


    function fiveStonesProcessingAllDirections(
        friendColor: number,    // 自石の色
        aStoneSq: number,   // 打った場所。自石が置いている前提。 FIXME: 空点の場所のケースもある
    ) : void {
        fiveStonesProcessingOneDirection(    // 水平方向
            friendColor,
            aStoneSq,
            eastOf,
            westOf,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_HORIZONTAL,
        );
        fiveStonesProcessingOneDirection(    // 垂直方向
            friendColor,
            aStoneSq,
            northOf,
            southOf,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_VERTICAL,
        );
        fiveStonesProcessingOneDirection(    // バロック対角線方向
            friendColor,
            aStoneSq,
            northeastOf,
            southwestOf,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_BAROQUE_DIAGONAL,
        );
        fiveStonesProcessingOneDirection(    // シニスター対角線方向
            friendColor,
            aStoneSq,
            southeastOf,
            northwestOf,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_SINISTER_DIAGONAL,
        );
    }

    /**
     * ［五］の処理。
     * 内訳は、走査（スキャン）、判定（ジャッジメント）、記入（チェック）
     * 
     * @param friendColor 
     * @param startSq 
     * @param nextOf 
     * @param backOf 
     * @param directionalStoneStateArray 
     * @param aliveDirection 
     */
    function fiveStonesProcessingOneDirection(
        friendColor: number,    // 自石の色
        startSq: number,    // 打った場所。自石が置いている前提。 FIXME: 空点の場所のケースもある
        nextOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
        directionalStoneStateArray: Ref<Array<number>>,
        aliveDirection: number,
    ) : void {
        const opponentColor1 = opponentColor(friendColor);

        const runsNineSquares = locateRunsCapacity(
            startSq,
            nextOf,
            backOf,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),   // break 条件
        );

        const continuityStones: number[] = [];  // 連続している自石のマス番号

        function processingContinuityStones() : void {
            if (5 <= continuityStones.length) {   // ［五］ができていたら
                continuityStones.forEach((sq, _index, _array)=>{
                    directionalStoneStateArray.value[sq] |= aliveDirection; // 論理和
                });
            }

            continuityStones.length = 0;    // クリアー
        }

        runsNineSquares.forEach((sq, _index, _array)=>{
            // 盤外、相手の石は含まない

            // 自石なら
            if (gameBoard1StoneColorArray.value[sq] == friendColor) {
                continuityStones.push(sq);

            // 自石でなければ
            } else {
                processingContinuityStones();
            }
        });

        processingContinuityStones();
    }


    /**
     * 各石の［飛び石］の長さの数え上げ
     */
    function countingMaxAmountOfSlidingWindow(
        slidingWindowArray: number[][],
        friendColor: number,    // 自石の色
    ) : number {
        let maxCount = 0;

        slidingWindowArray.forEach((slidingWindow, _index, _array)=>{
            let count = 0;
            slidingWindow.forEach((sq, _index, _array)=>{
                if (gameBoard1StoneColorArray.value[sq] == friendColor) {
                    count += 1;
                }
            });
            maxCount = Math.max(count, maxCount);
        });

        return maxCount;
    }


    /**
     * ［割り打ちの石］処理
     *
     * 例えば、相手に次のような［四］ができているところへ、
     *
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * |.|o|o|o|.|o|.|.|.|
     * +-+-+-+-+-+-+-+-+-+
     *
     * 以下のように [4] に割り打てば、［三］と［一］に減らせるはずです。
     *
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * |.|o|o|o|x|o|.|.|.|
     * +-+-+-+-+-+-+-+-+-+
     * 
     * この仕掛けとしては、
     *
     *          0 1 2 3 4 5 6 7 8
     *         +-+-+-+-+-+-+-+-+-+
     *         |.|o|o|o|x|o|.|.|.|
     *         +-+-+-+-+-+-+-+-+-+
     * -4-3-2-1 0 1 2 3 4
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|.|O|.|.|.|.|
     * +-+-+-+-+-+-+-+-+-+
     *                    5 6 7 8 9101112
     *                 +-+-+-+-+-+-+-+-+-+
     *                 |.|.|.|.|O|.|.|.|.|
     *                 +-+-+-+-+-+-+-+-+-+
     *
     * [0] と [8] のマスを起点に相手側の［飛び石スライディング・ウィンドウ］の最長数を更新すればよいはずです。
     * ただし、以下の局面では：
     *
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * |.|x|o|o|.|o|.|.|.|
     * +-+-+-+-+-+-+-+-+-+
     *
     * [4] に割り打てば、［零］と［一］に減らせるはずです。
     * この仕掛けとしては、
     *
     *          0 1 2 3 4 5 6 7 8
     *         +-+-+-+-+-+-+-+-+-+
     *         |.|x|o|o|x|o|.|.|.|
     *         +-+-+-+-+-+-+-+-+-+
     *     -2-1 0 1 2 3 4 5 6
     *     +-+-+-+-+-+-+-+-+-+
     *     |.|.|.|.|O|.|.|.|.|
     *     +-+-+-+-+-+-+-+-+-+
     *
     * [0] ではなく、例えば [2] を起点とするべきです。
     * [0] では肝心の [2], [3] が更新されません。
     *
     * @param friendColor 
     * @param moveSq 着手点 
     */
    function executeWariuchi(
        friendColor: number,
        moveSq: number
    ) : void {
        const opponentColor1 = opponentColor(friendColor);

        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // + （途切れた）相手の石のつながりをチェックします +
        // ++++++++++++++++++++++++++++++++++++++++++++++++++

        function opponentStonesCheckRunsOneDirection(
            nextOpponentStones: number[],
            backOpponentStones: number[],
            nextOf: (sq: number)=>number,
            backOf: (sq: number)=>number,
            directionalRunsArray: Ref<number[]>,
        ) : void {
            //console.log(`DEBUG: [Opponent Wing] startSq=${startSq} friendColor=${friendColor} opponentColor1=${opponentColor1}`);

            nextOpponentStones.forEach((opponentStoneSq, _index, _array)=>{
                const inputArray : number[] = locateForInputArray(
                    opponentStoneSq,
                    nextOf,
                    backOf,
                );
                const maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                    inputArray,
                    opponentColor1,
                );
                directionalRunsArray.value[opponentStoneSq] = maxAmount;
            });


            backOpponentStones.forEach((opponentStoneSq, _index, _array)=>{
                const inputArray : number[] = locateForInputArray(
                    opponentStoneSq,
                    nextOf,
                    backOf,
                );
                const maxAmount = aStoneCountingMaxAmountOfSlidingWindowPerDirection(
                    inputArray,
                    opponentColor1,
                );
                directionalRunsArray.value[opponentStoneSq] = maxAmount;
            });
        }

        // 水平方向
        let nextOpponentStones = locateDirectionalLine(   // 順ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            eastOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        let backOpponentStones = locateDirectionalLine(   // 逆ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            westOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        opponentStonesCheckRunsOneDirection(
            nextOpponentStones,
            backOpponentStones,
            eastOf,
            westOf,
            gameBoard1StonesMaxAmountOfSlidingWindowHorizontal,
        );
        // 相手の［死に石］を記入
        stonesCheckDeadHorizontal(nextOpponentStones, opponentColor1);
        stonesCheckDeadHorizontal(backOpponentStones, opponentColor1);

        // 垂直方向
        nextOpponentStones = locateDirectionalLine(   // 順ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            southOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        backOpponentStones = locateDirectionalLine(   // 逆ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            northOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        opponentStonesCheckRunsOneDirection(
            nextOpponentStones,
            backOpponentStones,
            southOf,
            northOf,
            gameBoard1StonesMaxAmountOfSlidingWindowVertical,
        );
        // 相手の［死に石］を記入
        stonesCheckDeadVertical(nextOpponentStones, opponentColor1);
        stonesCheckDeadVertical(backOpponentStones, opponentColor1);

        // バロック対角線方向
        nextOpponentStones = locateDirectionalLine(   // 順ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            northeastOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        backOpponentStones = locateDirectionalLine(   // 逆ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            southwestOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        opponentStonesCheckRunsOneDirection(
            nextOpponentStones,
            backOpponentStones,
            northeastOf,
            southwestOf,
            gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal,
        );
        // 相手の［死に石］を記入
        stonesCheckDeadBaroqueDiagonal(nextOpponentStones, opponentColor1);
        stonesCheckDeadBaroqueDiagonal(backOpponentStones, opponentColor1);

        // シニスター対角線方向
        nextOpponentStones = locateDirectionalLine(   // 順ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            southeastOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        backOpponentStones = locateDirectionalLine(   // 逆ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            ONE_WING_MAX_LENGTH,
            northwestOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(friendColor, sq),   // break 条件
        );
        opponentStonesCheckRunsOneDirection(
            nextOpponentStones,
            backOpponentStones,
            southeastOf,
            northwestOf,
            gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal,
        );
        // 相手の［死に石］を記入
        stonesCheckDeadSinisterDiagonal(nextOpponentStones, opponentColor1);
        stonesCheckDeadSinisterDiagonal(backOpponentStones, opponentColor1);
    }


    /**
     * パス
     */
    function gamePass() : void {
        gameBoard1Times.value += 1;
        gameBoard1PassCount.value += 1;
        gameBoard1Turn.value = opponentColor(gameBoard1Turn.value);
    }


    /**
     * 満局か
     */
    function gameIsFullCapacity() : boolean {
        return gameBoard1Area.value <= gameBoard1StoneCount.value[1] + gameBoard1StoneCount.value[2];
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１　＞　複数の石を処理 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * ［死に石］の記入
     * @param locations 
     * @param friendColor 
     * @param directionalStoneStateArray 
     */
    function stonesCheckDeadHorizontal(
        locations: number[],
        friendColor: number,
    ) : void {
        locations.forEach((sq, _index, _array)=>{
            if (aStoneIsDeadHorizontal(friendColor, sq)) {
                gameBoard1StonesMaxAmountOfSlidingWindowHorizontal.value[sq] = RUNS_SLIDING_WINDOW_DEAD;    // 論理和ではなくて、上書き。
            }
        });
    }


    /**
     * ［死に石］の記入
     * @param locations 
     * @param friendColor 
     * @param directionalStoneStateArray 
     */
    function stonesCheckDeadVertical(
        locations: number[],
        friendColor: number,
    ) : void {
        locations.forEach((sq, _index, _array)=>{
            if (aStoneIsDeadVertical(friendColor, sq)) {
                gameBoard1StonesMaxAmountOfSlidingWindowVertical.value[sq] = RUNS_SLIDING_WINDOW_DEAD;
            }
        });
    }


    /**
     * ［死に石］の記入
     * @param locations 
     * @param friendColor 
     * @param directionalStoneStateArray 
     */
    function stonesCheckDeadBaroqueDiagonal(
        locations: number[],
        friendColor: number,
    ) : void {
        locations.forEach((sq, _index, _array)=>{
            if (aStoneIsDeadBaroqueDiagonal(friendColor, sq)) {
                gameBoard1StonesMaxAmountOfSlidingWindowBaroqueDiagonal.value[sq] = RUNS_SLIDING_WINDOW_DEAD;
            }
        });
    }


    /**
     * ［死に石］の記入
     * @param locations 
     * @param friendColor 
     * @param directionalStoneStateArray 
     */
    function stonesCheckDeadSinisterDiagonal(
        locations: number[],
        friendColor: number,
    ) : void {
        locations.forEach((sq, _index, _array)=>{
            if (aStoneIsDeadSinisterDiagonal(friendColor, sq)) {
                gameBoard1StonesMaxAmountOfSlidingWindowSinisterDiagonal.value[sq] = RUNS_SLIDING_WINDOW_DEAD;
            }
        });
    }

    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１　＞　１つの石を処理 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * ［飛び石］チェック。一方向
     * 
     * 
     *          ここに石を置いたら（仮定なので、空点でも構わない）
     *          v
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|.|o|.|.|.|.|
     * +-+-+-+-+-+-+-+-+-+
     *
     * 少なくとも：
     *
     * +-+-+-+-+-+-+-+-+-+
     * |w|w|w|w|w|.|.|.|.|  ウィンドウ０
     * +-+-+-+-+-+-+-+-+-+
     *
     * +-+-+-+-+-+-+-+-+-+
     * |.|w|w|w|w|w|.|.|.|  ウィンドウ１
     * +-+-+-+-+-+-+-+-+-+
     *
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|w|w|w|w|w|.|.|  ウィンドウ２
     * +-+-+-+-+-+-+-+-+-+
     *
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|w|w|w|w|w|.|  ウィンドウ３
     * +-+-+-+-+-+-+-+-+-+
     *
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|.|w|w|w|w|w|  ウィンドウ４
     * +-+-+-+-+-+-+-+-+-+
     *
     * 以上の５つの範囲で、連の長さを数えなおす必要がある。
     * ［累積和］か何か高速化技法が使えそうだが、とりあえず高速化せずに愚直に書いてみる。
     *
     *
     * とりあえず長さ９の配列を用意し、[4] を打った石のマス番号とし、
     *
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|.|o|.|.|.|.|  スクウェア・マップ
     * +-+-+-+-+-+-+-+-+-+
     *            1 2 3 4   順方向へ４つ
     *  4 3 2 1             逆方向へ４つ
     *
     * 以上の９つのマス番号を探索する。
     * 予めすべての９つのマスを作ってテーブルにしておけば高速化できそうだが、とりあえず高速化せずに愚直に書いてみる。
     *
     * （１）ウィンドウ１～５のランズ数を調べる
     * （２）各マスには、ウィンドウ１～５の中の最大ランズ数を入れる。
     *
     * このとき、[4] を起点に端に向かって探索し、途中で［盤外］または［相手の石］とぶつかった場合は、そこで探索を終了する。
     * nextLength, backLength のようなカウントをしておくといいかも。
     * 例えば、相手の石（または盤外）が [1], [8] の位置にあるとき：
     *
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * |.|x|.|.|o|.|.|.|x|
     * +-+-+-+-+-+-+-+-+-+
     *
     *      - - 
     *       A    - - -
     *              B
     *
     * B を nextLength、
     * A を backLength と呼ぶとし、
     * nextLength + backLength + 1 が 5 未満のとき、ランズ数は 0 とする。
     * [dead] マーカーを付けてもいいかも。
     *
     * ウィンドウは３と４だけ調べれよい：
     *
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|w|w|w|w|w|.|.|  ウィンドウ２
     * +-+-+-+-+-+-+-+-+-+
     * +-+-+-+-+-+-+-+-+-+
     * |.|.|.|w|w|w|w|w|.|  ウィンドウ３
     * +-+-+-+-+-+-+-+-+-+
     * 
     * @param friendColor 
     * @param moveSq 
     * @param aNextOf 
     * @param bNextOf 
     * @param arrayOfMaxAmountOfSlidingWindowPerDirection 
     * @param directionalStoneStateArray 
     * @param aliveDirection 
     */
    function aStoneCountingMaxAmountOfSlidingWindowPerDirection(
        inputArray: number[],
        friendColor: number,    // 自石の色
    ) : number {

        // ある［飛び石］の長さを数えたいとします。
        // 長さは 5 以上は数えなくてよいものとします。
        //
        // 👇 ある［飛び石］がマス [4] にあるとします。
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | | |x| | | | |
        // +-+-+-+-+-+-+-+-+-+
        //
        // 👇 この x は、右端かもしれませんし、左端かもしれませんし、中ほどかもしれません。
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // |.|.|.|.|x| | | | |
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | | |x|.|.|.|.|
        // +-+-+-+-+-+-+-+-+-+
        //
        // いずれにしても、 [0] 未満や、 [8] より上は見なくてよさそうです。
        // スキャニング・レンジは 0～8 の 9 マスあれば十分です。
        //
        // そこで：
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // |w|w|w|w|w| | | | |  スライディング・ウィンドウ０
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | |w|w|w|w|w| | | |  スライディング・ウィンドウ１
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | |w|w|w|w|w| | |  スライディング・ウィンドウ２
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | |w|w|w|w|w| |  スライディング・ウィンドウ３
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | | |w|w|w|w|w|  スライディング・ウィンドウ４
        // +-+-+-+-+-+-+-+-+-+
        //
        // 👆 スライディング・ウィンドウは上記の５つあることが分かります。
        //
        // 次に：
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | |o| |x| | | | |
        // +-+-+-+-+-+-+-+-+-+
        //
        // 👆 o は相手の石とします。この時点でスライディング・ウィンドウの０、１、２は見なくてよいことが分かります。
        //
        // 加えて：
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | |o| |x| |o| | |
        // +-+-+-+-+-+-+-+-+-+
        //
        // 👆 o は相手の石とします。この時点でスライディング・ウィンドウの３、４は、[5] まで見ればよいことが分かります。
        // 調べる長さは、下記の式で求められます。
        //
        // 調べる長さ = スライディング・ウィンドウ番号 - 2
        //            = スライディング・ウィンドウ番号 - ( 右にある相手の石の位置"6" - xの位置"4" )
        //
        // 結果：
        //
        // 以下の２つのマス番号の配列を返します。
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | |w|w|w| | | |  スライディング・ウィンドウ３
        // +-+-+-+-+-+-+-+-+-+
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // | | | | |w|w| | | |  スライディング・ウィンドウ４
        // +-+-+-+-+-+-+-+-+-+
        //

        const opponentColor1 = opponentColor(friendColor);
        const slidingWindowArray: number[][] = locateSlidingWindowArray(
            inputArray,
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),    // break 条件
        );

        const maxAmountOfSlidingWindow = countingMaxAmountOfSlidingWindow(
            slidingWindowArray,
            friendColor
        );

        return maxAmountOfSlidingWindow;
    }


    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１　＞　マス番号を取得する +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * 北側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northOf(sq: number) : number {
        const northSq = sq - gameBoard1FileNum.value;
        if (northSq < 0) {  // 盤を飛び出たら
            return -1;
        }

        return northSq;
    }


    /**
     * 北東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northeastOf(sq: number) : number {
        const northeastSq = sq - gameBoard1FileNum.value + 1;
        if (
            northeastSq < 0 // 盤を飛び出たら
            || northeastSq % gameBoard1FileNum.value == 0    // 世界一周したら
        ) {  
            return -1;
        }

        return northeastSq;
    }


    /**
     * 東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function eastOf(sq: number) : number {
        const eastSq = sq + 1;
        if (eastSq % gameBoard1FileNum.value == 0) {   // 世界一周したら
            return -1;
        }

        return eastSq;
    }


    /**
     * 南東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southeastOf(sq: number) : number {
        const southeastSq = sq + gameBoard1FileNum.value + 1;
        if (
            southeastSq % gameBoard1FileNum.value == 0  // 世界一周したら
            || gameBoard1Area.value <= southeastSq  // 盤を飛び出たら
        ) {   
            return -1;
        }

        return southeastSq;
    }


    /**
     * 南側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southOf(sq: number) : number {
        const southSq = sq + gameBoard1FileNum.value;
        if (gameBoard1Area.value <= southSq) {  // 盤を飛び出たら
            return -1;
        }

        return southSq;
    }


    /**
     * 南西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southwestOf(sq: number) : number {
        const southwestSq = sq + gameBoard1FileNum.value - 1;
        if (
            gameBoard1Area.value <= southwestSq // 盤を飛び出たら
            || southwestSq % gameBoard1FileNum.value == gameBoard1FileNum.value - 1 // 世界一周したら
        ) { 
            return -1;
        }

        return southwestSq;
    }


    /**
     * 西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function westOf(sq: number) : number {
        const westSq = sq - 1;
        if (westSq % gameBoard1FileNum.value == gameBoard1FileNum.value - 1) {  // 世界一周したら
            return -1;
        }

        return westSq;
    }


    /**
     * 北西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northwestOf(sq: number) : number {
        const northwestSq = sq - gameBoard1FileNum.value - 1;
        if (
            northwestSq % gameBoard1FileNum.value == gameBoard1FileNum.value - 1    // 世界一周したら
            || northwestSq < 0  // 盤を飛び出たら
        ) { 
            return -1;
        }

        return northwestSq;
    }


    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１　＞　マス番号一覧を取得する +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * ［飛び石］の位置を調べるために。
     * 
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * | | | | |x| | | | |
     * +-+-+-+-+-+-+-+-+-+
     * 
     * 着手点の前後４マスを埋めた９つのマスの番号の配列を返します。
     * 
     * @param startSq 
     * @param nextOf 
     * @param backOf 
     */
    function locateForInputArray(
        startSq: number,
        nextOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : number[] {
        const inputArray: number[] = new Array(9).fill(-1); // マス番号の配列。要素数９。
        inputArray[4] = startSq;

        // 逆ウィング（起点を含まない）を戻る
        let backSq = startSq;  // 隣
        for(let i:number=3; 0<=i; i--){ // 3 ～ 0
            backSq = backOf(backSq);
            if (backSq == -1) {    // 盤外なら終了
                break;
            }

            inputArray[i] = backSq;
        }

        // 順ウィング（起点を含まない）を進む
        let nextSq = startSq;  // 隣
        for(let i:number=5; i<9; i++){  // 5 ～ 8
            nextSq = nextOf(nextSq);
            if (nextSq == -1) {
                break;
            }

            inputArray[i] = nextSq;
        }

        return inputArray;
    }


    /**
     * ［片翼］取得
     * 
     * 指定の向きの各マスをスキャン。起点を含まない。
     * 
     * @returns マス番号の配列
     */
    function locateDirectionalLine(
        startSq: number,
        maxLength: number,
        nextOf: (sq: number)=>number,
        isContinue: (sq: number)=>boolean,
        isBreak: (sq: number)=>boolean,
    ) : number[] {
        const sqArray: number[] = [];

        let nextSq: number = startSq;;  // 隣
        for(let i:number=0; i<maxLength; i++){
            nextSq = nextOf(nextSq);

            if (isContinue(nextSq)) {   // 無視条件
                continue;
            }

            if (isBreak(nextSq)) {   // 終了条件
                break;
            }

            sqArray.push(nextSq);
        }

        return sqArray;
    }


    /**
     * 以下の数字の位置（x を含まない）のマス番号を取得。
     * 
     * +--+--+--+--+--+--+--+--+--+
     * |15|  |  |  |11|  |  |  | 7|
     * +--+--+--+--+--+--+--+--+--+
     * |  |14|  |  |10|  |  | 6|  |
     * +--+--+--+--+--+--+--+--+--+
     * |  |  |13|  | 9|  | 5|  |  |
     * +--+--+--+--+--+--+--+--+--+
     * |  |  |  |12| 8| 4|  |  |  |
     * +--+--+--+--+--+--+--+--+--+
     * |19|18|17|16| x| 0| 1| 2| 3|
     * +--+--+--+--+--+--+--+--+--+
     * |  |  |  |20|24|28|  |  |  |
     * +--+--+--+--+--+--+--+--+--+
     * |  |  |21|  |25|  |29|  |  |
     * +--+--+--+--+--+--+--+--+--+
     * |  |22|  |  |26|  |  |30|  |
     * +--+--+--+--+--+--+--+--+--+
     * |23|  |  |  |27|  |  |  |31|
     * +--+--+--+--+--+--+--+--+--+
     * 
     * 👆  [0]を自分の着手のマスとする。例では片翼の長さを 4 とした。
     * この図形に名前はないが、８叉路（eight-way intersection）とでも呼ぶとする。
     * 
     */
    function locateEightWayIntersectionFriends(
        startSq: number,
        oneWingMaxLength: number,
        isContinue: (sq: number)=>boolean, 
        isBreak: (sq: number)=>boolean,
    ) : number[] {
        const eastWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            eastOf,
            isContinue,
            isBreak,
        );
        const northeastWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            northeastOf,
            isContinue,
            isBreak,
        );
        const northWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            northOf,
            isContinue,
            isBreak,
        );
        const northwestWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            northwestOf,
            isContinue,
            isBreak,
        );
        const westWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            westOf,
            isContinue,
            isBreak,
        );
        const southwestWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            southwestOf,
            isContinue,
            isBreak,
        );
        const southWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            southOf,
            isContinue,
            isBreak,
        );
        const southeastWing = locateDirectionalLine(
            startSq,
            oneWingMaxLength,
            southeastOf,
            isContinue,
            isBreak,
        );
        return [
            // startSq を含まない
            ...eastWing,
            ...northeastWing,
            ...northWing,
            ...northwestWing,
            ...westWing,
            ...southwestWing,
            ...southWing,
            ...southeastWing
        ];
    }


    /**
     * ［飛び石］取得
     * 
     * ［逆ウィング］の逆順、着手点、順ウィングを合わせたものが［飛び石］だ。
     * ９マス以下。
     * 
     * @returns ９つのマスの番号の配列
     */
    function locateRunsCapacity(
        startSq: number,    // 着手点
        nextOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
        isContinue: (sq: number)=>boolean,
        isBreak: (sq: number)=>boolean,
    ) : number[] {

        // 順ウィング
        const fwdWing = locateDirectionalLine(
            startSq,
            ONE_WING_MAX_LENGTH,
            nextOf,
            isContinue,
            isBreak,
        );

        // 逆ウィング
        const revWing = locateDirectionalLine(
            startSq,
            ONE_WING_MAX_LENGTH,
            backOf,
            isContinue,
            isBreak,
        );

        return [...revWing.reverse(), startSq, ...fwdWing]; // 向きを揃えて１つの配列にする
    }


    function locateSlidingWindowArray(
        inputArray: number[],
        isBreak: (sq: number) => boolean,
    ) : number[][] {
        const slidingWindowArray : number[][] = [];

        for(let slidingWindowNum: number=0; slidingWindowNum < 5; slidingWindowNum++){
            const backWingArray : number[] = [];
            const nextWingArray : number[] = [];

            // 逆ウィング（起点を含まない）を戻る
            for(let i:number=3; 0<=i; i--){ // 3 ～ 0
                const sq = inputArray[i];
                if (isBreak(sq)) {
                    break;
                }

                backWingArray.push(sq);
            }

            // 順ウィング（起点を含まない）を進む
            for(let i:number=5; i<9; i++){  // 5 ～ 8
                const sq = inputArray[i];
                if (isBreak(sq)) {
                    break;
                }

                nextWingArray.push(sq);
            }

            slidingWindowArray.push([
                ...backWingArray.reverse(),
                inputArray[4],
                ...nextWingArray
            ])
        }

        return slidingWindowArray;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム盤１　＞　判定する +
    // ++++++++++++++++++++++++++++++++++++++++++++++

    /**
     * 左上隅か
     * @param sq 
     */
    function isNorthwestCorner(sq: number) : boolean {
        return sq==0;
    }


    /**
     * 右上隅か
     * @param sq 
     */
    function isNortheastCorner(sq: number) : boolean {
        return sq == gameBoard1FileNum.value - 1;
    }


    /**
     * 左下隅か
     * @param sq 
     */
    function isSouthwestCorner(sq: number) : boolean {
        return sq == gameBoard1Area.value - gameBoard1FileNum.value;
    }


    /**
     * 右下隅か
     * @param sq 
     */
    function isSoutheastCorner(sq: number) : boolean {
        return sq == gameBoard1Area.value - 1;
    }


    /**
     * 上辺か
     * @param sq 
     */
    function isNorthEdge(sq: number) : boolean {
        return Math.floor(sq/gameBoard1FileNum.value) == 0;
    }


    /**
     * 左辺か
     * @param sq 
     */
    function isWestEdge(sq: number) : boolean {
        return sq%gameBoard1FileNum.value == 0;
    }


    /**
     * 右辺か
     * @param sq 
     */
    function isEastEdge(sq: number) : boolean {
        return sq%gameBoard1FileNum.value == gameBoard1FileNum.value - 1;
    }


    /**
     * 下辺か
     * @param sq 
     */
    function isSouthEdge(sq: number) : boolean {
        return Math.floor(sq/gameBoard1FileNum.value) == gameBoard1RankNum.value - 1;
    }


    /**
     * ［死に方向］判定
     * @param friendColor 
     * @param aStoneSq 
     */
    function aStoneIsDeadHorizontal(
        friendColor: number,
        aStoneSq: number,
    ) : boolean {
        const opponentColor1 = opponentColor(friendColor);

        const horizontalFriendRunsCapacity = locateRunsCapacity(
            aStoneSq,
            eastOf,
            westOf,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),   // break 条件
        );

        return isDeadCapacity(horizontalFriendRunsCapacity);
    }


    /**
     * ［死に方向］判定
     * @param friendColor 
     * @param aStoneSq 
     */
    function aStoneIsDeadVertical(
        friendColor: number,
        aStoneSq: number,
    ) : boolean {
        const opponentColor1 = opponentColor(friendColor);

        const verticalFriendRunsCapacity = locateRunsCapacity(
            aStoneSq,
            southOf,
            northOf,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),   // break 条件
        );

        return isDeadCapacity(verticalFriendRunsCapacity);
    }


    /**
     * ［死に方向］判定
     * @param friendColor 
     * @param aStoneSq 
     */
    function aStoneIsDeadBaroqueDiagonal(
        friendColor: number,
        aStoneSq: number,
    ) : boolean {
        const opponentColor1 = opponentColor(friendColor);

        const baroqueDiagonalFriendRunsCapacity = locateRunsCapacity(
            aStoneSq,
            northeastOf,
            southwestOf,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),   // break 条件
        );

        return isDeadCapacity(baroqueDiagonalFriendRunsCapacity);
    }


    /**
     * ［死に方向］判定
     * @param friendColor 
     * @param aStoneSq 
     */
    function aStoneIsDeadSinisterDiagonal(
        friendColor: number,
        aStoneSq: number,
    ) : boolean {
        const opponentColor1 = opponentColor(friendColor);

        const sinisterDiagonalFriendRunsCapacity = locateRunsCapacity(
            aStoneSq,
            southeastOf,
            northwestOf,
            (_sq: number) => false,  // continue 条件
            (sq: number) => isOutOfBoardOrColor(opponentColor1, sq),   // break 条件
        );

        return isDeadCapacity(sinisterDiagonalFriendRunsCapacity);;
    }


    /**
     * 空点か
     * @param friendColor 
     * @param sq 
     */
    function isEmptyPoint(sq: number) : boolean {
        return sq != -1 && gameBoard1StoneColorArray.value[sq] == COLOR_EMPTY;
    }


    /**
     * 盤の外、または指定の石の色か
     * @param friendColor 
     * @param sq 
     */
    function isOutOfBoardOrColor(color: number, sq: number) : boolean {
        return sq == -1 || gameBoard1StoneColorArray.value[sq] == color;
    }


    /**
     * ［死に飛び石］判定
     * 
     * ［飛び石］の長さが５に満たないとき、［死に飛び石］だ。
     */
    function isDeadCapacity(
        runsCapacity: number[],
    ) : boolean {
        return runsCapacity.length < GO_LENGTH;
    }

</script>

<style lang="css" scoped>
    @import '@/styles/misc.css';
    @import '@/styles/talk-pen.css';
</style>
