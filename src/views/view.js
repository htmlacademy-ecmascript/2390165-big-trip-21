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

  /**
   * @param {KeyframeAnimationOptions} options
   * @returns {Animation}
   */
  shake(options = {}) {
    const keyframes = {
      translate: ['0 0', '-5px 0', '0 0', '5px 0', '0 0']
    };

    return this.animate(keyframes, {
      duration: 150,
      iterations: 4,
      ...options
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   * @param {PropertyIndexedKeyframes} [extraKeyframes]
   * @returns {Animation}
   */
  fadeIn(options, extraKeyframes) {
    const keyframes = {
      opacity: [0, 1],
      ...extraKeyframes
    };

    return this.animate(keyframes, {
      duration: 300,
      easing: 'ease',
      fill: 'both',
      ...options
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   * @returns {Animation}
   */
  fadeInLeft(options) {
    return this.fadeIn(options, {
      translate: ['40px 0', '0 0']
    });
  }

  /**
   * @param {KeyframeAnimationOptions} [options]
   * @returns {Animation}
   */
  fadeInRight(options) {
    return this.fadeIn(options, {
      translate: ['-40px 0', '0 0']
    });
  }
}

export default View;

