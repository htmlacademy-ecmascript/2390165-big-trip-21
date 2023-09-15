class Model extends EventTarget {
  /**
   * @param {string} type
   * @param {any} detail
   * @returns {boolean}
   */
  dispatch(type, detail = null) {
    const event = new CustomEvent(type, {
      detail,
      cancelable: true
    });

    return this.dispatchEvent(event);
  }
}

export default Model;
