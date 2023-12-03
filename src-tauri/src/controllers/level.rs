use sqlx::{Pool, Sqlite};
use tauri::{command, State};

use super::result::LevelResult;

#[command]
pub async fn get_all_levels(state: State<'_, Pool<Sqlite>>) -> Result<Vec<LevelResult>, String> {
    let db = state.inner();
    let query = "SELECT * FROM Level";
    let result = sqlx::query_as::<_, LevelResult>(query)
        .fetch_all(db)
        .await
        .unwrap();
    return Ok(result);
}
