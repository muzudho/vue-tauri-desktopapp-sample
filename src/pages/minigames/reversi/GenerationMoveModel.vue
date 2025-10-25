<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    import type {Color, Direction} from '@/pages/minigames/reversi/spec.ts';
    import {
        // 色
        COLOR_BLACK, COLOR_WHITE, COLOR_SIZE,

        // 方向
        DIRECTION_SIZE,
    } from '@/pages/minigames/reversi/spec';

    
    // ################
    // # オブジェクト #
    // ################

    // FIXME: Direction別にする必要があるのでは？
    const gameBoard1CanMove = ref<boolean[][][]>( // [Direction][Color][Square]
        new Array(DIRECTION_SIZE)
    );


    // ################
    // # サブルーチン #
    // ################

    /**
     * 初期化
     * @param activeDirections 
     * @param gameBoard1Area 
     */
    function generationMoveModelInit(
        activeDirections: Direction[],
        gameBoard1Area: number,
    ) : void {
        for (const direction of activeDirections) {
            gameBoard1CanMove.value[direction] = new Array<boolean[]>(COLOR_SIZE);
            gameBoard1CanMove.value[direction][COLOR_BLACK] = new Array<boolean>(gameBoard1Area).fill(false);
            gameBoard1CanMove.value[direction][COLOR_WHITE] = new Array<boolean>(gameBoard1Area).fill(false);
        }
    }


    /**
     * 石が置けるかどうか
     * @param activeDirections 
     * @param thisTurn 
     * @param sq 
     * @returns 
     */
    function canMove(
        activeDirections: Direction[],
        thisTurn: Color,
        sq: number
    ) : boolean {
        for (const direction of activeDirections) {
            if (gameBoard1CanMove.value[direction][thisTurn][sq]) {
                return true;
            }
        }

        return false;
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        canMove,
        gameBoard1CanMove,
        generationMoveModelInit,
    });

</script>
