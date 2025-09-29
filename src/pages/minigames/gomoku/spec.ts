// ################
// # オブジェクト #
// ################

// ++++++++++++++++++++++++++++++
// + オブジェクト　＞　マス番号 +
// ++++++++++++++++++++++++++++++

export const SQ_OUT_OF_BOARD = -1;


/**
 * 符号を sq に変換
 * @param sq 
 */
export function codeToSq(code: string, boardFileNum: number) : number {
    const match = code.match(/^([A-Za-z])(\d{1,2})$/);
    if (!match) {
            return SQ_OUT_OF_BOARD; // 入力が条件に合わない場合
    }
    const letter = match[1];    // アルファベット部分
    const rank = parseInt(match[2], 10);    // 数値部分（文字列）

    function getFile(fileCode: string) : number {
        const fileMap = {
            'A': 0,
            'B': 1,
            'C': 2,
            'D': 3,
            'E': 4,
            'F': 5,
            'G': 6,
            'H': 7,
            'I': 8,
            'J': 9,
            'K': 10,
            'L': 11,
            'M': 12,
            'N': 13,
            'O': 14,
        } as Record<string, number>;
        return fileMap[fileCode];
    }

    const file = getFile(letter);
    return (rank - 1) * boardFileNum + (file - 1);
}
