<template>
    <section class="sec-0" style="border: dashed 4px gray; padding: 20px;">
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
