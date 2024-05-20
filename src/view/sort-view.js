import { CreateSortMarkup} from '../template/sort-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor(currentSortType, handleSortTypeChange) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = handleSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return CreateSortMarkup(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
