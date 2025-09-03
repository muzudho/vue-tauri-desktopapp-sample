<template>
    <the-header/>

    <h3>上下左右に移動しようぜ！</h3>
    <section class="sec-3">
        <p>カーソルキーでオブジェクトが動いてしまっていることがあるから、そのときはスペースキーを押して元の位置に戻してくれだぜ（＾▽＾）！</p>
        <br/>

        <talk-balloon
            :src="commonKifuwaranyanSrc"
            :alt="commonKifuwaranyanAlt"
            :name="commonKifuwaranyanName"
            :device="compatibleDevice1Ref?.device">
            お父んに変わって、わたしが説明するぜ。<br/>
            <br/>
            この記事では、ゲームパッドの十字キーを使って動かせるオブジェクトをいろいろ並べていくぜ。
        </talk-balloon>
    </section>

    <input-axis-target-scroll-moveaway-1/><br/>

    <section class="sec-3">
        <talk-balloon
            :src="commonKifuwaranyanSrc"
            :alt="commonKifuwaranyanAlt"
            :name="commonKifuwaranyanName"
            :device="compatibleDevice1Ref?.device">
            おっと、動かしたあとは［スペース・キー］を押して、オブジェクトを元の位置に戻してくれだぜ。<br/>
            <br/>
            ［遠ざかる］というのは、［十字キー］を押しっぱにしたらどこまでも行ってしまうということだぜ。<br/>
            <br/>
            スクロールというのは、数ドットずつ動くことだぜ。<br/>
        </talk-balloon>
        <br/>
    </section>

    
    <input-axis-rpg-walk-player-scroll-moveaway-1/><br/>
    <input-axis-rpg-walk-player-scroll-moveaway-grid-1/><br/>
    <input-axis-rpg-walk-player-scroll-bounded-1/><br/>
    <input-axis-rpg-walk-board-scroll-moveaway-grid-1/><br/>
    <input-axis-rpg-walk-printing-shift-primordial-1/><br/>
    <input-axis-rpg-walk-printing-shift-boundary-1/><br/>
    <input-axis-rpg-walk-printing-shift-loop-1/><br/>
    <input-axis-rpg-walk-printing-shift-contents-size-variable-1/><br/>
    <input-axis-rpg-walk-board-wraparound-scroll-loop-1/><br/>
    <input-axis-rpg-walk-board-wraparound-scroll-and-printing-loop-1/><br/>
    <input-axis-rpg-walk-board-wraparound-scroll-and-printing-primordial-and-player-boundary-1/><br/>
    <input-axis-rpg-walk-using-background-image-1/><br/>

    <br/>
    <h3><span class="parent-header">上下左右に移動しようぜ！　＞　</span>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../components/SourceLink.vue';
    import InputAxisRpgWalkUsingBackgroundImage1 from './input-axis-rpg-walk-using-background-image-1.vue';
    import InputAxisRpgWalkBoardScrollMoveawayGrid1 from './input-axis/rpg-walk-board-scroll-moveaway-grid-1.vue';
    import InputAxisRpgWalkBoardWraparoundScrollAndPrintingPrimordialAndPlayerBoundary1 from './input-axis-rpg-walk-board-wraparound-scroll-and-printing-primordial-and-player-boundary-1.vue';
    import InputAxisRpgWalkBoardWraparoundScrollLoop1 from './input-axis-rpg-walk-board-wraparound-scroll-loop-1.vue';
    import InputAxisRpgWalkBoardWraparoundScrollAndPrintingLoop1 from './input-axis-rpg-walk-board-wraparound-scroll-and-printing-loop-1.vue';
    import InputAxisRpgWalkPlayerScrollBounded1 from './input-axis/rpg-walk-player-scroll-bounded-1.vue';
    import InputAxisRpgWalkPlayerScrollMoveaway1 from './input-axis/rpg-walk-player-scroll-moveaway-1.vue';
    import InputAxisRpgWalkPlayerScrollMoveawayGrid1 from './input-axis/rpg-walk-player-scroll-moveaway-grid-1.vue';
    import InputAxisRpgWalkPrintingShiftPrimordial1 from './input-axis-rpg-walk-printing-shift-primordial-1.vue';
    import InputAxisRpgWalkPrintingShiftBoundary1 from './input-axis-rpg-walk-printing-shift-boundary-1.vue';
    import InputAxisRpgWalkPrintingShiftContentsSizeVariable1 from './input-axis-rpg-walk-printing-shift-contents-size-variable-1.vue';
    import InputAxisRpgWalkPrintingShiftLoop1 from './input-axis-rpg-walk-printing-shift-loop-1.vue';
    import InputAxisTargetScrollMoveaway1 from './input-axis/target-scroll-moveaway-1.vue';
    import TalkBalloon from '../../components/TalkBalloon.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

    // ++++++++++++++++++++++++++++++++++
    // + コンポーネント　＞　互換性対応 +
    // ++++++++++++++++++++++++++++++++++

    import CompatibleDevice from '@/components/CompatibleDevice.vue'


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    

    import commonKifuwaranyanSrc from "@/assets/img/talk/202506__character__01-2013-kifuwarabe-o1o1o0.png";
    const commonKifuwaranyanAlt = "きふわらべ";
    const commonKifuwaranyanName = "きふわらべ";


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　装置の互換性 +
    // ++++++++++++++++++++++++++++++++++

    const compatibleDevice1Ref = ref<InstanceType<typeof CompatibleDevice> | null>(null);

</script>

<style scoped>

    @import '../../styles/talk-scene.css';

</style>
