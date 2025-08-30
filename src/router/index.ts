import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    // ++++++++
    // + Blog +
    // ++++++++
    {
        name: 'Blog',
        path: '/blog',     // URL
        component: () => import('../pages/blog/index.vue'),  // importした Vue ファイル
    },

    // +++++++++++++++++
    // + Coding styles +
    // +++++++++++++++++
    {
        name: 'CodingStyles',
        path: '/coding-styles',
        component: () => import('../pages/coding-styles/index.vue'),
    },
    {
        name: 'CodingStylesStyle',
        path: '/coding-styles/style',
        component: () => import('../pages/coding-styles/style.vue'),
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
        name: 'InputAxisRpgWalkBoardScrollPrimordialGrid1',
        path: '/making/input-axis-rpg-walk-board-scroll-primordial-grid-1',
        component: () => import('../pages/making/input-axis-rpg-walk-board-scroll-primordial-grid-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkBoardWraparoundLoopScroll1',
        path: '/making/input-axis-rpg-walk-board-wraparound-scroll-loop-1',
        component: () => import('../pages/making/input-axis-rpg-walk-board-wraparound-scroll-loop-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkBoardWraparoundScrollAndPrintingLoop1',
        path: '/making/input-axis-rpg-walk-board-wraparound-scroll-and-printing-loop-1',
        component: () => import('../pages/making/input-axis-rpg-walk-board-wraparound-scroll-and-printing-loop-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkBoardWraparoundLoopAndPrintingPrimordialAndPlayerBoundary1',
        path: '/making/input-axis-rpg-walk-board-wraparound-loop-and-printing-primordial-and-player-boundary-1',
        component: () => import('../pages/making/input-axis-rpg-walk-board-wraparound-scroll-and-printing-primordial-and-player-boundary-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerBoundaryCheck1',
        path: '/making/input-axis-rpg-walk-player-boundary-check-1',
        component: () => import('../pages/making/input-axis-rpg-walk-player-boundary-check-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerPrimordial1',
        path: '/making/input-axis-rpg-walk-player-primordial-1',
        component: () => import('../pages/making/input-axis-rpg-walk-player-primordial-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkPlayerPrimordialGrid1',
        path: '/making/input-axis-rpg-walk-player-primordial-grid-1',
        component: () => import('../pages/making/input-axis-rpg-walk-player-primordial-grid-1.vue'),
    },
    {
        name: 'InputAxisRpgWalkFaceShiftBoundary1',
        path: '/making/input-axis-rpg-walk-printing-shift-boundary-1',
        component: () => import('../pages/making/input-axis-rpg-walk-printing-shift-boundary-1.vue'),
    },

    // input-axis-rpg-walk-printing-shift-contents-size-variable-1
    // input-axis-rpg-walk-printing-shift-loop-1
    // input-axis-rpg-walk-printing-shift-primordial-1

    {
        name: 'InputAxisRpgWalkUsingBackgroundImage1',
        path: '/making/input-axis-rpg-walk-using-background-image-1',
        component: () => import('../pages/making/input-axis-rpg-walk-using-background-image-1.vue'),
    },
    {
        name: 'InputAxisTarget1',
        path: '/making/input-axis-target-1',
        component: () => import('../pages/making/input-axis-target-1.vue'),
    },
    {
        name: 'InputAxis',
        path: '/making/input-axis',
        component: () => import('../pages/making/input-axis.vue'),
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
    {
        name: 'Maze',
        path: '/minigames/maze',
        component: () => import('../pages/minigames/maze.vue'),
    },


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
        component: () => import('../pages/about.vue'),
    },
    {
        name: 'Home',
        path: '/',          
        component: () => import('../pages/home.vue'),
    },
    {
        name: 'WelcomeToTauriAndVue',
        path: '/welcome-to-tauri-and-vue',
        component: () => import('../pages/welcome-to-tauri-and-vue.vue'),
    },
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
