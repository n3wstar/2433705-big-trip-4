import { getRandomNumber, getRandomValue } from '../utils.js';
import { CITIES, DESCRIPTIONS } from './consts.js';

function generateDestination() {
  const city = getRandomValue(CITIES);
  const description = getRandomValue(DESCRIPTIONS);
  return {
    id: crypto.randomUUID(),
    description: description,
    name: city,
    pictures: Array.from({length: getRandomNumber(1, 5)}, () => ({
      src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
      description: getRandomValue(DESCRIPTIONS)
    }))
  };
}

export {generateDestination};
