export class alphaBGUpdateObject{
  /**@type {string} */
  newColor;
  /** @type {HTMLElement} */
  htmlElem;
}

export class LetterNode{

  constructor( letterValue, colorState, ID){
    this.letterValue = letterValue;
    this.colorState = colorState;
    this.ID = ID;
  }
}