require('dotenv').config()
const app = require('express')(),
      bodyParser = require('body-parser'),
      socket = require('socket.io'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive')

app.use(bodyParser.json())

const {
  SERVER_PORT,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  CONNECTION_STRING
} = process.env

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
})

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
  db.find_user([id]).then(users => {
    if(users[0]) {
      return done(null, users[0].id)
    } else {
      db.create_user([displayName, picture, id])
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
  successRedirect: 'http://localhost:3000/#/findroom',
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', (req, res) => {
  if(req.user.id) {
    res.status(200).send(req.user)
  } else {
    res.status(401).send()
  }
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('http://localhost:3000/#/')
})

app.post('/api/makeroom', (req, res) => {
  const db = app.get('db')
  const { name, password, made_by } = req.body
  db.create_room([name, password, made_by])
    .then(room => res.status(200).send(room[0]))
    .catch(() => res.status(500).send())
})

app.put(`/api/joinroom/:id`, (req, res) => {
  const db = app.get('db')
  const room_id = req.body.room_id
  const id = req.params.id
  db.update_user([id, room_id])
    .then(user => res.status(200).send(user[0]))
    .catch(() => res.status(500).send())
})

app.get(`/api/rooms`, (req, res) => {
  const db = app.get('db')
  db.get_rooms()
    .then(rooms => res.status(200).send(rooms))
    .catch(() => res.status(500).send())
})

const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)))

io.on('connection', socket => {

  // socket.on('room', (room) => {
  //   socket.join(`chat${room}`);
  //   socket.join(`video${room}`);
  //   socket.join(`queue${room}`);
  // });

  socket.on(`chat message`, input => {
    console.log(input)
    io.emit('chat response', input)
  });

  socket.on(`video message`, input => {
    console.log(input)
    io.emit('video response', input)
  });

  socket.on(`queue message`, input => {
    console.log(input)
    io.emit('queue response', input)
  });
})