use serde::{Deserialize, Serialize};

use crate::db_config::data::*;
use crate::models::types::{Lang, Type};
#[derive(Serialize, Deserialize, Debug)]
pub struct Level {
    pub name: String,
    pub order_position: i32,
    pub lang: Lang,
    pub r#type: Type,
    pub expected_mini_game_score: Option<f32>,
    pub words: String,
}

impl Level {
    pub fn new(
        name: String,
        order_position: i32,
        lang: Lang,
        r#type: Type,
        expected_mini_game_score: Option<f32>,
        words: String,
    ) -> Self {
        Self {
            name,
            order_position,
            lang,
            r#type,
            expected_mini_game_score,
            words,
        }
    }
    pub fn initial_levels() -> Vec<Self> {
        #[derive(Serialize, Deserialize, Debug)]
        struct JsonParser {
            levels: Vec<Level>,
        }
        let mut data: JsonParser = serde_json::from_str(EN_DATA).unwrap();
        let mut ar_data: JsonParser = serde_json::from_str(AR_DATA).unwrap();
        data.levels.append(&mut ar_data.levels);
        // println!("{:?}", data);

        // let levels = vec![
        //     Level::new(
        //         "j&f".into(),
        //         1,
        //         Lang::En,
        //         Type::Learn,
        //         None,
        //         "jjj fff j f j f j f ffj jff jjj fff".into(),
        //     ),
        //     Level::new(
        //         "j&f".into(),
        //         2,
        //         Lang::En,
        //         Type::Practice,
        //         None,
        //         "jjj fff jjjj ffff jff fjj jfj jjf ffj jjff ffjj fjjj jfff fj jf fff jjj".into(),
        //     ),
        //     Level::new(
        //         "j&f".into(),
        //         3,
        //         Lang::En,
        //         Type::SamuraiGame,
        //         Some(2.0),
        //         "jjjj ffff jj ff fjf jfj ffjj jjff fffj jfff fjfj ffff jjjj".into(),
        //     ),
        //     Level::new(
        //         "j&f".into(),
        //         4,
        //         Lang::En,
        //         Type::DuckHunt,
        //         Some(5.0),
        //         "jjjj ffff jj ff fjf jfj ffjj jjff fffj jfff fjfj ffff jjjj".into(),
        //     ),
        //     Level::new(
        //         "ب|ت".into(),
        //         1,
        //         Lang::Ar,
        //         Type::Learn,
        //         None,
        //         "تتت ببب ت ب ت ب ت ب تتب بتت تتت ببب".into(),
        //     ),
        //     Level::new(
        //         "ت|ب".into(),
        //         2,
        //         Lang::Ar,
        //         Type::Practice,
        //         None,
        //         "تتت ببب تتتت بببب تبب بتت تبت تتب ببت تتبب ببتت تببب بتتت تب بت ببب تتت".into(),
        //     ),
        //     Level::new(
        //         "ت|ب".into(),
        //         3,
        //         Lang::Ar,
        //         Type::SamuraiGame,
        //         Some(2.0),
        //         "تتتت بببب تت بب تبت بتب ببتت تتبب بببت تببب بتبت تتتت بببب".into(),
        //     ),
        //     Level::new(
        //         "ت|ب".into(),
        //         4,
        //         Lang::Ar,
        //         Type::DuckHunt,
        //         Some(5.0),
        //         "تتتت بببب تت بب تبت بتب ببتت تتبب بببت تببب بتبت تتتت بببب".into(),
        //     ),
        // ];
        return data.levels;
    }
}
