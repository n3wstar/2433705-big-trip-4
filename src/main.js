
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './render.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FiltersModel from './model/filter-model.js';
import PointsApiService from './service/points-api-service.js';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const tripInfoElement = headerElement.querySelector('.trip-main');
const filterElement = tripInfoElement.querySelector('.trip-controls__filters');
const mainElement = bodyElement.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');

const AUTHORIZATION = 'Basic hk539hbGLpes0Ft';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel(pointsApiService);

const offersModel = new OffersModel(pointsApiService);

const pointsModel = new PointsModel({apiService: pointsApiService, destinationsModel, offersModel});

const filtersModel = new FiltersModel();


const boardPresenter = new BoardPresenter({
  container: eventListElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filtersModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterElement,
  filterModel: filtersModel,
  pointModel: pointsModel
});

render(new TripInfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
pointsModel.init();

