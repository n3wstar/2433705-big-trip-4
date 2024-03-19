import { CreateFormEditMarkup } from '../template/form-edit-markup.js';
import { createElement } from '../render.js';


export default class FormEditView {
  getTemplate() {
    return CreateFormEditMarkup();
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
