import './views/brief-view.js';
import './views/filter-view.js';

/**
 * @type {import('./views/brief-view').default}
 */
const briefView = document.querySelector('brief-view');

/**
 * @type {import('./views/filter-view').default}
 */
const filterView = document.querySelector('filter-view');

briefView.render();
filterView.render();
