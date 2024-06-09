import Observable from '../framework/observable';
import { updateItem } from '../utils';
import { UpdateType } from '../const';
import { adaptToClient, adaptToServer } from '../adapter';

export default class PointsModel extends Observable {
  #apiService = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;

  constructor({apiService, destinationsModel, offersModel}){
    super();
    console.log('PointsModel constructor:', { apiService, destinationsModel, offersModel });
    this.#apiService = apiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);
      const points = await this.#apiService.points;
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {});
    } catch (err) {
      console.error('Failed to initialize points:', err);
      this.#points = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  get points(){
    return this.#points;
  }

  async update(updateType, point) {
    try {
      const adaptedPoint = adaptToServer(point);
      const updatedPoint = await this.#apiService.updatePoint(adaptedPoint);
      const adaptedUpdatedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedUpdatedPoint);
      this._notify(updateType, adaptedUpdatedPoint);
    } catch (error) {
      throw new Error('cant update point');
    }
  }

  async add(updateType, point){
    try{
      const addedPoint = await this.#apiService.addPoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(addedPoint);
      this.#points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch (error){
      throw new Error('cant add point');
    }
  }

  async deletePoint(updateType, point) {
    try{
      await this.#apiService.deletePoint(point);
      this.#points = this.#points.filter((pointItem) => pointItem.id !== point.id);
      this._notify(updateType);
    } catch (error) {
      throw new Error('cant delete point');
    }
  }
}
