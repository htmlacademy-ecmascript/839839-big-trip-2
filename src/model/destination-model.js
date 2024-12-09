import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationModel extends Observable {
  #pointsApiService = null;
  #destinationsModel = [];

  constructor ({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#destinationsModel = await this.#pointsApiService.destinations;
    } catch(err) {
      this.#destinationsModel = [];
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinationsModel;
  }
}
