<!--
    pages/making/button-repeat-1.vue の［ボタンの押しっぱなし］機能のコンポーネント化。
    使用例は
    pages/making/input-axis-target.vue 参照。
-->

<template>
    <!-- とくに表示物はありません -->
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onUnmounted, ref, watch } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################

    interface Props {
        run: boolean;     // コールバック関数
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ##############################################
    // # このコンポーネントで起こるカスタムイベント #
    // ##############################################

    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'buttonRepeat'): void;
        (event: 'buttonStop'): void;
    }
    const emit = defineEmits<Emits>();


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appManualKeyRepeatTimerId = ref<number | null>(null);   // ［キーボード操作説明］のボタンのキー・リピート用


    // ##########
    // # 終了時 #
    // ##########

    onUnmounted(()=>{
        repeatStop();
    });


    // ################
    // # サブルーチン #
    // ################

    watch(()=>props.run, (newValue)=>{
        if (newValue) {
            repeatStart();
        } else {
            repeatStop();
        }
    });


    /**
     * 長押し開始
     */
    function repeatStart() : void {      
        // 親に変更を通知
        emit('buttonRepeat');   // 即時実行
        
        const intervalTime = 17;    // インターバルの時間（ミリ秒）は調整可能
        appManualKeyRepeatTimerId.value = setInterval(() => {   // 指定の間隔で繰り返し実行
            // 親に変更を通知
            emit('buttonRepeat');
        }, intervalTime);
    }

    /**
     * 長押し終了
     */
    function repeatStop() {
        if (appManualKeyRepeatTimerId.value) {
            clearInterval(appManualKeyRepeatTimerId.value);    // インターバルをクリア
            appManualKeyRepeatTimerId.value = null;

            // 親に変更を通知
            emit('buttonStop');   // 即時実行
        }
    }

</script>

<style scoped>
</style>
