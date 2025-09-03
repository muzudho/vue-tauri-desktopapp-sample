# ジャーナル2025-09

## [2025-09-03_Wed]

📄 `vite.config.ts` で `import path from 'path';` を書きたいので、以下をインストール：  

```shell
pnpm add -D @types/node
```

👇 でもうまくいかなかった。

```ts
    import type { CompatibleStyleValue }  from '../../../compatibles/compatible-style-value';
    // Tauri ではこう書けなかった：
    //import type { CompatibleStyleValue }  from '@/compatibles/compatible-style-value.ts';
```

vite.config.ts:  

```ts
import path from 'path';

export default defineConfig(async () => ({
    resolve: {
        alias: {
            // [2025-07-29_Tue] import 文で、.vue ファイルへのパスに @ エイリアスを使えるようにするための設定。
            // 設定前： import Tile from '../components/Tile.vue';  // @のエイリアスが使えない
            // 設定後： import Tile from '@/components/Tile.vue';   // @のエイリアスが使える
            //'@': '/src',  // ここで@をルート・ディレクトリにマッピング
            '@': path.resolve(__dirname, './src'),  // @エイリアス
        },
    },
}));
```
