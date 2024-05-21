
import { remove, render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import WithoutPointsView from '../view/without-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';

export default class BoardPresenter{
  #sortComponent = null;
  #eventListComponent = new EventListView();
  #withoutPointsComponent = new WithoutPointsView();
  #container = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.#container = container;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.getPoints()];
  }

  init(){
    this.#renderBoard();
  }

  #renderBoard = () => {
    if (this.#points.length === 0){
      render(this.#withoutPointsComponent, this.#container);
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();
  };

  #renderSort = () => {
    if (this.#sortComponent !== null) {
      remove(this.#sortComponent);
    }

    this.#sortComponent = new SortView(
      this.#currentSortType,
      this.#handleSortTypeChange
    );

    render(this.#sortComponent, this.#container);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      point,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#pointChangeHandler,
      onModeChange: this.#modeChangeHandler
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #pointChangeHandler = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortPoints();
    this.#clearPoints();
    this.#renderPoints();
  };

  #sortPoints = () => {
    switch (this.#currentSortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#pointsModel.getPoints()];
    }
  };
}

