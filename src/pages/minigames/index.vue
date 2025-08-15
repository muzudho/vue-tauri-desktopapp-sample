<template>
    <the-grand-parent-header/>

    <h2>ミニゲームの章だぜ！</h2>
    <section class="sec-2">
        ミニゲームだぜ（＾▽＾）！<v-btn style="visibility: hidden;"></v-btn><br/>
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->

        <ul>
            <li>📖 <router-link to="/minigames/shooting-star" :style="getLinkHighlight('/minigames/shooting-star')">一瞬流れる星に狙いを付けろだぜ！</router-link></li>
        </ul>
    </section>

    <the-grand-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheGrandParentFooter from '../../the-footer.vue';
    import TheGrandParentHeader from '../../the-header.vue';


    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getLinkHighlight } from '../../composables/link-highlight';

</script>
