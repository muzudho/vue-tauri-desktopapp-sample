import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

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
] as const;

const router = createRouter({
    history: createWebHistory(),    // SPA の履歴管理に HTML5 History API を使う設定。Tauri でもこれでバッチリ！
    routes,
});

export default router;
