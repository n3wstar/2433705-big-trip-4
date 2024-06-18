import {remove, render, RenderPosition } from '../framework/render';
import { UpdateType, UserAction } from '../const';
import FormEditView from '../view/form-edit-view';
export default class NewPointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #editFormComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ container, destinationsModel, offersModel, onDataChange, onDestroy }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#editFormComponent !== null) {
      return;
    }


    this.#editFormComponent = new FormEditView({
      pointDestination: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onRollUpClick: this.#cancelClickHandler,
      onSubmitClick: this.#formSubmitHandler,
      onResetClick: this.#cancelClickHandler,
      resetButtonLabel: 'Cancel'
    });
    render(this.#editFormComponent, this.#container.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editFormComponent === null) {
      return;
    }
    remove(this.#editFormComponent);
    this.#editFormComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDestroy();
  }


  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #cancelClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
