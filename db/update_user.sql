UPDATE users
SET rooms_id = $2
WHERE id = $1
RETURNING *;