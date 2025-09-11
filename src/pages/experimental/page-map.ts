// ##############
// # インポート #
// ##############

import { defineAsyncComponent } from 'vue';


// ################
// # オブジェクト #
// ################

// ++++++++++++++++++++++++++++++++++++
// + オブジェクト　＞　ページ・マップ +
// ++++++++++++++++++++++++++++++++++++
//
// import 文のパスは Vite が静的解析するので変数は使えない。そこでマップ形式で予め持っておく。
//
export const pageMap : Record<string, any> = {
    '101': defineAsyncComponent(() => import('@/pages/blog/2025-08/09-sat-sample.vue')),
    '102': defineAsyncComponent(() => import('@/pages/blog/2025-08/10-sun-sample.vue')),
    '103': defineAsyncComponent(() => import('@/pages/blog/2025-08/11-mon-sample.vue'))
};
