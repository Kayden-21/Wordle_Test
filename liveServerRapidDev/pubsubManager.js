import debugManager from './debugLoggerUtils.js';

/**
 * This manages a publisher subscriber pattern for event listening and broadcasting
 */
export class PubSubManager{
  static debugMode = debugManager.debugLevel.None; 
  constructor(){
    this.publishedEvents = {};
  }

  /**
   * Add subscriber to event memery
   * @param {*} eventName broadcast ID
   * @param {*} method event to trigger
   * @returns undefined
   */
  subscribe(eventName,method){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode, {successLog: 'Adding method To pre-existing list'});
      this.publishedEvents.push(method);
      return;
    }
    debugManager.doLog(PubSubManager.debugMode, { successLog: 'Adding method To new list'});
    this.publishedEvents[eventName] = [method];
  }

  /**
   * Publish a value to all subscribed events;
   * @param {string} eventName broadcast ID
   * @param {any | Object} value value passed
   * @returns If a publication is found even if it has no subscribers it will return true else false
   */
  publish(eventName,value){
    if (this.publishedEvents[eventName])
    {
      this.publishedEvents[eventName].forEach(subEvent => {
        subEvent(value);
      });
      debugManager.doLog(PubSubManager.debugMode,{successLog:`Broadcasting event to ${this.publishedEvents[eventName].length} listeners`});
      return true;
    
    }
    debugManager.doLog(PubSubManager.debugMode,{unsuccessLog:`No broadcast group found for the event name of ${eventName}`});

    return false;
  }
  
  /**
   * Adds and emtpy publish entry.
   * @param {string} eventName The name of the publication
   * @returns if the event already exists returns false
   */
  addEmptyPublish(eventName){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: 'Found event and unsubscribed method successfully'});
      return false;
    }
    this.publishedEvents.push(eventName);
    debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: 'Found event and unsubscribed method successfully'});
    return true;
  }

  /**
   * Unsubscribe method from subscriber list
   * @param {string} eventName Broadcast name to search in
   * @param {*} method the method to remove
   * @returns returns true if the method was found in a subscriber list and removed. If the subscriber list or method could not be found returns false
   */
  unsubscribe(eventName,method){
    if (this.publishedEvents[eventName])
    {
      debugManager.doLog(PubSubManager.debugMode,'Found event and unsubscribed method successfully');
      const index = this.publishedEvents[eventName].indexOf(method);
      if (index >= 0)
      {
        debugManager.doLog(PubSubManager.debugMode,'Found event and unsubscribed method successfully');

        this.publishedEvents[eventName].splice(index,1);
        return true;
      }
      debugManager.doLog(PubSubManager.debugMode,undefined,'Found event but could not find the method to unsubscribe');
      return false;
    }
    debugManager.doLog(PubSubManager.debugMode,{unsuccessLog: `No event with the ID of ${eventName}`} );
    return false;
  }
}