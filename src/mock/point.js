import { getRandomNumber, getDate } from '../utils.js';
import { PRICE } from './consts.js';

function generatePoint(type, destID, offerIds){

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomNumber(PRICE.MIN, PRICE.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destID,
    isFavorite: Boolean(getRandomNumber(0,1)),
    offers: offerIds,
    type
  };
}

export {generatePoint};

