import { replace } from '../framework/render.js';
import {render} from '../render.js';
import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter{
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #container = null;
  #destinationModel = null;
  #offersModel = null;
  #pointsModel = null;

  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.#container = container;
    this.#destinationModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init(){
    if (this.#pointsModel.getPoints().length === 0){
      render(this.#eventListComponent, this.#container);
      return;
    }
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    this.#pointsModel.getPoints().forEach((point) => {
      this.#renderPoints(point);
    });
  }

  #renderPoints = (point) => {
    const pointComponent = new PointView({
      point,
      pointDestination: this.#destinationModel.getById(point.destination),
      pointOffers: this.#offersModel.getOfferByType(point.type),
      onEditClick: editPointClickHandler
    });

    const pointEditComponent = new FormEditView({
      point: this.#pointsModel.getPoints()[0],
      pointDestination: this.#destinationModel.getDestination(),
      pointOffers: this.#offersModel.getOffers(),
      onResetClick: resetClickHandler,
      onSubmitClick: pointSubmitHandler,
      onRollUpClick: rollUpClickHandler
    });

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape'){
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    function editPointClickHandler(){
      replacePointToForm();
      document.addEventListener('keydown', escKeydownHandler);
    }

    function resetClickHandler(){
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeydownHandler);
    }

    function pointSubmitHandler(){
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeydownHandler);
    }

    function rollUpClickHandler(){
      replaceFormToPoint();
      document.addEventListener('keydown', escKeydownHandler);
    }

    render(pointComponent, this.#eventListComponent.element);
  };
}
