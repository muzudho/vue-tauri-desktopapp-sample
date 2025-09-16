<template>
    <div
        :style="props.hardStyle"
        style="
            position: fixed;
            width: calc(5 * 64px);
            height: calc(7 * 64px);
            background-color: crimson;
        "
    >
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

</script>
