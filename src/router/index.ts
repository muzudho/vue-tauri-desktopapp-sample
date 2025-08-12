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
        name: 'PageLayout',
        path: '/making/page-layout',
        component: () => import('../pages/making/page-layout.vue'),
    },
    {
        name: 'Sprite',
        path: '/making/sprite',
        component: () => import('../pages/making/sprite.vue'),
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
