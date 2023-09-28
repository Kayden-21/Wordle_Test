const fs = require('fs');
const path = require('path');
const configPath = '../configs/config.json';

module.exports = class configManager{
  static config = configManager.readConfig();

  static readConfig(){
    return JSON.parse(fs.readFileSync(path.join(__dirname,configPath)));
  }
  
  static get(required){
    return configManager.config[`${required}`] || null;
  }

  static getChain(required){
    return configManager.getChainEnd(configManager.splitChain(required)) || null;
  }
  
  static setChain(configID,Value){
    configManager.config[`${configID}`] = Value;
    fs.writeFileSync(path.join(__dirname,configPath),JSON.stringify(configManager.config, null, 4));
  }

  static set(configID,Value){
    configManager.config[`${configID}`] = Value;
    fs.writeFileSync(path.join(__dirname,configPath),JSON.stringify(configManager.config, null, 4));
  }

  /**
   * 
   * @param {string[]} chainLinks 
   * @returns 
   */
  static getChainEnd(chainLinks){
    let clasp  = configManager.config;
    for (let i = 0; i < chainLinks.length;i++)
    {
      const link = chainLinks[i];
      if (clasp[`${link}`] == undefined)
        return undefined;
      clasp = clasp[`${link}`];
    }
    return clasp;
  }

  static splitChain(chain){
    return chain.split('.');
  }
};