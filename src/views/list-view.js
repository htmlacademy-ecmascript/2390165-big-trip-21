import './list-view.css';
import View from './view.js';
import CardView from './card-view.js';
import EditorView from './editor-view.js';

/**
 * @template Option
 * @typedef {Option & {
 *  isSelected: boolean
 * }} Selectable
 */

/**
* @typedef {{
*  value: PointType
* }} Type
*
* @typedef {{
*  id: string
*  types: Array<Selectable<Type>>
*  destinations: Array<Selectable<Destination>>
*  dateFrom: string
*  dateTo: string
*  basePrice: number
*  offers: Array<Selectable<Offer>>
*  isFavorite: boolean
*  isEditable: boolean
*  isSaving?: boolean
*  isDeleting?: boolean
* }} ItemState
*
* @typedef {{
*  items: Array<ItemState>
*  isAnimated: boolean
* }} State
*
* @extends {View<State>}
*/
class ListView extends View {
  constructor() {
    super();

    this.classList.add('trip-events__list');
    this.setAttribute('role', 'list');
  }

  /**
   * @override
   */
  render() {
    const {isAnimated, items} = this.state;

    const views = items.map((item, index) => {
      const view = item.isEditable ? new EditorView() : new CardView();

      view.classList.add('trip-events__item');
      view.setAttribute('role', 'listitem');
      view.setState(item);

      if (isAnimated) {
        view.fadeInLeft({delay: index * 100});
      }

      return view;
    });

    this.replaceChildren(...views);

  }
}

customElements.define('list-view', ListView);

export default ListView;
