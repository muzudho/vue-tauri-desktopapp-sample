<!--
    像
-->

<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++

    import type Rectangle from '../interfaces/Rectangle';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {

        // ++++++++++++++++++++++++++++
        // + オブジェクト　＞　印字１ +
        // ++++++++++++++++++++++++++++

        sourceTilemapRectangles: Rectangle[],
        imageBoard1Data: number[],

    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++
    // + オブジェクト　＞　印字 +
    // ++++++++++++++++++++++++++
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    /**
     * マスの印字。ソース・タイルマップのタイルのインデックス x の文字列。
     * @returns 該当なしのとき "-"
     */
    const getSourceTileSqStringByImageBoardSq = computed<
        (printingIndex: number) => string
    >(() => {
        return (printingIndex: number) => {

            if (printingIndex == -1) {
                return "-"; // 印字のサイズの範囲外になるところには、"-" でも表示しておく
            }

            const sourceTileIndex = props.imageBoard1Data[printingIndex];
            return `${sourceTileIndex}`;
        };
    });


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        getSourceTileSqStringByImageBoardSq: getSourceTileSqStringByImageBoardSq,
    });

</script>

<style scoped>
</style>
