<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    import {
        // マス類：
        SQ_OUT_OF_BOARD,

        // 色類：
        oppositeColor, Color, COLOR_EMPTY,
    } from '@/pages/minigames/reversi/spec.ts';


    // ################
    // # オブジェクト #
    // ################

    const stonesColor = ref<Color[]>(new Array(0)); // 石の色
    const stoneCounts = ref<number[]>([0, 0, 0]);   // 盤上のプレイヤーの石の数。[0] 番目は未使用


    // ################
    // # サブルーチン #
    // ################

    /**
     * ［跨いだ相手番の石］をひっくり返す
     * @param thisTurn ［手番］
     * @param sandwichedStones ［挟んだ石］。相手番の石
     */
    function reverseStones(
        thisTurn: Color,
        sandwichedStones: number[],
    ) : void {
        // 石の数を更新
        stoneCounts.value[thisTurn] += sandwichedStones.length;
        stoneCounts.value[oppositeColor(thisTurn)] -= sandwichedStones.length;

        // ［跨いだ相手番の石］をひっくり返す
        for (const targetStoneSq of sandwichedStones) {
            stonesColor.value[targetStoneSq] = thisTurn;
        }
    }


    /**
     * ［相手番石］を跨ぎます。［盤外］、［空マス］、［手番石］は跨げません。
     * @returns ［跨いだ石］のあるマス番号
     */
    function locateOppositeTurnStonesOverSteppedOneWay(
        thisTurn: Color,
        startSq: number,
        nextOf: (sq: number) => number,
    ) : number[] {
        const oppositeTurnStonesOverStepped : number[] = [];  // ［跨いだ相手番の石］
        //console.log(`DEBUG: [locateOppositeTurnStonesOverSteppedOneWay] nextOf=${nextOf}`);
        let nextSq = nextOf(startSq);   // 隣のマス番号
        while (true) {  // 一次ループ
            if (nextSq == SQ_OUT_OF_BOARD) {    // 盤外に突き当たったら、［跨いだ相手番の石］リストを空にして一次ループを抜ける
                oppositeTurnStonesOverStepped.length = 0;
                break;
            }

            const nextColor: Color = stonesColor.value[nextSq];  // 隣の石の色
            //console.log(`nextSq=${nextSq} nextColor=${nextColor} opponentColor1=${opponentColor1}`);

            if (nextColor == COLOR_EMPTY) { // 空マスに突き当たったら、［跨いだ相手番の石］リストを空にして一次ループを抜ける
                oppositeTurnStonesOverStepped.length = 0;
                break;
            }

            if (nextColor == thisTurn) {    // 手番の石に当たったら、一次ループを抜ける
                // canGoTOSecondaryLoop = true;
                break;
            }

            oppositeTurnStonesOverStepped.push(nextSq);    // 跨いだ相手番の石はマス番号を記録
            nextSq = nextOf(nextSq);
        }

        return oppositeTurnStonesOverStepped;
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        stonesColor,
        stoneCounts,
        reverseStones,
        locateOppositeTurnStonesOverSteppedOneWay,
    });

</script>
