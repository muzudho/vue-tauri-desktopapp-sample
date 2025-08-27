<!--
    視界の外
-->

<template>
    <div
        class="out-of-sight"
        :style="outOfSight1Style">
    </div>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    // ++++++++++++++
    // + 互換性対応 +
    // ++++++++++++++

    import type { CompatibleStyleValue }  from '../compatibles/compatible-style-value';


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　盤 +
    // ++++++++++++++++++++++++

    const board1SquareWidth = 32;
    const board1SquareHeight = 32;
    const board1FileNum = ref<number>(5);   // 筋の数。ただし、右側と下側に１マス余分に付いているマスクは含まない。
    const board1RankNum = ref<number>(5);   // 段の数

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　視界の外１ +
    // ++++++++++++++++++++++++++++++++

    const outOfSight1WithMaskSizeSquare = ref<number>(1);    // マスクの幅（単位：マス）
    const outOfSight1WithMaskBottomRightMargin: number = 1;  // マスクは右下に１マス分多く作ります。
    const outOfSight1WithMaskFileNum = computed<number>(()=>{
        return board1FileNum.value + outOfSight1WithMaskBottomRightMargin;
    });
    const outOfSight1WithMaskRankNum = computed<number>(()=>{
        return board1RankNum.value + outOfSight1WithMaskBottomRightMargin;
    });
    const outOfSight1Style = computed<CompatibleStyleValue>(()=>{
        return {
            width: `${outOfSight1WithMaskFileNum.value * board1SquareWidth}px`,
            height: `${outOfSight1WithMaskRankNum.value * board1SquareHeight}px`,
            borderTop: `solid ${outOfSight1WithMaskSizeSquare.value * board1SquareHeight}px rgba(0,0,0,0.5)`,
            borderRight: `solid ${(outOfSight1WithMaskSizeSquare.value + outOfSight1WithMaskBottomRightMargin) * board1SquareWidth}px rgba(0,0,0,0.5)`,
            borderBottom: `solid ${(outOfSight1WithMaskSizeSquare.value + outOfSight1WithMaskBottomRightMargin) * board1SquareHeight}px rgba(0,0,0,0.5)`,
            borderLeft: `solid ${outOfSight1WithMaskSizeSquare.value * board1SquareWidth}px rgba(0,0,0,0.5)`,
        };
    });


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        outOfSight1WithMaskSizeSquare,
        outOfSight1WithMaskBottomRightMargin,
    });

</script>

<style scoped>
    div.out-of-sight {  /* 視界の外１ */
        position: absolute;
        image-rendering: pixelated;
    }
</style>
