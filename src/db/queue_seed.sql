CREATE TABLE IF NOT EXISTS queue (
    id SERIAL PRIMARY KEY,
    name TEXT,
    vid_length INTEGER,
    img TEXT,
    users_id INTEGER REFERENCES users(id)
)