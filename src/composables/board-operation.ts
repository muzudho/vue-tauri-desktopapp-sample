/**
 * ユークリッド剰余
 * 
 * NOTE: 負の剰余は数学の定義では［ユークリッド剰余］と、［トランケート剰余］の２種類あって、プログラム言語ごとにどっちを使ってるか違うから注意。
 * TypeScript では［トランケート剰余］なので、［ユークリッド剰余］を使いたいときはこれを使う。
 */
export function euclideanMod(a: number, b: number): number {
    return ((a % b) + b) % b;
}


/**
 * タイルは盤の領域の中で回り込んで（ラップアラウンド）しまうので、
 * 見た目上の（Fix）タイルのインデックスは動かないように変換します。
 * 
 * 👇 例えば以下のような 5x5 の盤があり、タイルにインデックスが振られているとき、
 * 
 *   +----------------+
 *   |  0  1  2  3  4 |
 *   |  5  6  7  8  9 |
 *   | 10 11 12 13 14 |
 *   | 15 16 17 18 19 |
 *   | 20 21 22 23 24 |
 *   +----------------+
 *
 * 👇 プレイヤーが右に移動すると、タイルは以下のようにラップアラウンド（wrap around）する。
 *
 *   +-------------+ +----+
 *   |  1  2  3  4 | |  0 |
 *   |  6  7  8  9 | |  5 |
 *   | 11 12 13 14 | | 10 |
 *   | 16 17 18 19 | | 15 |
 *   | 21 22 23 24 | | 20 |
 *   +-------------+ +----+
 *
 * 👇 同様に、同時に下方向に移動（右下への移動）であった場合、以下のようになるから、
 *
 *   +-------------+ +----+
 *   |  6  7  8  9 | |  5 |
 *   | 11 12 13 14 | | 10 |
 *   | 16 17 18 19 | | 15 |
 *   | 21 22 23 24 | | 20 |
 *   +-------------+ +----+
 *   +-------------+ +----+
 *   |  1  2  3  4 | |  0 |
 *   +-------------+ +----+
 *
 * 👇 元のテーブルに比べて、インデックスがずれてしまう。
 *
 *   +----------------+
 *   |  6  7  8  9  5 |
 *   | 11 12 13 14 10 |
 *   | 16 17 18 19 15 |
 *   | 21 22 23 24 20 |
 *   |  1  2  3  4  0 |
 *   +----------------+
 *
 * 👇 しかし、移動量から、元のインデックスに紐づけよう、というものだ。
 * 
 *   6→ 0   7→ 1   8→ 2   9→ 3  10→ 4
 *  11→ 5  12→ 6  13→ 7  14→ 8  15→ 9
 *  16→10  17→11  18→12  19→13  15→14
 *  21→15  22→16  23→17  24→18  20→19
 *   1→20   2→21   3→22   4→23   0→24
 */
export function getFixIndexByTileIndex(
    tileIndex: number,
    boardFileNum: number,
    boardRankNum: number,
    printing1FileDelta: number,
    printing1RankDelta: number
) : number {
    //
    // 例えば、盤がヨコ、タテ 5×5 のとき、
    const bw = boardFileNum;    // 幅 (例: 5)
    const bh = boardRankNum;    // 高さ (例: 5)
    //
    // タイルのインデックスは下図のように振られるようにしたい。
    // +----------------+
    // |  0  1  2  3  4 |
    // |  5  6  7  8  9 |
    // | 10 11 12 13 14 |
    // | 15 16 17 18 19 |
    // | 20 21 22 23 24 |
    // +----------------+
    //
    // とりあえず、上下左右について、移動量は以下の変数に格納しているとする。
    const rotH = printing1FileDelta; // 水平シフト（単位：マス）
    const rotV = printing1RankDelta; // 垂直シフト

    // 移動量を、逆方向に使うことで、巻き戻したときの列、行位置を割り出します。
    // 補正された列
    const tileFile = tileIndex % bw;
    const previousTileFile = tileFile - rotH;
    const fixTileFile = euclideanMod(previousTileFile, bw);

    // 補正された行
    const tileRank = Math.floor(tileIndex / bw);
    const previousTileRank = tileRank - rotV;
    const fixTileRank = euclideanMod(previousTileRank, bh);

    // 列と行を、インデックスに変換します。
    const fixTileIndex = fixTileRank * bw + fixTileFile;
    return fixTileIndex;
}
