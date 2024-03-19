import { CreateFilterMarkup } from '../template/filter-markup.js';
import { createElement } from '../render.js';


export default class FilterView {
  getTemplate() {
    return CreateFilterMarkup();
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
