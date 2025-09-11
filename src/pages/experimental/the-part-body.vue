<template>
    <section class="sec-2">
        <ul>
            <li>📖 <router-link to="/experimental/page-1" :style="getPreviousLinkHighlight('/experimental/page-1')">ページ１の章だぜ！</router-link></li>
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

    import { getPreviousLinkHighlight } from '../../composables/link-highlight';

</script>
