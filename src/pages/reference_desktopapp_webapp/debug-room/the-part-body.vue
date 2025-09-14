<template>
    <section class="sec-0 sec-contents">
        <ul>
            <li>📖 <router-link to="/reference_desktopapp_webapp/debug-room/board-operation" :class="getLinkHighlight('/reference_desktopapp_webapp/debug-room/board-operation')">盤操作のデバッグの章だぜ！</router-link></li>
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

    import { getLinkHighlight } from '../../../composables/link-highlight';

</script>
