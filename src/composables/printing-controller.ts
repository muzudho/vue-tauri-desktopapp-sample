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
