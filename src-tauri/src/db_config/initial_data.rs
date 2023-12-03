use crate::models::types::{Lang, Type};

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
        let levels = vec![
            Level::new(
                "j&f".into(),
                1,
                Lang::En,
                Type::Learn,
                None,
                "jjj fff j f j f j f ffj jff jjj fff".into(),
            ),
            Level::new(
                "j&f".into(),
                2,
                Lang::En,
                Type::Practice,
                None,
                "jjj fff jjjj ffff jff fjj jfj jjf ffj jjff ffjj fjjj jfff fj jf fff jjj".into(),
            ),
            Level::new(
                "j&f".into(),
                3,
                Lang::En,
                Type::SamuraiGame,
                Some(2.0),
                "jjjj ffff jj ff fjf jfj ffjj jjff fffj jfff fjfj ffff jjjj".into(),
            ),
            Level::new(
                "j&f".into(),
                4,
                Lang::En,
                Type::DuckHunt,
                Some(5.0),
                "jjjj ffff jj ff fjf jfj ffjj jjff fffj jfff fjfj ffff jjjj".into(),
            ),
        ];
        return levels;
    }
}
