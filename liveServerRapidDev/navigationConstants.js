export default class Navigate{
  /** @type {string} */
  static baseURL = window.location.href.split('/').slice(0, 3).join('/');
  static pathURLs = {
    gameURL: '/game.html',
    highScore: '/highscore.html',
    login:'/login.html'
  };
  /**
   * Navigates to the provided Path
   * @param {pathURLs} path
   */
  static navigateTo(path){
    window.href = `${Navigate.baseURL}${path}`;
  }
}
