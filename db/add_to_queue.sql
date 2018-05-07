INSERT INTO queue(video_id, name, video_img, users_id, rooms_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;