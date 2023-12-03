pub enum Lang {
    En,
    Ar,
}

impl ToString for Lang {
    fn to_string(&self) -> String {
        match *self {
            Lang::En => "en".to_string(),
            Lang::Ar => "ar".to_string(),
        }
    }
}

impl From<String> for Lang {
    fn from(value: String) -> Self {
        let en = String::from("en");
        let ar = String::from("ar");
        match value {
            en => Self::En,
            ar => Self::Ar,
            _ => panic!("expected Lang enum but found: {}", value),
        }
    }
}

pub enum Type {
    Learn,
    Practice,
    SamuraiGame,
    DuckHunt,
    StoryTime,
}

impl ToString for Type {
    fn to_string(&self) -> String {
        match *self {
            Type::Learn => "learn".into(),
            Type::Practice => "practice".into(),
            Type::SamuraiGame => "samurai-game".into(),
            Type::DuckHunt => "duck-hunt".into(),
            Type::StoryTime => "story-time".into(),
        }
    }
}
