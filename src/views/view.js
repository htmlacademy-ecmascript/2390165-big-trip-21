/**
 * @template State
 */
class View extends HTMLElement {
  constructor() {
    super();

    /**
     * @type {State}
     */
    this.state = Object.create(null);
  }

  /**
   * @param {Partial<State>} state
   */
  setState(state) {
    Object.assign(this.state, state);
    this.render();
  }

  render() {
    this.innerHTML = this.createHtml();
  }

  /**
   * @abstract
   * @returns {string}
   */
  createHtml() {
    return '';
  }
}

export default View;

