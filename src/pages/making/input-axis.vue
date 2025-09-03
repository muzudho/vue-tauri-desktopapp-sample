<template>
    <the-header/>

    <h3>上下左右に移動しようぜ！</h3>
    <section class="sec-3">
        <p>カーソルキーでオブジェクトが動いてしまっていることがあるから、そのときはスペースキーを押して元の位置に戻してくれだぜ（＾▽＾）！</p>
        <br/>
    </section>

    <input-axis-target-scroll-moveaway-1/><br/>
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
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

</script>

<style scoped>
</style>
