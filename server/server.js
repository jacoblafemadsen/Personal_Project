require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      socket = require('socket.io'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive')
      ctrl = require('./controller')


const app = express()
app.use(bodyParser.json())

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT
} = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
})

app.use(express.static(`${__dirname}/../build`))

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: 'openid profile'
}, function(accessToken, refreshToken, extraPrams, profile, done) {
  const db = app.get('db')
  const { id, displayName, picture } = profile
  const img = picture, display_name = displayName, auth_id = id
  db.find_user([auth_id]).then(users => {
    if(users[0]) {
      return done(null, users[0].id)
    } else {
      var color = '#00FFFF'
      db.create_user([display_name, img, color, auth_id])
        .then(createdUser => done(null, createdUser[0].id)).catch(e => console.log(e))
    }
  }).catch(e => console.log(e))
}))

passport.serializeUser((id, done) => {
  return done(null, id)
})
passport.deserializeUser((id, done) => {
  app.get('db').find_session_user([id]).then(user => {
    done(null, user[0])
  })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT
}))

app.get(`/auth/me`, ctrl.authMe)
app.get(`/logout`, ctrl.logout)
app.post(`/api/rooms`, ctrl.createRoom)
app.put(`/api/users/:id`, ctrl.updateUser)
app.get(`/api/rooms`, ctrl.getRooms)
app.get(`/api/room/:id`, ctrl.getRoom)
app.get(`/api/queue/:id`, ctrl.getRoomsQueue)
app.post(`/api/queue`, ctrl.addToQueue)
app.delete(`/api/queue/:id`, ctrl.deleteFromQueue)
app.get(`/api/queueitem/:id`, ctrl.getQueue)
app.put(`/api/userscolor/:id`, ctrl.changeColor)

const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)))

io.on('connection', socket => {

  socket.on(`chat message`, input => {
    let { rooms_id, display_name, img, message, color } = input
    let responseObj = {
      display_name: display_name,
      img: img,
      message: message,
      color: color
    }
    io.emit(`chat-${rooms_id}`, responseObj)
  });

  socket.on(`video message`, input => {
    io.emit(`video-${input.rooms_id}`, input.name)
  });

  socket.on(`queue message`, input => {
    io.emit(`queue-${input.rooms_id}`, input.queue_id)
  });
  socket.on(`remove message`, input => {
    io.emit(`remove-${input.rooms_id}`, input.index)
  });
})