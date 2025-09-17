<!--
    RPGのキャラクターの歩行グラフィック・サンプル。背景画像付き
-->

<template>

    <!-- ゲームマシン -->         
    <game-machine-waratch2
        :hardLocationStyle="{
            left: '100px',
            top: '100px',
        }"
        :screenWidth="3 * 64"
        :screenHeight="3 * 64"
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

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // アルファベット順
    import GameMachineWaratch2 from '@/components/GameMachineWaratch2.vue';


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
