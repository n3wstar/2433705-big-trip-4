
import { getRandomNumber, getRandomValue } from '../utils.js';
import { TYPES } from '../mock/consts.js';
import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offer.js';
import { generatePoint } from '../mock/point.js';
import { POINTS_COUNT, DESTINATIONS_COUNT, OFFERS_COUNT } from '../mock/consts.js';

export default class MockService{
  #destinations = null;
  #offers = null;
  #points = null;

  constructor(){
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();

  }

  #generateDestinations() {
    return Array.from({ length: DESTINATIONS_COUNT }, generateDestination);
  }

  #generateOffers() {
    return TYPES.map((type) => ({
      type,
      offers: Array.from({ length: OFFERS_COUNT }, generateOffer)
    }));
  }

  #generatePoints() {
    return Array.from({ length: POINTS_COUNT }, () => {
      const type = getRandomValue(TYPES);
      const destination = getRandomValue(this.#destinations);
      const hasOffers = getRandomNumber(0, 1);
      const offersByType = this.#offers.find((offer) => offer.type === type);
      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomNumber(0, 5))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }

  getDestinations(){
    return this.#destinations;
  }

  getOffers(){
    return this.#offers;
  }

  getPoints(){
    return this.#points;
  }

  updatePoint(updatedPoint){
    return updatedPoint;
  }

  addPoint(addedPoint){
    return {...addedPoint};
  }

  deletePoint(){

  }
}


