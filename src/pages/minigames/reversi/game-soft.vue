<template>

    <comment>機能</comment>
    <button-20250822 ref="button1Ref"/>


    <!-- ゲーム画面の全体サイズと、切り抜き領域 -->
    <div
        :style="{
            visibility: vision1Visibility,
            width: `${vision1Width}px`,
            height: `${vision1Height}px`,
            zoom: vision1Zoom,
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
            v-for="sq in range(0, gameBoard1Area)"
            :key="sq"
            :style="{
                left: `${(sq % gameBoard1FileNum + 1) * tileBoard1TileWidth}px`,
                top: `${(Math.floor(sq / gameBoard1FileNum) + 1) * tileBoard1TileHeight}px`,
                minWidth: `${tileBoard1TileWidth}px`,
                width: `${tileBoard1TileWidth}px`,
                height: `${tileBoard1TileHeight}px`,
                color: game1StoneColorNameMap[gameBoard1StoneColorArray[sq]],    /* 石の色 */
                backgroundColor: getGameBoard1BackGroundColor(sq, gameBoard1FileNum),  /* 盤の色 */
                pointerEvents: gameBoard1StoneClickable(sq) ? 'auto' : 'none',  /* 石が置いてあったら、クリックを無視する */
            }"
            style="
                position: absolute;
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
                left: `${file * tileBoard1TileWidth + 6}px`,
                top: `${0 * tileBoard1TileHeight}px`,
                width: '20px',
                color: 'white',
                fontSize: '24px',
                zIndex: 200,
                textAlign: 'center',
            }"
        >{{ gameBoard1FileNameArray[file - 1] }}</span>


        <!-- 段の符号 -->
        <span
            v-for="rank in 8"
            :key="rank"
            :style="{
                position: 'absolute',
                left: '3px',
                top: `${rank * tileBoard1TileHeight}px`,
                width: '20px',
                color: 'white',
                fontSize: '24px',
                zIndex: 200,
                textAlign: 'right',
            }"
        >{{ rank }}</span>

    </div>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    // アルファベット順
    import Button20250822 from '@/components/Button20250822.vue';
    import Comment from '@/components/Comment.vue';
    import Stopwatch from '@/components/Stopwatch.vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    // from 部分のアルファベット順
    import { isPlayerInputKey } from '@/composables/player-controller';
    import { range } from '@/composables/range';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import {
        // 色
        COLOR_BLACK, COLOR_WHITE, COLOR_SIZE, COLOR_EMPTY, Color, colorToCode,
        // マス
        SQ_OUT_OF_BOARD, makeCodeToSq,
        // 路
        WAY_WEST, WAY_EAST, WAY_NORTH, WAY_SOUTH, WAY_SOUTHWEST, WAT_NORTHEAST, WAY_NORTHWEST, WAY_SOUTHEAST, Way,
        // 方向
        Direction, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL, DIRECTION_SIZE, DIRECTION_TITLES,
    } from '@/pages/minigames/reversi/spec.ts';


    // ##################
    // # エクスポート型 #
    // ##################

    export type Player1Input = { // 入力
        // アルファベット順
        " ": boolean;
        ArrowDown: boolean;
        ArrowLeft: boolean;
        ArrowUp: boolean;
        ArrowRight: boolean;
    };


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        player1Input: Player1Input; // 入力
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++
    // + オブジェクト　＞　機能拡張 +
    // ++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ビジョン１ +
    // ++++++++++++++++++++++++++++++++

    const vision1Height = computed(()=>{
        //return 512;
        return tileBoard1RankNum.value * tileBoard1TileHeight.value;
    });
    const vision1Width = computed(()=>{
        //return 512;
        return tileBoard1FileNum.value * tileBoard1TileWidth.value;
    });
    const vision1Visibility = ref<string>('hidden');
    const vision1Zoom = ref<number>(0.5);    // ズーム

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　対局１ +
    // ++++++++++++++++++++++++++++

    const game1Turn = ref<Color>(0);
    const game1Times = ref<number>(0); // 何手目を終えたか。リバーシでは盤上の石の数に等しい
    const game1IsPlaying = ref<boolean>(false);  // ゲーム中
    const game1IsPlayingPause = ref<boolean>(false); // ゲームは一時停止中
    const game1PassCount = ref<number>(0); // 連続パス回数
    const game1IsEnd = ref<boolean>(false);    // 終局しているか
    const game1Stopwatch1Ref = ref<InstanceType<typeof Stopwatch> | null>(null);    // ストップウォッチ１
    const game1StoneColorNameMap: Record<number, string> = {
        0: 'transparent',
        1: '#C86868', // 明るい茶色
        2: '#289028', // 暗い緑
    }
    const game1StoneCount = ref<number[]>([0, 0, 0]);   // 盤上のプレイヤーの石の数。[0] は未使用
    const game1DebugMessage = ref<string>('');   // デバッグ用メッセージ

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　思考エンジン +
    // ++++++++++++++++++++++++++++++++++

    const engine1RandomLimit: number = 2 * Math.PI * Math.E;    // 偏りのない乱数なら、マスをランダムに指定しても、マス目の数 × 2πe回試行すれば、すべてのマスをだいたい１回は訪問するという経験則（＾～＾）確率論の［クーポン収集問題（Coupon Collector's Problem）］よりでかい数。

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　タイル盤１ +
    // ++++++++++++++++++++++++++++++++

    // NOTE: ソース画像マップと、表示画面のスケールは等倍とします。変えると難しい。
    const tileBoard1TileWidth = ref<number>(32);    // マスの横幅（ピクセル）
    const tileBoard1TileHeight = ref<number>(32);   // マスの縦幅（ピクセル）
    const tileBoard1FileNum = ref<number>(10);  // 盤が横に何マスか
    const tileBoard1RankNum = ref<number>(10);  // 盤が縦に何マスか
    const tileBoard1Area = computed(()=>{   // 盤のマス数
        return tileBoard1FileNum.value * tileBoard1RankNum.value;
    });

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ゲーム盤１ +
    // ++++++++++++++++++++++++++++++++

    const gameBoard1FileNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const gameBoard1FileNum = ref<number>(8);  // 盤が横に何マスか
    const gameBoard1RankNum = ref<number>(8);  // 盤が縦に何マスか
    const gameBoard1Area = computed(()=>{
        return gameBoard1FileNum.value * gameBoard1RankNum.value;
    })


    /**
     * sq を符号に変換
     * @param sq 
     */
    function sqToCode(sq: number) : string {
        const file = sq % gameBoard1FileNum.value;
        const rank = Math.floor(sq / gameBoard1FileNum.value);
        const code = `${gameBoard1FileNameArray[file]}${rank+1}`;
        //console.log(`DEBUG: [sqToCode] sq=${sq} gameBoard1FileNum.value=${gameBoard1FileNum.value} file=${file} rank=${rank} gameBoard1RankNum.value=${gameBoard1RankNum.value} code=${code}`);
        return code;
    }


    const gameBoard1StoneShapeArray = ref<string[]>(new Array(gameBoard1Area.value).fill(''));    // 石の形
    for(let sq: number=0; sq<gameBoard1Area.value; sq++){
        gameBoard1StoneShapeArray.value[sq] = '●'
    }
    const gameBoard1StoneColorArray = ref<Color[]>(new Array(gameBoard1Area.value).fill(0));    // 石の色
    const gameBoard1StoneClickable = computed<
        (sq: number) => boolean
    >(()=>{    // マスをクリック可能か
        return (sq: number)=>{
            // TODO: 石を置くことで、相手の石をひっくり返せるか？
            // TODO: 相手の石をひっくり返せない場合はパス
            // TODO: パスするボタンが欲しい
            const isEmptySquare = gameBoard1StoneColorArray.value[sq] == 0; // 空マスだ
            return isEmptySquare && isAdjacentToOpponentStone(sq) && !game1IsEnd.value;
        }
    });

    // 指定のウェイに絞り込んでデバッグできるよう配慮しています
    // NOTE: リバーシは、方向で分けるより、ウェイで分けた方がよさそう
    //const activeDirections = [DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL] as Direction[];
    const activeDirections = [DIRECTION_HORIZONTAL, /*DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL*/] as Direction[];
    const activeSecondDirections = [DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL] as Direction[];
    //const activeWays = [WAY_EAST, WAY_WEST, WAY_SOUTH, WAY_NORTH, WAT_NORTHEAST, WAY_SOUTHWEST, WAY_SOUTHEAST, WAY_NORTHWEST] as Way[];
    const activeColors = [COLOR_BLACK, COLOR_WHITE] as Color[];

    // FIXME: Direction別にする必要があるのでは？
    const gameBoard1CanMove = ref<boolean[][][]>( // [Direction][Color][Square]
        new Array(DIRECTION_SIZE)
    );
    for (const direction of activeDirections) {
        gameBoard1CanMove.value[direction] = new Array<boolean[]>(COLOR_SIZE);
        gameBoard1CanMove.value[direction][COLOR_BLACK] = new Array<boolean>(gameBoard1Area.value).fill(false);
        gameBoard1CanMove.value[direction][COLOR_WHITE] = new Array<boolean>(gameBoard1Area.value).fill(false);
    }


    function canMove(sq: number) : boolean {
        for (const direction of activeDirections) {
            if (gameBoard1CanMove.value[direction][game1Turn.value][sq]) {
                return true;
            }
        }

        return false;
    }


    const getGameBoard1BackGroundColor = computed<
        (sq: number, gameBoard1FileNum: number)=>string
    >(()=>{
        return (sq: number, gameBoard1FileNum: number)=>{
            if (game1Turn.value == COLOR_EMPTY) {   // まだ読込完了していないケース
                return '#000000';
            }

            //console.log(`DEBUG: [getGameBoard1BackGroundColor] game1Turn.value=${game1Turn.value} sq=${sq} gameBoard1FileNum=${gameBoard1FileNum}`);
            const checkeredFlag: boolean = (sq % gameBoard1FileNum + Math.floor(sq/gameBoard1FileNum))%2==0; // 市松模様フラグ
            const canMove1: boolean = canMove(sq);

            if (game1Turn.value == COLOR_BLACK) {
                if (canMove1) {
                    return checkeredFlag ? '#F0E0C0' : '#F0C050';  // 黒番の薄い色
                }
                return checkeredFlag ? '#C0B090' : '#C09020';  // 黒番の濃い色
            }
            if (canMove1) {
                return checkeredFlag ? '#C0F0E0' : '#50F0C0';  // 白番の薄い色
            }
            return checkeredFlag ? '#90C0B0' : '#20C090';  // 白番の濃い色
        };
    });

    const allDirectionsForeOf = [(_sq: number) => { return -1; }, eastOf, southOf, northeastOf, southeastOf];
    const allDirectionsBackOf = [(_sq: number) => { return -1; }, westOf, northOf, southwestOf, northwestOf];
    const allWaysNextOf = [(_sq: number) => { return -1; }, eastOf, westOf, southOf, northOf, northeastOf, southwestOf, southeastOf, northwestOf];
    // const allWaysBackOf = [(_sq: number) => { return -1; }, westOf, eastOf, northOf, southOf, southwestOf, northeastOf, northwestOf, southeastOf];


    /**
     * 相手の石に隣接するマスだ
     * @param sq 
     */
    function isAdjacentToOpponentStone(sq: number) : boolean {
        function executeOneWay(
            way: Way,
        ) {
            // ８方向の石を取得
            const actualAdjacentStoneColor: Color = allWaysNextOf[way](sq) != -1 ? gameBoard1StoneColorArray.value[allWaysNextOf[way](sq)] : 0;
            return actualAdjacentStoneColor == oppositeColor(game1Turn.value);
        }

        return executeOneWay(WAY_EAST)
            || executeOneWay(WAY_WEST)
            || executeOneWay(WAY_SOUTH)
            || executeOneWay(WAY_NORTH)
            || executeOneWay(WAT_NORTHEAST)
            || executeOneWay(WAY_SOUTHWEST)
            || executeOneWay(WAY_SOUTHEAST)
            || executeOneWay(WAY_NORTHWEST)
            ;
    }


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
                props.player1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (isPlayerInputKey(e.key)) {  // 型ガード
                props.player1Input[e.key] = false;
            }
        });

        gameLoopStart();    // 入力処理、描画を行います
    });

    // ++++++++++++++++++++++++++++++++++++++
    // + イベントハンドラー　＞　ゲーム盤１ +
    // ++++++++++++++++++++++++++++++++++++++

    /**
     * 
     * @param sq （0から始まる）マス番号
     */
    function onGameBoard1Clicked(sq: number) : void {
        //game1DebugMessage.value = `sq=${sq}`;

        const color: Color = game1Turn.value;   // Math.floor(Math.random() * 2) + 1;
        putStone(sq, color, true);  // 石を置くのに失敗しても何もしません
    }


    function putStone(
        moveSq: number,
        color: Color,
        hasForbidenMoveCheck: boolean,
    ) : boolean {
        // TODO: 有効にする
        // if (hasForbidenMoveCheck && !gameBoard1StoneClickable.value(moveSq)) {  // 石を置けないマスなら
        //     return false;
        // }

        const oppositeTurnColor1 = oppositeColor(game1Turn.value);

        gameBoard1StoneColorArray.value[moveSq] = color;    // 石を置きます

        let allDirectionsStonesTargetedOLD: number[] = [];
        let allDirectionsStonesTargetedNew: number[][] = new Array<number[]>(DIRECTION_SIZE);
        for (const direction of activeDirections) {
            allDirectionsStonesTargetedNew[direction] = new Array<number>();
            gameBoard1CanMove.value[direction][game1Turn.value][moveSq] = false;    // 着手点に石は置けなくなる。

            const targetStones = locateTargetStones(moveSq, direction); // ひっくり返す対象の石のマス番号を取得します
            allDirectionsStonesTargetedOLD.push(...targetStones);
            reverseStones(targetStones);    // 挟んだ石をひっくり返します。

            // ステップ１：
            const [
                foresideStonesTargeted,
                foresideFirstCapSq,
                foresideFirstCapColor,
                backsideStonesTargeted,
                backsideFirstCapSq,
                backsideFirstCapColor,
            ] = movedStoneGenerateMoveOnDirection(moveSq, direction); // 指し手生成
            console.log(`DEBUG: [putStone] ${sqToCode(moveSq)}へ石を置いた。`)
            allDirectionsStonesTargetedNew[direction].push(
                ...foresideStonesTargeted,
                ...backsideStonesTargeted,
            );

            console.log(`DEBUG: [putStone] 　　前方第１キャップは ${sqToCode(foresideFirstCapSq)} ${colorToCode(foresideFirstCapColor)}。 挟める石：${foresideStonesTargeted.map((x)=>sqToCode(x))}`)
            if (foresideFirstCapSq != SQ_OUT_OF_BOARD && foresideFirstCapColor == COLOR_EMPTY) {
                const canMove1 = 0 < foresideStonesTargeted.length;
                gameBoard1CanMove.value[direction][game1Turn.value][foresideFirstCapSq] = canMove1;   // 前方第１キャップに石を置けるか？
                console.log(`DEBUG: [putStone] 　　前方第１キャップに石 ${canMove1 ? 'を置ける' : 'は置けない'}`)
            }

            console.log(`DEBUG: [putStone] 　　後方第１キャップは ${sqToCode(backsideFirstCapSq)} ${colorToCode(backsideFirstCapColor)}。 挟める石：${backsideStonesTargeted.map((x)=>sqToCode(x))}`)
            if (backsideFirstCapSq != SQ_OUT_OF_BOARD && backsideFirstCapColor == COLOR_EMPTY) {
                const canMove1 = 0 < backsideStonesTargeted.length;
                gameBoard1CanMove.value[direction][game1Turn.value][backsideFirstCapSq] = canMove1;   // 後方第１キャップに石を置けるか？
                console.log(`DEBUG: [putStone] 　　後方第１キャップに石 ${canMove1 ? 'を置ける' : 'は置けない'}`)
            }

            console.log(`DEBUG: [putStone(2)] allDirectionsStonesTargetedNew[direction].length=${allDirectionsStonesTargetedNew[direction].length}`)
            // allDirectionsStonesTargetedOLD.length=${allDirectionsStonesTargetedOLD.length}

            // ステップ２：　ひっくり返される各［相手番石］について：
            for (const stoneTargetedSq of allDirectionsStonesTargetedNew[direction]) {
                console.log(`DEBUG: [putStone] 対象石 ${sqToCode(stoneTargetedSq)} をひっくり返せる。`)

                // ４方向調べたい
                for (const secondDirection of activeSecondDirections) {
                    const [
                        foresideStonesTargeted,
                        foresideSecondCapSq,
                        foresideSecondCapColor,
                        backsideStonesTargeted,
                        backsideSecondCapSq,
                        backsideSecondCapColor,
                    ] = stoneTargetedGenerateMoveOnDirection(stoneTargetedSq, secondDirection);


                    function executeSide(
                        secondCapSq: number,
                        secondDirection: Direction,
                        targetTurn: Color,
                    ) : void {
                        const [
                            secondCapForesideStonesTargeted,
                            secondCapForesideSecondCapSq,
                            secondCapForesideSecondCapColor,
                            secondCapBacksideStonesTargeted,
                            secondCapBacksideSecondCapSq,
                            secondCapBacksideSecondCapColor,
                        ] = secondCapGenerateMoveOnDirection(secondCapSq, secondDirection, targetTurn);

                        if (secondCapForesideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 =
                                    secondCapForesideSecondCapColor == COLOR_EMPTY   // 前方のキャップが空マスで
                                &&  0 < secondCapForesideStonesTargeted.length; // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                console.log(`DEBUG: [putStone]1     secondDirection=${secondDirection}`);
                                console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                console.log(`DEBUG: [putStone]1     targetTurn=${targetTurn}`);
                                console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                console.log(`DEBUG: [putStone]1     secondCapForesideSecondCapSq=${secondCapForesideSecondCapSq}`);
                                console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]}`);
                                console.log(`DEBUG: [putStone]1     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]1     ${colorToCode(targetTurn)} 第２${DIRECTION_TITLES[secondDirection]} 前方第２キャップ=${sqToCode(secondCapForesideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq] = canMove1;
                            }
                        }

                        if (secondCapBacksideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 = 
                                    secondCapBacksideSecondCapColor == COLOR_EMPTY // 後方のキャップが空マスで
                                &&  0 < secondCapBacksideStonesTargeted.length;  // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                console.log(`DEBUG: [putStone]2     secondDirection=${secondDirection}`);
                                console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                console.log(`DEBUG: [putStone]2     targetTurn=${targetTurn}`);
                                console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                console.log(`DEBUG: [putStone]2     secondCapBacksideSecondCapSq=${secondCapBacksideSecondCapSq}`);
                                console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]}`);
                                console.log(`DEBUG: [putStone]2     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]2     ${colorToCode(targetTurn)} 第２${DIRECTION_TITLES[secondDirection]} 後方第２キャップ=${sqToCode(secondCapBacksideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq] = canMove1;
                            }
                        }
                    }


                    // ステップ３：　第２キャップ判定
                    //
                    // xooo.xxo
                    //     ^
                    //     xもoも置けることに注意
                    console.log(`DEBUG: [putStone] 　　第２${DIRECTION_TITLES[secondDirection]} 前方第２キャップは ${sqToCode(foresideSecondCapSq)} ${colorToCode(foresideSecondCapColor)}。 挟める石：${foresideStonesTargeted.map((x)=>sqToCode(x))}`);
                    for (const targetTurn of activeColors) { 
                        executeSide(foresideSecondCapSq, secondDirection, targetTurn);    // foreside
                    }

                    console.log(`DEBUG: [putStone] 　　第２${DIRECTION_TITLES[secondDirection]} 後方第２キャップは ${sqToCode(backsideSecondCapSq)} ${colorToCode(backsideSecondCapColor)}。 挟める石：${backsideStonesTargeted.map((x)=>sqToCode(x))}`);
                    for (const targetTurn of activeColors) { 
                        executeSide(backsideSecondCapSq, secondDirection, targetTurn);    // backside
                    }
                }
            }
        }



        // TODO: 指し手が消えるパターン



        game1Turn.value = oppositeTurnColor1; // 相手の色に変更
        game1Times.value += 1;
        game1StoneCount.value[color] += 1;
        game1PassCount.value = 0;  // リセット
        return true;
    }

    // ################
    // # サブルーチン #
    // ################

    // ++++++++++++++++++++++++++++
    // + サブルーチン　＞　ゲーム +
    // ++++++++++++++++++++++++++++

    /**
     * ゲームの初期化
     */
    function gameInit() : void {
        console.log(`DEBUG: [gameInit] ゲームの初期化。`);
        //game1DebugMessage.value = "ゲームの初期化";
        game1Stopwatch1Ref.value?.timerReset();  // タイマーをリセット

        // 外付けシステムボタンをリセット
        game1IsPlaying.value = false;
        game1IsPlayingPause.value = false;

        // ++++++++++++++++++++++++++
        // + ゲームデータをリセット +
        // ++++++++++++++++++++++++++

        // 盤の初期化
        for(let sq: number=0; sq<gameBoard1Area.value; sq++){
            gameBoard1StoneColorArray.value[sq] = 0;    // 空マス
        }

        game1Times.value = 0;
        game1Turn.value = COLOR_BLACK;
        game1StoneCount.value[1] = 0;
        game1StoneCount.value[2] = 0;
        game1PassCount.value = 0;
        game1IsEnd.value = false;

        //
        // 以下のような初期局面を作成：
        //
        //   ABCDEFGH
        // 1 ........
        // 2 ........
        // 3 ........
        // 4 ...xo...
        // 5 ...ox...
        // 6 ........
        // 7 ........
        // 8 ........
        //
        const codeToSq = makeCodeToSq(gameBoard1FileNum.value);
        //console.log(`DEBUG: [gameInit] codeToSq('D4')=${codeToSq('D4')}`);
        putStone(codeToSq('D4'), game1Turn.value, false);   // 第３引数：禁じ手チェックを行わない
        putStone(codeToSq('E4'), game1Turn.value, false);
        putStone(codeToSq('E5'), game1Turn.value, false);
        putStone(codeToSq('D5'), game1Turn.value, false);
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

            if (props.player1Input[' ']) {
                if (!game1IsEnd.value) { // 終局していたら、何もしない
                    const color: Color = game1Turn.value;   // Math.floor(Math.random() * 2) + 1;
                    let itsOk = false;
                    let count = 0;
                    while(!itsOk && count <= engine1RandomLimit) {
                        // 適当に石を置く
                        const sq = Math.floor(Math.random() * gameBoard1Area.value);
                        itsOk = putStone(sq, color, true);
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

                            if (2 <= game1PassCount.value) {
                                // パスが２回続いたら終局
                                game1IsEnd.value = true;
                            }

                        } else {
                            itsOk = putStone(lastSq, color, true);    // 必ず置けるはず
                            if (!itsOk) {
                                throw Error(`石を置けなかった。 lastSq=${lastSq} color=${color}`);
                            }
                        }
                    }

                    if (gameIsFullCapacity()) {
                        // 満局なら終局
                        game1IsEnd.value = true;
                    }
                }

                props.player1Input[' '] = false;
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
    function oppositeColor(color: Color) : Color {
        return (color % 2 + 1) as Color;    // 1 なら 2 に、2 なら 1 に
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
     * ひっくり返す対象の石を取得
     */
    function locateTargetStonesOneWay(
        startSq: number,
        nextOf: (sq: number) => number,
    ) : number[] {
        const steppingOverOppositeTurnStones : number[] = [];  // ［跨いだ相手番の石］
        let nextSq = nextOf(startSq);   // 隣のマス番号
        while (true) {  // 一次ループ
            if (nextSq == SQ_OUT_OF_BOARD) {    // 盤外に突き当たったら、［跨いだ相手番の石］リストを空にして一次ループを抜ける
                steppingOverOppositeTurnStones.length = 0;
                break;
            }

            const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色
            //console.log(`nextSq=${nextSq} nextColor=${nextColor} opponentColor1=${opponentColor1}`);

            if (nextColor == COLOR_EMPTY) { // 空マスに突き当たったら、［跨いだ相手番の石］リストを空にして一次ループを抜ける
                steppingOverOppositeTurnStones.length = 0;
                break;
            }

            if (nextColor == game1Turn.value) {    // 手番の石に当たったら、一次ループを抜ける
                // canGoTOSecondaryLoop = true;
                break;
            }

            steppingOverOppositeTurnStones.push(nextSq);    // 跨いだ相手番の石はマス番号を記録
            nextSq = nextOf(nextSq);
        }

        return steppingOverOppositeTurnStones;
    }


    /**
     * ひっくり返す対象の石を取得
     */
    function locateTargetStones(
        startSq: number,
        direction: Direction,
    ) : number[] {
        const foreOf = allDirectionsForeOf[direction];
        const backOf = allDirectionsBackOf[direction];
        return [
            ...locateTargetStonesOneWay(startSq, foreOf),
            ...locateTargetStonesOneWay(startSq, backOf),
        ];
    }


    /**
     * 指定の石をひっくり返す
     * @param targetStones 
     */
    function reverseStones(
        targetStones: number[],
    ) : void {
        // 石の数を更新
        game1StoneCount.value[game1Turn.value] += targetStones.length;
        game1StoneCount.value[oppositeColor(game1Turn.value)] -= targetStones.length;

        // ［跨いだ相手番の石］をひっくり返す
        for (const targetStoneSq of targetStones) {
            gameBoard1StoneColorArray.value[targetStoneSq] = game1Turn.value;
        }
    }


    /**
     * 石を置いたところから見て、次に石を置けるところの検出。
     * @param moveSq 
     * @param direction 
     */
    function movedStoneGenerateMoveOnDirection (
        moveSq: number,
        direction: Direction,
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            moveSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［ループ］処理
            let nextSq = nextOf(moveSq);   // 着手点の前方からスタート
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色

                if ([COLOR_EMPTY, game1Turn.value].includes(nextColor)) { // ［空マス］,［相手番石］に突き当たったら、［前方キャップ］に［空マス］とそのマス番号を記録して［後ろ向きループ］処理へ
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStonesTargeted, foresideCapSq, foresideCapColor] = executeNext(moveSq, allDirectionsForeOf[direction]);  // ［前向きループ］処理
        const [backsideStonesTargeted, backsideCapSq, backsideCapColor] = executeNext(moveSq, allDirectionsBackOf[direction]);  // ［後ろ向きループ］処理

        return [
            foresideStonesTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStonesTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * これからひっくり返して手番の色になる石（［狙われた石］）から見て、次に石を置けるところの検出。
     * @param stoneTargetedSq 
     * @param direction 
     */
    function stoneTargetedGenerateMoveOnDirection (
        stoneTargetedSq: number,
        direction: Direction,
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            stoneTargetedSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] stoneTargetedSq=${sqToCode(stoneTargetedSq)}`);
            const oppositeTurnColor1 = oppositeColor(game1Turn.value);
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［手番石］を読み飛ばす：
            let nextSq = nextOf(stoneTargetedSq);   // ［狙われた石］の前方からスタート
            //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色

                if (nextColor != game1Turn.value) { // ［手番石］以外は終了。
                    break;
                }

                // ［手番石］に突き当たったら、続行
                nextSq = nextOf(nextSq);
                //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            }

            // ［相手番石］を跨ぐ：
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色

                if (nextColor != oppositeTurnColor1) { // ［相手番石］以外は終了。
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
                //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStonesTargeted, foresideCapSq, foresideCapColor] = executeNext(stoneTargetedSq, allDirectionsForeOf[direction]); // ［前向きループ］処理
        const [backsideStonesTargeted, backsideCapSq, backsideCapColor] = executeNext(stoneTargetedSq, allDirectionsBackOf[direction]); // ［後ろ向きループ］処理

        return [
            foresideStonesTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStonesTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * ［第２キャップ］が、次に石を置けるところかどうかの検出。
     * @param secondCapSq 
     * @param direction 
     */
    function secondCapGenerateMoveOnDirection (
        secondCapSq: number,
        direction: Direction,
        targetTurn: Color,
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            secondCapSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            const oppositeTurnColor1 = oppositeColor(targetTurn);
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［手番石］を読み飛ばす：
            let nextSq = nextOf(secondCapSq);   // ［狙われた石］の前方からスタート
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色

                if (nextColor != targetTurn) { // ［手番石］以外は終了。
                    break;
                }

                // ［手番石］に突き当たったら、続行
                nextSq = nextOf(nextSq);
            }

            // ［相手番石］を跨ぐ：
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray.value[nextSq];  // 隣の石の色

                if (nextColor != oppositeTurnColor1) { // ［相手番石］以外は終了。
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStoneTargeted, foresideCapSq, foresideCapColor] = executeNext(secondCapSq, allDirectionsForeOf[direction]); // ［前向きループ］処理
        const [backsideStoneTargeted, backsideCapSq, backsideCapColor] = executeNext(secondCapSq, allDirectionsBackOf[direction]); // ［後ろ向きループ］処理

        return [
            foresideStoneTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStoneTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * パス
     */
    function gamePass() : void {
        game1Times.value += 1;
        game1PassCount.value += 1;
        game1Turn.value = oppositeColor(game1Turn.value);
    }


    /**
     * 満局か
     */
    function gameIsFullCapacity() : boolean {
        return gameBoard1Area.value <= game1StoneCount.value[1] + game1StoneCount.value[2];
    }


    // ####################
    // # エクスポート関数 #
    // ####################

    // 親に公開する関数をdefineExposeで指定
    defineExpose({
        gameBoard1CanMove,
        gameBoard1FileNum,
        gameBoard1RankNum,
        game1DebugMessage,
        game1IsEnd,
        game1IsPlaying,
        game1IsPlayingPause,
        game1PassCount,
        game1StoneColorNameMap,
        game1StoneCount,
        game1Stopwatch1Ref,
        game1Times,
        game1Turn,
        gameInit,
        gameIsFullCapacity,
        vision1Height,
        vision1Visibility,
        vision1Width,
        vision1Zoom,
    });

</script>

<style lang="css" scoped>
    @import '@/styles/misc.css';
    @import '@/styles/talk-pen.css';
</style>
