use std::fs;
use serde_json::Value;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn read_start_config() -> Result<Value, String> {
    // 📄 `.exe` と同じディレクトリの 📄 `start-config.json` のパスを取得
    let exe_path = std::env::current_exe().map_err(|e| e.to_string())?;
    let config_path = exe_path
        .parent()
        .ok_or("Could not get parent directory".to_string())?
        .join("start-config.json");

    // JSONファイルを読み込む
    let contents = fs::read_to_string(config_path).map_err(|e| e.to_string() + " exe_path:" + exe_path.display().to_string().as_str())?;
    let json: Value = serde_json::from_str(&contents).map_err(|e| e.to_string() + " exe_path:" + exe_path.display().to_string().as_str())?;

    Ok(json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            read_start_config,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
