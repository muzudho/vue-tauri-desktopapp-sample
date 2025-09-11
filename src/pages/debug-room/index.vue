<template>
    <the-app-header/>
    <the-parent-header/>

    <h2>デバッグ・ルームだぜ！　の部　インデックス</h2>
    <section class="sec-2">
        デバッグ部屋。<v-btn style="visibility: hidden;"></v-btn><br/>
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->

        <ul>
            <li>📖 <router-link to="/debug-room/board-operation" :style="getPreviousLinkHighlight('/debug-room/board-operation')">盤操作のデバッグだぜ！</router-link></li>
        </ul>
    </section>

    <the-parent-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++

    import TheAppHeader from '../../the-app-header.vue';
    import TheParentFooter from '../the-footer.vue';
    import TheParentHeader from '../the-header.vue';


    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getPreviousLinkHighlight } from '../../composables/link-highlight';

</script>
