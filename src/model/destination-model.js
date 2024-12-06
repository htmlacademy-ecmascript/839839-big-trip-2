import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/description';

export default class DestinationModel extends Observable {
  #destinationsModel = mockDestinations;

  get destinations() {
    return this.#destinationsModel;
  }
}
