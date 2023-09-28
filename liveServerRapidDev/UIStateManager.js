import * as pubsubManagerUtls from './pubsubManager.js';
import debugManager from './debugLoggerUtils.js';

/**
 * The UIStatemanager manages any events that need to be triggered on an css (UI) updated.
 * The whole class in its current state is a glorified pubsub manager that remembers state
 */
export default class UIStateManager{
  static debugMode = debugManager.debugLevel.None;
  constructor(){
    //In the current state hashState is only used to track the count of UI changes for a spesific UI element
    this.UIHashState = {};
    // UI state remembers the last passed in.
    this.UIState = {};
    // The pubsub object used to execute the correct event list
    this.pubSub = new pubsubManagerUtls.PubSubManager();
  }

  /**
   * Registers an new UIevent and initial state
   * @param {string} UIID UIEvent broadcast ID
   * @param {Object} value Initial state passed in.
   * @returns True if could be added successfully false if not.
   */
  addUIState(UIID,value){
    if (this.UIState[UIID] != undefined)
    {
      debugManager.doLog(UIStateManager.debugMode, {unsuccessLog: `The ID ${UIID} is already in use`});
      return false;
    }
    debugManager.doLog(UIStateManager.debugMode, {successLog: `Added successfully as ${UIID}`});
    this.UIState[UIID] = value;
    this.UIHashState[UIID] = 0;
    return true;
  }

  /**
   * Register function on a UIID, this executes the method as soon as update has been issued with corresponding UIID.
   * @param {String} UIID UIID to listen for in case of a publish
   * @param {function} method the method to be executed as soon as a publish happens
   * @returns True if state for this UIID has beend added before else false
   */
  addListenerToUIUpdate(UIID,method){
    if (this.UIState[`${UIID}`] == undefined)
    {
      debugManager.doLog(UIStateManager.debugMode,{unsuccessLog:`Failed to find UI element with ID: ${UIID}`});
      return false;
    }
    debugManager.doLog(UIStateManager.debugMode,{successLog: `Method was subscribed to: ${UIID}`});
    this.pubSub.subscribe(UIID,method);
    return true;
  }

  /**
   * Triggers a publish call for the given UIID
   * @param {String} UIID UIID to be published as.
   * @param {object} newState The state to be passed in for all the subscribed methods
   * @returns False if the UIID was not bound to a state. True if successful
   */
  updateUIState(UIID,newState){
    if (this.UIState[UIID] == undefined){
      debugManager.doLog(UIStateManager.debugMode,{unsuccessLog:`Failed to find UI element with ID: ${UIID}. Can't update`});
      return false;
    }
    this.UIState[UIID] = newState;
    this.UIHashState[UIID]++;
    this.pubSub.publish(UIID,this.UIState[UIID]);
    debugManager.doLog(UIStateManager.debugMode,{successLog:'Updated state and called called broadcasted updated'});
    return true;
  }

  /**
   * Gets the current held state for a given UIID
   * @param {string} UIID
   * @returns Either the state which could be anything or null;
   */
  getUIState(UIID){
    if (!this.UIState[UIID]) {
      debugManager.doLog(UIStateManager.debugMode, { unsuccessLog: `Failed to find UI element with ID: ${UIID}. Can't return state` });
      return null;
    }
    return this.UIState[UIID];
  }
}
