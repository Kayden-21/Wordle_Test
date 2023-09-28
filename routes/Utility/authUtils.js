const DB = require('./dbUtils');
const configManager = require('../../globalUtils/configManager');

async function checkUserProfile(email){
  try{
    console.log('check if user : ' + email + ' exists');
    const statement = 'SELECT * FROM USERS WHERE user_email = ' + '\'' + email + '\'';
    console.log(statement);
    let result = await DB.executeQuery(statement);
    if(result.length == 0){
      const insertStatement = 'INSERT INTO USERS (user_email) VALUES (\'' + email + '\')';
      await DB.executeQuery(insertStatement);
    }
  }catch(e){
    console.log('ooops user error occured: ' + e);
  }   
}

const isLoggedIn = (req, res, next) => {
  if (configManager.getChain('developerMode.noAuth') || req.isAuthenticated()) {
    return next();
  }
  res.redirect('/Auth');
};

module.exports = {checkUserProfile, isLoggedIn};
