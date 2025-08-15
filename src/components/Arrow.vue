<template>
    <div :style="`left: ${props.x1}px; top: ${props.y1}px; width: ${svgWidth}px; height: ${svgHeight}px;`" style="position: absolute; border: dashed 1px gray;">
        <svg :width="svgWidth" :height="svgHeight" :viewBox="`0 0 ${svgWidth} ${svgHeight}`">
            <path :d="generateArrowPath()" :stroke="color" :stroke-width="strokeWidth" fill="none"/>
        </svg>
    </div>
</template>

<script setup lang="ts">

    // ##############
    // # インポート #
    // ##############

    import { computed, ref } from 'vue';


    // ####################################
    // # このコンポーネントが受け取る引数 #
    // ####################################

    interface Props {
        x1: number;             // 始点のX座標
        y1: number;             // 始点のY座標
        width: number;          // X方向の長さ
        height: number;         // Y方向の長さ
        strokeWidth: number;    // 線の太さ
        color: string;          // 線の色
    }
    // デフォルト値を設定
    const props = withDefaults(defineProps<Props>(), {
        x1: 0,              // 始点のX座標
        y1: 0,              // 始点のY座標
        width: 32,         // 終点のX座標
        height: 32,        // 終点のY座標
        strokeWidth: 4,     // 線の太さ
        color: 'black',     // 線の色
    });


    // ############################
    // # このコンポーネントの画面 #
    // ############################

    const arrowHeadWidth = ref(0);
    const arrowHeadHeight = ref(0);

    const canvasMargin = Math.floor(props.strokeWidth / 2);

    // SVGのキャンバスサイズを動的に計算（線の太さがあるので、余白を確保）
    const svgWidth = computed(() => {
        const left = Math.min(props.x1, props.x1 + props.width);
        const right = Math.max(props.x1, props.x1 + props.width);
        return (right - left) + arrowHeadWidth.value;
    });

    const svgHeight = computed(() => {
        const top = Math.min(props.y1, props.y1 + props.height);
        const bottom = Math.max(props.y1, props.y1 + props.height);
        return (bottom - top) + arrowHeadHeight.value;
    });

    function generateArrowPath() : string {
        const { x1, y1, width, height } = props;
        const x2 = x1 + width;
        const y2 = y1 + height;

        const left = Math.min(x1, x2);
        const top = Math.min(y1, y2);

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

        const headMinX = Math.min(arrowPoint1.x, arrowPoint2.x);
        const headMaxX = Math.max(arrowPoint1.x, arrowPoint2.x);
        const headMinY = Math.min(arrowPoint1.y, arrowPoint2.y);
        const headMaxY = Math.max(arrowPoint1.y, arrowPoint2.y);
        arrowHeadWidth.value = headMaxX - headMinX;
        arrowHeadHeight.value = headMaxY - headMinY;

        // SVGパスを生成
        return `
            M${canvasMargin + x1 - left},${canvasMargin + y1 - top} L${canvasMargin + x2 - left},${canvasMargin + y2 - top}
            M${canvasMargin + x2 - left},${canvasMargin + y2 - top} L${canvasMargin + arrowPoint1.x - left},${canvasMargin + arrowPoint1.y - top}
            M${canvasMargin + x2 - left},${canvasMargin + y2 - top} L${canvasMargin + arrowPoint2.x - left},${canvasMargin + arrowPoint2.y - top}
        `;
    }

</script>
