<template>
    <div>
        <h1>onMounted を使う練習だぜ！</h1>

        <p>{{ textVM }}</p>

        <hr/>

        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';

    // ##############
    // # 共有データ #
    // ##############

    const textVM = ref<string>('読み込み中...');
    const errorMessage = ref<string>('');

    // ##############
    // # 起動時処理 #
    // ##############

    // コンポーネントがマウントされたときに実行
    onMounted(async () => {
        try {
            textVM.value = "起動時に処理を行えるぜ（＾▽＾）！";
                  
        } catch (error) {
            errorMessage.value = `エラーだぜ: ${error}`; // エラーハンドリング
        }
    });
</script>