import View from './view.js';
import {formatDateRange, formatList, formatNumber, html} from '../utilities.js';

/**
 * @typedef {{
 *  destinationNames: Array<string>
 *  dateFrom: string
 *  dateTo: string
 *  totalCost: number
 * }} State
 *
 * @extends {View<State>}
 */
class BriefView extends View {
  constructor() {
    super();

    this.classList.add('trip-info');
  }

  /**
   * @override
   */
  createHtml() {
    const {destinationNames = [], dateFrom, dateTo, totalCost = 0} = this.state;

    if (!destinationNames.length) {
      return '';
    }

    return html`
      <div class="trip-info__main">
        <h1 class="trip-info__title">${formatList(destinationNames)}</h1>

        <p class="trip-info__dates">${formatDateRange(dateFrom, dateTo)}</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${formatNumber(totalCost)}</span>
      </p>
    `;
  }
}

customElements.define('brief-view', BriefView);

export default BriefView;
