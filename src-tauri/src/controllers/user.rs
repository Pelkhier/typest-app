use crate::models::users::User;
use sqlx::{Pool, Sqlite};
use tauri::{command, State};
#[command]
pub async fn create_user(state: State<'_, Pool<Sqlite>>, username: String) -> Result<(), String> {
    let db = state.inner();
    sqlx::query("INSERT INTO users (name, active) VALUES ($1, $2)")
        .bind(username)
        .bind(1)
        .execute(db)
        .await
        .unwrap();
    return Ok(());
}
#[command]
pub async fn get_users(state: State<'_, Pool<Sqlite>>) -> Result<Vec<User>, String> {
    let db = state.inner();
    let user_results = sqlx::query_as::<_, User>("SELECT id, name, active FROM users")
        .fetch_all(db)
        .await
        .unwrap();
    return Ok(user_results);
}
