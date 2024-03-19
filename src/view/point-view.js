import { CreatePointMarkup} from '../template/point-markup.js';
import { createElement } from '../render.js';


export default class PointView {
  getTemplate() {
    return CreatePointMarkup();
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
