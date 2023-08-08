import './list-view.css';
import View from './view.js';
import CardView from './card-view.js';
import EditorView from './editor-view.js';

class ListView extends View {
  constructor() {
    super();

    this.classList.add('trip-list');
    this.setAttribute('role', 'list');
  }

  /**
   * @override
   */
  render() {
    const views = new Array(4).fill().map((none, index) => {
      const view = index === 0 ? new EditorView() : new CardView();

      view.classList.add('trip-list__item');
      view.setAttribute('role', 'listitem');
      view.render();


      return view;
    });

    this.replaceChildren(...views);

  }
}

customElements.define('list-view', ListView);

export default ListView;
