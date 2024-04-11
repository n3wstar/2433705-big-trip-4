import { createPointMarkup} from '../template/point-markup.js';
import { createElement } from '../render.js';


export default class PointView {
  constructor({point, pointDestination, pointOffers})
  {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointMarkup({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers : this.pointOffers
    });
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
