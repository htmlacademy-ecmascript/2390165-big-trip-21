import './views/brief-view.js';
import './views/filter-view.js';
import './views/add-button-view.js';
import './views/sort-view.js';
import './views/list-view.js';
import './views/placeholder-view.js';
import './views/ui-blocker-view.js';

import ApiService from './services/api-service.js';
import AppModel from './models/app-model.js';

import BriefPresenter from './presenters/brief-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import AddButtonPresenter from './presenters/add-button-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import ListPresenter from './presenters/list-presenter.js';
import PlaceholderPresenter from './presenters/placeholder-presenter.js';

const apiService = new ApiService({authorization: 'Basic xcvqwe123'});
const appModel = new AppModel(apiService);

new PlaceholderPresenter(document.querySelector('placeholder-view'), appModel);

appModel.ready().then(() => {
  new BriefPresenter(document.querySelector('brief-view'), appModel);
  new FilterPresenter(document.querySelector('filter-view'), appModel);
  new AddButtonPresenter(document.querySelector('add-button-view'), appModel);
  new SortPresenter(document.querySelector('sort-view'), appModel);
  new ListPresenter(document.querySelector('list-view'), appModel);
});

