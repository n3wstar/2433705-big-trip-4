import { CreateFormEditMarkup } from '../template/form-edit-markup.js';
import { createElement } from '../render.js';
import { EMPTY_POINT } from '../const.js';


export default class FormEditView {
  constructor({point = EMPTY_POINT, pointDestination, pointOffers }){
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return CreateFormEditMarkup({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers: this.pointOffers
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
