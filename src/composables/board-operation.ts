// ##############
// # インポート #
// ##############

import { computed } from "vue";

// ++++++++++++++++++
// + コンポーザブル +
// ++++++++++++++++++

import { euclideanMod, getIndexWhenAddUpFileAndRankOnPeriodicTable } from "./periodic-table-operation"


// ################
// # ライブラリー #
// ################

/**
 * 変換
 * @param index マス番号
 * @returns [筋番号, 段番号]
 */
export function getFileAndRankFromIndex(index: number, width: number) : [number, number] {
    const file = index % width;
    const rank = Math.floor(index / width);
    return [file, rank];
}


/**
 * 
 * @param file 
 * @param rank 
 * @param width 
 * @returns 
 */
export function getIndexFromFileAndRank(file: number, rank: number, width: number) : number {
    return rank * width + file;
}


/**
 * 見た目のマスのインデックス（固定インデックス）を取得します。
 */
export const getFixedSquareIndexFromTileIndex = computed<
    (
        tileIndex: number,
        board1SquareWidth: number,
        board1SquareHeight: number,
        board1FileNum: number,
        board1RankNum: number,
        printing1Left: number,
        printing1Top: number,
    ) => number
>(() => {
    return (
        tileIndex: number,
        board1SquareWidth: number,
        board1SquareHeight: number,
        board1FileNum: number,
        board1RankNum: number,
        printing1Left: number,
        printing1Top: number,
    ) => {
        return getIndexWhenAddUpFileAndRankOnPeriodicTable(
            tileIndex,
            board1FileNum,
            board1RankNum,
            printing1Left / board1SquareWidth,
            printing1Top / board1SquareHeight
        );
    };
});


/**
 * 印字盤のマスのインデックスを取得します。
 */
export const getPrintingSquareIndexFromTileIndex = computed<
    (
        tileIndex: number,
        board1SquareWidth: number,
        board1SquareHeight: number,
        board1FileNum: number,
        board1RankNum: number,
        printing1IsLooping: boolean,
        printing1FileNum: number,
        printing1RankNum: number,
        printing1Left: number,
        printing1Top: number,
        offsetFile: number,
        offsetRank: number,
    ) => string
>(() => {
    return (
        tileIndex: number,
        board1SquareWidth: number,
        board1SquareHeight: number,
        board1FileNum: number,
        board1RankNum: number,
        printing1IsLooping: boolean,
        printing1FileNum: number,
        printing1RankNum: number,
        printing1Left: number,
        printing1Top: number,
        offsetFile: number,
        offsetRank: number,
    ) => {
        const fixedSquareIndex = getIndexWhenAddUpFileAndRankOnPeriodicTable(
            tileIndex,
            board1FileNum,
            board1RankNum,
            printing1Left / board1SquareWidth,
            printing1Top / board1SquareHeight
        );

        let [fixedSquareFile, fixedSquareRank] = getFileAndRankFromIndex(fixedSquareIndex, board1FileNum);

        const printingIndex = getSubprintingIndexFromFixedSquareIndex(
            fixedSquareIndex,
            fixedSquareFile + offsetFile,
            fixedSquareRank + offsetRank,
            board1FileNum,
            printing1FileNum,
            printing1RankNum,
            printing1IsLooping);

        // 印字のサイズの範囲外になるところには、"-" でも表示しておく
        if (printingIndex == -1) {
            return "-";
        }

        return `${printingIndex}`;
    };
});


/**
 * 見た目のマスのインデックス（固定インデックス）を、サブ印字表インデックスへ変換します。
 * @param fixedSquareIndex 
 * @returns 該当なしのとき -1
 */
export function getSubprintingIndexFromFixedSquareIndex(
    fixedSquareIndex: number,
    offsetFile: number,
    offsetRank: number,
    width: number,
    printing1FileNum: number,
    printing1RankNum: number,
    printing1IsLooping: boolean
) : number {

    let [squareFile, squareRank] = getFileAndRankFromIndex(fixedSquareIndex, width);

    // 盤上の筋、段を、サブ印字表の筋、段へ変換：
    let subprintingFile = squareFile + offsetFile;
    let subprintingRank = squareRank + offsetRank;

    if (printing1IsLooping) {
        // 端でループする
        subprintingFile = euclideanMod(subprintingFile, printing1FileNum);
        subprintingRank = euclideanMod(subprintingRank, printing1RankNum);
    } else {
        // 印字のサイズの範囲外になるところには、"-" でも表示しておく
        if (subprintingFile < 0 || printing1FileNum <= subprintingFile || subprintingRank < 0 || printing1RankNum <= subprintingRank) {
            return -1;
        }
    }

    const subprintingIndex = getIndexFromFileAndRank(subprintingFile, subprintingRank, printing1FileNum);
    return subprintingIndex;
}
