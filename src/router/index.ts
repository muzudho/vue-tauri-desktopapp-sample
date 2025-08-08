import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'BasePaths',
        path: '/making/desktop/base-paths',
        component: () => import('../views/making/desktop/BasePaths.vue'),
    },

    {
        name: 'Making',
        path: '/making',
        component: () => import('../views/making/index.vue'),
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
        name: 'LoadingBundleFile',
        path: '/loading-bundle-file',
        component: () => import('../views/LoadingBundleFile.vue'),
    },
    {
        name: 'LoadingJsonFile',
        path: '/loading-json-file',
        component: () => import('../views/LoadingJsonFile.vue'),
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
