<template>
    <the-header/>

    <h3>盤操作のデバッグだぜ！</h3>
    <section class="sec-3">
        <pre>
getFixedSquareIndexFromTileIndex(
    tileIndex,
    board1SquareWidth,
    board1SquareHeight,
    board1FileNum,
    board1RankNum,
    printing1Left,
    printing1Top,
)</pre>
        = {{ 
            getFixedSquareIndexFromTileIndex(
                tileIndex,
                board1SquareWidth,
                board1SquareHeight,
                board1FileNum,
                board1RankNum,
                printing1Left,
                printing1Top,
            )
        }}


    </section>

    <br/>
    <h3>ソースコード</h3>
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
    // 👆 ［初級者向けのソースコード］では、 reactive は使いません。

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../components/SourceLink.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getFixedSquareIndexFromTileIndex } from '../../composables/board-operation';


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　テストデータ +
    // ++++++++++++++++++++++++++++++++++

    const tileIndex = 18;

    // ++++++++++++++++++++++++
    // + オブジェクト　＞　盤 +
    // ++++++++++++++++++++++++

    const board1SquareWidth = 32;
    const board1SquareHeight = 32;
    const board1FileNum = ref<number>(9);   // 筋の数。ただし、右側と下側に１マス余分に付いているマスクは含まない。
    const board1RankNum = ref<number>(9);   // 段の数

    // ++++++++++++++++++++++++++
    // + オブジェクト　＞　印字 +
    // ++++++++++++++++++++++++**
    //
    // 盤上に表示される数字柄、絵柄など。
    //

    // のちのち自機を１ドットずつ動かすことを考えると、 File, Rank ではデジタルになってしまうので、 Left, Top で指定したい。
    const printing1Left = ref<number>(0);
    const printing1Top = ref<number>(0);

</script>
