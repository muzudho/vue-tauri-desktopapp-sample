<template>

    <h4>ボタンの押しっぱなしが利くようにしようぜ？</h4>
    <section class="sec-4">
        <!-- タッチパネルでも操作できるように、ボタンを置いておきます。キーボードの操作説明も兼ねます。 -->
        <p>キーボード操作方法</p>
        <ul>
            <li>
                <v-btn class="code-key" @mousedown="onRepeatStart(onUpButtonPressed)" @mouseup="onRepeatStop(onUpButtonReleased)" @mouseleave="onRepeatStop(onUpButtonReleased)">↑</v-btn>
                　…　とりあえず、上キーの押しっぱなしが利くようにするぜ！
                <br/>
            </li>
            <li><v-btn class="code-key" @mousedown="onSpaceButtonPressed()" @mouseup="onSpaceButtonReleased()">（スペース）</v-btn>　…　カウンターをリセットするぜ。</li>
            <li>
                <!-- フォーカスを外すためのダミー・ボタンです -->
                <v-btn
                    class="noop-key"
                    ref="noopButton"
                    v-tooltip="'PCでのマウス操作で、フォーカスがコントロールに残って邪魔になるときは、このボタンを押してくれだぜ'" >何もしないボタン</v-btn><br/>
            </li>
        </ul>
        <br/>

        カウント： {{ counter1Count }}
    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ボタンの押しっぱなしが利くようにしようぜ？　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link
            pagePath="/making/button-repeat-1"/>
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';
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

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　カウンター１ +
    // ++++++++++++++++++++++++++++++++++

    const counter1Count = ref<number>(0);
    const counter1Input = <Record<string, boolean>>{  // 入力
        " ": false, ArrowUp: false,
    };


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

            if (counter1Input.hasOwnProperty(e.key)) {
                counter1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (counter1Input.hasOwnProperty(e.key)) {
                counter1Input[e.key] = false;
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

            // リセット
            if (counter1Input[" "]) {
                counter1Count.value = 0;
            }

            // ++++++++++++++
            // + 移動を処理 +
            // ++++++++++++++

            if (counter1Input.ArrowUp) {     // 上
                counter1Count.value += 1;
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

    /**
     * 上。
     */
    function onUpButtonPressed() : void {
        counter1Count.value += 1;
    }


    function onUpButtonReleased() : void {
    }


    /**
     * スペースキー。
     */
    function onSpaceButtonPressed() : void {
        counter1Count.value = 0;
    }


    function onSpaceButtonReleased() : void {
    }

</script>

<style scoped>
</style>
