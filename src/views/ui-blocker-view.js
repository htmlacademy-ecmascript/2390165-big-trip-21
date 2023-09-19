import './ui-blocker-view.css';
import View from './view.js';

/**
 * @typedef {{
 *  isActive: boolean
 * }} State
 *
 * @extends {View<State>}
 */
class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  /**
   * @override
   */
  render() {
    const {isActive} = this.state;

    if (isActive) {
      this.classList.add('ui-blocker--on');
      document.addEventListener('keydown', this);
    } else {
      this.classList.remove('ui-blocker--on');
      document.removeEventListener('keydown', this);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define('ui-blocker-view', UiBlockerView);

export default UiBlockerView;
