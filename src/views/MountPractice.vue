<template>
    <div>
        <h1>onMounted を使う練習だぜ！</h1>

        <h2>ファイルの内容:</h2>
        <p>{{ fileContent }}</p>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

        <router-link to="/">ホームに戻る</router-link>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    //import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
    import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

    // ファイルの内容を保持する reactive 変数
    const fileContent = ref<string>('読み込み中...');
    const errorMessage = ref<string>('');

    // コンポーネントがマウントされたときに実行
    onMounted(async () => {
        try {
            // Tauri の API で src/assets/sample.txt を読み込む
            const content = await readTextFile('assets/sample.txt', {
                dir: BaseDirectory.App,
            });
            fileContent.value = content; // ファイル内容をセット
        } catch (error) {
            errorMessage.value = `エラーだぜ: ${error}`; // エラーハンドリング
        }
    });
</script>