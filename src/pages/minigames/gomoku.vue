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
    Runs:<br/>
    <span
        v-for="i in range(0,15)"
        :key="i"
    >
        {{ gameBoard1StoneRunsHorizontalArray[i] }}&nbsp;
    </span><br/>
    <span
        v-for="i in range(15,30)"
        :key="i"
    >
        {{ gameBoard1StoneRunsHorizontalArray[i] }}&nbsp;
    </span><br/>

    マス番号:<br/>
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
    
    石の状態:<br/>
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
    const gameBoard1StoneRunsHorizontalArray = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上で石が水平方向に（飛び飛びでも）続いている石の数
    const gameBoard1StoneRunsVerticalArray = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の垂直方向
    const gameBoard1StoneRunsBaroqueDiagonalArray = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の左下から右上に上がる対角線方向
    const gameBoard1StoneRunsSinisterDiagonalArray = ref<number[]>(new Array(gameBoard1Area.value).fill(0));   // マス上の石の左上から右下に下がる体格線方向

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
    const STONE_STATE_DEAD = 16;
    function isAliveStone(sq: number) : boolean {
        return 1 <= gameBoard1StoneStateArray.value[sq] && gameBoard1StoneStateArray.value[sq] <= 15;
    }
    const gameBoard1StoneStateArray = ref<Array<number>>(new Array(gameBoard1Area.value).fill(STONE_STATE_NONE));

    const gameBoard1SquareSrcTilemapRect = computed<
        (sq: number)=>Rectangle
    >(()=>{
        return (sq: number)=>{

            function getRunsKey(
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


            function getKeyOfSolidLine(sq: number) : string {
                // ［生き石］
                if (isAliveStone(sq)) {
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
                    
                // ［死に石］
                } else if ((gameBoard1StoneStateArray.value[sq] & STONE_STATE_DEAD) == STONE_STATE_DEAD) {
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

                // ［どちらでもない］
                return '';
            }


            // （途切れず）連続する石判定
            let buttonImageKey = getKeyOfSolidLine(sq);
            if (buttonImageKey != ''){
                return gameBoard1SourceTilemap1Frames[buttonImageKey];
            }

            // 水平、垂直、バロック対角線、シニスター対角線のうち、最も接続数の多いもの：
            const conn = Math.max(
                gameBoard1StoneRunsHorizontalArray.value[sq], // 水平
                gameBoard1StoneRunsVerticalArray.value[sq],   // 垂直
                gameBoard1StoneRunsBaroqueDiagonalArray.value[sq],    // バロック対角線
                gameBoard1StoneRunsSinisterDiagonalArray.value[sq],   // シニスター対角線
            );            
            buttonImageKey = getRunsKey(
                sq,
                conn
            );
            //console.log(`sq=${sq} key=${key} gameBoard1SourceTilemap1Frames[key]=${gameBoard1SourceTilemap1Frames[key]}`);
            return gameBoard1SourceTilemap1Frames[buttonImageKey];
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
        const START_SQ = 7; // 着手点
        const ONE_WING_MAX_LENGTH = 4;  // 片翼（着手点を含まない）の最大長さ
        const FWD_DIRECTION = eastOf; // 順方向
        const REV_DIRECTION = westOf; // 逆方向
        const oneWing = getOneWing(
            BLACK,
            START_SQ,
            ONE_WING_MAX_LENGTH,
            FWD_DIRECTION,
        );
        console.log(`TEST: oneWing=${oneWing}`);

        const runs = getRuns(
            BLACK,
            START_SQ,
            ONE_WING_MAX_LENGTH,
            FWD_DIRECTION,
            REV_DIRECTION,
        );
        console.log(`TEST: runs=${runs}`);

        const isDeadRuns = checkDeadRuns(
            BLACK,
            START_SQ,
            ONE_WING_MAX_LENGTH,
            FWD_DIRECTION,
            REV_DIRECTION,
        );
        console.log(`TEST: isDeadRuns=${isDeadRuns} color=${BLACK}`);

        const isDeadStone = checkDeadStone(
            BLACK,
            START_SQ,
        );
        console.log(`TEST: isDeadStone=${isDeadStone} color=${BLACK} startSq=${START_SQ}`);
        // if (isDeadStone) {
        // TODO:     directionalSolidLineArray.value[START_SQ] = 'Dead';
        // }

        const eightWayIntersection = getEightWayIntersection(
            BLACK,
            START_SQ,
            ONE_WING_MAX_LENGTH,
        );
        console.log(`TEST: eightWayIntersection=${eightWayIntersection} color=${BLACK} startSq=${START_SQ} ONE_WING_MAX_LENGTH=${ONE_WING_MAX_LENGTH}`);
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
     * 石を置く
     * @param sq 
     * @param color 
     */
    function putStone(sq: number, color: number) : boolean {
        if (!gameBoard1StoneClickable.value(sq)) {  // 石を置けないマスなら
            return false;
        }

        gameBoard1StoneColorArray.value[sq] = color;
        checkGomokuRuns(sq);    // 石のつながりをチェックします
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
            gameBoard1StoneRunsHorizontalArray.value[sq] = 0;
            gameBoard1StoneRunsVerticalArray.value[sq] = 0;
            gameBoard1StoneRunsBaroqueDiagonalArray.value[sq] = 0;
            gameBoard1StoneRunsSinisterDiagonalArray.value[sq] = 0;

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


    function checkGomokuRunsSingleLine(
        friendColor: number,    // 自石の色
        startSq: number,    // 打った場所。自石が置いている前提。 FIXME: 空点の場所のケースもある
        aNextOf: (sq: number)=>number,
        bNextOf: (sq: number)=>number,
        directionalRunsArray: Ref<number[]>,
        directionalStoneStateArray: Ref<Array<number>>,
        aliveDirection: number,
        hasDeadCheck: boolean,  // 死に石判定をするか
    ) : void {
        const opponentColor1 = opponentColor(friendColor);

        function checkDirectionalLineConnectionOfStones(
            nextOf: (sq: number)=>number,
            backOf: (sq: number)=>number,
        ) : void {
            //          ここに石を置いたら（仮定なので、空点でも構わない）
            //          v
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|.|.|o|.|.|.|.|
            // +-+-+-+-+-+-+-+-+-+
            //
            // 少なくとも：
            //
            // +-+-+-+-+-+-+-+-+-+
            // |w|w|w|w|w|.|.|.|.|  ウィンドウ０
            // +-+-+-+-+-+-+-+-+-+
            //
            // +-+-+-+-+-+-+-+-+-+
            // |.|w|w|w|w|w|.|.|.|  ウィンドウ１
            // +-+-+-+-+-+-+-+-+-+
            //
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|w|w|w|w|w|.|.|  ウィンドウ２
            // +-+-+-+-+-+-+-+-+-+
            //
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|.|w|w|w|w|w|.|  ウィンドウ３
            // +-+-+-+-+-+-+-+-+-+
            //
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|.|.|w|w|w|w|w|  ウィンドウ４
            // +-+-+-+-+-+-+-+-+-+
            //
            // 以上の５つの範囲で、連の長さを数えなおす必要がある。
            // ［累積和］か何か高速化技法が使えそうだが、とりあえず高速化せずに愚直に書いてみる。
            //
            //
            // とりあえず長さ９の配列を用意し、[4] を打った石のマス番号とし、
            //
            //  0 1 2 3 4 5 6 7 8
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|.|.|o|.|.|.|.|  スクウェア・マップ
            // +-+-+-+-+-+-+-+-+-+
            //            1 2 3 4   順方向へ４つ
            //  4 3 2 1             逆方向へ４つ
            //
            // 以上の９つのマス番号を探索する。
            // 予めすべての９つのマスを作ってテーブルにしておけば高速化できそうだが、とりあえず高速化せずに愚直に書いてみる。
            //
            // （１）ウィンドウ１～５のランズ数を調べる
            // （２）各マスには、ウィンドウ１～５の中の最大ランズ数を入れる。
            //
            // このとき、[4] を起点に端に向かって探索し、途中で［盤外］または［相手の石］とぶつかった場合は、そこで探索を終了する。
            // nextLength, backLength のようなカウントをしておくといいかも。
            // 例えば、相手の石（または盤外）が [1], [8] の位置にあるとき：
            //
            //  0 1 2 3 4 5 6 7 8
            // +-+-+-+-+-+-+-+-+-+
            // |.|x|.|.|o|.|.|.|x|
            // +-+-+-+-+-+-+-+-+-+
            //
            //      - - 
            //       A    - - -
            //              B
            //
            // B を nextLength、
            // A を backLength と呼ぶとし、
            // nextLength + backLength + 1 が 5 未満のとき、ランズ数は 0 とする。
            // [dead] マーカーを付けてもいいかも。
            //
            // ウィンドウは３と４だけ調べれよい：
            //
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|w|w|w|w|w|.|.|  ウィンドウ２
            // +-+-+-+-+-+-+-+-+-+
            // +-+-+-+-+-+-+-+-+-+
            // |.|.|.|w|w|w|w|w|.|  ウィンドウ３
            // +-+-+-+-+-+-+-+-+-+
            //
            //
            //
            //
            //

            const friendSqMap: number[] = new Array(9).fill(-1);    // ランズと［生き石］を判定するのに使う
            friendSqMap[4] = startSq;

            // 順ウィング
            let nextFriendLength = 0; // 0 ～ 4
            let nextSq: number;  // 隣
            nextSq = startSq;  // 隣
            for(let i:number=5; i<9; i++){  // 順方向
                nextSq = nextOf(nextSq);
                if (nextSq == -1 || gameBoard1StoneColorArray.value[nextSq] == opponentColor1) {  // 盤外、または相手の石なら
                    break;  // 探索終了
                }
                // 空点または自石なら
                friendSqMap[i] = nextSq;
                nextFriendLength += 1;
            }

            // 逆ウィング
            let backFriendLength = 0; // 0 ～ 4
            nextSq = startSq;  // 隣
            for(let i:number=3; 0<=i; i--){  // 逆方向
                nextSq = backOf(nextSq);
                if (nextSq == -1 || gameBoard1StoneColorArray.value[nextSq] == opponentColor1) {
                    break;
                }
                friendSqMap[i] = nextSq;
                backFriendLength += 1;
            }
            //console.log(`DEBUG: [Single Line] squareMap: ${friendSqMap[0]} ${friendSqMap[1]} ${friendSqMap[2]} ${friendSqMap[3]} ${friendSqMap[4]} ${friendSqMap[5]} ${friendSqMap[6]} ${friendSqMap[7]} ${friendSqMap[8]}`);

            const windowRunsNum: number[] = new Array(5).fill(0);    // ウィンドウ別のランズ数
            const startFriendWindow = 4 - backFriendLength;
            // ランズと［生き石］判定
            for(let window:number=startFriendWindow; window<5; window++){
                const friendWindowEnd = Math.min(window+5, 5+nextFriendLength); // end 自身を含まない
                if (5 < friendWindowEnd - window) {   // TODO: 消す
                    console.log(`
                        ERROR: [Single Line] startWindow=${startFriendWindow} window=${window} windowEnd=${friendWindowEnd} nextLength=${nextFriendLength}
                        window+5=${window+5}
                        5+nextLength=${5+nextFriendLength}
                    `);
                }
                let aliveContinuity = true;  // 連続でつながっている自石が継続中
                let aliveLength = 0;    // 連続でつながっている自石の長さ。［五］か否か判定するだけに使う
                for(let i:number=window; i<friendWindowEnd; i++){
                    // 盤外、相手の石は含まない
                    const sq = friendSqMap[i];

                    // 空きマスなら（連続は途切れるが）続行
                    if (gameBoard1StoneColorArray.value[sq] == COLOR_EMPTY) {
                        aliveContinuity = false;
                        continue;
                    }

                    // 自石なら
                    windowRunsNum[window] += 1;
                    if (aliveContinuity) {
                        aliveLength += 1;
                    }
                }
                
                if (5<=aliveLength) {   // ［五］ができていたら
                    for(let i:number=window; i<friendWindowEnd; i++){
                        const sq = friendSqMap[i];
                        directionalStoneStateArray.value[sq] |= aliveDirection; // 論理和
                    }
                }
            }

            // ++++++++++++++++++
            // + ［死に石］判定 +
            // ++++++++++++++++++

            if (hasDeadCheck) {
                // 死に石の判定対象となるのは：
                //
                // +--+--+--+--+--+--+--+--+--+
                // |15|  |  |  |11|  |  |  | 7|
                // +--+--+--+--+--+--+--+--+--+
                // |  |14|  |  |10|  |  | 6|  |
                // +--+--+--+--+--+--+--+--+--+
                // |  |  |13|  | 9|  | 5|  |  |
                // +--+--+--+--+--+--+--+--+--+
                // |  |  |  |12| 8| 4|  |  |  |
                // +--+--+--+--+--+--+--+--+--+
                // |19|18|17|16| x| 0| 1| 2| 3|
                // +--+--+--+--+--+--+--+--+--+
                // |  |  |  |20|24|28|  |  |  |
                // +--+--+--+--+--+--+--+--+--+
                // |  |  |21|  |25|  |29|  |  |
                // +--+--+--+--+--+--+--+--+--+
                // |  |22|  |  |26|  |  |30|  |
                // +--+--+--+--+--+--+--+--+--+
                // |23|  |  |  |27|  |  |  |31|
                // +--+--+--+--+--+--+--+--+--+
                //
                // 👆 x を自分の着手とするとき、上記の数字（xを含まない）の位置にある相手の石が対象。
                // この図形に名前はないが、８叉路（eight-way intersection）とでも呼ぶとする。
                //
                const ONE_WING_MAX_LENGTH = 4;
                const eightWayIntersection = getEightWayIntersection(
                    opponentColor1,
                    startSq,
                    ONE_WING_MAX_LENGTH,
                );
                eightWayIntersection.forEach((sq, _index, _array)=>{
                    const isDeadStone = checkDeadStone(
                        opponentColor1,
                        sq
                    );
                    if (isDeadStone) {
                        directionalStoneStateArray.value[sq] = STONE_STATE_DEAD;
                    }
                });
            }

            // （９つの切り取りマスの）各マスのランズ数を確定する：
            let sq;
            sq = friendSqMap[0];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[0]=${windowRunsNum[0]}`);
                directionalRunsArray.value[sq] = windowRunsNum[0];
            }

            sq = friendSqMap[1];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[1]=${windowRunsNum[1]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[0], windowRunsNum[1]);
            }

            sq = friendSqMap[2];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[2]=${windowRunsNum[2]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[0], windowRunsNum[1], windowRunsNum[2]);
            }

            sq = friendSqMap[3];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[3]=${windowRunsNum[3]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[0], windowRunsNum[1], windowRunsNum[2], windowRunsNum[3]);
            }

            sq = friendSqMap[4];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[4]=${windowRunsNum[4]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[0], windowRunsNum[1], windowRunsNum[2], windowRunsNum[3], windowRunsNum[4]);
            }

            sq = friendSqMap[5];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[5]=${windowRunsNum[5]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[1], windowRunsNum[2], windowRunsNum[3], windowRunsNum[4])
            }

            sq = friendSqMap[6];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[6]=${windowRunsNum[6]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[2], windowRunsNum[3], windowRunsNum[4]);
            }

            sq = friendSqMap[7];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[7]=${windowRunsNum[7]}`);
                directionalRunsArray.value[sq] = Math.max(windowRunsNum[3], windowRunsNum[4]);
            }

            sq = friendSqMap[8];
            if (sq != -1 && gameBoard1StoneColorArray.value[sq] == friendColor) {  // 自石なら
                //console.log(`DEBUG: [Single Line] windowRunsNum[8]=${windowRunsNum[8]}`);
                directionalRunsArray.value[sq] = windowRunsNum[4];
            }
        }


        checkDirectionalLineConnectionOfStones(
            aNextOf,
            bNextOf,
        );
    }

    /**
     * 石のつながりをチェックします
     * @param startSq 石を置いたマス番号
     */
    function checkGomokuRuns(startSq: number) : void {
        const friendColor = gameBoard1Turn.value;   // 自石の色
        const HAS_NOT_DEAD_CHECK: boolean = false;
        // 自石のつながりを更新します
        checkGomokuRunsSingleLine(    // 水平方向
            friendColor,
            startSq,
            eastOf,
            westOf,
            gameBoard1StoneRunsHorizontalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_HORIZONTAL,
            HAS_NOT_DEAD_CHECK
        );
        checkGomokuRunsSingleLine(    // 垂直方向
            friendColor,
            startSq,
            northOf,
            southOf,
            gameBoard1StoneRunsVerticalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_VERTICAL,
            HAS_NOT_DEAD_CHECK
        );
        checkGomokuRunsSingleLine(    // バロック対角線方向
            friendColor,
            startSq,
            northeastOf,
            southwestOf,
            gameBoard1StoneRunsBaroqueDiagonalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_BAROQUE_DIAGONAL,
            HAS_NOT_DEAD_CHECK
        );
        checkGomokuRunsSingleLine(    // シニスター対角線方向
            friendColor,
            startSq,
            southeastOf,
            northwestOf,
            gameBoard1StoneRunsSinisterDiagonalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_SINISTER_DIAGONAL,
            HAS_NOT_DEAD_CHECK
        );

        //
        // 例えば、
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // |.|o|o|o|.|o|.|.|.|
        // +-+-+-+-+-+-+-+-+-+
        //
        // のような［四］ができているところへ、
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // |.|o|o|o|x|o|.|.|.|
        // +-+-+-+-+-+-+-+-+-+
        //
        // [4] に割り打てば、［三］と［一］に減らせるはずです。
        // この仕掛けとしては、
        //
        //          0 1 2 3 4 5 6 7 8
        //         +-+-+-+-+-+-+-+-+-+
        //         |.|o|o|o|x|o|.|.|.|
        //         +-+-+-+-+-+-+-+-+-+
        // -4-3-2-1 0 1 2 3 4
        // +-+-+-+-+-+-+-+-+-+
        // |.|.|.|.|O|.|.|.|.|
        // +-+-+-+-+-+-+-+-+-+
        //                    5 6 7 8 9101112
        //                 +-+-+-+-+-+-+-+-+-+
        //                 |.|.|.|.|O|.|.|.|.|
        //                 +-+-+-+-+-+-+-+-+-+
        //
        // [0] と [8] のマスを起点に[o]側のランズを更新すればよいはずです。
        // ただし、以下の局面では：
        //
        //  0 1 2 3 4 5 6 7 8
        // +-+-+-+-+-+-+-+-+-+
        // |.|x|o|o|.|o|.|.|.|
        // +-+-+-+-+-+-+-+-+-+
        //
        // [4] に割り打てば、［零］と［一］に減らせるはずです。
        // この仕掛けとしては、
        //
        //          0 1 2 3 4 5 6 7 8
        //         +-+-+-+-+-+-+-+-+-+
        //         |.|x|o|o|x|o|.|.|.|
        //         +-+-+-+-+-+-+-+-+-+
        //     -2-1 0 1 2 3 4 5 6
        //     +-+-+-+-+-+-+-+-+-+
        //     |.|.|.|.|O|.|.|.|.|
        //     +-+-+-+-+-+-+-+-+-+
        //
        // [0] ではなく、例えば [2] を起点とするべきです。
        // [0] では肝心の [2], [3] が更新されません。
        //

        // ++++++++++++++++++++++++++++++++++++++++++++++++++
        // + （途切れた）相手の石のつながりをチェックします +
        // ++++++++++++++++++++++++++++++++++++++++++++++++++

        function checkGomokuOpponentRuns(
            nextOf: (sq: number)=>number,
            backOf: (sq: number)=>number,
            directionalRunsArray: Ref<number[]>,
            directionalStoneStateArray: Ref<Array<number>>,
            aliveDirection: number,
        ) : void {
            const opponentColor1 = opponentColor(friendColor);
            const HAS_DEAD_CHECK = true;
            const ONE_WING_MAX_LENGTH = 4;
            //console.log(`DEBUG: [Opponent Wing] startSq=${startSq} friendColor=${friendColor} opponentColor1=${opponentColor1}`);

            function checkOpponentOneWing(
                friendStartSq: number,
                nextOf: (sq: number)=>number,
                backOf: (sq: number)=>number,
            ) {
                // 自石のウィング上の起点
                const opponentStartSq = farthestNextFrom(   // 自石から東へ
                    opponentColor1,
                    friendStartSq,
                    ONE_WING_MAX_LENGTH,
                    nextOf
                );
                //console.log(`DEBUG: [Opponent Wing 1] opponentColor1=${opponentColor1} friendStartSq=${friendStartSq} nextOpponentStartSq=${nextOpponentStartSq}`);
                if (opponentStartSq != friendStartSq) {   // 移動距離 0 は自石なので、弾く
                    checkGomokuRunsSingleLine(    // 水平方向
                        opponentColor1,
                        opponentStartSq,
                        nextOf,
                        backOf,
                        directionalRunsArray,
                        directionalStoneStateArray,
                        aliveDirection,
                        HAS_DEAD_CHECK
                    );
                }
            }

            // 順ウィング上の起点
            checkOpponentOneWing(startSq, nextOf, backOf);

            // 逆ウィング上の起点
            checkOpponentOneWing(startSq, backOf, nextOf);
        }

        checkGomokuOpponentRuns(    // 水平方向
            eastOf,
            westOf,
            gameBoard1StoneRunsHorizontalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_HORIZONTAL,
        );

        checkGomokuOpponentRuns(    // 垂直方向
            southOf,
            northOf,
            gameBoard1StoneRunsVerticalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_VERTICAL,
        );

        checkGomokuOpponentRuns(    // バロック対角線方向
            northeastOf,
            southwestOf,
            gameBoard1StoneRunsBaroqueDiagonalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_BAROQUE_DIAGONAL,
        );

        checkGomokuOpponentRuns(    // シニスター対角線方向
            southeastOf,
            northwestOf,
            gameBoard1StoneRunsSinisterDiagonalArray,
            gameBoard1StoneStateArray,
            STONE_STATE_ALIVE_SINISTER_DIAGONAL,
        );
    }


    /**
     * ［片翼］取得
     * 
     * 着手点を含まず、指定の向きに（隙間なく）連続する空点、自石が［翼］だ。
     * @returns マス番号の配列
     */
    function getOneWing(
        friendColor: number,
        startSq: number,
        maxLength: number,
        nextOf: (sq: number)=>number,
    ) : number[] {
        const sqArray: number[] = [];
        const opponentColor1 = opponentColor(friendColor);

        let nextSq: number = startSq;;  // 隣
        for(let i:number=0; i<maxLength; i++){
            nextSq = nextOf(nextSq);
            if (nextSq == -1 || gameBoard1StoneColorArray.value[nextSq] == opponentColor1) {  // 盤外、または相手の石なら
                break;  // 探索終了
            }
            // 空点または自石なら
            sqArray.push(nextSq);
        }

        return sqArray;
    }

    /**
     * ［飛び石］取得
     * 
     * ［逆ウィング］の逆順、着手点、順ウィングを合わせたものが［飛び石］だ。
     * @returns マス番号の配列
     */
    function getRuns(
        friendColor: number,
        startSq: number,    // 着手点
        oneWingMaxLength: number,
        nextOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : number[] {
        // 順ウィング
        const fwdWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            nextOf,
        );

        // 逆ウィング
        const revWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            backOf,
        );

        return [...revWing.reverse(), startSq, ...fwdWing]; // 向きを揃えて１つの配列にする
    }

    /**
     * ［死に飛び石］判定
     * 
     * 着手点、順ウィング、逆ウィングを合わせて長さが５に満たないとき、［死に飛び石］だ。
     */
    function checkDeadRuns(
        friendColor: number,
        startSq: number,    // 着手点
        oneWingMaxLength: number,
        nextOf: (sq: number)=>number,
        backOf: (sq: number)=>number,
    ) : boolean {
        const runs = getRuns(
            friendColor,
            startSq,
            oneWingMaxLength,
            nextOf,
            backOf,
        );
        return runs.length < 5;
    }


    /**
     * ［死に石］判定
     * 
     * ４方向（水平、垂直、バロック対角線、シニスター対角線）全てが［死に飛び石］のとき、［死に石］だ。
     */
    function checkDeadStone(
        friendColor: number,
        startSq: number,
    ) : boolean {
        const ONE_WING_MAX_LENGTH = 5;
        const horizontalIsDeadRuns = checkDeadRuns(
            friendColor,
            startSq,
            ONE_WING_MAX_LENGTH,
            eastOf,
            westOf,
        );
        const verticalIsDeadRuns = checkDeadRuns(
            friendColor,
            startSq,
            ONE_WING_MAX_LENGTH,
            southOf,
            northOf,
        );
        const baroqueDiagonalIsDeadRuns = checkDeadRuns(
            friendColor,
            startSq,
            ONE_WING_MAX_LENGTH,
            northeastOf,
            southwestOf,
        );
        const sinisterDiagonalIsDeadRuns = checkDeadRuns(
            friendColor,
            startSq,
            ONE_WING_MAX_LENGTH,
            southeastOf,
            northwestOf,
        );
        return horizontalIsDeadRuns && verticalIsDeadRuns && baroqueDiagonalIsDeadRuns && sinisterDiagonalIsDeadRuns;
    }


    /**
     * TODO: 以下の数字の位置（x を含まない）のマス番号を取得。
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
    function getEightWayIntersection(
        friendColor: number,
        startSq: number,
        oneWingMaxLength: number,
    ) : number[] {
        const eastWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            eastOf,
        );
        const northeastWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            northeastOf,
        );
        const northWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            northOf,
        );
        const northwestWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            northwestOf,
        );
        const westWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            westOf,
        );
        const southwestWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            southwestOf,
        );
        const southWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            southOf,
        );
        const southeastWing = getOneWing(
            friendColor,
            startSq,
            oneWingMaxLength,
            southeastOf,
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


    function farthestNextFrom(
        friendColor: number,
        startSq: number,
        maxLength: number,
        nextOf: (sq: number)=>number,
    ) : number {
        const opponentColor1 = opponentColor(friendColor);
        let nextSq = startSq;
        for(let i:number=0; i<maxLength; i++) {
            const featureSq = nextOf(nextSq);
            //console.log(`farthestNextFrom: friendColor=${friendColor} opponentColor1=${opponentColor1} nextSq=${nextSq} featureSq=${featureSq}`);

            if (featureSq == -1 || gameBoard1StoneColorArray.value[featureSq] == opponentColor1) {  // 盤外または相手の石なら
                break;
            }

            // 自石、または空点
            nextSq = featureSq;
        }

        return nextSq;
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

</script>

<style lang="css" scoped>
    @import '@/styles/misc.css';
    @import '@/styles/talk-pen.css';
</style>
