import Model from './model.js';
import PointModel from './point-model.js';

class AppModel extends Model {
  /**
   * @param {import('../services/api-service').default} apiService
   */
  constructor(apiService) {
    super();

    this.apiService = apiService;

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
      future: (point) => point.dateFromInMs > Date.now(),
      present: (point) => point.dateFromInMs <= Date.now() && point.dateToInMs >= Date.now(),
      past: (point) => point.dateToInMs < Date.now()
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
    try {
      const [points, destination, offerGroups] = await Promise.all([
        this.apiService.getPoints(),
        this.apiService.getDestinations(),
        this.apiService.getOfferGroups()
      ]);

      this.points = points;
      this.destinations = destination;
      this.offerGroups = offerGroups;
      this.dispatch('ready');

    } catch (error) {
      this.dispatch('error');
      throw error;
    }

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
  async addPoint(model) {
    this.dispatch('busy');

    try {
      const data = await this.apiService.addPoint(model.toJSON());

      this.points.push(data);

    } finally {
      this.dispatch('idle');
    }
  }

  /**
   * @param {PointModel} model
   * @returns {Promise<void>}
   */
  async updatePoint(model) {
    this.dispatch('busy');

    try {
      const data = await this.apiService.updatePoint(model.toJSON());
      const index = this.points.findIndex((point) => point.id === data.id);

      this.points.splice(index, 1, data);

    } finally {
      this.dispatch('idle');
    }
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deletePoint(id) {
    this.dispatch('busy');

    try {
      await this.apiService.deletePoint(id);
      const index = this.points.findIndex((point) => point.id === id);

      this.points.splice(index, 1);

    } finally {
      this.dispatch('idle');
    }
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
