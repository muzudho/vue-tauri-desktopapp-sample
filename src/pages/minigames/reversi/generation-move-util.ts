import type { Color } from '@/pages/minigames/reversi/spec';

/**
 * ［ストーンズ・キャップ］に石を置けるかどうか判定し、更新します
 * 
 * @param colorList ［連続する石］について、その色の並び順リスト
 * @param stonesCapSq 
 * @return 黒、白の順で、石を置けるかどうか
 */
export function generationMoveStoneCapCanMove(
    colorList: Color[],
    stonesCapSq: number,
    colorToCode: (color: Color)=>string,
    sqToCode: (sq: number)=>string,
) : [boolean, boolean] {
    // サンドイッチの色は分かってるから、エクステンド・ストーンズの石の色を見ていく。
    
    console.log(`DEBUG: [putStone] レスト・ストーンズ色　色リスト＝${colorList.map(x=>colorToCode(x)).join(',')}`);

    if (colorList.length < 2) {
        console.log(`DEBUG: [putStone] ${sqToCode(stonesCapSq)}に石は置けない（色リスト長さ不足）`);
        return [false, false]; // 置けない
    }

    // 石が置ける条件は、色リストの末尾が [1, 2] なら 1。 [2, 1] なら 2。その他は置けない。
    const sliced = colorList.slice(colorList.length - 2);
    console.log(`DEBUG: [putStone] レスト・ストーンズ色　末尾２つ＝${sliced.map(x=>colorToCode(x)).join(',')}`);
    if (sliced[0] == 1 && sliced[1] == 2) { // 置ける
        console.log(`DEBUG: [putStone] ${sqToCode(stonesCapSq)}に黒だけ置ける`);
        return [true, false];
    } else if (sliced[0] == 2 && sliced[1] == 1) { // 置ける
        console.log(`DEBUG: [putStone] ${sqToCode(stonesCapSq)}に白だけ置ける`);
        return [false, true];
    } else {    // 置けない
        console.log(`DEBUG: [putStone] ${sqToCode(stonesCapSq)}に石は置けない`);
        return [false, false];
    }
}
