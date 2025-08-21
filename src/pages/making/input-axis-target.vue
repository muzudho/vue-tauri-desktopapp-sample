<template>

    <h4>標的</h4>
    <section class="sec-4">
        <p>キーボード操作方法</p>
        <ul>
            <li>
                <v-btn class="code-key hidden"/><v-btn class="code-key" @mousedown="onUpButtonPressed()" @mouseup="onUpButtonReleased()">↑</v-btn><br/>
                <v-btn class="code-key" @mousedown="onLeftButtonPressed()" @mouseup="onLeftButtonReleased()">←</v-btn><v-btn class="code-key hidden"/><v-btn class="code-key" @mousedown="onRightButtonPressed()" @mouseup="onRightButtonReleased()">→</v-btn>　…　自機を上下左右へ、印字を逆方向へ動かすぜ！<br/>
                <v-btn class="code-key hidden"/><v-btn class="code-key" @mousedown="onDownButtonPressed()" @mouseup="onDownButtonReleased()">↓</v-btn><br/>
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
                :style="target1Style"></div>
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

    const target1Left = ref<number>(0);      // スプライトのX座標
    const target1Top = ref<number>(0);       // スプライトのY座標
    const target1Speed = ref<number>(2);     // 移動速度
    const target1Input = <Record<string, boolean>>{  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const target1Style = computed(() => ({
        top: `${target1Top.value}px`,
        left: `${target1Left.value}px`,
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

            if (target1Input.hasOwnProperty(e.key)) {
                target1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (target1Input.hasOwnProperty(e.key)) {
                target1Input[e.key] = false;
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
            if (target1Input[" "]) {
                target1Top.value = 0;
                target1Left.value = 0;
            }

            // ++++++++++++++
            // + 移動を処理 +
            // ++++++++++++++

            if (target1Input.ArrowLeft) {   // 左
                target1Left.value -= target1Speed.value;
            }

            if (target1Input.ArrowUp) {     // 上
                target1Top.value -= target1Speed.value;
            }

            if (target1Input.ArrowRight) {  // 右
                target1Left.value += target1Speed.value;
            }

            if (target1Input.ArrowDown) {   // 下
                target1Top.value += target1Speed.value;
            }

            // 次のフレーム
            requestAnimationFrame(update);
        };

        // 初回呼び出し
        requestAnimationFrame(update);
    }


    /**
     * 左。
     */
    function onLeftButtonPressed() : void {
        target1Left.value -= target1Speed.value;
    }


    function onLeftButtonReleased() : void {
    }


    /**
     * 上。
     */
    function onUpButtonPressed() : void {
        target1Top.value -= target1Speed.value;
    }


    function onUpButtonReleased() : void {
    }


    /**
     * 右。
     */
    function onRightButtonPressed() : void {
        target1Left.value += target1Speed.value;
    }


    function onRightButtonReleased() : void {
    }


    /**
     * 下。
     */
    function onDownButtonPressed() : void {
        target1Top.value += target1Speed.value;
    }


    function onDownButtonReleased() : void {
    }


    /**
     * スペースキー。
     */
    function onSpaceButtonPressed() : void {
        target1Top.value = 0;
        target1Left.value = 0;
    }


    function onSpaceButtonReleased() : void {
    }

</script>

<style scoped>
    div.cursor {
        position: relative; border:dashed 4px green; width:32px; height:32px;
    }
</style>
