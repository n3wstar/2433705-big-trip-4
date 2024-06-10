import { FilterTypes } from '../const.js';
import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this.#filter;
  }
}
