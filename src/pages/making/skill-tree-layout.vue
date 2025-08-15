<template>
    <the-header/>

    <h3>説明を始める前に、スキル・ツリーのレイアウトを決めておこうぜ！</h3>
    <section
        class="sec-3"
        :style="`height: ${8 * cellHeight}px;`"
        style="position: relative;">
        <div style="position: absolute;">
            凡例だぜ（＾▽＾）！

            <div
                class="rectangle d-flex align-center justify-center"
                :style="`left: ${0 * cellWidth}px; top: ${1 * cellHeight}px; width: ${8 * cellWidth}px; height: ${2 * cellHeight}px;`"
                style="position:absolute; border:solid 4px brown;">
                初期スキル
            </div>

            <Arrow
                :x1="0"
                :y1="2 * cellHeight"
                :x2="150"
                :y2="100"
                :stroke-width="8"
                color="blue"/>

            <Arrow
                :x1="0"
                :y1="100"
                :x2="150"
                :y2="200"
                :stroke-width="8"
                color="blue"/>
        </div>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import Arrow from '../../components/Arrow.vue'; // Tauri だと明示的にインポートを指定する必要がある。
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';


    // ##############
    // # 共有データ #
    // ##############

    const cellWidth = 32;
    const cellHeight = 32;

</script>
