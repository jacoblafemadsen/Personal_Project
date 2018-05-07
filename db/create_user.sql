INSERT INTO users(display_name, img, color, auth_id)
VALUES ($1, $2, $3, $4)
RETURNING *;