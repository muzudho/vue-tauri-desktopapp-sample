// ##############
// # インポート #
// ##############

import { Ref } from 'vue';


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


// ##########
// # その他 #
// ##########

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
 * 印字への入力
 */
export interface MotionInput {
    wrapAroundRight: number,    // 負なら左、正なら右
    wrapAroundBottom: number,   // 負なら上、正なら下
}

/**
 * 自機の移動量（単位：マス）
 * @returns 
 */
function getPrinting1FileDelta(
    printing1Left: Ref<number>,
    board1SquareWidth: number,
) : number {
    return Math.round(-printing1Left.value / board1SquareWidth);    // 印字盤が左に行くほど、盤上のキャラクターが右に動いたように見える。
}
function getPrinting1RankDelta(
    printing1Top: Ref<number>,
    board1SquareHeight: number,
) : number {
    return Math.round(-printing1Top.value / board1SquareHeight);
}
function getPlayer1File(
    player1Left: Ref<number>,
    board1SquareWidth: number,
) : number {
    return Math.round(player1Left.value / board1SquareWidth);
}
function getPlayer1Rank(
    player1Top: Ref<number>,
    board1SquareHeight: number,
) : number {
    return Math.round(player1Top.value / board1SquareHeight);
}


/**
 * キー入力を、モーションに変換します。
 * 
 * 十字方向の入力をした場合、player1Motion の ["lookRight"], ["lookBottom"] （自機の向き）を更新。
 * また、自機の移動を伴うケースでは、 ["goToRight"], ["goToBottom"] （自機の位置）を更新。
 * 
 * 通常、自機は移動せず、 printing1Motion の ["wrapAroundRight"], ["wrapAroundBottom"] （印字表）を更新。
 */
export function handlePlayerController(
    printingOutOfSightIsLock: Ref<boolean>,
    board1SquareWidth: number,
    board1SquareHeight: number,
    board1FileNum: Ref<number>,
    board1RankNum: Ref<number>,
    board1WithMaskSizeSquare: Ref<number>,
    playerHome1File: Ref<number>,
    playerHome1Rank: Ref<number>,
    playerHome1Left: Ref<number>,
    playerHome1Top: Ref<number>,
    player1MotionWait: Ref<number>,
    player1Input: PlayerInput,
    player1Motion: Ref<Record<string, number>>,
    // player1File: Ref<number>,
    // player1Rank: Ref<number>,
    player1Left: Ref<number>,
    player1Top: Ref<number>,
    player1CanBoardEdgeWalking: Ref<boolean>,
    printing1FileNum: Ref<number>,
    printing1RankNum: Ref<number>,
    printing1Left: Ref<number>,
    printing1Top: Ref<number>,
    printing1Motion: Ref<MotionInput>,
) : void {
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
            if (getPlayer1File(player1Left, board1SquareWidth) > playerHome1File.value) {
                player1Motion.value["goToRight"] = commonSpriteMotionLeft;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock.value) {
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

                    const pd = getPrinting1FileDelta(printing1Left, board1SquareWidth) - 1;  // まだ -1 （左へ移動）されていないので、-1 しておく。
                    const m = - pd;

                    if (board1WithMaskSizeSquare.value < m) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value["wrapAroundRight"] = commonSpriteMotionRight;   // 印字は、キー入力とは逆向きへ進める
                } else if (player1CanBoardEdgeWalking.value) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1File(player1Left, board1SquareWidth) > 0 + board1WithMaskSizeSquare.value) {
                        player1Motion.value["goToRight"] = commonSpriteMotionLeft;
                    }
                }
            }
        }

        if (player1Input.ArrowRight) {  // 右
            player1Motion.value["lookRight"] = commonSpriteMotionRight;

            // ホーム・ポジションより左に居ればホームに近づける。
            if (getPlayer1File(player1Left, board1SquareWidth) < playerHome1File.value) {
                player1Motion.value["goToRight"] = commonSpriteMotionRight;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock.value) {
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

                    const pd = -getPrinting1FileDelta(printing1Left, board1SquareWidth);
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
                        if (getPlayer1File(player1Left, board1SquareWidth) < board1FileNum.value - board1WithMaskSizeSquare.value - 1) {
                            player1Motion.value["goToRight"] = commonSpriteMotionRight;
                        }
                    }
                }
            }
        }

        if (player1Input.ArrowUp) {    // 上
            player1Motion.value["lookBottom"] = commonSpriteMotionUp;

            // ホーム・ポジションより下に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) > playerHome1Rank.value) {
                player1Motion.value["goToBottom"] = commonSpriteMotionUp;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock.value) {
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

                    const pd = getPrinting1RankDelta(printing1Top, board1SquareHeight) - 1;  // まだ -1 （上へ移動）されていないので、-1 しておく。
                    const m = - pd;

                    if (board1WithMaskSizeSquare.value < m) {
                        willShift = false;
                    }
                }

                if (willShift) {
                    printing1Motion.value["wrapAroundBottom"] = commonSpriteMotionDown;     // 印字は、キー入力とは逆向きへ進める
                } else if (player1CanBoardEdgeWalking.value) {
                    // ［盤の端まで歩ける］
                    if (getPlayer1Rank(player1Top, board1SquareHeight) > 0 + board1WithMaskSizeSquare.value) {
                        player1Motion.value["goToBottom"] = commonSpriteMotionUp;
                    }
                }
            }
        }

        if (player1Input.ArrowDown) {   // 下
            player1Motion.value["lookBottom"] = commonSpriteMotionDown;

            // ホーム・ポジションより上に居ればホームに近づける。
            if (getPlayer1Rank(player1Top, board1SquareHeight) < playerHome1Rank.value) {
                player1Motion.value["goToBottom"] = commonSpriteMotionDown;
            } else {
                let willShift: boolean = true;
                if (printingOutOfSightIsLock.value) {
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

                    const pd = -(getPrinting1RankDelta(printing1Top, board1SquareHeight)+1);  // まだ +1 （下へ移動）されていないので、+1 しておく。
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
                    if (getPlayer1Rank(player1Top, board1SquareHeight) < board1RankNum.value - board1WithMaskSizeSquare.value - 1) {
                        player1Motion.value["goToBottom"] = commonSpriteMotionDown;
                    }
                }
            }
        }
    }
}