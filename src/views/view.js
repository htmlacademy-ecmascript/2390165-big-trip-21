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

  /**
   * @param {string} type
   * @param {any} detail
   * @returns {boolean}
   */
  dispatch(type, detail = null) {
    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      cancelable: true
    });

    return this.dispatchEvent(event);
  }
}

export default View;

