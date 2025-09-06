<template>
    <tile
        v-for="i in props.board1Area"
        :key="i"
        class="square"
        :style="getSquareStyleFromTileIndex(i - 1)"
        :srcLeft="printing99Ref?.getSourceTileLeftFromPrintingIndex(
            1
        ) ?? 0"
        :srcTop="0"
        :srcWidth="props.board1SquareWidth"
        :srcHeight="props.board1SquareHeight"
        tilemapUrl="/img/making/tilemap-floor-20250826.png"
    >

    <!--
        :srcLeft="32"
        :srcLeft="printing99Ref?.getSourceTileLeftFromPrintingIndex(
            1
        )"

    <tile
        v-for="i in props.board1Area"
        :key="i"
        class="square"
        :style="getSquareStyleFromTileIndex(i - 1)"
        :srcLeft="printing99Ref?.getSourceTileLeftFromPrintingIndex(
            getPrintingIndexFromFixedSquareIndex(
                getFixedSquareIndexFromTileIndex(
                    i - 1,
                    props.board1SquareWidth,
                    props.board1SquareHeight,
                    props.board1FileNum,
                    props.board1RankNum,
                    props.printing1Left,
                    props.printing1Top,
                ),
                -Math.floor(props.printing1Left / props.board1SquareWidth),
                -Math.floor(props.printing1Top / props.board1SquareHeight),
                props.board1FileNum,
                props.printing1FileNum,
                props.printing1RankNum,
                props.printing1IsLooping,
            )
        ) ?? 0"
        :srcTop="0"
        :srcWidth="props.board1SquareWidth"
        :srcHeight="props.board1SquareHeight"
        tilemapUrl="/img/making/tilemap-floor-20250826.png"
    >
    -->

        <!--
        <span class="board-slidable-tile-index">tile[{{ (i - 1) }}]</span>
        <span class="board-fixed-square-index">fix[{{
            getFixedSquareIndexFromTileIndex(
                i - 1,
                board1SquareWidth,
                board1SquareHeight,
                board1FileNum,
                board1RankNum,
                printing1Left,
                printing1Top,
            )
        }}]</span>
        <span class="board-printing-index">print[{{
            getPrintingIndexFromFixedSquareIndex(
                getFixedSquareIndexFromTileIndex(
                    i - 1,
                    board1SquareWidth,
                    board1SquareHeight,
                    board1FileNum,
                    board1RankNum,
                    printing1Left,
                    printing1Top,
                ),
                -Math.floor(printing1Left / board1SquareWidth),
                -Math.floor(printing1Top / board1SquareHeight),
                board1FileNum,
                printing1FileNum,
                printing1RankNum,
                printing1IsLooping,
            )
        }}]</span>
        <span class="board-square-printing-string">{{
            printing99Ref?.getPrintingStringFromPrintingIndex(
                getPrintingIndexFromFixedSquareIndex(
                    getFixedSquareIndexFromTileIndex(
                        i - 1,
                        board1SquareWidth,
                        board1SquareHeight,
                        board1FileNum,
                        board1RankNum,
                        printing1Left,
                        printing1Top,
                    ),
                    -Math.floor(printing1Left / board1SquareWidth),
                    -Math.floor(printing1Top / board1SquareHeight),
                    board1FileNum,
                    printing1FileNum,
                    printing1RankNum,
                    printing1IsLooping,
                )
            ) ?? 0
        }}</span>
        -->

    </tile>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    
    import { ref } from 'vue';
    import type { Ref } from 'vue';

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    import type { CompatibleStyleValue }  from '../compatibles/compatible-style-value';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    //import { getFixedSquareIndexFromTileIndex, getPrintingIndexFromFixedSquareIndex } from '../composables/board-operation';
    // getFileAndRankFromIndex, wrapAround

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //
    import PrintingMaking from '@/components/PrintingMaking.vue';
    import Tile from '@/components/Tile.vue';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        board1Area: number; // 盤のマス数
        board1SquareWidth: number;
        board1SquareHeight: number;
        board1FileNum: number;
        board1RankNum: number;
        printing1Left: number;
        printing1Top: number;
        printing1FileNum: number;
        printing1RankNum: number;
        printing1IsLooping: boolean;
        getSquareStyleFromTileIndex: (tileIndex: number)=>CompatibleStyleValue;
        printing99Ref: Ref<InstanceType<typeof PrintingMaking> | null>;
    }
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

    const printing99Ref = ref<InstanceType<typeof PrintingMaking> | null>(null);

</script>

<style lang="css" scoped>
    div.square {    /* マス */
        position: absolute;
        image-rendering: pixelated;
    }
</style>
