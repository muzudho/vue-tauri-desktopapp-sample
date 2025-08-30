// ##############
// # インポート #
// ##############

import type { Ref } from 'vue';


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
 * カウント・ダウン
 */
export function printingMotionCountDown(
    printing1MotionWait: Ref<number>,
) : void {
    printing1MotionWait.value -= 1; // 印字１
}

/**
 * 印字への入力
 */
export interface PrintingInput {
    " ": boolean,
    ArrowUp: boolean,
    ArrowRight: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
}

/**
 * ［印字への入力］の初期値を作成
 */
export function printingInputCreate() : PrintingInput {
    return {
        " ": false,
    } as PrintingInput;
}

/**
 * 印字のモーション
 */
export interface PrintingMotion {
    goToHome: boolean,  // ホームに戻る
    wrapAroundRight: number,    // 負なら左、正なら右
    wrapAroundBottom: number,   // 負なら上、正なら下
}

/**
 * ［印字のモーション］の初期値を作成
 */
export function printingMotionCreate() : PrintingMotion {
    return {
        goToHome: false,    // ホームに戻る
        wrapAroundRight: 0, // 負なら左、正なら右
        wrapAroundBottom: 0,    // 負なら上、正なら下
    } as PrintingMotion;
}

/**
 * 印字盤の移動量（単位：マス）
 * @returns 
 */
export function getPrinting1FileDelta(
    printing1Left: number,
    board1SquareWidth: number,
) : number {
    return Math.round(-printing1Left / board1SquareWidth);    // 印字盤が左に行くほど、盤上のキャラクターが右に動いたように見える。
}
export function getPrinting1RankDelta(
    printing1Top: number,
    board1SquareHeight: number,
) : number {
    return Math.round(-printing1Top / board1SquareHeight);
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
 * 画面端が見えるような動きかをチェックします。
 */
export function checkOutOfSightLeftIsLook(
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
export function checkOutOfSightTopIsLook(
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
export function checkOutOfSightRightIsLook(
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
export function checkOutOfSightBottomIsLook(
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
