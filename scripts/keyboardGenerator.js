import { UIConstants,UIIDList } from './gameUIConstants.js';
import * as UIHelpers from './UIHelpers.js';
import UIStateManager from './UIStateManager.js';

/**
 * Generates a keyboard on the given HTML element
 * @param {HTMLElement} targetLocation
 * @param {Function} alphaClicksMeth
 * @param {Object} UITree
 * @param {Function} backClickMeth
 * @param {UIStateManager} gameUIManager
 * @param {Function} alphaKeyUIUpdateMeth
 */
export default function genKeyboard(targetLocation,alphaClicksMeth,UITree,backClickMeth,gameUIManager,alphaKeyUIUpdateMeth){

  let HTMLKeys = '';
  let HTMLOut = '';
  const buttonIDs = [];
  let rowCount = 0;
  let tabIndex = 1;
  UIConstants.keyboardLayout.forEach(keyline => {
    HTMLKeys =keyline.split('').map((key)=>{
      const buttonID = `button${key}`;
      buttonIDs.push(buttonID);
      gameUIManager.addUIState(buttonID,true);
      gameUIManager.addListenerToUIUpdate(buttonID,alphaKeyUIUpdateMeth);
      return `
      <key-button id="button${key}" tabindex="${tabIndex++}">
        <p>${key}</p>
      </key-button>
    `;
    }).join('');
    const backButHTML = `
      <key-button id="${UIIDList.buttonBackSpace}" class="iconButton" tabindex="${tabIndex}">

      </key-button>
    `;
    HTMLOut += `<section class="keyRow">${HTMLKeys}${(rowCount >= 2)? backButHTML :'' }</section>`;
    rowCount++;
  });
  targetLocation.innerHTML = HTMLOut;

  const reactiveComponentList = buttonIDs.map( (id) =>{
    return new UIHelpers.DOD(id, undefined, 'click',() =>{
      alphaClicksMeth(id.substring(6));
    });
  });
  reactiveComponentList.push(new UIHelpers.DOD(UIIDList.buttonBackSpace, undefined, 'click' ,backClickMeth));
  UIHelpers.locateAndMount(UITree,reactiveComponentList);
}
