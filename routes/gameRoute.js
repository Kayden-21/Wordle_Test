const express = require('express');
const auth = require('./Utility/authUtils');
const word = require('./Utility/wordUtils');
const path = require('path');
const gameUtils = require('./Utility/gameUtils');
const gameRouter = express.Router();

//auth.isLoggedIn,

gameRouter.get('/',auth.isLoggedIn, async function (req, res) {
  const email = req.user?.emails[0]?.value;
  auth.checkUserProfile(email);
  let played = await gameUtils.HasPlayedGame(email);
  if(played[0].played <= 0){
    res.sendFile(path.join(__dirname, '../views/game.html'));
  }
  else{
    res.redirect('Highscore');
  }
  //res.end(await readFile(path.join(__dirname, "../views/index.html")))
});


gameRouter.get('/GetChallenge',auth.isLoggedIn,async function(req,res) {
  let currentWord = await word.getActiveEvent();
  console.log('------Current word-------');
  console.log(currentWord);
  res.json({word : currentWord[0].word});
});

gameRouter.post('/SaveGame',auth.isLoggedIn, async function(req,res) {
  const data = req.body;
  await gameUtils.SaveGame(data.duration, req.user.emails[0].value);
  console.log(data);
  res.redirect('/Highscore');
});

module.exports = gameRouter;
