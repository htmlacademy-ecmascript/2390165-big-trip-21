import View from './view.js';
import {html} from '../utilities.js';

class CardView extends View {
  constructor() {
    super();

    // this.classList.add('class1', 'class2');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class="event">
        ${this.createStartDateHtml()}
        ${this.createTypeIconHtml()}
        ${this.createDestinationHtml()}
        ${this.createScheduleHtml()}
        ${this.createPriceHtml()}
        ${this.createOfferListHtml()}
        ${this.createFavoriteButtonHtml()}
        ${this.createOpenButtonHtml()}
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createStartDateHtml() {
    return html`
      <time class="event__date" datetime="2019-03-18">MAR 18</time>
    `;
  }

  /**
   * @returns {string}
   */
  createTypeIconHtml() {
    return html`
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createDestinationHtml() {
    return html`
      <h3 class="event__title">Taxi Amsterdam</h3>
    `;
  }

  /**
   * @returns {string}
   */
  createScheduleHtml() {
    return html`
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
          —
          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
  `;
  }

  /**
   * @returns {string}
   */
  createPriceHtml() {
    return html`
      <p class="event__price">
        €&nbsp;<span class="event__price-value">20</span>
      </p>
    `;
  }

  /**
   * @returns {string}
   */
  createOfferListHtml() {
    return html`
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          +€&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
    `;
  }

  /**
   * @returns {string}
   */
  createFavoriteButtonHtml() {
    return html`
      <button class="event__favorite-btn event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
    `;
  }

  /**
   * @returns {string}
   */
  createOpenButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

}


customElements.define('card-view', CardView);

export default CardView;
