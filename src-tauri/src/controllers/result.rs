use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, Pool, Sqlite};
use tauri::{command, State};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    id: i32,
    name: String,
    email: String,
    password: String,
    text_size: String,
    keyboard_sound: i32,
    keyboard_show: i32,
    mini_game_sound: i32,
    created_at: String,
    updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Level {
    id: i32,
    order_position: i32,
    name: String,
    lang: String,
    r#type: String,
    expected_mini_game_score: Option<f64>,
    words: String,
    created_at: String,
    updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct UserLevel {
    user_id: i32,
    level_id: i32,
    completed: i32,
    accuracy: Option<f64>,
    time: Option<f64>,
    wpm: Option<f64>,
    created_at: String,
    updated_at: String,
}

#[command]
pub async fn get_result(
    state: State<'_, Pool<Sqlite>>,
) -> Result<(Vec<User>, Vec<Level>, Vec<UserLevel>), String> {
    let db = state.inner();
    let query = "INSERT INTO User (name, email, password) VALUES ('Admin', 'Admin@admin.com', 'password123');";
    let _ = sqlx::query(query).execute(db).await;
    let result_users = sqlx::query_as::<_, User>("SELECT * FROM User")
        .fetch_all(db)
        .await
        .unwrap();

    let query =
        "INSERT INTO Level (order_position, name, lang, type, expected_mini_game_score, words) 
    VALUES (1, 'Beginner', 'en', 'practice', 80.0, 'word1, word2, word3');
    ";
    let _ = sqlx::query(query).execute(db).await;

    let query = "INSERT INTO UserLevel (user_id, level_id, completed, accuracy, time, wpm) 
    VALUES (1, 1, 0, 95.0, 120.0, 60.0);
    ";
    let _ = sqlx::query(query).execute(db).await;

    let result_levels = sqlx::query_as::<_, Level>("SELECT * FROM Level")
        .fetch_all(db)
        .await
        .unwrap();
    let result_user_level = sqlx::query_as::<_, UserLevel>("SELECT * FROM UserLevel")
        .fetch_all(db)
        .await
        .unwrap();

    return Ok((result_users, result_levels, result_user_level));
}
