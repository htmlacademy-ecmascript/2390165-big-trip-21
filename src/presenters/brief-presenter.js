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
      dateFrom: this.getDateFrom(),
      dateTo: this.getDateTo(),
      totalCost: this.getTotalCost()
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

  /**
   * @returns {string}
   */
  getDateFrom() {
    const points = this.model.getPoints();

    return points.at(0)?.dateFrom;
  }

  /**
   * @returns {string}
   */
  getDateTo() {
    const points = this.model.getPoints();

    return points.at(-1)?.dateTo;
  }

  /**
   * @return {number}
   */
  getTotalCost() {
    const points = this.model.getPoints();
    const offerGroups = this.model.getOfferGroups();

    return points.reduce((totalCost, point) => {
      const {offers} = offerGroups.find((group) => group.type === point.type);

      const pointCost = offers.reduce((cost, offer) => {
        if (point.offerIds.includes(offer.id)) {
          return cost + offer.price;
        }
        return cost;
      }, point.basePrice);

      return totalCost + pointCost;
    }, 0);
  }

}

export default BriefPresenter;
