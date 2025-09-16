<!--
    RPGのキャラクターの歩行グラフィック・サンプル。背景画像付き
-->

<template>

    <!-- 機能 -->
    <button-20250822 ref="button1Ref"/>

    <compatible-device ref="compatibleDevice1Ref"/>

    <!-- ゲームマシン -->         
    <game-machine-waratch2
        :hardPositionStyle="{
            left: '100px',
            top: '100px',
        }"
        v-on:onLeftButtonPressed="onLeftButtonPressed"
        v-on:onLeftButtonReleased="onLeftButtonReleased"
        v-on:onUpButtonPressed="onUpButtonPressed"
        v-on:onUpButtonReleased="onUpButtonReleased"
        v-on:onRightButtonPressed="onRightButtonPressed"
        v-on:onRightButtonReleased="onRightButtonReleased"
        v-on:onDownButtonPressed="onDownButtonPressed"
        v-on:onDownButtonReleased="onDownButtonReleased"
        v-on:onSpaceButtonPressed="onSpaceButtonPressed"
        v-on:onSpaceButtonReleased="onSpaceButtonReleased"
    />

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // アルファベット順
    import Button20250822 from '@/components/Button20250822.vue';
    import CompatibleDevice from '@/components/CompatibleDevice.vue'
    import GameMachineWaratch2 from '@/components/GameMachineWaratch2.vue';

    // +++++++++++++++++++++++++++++++++++
    // + インポート ＞　インターフェース +
    // +++++++++++++++++++++++++++++++++++

    import type Rectangle from '../../../../interfaces/Rectangle';


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　装置の互換性 +
    // ++++++++++++++++++++++++++++++++++

    const compatibleDevice1Ref = ref<InstanceType<typeof CompatibleDevice> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン拡張 +
    // ++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　タイル盤１ +
    // ++++++++++++++++++++++++++++++++

    const tileBoard1TileWidth = 32;
    const tileBoard1TileHeight = 32;
    const board1FileNum = ref<number>(5);   // 筋の数。ただし、右側と下側に１マス余分に付いているマスクは含まない。
    // ※　盤およびその各タイルは、決まりきった位置でラップアラウンドを繰り返すだけです。座標が大きく移動することはありません。
    const board1FloorTilemapTileNum = 5;  // 床のタイルマップの、左上隅から数えたタイル数

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　像盤１ +
    // ++++++++++++++++++++++++**++
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    const printing1OutOfSightIsLock = ref<boolean>(false);   // ［画面外隠し］を管理（true: ロックする, false: ロックしない）
    watch(printing1OutOfSightIsLock, (newValue: boolean)=>{
        player1CanBoardEdgeWalkingIsEnabled.value = newValue;
    });
    const printing1FileMax = 10;    // 印字の最大サイズは、盤のサイズより大きいです。
    const printing1RankMax = 10;
    const printing1AreaMax = printing1FileMax * printing1RankMax;
    const imageBoard1Data = ref<number[]>([]);   // ソース・タイルのインデックスが入っている盤
    // ランダムなマップデータを生成
    for (let i=0; i<printing1AreaMax; i++) {    // 最初から最大サイズで用意します。
        // 左上のタイルは画面外の黒なので、それを避けて設定。
        const sourceTileIndex = Math.floor(Math.random() * (board1FloorTilemapTileNum - 1)) + 1;
        imageBoard1Data.value.push(sourceTileIndex);
    }
    const sourceTilemapRectangles : Rectangle[] = [];
    for (let i = 0; i < printing1AreaMax; i++) {   // 最大サイズで作っておく。
        const files = i % board1FileNum.value;
        const ranks = Math.floor(i / board1FileNum.value);
        sourceTilemapRectangles.push({ top: ranks * tileBoard1TileHeight, left: files * tileBoard1TileWidth, width: tileBoard1TileWidth, height: tileBoard1TileHeight });
    }

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++

    // アニメーションのことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const player1CanBoardEdgeWalkingIsEnabled = ref<boolean>(false);    // ［盤の端の歩行］可能状態の活性性を管理（true: 不活性にする, false: 活性にする）


    // ################
    // # サブルーチン #
    // ################

    /**
     * 左。
     */
    function onLeftButtonPressed() : void {
    }


    function onLeftButtonReleased() : void {
    }


    /**
     * 上。
     */
    function onUpButtonPressed() : void {
    }


    function onUpButtonReleased() : void {
    }


    /**
     * 右。
     */
    function onRightButtonPressed() : void {
    }


    function onRightButtonReleased() : void {
    }


    /**
     * 下。
     */
    function onDownButtonPressed() : void {
    }


    function onDownButtonReleased() : void {
    }


    /**
     * スペース・キー。
     */
    function onSpaceButtonPressed() : void {
    }


    function onSpaceButtonReleased() : void {
    }

</script>

<style scoped>
    @import '@/styles/talk-scene.css';
    @import '@/styles/perspective.css';
    @import '@/styles/game-machine-waratch2.css';
</style>
