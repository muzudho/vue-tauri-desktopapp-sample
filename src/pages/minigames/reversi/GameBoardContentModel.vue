<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, ref } from 'vue';
    import { Color } from '@/pages/minigames/reversi/spec.ts';


    // ################
    // # オブジェクト #
    // ################

    const stonesColor = ref<Color[]>(new Array(0));   // 空っぽ


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        stonesColor,
    });

</script>
