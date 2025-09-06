<template>
    <tile
        v-for="i in props.board1Area"
        :key="i"
        class="square"
        :style="getSquareStyleFromTileIndex(i - 1)"
        :srcLeft="getSourceTileLeftByImageBoardSq(
            1
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
        getSquareStyleFromTileIndex: (tileIndex: number)=>CompatibleStyleValue;
        getSourceTileLeftByImageBoardSq: (sq: number) => number;
    }
    const props = defineProps<Props>();

</script>

<style lang="css" scoped>
    div.square {    /* マス */
        position: absolute;
        image-rendering: pixelated;
    }
</style>
