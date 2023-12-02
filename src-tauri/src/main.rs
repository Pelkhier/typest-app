// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controllers;
mod db_config;
mod models;

use crate::controllers::result::get_result;
use crate::controllers::user::{create_user, get_users};
use crate::db_config::init_db::initiate_db;

#[tokio::main]
async fn main() {
    let state = initiate_db().await;

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![create_user, get_users, get_result])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
