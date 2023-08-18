/**
 * @typedef {{
*  filter?: FilterType
*  sort?: SortType
*  edit?: string
* }} Params
*/
class Navigation extends EventTarget {
  constructor() {
    super();

    window.addEventListener('popstate', () => {
      this.dispatchEvent(new Event('change'));
    });
  }

  /**
   * @param {Params} params
   */
  setParams(params) {
    const url = this.getUrl();

    url.search = '';

    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key]);
    });

    window.history.pushState(null, '', url.href);
    this.dispatchEvent(new Event('change'));
  }

  /**
   * @returns {Params}
   */
  getParams() {
    const url = this.getUrl();

    return Object.fromEntries(url.searchParams);
  }

  /**
   * @returns {URL}
   */
  getUrl() {
    return new URL(window.location.href);
  }
}

export default new Navigation();
