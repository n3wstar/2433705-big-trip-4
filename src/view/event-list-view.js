import { CreateEventListMarkup } from '../template/event-list-markup.js';
import { createElement } from '../render.js';

export default class EventListView {
  getTemplate() {
    return CreateEventListMarkup();
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
