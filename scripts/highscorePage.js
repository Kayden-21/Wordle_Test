import { getHighScore, getWordOfTheDay } from './API.js';
import { getRandomAnimalNames } from './randomAnimalNames.js';

/**
 * 
 * @param {string} duration 
 */
function resolveTime(duration){
  const makeTwo= (value)=>{
    return ( `${value}`.length >= 2)? `${value}` : `0${value}`;
  };
  
  if (duration.indexOf('59:59')>=0)
    return '-:-';
  
  const time = new Date(duration);
  return `${makeTwo(time.getMinutes())}:${makeTwo(time.getSeconds())}`;
}

const boxes = document.getElementById('correctWordDisplay');
const scoreBoard = document.getElementById('scoreBoard');
const timeDisplay = document.querySelector('.time p');
const resultMessage = document.getElementById('resultMessage');

/** @type {HTMLImageElement} */
const outcomeIcon = document.getElementById('outcomeIcon');

const tableRowHeaders = `
			<tr>
				<th id="rankColumn">Rank</th>
				<th id="nameColumn">Name</th>

				<th id="timeColumn">
					<img src="./timeIcon.svg" alt="Timer">
					Time
				</th>
			</tr>`;

const displayData = await getHighScore();

console.log(displayData);

const userNames = getRandomAnimalNames(5);
const correctWord = (await getWordOfTheDay()).toUpperCase();

boxes.innerHTML = correctWord.split('').map((char)=>{
  return `
  <p class="green-box">${char}</p>
  `;
}).join('');

let innerHTML = '';
for (let i = 0; i < Math.min(displayData.highScores.length,5)   ;i++){
  innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td>${(displayData.highScores[i].user_id === displayData.userScore.user_id)?'You':userNames[i]}</td>
      <td>${resolveTime(displayData.highScores[i].duration)}</td>
    </tr>
  `;
}

for (let i = Math.min(displayData.highScores.length,5); i <  5  ;i++){
  innerHTML += `
    <tr>
      <td><p class="noData">...</p></td>
      <td><p class="noData">...</p></td>
      <td><p class="noData">...</p></td>
    </tr>
  `;
}

innerHTML +=`
<tr id="userRow">
  <td>${displayData.userRank.UserAbove+1}</td>
  <td>You</td>
  <td>${resolveTime(displayData.userScore.duration)}</td>
</tr>
`;
scoreBoard.innerHTML = `${tableRowHeaders}${innerHTML}`;

timeDisplay.innerHTML = `${resolveTime(displayData.userScore.duration)}`;

if (displayData.userScore.duration.indexOf('59:59')>=0)
{
  resultMessage.innerText = 'Better luck next time';
  outcomeIcon.src= './wrongIcon.svg';
}