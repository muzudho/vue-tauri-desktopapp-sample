<template>
    <the-header/>

    <h3>スタイルの書き方を決めておこうぜの章だぜ！</h3>
    <section class="sec-3">
        <p>
            使っているのは Vue3 と Vuetify3。<br/>
            <br/>
            例えば、青い長方形を描くとき：
        </p>
        <br/>

        <div
            style="
                width: 200px;
                height: 100px;
                background-color: blue;
            ">
        </div>
        <br/>

        📄 example.vue ：<br/>
        <pre class="coding-example">
&lt;template&gt;
    &lt;div
        style=<span class="em">"
            width: 100px;
            height: 200px;
            background-color: blue;
        "</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;
        </pre>
        <p>
            👆　上記のように書くことができる。これがインライン・スタイル。<br/>
            インラインは本当は１行に書くことだが、細かいことは気にしない。<br/>

        </p>
        <br/>

        <p>以下のようにも書ける：</p>
        <br/>

        <div class="blue-rectangle">
        </div>
        <br/>

        📄 example.vue ：<br/>
        <pre class="coding-example">
&lt;template&gt;
    &lt;div <span class="em">class="blue-rectangle"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
    <span class="em">div.blue-rectangle {    /* 青い長方形 */
        width: 200px;
        height: 100px;
        background-color: blue;
    }</span>
&lt;/style&gt;
        </pre>
        <p>
            👆　これはスタイルシートを使った書き方。<br/>
        </p>
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
    pre.coding-example {    /* ソースコード例 */
        display: inline-block;
        border: dashed 4px gray;
        background-color: #f0f0f0;
        padding-left: 24px;
        padding-top: 16px;
        padding-right: 24px;
    }

    span.em {   /* 強調 */
        color: brown;
        font-weight: bolder;
    }

    div.blue-rectangle {    /* 青い長方形 */
        width: 200px;
        height: 100px;
        background-color: blue;
    }
</style>
