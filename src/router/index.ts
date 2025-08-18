import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'Blog',
        path: '/blog',
        component: () => import('@/pages/blog/index.vue'),
    },

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

    {
        name: 'CountUp',
        path: '/making/count-up',
        component: () => import('../pages/making/count-up.vue'),
    },
    {
        name: 'InputKey',
        path: '/making/input-key',
        component: () => import('../pages/making/input-key.vue'),
    },
    {
        name: 'InputAxis',
        path: '/making/input-axis',
        component: () => import('../pages/making/input-axis.vue'),
    },
    {
        name: 'InputAxisRpgWalkBoundaryCheck',
        path: '/making/input-axis-rpg-walk-boundary-check',
        component: () => import('../pages/making/input-axis-rpg-walk-boundary-check.vue'),
    },
    {
        name: 'InputAxisRpgWalkFaceShiftPrimordialBoundaryLock',
        path: '/making/input-axis-rpg-walk-face-shift-primordial-boundary-lock',
        component: () => import('../pages/making/input-axis-rpg-walk-face-shift-primordial-boundary-lock.vue'),
    },
    {
        name: 'InputAxisRpgWalkGrid',
        path: '/making/input-axis-rpg-walk-grid',
        component: () => import('../pages/making/input-axis-rpg-walk-grid.vue'),
    },
    {
        name: 'InputAxisRpgWalkScrollBackground',
        path: '/making/input-axis-rpg-walk-scroll-background',
        component: () => import('../pages/making/input-axis-rpg-walk-scroll-background.vue'),
    },
    {
        name: 'InputAxisRpgWalkScrollLoop',
        path: '/making/input-axis-rpg-walk-scroll-loop',
        component: () => import('../pages/making/input-axis-rpg-walk-scroll-loop.vue'),
    },
    {
        name: 'InputAxisRpgWalkScrollPrimordial',
        path: '/making/input-axis-rpg-walk-scroll-primordial',
        component: () => import('../pages/making/input-axis-rpg-walk-scroll-primordial.vue'),
    },
    {
        name: 'InputAxisRpgWalk',
        path: '/making/input-axis-rpg-walk',
        component: () => import('../pages/making/input-axis-rpg-walk.vue'),
    },
    {
        name: 'Making',
        path: '/making',
        component: () => import('@/pages/making/index.vue'),
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
        name: 'SkillTreeLayout',
        path: '/making/skill-tree-layout',
        component: () => import('../pages/making/skill-tree-layout.vue'),
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
        name: 'TileCountUpRpgWalk',
        path: '/making/tile-count-up-rpg-walk',
        component: () => import('../pages/making/tile-count-up-rpg-walk.vue'),
    },
    {
        name: 'TileCountUpNaive',
        path: '/making/tile-count-up-naive',
        component: () => import('../pages/making/tile-count-up-naive.vue'),
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

    {
        name: 'MiniGames',
        path: '/minigames',     // URL
        component: () => import('../pages/minigames/index.vue'),  // importした Vue ファイル
    },
    {
        name: 'ShootingStar',
        path: '/minigames/shooting-star',     // URL
        component: () => import('../pages/minigames/shooting-star.vue'),  // importした Vue ファイル
    },
    {
        name: 'ShootingStarNaive',
        path: '/minigames/shooting-star-naive',     // URL
        component: () => import('../pages/minigames/shooting-star-naive.vue'),  // importした Vue ファイル
    },

    {
        name: 'About',
        path: '/about',     // URL
        component: () => import('../pages/about.vue'),  // importした Vue ファイル
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
