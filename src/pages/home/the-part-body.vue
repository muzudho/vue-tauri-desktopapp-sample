<template>
    <h1>ホームページ制作者のわたしが選ぶこのホームページで力を入れてる割合</h1>
    <section class="sec-1 pt-6">
        以下の円グラフをクリックするとそのページへ飛べるぜ（＾▽＾）！<br/>
	    <canvas id="pieChart" class="pieChartStyle"></canvas>
    </section>

    <br/>
    <section class="sec-0">
        またのお越しをお待ちしておりますだぜ（＾▽＾）！<v-btn style="visibility: hidden;"></v-btn><br/>
        <!-- 他のページと縦幅を揃えるために、何の働きもしない空ボタンを置いています。 -->
    </section>

    <!-- ホームに閉じるボタンはありません。 -->
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted, onUnmounted } from 'vue';
    import { Chart } from 'chart.js/auto';
    import { useRouter } from 'vue-router';


    // ##########
    // # コモン #
    // ##########
    //
    // よく使う設定をまとめたもの。特に不変のもの。
    //    


    // 円グラフのための、SPA用のルートパス
    const routes = [
        "/reference/making",    // メイキングのURL
        "/minigames",   // ミニゲーム
        "/about",   // ［このサイトについて］のURL
        "/welcome-to-tauri-and-vue",    // Tauri のウェルカムページ
        "/reference/coding-style",  // コーディング・スタイル
    ];


    // ################
    // # オブジェクト #
    // ################

    // ++++++++++++++++++++++++++++++
    // + オブジェクト　＞　画面遷移 +
    // ++++++++++++++++++++++++++++++

    const router = useRouter();

    // ++++++++++++++++++++++++++++++
    // + オブジェクト　＞　円グラフ +
    // ++++++++++++++++++++++++++++++

    let chart: Chart | null = null;


    function clientsideChartInit() {
        // window オブジェクトはブラウザー専用。サーバー側ではプリレンダリングできないので、マウント後に書く。
        //const baseUrl = window.location.origin;
        //alert(`baseUrl=${baseUrl}`);
        const ctx : HTMLCanvasElement = window.document.getElementById('pieChart') as HTMLCanvasElement;

        if (ctx == null){
            return;
        }

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['メイキング', 'ミニゲーム', 'このサイトについて', 'Tauriウェルカムページ', 'コーディング・スタイル'],
                datasets: [{
                    data: [40, 30, 10, 15, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(180, 80, 206, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(180, 80, 206)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)'
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {   // 凡例
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'ホームページ制作者のわたしが選ぶこのホームページで力を入れてる割合'
                    }
                },
                onClick: (_e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        // Vue Routerでページ遷移
                        const path = routes[index];
                        router.push(path);
                    }
                }
            }
        });
    }

    function destroyChart() : void {
        if (chart) {
            chart.destroy();
        }
    }


    // ##############
    // # 開始・終了 #
    // ##############

    onMounted(() => {
        clientsideChartInit();
    });

    onUnmounted(() => {
        destroyChart(); // チャートの破棄処理
    });

</script>

<style scoped>
    canvas.pieChartStyle {
        min-width: 400px;
        min-height: 400px;
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }
</style>
