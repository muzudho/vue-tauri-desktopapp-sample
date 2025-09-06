/*
 * 像盤 
 */

// ##############
// # インポート #
// ##############

// ++++++++++++++++++++++++++++++++++++
// + インポート　＞　インターフェース +
// ++++++++++++++++++++++++++++++++++++

import type Rectangle from '../interfaces/Rectangle';


/**
 * 以下のようなラムダ関数を作ります：
 *      像盤のマス番号（0から始まる）を渡すと、ソースのタイルタイルマップ上の left を返す。
 */
export function createGetSourceTileLeftByImageBoardSq(
    imageBoard1Data: number[],
    sourceTilemapRectangles: Rectangle[],
) : (sq: number) => number
{
    return (sq: number) => {
        console.log(`sq=${sq}`)

        if (sq == -1) {
            return 0;   // 印字のサイズの範囲外になるところには、とりあえず 0 を返す。左上のタイルが選ばれる。
        }

        const sourceTileIndex = imageBoard1Data[sq];
        const rectangle = sourceTilemapRectangles[sourceTileIndex];
        console.log(`sourceTileIndex=${sourceTileIndex}`)

        try {
            if (rectangle) {
                console.log(`rectangle["left"]=${rectangle["left"]}`)

                return rectangle["left"];
            }

            // sourceTileIndex に対応するタイルがなかったとき、仕方ないので 0 を返す。
            // 印字盤のサイズが小さくなったとき、インデックス・アクセスが範囲外エラーになる？
            return 0;

        } catch(error) {
            console.error(`ERROR: ${error} | sq=${sq}`);
            return 0;
        }
    };
}
