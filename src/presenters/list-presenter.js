import Presenter from './presenter.js';

/**
 * @typedef {import('../views/list-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class ListPresenter extends Presenter {
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
    const points = this.model.getPoints();
    const destinations = this.model.getDestinations();
    const offerGroups = this.model.getOfferGroups();

    const items = points.map((point, index) => {
      const {offers} = offerGroups.find((group) => group.type === point.type);

      return {
        id: point.id,

        types: offerGroups.map((group) => ({
          value: group.type,
          isSelected: group.type === point.type
        })),

        destinations: destinations.map((destination) => ({
          ...destination,
          isSelected: destination.id === point.destinationId
        })),

        dateFrom: point.dateFrom,
        dateTo: point.dateTo,
        basePrice: point.basePrice,

        offers: offers.map((offer) => ({
          ...offer,
          isSelected: point.offersIds?.includes(offer.id)
        })),

        isFavorite: point.isFavorite,
        isEditable: index === 0
      };
    });
    // console.table(items);

    this.view.setState({items});
  }
}

export default ListPresenter;
