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
        :style="{
            ...props.hardPositionStyle,
            width: `${shassisScreenFileNum * screenSquareUnit}px`,
            height: `${shassisScreenRankNum * screenSquareUnit}px`,
        }"
    >
        <!-- ゲーム画面の裏地 -->
        <div
            :style="{
                position: 'absolute',
                boxSizing: 'border-box',
                left: `${screenMarginLeftFileNum * screenSquareUnit - shassisBorderThickness}px`,   // ボーダー幅を引いている
                top: `${screenMarginTopRankNum * screenSquareUnit - shassisBorderThickness}px`,
                width: `${screenScreenFileNum * screenSquareUnit}px`,
                height: `${screenScreenRankNum * screenSquareUnit}px`,
                backgroundColor: 'olivedrab',
            }"
        ></div>
    </div>
        
    <!-- シャーシ。画面部分の矩形は切り抜き -->
    <div
        class="waratch2-shassis waratch2-trim-screen"
        :style="{
            ...props.hardPositionStyle,
            width: `${shassisScreenFileNum * screenSquareUnit}px`,
            height: `${shassisScreenRankNum * screenSquareUnit}px`,
        }"
    >

        <!-- ハード名 -->
        <div
            class="waratch2-name-area"
            :style="{
                left: `${screenMarginLeftFileNum * screenSquareUnit - shassisBorderThickness}px`,   // ボーダー幅を引いている
                top: `${(screenMarginTopRankNum + screenScreenRankNum) * screenSquareUnit - shassisBorderThickness}px`,
                width: `${screenScreenFileNum * screenSquareUnit}px`,
                height: `${hardNameLineHeight}px`,
            }"
        ><span class="waratch2-name-1">Waratch2</span></div>
        

        <!-- TODO: ゲーム画面を入れたい -->
        <slot></slot>
    </div>


    <!-- クリック可能部分 -->
    <div
        class="waratch2-surface waratch2-clickable"
        :style="{
            ...props.hardPositionStyle,
            width: `${shassisScreenFileNum * screenSquareUnit}px`,
            height: `${shassisScreenRankNum * screenSquareUnit}px`
        }"
    >
        <!-- ボタン配置 -->
        <div
            class="waratch2-buttons-area"
            :style="{
                top: `${(screenMarginTopRankNum + screenScreenRankNum) * screenSquareUnit + hardNameLineHeight + 8}px`, // 8 は画面とボタンの隙間
                width: `${15 * controllerSquareUnit}px`,
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
                v-tooltip="'自機を上へ、像を逆向きへ動かすぜ！'"
            >↑</v-btn>

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
                v-tooltip="'自機を左へ、像を逆向きへ動かすぜ！'"
            >←</v-btn>

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
                v-tooltip="'自機を右へ、像を逆向きへ動かすぜ！'"
            >→</v-btn>

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
                v-tooltip="'自機を下へ、像を逆向きへ動かすぜ！'"
            >↓</v-btn>

            <!-- スペース・キー -->
            <v-btn
                class="waratch2-button"
                :style="{
                    top: `${1 * controllerSquareUnit}px`,
                    left: `${4.5 * controllerSquareUnit}px`,
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
                v-tooltip="'自機、印字の位置を最初に有ったところに戻すぜ。'"
            >（スペース）</v-btn>

        </div>
    </div>

    <!-- ゲームマシンの枠、および画面に落ちる影。
        マスクでドロップシャドウを切り抜かれないようにするため、ゲームマシンの外に出します。
    -->
    <div
        class="waratch2-surface"
        :style="{
            ...props.hardPositionStyle,
            width: `${shassisScreenFileNum * screenSquareUnit}px`,
            height: `${shassisScreenRankNum * screenSquareUnit}px`,
        }"
    >
        <div
            class="waratch2-screen-frame"
            :style="{
                left: `${1 * screenSquareUnit - 4}px`,   // ボーダー幅を引く
                top: `${1 * screenSquareUnit - 4}px`,
                width: `${3 * screenSquareUnit + 3}px`, // FIXME: なんや分からん+3
                height: `${3 * screenSquareUnit + 24 + 2}px`,   // FIXME: なんや分からん+24+2
            }"
        ></div>
    </div>

    <p>画面の向き: {{ orientation }}</p>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, onUnmounted, ref } from 'vue';

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
    const shassisScreenFileNum: number = 5;
    const shassisScreenRankNum: number = 7;
    const screenMarginLeftFileNum: number = 1;
    const screenMarginTopRankNum: number = 1;
    const screenScreenFileNum: number = 3;
    const screenScreenRankNum: number = 3;
    const shassisBorderThickness: number = 4;
    const hardNameLineHeight: number = 24;
    const controllerSquareUnit: number = 40;

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

    let orientation = ref<string>('読込中...');

    function checkOrientation() {
        // 単純に縦横比でチェック。正方形なら縦とする。
        orientation.value = window.innerWidth <= window.innerHeight ? '縦（Portrait）' : '横（Landscape）';

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
    }

</script>

<style scoped>

    @import '@/styles/game-machine-waratch2.css';

</style>
