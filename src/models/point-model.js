import Model from './model.js';

class PointModel extends Model {
  /**
   * @param {Point} point
   */
  constructor(point) {
    super();

    this.id = point.id;
    this.basePrice = point.base_price;
    this.dateFrom = point.date_from;
    this.dateTo = point.date_to;
    this.destinationId = point.destination;
    this.isFavorite = point.is_favorite;
    this.offerIds = structuredClone(point.offers);
    this.type = point.type;
  }

  /**
   * @type {number}
   */
  get dateFromInMs() {
    return Date.parse(this.dateFrom);
  }

  /**
   * @returns {Point}
   */
  toJSON() {
    return {
      'id': this.id,
      'base_price': this.basePrice,
      'date_from': this.dateFrom,
      'date_to': this.dateTo,
      'destination': this.destinationId,
      'is_favorite': this.isFavorite,
      'offers': structuredClone(this.offerIds),
      'type': this.type
    };
  }
}

export default PointModel;
