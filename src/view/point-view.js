import { createPointMarkup} from '../template/point-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class PointView extends AbstractView{
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  constructor({point, pointDestination, pointOffers})
  {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createPointMarkup({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers : this.#pointOffers
    });
  }

}
