import Presenter from './presenter.js';

/**
 * @typedef {import('../views/placeholder-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class PlaceholderPresenter extends Presenter {
  /**
   * @param {[View, Model]} rest
   */
  constructor(...rest) {
    super(...rest);

    this.model.addEventListener('ready', this.onModelReady.bind(this));
    this.model.addEventListener('error', this.onModelError.bind(this));
  }

  /**
   * @override
   */
  updateView() {
    this.view.setState({
      message: this.getMessage()
    });
  }

  /**
   * @returns {string}
   */
  getMessage() {
    const params = this.navigation.getParams();
    const points = this.model.getPoints(params);

    if (!points.length && params.edit !== 'draft') {
      /**
       * @type {Record<FilterType, string>}
       */
      const messages = {
        everything: 'Click New Event to create your first point',
        future: 'There are no future events now',
        present: 'There are no present events now',
        past: 'There are no past events now'
      };

      return messages[params.filter] ?? messages.everything;
    }

    return '';
  }

  /**
   * @override
   */
  onReady() {
    this.view.setState({
      message: 'Loading...'
    });
  }

  onModelReady() {
    this.updateView();
  }

  onModelError() {
    this.view.setState({
      message: 'Failed to load latest route information'
    });
  }
}

export default PlaceholderPresenter;
