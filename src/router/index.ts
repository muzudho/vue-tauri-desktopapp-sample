import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import WelcomeToTauriAndView from '../views/WelcomeToTauriAndVue.vue';
import LoadingBundleFile from '../views/LoadingBundleFile.vue';
import LoadingJsonFile from '../views/LoadingJsonFile.vue';
import MountPractice from '../views/MountPractice.vue';

const routes = [
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/base-paths',
        name: 'BasePaths',
        component: () => import('../views/BasePaths.vue'),
    },
    {
        path: '/',          // URL
        name: 'Home',
        component: Home,    // importしたビュー
    },
    {
        path: '/loading-bundle-file',
        name: 'LoadingBundleFile',
        component: LoadingBundleFile,
    },
    {
        path: '/loading-json-file',
        name: 'LoadingJsonFile',
        component: LoadingJsonFile,
    },
    {
        path: '/mount-practice',
        name: 'MountPractice',
        component: MountPractice,
    },
    {
        path: '/welcome-to-tauri-and-view',
        name: 'WelcomeToTauriAndView',
        component: WelcomeToTauriAndView,
    },
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
