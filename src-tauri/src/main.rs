// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controllers;
mod db_config;
mod models;

use crate::controllers::level::*;
use crate::controllers::user::*;
use crate::db_config::init_db::initiate_db;

#[tokio::main]
async fn main() {
    let state = initiate_db().await;

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            get_user_stats,
            get_user_levels,
            get_level_info,
            get_user_settings,
            get_next_game_type,
            update_user_level,
            update_user_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
