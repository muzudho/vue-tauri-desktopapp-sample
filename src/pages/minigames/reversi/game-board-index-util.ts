export const gameBoard1FileNameArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


export function makeSqToCode(
    fileNum: number,
) :
    (sq: number)=>string
{
    return (sq: number) => {
        const file = sq % fileNum;
        const rank = Math.floor(sq / fileNum);
        const code = `${gameBoard1FileNameArray[file]}${rank+1}`;
        //console.log(`DEBUG: [sqToCode] sq=${sq} gameBoard1FileNum.value=${gameBoard1FileNum.value} file=${file} rank=${rank} gameBoard1RankNum.value=${gameBoard1RankNum.value} code=${code}`);
        return code;
    };
}

// /**
//  * sq を符号に変換
//  * @param sq 
//  */
// function sqToCode(sq: number) : string {
//     const file = sq % gameBoard1FileNum.value;
//     const rank = Math.floor(sq / gameBoard1FileNum.value);
//     const code = `${gameBoard1FileNameArray[file]}${rank+1}`;
//     //console.log(`DEBUG: [sqToCode] sq=${sq} gameBoard1FileNum.value=${gameBoard1FileNum.value} file=${file} rank=${rank} gameBoard1RankNum.value=${gameBoard1RankNum.value} code=${code}`);
//     return code;
// }
