<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';


    // ################
    // # オブジェクト #
    // ################

    const tileBoard1FileNum = ref<number>(10);  // 盤が横に何マスか
    const tileBoard1RankNum = ref<number>(10);  // 盤が縦に何マスか


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        tileBoard1FileNum,
        tileBoard1RankNum,
    });

</script>
