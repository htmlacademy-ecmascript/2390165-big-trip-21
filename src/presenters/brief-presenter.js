import Presenter from './presenter.js';

/**
 * @typedef {import('../views/brief-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class BriefPresenter extends Presenter {
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
    this.view.setState({
      destinationNames: this.getDestinationNames(),
    });
  }

  /**
   * @returns {Array<string>}
   */
  getDestinationNames() {
    const points = this.model.getPoints();
    const destinations = this.model.getDestinations();

    return points.map((point) => {
      const {name} = destinations.find(({id}) => id === point.destinationId);

      return name;

    }).filter((name, index, list) => {
      const next = list[index + 1];

      return name !== next;
    });

  }

}

export default BriefPresenter;
