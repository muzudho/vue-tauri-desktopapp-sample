<template>
    <the-section-header/>

    <h1>説明を始める前に、スキル・ツリーのレイアウトを決めておく章だぜ！</h1>
    <section
        class="sec-1"
        :style="`height: ${8 * cellHeight}px;`"
        style="position: relative;">

        <div style="position: absolute;">
            凡例だぜ（＾▽＾）！

            <div
                class="rectangle d-flex align-center justify-center"
                :style="`left: ${0 * cellWidth}px; top: ${1 * cellHeight}px; width: ${8 * cellWidth}px; height: ${2 * cellHeight}px;`"
                style="position:absolute; border:solid 4px slateblue;">
                初期スキル
            </div>

            <div
                :style="`
                    position: absolute;
                    left: ${9.5 * cellWidth}px;
                    top: ${5 * cellHeight}px;
                    width: ${1 * cellWidth}px;
                    height: ${5 * cellHeight}px;
                    border: solid 4px black;
                `"
            >

            </div>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="0 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff0000"/>

            <!--
            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="2.5 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff4000"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="5 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff8000"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="5 * cellWidth"
                :height="-2.5 * cellHeight"
                :stroke-width="8"
                color="#ffc000"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="5 * cellWidth"
                :height="0 * cellHeight"
                :stroke-width="8"
                color="#ffff00"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="5 * cellWidth"
                :height="2.5 * cellHeight"
                :stroke-width="8"
                color="#c0ff00"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="5 * cellWidth"
                :height="5 * cellHeight"
                :stroke-width="8"
                color="#80ff00"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="2.5 * cellWidth"
                :height="5 * cellHeight"
                :stroke-width="8"
                color="#40ff00"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="0 * cellWidth"
                :height="5 * cellHeight"
                :stroke-width="8"
                color="#00ff00"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-2.5 * cellWidth"
                :height="5 * cellHeight"
                :stroke-width="8"
                color="#00ff80"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-5 * cellWidth"
                :height="5 * cellHeight"
                :stroke-width="8"
                color="#00ffff"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-5 * cellWidth"
                :height="2.5 * cellHeight"
                :stroke-width="8"
                color="#0080ff"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-5 * cellWidth"
                :height="0 * cellHeight"
                :stroke-width="8"
                color="#0000ff"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-5 * cellWidth"
                :height="-2.5 * cellHeight"
                :stroke-width="8"
                color="#8000ff"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-5 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff00ff"/>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="-2.5 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff0080"/>
            -->

        </div>
    </section>

    <br/>
    <h2>ソースコード</h2>
    <section class="sec-2">
        <source-link/>
    </section>

    <the-section-footer/>
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

    import Arrow from '../../../components/Arrow.vue';
    import SourceLink from '../../../components/SourceLink.vue';

    // ++++++++++++++++++++++++++
    // + インポート　＞　ページ +
    // ++++++++++++++++++++++++++

    import TheSectionFooter from './the-section-footer.vue';
    import TheSectionHeader from './the-section-header.vue';


    // ##############
    // # 共有データ #
    // ##############

    const cellWidth = 32;
    const cellHeight = 32;

</script>
