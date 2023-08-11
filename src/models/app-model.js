import Model from './model.js';
import points from '../data/points.json';
import destinations from '../data/destination.json';
import offerGroups from '../data/offers.json';


class AppModel extends Model {
  constructor() {
    super();

    /**
     * @type {Array<Point>}
     */
    this.points = [];

    /**
     * @type {Array<Destination>}
     */
    this.destinations = [];

    /**
     * @type {Array<OfferGroup>}
     */
    this.offerGroups = [];
  }

  /**
   * @returns {Promise<void>}
   */
  async ready() {
    // TODO: получение данных с сервера

    // @ts-ignore
    this.points = points;
    // @ts-ignore
    this.destinations = destinations;
    // @ts-ignore
    this.offerGroups = offerGroups;
  }

  /**
   * @returns {Array<Point>}
   */
  getPoints() {
    return this.points;
  }

  /**
   * @returns {Array<Destination>}
   */
  getDestinations() {
    return this.destinations;
  }

  /**
   * @returns {Array<OfferGroup>}
   */
  getOfferGroups() {
    return this.offerGroups;
  }
}

export default AppModel;
