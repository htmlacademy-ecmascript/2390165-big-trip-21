import './views/brief-view.js';
import './views/filter-view.js';
import './views/add-button-view.js';
import './views/sort-view.js';
import './views/list-view.js';


/**
 * @type {import('./views/brief-view').default}
 */
const briefView = document.querySelector('brief-view');

/**
 * @type {import('./views/filter-view').default}
 */
const filterView = document.querySelector('filter-view');

/**
 * @type {import('./views/add-button-view').default}
 */
const addButtonView = document.querySelector('add-button-view');

/**
 * @type {import('./views/sort-view').default}
 */
const sortView = document.querySelector('sort-view');

/**
 * @type {import('./views/list-view').default}
 */
const listView = document.querySelector('list-view');

briefView.render();
filterView.render();
addButtonView.render();
sortView.render();
listView.render();
