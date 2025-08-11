import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'BasePaths',
        path: '/making/desktop/base-paths',
        component: () => import('../pages/making/desktop/BasePaths.vue'),
    },
    {
        name: 'BundleFileLoading',
        path: '/making/desktop/bundle-file-loading',
        component: () => import('../pages/making/desktop/BundleFileLoading.vue'),
    },

    {
        name: 'CountUp',
        path: '/making/count-up',
        component: () => import('../pages/making/CountUp.vue'),
    },
    {
        name: 'Making',
        path: '/making',
        component: () => import('@/pages/making/index.vue'),
    },
    {
        name: 'JsonFileLoading',
        path: '/making/json-file-loading',
        component: () => import('../pages/making/JsonFileLoading.vue'),
    },
    {
        name: 'MountPractice',
        path: '/making/mount-practice',
        component: () => import('../pages/making/MountPractice.vue'),
    },
    {
        name: 'PageLayout',
        path: '/making/page-layout',
        component: () => import('../pages/making/PageLayout.vue'),
    },
    {
        name: 'TileCountUp',
        path: '/making/tile-count-up',
        component: () => import('../pages/making/TileCountUp.vue'),
    },
    {
        name: 'TileCrop',
        path: '/making/tile-crop',
        component: () => import('../pages/making/TileCrop.vue'),
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
        name: 'WelcomeToTauriAndView',
        path: '/welcome-to-tauri-and-view',
        component: () => import('../pages/WelcomeToTauriAndVue.vue'),
    },
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
