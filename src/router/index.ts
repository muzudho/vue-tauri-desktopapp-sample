// Tauri 用。
import { createRouter, createWebHistory } from 'vue-router';

const routes = [

    // ++++++++++++++++++++
    // + アプリケーション +
    // ++++++++++++++++++++
    {
        name: 'TheAppHeader',
        path: '/the-app-header',
        component: () => import('../pages/the-app-header.vue'),
    },

    // ++++++++++++++++++++++
    // + このサイトについて +
    // ++++++++++++++++++++++
    {
        name: 'About',
        path: '/about',
        component: () => import('../pages/about/index.vue'),
    },
    {
        name: 'About_TheBody',
        path: '/about/the-body',
        component: () => import('../pages/about/the-body.vue'),
    },

    // ++++++++++
    // + ブログ +
    // ++++++++++
    {
        name: 'Blog',
        path: '/blog',     // URL
        component: () => import('../pages/blog/index.vue'),  // importした Vue ファイル
    },
    {
        name: 'Blog20250401Tue',
        path: '/blog/2025-04/01-tue',
        component: () => import('../pages/blog/2025-04/01-tue-sample.vue'),
    },
    {
        name: 'Blog20250402Wed',
        path: '/blog/2025-04/02-wed',
        component: () => import('../pages/blog/2025-04/02-wed-sample.vue'),
    },
    {
        name: 'Blog20250403Thu',
        path: '/blog/2025-04/03-thu',
        component: () => import('../pages/blog/2025-04/03-thu-sample.vue'),
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

    // ++++++++++++++++++++
    // + デバッグ・ルーム +
    // ++++++++++++++++++++
    {
        name: 'DebugRoom',
        path: '/debug-room',
        component: () => import('../pages/debug-room/index.vue'),
    },
    {
        name: 'DebugRoom_TheChaptersBody',
        path: '/debug-room/the-part-body',
        component: () => import('../pages/debug-room/the-part-body.vue'),
    },
    {
        name: 'DebugRoom_TheChaptersFooter',
        path: '/debug-room/the-part-footer',
        component: () => import('../pages/debug-room/the-part-footer.vue'),
    },
    {
        name: 'DebugRoom_TheChaptersHeader',
        path: '/debug-room/the-part-header',
        component: () => import('../pages/debug-room/the-part-header.vue'),
    },

    {
        name: 'DebugRoom_BoardOperation',
        path: '/debug-room/board-operation',
        component: () => import('../pages/debug-room/board-operation.vue'),
    },

    // ++++++++++
    // + 実験場 +
    // ++++++++++
    {
        name: 'Experimental_TheChaptersBody',
        path: '/experimental/the-part-body',
        component: () => import('../pages/experimental/the-part-body.vue'),
    },
    {
        name: 'Experimental',
        path: '/experimental',
        component: () => import('../pages/experimental/index.vue'),
    },
    {
        name: 'Experimental_TheChaptersFooter',
        path: '/experimental/the-part-footer',
        component: () => import('../pages/experimental/the-part-footer.vue'),
    },
    {
        name: 'Experimental_TheChaptersHeader',
        path: '/experimental/the-part-header',
        component: () => import('../pages/experimental/the-part-header.vue'),
    },
    {
        name: 'Experimental_Page1',
        path: '/experimental/page-1',
        component: () => import('../pages/experimental/page-1.vue'),
    },

    // ++++++++++
    // + ホーム +
    // ++++++++++
    {
        name: 'Home',
        path: '/',
        component: () => import('../pages/home/index.vue'),
    },
    {
        name: 'Home_TheBody',
        path: '/home/the-body',
        component: () => import('../pages/home/the-body.vue'),
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
        name: 'MiniGames_TheBody',
        path: '/minigames/the-body',
        component: () => import('../pages/minigames/the-body.vue'),
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
        name: 'Quiz_TheBody',
        path: '/quiz/the-body',
        component: () => import('../pages/quiz/the-body.vue'),
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


    // ++++++++++++++++
    // + リファレンス +
    // ++++++++++++++++

    {
        name: 'Reference',
        path: '/reference',
        component: () => import('../pages/reference/index.vue'),
    },
    {
        name: 'Reference_TheWelcome',
        path: '/reference/the-welcome',
        component: () => import('../pages/reference/the-welcome.vue'),
    },

    // ++++++++++++++++++++++++++++++++++++++++++++
    // + リファレンス　＞　コーディング・スタイル +
    // ++++++++++++++++++++++++++++++++++++++++++++
    {
        name: 'Reference_CodingStyle_TheContents',
        path: '/reference/coding-style/the-contents',
        component: () => import('../pages/reference/coding-style/the-contents.vue'),
    },

    {
        name: 'Reference_CodingStyle_InlineStyle',
        path: '/reference/coding-style/inline-style',
        component: () => import('../pages/reference/coding-style/inline-style.vue'),
    },
    {
        name: 'Reference_CodingStyle_Slot',
        path: '/reference/coding-style/slot',
        component: () => import('../pages/reference/coding-style/slot.vue'),
    },



    // ++++++++++++++++++++++++++++++++
    // + メイキング　＞　デスクトップ +
    // ++++++++++++++++++++++++++++++++
    {
        name: 'Reference_Making_BasePaths',
        path: '/reference/making/desktop/base-paths',
        component: () => import('../pages/reference/making/desktop/base-paths.vue'),
    },
    {
        name: 'Reference_Making_BundleFileLoading',
        path: '/reference/making/desktop/bundle-file-loading',
        component: () => import('../pages/reference/making/desktop/bundle-file-loading.vue'),
    },

    // ++++++++++++++
    // + メイキング +
    // ++++++++++++++
    {
        name: 'Reference_Making_TheContents',
        path: '/reference/making/the-contents',
        component: () => import('@/pages/reference/making/the-contents.vue'),
    },

    {
        name: 'Reference_Making_ButtonRepeat1',
        path: '/reference/making/button-repeat-1',
        component: () => import('../pages/reference/making/button-repeat-1.vue'),
    },
    {
        name: 'Reference_Making_CountUp',
        path: '/reference/making/count-up',
        component: () => import('../pages/reference/making/count-up.vue'),
    },
    {
        name: 'Reference_Making_InputAxisNewBoard',
        path: '/reference/making/input-axis/new-board-1',
        component: () => import('../pages/reference/making/input-axis/new-board-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisPerspectiveRpgWalkTilesWraparoundProjectionLoopOutofsightMaptileimage1',
        path: '/reference/making/input-axis/perspective-rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1',
        component: () => import('../pages/reference/making/input-axis/perspective-rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkBoardGridMoveaway1',
        path: '/reference/making/input-axis/rpg-walk-board-grid-moveaway-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-board-grid-moveaway-1.vue'),
    },
    {
        name: 'Reference_Making_RpgWalkTilesWraparoundProjectionLoopOutofsight1',
        path: '/reference/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkPlayerAccumulateMoveaway1',
        path: '/reference/making/input-axis/rpg-walk-player-accumulate-moveaway-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-player-accumulate-moveaway-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkPlayerGridMoveaway1',
        path: '/reference/making/input-axis/rpg-walk-player-grid-moveaway-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-player-grid-moveaway-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkPlayerGridBounded1',
        path: '/reference/making/input-axis/rpg-walk-player-grid-bounded-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-player-grid-bounded-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkTilesImmovableProjectionBoundary1',
        path: '/reference/making/input-axis/rpg-walk-tiles-immovable-projection-boundary-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-immovable-projection-boundary-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkTilesImmovableProjectionLoop1',
        path: '/reference/making/input-axis/rpg-walk-tiles-immovable-projection-loop-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-immovable-projection-loop-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkTilesImmovableProjectionMoveaway1',
        path: '/reference/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkTilesImmovableProjectionMoveawaySizeVariable1',
        path: '/reference/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-size-variable-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-immovable-projection-moveaway-size-variable-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisRpgWalkTilesWraparoundProjectionLoopOutofsightMaptileimage1',
        path: '/reference/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1',
        component: () => import('../pages/reference/making/input-axis/rpg-walk-tiles-wraparound-projection-loop-outofsight-maptileimage-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxisTargetAccumulateMoveaway1',
        path: '/reference/making/input-axis/target-accumulate-moveaway-1',
        component: () => import('../pages/reference/making/input-axis/target-accumulate-moveaway-1.vue'),
    },
    {
        name: 'Reference_Making_InputAxis',
        path: '/reference/making/input-axis',
        component: () => import('../pages/reference/making/input-axis/index.vue'),
    },
    {
        name: 'Reference_Making_InputKey',
        path: '/reference/making/input-key',
        component: () => import('../pages/reference/making/input-key.vue'),
    },
    {
        name: 'Reference_Making_JsonFileLoading',
        path: '/reference/making/json-file-loading',
        component: () => import('../pages/reference/making/json-file-loading.vue'),
    },
    {
        name: 'Reference_Making_MountPractice',
        path: '/reference/making/mount-practice',
        component: () => import('../pages/reference/making/mount-practice.vue'),
    },
    {
        name: 'Reference_Making_NpcWalk',
        path: '/reference/making/npc-walk',
        component: () => import('../pages/reference/making/npc-walk.vue'),
    },
    {
        name: 'Reference_Making_PerspectiveVertical2Panes',
        path: '/reference/making/perspective-vertical-2-panes',
        component: () => import('../pages/reference/making/perspective-vertical-2-panes.vue'),
    },
    {
        name: 'Reference_Making_PerspectiveVertical3Panes',
        path: '/reference/making/perspective-vertical-3-panes',
        component: () => import('../pages/reference/making/perspective-vertical-3-panes.vue'),
    },
    {
        name: 'Reference_Making_PageLayout',
        path: '/reference/making/page-layout',
        component: () => import('../pages/reference/making/page-layout.vue'),
    },
    {
        name: 'Reference_Making_SfxPractice',
        path: '/reference/making/sfx-practice',
        component: () => import('../pages/reference/making/sfx-practice.vue'),
    },
    {
        name: 'Reference_Making_SkillTreeLayout',
        path: '/reference/making/skill-tree-layout',
        component: () => import('../pages/reference/making/skill-tree-layout.vue'),
    },
    {
        name: 'Reference_Making_SpriteRoutine',
        path: '/reference/making/sprite-routine',
        component: () => import('../pages/reference/making/sprite-routine.vue'),
    },
    {
        name: 'Reference_Making_SvgArrow',
        path: '/reference/making/svg-arrow',
        component: () => import('../pages/reference/making/svg-arrow.vue'),
    },
    {
        name: 'Reference_Making_TileCountUpNaive',
        path: '/reference/making/tile-count-up-naive',
        component: () => import('../pages/reference/making/tile-count-up-naive.vue'),
    },
    {
        name: 'Reference_Making_TileCountUpRpgWalk',
        path: '/reference/making/tile-count-up-rpg-walk',
        component: () => import('../pages/reference/making/tile-count-up-rpg-walk.vue'),
    },
    {
        name: 'Reference_Making_TileCountUp',
        path: '/reference/making/tile-count-up',
        component: () => import('../pages/reference/making/tile-count-up.vue'),
    },
    {
        name: 'Reference_Making_TileCrop',
        path: '/reference/making/tile-crop',
        component: () => import('../pages/reference/making/tile-crop.vue'),
    },


    // ++++++++++++++++++++++++++++++++++++++++++++
    // + ウェルカム・ツー・タウリ・アンド・ビュー +
    // ++++++++++++++++++++++++++++++++++++++++++++

    {
        name: 'WelcomeToTauriAndVue',
        path: '/welcome-to-tauri-and-vue',
        component: () => import('../pages/welcome-to-tauri-and-vue/index.vue'),
    },
    {
        name: 'WelcomeToTauriAndVue_TheChaptersBody',
        path: '/welcome-to-tauri-and-vue/the-part-body',
        component: () => import('../pages/welcome-to-tauri-and-vue/the-part-body.vue'),
    },
    {
        name: 'WelcomeToTauriAndVue_TheChaptersFooter',
        path: '/welcome-to-tauri-and-vue/the-part-footer',
        component: () => import('../pages/welcome-to-tauri-and-vue/the-part-footer.vue'),
    },
    {
        name: 'WelcomeToTauriAndVue_TheChaptersHeader',
        path: '/welcome-to-tauri-and-vue/the-part-header',
        component: () => import('../pages/welcome-to-tauri-and-vue/the-part-header.vue'),
    },

] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
