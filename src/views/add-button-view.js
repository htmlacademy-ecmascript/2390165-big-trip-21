import View from './view.js';
import {html} from '../utilities.js';

/**
 * @typedef {{
 *  isDisabled: boolean
 * }} State
 *
 * @extends {View<State>}
 */
class AddButtonView extends View {
  /**
   * @override
   */
  createHtml() {
    const {isDisabled} = this.state;

    return html`
      <button
        class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
        type="button"
        ${isDisabled ? 'disabled' : ''}>
        New event
      </button>
    `;
  }
}

customElements.define('add-button-view', AddButtonView);

export default AddButtonView;
