<template>
    <the-header/>

    <h3>スプライト　＞　ルーチン</h3>
    <section class="sec-3">
        <p>スプライトに一定の動きをさせるぜ（＾▽＾）</p>
        <br/>
        <p>ここに切り抜いたタイルを表示：</p>
        <Tile
                :srcLeft="0"
                :srcTop="0"
                :srcWidth="32"
                :srcHeight="64"
                :tilemapUrl="'/img/making/sprite-objects-001.png'" /><br/>
        ：ここまで。<br/>
        <br/>
        元画像のタイルマップを表示：<br/>
        <v-img src="/img/making/sprite-objects-001.png" style="width:128px; height:128px;"/>
        ：ここまで。
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

    import Tile from '../../components/Tile.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

</script>
