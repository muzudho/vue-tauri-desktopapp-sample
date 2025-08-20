//import type { Properties } from 'csstype';  // Nuxt3 用
import { StyleValue } from 'vue';   // Tauri2 用

/*
    👇 Tauri2 + Vue3 では以下の書き方ができる。

        import { StyleValue } from 'vue';

    👇 Nuxt 3 では、以下の書き方ができる。

        import type { Properties } from 'csstype';
        // これは使えない。 import { StyleValue } from 'vue';

    これでは、デスクトップアプリ版と、ウェブアプリ版でコードに違いがでてきてしまう。

 */
export type CompatibleStyleValue = StyleValue;

// 以下のような方法もあるらしい？
// MyStyleValue 型を定義（StyleValue と Properties に互換）
//type MyStyleValue = Record<string, string | number>;
