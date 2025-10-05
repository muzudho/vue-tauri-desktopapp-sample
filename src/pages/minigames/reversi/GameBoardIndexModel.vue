<template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        fileNum: number;    // 盤が横に何マスか
        rankNum: number;    // 盤が縦に何マスか
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ################
    // # オブジェクト #
    // ################

    // サイズ類：
    const area = computed(()=>{
        return props.fileNum * props.rankNum;
    });

    // 方向類：
    const allDirectionsForeOf = ref<((sq: number) => number)[]>([]);
    const allDirectionsBackOf = ref<((sq: number) => number)[]>([]);
    // const allWaysNextOf = ref<((sq: number) => number)[]>([]);
    // const allWaysBackOf = ref<((sq: number) => number)[]>([]);


    // ##############
    // # 開始／終了 #
    // ##############

    onMounted(()=>{
        console.log(`DEBUG: [GameBoardIndexModel.vue onMounted] 開始。`);
        // ゲーム盤インデックス：
        allDirectionsForeOf.value = [
            (_sq: number) => { return -1; },
            eastOf,   // 水平方向
            southOf,  // 垂直方向
            northeastOf,  // 右肩上がり方向
            southeastOf,  // 右肩下がり方向
        ] as ((sq: number) => number)[];
        allDirectionsBackOf.value = [
            (_sq: number) => { return -1; },
            westOf,
            northOf,
            southwestOf,
            northwestOf,
        ] as ((sq: number) => number)[];
        // allWaysNextOf.value = [   // FIXME: これが無くてもアルゴリズム作れないか？
        //     (_sq: number) => { return -1; },
        //     eastOf,   // 水平方向
        //     westOf,
        //     southOf,  // 垂直方向
        //     northOf,
        //     northeastOf,  // 右肩上がり方向
        //     southwestOf,
        //     southeastOf,  // 右肩下がり方向
        //     northwestOf,
        // ];
        // allWaysBackOf.value = [
        //  (_sq: number) => { return -1; },
        //  westOf,
        //  eastOf,
        //  northOf,
        //  southOf,
        //  southwestOf,
        //  northeastOf,
        //  northwestOf,
        //  southeastOf
        // ];
    });


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
        if (area.value <= southSq) {  // 盤を飛び出たら
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
            area.value <= southwestSq // 盤を飛び出たら
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
            || area.value <= southeastSq  // 盤を飛び出たら
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
        // サイズ類：
        fileNum: props.fileNum,
        rankNum: props.rankNum,
        area,

        // 方向類：
        eastOf, // 水平方向
        westOf,
        southOf,    // 垂直方向
        northOf,
        northeastOf,    // 右肩上がり方向
        southwestOf,
        southeastOf,    // 右肩下がり方向
        northwestOf,

        allDirectionsForeOf,
        allDirectionsBackOf,
        // allWaysNextOf,
    });

</script>
