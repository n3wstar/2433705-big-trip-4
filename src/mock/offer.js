import { getRandomNumber, getRandomValue } from '../utils.js';
import { PRICE, POINT_OFFERS} from './consts.js';

function generateOffer() {
  return{
    id: crypto.randomUUID(),
    title: getRandomValue(POINT_OFFERS),
    price: getRandomNumber(PRICE.MIN, PRICE.MAX)
  };
}

export{generateOffer};
