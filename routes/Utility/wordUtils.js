
const axios = require('axios');
const DB = require('./dbUtils');

async function getWord(){
  let response = await axios.get('https://random-word-api.vercel.app/api?words=1&length=5');
  return response.data;
  //create new event here that adds to DB and creates a new event.
  //return word
}

async function createNewEvent(){
  let word = await getWord();
  console.log(word);
  const deactivationQuery = 'UPDATE EVENTS SET active = 0;';
  try{
    await DB.executeQuery(deactivationQuery);
    console.log('Deactivated previous events');
  }catch(e){
    console.log("-> breaking here " + e);
  }
  const query = 'INSERT INTO EVENTS (word, active) VALUES (\'' + word + '\', 1)';
  try{
    await DB.executeQuery(query);
    console.log('event successfully created');
  }catch(e){
    console.log(e);
  }
  await getActiveEvent();
}

async function getActiveEvent(){
  try{
    const query = 'SELECT * FROM EVENTS WHERE active = 1';
    let result = await DB.executeQuery(query);
    return result
  }catch(e){
    console.log(e);
  }
}

module.exports = {createNewEvent, getActiveEvent};