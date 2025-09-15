<template>
    <label for="yearMonthSelect">Filter by Year-Month:</label>
    <select
        id="yearMonthSelect"
        v-model="selectedYearMonth"
        @change="filterByYearMonth"
    >
        <option value="">All</option>
        <option
            v-for="ym in yearMonthList"
            :key="ym"
            :value="ym"
        >
            {{ ym }}
        </option>
    </select>

    <!--
        静的インポート・動的コンポーネント
        public/blog-articles.json、
        router/page-map.ts, "src/assets/data/routes/articles.json" も編集してください（TODO: ここらへん自動生成化したい）
    -->
    <template
        v-for="pageKey in idList"
        :key="pageKey"
    >
        <blog-article :page="pageKey"/>
        <button-to-go-to-top class="sec-1 pt-6"/>
    </template>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, ref } from 'vue';

    // ++++++++++++++++++++++++++++++++++
    // + インポート　＞　コンポーネント +
    // ++++++++++++++++++++++++++++++++++

    import BlogArticle from '@/components/BlogArticle.vue';
    import ButtonToGoToTop from '@/components/ButtonToGoToTop.vue';


    // ################
    // # オブジェクト #
    // ################

    // useRuntimeConfig() は Nuxt 用。
    //console.log(`DEBUG: useRuntimeConfig().public.baseUrl=${useRuntimeConfig().public.baseUrl}`);

    interface BlogArticle { // 型定義
        id: string;
        date: string;
        category: string[];
    }

    const allArticlesJsonObj = ref<BlogArticle[]>([]);
    const idList = ref<string[]>([]); // 表示する記事のキー・リスト
    const yearMonthList = ref<string[]>([]);    // 年月リスト
    const selectedYearMonth = ref<string>('');  // 選択された年月


    // ################
    // # サブルーチン #
    // ################

    // 年月選択時のフィルタリング
    const filterByYearMonth = () => {
        idList.value = allArticlesJsonObj.value
            .filter(article => 
                !article.category.includes('System')    // カテゴリーに "System" が含まれるものは除外
                && (!selectedYearMonth.value || article.date.startsWith(selectedYearMonth.value))   // 年月で絞り込み
            )
            .map(article => article.id);    // 記事Id だけの配列にする
        console.log('Filtered:', idList.value);
    };

    // process は Node.JS専用。Tauri （ブラウザ）に process 変数は無い。
    // if (process.server) {
    //     console.log('DEBUG: サーバーサイドで実行されています');
    // } else {
    //     console.log('DEBUG: 実行しているのはサーバーサイドではありません');
    // }

    // 非同期処理を含むコードブロックには async を付ける。
    onMounted(async () => {
        // これは試し
        // try {
        //     // Vite（Tauriのビルドツール）は、public/ ディレクトリのファイルを import 文で直接インポートすることを禁止してる。
        //     // インポートしたいなら、src/ ディレクトリ下にファイルを移動（例: src/assets/data/blog-articles.json）。

        //     // プロジェクト内にある src フォルダー下のファイルを動的インポート。ただし、ファイルパスに変数は不可。
        //     const jsonData = await import('/assets/data/routes/blog-articles-array-sample.json').then(module => module.default);
        //     idList.value = Array.isArray(jsonData) ? jsonData : ['1970-01/02-fri'];   // JSONが配列であることを確認し、配列ならそのまま返す、そうでなければ、エラー時の記事２を返す
        //     //console.log('Local fetch success:', idList.value);

        // } catch (err: unknown) {
        //     const errorMessage = err instanceof Error ? err.message : String(err);
        //     console.error('Local fetch error:', errorMessage);
        //     idList.value = ['1970-01/01-thu'];    // エラー時の記事１
        // }

        // TODO: こちらがメイン
        
        try {
            // Vite（Tauriのビルドツール）は、public/ ディレクトリのファイルを import 文で直接インポートすることを禁止してる。
            // インポートしたいなら、src/ ディレクトリ下にファイルを移動（例: src/assets/data/blog-articles.json）。

            // プロジェクト内にある src フォルダー下のファイルを動的インポート。ただし、ファイルパスに変数は不可。
            const allArticlesJsonObj = await import('@/assets/data/routes/articles.json').then(module => module.default) as BlogArticle[];
            //console.log(`DEBUG: JSON.stringify(jsonData, null, 4)=${JSON.stringify(allArticlesJsonObj, null, 4)}`);

            // 記事リストからidだけ抽出
            idList.value = allArticlesJsonObj
                .filter(article => article.category.includes('Talking'))
                .map(article => article.id);
            console.log(`idList.value=${idList.value}`)

            // 記事リストから、 Date フィールドの年月（YYYY-MM）だけ抽出し、重複を排除
            yearMonthList.value = [...new Set(  // Set で重複を排除
                allArticlesJsonObj
                    .filter(article => !article.category.includes('System'))    // カテゴリーに "System" を含むものは除外
                    .map(article => article.date.slice(0, 7)) // YYYY-MM-DD -> YYYY-MM
            )].sort(); // オプション: ソート
            console.log(`yearMonthList.value=${yearMonthList.value}`)


        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error('Local fetch error:', errorMessage);
        }
    });

</script>
