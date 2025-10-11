// ##############
// # インポート #
// ##############

import { COLOR_EMPTY, Color, SQ_OUT_OF_BOARD } from "@/pages/minigames/reversi/spec.ts";


// ################
// # サブルーチン #
// ################

/**
 * 手番石を読み飛ばす
 * @param gameBoard1StoneColorArray 
 * @param thisTurn 
 * @param startSq 
 * @param nextOf 
 * @return 次のマス番号
 */
export function locateThisTurnStonesSkipped(
    gameBoard1StoneColorArray: Color[],
    thisTurn: Color,
    startSq: number,
    nextOf: (sq: number)=>number,
) : number {
    // ［手番石］を読み飛ばす：
    let nextSq = startSq;
    while (true) {
        if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
            return nextSq;
        }

        const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

        if (nextColor != thisTurn) { // ［手番石］以外は終了。
            break;
        }

        // ［手番石］に突き当たったら、続行
        nextSq = nextOf(nextSq);
    }

    return nextSq;
}


/**
 * 
 * @param startSq 
 * @param nextOf 
 * @returns ［跨いだ相手番石］。着手点に近い方から順に並ぶ
 */
export function locateHoppedoverStones(
    gameBoard1StoneColorArray: Color[],
    thisTurn: Color,
    startSq: number,
    nextOf: (sq: number)=>number,
) : number[] {
    let hoppedoverStones: number[] = [];  // ［跨いだ石］。まだ［ひっくり返せる石］かどうかは決まらない。

    // ［相手番石］を跨ぐ
    let nextSq = startSq;
    while (true) {
        if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
            break;
        }

        const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

        if ([COLOR_EMPTY, thisTurn].includes(nextColor)) { // ［空マス］,［手番石］に突き当たったら終了
            break;
        }

        // ［相手番石］に突き当たったら、続行
        hoppedoverStones.push(nextSq);
        nextSq = nextOf(nextSq);
    }

    return hoppedoverStones;
}
