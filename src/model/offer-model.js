import Observable from '../framework/observable.js';
import { mockOffers } from '../mock/offers';

export default class OfferModel extends Observable {
  #offersModel = mockOffers;

  get offers() {
    return this.#offersModel;
  }
}
