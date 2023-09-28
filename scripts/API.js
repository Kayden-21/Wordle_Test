import { UIConstants } from './gameUIConstants.js';

const baseUrl = window.location.href.split('/').slice(0, 3).join('/');

/**
 * Returns the queried word of the day
 * @returns @type {string}
 */

export async function getWordOfTheDay() {
  if (UIConstants.APILocalMode == true)
    return 'Swore';

  const request = await fetch(`${baseUrl}/Game/GetChallenge`);
  const data = await request.json();
  console.log(data.word);
  return data.word;
}

/**
 * posts user data to backend Very securely :->
 * @param {string} time
 * @returns
 */
export async function postUserData(time) {

  if (UIConstants.APILocalMode == true)
  {
    location.href = `${baseUrl}/Highscore`;
    console.log('This is suppose to post the user data');
    return true;
  }

  await fetch(`${baseUrl}/Game/SaveGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Add any other required headers
    },
    body: JSON.stringify({
      duration: (time.length > 5) ? '23:59:59' : `00:${time}`
    }) // Replace 'data' with your actual request payload
  })
    .then(() => {
      // Handle the response data
      location.href = `${baseUrl}/Highscore`;
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
}


export async function getHighScore(){
  if (UIConstants.APILocalMode === true)
    return {
      'highScores': [
        {
          'event_id': 116,
          'user_id': 8,
          'user_email': 'lolMail@gmail.com',
          'word': 'panda',
          'duration': '1970-01-01T00:00:10.000Z'
        },
        {
          'event_id': 116,
          'user_id': 9,
          'user_email': 'lolMail@gmail.com',
          'word': 'panda',
          'duration': '1970-01-01T00:00:17.000Z'
        },
        {
          'event_id': 116,
          'user_id': 2,
          'user_email': 'lolMail@gmail.com',
          'word': 'panda',
          'duration': '1970-01-01T00:00:38.000Z'
        },
        {
          'event_id': 116,
          'user_id': 3,
          'user_email': 'lolMail@gmail.com',
          'word': 'panda',
          'duration': '1970-01-01T00:09:14.000Z'
        },
        {
          'event_id': 116,
          'user_id': 4,
          'user_email': 'lolMail@gmail.com',
          'word': 'panda',
          'duration': '1970-01-01T00:10:06.000Z'
        }
      ],
      'userScore': {
        'event_id': 116,
        'user_id': 7,
        'user_email': 'lolMail@gmail.com',
        'word': 'panda',
        'duration': '1970-01-01T23:59:59.000Z'
      },
      'userRank': {
        'UserAbove': 0
      }
    };

  let data = await fetch(`${baseUrl}/Highscore/scores`);
  data = await data.json();
  console.log(data);
  // data = data.highscore;
  // data.sort();
  return data;
}

