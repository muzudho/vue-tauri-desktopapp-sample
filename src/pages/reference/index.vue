<template>
    <the-grand-parent-header/>
    <the-parent-header/>

    <!-- デバイス互換機能 -->
    <compatible-device ref="compatibleDevice1Ref"/>

    <h2>リファレンスの部だぜ！</h2>
    <section class="sec-2">
        <br/>

        <talk-image
            :href="reference1Png"
            alt="書庫"
        />

        <talk-balloon
            :src="kifuwarabe2Src"
            :alt="kifuwarabe2Alt"
            :name="kifuwarabe2Name"
            :device="compatibleDevice1Ref?.device">
                ここは調べものの部屋だぜ。<br/>
                面白いものは何もないぜ。用が無いなら帰った帰った！
        </talk-balloon>
    </section>

    <h3>コーディング・スタイルの章だぜ！</h3>
    <section class="sec-3">
        <br/>

        <ul>
            <li>📖 <router-link to="/reference/coding-style/inline-style" :style="getPreviousLinkHighlight('/reference/coding-style/inline-style')">インライン・スタイルの書き方を決めておこうぜの節だぜ！</router-link></li>
            <li>📖 <router-link to="/reference/coding-style/slot" :style="getPreviousLinkHighlight('/reference/coding-style/slot')">スロットの書き方を決めておこうぜの節だぜ！</router-link></li>
        </ul>
    </section>

    <the-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { ref } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import CompatibleDevice from '@/components/CompatibleDevice.vue'
    import TalkBalloon from '@/components/TalkBalloon.vue';
    import TalkImage from '@/components/TalkImage.vue';
    import TheGrandParentHeader from '../../the-header.vue';
    import TheParentFooter from '../the-footer.vue';
    import TheParentHeader from '../the-header.vue';

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getPreviousLinkHighlight } from '../../composables/link-highlight';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //

    import kifuwarabe2Src from "@/assets/img/talk/202506__character__01-2013-kifuwarabe-o1o1o0.png";
    const kifuwarabe2Alt = "きふわらべ２";
    const kifuwarabe2Name = "きふわらべ";
    import reference1Png from "@/assets/img/journal/2025-09/202509__grok__11-1719-reference-o1o0.png";


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++++++
    // + オブジェクト　＞　装置の互換性 +
    // ++++++++++++++++++++++++++++++++++

    const compatibleDevice1Ref = ref<InstanceType<typeof CompatibleDevice> | null>(null);

</script>

<style scoped>

    @import '@/styles/notebook.css';

</style>
