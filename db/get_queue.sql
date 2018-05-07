SELECT queue.id, name, video_img, img FROM queue
JOIN users ON (queue.users_id = users.id)
where queue.id = $1