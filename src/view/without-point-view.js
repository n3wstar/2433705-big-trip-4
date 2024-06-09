import AbstractView from '../framework/view/abstract-view';
import { createWithoutPointMarkup } from '../template/without-point-markup';

export default class WithoutPointsView extends AbstractView {
  #filterType = null;
  #isLoading = false;
  #isLoadingError = false;

  constructor({filterType, isLoading = false, isLoadingError = false}) {
    super();
    this.#filterType = filterType;
    this.#isLoading = isLoading;
    this.#isLoadingError = isLoadingError;
  }

  get template() {
    if (this.#isLoading) {
      return '<p class="trip-events__msg">Loading...</p>';
    }
    if (this.#isLoadingError) {
      return '<p class="trip-events__msg">Failed to load latest route information</p>';
    }
    return createWithoutPointMarkup(this.#filterType);
  }
}

