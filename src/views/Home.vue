<template>
    <h2>ホームの章だぜ！</h2>
    <section class="sec-2">
        デスクトップ・アプリケーションのホームページだぜ（＾▽＾）！<br/>
    </section>

    <h3>ホームページ内容の割合</h3>
    <v-card elevation="2" class="pa-4">
        <canvas id="pieChart"></canvas>
    </v-card>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { onMounted } from 'vue';
    import { Chart } from 'chart.js/auto';
    import { useRouter } from 'vue-router';

    // ##############
    // # 共有データ #
    // ##############

    const router = useRouter();

    // SPA用のルートパス
    const routes = [
        "/",                            // ホームのURL
        "/making",                      // メイキングのURL
        "/about",                       // アバウトのURL
        "/welcome-to-tauri-and-view"    // Tauri のウェルカムページ
    ];

    // ############
    // # 開始処理 #
    // ############

    onMounted(() => {
        initChart();
    });

    function initChart() {
        //const baseUrl = window.location.origin;
        //alert(`baseUrl=${baseUrl}`);
        const ctx : HTMLCanvasElement = document.getElementById('pieChart') as HTMLCanvasElement;

        if (ctx == null){
            return;
        }

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['ホーム', 'メイキング', 'アバウト', 'Tauriウェルカムページ'],
                datasets: [{
                    data: [40, 40, 15, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'ホームページ内容の割合'
                    }
                },
                onClick: (_e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        console.log(`index=${index}\nroutes.length=${routes.length}\nroutes[0]=${routes[0]}\nroutes[1]=${routes[1]}\nroutes[2]=${routes[2]}\nroutes[3]=${routes[3]}`);
                        // Vue Routerでページ遷移
                        const path = routes[index];
                        console.log(`path=${path}`);
                        router.push(path);
                    }
                }
            }
        });
    }

    /*
    beforeUnmount() {
        if (chart) {
            chart.destroy();
        }
    }
    */

</script>

<style scoped>
    canvas {
        max-width: 400px;
        margin: 0 auto;
    }
</style>
