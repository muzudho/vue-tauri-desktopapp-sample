<template>
    <div
        :style="`left: ${left}px; top: ${top}px; width: ${svgWidth}px; height: ${svgHeight}px; border: dashed 1px ${props.color};`"
        style="position: absolute;">
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


    // ##############
    // # 共通データ #
    // ##############

    const { startX, startY, width, height } = props;

    // 終点の計算
    const endX = startX + width;
    const endY = startY + height;

    const top = Math.min(startY, endY);
    const right = Math.max(startX, endX);
    const bottom = Math.max(startY, endY);
    const left = Math.min(startX, endX);

    // 矢印の長さを計算
    //const length = Math.sqrt(width ** 2 + height ** 2);

    // 矢じり（アローヘッド）の長さ（線の太さに比例）
    const arrowHeadSize = props.strokeWidth * 4;

    // 矢印の角度を計算
    const angle = Math.atan2(height, width);

    // 矢印の先端の2つの点
    //
    //        D
    //         ＼
    //  A--------B
    //         ／
    //        C
    //
    const arrowHeadC = {
        x: endX - arrowHeadSize * Math.cos(angle - Math.PI / 6),
        y: endY - arrowHeadSize * Math.sin(angle - Math.PI / 6),
    };
    const arrowHeadD = {
        x: endX - arrowHeadSize * Math.cos(angle + Math.PI / 6),
        y: endY - arrowHeadSize * Math.sin(angle + Math.PI / 6),
    };

    const arrowHeadLeft = Math.min(arrowHeadC.x, arrowHeadD.x);
    const arrowHeadRight = Math.max(arrowHeadC.x, arrowHeadD.x);
    const arrowHeadTop = Math.min(arrowHeadC.y, arrowHeadD.y);
    const arrowHeadBottom = Math.max(arrowHeadC.y, arrowHeadD.y);

    const arrowHeadLeftWidth = endX - arrowHeadLeft;    // 矢尻が終点より左にどれだけはみ出ているか。
    const arrowHeadRightWidth = arrowHeadRight - endX;
    const arrowHeadTopWidth = endY - arrowHeadTop;
    const arrowHeadBottomWidth = arrowHeadBottom - endY;

    // 矢尻の部分の幅と高さを計算
    const arrowHeadWidth = arrowHeadLeftWidth + arrowHeadRightWidth + props.strokeWidth;
    const arrowHeadHeight = arrowHeadTopWidth + arrowHeadBottomWidth + props.strokeWidth;

    // SVGのキャンバスサイズを動的に計算（線の太さがあるので、余白を確保）
    const boldWidth = Math.max(arrowHeadWidth, props.strokeWidth);
    const boldHeight = Math.max(arrowHeadHeight, props.strokeWidth);
    const svgWidth = Math.abs(width) + boldWidth;
    const svgHeight = Math.abs(height) + boldHeight;


    // ############################
    // # このコンポーネントの画面 #
    // ############################

    function generateArrowPath() : string {

        const pAx = arrowHeadWidth / 2 + startX - left;
        const pAy = arrowHeadHeight / 2 + startY - top;
        const pBx = arrowHeadWidth / 2 + endX - left;
        const pBy = arrowHeadHeight / 2 + endY - top;
        const pCx = arrowHeadWidth / 2 + arrowHeadC.x - left;
        const pCy = arrowHeadHeight / 2 + arrowHeadC.y - top;
        const pDx = arrowHeadWidth / 2 + arrowHeadD.x - left;
        const pDy = arrowHeadHeight / 2 + arrowHeadD.y - top;

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
    }

</script>