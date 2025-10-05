<template>
</template>

<script setup lang="ts">

    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        fileNum: number;
        area: number;
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
     * 南側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southOf(sq: number) : number {
        const southSq = sq + props.fileNum;
        if (props.area <= southSq) {  // 盤を飛び出たら
            return -1;
        }

        return southSq;
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


    /**
     * 北東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northeastOf(sq: number) : number {
        const northeastSq = sq - props.fileNum + 1;
        if (
            northeastSq < 0 // 盤を飛び出たら
            || northeastSq % props.fileNum == 0    // 世界一周したら
        ) {  
            return -1;
        }

        return northeastSq;
    }


    /**
     * 南西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southwestOf(sq: number) : number {
        const southwestSq = sq + props.fileNum - 1;
        if (
            props.area <= southwestSq // 盤を飛び出たら
            || southwestSq % props.fileNum == props.fileNum- 1 // 世界一周したら
        ) { 
            return -1;
        }

        return southwestSq;
    }


    /**
     * 南東側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function southeastOf(sq: number) : number {
        const southeastSq = sq + props.fileNum + 1;
        if (
            southeastSq % props.fileNum == 0  // 世界一周したら
            || props.area <= southeastSq  // 盤を飛び出たら
        ) {   
            return -1;
        }

        return southeastSq;
    }


    /**
     * 北西側のマス番号。
     * @param sq 
     * @returns 該当がなければ -1
     */
    function northwestOf(sq: number) : number {
        const northwestSq = sq - props.fileNum - 1;
        if (
            northwestSq % props.fileNum == props.fileNum - 1    // 世界一周したら
            || northwestSq < 0  // 盤を飛び出たら
        ) { 
            return -1;
        }

        return northwestSq;
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        eastOf, // 水平方向
        westOf,
        southOf,    // 垂直方向
        northOf,
        northeastOf,    // 右肩上がり方向
        southwestOf,
        southeastOf,    // 右肩下がり方向
        northwestOf,
    });

</script>
