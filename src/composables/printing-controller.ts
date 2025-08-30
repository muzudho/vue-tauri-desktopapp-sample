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
    // ArrowUp: boolean,
    // ArrowRight: boolean,
    // ArrowDown: boolean,
    // ArrowLeft: boolean,
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
