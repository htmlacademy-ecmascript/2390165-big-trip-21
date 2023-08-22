import View from './view.js';
import {html} from '../utilities.js';

/**
 * @typedef {{
 *  value: FilterType
 *  isSelected: boolean
 *  isDisabled: boolean
 * }} ItemState
 *
 * @typedef {{
 *  items: Array<ItemState>
 * }} State
 *
 * @extends {View<State>}
 */
class FilterView extends View {
  constructor() {
    super();

    this.classList.add('trip-filters');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      ${this.state.items.map(() => html`
        <div class="trip-filters__filter">
          <input
            id="filter-everything"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="everything"
            checked="">
          <label
            class="trip-filters__filter-label"
            for="filter-everything">
            Everything
          </label>
        </div>
      `)}
    `;
  }
}

customElements.define('filter-view', FilterView);

export default FilterView;
