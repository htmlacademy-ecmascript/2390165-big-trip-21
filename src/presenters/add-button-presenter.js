import Presenter from './presenter.js';

/**
 * @typedef {import('../views/add-button-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class AddButtonPresenter extends Presenter {
  /**
   * @param {[View, Model]} rest
   */
  constructor(...rest) {
    super(...rest);

    this.view.addEventListener('click', this.onViewClick.bind(this));
  }

  /**
   * @override
   */
  updateView() {
    const params = this.navigation.getParams();

    this.view.setState({
      isDisabled: params.edit === 'draft'
    });
  }

  onViewClick() {
    this.navigation.setParams({
      edit: 'draft'
    });
  }
}

export default AddButtonPresenter;
