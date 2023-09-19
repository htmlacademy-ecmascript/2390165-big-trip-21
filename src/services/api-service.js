import {sanitize} from '../utilities.js';
import Service from './service.js';

class ApiService extends Service {
  /**
   * @param {Partial<import('./service').Options>} options
   */
  constructor(options) {
    super({
      baseUrl: 'https://21.objects.pages.academy/big-trip/',
      authorization: '',
      minResponseTime: 500,
      ...options
    });
  }

  /**
   * @returns {Promise<Array<Point>>}
   */
  async getPoints() {
    const response = await this.request('points');

    return sanitize(await response.json());
  }

  /**
   * @param {Point} data
   * @returns {Promise<Point>}
   */
  async addPoint(data) {
    const response = await this.request('points', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    });

    return sanitize(await response.json());
  }

  /**
   * @param {Point} data
   * @returns {Promise<Point>}
   */
  async updatePoint(data) {
    const response = await this.request(`points/${data.id}`, {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data)
    });

    return sanitize(await response.json());
  }

  /**
   * @param {string} id
   * @returns {Promise<void>}
   */
  async deletePoint(id) {
    await this.request(`points/${id}`, {
      method: 'delete'
    });
  }

  /**
   * @returns {Promise<Array<Destination>>}
   */
  async getDestinations() {
    const response = await this.request('destinations');

    return sanitize(await response.json());
  }

  /**
   * @returns {Promise<Array<OfferGroup>>}
   */
  async getOfferGroups() {
    const response = await this.request('offers');

    return sanitize(await response.json());
  }
}

export default ApiService;
