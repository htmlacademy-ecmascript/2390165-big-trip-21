import Model from './model.js';
import points from '../data/points.json';
import destinations from '../data/destination.json';
import offerGroups from '../data/offers.json';
import PointModel from './point-model.js';
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

    /**
     * @type {Record<FilterType, (point: PointModel) => boolean>}
     */
    this.filterCallbacks = {
      everything: () => true,
      future: () => true,
      present: () => true,
      past: () => true
    };

    /**
     * @type {Record<SortType, (pointA: PointModel, pointB: PointModel) => number>}
     */
    this.sortCallbacks = {
      day: (pointA, pointB) => pointA.dateFromInMs - pointB.dateFromInMs,
      event: () => 0,
      time: (pointA, pointB) => pointB.durationInMs - pointA.durationInMs,
      price: (pointA, pointB) => pointB.basePrice - pointA.basePrice,
      offers: () => 0
    };
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
   * @param {{
   *  filter?: FilterType
   *  sort?: SortType
   * }} options
   *
   * @returns {Array<PointModel>}
   */
  getPoints(options = {}) {
    const defaultFilter = this.filterCallbacks.everything;
    const defaultSort = this.sortCallbacks.day;

    const filter = this.filterCallbacks[options.filter] ?? defaultFilter;
    const sort = this.sortCallbacks[options.sort] ?? defaultSort;

    return this.points.map(this.createPoint).filter(filter).sort(sort);
  }

  /**
   * @param {Point} data
   * @returns {PointModel}
   */
  createPoint(data = Object.create(null)) {
    return new PointModel(data);
  }

  /**
   * @param {PointModel} model
   * @returns {Promise<void>}
   */
  async updatePoint(model) {
    //TODO Обновить данные на сервере

    const data = model.toJSON();
    const index = this.points.findIndex((point) => point.id === data.id);

    this.points.splice(index, 1, data);
  }

  /**
   * @returns {Array<Destination>}
   */
  getDestinations() {
    return structuredClone(this.destinations);
  }

  /**
   * @returns {Array<OfferGroup>}
   */
  getOfferGroups() {
    return structuredClone(this.offerGroups);
  }
}

export default AppModel;
