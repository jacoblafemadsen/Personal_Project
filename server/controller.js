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
    const rooms_id = req.body.rooms_id
    const id = req.params.id
    db.update_user([id, rooms_id])
      .then(user => res.status(200).send(user[0]))
      .catch(() => res.status(500).send())
  },
  getRoomsQueue: (req, res) => {
    const db = req.app.get('db')
    const rooms_id = req.params.id
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
    const { video_id, video_name, video_img, users_id, rooms_id } = req.body
    db.add_to_queue([video_id, video_name, video_img, users_id, rooms_id])
      .then(queue => res.status(200).send(`${queue[0].id}`))
      .catch(() => res.status(500).send())
  },
  deleteFromQueue: (req, res) => {
    const db = req.app.get('db')
    const id = req.params.id
    db.delete_from_queue([id])
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },
  getQueue: (req, res) => {
    const db = req.app.get('db')
    const id = req.params.id
    db.get_queue([id])
      .then(queue => res.status(200).send(queue[0]))
      .catch(() => res.status(500).send())
  },
  changeColor: (req, res) => {
    const db = req.app.get('db')
    const color = req.body.color
    const id = req.params.id
    db.change_color([id, color])
      .then(user => res.status(200).send(user[0]))
      .catch(() => res.status(500).send())
  }
}