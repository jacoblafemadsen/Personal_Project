CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  display_name TEXT,
  img TEXT,
  color VARCHAR(10),
  auth_id TEXT,
  rooms_id INTEGER REFERENCES rooms(id)
)