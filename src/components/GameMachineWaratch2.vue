<template>

    <!-- 機能 -->
    <button-20250822 ref="button1Ref"/>


    <!-- ゲームマシン：画面部分透過用マスク -->
    <svg width="0" height="0">
        <defs>
            <mask id="waratch2-mask-rect">
                <!-- 全体の大きさを白く塗る -->
                <rect x="0" y="0" :width="shassisWidth" :height="shassisHeight" fill="white"/>

                <!-- 透過したいところを黒く塗る -->
                <rect :x="screenMarginLeft" :y="screenMarginTop" :width="screenWidth" :height="screenHeight" fill="black"/>
            </mask>
        </defs>
    </svg>

    <!-- 全体の位置 -->
    <div
        :class="props.hardLocationClass"
        :style="props.hardLocationStyle"
    >
        <!-- 画面内を切り抜かれないようにします -->
        <div
            class="waratch2-surface"
            :style="{
                //...toObject(props.hardLocationStyle),
                position: 'absolute',
                width: `${shassisWidth}px`,
                height: `${shassisHeight}px`,
            }"
        >
            <!-- ゲーム画面の裏地 -->
            <div
                :style="{
                    position: 'absolute',
                    boxSizing: 'border-box',
                    left: `${screenMarginLeft - shassisBorderThickness}px`,   // ボーダー幅を引いている
                    top: `${screenMarginTop - shassisBorderThickness}px`,
                    width: `${props.screenWidth}px`,
                    height: `${props.screenHeight}px`,
                    backgroundColor: 'olivedrab',
                }"
            ></div>

            <!-- ゲーム画面はめ込み -->
            <div
                :style="{
                    position: 'relative',   /* スロットの親要素にする */
                    left: `${screenMarginLeft - shassisBorderThickness}px`,   // ボーダー幅を引いている
                    top: `${screenMarginTop - shassisBorderThickness}px`,
                }"
            >
                <slot></slot>
            </div>
        </div>
            
        <!-- シャーシ。画面部分の矩形は切り抜き -->
        <div
            class="waratch2-shassis waratch2-trim-screen"
            :style="{
                //...toObject(props.hardLocationStyle),
                width: `${shassisWidth}px`,
                height: `${shassisHeight}px`,
            }"
        >

            <!-- ハード名 -->
            <div
                class="waratch2-name-area"
                :style="{
                    left: `${screenMarginLeft - shassisBorderThickness}px`,   // ボーダー幅を引いている
                    top: `${screenMarginTop + props.screenHeight - shassisBorderThickness}px`,
                    width: `${props.screenWidth}px`,
                    height: `${hardNameLineHeight}px`,
                }"
            ><span class="waratch2-name-1">Waratch2</span></div>
        </div>


        <!-- クリック可能部分 -->
        <div
            class="waratch2-surface waratch2-clickable"
            :style="{
                //...toObject(props.hardLocationStyle),
                position: 'absolute',
                width: `${shassisWidth}px`,
                height: `${shassisHeight}px`
            }"
        >
            <!-- 十字キー配置 -->
            <div
                class="waratch2-buttons-area"
                :style="{
                    left: `${directionKeysAreaLeft}px`,
                    top: `${directionKeysAreaTop}px`,
                    width: `${3.5 * controllerSquareUnit}px`,
                    height: `${3 * controllerSquareUnit}px`,
                }"
            >
                <!-- 上キー -->
                <v-btn
                    class="waratch2-button"
                    :style="{
                        top: `${0 * controllerSquareUnit}px`,
                        left: `${1.5 * controllerSquareUnit}px`,
                        width: `${1 * controllerSquareUnit}px`,
                        height: `${1 * controllerSquareUnit}px`,
                    }"
                    @touchstart.prevent="button1Ref?.press($event, emit('onUpButtonPressed'), {repeat: true});"
                    @touchend="button1Ref?.release(emit('onUpButtonReleased'));"
                    @touchcancel="button1Ref?.release(emit('onUpButtonReleased'));"
                    @touchleave="button1Ref?.release(emit('onUpButtonReleased'));"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onUpButtonPressed'), {repeat: true})"
                    @mouseup="button1Ref?.release(emit('onUpButtonReleased'));"
                    @mouseleave="button1Ref?.release(emit('onUpButtonReleased'));"
                >↑</v-btn>
                <!-- v-tooltip="'自機を上へ、像を逆向きへ動かすぜ！'" -->

                <!-- 左キー -->
                <v-btn
                    class="waratch2-button"
                    :style="{
                        top: `${1 * controllerSquareUnit}px`,
                        left: `${0.5 * controllerSquareUnit}px`,
                        width: `${1 * controllerSquareUnit}px`,
                        height: `${1 * controllerSquareUnit}px`,
                    }"
                    @touchstart.prevent="button1Ref?.press($event, emit('onLeftButtonPressed'), {repeat: true});"
                    @touchend="button1Ref?.release(emit('onLeftButtonReleased'));"
                    @touchcancel="button1Ref?.release(emit('onLeftButtonReleased'));"
                    @touchleave="button1Ref?.release(emit('onLeftButtonReleased'));"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onLeftButtonPressed'), {repeat: true})"
                    @mouseup="button1Ref?.release(emit('onLeftButtonReleased'));"
                    @mouseleave="button1Ref?.release(emit('onLeftButtonReleased'));"
                >←</v-btn>
                <!-- v-tooltip="'自機を左へ、像を逆向きへ動かすぜ！'" -->

                <!-- 右キー -->
                <v-btn
                    class="waratch2-button"
                    :style="{
                        top: `${1 * controllerSquareUnit}px`,
                        left: `${2.5 * controllerSquareUnit}px`,
                        width: `${1 * controllerSquareUnit}px`,
                        height: `${1 * controllerSquareUnit}px`,
                    }"
                    @touchstart.prevent="button1Ref?.press($event, emit('onRightButtonPressed'), {repeat: true});"
                    @touchend="button1Ref?.release(emit('onRightButtonReleased'));"
                    @touchcancel="button1Ref?.release(emit('onRightButtonReleased'));"
                    @touchleave="button1Ref?.release(emit('onRightButtonReleased'));"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onRightButtonPressed'), {repeat: true})"
                    @mouseup="button1Ref?.release(emit('onRightButtonReleased'));"
                    @mouseleave="button1Ref?.release(emit('onRightButtonReleased'));"
                >→</v-btn>
                <!-- v-tooltip="'自機を右へ、像を逆向きへ動かすぜ！'" -->

                <!-- 下キー -->
                <v-btn
                    class="waratch2-button"
                    :style="{
                        top: `${2 * controllerSquareUnit}px`,
                        left: `${1.5 * controllerSquareUnit}px`,
                        width: `${1 * controllerSquareUnit}px`,
                        height: `${1 * controllerSquareUnit}px`,
                    }"
                    @touchstart.prevent="button1Ref?.press($event, emit('onDownButtonPressed'), {repeat: true});"
                    @touchend="button1Ref?.release(emit('onDownButtonReleased'));"
                    @touchcancel="button1Ref?.release(emit('onDownButtonReleased'));"
                    @touchleave="button1Ref?.release(emit('onDownButtonReleased'));"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onDownButtonPressed'), {repeat: true})"
                    @mouseup="button1Ref?.release(emit('onDownButtonReleased'));"
                    @mouseleave="button1Ref?.release(emit('onDownButtonReleased'));"
                >↓</v-btn>
                <!-- v-tooltip="'自機を下へ、像を逆向きへ動かすぜ！'" -->
            </div>

            <!-- 決定等ボタン配置 -->
            <div
                class="waratch2-buttons-area"
                :style="{
                    left: `${actionButtonsAreaLeft}px`,
                    top: `${actionButtonsAreaTop}px`,
                    width: `${2.5 * controllerSquareUnit}px`,
                    height: `${3 * controllerSquareUnit}px`,
                }"
            >
                <!-- スペース・キー -->
                <v-btn
                    class="waratch2-button"
                    :style="{
                        top: `${1 * controllerSquareUnit}px`,
                        width: `${2.5 * controllerSquareUnit}px`,
                        height: `${1 * controllerSquareUnit}px`,
                    }"
                    @touchstart.prevent="button1Ref?.press($event, emit('onSpaceButtonPressed'), {repeat: true});"
                    @touchend="button1Ref?.release(emit('onSpaceButtonReleased'));"
                    @touchcancel="button1Ref?.release(emit('onSpaceButtonReleased'));"
                    @touchleave="button1Ref?.release(emit('onSpaceButtonReleased'));"
                    @mousedown.prevent="button1Ref?.handleMouseDown($event, emit('onSpaceButtonPressed'), {repeat: true})"
                    @mouseup="button1Ref?.release(emit('onSpaceButtonReleased'));"
                    @mouseleave="button1Ref?.release(emit('onSpaceButtonReleased'));"
                >（スペース）</v-btn>
                <!-- v-tooltip="'自機、印字の位置を最初に有ったところに戻すぜ。'" -->

            </div>
        </div>

        <!-- ゲームマシンの枠、および画面に落ちる影。
            マスクでドロップシャドウを切り抜かれないようにするため、ゲームマシンの外に出します。
        -->
        <div
            class="waratch2-surface"
            :style="{
                //...toObject(props.hardLocationStyle),
                position: 'absolute',
                width: `${screenWidth}px`,
                height: `${screenHeight}px`,
            }"
        >
            <div
                class="waratch2-screen-frame"
                :style="{
                    left: `${screenMarginLeft - shassisBorderThickness}px`,   // ボーダー幅を引く
                    top: `${screenMarginTop - shassisBorderThickness}px`,
                    width: `${screenWidth + 3}px`, // FIXME: なんや分からん+3
                    height: `${screenHeight + 24 + 2}px`,   // FIXME: なんや分からん+24+2
                }"
            ></div>
        </div>
    </div>

    <!--
    <p>🌟画面の向き: {{ orientation }}</p>
    -->
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, onUnmounted, ref } from 'vue';

    // ++++++++++++++++++++++++++++++
    // + インポート　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++

    //import { toObject } from '../compatibles/compatible-style-value';
    import type { CompatibleStyleValue } from '../compatibles/compatible-style-value';

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
        hardLocationClass?: CompatibleStyleValue;
        hardLocationStyle: CompatibleStyleValue;
        screenWidth: number;
        screenHeight: number;
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
    const shassisWidth = ref<number>(0);
    const shassisHeight = ref<number>(0);
    const screenMarginLeft = ref<number>(0);
    const screenMarginTop = ref<number>(0);
    const shassisBorderThickness: number = 4;
    const hardNameLineHeight: number = 24;
    const controllerSquareUnit: number = 40;
    const directionKeysAreaLeft = ref<number>(0);
    const directionKeysAreaTop = ref<number>(0);
    const actionButtonsAreaLeft = ref<number>(0);
    const actionButtonsAreaTop = ref<number>(0);

    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　ボタン拡張 +
    // ++++++++++++++++++++++++++++++++

    const button1Ref = ref<InstanceType<typeof Button20250822> | null>(null);


    // ###############
    // # 開始 / 終了 #
    // ###############

    onMounted(()=>{
        // 初回チェック
        checkOrientation();
        // 向きが変わったときのイベントリスナー
        window.screen.orientation.addEventListener('change', checkOrientation);
        // ウィンドウサイズが変わったときのイベントリスナー
        window.addEventListener('resize', checkOrientation);
    });

    onUnmounted(()=>{
        // コンポーネント破棄時にリスナー削除
        window.screen.orientation.removeEventListener('change', checkOrientation);
        window.removeEventListener('resize', checkOrientation);
    });

    // ################
    // # サブルーチン #
    // ################

    let orientation = ref<'Portrait' | 'Landscape'>('Landscape'); // Portrait:縦, Landscape:横

    function checkOrientation() {
        // 単純に縦横比でチェック。正方形なら縦とする。
        orientation.value = window.innerWidth <= window.innerHeight ? 'Portrait' : 'Landscape';

        // // PCでは、あくまでブラウザのアスペクト比ではなく、画面のアスペクト比。
        // ちゃんと検出するケース：
        // const type = window.screen.orientation.type;
        // if (type.includes('portrait')) {
        //     orientation.value = '縦（Portrait）';
        // } else if (type.includes('landscape')) {
        //     orientation.value = '横（Landscape）';
        // } else {
        //     orientation.value = '不明';
        // }

        if (orientation.value == 'Portrait') {  // 縦型
            screenMarginLeft.value = 1 * screenSquareUnit;
            screenMarginTop.value = 1 * screenSquareUnit;
            shassisWidth.value = 2 * screenSquareUnit + props.screenWidth;
            shassisHeight.value = 4 * screenSquareUnit + props.screenHeight;
            directionKeysAreaLeft.value = 0;
            directionKeysAreaTop.value = screenMarginTop.value + props.screenHeight + hardNameLineHeight + 8;    // 8 は画面とボタンの隙間
            actionButtonsAreaLeft.value = 4.5 * controllerSquareUnit;
            actionButtonsAreaTop.value = screenMarginTop.value + props.screenHeight + hardNameLineHeight + 8;

        } else {    // 横型
            screenMarginLeft.value = 2.5 * screenSquareUnit;
            screenMarginTop.value = 0.5 * screenSquareUnit;
            shassisWidth.value = (3 + 2) * screenSquareUnit + props.screenWidth;
            shassisHeight.value = (1 + 0.25) * screenSquareUnit + props.screenHeight;
            directionKeysAreaLeft.value = 0;
            directionKeysAreaTop.value = screenMarginTop.value + 1 * controllerSquareUnit;
            actionButtonsAreaLeft.value = screenMarginLeft.value + props.screenWidth + 0.5 * controllerSquareUnit;
            actionButtonsAreaTop.value = screenMarginTop.value + 1 * controllerSquareUnit;
        }
    }

</script>

<style scoped>

    @import '@/styles/game-machine-waratch2.css';

</style>
