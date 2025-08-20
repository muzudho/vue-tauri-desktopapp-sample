//import type { Properties } from 'csstype';  // Nuxt3 用。使わない
import { StyleValue } from 'vue';   // Tauri2 用

/*
    👇 Tauri2 + Vue3 では以下の書き方ができる。

        import { StyleValue } from 'vue';

    👇 Nuxt 3 では、以下の書き方ができる。

        import type { Properties } from 'csstype';
        // これは使えない。 import { StyleValue } from 'vue';

    これでは、デスクトップアプリ版と、ウェブアプリ版でコードに違いがでてきてしまう。

 */
export type CompatibleStyleValue = StyleValue;  // Tauri2 用
//export type CompatibleStyleValue = Record<string, string | number>;     // Nuxt3 用
