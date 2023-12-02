
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
        