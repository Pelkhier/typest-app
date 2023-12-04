use serde_json::{json, Value};
use sqlx::{Pool, Sqlite};
use tauri::{command, State};

#[command]
pub async fn get_user_stats(state: State<'_, Pool<Sqlite>>, lang: String) -> Result<Value, String> {
    let db = state.inner();
    #[derive(sqlx::FromRow, Debug)]
    struct TempCompRes {
        completed: i32,
        level_id: i32,
    }
    let completed_result = sqlx::query_as::<_, TempCompRes>(
        "SELECT ul.completed, ul.level_id FROM UserLevel ul
        JOIN Level l ON l.id = ul.level_id
        WHERE ul.user_id = 1 AND l.lang = $1",
    )
    .bind(&lang)
    .fetch_all(db)
    .await
    .unwrap();

    let completed_levels = completed_result.iter().fold(0, |acc, x| acc + x.completed);

    let current_level_id = completed_result
        .iter()
        .find(|v| v.completed == 0)
        .and_then(|v| Some(v.level_id))
        .unwrap_or(1);

    #[derive(sqlx::FromRow, Debug)]
    struct TempCurrLevel {
        name: String,
        order_position: i32,
        r#type: String,
    }
    let res_current_level = sqlx::query_as::<_, TempCurrLevel>(
        "SELECT l.name, l.order_position, l.type FROM Level l
        JOIN UserLevel ul ON ul.level_id = l.id
        WHERE l.id = $1 AND l.lang = $2;",
    )
    .bind(current_level_id)
    .bind(&lang)
    .fetch_one(db)
    .await
    .unwrap();

    #[derive(sqlx::FromRow, Debug)]
    struct TepStoryTime {
        accuracy: f32,
        wpm: f32,
        completed: bool,
        order_position: i32,
    }

    let query = "
        SELECT ul.accuracy, ul.wpm, ul.completed, l.order_position FROM UserLevel ul 
        JOIN Level l ON  l.id = ul.level_id
        WHERE l.type = 'story-time'
        ORDER BY ul.created_at DESC
        LIMIT 1;
    ";
    let last_story_time_res = sqlx::query_as::<_, TepStoryTime>(query).fetch_one(db).await;
    let mut last_story_time: Option<Value> = None;
    match last_story_time_res {
        Ok(res) => {
            last_story_time = Some(json!({
                "accuracy": res.accuracy,
                "wpm": res.wpm,
                "completed": res.completed,
                "order": res.order_position
            }))
        }
        Err(_) => {
            last_story_time = None;
        }
    }

    let response = json!({
        "completedLevelsCount": completed_levels,
        "allLevelsCount": completed_result.len() as i32,
        "currentLevel": {
            "name": res_current_level.name,
            "order": res_current_level.order_position,
            "type": res_current_level.r#type
        },
        "lastStoryTime": last_story_time
    });

    Ok(response)
}

#[command]
pub async fn get_user_levels(
    state: State<'_, Pool<Sqlite>>,
    lang: String,
) -> Result<Vec<Value>, String> {
    let db = state.inner();
    #[derive(sqlx::FromRow, Debug)]
    struct TempUserLevel {
        level_id: i32,
        accuracy: f32,
        time: f32,
        wpm: f32,
        completed: i32,
        lang: String,
        name: String,
        order_position: i32,
        r#type: String,
    }

    let query = "
        SELECT ul.level_id, ul.accuracy, ul.time, ul.wpm, ul.completed, l.lang, l.name, l.order_position, l.type FROM UserLevel ul
        JOIN Level l ON l.id = ul.level_id AND l.lang = $1;
    ";

    let result = sqlx::query_as::<_, TempUserLevel>(query)
        .bind(lang)
        .fetch_all(db)
        .await
        .unwrap();

    let response = result
        .iter()
        .map(|level| {
            let completed = match level.completed {
                1 => true,
                _ => false,
            };
            json!({
                "accuracy": level.accuracy,
                "time": level.time,
                "wpm": level.wpm,
                "completed": completed,
                "level": {
                    "lang": level.lang,
                    "name": level.name,
                    "order": level.order_position,
                    "type": level.r#type,
                    "id": level.level_id,
                }
            })
        })
        .collect();
    Ok(response)
}

#[command]
pub async fn get_user_settings(state: State<'_, Pool<Sqlite>>) -> Result<Value, String> {
    let db = state.inner();
    #[derive(sqlx::FromRow)]
    struct TempUserSettings {
        text_size: String,
        keyboard_sound: bool,
        keyboard_show: bool,
        mini_game_sound: bool,
    }

    let query =
        "SELECT text_size, keyboard_sound, keyboard_show, mini_game_sound FROM User WHERE id = 1;";
    let result = sqlx::query_as::<_, TempUserSettings>(query)
        .fetch_one(db)
        .await
        .unwrap();

    let response = json!({
        "textSize": result.text_size,
        "keyboardSound": result.keyboard_sound,
        "keyboardShow": result.keyboard_show,
        "miniGameSound": result.mini_game_sound,
    });
    Ok(response)
}

#[command]
pub async fn update_user_settings(
    state: State<'_, Pool<Sqlite>>,
    text_size: Option<String>,
    keyboard_show: Option<bool>,
    keyboard_sound: Option<bool>,
    mini_game_sound: Option<bool>,
) -> Result<(), String> {
    let db = state.inner();
    if let Some(text_size) = text_size {
        sqlx::query("UPDATE User SET text_size = $1 WHERE id = 1")
            .bind(text_size)
            .execute(db)
            .await
            .unwrap();
    } else if let Some(keyboard_show) = keyboard_show {
        sqlx::query("UPDATE User SET keyboard_show = $1 WHERE id = 1")
            .bind(keyboard_show)
            .execute(db)
            .await
            .unwrap();
    } else if let Some(keyboard_sound) = keyboard_sound {
        sqlx::query("UPDATE User SET keyboard_sound = $1 WHERE id = 1")
            .bind(keyboard_sound)
            .execute(db)
            .await
            .unwrap();
    } else if let Some(mini_game_sound) = mini_game_sound {
        sqlx::query("UPDATE User SET mini_game_sound = $1 WHERE id = 1")
            .bind(mini_game_sound)
            .execute(db)
            .await
            .unwrap();
    } else {
        panic!("err: settings should have one field at least!");
    }
    Ok(())
}
