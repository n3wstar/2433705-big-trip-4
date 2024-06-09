import { replace, render, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import FormEditView from '../view/form-edit-view.js';
import { Mode } from '../const.js';
import { UserAction, UpdateType } from '../const.js';
import { isBigDifference } from '../utils.js';

export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #eventListContainer = null;
  #point = null;
  #destinationModel = null;
  #offersModel = null;
  #mode = Mode.DEFAULT;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({ eventListContainer, point, destinationModel, offersModel, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#point = point;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevpointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationModel.getById(point.destination),
      pointOffers: this.#offersModel.getOfferByType(point.type),
      onEditClick: this.#editPointClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      pointDestination: this.#destinationModel.getDestination(),
      pointOffers: this.#offersModel.getOffers(),
      onResetClick: this.#resetClickHandler,
      onSubmitClick: this.#pointSubmitHandler,
      onRollUpClick: this.#rollUpClickHandler
    });
    if (prevPointComponent === null || prevpointEditComponent === null){
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING){
      replace(this.#pointEditComponent, prevpointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevpointEditComponent);
  }

  destroy(){
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm = () => {
    this.#handleModeChange();
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#mode = Mode.EDITING;
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #editPointClickHandler = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #resetClickHandler = () => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      this.#point
    );
  };

  #pointSubmitHandler = (update) => {
    const isMinorUpdate = isBigDifference(update, this.#point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToPoint();
  };

  #rollUpClickHandler = () => {
    this.#replaceFormToPoint();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#pointEditComponent.updateElement({
        isActive: false,
        isSaving: true
      });
    }
  }

  setDeleting() {
    this.#pointEditComponent.updateElement({
      isActive: false,
      isDeleting: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isActive: true,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }
}

