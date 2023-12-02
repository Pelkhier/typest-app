use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Clone, FromRow, Debug, Serialize, Deserialize)]
pub struct User {
    id: i64,
    name: String,
    active: bool,
}
