import UIStateManager from './UIStateManager.js';
import * as UIHelpers from './UIHelpers.js';
import { UIConstants,UIIDList } from './gameUIConstants.js';
import genKeyboard from './keyboardGenerator.js';
import generateInputGrid from './generateInputGrid.js';
import words from './validWords.js';
import { getWordOfTheDay, postUserData }  from './API.js';
import {alphaBGUpdateObject, LetterNode} from './types.js';

//Game data state being display and what is used for logic
const compDataState = {
  /** @type {boolean} */
  colorStateLight:true,
  /** @type {boolean} */
  soundOn: false,
  startTime: new Date(),
  /** @type {number} */
  activeGridInput: 0,
  /** @type {boolean} */
  canUseEnter: false,
  currentTime: null,
  /** @type {HTMLElement} */
  previousSelected:null,
  /** @type {number} */
  intervalStorage: null,
  /** @type {number} */
  guessUsed:0,
  correctWord: (await getWordOfTheDay()).toUpperCase()
};
function setUpdateGridSize(){
  /** @type { HTMLElement } */
  const rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.gridSize.varName,UIConstants.gridSize.value);
}
setUpdateGridSize();
/**
 * updates the css root variables with the corresponding color value
 * @param {*} ColorPallet theme passed in
 */
function updateColorPalletFromState(ColorPallet){
  let rootVars = document.querySelector(':root');
  ColorPallet.forEach(colorPair => {
    rootVars.style.setProperty(colorPair[0],colorPair[1]);
  });
  rootVars.style.setProperty(UIConstants.gridSelectedClass.varName,(compDataState.colorStateLight)?UIConstants.gridSelectedClass.lightModeValue:UIConstants.gridSelectedClass.darkModeValue);
}

/**
 * Updates the logo
 * @param {*} LogoURL the url to the logo to display
 */
function updateLogo(LogoURL){
  let rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.logo.logoVar,LogoURL);
}

function updateThemeIcon(ThemeIconURL){
  let rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.icons.themeIcon.iconVar,ThemeIconURL);
}

function updateValidityIndicator(color){
  let rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.validityIndicator.varName,color);
}

//Create UIStateManager instance for this page
const gameUIManager = new UIStateManager();

// Register the game color pallet (theme) UI state with lightmode being the initial mode
gameUIManager.addUIState(UIIDList.gameColorPallet,UIConstants.lightColorPallet);
gameUIManager.addListenerToUIUpdate(UIIDList.gameColorPallet,updateColorPalletFromState );

// Figure it out your smart enough
gameUIManager.addUIState(UIIDList.logo,UIConstants.logo.lightMode);
gameUIManager.addListenerToUIUpdate(UIIDList.logo,updateLogo );

// Figure it out your smart enough
gameUIManager.addUIState(UIIDList.colorToggle,UIConstants.logo.lightMode);
gameUIManager.addListenerToUIUpdate(UIIDList.colorToggle,updateThemeIcon );

gameUIManager.addUIState(UIIDList.validityIndicator ,UIConstants.validityIndicator.invalidColor);
gameUIManager.addListenerToUIUpdate(UIIDList.validityIndicator,updateValidityIndicator );

// Method which is triggered on the onclick event of the theme icon click
function onThemeSwitchClick(){
  // Updating the logical state of the theme
  compDataState.colorStateLight = !compDataState.colorStateLight;

  // Getting the corresponding color pallet and calling the uiManager updateState method to run all subscribed methods with the new state
  const colorPallet = (compDataState.colorStateLight)? UIConstants.lightColorPallet: UIConstants.darkColorPallet;
  gameUIManager.updateUIState(UIIDList.gameColorPallet,colorPallet);

  const logoURL = (compDataState.colorStateLight)? UIConstants.logo.lightMode: UIConstants.logo.darkMode;
  gameUIManager.updateUIState(UIIDList.logo,logoURL);

  const themeIcon = (compDataState.colorStateLight)? UIConstants.icons.themeIcon.lightMode: UIConstants.icons.themeIcon.darkMode;
  gameUIManager.updateUIState(UIIDList.colorToggle,themeIcon);

  gameUIManager.updateUIState(UIIDList.mainEnterButton ,resolveEnterBackgroundColor());

}

// Utility method to calculate and update the timer UI Component
function calculateGameTimePass(){
  const makeTwo = (value) => {
    if (`${value}`.length < 2)
      return `0${value}`;
    return `${value}`;
  };

  const currentTime = new Date(Math.abs(new Date() - compDataState.startTime))  ;
  const time = `${makeTwo(currentTime.getMinutes())}:${makeTwo(currentTime.getSeconds()) }` ;
  compDataState.currentTime = time;
  UITree[UIIDList.timeCount].innerText = time;
}

//Object used to store all used components which have methods subscribed to events on them
const UITree = {};

/** @type {number} */
/**
 * convertes between an index and a coordinate
 * @returns
 */
function gridIndexToCord(){
  // Yes its X;Y;
  return [compDataState.activeGridInput % UIConstants.gridSize.value, Math.floor(compDataState.activeGridInput / UIConstants.gridSize.value)];
}

function bumpGridIndex(enterClick){

  if (! (enterClick || compDataState.activeGridInput == 0 || (compDataState.activeGridInput+1) % UIConstants.gridSize.value))
    return;
  compDataState.activeGridInput++;

  updateNowSelectedInputBox();
}

/**
 * Unbumps the
 * @returns
 */
function unBumpIndex(){
  if (compDataState.activeGridInput <= 0)
    return;
  if ((compDataState.activeGridInput) % UIConstants.gridSize.value)
  {
    compDataState.activeGridInput--;
    updateNowSelectedInputBox();
  }
}

function isValidWord(userWord){
  return words.includes(userWord.toLowerCase()) || compDataState.correctWord == userWord;
}

/**
 * Gets the last row of input that is displayed
 * @returns @type {string} The combined characters in the last row.
 */
function getInputString(){

  const loc = gridIndexToCord();
  let strOut = '';
  for (let i= 0; i < UIConstants.gridSize.value;i++){
    strOut += gameUIManager.getUIState(`R${loc[1]}C${i}`)?.letterValue;
  }
  return strOut;
}

/**
 * Checks the user input against the received value and updating the GUI
 * @param {string} userWord
 * @param {string} gottenWord
 * @param {number} row
 */
function checkEnteredValue(gottenWord,row){
  let allCharCorrect = true;
  for (let i = 0; i < UIConstants.gridSize.value; i++){
    const UIID = `R${row}C${i}`;
    /** @type { LetterNode } */
    const currentUIState = gameUIManager.getUIState(UIID);

    const buttonID = `button${currentUIState.letterValue}`;
    // const currentButton = UITree[];
    if (currentUIState.letterValue == gottenWord.charAt(i))
    {
      currentUIState.colorState = UIConstants.gridDisplayItemState.completelyCorrect;
    }
    else if (gottenWord.indexOf(currentUIState.letterValue)>=0)
    {
      currentUIState.colorState = UIConstants.gridDisplayItemState.semiCorrect;
      allCharCorrect = false;
    }
    else
    {
      currentUIState.colorState = UIConstants.gridDisplayItemState.wrong;
      allCharCorrect = false;
    }

    gameUIManager.updateUIState(UIID,currentUIState);
    gameUIManager.updateUIState(buttonID, {
      newColor:currentUIState.colorState,
      htmlElem: UITree[buttonID]
    });
  }

  return allCharCorrect;
}

/**
 * Calls does game logic and maybe call the postDataMethod
 * @returns
 */
async function enterClick(){
  if (!compDataState.canUseEnter)
    return;
  compDataState.guessUsed++;
  const loc = gridIndexToCord();
  const wasCorrect = checkEnteredValue(compDataState.correctWord,loc[1]);
  gameUIManager.updateUIState(UIIDList.validityIndicator,UIConstants.validityIndicator.invalidColor);
  if (!wasCorrect && (compDataState.guessUsed < UIConstants.gridSize.value ))
  {
    bumpGridIndex(true);
    return;
  }

  clearInterval(compDataState.intervalStorage);
  compDataState.canUseEnter = false;
  gameUIManager.updateUIState(UIIDList.enterButton,resolveEnterBackgroundColor());
  if (compDataState.guessUsed == UIConstants.gridSize.value && !wasCorrect){
    console.log('BetterLuckNextTime');
    await postUserData('UserFailedNoMoreGuesses');
  }
  else
    await postUserData(compDataState.currentTime);
}

/**
 * Update displaycolor of keyboard background
 * @param {alphaBGUpdateObject} Object containing new background color and htmlElement
 */
function alphaBGUpdate({newColor,htmlElem}){
  htmlElem.style.backgroundColor = `var(${newColor})`;
  htmlElem.classList.forEach(element => {
    htmlElem.classList.remove(element);
  });
  htmlElem.classList.add(newColor);
}

/**
 * resolves the background color of the enter button
 * @returns {string} the color of the background
 */
function resolveEnterBackgroundColor(){
  const colorpallet = (compDataState.colorStateLight)? UIConstants.enterButton.lightmode: UIConstants.enterButton.darkmode;
  return (compDataState.canUseEnter)?colorpallet.enable:colorpallet.disabled;
}

/**
 * Update the enter Button background
 * @param {string } newBackgroundColor
 */
function updateButtonBackground(newBackgroundColor){
  const rootVars = document.querySelector(':root');
  rootVars.style.setProperty(UIConstants.enterButton.backgroundVar ,newBackgroundColor);
}

/**
 * event which triggers when a key is clicked
 * @param {string} key
 */
function alphaKeyClick(key){
  /** @type {number[]} */
  const locate =gridIndexToCord();

  /** @type {string} */
  const accessUIID = `R${locate[1]}C${locate[0]}`;

  /** @type { LetterNode }*/
  const currentState = gameUIManager.getUIState(accessUIID);
  currentState.letterValue = key;

  gameUIManager.updateUIState(accessUIID, currentState);
  bumpGridIndex(false);

  const validWord = isValidWord(getInputString());
  compDataState.canUseEnter = validWord;
  gameUIManager.updateUIState(UIIDList.validityIndicator,(validWord)?UIConstants.validityIndicator.validColor: UIConstants.validityIndicator.invalidColor);

  gameUIManager.updateUIState(UIIDList.mainEnterButton,resolveEnterBackgroundColor());
}

/**
 * executes when back button is clicked
 */
function backButtonClick(){
  const locate =gridIndexToCord();

  /** @type {string} */
  const accessUIID = `R${locate[1]}C${locate[0]}`;

  const currentState = gameUIManager.getUIState(accessUIID);
  if (currentState.letterValue === '')
    unBumpIndex();
  else
    currentState.letterValue = '';

  gameUIManager.updateUIState(accessUIID, currentState);
  gameUIManager.updateUIState(UIIDList.validityIndicator,UIConstants.validityIndicator.invalidColor);

}

function updateNowSelectedInputBox(){
  const loc = gridIndexToCord();
  if (compDataState.previousSelected)
    compDataState.previousSelected.classList.remove(UIConstants.gridSelectedClass.className);

  compDataState.previousSelected = UITree[`R${loc[1]}C${loc[0]}`];
  if (!compDataState.previousSelected)
    return;
  compDataState.previousSelected.classList.add(UIConstants.gridSelectedClass.className);
}

gameUIManager.addUIState(UIIDList.mainEnterButton,{});
gameUIManager.addListenerToUIUpdate(UIIDList.mainEnterButton,updateButtonBackground);
updateButtonBackground(resolveEnterBackgroundColor());

/**
 * Loads DOM elements with corresponding events and methods into the UITree;
 */
export function activateUI(){

  //Adds finds and adds methods as subscribers to the given domElement
  const reactiveComponentList = [
    new UIHelpers.DOD(UIIDList.colorToggle, undefined, 'click',onThemeSwitchClick),
    new UIHelpers.DOD(UIIDList.mainEnterButton, undefined, 'click',enterClick),
  ];
  UIHelpers.locateAndMount(UITree,reactiveComponentList);

  //Finds and adds DOM element to UITree, not there is not events listening.
  const liveComponentList = [
    new UIHelpers.DOD(UIIDList.timeCount),
    new UIHelpers.DOD(UIIDList.keyboardContainer),
    new UIHelpers.DOD(UIIDList.validityIndicator)
  ];

  UIHelpers.locateUI(UITree,liveComponentList);

  calculateGameTimePass();
  compDataState.intervalStorage = setInterval(calculateGameTimePass,1000);

  genKeyboard(UITree.keyboardContainer,alphaKeyClick ,UITree,backButtonClick, gameUIManager,alphaBGUpdate);

  UIHelpers.locateUI(UITree,[new UIHelpers.DOD(UIIDList.displayBoard)]);
  generateInputGrid(UITree,gameUIManager,UITree[UIIDList.displayBoard]);

  updateNowSelectedInputBox();

}
