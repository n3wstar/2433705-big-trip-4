import { EmptyPointsMessage } from '../const';

function createWithoutPointMarkup(filterType) {
  return (`<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
    <p class="trip-events__msg">${EmptyPointsMessage[filterType]}</p>
    </section>`
  );
}

export{createWithoutPointMarkup};

