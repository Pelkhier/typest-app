use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct UserLevelUpdate {
    pub user_id: i32,
    pub level_id: i32,
    pub accuracy: Option<f32>,
    pub time: Option<f32>,
    pub wpm: Option<f32>,
}
