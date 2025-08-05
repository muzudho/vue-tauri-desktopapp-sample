// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri_vue_sample_lib::run()     // 📄 `src-tauri/src/lib.rs` ファイルの `run` 関数を実行。
}
