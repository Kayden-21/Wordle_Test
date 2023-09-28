const express = require('express');
const highscoreRoute = express.Router();
const path = require('path');
const gameUtils = require('./Utility/gameUtils');

highscoreRoute.get('/', async function (req, res) {
  //req.user.emails[0].value;
  res.sendFile(path.join(__dirname, '../views/highscore.html'));
});


highscoreRoute.get('/scores', async function(req,res){
  //const email = req.user.emails[0].value;
  const highscore = await gameUtils.HighScores();
  const userScore = (await gameUtils.getUserScore(req.user?.emails[0]?.value ))[0];
  const userRank = (await gameUtils.getUserRank(userScore.user_id)) || 999;
  res.json({
    highScores:highscore,
    userScore:userScore,
    userRank:userRank[0]
  });
  res.status = 201;
});

module.exports = highscoreRoute;
