import Presenter from './presenter.js';

/**
 * @typedef {import('../views/sort-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class SortPresenter extends Presenter {
  /**
   * @param {[View, Model]} rest
   */
  constructor(...rest) {
    super(...rest);

    // this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  /**
   * @override
   */
  updateView() {
    /**
     * @type {Array<SortType>}
     */
    const values = ['day', 'event', 'time', 'price', 'offers'];

    const items = values.map((value) => ({
      value,
      isSelected: value === 'time',
      isDisabled: value === 'event' || value === 'offers'
    }));

    this.view.setState({items});
  }
}

export default SortPresenter;
