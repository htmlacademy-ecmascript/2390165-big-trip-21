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

    return response.json();
  }

  /**
   * @returns {Promise<Array<Destination>>}
   */
  async getDestinations() {
    const response = await this.request('destinations');

    return response.json();
  }

  /**
   * @returns {Promise<Array<OfferGroup>>}
   */
  async getOfferGroups() {
    const response = await this.request('offers');

    return response.json();
  }
}

export default ApiService;
