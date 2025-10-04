<template>
</template>

<script setup lang="ts">

    import { ref } from 'vue';
    import { DIRECTION_SIZE } from '@/pages/minigames/reversi/spec.ts';

    // FIXME: Direction別にする必要があるのでは？
    const gameBoard1CanMove = ref<boolean[][][]>( // [Direction][Color][Square]
        new Array(DIRECTION_SIZE)
    );

    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        gameBoard1CanMove,
    });

</script>
