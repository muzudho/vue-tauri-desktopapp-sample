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


## [2025-09-07_Sun]

Lint が <template v-slot:default> の書き方に対応してないみたいなんだぜ、何から調べたらいいんだぜ（＾～＾）？

```shell
pnpm add -D eslint@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest
```

* .eslintrc.jsonにplugin:vue/vue3-recommendedを追加。

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "vue/valid-v-slot": "error"
  }
}
```

設定を適用：  

```shell
pnpm eslint . --ext .js,.ts,.vue
# 失敗

pnpm dlx @eslint/migrate-config .eslintrc.json

pnpm add -D globals @eslint/js @eslint/eslintrc
```

関係なかった。

📖 [JavaScriptからTypeScriptへ移行した際に Property does not exist on type '{}'. で怒られた話](https://qiita.com/entaku0818/items/7068cd9c62738d1d3981)  


## [2025-09-08_Mon]

エラーが取れない。  
`<template #author>` と書くと、  
`Property 'author' does not exist on type '{}'. ts-plugin(2339) [Ln 349, Col 28]` と出る。  

```json
{
    "compilerOptions": {
        /* エラー抑制、効果なし： `Property 'author' does not exist on type '{}'. ts-plugin(2339) [Ln 349, Col 28]` */
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "noImplicitAny": false // 暗黙のanyを許可
    }
}
```

VSCode の Vue公式 エクステンションをアンインストール。  
当然、エラーは取れるが、何のチェックも行われなくなる。 .vue ファイルはプレーンテキスト同然になる。  
VSCode の Vue公式 エクステンションを再インストール。  
また同じエラーが出る。  
