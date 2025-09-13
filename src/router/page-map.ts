/**
 * TODO: 手入力は大変なので、自動生成するデータ・ファイルにしたい。
 * NOTE: 動的インポートを使ったら、サーバーサイドのプリレンダリングでエラーになるということがあった。そこで、静的インポートを使うことにする。
 */

import Blog20250910Wed from '@/pages/blog/2025-09/10-wed.vue';
import Blog20250911Thu from '@/pages/blog/2025-09/11-thu.vue';
import Blog20250912Fri from '@/pages/blog/2025-09/12-fri.vue';

export const pageMap : Readonly<Record<string, any>> = {
    '2025-09/10-wed': Blog20250910Wed,
    '2025-09/11-thu': Blog20250911Thu,
    '2025-09/12-fri': Blog20250912Fri,
};
