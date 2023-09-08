import View from './view.js';
import {html} from '../utilities.js';

class PlaceholderView extends View {
  /**
   * @override
   */
  createHtml() {
    return html`
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
