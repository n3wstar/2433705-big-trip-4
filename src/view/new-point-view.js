import AbstractView from '../framework/view/abstract-view';
import { createNewPointMarkup } from '../template/new-point-markup';

export default class NewPointButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#onNewEventClickHandler);
  }

  get template() {
    return createNewPointMarkup;
  }

  #onNewEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
