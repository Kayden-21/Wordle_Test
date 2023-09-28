const express = require('express');
const path = require('path');
const howToPlayRoute = express.Router();


howToPlayRoute.get('/', async function (req, res) {
    //req.user.emails[0].value;
    res.sendFile(path.join(__dirname, '../views/Howtoplay.html'));
  });

module.exports = howToPlayRoute;