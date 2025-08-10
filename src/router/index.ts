import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'BasePaths',
        path: '/making/desktop/base-paths',
        component: () => import('../views/making/desktop/BasePaths.vue'),
    },
    {
        name: 'BundleFileLoading',
        path: '/making/desktop/bundle-file-loading',
        component: () => import('../views/making/desktop/BundleFileLoading.vue'),
    },

    {
        name: 'CountUp',
        path: '/making/count-up',
        component: () => import('../views/making/CountUp.vue'),
    },
    {
        name: 'Making',
        path: '/making',
        component: () => import('@/views/making/index.vue'),
    },
    {
        name: 'JsonFileLoading',
        path: '/making/json-file-loading',
        component: () => import('../views/making/JsonFileLoading.vue'),
    },
    {
        name: 'MountPractice',
        path: '/making/mount-practice',
        component: () => import('../views/making/MountPractice.vue'),
    },
    {
        name: 'PageLayout',
        path: '/making/page-layout',
        component: () => import('../views/making/PageLayout.vue'),
    },
    {
        name: 'TileCountUp',
        path: '/making/tile-count-up',
        component: () => import('../views/making/TileCountUp.vue'),
    },
    {
        name: 'TileCrop',
        path: '/making/tile-crop',
        component: () => import('../views/making/TileCrop.vue'),
    },

    {
        name: 'About',
        path: '/about',     // URL
        component: () => import('../views/About.vue'),  // importした Vue ファイル
    },
    {
        name: 'Home',
        path: '/',          
        component: () => import('../views/Home.vue'),
    },
    {
        name: 'WelcomeToTauriAndView',
        path: '/welcome-to-tauri-and-view',
        component: () => import('../views/WelcomeToTauriAndVue.vue'),
    },
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
