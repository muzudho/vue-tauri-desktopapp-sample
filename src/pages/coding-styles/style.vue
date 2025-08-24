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

        <div class="blue-rectangle-1">
        </div>
        <br/>

        📄 example.vue ：<br/>
        <pre class="coding-example">
&lt;template&gt;
    &lt;div <span class="em">class="blue-rectangle-1"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
    <span class="em">div.blue-rectangle-1 {    /* 青い長方形１ */
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

        <p>スタイルシートの中では、TypeScript の変数を使うこともできるとされている：</p>
        <br/>

        <div class="blue-rectangle-2">
        </div>
        <br/>

        📄 example.vue ：<br/>
        <pre class="coding-example">
&lt;template&gt;
    &lt;div <span class="em">class="blue-rectangle-2"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
    <span class="em">const apple: number = 250;</span>
&lt;/script&gt;

&lt;style scoped&gt;
    div.blue-rectangle-2 {    /* 青い長方形２ */
        width: <span class="em">v-bind(apple)</span>px;
        height: 100px;
        background-color: blue;
    }
&lt;/style&gt;
        </pre>
        <p>
            👆　しかし、その設定が無視されることがある。手元の環境で動作が確実になるまで、使わない方針。<br/>
        </p>
        <br/>

        <p>スタイルの中で TypeScript の変数を使いたくなったときは：</p>
        <br/>

        <div
            :style="`
                width: ${apple}px;
                height: 100px;
                background-color: blue;
            `">
        </div>
        <br/>

        📄 example.vue ：<br/>
        <pre class="coding-example">
&lt;template&gt;
    &lt;div
        <span class="em">:style="`
            width: ${apple}px;
            height: 100px;
            background-color: blue;
        `"</span>&gt;
    &lt;/div&gt;
&lt;/template&gt;
        </pre>
        <p>
            👆　インライン・スタイルで書くことができる。<br/>
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


    // ########
    // # 変数 #
    // ########

    const apple: number = 250;

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

    div.blue-rectangle-1 {    /* 青い長方形１ */
        width: 200px;
        height: 100px;
        background-color: blue;
    }

    div.blue-rectangle-2 {    /* 青い長方形２ */
        width: v-bind(apple)px;
        height: 100px;
        background-color: blue;
    }
</style>
