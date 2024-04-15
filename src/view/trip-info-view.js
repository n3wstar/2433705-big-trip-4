import { CreateTripInfoMarkup} from '../template/trip-info-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class TripInfoView extends AbstractView {
  get template() {
    return CreateTripInfoMarkup();
  }

}

