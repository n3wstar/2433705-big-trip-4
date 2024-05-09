import { createPointMarkup} from '../template/point-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class PointView extends AbstractView{
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onEditClick = null;
  constructor({point, pointDestination, pointOffers, onEditClick})
  {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointMarkup({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers : this.#pointOffers,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };
}
