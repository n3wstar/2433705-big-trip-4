import { CreateFormEditMarkup } from '../template/form-edit-markup.js';
import { EMPTY_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import DatePicker from '../date-picker.js';

export default class FormEditView extends AbstractStatefulView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onResetClick = null;
  #onSubmitClick = null;
  #onRollUpClick = null;
  #pickDateFrom = null;
  #pickDateTo = null;
  #resetButtonLabel = null;

  constructor({ point = EMPTY_POINT, pointDestination, pointOffers, onResetClick, onSubmitClick, onRollUpClick, resetButtonLabel }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onResetClick = onResetClick;
    this.#onSubmitClick = onSubmitClick;
    this.#onRollUpClick = onRollUpClick;
    this.#resetButtonLabel = resetButtonLabel;

    if (!this.#point.destination) {
      this.#point.destination = null;
    }

    this._setState(FormEditView.parsePointToState({ point }));
    this._restoreHandlers();
  }

  get template() {
    return CreateFormEditMarkup({
      state: this._state,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers,
      resetButtonLabel: this.#resetButtonLabel
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#changeOffersHandler);
    this.#setDatePickers();
  }

  #setDatePickers = () => {
    const id = this.#point.id;

    this.#pickDateFrom = new DatePicker({
      dateItem: this.element.querySelector(`#event-start-time-${id}`),
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateTo,
      onClose: this.#dateFromCloseHandler,
    });

    this.#pickDateTo = new DatePicker({
      dateItem: this.element.querySelector(`#event-end-time-${id}`),
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onClose: this.#dateToCloseHandler,
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      }
    });

    this.#pickDateTo.setMinDate(userDate);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
    });

    this.#pickDateFrom.setMaxDate(userDate);
  };

  removeElement = () => {
    super.removeElement();

    if (this.#pickDateFrom) {
      this.#pickDateFrom.destroy();
      this.#pickDateFrom = null;
    }

    if (this.#pickDateTo) {
      this.#pickDateTo.destroy();
      this.#pickDateTo = null;
    }
  };

  #changeTypeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: event.target.value,
        offers: []
      }
    });
  };

  #changeDestinationHandler = (evt) => {
    const selectedDestination = this.#pointDestination.find((destination) => destination.name === evt.target.value);
    if (selectedDestination) {
      this.updateElement({
        point: {
          ...this._state.point,
          destination: selectedDestination.id,
        },
        destination: selectedDestination
      });
    }
  };


  #changePriceHandler = (evt) => {
    const basePrice = evt.target.valueAsNumber;
    if (!isNaN(basePrice)) {
      this._setState({
        point: {
          ...this._state.point,
          basePrice: basePrice
        }
      });
    }
  };

  #changeOffersHandler = () => {
    const checkedOfferIds = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked')).map((offer) => offer.id);
    this._setState({
      ...this._state,
      point: {
        ...this._state.point,
        offers: checkedOfferIds
      }
    });
  };

  static parsePointToState = ({ point }) => ({ point });

  static parseStateToPoint = (state) => state.point;

  reset = (point) => this.updateElement({ point });

  #resetButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onResetClick(FormEditView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(FormEditView.parseStateToPoint(this._state));
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#onRollUpClick();
  };
}
