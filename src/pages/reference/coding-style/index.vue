<template>
    <the-app-header/>
    <the-part-header/>

    <h2>リファレンスの部だぜ！</h2>
    <section class="sec-2">
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->
        <v-btn style="visibility: hidden;"></v-btn><br/>
    </section>

    <h3>コーディング・スタイルの章だぜ！</h3>
    <section class="sec-3">
        コーディングの練習だぜ（＾▽＾）！
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->
        <v-btn style="visibility: hidden;"></v-btn><br/>

        <ul>
            <li>📖 <router-link to="/reference/coding-style/inline-style" :style="getPreviousLinkHighlight('/reference/coding-style/inline-style')">インライン・スタイルの書き方を決めておこうぜの章だぜ！</router-link></li>
            <li>📖 <router-link to="/reference/coding-style/slot" :style="getPreviousLinkHighlight('/reference/coding-style/slot')">スロットの書き方を決めておこうぜの章だぜ！</router-link></li>
        </ul>
    </section>

    <the-part-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheAppHeader from '../../../the-header.vue';
    import ThePartFooter from '../../the-footer.vue';
    import ThePartHeader from '../../the-header.vue';


    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getPreviousLinkHighlight } from '../../../composables/link-highlight';

</script>
