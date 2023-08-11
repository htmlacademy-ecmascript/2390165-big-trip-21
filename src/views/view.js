class View extends HTMLElement {

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

