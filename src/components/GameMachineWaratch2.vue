<template>

    <!-- 機能 -->
    <button-20250822 ref="button1Ref"/>


    <!-- ゲームマシン：画面部分透過用マスク -->
    <svg width="0" height="0">
        <defs>
            <mask id="waratch2-mask-rect">
                <!-- 全体の大きさを白く塗る -->
                <rect x="0" y="0" width="320" height="448" fill="white"/>

                <!-- 透過したいところを黒く塗る -->
                <rect x="64" y="64" width="192" height="192" fill="black"/>
            </mask>
        </defs>
    </svg>


    <!-- ゲームマシンの枠、および画面に落ちる影。
        マスクでドロップシャドウを切り抜かれないようにするため、ゲームマシンの外に出します。
        :style="perspectiveMiddle1Style"
    -->
    <div
        :style="props.hardPositionStyle"
        style="
            position: fixed;
            width: calc(5 * 64px);
            height: calc(7 * 64px);
            pointer-events: none;  /* クリックを透過させます */
        "
    >
        <!--
                left: calc(1 * 64px - 3px); /* ボーダー幅を引いている */
                top: calc(1 * 64px - 10px);    /* FIXME: うまく合わない */
        -->
        <div
            class="waratch2-screen-frame"
            style="
                position: absolute;
                width: calc(3 * 64px + 4px);
                height: calc(3 * 64px + 24px + 3px);
                box-sizing: border-box;
            "
        ></div>
    </div>

        
    <!-- ハード。ただし画面内は切り抜き -->
    <div
        :style="props.hardPositionStyle"
        style="
            position: fixed;
            width: calc(5 * 64px);
            height: calc(7 * 64px);
            background-color: crimson;
            pointer-events: none;  /* クリックを透過させます */
        "
    >
        <!-- ハード名 -->
        <div
            class="waratch2-hard-name"
            style="
                left: calc(1 * 64px - 1px); /* ボーダー幅を引いている */
                top: calc(4.5 * 64px - 32px - 1px);
                width: calc(3 * 64px);
            "
        >Waratch2</div>

        <!-- ボタン配置 -->
        <div
            class="waratch2-buttons-area"
            :style="{
                top: `${5 * 64 - 32}px`,
                width: `${15 * controllerSquareUnit}px`,
                height: `${3 * controllerSquareUnit}px`,
            }"
        >
            <!-- 上キー -->
            <v-btn
                class="waratch2-button"
                :style="`
                    top: ${0 * controllerSquareUnit}px;
                    left: ${1.5 * controllerSquareUnit}px;
                    width: ${1 * controllerSquareUnit}px;
                    height: ${1 * controllerSquareUnit}px;
                `"
                @touchstart.prevent="button1Ref?.press($event, emit('onUpButtonPressed'), {repeat: true});"
                @touchend="button1Ref?.release(emit('onUpButtonReleased'));"
                @touchcancel="button1Ref?.release(emit('onUpButtonReleased'));"
                @touchleave="button1Ref?.release(emit('onUpButtonReleased'));"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onUpButtonPressed'), {repeat: true})"
                @mouseup="button1Ref?.release(emit('onUpButtonReleased'));"
                @mouseleave="button1Ref?.release(emit('onUpButtonReleased'));"
                v-tooltip="'自機を上へ、像を逆向きへ動かすぜ！'"
            >↑</v-btn>

            <!-- 左キー -->
            <v-btn
                class="waratch2-button"
                :style="`
                    top: ${1 * controllerSquareUnit}px;
                    left: ${0.5 * controllerSquareUnit}px;
                    width: ${1 * controllerSquareUnit}px;
                    height: ${1 * controllerSquareUnit}px;
                `"
                @touchstart.prevent="button1Ref?.press($event, emit('onLeftButtonPressed'), {repeat: true});"
                @touchend="button1Ref?.release(emit('onLeftButtonReleased'));"
                @touchcancel="button1Ref?.release(emit('onLeftButtonReleased'));"
                @touchleave="button1Ref?.release(emit('onLeftButtonReleased'));"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onLeftButtonPressed'), {repeat: true})"
                @mouseup="button1Ref?.release(emit('onLeftButtonReleased'));"
                @mouseleave="button1Ref?.release(emit('onLeftButtonReleased'));"
                v-tooltip="'自機を左へ、像を逆向きへ動かすぜ！'"
            >←</v-btn>

            <!-- 右キー -->
            <v-btn
                class="waratch2-button"
                :style="`
                    top: ${1 * controllerSquareUnit}px;
                    left: ${2.5 * controllerSquareUnit}px;
                    width: ${1 * controllerSquareUnit}px;
                    height: ${1 * controllerSquareUnit}px;
                `"
                @touchstart.prevent="button1Ref?.press($event, emit('onRightButtonPressed'), {repeat: true});"
                @touchend="button1Ref?.release(emit('onRightButtonReleased'));"
                @touchcancel="button1Ref?.release(emit('onRightButtonReleased'));"
                @touchleave="button1Ref?.release(emit('onRightButtonReleased'));"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onRightButtonPressed'), {repeat: true})"
                @mouseup="button1Ref?.release(emit('onRightButtonReleased'));"
                @mouseleave="button1Ref?.release(emit('onRightButtonReleased'));"
                v-tooltip="'自機を右へ、像を逆向きへ動かすぜ！'"
            >→</v-btn>

            <!-- 下キー -->
            <v-btn
                class="waratch2-button"
                :style="`
                    top: ${2 * controllerSquareUnit}px;
                    left: ${1.5 * controllerSquareUnit}px;
                    width: ${1 * controllerSquareUnit}px;
                    height: ${1 * controllerSquareUnit}px;
                `"
                @touchstart.prevent="button1Ref?.press($event, emit('onDownButtonPressed'), {repeat: true});"
                @touchend="button1Ref?.release(emit('onDownButtonReleased'));"
                @touchcancel="button1Ref?.release(emit('onDownButtonReleased'));"
                @touchleave="button1Ref?.release(emit('onDownButtonReleased'));"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onDownButtonPressed'), {repeat: true})"
                @mouseup="button1Ref?.release(emit('onDownButtonReleased'));"
                @mouseleave="button1Ref?.release(emit('onDownButtonReleased'));"
                v-tooltip="'自機を下へ、像を逆向きへ動かすぜ！'"
            >↓</v-btn>

            <!-- スペース・キー -->
            <v-btn
                class="waratch2-button"
                :style="`
                    top: ${1 * controllerSquareUnit}px;
                    left: ${4.5 * controllerSquareUnit}px;
                    width: ${3 * controllerSquareUnit}px;
                    height: ${1 * controllerSquareUnit}px;
                `"
                @touchstart.prevent="button1Ref?.press($event, emit('onSpaceButtonPressed'), {repeat: true});"
                @touchend="button1Ref?.release(emit('onSpaceButtonReleased'));"
                @touchcancel="button1Ref?.release(emit('onSpaceButtonReleased'));"
                @touchleave="button1Ref?.release(emit('onSpaceButtonReleased'));"
                @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onSpaceButtonPressed'), {repeat: true})"
                @mouseup="button1Ref?.release(emit('onSpaceButtonReleased'));"
                @mouseleave="button1Ref?.release(emit('onSpaceButtonReleased'));"
                v-tooltip="'自機、印字の位置を最初に有ったところに戻すぜ。'"
            >（スペース）</v-btn>

        </div>

        <slot></slot>
    </div>
    🌟ゲームマシン・ワラッチ２
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    import type { CompatibleStyleValue }  from '../compatibles/compatible-style-value';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    // アルファベット順
    import Button20250822 from '@/components/Button20250822.vue';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################
    
    interface Props {
        hardPositionStyle: CompatibleStyleValue;
    }
    // デフォルト値を設定
    const props = defineProps<Props>();


    // ################################################
    // # このコンポーネントが受け取るイベントハンドラ #
    // ################################################

    interface Emits {
        // イベント名と、変更通知メソッドの引数と、そのメソッドの戻り値。
        (event: 'onLeftButtonPressed'): void;
        (event: 'onLeftButtonReleased'): void;
        (event: 'onUpButtonPressed'): void;
        (event: 'onUpButtonReleased'): void;
        (event: 'onRightButtonPressed'): void;
        (event: 'onRightButtonReleased'): void;
        (event: 'onDownButtonPressed'): void;
        (event: 'onDownButtonReleased'): void;
        (event: 'onSpaceButtonPressed'): void;
        (event: 'onSpaceButtonReleased'): void;
        
    }
    const emit = defineEmits<Emits>();


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    

    const controllerSquareUnit: number = 40;
    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン拡張 +
    // ++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);

</script>

<style scoped>

    @import '@/styles/game-machine-waratch2.css';

</style>
