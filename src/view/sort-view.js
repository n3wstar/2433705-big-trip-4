import { CreateSortMarkup} from '../template/sort-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class SortView extends AbstractView {
  get template() {
    return CreateSortMarkup();
  }
}
