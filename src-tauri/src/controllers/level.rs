use serde_json::{json, Value};
use sqlx::{Pool, Sqlite};
use tauri::{command, State};

use crate::models::level::UserLevelUpdate;

#[command]
pub async fn get_level_info(
    state: State<'_, Pool<Sqlite>>,
    order_position: i32,
    lang: String,
) -> Result<Option<Value>, String> {
    let db = state.inner();

    #[derive(sqlx::FromRow)]
    struct TempLevelRes {
        user_id: i32,
        level_id: i32,
        accuracy: f32,
        wpm: f32,
        time: f32,
        completed: bool,
        expected_mini_game_score: f32,
        lang: String,
        name: String,
        order_position: i32,
        r#type: String,
        words: String,
    }

    let query = "
        SELECT ul.user_id, ul.level_id, ul.accuracy, ul.time, ul.wpm, ul.completed, l.lang, l.name, l.order_position, l.type, l.words, l.expected_mini_game_score
        FROM UserLevel ul
        JOIN Level l ON ul.level_id = l.id
        WHERE l.order_position = $1 AND ul.user_id = 1 AND l.lang = $2
        limit 1
    ";
    let result = sqlx::query_as::<_, TempLevelRes>(query)
        .bind(order_position)
        .bind(lang)
        .fetch_one(db)
        .await;
    match result {
        Err(_) => return Ok(None),
        Ok(result) => {
            let response = json!({
            "userId": result.user_id,
            "levelId": result.level_id,
            "accuracy": result.accuracy,
            "wpm": result.wpm,
            "completed": result.completed,
            "time": result.time,
            "level": {
                "lang": result.lang,
                "name": result.name,
                "order": result.order_position,
                "type": result.r#type,
                "words": result.words,
                "expectedMiniGameScore": result.expected_mini_game_score,
            }
            });
            return Ok(Some(response));
        }
    }
}

#[command]
pub async fn get_next_game_type(
    state: State<'_, Pool<Sqlite>>,
    order_position: i32,
    lang: String,
) -> Result<Option<String>, String> {
    let db = state.inner();
    let query = "SELECT type FROM Level WHERE order_position = $1 AND lang = $2 LIMIT 1;";
    let result = sqlx::query_scalar::<_, Option<String>>(query)
        .bind(order_position)
        .bind(lang)
        .fetch_one(db)
        .await
        .unwrap_or(None);
    return Ok(result);
}

#[command]
pub async fn update_user_level(
    state: State<'_, Pool<Sqlite>>,
    updated_user_level: UserLevelUpdate,
) -> Result<(), String> {
    let db = state.inner();
    let query = "
        UPDATE UserLevel SET accuracy = $1, wpm = $2, time = $3, completed = 1
        WHERE user_id = $4 AND level_id = $5;
    ";
    sqlx::query(query)
        .bind(updated_user_level.accuracy.unwrap_or(0.0))
        .bind(updated_user_level.wpm.unwrap_or(0.0))
        .bind(updated_user_level.time.unwrap_or(0.0))
        .bind(updated_user_level.user_id)
        .bind(updated_user_level.level_id)
        .execute(db)
        .await
        .unwrap();
    Ok(())
}
