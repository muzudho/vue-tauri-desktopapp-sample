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
     * 東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function eastOf(sq: number) : number {
        const eastSq = sq + 1;
        if (eastSq % props.fileNum == 0) {   // 世界一周したら
            return -1;
        }

        return eastSq;
    }


    /**
     * 西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function westOf(sq: number) : number {
        const westSq = sq - 1;
        if (westSq % props.fileNum == props.fileNum - 1) {  // 世界一周したら
            return -1;
        }

        return westSq;
    }


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
        eastOf,
        westOf,
        northOf,
    });

</script>
