INSERT INTO rooms(name, password, made_by)
VALUES ($1, $2, $3)
RETURNING *;