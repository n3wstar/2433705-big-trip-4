
import { remove, render } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import WithoutPointsView from '../view/without-point-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils.js';
import { UpdateType, UserAction } from '../const.js';
import { FilterOptions, FilterTypes } from '../const.js';
import { RenderPosition } from '../render.js';
import NewPointPresenter from './new-point-presenter.js';


export default class BoardPresenter{
  #sortComponent = null;
  #eventListComponent = new EventListView();
  #withoutPointsComponent = null;
  #container = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filtersModel = null;
  #newPointPresenter = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterTypes.EVERYTHING;

  #isLoading = true;
  #isLoadingError = false;


  constructor({container, destinationsModel, offersModel, pointsModel, filtersModel, onNewPointDestroy}){
    this.#container = container;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventListComponent,
      destinationsModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#userActionHandler,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = FilterOptions[this.#filterType](points);
    const sortedPoints = [...filteredPoints];
    switch (this.#currentSortType) {
      case SortType.DAY:
        sortedPoints.sort(sortByDay);
        break;
      case SortType.TIME:
        sortedPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        sortedPoints.sort(sortByPrice);
        break;
    }
    return sortedPoints;
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#newPointPresenter.init();
  }

  init(){
    this.#renderBoard();
  }

  #renderBoard = () => {
    if (this.#withoutPointsComponent) {
      remove(this.#withoutPointsComponent);
      this.#withoutPointsComponent = null;
    }

    if (this.#isLoading) {
      this.#renderWithoutPointsView({isLoading: true});
      return;
    }

    if (this.#isLoadingError) {
      this.#renderWithoutPointsView({isLoadingError: true});
      return;
    }

    if (this.points.length === 0) {
      this.#renderWithoutPointsView();
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
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #clearPoints = ({resetSortType = false} = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#withoutPointsComponent) {
      remove(this.#withoutPointsComponent);
    }

    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      point,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#userActionHandler,
      onModeChange: this.#modeChangeHandler
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderWithoutPointsView = ({isLoading = false, isLoadingError = false} = {}) => {
    this.#withoutPointsComponent = new WithoutPointsView({
      filterType: this.#filterType,
      isLoading,
      isLoadingError
    });

    render(this.#withoutPointsComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #userActionHandler = (actionType, updateType, update) =>{
    switch(actionType){
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#pointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #modeChangeHandler = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderPoints();
  };


  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoadingError = data.isError;
        this.#isLoading = false;
        this.#renderBoard();
        break;
    }
  };
}

