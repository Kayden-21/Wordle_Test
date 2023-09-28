import * as UIHelpers from './UIHelpers.js';
import { UIConstants } from './gameUIConstants.js';
import { LetterNode } from './types.js';
import UIStateManager from './UIStateManager.js';

/**
 * Generates and mounts grid Code
 * @param {Object} UITree
 * @param {UIStateManager} gameUIManager
 * @param {HTMLElement} MountTarget
 */
export default function generateInputGrid(UITree,gameUIManager,MountTarget){

  /** @type {UIHelpers.DOD[]}*/
  const gridDODList = [];
  /** @type {(number)} */
  let HTMLOut = '';
  for (let r = 0; r < UIConstants.gridSize.value; r++)
    for (let c = 0; c < UIConstants.gridSize.value; c++)
    {
      HTMLOut += `
        <p class="gridItem smallRound" id="R${r}C${c}"></p>
      `;
      gridDODList.push( new UIHelpers.DOD(`R${r}C${c}`,undefined,undefined,undefined) );
    }

  MountTarget.innerHTML = HTMLOut;
  UIHelpers.locateUI(UITree,gridDODList);
  gridDODList.forEach(dodElm => {
    gameUIManager.addUIState(dodElm.ID, new LetterNode('',UIConstants.lightColorPallet[11][0],dodElm.ID));
    gameUIManager.addListenerToUIUpdate(dodElm.ID,gridElementUpdate);
  });
}

/**
 * When the UI info is updated calls this function
 * @param {LetterNode} updateInfo
 */
function gridElementUpdate(updateInfo){
  /** @type {HTMLElement} */
  const self = document.getElementById(`${updateInfo.ID}`);
  /** @type {HTMLElement} */
  // const text =  document.querySelector(`#${updateInfo.ID} p`);
  
  self.classList.add(updateInfo.colorState);
  
  self.innerHTML = updateInfo.letterValue;
}
