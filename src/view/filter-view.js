import { CreateFilterMarkup } from '../template/filter-markup.js';
import AbstractView from '../framework/view/abstract-view.js';


export default class FilterView extends AbstractView {
  get template() {
    return CreateFilterMarkup();
  }

}
