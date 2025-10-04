<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    import {
        // 色
        COLOR_BLACK, COLOR_WHITE, COLOR_SIZE, COLOR_EMPTY, colorToCode, oppositeColor,

        // マス
        SQ_OUT_OF_BOARD, makeCodeToSq,

        // 路
        WAY_WEST, WAY_EAST, WAY_NORTH, WAY_SOUTH, WAY_SOUTHWEST, WAT_NORTHEAST, WAY_NORTHWEST, WAY_SOUTHEAST, Way,

        // 方向
        DIRECTION_HORIZONTAL, DIRECTION_VERTICAL, DIRECTION_BAROQUE_DIAGONAL, DIRECTION_SINISTER_DIAGONAL, DIRECTION_SIZE, DIRECTION_TITLES,
    } from '@/pages/minigames/reversi/spec.ts';

    import type {
        // 色
        Color,

        // 方向
        Direction,
    } from '@/pages/minigames/reversi/spec.ts';

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


    function makeSqToCode(
        fileNum: number,
        fileNameArray: string[],
    ) :
        (sq: number)=>string
    {
        return (sq: number) => {
            const file = sq % fileNum;
            const rank = Math.floor(sq / fileNum);
            const code = `${fileNameArray[file]}${rank+1}`;
            //console.log(`DEBUG: [sqToCode] sq=${sq} gameBoard1FileNum.value=${gameBoard1FileNum.value} file=${file} rank=${rank} gameBoard1RankNum.value=${gameBoard1RankNum.value} code=${code}`);
            return code;
        };
    }

    // /**
    //  * sq を符号に変換
    //  * @param sq 
    //  */
    // function sqToCode(sq: number) : string {
    //     const file = sq % gameBoard1FileNum.value;
    //     const rank = Math.floor(sq / gameBoard1FileNum.value);
    //     const code = `${gameBoard1FileNameArray[file]}${rank+1}`;
    //     //console.log(`DEBUG: [sqToCode] sq=${sq} gameBoard1FileNum.value=${gameBoard1FileNum.value} file=${file} rank=${rank} gameBoard1RankNum.value=${gameBoard1RankNum.value} code=${code}`);
    //     return code;
    // }


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


    function makeGenerationMoves(
        activeDirections: Direction[],
        activeSecondDirections: Direction[],
        thisTurn: Color,
        moveSq: number,
        fileNum: number,
        fileNameArray: string[],
        gameBoard1StoneColorArray: Color[],
        allDirectionsForeOf: ((sq: number) => number)[],
        allDirectionsBackOf: ((sq: number) => number)[],
    ) : void {

        const oppositeTurnColor1 = oppositeColor(thisTurn);
        const sqToCode = makeSqToCode(fileNum, fileNameArray);

        let allDirectionsOverSteppingStones: number[][] = new Array<number[]>(DIRECTION_SIZE);
        for (const direction of activeDirections) {
            allDirectionsOverSteppingStones[direction] = new Array<number>();

            gameBoard1CanMove.value[direction][thisTurn][moveSq] = false;    // 着手点に石は置けなくなる。

            // ステップ１：
            const [
                foresideOverSteppingStones,
                foresideFirstCapSq,
                foresideFirstCapColor,
                backsideOverSteppingStones,
                backsideFirstCapSq,
                backsideFirstCapColor,
            ] = movedStoneGenerateMoveOnDirection(moveSq, direction, gameBoard1StoneColorArray, thisTurn, allDirectionsForeOf, allDirectionsBackOf); // 指し手生成
            console.log(`DEBUG: [putStone] ${sqToCode(moveSq)}へ石を置いた。`)
            allDirectionsOverSteppingStones[direction].push(
                ...foresideOverSteppingStones,
                ...backsideOverSteppingStones,
            );

            console.log(`DEBUG: [putStone]     前方第１キャップは ${sqToCode(foresideFirstCapSq)} ${colorToCode(foresideFirstCapColor)}。 挟める石：${foresideOverSteppingStones.map((x)=>sqToCode(x))}`)
            if (foresideFirstCapSq != SQ_OUT_OF_BOARD && foresideFirstCapColor == COLOR_EMPTY) {
                const canMove1 = 0 < foresideOverSteppingStones.length;
                gameBoard1CanMove.value[direction][thisTurn][foresideFirstCapSq] = canMove1;   // 前方第１キャップに石を置けるか？
                console.log(`DEBUG: [putStone]         前方第１キャップに石 ${canMove1 ? 'を置ける' : 'は置けない'}`)
            }

            console.log(`DEBUG: [putStone]     後方第１キャップは ${sqToCode(backsideFirstCapSq)} ${colorToCode(backsideFirstCapColor)}。 挟める石：${backsideOverSteppingStones.map((x)=>sqToCode(x))}`)
            if (backsideFirstCapSq != SQ_OUT_OF_BOARD && backsideFirstCapColor == COLOR_EMPTY) {
                const canMove1 = 0 < backsideOverSteppingStones.length;
                gameBoard1CanMove.value[direction][thisTurn][backsideFirstCapSq] = canMove1;   // 後方第１キャップに石を置けるか？
                console.log(`DEBUG: [putStone]         後方第１キャップに石 ${canMove1 ? 'を置ける' : 'は置けない'}`)
            }

            //console.log(`DEBUG: [putStone(2)] allDirectionsStonesTargetedNew[direction].length=${allDirectionsStonesTargetedNew[direction].length}`)
            // allDirectionsStonesTargetedOLD.length=${allDirectionsStonesTargetedOLD.length}

            //
            // ++++++++++++++++++++++++++++++++++++++++++
            // + ［ひっくり返せる石］をひっくり返します +
            // ++++++++++++++++++++++++++++++++++++++++++
            //
            // console.log(`DEBUG: [putStone] ひっくり返せる石をひっくり返します： ${allDirectionsStonesTargeted.map((sq)=>sqToCode(sq))}`)
            // for (const stoneTargetedSq of allDirectionsStonesTargeted) {
            //     gameBoard1StoneColorArray.value[stoneTargetedSq] = thisTurn;
            // }


            // ステップ２：　ひっくり返される各［相手番石］について：
            for (const stoneTargetedSq of allDirectionsOverSteppingStones[direction]) {
                console.log(`DEBUG: [putStone] 対象石 ${sqToCode(stoneTargetedSq)} をひっくり返せる。`)

                // ４方向調べたい
                for (const secondDirection of activeSecondDirections) {
                    const [
                        foresideStonesTargeted,
                        foresideSecondCapSq,
                        foresideSecondCapColor,
                        backsideStonesTargeted,
                        backsideSecondCapSq,
                        backsideSecondCapColor,
                    ] = stoneTargetedGenerateMoveOnDirection(stoneTargetedSq, secondDirection, thisTurn, gameBoard1StoneColorArray, allDirectionsForeOf, allDirectionsBackOf);


                    // ［手番］
                    // NOTE: この関数を実行する前に、石はひっくりかえしておくこと。
                    function executeThisTurnSide(
                        secondCapSq: number,
                        secondDirection: Direction,
                    ) : void {
                        const [
                            secondCapForesideStonesTargeted,
                            secondCapForesideSecondCapSq,
                            secondCapForesideSecondCapColor,
                            secondCapBacksideStonesTargeted,
                            secondCapBacksideSecondCapSq,
                            secondCapBacksideSecondCapColor,
                        ] = thisTurnSecondCapGenerateMoveOnDirection(secondCapSq, secondDirection, thisTurn, gameBoard1StoneColorArray, allDirectionsForeOf, allDirectionsBackOf);

                        if (secondCapForesideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 =
                                    secondCapForesideSecondCapColor == COLOR_EMPTY   // 前方のキャップが空マスで
                                &&  0 < secondCapForesideStonesTargeted.length; // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                // console.log(`DEBUG: [putStone]1     secondDirection=${secondDirection}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                // console.log(`DEBUG: [putStone]1     targetTurn=${targetTurn}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                // console.log(`DEBUG: [putStone]1     secondCapForesideSecondCapSq=${secondCapForesideSecondCapSq}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]}`);
                                // console.log(`DEBUG: [putStone]1     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]     ［手番］${colorToCode(thisTurn)} 第２${DIRECTION_TITLES[secondDirection]} 前方第２キャップ=${sqToCode(secondCapForesideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][thisTurn][secondCapForesideSecondCapSq] = canMove1;
                            }
                        }

                        if (secondCapBacksideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 = 
                                    secondCapBacksideSecondCapColor == COLOR_EMPTY // 後方のキャップが空マスで
                                &&  0 < secondCapBacksideStonesTargeted.length;  // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                // console.log(`DEBUG: [putStone]2     secondDirection=${secondDirection}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                // console.log(`DEBUG: [putStone]2     targetTurn=${targetTurn}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                // console.log(`DEBUG: [putStone]2     secondCapBacksideSecondCapSq=${secondCapBacksideSecondCapSq}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]}`);
                                // console.log(`DEBUG: [putStone]2     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]     ［手番］${colorToCode(thisTurn)} 第２${DIRECTION_TITLES[secondDirection]} 後方第２キャップ=${sqToCode(secondCapBacksideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][thisTurn][secondCapBacksideSecondCapSq] = canMove1;
                            }
                        }
                    }


                    // ［相手番］
                    // NOTE: この関数を実行する前に、石はひっくりかえしておくこと。
                    function executeOppositeTurnSide(
                        secondCapSq: number,
                        secondDirection: Direction,
                    ) : void {
                        const [
                            secondCapForesideStonesTargeted,
                            secondCapForesideSecondCapSq,
                            secondCapForesideSecondCapColor,
                            secondCapBacksideStonesTargeted,
                            secondCapBacksideSecondCapSq,
                            secondCapBacksideSecondCapColor,
                        ] = oppositeTurnSecondCapGenerateMoveOnDirection(secondCapSq, secondDirection, oppositeTurnColor1, gameBoard1StoneColorArray, allDirectionsForeOf, allDirectionsBackOf);

                        if (secondCapForesideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 =
                                    secondCapForesideSecondCapColor == COLOR_EMPTY   // 前方のキャップが空マスで
                                &&  0 < secondCapForesideStonesTargeted.length; // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                // console.log(`DEBUG: [putStone]1     secondDirection=${secondDirection}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                // console.log(`DEBUG: [putStone]1     targetTurn=${targetTurn}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                // console.log(`DEBUG: [putStone]1     secondCapForesideSecondCapSq=${secondCapForesideSecondCapSq}`);
                                // console.log(`DEBUG: [putStone]1     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapForesideSecondCapSq]}`);
                                // console.log(`DEBUG: [putStone]1     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]     ［相手番］${colorToCode(oppositeTurnColor1)} 第２${DIRECTION_TITLES[secondDirection]} 前方第２キャップ=${sqToCode(secondCapForesideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][oppositeTurnColor1][secondCapForesideSecondCapSq] = canMove1;
                            }
                        }

                        if (secondCapBacksideSecondCapSq != SQ_OUT_OF_BOARD) {
                            let canMove1 = 
                                    secondCapBacksideSecondCapColor == COLOR_EMPTY // 後方のキャップが空マスで
                                &&  0 < secondCapBacksideStonesTargeted.length;  // ひっくり返る石があるなら
                            if (secondDirection in gameBoard1CanMove.value) {
                                // console.log(`DEBUG: [putStone]2     secondDirection=${secondDirection}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection].length=${gameBoard1CanMove.value[secondDirection].length}`);
                                // console.log(`DEBUG: [putStone]2     targetTurn=${targetTurn}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn].length=${gameBoard1CanMove.value[secondDirection][targetTurn].length}`);
                                // console.log(`DEBUG: [putStone]2     secondCapBacksideSecondCapSq=${secondCapBacksideSecondCapSq}`);
                                // console.log(`DEBUG: [putStone]2     gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]=${gameBoard1CanMove.value[secondDirection][targetTurn][secondCapBacksideSecondCapSq]}`);
                                // console.log(`DEBUG: [putStone]2     canMove1=${canMove1}`);
                                console.log(`DEBUG: [putStone]     ［相手番］${colorToCode(oppositeTurnColor1)} 第２${DIRECTION_TITLES[secondDirection]} 後方第２キャップ=${sqToCode(secondCapBacksideSecondCapSq)} ${canMove1 ? 'は置ける。' : 'は置けない。'}`);
                                gameBoard1CanMove.value[secondDirection][oppositeTurnColor1][secondCapBacksideSecondCapSq] = canMove1;
                            }
                        }
                    }


                    // ステップ３：　第２キャップ判定
                    //
                    // xooo.xxo
                    //     ^
                    //     xもoも置けることに注意
                    console.log(`DEBUG: [putStone] 　　第２${DIRECTION_TITLES[secondDirection]} 前方第２キャップは ${sqToCode(foresideSecondCapSq)} ${colorToCode(foresideSecondCapColor)}。 挟める石：${foresideStonesTargeted.map((x)=>sqToCode(x))}`);
                    executeThisTurnSide(foresideSecondCapSq, secondDirection);    // foreside
                    executeOppositeTurnSide(foresideSecondCapSq, secondDirection);

                    console.log(`DEBUG: [putStone] 　　第２${DIRECTION_TITLES[secondDirection]} 後方第２キャップは ${sqToCode(backsideSecondCapSq)} ${colorToCode(backsideSecondCapColor)}。 挟める石：${backsideStonesTargeted.map((x)=>sqToCode(x))}`);
                    executeThisTurnSide(backsideSecondCapSq, secondDirection);    // backside
                    executeOppositeTurnSide(backsideSecondCapSq, secondDirection);
                }
            }
        }
    }




    /**
     * 石を置いたところから見て、次に石を置けるところの検出。
     * @param moveSq 
     * @param direction 
     */
    function movedStoneGenerateMoveOnDirection (
        moveSq: number,
        direction: Direction,
        gameBoard1StoneColorArray: Color[],
        thisTurn: Color,
        allDirectionsForeOf: ((sq: number) => number)[],
        allDirectionsBackOf: ((sq: number) => number)[],
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            moveSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            let overSteppingStones: number[] = [];  // ［跨いだ石］。まだ［ひっくり返せる石］かどうかは決まらない。
            let capSq: number;
            let capColor: Color;

            // ［ループ］処理
            let nextSq = nextOf(moveSq);   // 着手点の前方からスタート
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [overSteppingStones, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if ([COLOR_EMPTY, thisTurn].includes(nextColor)) { // ［空マス］,［相手番石］に突き当たったら、［前方キャップ］に［空マス］とそのマス番号を記録して［後ろ向きループ］処理へ
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                overSteppingStones.push(nextSq);
                nextSq = nextOf(nextSq);
            }

            return [overSteppingStones, capSq, capColor];
        }

        const [foresideOverSteppingStones, foresideCapSq, foresideCapColor] = executeNext(moveSq, allDirectionsForeOf[direction]);  // ［前向きループ］処理
        const [backsideOverSteppingStones, backsideCapSq, backsideCapColor] = executeNext(moveSq, allDirectionsBackOf[direction]);  // ［後ろ向きループ］処理

        return [
            foresideOverSteppingStones,
            foresideCapSq,
            foresideCapColor,
            backsideOverSteppingStones,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * これからひっくり返して手番の色になる石（［狙われた石］）から見て、次に石を置けるところの検出。
     * @param stoneTargetedSq 
     * @param direction 
     */
    function stoneTargetedGenerateMoveOnDirection (
        stoneTargetedSq: number,
        direction: Direction,
        thisTurn: Color,
        gameBoard1StoneColorArray: Color[],
        allDirectionsForeOf: ((sq: number) => number)[],
        allDirectionsBackOf: ((sq: number) => number)[],
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            stoneTargetedSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] stoneTargetedSq=${sqToCode(stoneTargetedSq)}`);
            const oppositeTurnColor1 = oppositeColor(thisTurn);
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［手番石］を読み飛ばす：
            let nextSq = nextOf(stoneTargetedSq);   // ［狙われた石］の前方からスタート
            //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if (nextColor != thisTurn) { // ［手番石］以外は終了。
                    break;
                }

                // ［手番石］に突き当たったら、続行
                nextSq = nextOf(nextSq);
                //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            }

            // ［相手番石］を跨ぐ：
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if (nextColor != oppositeTurnColor1) { // ［相手番石］以外は終了。
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
                //console.log(`DEBUG: [stoneTargetedGenerateMoveOnDirection] nextSq=${sqToCode(nextSq)}`);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStonesTargeted, foresideCapSq, foresideCapColor] = executeNext(stoneTargetedSq, allDirectionsForeOf[direction]); // ［前向きループ］処理
        const [backsideStonesTargeted, backsideCapSq, backsideCapColor] = executeNext(stoneTargetedSq, allDirectionsBackOf[direction]); // ［後ろ向きループ］処理

        return [
            foresideStonesTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStonesTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * ［手番］［第２キャップ］が、次に石を置けるところかどうかの検出。
     * @param secondCapSq 
     * @param direction 
     */
    function thisTurnSecondCapGenerateMoveOnDirection (
        secondCapSq: number,
        direction: Direction,
        targetTurn: Color,
        gameBoard1StoneColorArray: Color[],
        allDirectionsForeOf: ((sq: number) => number)[],
        allDirectionsBackOf: ((sq: number) => number)[],
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            secondCapSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            const oppositeTurnColor1 = oppositeColor(targetTurn);
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［手番石］を読み飛ばす：
            let nextSq = nextOf(secondCapSq);   // ［狙われた石］の前方からスタート
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if (nextColor != targetTurn) { // ［手番石］以外は終了。
                    break;
                }

                // ［手番石］に突き当たったら、続行
                nextSq = nextOf(nextSq);
            }

            // ［相手番石］を跨ぐ：
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if (nextColor != oppositeTurnColor1) { // ［相手番石］以外は終了。
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStoneTargeted, foresideCapSq, foresideCapColor] = executeNext(secondCapSq, allDirectionsForeOf[direction]); // ［前向きループ］処理
        const [backsideStoneTargeted, backsideCapSq, backsideCapColor] = executeNext(secondCapSq, allDirectionsBackOf[direction]); // ［後ろ向きループ］処理

        return [
            foresideStoneTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStoneTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    /**
     * ［相手番］［第２キャップ］が、次に石を置けるところかどうかの検出。
     * 
     * ........
     * ...xo...
     * ....o...
     * 
     * ........
     * ...xoX..
     * ....o...
     * 
     * ........
     * ...xxX.. TODO: ひっくり返されることで、むしろ置けるようになることも。
     * ....o...
     * 
     * ....O...
     * ...xxx..
     * ....o...
     * 
     * ....O...
     * ...xox..
     * ....o...
     * 
     * @param secondCapSq 
     * @param direction 
     */
    function oppositeTurnSecondCapGenerateMoveOnDirection (
        secondCapSq: number,
        direction: Direction,
        targetTurn: Color,
        gameBoard1StoneColorArray: Color[],
        allDirectionsForeOf: ((sq: number) => number)[],
        allDirectionsBackOf: ((sq: number) => number)[],
    ): [number[], number, Color, number[], number, Color] {

        function executeNext(
            secondCapSq: number,
            nextOf: (sq: number)=>number,
        ) : [number[], number, Color] {
            const oppositeTurnColor1 = oppositeColor(targetTurn);
            let stonesTargeted: number[] = [];
            let capSq: number;
            let capColor: Color;

            // ［相手番石］を跨ぐ：
            let nextSq = nextOf(secondCapSq);   // ［狙われた石］の前方からスタート
            while (true) {
                if (nextSq == SQ_OUT_OF_BOARD) {    // ［盤外］に突き当たったら、処理終了
                    return [stonesTargeted, SQ_OUT_OF_BOARD, COLOR_EMPTY];
                }

                const nextColor: Color = gameBoard1StoneColorArray[nextSq];  // 隣の石の色

                if (nextColor != oppositeTurnColor1) { // ［相手番石］以外は終了。
                    capSq = nextSq;
                    capColor = nextColor;
                    break;
                }

                // ［相手番石］に突き当たったら、続行
                stonesTargeted.push(nextSq);
                nextSq = nextOf(nextSq);
            }

            return [stonesTargeted, capSq, capColor];
        }

        const [foresideStoneTargeted, foresideCapSq, foresideCapColor] = executeNext(secondCapSq, allDirectionsForeOf[direction]); // ［前向きループ］処理
        const [backsideStoneTargeted, backsideCapSq, backsideCapColor] = executeNext(secondCapSq, allDirectionsBackOf[direction]); // ［後ろ向きループ］処理

        return [
            foresideStoneTargeted,
            foresideCapSq,
            foresideCapColor,
            backsideStoneTargeted,
            backsideCapSq,
            backsideCapColor,
        ];
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        canMove,
        gameBoard1CanMove,
        generationMoveModelInit,
        makeGenerationMoves,
    });

</script>
