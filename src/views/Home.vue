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

    // ##############
    // # 共有データ #
    // ##############

    // ############
    // # 開始処理 #
    // ############

    onMounted(() => {
        initChart();
    });

    function initChart() {
        const ctx : HTMLCanvasElement = document.getElementById('pieChart') as HTMLCanvasElement;

        if (ctx == null){
            return;
        }

        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['ブログ', 'メインキング', 'ボランティア', 'ゲーム'],
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
                onClick: (e, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const urls = [
                            'https://example.com/blog',      // ブログのURL
                            'https://example.com/mainking',  // メインキングのURL
                            'https://example.com/volunteer', // ボランティアのURL
                            'https://example.com/game'       // ゲームのURL
                        ];
                        window.location.href = urls[index];
                    }
                }
            }
        });
    }

    /*
    function beforeUnmount() {
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
