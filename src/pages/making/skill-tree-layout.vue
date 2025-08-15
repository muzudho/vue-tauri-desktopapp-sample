<template>
    <the-header/>

    <h3>説明を始める前に、スキル・ツリーのレイアウトを決めておこうぜ！</h3>
    <section class="sec-3" style="position: relative; left: 0; top: 0; height: 256px;">
        凡例だぜ（＾▽＾）！

        <div class="d-flex align-center justify-center" style="position:absolute; border:solid 4px brown; width:256px; height:64px;">
            初期スキル
        </div>
        <Arrow
            :x1="0"
            :y1="0"
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

</script>
