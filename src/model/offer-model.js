import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OfferModel extends Observable {
  #pointsApiService = null;
  #offersModel = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  async init() {
    try {
      this.#offersModel = await this.#pointsApiService.offers;
    } catch(err) {
      this.#offersModel = [];
    }

    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offersModel;
  }
}
