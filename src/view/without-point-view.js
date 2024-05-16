import AbstractView from '../framework/view/abstract-view';
import { createWithoutPointMarkup } from '../template/without-point-markup';

export default class WithoutPointsView extends AbstractView {
  get template() {
    return createWithoutPointMarkup();
  }
}
