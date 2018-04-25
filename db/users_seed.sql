CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  display_name TEXT,
  img TEXT,
  auth_id TEXT,
  rooms_id INTEGER REFERENCES rooms(id)
)