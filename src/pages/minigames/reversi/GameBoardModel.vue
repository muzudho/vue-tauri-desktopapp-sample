<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, ref } from 'vue';


    // ################
    // # オブジェクト #
    // ################

    const tileBoard1FileNum = ref<number>(10);  // 盤が横に何マスか
    const tileBoard1RankNum = ref<number>(10);  // 盤が縦に何マスか
    const tileBoard1Area = computed(()=>{   // 盤のマス数
        return tileBoard1FileNum.value * tileBoard1RankNum.value;
    });


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        tileBoard1Area,
        tileBoard1FileNum,
        tileBoard1RankNum,
    });

</script>
