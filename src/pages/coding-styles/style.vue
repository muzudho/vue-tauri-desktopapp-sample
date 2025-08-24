<template>
    <the-header/>

    <h3>スタイルの書き方を決めておこうぜの章だぜ！</h3>
    <section class="sec-3">
        <p>例えば、青い枠を描くとき：</p>
        <br/>

        <div
            style="
                width: 100px;
                height: 100px;
                background-color: blue;
            ">
        </div>
        <br/>

        <pre
            style="
                display: inline-block;
                border: dashed 4px gray;
                background-color: #f0f0f0;
                padding-left: 24px;
                padding-top: 16px;
                padding-right: 24px;
            "
        >
&lt;template&gt;
    &lt;div
        style=<span style="color: brown; font-weight: bolder;">"</span>
            <span style="color: brown; font-weight: bolder;">width: 100px;</span>
            <span style="color: brown; font-weight: bolder;">height: 100px;</span>
            <span style="color: brown; font-weight: bolder;">background-color: blue;</span>
        <span style="color: brown; font-weight: bolder;">"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;
        </pre>
        <p>👆　上記のように書くことができる。これがインライン・スタイル。</p>

        <p>以下のようにも書ける：</p>
        <br/>

        <div
            class="blue-rectangle">
        </div>
        <br/>

    </section>

    <br/>
    <h3>ソースコード</h3>
    <section class="sec-3">
        <source-link/>
    </section>

    <the-footer/>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../components/SourceLink.vue';
    import TheFooter from './the-footer.vue';
    import TheHeader from './the-header.vue';

</script>

<style scoped>
    div.blue-rectangle {
        width: 100px;
        height: 100px;
        background-color: blue;
    }
</style>
