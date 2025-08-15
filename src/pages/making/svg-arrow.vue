<template>
    <the-header/>

    <h3>矢印を描こうぜ！</h3>
    <section
        class="sec-3"
        :style="`height: ${8 * cellHeight}px;`"
        style="position: relative;">
        <div style="position: absolute;">
            凡例だぜ（＾▽＾）！

            <br/>
            <v-checkbox
                v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
                :key="index"
                v-model="hitboxCheckboxes"
                :value="`${index}`"
                :label="`矢印${index}の当たり判定`"
                density="compact"
                style="display: inline-block; color: blue;"></v-checkbox>

            <div
                v-for="index in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]" :key="index"
                :style="hitboxPositions[index] + ' ' +  hitboxStyles[index]"
                style="position: absolute; border: solid 4px lightgray;">{{ index }}</div>

            <Arrow
                :startX="10 * cellWidth"
                :startY="10 * cellHeight"
                :width="0 * cellWidth"
                :height="-5 * cellHeight"
                :stroke-width="8"
                color="#ff0000"/>

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

        </div>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref, watch } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import Arrow from '../../components/Arrow.vue'; // Tauri だと明示的にインポートを指定する必要がある。
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';


    // ##############
    // # 共有データ #
    // ##############

    // 盤データ
    const cellWidth = 32;
    const cellHeight = 32;

    // 当たり判定
    const startX = 5;
    const startY = 5;
    const hitboxCheckboxes = ref<string[]>([]);
    const hitboxStyles = ref<string[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    const hitboxPositions : string[] = [
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  0   + startY + 0  ) * cellHeight}px; width: ${(0   + 1  ) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 0
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  0   + startY + 0  ) * cellHeight}px; width: ${(2.5 + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 1
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  0   + startY + 0  ) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 2
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  2.5 + startY + 0  ) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(2.5 + 0.5) * cellHeight}px;`,    // 3
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(0   + 1  ) * cellHeight}px;`,    // 4
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(2.5 + 0.5) * cellHeight}px;`,    // 5
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 6
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(2.5 + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 7
        `left: ${( 5   + startX - 0.5) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(0   + 1  ) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 8
        `left: ${( 2.5 + startX      ) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(2.5 + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 9
        `left: ${( 0   + startX      ) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 10
        `left: ${( 0   + startX      ) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(2.5 + 0.5) * cellHeight}px;`,    // 11
        `left: ${( 0   + startX      ) * cellWidth}px; top: ${(  5   + startY - 0.5) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(0   + 1  ) * cellHeight}px;`,    // 12
        `left: ${( 0   + startX      ) * cellWidth}px; top: ${(  2.5 + startY + 0  ) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(2.5 + 0.5) * cellHeight}px;`,    // 13
        `left: ${( 0   + startX      ) * cellWidth}px; top: ${(  0   + startY + 0  ) * cellHeight}px; width: ${(5   + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 14
        `left: ${( 2.5 + startX      ) * cellWidth}px; top: ${(  0   + startY + 0  ) * cellHeight}px; width: ${(2.5 + 0.5) * cellWidth}px; height: ${(5   + 0.5) * cellHeight}px;`,    // 15
    ];
    watch(hitboxCheckboxes, (newValue:string[]) => {
        console.log(`newValue: ${newValue}`);

        for (let i = 0; i < hitboxPositions.length; i++) {
            if (newValue.includes(`${i}`)) {
                hitboxStyles.value[i] = `visibility: visible;`;
            } else {
                hitboxStyles.value[i] = "visibility: hidden;";
            }
        }
    });

</script>
