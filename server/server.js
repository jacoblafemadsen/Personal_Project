require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      socket = require('socket.io'),
      express = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive')

const app = express()
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
        .then(createdUser => done(null, createdUser[0].id))
    }
  })
}))

passport.serializeUser((id, done) => {
  console.log(id)
  //putting info in session
  return done(null, id)
})
passport.deserializeUser((id, done) => {
  app.get('db').find_session_user([id]).then(user => {
    done(null, user[0])
  })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/dashboard',
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', (req, res) => {
  console.log(req.user)
  if(req.user) {
    res.status(200).send(req.user)
  } else {
    res.status(401).send()
  }
})

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('http://localhost:3000/#/')
})

const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`)))

var playerSocket = io.of('/player-namespace')
playerSocket.on('connection', socket => {
  socket.on('blast message', input => {
    playerSocket.emit('generate response', input)
  });
})

var chatSocket = io.of('/chat-namespace')
chatSocket.on('connection', socket => {
  socket.on('blast message', input => {
    chatSocket.emit('generate response', input)
  });
})

var queueSocket = io.of('/queue-namespace')
queueSocket.on('connection', socket => {
  socket.on('blast message', input => {
    queueSocket.emit('generate response', input)
  });
})