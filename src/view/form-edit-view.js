import { CreateFormEditMarkup } from '../template/form-edit-markup.js';
import { EMPTY_POINT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class FormEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor({point = EMPTY_POINT, pointDestination, pointOffers }){
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return CreateFormEditMarkup({
      point: this.#point,
      pointDestination: this.#pointDestination[0],
      pointOffers: this.#pointOffers
    });
  }

}
