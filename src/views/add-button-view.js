import View from './view.js';
import {html} from '../utilities.js';

class AddButtonView extends View {
  /**
   * @override
   */
  createHtml() {
    return html`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled="">New event</button>
    `;
  }
}

customElements.define('add-button-view', AddButtonView);

export default AddButtonView;
