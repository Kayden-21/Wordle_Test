const  { executeQuery,closeConnection } = require('./routes/Utility/dbUtils');
const gameUtils = require('./routes/Utility/gameUtils');
async function fetchAndPrint(){
  await executeQuery('SELECT * FROM EVENTRESPONSES');
  closeConnection();
 
  console.log(gameUtils.getUserScore('kaydenkara@gmail.com'));
  // console.log(res);
}
fetchAndPrint();