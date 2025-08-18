<template>

    <h4><span class="parent-header">ＲＰＧの歩行グラフィック　＞　</span>フェース・スクロール、盤の端処理</h4>
    <section class="sec-4">
        <p>キーボード操作方法</p>
        <ul>
            <li><span class="code-key">↑</span><span class="code-key">↓</span><span class="code-key">←</span><span class="code-key">→</span>キー　…　上下左右に動かすぜ！</li>
            <li><span class="code-key">（スペース）</span>キー　…　位置を最初の状態に戻すぜ。</li>
        </ul>
        <br/>

        <!-- ストップウォッチ。デバッグに使いたいときは、 display: none; を消してください。 -->
        <stopwatch
            ref="stopwatch1Ref"
            v-on:countUp="(countNum) => { stopwatch1Count = countNum; }"
            style="display: none;" />

        <v-switch
            v-model="appBoundaryIsLock"
            :label="appBoundaryIsLock ? '［画面外を見せない］中' : '［画面外を見せない］をしていません'"
            color="green"
            :hideDetails="true"
            inset
            @click="focusRemove()" />
            <section class="sec-1">
                <v-switch
                    v-model="appBoundaryWalkingEdge"
                    :disabled="!appBoundaryWalkingEdgeIsEnabled"
                    :label="appBoundaryWalkingEdge ? '［盤の端まで歩ける］を可能中' : '［盤の端まで歩ける］を可能にしていません'"
                    color="green"
                    :hideDetails="true"
                    inset
                    @click="focusRemove()" />
            </section>
        <!-- フォーカスを外すためのダミー・ボタンです -->
        <v-btn ref="noopButton">何もしないボタン</v-btn>

        <div :style="board1Style">

            <!--
                グリッド
                NOTE: ループカウンターは 1 から始まるので、1～9の9個のセルを作成。
            -->
            <div v-for="i in board1Area" :key="i"
                :style="getSquareStyle(i - 1)">{{ getFaceNumber(i - 1) }}</div>

            <!-- プレイヤー１ -->
            <tile-animation
                :frames="player1Frames"
                tilemapUrl="/img/making/202508__warabenture__15-1612-kifuwarabe-o1o0.png"
                :slow="player1AnimationSlow"
                :time="stopwatch1Count"
                class="cursor"
                :style="player1Style"
                style="image-rendering: pixelated;" /><br/>
            </div>

        <p>👆 ヨコ：１０、タテ：１０のサイズのフィールドを歩いてみてくれだぜ（＾▽＾）！</p>
        <p>上下左右の端に画面外が見えないようにロックがかかるか、また、盤の端まで歩けるか、試してみてくれだぜ（＾▽＾）！</p>
    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ＲＰＧの歩行グラフィック　＞　</span><span class="parent-header">フェース・スクロール、盤の端処理　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link
            pagePath="/making/input-axis-rpg-walk-scroll-loop"/>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    import type { CSSProperties } from 'vue';
    import { VBtn } from 'vuetify/components';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // from の階層が上の順、アルファベット順
    import SourceLink from '../../components/SourceLink.vue';
    import Stopwatch from '../../components/Stopwatch.vue';
    import TileAnimation from '../../components/TileAnimation.vue';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //

    const commonZoom = 4;
    const commonSpriteMotionToTop = -1;  // モーション（motion）定数。上に移動する
    const commonSpriteMotionToRight = 1;
    const commonSpriteMotionToBottom = 1;
    const commonSpriteMotionToLeft = -1;


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appBoundaryIsLock = ref<boolean>(true);                   // ［画面外隠し］を管理（true: ロックする, false: ロックしない）
    watch(appBoundaryIsLock, (newValue: boolean)=>{
        appBoundaryWalkingEdgeIsEnabled.value = newValue;
    });
    const appBoundaryWalkingEdge = ref<boolean>(true);              // ［盤の端の歩行］可能状態を管理（true: 可能にする, false: 可能にしない）
    const appBoundaryWalkingEdgeIsEnabled = ref<boolean>(true);     // ［盤の端の歩行］可能状態の活性性を管理（true: 不活性にする, false: 活性にする）


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　何もしないボタン +
    // ++++++++++++++++++++++++++++++++++++++

    const noopButton = ref<InstanceType<typeof VBtn> | null>(null);

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
    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const board1Top = ref<number>(0);
    const board1Left = ref<number>(0);
    const board1FileNum = 5;
    const board1RankNum = 5;
    const board1Area = computed(()=> {  // 盤のマス数
        return board1FileNum * board1RankNum;
    });
    const board1Style = computed<CSSProperties>(()=>{ // ボードとマスクを含んでいる領域のスタイル
        return {
            position: 'relative',
            left: "0",
            top: "0",
            width: `${commonZoom * board1FileNum * board1SquareWidth}px`,
            height: `${commonZoom * board1RankNum * board1SquareHeight}px`,
        };
    });
    const getSquareStyle = computed<
        (i:number)=>CSSProperties
    >(() => {
        return (i:number)=>{
            // プレイヤーが初期位置にいる場合の、マスの位置。
            const homeLeft = (i % board1FileNum) * board1SquareWidth;
            const homeTop = Math.floor(i / board1RankNum) * board1SquareHeight;
            const boardWidth = (board1FileNum * board1SquareWidth);
            const boardHeight = (board1RankNum * board1SquareHeight);

            // NOTE: 循環するだけなら、［剰余］を使えばいける。
            // 盤の左端列を、右端列へ移動させる。
            const boardLeftLoop = euclideanMod(homeLeft + board1Left.value + boardWidth, boardWidth) - homeLeft;
            const boardTopLoop = euclideanMod(homeTop + board1Top.value + boardHeight, boardHeight) - homeTop;

            return {
                position: 'absolute',
                top: `${homeTop + boardTopLoop}px`,
                left: `${homeLeft + boardLeftLoop}px`,
                width: `${board1SquareWidth}px`,
                height: `${board1SquareHeight}px`,
                zoom: 4,
                border: "solid 1px lightgray",
                textAlign: "center",
            };
        };
    });    
    const board1Motion = ref<Record<string, number>>({  // モーションへの入力
        toRight: 0,   // 負なら左、正なら右
        toBottom: 0,   // 負なら上、正なら下
    });

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　盤コンテンツ +
    // ++++++++++++++++++++++++**++++++++
    //
    // 盤上に表示されるもの。
    //

    const contents1FileNum = 10;       // 列数
    const contents1RankNum = 10;       // 行数

    /**
     * 変換
     * @param tileIndex マス番号
     * @returns [筋番号, 段番号]
     */
    function tileIndexToTileFileRank(tileIndex: number) : number[] {
        // プレイヤーが右へ１マス移動したら、盤コンテンツは全行が左へ１つ移動する。
        const file = tileIndex % board1FileNum;
        const rank = Math.floor(tileIndex / board1RankNum);

        return [file, rank];
    }

    function contentsFileRankToContentsIndex(contentsFile: number, contentsRank: number) : number {
        return contentsRank * contents1FileNum + contentsFile;
    }

    // コンテンツはシフトするので、 File, Rank しかない。 Left, Top は無い。
    const contents1FileInit = -3;
    const contents1RankInit = -3;
    const contents1OriginFile = ref<number>(contents1FileInit);    // 盤コンテンツの左上隅のタイルは、盤タイルの左から何番目か。
    const contents1OriginRank = ref<number>(contents1RankInit);    // 盤コンテンツの左上隅のタイルは、盤タイルの上から何番目か。
    const contents1Data = ref<string[]>([]);
    for (let i=0; i<contents1FileNum * contents1RankNum; i++) {
        contents1Data.value.push(i.toString().padStart(2, "0"));
    }
    const getFaceNumber = computed(() => {
        return (tileIndex: number)=>{
            // タイルのインデックス x を、コンテンツ上のインデックス y へ変換：
            //
            //  Tile          Contents             rot=0    ※回転0回目
            // +----------+  +-------------------+ tile[x]:
            // |  A  B  C |  |  1  2  3  4  5  6 |   A=1 B=2 C=3 ...
            // |  D  E  F |  |  7  8  9 10 11 12 |
            // |  G  H  I |  | 13 14 15 16 17 18 |
            // +----------+  | 19 20 21 22 23 24 |
            //               +-------------------+
            //
            // Contents の横幅を v （例えば 6）とする：
            //
            //  Tile index                        Contents index                       rot=0
            // +---------------------------+     +-----------------------------------+ tile[x]:
            // |                           |     |                                   |   A= 1  B= 2  C= 3
            // |  tileRank * w + tileFile  |     |  contentsRank * v + contentsFile  |   D= 7  E= 8  F= 9
            // |                           |     |                                   |   G=13  H=14  I=15
            // +---------------------------+     |                                   |
            //                                   +-----------------------------------+
            //
            // プレイヤーが右に１歩移動したとき：
            //
            //  Tile          rot=1
            // +----------+   tile[x]:
            // |  B  C  A |     A=4 B=2 C=3 ...
            // |  E  F  D |  
            // |  H  I  G |  
            // +----------+  
            //                rot=2
            // +----------+   tile[x]:
            // |  C  A  B |     A=4 B=5 C=3 ...
            // |  F  D  E |  
            // |  I  G  H |  
            // +----------+  
            //                rot=3
            // +----------+   tile[x]:
            // |  A  B  C |     A=4 B=5 C=6 ...
            // |  D  E  F |  
            // |  G  H  I |  
            // +----------+  
            //                rot=4
            // +----------+   tile[x]:
            // |  B  C  A |     A=7 B=5 C=6 ...
            // |  E  F  D |  
            // |  H  I  G |  
            // +----------+  
            //
            // 👆 端でローテーションしたタイルだけ、指すコンテンツが変わるというのが、難しい。
            // 仮に無限サイズの盤と仮定して、表にすると：
            //
            //   rot   0  1  2  ||  3  4  5  ||  6   7   8  ||   9  10  11
            //   j     0  0  0  ||  1  1  1  ||  2   2   2  ||   3   3   3
            //   k     0  1  2  ||  0  1  2  ||  0   1   2  ||   0   1   2
            // -----------------++-----------++-------------++--------------
            // x y:             ||           ||             ||
            // 0   A   1  4  4  ||  4  7  7  ||  7  10  10  ||  10  13  13
            // 1   B   2  2  5  ||  5  5  8  ||  8   8  11  ||  11  11  14
            // 2   C   3  3  3  ||  6  6  6  ||  9   9   9  ||  12  12  12
            //
            // j = floor(rot / 3)
            // k = rot mod 3
            //
            // とりあえず、 y から rot を引いてみる。
            //
            // rot         0  1  2  ||  3  4  5  ||  6   7   8  ||   9  10  11
            // ---------------------++-----------++-------------++--------------
            // y-rot:               ||           ||             ||
            //   A-rot     1  3  2  ||  1  3  2  ||  1   3   2  ||   1   3   2
            //   B-rot     2  1  3  ||  2  1  3  ||  2   1   3  ||   2   1   3
            //   C-rot     3  2  1  ||  3  2  1  ||  3   2   1  ||   3   2   1
            //
            // グー・チョキ・パーで 勝:3、負:2、分:1 のとき出る表ではないか？
            //
            //        | 相手               |
            //        | グー | チョ | パー |
            // -------+------+------+------+
            // グー   |    1 |    3 |    2 |
            // チョキ |    2 |    1 |    3 |
            // パー   |    3 |    2 |    1 |
            //
            // 循環してるから当たり前か。じゃんけんは拳が３つだが、４つ以上でも考え方は同じ。
            // ... 3, 2, 1 といった降順の数列が並んでいるだけ。
            //
            // もうちょっと加工する。 y から rot+1 を引いてみる。
            //
            //    rot                 0  1  2  ||  3  4  5  ||  6   7   8  ||   9  10  11
            // --------------------------------++-----------++-------------++--------------
            //    h-rot-1:                     ||           ||             ||
            //      A-rot-1           0  2  1  ||  0  2  1  ||  0   2   1  ||   0   2   1
            //      B-rot-1           1  0  2  ||  1  0  2  ||  1   0   2  ||   1   0   2
            //      C-rot-1           2  1  0  ||  2  1  0  ||  2   1   0  ||   2   1   0
            // --------------------------------++-----------++-------------++--------------
            // x  h-rot-1:                     ||           ||             ||
            // 0    (6-rot-(3-x))%3   0  2  1  ||  0  2  1  ||  0   2   1  ||   0   2   1
            // 1    (6-rot-(3-x))%3   1  0  2  ||  1  0  2  ||  1   0   2  ||   1   0   2
            // 2    (6-rot-(3-x))%3   2  1  0  ||  2  1  0  ||  2   1   0  ||   2   1   0
            //
            // この形は、
            // 盤の横幅を w （例えば 3）とすると、
            //
            //          (6 -rot-(w-x))%w
            //      g = (2w-rot-(w-x))%w
            //
            // で取れる。
            // 逆算していく。
            //
            //    rot                      0  1  2  ||  3  4  5  ||  6   7   8  ||   9  10  11
            // -------------------------------------++-----------++-------------++--------------
            // x  h-rot:                            ||           ||             ||
            // 0    (2w-rot-(3-x))%3+1     1  3  2  ||  1  3  2  ||  1   3   2  ||   1   3   2
            // 1    (2w-rot-(3-x))%3+1     2  1  3  ||  2  1  3  ||  2   1   3  ||   2   1   3
            // 2    (2w-rot-(3-x))%3+1     3  2  1  ||  3  2  1  ||  3   2   1  ||   3   2   1
            //    ----------------------------------++-----------++-------------++--------------
            // x  h:                                ||           ||             ||
            // 0    (2w-rot-(3-x))%3+1+i   1  4  4  ||  4  7  7  ||  7  10  10  ||  10  13  13
            // 1    (2w-rot-(3-x))%3+1+i   2  2  5  ||  5  5  8  ||  8   8  11  ||  11  11  14
            // 2    (2w-rot-(3-x))%3+1+i   3  3  3  ||  6  6  6  ||  9   9   9  ||  12  12  15
            //
            // 式は合っているようだ。
            //
            // 一応、段にも対応させる。
            //
            //      h = tileRank * v + (2w-rot-(w-x))%w
            //

            return player1FileDelta.value;
            /*
            const rot = -contents1OriginFile.value;  // どれだけ右へ移動したか。
            const v = contents1FileNum;
            const w = board1FileNum;

            let [i, tileRank] = tileIndexToTileFileRank(tileIndex);
            const h = tileRank * v + euclideanMod(2 * contents1FileNum - rot - (contents1FileNum - tileIndex), contents1FileNum);

            // const contentsFile = tileFile - contents1OriginFile.value; // プレイヤーが右へ１マス移動したら、盤コンテンツは全行が左へ１つ移動する。
            // const contentsRank = tileRank - contents1OriginRank.value; // プレイヤーが下へ１マス移動したら、盤コンテンツは全行が上へ１つ移動する。

            // // コンテンツのサイズの範囲外になるところには、"-" でも表示しておく
            // if (contentsFile < 0 || contents1FileNum <= contentsFile || contentsRank < 0 || contents1RankNum <= contentsRank) {
            //     return "-";
            // }
            
            // // コンテンツ上の位置が示すデータを返す
            // const h = contentsFileRankToContentsIndex(contentsFile, contentsRank);
            //return  h; //contents1Data.value[h];
            return  h;
            */
        };
    });    
    const contents1Motion = ref<Record<string, number>>({  // モーションへの入力
        toRight: 0,   // 負なら左、正なら右
        toBottom: 0,   // 負なら上、正なら下
    });

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　プレイヤー +
    // ++++++++++++++++++++++++++++++++

    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const player1FileHome: number = 2;  // 盤の真ん中をホーム・ポジションとする
    const player1RankHome: number = 2;
    const player1Left = ref<number>(player1FileHome * board1SquareWidth);    // スプライトのX座標
    const player1Top = ref<number>(player1RankHome * board1SquareHeight);       // スプライトのY座標
    // 移動量を記録しておく。
    const player1FileDelta = ref<number>(0);
    const player1RankDelta = ref<number>(0);
    const player1Speed = ref<number>(2);     // 移動速度
    const player1File = computed<number>(()=>{
        return Math.round(player1Left.value / board1SquareWidth);
    });
    const player1Rank = computed<number>(()=>{
        return Math.round(player1Top.value / board1SquareHeight);
    });
    
    const player1Input = <Record<string, boolean>>{         // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const player1AnimationSlow = ref<number>(8);    // アニメーションのスローモーションの倍率の初期値
    const player1AnimationWalkingFrames = 16;       // 歩行フレーム数
    const player1Style = computed(() => ({
        top: `${player1Top.value}px`,
        left: `${player1Left.value}px`,
        zoom: commonZoom,
    }));
    const player1SourceFrames = {   // キャラクターの向きと、歩行タイルの指定
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
        left:[  // 左向き
            {top:  3 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 0 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
            {top:  3 * board1SquareHeight, left: 1 * board1SquareWidth, width: board1SquareWidth, height: board1SquareHeight },
        ]
    };
    const player1Frames = ref(player1SourceFrames["down"]);
    const player1MotionWait = ref(0);  // TODO: モーション入力拒否時間。入力キーごとに用意したい。
    const player1Motion = ref<Record<string, number>>({  // モーションへの入力
        toRight: 0,   // 負なら左、正なら右
        toBottom: 0,   // 負なら上、正なら下
    });


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // キーボードイベント
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // ［スペース］［↑］［↓］キーの場合
            if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
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
     * ユークリッド剰余
     * 
     * NOTE: 負の剰余は数学の定義では［ユークリッド剰余］と、［トランケート剰余］の２種類あって、プログラム言語ごとにどっちを使ってるか違うから注意。
     * TypeScript では［トランケート剰余］なので、［ユークリッド剰余］を使いたいときはこれを使う。
     */
    function euclideanMod(a: number, b: number): number {
        return ((a % b) + b) % b;
    }


    /**
     * ゲームのメインループ開始
     */
    function gameLoopStart() : void {
        const update = () => {
            player1MotionWait.value -= 1;           // モーション・タイマー

            if (player1MotionWait.value==0) {
                // モーションのクリアー
                board1Motion.value["toRight"] = 0;
                board1Motion.value["toBottom"] = 0;
                contents1Motion.value["toRight"] = 0;
                contents1Motion.value["toBottom"] = 0;
                player1Motion.value["toRight"] = 0;
                player1Motion.value["toBottom"] = 0;
            }
            
            // キー入力をモーションに変換
            if (player1MotionWait.value<=0) {   // ウェイトが無ければ、入力を受け付ける。

                // 位置のリセット
                if (player1Input[" "]) {
                    board1Left.value = 0;
                    board1Top.value = 0;
                    contents1OriginFile.value = contents1FileInit;
                    contents1OriginRank.value = contents1RankInit;
                    player1Left.value = player1FileHome * board1SquareWidth;
                    player1Top.value = player1RankHome * board1SquareHeight;
                }

                // 移動関連（単発）
                // 斜め方向の場合、左右を上下で上書きする。（右、左）→（上、下）の順。
                if (player1Input.ArrowRight) {  // 右
                    player1Frames.value = player1SourceFrames["right"]    // 向きを変える

                    // ホーム・ポジションより左に居ればホームに近づける。
                    if (player1File.value < player1FileHome) {
                        player1Motion.value["toRight"] = commonSpriteMotionToRight;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            //  Contents
                            // +--------------+
                            // |              |
                            // |   Board      |
                            // |  +-------+   |
                            // |  |       |   |
                            // c  b   p   |   |
                            // |  |       |   |
                            // |  +--bw---+   |
                            // +-----cw-------+
                            //
                            //  b ... Origin x on board.
                            //  c ... contents's x from B.
                            //  p ... player character's x from B.
                            //  bw ... Board width.
                            //  cw ... Contents width.
                            //
                            //
                            // +--------------+
                            // |      +-------+
                            // |      |       |
                            // c      b   p   |
                            // |      |       |
                            // |      +--bw---+
                            // +-----cw-------+
                            //
                            // cw - bw ... max margin.
                            //
                            // -c が max margin 以上なら、それ以上右に行くことはできない。
                            //

                            const bw = board1FileNum;
                            const cw = contents1FileNum;
                            const c = contents1OriginFile.value;
                            const maxMargin = cw - bw;

                            if (maxMargin <= -c) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            contents1Motion.value["toRight"] = commonSpriteMotionToLeft;
                            board1Motion.value["toRight"] = commonSpriteMotionToRight;
                        } else {
                            if (appBoundaryWalkingEdge.value) {
                                // ［盤の端まで歩ける］
                                if (player1File.value < board1FileNum - 1) {
                                    player1Motion.value["toRight"] = commonSpriteMotionToRight;
                                }
                            }
                        }
                    }
                }

                if (player1Input.ArrowLeft) { // 左
                    player1Frames.value = player1SourceFrames["left"]    // 向きを変える

                    // ホーム・ポジションより右に居ればホームに近づける。
                    if (player1File.value > player1FileHome) {
                        player1Motion.value["toRight"] = commonSpriteMotionToLeft;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            //  Contents
                            // +--------------+
                            // |              |
                            // |   Board      |
                            // |  +-------+   |
                            // |  |       |   |
                            // c  b   p   |   |
                            // |  |       |   |
                            // |  +-------+   |
                            // +--------------+
                            //
                            //  b ... Origin x on board.
                            //  c ... contents's x from B.
                            //  p ... player character's x from B.
                            //
                            //
                            // +--------------+
                            // |              |
                            // c              |
                            // |              |
                            // +-------+      |
                            // |       |      |
                            // b   p   |      |
                            // |       |      |
                            // +-------+      |
                            // +--------------+
                            //
                            // c が 0 以上なら、それ以上左に行くことはできない。
                            //

                            const c = contents1OriginFile.value;

                            if (c >= 0) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            contents1Motion.value["toRight"] = commonSpriteMotionToRight;
                            board1Motion.value["toRight"] = commonSpriteMotionToLeft;
                        } else if (appBoundaryWalkingEdge.value) {
                            // ［盤の端まで歩ける］
                            if (player1File.value > 0) {
                                player1Motion.value["toRight"] = commonSpriteMotionToLeft;
                            }
                        }
                    }
                }

                if (player1Input.ArrowUp) {   // 上
                    player1Frames.value = player1SourceFrames["up"]    // 向きを変える

                    // ホーム・ポジションより下に居ればホームに近づける。
                    if (player1Rank.value > player1RankHome) {
                        player1Motion.value["toBottom"] = commonSpriteMotionToTop;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            //  Contents
                            // +------c-------+
                            // |              |
                            // |   Board      |
                            // |  +---b---+   |
                            // |  |       |   |
                            // |  |   p   |   |
                            // |  |       |   |
                            // |  +-------+   |
                            // +--------------+
                            //
                            //  b ... Origin x on board.
                            //  c ... contents's x from B.
                            //  p ... player character's x from B.
                            //
                            //
                            // +--+---b---+-c-+
                            // |  |       |   |
                            // |  |   p   |   |
                            // |  |       |   |
                            // |  +-------+   |
                            // |              |
                            // +--------------+
                            //
                            // c が 0 以上なら、それ以上上に行くことはできない。
                            //

                            const c = contents1OriginRank.value;

                            if (c >= 0) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            contents1Motion.value["toBottom"] = commonSpriteMotionToBottom;
                            board1Motion.value["toBottom"] = commonSpriteMotionToTop;
                        } else if (appBoundaryWalkingEdge.value) {
                            // ［盤の端まで歩ける］
                            if (player1Rank.value > 0) {
                                player1Motion.value["toBottom"] = commonSpriteMotionToTop;
                            }
                        }
                    }
                }

                if (player1Input.ArrowDown) {   // 下
                    player1Frames.value = player1SourceFrames["down"]   // 向きを変える

                    // ホーム・ポジションより上に居ればホームに近づける。
                    if (player1Rank.value < player1RankHome) {
                        player1Motion.value["toBottom"] = commonSpriteMotionToBottom;
                    } else {
                        let willShift: boolean = true;
                        if (appBoundaryIsLock.value) {
                            // 見えている画面外が広がるような移動は禁止する：
                            //
                            //  Contents
                            // +------c-------+
                            // |              |
                            // |   Board      |
                            // |  +---b---+   |
                            // |  |       |   |
                            // ch bh  p   |   |
                            // |  |       |   |
                            // |  +-------+   |
                            // +--------------+
                            //
                            //  b ... Origin x on board.
                            //  c ... contents's x from B.
                            //  p ... player character's x from B.
                            //  bh ... Board height.
                            //  ch ... Contents height.
                            //
                            //
                            // +------c-------+
                            // |              |
                            // |              |
                            // |  +---b---+   |
                            // |  |       |   |
                            // ch bh  p   |   |
                            // |  |       |   |
                            // +--+-------+---+
                            //
                            // ch - bh ... max margin.
                            //
                            // -c が max margin 以上なら、それ以上下に行くことはできない。
                            //

                            const bh = board1RankNum;
                            const ch = contents1RankNum;
                            const c = contents1OriginRank.value;
                            const maxMargin = ch - bh;

                            if (maxMargin <= -c) {
                                willShift = false;
                            }
                        }

                        if (willShift) {
                            contents1Motion.value["toBottom"] = commonSpriteMotionToTop;
                            board1Motion.value["toBottom"] = commonSpriteMotionToBottom;
                        } else if (appBoundaryWalkingEdge.value) {
                            // ［盤の端まで歩ける］
                            if (player1Rank.value < board1FileNum - 1) {
                                player1Motion.value["toBottom"] = commonSpriteMotionToBottom;
                            }
                        }
                    }
                }
            }

            // 移動を処理（シフト）
            // FIXME: 🌟 タイルがローテーションしていることに注意。
            // タイルがローテーションするのだから、コンテンツをシフトさせなくていいが、
            // ローテーションしたタイルをどうするか？
            /*
            if (player1MotionWait.value <= 0) {
                // シフト
                if (contents1Motion.value["toBottom"] == commonSpriteMotionToTop) {
                    contents1OriginRank.value -= 1;     // 下
                } else if (contents1Motion.value["toBottom"] == commonSpriteMotionToBottom) {
                    contents1OriginRank.value += 1;     // 上
                }

                if (contents1Motion.value["toRight"] == commonSpriteMotionToRight) {
                    contents1OriginFile.value += 1;
                } else if (contents1Motion.value["toRight"] == commonSpriteMotionToLeft) {
                    contents1OriginFile.value -= 1;
                }
            }
            */

            // スクロール
            // 盤の方をスクロールさせる
            // 斜め方向の場合、上下を優先する。
            if (board1Motion.value["toRight"] == commonSpriteMotionToRight) {
                board1Left.value -= player1Speed.value;
            } else if (board1Motion.value["toRight"] == commonSpriteMotionToLeft) {
                board1Left.value += player1Speed.value;
            }

            if (board1Motion.value["toBottom"] == commonSpriteMotionToTop) {
                board1Top.value += player1Speed.value;
            } else if (board1Motion.value["toBottom"] == commonSpriteMotionToBottom) {
                board1Top.value -= player1Speed.value;
            }

            // プレイヤーが歩くのは、盤の端を歩いているときだけ。このとき、画面スクロールは起こらない。
            if (player1Motion.value["toBottom"] == commonSpriteMotionToTop) {
                player1Top.value -= player1Speed.value;
            } else if (player1Motion.value["toBottom"] == commonSpriteMotionToBottom) {
                player1Top.value += player1Speed.value;
            }

            if (player1Motion.value["toRight"] == commonSpriteMotionToRight) {
                player1Left.value += player1Speed.value;
            } else if (player1Motion.value["toRight"] == commonSpriteMotionToLeft) {
                player1Left.value -= player1Speed.value;
            }
            
            if (player1MotionWait.value <= 0) { // モーション開始時に１回だけ実行される
                if (board1Motion.value["toRight"]!=0 || board1Motion.value["toBottom"]!=0) {
                    // 移動量を記録しておく。シフト。
                    if (board1Motion.value["toBottom"] == commonSpriteMotionToTop) { // 上
                        player1RankDelta.value -= 1;
                    } else if (board1Motion.value["toBottom"] == commonSpriteMotionToBottom) {   // 下
                        player1RankDelta.value += 1;
                    }

                    if (board1Motion.value["toRight"] == commonSpriteMotionToRight) {    // 右
                        player1FileDelta.value += 1;
                    } else if (board1Motion.value["toRight"] == commonSpriteMotionToLeft) {  // 左
                        player1FileDelta.value -= 1;
                    }
                    console.log(`移動量を記録しておく。シフト。 player1FileDelta.value=${player1FileDelta.value} player1RankDelta.value=${player1RankDelta.value} player1Motion.value["toBottom"]=${player1Motion.value["toBottom"]} player1Motion.value["toRight"]=${player1Motion.value["toRight"]}`);
                }

                if (board1Motion.value["toRight"]!=0 || board1Motion.value["toBottom"]!=0 || contents1Motion.value["toRight"]!=0 || contents1Motion.value["toBottom"]!=0 || player1Motion.value["toRight"]!=0 || player1Motion.value["toBottom"]!=0) {
                    player1MotionWait.value = player1AnimationWalkingFrames;    // ウェイト設定
                }
            }

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }


    /**
     * フォーカスを外すのが上手くいかないため、［何もしないボタン］にフォーカスを合わせます。
     */
    function focusRemove() : void {
        if (noopButton.value) {
            noopButton.value.$el.focus();    // $el は、<v-btn> 要素の中の <button> 要素。
        }
    }

</script>

<style scoped>
    div.cursor {
        position: relative; width:32px; height:32px;
    }
</style>