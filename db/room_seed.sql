CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    password VARCHAR(50),
    made_by TEXT
)