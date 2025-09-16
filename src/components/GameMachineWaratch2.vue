<template>
    <!-- ハード。ただし画面内は切り抜き -->
    <div
        :style="props.hardStyle"
        style="
            position: fixed;
            width: calc(5 * 64px);
            height: calc(7 * 64px);
            background-color: crimson;
        "
    >
        <!-- ハード名 -->
        <div
            class="waratch2-hard-name"
            style="
                left: calc(1 * 64px - 1px); /* ボーダー幅を引いている */
                top: calc(4.5 * 64px - 32px - 1px);
                width: calc(3 * 64px);
            "
        >Waratch2</div>

        <!-- ボタン配置 -->
        <div
            class="waratch2-buttons-area"
            :style="{
                top: `${5 * 64 - 32}px`,
                width: `${15 * controllerSquareUnit}px`,
                height: `${3 * controllerSquareUnit}px`,
            }"
        >
            <slot name="buttons-area"></slot>
        </div>

        <slot></slot>
    </div>
    🌟ゲームマシン・ワラッチ２
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    import type { CompatibleStyleValue }  from '../compatibles/compatible-style-value';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        hardStyle: CompatibleStyleValue;
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    

    const controllerSquareUnit: number = 40;

</script>

<style scoped>

    @import '@/styles/game-machine-waratch2.css';

</style>
