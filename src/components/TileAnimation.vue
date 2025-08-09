<template>
    <div class="tile" :style="tileStyle"></div>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed } from 'vue';

    // ********************
    // * インターフェース *
    // ********************

    import Rectangle from '../interfaces/Rectangle';

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    interface Props {
        frames: Rectangle[];
        tilemapUrl: string; // タイルマップ画像のURL
        frameIndex: number; // 使用するフレームのインデックス
    }
    const props = defineProps<Props>();

    // ############################
    // # このコンポーネントの画面 #
    // ############################

    // ++++++++++++++++++++++++++++++++++++
    // + クライアント領域　＞　タイル画像 +
    // ++++++++++++++++++++++++++++++++++++

    const tileStyle = computed(() => ({
        width: `${props.frames[props.frameIndex].width}px`,
        height: `${props.frames[props.frameIndex].height}px`,
        backgroundImage: `url('${props.tilemapUrl}')`,
        backgroundPosition: `${-props.frames[props.frameIndex].left}px ${-props.frames[props.frameIndex].top}px`,
        backgroundRepeat: 'no-repeat',
    }));

</script>

<style scoped>
    .tile {
        display: inline-block;
    }
</style>