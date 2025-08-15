<template>
    <div :style="`left: ${props.x1}px; top: ${props.y1}px; width: ${svgWidth}px; height: ${svgHeight}px;`" style="position: absolute; background-color: red;">
        <svg :width="svgWidth" :height="svgHeight" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
            <path :d="generateArrowPath()" :stroke="color" :stroke-width="strokeWidth" fill="none"/>
        </svg>
    </div>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############
    
    import { computed } from 'vue';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################

    interface Props {
        x1: number;             // 始点のX座標
        y1: number;             // 始点のY座標
        x2: number;             // 終点のX座標
        y2: number;             // 終点のY座標
        strokeWidth: number;    // 線の太さ
        color: string;          // 線の色
    }
    // デフォルト値を設定
    const props = withDefaults(defineProps<Props>(), {
        x1: 0,              // 始点のX座標
        y1: 0,              // 始点のY座標
        x2: 128,            // 終点のX座標
        y2: 128,            // 終点のY座標
        strokeWidth: 4,     // 線の太さ
        color: 'black',     // 線の色
    });


    // ############################
    // # このコンポーネントの画面 #
    // ############################

    // SVGのキャンバスサイズを動的に計算（線の太さがあるので、余白を確保）
    const svgWidth = computed(() => {
        return Math.max(props.x1, props.x2) + 50;
    });

    const svgHeight = computed(() => {
        return Math.max(props.y1, props.y2) + 50;
    });

    function generateArrowPath() : string {
        const { x1, y1, x2, y2 } = props;

        // 矢印の長さを計算
        //const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        // 矢印の先端のサイズ（線の太さに比例）
        const arrowSize = props.strokeWidth * 4;

        // 矢印の角度を計算
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // 矢印の先端の2つの点
        const arrowPoint1 = {
            x: x2 - arrowSize * Math.cos(angle - Math.PI / 6),
            y: y2 - arrowSize * Math.sin(angle - Math.PI / 6),
        };
        const arrowPoint2 = {
            x: x2 - arrowSize * Math.cos(angle + Math.PI / 6),
            y: y2 - arrowSize * Math.sin(angle + Math.PI / 6),
        };

        // SVGパスを生成
        return `
            M${x1},${y1} L${x2},${y2}
            M${x2},${y2} L${arrowPoint1.x},${arrowPoint1.y}
            M${x2},${y2} L${arrowPoint2.x},${arrowPoint2.y}
        `;
    }

</script>
