
import {render} from '../render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import WithoutPointsView from '../view/without-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class BoardPresenter{
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #withoutPointsComponent = new WithoutPointsView();
  #container = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #pointPresenters = new Map();

  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.#container = container;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.getPoints()];
  }

  init(){

    if (this.#points.length === 0){
      render(this.#withoutPointsComponent, this.#container);
      return;
    }
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    this.#renderPoints();

  }

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
}

