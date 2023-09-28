/**
 * object containing all UI State change information
 */
const UIConstants = {
  /** @type {string[][]} */
  lightColorPallet:[
    ['--bigBackground', '#F2F8F8'],
    ['--buttonFontColor','white'],
    ['--completeCorrect', '#53e485'],
    ['--semiCorrect', '#efde45'],
    ['--wrong', '#6b7378'],
    ['--wrongFontColor','#C4CED8'],
    ['--enterBackground','#639999'],
    ['--defaultFont','#343434'],
    ['--svgColor', 'black' ],
    ['--backButtonBC', '#95CACA'],
    ['--timerFontColor', '#343434'],
    ['--emptyInputBGColor', '#C4CED8'],
    ['--defaultButtonBGColor', '#C4CED8']
  ],
  /** @type {string[][]} */
  darkColorPallet:[
    ['--bigBackground', '#0C1818'],
    ['--buttonFontColor','white'],
    ['--completeCorrect', '#53e485'],
    ['--semiCorrect', '#efde45'],
    ['--wrong', '#343434'],
    ['--wrongFontColor','#90959F'],
    ['--enterBackground','#639999'],
    ['--defaultFont','white'],
    ['--svgColor', 'white' ],
    ['--enterBackground','#639999'],
    ['--timerFontColor', '#639999'],
    ['--emptyInputBGColor', '#6B7378'],
    ['--defaultButtonBGColor', '#90959F']
  ],
  icons:{
    themeIcon:{
      iconVar: '--colorToggleSVG',
      darkMode: 'url("darkModeIcon.svg")',
      lightMode: 'url("lightModeIcon.svg")'
    },
    backspaceIcon:{
      /** @type {string} */
      iconVar: '--backspaceIcon',
      /** @type {string} */
      lightMode: 'url("backspaceIconLightMode.svg")',
      /** @type {string} */
      darkMode: ''
    }
  },
  logo:{
    /** @type {string} */
    logoVar: '--wordleLogo',
    /** @type {string} */
    lightMode: 'url(wordleLogoLightMode.svg)',
    /** @type {string} */
    darkMode: 'url(wordleLogoDarkMode.svg)',
  },
  /** @type {string[]} */
  keyboardLayout:[
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ],

  enterButton:{
    /** @type {string} */
    backgroundVar: '--enterBackground',
    lightmode:{
      /** @type {string} */
      enable: '#639999',
      /** @type {string} */
      disabled: '#648080',
    },
    darkmode:{
      /** @type {string} */
      enable: '#639999',
      /** @type {string} */
      disabled: '#242020',
    }
  },

  gridDisplayItemState:{
    /** @type {string} */
    completelyCorrect: 'completelyCorrect',
    /** @type {string} */
    semiCorrect: 'correctLetterWrongPlace',
    /** @type {string} */
    wrong: 'completelyWrong'
  },

  gridSize:{
    /** @type {string} */
    varName: '--gridSize',
    /** @type {number} */
    value: 5
  },

  gridSelectedClass:{
    /** @type {string} */
    className:'currentlySelected',
    /** @type {number} */
    lightModeValue: 0.6,
    /** @type {number} */
    darkModeValue:1.6,
    /** @type {string} */
    varName: '--brightnessValue'
  },

  validityIndicator:{
    validColor: '#36a336',
    invalidColor: '#c8891b',
    varName: '--validityBGCol'
  },
  APILocalMode: false,
};

/**
 * List of component IDs on the game page
 */
/**@type {object} */
const UIIDList ={
  /**@type {string} */
  gameColorPallet: 'GameColorPallet',
  /**@type {string} */
  timeCount: 'timeCount',
  /**@type {string} */
  colorToggle: 'colorToggle',
  /**@type {string} */
  logo: 'logo',
  /**@type {string} */
  displayBoard: 'displayBoard',
  /**@type {string} */
  keyboardContainer: 'keyboardContainer',
  /**@type {string} */
  mainEnterButton: 'enterButton',
  /**@type {string} */
  buttonBackSpace: 'buttonBackSpace',
  /**@type {string} */
  validityIndicator:'validIndicator'
};

export {UIConstants, UIIDList};
