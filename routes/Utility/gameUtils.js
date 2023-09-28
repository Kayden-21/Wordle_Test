const word = require('./wordUtils');
const DB = require('./dbUtils');

async function SaveGame(duration,email){
  try {
    await word.getActiveEvent();
    const userIDQuery = 'SELECT user_id FROM USERS WHERE user_email = \'' + email + '\'';
    const eventIDQuery = 'SELECT event_id FROM EVENTS WHERE active = 1';
    let eventId = await DB.executeQuery(eventIDQuery);
    let userId = await DB.executeQuery(userIDQuery);
    const insertQuery = 'INSERT INTO EVENTRESPONSES (event_id,user_id,duration) VALUES ('+eventId[0].event_id+','+userId[0].user_id+',\''+duration+'\')';
    await DB.executeQuery(insertQuery);

  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }

}

async function HighScores(){
  try{
    const highScoreQuery = `SELECT TOP 5 EVENTS.event_id, USERS.user_id, EVENTS.word, EVENTRESPONSES.duration FROM EVENTRESPONSES
        INNER JOIN EVENTS ON EVENTRESPONSES.event_id = EVENTS.event_id
        INNER JOIN USERS ON EVENTRESPONSES.user_id = USERS.user_id
        WHERE EVENTS.ACTIVE = 1
        ORDER BY EVENTRESPONSES.duration ASC;`;
    const result = await DB.executeQuery(highScoreQuery);
    return result;

  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }
}

async function getUserScore(email){
  try{
    const userIDQuery = `SELECT user_id FROM USERS WHERE user_email = '${email}'`;
    const userID = await DB.executeQuery(userIDQuery);
    const userScoreQuery = `SELECT EVENTS.event_id, USERS.user_id, USERS.user_email, EVENTS.word, EVENTRESPONSES.duration FROM EVENTRESPONSES
    INNER JOIN EVENTS ON EVENTRESPONSES.event_id = EVENTS.event_id
    INNER JOIN USERS ON EVENTRESPONSES.user_id = USERS.user_id
    WHERE EVENTS.ACTIVE = 1 AND USERS.user_id = ${userID[0].user_id}`;
    const userScore = await DB.executeQuery(userScoreQuery);
    return userScore;

  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }
}

async function getUserRank(userID){
  try{
    const userScoreQuery = `SELECT COUNT(duration) AS [UserAbove] FROM EVENTRESPONSES
    INNER JOIN EVENTS ON EVENTRESPONSES.event_id = EVENTS.event_id
    WHERE EVENTS.ACTIVE = 1 AND EVENTRESPONSES.duration < (
      SELECT EVENTRESPONSES.duration FROM EVENTRESPONSES
      INNER JOIN EVENTS ON EVENTRESPONSES.event_id = EVENTS.event_id
      WHERE EVENTS.ACTIVE = 1 AND EVENTRESPONSES.user_id = ${userID}
    )`;
    const userScore = await DB.executeQuery(userScoreQuery);
    return userScore;

  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }
}

async function HasPlayedGame(email){
  try{
    const hasPlayedQuery = `select count(*) as played from USERS
      INNER JOIN EVENTRESPONSES ON USERS.user_id = EVENTRESPONSES.user_id
      INNER JOIN EVENTS ON EVENTS.event_id = EVENTRESPONSES.event_id
      WHERE EVENTS.active = 1 and USERS.user_email = '${email}'`;
    const result = await DB.executeQuery(hasPlayedQuery);
    return result;

  } catch (error) {
    console.log('ooops user error occured: ' + error);
  }
}

module.exports = { SaveGame, HighScores, HasPlayedGame, getUserRank, getUserScore };
