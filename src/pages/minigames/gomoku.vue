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

        <!-- 免責 -->
        <v-alert type="warning" class="mb-6" title="免責！" text="画面は開発中のものだぜ（＾▽＾）！" closable />

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
                            backgroundImage: `url('${spriteBoard003Png}'), url('${spriteBoard002Png}')`,
                            backgroundPosition: `${gameBoard1SquaresBingoMarkerSrcTilemapPosition(sq)}, ${gameBoard1SquareBackgroundPosition(sq)}`,   // 元画像のスケールで逆向きシフトする
                            backgroundRepeat: 'no-repeat, no-repeat',
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
                    ></v-btn>
                    <!--
                        TODO 廃止： {{ gameBoard1StoneShapeArray[sq] }}
                    -->

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
            <img src="@/assets/img/reference/Sprite_Board_001.png" />
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

        <!-- 環境設定パネル１ -->
        <section class="sec-0 mt-6 mb-6">
            <v-btn
                class="code-key"
                @touchstart.prevent="button1Ref?.press($event, onEnvironmentConfig1ButtonPressed);"
                @touchend="button1Ref?.release();"
                @touchcancel="button1Ref?.release();"
                @touchleave="button1Ref?.release();"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, onEnvironmentConfig1ButtonPressed)"
                @mouseup="button1Ref?.release();"
                @mouseleave="button1Ref?.release();"
            >{{ gameMachine1EnvironmentConfigIsShowing ? '⚙️環境設定を終わる' : '⚙️環境設定を表示' }}</v-btn>
            <section
                v-if="gameMachine1EnvironmentConfigIsShowing"
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


        <v-btn
            class="code-key"
            @touchstart.prevent="button1Ref?.press($event, onDebugInfoButtonPressed);"
            @touchend="button1Ref?.release();"
            @touchcancel="button1Ref?.release();"
            @touchleave="button1Ref?.release();"
            @mousedown.prevent="button1Ref?.handleMouseDown($event, onDebugInfoButtonPressed)"
            @mouseup="button1Ref?.release();"
            @mouseleave="button1Ref?.release();"
        >{{ debugInfo1IsShowing ? '⚙️デバッグ情報を終わる' : '⚙️デバッグ情報を表示' }}</v-btn>
        <section v-if="debugInfo1IsShowing" class="sec-1">
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
                        {{ gameBoard1StonesState[sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>ビンゴ:</p>
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
                        {{ gameBoard1SquaresBingo[sq] }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>黒石の最長　＞　水平方向:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_HORIZONTAL][COLOR_BLACK][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>白石の最長　＞　水平方向:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_HORIZONTAL][COLOR_WHITE][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>黒石の最長　＞　垂直方向:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_VERTICAL][COLOR_BLACK][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>白石の最長　＞　垂直方向:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_VERTICAL][COLOR_WHITE][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>黒石の最長　＞　バロック対角線:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_BAROQUE_DIAGONAL][COLOR_BLACK][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>白石の最長　＞　バロック対角線:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_BAROQUE_DIAGONAL][COLOR_WHITE][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>黒石の最長　＞　シニスター対角線:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_SINISTER_DIAGONAL][COLOR_BLACK][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>

            <p>白石の最長　＞　シニスター対角線:</p>
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
                        {{ gameBoard1MaxLengthArray[DIRECTION_SINISTER_DIAGONAL][COLOR_WHITE][sq].toString().padStart(2, '0') }}&nbsp;
                    </span><br/>
                </p>
            </div>
        </section>
    </section>
    

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

    import spriteBoard002Png from '@/assets/img/reference/202509__warabenture__21-0649-spriteBoard002-o1o0.png';
    import spriteBoard003Png from '@/assets/img/reference/202509__warabenture__26-0959-spriteBoard003-bingoMarker-o1o0.png';

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

    // ++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲームマシン１　＞　環境設定 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++

    const gameMachine1EnvironmentConfigIsShowing = ref<boolean>(false);

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

    const HALF_OPEN_RADIUS_OF_NINE = 4;  // 直径 9 から原点（着手点）の 1 引いて 2 で割ったもの。原点を抜いた半径。片翼
    //const HALF_OPEN_RADIUS_OF_ELEVEN = 5;  // 直径 11 から原点（着手点）の 1 引いて 2 で割ったもの。原点を抜いた半径。片翼。長連を調べるのに使う。
    const FIVE_LENGTH = 5;  // ［五］の長さ
    const HALF_OPEN_RADIUS_OF_FIVE = 2; // 直径 5 から原点（着手点）の 1 引いて 2 で割ったもの。原点を抜いた半径
    const gameBoard1FileNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
    const COLOR_EMPTY = 0;  // 空きマス。石の色無し
    const COLOR_BLACK = 1;  // 黒石
    const COLOR_WHITE = 2;  // 白石
    type Color = typeof COLOR_EMPTY | typeof COLOR_BLACK | typeof COLOR_WHITE;
    const DIRECTION_EMPTY = 0;
    const DIRECTION_HORIZONTAL = 1;
    const DIRECTION_VERTICAL = 2;
    const DIRECTION_BAROQUE_DIAGONAL = 3;
    const DIRECTION_SINISTER_DIAGONAL = 4;
    const DIRECTION_SIZE = 5;   // Empty 含む
    type Direction = typeof DIRECTION_EMPTY | typeof DIRECTION_HORIZONTAL | typeof DIRECTION_VERTICAL | typeof DIRECTION_BAROQUE_DIAGONAL | typeof DIRECTION_SINISTER_DIAGONAL;
    const allDirectionsForeOf = [
        (_sq: number) => { return 0; }, // 不使用
        eastOf,
        northOf,
        northeastOf,
        southeastOf,
    ];
    const allDirectionsBackOf = [
        (_sq: number) => { return 0; }, // 不使用
        westOf,
        southOf,
        southwestOf,
        northwestOf,
    ];
    type FiveSquares = [number, number, number, number, number];   // 長さ 5 のウィンドウ
    const gameBoard1FileNum = ref<number>(15);  // 盤が横に何マスか
    const gameBoard1RankNum = ref<number>(15);  // 盤が縦に何マスか
    const gameBoard1Area = computed(()=>{
        return gameBoard1FileNum.value * gameBoard1RankNum.value;
    })
    // const gameBoard1StoneShapeArray = ref<string[]>(new Array(gameBoard1Area.value).fill(''));    // 石の形
    // for(let sq: number=0; sq<gameBoard1Area.value; sq++){
    //     gameBoard1StoneShapeArray.value[sq] = '●'
    // }
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
            if (isOutOfBoard(sq)){  // 盤外なら
                return false;
            }
            const isEmptySquare = gameBoard1StoneColorArray.value[sq] == 0; // 空マスだ
            return isEmptySquare && !gameBoard1IsEnd.value;
        }
    });
    const gameBoard1Turn = ref<number>(0);
    const gameBoard1Times = ref<number>(0); // 何手目を終えたか。リバーシでは盤上の石の数に等しい
    const gameBoard1StoneCount = ref<number[]>([0, 0, 0]);   // 盤上のプレイヤーの石の数。[0] は未使用
    const gameBoard1PassCount = ref<number>(0); // 連続パス回数
    const gameBoard1IsEnd = ref<boolean>(false);    // 終局しているか

    const gameBoard1MaxLengthArray = ref<number[][][]>( // 石の最長［方向］［色］［交点］
        new Array(DIRECTION_SIZE)
    );
    gameBoard1MaxLengthArray.value[DIRECTION_HORIZONTAL] = [  // 水平方向
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
    ];
    gameBoard1MaxLengthArray.value[DIRECTION_VERTICAL] = [    // 垂直方向
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
    ];
    gameBoard1MaxLengthArray.value[DIRECTION_BAROQUE_DIAGONAL] = [    // 右肩上がりの対角線方向
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
    ];
    gameBoard1MaxLengthArray.value[DIRECTION_SINISTER_DIAGONAL] = [    // 右肩下がりの体格線方向
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
        new Array(gameBoard1Area.value).fill(0),
    ];

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
    type StoneState = typeof STONE_STATE_NONE | typeof STONE_STATE_ALIVE_HORIZONTAL | typeof STONE_STATE_ALIVE_VERTICAL | typeof STONE_STATE_ALIVE_BAROQUE_DIAGONAL | typeof STONE_STATE_ALIVE_SINISTER_DIAGONAL;
    const MAX_LENGTH_DEAD = -1;
    function isAliveStone(sq: number) : boolean {
        return 1 <= gameBoard1StonesState.value[sq] && gameBoard1StonesState.value[sq] <= 15;
    }
    const gameBoard1StonesState = ref<Array<number>>(new Array(gameBoard1Area.value).fill(STONE_STATE_NONE));

    // ボタンの背景画像（のタイル位置の矩形）
    const gameBoard1SquareSrcTilemapRect = computed<
        (sq: number)=>Rectangle
    >(()=>{
        return (sq: number)=>{

            try {
                const stoneColor = gameBoard1StoneColorArray.value[sq];

                function getBoardGridNumber(sq: number) : number {
                    if (isNorthwestCorner(sq)) {return 6;}  // 左上隅
                    if (isNortheastCorner(sq)) {return 12;} // 右上隅
                    if (isSouthwestCorner(sq)) {return 3;}  // 左下隅
                    if (isSoutheastCorner(sq)) {return 9}   // 右下隅
                    if (isNorthEdge(sq))    {return 14;}    // 上辺
                    if (isWestEdge(sq)) {return 7;} // 左辺
                    if (isEastEdge(sq)) {return 13;}    // 右辺
                    if (isSouthEdge(sq))    {return 11;}    // 下辺
                    return 15;  // 盤中
                }

                // 水平、垂直、バロック対角線、シニスター対角線のうち、最も接続数の多いもの：
                const bXBlackMaxLength = Math.max(
                    gameBoard1MaxLengthArray.value[DIRECTION_HORIZONTAL][COLOR_BLACK][sq], // 水平
                    gameBoard1MaxLengthArray.value[DIRECTION_VERTICAL][COLOR_BLACK][sq],   // 垂直
                    gameBoard1MaxLengthArray.value[DIRECTION_BAROQUE_DIAGONAL][COLOR_BLACK][sq],    // バロック対角線
                    gameBoard1MaxLengthArray.value[DIRECTION_SINISTER_DIAGONAL][COLOR_BLACK][sq],   // シニスター対角線
                );
                const bYWhiteMaxLength = Math.max(
                    gameBoard1MaxLengthArray.value[DIRECTION_HORIZONTAL][COLOR_WHITE][sq], // 水平
                    gameBoard1MaxLengthArray.value[DIRECTION_VERTICAL][COLOR_WHITE][sq],   // 垂直
                    gameBoard1MaxLengthArray.value[DIRECTION_VERTICAL][COLOR_WHITE][sq],    // バロック対角線
                    gameBoard1MaxLengthArray.value[DIRECTION_SINISTER_DIAGONAL][COLOR_WHITE][sq],   // シニスター対角線
                );

                const aGridNumber = getBoardGridNumber(sq);
                const imageKey = makeImageKey(stoneColor, bYWhiteMaxLength, bXBlackMaxLength, aGridNumber);
                
                if (!(imageKey in gameBoard1SourceTilemap1Frames)) {
                    console.log(`ERROR: imageKey=${imageKey} stoneColor=${stoneColor} bYWhiteMaxLength=${bYWhiteMaxLength} bXBlackMaxLength=${bXBlackMaxLength} aGridNumber=${aGridNumber}`);
                }

                return gameBoard1SourceTilemap1Frames[imageKey];

            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                console.log('ERROR: GomokuError:', errorMessage);
                console.error('GomokuError:', errorMessage);
                return {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0,
                } as Rectangle;

            }
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
    const gameBoard1SquaresBingo = ref<Array<Color>>(new Array(gameBoard1Area.value).fill(COLOR_EMPTY));
    /**
     * ビンゴならマーカーを可視化させます
     */
    const gameBoard1SquaresBingoMarkerSrcTilemapPosition = computed<
        (sq: number)=>string
    >(()=>{
        return (sq: number)=>{
            if (gameBoard1SquaresBingo.value[sq] == COLOR_EMPTY) {
                return '0 0';
            }

            if (gameBoard1SquaresBingo.value[sq] == COLOR_BLACK) {
                return `-32px 0px`;
            }

            return `-64px 0px`; // COLOR_WHITE
        };
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲーム盤１　＞　元タイルマップ１ +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function getAyAxByGridNumber(gridNumber: number) : [number, number] {
        if (gridNumber == 0) {return [0, 0];}
        if (gridNumber == 6) {return [1, 0];}
        if (gridNumber == 14) {return [1, 1];}
        if (gridNumber == 12) {return [1, 2];}
        if (gridNumber == 7) {return [2, 0];}
        if (gridNumber == 15) {return [2, 1];}
        if (gridNumber == 13) {return [2, 2];}
        if (gridNumber == 3) {return [3, 0];}
        if (gridNumber == 11) {return [3, 1];}
        // if (gridNumber == 9) {
        return [3, 2];
        //}
    }


    function getByBxMaxLength(bYWhiteMaxLength:number, bXBlackMaxLength:number) : [number, number] {
        return [
            Math.min(6, bYWhiteMaxLength + 1), // ［死に石］が -1 なので、下駄を１履かせている
            Math.min(6, bXBlackMaxLength + 1), // ［死に石］が -1 なので、下駄を１履かせている
        ];
    }


    function getCColorCode(dColor: number) : [number, number] {
        if (dColor == COLOR_EMPTY) {return [0, 0];}
        if (dColor == COLOR_BLACK) {return [1, 0];}
        return [1, 1];
    }


    const MAX_MAX_LENGTH = 6;   // 長連を判定できるように、［六］も内部的に用意している


    function makeImageKey(cColor: number, bYWhiteMaxLength:number, bXBlackMaxLength:number, aGridNumber:number) : string {
        const [cY, cX] = getCColorCode(cColor);
        const [bY, bX] = getByBxMaxLength(bYWhiteMaxLength, bXBlackMaxLength);
        const [aY, aX] = getAyAxByGridNumber(aGridNumber);
        const imageKey = `board-color-mark-grid-${cY}${cX}-${bY}${bX}-${aY}${aX}`;

        if (cY<0 || 1<cY) { console.log(`ERROR: cY=${cY}`)}
        if (cX<0 || 1<cX) { console.log(`ERROR: cX=${cX}`)}
        if (0==cY && cX==1) { console.log(`ERROR: cY=${cY} cx=${cX}`)}
        if (bY<0 || (MAX_MAX_LENGTH + 1)<bY) { console.log(`ERROR: bY=${bY}`)}
        if (bX<0 || (MAX_MAX_LENGTH + 1)<bX) { console.log(`ERROR: bX=${bX}`)}
        if (aY<0 || 4<aY) { console.log(`ERROR: aY=${aY}`)}
        if (aX<0 || 3<aX) { console.log(`ERROR: aX=${aX}`)}
        if ((1<=aX && aX<=2) && aY==0) { console.log(`ERROR: aY=${aY} aX=${aX}`)}

        return imageKey;
    }


    //
    // 理屈：
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
    // 👇 ［タイル］は以下のようなサイズ。
    //
    //    0  32
    //  0 +---+
    //    |   |
    // 32 +---+
    //
    // tileBoard1TileWidth.value
    // tileBoard1TileHeight.value
    //
    // 👇 以下のように［タイル］が集まって［グループＡ］に固まっている。
    //
    // aY Pixels
    //             0   1   2   ... aX
    //           0  32  64  96 ... Pixels
    //         0 +---+
    // 0         |   |
    //        32 +---+---+---+
    // 1         |┌ |┬ |┐ |
    //        64 +---+---+---+
    // 2         |├ |┼ |┤ |
    //        96 +---+---+---+
    // 3         |└ |┴ |┘ |
    //       128 +---+---+---+
    //
    const aWidth = 3 * tileBoard1TileWidth.value;
    const aHeight = 4 * tileBoard1TileHeight.value;
    //
    // 👇 以下のように［グループＡ］が集まって［グループＢ］に固まっている。
    //
    // bY Pixels
    //             0   1   2   3   4   5   6   7   ... bX
    //           0  96 196 288 384 480 576 672 768 ... Pixels
    //         0 +---+---+---+---+---+---+---+---+
    //  0        |   |   |   |   |   |   |   |   |
    //       128 +---+---+---+---+---+---+---+---+
    //  1        |   |   |   |   |   |   |   |   |
    //       256 +---+---+---+---+---+---+---+---+
    //  2        |   |   |   |   |   |   |   |   |
    //       384 +---+---+---+---+---+---+---+---+
    //  3        |   |   |   |   |   |   |   |   |
    //       512 +---+---+---+---+---+---+---+---+
    //  4        |   |   |   |   |   |   |   |   |
    //       640 +---+---+---+---+---+---+---+---+
    //  5        |   |   |   |   |   |   |   |   |
    //       768 +---+---+---+---+---+---+---+---+
    //  6        |   |   |   |   |   |   |   |   |
    //       896 +---+---+---+---+---+---+---+---+
    //  7        |   |   |   |   |   |   |   |   |
    //      1024 +---+---+---+---+---+---+---+---+
    //
    const bWidth = 8 * aWidth;
    const bHeight = 8 * aHeight;
    //
    // 👇 以下のように［グループＢ］が集まって［グループＣ］に固まっている。
    //
    // cY Pixels
    //             0    1    ... cX
    //           0  768 1536 ... Pixels
    //         0 +----+    +
    //  0        |    |
    //      1024 +----+----+
    //  1        |    |    |
    //      2048 +----+----+
    // 
    // const cWidth = 2 * bWidth;
    // const cHeight = 2 * bHeight;
    //
    /**
     * 
     * @param cColor 
     * @param bYWhiteMaxLength 
     * @param bXBlackMaxLength 
     * @param aGridNumber 
     */
    function makeKeyAndRectangle(cColor: number, bYWhiteMaxLength:number, bXBlackMaxLength:number, aGridNumber:number) : [string, Rectangle] {

        const [cY, cX] = getCColorCode(cColor);
        const [bY, bX] = getByBxMaxLength(bYWhiteMaxLength, bXBlackMaxLength);
        const [aY, aX] = getAyAxByGridNumber(aGridNumber);
        const imageKey = makeImageKey(cColor, bYWhiteMaxLength, bXBlackMaxLength, aGridNumber);
        const rect = {
            left: cX*bWidth + bX*aWidth + aX*tileBoard1TileWidth.value,
            top: cY*bHeight + bY*aHeight + aY*tileBoard1TileHeight.value,
            width: tileBoard1TileWidth.value,
            height: tileBoard1TileHeight.value
        };
        console.log(`DEBUG: [makeKeyAndRectangle] imageKey=${imageKey}`);

        return [
            imageKey,
            rect,
        ];
    }

    const gameBoard1SourceTilemap1Frames : Record<string, Rectangle> = {};
    for(let cColor=0; cColor<3; cColor++) {
        for(let bYWhiteMaxLength=-1; bYWhiteMaxLength<=MAX_MAX_LENGTH; bYWhiteMaxLength++) {
            for(let bXBlackMaxLength=-1; bXBlackMaxLength<=MAX_MAX_LENGTH; bXBlackMaxLength++) {
                for (const aGridNumber of [0, 6, 14, 12, 7, 15, 13, 3, 11, 9]) {
                    const [key, rect] = makeKeyAndRectangle(cColor, bYWhiteMaxLength, bXBlackMaxLength, aGridNumber);
                    gameBoard1SourceTilemap1Frames[key] = rect;
                }
            }
        }
    }


    // ++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　デバッグ情報パネル１ +
    // ++++++++++++++++++++++++++++++++++++++++++

    const debugInfo1IsShowing = ref<boolean>(false);  // デバッグ情報を表示中


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

        // console.log(`TEST: gameBoard1Turn.value=${gameBoard1Turn.value}`);
        
        // // test
        // const TURN_COLOR = gameBoard1Turn.value;   // 手番の色
        // const OPPOSITE_TURN_COLOR = oppositeTurnColor(TURN_COLOR);
        // const START_SQ = 7; // 着手点
        // const FWD_DIRECTION = eastOf; // 順方向
        // const REV_DIRECTION = westOf; // 逆方向
        // const oneWing = locateDirectionalLine(
        //     START_SQ,
        //     ONE_WING_MAX_LENGTH,
        //     FWD_DIRECTION,
        //     (_sq: number) => false,  // continue 条件
        //     (sq: number) => isOutOfBoardOrColor(OPPOSITE_TURN_COLOR, sq), // break 条件
        // );
        // console.log(`TEST: oneWing=${oneWing}`);

        // const testNineField1 = locateFieldCapacity(
        //     START_SQ,
        //     FWD_DIRECTION,
        //     REV_DIRECTION,
        //     (_sq: number) => false,  // continue 条件
        //     (sq: number) => isOutOfBoardOrColor(OPPOSITE_TURN_COLOR, sq), // break 条件
        // );
        // console.log(`TEST: testField1=${testNineField1}`);

        // const testNineFieldSquares1 = locateFieldCapacity(
        //     START_SQ,
        //     FWD_DIRECTION,
        //     REV_DIRECTION,
        //     (_sq: number) => false,  // continue 条件
        //     (sq: number) => isOutOfBoardOrColor(OPPOSITE_TURN_COLOR, sq), // break 条件
        // );
        // const isDeadField1 = isDeadCapacity(
        //     testNineFieldSquares1,
        // );
        // console.log(`TEST: isDeadField=${isDeadField1} TURN_COLOR=${TURN_COLOR}`);

        // const aStoneIsDeadHorizontal1 = oppositeTurnStoneIsDeadHorizontal(
        //     START_SQ,
        // );
        // console.log(`TEST: aStoneIsDeadHorizontal1=${aStoneIsDeadHorizontal1} TURN_COLOR=${TURN_COLOR} startSq=${START_SQ}`);
        // // if (isDeadStone1) {
        // // TODO:     directionalSolidLineArray.value[START_SQ] = 'Dead';
        // // }

        // const controlWays = locateRadialEightWays(
        //     START_SQ,
        //     ONE_WING_MAX_LENGTH,
        //     (_sq: number) => false,  // continue 条件
        //     (sq: number) => isOutOfBoardOrColor(OPPOSITE_TURN_COLOR, sq), // break 条件
        // );
        // console.log(`TEST: controlWays=${controlWays} TURN_COLOR=${TURN_COLOR} startSq=${START_SQ} ONE_WING_MAX_LENGTH=${ONE_WING_MAX_LENGTH}`);

        // const wings : number[] = locateForWings(
        //     START_SQ,
        //     FWD_DIRECTION,
        //     REV_DIRECTION,
        // );
        // console.log(`TEST: wings=${wings}`);
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
     * ［環境設定パネル１］を開くボタン。
     */
    function onEnvironmentConfig1ButtonPressed() : void {
        gameMachine1EnvironmentConfigIsShowing.value = !gameMachine1EnvironmentConfigIsShowing.value;
    }


    /**
     * ［デバッグ情報を表示］ボタン。
     */
    function onDebugInfoButtonPressed() : void {
        debugInfo1IsShowing.value = !debugInfo1IsShowing.value;
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

        putStone(sq);   // 石が置けなくても、とくに対応しません
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
     * @returns 石を置けたら true、石を置けなかったら false。不明なら null
     */
    function putStoneOnDirection(
        moveSq: number,
        foreOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : Elements1 {

        // ++++++++++
        // + 仕込み +
        // ++++++++++

        // 着手点を中心とする直径９のスライディング・ウィンドウ。［五］を判定するのに使う
        const slidingWindowArray = makeSlidingWindowArray(
            moveSq,
            HALF_OPEN_RADIUS_OF_NINE,
            HALF_OPEN_RADIUS_OF_FIVE,
            foreOf,
            backOf,
        );
        // console.log(`DEBUG: [putStone] slidingWindowArrayH.length=[${slidingWindowArrayH.length}]`);
        // slidingWindowArrayH.forEach((oneWindow, index, _array)=>{
        //     console.log(`DEBUG: [putStone] window[${index}] ${oneWindow}`);
        // });

        const turnColor = gameBoard1Turn.value as Color;
        const oppositeTurnColor1 = oppositeTurnColor(turnColor) as Color;

        // ［非零直径９］
        const locationsNonzeroDiameter = locateFieldNonzeroFromCenter(
            moveSq,
            HALF_OPEN_RADIUS_OF_NINE,
            foreOf,
            backOf,
            (_sq: number) => false, // continue 条件
            (sq: number) => isOutOfBoard(sq),   // break 条件
        );

        // ［両側利き９］
        const locationsControl = locateFieldNonzeroFromCenter(
            moveSq,
            HALF_OPEN_RADIUS_OF_NINE,
            foreOf,
            backOf,
            (_sq: number) => false,  // continue 条件
            makeIsOutOfBoardOrColor(oppositeTurnColor1),    // break 条件
        );

        /**
         * arr2 に含まれる要素を、 arr1 から除外した配列を返す
         * @param arr1 
         * @param arr2 
         */
        function arraySubtract(arr1: number[], arr2: number[]) {
            return arr1.filter((item: number) => !arr2.includes(item));
        }

        // ［両側補利き９］
        const locationsComplementaryControl = arraySubtract(locationsNonzeroDiameter, locationsControl);

        // ビンゴ
        const bingoStones : Set<number> = getBingoLocations(slidingWindowArray, turnColor, FIVE_LENGTH);

        return [
            null,
            slidingWindowArray,
            locationsNonzeroDiameter,
            locationsControl,
            locationsComplementaryControl,
            bingoStones,
        ];
    }


    type Elements1 = [any, number[][], number[], number[], number[], Set<number>];
    const ELEMENT_EMPTY = 0;
    const ELEMENT_SLIDING_WINDOW_ARRAY = 1; // ［五］を判定するのに使う
    const ELEMENT_THIS_TURN_NONZERO_DIAMETER_NINE = 2;
    const ELEMENT_LOCATIONS_CONTROL = 3;
    const ELEMENT_LOCATIONS_COMPLEMENTARY_CONTROL = 4;
    const ELEMENT_BINGO_STONES = 5;
    type Element1 =
        typeof ELEMENT_EMPTY
        | typeof ELEMENT_SLIDING_WINDOW_ARRAY
        | typeof ELEMENT_THIS_TURN_NONZERO_DIAMETER_NINE
        | typeof ELEMENT_LOCATIONS_CONTROL
        | typeof ELEMENT_LOCATIONS_COMPLEMENTARY_CONTROL
        | typeof ELEMENT_BINGO_STONES
        ;


    /**
     * 石を置く
     * @param moveSq 
     */
    function putStone(moveSq: number) : boolean {
       
        // sq を符号に変換したい。
        console.log(`DEBUG: [putStone] code=${sqToCode(moveSq)} moveSq=${moveSq} turn=${gameBoard1Turn.value}`);

        if (!gameBoard1StoneClickable.value(moveSq)) {  // 石を置けないマスなら（盤外含む）
            return false;
        }

        const turnColor = gameBoard1Turn.value as Color;    // 手番の色　＝　置く石の色
        gameBoard1StoneColorArray.value[moveSq] = turnColor;    // 盤上に石を置く

        const allDirections = [
            null,
            putStoneOnDirection(moveSq, eastOf, westOf),   // 水平（H）
            putStoneOnDirection(moveSq, northOf, southOf), // 垂直（V）
            putStoneOnDirection(moveSq, southwestOf, northeastOf), // バロック対角線（B）
            putStoneOnDirection(moveSq, northwestOf, southeastOf), // シニスター対角線（S）
        ] as Elements1[];

        const oppositeTurnColor1 = oppositeTurnColor(turnColor) as Color;

        // ++++++++++++++++++++++++++++++++++++++++++++++
        // + 着手石と、それに隣接する自石が［五］か記入 +
        // ++++++++++++++++++++++++++++++++++++++++++++++

        // ［五］を作れた石の集合
        const bingoStoneSet = new Set<number>([
            ...allDirections[DIRECTION_HORIZONTAL][ELEMENT_BINGO_STONES], // 水平方向にビンゴがあるか？
            ...allDirections[DIRECTION_VERTICAL][ELEMENT_BINGO_STONES],
            ...allDirections[DIRECTION_BAROQUE_DIAGONAL][ELEMENT_BINGO_STONES],
            ...allDirections[DIRECTION_SINISTER_DIAGONAL][ELEMENT_BINGO_STONES],
        ]);
        for (const stoneSq of bingoStoneSet) {
            gameBoard1SquaresBingo.value[stoneSq] = turnColor as Color; // どちらのプレイヤーのビンゴか記入
        }


        const directionArray = [DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL] as Direction[];
        const stoneStateAliveArray = [
            STONE_STATE_NONE,
            STONE_STATE_ALIVE_HORIZONTAL,
            STONE_STATE_ALIVE_VERTICAL,
            STONE_STATE_ALIVE_BAROQUE_DIAGONAL,
            STONE_STATE_ALIVE_SINISTER_DIAGONAL,
        ] as StoneState[];

        for (const direction of directionArray) {
            const foreOf = allDirectionsForeOf[direction];
            const backOf = allDirectionsBackOf[direction];

            // ++++++++++
            // + 着手点 +
            // ++++++++++

            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // + 着手点　＞　［死に石］か［最長］のどちらかを記入。相手は 0 +
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (allDirections[direction][ELEMENT_LOCATIONS_CONTROL].length < FIVE_LENGTH) {   // ［五］を作れない方向なら［死に方向］です
                gameBoard1MaxLengthArray.value[direction][turnColor][moveSq] = MAX_LENGTH_DEAD;
            } else {
                gameBoard1MaxLengthArray.value[direction][turnColor][moveSq] = countMaxStones(
                    allDirections[direction][ELEMENT_SLIDING_WINDOW_ARRAY],
                    turnColor
                );
            }

            gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][moveSq] = 0;

            // ++++++++++++++++++++++++++
            // + 以下、着手点を含まない +
            // ++++++++++++++++++++++++++
            //
            // ［非零直径９］を取得。着手点を含まない
            // フィールドの各空点の［最長］を記入します
            for (const resonanceSq of allDirections[direction][ELEMENT_THIS_TURN_NONZERO_DIAMETER_NINE]) {
                for (const color of [turnColor, oppositeTurnColor1] as Color[]) {
                    // 空点なら自分、相手ともに［最長］を更新。
                    // 手番の石なら、手番の［最長］だけを更新。
                    // 相手番の石なら、相手番の［最長］だけを更新。
                    const stoneColor = gameBoard1StoneColorArray.value[resonanceSq];
                    if ([COLOR_EMPTY, color].includes(stoneColor)) {
                        const controlLocations = locateFieldNonzeroFromCenter(
                            resonanceSq,
                            HALF_OPEN_RADIUS_OF_FIVE,
                            foreOf,
                            backOf,
                            (_sq: number) => false,  // continue 条件
                            makeIsOutOfBoardOrColor(oppositeTurnColor(color)),    // break 条件
                        );

                        if (controlLocations.length + 1 < FIVE_LENGTH) { // ［五］を作れない方向なら［死に方向］です
                            gameBoard1MaxLengthArray.value[direction][color][resonanceSq] = MAX_LENGTH_DEAD;

                        } else {
                            // 影響点を中心とする直径９のスライディング・ウィンドウ　＞　水平方向
                            const resonanceSlidingWindowArray: number[][] = makeSlidingWindowArray(
                                resonanceSq,
                                HALF_OPEN_RADIUS_OF_NINE,
                                HALF_OPEN_RADIUS_OF_FIVE,
                                foreOf,
                                backOf,
                            );

                            gameBoard1MaxLengthArray.value[direction][color][resonanceSq] = countMaxStones(
                                resonanceSlidingWindowArray,
                                color,
                            );
                        }
                    }
                }
            }

            // ++++++++++++++++++++
            // + ［割り打ち］処理 +
            // ++++++++++++++++++++
            executeWariuchiOneDirection(
                moveSq,
                direction,
                foreOf,
                backOf,
            );

            // ++++++++++++++++
            // + ［五］の処理 +
            // ++++++++++++++++
            //
            // ［五］ができているかどうかは、手番でだけ確認すれば構いません。
            //

            fiveStonesProcessingOneDirection(    // 水平方向
                moveSq,
                allDirectionsForeOf[direction],
                allDirectionsBackOf[direction],
                gameBoard1StonesState,
                stoneStateAliveArray[direction],
            );
        }

        gameBoard1Turn.value = oppositeTurnColor1; // （チェック後に）相手の色に変更
        gameBoard1Times.value += 1;
        gameBoard1StoneCount.value[turnColor] += 1;
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
            for (const color of [COLOR_BLACK, COLOR_WHITE]) {
                gameBoard1MaxLengthArray.value[DIRECTION_HORIZONTAL][color][sq] = 0;
                gameBoard1MaxLengthArray.value[DIRECTION_VERTICAL][color][sq] = 0;
                gameBoard1MaxLengthArray.value[DIRECTION_BAROQUE_DIAGONAL][color][sq] = 0;
                gameBoard1MaxLengthArray.value[DIRECTION_SINISTER_DIAGONAL][color][sq] = 0;
            }

            // マス上で自石が（隙間なく）連続しているとみたときの状態
            gameBoard1StonesState.value[sq] = STONE_STATE_NONE;
            gameBoard1SquaresBingo.value[sq] = COLOR_EMPTY as Color;
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
                    let itsOk = false;
                    let count = 0;
                    while(!itsOk && count <= gameMachineRandomLimit) {
                        // 適当に石を置く
                        const sq = Math.floor(Math.random() * gameBoard1Area.value);
                        itsOk = putStone(sq);
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
                            itsOk = putStone(lastSq);   // 必ず置けるはず
                            if (!itsOk) {
                                throw Error(`石を置けなかった。 lastSq=${lastSq} gameBoard1Turn.value=${gameBoard1Turn.value}`);
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
    function oppositeTurnColor(color: number) : number {
        return color % 2 + 1;   // 1 なら 2 に、2 なら 1 に
    }


    /**
     * ［五］の処理。
     * 内訳は、走査（スキャン）、判定（ジャッジメント）、記入（チェック）
     * 
     * @param startSq 
     * @param foreOf 
     * @param backOf 
     * @param directionalStoneStateArray 
     * @param aliveDirection 
     */
    function fiveStonesProcessingOneDirection(
        startSq: number,    // 打った場所。自石が置いている前提。 FIXME: 空点の場所のケースもある
        foreOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
        directionalStoneStateArray: Ref<Array<number>>,
        aliveDirection: number,
    ) : void {
        const runsNineSquares = [
            startSq,
            ...locateFieldNonzeroFromCenter(
                startSq,
                HALF_OPEN_RADIUS_OF_NINE,
                foreOf,
                backOf,
                (_sq: number) => false,  // continue 条件
                (sq: number) => isOutOfBoardOrColor(oppositeTurnColor(gameBoard1Turn.value), sq),   // break 条件
            ),
        ];

        const continuityStones: number[] = [];  // 連続している自石のマス番号

        function processingContinuityStones() : void {
            if (5 <= continuityStones.length) {   // ［五］ができていたら
                for (const sq of continuityStones) {
                    directionalStoneStateArray.value[sq] |= aliveDirection; // 論理和
                }
            }

            continuityStones.length = 0;    // クリアー
        }

        for (const sq of runsNineSquares) {
            // 盤外、相手の石は含まない

            // 手番の石なら
            if (gameBoard1StoneColorArray.value[sq] == gameBoard1Turn.value) {
                continuityStones.push(sq);

            // 自石でなければ
            } else {
                processingContinuityStones();
            }
        }

        processingContinuityStones();
    }


    /**
     * 石を数えます
     * @param locations 
     * @param color 
     */
    function countStones(
        locations: number[],
        color: number,
    ) : number {
        let count = 0;

        for (const sq of locations) {
            if (gameBoard1StoneColorArray.value[sq] == color) {
                count += 1;
            }
        }

        return count;
    }


    /**
     * 各ウィンドウの内、石の最大数を返す
     */
    function countMaxStones(
        slidingWindowArray: number[][],
        color: Color,
    ) : number {
        let maxCount = 0;

        for (const slidingWindow of slidingWindowArray) {
            let count = 0;
            for (const sq of slidingWindow) {
                if (gameBoard1StoneColorArray.value[sq] == color) {
                    count += 1;
                }
            }
            maxCount = Math.max(count, maxCount);
        }

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
     * @param moveSq 着手点 
     */
    function executeWariuchiOneDirection(
        moveSq: number,
        direction: Direction,
        foreOf: (sq: number) => number,
        backOf: (sq: number) => number,
    ) : void {
        // 相手番の石
        let foreOppositeTurnStones = locateFieldNonzeroBasic(   // 順ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            HALF_OPEN_RADIUS_OF_NINE,
            foreOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(gameBoard1Turn.value, sq),   // break 条件
        );
        let backOppositeTurnStones = locateFieldNonzeroBasic(   // 逆ウィング側。着手点と、挟んでいる自石の間にある相手石を探す
            moveSq,
            HALF_OPEN_RADIUS_OF_NINE,
            backOf,
            (sq: number) => isEmptyPoint(sq),   // continue 条件
            (sq: number) => isOutOfBoardOrColor(gameBoard1Turn.value, sq),   // break 条件
        );

        //console.log(`DEBUG: [oppositeTurnStonesCheckFieldOneDirection] startSq=${startSq}`);
        const oppositeTurnColor1 = oppositeTurnColor(gameBoard1Turn.value);

        for (const oppositeTurnStoneSq of foreOppositeTurnStones) {
            const directionControlLocations = locateFieldNonzeroFromCenter(
                oppositeTurnStoneSq,
                HALF_OPEN_RADIUS_OF_NINE,
                foreOf,
                backOf,
                (_sq: number) => false,  // continue 条件
                makeIsOutOfBoardOrColor(gameBoard1Turn.value),  // break 条件
            );
            if (directionControlLocations.length + 1 < FIVE_LENGTH) { // ［五］を作れない方向なら［死に方向］です
                gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][oppositeTurnStoneSq] = MAX_LENGTH_DEAD;
            } else {
                gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][oppositeTurnStoneSq] = countStones(
                    directionControlLocations,
                    oppositeTurnColor1,
                );
            }
        }

        for (const oppositeTurnStoneSq of backOppositeTurnStones) {
            const directionControlLocations = locateFieldNonzeroFromCenter(
                oppositeTurnStoneSq,
                HALF_OPEN_RADIUS_OF_NINE,
                foreOf,
                backOf,
                (_sq: number) => false,  // continue 条件
                makeIsOutOfBoardOrColor(gameBoard1Turn.value),  // break 条件
            );
            if (directionControlLocations.length + 1 < FIVE_LENGTH) { // ［五］を作れない方向なら［死に方向］です
                gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][oppositeTurnStoneSq] = MAX_LENGTH_DEAD;
            } else {
                gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][oppositeTurnStoneSq] = countStones(
                    directionControlLocations,
                    oppositeTurnColor1,
                );
            }
        }

        // 相手の［死に石］を記入
        oppositeTurnStonesCheckDeadOnDirection(direction, foreOppositeTurnStones);
        oppositeTurnStonesCheckDeadOnDirection(direction, backOppositeTurnStones);
    }


    /**
     * パス
     */
    function gamePass() : void {
        gameBoard1Times.value += 1;
        gameBoard1PassCount.value += 1;
        gameBoard1Turn.value = oppositeTurnColor(gameBoard1Turn.value);
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
     */
    function oppositeTurnStonesCheckDeadOnDirection(
        direction: Direction,
        locations: number[],
    ) : void {
        const oppositeTurnColor1 = oppositeTurnColor(gameBoard1Turn.value);

        for (const sq of locations) {
            if (oppositeTurnStoneIsDead(direction, sq)) {
                gameBoard1MaxLengthArray.value[direction][oppositeTurnColor1][sq] = MAX_LENGTH_DEAD;    // 論理和ではなくて、上書き。
            }
        }
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
     * ［片翼］取得
     * 
     * 指定の向きの各マスをスキャン。
     * 着手点を含めない（Non-zero）。
     * 
     * @returns マス番号の配列
     */
    function locateFieldNonzeroBasic(
        startSq: number,
        maxLength: number,
        nextOf: (sq: number)=>number,
        isContinue: (sq: number)=>boolean,
        isBreak: (sq: number)=>boolean,
    ) : number[] {
        const locations: number[] = [];

        let nextSq: number = startSq;;  // 隣
        for(let i:number=0; i<maxLength; i++){
            nextSq = nextOf(nextSq);

            if (isContinue(nextSq)) {   // 無視条件
                continue;
            }

            if (isBreak(nextSq)) {   // 終了条件
                break;
            }

            locations.push(nextSq);
        }

        return locations;
    }


    /**
     * ［飛び石］の位置を調べるために。
     * 
     *  0 1 2 3 4 5 6 7 8
     * +-+-+-+-+-+-+-+-+-+
     * | | | | |x| | | | |
     * +-+-+-+-+-+-+-+-+-+
     * 
     * 着手点を含めない（Non-zero）。
     * 中央から両端へ向かって（From center）。
     * 
     * @param centerSq 
     * @param halfOpenRadius 
     * @param foreOf 
     * @param backOf 
     */
    function locateFieldNonzeroFromCenter(
        centerSq: number,
        halfOpenRadius: number,
        foreOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
        isContinue: (sq: number)=>boolean,
        isBreak: (sq: number)=>boolean,
    ) : number[] {
        // ［逆半開半径］を戻る
        const backSqArray: number[] = locateFieldNonzeroBasic(
            centerSq,
            halfOpenRadius,
            backOf,
            isContinue,
            isBreak,
        );

        // 順ウィング（起点を含まない）を進む
        const foreSqArray: number[] = locateFieldNonzeroBasic(
            centerSq,
            halfOpenRadius,
            foreOf,
            isContinue,
            isBreak,
        );

        return [    // 向きを揃えて１つの配列にする
            ...backSqArray.reverse(),
            // centerSq を含まない,
            ...foreSqArray,
        ];
    }


    /**
     * スライディング・ウィンドウの１ウィンドウ分
     * @param startSq 
     * @param foreOf 
     * @param backOf 
     */
    function makeOneWindow(
        startSq: number,
        foreLength: number,
        backLength: number,
        foreOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : number[] {
        const backLocations : number[] = [];
        const foreLocations : number[] = [];

        // ウィンドウの後方（起点を含まない）
        let backSq = startSq;
        for (let i:number=0; i<foreLength; i++) {
            backSq = backOf(backSq);
            if (isOutOfBoard(backSq)) { // break 条件
                break;
            }

            backLocations.push(backSq);
        }

        // ウィンドウの前方（起点を含まない）
        let foreSq = startSq;
        for (let i:number=0; i<backLength; i++) {
            foreSq = foreOf(foreSq);
            if (isOutOfBoard(foreSq)) { // break 条件
                break;
            }

            foreLocations.push(foreSq);
        }

        return [
            ...backLocations.reverse(),
            startSq,
            ...foreLocations
        ];
    }

    /**
     * スライディング・ウィンドウ作成
     * ［五］を判定するのに使う。
     * 
     * @param inputArray 
     * @param isBreak 
     */
    function makeSlidingWindowArray(
        startSq: number,
        halfOpenRadiusOfInputArray: number,
        halfOpenRadiusOfWindow: number,
        foreOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : number[][] {
        const slidingWindowArray : number[][] = [];

        const amplitude = halfOpenRadiusOfInputArray - halfOpenRadiusOfWindow;  // 前後の振り幅
        const slidingWindowNum = 2 * amplitude + 1;
        //console.log(`DEBUG: [makeSlidingWindowArray] amplitude=${amplitude} slidingWindowNum=${slidingWindowNum}`);

        for (let iSlidingWindow: number=0; iSlidingWindow < slidingWindowNum; iSlidingWindow++) {
            const oneWindow = makeOneWindow(
                startSq,
                halfOpenRadiusOfInputArray - iSlidingWindow,
                iSlidingWindow,
                foreOf,
                backOf
            );
            console.log(`DEBUG: [makeSlidingWindowArray] (${iSlidingWindow}) oneWindow=${oneWindow} startSq=${startSq}`);
            slidingWindowArray.push(oneWindow)
        }

        return slidingWindowArray;
    }

    /**
     * スライディング・ウィンドウの配列を与えたら、
     * ウィンドウが全て自石でできているか確認し、
     * そのようなウィンドウが１つでも有れば真となるような関数。
     */
    function getBingoLocations(
        slidingWindowArray: number[][],
        stoneColor: Color,
        bingoNum: number,
    ) : Set<number> {
        let bingoLocations = new Set<number>();

        for (const aWindow of slidingWindowArray) {
            console.log(`DEBUG: [getBingoLocations] aWindow.length=${aWindow.length} bingoNum=${bingoNum}`);
            if (aWindow.length < bingoNum) {    // 長さが足りないからビンゴを作れない
                continue;
            }
            
            const stones = new Set<number>();
            for (const sq of aWindow) {
                if (!isOutOfBoard(sq) && gameBoard1StoneColorArray.value[sq] == stoneColor) {
                    stones.add(sq);
                }
            }

            if (bingoNum <= stones.size) {
                bingoLocations = new Set<number>([...bingoLocations, ...stones]);
            }
        }

        return bingoLocations;
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
     * @param direction
     * @param stoneSq 
     */
    function oppositeTurnStoneIsDead(
        direction: Direction,
        stoneSq: number,
    ) : boolean {
        const nonzeroDiameterNine = [
            stoneSq,
            ...locateFieldNonzeroFromCenter(
                stoneSq,
                HALF_OPEN_RADIUS_OF_NINE,
                allDirectionsForeOf[direction],
                allDirectionsBackOf[direction],
                (_sq: number) => false,  // continue 条件
                (sq: number) => isOutOfBoardOrColor(gameBoard1Turn.value, sq),   // break 条件
            ),
        ];

        return stonesIsDead([
            stoneSq,
            ...nonzeroDiameterNine
        ]);
    }


    /**
     * 盤の外か
     * @param color 
     * @param sq 
     */
    function isOutOfBoard(sq: number) : boolean {
        return sq == -1;
    }


    /**
     * 空点か
     * @param sq 
     */
    function isEmptyPoint(sq: number) : boolean {
        return sq != -1 && gameBoard1StoneColorArray.value[sq] == COLOR_EMPTY;
    }


    /**
     * 盤の外、または指定の石の色か
     * @param color 
     * @param sq 
     */
    function isOutOfBoardOrColor(color: number, sq: number) : boolean {
        return sq == -1 || gameBoard1StoneColorArray.value[sq] == color;
    }


    /**
     * 盤の外、または指定の石の色か
     * @param endColor 
     */
    function makeIsOutOfBoardOrColor(endColor: number) :
        (sq: number)=>boolean
    {
        return (sq: number)=>{
            return sq == -1 || gameBoard1StoneColorArray.value[sq] == endColor;
        }
    }


    /**
     * 盤の外、または指定の石の色か
     * @param endColor 
     */
    function makeIsOutOfBoardOrColors(endColors: number[]) :
        (sq: number)=>boolean
    {
        return (sq: number)=>{
            return sq == -1 || endColors.includes(gameBoard1StoneColorArray.value[sq]);
        }
    }


    /**
     * ［死に飛び石］判定
     * 
     * ［飛び石］の長さが５に満たないとき、［死に飛び石］だ。
     */
    function stonesIsDead(
        stones: number[],
    ) : boolean {
        return stones.length < FIVE_LENGTH;
    }

</script>

<style lang="css" scoped>
    @import '@/styles/misc.css';
    @import '@/styles/talk-pen.css';
</style>
