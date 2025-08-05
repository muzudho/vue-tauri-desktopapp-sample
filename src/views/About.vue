<template>
    <div>
        <h1>About ページだぜ！</h1>
        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({    // Vue 3 の TypeScript 対応コンポーネント定義に必須。
        name: 'About',
    });
</script>
