import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterOptions } from '../const.js';
import { FilterTypes, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #pointModel = null;

  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointModel }) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.handleModelPoint);
    this.#filtersModel.addObserver(this.handleModelPoint);
  }

  get filters() {
    const points = this.#pointModel.points;

    return Object.values(FilterTypes).map((type) => ({
      type,
      name: type.toUpperCase(),
      count: FilterOptions[type](points).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  handleModelPoint = () => {
    this.init();
  };

  handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
