<template>
    <h2>## スプライトの練習、まずタイルを切り抜くぜ！</h2>
    <section class="sec-2">
        TODO ここにタイル表示：
        <Tile
                :srcLeft="64"
                :srcTop="32"
                :srcWidth="32"
                :srcHeight="64"
                :tilemapUrl="'/img/tilemap_sample.png'" />
        ここまで。

    </section>
    <hr/>
    <router-link to="/making">メイキングに戻る</router-link>
</template>

<script setup lang="ts">

    //import Tile from '@/components/Tile.vue';
    import Tile from '../../components/Tile.vue';

    // ##############
    // # インポート #
    // ##############

</script>
