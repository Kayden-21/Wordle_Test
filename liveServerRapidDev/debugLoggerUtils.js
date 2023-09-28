export default class debugManager{
  /**
   * The level of debug messages
   */
  static debugLevel = {
    None:0,
    All:1,
    UnsuccessfulOnly:2,
    SuccessfulOnly:3
  };
  /**
   * Log a message depending on the debugLevel passed in
   * @param {debugManager.debugLevel} debugLevel The level of the messages which want to be seen
   * @param {*} MessageObject
   */
  static doLog(debugLevel,{successLog, unsuccessLog}){
    switch (debugLevel){

    case debugLevel.None: break;

    case debugLevel.All: {
      if (successLog)
        console.log(successLog);
      if (unsuccessLog)
        console.log(unsuccessLog);
    }
      break;

    case debugLevel.SuccessfulOnly && successLog: {
      console.log(successLog);
    }
      break;

    case debugLevel.UnsuccessfulOnly && unsuccessLog: {
      console.log(unsuccessLog);
    }
      break;
    }
  }
}