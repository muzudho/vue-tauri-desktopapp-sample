<template>
    <the-header/>

    <h3>スタイルの書き方を決めておこうぜの章だぜ！</h3>
    <section class="sec-3">
        <p>例えば、青い枠を描くとき：</p>
        <div
            style="
                width: 100px;
                height: 100px;
                background-color: blue;
            ">
        </div>
        <pre
            style="
                border:dashed 4px gray;
                padding: 8px;
            "
        >
&ltdiv
    style="
        width: 100px;
        height: 100px;
        background-color: blue;
    "&gt;
&lt/div&gt;
        </pre>
        <p>👆　上記のように書くことができる。これがインライン・スタイル。</p>
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
