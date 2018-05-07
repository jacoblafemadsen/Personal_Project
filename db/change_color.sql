UPDATE users
SET color = $2
WHERE id = $1
RETURNING *;