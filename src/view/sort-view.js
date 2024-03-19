import { CreateSortMarkup} from '../template/sort-markup.js';
import { createElement } from '../render.js';


export default class SortView {
  getTemplate() {
    return CreateSortMarkup();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
