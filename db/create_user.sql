INSERT INTO users(display_name, img, auth_id)
VALUES ($1, $2, $3)
RETURNING *;