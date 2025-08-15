<template>
    <div :style="`left: ${getLeft()}px; top: ${getTop()}px; width: ${svgWidth}px; height: ${svgHeight}px;`" style="position: absolute; border: dashed 1px gray;">
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
        startX: number;             // 始点のX座標
        startY: number;             // 始点のY座標
        width: number;          // X方向の長さ
        height: number;         // Y方向の長さ
        strokeWidth: number;    // 線の太さ
        color: string;          // 線の色
    }
    // デフォルト値を設定
    const props = withDefaults(defineProps<Props>(), {
        startX: 0,              // 始点のX座標
        startY: 0,              // 始点のY座標
        width: 32,         // 終点のX座標
        height: 32,        // 終点のY座標
        strokeWidth: 4,     // 線の太さ
        color: 'black',     // 線の色
    });


    // ############################
    // # このコンポーネントの画面 #
    // ############################

    function getTop() : number {
        return Math.min(props.startY, props.startY + props.height);
    }
    // function getRight() : number {
    //     return Math.max(props.startX, props.startX + props.width);
    // }
    // function getBottom() : number {
    //     return Math.max(props.startY, props.startY + props.height);
    // }
    function getLeft() : number {
        return Math.min(props.startX, props.startX + props.width);
    }

    const arrowHeadWidth = ref(0);
    const arrowHeadHeight = ref(0);

    // SVGのキャンバスサイズを動的に計算（線の太さがあるので、余白を確保）
    const svgWidth = computed(() => {
        const left = Math.min(props.startX, props.startX + props.width);
        const right = Math.max(props.startX, props.startX + props.width);
        return (right - left) + arrowHeadWidth.value;
    });

    const svgHeight = computed(() => {
        const top = Math.min(props.startY, props.startY + props.height);
        const bottom = Math.max(props.startY, props.startY + props.height);
        return (bottom - top) + arrowHeadHeight.value;
    });

    function generateArrowPath() : string {
        const { startX, startY, width, height } = props;

        // 終点の計算
        const endX = startX + width;
        const endY = startY + height;

        const left = Math.min(startX, endX);
        const top = Math.min(startY, endY);

        // 矢印の長さを計算
        //const length = Math.sqrt(width ** 2 + height ** 2);

        // 矢印の先端のサイズ（線の太さに比例）
        const arrowSize = props.strokeWidth * 4;

        // 矢印の角度を計算
        const angle = Math.atan2(height, width);

        // 矢印の先端の2つの点
        const arrowPoint1 = {
            x: endX - arrowSize * Math.cos(angle - Math.PI / 6),
            y: endY - arrowSize * Math.sin(angle - Math.PI / 6),
        };
        const arrowPoint2 = {
            x: endX - arrowSize * Math.cos(angle + Math.PI / 6),
            y: endY - arrowSize * Math.sin(angle + Math.PI / 6),
        };

        const headMinX = Math.min(arrowPoint1.x, arrowPoint2.x);
        const headMaxX = Math.max(arrowPoint1.x, arrowPoint2.x);
        const headMinY = Math.min(arrowPoint1.y, arrowPoint2.y);
        const headMaxY = Math.max(arrowPoint1.y, arrowPoint2.y);
        arrowHeadWidth.value = headMaxX - headMinX + props.strokeWidth;
        arrowHeadHeight.value = headMaxY - headMinY + props.strokeWidth;

        const pAx = arrowHeadWidth.value / 2 + startX - left;
        const pAy = arrowHeadHeight.value / 2 + startY - top;
        const pBx = arrowHeadWidth.value / 2 + endX - left;
        const pBy = arrowHeadHeight.value / 2 + endY - top;
        const pCx = arrowHeadWidth.value / 2 + arrowPoint1.x - left;
        const pCy = arrowHeadHeight.value / 2 + arrowPoint1.y - top;
        const pDx = arrowHeadWidth.value / 2 + arrowPoint2.x - left;
        const pDy = arrowHeadHeight.value / 2 + arrowPoint2.y - top;

        // SVGパスを生成
        //
        //        D
        //         ＼
        //  A--------B
        //         ／
        //        C
        //
        return `
            M${pAx},${pAy} L${pBx},${pBy}
            M${pBx},${pBy} L${pCx},${pCy}
            M${pBx},${pBy} L${pDx},${pDy}
        `;

        /*
        // SVGパスを生成
        return `
            M${arrowHeadWidth.value / 2 + relX1},${arrowHeadHeight.value / 2 + relY1} L${arrowHeadWidth.value / 2 + pBx},${arrowHeadHeight.value / 2 + pBy}
            M${arrowHeadWidth.value / 2 + pBx},${arrowHeadHeight.value / 2 + pBy} L${arrowHeadWidth.value / 2 + arrowPoint1.x - left},${arrowHeadHeight.value / 2 + arrowPoint1.y - top}
            M${arrowHeadWidth.value / 2 + pBx},${arrowHeadHeight.value / 2 + pBy} L${arrowHeadWidth.value / 2 + arrowPoint2.x - left},${arrowHeadHeight.value / 2 + arrowPoint2.y - top}
        `;
         */
    }

</script>