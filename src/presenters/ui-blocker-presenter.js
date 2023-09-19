import Presenter from './presenter.js';

/**
 * @typedef {import('../views/ui-blocker-view').default} View
 * @typedef {import('../models/app-model').default} Model
 *
 * @extends {Presenter<View, Model>}
 */
class UiBlockerPresenter extends Presenter {
  /**
   * @param {[View, Model]} rest
   */
  constructor(...rest) {
    super(...rest);

    this.model.addEventListener('busy', this.onModelBusy.bind(this));
    this.model.addEventListener('idle', this.onModelIdle.bind(this));
  }

  onModelBusy() {
    this.view.setState({isActive: true});
  }

  onModelIdle() {
    this.view.setState({isActive: false});
  }
}

export default UiBlockerPresenter;
