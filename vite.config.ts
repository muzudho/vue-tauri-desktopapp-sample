import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
//import { fileURLToPath, URL } from 'url';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [vue()],
    resolve: {
        alias: {    // Tauri と Nuxt でエイリアスを合わせたい
            //'@': fileURLToPath(new URL('./src', import.meta.url)),
            '@': path.resolve(__dirname, './src'),  // @ が src のエイリアスなのは Vue、特に Vite の習慣。
                                                    // 使用例： import Tile from '@/components/Tile.vue';

            // ~ が プロジェクトフォルダー全体のエイリアスなのは Nuxt の習慣。ここでは使わず、 @ の方に統一する。

            //'/assets': path.resolve(__dirname, './src/assets'),   // "@/assets" で十分
            '#public': path.resolve(__dirname, './public'), // #public が public のエイリアスなのは Nuxt の習慣。
        },
    },

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
}));
