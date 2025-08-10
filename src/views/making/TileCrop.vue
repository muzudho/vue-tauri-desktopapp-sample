<template>
    <the-header/>

    <h3>タイル　＞　を画像から切り抜くぜ！</h3>
    <section class="sec-3">
        ここに切り抜いたタイルを表示：<br/>
        <Tile
                srcLeft="64"
                srcTop="32"
                srcWidth="32"
                srcHeight="64"
                tilemapUrl="/img/making/tilemap_sample.png" /><br/>
        <!--
        NOTE: Tauri では上の書き方でいけるが、Nuxt では下の書き方にしないとエラーが出るようだ。
        <Tile
                :srcLeft="64"
                :srcTop="32"
                :srcWidth="32"
                :srcHeight="64"
                :tilemapUrl="'/img/making/tilemap_sample.png'" /><br/>
        -->
        ：ここまで。<br/>
        <br/>
        元画像のタイルマップを表示：<br/>
        <v-img src="/img/making/tilemap_sample.png" style="width:128px; height:128px;"/>
        ：ここまで。
    </section>
    <hr/>
    <router-link to="/making">メイキングの先頭に戻る</router-link>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import Tile from '@/components/Tile.vue';
    import TheHeader from './TheHeader.vue';

</script>
