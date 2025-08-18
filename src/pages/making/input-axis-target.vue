<template>

    <h4>ターゲット</h4>
    <section class="sec-4">
        <p>キーボード操作方法</p>
        <ul>
            <li><span class="code-key">↑</span><span class="code-key">↓</span><span class="code-key">←</span><span class="code-key">→</span>キー　…　上下左右に動かすぜ！</li>
            <li><span class="code-key">（スペース）</span>キー　…　位置を最初の状態に戻すぜ。</li>
        </ul>
        <br/>

        <div :style="`width: ${cellWidth}px; height: ${cellHeight}px; background-color:lightpink;`">
            <!-- プレイヤー１（点線の枠） -->
            <div
                class="cursor"
                :style="p1Style"></div>
        </div>

    </section>

    <br/>
    <h4><span class="parent-header-lights-out">ターゲット　＞　</span>ソースコード</h4>
    <section class="sec-4">
        <source-link/>
    </section>

</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, onMounted, ref } from 'vue';

    // ++++++++++++++++++
    // + コンポーネント +
    // ++++++++++++++++++
    //
    // Tauri なら明示的にインポートを指定する必要がある。 Nuxt なら自動でインポートしてくれる場合がある。
    //

    import SourceLink from '../../components/SourceLink.vue';


    // ##############
    // # 共有データ #
    // ##############

    // 盤データ
    const cellWidth = 32;
    const cellHeight = 32;

    // プレイヤー１（点線の枠）
    const p1Left = ref<number>(0);      // スプライトのX座標
    const p1Top = ref<number>(0);       // スプライトのY座標
    const p1Speed = ref<number>(2);     // 移動速度
    const p1Input = <Record<string, boolean>>{  // 入力
        " ": false, ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false
    };
    const p1Style = computed(() => ({
        top: `${p1Top.value}px`,
        left: `${p1Left.value}px`,
    }));


    // ##########
    // # 開始時 #
    // ##########

    onMounted(() => {
        window.document.addEventListener('keydown', (event: KeyboardEvent) => {
            // 上下キーの場合
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                // ブラウザーのデフォルトの上下スクロール動作をキャンセル
                event.preventDefault();
            }
        });        

        startGameLoop();

        // キーボードイベント
        window.addEventListener('keydown', (e) => {
            if (p1Input.hasOwnProperty(e.key)) {
                p1Input[e.key] = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (p1Input.hasOwnProperty(e.key)) {
                p1Input[e.key] = false;
            }
        });


        // ################
        // # サブルーチン #
        // ################

        function startGameLoop() : void {
            const update = () => {

                // 位置のリセット
                if (p1Input[" "]) {
                    p1Top.value = 0;
                    p1Left.value = 0;
                }

                // 移動処理                
                if (p1Input.ArrowUp) {
                    p1Top.value -= p1Speed.value;
                }

                if (p1Input.ArrowRight) {
                    p1Left.value += p1Speed.value;
                }

                if (p1Input.ArrowDown) {
                    p1Top.value += p1Speed.value;
                }

                if (p1Input.ArrowLeft) {
                    p1Left.value -= p1Speed.value;
                }

                // 次のフレーム
                requestAnimationFrame(update);
            };

            // 初回呼び出し
            requestAnimationFrame(update);
        }

    });

</script>

<style scoped>
    div.cursor {
        position: relative; border:dashed 4px green; width:32px; height:32px;
    }
</style>
