import { TYPES } from '../const.js';
import { formatStringToISODateTime } from '../utils.js';


function createPointTypesListElement(currentType, id) {
  return TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>`).join('');
}

function createPointDestinationListElement(destinations, selectedDestinationName) {
  const options = destinations.map((destination) =>
    `<option value="${destination.name}"></option>`
  ).join('');

  return `
    <input class="event__input event__input--destination" list="destination-list" name="event-destination" value="${selectedDestinationName}">
    <datalist id="destination-list">
      ${options}
    </datalist>
  `;
}

function createOffersTemplate(currentOffers, selectedOfferIds) {
  const offerItems = currentOffers.map((offer) => {
    const isChecked = selectedOfferIds.includes(offer.id);
    const offerName = offer.title.replace(' ', '').toLowerCase();
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offerName}" ${isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join('');

  return `<div class="event__available-offers">${offerItems}</div>`;
}

function createPointPhotosTemplate(destination) {
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>`
  );
}

function createDestinationTemplate( destination ) {
  return destination.description.length && destination.pictures.length ? `<section class="event__section  event__section--destination" >
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${destination.description.length ? `<p class="event__destination-description">${destination.description}</p>` : ''}
    ${destination.pictures.length ? createPointPhotosTemplate(destination) : ''}
  </section>` : '';
}

function CreateFormEditMarkup({ state, pointDestination, pointOffers, resetButtonLabel }) {
  const { point } = state;
  const { id, basePrice, dateFrom, dateTo, offers, type, destination } = point;
  const currentOffers = pointOffers.find((offer) => offer.type === type);
  const currentDestination = destination ? pointDestination.find((dest) => dest.id === destination) : null;
  const destinationName = currentDestination ? currentDestination.name : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createPointTypesListElement(type, id)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-${id}">
              ${type}
            </label>
            ${createPointDestinationListElement(pointDestination, destinationName)}
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${id}">From</label>
            <input class="event__input event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${formatStringToISODateTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${id}">To</label>
            <input class="event__input event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${formatStringToISODateTime(dateTo)}">
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-${id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn btn btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${resetButtonLabel}</button>
          <button class="event__rollup-btn" type="button">
          </button>
        </header>
        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createOffersTemplate(currentOffers.offers, offers)}
            </div>
          </section>

          ${currentDestination ? `<section class="event__section event__section--destination">
            ${createDestinationTemplate(currentDestination)}
          </section>` : ''}
        </section>
      </form>
    </li>`;
}

export { CreateFormEditMarkup };
