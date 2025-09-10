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

        <!-- 自分自身のページへ飛んでも、キャッシュが働いて画面は更新されない。 -->
        <router-link
            to="/experimental?page=101">/experimental?page=101</router-link><br/>
        <router-link
            to="/experimental?page=102">/experimental?page=102</router-link><br/>
        <router-link
            to="/experimental?page=103">/experimental?page=103</router-link><br/>
        test={{ test }}<br/>
        page={{ page }}<br/>
        
        <section class="sec-2">
            <!--
                :key="page" は、自分自身のページに飛んだ時にクエリーパラメーター page が変わっていたら、キャッシュをクリアーして画面更新するために付けている。
            -->
            <component
                :is="selectedComponent"
                :is-standalone="true"
                :key="page"
                v-if="selectedComponent"
            />
        </section>
    </div>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed } from 'vue';
    // defineAsyncComponent
    import { useRoute } from 'vue-router';

    import { pageMap } from './page-map';

    // ############
    // # ルーチン #
    // ############

    const route = useRoute();
    const page = computed(()=>{ // クエリー・パラメーター
        // Nuxt 3（Vue Router）のuseRoute().queryは、クエリパラメータをRecord<string, string | LocationQueryValue[]>として返す。
        const queryPage = route.query.page || '';

        // 型ガードでstringに絞り込み
        return typeof queryPage === 'string' ? queryPage : '';
    });
    const test = "あああ";

    // // import 文のパスは Vite が静的解析するので変数は使えない。そこでマップ形式で予め持っておく。
    // const componentMap : Record<string, any> = {
    //     '101': defineAsyncComponent(() => import('@/pages/blog/2025-08/09-sat-sample.vue')),
    //     '102': defineAsyncComponent(() => import('@/pages/blog/2025-08/10-sun-sample.vue')),
    //     '103': defineAsyncComponent(() => import('@/pages/blog/2025-08/11-mon-sample.vue'))
    // };

    const selectedComponent = computed(() => {  // 動的にコンポーネントを選択
        if (page.value in pageMap) {
            return pageMap[page.value];
        }

        // if (page.value in componentMap) {
        //     return componentMap[page.value];
        // }

        return null;
    });

</script>

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
