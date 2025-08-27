// ##############
// # インポート #
// ##############

import type { Ref } from 'vue';

// ********************
// * インターフェース *
// ********************

import type Rectangle from '../interfaces/Rectangle';


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


// ################
// # 外部リソース #
// ################

// ++++++++++++++++++++++++++++++++++++++++
// + 外部リソース　＞　タイルマップの仕様 +
// ++++++++++++++++++++++++**++++++++++++++

/**
 * RPGのキャラクターの歩行グラフィック
 */
export interface RpgWalkingImagePosition {
    left: Rectangle[],
    up: Rectangle[],
    right: Rectangle[],
    down: Rectangle[],
}


// ################
// # オブジェクト #
// ################

// ++++++++++++++++++++++++++
// + オブジェクト　＞　印字 +
// ++++++++++++++++++++++++**
//
// 盤上に表示される数字柄、絵柄など。
//

/**
 * 印字への入力
 */
export interface PrintingInput {
    " ": boolean,
    // ArrowUp: boolean,
    // ArrowRight: boolean,
    // ArrowDown: boolean,
    // ArrowLeft: boolean,
}

/**
 * 印字のモーション
 */
export interface PrintingMotion {
    goToHome: boolean,  // ホームに戻る
    wrapAroundRight: number,    // 負なら左、正なら右
    wrapAroundBottom: number,   // 負なら上、正なら下
}

// ++++++++++++++++++++++++++++
// + オブジェクト　＞　自機１ +
// ++++++++++++++++++++++++++++

/**
 * プレイヤーへの入力
 */
export interface PlayerInput {
    " ": boolean,
    ArrowUp: boolean,
    ArrowRight: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
}
// キーが PlayerInput のプロパティかチェックする型ガード
export function isPlayerInputKey(key: string): key is keyof PlayerInput {
    return [" ", "ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(key);
}
// // イベントハンドラ
// function handleKeyEvent(e: KeyboardEvent) {
//     if (isPlayerInputKey(e.key)) {
//         player1Input[e.key] = true; // 型安全！エラーなし
//     }
// }

/**
 * プレイヤーのモーション
 */
export interface PlayerMotion {
    lookRight: number,  // 向きを変える
    lookBottom: number,
    goToHome: boolean,  // ホームに戻る
    goToRight: number,  // 負なら左、正なら右へ移動する
    goToBottom: number, // 負なら上、正なら下へ移動する
}

/**
 * 自機の移動量（単位：マス）
 * @returns 
 */
function getPrinting1FileDelta(
    printing1Left: number,
    board1SquareWidth: number,
) : number {
    return Math.round(-printing1Left / board1SquareWidth);    // 印字盤が左に行くほど、盤上のキャラクターが右に動いたように見える。
}
function getPrinting1RankDelta(
    printing1Top: number,
    board1SquareHeight: number,
) : number {
    return Math.round(-printing1Top / board1SquareHeight);
}
function getPlayer1File(
    player1Left: number,
    board1SquareWidth: number,
) : number {
    return Math.round(player1Left / board1SquareWidth);
}
function getPlayer1Rank(
    player1Top: number,
    board1SquareHeight: number,
) : number {
    return Math.round(player1Top / board1SquareHeight);
}


/**
 * カウント・ダウン
 */
export function printingMotionCountDown(
    printing1MotionWait: Ref<number>,
) : void {
    printing1MotionWait.value -= 1; // 印字１
}


/**
 * カウント・ダウン
 */
export function playerMotionCountDown(
    player1MotionWait: Ref<number>,
) : void {
    player1MotionWait.value -= 1;   // 自機１
}


/**
 * モーション・ウェイトが０のとき、モーションのクリアー
 * @param printing1Motion 
 * @param printing1MotionWait 
 */
export function printingMotionClearIfCountZero(
    printing1Motion: Ref<PrintingMotion>,
    printing1MotionWait: number,
) : void {
    if (printing1MotionWait==0) {   // 印字
        printing1Motion.value.goToHome = false;
        printing1Motion.value.wrapAroundRight = 0;
        printing1Motion.value.wrapAroundBottom = 0;
    }
}


/**
 * モーション・ウェイトが０のとき、モーションのクリアー
 * @param player1Motion 
 * @param player1MotionWait 
 */
export function playerMotionClearIfCountZero(
    player1Motion: Ref<PlayerMotion>,
    player1MotionWait: number,
) : void {
    if (player1MotionWait==0) { // 自機
        player1Motion.value.goToHome = false;
        player1Motion.value.lookRight = 0;
        player1Motion.value.lookBottom = 0;
        player1Motion.value.goToRight = 0;
        player1Motion.value.goToBottom = 0;
    }
}


/**
 * 画面端が見えるような動きかをチェックします。
 */
function checkOutOfSightLeftIsLook(
    board1SquareWidth: number,
    board1WithMaskSizeSquare: number,
    printing1Left: number,
) : boolean {
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
    // pd
    //
    // 0 は、盤の初期位置からの移動量。盤は移動しないので常に 0。
    // c は、0 からみた、印字の左隅位置。 初期値は習慣的に、 0 以下にするものと思われる。
    // m は、 pd の正負を反転したもの。
    // m が、マスク幅より大きいなら、それ以上左に行くことはできない。
    //
    // m = c
    //

    const pd = getPrinting1FileDelta(printing1Left, board1SquareWidth) - 1;  // まだ -1 （左へ移動）されていないので、-1 しておく。
    const m = - pd;

    return board1WithMaskSizeSquare < m;
}


/**
 * 画面端が見えるような動きかをチェックします。
 */
function checkOutOfSightTopIsLook(
    board1SquareHeight: number,
    board1WithMaskSizeSquare: number,
    printing1Top: number,
) : boolean {
    // 見えている画面外が広がるような移動は禁止する：
    //
    // - 印字は動かない、プレイヤーの移動量を見ること。
    // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
    //
    // Printing
    // +-------------------->+     c  pd
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

    const pd = getPrinting1RankDelta(printing1Top, board1SquareHeight) - 1;  // まだ -1 （上へ移動）されていないので、-1 しておく。
    const m = - pd;
    return board1WithMaskSizeSquare < m;
}


/**
 * 画面端が見えるような動きかをチェックします。
 */
function checkOutOfSightRightIsLook(
    board1SquareWidth: number,
    board1WithMaskSizeSquare: number,
    board1FileNum: number,
    printing1FileNum: number,
    printing1Left: number,
) : boolean {
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
    // pd
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

    const pd = -(getPrinting1FileDelta(printing1Left, board1SquareWidth) + 1);  // まだ 1 （右へ移動）されていないので、1 しておく。
    const cw = printing1FileNum; // 例えば 10
    const bw = board1FileNum;
    const m = cw + pd - bw;
    return m < -board1WithMaskSizeSquare;
}


/**
 * 画面端が見えるような動きかをチェックします。
 */
function checkOutOfSightBottomIsLook(
    board1SquareHeight: number,
    board1WithMaskSizeSquare: number,
    board1RankNum: number,
    printing1RankNum: number,
    printing1Top: number,
) : boolean {
    // 見えている画面外が広がるような移動は禁止する：
    //
    // - 印字は動かない、プレイヤーの移動量を見ること。
    // TODO: プレイヤーの移動量と、印字の移動量を分けれないか？
    //
    // Printing
    // +------------------------------->+     c  pd
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

    const pd = -(getPrinting1RankDelta(printing1Top, board1SquareHeight) + 1);  // まだ +1 （下へ移動）されていないので、+1 しておく。
    const ch = printing1RankNum; // 例えば 10
    const bh = board1RankNum;
    const m = ch + pd - bh;
    //console.log(`[m=${m}] = [ch=${ch}] + [pd=${pd}] - [bh=${bh}].  m <= -board1WithMaskHeight:${m <= -board1WithMaskSizeSquare}`);
    return m < -board1WithMaskSizeSquare;
}


/**
 * キー入力を、モーションに変換します。
 * 
 * ［ラップ・アラウンド］するタイプです。十字キー入力とは逆方向に盤を動かします。ラップ・アラウンドしたタイルの印字は差し変わります。
 * 
 * 十字方向の入力をした場合、player1Motion の ["lookRight"], ["lookBottom"] （自機の向き）を更新。
 * また、自機の移動を伴うケースでは、十字方向の入力をした場合、player1Motion の ["goToRight"], ["goToBottom"] （自機の位置）を更新。
 * 
 * 通常、自機は移動せず、 printing1Motion の ["wrapAroundRight"], ["wrapAroundBottom"] （印字表）を更新。
 */
export function printingMotionUpdateByInputWithWrapAround(
    printingOutOfSightIsLock: boolean,
    board1SquareWidth: number,
    board1SquareHeight: number,
    board1FileNum: number,
    board1RankNum: number,
    board1WithMaskSizeSquare: number,
    printing1FileNum: number,
    printing1RankNum: number,
    printing1Left: number,
    printing1Top: number,
    printing1Input: PrintingInput,
    printing1Motion: Ref<PrintingMotion>,
    printing1MotionWait: number,
    playerHome1File: number,
    playerHome1Rank: number,
    player1Left: number,
    player1Top: number,
    player1Input: PlayerInput,
) : void {

    // ++++++++++++++++++++++++++++++++++++++++
    // + ウェイトが無ければ、入力を受け付ける +
    // ++++++++++++++++++++++++++++++++++++++++

    // ----------------------------------------------------
    // - ウェイトが無ければ、入力を受け付ける　＞　印字１ -
    // ----------------------------------------------------
    
    if (printing1MotionWait <= 0) {

        // 位置のリセット
        if (printing1Input[" "]) {
            printing1Motion.value.goToHome = true;
        }

        // 移動関連（単発）
        // 斜め方向の場合、左右を上下で上書きする。（左、右）→（上、下）の順。
        if (player1Input.ArrowLeft) { // 左
            if (getPlayer1File(player1Left, board1SquareWidth) > playerHome1File) {
                // pass
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightLeftIsLook(
                        board1SquareWidth,
                        board1WithMaskSizeSquare,
                        printing1Left
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value.wrapAroundRight = commonSpriteMotionRight;   // 印字は、キー入力とは逆向きへ進める
                }
            }
        }

        if (player1Input.ArrowRight) {  // 右
            // ホーム・ポジションより左に居ればホームに近づける。
            if (getPlayer1File(player1Left, board1SquareWidth) < playerHome1File) {
                // pass
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightRightIsLook(
                        board1SquareWidth,
                        board1WithMaskSizeSquare,
                        board1FileNum,
                        printing1FileNum,
                        printing1Left
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value.wrapAroundRight = commonSpriteMotionLeft;    // 印字は、キー入力とは逆向きへ進める
                }
            }
        }

        if (player1Input.ArrowUp) {    // 上
            // ホーム・ポジションより下に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) > playerHome1Rank) {
                // pass
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightTopIsLook(
                        board1SquareHeight,
                        board1WithMaskSizeSquare,
                        printing1Top
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value.wrapAroundBottom = commonSpriteMotionDown;     // 印字は、キー入力とは逆向きへ進める
                }
            }
        }

        if (player1Input.ArrowDown) {   // 下
            // ホーム・ポジションより上に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) < playerHome1Rank) {
                // pass
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightBottomIsLook(
                        board1SquareHeight,
                        board1WithMaskSizeSquare,
                        board1RankNum,
                        printing1RankNum,
                        printing1Top
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value.wrapAroundBottom = commonSpriteMotionUp;    // 印字は、キー入力とは逆向きへ進める
                }
            }
        }
    }
}


/**
 * キー入力を、モーションに変換します。
 * 
 * ［ラップ・アラウンド］するタイプです。十字キー入力とは逆方向に盤を動かします。ラップ・アラウンドしたタイルの印字は差し変わります。
 * 
 * 十字方向の入力をした場合、player1Motion の ["lookRight"], ["lookBottom"] （自機の向き）を更新。
 * また、自機の移動を伴うケースでは、十字方向の入力をした場合、player1Motion の ["goToRight"], ["goToBottom"] （自機の位置）を更新。
 * 
 * 通常、自機は移動せず、 printing1Motion の ["wrapAroundRight"], ["wrapAroundBottom"] （印字表）を更新。
 */
export function playerMotionUpdateByInputWithWrapAround(
    printingOutOfSightIsLock: boolean,
    board1SquareWidth: number,
    board1SquareHeight: number,
    board1FileNum: number,
    board1RankNum: number,
    board1WithMaskSizeSquare: number,
    printing1FileNum: number,
    printing1RankNum: number,
    printing1Left: number,
    printing1Top: number,
    playerHome1File: number,
    playerHome1Rank: number,
    player1Left: number,
    player1Top: number,
    player1Input: PlayerInput,
    player1Motion: Ref<PlayerMotion>,
    player1MotionWait: number,
    player1CanBoardEdgeWalking: boolean,
) : void {

    // ++++++++++++++++++++++++++++++++++++++++
    // + ウェイトが無ければ、入力を受け付ける +
    // ++++++++++++++++++++++++++++++++++++++++

    // ----------------------------------------------------
    // - ウェイトが無ければ、入力を受け付ける　＞　自機１ -
    // ----------------------------------------------------

    if (player1MotionWait <= 0) {

        // 位置のリセット
        if (player1Input[" "]) {
            player1Motion.value.goToHome = true;
        }

        // 移動関連（単発）
        // 斜め方向の場合、左右を上下で上書きする。（左、右）→（上、下）の順。
        if (player1Input.ArrowLeft) { // 左
            player1Motion.value.lookRight = commonSpriteMotionLeft;

            if (getPlayer1File(player1Left, board1SquareWidth) > playerHome1File) {
                // ホーム・ポジションより右に居ればホームに近づける。
                player1Motion.value.goToRight = commonSpriteMotionLeft;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightLeftIsLook(
                        board1SquareWidth,
                        board1WithMaskSizeSquare,
                        printing1Left
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    // pass
                } else if (player1CanBoardEdgeWalking) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1File(player1Left, board1SquareWidth) > 0 + board1WithMaskSizeSquare) {
                        player1Motion.value.goToRight = commonSpriteMotionLeft;
                    }
                }
            }
        }

        if (player1Input.ArrowRight) {  // 右
            player1Motion.value.lookRight = commonSpriteMotionRight;

            // ホーム・ポジションより左に居ればホームに近づける。
            if (getPlayer1File(player1Left, board1SquareWidth) < playerHome1File) {
                player1Motion.value.goToRight = commonSpriteMotionRight;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightRightIsLook(
                        board1SquareWidth,
                        board1WithMaskSizeSquare,
                        board1FileNum,
                        printing1FileNum,
                        printing1Left
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    // pass
                } else if (player1CanBoardEdgeWalking) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1File(player1Left, board1SquareWidth) < board1FileNum - board1WithMaskSizeSquare - 1) {
                        player1Motion.value.goToRight = commonSpriteMotionRight;
                    }
                }
            }
        }

        if (player1Input.ArrowUp) {    // 上
            player1Motion.value.lookBottom = commonSpriteMotionUp;

            // ホーム・ポジションより下に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) > playerHome1Rank) {
                player1Motion.value.goToBottom = commonSpriteMotionUp;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightTopIsLook(
                        board1SquareHeight,
                        board1WithMaskSizeSquare,
                        printing1Top
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    // pass
                } else if (player1CanBoardEdgeWalking) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1Rank(player1Top, board1SquareHeight) > 0 + board1WithMaskSizeSquare) {
                        player1Motion.value.goToBottom = commonSpriteMotionUp;
                    }
                }
            }
        }

        if (player1Input.ArrowDown) {   // 下
            player1Motion.value.lookBottom = commonSpriteMotionDown;

            // ホーム・ポジションより上に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) < playerHome1Rank) {
                player1Motion.value.goToBottom = commonSpriteMotionDown;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock) {
                    if (checkOutOfSightBottomIsLook(
                        board1SquareHeight,
                        board1WithMaskSizeSquare,
                        board1RankNum,
                        printing1RankNum,
                        printing1Top
                    )) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    // pass
                } else if (player1CanBoardEdgeWalking) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1Rank(player1Top, board1SquareHeight) < board1RankNum - board1WithMaskSizeSquare - 1) {
                        player1Motion.value.goToBottom = commonSpriteMotionDown;
                    }
                }
            }
        }
    }
}


/**
 * 向き・移動・ウェイトを処理
 * @param printing1MotionSpeed 移動速度（ピクセル単位）
 */
export function printingImageAndPositionAndWaitUpdate(
    printing1Left: Ref<number>,
    printing1Top: Ref<number>,
    printing1Motion: PrintingMotion,
    printing1MotionSpeed: number,
    printing1MotionWait: Ref<number>,
    printing1MotionWalkingFrames: number,
) : void {

    // ++++++++++
    // + 印字１ +
    // ++++++++++

    if (printing1Motion.goToHome) {
            printing1Left.value = 0;
            printing1Top.value = 0;
    }

    // 移動量（単位：ピクセル）を更新、ピクセル単位。通常あり得ないことだが、左右同時入力の場合左優先。上下同時入力の場合上優先：
    if (printing1Motion.wrapAroundRight == commonSpriteMotionLeft) {  // 左
        printing1Left.value -= printing1MotionSpeed;
    } else if (printing1Motion.wrapAroundRight == commonSpriteMotionRight) {   // 右
        printing1Left.value += printing1MotionSpeed;
    }

    if (printing1Motion.wrapAroundBottom == commonSpriteMotionUp) {  // 上
        printing1Top.value -= printing1MotionSpeed;
    } else if (printing1Motion.wrapAroundBottom == commonSpriteMotionDown) {   // 下
        printing1Top.value += printing1MotionSpeed;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + モーション・ウェイトが０以下のときだけ実行される処理 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    if (printing1MotionWait.value <= 0) {

        // ................
        // . ウェイト設定 .
        // ................

        // goToHome はウェイト無し

        if (printing1Motion.wrapAroundRight != 0 || printing1Motion.wrapAroundBottom != 0) {
            printing1MotionWait.value = printing1MotionWalkingFrames;
        }
    }
}

/**
 * 向き・移動・ウェイトを処理
 * @param printing1MotionSpeed 移動速度（ピクセル単位）
 */
export function playerImageAndPositionAndWaitUpdate(
    playerHome1Left: number,
    playerHome1Top: number,
    player1Left: Ref<number>,
    player1Top: Ref<number>,
    player1Motion: PlayerMotion,
    player1MotionSpeed: number,
    player1MotionWait: Ref<number>,
    player1SourceFrames: RpgWalkingImagePosition,
    player1Frames: Ref<Rectangle[]>,
    player1MotionFacingFrames: number,
    player1MotionWalkingFrames: number,
) : void {

    // ++++++++++
    // + 自機１ +
    // ++++++++++

    if (player1Motion.goToHome) {
        player1Left.value = playerHome1Left;
        player1Top.value = playerHome1Top;
    }

    // 移動量（単位：ピクセル）を更新、ピクセル単位。通常あり得ないことだが、左右同時入力の場合左優先。上下同時入力の場合上優先：
    if (player1Motion.goToRight == commonSpriteMotionLeft) {    // 左
        player1Left.value -= player1MotionSpeed;
    } else if (player1Motion.goToRight == commonSpriteMotionRight) {  // 右
        player1Left.value += player1MotionSpeed;
    }

    if (player1Motion.goToBottom == commonSpriteMotionUp) {   // 上
        player1Top.value -= player1MotionSpeed;
    } else if (player1Motion.goToBottom == commonSpriteMotionDown) { // 下
        player1Top.value += player1MotionSpeed;
    }

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // + モーション・ウェイトが０以下のときだけ実行される処理 +
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    if (player1MotionWait.value <= 0) {

        // 自機の向き（単位：ピクセル）を更新、上下左右の複数同時入力の場合、左、上、右、下の順で優先：
        if (player1Motion.lookRight == commonSpriteMotionLeft) {    // 左
            player1Frames.value = player1SourceFrames.left;
        } else if (player1Motion.lookBottom == commonSpriteMotionUp) {   // 上
            player1Frames.value = player1SourceFrames.up;
        } else if (player1Motion.lookRight == commonSpriteMotionRight) {  // 右
            player1Frames.value = player1SourceFrames.right;
        } else if (player1Motion.lookBottom == commonSpriteMotionDown) { // 下
            player1Frames.value = player1SourceFrames.down;
        }

        // ................
        // . ウェイト設定 .
        // ................

        // goToHome はウェイト無し

        if (player1Motion.goToRight != 0 || player1Motion.goToBottom != 0) {
            player1MotionWait.value = player1MotionWalkingFrames;
        } else if (player1Motion.lookRight != 0 || player1Motion.lookBottom != 0) {
            player1MotionWait.value = player1MotionFacingFrames;
        }
    }
}
