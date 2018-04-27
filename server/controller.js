module.exports = {
  authMe: (req, res) => {
    if(req.user.id) {
      res.status(200).send(req.user)
    } else {
      res.status(401).send()
    }
  },
  logout: (req, res) => {
    req.logOut()
    res.redirect('http://localhost:3000/#/')
  },
  createRoom: (req, res) => {
    const db = req.app.get('db')
    const { name, password, made_by } = req.body
    db.create_room([name, password, made_by])
      .then(room => res.status(200).send(room[0]))
      .catch(() => res.status(500).send())
  },
  updateUser: (req, res) => {
    const db = req.app.get('db')
    const room_id = req.body.room_id
    const id = req.params.id
    db.update_user([id, room_id])
      .then(user => res.status(200).send(user[0]))
      .catch(() => res.status(500).send())
  },
  getRoomsQueue: (req, res) => {
    const db = req.app.get('db')
    const rooms_id = req.params.id
    console.log(rooms_id)
    db.get_rooms_queue([rooms_id])
      .then(queue => res.status(200).send(queue))
      .catch(() => res.status(500).send())
  },
  getRooms: (req, res) => {
    const db = req.app.get('db')
    db.get_rooms()
      .then(rooms => res.status(200).send(rooms))
      .catch(() => res.status(500).send())
  },
  addToQueue: (req, res) => {
    const db = req.app.get('db')
    const { video_id, video_name, video_img } = req.body
    const { rooms_id, img } = req.body.user
    console.log([video_id, video_name, video_img, img, rooms_id])
    db.add_to_queue([video_id, video_name, video_img, img, rooms_id])
      .then(queue => res.status(200).send(queue[0]))
      .catch(() => res.status(500).send())
  },
  deleteFromQueue: (req, res) => {
    const db = req.app.get('db')
    const id = req.params.id
    db.delete_from_queue([id])
      .then(() => res.status(500).send())
      .catch(() => res.status(500).send())
  }
}