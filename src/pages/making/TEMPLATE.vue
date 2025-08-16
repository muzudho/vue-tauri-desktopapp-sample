<template>

    <br/>
    <h3>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri だと明示的にインポートを指定する必要がある。
    //

    import SourceLink from '../../components/SourceLink.vue';

</script>

<style scoped>
</style>
