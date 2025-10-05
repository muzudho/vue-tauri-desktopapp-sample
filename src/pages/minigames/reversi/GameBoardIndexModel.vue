<template>
</template>

<script setup lang="ts">

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        fileNum: number;
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ################
    // # サブルーチン #
    // ################

    /**
     * 北側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northOf(sq: number) : number {
        const northSq = sq - props.fileNum;
        if (northSq < 0) {  // 盤を飛び出たら
            return -1;
        }

        return northSq;
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        northOf,
    });

</script>
