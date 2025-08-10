<template>
    <v-container>
        <h1>ウェブサイトのタイトル</h1>
        <!-- ［章］より上は［巻］＞［編］＞［部］ -->
        <h2>章（1 Chapter）の見出し</h2>
        <h3>節（2 Section）の見出し</h3>
        <h4>項（3 Paragraph）の見出し</h4>
        <h5>条（4 Article）の見出し</h5>
        <h6>段（5）の見出し</h6><!-- ５段目とか日本語に無い。条と段の順序は同じぐらい -->
        <!-- これより下は日本語に無いから、住所を参考にすると、［目］、［盤］、［号」などが考えられるか？ -->

        <br/>

        <h1>ワラベンチャー</h1>
        <section class="sec-1">
            ワラベンチャーの地の文だぜ（＾▽＾）！
        </section>

        <h2>１章</h2>
        <section class="sec-2">
            １章の本文だぜ（＾▽＾）！
        </section>

        <h3>１．１節</h3>
        <section class="sec-3">
            １．１節の本文だぜ（＾▽＾）！
        </section>

        <h4>１．１．１項</h4>
        <section class="sec-4">
            １．１．１項の本文だぜ（＾▽＾）！
        </section>

        <h5>１．１．１．１条</h5>
        <section class="sec-5">
            １．１．１．１条の本文だぜ（＾▽＾）！
        </section>

        <h6>１．１．１．１．１段</h6>
        <section class="sec-6">
            １．１．１．１．１段の本文だぜ（＾▽＾）！
        </section>

    </v-container>
    <hr/>
    <router-link to="/making">メイキングに戻る</router-link>
</template>
