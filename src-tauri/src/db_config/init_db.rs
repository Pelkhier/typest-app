use sqlx::{migrate::MigrateDatabase, Pool, Sqlite, SqlitePool};

const DB_URL: &str = "sqlite://sqlite.db";

pub async fn initiate_db() -> Pool<Sqlite> {
    if !Sqlite::database_exists(DB_URL).await.unwrap_or(false) {
        println!("Creating database {}", DB_URL);
        match Sqlite::create_database(DB_URL).await {
            Ok(_) => println!("Create db success"),
            Err(error) => panic!("error: {}", error),
        }
    } else {
        println!("Database already exists");
    }

    let db = SqlitePool::connect(DB_URL).await.unwrap();

    let tables = "
        CREATE TABLE User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            text_size TEXT DEFAULT 'small',
            keyboard_sound BOOLEAN DEFAULT 1,
            keyboard_show BOOLEAN DEFAULT 1,
            mini_game_sound BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          
          
          
          CREATE TABLE Level (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_position INTEGER,
            name TEXT,
            lang TEXT DEFAULT 'en',
            type TEXT DEFAULT 'practice',
            expected_mini_game_score REAL,
            words TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          
          
          
          CREATE TABLE UserLevel (
            user_id INTEGER,
            level_id INTEGER,
            completed BOOLEAN DEFAULT 0,
            accuracy REAL,
            time REAL,
            wpm REAL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, level_id),
            FOREIGN KEY (user_id) REFERENCES User(id),
            FOREIGN KEY (level_id) REFERENCES Level(id)
          );
        ";
    match sqlx::query(tables).execute(&db).await {
        Err(_) => println!("Tables already exist"),
        Ok(_) => println!("Tables created successfully"),
    };
    return db;
}
