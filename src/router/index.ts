import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import WelcomeToTauriAndView from '../views/WelcomeToTauriAndVue.vue';
import LoadingJsonFile from '../views/LoadingJsonFile.vue';
import MountPractice from '../views/MountPractice.vue';

const routes = [
    {
        path: '/',          // URL
        name: 'Home',
        component: Home,    // importしたビュー
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/welcome-to-tauri-and-view',
        name: 'WelcomeToTauriAndView',
        component: WelcomeToTauriAndView,
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
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
