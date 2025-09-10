<template>
    <div
        style="
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            position: fixed;
            background-color: #FF66CC;
        "
    >

        <div
            style="
                position: relative;
                left: 60px;
                right: 0;
                height: 100px;
                background-color: skyblue;
                border-top-left-radius: 30px;
                border-bottom-left-radius: 30px;
            "
        >
        </div>

        <h1 class="heading-1-bar mb-6">実験場</h1>

        <h2>ダイナミック・インポート</h2>

        <router-link
            class="mb-6"
            to="/making/experimental?page=101">/making/experimental?page=101</router-link>
        
        <section class="sec-2">
            <component
                :is="selectedComponent"
                :is-standalone="true"
                v-if="selectedComponent"
            />
        </section>
    </div>

    
</template>

<script setup lang="ts">
    import { computed, defineAsyncComponent } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const page = route.query.page;

    // 動的にコンポーネントを選択
    const selectedComponent = computed(() => {
        if (page === '101') return defineAsyncComponent(() => import('@/pages/blog/2025-08/09-sat-sample.vue'));
        if (page === '102') return defineAsyncComponent(() => import('@/pages/blog/2025-08/10-sun-sample.vue'));
        return null;
    });</script>

<style lang="css" scoped>
    /* ヘッダーの先頭に # のアイコンを付ける */
    h1::before {
        content: "";            /* 指定しないと、画像も表示されない */
        display:inline-block;
        width: 64px;            /* 切り抜く画像のサイズ */
        height: 48px;
        zoom:0.5;               /* なんか２倍角なので、目視確認で合わせる。 font-size: xx-large; だから？ */
        background-image: var(--myapplication-img-six-sharps, url('/img/application/six-sharps-light-white.png'));
        background-position: -160px 0;
    }

    h1.heading-1-bar {
        position: relative;
        left: 60px;
        right: 0;
        height: 50px;
        padding-left: 20px;
        line-height: 40px;  /* 目視確認で日本語のベースラインの位置調整 */
        font-size: xx-large;
        color: darkorchid;
        background-color: skyblue;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        /*
        color: rgb(var(--v-theme-text-dark));
        color: skyblue;
        background-color: white;
         */
    }
</style>
