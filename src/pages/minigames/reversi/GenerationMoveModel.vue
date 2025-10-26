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
        COLOR_EMPTY,

        // 方向
        DIRECTION_SIZE,
    } from '@/pages/minigames/reversi/spec';

    
    // ################
    // # オブジェクト #
    // ################

    // FIXME: 値を Color 型にすべきでは。 `[Direction][Color][Square] = boolean` ではなく、 `[Direction][Square] = Color` で十分
    const gameBoard1ValidNextColor = ref<Color[][]>(
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
            gameBoard1ValidNextColor.value[direction] = new Array<Color>(gameBoard1Area).fill(COLOR_EMPTY);
        }
    }


    /**
     * どこかの方向に石が置けるかどうか
     * @param activeDirections 
     * @param thisTurn 
     * @param sq 
     * @returns 
     */
    function canMoveAnyDirection(
        activeDirections: Direction[],
        thisTurn: Color,
        sq: number
    ) : boolean {
        for (const direction of activeDirections) {
            if (getValidNextColor(direction, sq) == thisTurn) {
                return true;
            }
        }

        return false;
    }


    /**
     * 次に置ける石
     * 
     * @param directions 
     * @param sq 
     * @returns 
     */
    function getValidNextColor(
        direction: Direction,
        sq: number
    ) : Color {
        return gameBoard1ValidNextColor.value[direction][sq];
    }


    /**
     * 次に置ける石を設定
     * 
     * @param directions 
     * @param sq 
     * @param color
     */
    function setValidNextColor(
        direction: Direction,
        sq: number,
        color: Color,
    ) : void {
        gameBoard1ValidNextColor.value[direction][sq] = color;
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        generationMoveModelInit,

        canMoveAnyDirection,
        getValidNextColor,
        setValidNextColor,
    });

</script>
