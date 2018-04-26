CREATE TABLE IF NOT EXISTS queue (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(20),
    name TEXT,
    video_img TEXT,
    user_img TEXT,
    rooms_id INTEGER REFERENCES rooms(id)
)