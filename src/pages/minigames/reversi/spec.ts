// ################
// # オブジェクト #
// ################

// ++++++++++++++++++++++++++++++
// + オブジェクト　＞　マス番号 +
// ++++++++++++++++++++++++++++++

export const SQ_OUT_OF_BOARD = -1;


/**
 * 符号を sq に変換する関数を返します。
 * @param boardFileNum 盤の筋の数 
 */
export function makeCodeToSq(
    boardFileNum: number
) :
    (code: string) => number
{
    return (code: string) => {
        const match = code.match(/^([A-Za-z])(\d{1,2})$/);
        if (!match) {
                return SQ_OUT_OF_BOARD; // 入力が条件に合わない場合
        }
        const letter = match[1];    // アルファベット部分
        const rank = parseInt(match[2], 10);    // 数値部分（文字列）

        function getFile(letter: string) : number {
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
            } as Record<string, number>;
            return fileMap[letter];
        }

        const file = getFile(letter);
        return (rank - 1) * boardFileNum + file;
    };
}


// ++++++++++++++++++++++++
// + オブジェクト　＞　色 +
// ++++++++++++++++++++++++

export const COLOR_EMPTY = 0;
export const COLOR_BLACK = 1;
export const COLOR_WHITE = 2;
export const COLOR_SIZE = 3;
export type Color =
      typeof COLOR_EMPTY
    | typeof COLOR_BLACK
    | typeof COLOR_WHITE
    ;
