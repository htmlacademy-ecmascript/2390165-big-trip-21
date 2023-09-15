/**
 * @typedef {{
*  baseUrl: string
*  authorization: string
*  minResponseTime: number
* }} Options
*/
class Service {
  /**
   * @param {Options} options
   */
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authorization = options.authorization;
    this.minResponseTime = options.minResponseTime;
  }

  /**
   * @param {string} path
   * @param {RequestInit} options
   * @returns {Promise<Response>}
   */
  request(path, options = {}) {
    const url = new URL(path, this.baseUrl);
    const responsePromise = fetch(url, this.extendRequest(options));

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await responsePromise;

          this.assertResponse(response);
          resolve(response);

        } catch (error) {
          reject(error);
        }
      }, this.minResponseTime);
    });
  }

  /**
   * @param {RequestInit} options
   * @returns {RequestInit}
   */
  extendRequest(options) {
    const headers = new Headers(options.headers);

    if (this.authorization) {
      headers.set('authorization', this.authorization);
    }

    return {...options, headers};
  }

  /**
   * @param {Response} response
   */
  assertResponse(response) {
    if (!response.ok) {
      throw new Error(String(response.status), {
        cause: response
      });
    }
  }
}

export default Service;
