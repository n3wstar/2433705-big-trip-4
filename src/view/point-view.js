import { createPointMarkup} from '../template/point-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class PointView extends AbstractView{
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onEditClick = null;
  #onFavoriteClick = null;
  constructor({point, pointDestination, pointOffers, onEditClick, onFavoriteClick})
  {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
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

  #favoriteClickHandler = (evt) =>{
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
