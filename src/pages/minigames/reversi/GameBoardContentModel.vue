<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    import {
        // 色類：
        oppositeColor, Color,
    } from '@/pages/minigames/reversi/spec.ts';
    import { makeGetColor } from './game-board-content-util.ts';


    // ################
    // # オブジェクト #
    // ################

    const stonesColor = ref<Color[]>(new Array(0)); // 石の色
    const stoneCounts = ref<number[]>([0, 0, 0]);   // 盤上のプレイヤーの石の数。[0] 番目は未使用


    // ################
    // # サブルーチン #
    // ################

    const getColor = makeGetColor(stonesColor.value);

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


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        getColor,
        stonesColor,
        stoneCounts,
        reverseStones,
    });

</script>
