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
        COLOR_EMPTY, COLOR_BLACK, COLOR_WHITE, COLOR_SIZE,

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
    // // FIXME: 値を Color 型にすべきでは。 `[Direction][Color][Square] = boolean` ではなく、 `[Direction][Square] = Color` で十分
    // const gameBoard1ValidNextColor = ref<Color[][]>(
    //     new Array(DIRECTION_SIZE)
    // );


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

            // gameBoard1ValidNextColor.value[direction] = new Array<Color>(gameBoard1Area).fill(COLOR_EMPTY);
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
            if (getCanMoveColorByDirection(direction, sq) == thisTurn) {
                return true;
            }
        }

        return false;
    }

    /**
     * 置ける石の色
     * @param activeDirections 
     * @param thisTurn 
     * @param sq 
     * @returns 
     */
    function getCanMoveColorByDirection(
        direction: Direction,
        sq: number
    ) : Color {
        if (gameBoard1CanMove.value[direction][COLOR_BLACK][sq]) {
            return COLOR_BLACK;
        }

        if (gameBoard1CanMove.value[direction][COLOR_WHITE][sq]) {
            return COLOR_WHITE;
        }

        return COLOR_EMPTY;
    }


    /**
     * ［ストーンズ・キャップ］に石を置けるかどうか判定し、更新します
     * 
     * @param generationMoveModel1Ref 
     * @param direction 
     * @param colorList ［連続する石］について、その色の並び順リスト
     * @param stonesCapSq 
     */
    function generationMoveStoneCapCanMoveUpdate(
        direction: Direction,
        stonesCapSq: number,
        validNextColor: Color,
    ) : void {
        if (validNextColor == COLOR_BLACK) {
            gameBoard1CanMove.value[direction][COLOR_BLACK][stonesCapSq] = true;
            gameBoard1CanMove.value[direction][COLOR_WHITE][stonesCapSq] = false;
            return;
        }

        if (validNextColor == COLOR_WHITE) {
            gameBoard1CanMove.value[direction][COLOR_BLACK][stonesCapSq] = false;
            gameBoard1CanMove.value[direction][COLOR_WHITE][stonesCapSq] = true;
            return;
        }

        gameBoard1CanMove.value[direction][COLOR_BLACK][stonesCapSq] = false;
        gameBoard1CanMove.value[direction][COLOR_WHITE][stonesCapSq] = false;
    }


    // /**
    //  * 次に置ける石
    //  * 
    //  * @param directions 
    //  * @param sq 
    //  * @returns 
    //  */
    // function getValidNextColor(
    //     direction: Direction,
    //     sq: number
    // ) : Color {
    //     return gameBoard1ValidNextColor.value[direction][sq];
    // }


    // /**
    //  * 次に置ける石を設定
    //  * 
    //  * @param directions 
    //  * @param sq 
    //  * @param color
    //  */
    // function setValidNextColor(
    //     direction: Direction,
    //     sq: number,
    //     color: Color,
    // ) : void {
    //     gameBoard1ValidNextColor.value[direction][sq] == color;
    // }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        generationMoveModelInit,

        canMoveAnyDirection,
        getCanMoveColorByDirection,
        gameBoard1CanMove,
        generationMoveStoneCapCanMoveUpdate,

        // getValidNextColor,
        // setValidNextColor,
    });

</script>
