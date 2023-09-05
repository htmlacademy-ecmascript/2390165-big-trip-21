import './editor-view.css';
import View from './view.js';
import {html, createCalendars} from '../utilities.js';

/**
 * @typedef {import('./list-view').ItemState} State
 *
 * @extends {View<State>}
 */
class EditorView extends View {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
  }

  connectedCallback() {
    document.addEventListener('keydown', this);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this);
  }

  /**
   * @override
   */
  render() {
    super.render();
    // @ts-ignore
    createCalendars(...this.querySelectorAll('.event__input--time'));
  }

  /**
 * @override
 */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${this.createTypeFieldHtml()}
          ${this.createDestinationFieldHtml()}
          ${this.createScheduleFieldHtml()}
          ${this.createPriceFieldHtml()}
          ${this.createSubmitButtonHtml()}
          ${this.createResetButtonHtml()}
          ${this.createCloseButtonHtml()}
        </header>
        <section class="event__details">
          ${this.createOfferListFieldHtml()}
          ${this.createDestinationHtml()}
        </section>
      </form>
    `;
  }

  /**
   * @returns {string}
   */
  createTypeFieldHtml() {
    const {types} = this.state;

    return html`
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img
            class="event__type-icon"
            width="17"
            height="17"
            src="img/icons/${types.find((type) => type.isSelected).value}.png"
            alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${types.map((type) => html`
              <div class="event__type-item">
                <input
                  id="event-type-${type.value}-1"
                  class="event__type-input  visually-hidden"
                  type="radio"
                  name="event-type"
                  value="${type.value}"
                  ${type.isSelected ? 'checked' : ''}>

                <label
                  class="event__type-label  event__type-label--${type.value}"
                  for="event-type-${type.value}-1">
                  ${type.value}
                </label>
              </div>
            `)}
          </fieldset>
        </div>
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createDestinationFieldHtml() {
    const {types, destinations} = this.state;

    return html`
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${types.find((type) => type.isSelected).value}
        </label>

        <input
          class="event__input  event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${destinations.find((destination) => destination.isSelected)?.name}"
          list="destination-list-1">

        <datalist id="destination-list-1">
          ${destinations.map((destination) => html`
            <option value="${destination.name}"></option>
          `)}
        </datalist>
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createScheduleFieldHtml() {
    const {dateFrom, dateTo} = this.state;

    return html`
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input  event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${dateFrom}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input  event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${dateTo}">
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createPriceFieldHtml() {
    const {basePrice} = this.state;

    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input
          class="event__input  event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          value="${basePrice}">
      </div>
    `;
  }

  /**
   * @returns {string}
   */
  createSubmitButtonHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    `;
  }

  /**
   * @returns {string}
   */
  createResetButtonHtml() {
    return html`
      <button class="event__reset-btn" type="reset">Cancel</button>
    `;
  }

  /**
   * @returns {string}
   */
  createCloseButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  /**
   * @returns {string}
   */
  createOfferListFieldHtml() {
    const {offers} = this.state;

    if (!offers.length) {
      return '';
    }

    return html`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => html`
            <div class="event__offer-selector">
              <input
                class="event__offer-checkbox  visually-hidden"
                id="${offer.id}"
                type="checkbox"
                name="event-offer"
                value="${offer.id}"
                ${offer.isSelected ? 'checked' : ''}>

              <label class="event__offer-label" for="${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
          `)}
        </div>
      </section>
    `;
  }

  /**
   * @returns {string}
   */
  createDestinationHtml() {
    const {destinations} = this.state;
    const selectedDestination = destinations.find((destination) => destination.isSelected);

    if (!selectedDestination) {
      return '';
    }

    return html`
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${selectedDestination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${selectedDestination.pictures?.map((picture) => html`
              <img class="event__photo" src="${picture.src}" alt="${picture.description}">
            `)}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * @param {PointerEvent & {
   *  target: Element
   * }} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.dispatch('close');
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key?.startsWith('Esc')) {
      this.dispatch('close');
    }
  }

  /**
   * @param {Event & {
   *  target: HTMLInputElement
   * }} event
   */
  onChange(event) {
    this.dispatch('edit', event.target);
  }

}

customElements.define('editor-view', EditorView);

export default EditorView;
