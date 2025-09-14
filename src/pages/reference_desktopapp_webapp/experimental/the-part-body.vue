<template>
    <section class="sec-0 sec-contents">
        <ul>
            <li>📖 <router-link to="/reference_desktopapp_webapp/experimental/page-1" :class="getLinkHighlight('/reference_desktopapp_webapp/experimental/page-1')">ページ１の章だぜ！</router-link></li>
        </ul>
    </section>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーザブル +
    // ++++++++++++++++++

    import { getLinkHighlight } from '../../../composables/link-highlight';

</script>
