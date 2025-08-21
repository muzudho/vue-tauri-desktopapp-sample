<template>
    <!-- とくに表示物はありません -->
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appManualKeyRepeatTimerId = ref<number | null>(null);   // ［キーボード操作説明］のボタンのキー・リピート用


    // ################
    // # サブルーチン #
    // ################


    /**
     * 長押し開始
     */
    function onRepeatStart(callback:()=>void) : void {      
        callback();   // 即時実行
        
        const intervalTime = 17;    // インターバルの時間（ミリ秒）は調整可能
        appManualKeyRepeatTimerId.value = setInterval(() => {   // 指定の間隔で繰り返し実行
            callback();
        }, intervalTime);
    }

    /**
     * 長押し終了
     */
    function onRepeatStop(callback:()=>void) {
        if (appManualKeyRepeatTimerId.value) {
            clearInterval(appManualKeyRepeatTimerId.value);    // インターバルをクリア
            appManualKeyRepeatTimerId.value = null;

            callback();   // 即時実行
        }
    }


    // ################
    // # エクスポーズ #
    // ################

    defineExpose({
        onStartRepeat: onRepeatStart,
        onStopRepeat: onRepeatStop,
    });

</script>

<style scoped>
</style>
