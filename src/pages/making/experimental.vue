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

        <br/>
        <h1 class="heading-1-bar">実験場</h1>
    </div>    
</template>

<script setup lang="ts">
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
