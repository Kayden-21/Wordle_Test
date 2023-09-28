
const express = require('express');
const path = require('path');
const passport = require('passport');
const authRouter = express.Router();
const gameUtils = require('./Utility/gameUtils');

authRouter.get('/', async function (req, res) {
  if(req.isAuthenticated()){
    const email = req.user.emails[0].value;
    played = await gameUtils.HasPlayedGame(email);
    if(played[0].played <= 0){
      res.redirect('/HowToPlay');
    }
    else{
      res.redirect('Highscore');
    }
    
  }
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

authRouter.get('/google', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/Auth' }),
 async function (req, res) {
    // This function will be called when the user has authenticated successfully
    // You can access the user's profile data in `req.user`
    const email = req.user.emails[0].value;
    played = await gameUtils.HasPlayedGame(email);
    console.log('We got here');
    if(played[0].played <= 0){
      res.redirect('/HowToPlay');
    }
    else{
      res.redirect('Highscore');
    }
  }
);

module.exports = authRouter;