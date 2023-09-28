const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const gameRoute = require('./routes/gameRoute');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
const highscoreRoute = require('./routes/highScoreRoute');
const howToPlayRoute = require('./routes/howToPlayRoute');
const word = require('./routes/Utility/wordUtils');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();

const configManager = require('./globalUtils/configManager');

function resolveDeployedCallbacks(){
  return configManager.getChain('google.callbackURLdeployement');
}

function resolveLocalCallBacks(){
  return configManager.getChain('google.localcallbackURLdeployement');
}

console.log((configManager.get('localDebug'))?resolveLocalCallBacks(): resolveDeployedCallbacks());

passport.use(
  new GoogleStrategy(
    {
      clientID: configManager.getChain('google.clientID'),
      clientSecret: configManager.getChain('google.clientSecret'),
      callbackURL: (configManager.get('localDebug'))?resolveLocalCallBacks(): resolveDeployedCallbacks(),
    },
    (accessToken, refreshToken, profile, cb) => {
      // This function will be called when the user has authenticated successfully
      // You can access the user's profile data in the `profile` object
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(bodyParser.json());

app.use(
  session({
    secret: 'KEKW2017',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.get('/', (req, res) => {
  res.redirect('/Auth');
});

app.use(express.static('scripts'));
app.use(express.static('images'));
app.use(express.static('styling'));
app.use(express.static('resources'));
app.use(express.static('images'));
app.use('/Game', gameRoute);
app.use('/Auth', authRoute);
app.use('/Highscore', highscoreRoute);
app.use('/HowToPlay', howToPlayRoute);

const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
word.createNewEvent();
setInterval(word.createNewEvent,millisecondsIn24Hours);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
