<template>

    <h4>標的</h4>
    <section class="sec-4">
        <!-- タッチパネルでも操作できるように、ボタンを置いておきます。キーボードの操作説明も兼ねます。 -->
        <p>キーボード操作方法</p>
        <ul>
            <li>
                <v-btn class="code-key hidden"/>
                <v-btn class="code-key" @mousedown="onStartRepeat(onUpButtonPressed)" @mouseup="onStopRepeat(onUpButtonReleased)" @mouseleave="onStopRepeat(onUpButtonReleased)">↑</v-btn>
                <br/>
                <v-btn class="code-key" @mousedown="onStartRepeat(onLeftButtonPressed)" @mouseup="onStopRepeat(onLeftButtonReleased)" @mouseleave="onStopRepeat(onLeftButtonReleased)">←</v-btn>
                <v-btn class="code-key hidden"/>
                <v-btn class="code-key" @mousedown="onStartRepeat(onRightButtonPressed)" @mouseup="onStopRepeat(onRightButtonReleased)" @mouseleave="onStopRepeat(onRightButtonReleased)">→</v-btn>
                　…　自機を上下左右へ、印字を逆方向へ動かすぜ！
                <br/>
                <v-btn class="code-key hidden"/>
                <v-btn class="code-key" @mousedown="onStartRepeat(onDownButtonPressed)" @mouseup="onStopRepeat(onDownButtonReleased)" @mouseleave="onStopRepeat(onDownButtonReleased)">↓</v-btn>
                <br/>
            </li>
            <li><v-btn class="code-key" @mousedown="onSpaceButtonPressed()" @mouseup="onSpaceButtonReleased()">（スペース）</v-btn>　…　自機、印字の位置を最初に有ったところに戻すぜ。</li>
            <li>
                <!-- フォーカスを外すためのダミー・ボタンです -->
                <v-btn
                    class="noop-key"
                    ref="noopButton"
                    v-tooltip="'PCでのマウス操作で、フォーカスがコントロールに残って邪魔になるときは、このボタンを押してくれだぜ'" >何もしないボタン</v-btn><br/>
            </li>
        </ul>
        <br/>

        <div :style="`width: ${board1SquareWidth}px; height: ${board1SquareHeight}px; background-color:lightpink;`">
            <!-- プレイヤー１（点線の枠） -->
            <div
                class="cursor"
                :style="player1Style"></div>
        </div>

    </section>

    <br/>
    <h4><span class="parent-header-lights-out">標的　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link
            pagePath="/making/input-axis-target"/>
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    import { VBtn } from 'vuetify/components';


    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //


    // from の階層が上の順、アルファベット順
    import SourceLink from '../../components/SourceLink.vue';


    // ############################
    // # アプリケーション・データ #
    // ############################
    //
    // 今動いているアプリケーションの状態を記録しているデータ。特に可変のもの。
    //

    const appManualKeyRepeatTimerId = ref<number | null>(null);   // ［キーボード操作説明］のボタンのキー・リピート用


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　何もしないボタン +
    // ++++++++++++++++++++++++++++++++++++++

    const noopButton = ref<InstanceType<typeof VBtn> | null>(null);

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　盤 +
    // ++++++++++++++++++++++++

    const board1SquareWidth = 32;
    const board1SquareHeight = 32;

    // ++++++++++++++++++++++++++++
    // + オブジェクト　＞　自機１ +
    // ++++++++++++++++++++++++++++
    //
    // 点線の枠。
    //

    const player1Left = ref<number>(0);      // スプライトのX座標
    const player1Top = ref<number>(0);       // スプライトのY座標
    const player1Speed = ref<number>(2);     // 移動速度
    const player1Input = <Record<string, boolean>>{  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const player1Style = computed(() => ({
        top: `${player1Top.value}px`,
        left: `${player1Left.value}px`,
    }));


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        // キーボードイベント
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            // ［↑］［↓］キーの場合
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                e.preventDefault();
            }

            if (player1Input.hasOwnProperty(e.key)) {
                player1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (player1Input.hasOwnProperty(e.key)) {
                player1Input[e.key] = false;
            }
        });

        gameLoopStart();
    });


    // ################
    // # サブルーチン #
    // ################

    /**
     * ゲームのメインループ開始
     */
    function gameLoopStart() : void {
        const update = () => {

            // 位置のリセット
            if (player1Input[" "]) {
                player1Top.value = 0;
                player1Left.value = 0;
            }

            // ++++++++++++++
            // + 移動を処理 +
            // ++++++++++++++

            if (player1Input.ArrowLeft) {   // 左
                player1Left.value -= player1Speed.value;
            }

            if (player1Input.ArrowUp) {     // 上
                player1Top.value -= player1Speed.value;
            }

            if (player1Input.ArrowRight) {  // 右
                player1Left.value += player1Speed.value;
            }

            if (player1Input.ArrowDown) {   // 下
                player1Top.value += player1Speed.value;
            }

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }


    /**
     * 長押し開始
     */
    function onStartRepeat(callback:()=>void) : void {      
        callback();   // 即時実行
        
        const intervalTime = 17;    // インターバルの時間（ミリ秒）は調整可能
        appManualKeyRepeatTimerId.value = setInterval(() => {   // 指定の間隔で繰り返し実行
            callback();
        }, intervalTime);
    }

    /**
     * 長押し終了
     */
    function onStopRepeat(callback:()=>void) {
        if (appManualKeyRepeatTimerId.value) {
            clearInterval(appManualKeyRepeatTimerId.value);    // インターバルをクリア
            appManualKeyRepeatTimerId.value = null;

            callback();   // 即時実行
        }
    }

    /**
     * 左。
     */
    function onLeftButtonPressed() : void {
        player1Left.value -= player1Speed.value;
    }


    function onLeftButtonReleased() : void {
    }


    /**
     * 上。
     */
    function onUpButtonPressed() : void {
        player1Top.value -= player1Speed.value;
    }


    function onUpButtonReleased() : void {
    }


    /**
     * 右。
     */
    function onRightButtonPressed() : void {
        player1Left.value += player1Speed.value;
    }


    function onRightButtonReleased() : void {
    }


    /**
     * 下。
     */
    function onDownButtonPressed() : void {
        player1Top.value += player1Speed.value;
    }


    function onDownButtonReleased() : void {
    }


    /**
     * スペースキー。
     */
    function onSpaceButtonPressed() : void {
        player1Top.value = 0;
        player1Left.value = 0;
    }


    function onSpaceButtonReleased() : void {
    }

</script>

<style scoped>
    div.cursor {
        position: relative; border:dashed 4px green; width:32px; height:32px;
    }
</style>
