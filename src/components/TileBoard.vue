<template>
    <tile
        v-for="tileSqPlus1 in props.board1Area"
        :key="tileSqPlus1"
        class="square"
        :style="getSquareStyleFromTileSq(tileSqPlus1 - 1)"
        :srcLeft="getSourceTileLeftByImageSq(
            getImageSqByFixedTileSq(
                getFixedTileSqFromTileSq(
                    tileSqPlus1 - 1,
                    board1SquareWidth,
                    board1SquareHeight,
                    board1FileNum,
                    board1RankNum,
                    printing1Left,
                    printing1Top,
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

    </tile>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    
    import type { ComputedRef } from 'vue';

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    import type { CompatibleStyleValue }  from '../compatibles/compatible-style-value';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //
    import Tile from '@/components/Tile.vue';

    // ++++++++++++++++++++++++++++++++++++
    // + インポート　＞　インターフェース +
    // ++++++++++++++++++++++++++++++++++++

    import type Rectangle from '../interfaces/Rectangle';


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
        computedImageBoard1Data: ComputedRef<number[]>;
        sourceTilemapRectangles: Rectangle[];
        getFixedTileSqFromTileSq: (
            tileSq: number,
            board1SquareWidth: number,
            board1SquareHeight: number,
            board1FileNum: number,
            board1RankNum: number,
            printing1Left: number,
            printing1Top: number,            
        )=>number;
        getImageSqByFixedTileSq: (
            fixedSquareIndex: number,
            offsetPrintingFile: number,
            offsetPrintingRank: number,
            boardFileNum: number,
            printing1FileNum: number,
            printing1RankNum: number,
            printing1IsLooping: boolean
        ) => number;
        getSquareStyleFromTileSq: (tileIndex: number)=>CompatibleStyleValue;
        getSourceTileLeftByImageSq: (sq: number) => number;
    }
    const props = defineProps<Props>();

</script>

<style lang="css" scoped>
    div.square {    /* マス */
        position: absolute;
        image-rendering: pixelated;
    }
</style>
