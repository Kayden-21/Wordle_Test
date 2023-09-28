class Keybutton extends HTMLParagraphElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.attachShadow({ mode: 'open' });
    // Element functionality written in here
  }
}
customElements.define('key-button', Keybutton, { extends: 'p' });