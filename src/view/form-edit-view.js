import { CreateFormEditMarkup } from '../template/form-edit-markup.js';
import { EMPTY_POINT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class FormEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onResetClick = null;
  #onSubmitClick = null;
  #onRollUpClick = null;

  constructor({point = EMPTY_POINT, pointDestination, pointOffers, onResetClick, onSubmitClick, onRollUpClick }){
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;
    this.#onRollUpClick = onRollUpClick;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonClickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
  }

  get template() {
    return CreateFormEditMarkup({
      point: this.#point,
      pointDestination: this.#pointDestination[0],
      pointOffers: this.#pointOffers
    });
  }

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick();
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#onRollUpClick();
  };
}
