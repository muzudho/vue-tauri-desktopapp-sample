<template>
    <section class="sec-2">
        デバッグ部屋。<v-btn style="visibility: hidden;"></v-btn><br/>
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->

        <ul>
            <li>📖 <router-link to="/debug-room/board-operation" :style="getPreviousLinkHighlight('/debug-room/board-operation')">盤操作のデバッグの章だぜ！</router-link></li>
        </ul>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーザブル +
    // ++++++++++++++++++++++++++++++++++

    import { getPreviousLinkHighlight } from '../../composables/link-highlight';

</script>
