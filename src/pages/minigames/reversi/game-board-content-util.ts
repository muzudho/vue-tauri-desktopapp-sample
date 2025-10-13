// ##############
// # インポート #
// ##############

import { COLOR_EMPTY, Color, oppositeColor, SQ_OUT_OF_BOARD } from "@/pages/minigames/reversi/spec.ts";


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
    const oppositeTurnColor1: Color = oppositeColor(thisTurn); // 相手番石の色
 
    let nextSq = startSq;
    while (true) {
        if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
            break;
        }

        const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

        if ([COLOR_EMPTY, oppositeTurnColor1].includes(nextColor)) { // ［空マス］,［相手番石］に突き当たったら終了
            break;
        }

        // ［手番石］に突き当たったら、続行
        nextSq = nextOf(nextSq);
    }

    return nextSq;
}


/**
 * ［相手番石］を跨ぐ
 * @param startSq 
 * @param nextOf 
 * @returns ［跨いだ相手番石］。着手点に近い方から順に並ぶ
 */
export function locateHoppedoverOppositeTurnStones(
    gameBoard1StoneColorArray: Color[],
    thisTurn: Color,
    startSq: number,
    nextOf: (sq: number)=>number,
) : [number[], number] {
    let hoppedoverStones: number[] = [];  // ［跨いだ相手番石］。まだ［ひっくり返せる石］かどうかは決まらない。

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

    return [hoppedoverStones, nextSq];
}


/**
 * 石の色を返す関数を生成する。
 * @param gameBoard1StoneColorArray 盤上の石の色配列
 * @returns 石の色を返す関数
 */
export function makeGetColor(
    gameBoard1StoneColorArray: Color[],
) :
    (sq: number)=>Color
{
    /**
     * 石の色を返す。
     * @param sq マス番号
     * @return 石の色
     */
    return (sq: number) : Color => {
        if (sq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
            return COLOR_EMPTY;
        }

        return gameBoard1StoneColorArray[sq];  // 隣の石の色
    };
}


export function getLastSq(
    stones: number[],
) : number {
    if (stones.length == 0) {
        return SQ_OUT_OF_BOARD;
    }

    return stones[stones.length - 1];   // 跨いだ石の最後
}


export function getCap(
    startSq: number,
    gameBoard1StoneColorArray: Color[],
    hoppedoverStones: number[],
    nextOf: (sq: number)=>number,
) : [number, Color] {
    let capSq: number;
    if (0 < hoppedoverStones.length) {
        capSq = nextOf(hoppedoverStones[hoppedoverStones.length - 1]);   // 跨いだ石の最後の次へ

    } else {
        capSq = startSq;   // 起点がキャップ
    }

    if (capSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
        return [SQ_OUT_OF_BOARD, COLOR_EMPTY];
    }
    const capColor: Color = gameBoard1StoneColorArray[capSq];  // 隣の石の色
    return [capSq, capColor];
}
