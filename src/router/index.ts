import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    // ++++++++++
    // + ブログ +
    // ++++++++++
    {
        name: 'Blog',
        path: '/blog',     // URL
        component: () => import('../pages/blog/index.vue'),  // importした Vue ファイル
    },
    {
        name: 'Blog20250910Wed',
        path: '/blog/2025-09/10-wed',
        component: () => import('../pages/blog/2025-09/10-wed.vue'),
    },
    {
        name: 'Blog20250911Thu',
        path: '/blog/2025-09/11-thu',
        component: () => import('../pages/blog/2025-09/11-thu.vue'),
    },

    // ++++++++++++++++++++++++++
    // + コーディング・スタイル +
    // ++++++++++++++++++++++++++
    {
        name: 'CodingStyles',
        path: '/coding-style',
        component: () => import('../pages/coding-style/index.vue'),
    },
    {
        name: 'CodingStylesInlineStyle',
        path: '/coding-style/inline-style',
        component: () => import('../pages/coding-style/inline-style.vue'),
    },
    {
        name: 'CodingStylesSlot',
        path: '/coding-style/slot',
        component: () => import('../pages/coding-style/slot.vue'),
    },

    // ++++++++++++++++++++
    // + デバッグ・ルーム +
    // ++++++++++++++++++++
    {
        name: 'DebugRoom',
        path: '/debug-room',
        component: () => import('../pages/debug-room/index.vue'),
    },
    {
        name: 'DebugRoomBoardOperation',
        path: '/debug-room/board-operation',
        component: () => import('../pages/debug-room/board-operation.vue'),
    },

    // ++++++++++++++++++++
    // + Making / Desktop +
    // ++++++++++++++++++++
    {
        name: 'BasePaths',
        path: '/making/desktop/base-paths',
        component: () => import('../pages/making/desktop/base-paths.vue'),
    },
    {
        name: 'BundleFileLoading',
        path: '/making/desktop/bundle-file-loading',
        component: () => import('../pages/making/desktop/bundle-file-loading.vue'),
    },

    // ++++++++++
    // + 実験場 +
    // ++++++++++
    {
        name: 'Experimental',
        path: '/experimental',
        component: () => import('../pages/experimental/index.vue'),
    },

    // ++++++++++
    // + Making +
    // ++++++++++
    {
        name: 'ButtonRepeat1',
        path: '/making/button-repeat-1',
        component: () => import('../pages/making/button-repeat-1.vue'),
    },
    {
        name: 'CountUp',
        path: '/making/count-up',
        component: () => import('../pages/making/count-up.vue'),
    },
    {
        name: 'Making',
        path: '/making',
        component: () => import('@/pages/making/index.vue'),
    },
    {
        name: 'InputAxisNewBoard',
        path: '/making/input-axis/new-board-1',
        component: () => import('../pages/making/input-axis/new-board-1.vue'),
    },
    {
        name: 'InputAxisPerspectiveRpgWalkTilesWraparoundProjectionLoopOutofsightMaptileimage1',
        path: '/making/input-axis/perspective-rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1',
        component: () => import('../pages/making/input-axis/perspective-rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkBoardGridMoveaway1',
        path: '/making/input-axis/rpg-walk-board-grid-moveaway-1',
        component: () => import('../pages/making/input-axis/rpg-walk-board-grid-moveaway-1.vue'),
    },
    {
        name: 'RpgWalkTilesWraparoundProjectionLoopOutofsight1',
        path: '/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerAccumulateMoveaway1',
        path: '/making/input-axis/rpg-walk-player-accumulate-moveaway-1',
        component: () => import('../pages/making/input-axis/rpg-walk-player-accumulate-moveaway-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerGridMoveaway1',
        path: '/making/input-axis/rpg-walk-player-grid-moveaway-1',
        component: () => import('../pages/making/input-axis/rpg-walk-player-grid-moveaway-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerGridBounded1',
        path: '/making/input-axis/rpg-walk-player-grid-bounded-1',
        component: () => import('../pages/making/input-axis/rpg-walk-player-grid-bounded-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkTilesImmovableProjectionBoundary1',
        path: '/making/input-axis/rpg-walk-tiles-immovable-projection-boundary-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-immovable-projection-boundary-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkTilesImmovableProjectionLoop1',
        path: '/making/input-axis/rpg-walk-tiles-immovable-projection-loop-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-immovable-projection-loop-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkTilesImmovableProjectionMoveaway1',
        path: '/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkTilesImmovableProjectionMoveawaySizeVariable1',
        path: '/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-size-variable-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-size-variable-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkTilesWraparoundProjectionLoopOutofsightMaptileimage1',
        path: '/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1',
        component: () => import('../pages/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1.vue'),
    },
    {
        name: 'InputAxisTargetAccumulateMoveaway1',
        path: '/making/input-axis/target-accumulate-moveaway-1',
        component: () => import('../pages/making/input-axis/target-accumulate-moveaway-1.vue'),
    },
    {
        name: 'InputAxis',
        path: '/making/input-axis',
        component: () => import('../pages/making/input-axis/index.vue'),
    },
    {
        name: 'InputKey',
        path: '/making/input-key',
        component: () => import('../pages/making/input-key.vue'),
    },
    {
        name: 'JsonFileLoading',
        path: '/making/json-file-loading',
        component: () => import('../pages/making/json-file-loading.vue'),
    },
    {
        name: 'MountPractice',
        path: '/making/mount-practice',
        component: () => import('../pages/making/mount-practice.vue'),
    },
    {
        name: 'NpcWalk',
        path: '/making/npc-walk',
        component: () => import('../pages/making/npc-walk.vue'),
    },
    {
        name: 'PerspectiveVertical2Panes',
        path: '/making/perspective-vertical-2-panes',
        component: () => import('../pages/making/perspective-vertical-2-panes.vue'),
    },
    {
        name: 'PerspectiveVertical3Panes',
        path: '/making/perspective-vertical-3-panes',
        component: () => import('../pages/making/perspective-vertical-3-panes.vue'),
    },
    {
        name: 'PageLayout',
        path: '/making/page-layout',
        component: () => import('../pages/making/page-layout.vue'),
    },
    {
        name: 'SfxPractice',
        path: '/making/sfx-practice',
        component: () => import('../pages/making/sfx-practice.vue'),
    },
    {
        name: 'SkillTreeLayout',
        path: '/making/skill-tree-layout',
        component: () => import('../pages/making/skill-tree-layout.vue'),
    },
    {
        name: 'SpriteRoutine',
        path: '/making/sprite-routine',
        component: () => import('../pages/making/sprite-routine.vue'),
    },
    {
        name: 'SvgArrow',
        path: '/making/svg-arrow',
        component: () => import('../pages/making/svg-arrow.vue'),
    },
    {
        name: 'TileCountUpNaive',
        path: '/making/tile-count-up-naive',
        component: () => import('../pages/making/tile-count-up-naive.vue'),
    },
    {
        name: 'TileCountUpRpgWalk',
        path: '/making/tile-count-up-rpg-walk',
        component: () => import('../pages/making/tile-count-up-rpg-walk.vue'),
    },
    {
        name: 'TileCountUp',
        path: '/making/tile-count-up',
        component: () => import('../pages/making/tile-count-up.vue'),
    },
    {
        name: 'TileCrop',
        path: '/making/tile-crop',
        component: () => import('../pages/making/tile-crop.vue'),
    },


    // ++++++++++++++
    // + ミニゲーム +
    // ++++++++++++++

    {
        name: 'MiniGames',
        path: '/minigames',
        component: () => import('../pages/minigames/index.vue'),
    },
    {
        name: 'ShootingStar',
        path: '/minigames/shooting-star',
        component: () => import('../pages/minigames/shooting-star.vue'),
    },
    {
        name: 'ShootingStarNaive',
        path: '/minigames/shooting-star-naive',
        component: () => import('../pages/minigames/shooting-star-naive.vue'),
    },
    // {
    //     name: 'Maze',
    //     path: '/minigames/maze',
    //     component: () => import('../pages/minigames/maze.vue'),
    // },


    // ++++++++++
    // + クイズ +
    // ++++++++++

    {
        name: 'Quiz',
        path: '/quiz',
        component: () => import('../pages/quiz/index.vue'),
    },
    {
        name: 'KingsRoomTiles',
        path: '/quiz/kings-room-tiles',
        component: () => import('../pages/quiz/kings-room-tiles.vue'),
    },
    {
        name: 'OperatingInstructions',
        path: '/quiz/operating-instructions',
        component: () => import('../pages/quiz/operating-instructions.vue'),
    },


    // ++++++++++
    // + その他 +
    // ++++++++++

    {
        name: 'About',
        path: '/about',
        component: () => import('../pages/about/index.vue'),
    },
    {
        name: 'Home',
        path: '/',
        component: () => import('../pages/home/index.vue'),
    },
    {
        name: 'WelcomeToTauriAndVue',
        path: '/welcome-to-tauri-and-vue',
        component: () => import('../pages/welcome-to-tauri-and-vue/index.vue'),
    },
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
