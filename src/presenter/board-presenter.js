import {render} from '../render.js';
import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class BoardPresenter{
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container, destinationsModel, offersModel, pointsModel}){
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
  }

  init(){
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render (new FormEditView({
      point: this.pointsModel.getPoints()[0],
      pointDestination: this.destinationsModel.getDestination(),
      pointOffers: this.pointsModel.getPoints()
    }),
    this.eventListComponent.getElement()
    );
    this.pointsModel.getPoints().forEach((point) => {
      render(
        new PointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getOfferByType(point.type)
        }),
        this.eventListComponent.getElement()
      );
    });
  }
}
