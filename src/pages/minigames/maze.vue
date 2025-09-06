<template>
    <the-header/>

    <!-- ボタン機能拡張 -->
    <button-20250822 ref="button1Ref"/>

    <h3>迷路</h3>
    <section class="sec-3">
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
                　…　自機を上下左右へ、印字を逆方向へ動かすぜ！
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

        <!-- ストップウォッチ。デバッグに使いたいときは、 display: none; を消してください。 -->
        <stopwatch
            ref="stopwatch1Ref"
            v-on:countUp="(countNum) => { stopwatch1Count = countNum; }"
            style="display: none;" />

        <div
            class="board"
            :style="board1Style">

            <!--
                スクウェアのグリッド。
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <Tile
                v-for="i in board1Area" :key="i"
                :style="getSquareStyle(i - 1)"
                :srcLeft="getSourceTileLeftBySquare(i - 1)"
                :srcTop="0"
                :srcWidth="tileBoard1TileWidth"
                :srcHeight="tileBoard1TileHeight"
                tilemapUrl="/img/making/tilemap_floor.png" />

            <!-- 自機１ -->
            <tile-animation
                :frames="player1Frames"
                tilemapUrl="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
                :slow="player1AnimationSlow"
                :time="stopwatch1Count"
                class="player"
                :style="player1Style"
                style="image-rendering: pixelated;" /><br/>
            
            <!-- 視界の外 -->
            <div
                :style="`
                    width:${board1WithMaskFileNum * tileBoard1TileWidth}px;
                    height:${board1WithMaskRankNum * tileBoard1TileHeight}px;
                    border-top: solid ${board1WithMaskSizeSquare * tileBoard1TileHeight}px rgba(0,0,0,0.5);
                    border-right: solid ${(board1WithMaskSizeSquare + board1WithMaskBottomRightMargin) * tileBoard1TileWidth}px rgba(0,0,0,0.5);
                    border-bottom: solid ${(board1WithMaskSizeSquare + board1WithMaskBottomRightMargin) * tileBoard1TileHeight}px rgba(0,0,0,0.5);
                    border-left: solid ${board1WithMaskSizeSquare * tileBoard1TileWidth}px rgba(0,0,0,0.5);
                    zoom:${commonZoom};
                `"
                style="position:absolute; left:0; top:0; image-rendering: pixelated;"></div>
        </div>

        <p>👆半透明の黒いマスクのところは画面に映らないようにすればＯｋだぜ（＾～＾）！</p>
        <br/>

        <p>👇タイルのインデックスだぜ（＾▽＾）：</p>
        <div :style="board1ContainerStyle">
            <!--
                グリッド
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <div v-for="i in board1Area" :key="i"
                :style="getSquareStyle(i - 1)"
                style="border:dashed 1px gray;">{{ getTileIndexBySquare(i - 1) }}</div>
        </div>
        <p>：ここまで。</p>
        <br/>

        <p>元画像のタイルマップを表示：</p>
        <v-img
            src="/img/making/tilemap_floor.png"
            :style="`zoom: ${commonZoom}; width: ${tileBoard1TileWidth}px; height:${tileBoard1TileHeight}px;`"
            style="image-rendering: pixelated; border:dashed gray 1px;"/>
        <p>：ここまで。</p>

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

    import { computed, onMounted, ref } from 'vue';
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
    import SourceLink from '../../components/SourceLink.vue';
    import Stopwatch from '../../components/Stopwatch.vue';
    import Tile from '../../components/Tile.vue';
    import TileAnimation from '../../components/TileAnimation.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { wrapAround } from '../../composables/board-operation';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++

    import type Rectangle from '../../interfaces/Rectangle';

    
    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //

    const commonZoom = 4;
    const commonSpriteMotionLeft = -1;  // モーション（motion）定数。左。
    const commonSpriteMotionUp = -1;
    const commonSpriteMotionRight = 1;
    const commonSpriteMotionDown = 1;


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　何もしないボタン +
    // ++++++++++++++++++++++++++++++++++++++

    const noopButton = ref<InstanceType<typeof VBtn> | null>(null);

    // ++++++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン押しっぱなし機能 +
    // ++++++++++++++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ストップウォッチ１ +
    // ++++++++++++++++++++++++++++++++++++++++

    const stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null); // Stopwatch のインスタンス
    const stopwatch1Count = ref<number>(0);   // カウントの初期値

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　タイル盤１ +
    // ++++++++++++++++++++++++++++++++

    const tileBoard1TileWidth = 32;
    const tileBoard1TileHeight = 32;
    const board1FileNum = 5;  // 筋の数
    const board1RankNum = 5;  // 段の数
    const board1Area = computed(()=> {  // 盤のマス数
        return board1FileNum * board1RankNum;
    });
    const board1WithMaskSizeSquare = ref<number>(1);    // マスクの幅（単位：マス）
    const board1WithMaskBottomRightMargin = 1;          // マスクは右下に１マス分多く作ります。
    const board1WithMaskFileNum = board1FileNum + board1WithMaskBottomRightMargin
    const board1WithMaskRankNum = board1RankNum + board1WithMaskBottomRightMargin
    const board1Style = computed<CompatibleStyleValue>(()=>{  // ボードとマスクを含んでいる領域のスタイル
        return {
            width: `${commonZoom * board1WithMaskFileNum * tileBoard1TileWidth}px`,
            height: `${commonZoom * board1WithMaskRankNum * tileBoard1TileHeight}px`,
        };
    });
    const getSquareStyle = computed<
        (i:number)=>CompatibleStyleValue
    >(() => {
        return (i:number)=>{
            // プレイヤーが初期位置にいる場合の、マスの位置。
            const homeLeft = (i % board1FileNum) * tileBoard1TileWidth;
            const homeTop = Math.floor(i / board1FileNum) * tileBoard1TileHeight;

            const [offsetLeftLoop, offsetTopLoop] = wrapAround(
                homeLeft,
                homeTop,
                printing1Left.value,
                printing1Top.value,
                board1FileNum * tileBoard1TileWidth,
                board1RankNum * tileBoard1TileHeight,
            );

            return {
                position: 'absolute',
                left: `${homeLeft + offsetLeftLoop}px`,
                top: `${homeTop + offsetTopLoop}px`,
                width: `${tileBoard1TileWidth}px`,
                height: `${tileBoard1TileHeight}px`,
                zoom: commonZoom,
                imagePixelated: true,
            };
        };
    });
    const board1ContainerStyle = computed<CompatibleStyleValue>(()=>{  // ボードだけを含んでいる領域のスタイル
        const zoom = 4;
        
        return {
            position: 'relative',
            left: "0",
            top: "0",
            width: `${zoom * board1FileNum * tileBoard1TileWidth}px`,
            height: `${zoom * board1RankNum * tileBoard1TileHeight}px`,
        };
    });
    const board1FloorTilemapTileNum = 4;  // 床のタイルマップ
    const board1FloorTilemapCoordination = computed(() => {   // 座標
        const tileMap = [];
        for (let i = 0; i < board1Area.value; i++) {
            const files = i % board1FileNum;
            const ranks = Math.floor(i / board1FileNum);
            tileMap.push({ top: ranks * tileBoard1TileHeight, left: files * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight });
        }
        return tileMap;
    });
    const board1MapFiles = board1FileNum;  // マップデータ
    const board1MapRanks = board1RankNum;
    const board1MapArea = board1MapFiles * board1MapRanks;
    const getTileIndexBySquare = computed(() => {
        return (squareIndex: number) => {
            return printingMapData.value[squareIndex];
        };
    });
    const getSourceTileLeftBySquare = computed(() => {
        return (squareIndex: number) => {
            const tileIndex = printingMapData.value[squareIndex];
            return board1FloorTilemapCoordination.value[tileIndex]["left"];
        };
    });

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　像盤１ +
    // ++++++++++++++++++++++++**++
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const printing1Left = ref<number>(0);
    const printing1Top = ref<number>(0);
    const printing1Motion = ref<Record<string, number>>({  // 印字への入力
        wrapAroundRight: 0,   // 負なら左、正なら右
        wrapAroundBottom: 0,   // 負なら上、正なら下
    });
    const printing1MotionSpeed = ref<number>(2);        // 移動速度（単位：ピクセル）
    const printingMapData = computed(() => {    // ランダムなマップデータを生成
        const data = [];
        for (let i = 0; i < board1MapArea; i++) {
            data.push(Math.floor(Math.random() * board1FloorTilemapTileNum));  // 0からfloorTilemapTileNum - 1のランダムな整数を配置
        }
        return data;
    });

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++

    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const playerHome1File = ref<number>(2);     // ホーム
    const playerHome1Rank = ref<number>(2);
    const player1Left = ref<number>(2 * tileBoard1TileWidth);     // スプライトのX座標
    const player1Top = ref<number>(2 * tileBoard1TileHeight);     // スプライトのY座標
    const player1Input = <Record<string, boolean>>{             // 入力
        ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const player1AnimationSlow = ref<number>(8);    // アニメーションを何倍遅くするか
    const player1AnimationFacingFrames = 1;         // 振り向くフレーム数
    const player1AnimationWalkingFrames = 16;       // 歩行フレーム数
    const player1Style = computed<CompatibleStyleValue>(() => ({
        left: `${player1Left.value}px`,
        top: `${player1Top.value}px`,
        zoom: commonZoom,
    }));
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
    const player1MotionWait = ref<number>(0);   // 排他的モーション時間。
    const player1Motion = ref<Record<string, number>>({  // モーションへの入力
        lookRight: 0,     // 向きを変える
        lookBottom: 0,
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
            
            // キー入力をモーションに変換
            if (player1MotionWait.value<=0) {   // ウェイトが無ければ、入力を受け付ける。

                // 位置のリセット
                if (player1Input[" "]) {
                    player1Left.value = playerHome1File.value * tileBoard1TileWidth;   // 自機
                    player1Top.value = playerHome1Rank.value * tileBoard1TileHeight;
                    printing1Left.value = 0;                                         // 印字
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
                printing1Left.value -= printing1MotionSpeed.value;
            } else if (printing1Motion.value["wrapAroundRight"] == commonSpriteMotionRight) {   // 右
                printing1Left.value += printing1MotionSpeed.value;
            }

            if (printing1Motion.value["wrapAroundBottom"] == commonSpriteMotionUp) {  // 上
                printing1Top.value -= printing1MotionSpeed.value;
            } else if (printing1Motion.value["wrapAroundBottom"] == commonSpriteMotionDown) {   // 下
                printing1Top.value += printing1MotionSpeed.value;
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

                if (printing1Motion.value["wrapAroundRight"]!=0 || printing1Motion.value["wrapAroundBottom"]!=0) {
                    //  || player1Motion.value["goToRight"]!=0 || player1Motion.value["goToBottom"]!=0
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
</script>

<style scoped>
    div.board { /* 盤１ */
        position: relative;
        left: 0;
        top: 0;
    }
    div.player {    /* 自機１ */
        position: relative;
        width: 32px;
        height: 32px;
    }
</style>
