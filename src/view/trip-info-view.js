import { CreateTripInfoMarkup} from '../template/trip-info-markup.js';
import { createElement } from '../render.js';


export default class TripInfoView {
  getTemplate() {
    return CreateTripInfoMarkup();
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

