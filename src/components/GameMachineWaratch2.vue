<template>

    <!-- 機能 -->
    <button-20250822 ref="button1Ref"/>


    <!-- ゲームマシン：画面部分透過用マスク -->
    <svg width="0" height="0">
        <defs>
            <mask id="waratch2-mask-rect">
                <!-- 全体の大きさを白く塗る -->
                <rect x="0" y="0" :width="5 * screenSquareUnit" :height="7 * screenSquareUnit" fill="white"/>

                <!-- 透過したいところを黒く塗る -->
                <rect :x="screenSquareUnit" :y="screenSquareUnit" :width="3 * screenSquareUnit" :height="3 * screenSquareUnit" fill="black"/>
            </mask>
        </defs>
    </svg>


    <!-- 画面内を切り抜かれないようにします -->
    <div
        class="waratch2-surface"
        :style="props.hardPositionStyle"
        style="
            width: calc(5 * 64px);
            height: calc(7 * 64px);
        "
    >
        <!-- ゲーム画面の裏地 -->
        <div
            style="
                position: absolute;
                box-sizing: border-box;
                left: calc(1 * 64px - 4px);    /* ボーダー幅 4px を引いている */
                top: calc(1 * 64px - 4px);     /* ボーダー幅 4px を引いている */
                width: calc(3 * 64px);
                height: calc(3 * 64px);
                background-color: olivedrab;    /* cadetblue darkolivegreen darkslategray olive olivedrab */
            "
        ></div>
    </div>
        
    <!-- シャーシ。画面部分の矩形は切り抜き -->
    <div
        class="waratch2-shassis waratch2-trim-screen"
        :style="props.hardPositionStyle"
        style="
            width: calc(5 * 64px);
            height: calc(7 * 64px);
        "
    >

        <!-- ハード名 -->
        <div
            class="waratch2-name-area"
            style="
                left: calc(1 * 64px - 4px); /* ボーダー幅 4px を引いている */
                top: calc(4.5 * 64px - 24px - 8px - 4px);
                width: calc(3 * 64px);
            "
        ><span class="waratch2-name-1">Waratch2</span></div>
        

        <!-- TODO: ゲーム画面を入れたい -->
        <slot></slot>
    </div>


    <!-- クリック可能部分 -->
    <div
        class="waratch2-surface waratch2-clickable"
        :style="props.hardPositionStyle"
        style="
            width: calc(5 * 64px);
            height: calc(7 * 64px);
        "
    >
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
                    width: ${2.5 * controllerSquareUnit}px;
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
    </div>

    <!-- ゲームマシンの枠、および画面に落ちる影。
        マスクでドロップシャドウを切り抜かれないようにするため、ゲームマシンの外に出します。
    -->
    <div
        class="waratch2-surface"
        :style="props.hardPositionStyle"
        style="
            width: calc(5 * 64px);
            height: calc(7 * 64px);
        "
    >
        <div
            class="waratch2-screen-frame"
            style="
                left: calc(1 * 64px - 4px); /* ボーダー幅 4px 引く */
                top: calc(1 * 64px - 4px);    /* ボーダー幅 4px 引く */
                width: calc(3 * 64px + 3px);
                height: calc(3 * 64px + 24px + 2px);
            "
        ></div>
    </div>
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

    const screenSquareUnit: number = 64;
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
