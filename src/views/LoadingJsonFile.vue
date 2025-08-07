<template>
    <div>
        <h1>JSONファイルの読込</h1>
        <p>{{ jsonStr }}</p>
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

    const jsonStr = ref("読み込み中...");

    // ##############
    // # 起動時処理 #
    // ##############

    onMounted(async () => {
        try {
            const response = await fetch("/sample.json");   // Tauriでは、publicフォルダに置いたファイルにアクセスできる。
            if (!response.ok) throw new Error("Failed to fetch JSON");
            const data: any = await response.json();

            jsonStr.value = JSON.stringify(data, null, 4);

        } catch (error) {
            alert(`ERROR: sample.jsonファイル読込時。 ${error}`);
        }
    });

</script>
