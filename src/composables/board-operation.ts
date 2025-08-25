// ##############
// # インポート #
// ##############

import { euclideanMod } from "./periodic-table-operation"


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
 * 固定マス・インデックスを、サブ印字表インデックスへ変換します。
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
