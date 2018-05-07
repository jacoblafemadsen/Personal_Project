CREATE TABLE IF NOT EXISTS queue (
    id SERIAL PRIMARY KEY,
    video_id VARCHAR(20),
    name TEXT,
    video_img TEXT,
    users_id INTEGER REFERENCES users(id),
    rooms_id INTEGER REFERENCES rooms(id)
)